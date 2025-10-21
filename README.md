# Vesi - Flow with purpose. Grow with light.

A beautiful, minimalist faith-based productivity and journaling app built with React and Firebase.

## 🌊 About Vesi

Vesi (Finnish for "water") symbolizes renewal, flow, and growth. It's designed to help users grow spiritually and personally through daily reflections, journaling, and habit tracking in a calm, peaceful environment.

## ✨ Features

- **Daily Reflections**: Inspirational quotes and scriptures to start your day
- **Journal Entries**: Personal reflections with tags and organization
- **Goals & Habits Tracker**: Build positive habits with streak tracking
- **Clean Interface**: Minimal, calming design focused on serenity
- **Authentication**: Secure user accounts with Firebase Auth
- **Real-time Sync**: All data syncs across devices with Firestore

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vesi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Copy your Firebase config and update `src/lib/firebase.js`

4. **Update Firebase Configuration**
   
   Replace the demo configuration in `src/lib/firebase.js` with your actual Firebase config:
   
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

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
│   ├── AuthForm.jsx     # Login/signup form
│   ├── EntryCard.jsx    # Journal entry display
│   ├── GoalTracker.jsx  # Goals and habits tracker
│   ├── Navigation.jsx   # Bottom navigation
│   ├── ReflectionCard.jsx # Daily reflection display
│   └── TagSelector.jsx  # Tag selection component
├── lib/                 # Utilities and configurations
│   ├── firebase.js      # Firebase configuration
│   └── utils.js         # Helper functions
├── pages/               # Main application pages
│   ├── Home.jsx         # Dashboard/home page
│   ├── Journal.jsx      # Journal entries page
│   ├── Goals.jsx        # Goals and habits page
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
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## 📱 Features Overview

### Home Page
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

### Settings Page
- User profile management
- Notification preferences
- Appearance settings
- App information

## 🔒 Security & Privacy

- All user data is stored securely in Firebase Firestore
- User authentication handled by Firebase Auth
- Data is isolated per user account
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

---

**Flow with purpose. Grow with light.** ✨

