import React from 'react';
import { motion } from 'framer-motion';
import VesiLogo from '../components/VesiLogo';
import { Heart, Sparkles, Leaf, MessageCircle, BookOpen, Target, ArrowRight, Brain, Activity, Zap, Users } from 'lucide-react';

const Vision = () => {
  const features = [
    {
      icon: Target,
      title: "Set Goals",
      description: "for fitness, mindfulness, relationships, or personal growth",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BookOpen,
      title: "Journal",
      description: "about your progress, thoughts, and daily experiences",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Brain,
      title: "AI Guidance",
      description: "analyzes your patterns and offers personalized insights",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const examples = [
    {
      text: "You've been writing about stress management — here are mindfulness techniques that can help.",
      icon: Brain,
      color: "bg-blue-50 border-blue-200 text-blue-800"
    },
    {
      text: "Your fitness goals show you're ready for the next level — want to try HIIT training?",
      icon: Activity,
      color: "bg-green-50 border-green-200 text-green-800"
    },
    {
      text: "You've mentioned gratitude three times — let's build a gratitude practice that sticks.",
      icon: Heart,
      color: "bg-purple-50 border-purple-200 text-purple-800"
    }
  ];

  const differences = [
    {
      category: "Most apps",
      description: "help you track goals",
      vs: "Vesi",
      better: "helps you transform through them with personalized guidance"
    },
    {
      category: "Most AI",
      description: "generates generic content",
      vs: "Vesi's AI",
      better: "interprets your unique journey — offering personalized wellness insights, growth strategies, and encouragement tailored to your goals"
    },
    {
      category: "Most tools",
      description: "separate fitness, mental health, and spirituality",
      vs: "Vesi",
      better: "unites all aspects of wellness into one harmonious system — mind, body, and spirit working together"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <div className="flex justify-center mb-6">
          <VesiLogo size="xlarge" animate={true} />
        </div>
        <h1 className="text-4xl font-lora font-bold text-gray-900 mb-4">
          Vesi's Vision
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Vesi helps you become the best version of yourself — one reflection, one habit, one breakthrough at a time.
        </p>
      </motion.div>

      {/* Core Vision */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="card bg-gradient-to-br from-vesi-light to-white border-l-4 border-l-vesi-deep"
      >
        <div className="text-center">
          <Leaf className="h-12 w-12 text-vesi-deep mx-auto mb-4" />
          <h2 className="text-2xl font-lora font-semibold text-gray-900 mb-4">
            Your one-stop wellness companion
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            where your fitness goals, mental health practices, spiritual growth, and personal development 
            come together in harmony. As you track progress, reflect on growth, and pursue your best self, 
            Vesi becomes your personalized wellness guide, helping you mind your mind and nurture your whole being.
          </p>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-lora font-semibold text-gray-900 mb-2">
            🌿 How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                className="card text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  You {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* AI Examples */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Vesi gently offers:
          </h3>
          <div className="space-y-4">
            {examples.map((example, index) => {
              const Icon = example.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  className={`p-4 rounded-lg border-l-4 ${example.color}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium">💬 "{example.text}"</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Why It's Different */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-lora font-semibold text-gray-900 mb-2">
            ✨ Why It's Different
          </h2>
        </div>

        <div className="space-y-6">
          {differences.map((diff, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 + index * 0.2 }}
              className="card"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="text-center md:text-left">
                  <h4 className="font-semibold text-gray-900 mb-1">{diff.category}</h4>
                  <p className="text-gray-600 text-sm">{diff.description}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="w-8 h-0.5 bg-vesi-accent"></div>
                  </div>
                  <h4 className="font-semibold text-vesi-deep mb-1">{diff.vs}</h4>
                  <p className="text-vesi-deep text-sm font-medium">{diff.better}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core Promise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="card bg-gradient-to-br from-vesi-deep to-blue-700 text-white text-center"
      >
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-lora font-semibold mb-4">
          🕊️ Core Promise
        </h2>
        <blockquote className="text-xl leading-relaxed italic">
          "Vesi isn't here to make you more productive.<br />
          It's here to help you become your best self — in how you live, grow, and find peace every day.<br />
          <span className="text-lg mt-2 block">Your one-stop wellness companion for mind, body, and spirit."</span>
        </blockquote>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="text-center"
      >
        <div className="card bg-gradient-to-br from-vesi-light to-vesi-blue">
          <h3 className="text-2xl font-lora font-semibold text-gray-900 mb-4">
            Ready to Begin Your Wellness Journey?
          </h3>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Start by setting your first wellness goal, writing your first reflection, 
            and let Vesi guide you toward becoming your best self. 
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-center font-semibold">
              ✨ Vesi is completely free to use! ✨
            </p>
            <p className="text-green-700 text-sm text-center mt-1">
              Access all features, AI guidance, and wellness tools at no cost.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Start Your Journey
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Vision;
