# Vesi - One-Stop Wellness App

A comprehensive wellness and productivity app built with React, featuring spiritual growth, mental health, physical fitness, and OAuth integrations.

## 🌊 About Vesi

Vesi (Finnish for "water") symbolizes renewal, flow, and growth. It's designed to help users grow spiritually, mentally, and physically through daily reflections, journaling, habit tracking, and integrated wellness tools in a calm, peaceful environment.

## ✨ Features

- **Daily Reflections**: Inspirational quotes and scriptures to start your day
- **Journal Entries**: Personal reflections with tags and organization
- **Goals & Habits Tracker**: Build positive habits with streak tracking
- **AI-Powered Insights**: Personalized wellness guidance and goal suggestions
- **OAuth Integrations**: Connect with Spotify, Strava, and other wellness apps
- **Spiritual Growth**: Scripture management and interfaith content
- **Mental Wellness**: Mindfulness tools and mental health resources
- **Physical Wellness**: Fitness tracking and health integrations
- **Clean Interface**: Minimal, calming design focused on serenity
- **Authentication**: Secure user accounts with Firebase Auth
- **Real-time Sync**: All data syncs across devices with Firestore

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project
- OpenAI API key (for AI features)
- OAuth app credentials (Spotify, Strava, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/netmrs/vesi.git
   cd vesi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_OPENAI_API_KEY=your_openai_api_key
   REACT_APP_STRAVA_CLIENT_ID=your_strava_client_id
   REACT_APP_STRAVA_CLIENT_SECRET=your_strava_client_secret
   REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
   REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

4. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your Firebase config and update `src/lib/firebase.js`

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000` to see Vesi in action.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AIChat.jsx       # AI-powered chat interface
│   ├── AuthForm.jsx     # Login/signup form
│   ├── EntryCard.jsx    # Journal entry display
│   ├── GoalTracker.jsx  # Goals and habits tracker
│   ├── Navigation.jsx   # Bottom navigation
│   ├── ReflectionCard.jsx # Daily reflection display
│   └── TagSelector.jsx  # Tag selection component
├── lib/                 # Utilities and configurations
│   ├── aiService.js     # AI service integration
│   ├── firebase.js      # Firebase configuration
│   ├── OAuthService.js  # OAuth integration service
│   └── utils.js         # Helper functions
├── pages/               # Main application pages
│   ├── Home.jsx         # Dashboard/home page
│   ├── Journal.jsx      # Journal entries page
│   ├── Goals.jsx        # Goals and habits page
│   ├── Spirituality.jsx # Spiritual growth page
│   ├── Mental.jsx       # Mental wellness page
│   ├── Physical.jsx     # Physical wellness page
│   ├── Media.jsx        # Media and content page
│   └── Settings.jsx     # User settings page
├── styles/              # CSS and styling
│   └── index.css        # Main styles with Tailwind
├── App.jsx              # Main application component
└── index.js             # Application entry point
```

## 🎨 Design System

### Colors
- **Vesi White**: `#FFFFFF` - Clean backgrounds
- **Vesi Blue**: `#E9F5FB` - Soft accent color
- **Vesi Deep**: `#3A6EA5` - Primary brand color
- **Vesi Light**: `#F8FBFF` - Page backgrounds

### Typography
- **Inter**: Clean, modern sans-serif for UI
- **Lora**: Elegant serif for headings and quotes

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run deploy` - Deploys to Vercel

## 📱 Features Overview

### Home Page
- AI-powered insights and recommendations
- Daily reflection display
- Quick entry creation
- Recent journal entries
- Navigation to other sections

### Journal Page
- View all journal entries
- Search and filter by tags
- Create, edit, and delete entries
- Tag organization system

### Goals Page
- Track daily habits and goals
- Streak counting
- Progress statistics
- Category organization
- AI-powered goal suggestions

### Spirituality Page
- Scripture management and organization
- Interfaith content and discussions
- Spiritual growth tracking

### Mental Wellness Page
- Mindfulness tools and resources
- Mental health tracking
- Stress management tools

### Physical Wellness Page
- Fitness tracking integrations
- Health data visualization
- Workout and nutrition tracking

### Settings Page
- OAuth app integrations
- Environment variable management
- User profile management
- App configuration

## 🔗 OAuth Integrations

- **Spotify**: Music playlists and wellness audio
- **Strava**: Fitness activity tracking
- **Garmin**: Health and fitness data
- **Google Fit**: Health metrics integration
- **Apple Health**: iOS health data (when available)

## 🤖 AI Features

- **Personalized Insights**: AI-powered wellness recommendations
- **Goal Suggestions**: Smart goal creation based on user preferences
- **Journal Analysis**: Insights from journal entries
- **Spiritual Guidance**: AI-powered spiritual content recommendations

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy automatically

3. **Update OAuth Redirect URIs**
   - Update your OAuth app settings with your Vercel domain
   - Spotify: `https://your-app.vercel.app/`
   - Strava: `https://your-app.vercel.app/oauth/strava/callback`

## 🔒 Security & Privacy

- All user data is stored securely in Firebase Firestore
- User authentication handled by Firebase Auth
- OAuth tokens stored securely in localStorage
- Environment variables protected in deployment
- No third-party tracking or analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Calm, Notion, and Lectio 365
- Built with React, Firebase, and TailwindCSS
- Icons by Lucide React
- Animations by Framer Motion
- AI powered by OpenAI

---

**Flow with purpose. Grow with light.** ✨
