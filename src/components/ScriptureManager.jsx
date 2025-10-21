import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Heart, 
  Tag, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Star,
  Edit,
  Trash2,
  Copy,
  Share,
  Bookmark
} from 'lucide-react';

const ScriptureManager = ({ savedScriptures = [], onSaveScripture, onDeleteScripture, onUpdateScripture }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterTag, setFilterTag] = useState('all');
  const [selectedScripture, setSelectedScripture] = useState(null);
  const [newScripture, setNewScripture] = useState({
    reference: '',
    text: '',
    category: 'encouragement',
    tags: [],
    notes: '',
    assignedTo: '',
    dateAdded: new Date()
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'encouragement', label: 'Encouragement' },
    { value: 'guidance', label: 'Guidance' },
    { value: 'promises', label: 'Promises' },
    { value: 'wisdom', label: 'Wisdom' },
    { value: 'prayer', label: 'Prayer' },
    { value: 'love', label: 'Love' },
    { value: 'faith', label: 'Faith' },
    { value: 'hope', label: 'Hope' },
    { value: 'peace', label: 'Peace' }
  ];

  const allTags = Array.from(new Set(savedScriptures.flatMap(s => s.tags)));
  const tagOptions = ['all', ...allTags];

  const filteredScriptures = savedScriptures.filter(scripture => {
    const matchesSearch = scripture.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scripture.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scripture.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || scripture.category === filterCategory;
    
    const matchesTag = filterTag === 'all' || scripture.tags.includes(filterTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const handleSaveScripture = () => {
    if (newScripture.reference.trim() && newScripture.text.trim()) {
      onSaveScripture({
        ...newScripture,
        id: Date.now().toString(),
        dateAdded: new Date()
      });
      setNewScripture({
        reference: '',
        text: '',
        category: 'encouragement',
        tags: [],
        notes: '',
        assignedTo: '',
        dateAdded: new Date()
      });
      setShowAddForm(false);
    }
  };

  const handleAddTag = (tag) => {
    if (tag.trim() && !newScripture.tags.includes(tag.trim())) {
      setNewScripture({
        ...newScripture,
        tags: [...newScripture.tags, tag.trim()]
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewScripture({
      ...newScripture,
      tags: newScripture.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      encouragement: 'bg-blue-100 text-blue-800',
      guidance: 'bg-green-100 text-green-800',
      promises: 'bg-purple-100 text-purple-800',
      wisdom: 'bg-yellow-100 text-yellow-800',
      prayer: 'bg-pink-100 text-pink-800',
      love: 'bg-red-100 text-red-800',
      faith: 'bg-indigo-100 text-indigo-800',
      hope: 'bg-orange-100 text-orange-800',
      peace: 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const renderScriptureCard = (scripture) => (
    <motion.div
      key={scripture.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setSelectedScripture(scripture)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{scripture.reference}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            "{scripture.text}"
          </p>
        </div>
        <div className="flex items-center space-x-1 ml-4">
          <Star className="h-4 w-4 text-yellow-500" />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(scripture.category)}`}>
            {scripture.category}
          </span>
          {scripture.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
              {tag}
            </span>
          ))}
          {scripture.tags.length > 2 && (
            <span className="text-xs text-gray-500">+{scripture.tags.length - 2}</span>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(scripture.text);
            }}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy text"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteScripture(scripture.id);
            }}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {scripture.assignedTo && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Bookmark className="h-4 w-4 text-vesi-deep" />
            <span className="text-sm text-gray-600">Assigned to: {scripture.assignedTo}</span>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Scripture Library</h2>
            <p className="text-sm text-gray-600">{savedScriptures.length} saved scriptures</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Scripture</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search scriptures, references, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="input-field"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="input-field"
          >
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag === 'all' ? 'All Tags' : tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Scripture Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Scripture</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scripture Reference
              </label>
              <input
                type="text"
                placeholder="e.g., John 3:16, Psalm 23:1-3"
                value={newScripture.reference}
                onChange={(e) => setNewScripture({ ...newScripture, reference: e.target.value })}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scripture Text
              </label>
              <textarea
                placeholder="Enter the scripture text here..."
                value={newScripture.text}
                onChange={(e) => setNewScripture({ ...newScripture, text: e.target.value })}
                className="input-field h-24 resize-none"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newScripture.category}
                  onChange={(e) => setNewScripture({ ...newScripture, category: e.target.value })}
                  className="input-field"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign to Goal/Area
                </label>
                <input
                  type="text"
                  placeholder="e.g., Daily Prayer, Patience Practice"
                  value={newScripture.assignedTo}
                  onChange={(e) => setNewScripture({ ...newScripture, assignedTo: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {newScripture.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-vesi-blue text-vesi-deep rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add tags (press Enter to add)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Notes
              </label>
              <textarea
                placeholder="Add your personal thoughts, insights, or how this scripture applies to your life..."
                value={newScripture.notes}
                onChange={(e) => setNewScripture({ ...newScripture, notes: e.target.value })}
                className="input-field h-20 resize-none"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveScripture}
                className="btn-primary flex items-center space-x-2"
              >
                <Heart className="h-4 w-4" />
                <span>Save Scripture</span>
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scripture List */}
      <div className="space-y-4">
        {filteredScriptures.length > 0 ? (
          filteredScriptures.map(renderScriptureCard)
        ) : (
          <div className="card text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Scriptures Found</h3>
            <p className="text-gray-600 mb-4">
              {savedScriptures.length === 0 
                ? "Start building your scripture library by adding verses that inspire you."
                : "Try adjusting your search or filters to find scriptures."
              }
            </p>
            {savedScriptures.length === 0 && (
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
              >
                Add Your First Scripture
              </button>
            )}
          </div>
        )}
      </div>

      {/* Scripture Detail Modal */}
      {selectedScripture && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedScripture(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{selectedScripture.reference}</h2>
              <button
                onClick={() => setSelectedScripture(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <blockquote className="text-lg text-gray-700 italic leading-relaxed border-l-4 border-vesi-deep pl-4">
                "{selectedScripture.text}"
              </blockquote>
              
              <div className="flex items-center space-x-2">
                <span className={`text-sm px-3 py-1 rounded-full ${getCategoryColor(selectedScripture.category)}`}>
                  {selectedScripture.category}
                </span>
                {selectedScripture.tags.map((tag, index) => (
                  <span key={index} className="text-sm px-3 py-1 bg-gray-100 text-gray-800 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              {selectedScripture.assignedTo && (
                <div className="bg-vesi-light p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bookmark className="h-5 w-5 text-vesi-deep" />
                    <h4 className="font-medium text-vesi-deep">Assigned to</h4>
                  </div>
                  <p className="text-gray-700">{selectedScripture.assignedTo}</p>
                </div>
              )}
              
              {selectedScripture.notes && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Personal Notes</h4>
                  <p className="text-gray-700">{selectedScripture.notes}</p>
                </div>
              )}
              
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedScripture.text);
                  }}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy Text</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${selectedScripture.reference} - "${selectedScripture.text}"`);
                  }}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ScriptureManager;

