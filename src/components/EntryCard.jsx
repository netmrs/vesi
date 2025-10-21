import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Tag, Calendar, MoreVertical } from 'lucide-react';
import { formatDate, formatFullDate } from '../lib/utils';

const EntryCard = ({ entry, onEdit, onDelete, onTagClick }) => {
  const [showActions, setShowActions] = useState(false);

  const handleEdit = () => {
    onEdit(entry);
    setShowActions(false);
  };

  const handleDelete = () => {
    onDelete(entry.id);
    setShowActions(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card group hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">{formatDate(entry.createdAt)}</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10"
            >
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 font-lora">
        {entry.title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
        {entry.content}
      </p>

      {entry.tags && entry.tags.length > 0 && (
        <div className="flex items-center space-x-2 mb-3">
          <Tag className="h-4 w-4 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => onTagClick && onTagClick(tag)}
                className={`tag hover:scale-105 transition-transform cursor-pointer ${tag.color || 'bg-vesi-blue text-vesi-deep'}`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{formatFullDate(entry.createdAt)}</span>
        <span>{entry.content.length} characters</span>
      </div>
    </motion.div>
  );
};

export default EntryCard;

