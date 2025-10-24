# 🔐 OAuth Setup Guide for Vesi

This guide helps you set up OAuth integrations that work for both development and production deployments.

## 🚀 Quick Setup Checklist

### For Each OAuth Provider:

1. **Create OAuth Application** in the provider's developer console
2. **Set Redirect URIs** for both development and production
3. **Add Environment Variables** to your Vercel project
4. **Test Integration** in your deployed app

---

## 📋 OAuth Provider Setup

### 1. Strava
**Developer Portal:** https://www.strava.com/settings/api

**Redirect URIs to Add:**
- `http://localhost:3000/oauth/strava/callback` (development)
- `https://your-vercel-domain.vercel.app/oauth/strava/callback` (production)

**Environment Variables:**
```
REACT_APP_STRAVA_CLIENT_ID=your_strava_client_id
REACT_APP_STRAVA_CLIENT_SECRET=your_strava_client_secret
```

### 2. Spotify
**Developer Portal:** https://developer.spotify.com/dashboard

**Redirect URIs to Add:**
- `http://localhost:3000/oauth/spotify/callback` (development)
- `https://your-vercel-domain.vercel.app/oauth/spotify/callback` (production)

**Environment Variables:**
```
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### 3. Google Calendar
**Developer Portal:** https://console.cloud.google.com/

**Redirect URIs to Add:**
- `http://localhost:3000/oauth/googlecalendar/callback` (development)
- `https://your-vercel-domain.vercel.app/oauth/googlecalendar/callback` (production)

**Environment Variables:**
```
REACT_APP_GOOGLE_CALENDAR_CLIENT_ID=your_google_calendar_client_id
REACT_APP_GOOGLE_CALENDAR_CLIENT_SECRET=your_google_calendar_client_secret
```

### 4. Google Fit
**Developer Portal:** https://console.cloud.google.com/

**Redirect URIs to Add:**
- `http://localhost:3000/oauth/googlefit/callback` (development)
- `https://your-vercel-domain.vercel.app/oauth/googlefit/callback` (production)

**Environment Variables:**
```
REACT_APP_GOOGLE_FIT_CLIENT_ID=your_google_fit_client_id
REACT_APP_GOOGLE_FIT_CLIENT_SECRET=your_google_fit_client_secret
```

### 5. Fitbit
**Developer Portal:** https://dev.fitbit.com/apps

**Redirect URIs to Add:**
- `http://localhost:3000/oauth/fitbit/callback` (development)
- `https://your-vercel-domain.vercel.app/oauth/fitbit/callback` (production)

**Environment Variables:**
```
REACT_APP_FITBIT_CLIENT_ID=your_fitbit_client_id
REACT_APP_FITBIT_CLIENT_SECRET=your_fitbit_client_secret
```

---

## 🔧 Vercel Environment Variables Setup

1. **Go to your Vercel project dashboard**
2. **Click on Settings → Environment Variables**
3. **Add each environment variable:**
   - Variable Name: `REACT_APP_STRAVA_CLIENT_ID`
   - Value: `your_actual_client_id`
   - Environment: Production, Preview, Development
4. **Repeat for all OAuth providers**
5. **Redeploy your application**

---

## 🧪 Testing Your Integrations

### Development Testing:
1. Run `npm start` locally
2. Go to Settings → Integrations
3. Click "Connect" on any integration
4. Verify OAuth flow works

### Production Testing:
1. Deploy to Vercel
2. Go to your deployed app
3. Go to Settings → Integrations
4. Click "Connect" on any integration
5. Verify OAuth flow works

---

## 🚨 Common Issues & Solutions

### Issue: "Redirect URI mismatch"
**Solution:** Make sure you've added the correct redirect URIs to your OAuth provider's settings.

### Issue: "OAuth not configured" message
**Solution:** Make sure you've added the environment variables to Vercel and redeployed.

### Issue: OAuth flow redirects to wrong URL
**Solution:** The app now uses dynamic redirect URIs based on the current domain, so this should be fixed automatically.

### Issue: Integration button doesn't appear
**Solution:** Make sure the integration is properly configured in the IntegrationService.

---

## 📝 Dynamic Redirect URI System

The app now automatically uses the correct redirect URI based on the current domain:

- **Development:** `http://localhost:3000/oauth/{provider}/callback`
- **Production:** `https://your-domain.vercel.app/oauth/{provider}/callback`

This means you only need to set up the redirect URIs once, and they'll work for all deployments!

---

## 🔄 Adding New Integrations

To add a new OAuth integration:

1. **Add to IntegrationService.js:**
   ```javascript
   newIntegration: {
     name: 'New Integration',
     baseURL: 'https://api.newintegration.com',
     scopes: ['read'],
     oauthEnabled: true
   }
   ```

2. **Add to OAuthService.js:**
   ```javascript
   newIntegration: {
     name: 'New Integration',
     authUrl: 'https://newintegration.com/oauth/authorize',
     tokenUrl: 'https://newintegration.com/oauth/token',
     clientId: process.env.REACT_APP_NEW_INTEGRATION_CLIENT_ID,
     scopes: ['read'],
     redirectUri: `${this.baseUrl}/oauth/newintegration/callback`
   }
   ```

3. **Add to Settings.jsx** with proper button functionality

4. **Update this guide** with the new integration details

---

## 🎯 Next Steps

1. ✅ Set up all OAuth providers with correct redirect URIs
2. ✅ Add environment variables to Vercel
3. ✅ Test all integrations in production
4. ✅ Document any new integrations you add

---

**Need help?** Check the console logs for OAuth debugging information, or refer to the individual provider's documentation.
