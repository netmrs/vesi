import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Plus,
  Star,
  Zap
} from 'lucide-react';
import dataIntegrationService from '../lib/DataIntegrationService';

const CalendarInsights = ({ onAddGoal }) => {
  const [calendarInsights, setCalendarInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCalendarData = async () => {
      setLoading(true);
      try {
        const insights = await dataIntegrationService.getCalendarInsights();
        setCalendarInsights(insights);
      } catch (error) {
        console.error('Error loading calendar data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCalendarData();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vesi-deep"></div>
        </div>
      </div>
    );
  }

  if (!calendarInsights) {
    return (
      <div className="card">
        <div className="text-center p-8">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Calendar Data</h3>
          <p className="text-gray-600">Connect Google Calendar to see insights and suggestions</p>
        </div>
      </div>
    );
  }

  const { upcomingEvents, spiritualTimeBlocks, busyTimes, goalSuggestions } = calendarInsights;

  return (
    <div className="space-y-6">
      {/* Calendar Overview */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Calendar className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Calendar Insights</h3>
            <p className="text-sm text-gray-600">Based on your Google Calendar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{upcomingEvents?.length || 0}</div>
            <div className="text-sm text-gray-600">Upcoming Events</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{spiritualTimeBlocks?.length || 0}</div>
            <div className="text-sm text-gray-600">Spiritual Activities</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{busyTimes?.length || 0}</div>
            <div className="text-sm text-gray-600">Today's Commitments</div>
          </div>
        </div>
      </div>

      {/* Spiritual Time Blocks */}
      {spiritualTimeBlocks?.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Star className="h-5 w-5 text-green-500 mr-2" />
            Spiritual Activities
          </h3>
          <div className="space-y-3">
            {spiritualTimeBlocks.slice(0, 5).map((event, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{event.summary}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(event.start.dateTime || event.start.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {event.location && (
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.location}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goal Suggestions */}
      {goalSuggestions?.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="h-5 w-5 text-vesi-deep mr-2" />
            Suggested Goals
          </h3>
          <div className="space-y-3">
            {goalSuggestions.map((goal, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-vesi-light rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-vesi-deep" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{goal.title}</h4>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {goal.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {goal.frequency}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onAddGoal(goal)}
                  className="flex items-center space-x-1 px-3 py-1 bg-vesi-deep text-white rounded-lg hover:bg-vesi-blue transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  <span className="text-sm">Add Goal</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Busy Times Alert */}
      {busyTimes?.length > 8 && (
        <div className="card bg-orange-50 border-orange-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-900">Busy Schedule Alert</h3>
              <p className="text-sm text-orange-700">
                You have {busyTimes.length} commitments today. Consider scheduling some quiet time for reflection.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarInsights;
