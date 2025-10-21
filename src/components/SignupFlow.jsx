import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Cross, 
  MoonStar, 
  Star, 
  Circle,
  Check,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Target,
  Users,
  Globe,
  Info,
  ChevronRight,
  Activity,
  Brain,
  Dumbbell,
  Zap,
  BookOpen,
  Leaf
} from 'lucide-react';

const SignupFlow = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    faith: null,
    denomination: '',
    location: {
      country: '',
      region: '',
      timezone: ''
    },
    focusAreas: []
  });

  const totalSteps = 4;

  // Faith options with denominations
  const faithOptions = [
    {
      id: 'christian',
      name: 'Christian',
      description: 'Protestant, Evangelical, and other Christian denominations',
      icon: Cross,
      color: 'from-blue-500 to-blue-700',
      iconColor: 'text-blue-600',
      denominations: [
        'Protestant (General)',
        'Baptist',
        'Methodist',
        'Presbyterian',
        'Lutheran',
        'Episcopal/Anglican',
        'Pentecostal',
        'Evangelical',
        'Non-denominational',
        'Other Protestant'
      ]
    },
    {
      id: 'catholic',
      name: 'Catholic',
      description: 'Roman Catholic Church traditions and practices',
      icon: Cross,
      color: 'from-purple-500 to-purple-700',
      iconColor: 'text-purple-600',
      denominations: [
        'Roman Catholic',
        'Eastern Catholic',
        'Other Catholic'
      ]
    },
    {
      id: 'lds',
      name: 'Church of Jesus Christ of Latter-day Saints',
      description: 'LDS Church teachings and practices',
      icon: Circle,
      color: 'from-indigo-500 to-indigo-700',
      iconColor: 'text-indigo-600',
      denominations: [
        'Church of Jesus Christ of Latter-day Saints',
        'Community of Christ',
        'Other Restoration Movement'
      ]
    },
    {
      id: 'muslim',
      name: 'Muslim',
      description: 'Islamic faith and practices',
      icon: MoonStar,
      color: 'from-green-500 to-green-700',
      iconColor: 'text-green-600',
      denominations: [
        'Sunni',
        'Shia',
        'Sufi',
        'Other Islamic tradition'
      ]
    },
    {
      id: 'jewish',
      name: 'Jewish',
      description: 'Judaism and Jewish traditions',
      icon: Star,
      color: 'from-yellow-500 to-yellow-700',
      iconColor: 'text-yellow-600',
      denominations: [
        'Orthodox',
        'Conservative',
        'Reform',
        'Reconstructionist',
        'Other Jewish tradition'
      ]
    },
    {
      id: 'buddhist',
      name: 'Buddhist',
      description: 'Buddhism and meditation practices',
      icon: Circle,
      color: 'from-orange-500 to-orange-700',
      iconColor: 'text-orange-600',
      denominations: [
        'Theravada',
        'Mahayana',
        'Vajrayana',
        'Zen',
        'Other Buddhist tradition'
      ]
    },
    {
      id: 'hindu',
      name: 'Hindu',
      description: 'Hinduism and spiritual practices',
      icon: Circle,
      color: 'from-red-500 to-red-700',
      iconColor: 'text-red-600',
      denominations: [
        'Vaishnavism',
        'Shaivism',
        'Shaktism',
        'Smartism',
        'Other Hindu tradition'
      ]
    },
    {
      id: 'spiritual',
      name: 'Spiritual / Interfaith',
      description: 'Open to multiple faiths or spiritual without specific denomination',
      icon: Heart,
      color: 'from-pink-500 to-pink-700',
      iconColor: 'text-pink-600',
      denominations: [
        'Interfaith',
        'New Age Spirituality',
        'Personal Spirituality',
        'Agnostic Spiritual',
        'Other Spiritual Path'
      ]
    }
  ];

  // Focus areas for spiritual growth
  const focusAreas = [
    // Physical Wellness
    {
      id: 'fitness',
      name: 'Fitness & Exercise',
      description: 'Building strength, endurance, and physical health',
      icon: Dumbbell,
      color: 'text-red-500'
    },
    {
      id: 'nutrition',
      name: 'Nutrition & Health',
      description: 'Healthy eating habits and nutritional wellness',
      icon: Leaf,
      color: 'text-green-500'
    },
    {
      id: 'sleep',
      name: 'Sleep & Recovery',
      description: 'Improving sleep quality and rest patterns',
      icon: Zap,
      color: 'text-purple-500'
    },
    
    // Mental Wellness
    {
      id: 'mindfulness',
      name: 'Mindfulness & Meditation',
      description: 'Stress reduction and present-moment awareness',
      icon: Brain,
      color: 'text-blue-500'
    },
    {
      id: 'mental-health',
      name: 'Mental Health',
      description: 'Managing anxiety, depression, and emotional well-being',
      icon: Heart,
      color: 'text-pink-500'
    },
    {
      id: 'learning',
      name: 'Learning & Growth',
      description: 'Continuous learning and skill development',
      icon: BookOpen,
      color: 'text-indigo-500'
    },
    
    // Spiritual & Social
    {
      id: 'spirituality',
      name: 'Spirituality & Faith',
      description: 'Prayer, meditation, and spiritual practices',
      icon: Star,
      color: 'text-yellow-500'
    },
    {
      id: 'relationships',
      name: 'Relationships & Community',
      description: 'Building meaningful connections and serving others',
      icon: Users,
      color: 'text-orange-500'
    },
    
    // Personal Development
    {
      id: 'productivity',
      name: 'Productivity & Goals',
      description: 'Achieving personal and professional objectives',
      icon: Target,
      color: 'text-teal-500'
    },
    {
      id: 'creativity',
      name: 'Creativity & Hobbies',
      description: 'Exploring artistic expression and personal interests',
      icon: Zap,
      color: 'text-violet-500'
    }
  ];

  // Common countries and regions
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Spain', 'Italy',
    'Brazil', 'Mexico', 'Argentina', 'Japan', 'South Korea', 'China', 'India', 'South Africa',
    'Nigeria', 'Kenya', 'Egypt', 'Israel', 'Turkey', 'Russia', 'Ukraine', 'Poland',
    'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Other'
  ];

  const handleFaithSelect = (faith) => {
    setFormData(prev => ({ ...prev, faith }));
  };

  const handleDenominationSelect = (denomination) => {
    setFormData(prev => ({ ...prev, denomination }));
  };

  const handleLocationUpdate = (field, value) => {
    setFormData(prev => ({
      ...prev,
      location: { ...prev.location, [field]: value }
    }));
  };

  const handleFocusAreaToggle = (areaId) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(areaId)
        ? prev.focusAreas.filter(id => id !== areaId)
        : [...prev.focusAreas, areaId]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.faith !== null;
      case 2:
        return formData.denomination !== '';
      case 3:
        return formData.location.country !== '';
      case 4:
        return formData.focusAreas.length > 0;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Choose Your Wellness Approach
              </h2>
              <p className="text-gray-600">
                Select your primary approach to wellness and spirituality to personalize your experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faithOptions.map((faith, index) => {
                const Icon = faith.icon;
                return (
                  <motion.div
                    key={faith.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleFaithSelect(faith)}
                    className={`card cursor-pointer hover:shadow-lg transition-all ${
                      formData.faith?.id === faith.id ? 'ring-2 ring-vesi-deep bg-vesi-light' : ''
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${faith.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{faith.name}</h3>
                      <p className="text-sm text-gray-600">{faith.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Select Your Denomination
              </h2>
              <p className="text-gray-600">
                Choose the specific denomination or tradition within {formData.faith?.name}.
              </p>
            </div>

            <div className="space-y-3">
              {formData.faith?.denominations.map((denomination, index) => (
                <motion.button
                  key={denomination}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleDenominationSelect(denomination)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    formData.denomination === denomination
                      ? 'border-vesi-deep bg-vesi-light'
                      : 'border-gray-200 hover:border-vesi-blue hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{denomination}</span>
                    {formData.denomination === denomination && (
                      <Check className="h-5 w-5 text-vesi-deep" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Where Are You Located?
              </h2>
              <p className="text-gray-600">
                Help us provide relevant community features and time-based reminders.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={formData.location.country}
                  onChange={(e) => handleLocationUpdate('country', e.target.value)}
                  className="w-full input-field"
                >
                  <option value="">Select your country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region/State/Province (Optional)
                </label>
                <input
                  type="text"
                  value={formData.location.region}
                  onChange={(e) => handleLocationUpdate('region', e.target.value)}
                  placeholder="e.g., California, Ontario, Bavaria"
                  className="w-full input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={formData.location.timezone}
                  onChange={(e) => handleLocationUpdate('timezone', e.target.value)}
                  className="w-full input-field"
                >
                  <option value="">Select your timezone</option>
                  <option value="UTC-12">UTC-12 (Baker Island)</option>
                  <option value="UTC-11">UTC-11 (American Samoa)</option>
                  <option value="UTC-10">UTC-10 (Hawaii)</option>
                  <option value="UTC-9">UTC-9 (Alaska)</option>
                  <option value="UTC-8">UTC-8 (Pacific Time)</option>
                  <option value="UTC-7">UTC-7 (Mountain Time)</option>
                  <option value="UTC-6">UTC-6 (Central Time)</option>
                  <option value="UTC-5">UTC-5 (Eastern Time)</option>
                  <option value="UTC-4">UTC-4 (Atlantic Time)</option>
                  <option value="UTC-3">UTC-3 (Brazil)</option>
                  <option value="UTC-2">UTC-2 (Mid-Atlantic)</option>
                  <option value="UTC-1">UTC-1 (Azores)</option>
                  <option value="UTC+0">UTC+0 (GMT/London)</option>
                  <option value="UTC+1">UTC+1 (Central Europe)</option>
                  <option value="UTC+2">UTC+2 (Eastern Europe)</option>
                  <option value="UTC+3">UTC+3 (Moscow)</option>
                  <option value="UTC+4">UTC+4 (Gulf)</option>
                  <option value="UTC+5">UTC+5 (Pakistan)</option>
                  <option value="UTC+6">UTC+6 (Bangladesh)</option>
                  <option value="UTC+7">UTC+7 (Thailand)</option>
                  <option value="UTC+8">UTC+8 (China)</option>
                  <option value="UTC+9">UTC+9 (Japan)</option>
                  <option value="UTC+10">UTC+10 (Australia)</option>
                  <option value="UTC+11">UTC+11 (Solomon Islands)</option>
                  <option value="UTC+12">UTC+12 (New Zealand)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                What Would You Like to Focus On?
              </h2>
              <p className="text-gray-600">
                Select the wellness areas you'd like to focus on in your personal growth journey. Choose as many as you'd like.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {focusAreas.map((area, index) => {
                const Icon = area.icon;
                const isSelected = formData.focusAreas.includes(area.id);
                return (
                  <motion.div
                    key={area.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleFocusAreaToggle(area.id)}
                    className={`card cursor-pointer hover:shadow-lg transition-all ${
                      isSelected ? 'ring-2 ring-vesi-deep bg-vesi-light' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-vesi-light' : ''
                      }`}>
                        <Icon className={`h-6 w-6 ${isSelected ? 'text-vesi-deep' : area.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{area.name}</h3>
                          {isSelected && <Check className="h-5 w-5 text-vesi-deep" />}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{area.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {formData.focusAreas.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-vesi-light rounded-lg p-4"
              >
                <p className="text-sm text-vesi-deep">
                  <strong>Selected areas:</strong> {formData.focusAreas.length} focus area(s) chosen. 
                  Vesi will help you build habits and track progress in these areas.
                </p>
              </motion.div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vesi-light to-vesi-blue flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8">
          {/* Header with Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-lora font-bold text-gray-900">
                    Welcome to Vesi
                  </h1>
                  <p className="text-gray-600">Let's personalize your wellness journey</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Step {currentStep} of {totalSteps}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-vesi-deep to-vesi-accent h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t">
            <button
              onClick={currentStep === 1 ? onSkip : handleBack}
              className="btn-secondary flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{currentStep === 1 ? 'Skip Setup' : 'Back'}</span>
            </button>

            <div className="flex items-center space-x-3">
              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`btn-primary flex items-center space-x-2 ${
                    !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`btn-primary flex items-center space-x-2 ${
                    !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span>Complete Setup</span>
                  <Check className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupFlow;
