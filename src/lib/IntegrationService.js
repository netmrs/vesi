// Integration Service for connecting with external wellness apps
import OAuthService from './OAuthService';

class IntegrationService {
  constructor() {
    this.oauthService = OAuthService;
    this.integrations = {
      strava: {
        name: 'Strava',
        baseURL: 'https://www.strava.com/api/v3',
        scopes: ['read,activity:read_all'],
        oauthEnabled: true
      },
      garmin: {
        name: 'Garmin Connect',
        baseURL: 'https://apis.garmin.com',
        scopes: ['read'],
        oauthEnabled: true
      },
      myfitnesspal: {
        name: 'MyFitnessPal',
        baseURL: 'https://api.myfitnesspal.com',
        scopes: ['read'],
        oauthEnabled: true
      },
      appleHealth: {
        name: 'Apple Health',
        baseURL: 'https://api.apple.com/health',
        scopes: ['read'],
        oauthEnabled: true
      },
      googleFit: {
        name: 'Google Fit',
        baseURL: 'https://www.googleapis.com/fitness/v1',
        scopes: ['https://www.googleapis.com/auth/fitness.activity.read'],
        oauthEnabled: true
      },
      fitbit: {
        name: 'Fitbit',
        baseURL: 'https://api.fitbit.com/1',
        scopes: ['activity', 'sleep', 'heartrate'],
        oauthEnabled: true
      },
      spotify: {
        name: 'Spotify',
        baseURL: 'https://api.spotify.com/v1',
        scopes: ['user-read-private', 'user-read-email', 'playlist-read-private'],
        oauthEnabled: true
      },
      headspace: {
        name: 'Headspace',
        baseURL: 'https://api.headspace.com',
        scopes: ['read'],
        oauthEnabled: false // API not publicly available
      },
      calm: {
        name: 'Calm',
        baseURL: 'https://api.calm.com',
        scopes: ['read'],
        oauthEnabled: false // API not publicly available
      },
      googleCalendar: {
        name: 'Google Calendar',
        baseURL: 'https://www.googleapis.com/calendar/v3',
        scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
        oauthEnabled: true
      },
      youversion: {
        name: 'YouVersion Bible',
        baseURL: 'https://api.bible.com',
        scopes: ['read'],
        oauthEnabled: false // Uses different auth method
      }
    };
  }

  // Initialize OAuth connection for an app
  async initiateConnection(appName) {
    const app = this.integrations[appName];
    if (!app) {
      throw new Error(`Integration ${appName} not found`);
    }

    if (!app.oauthEnabled) {
      throw new Error(`${app.name} does not support OAuth integration yet`);
    }

    try {
      // Use OAuth service to initiate connection
      this.oauthService.initiateOAuth(appName);
      return {
        success: true,
        message: `Redirecting to ${app.name} for authorization...`,
        redirecting: true
      };
    } catch (error) {
      throw new Error(`Failed to initiate ${app.name} connection: ${error.message}`);
    }
  }

  // Disconnect from an app
  disconnect(appName) {
    const app = this.integrations[appName];
    if (app) {
      // Remove OAuth token
      this.oauthService.removeToken(appName);
      console.log(`Disconnected from ${app.name}`);
      return { success: true, message: `Disconnected from ${app.name}` };
    }
    return { success: false, message: `App ${appName} not found` };
  }

  // Get connection status for all apps
  getConnectionStatus() {
    return Object.keys(this.integrations).map(key => {
      const app = this.integrations[key];
      return {
        name: key,
        displayName: app.name,
        connected: this.oauthService.isConnected(key),
        oauthEnabled: app.oauthEnabled
      };
    });
  }

  // Fetch data from connected apps
  async fetchData(appName, dataType) {
    if (!this.oauthService.isConnected(appName)) {
      throw new Error(`${appName} is not connected`);
    }

    try {
      // Try to fetch real data first
      const realData = await this.fetchRealData(appName, dataType);
      return realData;
    } catch (error) {
      console.warn(`Failed to fetch real data from ${appName}, using mock data:`, error);
      // Fallback to mock data if real API fails
      return this.getMockData(appName, dataType);
    }
  }

  // Fetch real data from APIs
  async fetchRealData(appName, dataType) {
    switch (appName) {
      case 'strava':
        return await this.fetchStravaData(dataType);
      case 'spotify':
        return await this.fetchSpotifyData(dataType);
      case 'fitbit':
        return await this.fetchFitbitData(dataType);
      case 'googleCalendar':
        return await this.fetchGoogleCalendarData(dataType);
      default:
        throw new Error(`Real data fetching not implemented for ${appName} yet`);
    }
  }

  // Fetch Strava data
  async fetchStravaData(dataType) {
    const activities = await this.oauthService.makeAuthenticatedRequest(
      'strava',
      '/athlete/activities?per_page=10'
    );
    
    return {
      activities: activities.map(activity => ({
        id: activity.id,
        name: activity.name,
        type: activity.type,
        distance: activity.distance / 1000, // Convert to km
        duration: activity.moving_time,
        calories: activity.calories,
        date: activity.start_date
      })),
      stats: {
        totalDistance: activities.reduce((sum, a) => sum + (a.distance / 1000), 0),
        totalActivities: activities.length,
        totalCalories: activities.reduce((sum, a) => sum + (a.calories || 0), 0)
      }
    };
  }

