import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Palette, LogOut, Heart, Shield, Moon, Sun, Link, UserPlus, Book, Brain, Activity, MessageCircle, TrendingUp, Target, Utensils, Calendar, Globe, CheckCircle, XCircle, RefreshCw, Music } from 'lucide-react';
import integrationService from '../lib/IntegrationService';

const Settings = ({ user, onSignOut }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    weeklySummary: true,
    goalReminders: true
  });
  const [integrations, setIntegrations] = useState([]);
  const [connecting, setConnecting] = useState({});
  const [syncing, setSyncing] = useState({});

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'signup', label: 'Setup', icon: UserPlus },
    { id: 'about', label: 'About', icon: Heart }
  ];

  // Load integration status on component mount
  useEffect(() => {
    loadIntegrationStatus();
  }, []);

  const loadIntegrationStatus = () => {
    const status = integrationService.getConnectionStatus();
    setIntegrations(status);
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      onSignOut();
    }
  };

  // Integration management functions
  const handleConnect = async (appName) => {
    setConnecting(prev => ({ ...prev, [appName]: true }));
    
    try {
      const result = await integrationService.initiateConnection(appName);
      if (result.success) {
        if (result.redirecting) {
          // OAuth flow will redirect the page, so we don't need to do anything else
          console.log(`Redirecting to ${appName} for OAuth authorization...`);
        } else {
          loadIntegrationStatus(); // Refresh status
          alert(`Successfully connected to ${appName}!`);
        }
      }
    } catch (error) {
      console.error(`Connection error for ${appName}:`, error);
      alert(`Failed to connect to ${appName}: ${error.message}`);
    } finally {
      setConnecting(prev => ({ ...prev, [appName]: false }));
    }
  };

  const handleDisconnect = (appName) => {
    if (window.confirm(`Are you sure you want to disconnect from ${appName}?`)) {
      const result = integrationService.disconnect(appName);
      if (result.success) {
        loadIntegrationStatus();
        alert(`Disconnected from ${appName}`);
      }
    }
  };

  const handleSyncData = async (appName) => {
    setSyncing(prev => ({ ...prev, [appName]: true }));
    
    try {
      const result = await integrationService.syncData(appName, 'all');
      if (result.success) {
        alert(`Successfully synced data from ${appName}!`);
        // Here you could update the main app state with synced data
      } else {
        alert(`Failed to sync data from ${appName}: ${result.message}`);
      }
    } catch (error) {
      alert(`Error syncing data from ${appName}: ${error.message}`);
    } finally {
      setSyncing(prev => ({ ...prev, [appName]: false }));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-vesi-deep rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{user?.displayName || 'User'}</h3>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName || ''}
                  className="input-field"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  className="input-field"
                  disabled
                />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {key === 'dailyReminder' && 'Get reminded to journal each day'}
                      {key === 'weeklySummary' && 'Receive a weekly summary of your progress'}
                      {key === 'goalReminders' && 'Reminders to complete your daily goals'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-vesi-deep' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {isDarkMode ? <Moon className="h-5 w-5 text-gray-600" /> : <Sun className="h-5 w-5 text-gray-600" />}
                  <div>
                    <h4 className="font-medium text-gray-900">Dark Mode</h4>
                    <p className="text-sm text-gray-600">Switch to dark theme</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDarkMode ? 'bg-vesi-deep' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Link className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrations</h3>
              <p className="text-gray-600">Connect Vesi with your favorite wellness apps and services</p>
            </div>

            {/* Setup Instructions */}
            <div className="card bg-blue-50 border-blue-200 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Link className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">OAuth Setup Required</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    To connect external apps, you need to set up OAuth credentials for each service. 
                    Users will connect their own accounts directly through secure OAuth flows.
                  </p>
                  <div className="text-xs text-blue-600 space-y-1">
                    <p><strong>For Strava:</strong> Add REACT_APP_STRAVA_CLIENT_ID to your .env file</p>
                    <p><strong>For Spotify:</strong> Add REACT_APP_SPOTIFY_CLIENT_ID to your .env file</p>
                    <p><strong>For Garmin:</strong> Add REACT_APP_GARMIN_CLIENT_ID to your .env file</p>
                  </div>
                  <button className="text-xs text-blue- self-start mt-2 underline">
                    View Setup Guide
                  </button>
                </div>
              </div>
            </div>

            {/* Spiritual & Bible Study Apps */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <Book className="h-5 w-5 mr-2 text-vesi-deep" />
                Spiritual & Bible Study
              </h4>
              <div className="grid gap-3">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Book className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">YouVersion Bible</h4>
                        <p className="text-sm text-gray-600">Sync reading plans and verses</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {integrations.find(i => i.name === 'youversion')?.connected ? (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600">Connected</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <XCircle className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">Not connected</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {integrations.find(i => i.name === 'youversion')?.connected ? (
                        <>
                          <button 
                            onClick={() => handleSyncData('youversion')}
                            disabled={syncing['youversion']}
                            className="btn-secondary text-sm flex items-center space-x-1"
                          >
                            {syncing['youversion'] ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3 w-3" />
                            )}
                            <span>Sync</span>
                          </button>
                          <button 
                            onClick={() => handleDisconnect('youversion')}
                            className="btn-primary text-sm"
                          >
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleConnect('youversion')}
                          disabled={connecting['youversion']}
                          className="btn-primary text-sm"
                        >
                          {connecting['youversion'] ? 'Connecting...' : 'Connect'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Heart className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Prayer Apps</h4>
                        <p className="text-sm text-gray-600">Connect with Hallow, Pray.com, or Abide</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Globe className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Church Apps</h4>
                        <p className="text-sm text-gray-600">Sync with your church's mobile app</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mental Health Apps */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Mental Health & Wellness
              </h4>
              <div className="grid gap-3">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Brain className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Headspace</h4>
                        <p className="text-sm text-gray-600">Meditation and mindfulness tracking</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Heart className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Calm</h4>
                        <p className="text-sm text-gray-600">Sleep stories and meditation sessions</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">BetterHelp</h4>
                        <p className="text-sm text-gray-600">Therapy session tracking</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Mood Tracking Apps</h4>
                        <p className="text-sm text-gray-600">Connect with Daylio, Moodpath, or Sanvello</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Fitness Apps */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-600" />
                Physical Fitness & Health
              </h4>
              <div className="grid gap-3">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Activity className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Strava</h4>
                        <p className="text-sm text-gray-600">Running and cycling activity sync</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        console.log('Strava connect button clicked');
                        handleConnect('strava');
                      }}
                      disabled={connecting['strava']}
                      className="btn-primary text-sm"
                    >
                      {connecting['strava'] ? 'Connecting...' : 'Connect'}
                    </button>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Music className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Spotify</h4>
                        <p className="text-sm text-gray-600">Music playlists and wellness recommendations</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {integrations.find(i => i.name === 'spotify')?.connected ? (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600">Connected</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <XCircle className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {integrations.find(i => i.name === 'spotify')?.oauthEnabled ? 'Not connected' : 'OAuth not configured'}
                              </span>
                            </div>
                          )}
                        </div>
                        {!integrations.find(i => i.name === 'spotify')?.oauthEnabled && (
                          <p className="text-xs text-yellow-600 mt-1">
                            Add REACT_APP_SPOTIFY_CLIENT_ID to .env file
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {integrations.find(i => i.name === 'spotify')?.connected ? (
                        <>
                          <button 
                            onClick={() => handleSyncData('spotify')}
                            disabled={syncing['spotify']}
                            className="btn-secondary text-sm flex items-center space-x-1"
                          >
                            {syncing['spotify'] ? (
                              <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3 w-3" />
                            )}
                            <span>Sync</span>
                          </button>
                          <button 
                            onClick={() => handleDisconnect('spotify')}
                            className="btn-primary text-sm"
                          >
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => {
                            console.log('Spotify connect button clicked');
                            handleConnect('spotify');
                          }}
                          disabled={connecting['spotify'] || !integrations.find(i => i.name === 'spotify')?.oauthEnabled}
                          className="btn-primary text-sm"
                        >
                          {connecting['spotify'] ? 'Connecting...' : 'Connect'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Target className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Garmin Connect</h4>
                        <p className="text-sm text-gray-600">Smartwatch and fitness tracker data</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Heart className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Coros</h4>
                        <p className="text-sm text-gray-600">Running watch and training data</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Utensils className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">MyFitnessPal</h4>
                        <p className="text-sm text-gray-600">Nutrition and calorie tracking</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Heart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Apple Health</h4>
                        <p className="text-sm text-gray-600">Comprehensive health data sync</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Activity className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Google Fit</h4>
                        <p className="text-sm text-gray-600">Activity and wellness tracking</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <Target className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Fitbit</h4>
                        <p className="text-sm text-gray-600">Activity, sleep, and health metrics</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>
              </div>
            </div>

            {/* General Integrations */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                General & Productivity
              </h4>
              <div className="grid gap-3">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Calendar Apps</h4>
                        <p className="text-sm text-gray-600">Google Calendar, Outlook, Apple Calendar</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Connect</button>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Shield className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Data Backup</h4>
                        <p className="text-sm text-gray-600">iCloud, Google Drive, Dropbox</p>
                      </div>
                    </div>
                    <button className="btn-primary text-sm">Setup</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'signup':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Your Setup</h3>
              <p className="text-gray-600">Personalize your wellness journey</p>
            </div>

            <div className="card bg-gradient-to-br from-blue-50 to-green-50">
              <h4 className="font-semibold text-gray-900 mb-3">Setup Progress</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Account created</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Faith tradition selected</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Location added</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Focus areas chosen</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card">
                <h4 className="font-medium text-gray-900 mb-2">Wellness Focus Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {user?.focusAreas?.map((area, index) => (
                    <span key={index} className="px-3 py-1 bg-vesi-blue text-vesi-deep rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card">
                <h4 className="font-medium text-gray-900 mb-2">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Faith:</span>
                    <span className="text-gray-900">{user?.denomination || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="text-gray-900">{user?.location?.country || 'Not specified'}</span>
                  </div>
                </div>
              </div>

              <button className="w-full btn-primary">
                Update Setup Preferences
              </button>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-vesi-deep rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-lora font-semibold text-gray-900 mb-2">Vesi</h3>
              <p className="text-gray-600 mb-4">Flow with purpose. Grow with light.</p>
              <p className="text-sm text-gray-500">Version 1.0.0</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-vesi-blue rounded-lg">
                <h4 className="font-medium text-vesi-deep mb-2">About Vesi</h4>
                <p className="text-sm text-vesi-deep">
                  Vesi (Finnish for "water") is your one-stop wellness companion that helps you 
                  become your best self through holistic wellness, including spiritual growth, 
                  personal development, fitness, and mental health.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Our Mission</h4>
                <p className="text-sm text-green-700">
                  To create a comprehensive wellness platform that supports your journey to becoming 
                  your best self through holistic health, spiritual growth, and personal development.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-vesi-light to-vesi-blue rounded-lg">
                <h4 className="font-medium text-vesi-deep mb-2">Our Vision</h4>
                <p className="text-sm text-vesi-deep mb-3">
                  Vesi isn't here to make you more productive. It's here to help you become your best self — 
                  through holistic wellness, spiritual growth, and personal development.
                </p>
                <div className="space-y-2 text-xs text-vesi-deep">
                  <p><strong>How It Works:</strong> You set goals, journal your progress, and Vesi connects the dots — offering personalized insights, scripture, and encouragement.</p>
                  <p><strong>Why It's Different:</strong> Most apps help you track goals. Vesi helps you transform through them.</p>
                  <p><strong>Core Promise:</strong> Flow with purpose. Grow with light. ✨</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900">Privacy Policy</h4>
                    <p className="text-sm text-gray-600">Learn how we protect your data</p>
                  </div>
                </div>
              </button>

              <button className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-900">Support</h4>
                    <p className="text-sm text-gray-600">Get help or share feedback</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-lora font-semibold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignOut}
          className="btn-secondary flex items-center space-x-2 text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-vesi-deep text-white'
                      : 'text-gray-600 hover:bg-vesi-blue hover:text-vesi-deep'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="card"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
