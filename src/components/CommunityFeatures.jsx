import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  MessageCircle, 
  Heart, 
  Target,
  Award,
  Calendar,
  Globe,
  Star,
  Zap,
  BookOpen,
  Handshake
} from 'lucide-react';

const CommunityFeatures = ({ userFaith, userGoals = [], userLocation = 'Global' }) => {
  const [activeTab, setActiveTab] = useState('activity');

  // Mock community data
  const communityData = {
    totalUsers: 2847,
    activeThisWeek: 1234,
    userLocation: userLocation,
    similarUsers: 127, // Users with similar faith/goals in same area
  };

  // Activity feed
  const activityFeed = [
    {
      id: 1,
      user: { name: 'Sarah M.', faith: 'Christian', location: 'New York' },
      action: 'completed',
      goal: 'Daily Prayer',
      time: '2 hours ago',
      streak: 45,
      message: 'Feeling so grateful for this daily practice! 🙏'
    },
    {
      id: 2,
      user: { name: 'Ahmed K.', faith: 'Muslim', location: 'London' },
      action: 'shared',
      content: 'Beautiful verse from Surah Al-Fatiha',
      time: '4 hours ago',
      likes: 23
    },
    {
      id: 3,
      user: { name: 'Maria S.', faith: 'Catholic', location: 'Los Angeles' },
      action: 'started',
      goal: 'Weekly Service',
      time: '6 hours ago',
      message: 'Excited to serve at the local food bank this weekend!'
    },
    {
      id: 4,
      user: { name: 'David L.', faith: 'Interfaith', location: 'Toronto' },
      action: 'reflected',
      content: 'Powerful insights from my meditation practice',
      time: '8 hours ago',
      likes: 15
    }
  ];

  // Community challenges
  const communityChallenges = [
    {
      id: 1,
      title: '30-Day Gratitude Challenge',
      description: 'Share something you\'re grateful for each day',
      participants: 892,
      yourProgress: 15,
      totalDays: 30,
      status: 'active',
      faith: 'Universal'
    },
    {
      id: 2,
      title: 'Interfaith Prayer Circle',
      description: 'Join people from all faiths in daily prayer',
      participants: 456,
      yourProgress: 8,
      totalDays: 14,
      status: 'active',
      faith: 'Universal'
    },
    {
      id: 3,
      title: 'Service Week Challenge',
      description: 'Complete one act of service each day',
      participants: 234,
      yourProgress: 3,
      totalDays: 7,
      status: 'active',
      faith: 'Universal'
    }
  ];

  // People with similar goals
  const similarPeople = [
    {
      id: 1,
      name: 'Emma R.',
      faith: userFaith,
      location: 'Chicago',
      commonGoals: ['Daily Prayer', 'Scripture Study'],
      streak: 67,
      mutualConnections: 3,
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'James T.',
      faith: userFaith,
      location: 'Austin',
      commonGoals: ['Service to Others', 'Gratitude Practice'],
      streak: 34,
      mutualConnections: 1,
      lastActive: '5 hours ago'
    },
    {
      id: 3,
      name: 'Lisa P.',
      faith: 'Interfaith',
      location: 'Seattle',
      commonGoals: ['Meditation', 'Forgiveness Work'],
      streak: 89,
      mutualConnections: 2,
      lastActive: '1 day ago'
    }
  ];

  // Study groups
  const studyGroups = [
    {
      id: 1,
      name: 'Spiritual Growth Circle',
      description: 'Weekly discussion on spiritual development',
      members: 23,
      nextMeeting: 'Tomorrow, 7 PM',
      faith: 'Universal',
      focus: 'Personal Growth'
    },
    {
      id: 2,
      name: 'Scripture Study Group',
      description: 'Deep dive into sacred texts',
      members: 18,
      nextMeeting: 'Friday, 6 PM',
      faith: userFaith,
      focus: 'Scripture Study'
    },
    {
      id: 3,
      name: 'Interfaith Dialogue',
      description: 'Respectful discussion across faith traditions',
      members: 31,
      nextMeeting: 'Sunday, 2 PM',
      faith: 'Universal',
      focus: 'Interfaith Learning'
    }
  ];

  const tabs = [
    { id: 'activity', label: 'Activity Feed', icon: TrendingUp },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'people', label: 'Similar People', icon: Users },
    { id: 'groups', label: 'Study Groups', icon: BookOpen }
  ];

  const renderActivityFeed = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Community Activity</h3>
        <div className="text-sm text-gray-600">
          {communityData.activeThisWeek.toLocaleString()} people active this week
        </div>
      </div>

      {activityFeed.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card"
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {activity.user.name.split(' ')[0][0]}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900">{activity.user.name}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
              
              {activity.action === 'completed' && (
                <div className="mb-2">
                  <span className="text-gray-700">completed goal </span>
                  <span className="font-medium text-vesi-deep">{activity.goal}</span>
                  <span className="text-gray-700"> (Day {activity.streak})</span>
                </div>
              )}
              
              {activity.action === 'shared' && (
                <div className="mb-2">
                  <span className="text-gray-700">shared: </span>
                  <span className="font-medium text-gray-900">{activity.content}</span>
                </div>
              )}
              
              {activity.action === 'started' && (
                <div className="mb-2">
                  <span className="text-gray-700">started goal </span>
                  <span className="font-medium text-vesi-deep">{activity.goal}</span>
                </div>
              )}
              
              {activity.message && (
                <p className="text-gray-600 text-sm mb-2">{activity.message}</p>
              )}
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{activity.user.faith}</span>
                <span>•</span>
                <span>{activity.user.location}</span>
                {activity.likes && (
                  <>
                    <span>•</span>
                    <span>{activity.likes} likes</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Community Challenges</h3>
        <div className="text-sm text-gray-600">
          Join challenges with people from all faiths
        </div>
      </div>

      {communityChallenges.map((challenge, index) => (
        <motion.div
          key={challenge.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{challenge.title}</h4>
              <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <span>{challenge.participants} participants</span>
                <span>•</span>
                <span>{challenge.faith}</span>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Your Progress</span>
                  <span className="font-medium text-gray-900">
                    {challenge.yourProgress}/{challenge.totalDays} days
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-vesi-deep h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(challenge.yourProgress / challenge.totalDays) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="ml-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                challenge.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {challenge.status}
              </span>
            </div>
          </div>
          
          <button className="btn-primary w-full text-sm">
            {challenge.yourProgress > 0 ? 'Continue Challenge' : 'Join Challenge'}
          </button>
        </motion.div>
      ))}
    </div>
  );

  const renderSimilarPeople = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">People Like You</h3>
        <div className="text-sm text-gray-600">
          {similarPeople.length} people with similar goals
        </div>
      </div>

      {similarPeople.map((person, index) => (
        <motion.div
          key={person.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card"
        >
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {person.name.split(' ')[0][0]}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{person.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{person.faith}</span>
                    <span>•</span>
                    <span>{person.location}</span>
                    <span>•</span>
                    <span>{person.streak} day streak</span>
                  </div>
                </div>
                <button className="btn-secondary text-sm px-3 py-1">
                  Connect
                </button>
              </div>
              
              <div className="mb-2">
                <span className="text-sm text-gray-600">Common goals: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {person.commonGoals.map((goal, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-vesi-light text-vesi-deep rounded-full">
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{person.mutualConnections} mutual connections</span>
                <span>•</span>
                <span>Active {person.lastActive}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderStudyGroups = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Study Groups</h3>
        <div className="text-sm text-gray-600">
          Join groups for spiritual learning and discussion
        </div>
      </div>

      {studyGroups.map((group, index) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{group.name}</h4>
              <p className="text-gray-600 text-sm mb-3">{group.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <span>{group.members} members</span>
                <span>•</span>
                <span>{group.faith}</span>
                <span>•</span>
                <span>{group.focus}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Next meeting: {group.nextMeeting}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex-1 btn-primary text-sm py-2">
              Join Group
            </button>
            <button className="btn-secondary p-2">
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Community</h3>
            <p className="text-sm text-gray-600">
              Connect with {communityData.totalUsers.toLocaleString()} people on similar spiritual journeys
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-vesi-deep">{communityData.activeThisWeek.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Active this week</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-vesi-deep">{similarPeople.length}</div>
            <div className="text-xs text-gray-600">Similar people</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-vesi-deep">{communityChallenges.length}</div>
            <div className="text-xs text-gray-600">Active challenges</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-vesi-deep">{studyGroups.length}</div>
            <div className="text-xs text-gray-600">Study groups</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-4">
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
      {activeTab === 'activity' && renderActivityFeed()}
      {activeTab === 'challenges' && renderChallenges()}
      {activeTab === 'people' && renderSimilarPeople()}
      {activeTab === 'groups' && renderStudyGroups()}
    </div>
  );
};

export default CommunityFeatures;

