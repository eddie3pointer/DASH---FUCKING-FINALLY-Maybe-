import { motion } from 'motion/react';
import { Users, Globe, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function WaitlistStats() {
  const [stats, setStats] = useState({
    totalSignups: 1247,
    todaySignups: 12,
    countries: 14,
    growthRate: 127,
    lastHourActivity: 3
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetch live stats from backend
  const fetchStats = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-39c15382/waitlist/stats`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      if (response.ok) {
        const liveStats = await response.json();
        setStats(liveStats);
      }
    } catch (error) {
      console.log('Error fetching live stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch stats on mount and then periodically
  useEffect(() => {
    fetchStats();
    
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: <Users className="w-6 h-6" />,
      value: stats.totalSignups.toLocaleString(),
      label: "Runners waiting",
      color: "text-yellow-400"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      value: stats.countries,
      label: "Countries represented",
      color: "text-blue-400"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: `+${stats.growthRate}%`,
      label: "Growth this month",
      color: "text-purple-400"
    }
  ];

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-6">
        <h3 className="text-white text-xl mb-2">Join the Movement</h3>
        <p className="text-gray-400 text-sm">
          Runners worldwide are already signed up for early access
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className={`${item.color} flex justify-center mb-2`}>
              {item.icon}
            </div>
            <div className={`${item.color} text-xl mb-1`}>
              {item.value}
            </div>
            <div className="text-gray-500 text-xs">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
        <div className="flex items-center justify-center text-yellow-400 text-sm">
          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
          <span>Live: {stats.lastHourActivity} new signups in the last hour</span>
        </div>
      </div>
    </motion.div>
  );
}