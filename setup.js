#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌊 Welcome to Vesi Setup!');
console.log('========================\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.log('❌ package.json not found. Please run this script from the project root directory.');
  process.exit(1);
}

console.log('📦 Installing dependencies...');
console.log('This may take a few minutes...\n');

// Instructions for Firebase setup
console.log('🔧 Next steps to complete setup:\n');

console.log('1. Create a Firebase project:');
console.log('   - Go to https://console.firebase.google.com');
console.log('   - Click "Create a project"');
console.log('   - Follow the setup wizard\n');

console.log('2. Enable Authentication:');
console.log('   - In your Firebase console, go to "Authentication"');
console.log('   - Click "Get started"');
console.log('   - Go to "Sign-in method" tab');
console.log('   - Enable "Email/Password" provider\n');

console.log('3. Enable Firestore Database:');
console.log('   - In your Firebase console, go to "Firestore Database"');
console.log('   - Click "Create database"');
console.log('   - Choose "Start in test mode" (for development)');
console.log('   - Select a location for your database\n');

console.log('4. Get your Firebase configuration:');
console.log('   - In your Firebase console, go to Project Settings (gear icon)');
console.log('   - Scroll down to "Your apps" section');
console.log('   - Click "Web app" icon (</>)');
console.log('   - Register your app with a name');
console.log('   - Copy the Firebase config object\n');

console.log('5. Update src/lib/firebase.js:');
console.log('   - Replace the demo configuration with your actual Firebase config');
console.log('   - Make sure to keep the same variable names\n');

console.log('6. Start the development server:');
console.log('   - Run: npm start');
console.log('   - Open http://localhost:3000 in your browser\n');

console.log('✨ You\'re all set! Welcome to Vesi - Flow with purpose. Grow with light.\n');

console.log('📚 For more detailed instructions, see the README.md file.');
console.log('🐛 If you encounter any issues, check the troubleshooting section in README.md\n');

