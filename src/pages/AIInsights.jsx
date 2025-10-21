import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, BookOpen, Heart, Lightbulb, MessageCircle, Sparkles, Zap } from 'lucide-react';
import AIDemo from '../components/AIDemo';

const AIInsights = ({ entries, goals, user, onOpenChat }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Wellness Overview', icon: Heart },
    { id: 'goals', label: 'Goal Insights', icon: TrendingUp },
    { id: 'journal', label: 'Journal Wisdom', icon: BookOpen },
    { id: 'chat', label: 'AI Companion', icon: MessageCircle },
    { id: 'demo', label: 'AI Demo', icon: Zap }
  ];

  // Mock AI analysis data (in real app, this would come from AI API)
  const wellnessOverview = {
    growthTrend: 'positive',
    consistencyScore: 85,
    wellnessThemes: ['Mindfulness', 'Gratitude', 'Fitness', 'Relationships'],
    insights: [
      'I see your commitment to holistic wellness shining through your consistent mindfulness and gratitude practices.',
      'Your dedication to physical fitness and mental health is creating a strong foundation for personal growth.',
      'There\'s a beautiful pattern of relationship-building and self-reflection in your journey—you\'re becoming your best self.'
    ],
    recommendations: [
      'Your gratitude practice is flourishing—consider how this enhances your relationships and daily interactions',
      'Your fitness routine is building discipline—explore how this strength transfers to other life areas',
      'Your mindfulness journey is deepening—how might this enhance your spiritual and emotional wellness?'
    ],
    wellnessStudies: [
      {
        topic: 'The Power of Gratitude',
        sources: ['Mindfulness Research', 'Positive Psychology', 'Wellness Studies'],
        description: 'Explore how gratitude transforms our mental health and relationships'
      },
      {
        topic: 'Mindfulness and Transformation',
        sources: ['Meditation Studies', 'Stress Reduction Research', 'Wellness Practices'],
        description: 'Study how mindfulness shapes our emotional well-being and decisions'
      },
      {
        topic: 'Service and Community',
        sources: ['Social Wellness Research', 'Community Health Studies', 'Volunteer Impact'],
        description: 'Discover how serving others enhances our own wellness and purpose'
      }
    ]
  };

  const goalInsights = {
    totalGoals: goals.length,
    completionRate: 75,
    longestStreak: Math.max(...goals.map(g => g.streak)),
    insights: [
      `You're maintaining a ${wellnessOverview.consistencyScore}% consistency rate with your wellness goals—this dedication is transforming your life.`,
      `Your ${Math.max(...goals.map(g => g.streak))}-day streak shows remarkable dedication—each day you're choosing to become more Christlike.`,
      'Your spiritual goals aren\'t just about productivity—they\'re about transformation through daily faithfulness.'
    ],
    suggestions: [
      'Consider how your weekly progress reflects God\'s work in your heart—what patterns of growth do you see?',
      'Your prayer habit is building a strong foundation—how is this transforming your relationships and decisions?',
      'Your scripture reading is planting seeds of wisdom—what truths are taking root in your daily life?'
    ],
    scriptureStudies: [
      {
        topic: 'Faithfulness and Stewardship',
        verses: ['1 Corinthians 4:2', 'Luke 16:10', 'Galatians 6:9'],
        description: 'Study what it means to be faithful in small things'
      },
      {
        topic: 'Spiritual Disciplines',
        verses: ['1 Timothy 4:7-8', 'Hebrews 12:11', '2 Peter 1:5-8'],
        description: 'Explore how spiritual practices shape our character'
      },
      {
        topic: 'Perseverance in Faith',
        verses: ['James 1:2-4', 'Romans 5:3-5', 'Hebrews 10:36'],
        description: 'Learn about growing through consistent spiritual practices'
      }
    ]
  };

  const journalWisdom = {
    totalEntries: entries.length,
    recentThemes: ['Mindfulness', 'Growth', 'Relationships'],
    emotionalTone: 'positive',
    insights: [
      'Your recent entries reveal a person growing in peace and purpose—your wellness journey is showing positive results.',
      'Your frequent reflections on helping others show a heart becoming more compassionate and community-minded.',
      'Your writing documents a deepening relationship with mindfulness and gratitude—each entry is a step toward your best self.'
    ],
    patterns: [
      'Your writing flows most naturally during times of reflection and mindfulness—this is where you process and grow',
      'Service and helping others is a recurring theme—your heart is being shaped by compassion and community connection',
      'Your entries often end with expressions of gratitude—this practice is cultivating a positive mindset and emotional wellness'
    ],
    scriptureStudies: [
      {
        topic: 'The Heart\'s Transformation',
        verses: ['Ezekiel 36:26', '2 Corinthians 3:18', 'Romans 12:2'],
        description: 'Study how God transforms our hearts through reflection and prayer'
      },
      {
        topic: 'Love in Action',
        verses: ['1 John 3:18', 'Matthew 25:35-40', 'Acts 20:35'],
        description: 'Explore how serving others demonstrates Christ\'s love'
      },
      {
        topic: 'Thankful Hearts',
        verses: ['Psalm 107:1', 'Ephesians 5:20', 'Colossians 2:6-7'],
        description: 'Discover how gratitude shapes our spiritual perspective'
      }
    ]
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-lora font-semibold text-gray-900 mb-2">
                Your Spiritual Journey
              </h3>
              <p className="text-gray-600">
                AI-powered insights into your faith and growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card text-center">
                <div className="p-3 bg-green-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{wellnessOverview.consistencyScore}%</h4>
                <p className="text-sm text-gray-600">Consistency Score</p>
              </div>

              <div className="card text-center">
                <div className="p-3 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{entries.length}</h4>
                <p className="text-sm text-gray-600">Journal Entries</p>
              </div>

              <div className="card text-center">
                <div className="p-3 bg-purple-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{goals.length}</h4>
                <p className="text-sm text-gray-600">Active Goals</p>
              </div>
            </div>

            <div className="card">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                AI Insights
              </h4>
              <ul className="space-y-3">
                {wellnessOverview.insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-vesi-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{insight}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Recommendations
              </h4>
              <ul className="space-y-3 mb-6">
                {wellnessOverview.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-vesi-deep" />
                Wellness Study Topics
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Based on your wellness journey, here are study topics that will deepen your understanding and growth:
              </p>
              <div className="space-y-4">
                {wellnessOverview.wellnessStudies.map((study, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-vesi-light to-white border border-vesi-blue rounded-lg"
                  >
                    <h5 className="font-semibold text-vesi-deep mb-2">{study.topic}</h5>
                    <p className="text-gray-600 text-sm mb-3">{study.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {study.sources.map((source, sourceIndex) => (
                        <span
                          key={sourceIndex}
                          className="px-3 py-1 bg-vesi-blue text-vesi-deep rounded-full text-sm font-medium"
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-lora font-semibold text-gray-900 mb-2">
                Goal Progress Analysis
              </h3>
              <p className="text-gray-600">
                AI insights on your habit tracking and spiritual goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card text-center">
                <div className="p-3 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{goalInsights.completionRate}%</h4>
                <p className="text-sm text-gray-600">Completion Rate</p>
              </div>

              <div className="card text-center">
                <div className="p-3 bg-purple-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{goalInsights.longestStreak}</h4>
                <p className="text-sm text-gray-600">Longest Streak</p>
              </div>
            </div>

            <div className="card">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-vesi-deep" />
                Goal Insights
              </h4>
              <ul className="space-y-3">
                {goalInsights.insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-vesi-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{insight}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                AI Suggestions
              </h4>
              <ul className="space-y-3 mb-6">
                {goalInsights.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{suggestion}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-vesi-deep" />
                Scripture Study Topics
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                These scripture studies will help you understand the spiritual significance of your goals and habits:
              </p>
              <div className="space-y-4">
                {goalInsights.scriptureStudies.map((study, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-green-50 to-white border border-green-200 rounded-lg"
                  >
                    <h5 className="font-semibold text-green-800 mb-2">{study.topic}</h5>
                    <p className="text-gray-600 text-sm mb-3">{study.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {study.verses.map((verse, verseIndex) => (
                        <span
                          key={verseIndex}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {verse}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'journal':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-vesi-accent to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-lora font-semibold text-gray-900 mb-2">
                Journal Wisdom
              </h3>
              <p className="text-gray-600">
                AI analysis of your reflections and spiritual insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card text-center">
                <div className="p-3 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{journalWisdom.totalEntries}</h4>
                <p className="text-sm text-gray-600">Total Entries</p>
              </div>

              <div className="card text-center">
                <div className="p-3 bg-green-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 capitalize">{journalWisdom.emotionalTone}</h4>
                <p className="text-sm text-gray-600">Overall Tone</p>
              </div>

              <div className="card text-center">
                <div className="p-3 bg-purple-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{journalWisdom.recentThemes.length}</h4>
                <p className="text-sm text-gray-600">Key Themes</p>
              </div>
            </div>

            <div className="card">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-vesi-deep" />
                AI Analysis
              </h4>
              <ul className="space-y-3">
                {journalWisdom.insights.map((insight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-vesi-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{insight}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                Writing Patterns
              </h4>
              <ul className="space-y-3 mb-6">
                {journalWisdom.patterns.map((pattern, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{pattern}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-vesi-deep" />
                Scripture Study Topics
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                These scripture studies will deepen your understanding of the themes in your journal reflections:
              </p>
              <div className="space-y-4">
                {journalWisdom.scriptureStudies.map((study, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-purple-50 to-white border border-purple-200 rounded-lg"
                  >
                    <h5 className="font-semibold text-purple-800 mb-2">{study.topic}</h5>
                    <p className="text-gray-600 text-sm mb-3">{study.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {study.verses.map((verse, verseIndex) => (
                        <span
                          key={verseIndex}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                        >
                          {verse}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-lora font-semibold text-gray-900 mb-2">
                AI Spiritual Companion
              </h3>
              <p className="text-gray-600">
                Chat with AI for personalized spiritual guidance
              </p>
            </div>

            <div className="card">
              <div className="bg-gradient-to-br from-vesi-light to-vesi-blue rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-vesi-deep mb-2">Ready to Chat?</h4>
                <p className="text-vesi-deep text-sm mb-4">
                  Your AI spiritual companion is ready to provide guidance, answer questions, and offer encouragement based on your journal entries and goals.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenChat}
                  className="btn-primary flex items-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Start Conversation</span>
                </motion.button>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Suggested Topics:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Goal Guidance</h5>
                    <p className="text-sm text-gray-600">Get personalized advice on your spiritual goals and habits</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Journal Reflection</h5>
                    <p className="text-sm text-gray-600">Discuss insights from your recent journal entries</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Spiritual Questions</h5>
                    <p className="text-sm text-gray-600">Ask questions about faith, prayer, or spiritual growth</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Daily Encouragement</h5>
                    <p className="text-sm text-gray-600">Receive personalized encouragement and motivation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'demo':
        return <AIDemo />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-lora font-semibold text-gray-900">AI Insights</h1>
          <p className="text-gray-600">Personalized spiritual guidance powered by AI</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="btn-primary flex items-center space-x-2"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              <span>Refresh Insights</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-vesi-deep text-white'
                  : 'bg-vesi-blue text-vesi-deep hover:bg-blue-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

export default AIInsights;
