import React from 'react';
import { motion } from 'framer-motion';
import VesiLogo from './VesiLogo';

const Header = ({ title, subtitle, showLogo = true }) => {
  return (
    <motion.header 
      className="bg-white border-b border-gray-200 px-4 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between">
          {showLogo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <VesiLogo size="medium" />
            </motion.div>
          )}
          
          {title && (
            <div className="flex-1 text-center">
              <h1 className="text-lg font-lora font-semibold text-gray-900">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          
          {/* Spacer for logo alignment */}
          {showLogo && title && <div className="w-24"></div>}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

