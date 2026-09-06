import React, { useState } from 'react';
import { 
  Home, 
  Smartphone, 
  MapPin, 
  Compass, 
  Sparkles, 
  Bot,
  ExternalLink,
  ChevronRight,
  Info,
  ShieldAlert,
  ArrowUpRight
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
import CinematicPortal from './components/CinematicPortal';


export default function App() {
  const [activeTab, setActiveTab] = useState('housing');

  const tabs = [
    { id: 'housing', label: 'Housing Guide', icon: Home, badge: 'Crucial' },
    { id: 'apps', label: 'Apps & Life Hacks', icon: Smartphone },
    { id: 'map', label: 'Map & Price Analytics', icon: MapPin },
    { id: 'quiz', label: 'Best Neighborhood', icon: Compass, highlight: true },
    { id: 'activities', label: 'Activities & Flea Mkts', icon: Sparkles },
    { id: 'buddy', label: 'AI Berlin Buddy', icon: Bot, badge: 'Gemini' },
  ];

  // User intent quick jumping & dynamic mode
  const handleIntentSelect = (tabId, targetElementId) => {
    setActiveTab(tabId);
    setTimeout(() => {
      if (targetElementId) {
        const el = document.getElementById(targetElementId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F9] dark:bg-bvg-dark text-gray-900 dark:text-bvg-light flex flex-col font-sans transition-colors duration-300 selection:bg-bvg-yellow selection:text-bvg-dark">
      {/* Top Brand Notification Bar */}
      <header className="border-b border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#15151D]/90 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('housing')}>
            <div className="w-10 h-10 rounded-xl bg-bvg-yellow flex items-center justify-center text-bvg-dark shadow-lg shadow-bvg-yellow/10 font-bold text-xl tracking-tighter">
              BB
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">Berlin<span className="text-bvg-yellow">Base</span></span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-bvg-yellow/10 text-yellow-800 dark:text-bvg-yellow border border-bvg-yellow/30">Berlin MVP</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Your Data-Driven Landing Hub in Berlin</p>
            </div>
          </div>


          {/* Header Quick Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Dark/Light Switch Toggle */}
            <ThemeToggle />

            <button
              onClick={() => setActiveTab('quiz')}
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
            >
              <span className="hidden sm:inline">All About Berlin</span>
              <span className="sm:hidden">AAB</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 6 Tabs Navigation */}
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Content Dispatcher */}
        {activeTab === 'housing' && (
          <section className="space-y-8">
            {/* 3D Floral Gateway to Berlin TV Tower Drone Feed */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-300 dark:border-white/10">
              <CinematicPortal />
            </div>

            {/* Dynamic Who-Are-You / Welcome Intent Selector (Direct Landing Screen) */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-[#21222C] dark:to-[#191924] border border-amber-200 dark:border-bvg-yellow/20 rounded-2xl p-5 sm:p-6 shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-bvg-yellow bg-amber-200/50 dark:bg-bvg-yellow/10 px-2.5 py-1 rounded-full border border-amber-300 dark:border-bvg-yellow/20">
                    Welcome to BerlinBase
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-2">
                    What brings you to Berlin today?
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Select your situation to instantly highlight the exact tools and guide you need:
                  </p>
                </div>
              </div>

              {/* 3 Intent Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Intent 1: Tourist / Short Visit */}
                <button
                  onClick={() => handleIntentSelect('activities')}
                  className="group text-left p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-bvg-gray/60 hover:border-bvg-yellow hover:shadow-lg dark:hover:shadow-bvg-yellow/5 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🎒</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      Visiting / Tourist
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-bvg-yellow transition-colors">
                    I'm visiting or exploring Berlin
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    Discover flea markets (Mauerpark, RAW), swimming lakes, and essential Berlin life hacks.
                  </p>
                  <div className="mt-3 flex items-center text-xs font-semibold text-amber-700 dark:text-bvg-yellow">
                    <span>Explore activities</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </button>

                {/* Intent 2: Planning Relocation */}
                <button
                  onClick={() => handleIntentSelect('quiz')}
                  className="group text-left p-4 rounded-xl border-2 border-bvg-yellow/60 bg-white dark:bg-bvg-gray/80 hover:border-bvg-yellow hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">✈️</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-bvg-yellow/20 text-amber-900 dark:text-bvg-yellow border border-amber-300 dark:border-bvg-yellow/40">
                      Moving Soon
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-bvg-yellow transition-colors">
                    I'm planning to move to Berlin
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    Find your best neighborhood match and simulate your realistic monthly expenses with DB ticket.
                  </p>
                  <div className="mt-3 flex items-center text-xs font-semibold text-amber-700 dark:text-bvg-yellow">
                    <span>Take quiz & budget</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </button>

                {/* Intent 3: Just Arrived / New in Town */}
                <button
                  onClick={() => handleIntentSelect('housing', 'housing-reality-grid')}
                  className="group text-left p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-bvg-gray/60 hover:border-bvg-yellow hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🔑</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Just Arrived
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-bvg-yellow transition-colors">
                    I just arrived & need orientation
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    Learn Anmeldung registration, tenant dossier checklist (SCHUFA), and avoid rental scams.
                  </p>
                  <div className="mt-3 flex items-center text-xs font-semibold text-amber-700 dark:text-bvg-yellow">
                    <span>Start housing guide</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            {/* Housing Guide Overview Header */}
            <div className="bg-white dark:bg-gradient-to-r dark:from-bvg-gray/80 dark:to-[#1e1f29] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-md dark:shadow-xl transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <span className="p-2 rounded-lg bg-bvg-yellow/10 text-yellow-700 dark:text-bvg-yellow border border-bvg-yellow/30">
                  <Home className="w-5 h-5" />
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Berlin Relocation: Housing & Rental Guide</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm max-w-2xl leading-relaxed">
                Your data-driven guide for relocation to Berlin: master the apartment hunt, navigate the housing crisis, understand Anmeldung bureaucracy, compare Kaltmiete vs. Warmmiete, and calculate living costs.
              </p>
            </div>

            {/* Quick Overview Grid */}
            <div id="housing-reality-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-bvg-gray/70 border border-gray-200 dark:border-white/10 rounded-xl p-5 hover:border-bvg-yellow/60 transition-metro shadow-sm">
                <span className="text-xs font-semibold uppercase text-amber-700 dark:text-bvg-yellow block mb-1">Pillar 1</span>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">The Housing Reality</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">Extreme supply shortage, fast-closing listings, and realistic timing expectations.</p>
              </div>
              <div className="bg-white dark:bg-bvg-gray/70 border border-gray-200 dark:border-white/10 rounded-xl p-5 hover:border-bvg-yellow/60 transition-metro shadow-sm">
                <span className="text-xs font-semibold uppercase text-amber-700 dark:text-bvg-yellow block mb-1">Pillar 2</span>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">Anmeldung Golden Key</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">Why registration unlocks your tax ID, bank account, and health insurance.</p>
              </div>
              <div className="bg-white dark:bg-bvg-gray/70 border border-gray-200 dark:border-white/10 rounded-xl p-5 hover:border-bvg-yellow/60 transition-metro shadow-sm">
                <span className="text-xs font-semibold uppercase text-amber-700 dark:text-bvg-yellow block mb-1">Pillar 3</span>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">Rental Contracts</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">Kaltmiete vs. Warmmiete, Indexmiete, Staffelmiete, and legal rent brakes.</p>
              </div>
              <div className="bg-white dark:bg-bvg-gray/70 border border-gray-200 dark:border-white/10 rounded-xl p-5 hover:border-bvg-yellow/60 transition-metro shadow-sm">
                <span className="text-xs font-semibold uppercase text-amber-700 dark:text-bvg-yellow block mb-1">Pillar 4</span>
                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">The Tenant Dossier</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">SCHUFA, Gehaltsnachweise, Mietschuldenfreiheit, and cover letter mastery.</p>
              </div>
            </div>

            {/* Scam Alert Banner */}
            <div className="bg-red-100 dark:bg-red-950/30 border border-red-300 dark:border-red-500/30 rounded-xl p-4 flex items-start space-x-3 text-red-900 dark:text-red-200">
              <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-red-800 dark:text-red-300">Strict Scam Prevention Alert</h4>
                <p className="text-xs mt-1 text-red-700 dark:text-red-200/80 leading-relaxed">
                  Never wire deposit money or rent in advance without viewing the apartment and receiving keys. Beware of landlords claiming to be abroad using fake AirBnB or courier services.
                </p>
              </div>
            </div>
          </section>
        )}


        {activeTab === 'apps' && (
          <section className="space-y-4">
            <UsefulApps />
          </section>
        )}

        {activeTab === 'map' && (
          <section className="space-y-8">
            {/* Interactive Leaflet Map Component with real PostgreSQL metric layers */}
            <BerlinDistrictMap />

            {/* Embedded Interactive 4-Page Power BI Dashboard Hub */}
            <PowerBIDashboard />
          </section>
        )}

        {activeTab === 'quiz' && (
          <section className="space-y-8">
            <BestNeighborhoodQuiz onNavigateToDistrict={() => setActiveTab('map')} />

            {/* Personalized Berlin Living Cost & Savings Calculator */}
            <LivingCostCalculator />
          </section>
        )}

        {activeTab === 'activities' && (
          <section className="space-y-4">
            <Activities />
          </section>
        )}

        {activeTab === 'buddy' && (
          <section className="space-y-6">
            <AIBerlinBuddy />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#121218] py-6 text-center text-xs text-gray-500 transition-colors duration-300">
        <p>© 2026 BerlinBase. Non-commercial, data-driven Berlin relocation guide. Follows zero-PII GDPR standards.</p>
      </footer>

      {/* Floating Center Feedback Modal */}
      <FeedbackModal />

    </div>
  );
}
