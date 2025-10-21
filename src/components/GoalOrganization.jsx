import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  List, 
  Grid, 
  Table, 
  Calendar, 
  Trophy, 
  Star, 
  Flame, 
  Target,
  Plus,
  Filter,
  SortAsc,
  Award,
  Zap,
  Crown,
  Gem
} from 'lucide-react';

const GoalOrganization = ({ goals, onToggleGoal, onDeleteGoal, onEditGoal }) => {
  const [viewMode, setViewMode] = useState('list'); // list, grid, table, calendar
  const [sortBy, setSortBy] = useState('streak'); // streak, created, category, completion
  const [filterCategory, setFilterCategory] = useState('all');

  // Gamification system
  const calculateLevel = (totalStreak) => {
    if (totalStreak >= 100) return { level: 5, title: 'Spiritual Master', icon: Crown, color: 'text-yellow-600' };
    if (totalStreak >= 75) return { level: 4, title: 'Faithful Disciple', icon: Trophy, color: 'text-purple-600' };
    if (totalStreak >= 50) return { level: 3, title: 'Devoted Follower', icon: Star, color: 'text-blue-600' };
    if (totalStreak >= 25) return { level: 2, title: 'Growing Believer', icon: Flame, color: 'text-green-600' };
    return { level: 1, title: 'Seeker', icon: Target, color: 'text-gray-600' };
  };

  const totalStreak = goals.reduce((sum, goal) => sum + goal.streak, 0);
  const userLevel = calculateLevel(totalStreak);
  const LevelIcon = userLevel.icon;

  const getAchievements = (goal) => {
    const achievements = [];
    if (goal.streak >= 7) achievements.push({ name: 'Week Warrior', icon: Trophy, color: 'text-yellow-600' });
    if (goal.streak >= 30) achievements.push({ name: 'Month Master', icon: Star, color: 'text-blue-600' });
    if (goal.streak >= 100) achievements.push({ name: 'Century Champion', icon: Crown, color: 'text-purple-600' });
    if (goal.category === 'spiritual') achievements.push({ name: 'Spiritual Seeker', icon: Gem, color: 'text-green-600' });
    return achievements;
  };

  const sortedAndFilteredGoals = goals
    .filter(goal => filterCategory === 'all' || goal.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'streak':
          return b.streak - a.streak;
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'completion':
          return b.completed - a.completed;
        default:
          return 0;
      }
    });

  const viewModes = [
    { id: 'list', label: 'List', icon: List },
    { id: 'grid', label: 'Grid', icon: Grid },
    { id: 'table', label: 'Table', icon: Table },
    { id: 'calendar', label: 'Calendar', icon: Calendar }
  ];

  const sortOptions = [
    { value: 'streak', label: 'Streak (High to Low)' },
    { value: 'created', label: 'Recently Created' },
    { value: 'category', label: 'Category' },
    { value: 'completion', label: 'Completion Status' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'spiritual', label: 'Spiritual' },
    { value: 'personal', label: 'Personal' },
    { value: 'health', label: 'Health' },
    { value: 'service', label: 'Service' }
  ];

  const renderListView = () => (
    <div className="space-y-4">
      {sortedAndFilteredGoals.map((goal, index) => {
        const achievements = getAchievements(goal);
        return (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onToggleGoal(goal.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    goal.completed 
                      ? 'bg-vesi-deep border-vesi-deep text-white' 
                      : 'border-gray-300 hover:border-vesi-deep'
                  }`}
                >
                  {goal.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </button>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-700">{goal.streak} day streak</span>
                    </div>
                    
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      goal.category === 'spiritual' ? 'bg-blue-100 text-blue-800' :
                      goal.category === 'personal' ? 'bg-green-100 text-green-800' :
                      goal.category === 'health' ? 'bg-red-100 text-red-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {goal.category}
                    </span>
                    
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                      {goal.frequency}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Achievements */}
                <div className="flex items-center space-x-1">
                  {achievements.slice(0, 2).map((achievement, i) => {
                    const AchievementIcon = achievement.icon;
                    return (
                      <div key={i} className="relative group">
                        <AchievementIcon className={`h-5 w-5 ${achievement.color}`} />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {achievement.name}
                        </div>
                      </div>
                    );
                  })}
                  {achievements.length > 2 && (
                    <span className="text-xs text-gray-500">+{achievements.length - 2}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedAndFilteredGoals.map((goal, index) => {
        const achievements = getAchievements(goal);
        return (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onToggleGoal(goal.id)}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  goal.completed ? 'bg-vesi-deep' : 'bg-gray-100'
                }`}>
                  {goal.completed ? (
                    <Trophy className="h-8 w-8 text-white" />
                  ) : (
                    <Target className="h-8 w-8 text-gray-600" />
                  )}
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{goal.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{goal.description}</p>
              
              <div className="flex items-center justify-center space-x-1 mb-4">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">{goal.streak} days</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {achievements.slice(0, 3).map((achievement, i) => {
                  const AchievementIcon = achievement.icon;
                  return (
                    <AchievementIcon key={i} className={`h-4 w-4 ${achievement.color}`} />
                  );
                })}
              </div>
              
              <div className="flex justify-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  goal.category === 'spiritual' ? 'bg-blue-100 text-blue-800' :
                  goal.category === 'personal' ? 'bg-green-100 text-green-800' :
                  goal.category === 'health' ? 'bg-red-100 text-red-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {goal.category}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-700">Goal</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Streak</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Frequency</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Achievements</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredGoals.map((goal, index) => {
            const achievements = getAchievements(goal);
            return (
              <motion.tr
                key={goal.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onToggleGoal(goal.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        goal.completed 
                          ? 'bg-vesi-deep border-vesi-deep text-white' 
                          : 'border-gray-300 hover:border-vesi-deep'
                      }`}
                    >
                      {goal.completed && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </button>
                    <div>
                      <div className="font-medium text-gray-900">{goal.title}</div>
                      <div className="text-sm text-gray-600">{goal.description}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    goal.category === 'spiritual' ? 'bg-blue-100 text-blue-800' :
                    goal.category === 'personal' ? 'bg-green-100 text-green-800' :
                    goal.category === 'health' ? 'bg-red-100 text-red-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {goal.category}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{goal.streak}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{goal.frequency}</td>
                <td className="py-4 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    goal.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {goal.completed ? 'Completed' : 'Active'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1">
                    {achievements.slice(0, 3).map((achievement, i) => {
                      const AchievementIcon = achievement.icon;
                      return (
                        <AchievementIcon key={i} className={`h-4 w-4 ${achievement.color}`} />
                      );
                    })}
                    {achievements.length > 3 && (
                      <span className="text-xs text-gray-500">+{achievements.length - 3}</span>
                    )}
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* User Level & Stats */}
      <div className="card bg-gradient-to-br from-vesi-deep to-vesi-accent text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <LevelIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userLevel.title}</h2>
              <p className="text-white text-opacity-80">Level {userLevel.level}</p>
              <p className="text-sm text-white text-opacity-70">
                Total Streak: {totalStreak} days
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold">{goals.length}</div>
            <div className="text-sm text-white text-opacity-80">Active Goals</div>
            <div className="text-sm text-white text-opacity-80">
              {goals.filter(g => g.completed).length} Completed
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          {viewModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  viewMode === mode.id
                    ? 'bg-vesi-deep text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{mode.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input-field text-sm"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Goal Views */}
      {viewMode === 'list' && renderListView()}
      {viewMode === 'grid' && renderGridView()}
      {viewMode === 'table' && renderTableView()}
      {viewMode === 'calendar' && (
        <div className="card">
          <p className="text-center text-gray-600 py-8">
            Calendar view coming soon! 📅
          </p>
        </div>
      )}
    </div>
  );
};

export default GoalOrganization;

