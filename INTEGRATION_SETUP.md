# Vesi Integration Setup Guide

Welcome to Vesi's real-world integration setup! This guide will help you set up OAuth integrations so users can connect their own accounts to your app.

## 🔐 OAuth Integration Overview

Vesi uses OAuth 2.0 to securely connect users' accounts without requiring them to share credentials. Users authorize your app to access their data directly through the official OAuth flows.

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env` file in your project root with OAuth client credentials:

```env
# OpenAI Configuration (Required for AI features)
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

# OAuth Client IDs (Required for integrations)
REACT_APP_STRAVA_CLIENT_ID=your_strava_client_id
REACT_APP_STRAVA_CLIENT_SECRET=your_strava_client_secret
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
REACT_APP_GARMIN_CLIENT_ID=your_garmin_client_id
REACT_APP_GARMIN_CLIENT_SECRET=your_garmin_client_secret

# Development Settings
REACT_APP_ENVIRONMENT=development
```

### 2. OpenAI Setup (AI Features)

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env` file as `REACT_APP_OPENAI_API_KEY`

**Note**: OpenAI API usage is paid. Check their pricing at [OpenAI Pricing](https://openai.com/pricing)

## 🔗 App Integrations

### Fitness & Health Apps

#### Strava
1. Go to [Strava API Settings](https://www.strava.com/settings/api)
2. Create a new application
3. Fill in application details:
   - Application Name: Vesi Wellness
   - Category: Fitness
   - Club: (optional)
   - Website: (optional)
4. Copy Client ID and Client Secret
5. Add to `.env` file:
   ```env
   REACT_APP_STRAVA_CLIENT_ID=your_client_id
   REACT_APP_STRAVA_CLIENT_SECRET=your_client_secret
   ```

#### Garmin Connect
1. Visit [Garmin Developer Portal](https://developer.garmin.com/)
2. Create a new application
3. Obtain Consumer Key and Consumer Secret
4. Add to `.env` file:
   ```env
   REACT_APP_GARMIN_CONSUMER_KEY=your_consumer_key
   REACT_APP_GARMIN_CONSUMER_SECRET=your_consumer_secret
   ```

#### MyFitnessPal
1. Contact MyFitnessPal for API access
2. Provide your app details and use case
3. Receive API credentials
4. Add to `.env` file:
   ```env
   REACT_APP_MYFITNESSPAL_API_KEY=your_api_key
   ```

#### Fitbit
1. Go to [Fitbit Developer Portal](https://dev.fitbit.com/)
2. Register your application
3. Get Client ID and Client Secret
4. Add to `.env` file:
   ```env
   REACT_APP_FITBIT_CLIENT_ID=your_client_id
   REACT_APP_FITBIT_CLIENT_SECRET=your_client_secret
   ```

### Mental Health Apps

#### Headspace
1. Contact Headspace for API partnership
2. Provide integration details
3. Receive API credentials
4. Add to `.env` file

#### Calm
1. Visit Calm Developer Portal
2. Request API access
3. Get integration credentials
4. Add to `.env` file

### Spiritual Apps

#### YouVersion Bible
1. Go to [YouVersion API](https://developers.youversion.com/)
2. Create developer account
3. Register your application
4. Get API key
5. Add to `.env` file:
   ```env
   REACT_APP_YOUVERSION_API_KEY=your_api_key
   ```

## 🔧 Testing Integrations

### Demo Mode
If you don't have API keys set up, Vesi will run in demo mode with mock data. This allows you to:
- Test all features
- See how integrations work
- Experience the full app functionality

### Real Mode
Once you add API keys:
1. Restart your development server
2. Go to Settings > Integrations
3. Connect your apps
4. Sync data to see real information

## 📱 Mobile App Integrations

### Apple Health
- Enable HealthKit in your app settings
- Grant permission to read health data
- Select data types to sync

### Google Fit
- Enable Google Fit API in Google Cloud Console
- Create OAuth 2.0 credentials
- Authorize data access

## 🔒 Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate API keys** regularly
4. **Monitor API usage** to avoid unexpected charges
5. **Use HTTPS** for all API communications

## 🆘 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify the key is correct
   - Check if the key has proper permissions
   - Ensure the key is not expired

2. **Integration Not Connecting**
   - Check network connectivity
   - Verify API endpoints are accessible
   - Review API documentation for changes

3. **Data Not Syncing**
   - Check API rate limits
   - Verify data permissions
   - Review error logs in browser console

### Getting Help

- Check the browser console for error messages
- Review API documentation for the specific service
- Contact support with specific error details

## 🎯 Next Steps

Once you have integrations set up:

1. **Connect your apps** in Settings > Integrations
2. **Sync your data** to see real information
3. **Set up AI chat** with your OpenAI key
4. **Customize your wellness journey** based on real data

## 📊 Data Privacy

Vesi respects your privacy:
- All data is processed locally when possible
- API keys are stored securely
- No personal data is shared with third parties without permission
- You can disconnect integrations at any time

---

**Ready to make Vesi real?** Start with the OpenAI setup to enable AI features, then add your favorite fitness and wellness apps!
