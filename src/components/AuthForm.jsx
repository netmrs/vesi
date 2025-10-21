import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import SignupFlow from './SignupFlow';

const AuthForm = ({ mode, onSwitchMode, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupFlow, setShowSignupFlow] = useState(false);
  const [signupData, setSignupData] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'signup' && formData.password !== formData.confirmPassword) {
      return;
    }
    onSubmit(formData.email, formData.password, signupData);
  };

  const handleSignupFlowComplete = (data) => {
    setSignupData(data);
    setShowSignupFlow(false);
    // Continue with the actual signup process
    onSubmit(formData.email, formData.password, data);
  };

  const handleSignupFlowSkip = () => {
    setShowSignupFlow(false);
    // Continue with basic signup
    onSubmit(formData.email, formData.password, null);
  };

  const handleSignupClick = () => {
    if (mode === 'signup' && formData.email && formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        return;
      }
      setShowSignupFlow(true);
    }
  };

  const isSignup = mode === 'signup';

  // Show signup flow if it's signup mode and we have the basic info
  if (showSignupFlow) {
    return (
      <SignupFlow 
        onComplete={handleSignupFlowComplete}
        onSkip={handleSignupFlowSkip}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vesi-light to-vesi-blue p-4"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-12 w-12 text-vesi-deep" />
            </div>
            <h1 className="text-3xl font-lora font-semibold text-vesi-deep mb-2">
              Vesi
            </h1>
            <p className="text-gray-600 text-sm">
              Flow with purpose. Grow with light.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {isSignup && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}

            <button
              type={isSignup ? "button" : "submit"}
              onClick={isSignup ? handleSignupClick : undefined}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              )}
              <span>{loading ? 'Please wait...' : (isSignup ? 'Continue to Setup' : 'Sign In')}</span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onSwitchMode}
              className="text-vesi-deep hover:text-blue-700 text-sm font-medium transition-colors"
            >
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AuthForm;
