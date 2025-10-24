import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader, ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import OAuthService from '../lib/OAuthService';

const OAuthCallback = () => {
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('');
  const [appName, setAppName] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    try {
      // Get parameters from URL
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      if (error) {
        throw new Error(`OAuth error: ${error}`);
      }

      if (!code || !state) {
        throw new Error('Missing authorization code or state parameter');
      }

      // Get the provider from the URL parameter
      const provider = searchParams.get('provider');
      if (!provider) {
        throw new Error('Missing provider parameter');
      }
      
      const oauthAppName = provider;
      setAppName(oauthAppName);

      setStatus('processing');
      setMessage('Completing connection...');

      // Handle the OAuth callback
      const result = await OAuthService.handleCallback(oauthAppName, code, state);

      if (result.success) {
        setStatus('success');
        setMessage(`Successfully connected to ${result.appName || oauthAppName}!`);
        
        // Redirect to settings after a delay
        setTimeout(() => {
          navigate('/settings?tab=integrations');
        }, 2000);
      } else {
        throw new Error(result.message || 'Connection failed');
      }
    } catch (error) {
      console.error('OAuth callback error:', error);
      setStatus('error');
      setMessage(error.message || 'Connection failed. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigate('/settings?tab=integrations');
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader className="h-16 w-16 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case 'error':
        return <XCircle className="h-16 w-16 text-red-500" />;
      default:
        return <Loader className="h-16 w-16 text-gray-500 animate-spin" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return 'text-blue-500';
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vesi-light to-vesi-blue flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          {getStatusIcon()}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-2xl font-lora font-semibold mb-4 ${getStatusColor()}`}
        >
          {status === 'processing' && 'Connecting...'}
          {status === 'success' && 'Success!'}
          {status === 'error' && 'Connection Failed'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-6"
        >
          {message}
        </motion.p>

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500 mb-4"
          >
            Redirecting to settings...
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleGoBack}
          className="btn-secondary flex items-center space-x-2 mx-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Settings</span>
        </motion.button>

        {status === 'processing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-xs text-gray-500"
          >
            This may take a few moments...
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default OAuthCallback;
