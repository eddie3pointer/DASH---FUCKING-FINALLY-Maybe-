import { motion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';

export function SectionTransition() {
  return (
    <div className="relative py-16 overflow-hidden">
      {/* Gradient transition background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
      
      {/* Animated connecting line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px">
        <motion.div 
          className="h-full bg-gradient-to-b from-yellow-400/80 via-yellow-400/40 to-transparent"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </div>

      {/* Floating elements */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        {/* Scattered sparkle elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + Math.sin(i) * 40}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        ))}
      </motion.div>

      {/* Central content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Connecting text */}
          <div className="mb-8">
            <p className="text-gray-400 text-lg mb-4">
              Ready to discover what makes Dash different?
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                <span>No more lottery systems</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                <span>Fair access for everyone</span>
              </div>
            </div>
          </div>

          {/* Animated arrow */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-yellow-400"
          >
            <ArrowDown className="w-6 h-6 mx-auto" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
}