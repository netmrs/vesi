import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import AuthForm from './components/AuthForm';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Goals from './pages/Goals';
import AIInsights from './pages/AIInsights';
import Integrations from './pages/Integrations';
import Spirituality from './pages/Spirituality';
import Media from './pages/Media';
import Mental from './pages/Mental';
import Physical from './pages/Physical';
import Vision from './pages/Vision';
import Settings from './pages/Settings';
import SignupFlowPage from './pages/SignupFlow';
import Connect from './pages/Connect';
import OAuthCallback from './pages/OAuthCallback';
import AIChat from './components/AIChat';
import GoalCompletionReflection from './components/GoalCompletionReflection';
import FaithSelection from './components/FaithSelection';
import MusicIntegration from './components/MusicIntegration';
import VisualRecommendations from './components/VisualRecommendations';
import InterfaithUnification from './components/InterfaithUnification';
import CommunityFeatures from './components/CommunityFeatures';

function App() {
  const [user, setUser] = useState({
    uid: 'demo-user',
    email: 'demo@vesi.app',
    displayName: 'Demo User',
    faith: 'christian',
    denomination: 'Protestant (General)',
    location: {
      country: 'United States',
      region: 'California',
      timezone: 'UTC-8'
    },
    focusAreas: ['prayer', 'scripture', 'service']
  });
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('signin');
  const [authError, setAuthError] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState([]);
  const [savedScriptures, setSavedScriptures] = useState([]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showGoalReflection, setShowGoalReflection] = useState(false);
  const [completedGoal, setCompletedGoal] = useState(null);
  const [showFaithSelection, setShowFaithSelection] = useState(false);

  useEffect(() => {
    // Check for OAuth callback parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state) {
      // This is an OAuth callback, show the callback component
      setCurrentPage('oauth-callback');
    } else {
      // Normal app flow
      setCurrentPage('home');
    }
    
    // Temporarily skip Firebase auth for testing
    setLoading(false);
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   setUser(user);
    //   setLoading(false);
    // });

    // return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Temporarily skip Firebase database calls for testing
    // Load some demo data instead
    setEntries([
      {
        id: 'demo-entry-1',
        title: 'Welcome to Vesi!',
        content: 'This is your first journal entry. You can write about your thoughts, reflections, and spiritual journey here.',
        tags: [{ id: 'faith', name: 'Faith', color: 'bg-blue-100 text-blue-800' }],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    
    setGoals([
      {
        id: 'demo-goal-1',
        title: 'Daily Prayer',
        description: 'Spend time in prayer and meditation',
        category: 'spiritual',
        frequency: 'daily',
        timePeriod: 'morning',
        streak: 5,
        completed: false,
        lastCompleted: new Date(Date.now() - 24 * 60 * 60 * 1000),
        createdAt: new Date()
      },
      {
        id: 'demo-goal-2',
        title: 'Scripture Reading',
        description: 'Read and reflect on God\'s Word',
        category: 'spiritual',
        frequency: 'daily',
        timePeriod: 'evening',
        streak: 12,
        completed: true,
        lastCompleted: new Date(),
        createdAt: new Date()
      },
      {
        id: 'demo-goal-3',
        title: 'Weekly Service',
        description: 'Find opportunities to serve others',
        category: 'service',
        frequency: 'weekly',
        timePeriod: 'anytime',
        streak: 3,
        completed: false,
        lastCompleted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      }
    ]);

    setSavedScriptures([
      {
        id: 'demo-scripture-1',
        reference: 'John 3:16',
        text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
        category: 'promises',
        tags: ['love', 'salvation', 'eternal life'],
        notes: 'This verse reminds me of God\'s incredible love and the gift of salvation.',
        assignedTo: 'Daily Prayer',
        dateAdded: new Date()
      },
      {
        id: 'demo-scripture-2',
        reference: 'Philippians 4:13',
        text: 'I can do all this through him who gives me strength.',
        category: 'encouragement',
        tags: ['strength', 'confidence', 'faith'],
        notes: 'A powerful reminder that God provides the strength I need for every challenge.',
        assignedTo: 'Patience Practice',
        dateAdded: new Date()
      }
    ]);
    
    // if (user) {
    //   // Listen to entries
    //   const entriesQuery = query(
    //     collection(db, 'users', user.uid, 'entries'),
    //     orderBy('createdAt', 'desc')
    //   );
    //   
    //   const unsubscribeEntries = onSnapshot(entriesQuery, (snapshot) => {
    //     const entriesData = snapshot.docs.map(doc => ({
    //       id: doc.id,
    //       ...doc.data(),
    //       createdAt: doc.data().createdAt?.toDate() || new Date()
    //     }));
    //     setEntries(entriesData);
    //   });

    //   // Listen to goals
    //   const goalsQuery = query(
    //     collection(db, 'users', user.uid, 'goals'),
    //     orderBy('createdAt', 'desc')
    //   );
    //   
    //   const unsubscribeGoals = onSnapshot(goalsQuery, (snapshot) => {
    //     const goalsData = snapshot.docs.map(doc => ({
    //       id: doc.id,
    //       ...doc.data(),
    //       lastCompleted: doc.data().lastCompleted?.toDate() || null
    //     }));
    //     setGoals(goalsData);
    //   });

    //   return () => {
    //     unsubscribeEntries();
    //     unsubscribeGoals();
    //   };
    // }
  }, [user]);

  const handleAuth = async (email, password, signupData = null) => {
    try {
      setAuthError('');
      setLoading(true);
      
      if (authMode === 'signin') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        
        // If signup data is provided, update user profile
        if (signupData) {
          // Update the mock user data with signup information
          setUser(prev => ({
            ...prev,
            email,
            faith: signupData.faith?.id || 'christian',
            denomination: signupData.denomination || '',
            location: signupData.location || {},
            focusAreas: signupData.focusAreas || []
          }));
          
          // In a real app, you would save this to Firestore
          // await addDoc(collection(db, 'userProfiles'), {
          //   uid: user.uid,
          //   faith: signupData.faith,
          //   denomination: signupData.denomination,
          //   location: signupData.location,
          //   focusAreas: signupData.focusAreas,
          //   createdAt: new Date()
          // });
        }
      }
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAddEntry = async (entryData) => {
    if (!user) return;
    
    try {
      // Add entry locally for testing
      const newEntry = {
        id: Date.now().toString(),
        ...entryData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setEntries(prev => [newEntry, ...prev]);
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const handleEditEntry = async (entryData) => {
    if (!user) return;
    
    try {
      // Update entry locally for testing
      setEntries(prev => prev.map(entry => 
        entry.id === entryData.id 
          ? { ...entryData, updatedAt: new Date() }
          : entry
      ));
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (!user) return;
    
    try {
      // Delete entry locally for testing
      setEntries(prev => prev.filter(entry => entry.id !== entryId));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const handleAddGoal = async (goalData) => {
    if (!user) return;
    
    try {
      // Add goal locally for testing
      const newGoal = {
        id: Date.now().toString(),
        ...goalData,
        frequency: goalData.frequency || 'daily',
        timePeriod: goalData.timePeriod || 'anytime',
        streak: 0,
        completed: false,
        createdAt: new Date()
      };
      setGoals(prev => [newGoal, ...prev]);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleToggleGoal = async (goalId) => {
    if (!user) return;
    
    try {
      const goal = goals.find(g => g.id === goalId);
      const wasCompleted = goal.completed;
      const lastCompleted = goal.lastCompleted;
      const today = new Date();
      const todayString = today.toDateString();
      const lastCompletedString = lastCompleted ? lastCompleted.toDateString() : '';
      
      let newStreak = goal.streak;
      
      if (!wasCompleted) {
        // Marking as completed
        if (lastCompletedString === todayString) {
          // Already completed today, do nothing
          return;
        } else if (lastCompletedString === new Date(today.getTime() - 24 * 60 * 60 * 1000).toDateString()) {
          // Completed yesterday, increment streak
          newStreak += 1;
        } else {
          // Missed days, reset streak
          newStreak = 1;
        }
        
        setGoals(prev => prev.map(g => 
          g.id === goalId 
            ? { ...g, completed: true, lastCompleted: today, streak: newStreak }
            : g
        ));
      } else {
        // Marking as not completed
        setGoals(prev => prev.map(g => 
          g.id === goalId 
            ? { ...g, completed: false }
            : g
        ));
      }
    } catch (error) {
      console.error('Error toggling goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (!user) return;
    
    try {
      // Delete goal locally for testing
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  // Scripture management functions
  const handleSaveScripture = async (scripture) => {
    if (!user) return;
    
    try {
      // Save scripture locally for testing
      setSavedScriptures(prev => [scripture, ...prev]);
    } catch (error) {
      console.error('Error saving scripture:', error);
    }
  };

  const handleDeleteScripture = async (scriptureId) => {
    if (!user) return;
    
    try {
      // Delete scripture locally for testing
      setSavedScriptures(prev => prev.filter(scripture => scripture.id !== scriptureId));
    } catch (error) {
      console.error('Error deleting scripture:', error);
    }
  };

  const handleUpdateScripture = async (scriptureId, updatedScripture) => {
    if (!user) return;
    
    try {
      // Update scripture locally for testing
      setSavedScriptures(prev => 
        prev.map(scripture => 
          scripture.id === scriptureId ? { ...scripture, ...updatedScripture } : scripture
        )
      );
    } catch (error) {
      console.error('Error updating scripture:', error);
    }
  };

  // Goal completion reflection
  const handleGoalCompletion = (goalId) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setCompletedGoal(goal);
      setShowGoalReflection(true);
    }
  };

  const handleSaveGoalReflection = async (goalId, reflection) => {
    try {
      // Save reflection locally for testing
      console.log('Saving reflection for goal:', goalId, reflection);
      setShowGoalReflection(false);
      setCompletedGoal(null);
    } catch (error) {
      console.error('Error saving goal reflection:', error);
    }
  };

  // Faith selection handler
  const handleSelectFaith = (faith) => {
    setUser(prev => ({ ...prev, faith: faith.id }));
    setShowFaithSelection(false);
  };

  const handleSkipFaithSelection = () => {
    setShowFaithSelection(false);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const getPageTitle = (page) => {
    const titles = {
      'home': 'Welcome Home',
      'journal': 'Journal',
      'goals': 'Goals & Habits',
      'spirituality': 'Spirituality',
      'mental': 'Mental Wellness',
      'physical': 'Physical Wellness',
      'media': 'Media & Content',
      'ai-insights': 'AI Insights',
      'integrations': 'Integrations',
      'vision': 'Vision',
      'settings': 'Settings'
    };
    return titles[page] || 'Vesi';
  };

  const getPageSubtitle = (page) => {
    const subtitles = {
      'home': 'Your wellness journey continues',
      'journal': 'Reflect and grow',
      'goals': 'Track your wellness journey',
      'spirituality': 'Deepen your spiritual growth',
      'mental': 'Nurture your mental health',
      'physical': 'Build strength and vitality',
      'media': 'Discover content for your wellness journey',
      'ai-insights': 'AI-powered wellness guidance',
      'integrations': 'Connect with your daily systems',
      'vision': 'Our mission and purpose',
      'settings': 'Customize your experience'
    };
    return subtitles[page];
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            entries={entries}
            onAddEntry={handleAddEntry}
            onEditEntry={handleEditEntry}
            onDeleteEntry={handleDeleteEntry}
            onOpenAIChat={() => setShowAIChat(true)}
          />
        );
      case 'journal':
        return (
          <Journal
            entries={entries}
            onAddEntry={handleAddEntry}
            onEditEntry={handleEditEntry}
            onDeleteEntry={handleDeleteEntry}
          />
        );
      case 'goals':
        return (
          <Goals
            goals={goals}
            onToggleGoal={handleToggleGoal}
            onAddGoal={handleAddGoal}
            onDeleteGoal={handleDeleteGoal}
            entries={entries}
            user={user}
          />
        );
      case 'ai-insights':
        return (
          <AIInsights
            entries={entries}
            goals={goals}
            user={user}
            onOpenChat={() => setShowAIChat(true)}
          />
        );
      case 'integrations':
        return (
          <Integrations
            goals={goals}
            entries={entries}
            user={user}
          />
        );
      case 'spirituality':
        return (
          <Spirituality
            user={user}
            savedScriptures={savedScriptures}
            onSaveScripture={handleSaveScripture}
            onDeleteScripture={handleDeleteScripture}
            onUpdateScripture={handleUpdateScripture}
          />
        );
      case 'media':
        return (
          <Media
            user={user}
            goals={goals}
            savedScriptures={savedScriptures}
          />
        );
      case 'mental':
        return (
          <Mental
            user={user}
            goals={goals}
            entries={entries}
          />
        );
      case 'physical':
        return (
          <Physical
            user={user}
            goals={goals}
            entries={entries}
          />
        );
      case 'community':
        return (
          <CommunityFeatures
            userFaith={user.faith}
            userGoals={goals}
          />
        );
      case 'connect':
        return <Connect />;
      case 'signup-flow':
        return <SignupFlowPage />;
      case 'settings':
        return (
          <Settings
            user={user}
            onSignOut={handleSignOut}
          />
        );
      case 'oauth-callback':
        return <OAuthCallback />;
      default:
        return <Home entries={entries} onAddEntry={handleAddEntry} onEditEntry={handleEditEntry} onDeleteEntry={handleDeleteEntry} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vesi-light to-vesi-blue">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-vesi-deep border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-lora font-semibold text-vesi-deep">Loading Vesi...</h2>
          <p className="text-gray-600">Preparing your peaceful space</p>
        </motion.div>
      </div>
    );
  }

  // Temporarily bypass authentication for testing
  // if (!user) {
  //   return (
  //     <AuthForm
  //       mode={authMode}
  //       onSwitchMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
  //       onSubmit={handleAuth}
  //       loading={loading}
  //       error={authError}
  //     />
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vesi-light to-vesi-blue">
      {currentPage !== 'oauth-callback' && (
        <Header 
          title={getPageTitle(currentPage)}
          subtitle={getPageSubtitle(currentPage)}
          showLogo={currentPage === 'home'}
        />
      )}
      
      <div className="max-w-4xl mx-auto px-4 py-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {currentPage !== 'oauth-callback' && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      
      {/* AI Chat Modal */}
      {showAIChat && (
        <AIChat
          entries={entries}
          goals={goals}
          onClose={() => setShowAIChat(false)}
        />
      )}
      
      {/* Goal Completion Reflection Modal */}
      {showGoalReflection && completedGoal && (
        <GoalCompletionReflection
          goal={completedGoal}
          onSaveReflection={handleSaveGoalReflection}
          onClose={() => {
            setShowGoalReflection(false);
            setCompletedGoal(null);
          }}
        />
      )}

      {/* Faith Selection Modal */}
      {showFaithSelection && (
        <FaithSelection
          onSelectFaith={handleSelectFaith}
          onSkip={handleSkipFaithSelection}
        />
      )}
    </div>
  );
}

export default App;
