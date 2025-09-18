import { motion } from 'motion/react';
import { Play, Users, Globe, Zap, ArrowRight, Clock, Trophy, UserCheck } from 'lucide-react';
import { RacingBibForm } from './RacingBibForm';
// Use the deployed logo asset
const dashLogo = "/dash-logo.png";

function CleanFeatureCards() {
  const features = [
    { icon: <Play className="w-5 h-5" />, value: "On-demand racing — compete wherever and whenever you want" },
    { icon: <Trophy className="w-5 h-5" />, value: "Live leaderboards and instant results" },
    { icon: <Users className="w-5 h-5" />, value: "Inclusive global community — no cliques, no hype, just runners" },
    { icon: <UserCheck className="w-5 h-5" />, value: "Single profile for all events — no more re-entering info or payment details" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
          whileHover={{ scale: 1.02, y: -4 }}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="text-yellow-400 p-3 rounded-full bg-yellow-400/10">{feature.icon}</div>
            <div className="text-white text-sm leading-relaxed">{feature.value}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function WaitlistCTA() {
  return (
    <motion.div
      className="mt-16 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.0 }}
    >
      {/* Centered Content */}
      <motion.div 
        className="max-w-2xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.3 }}
      >
        <div className="space-y-6">
          <div className="inline-flex items-center bg-yellow-400/10 rounded-full px-6 py-3 border border-yellow-400/20">
            <Clock className="w-5 h-5 text-yellow-400 mr-3" />
            <span className="text-yellow-400 font-medium">Beta launching March 2026</span>
          </div>
          
          <h3 className="text-4xl md:text-5xl text-white leading-tight">
            The Next Generation of Running
          </h3>
          
          <p className="text-gray-300 text-xl leading-relaxed max-w-xl mx-auto">
            Be among the first to experience real-time racing, global leaderboards, and a truly inclusive running community.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center">
              <Zap className="w-5 h-5 text-yellow-400 mr-3" />
              <span>Early access guaranteed</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-yellow-400 mr-3" />
              <span>Join thousands of runners</span>
            </div>
          </div>
        </div>

        {/* Centered Racing Bib Waitlist Form */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          <RacingBibForm />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-orange-900/10"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255, 193, 7, 0.1) 20px,
              rgba(255, 193, 7, 0.1) 21px
            )`
          }}
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            {/* Logo and Title */}
            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-28 h-28 mr-6 rounded-2xl p-4 shadow-lg">
                <img 
                  src={dashLogo}
                  alt="Dash Logo" 
                  className="w-full h-full object-contain"
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                />
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl text-white font-impact">
                  Dash
                </h1>
              </div>
            </motion.div>

            {/* Main tagline */}
            <motion.div
              className="max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl text-white">
                Welcome to the New Era of Running
              </h2>
            </motion.div>

            {/* Clean feature cards */}
            <CleanFeatureCards />

            {/* Key feature bullets */}
            <motion.div
              className="mt-12 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400">
                <div className="flex items-center">
                  <Play className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>Real-Time Competition</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full hidden md:block"></div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>Instant Race Registration</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full hidden md:block"></div>
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>A Game-Changer for Brands</span>
                </div>
              </div>
            </motion.div>

            {/* Waitlist CTA Section */}
            <WaitlistCTA />
          </div>
        </div>
      </div>
    </div>
  );
}