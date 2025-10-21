import { format, isToday, isYesterday, isThisWeek, isThisYear } from 'date-fns';

// Format date for display
export const formatDate = (date) => {
  const dateObj = date instanceof Date ? date : date.toDate();
  
  if (isToday(dateObj)) {
    return 'Today';
  } else if (isYesterday(dateObj)) {
    return 'Yesterday';
  } else if (isThisWeek(dateObj)) {
    return format(dateObj, 'EEEE');
  } else if (isThisYear(dateObj)) {
    return format(dateObj, 'MMM d');
  } else {
    return format(dateObj, 'MMM d, yyyy');
  }
};

// Format full date
export const formatFullDate = (date) => {
  const dateObj = date instanceof Date ? date : date.toDate();
  return format(dateObj, 'MMMM d, yyyy');
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Default tags
export const defaultTags = [
  { id: 'faith', name: 'Faith', color: 'bg-blue-100 text-blue-800' },
  { id: 'family', name: 'Family', color: 'bg-green-100 text-green-800' },
  { id: 'goals', name: 'Goals', color: 'bg-purple-100 text-purple-800' },
  { id: 'service', name: 'Service', color: 'bg-orange-100 text-orange-800' },
  { id: 'gratitude', name: 'Gratitude', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'growth', name: 'Growth', color: 'bg-pink-100 text-pink-800' },
];

// Default daily reflections
export const dailyReflections = [
  { 
    id: 1, 
    text: "Let your light so shine before men, that they may see your good works and glorify your Father in heaven.",
    reference: "Matthew 5:16",
    category: "Service"
  },
  { 
    id: 2, 
    text: "Faith without works is dead.",
    reference: "James 2:26",
    category: "Faith"
  },
  { 
    id: 3, 
    text: "Be still, and know that I am God.",
    reference: "Psalm 46:10",
    category: "Peace"
  },
  { 
    id: 4, 
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    reference: "Jeremiah 29:11",
    category: "Hope"
  },
  { 
    id: 5, 
    text: "Love one another as I have loved you.",
    reference: "John 13:34",
    category: "Love"
  },
  { 
    id: 6, 
    text: "Trust in the Lord with all your heart and lean not on your own understanding.",
    reference: "Proverbs 3:5",
    category: "Trust"
  },
  { 
    id: 7, 
    text: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
    category: "Strength"
  }
];

// Get today's reflection
export const getTodaysReflection = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  return dailyReflections[dayOfYear % dailyReflections.length];
};

// Default goals/habits
export const defaultGoals = [
  {
    id: 'prayer',
    title: 'Daily Prayer',
    description: 'Spend time in prayer and meditation',
    frequency: 'daily',
    category: 'spiritual'
  },
  {
    id: 'scripture',
    title: 'Scripture Reading',
    description: 'Read and reflect on God\'s Word',
    frequency: 'daily',
    category: 'spiritual'
  },
  {
    id: 'exercise',
    title: 'Physical Exercise',
    description: 'Take care of your body as God\'s temple',
    frequency: 'daily',
    category: 'health'
  },
  {
    id: 'gratitude',
    title: 'Gratitude Journal',
    description: 'Write down three things you\'re grateful for',
    frequency: 'daily',
    category: 'mindfulness'
  },
  {
    id: 'service',
    title: 'Acts of Service',
    description: 'Find ways to serve others today',
    frequency: 'daily',
    category: 'service'
  }
];

