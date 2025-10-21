#!/usr/bin/env node

/**
 * Vesi Deployment Helper
 * This script helps you deploy Vesi to Vercel quickly
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Vesi Deployment Helper\n');

// Check if vercel is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
  console.log('✅ Vercel CLI is installed');
} catch (error) {
  console.log('❌ Vercel CLI not found');
  console.log('📦 Installing Vercel CLI...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully');
  } catch (installError) {
    console.log('❌ Failed to install Vercel CLI');
    console.log('Please install manually: npm install -g vercel');
    process.exit(1);
  }
}

// Check if user is logged in
try {
  execSync('vercel whoami', { stdio: 'ignore' });
  console.log('✅ Logged into Vercel');
} catch (error) {
  console.log('❌ Not logged into Vercel');
  console.log('🔐 Please login to Vercel:');
  console.log('   vercel login');
  process.exit(1);
}

// Build the app
console.log('🔨 Building the app...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed');
} catch (error) {
  console.log('❌ Build failed');
  process.exit(1);
}

// Deploy to Vercel
console.log('🚀 Deploying to Vercel...');
try {
  const result = execSync('vercel --prod --yes', { encoding: 'utf8' });
  console.log('✅ Deployment successful!');
  console.log('🌐 Your app is now live at:', result.trim());
  
  console.log('\n📋 Next Steps:');
  console.log('1. Update your OAuth app redirect URIs:');
  console.log('   - Spotify: [your-vercel-url]/');
  console.log('   - Strava: [your-vercel-url]/oauth/strava/callback');
  console.log('2. Add environment variables in Vercel dashboard');
  console.log('3. Test your integrations!');
  
} catch (error) {
  console.log('❌ Deployment failed');
  console.log('Error:', error.message);
}

console.log('\n🎉 Happy coding!');
