import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, BookOpen, TrendingUp, Heart, Brain, MessageCircle, Globe } from 'lucide-react';
import ReflectionCard from '../components/ReflectionCard';
import EntryCard from '../components/EntryCard';
import VesiLogo from '../components/VesiLogo';
import AdPlacement from '../components/AdPlacement';
import APIStatus from '../components/APIStatus';

const Home = ({ entries, onAddEntry, onEditEntry, onDeleteEntry, onTagClick, onOpenAIChat }) => {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickEntry, setQuickEntry] = useState({ title: '', content: '' });

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (quickEntry.title.trim() && quickEntry.content.trim()) {
      onAddEntry({
        ...quickEntry,
        tags: [],
        createdAt: new Date()
      });
      setQuickEntry({ title: '', content: '' });
      setShowQuickAdd(false);
    }
  };

  const recentEntries = entries.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Streamlined Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-6"
      >
        <div className="flex justify-center mb-3">
          <VesiLogo size="medium" animate={true} />
        </div>
        <h1 className="text-2xl font-lora font-semibold text-vesi-deep mb-1">
          Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}
        </h1>
        <p className="text-gray-600 text-sm">
          Your wellness journey continues
        </p>
      </motion.div>

      {/* API Status */}
      <APIStatus />

      {/* AI Insights Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-l-purple-500"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">AI Wellness Insights</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-lora font-semibold text-gray-900 mb-2">
            Your Wellness Journey Analysis
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Based on your journal entries and goals, I can see you're making great progress in your personal growth. 
            Your consistency with healthy habits is impressive, and your commitment to self-improvement shows in your reflections.
          </p>
        </div>

        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenAIChat}
            className="btn-primary flex items-center space-x-2 text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat with AI</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.hash = '#ai-insights'}
            className="btn-secondary flex items-center space-x-2 text-sm"
          >
            <Brain className="h-4 w-4" />
            <span>View Insights</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Daily Reflection */}
      <ReflectionCard onJournalReflection={(reflection) => {
        setQuickEntry({
          title: `Reflection: ${reflection.category}`,
          content: `Today's reflection: "${reflection.text}"\n\nMy thoughts: `
        });
        setShowQuickAdd(true);
      }} />

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 gap-3"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowQuickAdd(true)}
          className="bg-gradient-to-br from-vesi-light to-white rounded-xl p-4 border border-vesi-blue hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-vesi-deep rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Quick Entry</h3>
              <p className="text-xs text-gray-600">Capture a thought</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-200 hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Journal</h3>
              <p className="text-xs text-gray-600">Browse entries</p>
            </div>
          </div>
        </motion.button>

      </motion.div>

      {/* Ad Placement */}
      <AdPlacement type="banner" category="wellness" />

      {/* Quick Add Form */}
      {showQuickAdd && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="card"
        >
          <form onSubmit={handleQuickAdd} className="space-y-4">
            <div>
              <input
                type="text"
                value={quickEntry.title}
                onChange={(e) => setQuickEntry({ ...quickEntry, title: e.target.value })}
                placeholder="Entry title..."
                className="input-field"
                required
              />
            </div>
            <div>
              <textarea
                value={quickEntry.content}
                onChange={(e) => setQuickEntry({ ...quickEntry, content: e.target.value })}
                placeholder="What's on your heart today?"
                className="input-field"
                rows="4"
                required
              />
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                Save Entry
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowQuickAdd(false);
                  setQuickEntry({ title: '', content: '' });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Sponsored Content */}
      <AdPlacement type="sponsored" category="mindfulness" />

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Heart className="h-4 w-4 mr-2 text-vesi-deep" />
              Recent Reflections
            </h2>
            <span className="text-sm text-gray-500">{recentEntries.length} entries</span>
          </div>
          <div className="space-y-3">
            {recentEntries.slice(0, 2).map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <EntryCard
                  entry={entry}
                  onEdit={onEditEntry}
                  onDelete={onDeleteEntry}
                  onTagClick={onTagClick}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {entries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center py-12"
        >
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Start Your Journey
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Begin your spiritual growth journey by adding your first journal entry or reflecting on today's message.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowQuickAdd(true)}
            className="btn-primary"
          >
            Write Your First Entry
          </motion.button>
        </motion.div>
      )}

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card bg-gradient-to-br from-vesi-light to-vesi-blue"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-6 w-6 text-vesi-deep" />
          </div>
          <h3 className="text-xl font-lora font-semibold text-vesi-deep mb-3">
            Our Vision
          </h3>
          <p className="text-vesi-deep text-sm leading-relaxed mb-4">
            Vesi isn't here to make you more productive. It's here to help you become your best self — 
            through holistic wellness, spiritual growth, and personal development.
          </p>
          <p className="text-vesi-deep text-xs">
            Flow with purpose. Grow with light. ✨
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
