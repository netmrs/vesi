import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Crown, 
  Flame, 
  Zap, 
  Gem, 
  Award, 
  Target,
  Calendar,
  CheckCircle,
  TrendingUp,
  Sparkles,
  Heart,
  Shield,
  Sword
} from 'lucide-react';

const GamificationSystem = ({ goals, entries, user }) => {
  const [userStats, setUserStats] = useState({
    level: 1,
    experience: 0,
    totalStreak: 0,
    achievements: [],
    badges: [],
    weeklyProgress: 0,
    monthlyProgress: 0
  });
  
  const [recentAchievements, setRecentAchievements] = useState([]);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Calculate user stats and achievements
  useEffect(() => {
    const totalStreak = goals.reduce((sum, goal) => sum + goal.streak, 0);
    const completedGoals = goals.filter(g => g.completed).length;
    const totalEntries = entries.length;
    
    // Experience calculation
    const experience = (totalStreak * 10) + (completedGoals * 50) + (totalEntries * 5);
    
    // Level calculation (100 XP per level)
    const level = Math.floor(experience / 100) + 1;
    
    // Check for level up
    if (level > userStats.level) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
    
    // Achievement system
    const achievements = [];
    
    // Streak achievements
    if (totalStreak >= 7) achievements.push({
      id: 'week-warrior',
      name: 'Week Warrior',
      description: 'Maintained a 7-day streak',
      icon: Trophy,
      color: 'text-yellow-600',
      rarity: 'common'
    });
    if (totalStreak >= 30) achievements.push({
      id: 'month-master',
      name: 'Month Master',
      description: 'Maintained a 30-day streak',
      icon: Star,
      color: 'text-blue-600',
      rarity: 'rare'
    });
    if (totalStreak >= 100) achievements.push({
      id: 'century-champion',
      name: 'Century Champion',
      description: 'Maintained a 100-day streak',
      icon: Crown,
      color: 'text-purple-600',
      rarity: 'legendary'
    });
    
    // Goal achievements
    if (completedGoals >= 5) achievements.push({
      id: 'goal-getter',
      name: 'Goal Getter',
      description: 'Completed 5 goals',
      icon: Target,
      color: 'text-green-600',
      rarity: 'common'
    });
    if (completedGoals >= 10) achievements.push({
      id: 'achievement-hunter',
      name: 'Achievement Hunter',
      description: 'Completed 10 goals',
      icon: Award,
      color: 'text-orange-600',
      rarity: 'rare'
    });
    
    // Journal achievements
    if (totalEntries >= 10) achievements.push({
      id: 'reflective-soul',
      name: 'Reflective Soul',
      description: 'Wrote 10 journal entries',
      icon: Heart,
      color: 'text-pink-600',
      rarity: 'common'
    });
    if (totalEntries >= 50) achievements.push({
      id: 'wise-scribe',
      name: 'Wise Scribe',
      description: 'Wrote 50 journal entries',
      icon: Gem,
      color: 'text-purple-600',
      rarity: 'rare'
    });
    
    // Spiritual growth achievements
    const spiritualGoals = goals.filter(g => g.category === 'spiritual').length;
    if (spiritualGoals >= 3) achievements.push({
      id: 'spiritual-seeker',
      name: 'Spiritual Seeker',
      description: 'Set 3 spiritual goals',
      icon: Sparkles,
      color: 'text-blue-600',
      rarity: 'common'
    });
    
    // Consistency achievements
    const weeklyGoals = goals.filter(g => g.frequency === 'weekly').length;
    if (weeklyGoals >= 3) achievements.push({
      id: 'consistent-follower',
      name: 'Consistent Follower',
      description: 'Maintained 3 weekly habits',
      icon: Calendar,
      color: 'text-green-600',
      rarity: 'rare'
    });
    
    setUserStats({
      level,
      experience,
      totalStreak,
      achievements,
      badges: achievements,
      weeklyProgress: Math.min((completedGoals / goals.length) * 100, 100),
      monthlyProgress: Math.min((totalStreak / 30) * 100, 100)
    });
  }, [goals, entries]);

  const getLevelTitle = (level) => {
    if (level >= 10) return 'Spiritual Master';
    if (level >= 8) return 'Faithful Disciple';
    if (level >= 6) return 'Devoted Follower';
    if (level >= 4) return 'Growing Believer';
    if (level >= 2) return 'Seeker';
    return 'New Believer';
  };

  const getLevelIcon = (level) => {
    if (level >= 10) return Crown;
    if (level >= 8) return Trophy;
    if (level >= 6) return Star;
    if (level >= 4) return Flame;
    if (level >= 2) return Target;
    return Shield;
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 border-gray-300';
      case 'rare': return 'bg-blue-100 border-blue-300';
      case 'epic': return 'bg-purple-100 border-purple-300';
      case 'legendary': return 'bg-yellow-100 border-yellow-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const LevelIcon = getLevelIcon(userStats.level);

  return (
    <div className="space-y-6">
      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-white rounded-2xl p-8 text-center max-w-md mx-4"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Level Up!</h2>
              <p className="text-lg text-gray-600 mb-2">
                You've reached level {userStats.level}
              </p>
              <p className="text-sm text-gray-500">
                {getLevelTitle(userStats.level)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Card */}
      <div className="card bg-gradient-to-br from-vesi-deep to-vesi-accent text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <LevelIcon className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                {userStats.level}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{getLevelTitle(userStats.level)}</h2>
              <p className="text-white text-opacity-80">Level {userStats.level}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Flame className="h-4 w-4 text-orange-300" />
                <span className="text-sm">{userStats.totalStreak} day streak</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold">{userStats.experience}</div>
            <div className="text-sm text-white text-opacity-80">Total XP</div>
            <div className="w-24 bg-white bg-opacity-20 rounded-full h-2 mt-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(userStats.experience % 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-white text-opacity-70 mt-1">
              {100 - (userStats.experience % 100)} XP to next level
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Weekly Progress</h3>
              <p className="text-sm text-gray-600">Goal completion rate</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${userStats.weeklyProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{userStats.weeklyProgress.toFixed(0)}% complete</p>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Monthly Progress</h3>
              <p className="text-sm text-gray-600">Streak consistency</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${userStats.monthlyProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{userStats.monthlyProgress.toFixed(0)}% consistent</p>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Achievements</h3>
              <p className="text-sm text-gray-600">Badges earned</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-600">{userStats.achievements.length}</div>
          <p className="text-sm text-gray-600">Total badges</p>
        </div>
      </div>

      {/* Achievements Gallery */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Achievement Gallery</h3>
        
        {userStats.achievements.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {userStats.achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 text-center hover:shadow-lg transition-shadow ${getRarityColor(achievement.rarity)}`}
                >
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${achievement.color}`} />
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">{achievement.name}</h4>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Complete goals and build streaks to earn achievements!</p>
          </div>
        )}
      </div>

      {/* Daily Challenges */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Challenges</h3>
        <div className="space-y-3">
          {[
            { 
              name: 'Complete 3 Goals Today', 
              reward: '+50 XP', 
              progress: Math.min(goals.filter(g => g.completed).length, 3),
              max: 3,
              icon: Target
            },
            { 
              name: 'Write a Journal Entry', 
              reward: '+25 XP', 
              progress: entries.length > 0 ? 1 : 0,
              max: 1,
              icon: Heart
            },
            { 
              name: 'Maintain Your Streak', 
              reward: '+10 XP', 
              progress: userStats.totalStreak > 0 ? 1 : 0,
              max: 1,
              icon: Flame
            }
          ].map((challenge, index) => {
            const Icon = challenge.icon;
            const isCompleted = challenge.progress >= challenge.max;
            return (
              <div key={index} className={`p-4 rounded-lg border transition-colors ${
                isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-5 w-5 ${isCompleted ? 'text-green-600' : 'text-gray-600'}`} />
                    <div>
                      <h4 className="font-medium text-gray-900">{challenge.name}</h4>
                      <p className="text-sm text-gray-600">Reward: {challenge.reward}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <div className="text-sm text-gray-600">
                        {challenge.progress}/{challenge.max}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GamificationSystem;

