import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Smartphone, 
  Mail, 
  Cloud, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Zap,
  RefreshCw,
  Download,
  Upload,
  Bell,
  Link,
  Shield
} from 'lucide-react';
import IntegrationPanel from '../components/IntegrationPanel';

const Integrations = ({ goals = [], entries = [], user = {} }) => {
  const [activeCategory, setActiveCategory] = useState('calendar');

  const categories = [
    { id: 'calendar', label: 'Calendar & Scheduling', icon: Calendar },
    { id: 'reminders', label: 'Reminders & Notifications', icon: Bell },
    { id: 'data', label: 'Data & Backup', icon: Cloud },
    { id: 'apps', label: 'App Integrations', icon: Smartphone },
    { id: 'automation', label: 'Automation', icon: Zap }
  ];

  const integrations = {
    calendar: [
      {
        name: 'Google Calendar',
        description: 'Sync your spiritual goals with your daily calendar',
        features: [
          'Add prayer time to your calendar automatically',
          'Schedule weekly reflection sessions',
          'Set up recurring spiritual practice reminders',
          'Block time for scripture study'
        ],
        status: 'available',
        icon: '📅'
      },
      {
        name: 'Apple Calendar',
        description: 'Integrate with your iPhone and Mac calendar',
        features: [
          'Sync spiritual goals across all devices',
          'Get notifications before prayer time',
          'Share spiritual milestones with family',
          'Coordinate group spiritual activities'
        ],
        status: 'available',
        icon: '🍎'
      },
      {
        name: 'Outlook Calendar',
        description: 'Connect with Microsoft Outlook for work-life balance',
        features: [
          'Schedule spiritual breaks during work hours',
          'Integrate with work calendar seamlessly',
          'Set up spiritual accountability meetings',
          'Plan spiritual retreats and events'
        ],
        status: 'available',
        icon: '📊'
      }
    ],
    reminders: [
      {
        name: 'Smart Notifications',
        description: 'Intelligent reminders based on your spiritual patterns',
        features: [
          'Adaptive timing based on your prayer habits',
          'Context-aware reminders (work vs. home)',
          'Gentle nudges for missed spiritual practices',
          'Celebration notifications for milestones'
        ],
        status: 'available',
        icon: '🔔'
      },
      {
        name: 'Email Reminders',
        description: 'Weekly spiritual check-ins via email',
        features: [
          'Personalized weekly spiritual summaries',
          'Scripture study suggestions',
          'Goal progress reports',
          'Encouraging messages from AI companion'
        ],
        status: 'available',
        icon: '📧'
      },
      {
        name: 'SMS Integration',
        description: 'Text reminders for important spiritual moments',
        features: [
          'Daily prayer reminders',
          'Scripture verse of the day',
          'Emergency spiritual encouragement',
          'Accountability partner notifications'
        ],
        status: 'coming-soon',
        icon: '💬'
      }
    ],
    data: [
      {
        name: 'Cloud Backup',
        description: 'Automatic backup of all your spiritual journey data',
        features: [
          'Real-time sync across all devices',
          'Secure encryption of personal reflections',
          'Version history of journal entries',
          'Cross-platform accessibility'
        ],
        status: 'available',
        icon: '☁️'
      },
      {
        name: 'Data Export',
        description: 'Export your spiritual journey data',
        features: [
          'PDF reports of your spiritual growth',
          'CSV export of goals and progress',
          'Beautiful spiritual journey books',
          'Share insights with spiritual mentors'
        ],
        status: 'available',
        icon: '📄'
      },
      {
        name: 'Privacy Controls',
        description: 'Complete control over your spiritual data',
        features: [
          'Granular privacy settings',
          'Data deletion options',
          'Export personal data anytime',
          'GDPR compliance'
        ],
        status: 'available',
        icon: '🔒'
      }
    ],
    apps: [
      {
        name: 'Bible Apps',
        description: 'Connect with popular Bible study apps',
        features: [
          'Sync highlighted verses with journal entries',
          'Import reading plans into Vesi goals',
          'Share insights between apps',
          'Unified spiritual study experience'
        ],
        status: 'coming-soon',
        icon: '📖'
      },
      {
        name: 'Prayer Apps',
        description: 'Integrate with prayer and meditation apps',
        features: [
          'Import prayer requests into journal',
          'Sync meditation goals',
          'Share spiritual insights',
          'Unified prayer tracking'
        ],
        status: 'coming-soon',
        icon: '🙏'
      },
      {
        name: 'Productivity Apps',
        description: 'Connect with your productivity workflow',
        features: [
          'Add spiritual goals to task managers',
          'Integrate with habit tracking apps',
          'Sync with time management tools',
          'Spiritual productivity insights'
        ],
        status: 'coming-soon',
        icon: '⚡'
      }
    ],
    automation: [
      {
        name: 'Smart Scheduling',
        description: 'AI-powered optimal timing for spiritual practices',
        features: [
          'Learn your best prayer times',
          'Adapt to your schedule changes',
          'Suggest optimal reflection moments',
          'Automatically reschedule missed practices'
        ],
        status: 'available',
        icon: '🤖'
      },
      {
        name: 'Context Awareness',
        description: 'Adapt reminders based on your current context',
        features: [
          'Different reminders for work vs. home',
          'Travel mode for spiritual practices',
          'Seasonal spiritual focus adjustments',
          'Life event spiritual guidance'
        ],
        status: 'available',
        icon: '🧠'
      },
      {
        name: 'Family Integration',
        description: 'Connect spiritual practices with family life',
        features: [
          'Family prayer time coordination',
          'Shared spiritual goals',
          'Children\'s spiritual milestone tracking',
          'Family spiritual calendar'
        ],
        status: 'coming-soon',
        icon: '👨‍👩‍👧‍👦'
      }
    ]
  };

  const renderIntegrationCard = (integration, index) => (
    <motion.div
      key={integration.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="card hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{integration.icon}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{integration.name}</h3>
            <p className="text-sm text-gray-600">{integration.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {integration.status === 'available' ? (
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Available</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-blue-600">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Coming Soon</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {integration.features.map((feature, featureIndex) => (
          <div key={featureIndex} className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-vesi-accent rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-600">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            integration.status === 'available'
              ? 'bg-vesi-deep text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-500 cursor-not-allowed'
          }`}
          disabled={integration.status !== 'available'}
        >
          {integration.status === 'available' ? 'Connect' : 'Coming Soon'}
        </button>
      </div>
    </motion.div>
  );

  const renderQuickSetup = () => (
    <div className="card bg-gradient-to-br from-vesi-light to-white border-l-4 border-l-vesi-deep">
      <div className="flex items-center space-x-3 mb-4">
        <Zap className="h-6 w-6 text-vesi-deep" />
        <h3 className="text-lg font-semibold text-gray-900">Quick Setup</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
          <Calendar className="h-5 w-5 text-vesi-deep" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Calendar Integration</h4>
            <p className="text-sm text-gray-600">Connect your calendar for automatic scheduling</p>
          </div>
          <button className="btn-primary text-sm px-4 py-2">Connect</button>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
          <Bell className="h-5 w-5 text-vesi-deep" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Smart Notifications</h4>
            <p className="text-sm text-gray-600">Enable intelligent spiritual reminders</p>
          </div>
          <button className="btn-primary text-sm px-4 py-2">Enable</button>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
          <Cloud className="h-5 w-5 text-vesi-deep" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Cloud Backup</h4>
            <p className="text-sm text-gray-600">Secure your spiritual journey data</p>
          </div>
          <button className="btn-primary text-sm px-4 py-2">Setup</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-lora font-semibold text-gray-900 mb-2">
          Integrate with Your Daily Systems
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Vesi doesn't exist in isolation—it becomes part of your daily rhythm, 
          connecting your spiritual journey with the apps and systems you already use.
        </p>
      </div>

      {/* Quick Setup */}
      {renderQuickSetup()}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-vesi-deep text-white'
                  : 'bg-vesi-blue text-vesi-deep hover:bg-blue-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Functional Integration Panel */}
      {activeCategory === 'calendar' && (
        <IntegrationPanel 
          goals={goals}
          entries={entries}
          user={user}
          onIntegrationUpdate={() => {}}
        />
      )}

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations[activeCategory]?.map((integration, index) => 
          renderIntegrationCard(integration, index)
        )}
      </div>

      {/* How It Works */}
      <div className="card">
        <h3 className="text-xl font-lora font-semibold text-gray-900 mb-6 text-center">
          How Vesi Integrates Into Your Life
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Link className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Seamless Connection</h4>
            <p className="text-sm text-gray-600">
              Vesi connects with your existing apps and systems without disrupting your workflow
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Automatic Sync</h4>
            <p className="text-sm text-gray-600">
              Your spiritual practices automatically sync with your calendar, reminders, and other tools
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Secure & Private</h4>
            <p className="text-sm text-gray-600">
              All integrations respect your privacy and keep your spiritual journey secure
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="card bg-gradient-to-br from-vesi-light to-vesi-blue">
        <h3 className="text-xl font-lora font-semibold text-vesi-deep mb-4 text-center">
          Why Integration Matters for Your Spiritual Journey
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-vesi-deep mb-3">🌊 Flow with Purpose</h4>
            <ul className="space-y-2 text-sm text-vesi-deep">
              <li>• Spiritual practices become part of your natural rhythm</li>
              <li>• No need to switch between multiple apps</li>
              <li>• Your spiritual journey flows with your daily life</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-vesi-deep mb-3">🌿 Grow with Light</h4>
            <ul className="space-y-2 text-sm text-vesi-deep">
              <li>• AI learns your patterns and optimizes your spiritual practices</li>
              <li>• Gentle reminders that adapt to your schedule</li>
              <li>• Spiritual insights integrated into your daily workflow</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
