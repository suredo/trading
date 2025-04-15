import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { createClient, AuthError } from '@supabase/supabase-js';
import { redirect } from 'react-router';

// --- Supabase Client Initialization ---
// Retrieve Supabase URL and Anon Key from environment variables
// IMPORTANT: Ensure these variables are set in your .env file
// and prefixed correctly for your build tool (e.g., VITE_ or REACT_APP_)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are loaded
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Make sure they are set in your .env file and correctly prefixed (e.g., VITE_SUPABASE_URL).");
  // You might want to throw an error or display a message to the user
  // throw new Error("Supabase configuration is missing.");
}

// Create the Supabase client instance
// Handle the case where variables might be undefined at runtime, although the check above helps
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
// --- End Supabase Client Initialization ---


// Define the structure for the form data state
interface FormData {
  username: string; // Keep username for potential profile creation later
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the structure for form errors
interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

// The main registration form component with dark theme and Supabase integration
const Register: React.FC = () => {
  // State to hold the form data
  const [formData, setFormData] = useState<FormData>({
    username: '', // We still collect it, but Supabase signUp uses email/password
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State to hold validation errors
  const [errors, setErrors] = useState<FormErrors>({});
  // State for Supabase-specific errors
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  // State for loading indicator
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State for success message
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  // Handle changes in input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear validation errors for the field being edited
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
    // Clear Supabase error on new input
    if (supabaseError) setSupabaseError(null);
    if (successMessage) setSuccessMessage(null);
  };

  // Validate the form data (client-side)
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    // Username validation (optional for Supabase auth, but maybe needed for profile)
    if (!formData.username.trim()) {
      newErrors.username = 'Nome de usuário é obrigatório.';
    }
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato de e-mail inválido.';
    }
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória.';
    } else if (formData.password.length < 6) {
      // Consider matching Supabase's default password requirements if different
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres.';
    }
    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSupabaseError(null); // Clear previous Supabase errors
    setSuccessMessage(null); // Clear previous success message

    // Perform client-side validation first
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // Check if Supabase client is available
    if (!supabase) {
      setSupabaseError("Erro de configuração do Supabase. Verifique as variáveis de ambiente.");
      return; // Stop submission if Supabase isn't configured
    }

    // If client-side validation passes, attempt Supabase sign up
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true); // Set loading state

      try {
        // Call Supabase signUp function
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          // You can pass additional user metadata or redirect options here if needed
          options: {
            data: {
              username: formData.username, // Example: Store username in metadata
            }
          }
        });

        if (error) {
          // Handle Supabase specific errors
          console.error('Supabase Sign Up Error:', error);
          setSupabaseError(error.message || 'Ocorreu um erro ao registrar.');
        } else if (data.user) {
          // Handle successful sign up
          console.log('Supabase Sign Up Success:', data.user);

          // Check if email confirmation is required (common Supabase setting)
          if (data.user.identities?.length === 0) {
            setSuccessMessage('Cadastro quase completo! Verifique seu e-mail para confirmação.');
          } else {
            setSuccessMessage('Cadastro realizado com sucesso!');
            redirect('/login');
            // Optionally redirect or clear form here
            // setFormData({ username: '', email: '', password: '', confirmPassword: '' });
          }
          // You might want to store the username in a separate 'profiles' table
          // associated with the user ID (data.user.id) after sign-up.
        } else {
          // Handle cases where user is null but no error (e.g., email confirmation needed)
          console.log('Sign up initiated, check email for confirmation if enabled.');
          setSuccessMessage('Cadastro iniciado! Verifique seu e-mail para confirmar sua conta.');
        }
      } catch (err) {
        // Catch unexpected errors during the async operation
        console.error('Unexpected Error during Sign Up:', err);
        setSupabaseError('Ocorreu um erro inesperado.');
      } finally {
        setIsLoading(false); // Reset loading state regardless of outcome
      }
    } else {
      console.log('Formulário inválido:', validationErrors);
    }
  };

  // Style constants (Dark Theme)
  const inputStyle = "w-full px-4 py-2 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 disabled:opacity-50";
  const errorStyle = "text-red-400 text-sm mt-1";
  const successStyle = "text-green-400 text-sm mt-1"; // Style for success messages
  const labelStyle = "block text-sm font-medium text-gray-300 mb-1";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-100">Criar Conta</h2>

        {/* Display Supabase Error Message */}
        {supabaseError && (
          <div className="p-3 mb-4 text-sm text-red-400 bg-red-900 bg-opacity-30 rounded-md border border-red-600" role="alert">
            {supabaseError}
          </div>
        )}

        {/* Display Success Message */}
        {successMessage && (
          <div className="p-3 mb-4 text-sm text-green-400 bg-green-900 bg-opacity-30 rounded-md border border-green-600" role="alert">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className={labelStyle}>
              Nome de Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`${inputStyle} ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'}`}
              aria-describedby="username-error"
              placeholder="Escolha um nome de usuário"
              disabled={isLoading}
            />
            {errors.username && <p id="username-error" className={errorStyle}>{errors.username}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className={labelStyle}>
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${inputStyle} ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'}`}
              aria-describedby="email-error"
              placeholder="seuemail@exemplo.com"
              disabled={isLoading}
              autoComplete="email"
            />
            {errors.email && <p id="email-error" className={errorStyle}>{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className={labelStyle}>
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${inputStyle} ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'}`}
              aria-describedby="password-error"
              placeholder="Crie uma senha (mín. 6 caracteres)"
              disabled={isLoading}
              autoComplete="new-password"
            />
            {errors.password && <p id="password-error" className={errorStyle}>{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className={labelStyle}>
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${inputStyle} ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'}`}
              aria-describedby="confirmPassword-error"
              placeholder="Confirme sua senha"
              disabled={isLoading}
              autoComplete="new-password"
            />
            {errors.confirmPassword && <p id="confirmPassword-error" className={errorStyle}>{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
          <p className="text-sm text-center text-gray-400">
            Já tem uma conta?{' '}
            <a href="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              Entre aqui
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;