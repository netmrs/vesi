import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap, MessageCircle, Target, BookOpen, Loader } from 'lucide-react';
import aiService from '../lib/aiService';

const AIDemo = () => {
  const [demoType, setDemoType] = useState('chat');
  const [demoInput, setDemoInput] = useState('');
  const [demoResponse, setDemoResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const demoExamples = {
    chat: [
      "I'm feeling overwhelmed with my goals",
      "How can I grow in patience?",
      "I want to deepen my prayer life",
      "I'm struggling with forgiveness"
    ],
    goals: [
      "I want to be more disciplined",
      "I need to grow in gratitude",
      "I want to serve others more",
      "I want to study the Bible better"
    ],
    journal: [
      "Analyze my recent journal entries",
      "What themes do you see in my writing?",
      "How am I growing spiritually?",
      "What scripture should I study?"
    ]
  };

  const runDemo = async (input, type) => {
    setIsLoading(true);
    setDemoResponse('');

    try {
      let response;
      
      switch (type) {
        case 'chat':
          response = await aiService.getSpiritualChat(input, {
            entries: [],
            goals: [],
            completedGoals: 3,
            totalGoals: 5,
            recentEntries: 4
          });
          break;
          
        case 'goals':
          const suggestions = await aiService.getGoalSuggestions(input, 'Christian', []);
          response = suggestions.map(s => 
            `• ${s.title}: ${s.description} (${s.suggestedFrequency})\n  Scripture: ${s.scriptureReference}`
          ).join('\n\n');
          break;
          
        case 'journal':
          response = await aiService.analyzeJournalEntries([
            { content: "I've been feeling grateful for God's blessings in my life" },
            { content: "Prayer has been helping me through difficult times" },
            { content: "I want to serve others more in my community" }
          ], 'Christian');
          break;
          
        default:
          response = "Demo not available";
      }
      
      setDemoResponse(response);
    } catch (error) {
      console.error('Demo Error:', error);
      setDemoResponse('Demo failed. Make sure you have set up your OpenAI API key in the .env file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example) => {
    setDemoInput(example);
    runDemo(example, demoType);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Brain className="w-8 h-8 text-vesi-blue" />
          <h1 className="text-3xl font-bold text-gray-800">AI Integration Demo</h1>
          <Sparkles className="w-8 h-8 text-vesi-blue" />
        </div>
        <p className="text-gray-600 text-lg">
          Experience Vesi's AI spiritual mentor capabilities
        </p>
      </motion.div>

      {/* Demo Type Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
          {[
            { id: 'chat', label: 'AI Chat', icon: MessageCircle },
            { id: 'goals', label: 'Goal Suggestions', icon: Target },
            { id: 'journal', label: 'Journal Analysis', icon: BookOpen }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setDemoType(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                demoType === id
                  ? 'bg-white text-vesi-blue shadow-sm'
                  : 'text-gray-600 hover:text-vesi-blue'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Try {demoType === 'chat' ? 'AI Chat' : demoType === 'goals' ? 'Goal Suggestions' : 'Journal Analysis'}
            </h3>
            
            <div className="space-y-4">
              <textarea
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                placeholder={`Enter your ${demoType === 'chat' ? 'message' : demoType === 'goals' ? 'goal request' : 'journal context'}...`}
                className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-vesi-blue focus:border-transparent resize-none"
              />
              
              <button
                onClick={() => runDemo(demoInput, demoType)}
                disabled={!demoInput.trim() || isLoading}
                className="w-full bg-gradient-to-r from-vesi-blue to-vesi-deep text-white py-3 px-6 rounded-lg hover:from-vesi-deep hover:to-vesi-blue transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
                <span>{isLoading ? 'Processing...' : 'Run Demo'}</span>
              </button>
            </div>
          </div>

          {/* Example Inputs */}
          <div>
            <h4 className="text-lg font-medium text-gray-700 mb-3">Example Inputs:</h4>
            <div className="space-y-2">
              {demoExamples[demoType].map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Response Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Response:</h3>
          <div className="bg-gray-50 rounded-lg p-6 min-h-[300px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Loader className="w-8 h-8 animate-spin text-vesi-blue mx-auto mb-4" />
                  <p className="text-gray-600">AI is thinking...</p>
                </div>
              </div>
            ) : demoResponse ? (
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {demoResponse}
              </div>
            ) : (
              <div className="text-center text-gray-500 h-64 flex items-center justify-center">
                <div>
                  <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p>Enter a message above to see the AI response</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Setup Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 bg-blue-50 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-vesi-blue mb-3">Setup Instructions:</h3>
        <div className="text-gray-700 space-y-2">
          <p>1. Get your OpenAI API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-vesi-blue hover:underline">OpenAI Platform</a></p>
          <p>2. Create a <code className="bg-gray-200 px-2 py-1 rounded text-sm">.env</code> file in your project root</p>
          <p>3. Add: <code className="bg-gray-200 px-2 py-1 rounded text-sm">REACT_APP_OPENAI_API_KEY=your_api_key_here</code></p>
          <p>4. Restart your development server</p>
          <p className="text-sm text-gray-600 mt-3">
            Without an API key, the demo will show mock responses. The AI integration is designed to gracefully fall back to intelligent mock responses when the API is unavailable.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AIDemo;

