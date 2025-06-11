import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { authenticateUser } from '../utils/auth';
import { setCurrentUser } from '../utils/storage';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const user = authenticateUser(formData.username, formData.password);

    if (user) {
      setCurrentUser(user);
      onLogin(user);
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          {/* Placeholder for logo */}
          {/* <img src="/logo.png" alt="App Logo" className="mx-auto h-16 w-auto" /> */}
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Create one now
            </Link>
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/70 backdrop-blur-lg py-8 px-6 shadow-2xl rounded-2xl border border-gray-100/50">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-3 text-red-700 bg-red-100/60 backdrop-blur-md p-4 rounded-xl border border-red-200/50">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Username Input */}
            <div className="relative">
              <label
                htmlFor="username"
                className="absolute -top-2 left-3 bg-white/80 px-2 text-sm font-medium text-gray-700 transition-all duration-200"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-600/30 text-gray-900 placeholder-gray-400 sm:text-sm transition-all duration-200"
                placeholder="Enter your username"
                aria-label="Username"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label
                htmlFor="password"
                className="absolute -top-2 left-3 bg-white/80 px-2 text-sm font-medium text-gray-700 transition-all duration-200"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-600/30 text-gray-900 placeholder-gray-400 sm:text-sm transition-all duration-200"
                placeholder="Enter your password"
                aria-label="Password"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <LogIn className="w-5 h-5 mr-2" />
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}