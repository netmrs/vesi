import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Book, 
  Heart, 
  Globe, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Star,
  Users,
  Lightbulb,
  Quote,
  Share2
} from 'lucide-react';
import ScriptureManager from '../components/ScriptureManager';
import InterfaithUnification from '../components/InterfaithUnification';

const Spirituality = ({ user, savedScriptures = [], onSaveScripture, onDeleteScripture, onUpdateScripture }) => {
  const [activeTab, setActiveTab] = useState('scripture');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'scripture', label: 'Scripture & Study', icon: Book },
    { id: 'interfaith', label: 'Interfaith Unity', icon: Globe },
    { id: 'reflection', label: 'Daily Reflection', icon: Heart }
  ];

  // Daily spiritual reflection
  const dailyReflection = {
    date: new Date().toLocaleDateString(),
    theme: 'Gratitude and Growth',
    verse: 'Philippians 4:13',
    verseText: '"I can do all things through Christ who strengthens me."',
    reflection: 'Today, focus on recognizing the strength that comes from faith. How can gratitude transform your perspective on challenges?',
    questions: [
      'What am I grateful for today?',
      'How has my faith strengthened me this week?',
      'What spiritual growth do I notice in myself?'
    ]
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'scripture':
        return (
          <div className="space-y-6">
            <ScriptureManager 
              user={user}
              savedScriptures={savedScriptures}
              onSaveScripture={onSaveScripture}
              onDeleteScripture={onDeleteScripture}
              onUpdateScripture={onUpdateScripture}
            />
          </div>
        );

      case 'interfaith':
        return (
          <div className="space-y-6">
            <InterfaithUnification 
              userFaith={user?.faith}
              userGoals={[]}
            />
          </div>
        );

      case 'reflection':
        return (
          <div className="space-y-6">
            {/* Daily Reflection Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card bg-gradient-to-br from-vesi-light to-white border-l-4 border-l-vesi-deep"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Daily Spiritual Reflection</h3>
                  <p className="text-sm text-gray-600">{dailyReflection.date}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-vesi-blue">
                  <div className="flex items-center space-x-2 mb-2">
                    <Quote className="h-4 w-4 text-vesi-deep" />
                    <span className="text-sm font-medium text-vesi-deep">Today's Focus</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{dailyReflection.theme}</h4>
                  <div className="bg-vesi-blue bg-opacity-10 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium text-vesi-deep mb-1">{dailyReflection.verse}</p>
                    <p className="text-gray-700 italic">{dailyReflection.verseText}</p>
                  </div>
                  <p className="text-gray-600 text-sm">{dailyReflection.reflection}</p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                    Reflection Questions
                  </h5>
                  <div className="space-y-3">
                    {dailyReflection.questions.map((question, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-gray-50 rounded-lg border-l-3 border-l-vesi-accent"
                      >
                        <p className="text-sm text-gray-700">{question}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary flex-1 flex items-center justify-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Write Reflection</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Spiritual Growth Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                Spiritual Growth Tracker
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">7</div>
                  <div className="text-sm text-gray-600">Days Streak</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-gray-600">Scriptures Saved</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-600">Reflections</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">5</div>
                  <div className="text-sm text-gray-600">Study Topics</div>
                </div>
              </div>
            </motion.div>

            {/* Community Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card bg-gradient-to-br from-blue-50 to-indigo-50"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Community Insights</h3>
                  <p className="text-sm text-gray-600">What others are studying</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Gratitude & Faith</p>
                    <p className="text-sm text-gray-600">1,247 people studying this week</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-600">Trending</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Prayer & Meditation</p>
                    <p className="text-sm text-gray-600">892 people practicing daily</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">Popular</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Book className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-lora font-bold text-gray-900 mb-2">
          Spirituality & Growth
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Deepen your spiritual journey through scripture study, interfaith understanding, and daily reflection.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-vesi-deep bg-vesi-light text-vesi-deep'
                    : 'border-gray-200 hover:border-vesi-blue hover:bg-gray-50 text-gray-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

export default Spirituality;
