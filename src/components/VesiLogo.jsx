import React from 'react';
import { motion } from 'framer-motion';

const VesiLogo = ({ size = 'medium', className = '', animate = false }) => {
  const sizeClasses = {
    small: 'w-16 h-6',
    medium: 'w-24 h-8', 
    large: 'w-32 h-12',
    xlarge: 'w-40 h-14'
  };

  const LogoContent = () => (
    <div className={`flex items-center space-x-2 ${sizeClasses[size]} ${className}`}>
      {/* Water droplet icon */}
      <div className="relative">
        <svg 
          width={size === 'small' ? '16' : size === 'medium' ? '20' : size === 'large' ? '24' : '28'} 
          height={size === 'small' ? '16' : size === 'medium' ? '20' : size === 'large' ? '24' : '28'} 
          viewBox="0 0 24 24" 
          className="drop-shadow-sm"
        >
          <defs>
            <linearGradient id="dropletGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor:'#60a5fa', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#2563eb', stopOpacity:1}} />
            </linearGradient>
          </defs>
          
          {/* Droplet shape */}
          <path 
            d="M12 2 C8 2, 5 5, 5 9 C5 13, 12 22, 12 22 C12 22, 19 13, 19 9 C19 5, 16 2, 12 2 Z" 
            fill="url(#dropletGradient)" 
          />
          
          {/* Wave lines inside droplet */}
          <path 
            d="M9 7 C10 6, 11 6, 12 7" 
            stroke="#1d4ed8" 
            strokeWidth="1" 
            fill="none" 
            opacity="0.6"
          />
          <path 
            d="M9 10 C10 9, 11 9, 12 10" 
            stroke="#1d4ed8" 
            strokeWidth="1" 
            fill="none" 
            opacity="0.6"
          />
        </svg>
      </div>
      
      {/* VESI text */}
      <span 
        className={`font-lora font-bold text-vesi-deep ${
          size === 'small' ? 'text-sm' : 
          size === 'medium' ? 'text-base' : 
          size === 'large' ? 'text-lg' : 'text-xl'
        } tracking-wide`}
      >
        VESI
      </span>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogoContent />
      </motion.div>
    );
  }

  return <LogoContent />;
};

export default VesiLogo;

