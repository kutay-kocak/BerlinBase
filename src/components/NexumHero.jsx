import React from 'react';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';

export default function NexumHero({ onSelectIntent }) {
  // Scenic view of Berlin TV Tower loop
  const videoSrc = '/berlin-night.mp4';

  const handleScrollTo = (targetId) => {
    if (onSelectIntent) {
      onSelectIntent(targetId);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-112px)] w-full overflow-hidden flex flex-col justify-center items-center bg-[#0B0C12] text-white py-12 px-4 sm:px-6">
      {/* Background Full-Bleed Video */}
      <div className="absolute inset-0 z-0">
        <video
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover brightness-[0.78] contrast-[1.15]"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Dark Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C12] via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-[#0B0C12] pointer-events-none" />
      </div>

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* Sub-badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-bvg-yellow text-xs font-semibold mb-4 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-bvg-yellow" />
          <span>Interactive City Discovery & District Matcher</span>
        </div>

        {/* Section Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl drop-shadow-2xl">
          Best Neighborhood <span className="text-bvg-yellow">For You</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mt-3 drop-shadow">
          Find your ideal Berlin borough, calculate realistic living costs with the DB ticket, or explore vibrant activities, flea markets, and lakes.
        </p>

        {/* 2 Aceternity-Style Noise Background Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl mt-8">
          
          {/* Card 1: Thinking to move / Planning Relocation */}
          <button
            onClick={() => handleScrollTo('best-neighborhood')}
            className="group relative overflow-hidden text-left p-6 rounded-2xl border border-white/15 hover:border-bvg-yellow bg-[#12131C]/85 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-bvg-yellow/10 cursor-pointer"
          >
            {/* Ambient Noise Overlay */}
            <div 
              className="absolute inset-0 opacity-20 group-hover:opacity-30 pointer-events-none transition-opacity mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
            {/* Accent Glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-bvg-yellow/10 rounded-full blur-2xl group-hover:bg-bvg-yellow/25 transition-all" />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl p-2.5 rounded-xl bg-white/10 border border-white/10">✈️</span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-bvg-yellow/15 text-bvg-yellow border border-bvg-yellow/30">
                  Moving Soon
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-bvg-yellow transition-colors">
                  I'm planning to move to Berlin
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Take the neighborhood finder quiz, compare rents, and simulate living expenses with the 2026 DB Deutschlandticket.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-bvg-yellow pt-1">
                <span>Find my neighborhood</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </button>

          {/* Card 2: Visiting / Tourist / Exploring */}
          <button
            onClick={() => handleScrollTo('activities')}
            className="group relative overflow-hidden text-left p-6 rounded-2xl border border-white/15 hover:border-cyan-400 bg-[#12131C]/85 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10 cursor-pointer"
          >
            {/* Ambient Noise Overlay */}
            <div 
              className="absolute inset-0 opacity-20 group-hover:opacity-30 pointer-events-none transition-opacity mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
            {/* Accent Glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-all" />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl p-2.5 rounded-xl bg-white/10 border border-white/10">🎒</span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Visiting & Vibe
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  I'm visiting or exploring Berlin
                </h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  Discover Sunday flea markets (Mauerpark, RAW), swimming lakes (Schlachtensee, Wannsee), and nightlife tips.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-cyan-300 pt-1">
                <span>Explore activities</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </button>

        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={() => handleScrollTo('best-neighborhood')} 
          className="mt-8 flex flex-col items-center text-gray-400 text-xs animate-bounce opacity-75 cursor-pointer hover:text-bvg-yellow transition-colors"
        >
          <span>Scroll down for complete guides</span>
          <ChevronDown className="w-4 h-4 mt-0.5" />
        </div>
      </div>
    </section>
  );
}
