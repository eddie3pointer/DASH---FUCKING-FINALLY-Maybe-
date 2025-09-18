import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, TrendingUp, Download, BarChart3, Globe, Clock } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { GoogleSheetsExport } from './GoogleSheetsExport';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSignups: 0,
    todaySignups: 0,
    countries: 0,
    growthRate: 0,
    lastHourActivity: 0
  });
  
  const [recentSignups, setRecentSignups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-39c15382/waitlist/stats`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Fetch recent signups
      const exportsResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-39c15382/waitlist/export`, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` }
      });
      
      if (exportsResponse.ok) {
        const exportsData = await exportsResponse.json();
        // Get most recent 10 signups
        const recent = exportsData.signups
          .sort((a: any, b: any) => new Date(b.signupDate).getTime() - new Date(a.signupDate).getTime())
          .slice(0, 10);
        setRecentSignups(recent);
      }

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-yellow-400">Loading dashboard...</div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Signups',
      value: stats.totalSignups.toLocaleString(),
      icon: <Users className="w-6 h-6" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/20'
    },
    {
      title: 'Today\'s Signups',
      value: stats.todaySignups,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/20'
    },
    {
      title: 'Countries',
      value: stats.countries,
      icon: <Globe className="w-6 h-6" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/20'
    },
    {
      title: 'Growth Rate',
      value: `+${stats.growthRate}%`,
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/20'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">Dash Waitlist Dashboard</h1>
          <p className="text-gray-400">Real-time analytics for your running revolution</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              className={`${stat.bgColor} rounded-xl p-6 border ${stat.borderColor}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={stat.color}>
                  {stat.icon}
                </div>
                <div className={`${stat.color} text-2xl font-bold`}>
                  {stat.value}
                </div>
              </div>
              <div className="text-gray-300 text-sm font-medium">
                {stat.title}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Signups */}
          <motion.div
            className="bg-gray-900 rounded-xl p-6 border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-yellow-400 mr-2" />
              <h3 className="text-xl font-bold">Recent Signups</h3>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentSignups.map((signup, index) => (
                <div key={signup.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <div className="text-white font-medium">{signup.name}</div>
                    <div className="text-gray-400 text-sm">{signup.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">#{signup.bibNumber}</div>
                    <div className="text-gray-500 text-xs">
                      {new Date(signup.signupDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {recentSignups.length === 0 && (
                <div className="text-gray-500 text-center py-8">
                  No signups yet. Share your waitlist to get started!
                </div>
              )}
            </div>
          </motion.div>

          {/* Google Sheets Export */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <GoogleSheetsExport />
          </motion.div>
        </div>

        {/* Live Activity Indicator */}
        <motion.div
          className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-xl p-6 border border-yellow-400/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-yellow-400 font-medium">
              Live: {stats.lastHourActivity} new signups in the last hour
            </span>
          </div>
        </motion.div>

        {/* Share Links */}
        <motion.div
          className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-xl font-bold mb-4">Share Your Waitlist</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-yellow-400 font-medium mb-2">Landing Page URL</div>
              <div className="text-gray-300 text-sm font-mono bg-gray-900 p-2 rounded">
                {window.location.origin}
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-yellow-400 font-medium mb-2">Social Media Copy</div>
              <div className="text-gray-300 text-sm">
                "🏃‍♂️ The future of running is here. Join the Dash waitlist for real-time racing, fair access, and a global community. No lotteries, no gatekeeping. #{stats.totalSignups.toLocaleString()} runners already signed up!"
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-yellow-400 font-medium mb-2">Quick Stats</div>
              <div className="text-gray-300 text-sm">
                • {stats.totalSignups.toLocaleString()} total signups<br/>
                • {stats.countries} countries represented<br/>
                • {stats.growthRate}% growth this month
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}