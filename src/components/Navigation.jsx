import React from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Target, Settings, Brain, Heart, Link, Book, Play, Users, Globe, UserPlus, MessageCircle, Activity } from 'lucide-react';
import VesiLogo from './VesiLogo';

const Navigation = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'spirituality', label: 'Spirituality', icon: Book },
    { id: 'mental', label: 'Mental', icon: Brain },
    { id: 'physical', label: 'Physical', icon: Activity },
    { id: 'media', label: 'Media', icon: Play },
    { id: 'connect', label: 'Connect', icon: MessageCircle },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'ai-insights', label: 'AI Insights', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-colors ${
                isActive ? 'text-vesi-deep' : 'text-gray-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`p-2 rounded-lg transition-colors ${
                isActive ? 'bg-vesi-blue' : 'hover:bg-gray-100'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-vesi-deep rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
