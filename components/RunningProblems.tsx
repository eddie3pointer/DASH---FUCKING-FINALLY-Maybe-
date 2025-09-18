import { motion } from 'motion/react';
import { Zap, Users, Smartphone } from 'lucide-react';
import { WaitlistStats } from './WaitlistStats';
import { TestimonialPreview } from './TestimonialPreview';
// Use the deployed logo asset
const dashLogo = "/dash-logo.png";

export function RunningProblems() {
  return (
    <div className="space-y-16">
      {/* Dash Solution */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-gradient-to-br from-yellow-900/40 to-yellow-600/20 rounded-2xl p-8 border border-yellow-400/30">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 mr-4 rounded-2xl p-3 shadow-lg">
              <img 
                src={dashLogo}
                alt="Dash Logo" 
                className="w-full h-full object-contain"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
              />
            </div>
            <div>
              <h2 className="text-3xl text-white mb-2">The Future of Running is Here</h2>
              <p className="text-yellow-400 text-lg">A Next-generation racing platform that puts you first</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-white">Instant Access</div>
              <div className="text-gray-400 text-sm">We break barriers by curating more events - making it easier than ever to join races</div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-white">Global Community</div>
              <div className="text-gray-400 text-sm">The ultimate hub for run clubs, brands & personal experiences</div>
            </div>
            <div className="text-center">
              <Smartphone className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-white">Real-Time Racing</div>
              <div className="text-gray-400 text-sm">Live competition anywhere allowing you to instantly engage within our community</div>
            </div>
          </div>
          
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            We're building the next-generation racing platform that brings real-time competition to your phone. 
            Race on your terms, join global leaderboards, and connect with runners worldwide—no lotteries, no gatekeeping, 
            just pure running excitement.
          </p>
        </div>
      </motion.div>

      {/* Testimonial Preview */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <TestimonialPreview />
      </motion.div>

      {/* Waitlist Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <WaitlistStats />
      </motion.div>
    </div>
  );
}