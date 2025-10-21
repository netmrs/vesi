import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Lightbulb, 
  Target, 
  Plus, 
  Edit, 
  CheckCircle,
  Sparkles,
  ArrowRight,
  Copy,
  RefreshCw,
  Loader
} from 'lucide-react';
import aiService from '../lib/aiService';

const AIGoalWritingAssistant = ({ onAddGoal, userGoals = [] }) => {
  const [userInput, setUserInput] = useState('');
  const [improvementArea, setImprovementArea] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [writingMode, setWritingMode] = useState('ai'); // 'ai' or 'manual'

  const improvementAreas = [
    { value: 'patience', label: 'Patience & Self-Control' },
    { value: 'gratitude', label: 'Gratitude & Thankfulness' },
    { value: 'prayer', label: 'Prayer & Devotion' },
    { value: 'service', label: 'Service & Helping Others' },
    { value: 'forgiveness', label: 'Forgiveness & Mercy' },
    { value: 'wisdom', label: 'Wisdom & Discernment' },
    { value: 'love', label: 'Love & Compassion' },
    { value: 'faith', label: 'Faith & Trust' },
    { value: 'peace', label: 'Peace & Contentment' },
    { value: 'discipline', label: 'Discipline & Self-Control' },
    { value: 'humility', label: 'Humility & Humbleness' },
    { value: 'courage', label: 'Courage & Boldness' }
  ];

  const generateAISuggestions = async (area, customInput = '') => {
    setIsLoading(true);
    
    try {
      // Get AI-generated goal content
      const aiGoal = await aiService.generateGoalContent('improvement', area, 'Christian');
      
      if (aiGoal && aiGoal.title) {
        // Convert AI response to our suggestion format
        const suggestion = {
          title: aiGoal.title,
          description: aiGoal.description,
          category: 'personal',
          frequency: aiGoal.frequency || 'daily',
          timePeriod: 'anytime',
          actionItems: aiGoal.actionItems || [],
          scripture: aiGoal.scripture || '',
          aiReason: `AI-generated goal for ${area} improvement based on your faith tradition.`
        };
        
        setAiSuggestions([suggestion]);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error('AI Goal Writing Error:', error);
    }
    
    // Fallback to mock suggestions if AI fails
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const suggestions = generateGoalSuggestions(area, customInput);
    setAiSuggestions(suggestions);
    setIsLoading(false);
  };

  const generateGoalSuggestions = (area, customInput) => {
    const goalTemplates = {
      patience: [
        {
          title: 'Daily Patience Practice',
          description: 'Practice patience in one challenging situation each day, taking 3 deep breaths before responding',
          category: 'personal',
          frequency: 'daily',
          timePeriod: 'anytime',
          actionItems: [
            'Identify your typical triggers for impatience',
            'Practice the 3-second pause before responding',
            'Reflect on what you learned each day',
            'Celebrate small wins in patience'
          ],
          scripture: 'James 1:19 - "Everyone should be quick to listen, slow to speak and slow to become angry."',
          aiReason: 'Patience is a fruit of the Spirit that grows through intentional practice and reflection.'
        },
        {
          title: 'Patience in Waiting',
          description: 'Use waiting periods as opportunities for prayer and reflection instead of frustration',
          category: 'spiritual',
          frequency: 'daily',
          timePeriod: 'anytime',
          actionItems: [
            'Create a "waiting prayer" to use during delays',
            'Keep a gratitude journal during waiting times',
            'Practice deep breathing exercises',
            'Use waiting to pray for others'
          ],
          scripture: 'Isaiah 40:31 - "But those who hope in the Lord will renew their strength."',
          aiReason: 'Transforming waiting from frustration to spiritual opportunity builds character.'
        },
        {
          title: 'Patient Communication',
          description: 'Listen fully to others without interrupting, asking thoughtful questions',
          category: 'personal',
          frequency: 'daily',
          timePeriod: 'anytime',
          actionItems: [
            'Practice active listening techniques',
            'Count to 3 before responding in conversations',
            'Ask "What do you need me to understand?"',
            'Reflect on how patience improved the conversation'
          ],
          scripture: 'Proverbs 18:13 - "To answer before listening—that is folly and shame."',
          aiReason: 'Patient listening demonstrates love and builds stronger relationships.'
        }
      ],
      gratitude: [
        {
          title: 'Daily Gratitude Journal',
          description: 'Write down three specific things you\'re grateful for each day',
          category: 'personal',
          frequency: 'daily',
          timePeriod: 'evening',
          actionItems: [
            'Set a specific time for gratitude reflection',
            'Be specific about what you\'re grateful for',
            'Include both big and small blessings',
            'Share one gratitude with someone each day'
          ],
          scripture: '1 Thessalonians 5:18 - "Give thanks in all circumstances."',
          aiReason: 'Gratitude shifts perspective and opens your heart to God\'s goodness.'
        },
        {
          title: 'Gratitude in Challenges',
          description: 'Find one thing to be grateful for even in difficult situations',
          category: 'spiritual',
          frequency: 'daily',
          timePeriod: 'anytime',
          actionItems: [
            'Ask "What can I learn from this?"',
            'Look for God\'s presence in the difficulty',
            'Consider how this might help others',
            'Thank God for His faithfulness'
          ],
          scripture: 'Romans 8:28 - "And we know that in all things God works for the good."',
          aiReason: 'Finding gratitude in trials builds faith and spiritual resilience.'
        },
        {
          title: 'Express Gratitude to Others',
          description: 'Tell someone specific why you\'re grateful for them each week',
          category: 'service',
          frequency: 'weekly',
          timePeriod: 'anytime',
          actionItems: [
            'Write a thank you note each week',
            'Express gratitude in person when possible',
            'Be specific about their impact on your life',
            'Follow up on how your gratitude affected them'
          ],
          scripture: 'Ephesians 5:20 - "Always giving thanks to God the Father for everything."',
          aiReason: 'Expressing gratitude strengthens relationships and spreads joy.'
        }
      ],
      prayer: [
        {
          title: 'Morning Prayer Routine',
          description: 'Start each day with 10 minutes of prayer and scripture reading',
          category: 'spiritual',
          frequency: 'daily',
          timePeriod: 'morning',
          actionItems: [
            'Create a quiet prayer space',
            'Use the ACTS prayer model (Adoration, Confession, Thanksgiving, Supplication)',
            'Read one scripture verse daily',
            'Journal insights from prayer time'
          ],
          scripture: 'Psalm 5:3 - "In the morning, Lord, you hear my voice."',
          aiReason: 'Morning prayer sets the tone for your day and strengthens your relationship with God.'
        },
        {
          title: 'Prayer for Others',
          description: 'Pray specifically for 5 people each day, rotating through your community',
          category: 'spiritual',
          frequency: 'daily',
          timePeriod: 'anytime',
          actionItems: [
            'Create a prayer list with specific needs',
            'Pray for one family member, friend, coworker, and stranger daily',
            'Follow up on prayer requests when appropriate',
            'Keep a prayer journal to track God\'s answers'
          ],
          scripture: '1 Timothy 2:1 - "I urge, then, first of all, that petitions, prayers, intercession and thanksgiving be made for all people."',
          aiReason: 'Intercessory prayer cultivates love for others and demonstrates God\'s care.'
        },
        {
          title: 'Prayer Walking',
          description: 'Take a 15-minute walk while praying for your neighborhood and community',
          category: 'spiritual',
          frequency: 'weekly',
          timePeriod: 'anytime',
          actionItems: [
            'Choose a different route each week',
            'Pray for the families in each home you pass',
            'Pray for local businesses and community needs',
            'Thank God for the beauty of His creation'
          ],
          scripture: 'Jeremiah 29:7 - "Seek the peace and prosperity of the city to which I have carried you."',
          aiReason: 'Prayer walking combines physical activity with spiritual intercession for your community.'
        }
      ]
    };

    return goalTemplates[area] || [
      {
        title: 'Personal Growth Goal',
        description: 'Focus on developing character and spiritual maturity in your chosen area',
        category: 'personal',
        frequency: 'daily',
        timePeriod: 'anytime',
        actionItems: [
          'Identify specific behaviors to change or develop',
          'Set measurable milestones for progress',
          'Find an accountability partner',
          'Reflect weekly on your growth'
        ],
        scripture: 'Philippians 1:6 - "He who began a good work in you will carry it on to completion."',
        aiReason: 'Intentional character development aligns you with God\'s plan for your life.'
      }
    ];
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
    setAiSuggestions([]);
    setUserInput('');
  };

  const handleManualGoalSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      // Create a manual goal from user input
      const manualGoal = {
        title: userInput.split(':')[0] || userInput,
        description: userInput.split(':')[1] || userInput,
        category: 'personal',
        frequency: 'daily',
        timePeriod: 'anytime',
        isManual: true
      };
      onAddGoal(manualGoal);
      setUserInput('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Goal Writing Assistant</h3>
            <p className="text-sm text-gray-600">Get AI-powered goal suggestions or write your own</p>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="ai-mode"
              name="writing-mode"
              value="ai"
              checked={writingMode === 'ai'}
              onChange={(e) => setWritingMode(e.target.value)}
              className="text-vesi-deep"
            />
            <label htmlFor="ai-mode" className="text-sm font-medium text-gray-700">
              AI Suggestions
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="manual-mode"
              name="writing-mode"
              value="manual"
              checked={writingMode === 'manual'}
              onChange={(e) => setWritingMode(e.target.value)}
              className="text-vesi-deep"
            />
            <label htmlFor="manual-mode" className="text-sm font-medium text-gray-700">
              Write My Own
            </label>
          </div>
        </div>

        {/* AI Mode */}
        {writingMode === 'ai' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What area would you like to improve in?
              </label>
              <select
                value={improvementArea}
                onChange={(e) => setImprovementArea(e.target.value)}
                className="input-field"
              >
                <option value="">Select an area for improvement</option>
                {improvementAreas.map((area) => (
                  <option key={area.value} value={area.value}>
                    {area.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional context (optional)
              </label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Tell me more about your specific situation, challenges, or what you hope to achieve..."
                className="input-field h-20 resize-none"
              />
            </div>

            <button
              onClick={() => generateAISuggestions(improvementArea, userInput)}
              disabled={!improvementArea || isLoading}
              className="btn-primary flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Suggestions...</span>
                </>
              ) : (
                <>
                  <Lightbulb className="h-4 w-4" />
                  <span>Get AI Suggestions</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Manual Mode */}
        {writingMode === 'manual' && (
          <form onSubmit={handleManualGoalSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Write your own goal
              </label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Describe your goal. You can use format: 'Goal Title: Detailed description' or just write your goal description..."
                className="input-field h-24 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!userInput.trim()}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add My Goal</span>
            </button>
          </form>
        )}
      </div>

      {/* AI Suggestions Results */}
      {aiSuggestions.length > 0 && (
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiSuggestions.map((suggestion, index) => {
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
                  
                  <p className="text-sm text-gray-600 mb-4">{suggestion.description}</p>
                  
                  {/* Action Items */}
                  <div className="mb-4">
                    <h6 className="text-xs font-semibold text-gray-700 mb-2">Action Items:</h6>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {suggestion.actionItems.slice(0, 2).map((item, i) => (
                        <li key={i} className="flex items-start space-x-1">
                          <ArrowRight className="h-3 w-3 text-vesi-deep mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {suggestion.actionItems.length > 2 && (
                        <li className="text-gray-500">+{suggestion.actionItems.length - 2} more items</li>
                      )}
                    </ul>
                  </div>

                  {/* Scripture Reference */}
                  {suggestion.scripture && (
                    <div className="mb-4 p-2 bg-vesi-light rounded text-xs">
                      <div className="flex items-start space-x-2">
                        <Sparkles className="h-3 w-3 text-vesi-deep mt-0.5 flex-shrink-0" />
                        <span className="text-vesi-deep font-medium">{suggestion.scripture}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      suggestion.category === 'spiritual' ? 'bg-blue-100 text-blue-800' :
                      suggestion.category === 'personal' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {suggestion.category}
                    </span>
                    <span className="text-xs text-gray-500">{suggestion.frequency}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIGoalWritingAssistant;
