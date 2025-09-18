import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight, Instagram, MapPin, User, Mail, Phone, Loader2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function RacingBibForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    instagram: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bibNumber, setBibNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-39c15382/waitlist/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          ...formData,
          referralSource: 'landing_page'
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to join waitlist');
      }

      setBibNumber(result.bibNumber);
      setIsSubmitted(true);
      
      // Track successful signup
      console.log('Waitlist signup successful:', result);
      
    } catch (error) {
      console.error('Signup error:', error);
      setError(error instanceof Error ? error.message : 'Failed to join waitlist');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null); // Clear error when user starts typing
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="relative w-full max-w-md mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl p-8 border-4 border-black shadow-2xl">
          {/* Corner holes */}
          <div className="absolute top-4 left-4 w-4 h-4 bg-white rounded-full border-2 border-gray-300"></div>
          <div className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full border-2 border-gray-300"></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 bg-white rounded-full border-2 border-gray-300"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 bg-white rounded-full border-2 border-gray-300"></div>

          <div className="text-center space-y-4">
            <div className="text-black text-xl font-bold">WELCOME TO THE PACK!</div>
            <div className="text-black text-4xl font-black">#{bibNumber || Math.floor(Math.random() * 8999) + 1000}</div>
            <div className="text-black text-lg font-bold">DASH RUNNER</div>
            <div className="text-black text-sm">You're officially on the waitlist!</div>
            <div className="text-black text-xs">Check your email for next steps</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Racing Bib Container */}
      <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl p-1 border-4 border-black shadow-2xl">
        {/* Corner holes */}
        <div className="absolute top-4 left-4 w-4 h-4 bg-white rounded-full border-2 border-gray-300 z-10"></div>
        <div className="absolute top-4 right-4 w-4 h-4 bg-white rounded-full border-2 border-gray-300 z-10"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 bg-white rounded-full border-2 border-gray-300 z-10"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 bg-white rounded-full border-2 border-gray-300 z-10"></div>

        <div className="bg-white rounded-xl p-6 pt-8 pb-8 relative">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-black text-sm font-bold tracking-wider mb-2">
              TRAINING IS HARD, REGISTRATION IS HARDER
            </div>
            <div className="text-black text-6xl font-black tracking-tight mb-2">
              DASH
            </div>
            <div className="text-black text-sm font-bold tracking-wider">
              THE FUTURE OF RACING IS NOW
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1">
              <div className="flex items-center text-black text-xs font-bold tracking-wider">
                <User className="w-3 h-3 mr-1" />
                RUNNER NAME
              </div>
              <div className="border-b-2 border-black pb-1">
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border-none bg-transparent p-0 text-black placeholder:text-gray-600 focus:ring-0 font-mono text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <div className="flex items-center text-black text-xs font-bold tracking-wider">
                <Mail className="w-3 h-3 mr-1" />
                EMAIL ADDRESS
              </div>
              <div className="border-b-2 border-black pb-1">
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-none bg-transparent p-0 text-black placeholder:text-gray-600 focus:ring-0 font-mono text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-1">
              <div className="flex items-center text-black text-xs font-bold tracking-wider">
                <Phone className="w-3 h-3 mr-1" />
                PHONE NUMBER
              </div>
              <div className="border-b-2 border-black pb-1">
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="border-none bg-transparent p-0 text-black placeholder:text-gray-600 focus:ring-0 font-mono text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Location Field */}
            <div className="space-y-1">
              <div className="flex items-center text-black text-xs font-bold tracking-wider">
                <MapPin className="w-3 h-3 mr-1" />
                LOCATION (STATE/COUNTRY)
              </div>
              <div className="border-b-2 border-black pb-1">
                <Input
                  type="text"
                  placeholder="e.g., California, USA"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="border-none bg-transparent p-0 text-black placeholder:text-gray-600 focus:ring-0 font-mono text-sm"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Instagram Field (Optional) */}
            <div className="space-y-1">
              <div className="flex items-center text-black text-xs font-bold tracking-wider">
                <Instagram className="w-3 h-3 mr-1" />
                INSTAGRAM (OPTIONAL - BUILD COMMUNITY!)
              </div>
              <div className="border-b-2 border-gray-400 pb-1">
                <Input
                  type="text"
                  placeholder="@your_username"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  className="border-none bg-transparent p-0 text-black placeholder:text-gray-600 focus:ring-0 font-mono text-sm"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-yellow-400 hover:bg-gray-900 font-bold tracking-wide border-2 border-black hover:border-gray-800 text-sm py-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Joining the pack...
                  </>
                ) : (
                  <>
                    Join the starting line
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            <div className="text-center text-xs text-gray-600 pt-2">
              By joining, you agree to be part of the running revolution
            </div>
          </form>
        </div>
      </div>

      {/* Racing number badge */}
      <div className="absolute -top-2 -right-2 bg-black text-yellow-400 rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm border-3 border-yellow-400">
        #{Math.floor(Math.random() * 999) + 1}
      </div>
    </motion.div>
  );
}