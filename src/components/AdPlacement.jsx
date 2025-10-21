import React from 'react';
import { motion } from 'framer-motion';

const AdPlacement = ({ type = 'banner', category = 'wellness', className = '' }) => {
  // In a real app, these would be actual ads from your ad network
  const mockAds = {
    banner: [
      {
        title: "BetterHelp Therapy",
        description: "Get matched with a licensed therapist in 24 hours",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=100&fit=crop",
        cta: "Start Your Journey",
        category: "therapy"
      },
      {
        title: "MyFitnessPal Premium",
        description: "Track your nutrition and achieve your fitness goals",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=100&fit=crop",
        cta: "Try Free",
        category: "fitness"
      },
      {
        title: "Headspace Meditation",
        description: "Reduce stress and improve your mental wellness",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=100&fit=crop",
        cta: "Start Meditating",
        category: "mindfulness"
      }
    ],
    card: [
      {
        title: "Calm Sleep Stories",
        description: "Fall asleep faster with guided sleep stories",
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=200&h=150&fit=crop",
        cta: "Listen Now",
        category: "sleep"
      },
      {
        title: "Noom Weight Loss",
        description: "Psychology-based approach to sustainable weight loss",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=150&fit=crop",
        cta: "Get Started",
        category: "nutrition"
      }
    ],
    sponsored: [
      {
        title: "Sponsored: Fitbit Premium",
        description: "Advanced health insights and personalized coaching",
        image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=250&h=150&fit=crop",
        cta: "Learn More",
        category: "fitness"
      }
    ]
  };

  // Filter ads by category if specified
  const availableAds = mockAds[type] || mockAds.banner;
  const relevantAds = category === 'wellness' ? availableAds : 
    availableAds.filter(ad => ad.category === category);

  // Select a random ad for demo purposes
  const selectedAd = relevantAds[Math.floor(Math.random() * relevantAds.length)] || availableAds[0];

  const handleAdClick = () => {
    // In a real app, this would track ad clicks and redirect to the advertiser
    console.log(`Ad clicked: ${selectedAd.title}`);
    alert(`This would redirect to ${selectedAd.title} in a real app. Ad revenue would be tracked here.`);
  };

  if (type === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-l-blue-500 ${className}`}
      >
        <div className="flex items-center space-x-4">
          <img
            src={selectedAd.image}
            alt={selectedAd.title}
            className="w-16 h-12 rounded object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Sponsored</span>
              <span className="text-xs text-gray-500">Ad</span>
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">{selectedAd.title}</h4>
            <p className="text-gray-600 text-xs">{selectedAd.description}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdClick}
            className="btn-primary text-xs px-3 py-1"
          >
            {selectedAd.cta}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (type === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card cursor-pointer hover:shadow-lg transition-all ${className}`}
        onClick={handleAdClick}
      >
        <div className="relative">
          <img
            src={selectedAd.image}
            alt={selectedAd.title}
            className="w-full h-32 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 left-2">
            <span className="text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded">Ad</span>
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 text-sm mb-1">{selectedAd.title}</h4>
          <p className="text-gray-600 text-xs mb-3">{selectedAd.description}</p>
          <button className="btn-primary text-xs w-full">
            {selectedAd.cta}
          </button>
        </div>
      </motion.div>
    );
  }

  if (type === 'sponsored') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 ${className}`}
      >
        <div className="flex items-center space-x-3">
          <img
            src={selectedAd.image}
            alt={selectedAd.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                Sponsored
              </span>
            </div>
            <h4 className="font-semibold text-gray-900 text-sm">{selectedAd.title}</h4>
            <p className="text-gray-600 text-xs">{selectedAd.description}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdClick}
            className="btn-primary text-xs px-3 py-1"
          >
            {selectedAd.cta}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return null;
};

export default AdPlacement;

