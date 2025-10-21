import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Calendar, Award, Filter, Clock, Calendar as CalendarIcon, Trophy, Brain, Grid } from 'lucide-react';
import GoalTracker from '../components/GoalTracker';
import GoalOrganization from '../components/GoalOrganization';
import AIGoalSuggestions from '../components/AIGoalSuggestions';
import AIGoalWritingAssistant from '../components/AIGoalWritingAssistant';
import GamificationSystem from '../components/GamificationSystem';
import { generateId, defaultGoals } from '../lib/utils';

const Goals = ({ goals, onToggleGoal, onAddGoal, onDeleteGoal, entries, user }) => {
  const [activeTab, setActiveTab] = useState('organization');
  const [showStats, setShowStats] = useState(true);
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');
  const [timePeriodFilter, setTimePeriodFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['organization', 'ai-suggestions', 'ai-writing', 'gamification', 'all', 'spiritual', 'health', 'mindfulness', 'service', 'learning'];
  
  const categoryLabels = {
    'organization': 'Organization',
    'ai-suggestions': 'AI Suggestions', 
    'ai-writing': 'AI Writing Assistant',
    'gamification': 'Achievements',
    'all': 'All Goals',
    'spiritual': 'Spiritual',
    'health': 'Health',
    'mindfulness': 'Mindfulness',
    'service': 'Service',
    'learning': 'Learning'
  };
  
  const frequencies = [
    { value: 'all', label: 'All Frequencies' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'custom', label: 'Custom' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const timePeriods = [
    { value: 'all', label: 'All Periods' },
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
    { value: 'anytime', label: 'Anytime' }
  ];

  const getFilteredGoals = () => {
    let filtered = goals;

    // Category filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(goal => goal.category === activeTab);
    }

    // Frequency filter
    if (frequencyFilter !== 'all') {
      filtered = filtered.filter(goal => goal.frequency === frequencyFilter);
    }

    // Date range filter
    if (dateRangeFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(goal => {
        const createdAt = new Date(goal.createdAt);
        switch (dateRangeFilter) {
          case 'today':
            return createdAt.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return createdAt >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return createdAt >= monthAgo;
          case 'quarter':
            const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            return createdAt >= quarterAgo;
          case 'year':
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            return createdAt >= yearAgo;
          default:
            return true;
        }
      });
    }

    // Time period filter
    if (timePeriodFilter !== 'all') {
      filtered = filtered.filter(goal => goal.timePeriod === timePeriodFilter);
    }

    return filtered;
  };

  const filteredGoals = getFilteredGoals();

  const completedToday = goals.filter(goal => goal.completed && 
    goal.lastCompleted && 
    new Date(goal.lastCompleted).toDateString() === new Date().toDateString()
  ).length;

  const totalStreak = goals.reduce((sum, goal) => sum + goal.streak, 0);
  const averageStreak = goals.length > 0 ? Math.round(totalStreak / goals.length) : 0;

  const topGoal = goals.reduce((top, goal) => 
    goal.streak > (top?.streak || 0) ? goal : top, null
  );

  const handleAddGoal = (goalData) => {
    const newGoal = {
      id: generateId(),
      ...goalData,
      streak: 0,
      completed: false,
      createdAt: new Date()
    };
    onAddGoal(newGoal);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-lora font-semibold text-gray-900">Goals & Habits</h1>
          <p className="text-gray-600">{goals.length} active goals</p>
        </div>
        <button
          onClick={() => setShowStats(!showStats)}
          className="btn-secondary flex items-center space-x-2"
        >
          <TrendingUp className="h-4 w-4" />
          <span>{showStats ? 'Hide Stats' : 'Show Stats'}</span>
        </button>
      </div>

      {/* Stats Cards */}
      {showStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="card text-center">
            <div className="p-3 bg-green-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{completedToday}</h3>
            <p className="text-sm text-gray-600">Completed Today</p>
          </div>

          <div className="card text-center">
            <div className="p-3 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{averageStreak}</h3>
            <p className="text-sm text-gray-600">Average Streak</p>
          </div>

          <div className="card text-center">
            <div className="p-3 bg-purple-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{goals.length}</h3>
            <p className="text-sm text-gray-600">Total Goals</p>
          </div>

          <div className="card text-center">
            <div className="p-3 bg-yellow-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{topGoal?.streak || 0}</h3>
            <p className="text-sm text-gray-600">Best Streak</p>
          </div>
        </motion.div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              activeTab === category
                ? 'bg-vesi-deep text-white'
                : 'bg-vesi-blue text-vesi-deep hover:bg-blue-100'
            }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filter & Organize</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </motion.button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl"
          >
            {/* Frequency Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Frequency
              </label>
              <select
                value={frequencyFilter}
                onChange={(e) => setFrequencyFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-vesi-accent focus:border-transparent transition-all duration-200"
              >
                {frequencies.map((freq) => (
                  <option key={freq.value} value={freq.value}>
                    {freq.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CalendarIcon className="h-4 w-4 inline mr-1" />
                Date Range
              </label>
              <select
                value={dateRangeFilter}
                onChange={(e) => setDateRangeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-vesi-accent focus:border-transparent transition-all duration-200"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Period Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Time Period
              </label>
              <select
                value={timePeriodFilter}
                onChange={(e) => setTimePeriodFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-vesi-accent focus:border-transparent transition-all duration-200"
              >
                {timePeriods.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        {/* Active Filters Display */}
        {(frequencyFilter !== 'all' || dateRangeFilter !== 'all' || timePeriodFilter !== 'all') && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-600">Active filters:</span>
            {frequencyFilter !== 'all' && (
              <span className="px-3 py-1 bg-vesi-blue text-vesi-deep rounded-full text-sm">
                {frequencies.find(f => f.value === frequencyFilter)?.label}
              </span>
            )}
            {dateRangeFilter !== 'all' && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {dateRanges.find(r => r.value === dateRangeFilter)?.label}
              </span>
            )}
            {timePeriodFilter !== 'all' && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {timePeriods.find(p => p.value === timePeriodFilter)?.label}
              </span>
            )}
            <button
              onClick={() => {
                setFrequencyFilter('all');
                setDateRangeFilter('all');
                setTimePeriodFilter('all');
              }}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'organization' && (
        <GoalOrganization
          goals={goals}
          onToggleGoal={onToggleGoal}
          onDeleteGoal={onDeleteGoal}
          onEditGoal={() => {}}
        />
      )}
      
      {activeTab === 'ai-suggestions' && (
        <AIGoalSuggestions
          onAddGoal={onAddGoal}
          userGoals={goals}
        />
      )}
      
      {activeTab === 'ai-writing' && (
        <AIGoalWritingAssistant
          onAddGoal={onAddGoal}
          userGoals={goals}
        />
      )}
      
      {activeTab === 'gamification' && (
        <GamificationSystem
          goals={goals}
          entries={entries}
          user={user}
        />
      )}
      
      {(activeTab === 'all' || ['spiritual', 'health', 'mindfulness', 'service', 'learning'].includes(activeTab)) && (
        <GoalTracker
          goals={filteredGoals}
          onToggleGoal={onToggleGoal}
          onAddGoal={handleAddGoal}
        />
      )}

      {/* Empty State */}
      {goals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Start Your Growth Journey
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Set meaningful goals and build positive habits to grow spiritually and personally.
          </p>
          <div className="space-y-4 max-w-md mx-auto">
            <h4 className="font-medium text-gray-900">Suggested Goals:</h4>
            <div className="grid gap-2">
              {defaultGoals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-vesi-blue rounded-lg">
                    <Target className="h-4 w-4 text-vesi-deep" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{goal.title}</p>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Goals;