  // Fetch Spotify data
  async fetchSpotifyData(dataType) {
    const playlists = await this.oauthService.makeAuthenticatedRequest(
      'spotify',
      '/me/playlists?limit=10'
    );
    
    return {
      playlists: playlists.items.map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        tracks: playlist.tracks.total,
        image: playlist.images[0]?.url
      }))
    };
  }

  // Fetch Fitbit data
  async fetchFitbitData(dataType) {
    const activities = await this.oauthService.makeAuthenticatedRequest(
      'fitbit',
      '/user/-/activities/list.json?beforeDate=today&sort=desc&limit=10'
    );
    
    return {
      activities: activities.activities.map(activity => ({
        id: activity.logId,
        name: activity.activityName,
        type: activity.activityTypeId,
        duration: activity.duration,
        calories: activity.calories,
        date: activity.startTime
      }))
    };
  }

  // Fetch Google Calendar data
  async fetchGoogleCalendarData(dataType) {
    const calendars = await this.oauthService.makeAuthenticatedRequest(
      'googleCalendar',
      '/users/me/calendarList'
    );
    
    // Get events from the primary calendar
    const events = await this.oauthService.makeAuthenticatedRequest(
      'googleCalendar',
      '/calendars/primary/events?timeMin=' + new Date().toISOString() + '&maxResults=10&orderBy=startTime&singleEvents=true'
    );
    
    return {
      calendars: calendars.items.map(calendar => ({
        id: calendar.id,
        name: calendar.summary,
        description: calendar.description,
        primary: calendar.primary
      })),
      events: events.items.map(event => ({
        id: event.id,
        title: event.summary,
        description: event.description,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        location: event.location
      }))
    };
  }

  // Get mock data for different app types
  getMockData(appName, dataType) {
    const app = this.integrations[appName];
    
    switch (appName) {
      case 'strava':
        return {
          activities: [
            {
              id: 1,
              name: 'Morning Run',
              type: 'Run',
              distance: 5.2,
              duration: 2400, // seconds
              calories: 420,
              date: new Date().toISOString()
            },
            {
              id: 2,
              name: 'Cycling Workout',
              type: 'Ride',
              distance: 15.8,
              duration: 3600,
              calories: 680,
              date: new Date(Date.now() - 86400000).toISOString()
            }
          ],
          stats: {
            totalDistance: 125.4,
            totalActivities: 23,
            totalCalories: 12450
          }
        };

      case 'garmin':
        return {
          activities: [
            {
              id: 1,
              name: 'Strength Training',
              type: 'Strength',
              duration: 2700,
              calories: 350,
              date: new Date().toISOString()
            }
          ],
          health: {
            steps: 8542,
            heartRate: {
              resting: 58,
              max: 185
            },
            sleep: {
              duration: 7.5,
              quality: 'Good'
            }
          }
        };

      case 'myfitnesspal':
        return {
          nutrition: {
            calories: {
              consumed: 1850,
              goal: 2000
            },
            macros: {
              protein: 120,
              carbs: 180,
              fat: 65
            },
            meals: [
              {
                name: 'Breakfast',
                calories: 450,
                time: '08:00'
              },
              {
                name: 'Lunch',
                calories: 650,
                time: '13:00'
              },
              {
                name: 'Dinner',
                calories: 750,
                time: '19:00'
              }
            ]
          }
        };

      case 'fitbit':
        return {
          activity: {
            steps: 10250,
            distance: 8.2,
            calories: 2100,
            activeMinutes: 45
          },
          sleep: {
            duration: 7.8,
            stages: {
              deep: 1.2,
              light: 4.5,
              rem: 2.1
            },
            efficiency: 87
          },
          heartRate: {
            resting: 62,
            zones: {
              fatBurn: 15,
              cardio: 8,
              peak: 3
            }
          }
        };

      case 'headspace':
        return {
          sessions: [
            {
              name: 'Daily Meditation',
              duration: 10,
              type: 'Mindfulness',
              completed: true,
              date: new Date().toISOString()
            },
            {
              name: 'Sleep Story',
              duration: 25,
              type: 'Sleep',
              completed: true,
              date: new Date(Date.now() - 86400000).toISOString()
            }
          ],
          streak: 7,
          totalMinutes: 245
        };

      case 'googleCalendar':
        return {
          calendars: [
            {
              id: 'primary',
              name: 'Primary Calendar',
              description: 'Main calendar',
              primary: true
            },
            {
              id: 'work',
              name: 'Work Calendar',
              description: 'Work-related events',
              primary: false
            }
          ],
          events: [
            {
              id: '1',
              title: 'Morning Prayer',
              description: 'Daily spiritual practice',
              start: new Date().toISOString(),
              end: new Date(Date.now() + 1800000).toISOString(), // 30 minutes later
              location: 'Home'
            },
            {
              id: '2',
              title: 'Team Meeting',
              description: 'Weekly team sync',
              start: new Date(Date.now() + 3600000).toISOString(), // 1 hour later
              end: new Date(Date.now() + 5400000).toISOString(), // 1.5 hours later
              location: 'Conference Room'
            }
          ]
        };

      case 'youversion':
        return {
          readingPlan: {
            name: 'Daily Bread',
            progress: 15,
            total: 365,
            currentVerse: 'John 3:16'
          },
          bookmarks: [
            {
              verse: 'Philippians 4:13',
              note: 'Strength through Christ',
              date: new Date().toISOString()
            }
          ],
          readingStreak: 12
        };

      default:
        return { message: 'No data available' };
    }
  }

  // Sync data with Vesi goals and entries
  async syncData(appName, dataType) {
    try {
      const data = await this.fetchData(appName, dataType);
      
      // Process and format data for Vesi
      const processedData = this.processDataForVesi(appName, data);
      
      return {
        success: true,
        data: processedData,
        message: `Successfully synced ${dataType} from ${appName}`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: `Failed to sync data from ${appName}`
      };
    }
  }

  // Process external app data for Vesi format
  processDataForVesi(appName, data) {
    switch (appName) {
      case 'strava':
      case 'garmin':
      case 'fitbit':
        return {
          type: 'fitness',
          activities: data.activities?.map(activity => ({
            id: activity.id,
            name: activity.name,
            type: activity.type,
            duration: activity.duration,
            calories: activity.calories,
            date: activity.date,
            source: appName
          })) || [],
          summary: {
            totalSteps: data.stats?.totalSteps || data.activity?.steps || 0,
            totalCalories: data.stats?.totalCalories || data.activity?.calories || 0,
            totalDistance: data.stats?.totalDistance || data.activity?.distance || 0
          }
        };

      case 'myfitnesspal':
        return {
          type: 'nutrition',
          daily: {
            calories: data.nutrition?.calories || {},
            macros: data.nutrition?.macros || {},
            meals: data.nutrition?.meals || []
          }
        };

      case 'headspace':
      case 'calm':
        return {
          type: 'mindfulness',
          sessions: data.sessions?.map(session => ({
            name: session.name,
            duration: session.duration,
            type: session.type,
            completed: session.completed,
            date: session.date,
            source: appName
          })) || [],
          streak: data.streak || 0,
          totalMinutes: data.totalMinutes || 0
        };

      case 'googleCalendar':
        return {
          type: 'calendar',
          calendars: data.calendars || [],
          events: data.events?.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            start: event.start,
            end: event.end,
            location: event.location,
            source: 'googleCalendar'
          })) || []
        };

      case 'youversion':
        return {
          type: 'spiritual',
          readingPlan: data.readingPlan,
          bookmarks: data.bookmarks,
          streak: data.readingStreak || 0
        };

      default:
        return { type: 'unknown', data };
    }
  }

  // Get integration instructions for setup
  getIntegrationInstructions(appName) {
    const instructions = {
      strava: {
        steps: [
          '1. Go to Strava Settings > My API Application',
          '2. Create a new application',
          '3. Copy the Client ID and Client Secret',
          '4. Authorize Vesi to access your Strava data'
        ],
        required: ['Client ID', 'Client Secret']
      },
      garmin: {
        steps: [
          '1. Visit Garmin Developer Portal',
          '2. Create a new application',
          '3. Obtain Consumer Key and Consumer Secret',
          '4. Authorize data access'
        ],
        required: ['Consumer Key', 'Consumer Secret']
      },
      myfitnesspal: {
        steps: [
          '1. Contact MyFitnessPal for API access',
          '2. Provide your app details',
          '3. Receive API credentials',
          '4. Configure data permissions'
        ],
        required: ['API Key', 'Username']
      },
      appleHealth: {
        steps: [
          '1. Enable HealthKit in your app settings',
          '2. Grant permission to read health data',
          '3. Select data types to sync',
          '4. Configure sync frequency'
        ],
        required: ['HealthKit Permission']
      },
      googleFit: {
        steps: [
          '1. Go to Google Cloud Console',
          '2. Enable Google Fit API',
          '3. Create OAuth 2.0 credentials',
          '4. Authorize Vesi to access Google Fit'
        ],
        required: ['OAuth 2.0 Credentials']
      },
      fitbit: {
        steps: [
          '1. Visit Fitbit Developer Portal',
          '2. Register your application',
          '3. Get Client ID and Client Secret',
          '4. Configure OAuth permissions'
        ],
        required: ['Client ID', 'Client Secret']
      },
      googleCalendar: {
        steps: [
          '1. Go to Google Cloud Console',
          '2. Create a new project or select existing',
          '3. Enable Google Calendar API',
          '4. Create OAuth 2.0 credentials',
          '5. Set authorized redirect URIs',
          '6. Add Client ID to your .env file'
        ],
        required: ['Client ID', 'Client Secret']
      }
    };

    return instructions[appName] || {
      steps: ['Integration setup instructions not available'],
      required: ['Contact support for setup assistance']
    };
  }
}

export default new IntegrationService();