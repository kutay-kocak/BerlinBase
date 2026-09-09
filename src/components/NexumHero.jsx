import React, { useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { NoiseBackground } from './ui/noise-background';
import { BerTicketHouseBadge, TechnoQuadrigaBadge } from './HeroIntentBadges';

export default function NexumHero({ onSelectIntent }) {
  // Scenic view of Berlin TV Tower loop
  const videoSrc = '/berlin-night.mp4';
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const heroElement = heroRef.current;
    if (!videoElement || !heroElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Kadraja girdiğinde oynat
            if (videoElement.paused) {
              videoElement.play().catch(() => {});
            }
          } else {
            // Kadrajdan tamamen çıktığında duraklat (GPU/CPU tasarrufu)
            if (!videoElement.paused) {
              videoElement.pause();
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(heroElement);
    return () => {
      observer.disconnect();
    };
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
    <section ref={heroRef} className="relative min-h-[calc(100vh-112px)] w-full overflow-hidden flex flex-col justify-center items-center bg-[#0B0C12] text-white py-12 px-4 sm:px-6">
      {/* Background Full-Bleed Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover object-[50%_30%] brightness-[1.20] contrast-[1.10]"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Dark Cinematic Vignette & Gradient Overlays - Tuned to let TV Tower shine */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C12] via-black/20 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-[#0B0C12] pointer-events-none" />
      </div>

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">

        {/* Section Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl drop-shadow-2xl">
          What Brings You <span className="text-bvg-yellow">to Berlin?</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mt-3 drop-shadow">
          Compare real rent prices, find your neighborhood, and explore city life.
        </p>

        {/* 2 Aceternity-Style Noise Background Destination Cards - Moving Soon & Visiting */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl mt-6">
          
          {/* Card 1: Moving Soon / Relocation (BVG Yellow / Amber Dynamic Gradient) */}
          <NoiseBackground
            gradientColors={[
              "rgb(240, 215, 34)",
              "rgb(245, 158, 11)",
              "rgb(227, 6, 19)"
            ]}
            containerClassName="hover:-translate-y-1 hover:shadow-2xl hover:shadow-bvg-yellow/15 transition-all duration-300"
            className="p-5 sm:p-6 text-left cursor-pointer"
          >
            <button
              onClick={() => handleScrollTo('best-neighborhood')}
              className="w-full text-left flex flex-col justify-between h-full space-y-3 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <BerTicketHouseBadge className="w-14 h-14" />
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-bvg-yellow/20 text-bvg-yellow border border-bvg-yellow/40">
                  Moving Soon
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-bvg-yellow transition-colors">
                  I'm planning to move to Berlin
                </h3>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  Take the neighborhood finder quiz, compare rents, and simulate living expenses.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-bvg-yellow pt-1">
                <span>Find my neighborhood</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </button>
          </NoiseBackground>

          {/* Card 2: Visiting & Vibe / Tourist (Cyan / Indigo Dynamic Gradient) */}
          <NoiseBackground
            gradientColors={[
              "rgb(34, 211, 238)",
              "rgb(99, 102, 241)",
              "rgb(240, 215, 34)"
            ]}
            containerClassName="hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/15 transition-all duration-300"
            className="p-5 sm:p-6 text-left cursor-pointer"
          >
            <button
              onClick={() => handleScrollTo('activities')}
              className="w-full text-left flex flex-col justify-between h-full space-y-3 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <TechnoQuadrigaBadge className="w-14 h-14" />
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Visiting & Vibe
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  I'm visiting or exploring Berlin
                </h3>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  Discover Sunday flea markets, swimming lakes, and essential nightlife tips.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-cyan-300 pt-1">
                <span>Explore activities</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </button>
          </NoiseBackground>

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
