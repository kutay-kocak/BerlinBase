import React, { useState, lazy, Suspense } from 'react';
import { 
  Smartphone, 
  MapPin, 
  Compass, 
  Sparkles, 
  Bot,
  ExternalLink,
  Loader2
} from 'lucide-react';
import BestNeighborhoodQuiz from './components/BestNeighborhoodQuiz';
import UsefulApps from './components/UsefulApps';
import Activities from './components/Activities';
import LivingCostCalculator from './components/LivingCostCalculator';
import FeedbackModal from './components/FeedbackModal';
import NexumHero from './components/NexumHero';
import { BBLogo } from './components/BBLogo';

// Heavy secondary tabs loaded on-demand (Code-Splitting for speed & zero initial lag)
const BerlinDistrictMap = lazy(() => import('./components/BerlinDistrictMap'));
const PowerBIDashboard = lazy(() => import('./components/PowerBIDashboard'));
const AIBerlinBuddy = lazy(() => import('./components/AIBerlinBuddy'));

// Elegant BVG-styled skeleton loader for deferred tab transitions
const TabFallbackLoader = ({ message = 'Loading Berlin module...' }) => (
  <div className="flex flex-col items-center justify-center min-h-[360px] p-12 rounded-2xl bg-[#12131C]/60 border border-white/10 space-y-4">
    <div className="w-12 h-12 rounded-full border-2 border-bvg-yellow/20 border-t-bvg-yellow animate-spin flex items-center justify-center">
      <div className="w-3 h-3 rounded-full bg-bvg-yellow animate-pulse" />
    </div>
    <p className="text-sm font-medium text-gray-300 tracking-wide">{message}</p>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');

  // Streamlined tabs
  const tabs = [
    { id: 'explore', label: 'Explore & Vibe', icon: Compass, badge: 'Main' },
    { id: 'apps', label: 'Apps & Life Hacks', icon: Smartphone },
    { id: 'map', label: 'Map & Price Analytics', icon: MapPin },
    { id: 'buddy', label: 'AI Travel Planner', icon: Bot, badge: 'Gemini' },
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
    <div className="min-h-screen bg-[#0B0C12] text-[#F8F9FA] flex flex-col font-sans selection:bg-bvg-yellow selection:text-bvg-dark scroll-smooth">
      
      {/* 1. TOP BRAND & TAB HEADER (EN ÜST KISIM) */}
      <header className="border-b border-white/10 bg-[#0E0F17]/95 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Official BB Logo #31 Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 p-1.5 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-md">
              <BBLogo className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-2xl tracking-tight text-white">Berlin<span className="text-bvg-yellow">Base</span></span>
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">Real Data for Berlin Housing &amp; Living</p>
            </div>
          </div>

          {/* Header Quick Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">

            {/* All About Berlin with Helpful & Detailed Blog label */}
            <div className="flex items-center space-x-1.5">
              <span className="text-[11px] text-gray-400 hidden lg:inline font-medium">Helpful & Detailed Blog:</span>
              <a 
                href="https://allaboutberlin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-gray-300 hover:text-bvg-yellow transition-colors border border-white/10 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/5 hover:border-bvg-yellow/40 hover:bg-white/10"
                title="Official German relocation bureaucracy and legal guides"
              >
                <span className="hidden sm:inline">All About Berlin</span>
                <span className="sm:hidden">AAB</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto no-scrollbar pb-1 pt-1 border-t border-white/5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 min-h-[40px] cursor-pointer ${
                  isActive
                    ? 'bg-bvg-yellow text-bvg-dark font-bold shadow-md shadow-bvg-yellow/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-bvg-dark' : 'text-bvg-yellow'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive ? 'bg-bvg-dark text-bvg-yellow' : 'bg-white/10 text-gray-300'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </header>

      {/* 2. CINEMATIC VIDEO HERO (ANIMASYON) - Yalnızca Explore sekmesinde aktif */}
      {activeTab === 'explore' && (
        <NexumHero onSelectIntent={handleHeroIntent} />
      )}

      {/* 3. MAIN CONTENT AREA (ANIMASYONUN HEMEN ALTI DİREKT BEST NEIGHBORHOOD İLE BAŞLAR) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8 space-y-12">
        
        {/* TAB 1: EXPLORE & VIBE */}
        {activeTab === 'explore' && (
          <div className="space-y-16">
            
            {/* 1. Best Neighborhood Section */}
            <section id="best-neighborhood" className="scroll-mt-24 space-y-8">
              <div className="border-b border-white/10 pb-4">
                <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-bvg-yellow bg-bvg-yellow/10 px-3 py-1 rounded-full border border-bvg-yellow/20 mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Interactive Neighborhood Matching</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Best Neighborhood For You
                </h2>
                <p className="text-sm text-gray-300 mt-1">
                  Answer 5 quick lifestyle questions to discover your ideal Berlin district match and calculate your realistic monthly living budget.
                </p>
              </div>

              {/* Quiz Wizard */}
              <BestNeighborhoodQuiz onNavigateToDistrict={() => setActiveTab('map')} />

              {/* Living Cost Calculator */}
              <LivingCostCalculator />
            </section>

            {/* 2. Activities & Flea Markets Section */}
            <section id="activities" className="scroll-mt-24 space-y-6 pt-6 border-t border-white/10">
              <div className="pb-2">
                <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Culture, Lakes & Markets</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Explore Berlin Activities & Life
                </h2>
                <p className="text-sm text-gray-300 mt-1">
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
            <Suspense fallback={<TabFallbackLoader message="Rendering interactive Berlin district map & metrics..." />}>
              {/* Interactive Leaflet Map Component with real PostgreSQL metric layers */}
              <BerlinDistrictMap />

              {/* Embedded Interactive 4-Page Power BI Dashboard Hub */}
              <PowerBIDashboard />
            </Suspense>
          </section>
        )}

        {/* TAB 4: AI BERLIN BUDDY */}
        {activeTab === 'buddy' && (
          <section className="space-y-6">
            <Suspense fallback={<TabFallbackLoader message="Initializing AI Berlin Travel & Relocation Buddy..." />}>
              <AIBerlinBuddy />
            </Suspense>
          </section>
        )}
      </main>

      {/* Mobile App Bottom Navigation Bar (Option 1-A) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0F17]/95 backdrop-blur-xl border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 min-w-[64px] min-h-[48px] ${
                isActive
                  ? 'text-bvg-yellow font-bold bg-white/5'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 transition-transform ${isActive ? 'scale-110 text-bvg-yellow' : ''}`} />
              <span className="text-[10px] tracking-tight">{tab.id === 'explore' ? 'Explore' : tab.id === 'apps' ? 'Apps' : tab.id === 'map' ? 'Map' : 'AI Planner'}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0E0F17] py-6 pb-20 md:pb-6 text-center text-xs text-gray-500">
        <p>© 2026 BerlinBase. Non-commercial, data-driven Berlin relocation & discovery guide. Follows zero-PII GDPR standards.</p>
      </footer>

      {/* Floating Center Feedback Modal */}
      <FeedbackModal />

    </div>
  );
}
