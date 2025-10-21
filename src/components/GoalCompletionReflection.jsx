import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Heart, 
  Lightbulb, 
  Target, 
  Star,
  CheckCircle,
  Edit,
  Save,
  X
} from 'lucide-react';

const GoalCompletionReflection = ({ goal, onSaveReflection, onClose }) => {
  const [reflection, setReflection] = useState({
    celebration: '',
    learnings: '',
    challenges: '',
    nextSteps: '',
    gratitude: '',
    dateCompleted: new Date()
  });

  const [activeSection, setActiveSection] = useState('celebration');

  const reflectionSections = [
    {
      id: 'celebration',
      title: 'Celebration',
      icon: Trophy,
      placeholder: 'What are you celebrating about completing this goal? How does it feel to have achieved this?',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 'learnings',
      title: 'What I Learned',
      icon: Lightbulb,
      placeholder: 'What insights did you gain from working toward this goal? What did you discover about yourself?',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'challenges',
      title: 'Challenges Overcome',
      icon: Target,
      placeholder: 'What obstacles did you face? How did you overcome them? What strength did you discover?',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'nextSteps',
      title: 'Next Steps',
      icon: Star,
      placeholder: 'How will you build on this success? What new goals or habits might grow from this achievement?',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'gratitude',
      title: 'Gratitude',
      icon: Heart,
      placeholder: 'What are you grateful for in this journey? Who or what helped you along the way?',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const handleSave = () => {
    onSaveReflection(goal.id, reflection);
    onClose();
  };

  const currentSection = reflectionSections.find(s => s.id === activeSection);
  const SectionIcon = currentSection.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-vesi-deep to-vesi-accent text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Goal Completed!</h2>
                <p className="text-white text-opacity-80">{goal.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white text-opacity-80 hover:text-opacity-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-1/3 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Reflection Sections</h3>
            <div className="space-y-2">
              {reflectionSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                const hasContent = reflection[section.id]?.trim().length > 0;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      isActive 
                        ? `${section.bgColor} ${section.borderColor} border-2` 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${isActive ? section.color : 'text-gray-600'}`} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${isActive ? section.color : 'text-gray-900'}`}>
                            {section.title}
                          </span>
                          {hasContent && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Section Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <SectionIcon className={`h-6 w-6 ${currentSection.color}`} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{currentSection.title}</h3>
                  <p className="text-sm text-gray-600">
                    Take a moment to reflect on your achievement in this area
                  </p>
                </div>
              </div>
            </div>

            {/* Text Area */}
            <div className="flex-1 p-6">
              <textarea
                value={reflection[activeSection] || ''}
                onChange={(e) => setReflection({
                  ...reflection,
                  [activeSection]: e.target.value
                })}
                placeholder={currentSection.placeholder}
                className="w-full h-full resize-none border-none outline-none text-gray-700 leading-relaxed"
                autoFocus
              />
            </div>

            {/* Progress Indicator */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Reflection Progress</span>
                <span className="text-sm text-gray-600">
                  {Object.values(reflection).filter(v => v.trim().length > 0).length} of {reflectionSections.length} sections
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-vesi-deep h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(Object.values(reflection).filter(v => v.trim().length > 0).length / reflectionSections.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <p>Take your time to reflect meaningfully on your achievement.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="btn-secondary flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Skip for Now</span>
            </button>
            <button
              onClick={handleSave}
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Reflection</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GoalCompletionReflection;

