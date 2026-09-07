import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { BBLogo } from './BBLogo';
import ThemeToggle from './ThemeToggle';

export default function NexumHero({ onSelectIntent }) {
  const [videoSrc, setVideoSrc] = useState('/berlin-midday-2.mp4');
  const [isDimmed, setIsDimmed] = useState(true);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      const nightVids = ['/berlin-night.mp4', '/berlin-night-2.mp4'];
      const chosen = nightVids[Math.floor(Math.random() * nightVids.length)];
      setVideoSrc(chosen);
      setIsDimmed(false);
    } else {
      const dayVids = ['/berlin-midday.mp4', '/berlin-midday-2.mp4'];
      const chosen = dayVids[Math.floor(Math.random() * dayVids.length)];
      setVideoSrc(chosen);
      setIsDimmed(chosen === '/berlin-midday-2.mp4');
    }
  }, []);

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
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between bg-[#0B0C12] text-white">
      {/* Background Full-Bleed Video */}
      <div className="absolute inset-0 z-0">
        <video
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            isDimmed ? 'brightness-[0.72] contrast-[1.12]' : 'brightness-[0.85]'
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Dark Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C12] via-black/40 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-black/80 pointer-events-none" />
      </div>

      {/* Glassmorphism Floating Top Navigation */}
      <header className="relative z-20 w-full px-4 sm:px-8 pt-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-white/[0.04] border border-white/10 rounded-2xl px-4 sm:px-6 py-3 shadow-2xl">
          {/* Official BB Logo #31 */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-1 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <BBLogo className="w-full h-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">Berlin<span className="text-bvg-yellow">Base</span></span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-bvg-yellow/20 text-bvg-yellow border border-bvg-yellow/30">
                  Berlin 2026
                </span>
              </div>
              <p className="text-[11px] text-gray-400 hidden sm:block">City Guide, Districts & Expat Landing</p>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <a
              href="https://allaboutberlin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-300 hover:text-white border border-white/15 hover:border-white/40 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm transition-all flex items-center space-x-1.5"
            >
              <span className="hidden sm:inline">Legal Processes (AAB)</span>
              <span className="sm:hidden">AAB</span>
            </a>
          </div>
        </div>
      </header>

      {/* Center / Bottom-Anchored Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full text-center pb-12 sm:pb-16 flex flex-col items-center">
        {/* Sub-badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-bvg-yellow text-xs font-semibold mb-4 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-bvg-yellow" />
          <span>Interactive City Discovery & District Matcher</span>
        </div>

        {/* Section Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl drop-shadow-lg">
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
            className="group relative overflow-hidden text-left p-6 rounded-2xl border border-white/15 hover:border-bvg-yellow bg-[#12131C]/80 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-bvg-yellow/10"
          >
            {/* Ambient Noise Overlay */}
            <div 
              className="absolute inset-0 opacity-20 group-hover:opacity-30 pointer-events-none transition-opacity mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
            {/* Accent Glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-bvg-yellow/10 rounded-full blur-2xl group-hover:bg-bvg-yellow/20 transition-all" />

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
            className="group relative overflow-hidden text-left p-6 rounded-2xl border border-white/15 hover:border-cyan-400 bg-[#12131C]/80 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/10"
          >
            {/* Ambient Noise Overlay */}
            <div 
              className="absolute inset-0 opacity-20 group-hover:opacity-30 pointer-events-none transition-opacity mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
            {/* Accent Glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />

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

        {/* Down Indicator */}
        <div className="mt-6 flex flex-col items-center text-gray-400 text-xs animate-bounce opacity-60">
          <span>Scroll down for complete guides</span>
          <ChevronDown className="w-4 h-4 mt-0.5" />
        </div>
      </div>
    </section>
  );
}
