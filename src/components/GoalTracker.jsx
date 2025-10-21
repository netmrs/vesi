import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Target, Flame, Calendar, Plus } from 'lucide-react';

const GoalTracker = ({ goals, onToggleGoal, onAddGoal }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ 
    title: '', 
    description: '', 
    category: 'spiritual',
    frequency: 'daily',
    timePeriod: 'anytime'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGoal.title.trim()) {
      onAddGoal(newGoal);
      setNewGoal({ title: '', description: '', category: 'spiritual', frequency: 'daily', timePeriod: 'anytime' });
      setShowAddForm(false);
    }
  };

  const getStreakColor = (streak) => {
    if (streak >= 30) return 'text-purple-600';
    if (streak >= 7) return 'text-green-600';
    if (streak >= 3) return 'text-yellow-600';
    return 'text-gray-500';
  };

  const getStreakBg = (streak) => {
    if (streak >= 30) return 'bg-purple-100';
    if (streak >= 7) return 'bg-green-100';
    if (streak >= 3) return 'bg-yellow-100';
    return 'bg-gray-100';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-lora font-semibold text-gray-900">Goals & Habits</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-secondary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Goal</span>
        </motion.button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="card"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal Title
              </label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="input-field"
                placeholder="e.g., Daily Prayer"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="input-field"
                rows="3"
                placeholder="Describe your goal..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  className="input-field"
                >
                  <option value="spiritual">Spiritual</option>
                  <option value="health">Health</option>
                  <option value="mindfulness">Mindfulness</option>
                  <option value="service">Service</option>
                  <option value="learning">Learning</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select
                  value={newGoal.frequency}
                  onChange={(e) => setNewGoal({ ...newGoal, frequency: e.target.value })}
                  className="input-field"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Period
                </label>
                <select
                  value={newGoal.timePeriod}
                  onChange={(e) => setNewGoal({ ...newGoal, timePeriod: e.target.value })}
                  className="input-field"
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                  <option value="anytime">Anytime</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                Add Goal
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid gap-4">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onToggleGoal(goal.id)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    goal.completed
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {goal.completed && <Check className="h-4 w-4" />}
                </motion.button>
                
                <div>
                  <h3 className={`font-medium ${goal.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {goal.title}
                  </h3>
                  {goal.description && (
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  )}
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {goal.frequency || 'daily'}
                    </span>
                    {goal.timePeriod && goal.timePeriod !== 'anytime' && (
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        {goal.timePeriod}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className={`text-sm font-semibold ${getStreakColor(goal.streak)}`}>
                    {goal.streak}
                  </span>
                </div>
                
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStreakBg(goal.streak)} ${getStreakColor(goal.streak)}`}>
                  {goal.category}
                </div>
              </div>
            </div>

            {goal.lastCompleted && (
              <div className="mt-3 flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                Last completed: {new Date(goal.lastCompleted).toLocaleDateString()}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {goals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
          <p className="text-gray-500 mb-4">Start your journey by adding your first goal or habit.</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            Add Your First Goal
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default GoalTracker;
