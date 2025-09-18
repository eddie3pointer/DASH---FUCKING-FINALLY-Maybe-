import { useState, useEffect } from 'react';
import { RunningProblems } from './components/RunningProblems';
import { HeroSection } from './components/HeroSection';
import { SectionTransition } from './components/SectionTransition';
import { AdminDashboard } from './components/AdminDashboard';
// Use the deployed logo asset
const dashLogo = "/dash-logo.png";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  // Check for admin access via URL parameter or key combination
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setShowAdmin(true);
    }

    // Listen for admin key combination (Ctrl+Shift+A)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Show admin dashboard if admin mode is enabled
  if (showAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Enhanced Hero Section */}
      <header>
        <HeroSection />
      </header>

      {/* Smooth Transition */}
      <SectionTransition />

      {/* Main Content */}
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <RunningProblems />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 mr-2">
              <img 
                src={dashLogo}
                alt="Dash Logo" 
                className="w-full h-full object-contain"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
              />
            </div>
            <span className="text-gray-400">© 2025 Dash. Next-generation racing platform.</span>
          </div>
          <p className="text-gray-600 text-sm">
            Join the revolution - real-time racing, global community, fair access for all runners.
          </p>
        </div>
      </footer>
    </div>
  );
}