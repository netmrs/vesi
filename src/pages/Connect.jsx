import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Heart, 
  Brain, 
  Dumbbell, 
  Cross, 
  Star, 
  MessageCircle, 
  Video, 
  Phone, 
  MapPin, 
  Clock, 
  Star as StarIcon,
  Filter,
  Search,
  Award,
  Shield,
  CheckCircle
} from 'lucide-react';

const Connect = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const categories = [
    { id: 'all', name: 'All Professionals', icon: Users, color: 'bg-blue-500' },
    { id: 'therapists', name: 'Therapists & Counselors', icon: Brain, color: 'bg-green-500' },
    { id: 'fitness', name: 'Fitness Trainers', icon: Dumbbell, color: 'bg-red-500' },
    { id: 'spiritual', name: 'Spiritual Leaders', icon: Cross, color: 'bg-purple-500' },
    { id: 'nutrition', name: 'Nutritionists', icon: Heart, color: 'bg-orange-500' },
    { id: 'life-coaches', name: 'Life Coaches', icon: Star, color: 'bg-yellow-500' }
  ];

  const professionals = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      title: 'Licensed Therapist',
      category: 'therapists',
      specialties: ['Anxiety', 'Depression', 'Trauma Recovery'],
      rating: 4.9,
      reviews: 127,
      experience: '8 years',
      price: '$120/session',
      availability: 'Available today',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      description: 'Specialized in cognitive behavioral therapy with a focus on anxiety and depression. LGBTQ+ affirming.',
      verified: true,
      online: true,
      languages: ['English', 'Spanish'],
      methods: ['Video Call', 'Phone', 'In-Person']
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      title: 'Certified Personal Trainer',
      category: 'fitness',
      specialties: ['Strength Training', 'Weight Loss', 'Rehabilitation'],
      rating: 4.8,
      reviews: 89,
      experience: '12 years',
      price: '$80/session',
      availability: 'Available this week',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face',
      description: 'NASM certified trainer specializing in strength training and injury rehabilitation. Works with all fitness levels.',
      verified: true,
      online: true,
      languages: ['English'],
      methods: ['In-Person', 'Video Call']
    },
    {
      id: 3,
      name: 'Pastor Michael Rodriguez',
      title: 'Pastor & Spiritual Counselor',
      category: 'spiritual',
      specialties: ['Spiritual Guidance', 'Marriage Counseling', 'Grief Support'],
      rating: 4.9,
      reviews: 156,
      experience: '15 years',
      price: 'Free',
      availability: 'Available daily',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      description: 'Experienced pastor offering spiritual guidance, marriage counseling, and grief support. All are welcome.',
      verified: true,
      online: true,
      languages: ['English', 'Spanish'],
      methods: ['Video Call', 'Phone', 'In-Person']
    },
    {
      id: 4,
      name: 'Lisa Thompson, RD',
      title: 'Registered Dietitian',
      category: 'nutrition',
      specialties: ['Weight Management', 'Diabetes Care', 'Sports Nutrition'],
      rating: 4.7,
      reviews: 93,
      experience: '6 years',
      price: '$100/session',
      availability: 'Available next week',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      description: 'Registered dietitian specializing in evidence-based nutrition counseling for various health conditions.',
      verified: true,
      online: true,
      languages: ['English'],
      methods: ['Video Call', 'Phone']
    },
    {
      id: 5,
      name: 'David Park',
      title: 'Life Coach',
      category: 'life-coaches',
      specialties: ['Career Development', 'Goal Setting', 'Personal Growth'],
      rating: 4.8,
      reviews: 67,
      experience: '5 years',
      price: '$90/session',
      availability: 'Available today',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      description: 'Certified life coach helping individuals achieve their personal and professional goals through structured coaching.',
      verified: true,
      online: true,
      languages: ['English', 'Korean'],
      methods: ['Video Call', 'Phone']
    },
    {
      id: 6,
      name: 'Dr. Emily Watson',
      title: 'Clinical Psychologist',
      category: 'therapists',
      specialties: ['ADHD', 'Learning Disabilities', 'Family Therapy'],
      rating: 4.9,
      reviews: 203,
      experience: '10 years',
      price: '$150/session',
      availability: 'Available next week',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      description: 'Clinical psychologist specializing in ADHD assessment and treatment, family therapy, and learning disabilities.',
      verified: true,
      online: true,
      languages: ['English'],
      methods: ['Video Call', 'In-Person']
    }
  ];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesCategory = selectedCategory === 'all' || prof.category === selectedCategory;
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prof.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleConnect = (professional) => {
    // In a real app, this would open a booking system or contact form
    alert(`Connecting you with ${professional.name}... This would open our booking system in a real app.`);
  };

  const renderProfessionalCard = (professional) => (
    <motion.div
      key={professional.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card hover:shadow-lg transition-all cursor-pointer"
      onClick={() => setSelectedProfessional(professional)}
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            src={professional.image}
            alt={professional.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {professional.online && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900">{professional.name}</h3>
              <p className="text-sm text-gray-600">{professional.title}</p>
            </div>
            <div className="flex items-center space-x-1">
              <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{professional.rating}</span>
              <span className="text-xs text-gray-500">({professional.reviews})</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {professional.specialties.slice(0, 2).map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {specialty}
              </span>
            ))}
            {professional.specialties.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{professional.specialties.length - 2} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{professional.experience}</span>
            <span className="font-semibold text-green-600">{professional.price}</span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-green-600">{professional.availability}</span>
            {professional.verified && (
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-600">Verified</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-lora font-bold text-gray-900 mb-2">
          Connect with Wellness Professionals
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find trusted therapists, trainers, spiritual leaders, and wellness experts to support your journey. 
          All professionals are verified and ready to help you grow.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">Filter:</span>
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                selectedCategory === category.id
                  ? 'border-vesi-deep bg-vesi-light'
                  : 'border-gray-200 hover:border-vesi-blue hover:bg-gray-50'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Professionals Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {filteredProfessionals.map(renderProfessionalCard)}
      </motion.div>

      {/* Professional Detail Modal */}
      {selectedProfessional && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProfessional(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedProfessional.image}
                    alt={selectedProfessional.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">{selectedProfessional.name}</h2>
                    <p className="text-gray-600">{selectedProfessional.title}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <StarIcon className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-medium">{selectedProfessional.rating}</span>
                      <span className="text-gray-500">({selectedProfessional.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProfessional(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfessional.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600">{selectedProfessional.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Experience</h4>
                    <p className="text-gray-600">{selectedProfessional.experience}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Price</h4>
                    <p className="text-green-600 font-semibold">{selectedProfessional.price}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Languages</h4>
                    <p className="text-gray-600">{selectedProfessional.languages.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Availability</h4>
                    <p className="text-green-600">{selectedProfessional.availability}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Session Methods</h3>
                  <div className="flex space-x-4">
                    {selectedProfessional.methods.map((method, index) => {
                      const Icon = method === 'Video Call' ? Video : 
                                  method === 'Phone' ? Phone : 
                                  method === 'In-Person' ? MapPin : Clock;
                      return (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{method}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleConnect(selectedProfessional)}
                    className="btn-primary flex-1 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Connect Now</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Award className="h-4 w-4" />
                    <span>Save</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-gradient-to-br from-vesi-light to-vesi-blue text-center"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Are you a wellness professional?
        </h3>
        <p className="text-gray-600 mb-4">
          Join our network of verified professionals and help people on their wellness journey.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
        >
          Apply to Join
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Connect;

