import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Cross, 
  MoonStar, 
  Star, 
  Circle,
  Check,
  ArrowRight,
  Info
} from 'lucide-react';

const FaithSelection = ({ onSelectFaith, onSkip }) => {
  const [selectedFaith, setSelectedFaith] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const faiths = [
    {
      id: 'christian',
      name: 'Christian',
      description: 'Protestant, Evangelical, and other Christian denominations',
      icon: Cross,
      color: 'from-blue-500 to-blue-700',
      iconColor: 'text-blue-600',
      features: [
        'Bible-based spiritual growth',
        'Prayer and worship tools',
        'Christian community features',
        'Scripture study plans'
      ]
    },
    {
      id: 'catholic',
      name: 'Catholic',
      description: 'Roman Catholic Church traditions and practices',
      icon: Cross,
      color: 'from-purple-500 to-purple-700',
      iconColor: 'text-purple-600',
      features: [
        'Catholic prayers and devotions',
        'Saint feast day reminders',
        'Mass and sacramental preparation',
        'Catholic community connections'
      ]
    },
    {
      id: 'lds',
      name: 'Church of Jesus Christ of Latter-day Saints',
      description: 'LDS Church teachings and practices',
      icon: Circle,
      color: 'from-indigo-500 to-indigo-700',
      iconColor: 'text-indigo-600',
      features: [
        'LDS scripture study',
        'Family Home Evening planning',
        'Temple preparation tools',
        'Missionary support features'
      ]
    },
    {
      id: 'muslim',
      name: 'Muslim',
      description: 'Islamic faith and practices',
      icon: MoonStar,
      color: 'from-green-500 to-green-700',
      iconColor: 'text-green-600',
      features: [
        'Prayer time notifications',
        'Quran study and recitation',
        'Ramadan and Islamic calendar',
        'Islamic community features'
      ]
    },
    {
      id: 'jewish',
      name: 'Jewish',
      description: 'Judaism and Jewish traditions',
      icon: Star,
      color: 'from-yellow-500 to-yellow-700',
      iconColor: 'text-yellow-600',
      features: [
        'Jewish calendar and holidays',
        'Torah study resources',
        'Shabbat preparation',
        'Jewish community connections'
      ]
    },
    {
      id: 'buddhist',
      name: 'Buddhist',
      description: 'Buddhism and meditation practices',
      icon: Circle,
      color: 'from-orange-500 to-orange-700',
      iconColor: 'text-orange-600',
      features: [
        'Meditation and mindfulness',
        'Dharma study resources',
        'Compassion practices',
        'Buddhist community features'
      ]
    },
    {
      id: 'hindu',
      name: 'Hindu',
      description: 'Hinduism and spiritual practices',
      icon: Circle,
      color: 'from-red-500 to-red-700',
      iconColor: 'text-red-600',
      features: [
        'Hindu calendar and festivals',
        'Mantra and prayer tools',
        'Yoga and meditation',
        'Hindu community connections'
      ]
    },
    {
      id: 'interfaith',
      name: 'Interfaith / Spiritual',
      description: 'Open to multiple faiths or spiritual without specific denomination',
      icon: Heart,
      color: 'from-pink-500 to-pink-700',
      iconColor: 'text-pink-600',
      features: [
        'Universal spiritual practices',
        'Comparative religious study',
        'Interfaith community',
        'Personal spiritual journey'
      ]
    }
  ];

  const handleSelectFaith = (faithId) => {
    setSelectedFaith(faithId);
    setShowDetails(true);
  };

  const handleConfirm = () => {
    const faith = faiths.find(f => f.id === selectedFaith);
    onSelectFaith(faith);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vesi-light to-vesi-blue flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-lora font-bold text-gray-900 mb-2">
              Choose Your Spiritual Path
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Help us personalize your Vesi experience by selecting your faith tradition. 
              This will customize your spiritual content, prayers, and community features.
            </p>
          </div>

          {!showDetails ? (
            <>
              {/* Faith Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {faiths.map((faith, index) => {
                  const Icon = faith.icon;
                  return (
                    <motion.div
                      key={faith.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSelectFaith(faith.id)}
                      className={`card cursor-pointer hover:shadow-lg transition-all ${
                        selectedFaith === faith.id ? 'ring-2 ring-vesi-deep bg-vesi-light' : ''
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-16 h-16 bg-gradient-to-br ${faith.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{faith.name}</h3>
                        <p className="text-sm text-gray-600">{faith.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Skip Option */}
              <div className="text-center">
                <button
                  onClick={onSkip}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Skip for now - I'll choose later
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Faith Details */}
              {(() => {
                const faith = faiths.find(f => f.id === selectedFaith);
                const Icon = faith.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* Selected Faith Header */}
                    <div className="text-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${faith.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{faith.name}</h2>
                      <p className="text-gray-600">{faith.description}</p>
                    </div>

                    {/* Features */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                        <Info className="h-5 w-5 text-vesi-deep" />
                        <span>Your personalized features will include:</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {faith.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Community Note */}
                    <div className="bg-vesi-light rounded-xl p-6">
                      <h4 className="font-semibold text-vesi-deep mb-2">Community & Connection</h4>
                      <p className="text-vesi-deep text-sm">
                        You'll be connected with others on similar spiritual journeys, 
                        while also having access to interfaith features that celebrate 
                        the universal aspects of faith and spiritual growth.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-6">
                      <button
                        onClick={() => setShowDetails(false)}
                        className="btn-secondary flex items-center space-x-2"
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                        <span>Back</span>
                      </button>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={onSkip}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          Skip for now
                        </button>
                        <button
                          onClick={handleConfirm}
                          className="btn-primary flex items-center space-x-2"
                        >
                          <span>Continue with {faith.name}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FaithSelection;
