import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

// Define the structure for the form data state
interface FormData {
  username: string;
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

// The main registration form component with dark theme
const RegisterFormDark: React.FC = () => {
  // State to hold the form data
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State to hold validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle changes in input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the specific error when the user starts typing again
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Validate the form data
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Nome de usuário é obrigatório.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato de e-mail inválido.';
    }
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres.';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // Check if there are any errors
    if (Object.keys(validationErrors).length === 0) {
      // If no errors, proceed with registration logic (e.g., API call)
      console.log('Formulário válido, enviando dados:', formData);
      // Use a more user-friendly notification method in a real app
      alert('Cadastro realizado com sucesso! (Verifique o console)');
      // Reset form after successful submission (optional)
      // setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    } else {
      console.log('Formulário inválido:', validationErrors);
    }
  };

  // Style constants for reuse (Dark Theme)
  const inputStyle = "w-full px-4 py-2 border border-gray-600 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400";
  const errorStyle = "text-red-400 text-sm mt-1"; // Brighter red for dark background
  const labelStyle = "block text-sm font-medium text-gray-300 mb-1"; // Lighter label text

  return (
    // Main container with dark background
    <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans">
      {/* Form container with dark background */}
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
        {/* Form Title */}
        <h2 className="text-2xl font-bold text-center text-gray-100">Criar Conta</h2>

        {/* Registration Form */}
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
              placeholder="Digite seu nome de usuário"
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
            />
            {errors.confirmPassword && <p id="confirmPassword-error" className={errorStyle}>{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out"
            >
              Registrar
            </button>
          </div>
          {/* Link to Login */}
          <p className="text-sm text-center text-gray-400">
            Já tem uma conta?{' '}
            <a href="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
              Faça o login aqui
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

// Export the component as the default export
// Note: Renamed component slightly to avoid naming conflicts if used alongside the light version
export default RegisterFormDark;

// To use this component in your React application:
// 1. Make sure you have React and TypeScript set up.
// 2. Ensure Tailwind CSS is configured in your project.
// 3. Import this component: `import RegisterFormDark from './RegisterFormDark';` (adjust path and name as needed)
// 4. Render it in your App component or desired location: `<RegisterFormDark />`
