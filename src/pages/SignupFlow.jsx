import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SignupFlow from '../components/SignupFlow';

const SignupFlowPage = () => {
  const [signupData, setSignupData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleSignupComplete = (data) => {
    setSignupData(data);
    setShowResults(true);
  };

  const handleSignupSkip = () => {
    setSignupData(null);
    setShowResults(true);
  };

  const handleReset = () => {
    setSignupData(null);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-vesi-light to-vesi-blue p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-vesi-deep to-vesi-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white text-2xl"
                >
                  ✓
                </motion.div>
              </div>
              <h1 className="text-3xl font-lora font-bold text-gray-900 mb-2">
                {signupData ? 'Signup Complete!' : 'Signup Skipped'}
              </h1>
              <p className="text-gray-600">
                {signupData ? 'Your profile has been personalized!' : 'You can complete this setup later in settings.'}
              </p>
            </div>

            {signupData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-vesi-light rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-vesi-deep mb-4">Your Profile</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Faith & Denomination</h3>
                      <p className="text-gray-600">
                        <strong>{signupData.faith?.name}</strong>
                        {signupData.denomination && (
                          <span className="block text-sm">({signupData.denomination})</span>
                        )}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                      <p className="text-gray-600">
                        {signupData.location.country}
                        {signupData.location.region && (
                          <span>, {signupData.location.region}</span>
                        )}
                        {signupData.location.timezone && (
                          <span className="block text-sm">({signupData.location.timezone})</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {signupData.focusAreas.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-medium text-gray-900 mb-3">Focus Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {signupData.focusAreas.map((areaId, index) => {
                          const focusAreaNames = {
                            'prayer': 'Prayer & Meditation',
                            'scripture': 'Scripture Study',
                            'service': 'Service & Charity',
                            'discipline': 'Spiritual Discipline',
                            'community': 'Faith Community',
                            'gratitude': 'Gratitude & Mindfulness',
                            'forgiveness': 'Forgiveness & Healing',
                            'wisdom': 'Wisdom & Understanding'
                          };
                          return (
                            <span
                              key={areaId}
                              className="px-3 py-1 bg-vesi-deep text-white text-sm rounded-full"
                            >
                              {focusAreaNames[areaId] || areaId}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-medium text-blue-900 mb-2">What's Next?</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Your AI companion will be personalized to your faith tradition</li>
                    <li>• You'll receive relevant scripture suggestions and prayers</li>
                    <li>• Community features will connect you with similar users</li>
                    <li>• Goals and habits will be tailored to your focus areas</li>
                  </ul>
                </div>
              </motion.div>
            )}

            <div className="mt-8 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="btn-primary"
              >
                Try Again
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <SignupFlow 
      onComplete={handleSignupComplete}
      onSkip={handleSignupSkip}
    />
  );
};

export default SignupFlowPage;

