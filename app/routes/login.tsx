import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

// Define the structure for the login form data state
interface LoginFormData {
  identifier: string; // Can be username or email
  password: string;
}

// Define the structure for login form errors
interface LoginFormErrors {
  identifier?: string;
  password?: string;
  general?: string; // For general login errors (e.g., invalid credentials)
}

// The main login form component with dark theme
const LoginFormDark: React.FC = () => {
  // State to hold the form data
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: '',
    password: '',
  });

  // State to hold validation errors
  const [errors, setErrors] = useState<LoginFormErrors>({});

  // Handle changes in input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the specific error when the user starts typing again
    if (errors[name as keyof LoginFormErrors] || errors.general) {
      setErrors({
        ...errors,
        [name]: undefined,
        general: undefined, // Clear general error on any input change
      });
    }
  };

  // Validate the form data
  const validateForm = (): LoginFormErrors => {
    const newErrors: LoginFormErrors = {};
    if (!formData.identifier.trim()) {
      newErrors.identifier = 'E-mail ou nome de usuário é obrigatório.';
    }
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória.';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // Check if there are any validation errors before proceeding
    if (Object.keys(validationErrors).length === 0) {
      // If basic validation passes, proceed with login logic (e.g., API call)
      console.log('Tentando fazer login com:', formData);
      // --- Placeholder for actual login API call ---
      // Simulating an API call delay and potential error
      setTimeout(() => {
        // Example: Check credentials (replace with actual API response)
        if (formData.identifier === "usuario" && formData.password === "senha123") {
          console.log('Login bem-sucedido!');
          alert('Login realizado com sucesso!'); // Replace with proper navigation/state update
          // Reset form potentially or navigate away
          // setFormData({ identifier: '', password: '' });
        } else {
          console.log('Falha no login: Credenciais inválidas');
          setErrors({ general: 'E-mail/usuário ou senha inválidos.' });
        }
      }, 1000); // Simulate network delay
      // --- End of placeholder ---
    } else {
      console.log('Formulário de login inválido:', validationErrors);
    }
  };

  // Style constants for reuse (Dark Theme - consistent with RegisterFormDark)
  const inputStyle = "w-full px-4 py-2 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400";
  const errorStyle = "text-red-400 text-sm mt-1"; // Brighter red for dark background
  const labelStyle = "block text-sm font-medium text-gray-300 mb-1"; // Lighter label text

  return (
    // Main container with dark background
    <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans">
      {/* Form container with dark background */}
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
        {/* Form Title */}
        <h2 className="text-2xl font-bold text-center text-gray-100">Entrar</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* General Error Display */}
          {errors.general && (
            <div className="p-3 mb-4 text-sm text-red-400 bg-red-900 bg-opacity-30 rounded-md border border-red-600">
              {errors.general}
            </div>
          )}

          {/* Identifier Field (Username or Email) */}
          <div>
            <label htmlFor="identifier" className={labelStyle}>
              E-mail ou Nome de Usuário
            </label>
            <input
              type="text" // Use text to allow both email and username
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className={`${inputStyle} ${errors.identifier ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'}`}
              aria-describedby="identifier-error"
              placeholder="Digite seu e-mail ou nome de usuário"
              autoComplete="username" // Help password managers
            />
            {errors.identifier && <p id="identifier-error" className={errorStyle}>{errors.identifier}</p>}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className={labelStyle}>
                Senha
              </label>
              {/* Optional: Add a "Forgot Password?" link */}
              <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300">
                Esqueceu a senha?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${inputStyle} ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'}`}
              aria-describedby="password-error"
              placeholder="Digite sua senha"
              autoComplete="current-password" // Help password managers
            />
            {errors.password && <p id="password-error" className={errorStyle}>{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out"
            >
              Entrar
            </button>
          </div>

          {/* Link to Registration */}
          <p className="text-sm text-center text-gray-400">
            Não tem uma conta?{' '}
            <a href="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
              Registre-se aqui
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

// Export the component as the default export
export default LoginFormDark;

// To use this component in your React application:
// 1. Make sure you have React and TypeScript set up.
// 2. Ensure Tailwind CSS is configured in your project.
// 3. Import this component: `import LoginFormDark from './LoginFormDark';` (adjust path as needed)
// 4. Render it in your App component or desired location: `<LoginFormDark />`
// 5. Replace the placeholder links/API call simulation with your actual routing and authentication logic.
