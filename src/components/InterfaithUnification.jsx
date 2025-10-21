import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Globe, 
  Users, 
  Star, 
  Lightbulb,
  BookOpen,
  HeartHandshake,
  Sparkles,
  MessageCircle,
  Calendar,
  Award
} from 'lucide-react';

const InterfaithUnification = ({ userFaith, allUsers = [] }) => {
  const [activeTab, setActiveTab] = useState('similarities');

  // Universal spiritual principles
  const universalPrinciples = [
    {
      title: 'Love & Compassion',
      description: 'The golden rule of treating others as you wish to be treated',
      examples: [
        { faith: 'Christian', text: 'Love your neighbor as yourself' },
        { faith: 'Muslim', text: 'None of you truly believes until you love for your brother what you love for yourself' },
        { faith: 'Buddhist', text: 'May all beings be happy and free from suffering' },
        { faith: 'Hindu', text: 'Ahimsa - non-violence and compassion for all' }
      ],
      icon: Heart,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Service to Others',
      description: 'Helping those in need and serving the community',
      examples: [
        { faith: 'Christian', text: 'Whatever you do for the least of these, you do for me' },
        { faith: 'Muslim', text: 'The believer\'s shade on the Day of Resurrection will be his charity' },
        { faith: 'Jewish', text: 'Tzedakah - righteousness and charity' },
        { faith: 'LDS', text: 'When ye are in the service of your fellow beings, ye are only in the service of your God' }
      ],
        icon: HeartHandshake,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Prayer & Meditation',
      description: 'Connecting with the divine through contemplation and prayer',
      examples: [
        { faith: 'Christian', text: 'Pray without ceasing' },
        { faith: 'Muslim', text: 'Seek help through patience and prayer' },
        { faith: 'Buddhist', text: 'Meditation is the way to enlightenment' },
        { faith: 'Hindu', text: 'Yoga is the stilling of the fluctuations of the mind' }
      ],
      icon: Sparkles,
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Forgiveness',
      description: 'Letting go of resentment and embracing mercy',
      examples: [
        { faith: 'Christian', text: 'Forgive seventy times seven times' },
        { faith: 'Muslim', text: 'Show forgiveness and enjoin what is good' },
        { faith: 'Buddhist', text: 'Holding on to anger is like grasping a hot coal' },
        { faith: 'Jewish', text: 'Forgiveness is the attribute of the strong' }
      ],
      icon: Heart,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Truth & Wisdom',
      description: 'Seeking knowledge and living according to divine truth',
      examples: [
        { faith: 'Christian', text: 'You will know the truth, and the truth will set you free' },
        { faith: 'Muslim', text: 'Seek knowledge from the cradle to the grave' },
        { faith: 'Hindu', text: 'Satyam eva jayate - truth alone triumphs' },
        { faith: 'Buddhist', text: 'The truth will set you free' }
      ],
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  // Community insights
  const communityInsights = {
    totalUsers: 2847,
    activeThisWeek: 1234,
    topGoals: [
      { goal: 'Daily Prayer/Meditation', count: 892, faith: 'Universal' },
      { goal: 'Service to Others', count: 634, faith: 'Universal' },
      { goal: 'Scripture Study', count: 567, faith: 'Universal' },
      { goal: 'Gratitude Practice', count: 445, faith: 'Universal' },
      { goal: 'Forgiveness Work', count: 389, faith: 'Universal' }
    ],
    faithDistribution: [
      { faith: 'Christian', percentage: 45, users: 1281 },
      { faith: 'Muslim', percentage: 20, users: 569 },
      { faith: 'Catholic', percentage: 15, users: 427 },
      { faith: 'Interfaith', percentage: 10, users: 285 },
      { faith: 'Other', percentage: 10, users: 285 }
    ]
  };

  // Interfaith events and celebrations
  const interfaithEvents = [
    {
      title: 'World Interfaith Harmony Week',
      date: 'February 1-7',
      description: 'Celebrating unity across all faith traditions',
      participants: 156,
      status: 'upcoming'
    },
    {
      title: 'Global Prayer for Peace',
      date: 'September 21',
      description: 'Unified prayer session for world peace',
      participants: 423,
      status: 'upcoming'
    },
    {
      title: 'Interfaith Service Project',
      date: 'November 15',
      description: 'Community service event bringing faiths together',
      participants: 89,
      status: 'upcoming'
    },
    {
      title: 'Universal Love Meditation',
      date: 'December 25',
      description: 'Christmas Day meditation for all faiths',
      participants: 234,
      status: 'upcoming'
    }
  ];

  const tabs = [
    { id: 'similarities', label: 'Universal Principles', icon: Star },
    { id: 'community', label: 'Global Community', icon: Users },
    { id: 'events', label: 'Interfaith Events', icon: Calendar },
    { id: 'dialogue', label: 'Faith Dialogue', icon: MessageCircle }
  ];

  const renderSimilarities = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Universal Spiritual Principles</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Across all faith traditions, we share common values that unite us in our spiritual journey.
          Here are the universal principles that connect us all.
        </p>
      </div>

      <div className="space-y-6">
        {universalPrinciples.map((principle, index) => {
          const Icon = principle.icon;
          return (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${principle.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{principle.title}</h4>
                  <p className="text-gray-600 mb-4">{principle.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {principle.examples.map((example, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm font-medium text-gray-900 mb-1">{example.faith}</div>
                        <div className="text-sm text-gray-700 italic">"{example.text}"</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Global Spiritual Community</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join thousands of people from different faiths working together on spiritual growth and service.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{communityInsights.totalUsers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Vesi Users</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{communityInsights.activeThisWeek.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Active This Week</div>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-gray-900">127</div>
          <div className="text-sm text-gray-600">Countries Represented</div>
        </div>
      </div>

      {/* Top Goals */}
      <div className="card">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Spiritual Goals</h4>
        <div className="space-y-3">
          {communityInsights.topGoals.map((goal, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-vesi-deep text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{goal.goal}</div>
                  <div className="text-sm text-gray-600">{goal.faith} tradition</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{goal.count.toLocaleString()}</div>
                <div className="text-sm text-gray-600">people</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faith Distribution */}
      <div className="card">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Faith Distribution</h4>
        <div className="space-y-3">
          {communityInsights.faithDistribution.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-vesi-deep to-vesi-accent rounded-full"></div>
                <span className="text-gray-900">{item.faith}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-vesi-deep to-vesi-accent h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-16 text-right">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Interfaith Events & Celebrations</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join interfaith events that bring people from all faiths together in unity and service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {interfaithEvents.map((event, index) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{event.date}</span>
                  <span>{event.participants} participants</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                event.status === 'upcoming' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {event.status}
              </div>
            </div>
            
            <button className="btn-primary w-full text-sm">
              Join Event
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderDialogue = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Faith Dialogue & Learning</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Engage in respectful dialogue and learn about different faith traditions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-6 w-6 text-vesi-deep" />
            <h4 className="font-semibold text-gray-900">Learn About Other Faiths</h4>
          </div>
          <p className="text-gray-600 mb-4">
            Explore the beliefs, practices, and wisdom of different faith traditions.
          </p>
          <button className="btn-primary w-full text-sm">
            Explore Faith Traditions
          </button>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <MessageCircle className="h-6 w-6 text-vesi-deep" />
            <h4 className="font-semibold text-gray-900">Join Interfaith Discussions</h4>
          </div>
          <p className="text-gray-600 mb-4">
            Participate in respectful discussions about faith, spirituality, and shared values.
          </p>
          <button className="btn-primary w-full text-sm">
            Join Discussions
          </button>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <HeartHandshake className="h-6 w-6 text-vesi-deep" />
            <h4 className="font-semibold text-gray-900">Interfaith Service Projects</h4>
          </div>
          <p className="text-gray-600 mb-4">
            Work together with people of different faiths on community service projects.
          </p>
          <button className="btn-primary w-full text-sm">
            Find Service Projects
          </button>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="h-6 w-6 text-vesi-deep" />
            <h4 className="font-semibold text-gray-900">Shared Spiritual Practices</h4>
          </div>
          <p className="text-gray-600 mb-4">
            Discover practices that are common across many faith traditions.
          </p>
          <button className="btn-primary w-full text-sm">
            Explore Practices
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-rainbow-500 to-rainbow-600 rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Interfaith Unity</h3>
            <p className="text-sm text-gray-600">Celebrating our shared spiritual journey across all faiths</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-vesi-deep text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'similarities' && renderSimilarities()}
      {activeTab === 'community' && renderCommunity()}
      {activeTab === 'events' && renderEvents()}
      {activeTab === 'dialogue' && renderDialogue()}
    </div>
  );
};

export default InterfaithUnification;
