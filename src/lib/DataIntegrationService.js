// Data Integration Service for combining OAuth data with Vesi app features
import integrationService from './IntegrationService';

class DataIntegrationService {
  constructor() {
    this.integrationService = integrationService;
  }

  // Get Strava data and create fitness insights
  async getFitnessInsights() {
    try {
      const stravaData = await this.integrationService.fetchData('strava', 'activities');
      if (!stravaData) return null;

      return {
        recentActivities: stravaData.activities?.slice(0, 5) || [],
        weeklyStats: this.calculateWeeklyStats(stravaData.activities),
        achievements: this.calculateAchievements(stravaData.activities),
        goals: this.generateFitnessGoals(stravaData.activities)
      };
    } catch (error) {
      console.error('Error getting fitness insights:', error);
      return null;
    }
  }

  // Get Google Calendar data and create spiritual scheduling insights
  async getCalendarInsights() {
    try {
      const calendarData = await this.integrationService.fetchData('googleCalendar', 'events');
      if (!calendarData) return null;

      return {
        upcomingEvents: calendarData.events?.slice(0, 10) || [],
        spiritualTimeBlocks: this.identifySpiritualTimeBlocks(calendarData.events),
        busyTimes: this.identifyBusyTimes(calendarData.events),
        goalSuggestions: this.generateCalendarGoals(calendarData.events)
      };
    } catch (error) {
      console.error('Error getting calendar insights:', error);
      return null;
    }
  }

  // Calculate weekly fitness stats from Strava activities
  calculateWeeklyStats(activities) {
    if (!activities) return {};

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentActivities = activities.filter(activity => 
      new Date(activity.start_date) >= oneWeekAgo
    );

    const totalDistance = recentActivities.reduce((sum, activity) => 
      sum + (activity.distance || 0), 0
    );
    const totalCalories = recentActivities.reduce((sum, activity) => 
      sum + (activity.calories || 0), 0
    );
    const totalTime = recentActivities.reduce((sum, activity) => 
      sum + (activity.moving_time || 0), 0
    );

    return {
      totalDistance: Math.round(totalDistance / 1000 * 100) / 100, // Convert to km
      totalCalories,
      totalTime: Math.round(totalTime / 60), // Convert to minutes
      activityCount: recentActivities.length,
      averagePace: recentActivities.length > 0 ? 
        Math.round(totalTime / recentActivities.length / 60) : 0
    };
  }

  // Calculate achievements based on Strava activities
  calculateAchievements(activities) {
    if (!activities) return [];

    const achievements = [];
    const totalActivities = activities.length;
    const totalDistance = activities.reduce((sum, activity) => 
      sum + (activity.distance || 0), 0
    );

    // Distance achievements
    if (totalDistance >= 1000000) { // 1000km
      achievements.push({
        title: 'Distance Master',
        description: 'Completed 1000km of activities',
        icon: '🏆',
        unlocked: true
      });
    }

    // Consistency achievements
    const weeklyActivities = this.getWeeklyActivityCounts(activities);
    const maxWeeklyStreak = Math.max(...weeklyActivities);
    if (maxWeeklyStreak >= 5) {
      achievements.push({
        title: 'Consistency Champion',
        description: '5+ activities in a week',
        icon: '🔥',
        unlocked: true
      });
    }

    // Activity count achievements
    if (totalActivities >= 100) {
      achievements.push({
        title: 'Century Club',
        description: '100+ activities completed',
        icon: '💯',
        unlocked: true
      });
    }

    return achievements;
  }

