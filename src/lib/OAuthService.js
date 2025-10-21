// OAuth Service for handling user app connections
class OAuthService {
  constructor() {
    // Debug: Check if environment variables are loaded
    console.log('OAuth Service - Environment check:');
    console.log('STRAVA_CLIENT_ID:', process.env.REACT_APP_STRAVA_CLIENT_ID ? 'LOADED' : 'NOT FOUND');
    console.log('STRAVA_CLIENT_SECRET:', process.env.REACT_APP_STRAVA_CLIENT_SECRET ? 'LOADED' : 'NOT FOUND');
    
    this.oauthConfigs = {
      strava: {
        name: 'Strava',
        authUrl: 'https://www.strava.com/oauth/authorize',
        tokenUrl: 'https://www.strava.com/oauth/token',
        clientId: process.env.REACT_APP_STRAVA_CLIENT_ID,
        scopes: ['read,activity:read_all'],
        redirectUri: `${window.location.origin}/oauth/strava/callback`
      },
      garmin: {
        name: 'Garmin Connect',
        authUrl: 'https://connect.garmin.com/oauthConfirm/oauth/authorize',
        tokenUrl: 'https://connect.garmin.com/oauthConfirm/oauth/token',
        clientId: process.env.REACT_APP_GARMIN_CLIENT_ID,
        scopes: ['read'],
        redirectUri: `${window.location.origin}/oauth/garmin/callback`
      },
      spotify: {
        name: 'Spotify',
        authUrl: 'https://accounts.spotify.com/authorize',
        tokenUrl: 'https://accounts.spotify.com/api/token',
        clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        scopes: ['user-read-private', 'user-read-email', 'playlist-read-private', 'user-read-playback-state'],
        redirectUri: `${window.location.origin}/`
      },
      googleFit: {
        name: 'Google Fit',
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenUrl: 'https://oauth2.googleapis.com/token',
        clientId: process.env.REACT_APP_GOOGLE_FIT_CLIENT_ID,
        scopes: ['https://www.googleapis.com/auth/fitness.activity.read'],
        redirectUri: `${window.location.origin}/oauth/googlefit/callback`
      },
      appleHealth: {
        name: 'Apple Health',
        authUrl: 'https://appleid.apple.com/auth/authorize',
        tokenUrl: 'https://appleid.apple.com/auth/token',
        clientId: process.env.REACT_APP_APPLE_HEALTH_CLIENT_ID,
        scopes: ['health:read'],
        redirectUri: `${window.location.origin}/oauth/applehealth/callback`
      },
      fitbit: {
        name: 'Fitbit',
        authUrl: 'https://www.fitbit.com/oauth2/authorize',
        tokenUrl: 'https://api.fitbit.com/oauth2/token',
        clientId: process.env.REACT_APP_FITBIT_CLIENT_ID,
        scopes: ['activity', 'sleep', 'heartrate'],
        redirectUri: `${window.location.origin}/oauth/fitbit/callback`
      },
      myfitnesspal: {
        name: 'MyFitnessPal',
        authUrl: 'https://oauth.myfitnesspal.com/oauth2/authorize',
        tokenUrl: 'https://oauth.myfitnesspal.com/oauth2/token',
        clientId: process.env.REACT_APP_MYFITNESSPAL_CLIENT_ID,
        scopes: ['read'],
        redirectUri: `${window.location.origin}/oauth/myfitnesspal/callback`
      }
    };
  }

  // Initiate OAuth flow for a specific app
  initiateOAuth(appName) {
    const config = this.oauthConfigs[appName];
    if (!config) {
      throw new Error(`OAuth configuration not found for ${appName}`);
    }

    if (!config.clientId) {
      throw new Error(`${appName} OAuth not configured. Please add REACT_APP_${appName.toUpperCase()}_CLIENT_ID to your environment variables.`);
    }

    // Generate state parameter for security
    const state = this.generateState();
    localStorage.setItem(`oauth_state_${appName}`, state);

    // Build OAuth URL
    const authUrl = this.buildAuthUrl(config, state);
    
    // Redirect to OAuth provider
    window.location.href = authUrl;
  }

