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
import KiezBarometer from './components/KiezBarometer';
import PowerBIDashboard from './components/PowerBIDashboard';
import BerlinDistrictMap from './components/BerlinDistrictMap';
import BestNeighborhoodQuiz from './components/BestNeighborhoodQuiz';
import AIBerlinBuddy from './components/AIBerlinBuddy';
import UsefulApps from './components/UsefulApps';
import Activities from './components/Activities';
import LivingCostCalculator from './components/LivingCostCalculator';


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

  return (
    <div className="min-h-screen bg-bvg-dark text-bvg-light flex flex-col font-sans selection:bg-bvg-yellow selection:text-bvg-dark">
      {/* Top Brand Notification Bar */}
      <header className="border-b border-white/10 bg-[#15151D]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('housing')}>
            <div className="w-10 h-10 rounded-xl bg-bvg-yellow flex items-center justify-center text-bvg-dark shadow-lg shadow-bvg-yellow/10 font-bold text-xl tracking-tighter">
              BB
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">Berlin<span className="text-bvg-yellow">Base</span></span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-bvg-yellow/10 text-bvg-yellow border border-bvg-yellow/20">Berlin MVP</span>
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">Your Data-Driven Landing Hub in Berlin</p>
            </div>
          </div>


          {/* Header Quick Actions */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setActiveTab('quiz')}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-bvg-dark bg-bvg-yellow hover:bg-yellow-400 transition-colors px-3 py-1.5 rounded-lg shadow-sm"
              title="Find your best Berlin neighborhood"
            >
              <Compass className="w-3.5 h-3.5 text-bvg-dark" />
              <span>Best Neighborhood</span>
            </button>
            <a 
              href="https://allaboutberlin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-xs text-gray-400 hover:text-bvg-yellow transition-colors border border-white/10 px-3 py-1.5 rounded-lg bg-bvg-gray/50 hover:border-bvg-yellow/40"
            >
              <span>All About Berlin</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 6 Tabs Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto no-scrollbar pb-1 pt-1 border-t border-white/5">
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
                    : 'text-gray-300 hover:text-white hover:bg-bvg-gray/60'
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Content Dispatcher */}
        {activeTab === 'housing' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-bvg-gray/80 to-[#1e1f29] border border-white/10 rounded-xl p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-2">
                <span className="p-2 rounded-lg bg-bvg-yellow/10 text-bvg-yellow border border-bvg-yellow/20">
                  <Home className="w-5 h-5" />
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-white">Berlin Relocation: Housing & Rental Guide</h1>
              </div>
              <p className="text-gray-300 text-sm max-w-2xl leading-relaxed">
                Your data-driven guide for relocation to Berlin: master the apartment hunt, navigate the housing crisis, understand Anmeldung bureaucracy, compare Kaltmiete vs. Warmmiete, and calculate living costs.
              </p>
            </div>

            {/* Quick Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-bvg-gray/70 border border-white/10 rounded-xl p-5 hover:border-bvg-yellow/40 transition-metro">
                <span className="text-xs font-semibold uppercase text-bvg-yellow block mb-1">Pillar 1</span>
                <h3 className="font-bold text-base text-white mb-2">The Housing Reality</h3>
                <p className="text-xs text-gray-300">Extreme supply shortage, fast-closing listings, and realistic timing expectations.</p>
              </div>
              <div className="bg-bvg-gray/70 border border-white/10 rounded-xl p-5 hover:border-bvg-yellow/40 transition-metro">
                <span className="text-xs font-semibold uppercase text-bvg-yellow block mb-1">Pillar 2</span>
                <h3 className="font-bold text-base text-white mb-2">Anmeldung Golden Key</h3>
                <p className="text-xs text-gray-300">Why registration unlocks your tax ID, bank account, and health insurance.</p>
              </div>
              <div className="bg-bvg-gray/70 border border-white/10 rounded-xl p-5 hover:border-bvg-yellow/40 transition-metro">
                <span className="text-xs font-semibold uppercase text-bvg-yellow block mb-1">Pillar 3</span>
                <h3 className="font-bold text-base text-white mb-2">Rental Contracts</h3>
                <p className="text-xs text-gray-300">Kaltmiete vs. Warmmiete, Indexmiete, Staffelmiete, and legal rent brakes.</p>
              </div>
              <div className="bg-bvg-gray/70 border border-white/10 rounded-xl p-5 hover:border-bvg-yellow/40 transition-metro">
                <span className="text-xs font-semibold uppercase text-bvg-yellow block mb-1">Pillar 4</span>
                <h3 className="font-bold text-base text-white mb-2">The Tenant Dossier</h3>
                <p className="text-xs text-gray-300">SCHUFA, Gehaltsnachweise, Mietschuldenfreiheit, and cover letter mastery.</p>
              </div>
            </div>

            {/* Scam Alert Banner */}
            <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4 flex items-start space-x-3 text-red-200">
              <ShieldAlert className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-red-300">Strict Scam Prevention Alert</h4>
                <p className="text-xs mt-1 text-red-200/80 leading-relaxed">
                  Never wire deposit money or rent in advance without viewing the apartment and receiving keys. Beware of landlords claiming to be abroad using fake AirBnB or courier services.
                </p>
              </div>
            </div>

            {/* Berlin Kiez Barometer (Döner, Späti, Transit) */}
            <KiezBarometer />
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
      <footer className="border-t border-white/10 bg-[#121218] py-6 text-center text-xs text-gray-500">
        <p>© 2026 BerlinBase. Non-commercial, data-driven Berlin relocation guide. Follows zero-PII GDPR standards.</p>
      </footer>

    </div>
  );
}
