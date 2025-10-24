import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Heart, 
  Zap, 
  Target, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle,
  Lightbulb,
  Users,
  Star,
  Play,
  Dumbbell,
  Utensils,
  Moon,
  Droplets,
  Trophy,
  Flame
} from 'lucide-react';
import dataIntegrationService from '../lib/DataIntegrationService';

const Physical = ({ user, goals = [], entries = [] }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [fitnessInsights, setFitnessInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'sleep', label: 'Sleep', icon: Moon },
    { id: 'hydration', label: 'Hydration', icon: Droplets }
  ];

  // Load fitness insights when component mounts
  useEffect(() => {
    const loadFitnessData = async () => {
      setLoading(true);
      try {
        const insights = await dataIntegrationService.getFitnessInsights();
        setFitnessInsights(insights);
      } catch (error) {
        console.error('Error loading fitness data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFitnessData();
  }, []);

  // Physical health data - use real Strava data when available
  const physicalHealthData = {
    stepsToday: fitnessInsights?.weeklyStats?.totalDistance ? 
      Math.round(fitnessInsights.weeklyStats.totalDistance * 1000) : 8542,
    caloriesBurned: fitnessInsights?.weeklyStats?.totalCalories || 320,
    waterIntake: 6, // glasses
    sleepHours: 7.5,
    weeklyWorkouts: fitnessInsights?.weeklyStats?.activityCount || 4,
    currentWeight: 165,
    weeklyGoals: [
      { id: 1, title: 'Daily 10k steps', completed: 5, total: 7 },
      { id: 2, title: 'Workout 4x per week', completed: fitnessInsights?.weeklyStats?.activityCount || 3, total: 4 },
      { id: 3, title: 'Drink 8 glasses water', completed: 6, total: 7 }
    ],
    insights: [
      fitnessInsights?.weeklyStats?.activityCount > 3 ? 
        `Great job completing ${fitnessInsights.weeklyStats.activityCount} activities this week!` :
        'Great job maintaining your step goal this week!',
      'Your sleep quality has improved 15% compared to last month',
      fitnessInsights?.achievements?.length > 0 ? 
        `You've unlocked ${fitnessInsights.achievements.length} new achievements!` :
        'Consider adding more protein to support your fitness goals'
    ]
  };

  const fitnessWorkouts = [
    {
      id: 1,
      title: 'Morning Cardio Blast',
      duration: '25 min',
      calories: '200-250',
      difficulty: 'Intermediate',
      type: 'Cardio',
      equipment: 'None'
    },
    {
      id: 2,
      title: 'Strength Training',
      duration: '45 min',
      calories: '300-400',
      difficulty: 'Advanced',
      type: 'Strength',
      equipment: 'Weights'
    },
    {
      id: 3,
      title: 'Yoga Flow',
      duration: '30 min',
      calories: '150-200',
      difficulty: 'Beginner',
      type: 'Flexibility',
      equipment: 'Mat'
    }
  ];

  const nutritionTips = [
    {
      title: 'Balanced Macronutrients',
      description: 'Aim for 40% carbs, 30% protein, 30% healthy fats',
      icon: Target,
      color: 'text-green-500'
    },
    {
      title: 'Meal Timing',
      description: 'Eat every 3-4 hours to maintain stable energy',
      icon: Clock,
      color: 'text-blue-500'
    },
    {
      title: 'Hydration Priority',
      description: 'Start your day with water before coffee',
      icon: Droplets,
      color: 'text-blue-400'
    },
    {
      title: 'Whole Foods Focus',
      description: 'Choose minimally processed, nutrient-dense foods',
      icon: Utensils,
      color: 'text-orange-500'
    }
  ];

  const sleepData = [
    { day: 'Mon', hours: 7.5, quality: 4 },
    { day: 'Tue', hours: 8.0, quality: 5 },
    { day: 'Wed', hours: 6.5, quality: 3 },
    { day: 'Thu', hours: 7.8, quality: 4 },
    { day: 'Fri', hours: 8.2, quality: 5 },
    { day: 'Sat', hours: 9.0, quality: 5 },
    { day: 'Sun', hours: 8.5, quality: 4 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Physical Health Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card text-center">
                <div className="p-3 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{physicalHealthData.stepsToday.toLocaleString()}</h4>
                <p className="text-sm text-gray-600">Steps Today</p>
              </div>

              <div className="card text-center">
                <div className="p-3 bg-red-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{physicalHealthData.caloriesBurned}</h4>
                <p className="text-sm text-gray-600">Calories Burned</p>
              </div>

              <div className="card text-center">
                <div className="p-3 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{physicalHealthData.waterIntake}/8</h4>
                <p className="text-sm text-gray-600">Glasses Water</p>
              </div>

              <div className="card text-center">
                <div className="p-3 bg-purple-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Moon className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{physicalHealthData.sleepHours}h</h4>
                <p className="text-sm text-gray-600">Sleep Last Night</p>
              </div>
            </div>

            {/* Weekly Goals */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week's Physical Goals</h3>
              <div className="space-y-3">
                {physicalHealthData.weeklyGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{goal.title}</h4>
                      <p className="text-sm text-gray-600">{goal.completed}/{goal.total} completed</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${(goal.completed / goal.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-green-600">
                        {Math.round((goal.completed / goal.total) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="card bg-gradient-to-br from-green-50 to-blue-50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Physical Health Insights</h3>
                  <p className="text-sm text-gray-600">AI-powered recommendations</p>
                </div>
              </div>
              <div className="space-y-3">
                {physicalHealthData.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strava Achievements */}
            {fitnessInsights?.achievements?.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  Recent Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fitnessInsights.achievements.slice(0, 4).map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Strava Activities */}
            {fitnessInsights?.recentActivities?.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity className="h-5 w-5 text-vesi-deep mr-2" />
                  Recent Activities
                </h3>
                <div className="space-y-3">
                  {fitnessInsights.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-vesi-light rounded-full flex items-center justify-center">
                          <Activity className="h-5 w-5 text-vesi-deep" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{activity.name || 'Activity'}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(activity.start_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.distance ? `${Math.round(activity.distance / 1000 * 100) / 100}km` : 'N/A'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.moving_time ? `${Math.round(activity.moving_time / 60)}min` : 'N/A'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'fitness':
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              {fitnessWorkouts.map((workout) => (
                <motion.div
                  key={workout.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{workout.title}</h3>
                        <p className="text-sm text-gray-600">{workout.calories} calories • {workout.equipment}</p>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {workout.duration}
                          </span>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {workout.difficulty}
                          </span>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                            {workout.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary text-sm"
                    >
                      Start
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'nutrition':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nutritionTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-5 w-5 ${tip.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                        <p className="text-sm text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Meal Planning */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Meal Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Breakfast</h4>
                  <p className="text-sm text-orange-600">Oatmeal with berries & nuts</p>
                  <p className="text-xs text-orange-500 mt-1">~400 calories</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Lunch</h4>
                  <p className="text-sm text-green-600">Grilled chicken salad</p>
                  <p className="text-xs text-green-500 mt-1">~500 calories</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Dinner</h4>
                  <p className="text-sm text-blue-600">Salmon with vegetables</p>
                  <p className="text-xs text-blue-500 mt-1">~600 calories</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sleep':
        return (
          <div className="space-y-6">
            {/* Sleep Chart */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Sleep Tracking</h3>
              <div className="grid grid-cols-7 gap-2">
                {sleepData.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-500 mb-2">{day.day}</div>
                    <div className="space-y-1">
                      <div className={`w-full h-12 rounded flex flex-col items-center justify-center text-xs font-medium ${
                        day.hours >= 8 ? 'bg-green-100 text-green-800' : 
                        day.hours >= 7 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {day.hours}h
                      </div>
                      <div className="text-xs text-gray-500">
                        {day.quality}/5 ⭐
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sleep Tips */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sleep Optimization Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Consistent Schedule</h4>
                    <p className="text-sm text-gray-600">Go to bed and wake up at the same time daily</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Moon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Dark Environment</h4>
                    <p className="text-sm text-gray-600">Keep your bedroom cool, dark, and quiet</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">No Screens</h4>
                    <p className="text-sm text-gray-600">Avoid screens 1 hour before bedtime</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Relaxation</h4>
                    <p className="text-sm text-gray-600">Practice meditation or gentle stretching</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'hydration':
        return (
          <div className="space-y-6">
            {/* Hydration Tracker */}
            <div className="card text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Hydration Goal</h3>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{physicalHealthData.waterIntake}/8</div>
                    <div className="text-sm text-gray-600">glasses</div>
                  </div>
                </div>
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full transition-all duration-500"
                  style={{ height: `${(physicalHealthData.waterIntake / 8) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-center space-x-2">
                {[...Array(8)].map((_, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      index < physicalHealthData.waterIntake
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-blue-300 text-blue-300'
                    }`}
                  >
                    <Droplets className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Hydration Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card">
                <h4 className="font-semibold text-gray-900 mb-2">Hydration Benefits</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Improved energy levels</li>
                  <li>• Better skin health</li>
                  <li>• Enhanced cognitive function</li>
                  <li>• Proper digestion</li>
                </ul>
              </div>
              <div className="card">
                <h4 className="font-semibold text-gray-900 mb-2">Hydration Tips</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Start with water before coffee</li>
                  <li>• Keep water bottle nearby</li>
                  <li>• Eat water-rich foods</li>
                  <li>• Monitor urine color</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Activity className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-lora font-bold text-gray-900 mb-2">
          Physical Wellness
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Build strength, endurance, and vitality through fitness, nutrition, sleep, and healthy habits.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-vesi-deep bg-vesi-light text-vesi-deep'
                    : 'border-gray-200 hover:border-vesi-blue hover:bg-gray-50 text-gray-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

export default Physical;

