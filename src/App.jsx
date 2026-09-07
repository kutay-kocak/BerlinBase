import React, { useState } from 'react';
import { 
  Smartphone, 
  MapPin, 
  Compass, 
  Sparkles, 
  Bot,
  ExternalLink
} from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import PowerBIDashboard from './components/PowerBIDashboard';
import BerlinDistrictMap from './components/BerlinDistrictMap';
import BestNeighborhoodQuiz from './components/BestNeighborhoodQuiz';
import AIBerlinBuddy from './components/AIBerlinBuddy';
import UsefulApps from './components/UsefulApps';
import Activities from './components/Activities';
import LivingCostCalculator from './components/LivingCostCalculator';
import FeedbackModal from './components/FeedbackModal';
import NexumHero from './components/NexumHero';
import { BBLogo } from './components/BBLogo';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');

  // Streamlined tabs: Explore, Apps, Map Analytics, AI Buddy
  const tabs = [
    { id: 'explore', label: 'Explore & Vibe', icon: Compass, badge: 'Main' },
    { id: 'apps', label: 'Apps & Life Hacks', icon: Smartphone },
    { id: 'map', label: 'Map & Price Analytics', icon: MapPin },
    { id: 'buddy', label: 'AI Berlin Buddy', icon: Bot, badge: 'Gemini' },
  ];

  // Smooth scroll handler for hero intent cards
  const handleHeroIntent = (targetId) => {
    setActiveTab('explore');
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F9] dark:bg-bvg-dark text-gray-900 dark:text-bvg-light flex flex-col font-sans transition-colors duration-300 selection:bg-bvg-yellow selection:text-bvg-dark scroll-smooth">
      
      {/* Full-Screen Nexum Cinematic Video Hero */}
      <NexumHero onSelectIntent={handleHeroIntent} />

      {/* Sticky Secondary Navigation Bar */}
      <header className="border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#15151D]/90 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Official BB Logo #31 Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 rounded-xl bg-bvg-dark dark:bg-white/10 border border-black/10 dark:border-white/20 p-1 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-sm">
              <BBLogo className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">Berlin<span className="text-bvg-yellow">Base</span></span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-bvg-yellow/10 text-yellow-800 dark:text-bvg-yellow border border-bvg-yellow/30">Berlin 2026</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Explore, Settle & Live in Berlin</p>
            </div>
          </div>

          {/* Header Quick Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <ThemeToggle />

            <button
              onClick={() => handleHeroIntent('best-neighborhood')}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-bvg-dark bg-bvg-yellow hover:bg-yellow-400 transition-colors px-2.5 sm:px-3 py-1.5 rounded-lg shadow-sm"
              title="Find your best Berlin neighborhood"
            >
              <Compass className="w-3.5 h-3.5 text-bvg-dark" />
              <span className="hidden sm:inline">Best Neighborhood</span>
              <span className="sm:hidden">Quiz</span>
            </button>
            <a 
              href="https://allaboutberlin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 hover:text-bvg-yellow transition-colors border border-gray-300 dark:border-white/10 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-bvg-gray/50 hover:border-bvg-yellow/40"
              title="Official German relocation bureaucracy and legal guides"
            >
              <span className="hidden sm:inline">All About Berlin</span>
              <span className="sm:hidden">AAB</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto no-scrollbar pb-1 pt-1 border-t border-gray-200 dark:border-white/5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 min-h-[44px] ${
                  isActive
                    ? 'bg-bvg-yellow text-bvg-dark font-bold shadow-md shadow-bvg-yellow/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-bvg-gray/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-bvg-dark' : 'text-bvg-yellow'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive ? 'bg-bvg-dark text-bvg-yellow' : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* TAB 1: EXPLORE & VIBE (Best Neighborhood + Activities Sequential Scroll) */}
        {activeTab === 'explore' && (
          <div className="space-y-16">
            
            {/* 1. Best Neighborhood Section */}
            <section id="best-neighborhood" className="scroll-mt-24 space-y-8">
              <div className="border-b border-gray-200 dark:border-white/10 pb-4">
                <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-bvg-yellow bg-bvg-yellow/10 px-3 py-1 rounded-full border border-bvg-yellow/20 mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Interactive Neighborhood Matching</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  Best Neighborhood For You
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Answer 5 quick lifestyle questions to discover your ideal Berlin district match and calculate your realistic monthly living budget.
                </p>
              </div>

              {/* Quiz Wizard */}
              <BestNeighborhoodQuiz onNavigateToDistrict={() => setActiveTab('map')} />

              {/* Living Cost Calculator */}
              <LivingCostCalculator />
            </section>

            {/* 2. Activities & Flea Markets Section */}
            <section id="activities" className="scroll-mt-24 space-y-6 pt-6 border-t border-gray-200 dark:border-white/10">
              <div className="pb-2">
                <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Culture, Lakes & Markets</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                  Explore Berlin Activities & Life
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  From iconic Mauerpark Sunday karaoke to swimming in Schlachtensee and discovering secret flea markets.
                </p>
              </div>

              {/* Activities Component */}
              <Activities />
            </section>
          </div>
        )}

        {/* TAB 2: APPS & LIFE HACKS */}
        {activeTab === 'apps' && (
          <section className="space-y-4">
            <UsefulApps />
          </section>
        )}

        {/* TAB 3: MAP & PRICE ANALYTICS */}
        {activeTab === 'map' && (
          <section className="space-y-8">
            {/* Interactive Leaflet Map Component with real PostgreSQL metric layers */}
            <BerlinDistrictMap />

            {/* Embedded Interactive 4-Page Power BI Dashboard Hub */}
            <PowerBIDashboard />
          </section>
        )}

        {/* TAB 4: AI BERLIN BUDDY */}
        {activeTab === 'buddy' && (
          <section className="space-y-6">
            <AIBerlinBuddy />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#121218] py-6 text-center text-xs text-gray-500 transition-colors duration-300">
        <p>© 2026 BerlinBase. Non-commercial, data-driven Berlin relocation & discovery guide. Follows zero-PII GDPR standards.</p>
      </footer>

      {/* Floating Center Feedback Modal */}
      <FeedbackModal />

    </div>
  );
}
