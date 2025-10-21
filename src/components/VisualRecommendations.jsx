import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Image, 
  Download, 
  Heart, 
  Share2, 
  Eye,
  Palette,
  Mountain,
  Quote,
  Sparkles,
  Camera,
  Wand2
} from 'lucide-react';

const VisualRecommendations = ({ userFaith, savedScriptures = [], userGoals = [] }) => {
  const [activeCategory, setActiveCategory] = useState('backgrounds');
  const [selectedImage, setSelectedImage] = useState(null);
  const [favoriteImages, setFavoriteImages] = useState([]);

  // Visual content categories
  const visualCategories = {
    backgrounds: {
      title: 'Phone Backgrounds',
      icon: Image,
      description: 'Beautiful backgrounds for your phone'
    },
    quotes: {
      title: 'Quote Backgrounds',
      icon: Quote,
      description: 'Inspirational quotes with beautiful designs'
    },
    nature: {
      title: 'Nature & Creation',
      icon: Mountain,
      description: 'Stunning landscapes and natural beauty'
    },
    faith: {
      title: 'Faith Art',
      icon: Sparkles,
      description: 'Artistic representations of spiritual themes'
    }
  };

  // Generate visual content based on user preferences
  const generateVisualContent = () => {
    const backgrounds = generateBackgrounds();
    const quotes = generateQuoteBackgrounds();
    const nature = generateNatureImages();
    const faith = generateFaithArt();

    return { backgrounds, quotes, nature, faith };
  };

  const generateBackgrounds = () => [
    {
      id: 'bg-1',
      title: 'Peaceful Dawn',
      description: 'Soft morning light with gentle colors',
      category: 'backgrounds',
      mood: 'peaceful',
      colors: ['#FFE5B4', '#FFCCCB', '#E0E0E0'],
      tags: ['morning', 'peace', 'light'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop',
      downloadUrl: '#'
    },
    {
      id: 'bg-2',
      title: 'Ocean Waves',
      description: 'Calming ocean waves at sunset',
      category: 'backgrounds',
      mood: 'calm',
      colors: ['#87CEEB', '#4682B4', '#2E8B57'],
      tags: ['ocean', 'sunset', 'calm'],
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=800&fit=crop',
      downloadUrl: '#'
    },
    {
      id: 'bg-3',
      title: 'Mountain Vista',
      description: 'Majestic mountain landscape',
      category: 'backgrounds',
      mood: 'inspiring',
      colors: ['#8B4513', '#A0522D', '#CD853F'],
      tags: ['mountains', 'nature', 'strength'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop',
      downloadUrl: '#'
    }
  ];

  const generateQuoteBackgrounds = () => {
    const userScriptures = savedScriptures.slice(0, 3);
    const quotes = [
      'For I know the plans I have for you',
      'Be still and know that I am God',
      'The Lord is my shepherd',
      'Cast all your anxiety on him',
      'I can do all things through Christ'
    ];

    return quotes.map((quote, index) => ({
      id: `quote-${index}`,
      title: 'Inspirational Quote',
      description: `Beautiful background with "${quote}"`,
      category: 'quotes',
      quote: quote,
      scripture: userScriptures[index]?.reference || 'Jeremiah 29:11',
      mood: 'inspiring',
      colors: ['#4A90E2', '#7ED321', '#F5A623'],
      tags: ['quote', 'inspiration', 'faith'],
      image: `https://picsum.photos/400/800?random=${index + 10}`,
      downloadUrl: '#'
    }));
  };

  const generateNatureImages = () => [
    {
      id: 'nature-1',
      title: 'Forest Path',
      description: 'Peaceful forest pathway',
      category: 'nature',
      mood: 'serene',
      colors: ['#228B22', '#32CD32', '#90EE90'],
      tags: ['forest', 'path', 'peace'],
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=800&fit=crop',
      downloadUrl: '#'
    },
    {
      id: 'nature-2',
      title: 'Starry Night',
      description: 'Clear night sky with stars',
      category: 'nature',
      mood: 'contemplative',
      colors: ['#191970', '#000080', '#4169E1'],
      tags: ['stars', 'night', 'wonder'],
      image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=800&fit=crop',
      downloadUrl: '#'
    }
  ];

  const generateFaithArt = () => {
    const faithArt = {
      christian: [
        { title: 'Cross in Light', description: 'Cross illuminated by divine light', tags: ['cross', 'light', 'hope'] },
        { title: 'Dove of Peace', description: 'White dove representing the Holy Spirit', tags: ['dove', 'peace', 'spirit'] }
      ],
      catholic: [
        { title: 'Madonna and Child', description: 'Beautiful representation of Mary and Jesus', tags: ['mary', 'jesus', 'mother'] },
        { title: 'Sacred Heart', description: 'Sacred Heart of Jesus artwork', tags: ['sacred', 'heart', 'love'] }
      ],
      muslim: [
        { title: 'Islamic Geometry', description: 'Beautiful geometric patterns', tags: ['geometry', 'pattern', 'beauty'] },
        { title: 'Crescent Moon', description: 'Crescent moon in peaceful night sky', tags: ['crescent', 'moon', 'night'] }
      ],
      interfaith: [
        { title: 'Universal Light', description: 'Light representing divine presence', tags: ['light', 'divine', 'universal'] },
        { title: 'Hands in Prayer', description: 'Hands from different faiths in prayer', tags: ['hands', 'prayer', 'unity'] }
      ]
    };

    return (faithArt[userFaith] || faithArt.interfaith).map((art, index) => ({
      id: `faith-${index}`,
      title: art.title,
      description: art.description,
      category: 'faith',
      mood: 'sacred',
      colors: ['#8B4513', '#DAA520', '#F4A460'],
      tags: art.tags,
      image: `https://picsum.photos/400/800?random=${index + 20}`,
      downloadUrl: '#'
    }));
  };

  const visualContent = generateVisualContent();
  const currentContent = visualContent[activeCategory] || [];

  const handleFavorite = (imageId) => {
    setFavoriteImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const renderImageCard = (item) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
      onClick={() => setSelectedImage(item)}
    >
      <div className="aspect-[9/16] bg-gray-200 relative overflow-hidden">
        <div 
          className="w-full h-full bg-gradient-to-br"
          style={{ 
            backgroundImage: `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})` 
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-4">
              {item.category === 'quotes' && (
                <div>
                  <Quote className="h-12 w-12 mx-auto mb-2 opacity-80" />
                  <p className="text-sm font-medium opacity-90">"{item.quote}"</p>
                  <p className="text-xs opacity-70 mt-1">{item.scripture}</p>
                </div>
              )}
              {item.category === 'nature' && (
                <div>
                  <Mountain className="h-12 w-12 mx-auto mb-2 opacity-80" />
                  <p className="text-sm font-medium opacity-90">{item.title}</p>
                </div>
              )}
              {item.category === 'faith' && (
                <div>
                  <Sparkles className="h-12 w-12 mx-auto mb-2 opacity-80" />
                  <p className="text-sm font-medium opacity-90">{item.title}</p>
                </div>
              )}
              {item.category === 'backgrounds' && (
                <div>
                  <Image className="h-12 w-12 mx-auto mb-2 opacity-80" />
                  <p className="text-sm font-medium opacity-90">{item.title}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center space-x-1">
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleFavorite(item.id);
            }}
            className={`p-2 rounded-lg transition-colors ${
              favoriteImages.includes(item.id)
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className="h-4 w-4" />
          </button>
          <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Palette className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Visual Recommendations</h3>
            <p className="text-sm text-gray-600">Beautiful images and backgrounds for your wellness journey</p>
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(visualCategories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === key
                    ? 'bg-vesi-deep text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Generator */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Wand2 className="h-5 w-5 text-vesi-deep" />
          <h4 className="text-lg font-semibold text-gray-900">AI Visual Generator</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Based on your goals:</label>
            <select className="input-field">
              <option value="">Select a goal</option>
              {userGoals.map(goal => (
                <option key={goal.id} value={goal.id}>
                  {goal.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Style:</label>
            <select className="input-field">
              <option value="minimalist">Minimalist</option>
              <option value="nature">Nature-Inspired</option>
              <option value="artistic">Artistic</option>
              <option value="vintage">Vintage</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="btn-primary w-full flex items-center justify-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Generate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentContent.map((item, index) => renderImageCard(item))}
      </div>

      {/* Image Detail Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[9/16] bg-gray-200 relative">
              <div 
                className="w-full h-full bg-gradient-to-br"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${selectedImage.colors[0]}, ${selectedImage.colors[1]})` 
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    {selectedImage.category === 'quotes' && (
                      <div>
                        <Quote className="h-16 w-16 mx-auto mb-4 opacity-80" />
                        <p className="text-lg font-medium opacity-90 mb-2">"{selectedImage.quote}"</p>
                        <p className="text-sm opacity-70">{selectedImage.scripture}</p>
                      </div>
                    )}
                    {selectedImage.category === 'nature' && (
                      <div>
                        <Mountain className="h-16 w-16 mx-auto mb-4 opacity-80" />
                        <p className="text-lg font-medium opacity-90">{selectedImage.title}</p>
                      </div>
                    )}
                    {selectedImage.category === 'faith' && (
                      <div>
                        <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-80" />
                        <p className="text-lg font-medium opacity-90">{selectedImage.title}</p>
                      </div>
                    )}
                    {selectedImage.category === 'backgrounds' && (
                      <div>
                        <Image className="h-16 w-16 mx-auto mb-4 opacity-80" />
                        <p className="text-lg font-medium opacity-90">{selectedImage.title}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedImage.title}</h3>
                  <p className="text-gray-600">{selectedImage.description}</p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedImage.tags.map((tag, index) => (
                  <span key={index} className="text-sm px-3 py-1 bg-vesi-light text-vesi-deep rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Background</span>
                </button>
                <button 
                  onClick={() => handleFavorite(selectedImage.id)}
                  className={`p-3 rounded-lg transition-colors ${
                    favoriteImages.includes(selectedImage.id)
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default VisualRecommendations;
