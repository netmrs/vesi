import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  Zap, 
  BookOpen, 
  MessageCircle, 
  Target, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle,
  Lightbulb,
  Users,
  Star,
  Play,
  ExternalLink
} from 'lucide-react';

const Mental = ({ user, goals = [], entries = [] }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Brain },
    { id: 'mindfulness', label: 'Mindfulness', icon: Heart },
    { id: 'stress', label: 'Stress Management', icon: Zap },
    { id: 'mood', label: 'Mood Tracking', icon: TrendingUp },
    { id: 'resources', label: 'Resources', icon: BookOpen }
  ];

  // Mock mental health data
  const mentalHealthData = {
    currentMood: 'positive',
    stressLevel: 3,
    mindfulnessStreak: 7,
    weeklyGoals: [
      { id: 1, title: 'Daily meditation', completed: 5, total: 7 },
      { id: 2, title: 'Gratitude journaling', completed: 6, total: 7 },
      { id: 3, title: 'Digital detox hour', completed: 4, total: 7 }
    ],
    insights: [
      'Your mindfulness practice is showing positive results - keep it up!',
      'Stress levels have decreased 20% this week compared to last week',
      'You\'re building great habits for emotional regulation'
    ]
  };

  const mindfulnessExercises = [
    {
      id: 1,
      title: '5-Minute Breathing',
      duration: '5 min',
      description: 'Simple breathing exercise for quick stress relief',
      difficulty: 'Beginner',
      category: 'Breathing'
    },
    {
      id: 2,
      title: 'Body Scan Meditation',
      duration: '15 min',
      description: 'Progressive relaxation through body awareness',
      difficulty: 'Intermediate',
      category: 'Meditation'
    },
    {
      id: 3,
      title: 'Mindful Walking',
      duration: '10 min',
      description: 'Walking meditation for grounding and presence',
      difficulty: 'Beginner',
      category: 'Movement'
    }
  ];

  const stressManagementTips = [
    {
      title: 'Progressive Muscle Relaxation',
      description: 'Systematically tense and release muscle groups',
      icon: Zap,
      color: 'text-blue-500'
    },
    {
      title: 'Cognitive Reframing',
      description: 'Challenge negative thoughts with balanced perspectives',
      icon: Brain,
      color: 'text-green-500'
    },
    {
      title: 'Time Management',
      description: 'Prioritize tasks and set realistic deadlines',
      icon: Clock,
      color: 'text-purple-500'
    },
    {
      title: 'Social Support',
      description: 'Connect with friends, family, or support groups',
      icon: Users,
      color: 'text-orange-500'
    }
  ];

  const moodTrackingData = [
    { day: 'Mon', mood: 4, stress: 3 },
    { day: 'Tue', mood: 5, stress: 2 },
    { day: 'Wed', mood: 4, stress: 4 },
    { day: 'Thu', mood: 5, stress: 2 },
    { day: 'Fri', mood: 4, stress: 3 },
    { day: 'Sat', mood: 5, stress: 1 },
    { day: 'Sun', mood: 5, stress: 2 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Mental Health Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card text-center">
                <div className="p-3 bg-green-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{mentalHealthData.mindfulnessStreak}</h4>
                <p className="text-sm text-gray-600">Day Mindfulness Streak</p>
              </div>

              <div className="card text-center">
                <div className="p-3 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 capitalize">{mentalHealthData.currentMood}</h4>
                <p className="text-sm text-gray-600">Current Mood</p>
              </div>

              <div className="card text-center">
                <div className="p-3 bg-orange-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{mentalHealthData.stressLevel}/10</h4>
                <p className="text-sm text-gray-600">Stress Level</p>
              </div>
            </div>

            {/* Weekly Goals */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-间断 mb-4">This Week's Mental Health Goals</h3>
              <div className="space-y-3">
                {mentalHealthData.weeklyGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{goal.title}</h4>
                      <p className="text-sm text-gray-600">{goal.completed}/{goal.total} completed</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${(goal.completed / goal.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        {Math.round((goal.completed / goal.total) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Mental Health Insights</h3>
                  <p className="text-sm text-gray-600">AI-powered recommendations</p>
                </div>
              </div>
              <div className="space-y-3">
                {mentalHealthData.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'mindfulness':
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              {mindfulnessExercises.map((exercise) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{exercise.title}</h3>
                        <p className="text-sm text-gray-600">{exercise.description}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {exercise.duration}
                          </span>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {exercise.difficulty}
                          </span>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                            {exercise.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary text-sm"
                    >
                      Start
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'stress':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stressManagementTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-5 w-5 ${tip.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                        <p className="text-sm text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case 'mood':
        return (
          <div className="space-y-6">
            {/* Mood Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Mood & Stress Tracking</h3>
              <div className="grid grid-cols-7 gap-2">
                {moodTrackingData.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-500 mb-2">{day.day}</div>
                    <div className="space-y-1">
                      <div className={`w-full h-8 rounded flex items-center justify-center text-xs font-medium ${
                        day.mood >= 4 ? 'bg-green-100 text-green-800' : 
                        day.mood >= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {day.mood}/5
                      </div>
                      <div className={`w-full h-4 rounded text-xs ${
                        day.stress <= 2 ? 'bg-green-100' : 
                        day.stress <= 3 ? 'bg-yellow-100' : 'bg-red-100'
                      }`}>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center space-x-6 mt-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-100 rounded"></div>
                  <span>Mood</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <span>Stress</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'resources':
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Crisis Support</h3>
                    <p className="text-sm text-gray-600">24/7 mental health crisis resources and hotlines</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Mental Health Resources</h3>
                    <p className="text-sm text-gray-600">Articles, guides, and tools for mental wellness</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Support Groups</h3>
                    <p className="text-sm text-gray-600">Connect with others on similar mental health journeys</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              </motion.div>
            </div>
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
          <Brain className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-lora font-bold text-gray-900 mb-2">
          Mental Wellness
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Nurture your mental health through mindfulness, stress management, and emotional well-being practices.
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

export default Mental;
