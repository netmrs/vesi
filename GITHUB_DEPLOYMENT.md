# 🚀 GitHub to Vercel Deployment Guide

## ✅ Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click "New Repository"** (green button)
3. **Repository settings**:
   - Name: `vesi-wellness-app` (or whatever you prefer)
   - Description: "One-stop wellness app with OAuth integrations"
   - Make it **Public** (required for free Vercel deployment)
   - **Don't** initialize with README, .gitignore, or license (we already have these)
4. **Click "Create Repository"**

## ✅ Step 2: Push to GitHub

Run these commands in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/vesi-wellness-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## ✅ Step 3: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with GitHub** (use your GitHub account)
3. **Click "New Project"**
4. **Import your repository**:
   - Find your `vesi-wellness-app` repository
   - Click "Import"
5. **Configure the project**:
   - Framework Preset: **React**
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (should auto-detect)
   - Output Directory: `build` (should auto-detect)
6. **Click "Deploy"**

## ✅ Step 4: Configure Environment Variables

After deployment, you'll get a URL like `https://vesi-wellness-app-xyz.vercel.app`

1. **In Vercel Dashboard**:
   - Go to your project
   - Click **Settings** tab
   - Click **Environment Variables**
2. **Add these variables**:
   ```
   REACT_APP_OPENAI_API_KEY = your_openai_api_key
   REACT_APP_STRAVA_CLIENT_ID = your_strava_client_id
   REACT_APP_STRAVA_CLIENT_SECRET = your_strava_client_secret
   REACT_APP_SPOTIFY_CLIENT_ID = your_spotify_client_id
   REACT_APP_SPOTIFY_CLIENT_SECRET = your_spotify_client_secret
   ```
3. **Click "Save"**

## ✅ Step 5: Update OAuth Redirect URIs

Update your OAuth app settings with your new Vercel URL:

### Spotify:
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Edit your app settings
3. Add redirect URI: `https://your-app-name.vercel.app/`

### Strava:
1. Go to [Strava API Settings](https://www.strava.com/settings/api)
2. Edit your application
3. Add redirect URI: `https://your-app-name.vercel.app/oauth/strava/callback`

## ✅ Step 6: Redeploy

After adding environment variables:
1. **In Vercel Dashboard**, go to **Deployments** tab
2. **Click "Redeploy"** on the latest deployment
3. **Wait for deployment to complete**

## 🎉 You're Live!

Your app is now accessible at: `https://your-app-name.vercel.app`

## 🔄 Automatic Deployments

Now every time you push to GitHub:
1. **Make changes** to your code
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. **Vercel automatically deploys** your changes!

## 📱 Testing Your App

1. **Open your Vercel URL** in a browser
2. **Navigate to Settings → Integrations**
3. **Test Spotify and Strava connections**
4. **Everything should work perfectly!**

## 🆘 Troubleshooting

**If OAuth still doesn't work:**
- Check that your OAuth redirect URIs exactly match your Vercel URL
- Make sure environment variables are set correctly
- Redeploy after making changes

**If the app doesn't load:**
- Check the Vercel deployment logs
- Make sure all dependencies are in package.json

## 🎯 Benefits of This Setup

✅ **No more localhost issues**
✅ **HTTPS by default** (required for OAuth)
✅ **Automatic deployments** from GitHub
✅ **Easy sharing** with others
✅ **Professional hosting**
✅ **Custom domain** support (optional)

---

**Need help? Check the Vercel docs or GitHub issues!**
