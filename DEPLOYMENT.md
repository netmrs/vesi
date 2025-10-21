# 🚀 Vesi Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub (Recommended for ongoing development)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a React app

3. **Configure Environment Variables**:
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add your OAuth credentials:
     ```
     REACT_APP_OPENAI_API_KEY=your_openai_key
     REACT_APP_STRAVA_CLIENT_ID=your_strava_client_id
     REACT_APP_STRAVA_CLIENT_SECRET=your_strava_secret
     REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
     REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_secret
     ```

4. **Update OAuth Redirect URIs**:
   - Your app will get a URL like: `https://vesi-app.vercel.app`
   - Update your OAuth app settings:
     - **Spotify**: `https://vesi-app.vercel.app/`
     - **Strava**: `https://vesi-app.vercel.app/oauth/strava/callback`

## Alternative Deployment Options

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `build` folder
3. Configure environment variables in Site Settings

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/vesi",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy: `npm run deploy`

## Benefits of Cloud Deployment

✅ **No more localhost issues**
✅ **HTTPS by default** (required for OAuth)
✅ **Custom domains**
✅ **Automatic deployments**
✅ **Environment variables** properly configured
✅ **Better performance**
✅ **Easy sharing** with others

## Next Steps After Deployment

1. **Update OAuth app settings** with your new domain
2. **Test all integrations** on the live site
3. **Share the URL** for easy testing
4. **Set up automatic deployments** from GitHub
