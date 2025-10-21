import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Music, 
  Palette, 
  Headphones, 
  Video, 
  BookOpen,
  Search,
  Filter,
  Heart,
  Download,
  ExternalLink,
  Star,
  Clock,
  Users
} from 'lucide-react';
import MusicIntegration from '../components/MusicIntegration';
import VisualRecommendations from '../components/VisualRecommendations';

const Media = ({ user, goals = [], savedScriptures = [] }) => {
  const [activeTab, setActiveTab] = useState('music');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [wellnessFilter, setWellnessFilter] = useState('all');

  const tabs = [
    { id: 'music', label: 'Music & Playlists', icon: Music },
    { id: 'visuals', label: 'Visuals & Printables', icon: Palette },
    { id: 'podcasts', label: 'Podcasts', icon: Headphones },
    { id: 'videos', label: 'Videos & Movies', icon: Video },
    { id: 'books', label: 'Books & Audiobooks', icon: BookOpen }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Content' },
    { value: 'goals', label: 'Based on My Goals' },
    { value: 'trending', label: 'Trending' },
    { value: 'new', label: 'New Releases' },
    { value: 'favorites', label: 'My Favorites' }
  ];

  const wellnessCategories = [
    { value: 'all', label: 'All Wellness' },
    { value: 'spiritual', label: 'Spiritual Growth' },
    { value: 'mental', label: 'Mental Health' },
    { value: 'physical', label: 'Physical Fitness' },
    { value: 'emotional', label: 'Emotional Wellness' },
    { value: 'social', label: 'Social Connection' }
  ];

  // Mock data for different media types
  const podcasts = [
    {
      id: 1,
      title: 'The Daily Meditation',
      host: 'Mindfulness Academy',
      duration: '15 min',
      category: 'Mindfulness',
      description: 'Daily guided meditations for stress relief and mental clarity',
      rating: 4.8,
      episodes: 365,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
      topics: ['Meditation', 'Stress Relief', 'Mindfulness']
    },
    {
      id: 2,
      title: 'Wellness Wednesday',
      host: 'Health & Wellness Podcast',
      duration: '45 min',
      category: 'Health',
      description: 'Weekly discussions on holistic health and wellness practices',
      rating: 4.7,
      episodes: 52,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
      topics: ['Nutrition', 'Fitness', 'Mental Health']
    },
    {
      id: 3,
      title: 'Spiritual Growth Journey',
      host: 'Faith & Spirituality Network',
      duration: '30 min',
      category: 'Spirituality',
      description: 'Exploring spiritual practices and personal growth',
      rating: 4.9,
      episodes: 78,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      topics: ['Prayer', 'Meditation', 'Spiritual Growth']
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Morning Yoga Flow',
      creator: 'Wellness Studio',
      duration: '20 min',
      category: 'Fitness',
      description: 'Gentle yoga sequence to start your day with energy',
      rating: 4.8,
      views: '2.3M',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
      topics: ['Yoga', 'Morning Routine', 'Fitness']
    },
    {
      id: 2,
      title: 'Mindfulness Meditation',
      creator: 'Peaceful Mind',
      duration: '10 min',
      category: 'Meditation',
      description: 'Guided meditation for stress relief and inner peace',
      rating: 4.9,
      views: '1.8M',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      topics: ['Meditation', 'Stress Relief', 'Mindfulness']
    },
    {
      id: 3,
      title: 'Healthy Cooking Basics',
      creator: 'Nutrition Kitchen',
      duration: '25 min',
      category: 'Nutrition',
      description: 'Simple recipes for healthy, delicious meals',
      rating: 4.7,
      views: '1.2M',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=200&fit=crop',
      topics: ['Cooking', 'Nutrition', 'Healthy Eating']
    }
  ];

  const books = [
    {
      id: 1,
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      type: 'Book',
      category: 'Spirituality',
      description: 'A guide to spiritual enlightenment through present moment awareness',
      rating: 4.8,
      pages: 236,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop',
      topics: ['Mindfulness', 'Spiritual Growth', 'Self-Help']
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      type: 'Audiobook',
      category: 'Personal Development',
      description: 'An easy way to build good habits and break bad ones',
      rating: 4.9,
      pages: 320,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop',
      topics: ['Habits', 'Productivity', 'Self-Improvement']
    },
    {
      id: 3,
      title: 'The Body Keeps the Score',
      author: 'Bessel van der Kolk',
      type: 'Book',
      category: 'Mental Health',
      description: 'Brain, mind, and body in the healing of trauma',
      rating: 4.7,
      pages: 464,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=300&fit=crop',
      topics: ['Trauma', 'Mental Health', 'Healing']
    }
  ];

  const renderMediaCard = (item, type) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className={`${type === 'books' ? 'w-16 h-24' : 'w-20 h-20'} rounded-lg object-cover`}
          />
          {type === 'videos' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
              <Play className="h-6 w-6 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
              <p className="text-xs text-gray-600">
                {type === 'podcasts' && item.host}
                {type === 'videos' && item.creator}
                {type === 'books' && item.author}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs font-medium">{item.rating}</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.description}</p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {item.category}
              </span>
              {type === 'podcasts' && (
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{item.duration}</span>
                </span>
              )}
              {type === 'videos' && (
                <span className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{item.views}</span>
                </span>
              )}
              {type === 'books' && (
                <span className="flex items-center space-x-1">
                  <BookOpen className="h-3 w-3" />
                  <span>{item.pages} pages</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {item.topics.slice(0, 2).map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'music':
        return (
          <div className="space-y-6">
            <MusicIntegration 
              userFaith={user?.faith}
              userGoals={goals}
              savedScriptures={savedScriptures}
            />
          </div>
        );

      case 'visuals':
        return (
          <div className="space-y-6">
            <VisualRecommendations 
              userFaith={user?.faith}
              savedScriptures={savedScriptures}
              userGoals={goals}
            />
          </div>
        );

      case 'podcasts':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recommended Podcasts</h3>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search podcasts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field text-sm w-48"
                />
              </div>
            </div>
            <div className="grid gap-4">
              {podcasts.map((podcast) => renderMediaCard(podcast, 'podcasts'))}
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Wellness Videos</h3>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field text-sm w-48"
                />
              </div>
            </div>
            <div className="grid gap-4">
              {videos.map((video) => renderMediaCard(video, 'videos'))}
            </div>
          </div>
        );

      case 'books':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Books & Audiobooks</h3>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field text-sm w-48"
                />
              </div>
            </div>
            <div className="grid gap-4">
              {books.map((book) => renderMediaCard(book, 'books'))}
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
          <Play className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-lora font-bold text-gray-900 mb-2">
          Media & Content
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover music, podcasts, videos, books, and visual content to support your wellness journey.
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

      {/* Filtering Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search media..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="input-field text-sm"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <select
              value={wellnessFilter}
              onChange={(e) => setWellnessFilter(e.target.value)}
              className="input-field text-sm"
            >
              {wellnessCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
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

export default Media;
