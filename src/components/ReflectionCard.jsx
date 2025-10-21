import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Copy, Check } from 'lucide-react';
import { getTodaysReflection } from '../lib/utils';

const ReflectionCard = ({ onJournalReflection }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);
  const reflection = getTodaysReflection();

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reflection.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card bg-gradient-to-br from-vesi-light to-white border-l-4 border-l-vesi-deep"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-vesi-deep" />
          <span className="text-sm font-medium text-vesi-deep">Daily Reflection</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-400 hover:text-vesi-deep transition-colors"
            title="Copy text"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={handleFavorite}
            className={`p-2 transition-colors ${
              isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
            title="Add to favorites"
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <blockquote className="text-lg leading-relaxed text-gray-700 mb-4 font-lora italic">
        "{reflection.text}"
      </blockquote>

      <div className="flex items-center justify-between">
        <cite className="text-sm text-vesi-deep font-medium">
          — {reflection.reference}
        </cite>
        <span className="text-xs px-2 py-1 bg-vesi-blue text-vesi-deep rounded-full">
          {reflection.category}
        </span>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onJournalReflection(reflection)}
        className="mt-4 w-full btn-secondary text-center"
      >
        Journal About This
      </motion.button>
    </motion.div>
  );
};

export default ReflectionCard;

