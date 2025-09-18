import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

export function TestimonialPreview() {
  const testimonials = [
    {
      quote: "Finally, someone gets it. Running shouldn't cost a mortgage payment.",
      author: "Sarah M.",
      type: "Marathon Runner",
      location: "Portland, OR"
    },
    {
      quote: "I'm tired of lottery systems. Just let me run and celebrate with my community.",
      author: "Miguel R.",
      type: "Weekend Warrior",
      location: "Austin, TX"
    },
    {
      quote: "The running world has become so exclusive. We need something for everyone.",
      author: "Jen K.",
      type: "New Runner",
      location: "Denver, CO"
    }
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="text-center mb-8">
        <h3 className="text-white text-2xl mb-4">Runners Are Ready for Change</h3>
        <p className="text-gray-400">
          Here's what runners are saying about the current state of the sport
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Quote className="w-8 h-8 text-yellow-400 mb-4 opacity-60" />
            
            <p className="text-gray-300 mb-4 italic">
              "{testimonial.quote}"
            </p>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-black text-sm">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-white text-sm">{testimonial.author}</div>
                <div className="text-gray-500 text-xs">{testimonial.type} • {testimonial.location}</div>
              </div>
            </div>

            {/* Star rating */}
            <div className="flex mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <div className="bg-yellow-400/10 rounded-lg p-4 border border-yellow-400/20 inline-block">
          <p className="text-yellow-400 text-sm">
            <strong>Join 1,200+ runners</strong> who believe running should be better
          </p>
        </div>
      </div>
    </motion.div>
  );
}