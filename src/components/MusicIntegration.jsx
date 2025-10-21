import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Music, 
  Play, 
  Heart, 
  Plus, 
  ExternalLink,
  Headphones,
  Volume2,
  Shuffle,
  Repeat,
  Download,
  Share2
} from 'lucide-react';

const MusicIntegration = ({ userFaith, userGoals = [], savedScriptures = [] }) => {
  const [activePlatform, setActivePlatform] = useState('spotify'); // spotify or apple
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [generatedPlaylists, setGeneratedPlaylists] = useState([]);

  // Wellness playlist categories based on goals and mood
  const playlistCategories = {
    christian: {
      wellness: [
        { name: 'Morning Motivation', description: 'Start your day with uplifting wellness music', mood: 'energizing' },
        { name: 'Evening Calm', description: 'Peaceful songs for relaxation and reflection', mood: 'peaceful' },
        { name: 'Mindfulness Focus', description: 'Music for meditation and mindfulness practice', mood: 'contemplative' },
        { name: 'Fitness Motivation', description: 'Upbeat tracks for workouts and movement', mood: 'energizing' }
      ],
      mindfulness: [
        { name: 'Meditation & Relaxation', description: 'Instrumental music for mindfulness practice', mood: 'calm' },
        { name: 'Compassion Practice', description: 'Music for cultivating empathy and kindness', mood: 'compassionate' },
        { name: 'Gratitude Practice', description: 'Songs that inspire appreciation and thankfulness', mood: 'grateful' }
      ],
      learning: [
        { name: 'Focus & Concentration', description: 'Background music for deep work and study', mood: 'focused' },
        { name: 'Personal Growth', description: 'Songs about self-improvement and development', mood: 'motivational' }
      ]
    },
    catholic: {
      worship: [
        { name: 'Mass Music', description: 'Traditional Catholic hymns and chants', mood: 'reverent' },
        { name: 'Marian Devotion', description: 'Songs honoring the Virgin Mary', mood: 'devotional' },
        { name: 'Saints & Martyrs', description: 'Music celebrating Catholic saints', mood: 'inspiring' }
      ],
      prayer: [
        { name: 'Rosary Meditation', description: 'Music for rosary prayer', mood: 'meditative' },
        { name: 'Adoration', description: 'Music for Eucharistic adoration', mood: 'worshipful' }
      ]
    },
    muslim: {
      worship: [
        { name: 'Quranic Recitation', description: 'Beautiful Quran recitations', mood: 'reverent' },
        { name: 'Nasheeds', description: 'Islamic devotional songs', mood: 'uplifting' },
        { name: 'Dhikr Music', description: 'Music for remembrance of Allah', mood: 'contemplative' }
      ],
      prayer: [
        { name: 'Prayer Time', description: 'Music for Islamic prayer times', mood: 'peaceful' },
        { name: 'Ramadan Reflections', description: 'Special music for Ramadan', mood: 'reflective' }
      ]
    },
    lds: {
      worship: [
        { name: 'Hymns of the Restoration', description: 'LDS hymns and primary songs', mood: 'uplifting' },
        { name: 'Temple Music', description: 'Sacred music for temple worship', mood: 'sacred' }
      ],
      study: [
        { name: 'Scripture Study', description: 'Music for studying LDS scriptures', mood: 'focused' },
        { name: 'Family Home Evening', description: 'Music for FHE activities', mood: 'family-friendly' }
      ]
    },
    interfaith: {
      unity: [
        { name: 'Universal Love', description: 'Music celebrating love across all faiths', mood: 'unifying' },
        { name: 'Peace & Harmony', description: 'Songs promoting peace and understanding', mood: 'peaceful' },
        { name: 'Spiritual Journey', description: 'Music for personal spiritual growth', mood: 'contemplative' }
      ]
    }
  };

  const generatePlaylist = async (category, mood, purpose) => {
    // Simulate AI playlist generation
    const playlist = {
      id: Date.now().toString(),
      name: `${category} - ${mood}`,
      description: `AI-generated playlist for ${purpose}`,
      platform: activePlatform,
      tracks: generateTracks(category, mood),
      duration: Math.floor(Math.random() * 120) + 60, // 60-180 minutes
      followers: Math.floor(Math.random() * 1000) + 100,
      createdAt: new Date()
    };
    
    setGeneratedPlaylists(prev => [playlist, ...prev]);
    setSelectedPlaylist(playlist);
  };

  const generateTracks = (category, mood) => {
    const trackTemplates = {
      christian: {
        uplifting: [
          { title: 'How Great Thou Art', artist: 'Various Artists', duration: '4:32' },
          { title: 'Amazing Grace', artist: 'Chris Tomlin', duration: '4:28' },
          { title: '10,000 Reasons', artist: 'Matt Redman', duration: '5:18' },
          { title: 'Good Good Father', artist: 'Chris Tomlin', duration: '4:52' },
          { title: 'Oceans', artist: 'Hillsong UNITED', duration: '8:56' }
        ],
        peaceful: [
          { title: 'Be Still My Soul', artist: 'Kari Jobe', duration: '4:15' },
          { title: 'It Is Well', artist: 'Bethel Music', duration: '6:24' },
          { title: 'Still', artist: 'Hillsong Worship', duration: '5:18' },
          { title: 'Peace', artist: 'Bethel Music', duration: '4:42' }
        ]
      },
      catholic: {
        reverent: [
          { title: 'Ave Maria', artist: 'Various Artists', duration: '3:45' },
          { title: 'Panis Angelicus', artist: 'Andrea Bocelli', duration: '4:28' },
          { title: 'Salve Regina', artist: 'Gregorian Chant', duration: '6:15' },
          { title: 'Tantum Ergo', artist: 'Various Artists', duration: '3:52' }
        ]
      },
      muslim: {
        contemplative: [
          { title: 'Ayat al-Kursi', artist: 'Abdul Rahman Al-Sudais', duration: '4:32' },
          { title: 'Al-Fatiha', artist: 'Mishary Rashid', duration: '2:15' },
          { title: 'Ya Hayyu Ya Qayyum', artist: 'Various Artists', duration: '5:42' }
        ]
      },
      interfaith: {
        unifying: [
          { title: 'Imagine', artist: 'John Lennon', duration: '3:04' },
          { title: 'What a Wonderful World', artist: 'Louis Armstrong', duration: '2:19' },
          { title: 'Lean on Me', artist: 'Bill Withers', duration: '4:17' },
          { title: 'We Are the World', artist: 'USA for Africa', duration: '7:08' }
        ]
      }
    };

    return trackTemplates[userFaith]?.[mood] || trackTemplates.interfaith.unifying;
  };

  const getCurrentPlaylists = () => {
    const faithPlaylists = playlistCategories[userFaith] || playlistCategories.interfaith;
    const allPlaylists = [];
    
    Object.entries(faithPlaylists).forEach(([category, playlists]) => {
      playlists.forEach(playlist => {
        allPlaylists.push({
          ...playlist,
          category,
          platform: activePlatform
        });
      });
    });

    return allPlaylists;
  };

  const currentPlaylists = getCurrentPlaylists();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <Music className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Wellness Music</h3>
              <p className="text-sm text-gray-600">AI-curated playlists for your wellness journey</p>
            </div>
          </div>
          
          {/* Platform Selector */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActivePlatform('spotify')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                activePlatform === 'spotify' 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Spotify</span>
            </button>
            <button
              onClick={() => setActivePlatform('apple')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                activePlatform === 'apple' 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="w-4 h-4 bg-black rounded-full"></div>
              <span className="text-sm font-medium">Apple Music</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Playlist Generator */}
      <div className="card">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Generate AI Playlist</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Based on your goals:</label>
            <select className="input-field">
              <option value="">Select a goal</option>
              {userGoals.map(goal => (
                <option key={goal.id} value={goal.id}>
                  {goal.title} ({goal.category})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mood:</label>
            <select className="input-field">
              <option value="uplifting">Uplifting & Energetic</option>
              <option value="peaceful">Peaceful & Calm</option>
              <option value="contemplative">Contemplative & Reflective</option>
              <option value="worshipful">Worshipful & Reverent</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="btn-primary w-full flex items-center justify-center space-x-2">
              <Music className="h-4 w-4" />
              <span>Generate Playlist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Curated Playlists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPlaylists.map((playlist, index) => (
          <motion.div
            key={`${playlist.name}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedPlaylist(playlist)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{playlist.name}</h4>
                <p className="text-sm text-gray-600">{playlist.description}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Mood:</span>
                <span className="font-medium text-gray-900">{playlist.mood}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Platform:</span>
                <span className="font-medium text-gray-900">{activePlatform}</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center space-x-2">
              <button className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-1">
                <Play className="h-4 w-4" />
                <span>Play</span>
              </button>
              <button className="btn-secondary p-2">
                <Plus className="h-4 w-4" />
              </button>
              <button className="btn-secondary p-2">
                <Heart className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Generated Playlists */}
      {generatedPlaylists.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Your Generated Playlists</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedPlaylists.map((playlist) => (
              <div key={playlist.id} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h5 className="font-semibold text-gray-900">{playlist.name}</h5>
                    <p className="text-sm text-gray-600">{playlist.description}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>{playlist.duration} min</div>
                    <div>{playlist.followers} followers</div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {playlist.tracks.slice(0, 3).map((track, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Play className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-900">{track.title}</span>
                      </div>
                      <span className="text-gray-600">{track.duration}</span>
                    </div>
                  ))}
                  {playlist.tracks.length > 3 && (
                    <div className="text-sm text-gray-500 text-center">
                      +{playlist.tracks.length - 3} more tracks
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center space-x-1">
                    <ExternalLink className="h-4 w-4" />
                    <span>Open in {activePlatform}</span>
                  </button>
                  <button className="btn-secondary p-2">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicIntegration;
