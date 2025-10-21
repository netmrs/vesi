import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tag, X, Plus } from 'lucide-react';
import { defaultTags } from '../lib/utils';

const TagSelector = ({ selectedTags, onTagsChange, allowCustom = true }) => {
  const [showAll, setShowAll] = useState(false);
  const [customTag, setCustomTag] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleTagSelect = (tag) => {
    const isSelected = selectedTags.some(t => t.id === tag.id);
    if (isSelected) {
      onTagsChange(selectedTags.filter(t => t.id !== tag.id));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleCustomTagSubmit = (e) => {
    e.preventDefault();
    if (customTag.trim()) {
      const newTag = {
        id: `custom-${Date.now()}`,
        name: customTag.trim(),
        color: 'bg-gray-100 text-gray-800'
      };
      onTagsChange([...selectedTags, newTag]);
      setCustomTag('');
      setShowCustomInput(false);
    }
  };

  const handleRemoveTag = (tagId) => {
    onTagsChange(selectedTags.filter(t => t.id !== tagId));
  };

  const visibleTags = showAll ? defaultTags : defaultTags.slice(0, 6);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        {defaultTags.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-vesi-deep hover:text-blue-700 transition-colors"
          >
            {showAll ? 'Show less' : 'Show all'}
          </button>
        )}
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <motion.div
              key={tag.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`tag ${tag.color || 'bg-vesi-blue text-vesi-deep'} flex items-center space-x-1`}
            >
              <Tag className="h-3 w-3" />
              <span>{tag.name}</span>
              <button
                onClick={() => handleRemoveTag(tag.id)}
                className="ml-1 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Available Tags */}
      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag) => {
          const isSelected = selectedTags.some(t => t.id === tag.id);
          return (
            <motion.button
              key={tag.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTagSelect(tag)}
              className={`tag transition-all duration-200 ${
                isSelected 
                  ? tag.color || 'bg-vesi-deep text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-vesi-blue hover:text-vesi-deep'
              }`}
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag.name}
            </motion.button>
          );
        })}
        
        {allowCustom && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCustomInput(true)}
            className="tag bg-gray-100 text-gray-600 hover:bg-vesi-blue hover:text-vesi-deep transition-colors"
          >
            <Plus className="h-3 w-3 mr-1" />
            Custom
          </motion.button>
        )}
      </div>

      {/* Custom Tag Input */}
      {showCustomInput && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleCustomTagSubmit}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            placeholder="Enter custom tag"
            className="input-field flex-1"
            autoFocus
          />
          <button
            type="submit"
            className="btn-primary px-4 py-2"
            disabled={!customTag.trim()}
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCustomInput(false);
              setCustomTag('');
            }}
            className="btn-secondary px-4 py-2"
          >
            Cancel
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default TagSelector;

