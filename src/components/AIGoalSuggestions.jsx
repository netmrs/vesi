import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Plus, 
  Lightbulb, 
  Target, 
  Flame, 
  Star,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Loader
} from 'lucide-react';
import aiService from '../lib/aiService';

const AIGoalSuggestions = ({ onAddGoal, userGoals = [] }) => {
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);

  // AI-powered goal suggestion system
  const generateGoalSuggestions = async (input) => {
    setIsLoading(true);
    
    try {
      // Get AI-generated goal suggestions
      const aiSuggestions = await aiService.getGoalSuggestions(input, 'Christian', userGoals);
      
      if (aiSuggestions && aiSuggestions.length > 0) {
        setSuggestions(aiSuggestions);
        return;
      }
    } catch (error) {
      console.error('AI Goal Suggestions Error:', error);
    }
    
    // Fallback to mock suggestions if AI fails
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // AI goal generation based on user input
    const goalTemplates = {
      // Spiritual goals
      'prayer': [
        {
          title: 'Daily Prayer Practice',
          description: 'Spend 15 minutes in prayer and meditation each day',
          category: 'spiritual',
          frequency: 'daily',
          timePeriod: 'morning',
          aiReason: 'Prayer is the foundation of spiritual growth and connection with God'
        },
        {
          title: 'Prayer Journal',
          description: 'Write down prayer requests and answers to track God\'s faithfulness',
          category: 'spiritual',
          frequency: 'daily',
          timePeriod: 'evening',
          aiReason: 'Documenting prayers helps you see God\'s work in your life'
        },
        {
          title: 'Intercessory Prayer',
          description: 'Pray specifically for others in your life each day',
          category: 'spiritual',
          frequency: 'daily',
          timePeriod: 'anytime',
          aiReason: 'Intercessory prayer cultivates love and compassion for others'
        }
      ],
      'bible': [
        {
          title: 'Daily Scripture Reading',
          description: 'Read one chapter of the Bible each day',
          category: 'spiritual',
          frequency: 'daily',
          timePeriod: 'morning',
          aiReason: 'Regular Bible reading deepens your understanding of God\'s Word'
        },
        {
          title: 'Scripture Memorization',
          description: 'Memorize one verse each week',
          category: 'spiritual',
          frequency: 'weekly',
          timePeriod: 'anytime',
          aiReason: 'Memorized scripture provides strength and guidance in daily life'
        },
        {
          title: 'Bible Study Group',
          description: 'Join or start a weekly Bible study with others',
          category: 'spiritual',
          frequency: 'weekly',
          timePeriod: 'anytime',
          aiReason: 'Community study enhances understanding and builds relationships'
        }
      ],
      'service': [
        {
          title: 'Weekly Service',
          description: 'Find one opportunity to serve others each week',
          category: 'service',
          frequency: 'weekly',
          timePeriod: 'anytime',
          aiReason: 'Service reflects Christ\'s love and transforms your heart'
        },
        {
          title: 'Volunteer Commitment',
          description: 'Commit to regular volunteering at a local organization',
          category: 'service',
          frequency: 'weekly',
          timePeriod: 'anytime',
          aiReason: 'Consistent service builds character and makes a lasting impact'
        },
        {
          title: 'Random Acts of Kindness',
          description: 'Perform one random act of kindness each day',
          category: 'service',
          frequency: 'daily',
          timePeriod: 'anytime',
          aiReason: 'Small acts of kindness spread God\'s love in practical ways'
        }
      ],
      'gratitude': [
        {
          title: 'Gratitude Journal',
          description: 'Write down three things you\'re grateful for each day',
          category: 'personal',
          frequency: 'daily',
          timePeriod: 'evening',
          aiReason: 'Gratitude shifts your perspective and opens your heart to God\'s blessings'
        },
        {
          title: 'Thank You Notes',
          description: 'Send one thank you note each week',
          category: 'personal',
          frequency: 'weekly',
          timePeriod: 'anytime',
          aiReason: 'Expressing gratitude strengthens relationships and spreads joy'
        },
        {
          title: 'Gratitude Prayer',
          description: 'Start each day with a prayer of thanksgiving',
          category: 'spiritual',
          frequency: 'daily',
          timePeriod: 'morning',
          aiReason: 'Beginning with gratitude sets a positive tone for your day'
        }
      ],
      'patience': [
        {
          title: 'Patience Practice',
          description: 'Practice patience in one challenging situation each day',
          category: 'personal',
          frequency: 'daily',
          timePeriod: 'anytime',
          aiReason: 'Patience is a fruit of the Spirit that grows through practice'
        },
        {
          title: 'Deep Breathing',
          description: 'Take 5 deep breaths before responding to stress',
          category: 'personal',
          frequency: 'daily',
          timePeriod: 'anytime',
          aiReason: 'Mindful breathing helps you respond with patience instead of reacting'
        },
        {
          title: 'Waiting Prayer',
          description: 'Pray for patience during difficult waiting periods',
          category: 'spiritual',
          frequency: 'daily',
          timePeriod: 'anytime',
          aiReason: 'Prayer transforms waiting from frustration to spiritual growth'
        }
      ],
      'health': [
        {
          title: 'Daily Exercise',
          description: 'Engage in 30 minutes of physical activity each day',
          category: 'health',
          frequency: 'daily',
          timePeriod: 'morning',
          aiReason: 'Caring for your body honors God as your temple'
        },
        {
          title: 'Healthy Eating',
          description: 'Make one healthy food choice each day',
          category: 'health',
          frequency: 'daily',
          timePeriod: 'anytime',
          aiReason: 'Good nutrition supports your ability to serve God and others'
        },
        {
          title: 'Rest and Sabbath',
          description: 'Take one day each week for rest and spiritual renewal',
          category: 'spiritual',
          frequency: 'weekly',
          timePeriod: 'anytime',
          aiReason: 'Rest is a spiritual discipline that restores your soul'
        }
      ]
    };

    // Find matching templates based on input keywords
    const inputLower = input.toLowerCase();
    let matchedGoals = [];

    Object.keys(goalTemplates).forEach(keyword => {
      if (inputLower.includes(keyword)) {
        matchedGoals = [...matchedGoals, ...goalTemplates[keyword]];
      }
    });

    // If no specific matches, provide general spiritual growth goals
    if (matchedGoals.length === 0) {
      matchedGoals = [
        {
          title: 'Daily Spiritual Practice',
          description: 'Dedicate time each day to spiritual growth and connection',
          category: 'spiritual',
          frequency: 'daily',
          timePeriod: 'morning',
          aiReason: 'Consistent spiritual practice is the foundation of faith growth'
        },
        {
          title: 'Character Development',
          description: 'Focus on developing one Christ-like character trait each month',
          category: 'personal',
          frequency: 'monthly',
          timePeriod: 'anytime',
          aiReason: 'Character development aligns you with God\'s plan for your life'
        },
        {
          title: 'Community Connection',
          description: 'Engage meaningfully with your spiritual community',
          category: 'spiritual',
          frequency: 'weekly',
          timePeriod: 'anytime',
          aiReason: 'Community strengthens faith and provides accountability'
        }
      ];
    }

    // Return 3 unique suggestions
    const uniqueGoals = matchedGoals.slice(0, 3);
    setSuggestions(uniqueGoals);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      await generateGoalSuggestions(userInput);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSelectedSuggestions(prev => 
      prev.some(s => s.title === suggestion.title) 
        ? prev.filter(s => s.title !== suggestion.title)
        : [...prev, suggestion]
    );
  };

  const handleAddSelectedGoals = () => {
    selectedSuggestions.forEach(goal => {
      onAddGoal(goal);
    });
    setSelectedSuggestions([]);
    setSuggestions([]);
    setUserInput('');
  };

  return (
    <div className="space-y-6">
      {/* AI Goal Suggestion Interface */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Goal Suggestions</h3>
            <p className="text-sm text-gray-600">Tell me what you want to work on, and I'll suggest 3 spiritual goals</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to focus on?
            </label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="e.g., I want to grow in prayer, become more patient, serve others..."
              className="input-field"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={!userInput.trim() || isLoading}
            className="btn-primary flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Thinking...</span>
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4" />
                <span>Get AI Suggestions</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900">AI Suggested Goals</h4>
            {selectedSuggestions.length > 0 && (
              <button
                onClick={handleAddSelectedGoals}
                className="btn-primary flex items-center space-x-2 text-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Add Selected ({selectedSuggestions.length})</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestions.map((suggestion, index) => {
              const isSelected = selectedSuggestions.some(s => s.title === suggestion.title);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card cursor-pointer transition-all ${
                    isSelected 
                      ? 'ring-2 ring-vesi-deep bg-vesi-light' 
                      : 'hover:shadow-lg hover:scale-105'
                  }`}
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-vesi-deep" />
                      <h5 className="font-semibold text-gray-900">{suggestion.title}</h5>
                    </div>
                    {isSelected && (
                      <CheckCircle className="h-5 w-5 text-vesi-deep" />
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs">
                      <span className={`px-2 py-1 rounded-full ${
                        suggestion.category === 'spiritual' ? 'bg-blue-100 text-blue-800' :
                        suggestion.category === 'personal' ? 'bg-green-100 text-green-800' :
                        suggestion.category === 'health' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {suggestion.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                        {suggestion.frequency}
                      </span>
                    </div>
                    
                    <div className="bg-vesi-light p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Sparkles className="h-4 w-4 text-vesi-deep mt-0.5" />
                        <p className="text-xs text-vesi-deep font-medium">
                          {suggestion.aiReason}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Quick Suggestions */}
      <div className="card">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Goal Ideas</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { keyword: 'prayer', label: 'Prayer', icon: '🙏' },
            { keyword: 'bible', label: 'Bible Study', icon: '📖' },
            { keyword: 'service', label: 'Service', icon: '🤝' },
            { keyword: 'gratitude', label: 'Gratitude', icon: '🙏' },
            { keyword: 'patience', label: 'Patience', icon: '⏳' },
            { keyword: 'health', label: 'Health', icon: '💪' },
            { keyword: 'forgiveness', label: 'Forgiveness', icon: '❤️' },
            { keyword: 'wisdom', label: 'Wisdom', icon: '🧠' }
          ].map((item) => (
            <button
              key={item.keyword}
              onClick={() => {
                setUserInput(`I want to work on ${item.keyword}`);
                generateGoalSuggestions(`I want to work on ${item.keyword}`);
              }}
              className="flex flex-col items-center space-y-2 p-3 bg-gray-50 rounded-lg hover:bg-vesi-light transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIGoalSuggestions;
