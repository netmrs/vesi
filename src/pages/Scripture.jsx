import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScriptureManager from '../components/ScriptureManager';

const Scripture = ({ savedScriptures = [], onSaveScripture, onDeleteScripture, onUpdateScripture }) => {
  return (
    <div className="space-y-6">
      <ScriptureManager
        savedScriptures={savedScriptures}
        onSaveScripture={onSaveScripture}
        onDeleteScripture={onDeleteScripture}
        onUpdateScripture={onUpdateScripture}
      />
    </div>
  );
};

export default Scripture;