  // Generate fitness goals based on Strava data
  generateFitnessGoals(activities) {
    if (!activities) return [];

    const goals = [];
    const weeklyStats = this.calculateWeeklyStats(activities);

    // Distance goal
    if (weeklyStats.totalDistance < 20) {
      goals.push({
        id: 'weekly-distance',
        title: 'Weekly Distance Goal',
        description: `Complete 20km this week (currently ${weeklyStats.totalDistance}km)`,
        target: 20,
        current: weeklyStats.totalDistance,
        category: 'health',
        frequency: 'weekly',
        type: 'strava-integrated'
      });
    }

    // Activity frequency goal
    if (weeklyStats.activityCount < 3) {
      goals.push({
        id: 'weekly-activities',
        title: 'Weekly Activity Goal',
        description: `Complete 3 activities this week (currently ${weeklyStats.activityCount})`,
        target: 3,
        current: weeklyStats.activityCount,
        category: 'health',
        frequency: 'weekly',
        type: 'strava-integrated'
      });
    }

    // Calorie goal
    if (weeklyStats.totalCalories < 2000) {
      goals.push({
        id: 'weekly-calories',
        title: 'Weekly Calorie Goal',
        description: `Burn 2000 calories this week (currently ${weeklyStats.totalCalories})`,
        target: 2000,
        current: weeklyStats.totalCalories,
        category: 'health',
        frequency: 'weekly',
        type: 'strava-integrated'
      });
    }

    return goals;
  }

  // Identify spiritual time blocks in calendar
  identifySpiritualTimeBlocks(events) {
    if (!events) return [];

    const spiritualKeywords = [
      'prayer', 'meditation', 'bible', 'church', 'worship', 'devotion',
      'spiritual', 'faith', 'god', 'jesus', 'christian', 'fellowship'
    ];

    return events.filter(event => 
      spiritualKeywords.some(keyword => 
        event.summary?.toLowerCase().includes(keyword) ||
        event.description?.toLowerCase().includes(keyword)
      )
    );
  }

  // Identify busy times in calendar
  identifyBusyTimes(events) {
    if (!events) return [];

    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    return events.filter(event => {
      const eventDate = new Date(event.start.dateTime || event.start.date);
      return eventDate >= today && eventDate <= tomorrow;
    });
  }

  // Generate calendar-based goals
  generateCalendarGoals(events) {
    if (!events) return [];

    const goals = [];
    const spiritualTimeBlocks = this.identifySpiritualTimeBlocks(events);
    const busyTimes = this.identifyBusyTimes(events);

    // Spiritual time goal
    if (spiritualTimeBlocks.length < 3) {
      goals.push({
        id: 'weekly-spiritual-time',
        title: 'Weekly Spiritual Time',
        description: 'Schedule 3 spiritual activities this week',
        target: 3,
        current: spiritualTimeBlocks.length,
        category: 'spiritual',
        frequency: 'weekly',
        type: 'calendar-integrated'
      });
    }

    // Work-life balance goal
    if (busyTimes.length > 8) {
      goals.push({
        id: 'work-life-balance',
        title: 'Work-Life Balance',
        description: 'Limit daily commitments to maintain balance',
        target: 8,
        current: busyTimes.length,
        category: 'mindfulness',
        frequency: 'daily',
        type: 'calendar-integrated'
      });
    }

    return goals;
  }

  // Get weekly activity counts for streak calculation
  getWeeklyActivityCounts(activities) {
    if (!activities) return [];

    const weeklyCounts = {};
    activities.forEach(activity => {
      const date = new Date(activity.start_date);
      const weekKey = this.getWeekKey(date);
      weeklyCounts[weekKey] = (weeklyCounts[weekKey] || 0) + 1;
    });

    return Object.values(weeklyCounts);
  }

  // Helper function to get week key
  getWeekKey(date) {
    const year = date.getFullYear();
    const week = Math.ceil((date.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
    return `${year}-${week}`;
  }

  // Combine all insights for dashboard
  async getAllInsights() {
    const [fitnessInsights, calendarInsights] = await Promise.all([
      this.getFitnessInsights(),
      this.getCalendarInsights()
    ]);

    return {
      fitness: fitnessInsights,
      calendar: calendarInsights,
      combinedGoals: [
        ...(fitnessInsights?.goals || []),
        ...(calendarInsights?.goalSuggestions || [])
      ],
      achievements: [
        ...(fitnessInsights?.achievements || [])
      ]
    };
  }
}

export default new DataIntegrationService();
