import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const APIStatus = () => {
  const [status, setStatus] = useState('checking');
  const [openaiStatus, setOpenaiStatus] = useState(false);
  const [integrationsStatus, setIntegrationsStatus] = useState([]);

  useEffect(() => {
    checkAPIStatus();
  }, []);

  const checkAPIStatus = async () => {
    setStatus('checking');

    // Check OpenAI API key
    const hasOpenAIKey = !!process.env.REACT_APP_OPENAI_API_KEY;
    setOpenaiStatus(hasOpenAIKey);

    // Check integration status
    try {
      const integrationService = await import('../lib/IntegrationService');
      const integrations = integrationService.default.getConnectionStatus();
      setIntegrationsStatus(integrations);
    } catch (error) {
      console.error('Error checking integrations:', error);
    }

    setStatus('complete');
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'checking':
        return <Loader className="h-4 w-4 animate-spin text-blue-500" />;
      case 'complete':
        return openaiStatus ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <AlertCircle className="h-4 w-4 text-yellow-500" />
        );
      default:
        return <WifiOff className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusText = () => {
    if (status === 'checking') return 'Checking API status...';
    if (openaiStatus) return 'API Connected';
    return 'Demo Mode';
  };

  const getStatusColor = () => {
    if (status === 'checking') return 'text-blue-500';
    if (openaiStatus) return 'text-green-500';
    return 'text-yellow-500';
  };

  const connectedIntegrations = integrationsStatus.filter(i => i.connected).length;
  const totalIntegrations = integrationsStatus.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        <button
          onClick={checkAPIStatus}
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-2 text-xs text-gray-600">
        <div className="flex items-center justify-between">
          <span>OpenAI API:</span>
          <span className={openaiStatus ? 'text-green-600' : 'text-yellow-600'}>
            {openaiStatus ? 'Connected' : 'Demo Mode'}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Integrations:</span>
          <span className="text-blue-600">
            {connectedIntegrations}/{totalIntegrations} connected
          </span>
        </div>

        {!openaiStatus && (
          <div className="mt-2 p-2 bg-yellow-50 rounded text-yellow-700">
            <p className="font-medium">Demo Mode Active</p>
            <p className="text-xs">
              Add your OpenAI API key to enable real AI features. 
              <a href="#/settings" className="underline ml-1">
                Go to Settings
              </a>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default APIStatus;