  // Build OAuth authorization URL
  buildAuthUrl(config, state) {
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: Array.isArray(config.scopes) ? config.scopes.join(' ') : config.scopes,
      response_type: 'code',
      state: state
    });

    return `${config.authUrl}?${params.toString()}`;
  }

  // Handle OAuth callback
  async handleCallback(appName, code, state) {
    const config = this.oauthConfigs[appName];
    const storedState = localStorage.getItem(`oauth_state_${appName}`);
    
    // Verify state parameter
    if (state !== storedState) {
      throw new Error('Invalid state parameter');
    }

    // Exchange code for access token
    const tokenData = await this.exchangeCodeForToken(config, code, appName);
    
    // Store token securely
    this.storeToken(appName, tokenData);
    
    // Clean up state
    localStorage.removeItem(`oauth_state_${appName}`);
    
    return {
      success: true,
      message: `Successfully connected to ${config.name}`,
      token: tokenData.access_token
    };
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(config, code, appName) {
    const response = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: config.clientId,
        client_secret: process.env[`REACT_APP_${appName.toUpperCase()}_CLIENT_SECRET`],
        code: code,
        redirect_uri: config.redirectUri
      })
    });

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    return await response.json();
  }

  // Store access token securely
  storeToken(appName, tokenData) {
    const tokenInfo = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_at: Date.now() + (tokenData.expires_in * 1000),
      scope: tokenData.scope
    };

    // In a real app, you'd store this securely (encrypted localStorage, secure backend, etc.)
    localStorage.setItem(`token_${appName}`, JSON.stringify(tokenInfo));
  }

  // Get stored token
  getToken(appName) {
    const tokenData = localStorage.getItem(`token_${appName}`);
    if (!tokenData) return null;

    const token = JSON.parse(tokenData);
    
    // Check if token is expired
    if (Date.now() > token.expires_at) {
      // Token expired, try to refresh
      return this.refreshToken(appName, token.refresh_token);
    }

    return token.access_token;
  }

  // Refresh expired token
  async refreshToken(appName, refreshToken) {
    const config = this.oauthConfigs[appName];
    
    try {
      const response = await fetch(config.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: config.clientId,
          client_secret: process.env[`REACT_APP_${appName.toUpperCase()}_CLIENT_SECRET`]
        })
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const tokenData = await response.json();
      this.storeToken(appName, tokenData);
      
      return tokenData.access_token;
    } catch (error) {
      // Refresh failed, user needs to re-authenticate
      this.removeToken(appName);
      throw new Error('Token refresh failed. Please reconnect your account.');
    }
  }

  // Remove stored token
  removeToken(appName) {
    localStorage.removeItem(`token_${appName}`);
  }

  // Check if user is connected to an app
  isConnected(appName) {
    const token = this.getToken(appName);
    return !!token;
  }

  // Get all connection statuses
  getConnectionStatus() {
    return Object.keys(this.oauthConfigs).map(appName => ({
      name: appName,
      displayName: this.oauthConfigs[appName].name,
      connected: this.isConnected(appName),
      configured: !!this.oauthConfigs[appName].clientId
    }));
  }

  // Make authenticated API request
  async makeAuthenticatedRequest(appName, endpoint, options = {}) {
    const token = this.getToken(appName);
    if (!token) {
      throw new Error(`Not connected to ${appName}`);
    }

    const baseUrl = this.getApiBaseUrl(appName);
    const url = `${baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid, remove it
        this.removeToken(appName);
        throw new Error('Authentication failed. Please reconnect your account.');
      }
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  }

  // Get API base URL for each service
  getApiBaseUrl(appName) {
    const baseUrls = {
      strava: 'https://www.strava.com/api/v3',
      garmin: 'https://apis.garmin.com',
      spotify: 'https://api.spotify.com/v1',
      googleFit: 'https://www.googleapis.com/fitness/v1',
      fitbit: 'https://api.fitbit.com/1',
      myfitnesspal: 'https://api.myfitnesspal.com/v1'
    };

    return baseUrls[appName] || '';
  }

  // Generate random state parameter
  generateState() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  // Get setup instructions for each app
  getSetupInstructions(appName) {
    const instructions = {
      strava: {
        steps: [
          '1. Go to https://www.strava.com/settings/api',
          '2. Create a new application',
          '3. Fill in application details:',
          '   - Application Name: Vesi Wellness',
          '   - Category: Fitness',
          '   - Website: Your website (optional)',
          '4. Copy the Client ID and Client Secret',
          '5. Add to your .env file:',
          '   REACT_APP_STRAVA_CLIENT_ID=your_client_id',
          '   REACT_APP_STRAVA_CLIENT_SECRET=your_client_secret'
        ],
        required: ['Client ID', 'Client Secret']
      },
      garmin: {
        steps: [
          '1. Visit https://developer.garmin.com/',
          '2. Create a developer account',
          '3. Create a new application',
          '4. Obtain Consumer Key and Consumer Secret',
          '5. Add to your .env file:',
          '   REACT_APP_GARMIN_CLIENT_ID=your_consumer_key',
          '   REACT_APP_GARMIN_CLIENT_SECRET=your_consumer_secret'
        ],
        required: ['Consumer Key', 'Consumer Secret']
      },
      spotify: {
        steps: [
          '1. Go to https://developer.spotify.com/dashboard',
          '2. Create a new application',
          '3. Set redirect URI to: your-domain.com/oauth/spotify/callback',
          '4. Copy Client ID and Client Secret',
          '5. Add to your .env file:',
          '   REACT_APP_SPOTIFY_CLIENT_ID=your_client_id',
          '   REACT_APP_SPOTIFY_CLIENT_SECRET=your_client_secret'
        ],
        required: ['Client ID', 'Client Secret']
      }
    };

    return instructions[appName] || {
      steps: ['OAuth setup instructions not available for this app'],
      required: ['Contact support for setup assistance']
    };
  }
}

export default new OAuthService();
