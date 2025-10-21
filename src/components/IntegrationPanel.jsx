import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Bell, 
  Cloud, 
  Download, 
  CheckCircle, 
  AlertCircle,
  Settings,
  Zap,
  RefreshCw
} from 'lucide-react';
import integrationService from '../lib/IntegrationService';

const IntegrationPanel = ({ goals, entries, user, onIntegrationUpdate }) => {
  const [activeIntegrations, setActiveIntegrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    checkIntegrationStatus();
    checkNotificationPermission();
  }, []);

  const checkIntegrationStatus = () => {
    const integrations = integrationService.getAvailableIntegrations();
    const active = integrations.filter(integration => 
      integrationService.isConnected(integration.name.toLowerCase().replace(' ', '-'))
    );
    setActiveIntegrations(active);
  };

  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }
  };

  const handleConnectIntegration = async (integrationId) => {
    setLoading(true);
    try {
      const result = await integrationService.connectIntegration(integrationId);
      if (result.success) {
        checkIntegrationStatus();
        onIntegrationUpdate?.();
        
        // Show success message
        await integrationService.sendWebNotification(
          'Integration Connected',
          { body: `${integrationService.getIntegration(integrationId)?.name} has been connected successfully!` }
        );
      }
    } catch (error) {
      console.error('Integration connection error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncGoals = async (integrationId) => {
    setLoading(true);
    try {
      const result = await integrationService.syncWithIntegration(integrationId, goals);
      if (result.success) {
        await integrationService.sendWebNotification(
          'Goals Synced',
          { body: `Synced ${result.syncedGoals || 0} spiritual goals to your calendar` }
        );
      }
    } catch (error) {
      console.error('Goal sync error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnableNotifications = async () => {
    setLoading(true);
    try {
      const result = await integrationService.setupWebNotifications();
      if (result.success) {
        setNotificationsEnabled(true);
        await integrationService.sendWebNotification(
          'Notifications Enabled',
          { body: 'You\'ll now receive gentle reminders for your spiritual practices' }
        );
      }
    } catch (error) {
      console.error('Notification setup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleReminder = async (goal) => {
    const reminderTime = new Date();
    reminderTime.setMinutes(reminderTime.getMinutes() + 5); // 5 minutes from now for demo

    const result = await integrationService.scheduleWebNotification(
      `Time for ${goal.title}`,
      reminderTime,
      { 
        body: goal.description,
        tag: `goal-${goal.id}`
      }
    );

    if (result.success) {
      await integrationService.sendWebNotification(
        'Reminder Scheduled',
        { body: `Reminder set for ${goal.title} in 5 minutes` }
      );
    }
  };

  const handleExportData = async (format) => {
    setLoading(true);
    try {
      let result;
      if (format === 'pdf') {
        result = await integrationService.exportToPDF(entries, goals, user);
      } else if (format === 'csv') {
        result = await integrationService.exportToCSV(entries, goals);
      }

      if (result.success) {
        await integrationService.sendWebNotification(
          'Export Complete',
          { body: `Your spiritual journey data has been exported as ${format.toUpperCase()}` }
        );
      }
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackupData = async () => {
    setLoading(true);
    try {
      const result = await integrationService.backupSpiritualData(user, entries, goals);
      if (result.success) {
        await integrationService.sendWebNotification(
          'Backup Complete',
          { body: 'Your spiritual journey has been safely backed up' }
        );
      }
    } catch (error) {
      console.error('Backup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const integrations = [
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      icon: Calendar,
      description: 'Sync spiritual goals with your calendar',
      connected: integrationService.isConnected('google-calendar'),
      onConnect: () => handleConnectIntegration('google-calendar'),
      onSync: () => handleSyncGoals('google-calendar')
    },
    {
      id: 'apple-calendar',
      name: 'Apple Calendar',
      icon: Calendar,
      description: 'Integrate with iPhone and Mac calendar',
      connected: integrationService.isConnected('apple-calendar'),
      onConnect: () => handleConnectIntegration('apple-calendar'),
      onSync: () => handleSyncGoals('apple-calendar')
    },
    {
      id: 'web-notifications',
      name: 'Smart Notifications',
      icon: Bell,
      description: 'Intelligent spiritual practice reminders',
      connected: notificationsEnabled,
      onConnect: handleEnableNotifications
    },
    {
      id: 'cloud-backup',
      name: 'Cloud Backup',
      icon: Cloud,
      description: 'Automatic backup of your spiritual journey',
      connected: integrationService.isConnected('cloud-backup'),
      onConnect: () => handleConnectIntegration('cloud-backup'),
      onSync: handleBackupData
    }
  ];

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="h-6 w-6 text-vesi-deep" />
          <h3 className="text-lg font-semibold text-gray-900">Quick Setup</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Icon className="h-5 w-5 text-vesi-deep" />
                  <div>
                    <h4 className="font-medium text-gray-900">{integration.name}</h4>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {integration.connected ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Connected</span>
                    </div>
                  ) : (
                    <button
                      onClick={integration.onConnect}
                      disabled={loading}
                      className="btn-primary text-sm px-3 py-1"
                    >
                      Connect
                    </button>
                  )}
                  
                  {integration.connected && integration.onSync && (
                    <button
                      onClick={integration.onSync}
                      disabled={loading}
                      className="btn-secondary text-sm px-3 py-1 flex items-center space-x-1"
                    >
                      <RefreshCw className="h-3 w-3" />
                      <span>Sync</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Goal-Specific Integration Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Integration Actions</h3>
        
        <div className="space-y-3">
          {goals.filter(goal => goal.category === 'spiritual').map((goal) => (
            <div key={goal.id} className="flex items-center justify-between p-3 bg-vesi-light rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{goal.title}</h4>
                <p className="text-sm text-gray-600">{goal.frequency} • {goal.timePeriod}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleScheduleReminder(goal)}
                  disabled={!notificationsEnabled}
                  className="btn-secondary text-sm px-3 py-1 flex items-center space-x-1"
                >
                  <Bell className="h-3 w-3" />
                  <span>Remind</span>
                </button>
                
                <button
                  onClick={() => handleSyncGoals('google-calendar')}
                  disabled={!integrationService.isConnected('google-calendar')}
                  className="btn-secondary text-sm px-3 py-1 flex items-center space-x-1"
                >
                  <Calendar className="h-3 w-3" />
                  <span>Calendar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Export Options */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export & Backup</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleExportData('pdf')}
            disabled={loading}
            className="btn-secondary flex items-center justify-center space-x-2 py-3"
          >
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
          
          <button
            onClick={() => handleExportData('csv')}
            disabled={loading}
            className="btn-secondary flex items-center justify-center space-x-2 py-3"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          
          <button
            onClick={handleBackupData}
            disabled={loading}
            className="btn-secondary flex items-center justify-center space-x-2 py-3"
          >
            <Cloud className="h-4 w-4" />
            <span>Backup Data</span>
          </button>
        </div>
      </div>

      {/* Integration Status */}
      <div className="card bg-gradient-to-br from-vesi-light to-vesi-blue">
        <h3 className="text-lg font-semibold text-vesi-deep mb-4">Integration Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-vesi-deep mb-2">Connected Integrations</h4>
            <div className="space-y-2">
              {activeIntegrations.map((integration) => (
                <div key={integration.name} className="flex items-center space-x-2 text-sm text-vesi-deep">
                  <CheckCircle className="h-4 w-4" />
                  <span>{integration.name}</span>
                </div>
              ))}
              {activeIntegrations.length === 0 && (
                <p className="text-sm text-vesi-deep">No integrations connected yet</p>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-vesi-deep mb-2">Quick Actions</h4>
            <div className="space-y-2">
              <button
                onClick={() => handleSyncGoals('google-calendar')}
                disabled={!integrationService.isConnected('google-calendar')}
                className="text-sm text-vesi-deep hover:text-blue-700 underline"
              >
                Sync All Goals
              </button>
              <br />
              <button
                onClick={handleBackupData}
                className="text-sm text-vesi-deep hover:text-blue-700 underline"
              >
                Backup Now
              </button>
              <br />
              <button
                onClick={() => handleExportData('pdf')}
                className="text-sm text-vesi-deep hover:text-blue-700 underline"
              >
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationPanel;

