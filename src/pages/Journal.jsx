import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, Edit2, Save, X } from 'lucide-react';
import EntryCard from '../components/EntryCard';
import TagSelector from '../components/TagSelector';
import { generateId, debounce } from '../lib/utils';

const Journal = ({ entries, onAddEntry, onEditEntry, onDeleteEntry, onTagClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: []
  });

  const handleSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      const newEntry = {
        id: generateId(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      onAddEntry(newEntry);
      resetForm();
    }
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title,
      content: entry.content,
      tags: entry.tags || []
    });
    setShowAddForm(true);
  };

  const handleUpdateEntry = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      const updatedEntry = {
        ...editingEntry,
        ...formData,
        updatedAt: new Date()
      };
      onEditEntry(updatedEntry);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', tags: [] });
    setShowAddForm(false);
    setEditingEntry(null);
  };

  const handleTagChange = (tags) => {
    setFormData({ ...formData, tags });
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(selectedTag => 
                         entry.tags?.some(tag => tag.id === selectedTag.id)
                       );
    
    return matchesSearch && matchesTags;
  });

  const allTags = entries.reduce((acc, entry) => {
    entry.tags?.forEach(tag => {
      if (!acc.find(t => t.id === tag.id)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-lora font-semibold text-gray-900">Journal</h1>
          <p className="text-gray-600">{entries.length} entries</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Entry</span>
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search entries..."
            onChange={(e) => handleSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Filter by tags:</span>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => {
                    const isSelected = selectedTags.find(t => t.id === tag.id);
                    if (isSelected) {
                      setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                  className={`tag transition-colors ${
                    selectedTags.find(t => t.id === tag.id)
                      ? tag.color || 'bg-vesi-deep text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-vesi-blue hover:text-vesi-deep'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingEntry ? 'Edit Entry' : 'New Entry'}
            </h3>
            <button
              onClick={resetForm}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={editingEntry ? handleUpdateEntry : handleAddEntry} className="space-y-4">
            <div>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Entry title..."
                className="input-field"
                required
              />
            </div>
            
            <div>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="What's on your heart today?"
                className="input-field"
                rows="6"
                required
              />
            </div>

            <TagSelector
              selectedTags={formData.tags}
              onTagsChange={handleTagChange}
            />

            <div className="flex space-x-3">
              <button
                type="submit"
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{editingEntry ? 'Update Entry' : 'Save Entry'}</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onEdit={handleEditEntry}
              onDelete={onDeleteEntry}
              onTagClick={onTagClick}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Edit2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || selectedTags.length > 0 ? 'No matching entries' : 'No entries yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedTags.length > 0 
                ? 'Try adjusting your search or filters'
                : 'Start your journaling journey by adding your first entry'
              }
            </p>
            {!searchTerm && selectedTags.length === 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
              >
                Write Your First Entry
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Journal;

