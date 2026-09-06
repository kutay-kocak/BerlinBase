import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, ArrowDown } from 'lucide-react';

export default function CinematicPortal({ onEnterComplete }) {
  const [skipIntro, setSkipIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('berlinbase_skip_intro') === 'true';
    }
    return false;
  });

  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [isInside, setIsInside] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState('');
  const [isVideoDimmed, setIsVideoDimmed] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    
    if (isDarkMode) {
      const nightVideos = ['/berlin-night.mp4', '/berlin-night-2.mp4'];
      const chosen = nightVideos[Math.floor(Math.random() * nightVideos.length)];
      setCurrentVideoSrc(chosen);
      setIsVideoDimmed(false);
    } else {
      const dayVideos = ['/berlin-midday.mp4', '/berlin-midday-2.mp4'];
      const chosen = dayVideos[Math.floor(Math.random() * dayVideos.length)];
      setCurrentVideoSrc(chosen);
      // Reduce brightness and glare if midday-2 is picked
      setIsVideoDimmed(chosen === '/berlin-midday-2.mp4');
    }
  }, []);

  const handleToggleSkip = () => {
    const nextVal = !skipIntro;
    setSkipIntro(nextVal);
    localStorage.setItem('berlinbase_skip_intro', String(nextVal));
  };

  useEffect(() => {
    if (skipIntro) {
      setIsDoorOpen(true);
      setIsInside(true);
      if (onEnterComplete) onEnterComplete();
    }
  }, [skipIntro, onEnterComplete]);

  const handleOpenDoor = () => {
    setIsDoorOpen(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    setTimeout(() => {
      setIsInside(true);
      if (onEnterComplete) onEnterComplete();
    }, 1400);
  };

  return (
    <div className="relative w-full overflow-hidden bg-black select-none">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {currentVideoSrc && (
          <video
            ref={videoRef}
            src={currentVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover transition-all duration-1000 ${
              isVideoDimmed 
                ? 'brightness-[0.78] contrast-[1.15] saturate-[0.90]' 
                : 'brightness-[0.92] contrast-[1.05]'
            }`}
          />
        )}
        {/* Subtle Vignette Overlays to frame the TV Tower */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* Top Utility Bar */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 flex items-center justify-between text-xs">
        {/* Skip Intro Switch */}
        <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white/90 shadow-lg">
          <span className="text-[11px] font-medium">Skip Intro</span>
          <label htmlFor="skip-intro-switch" className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="skip-intro-switch"
              role="switch"
              checked={skipIntro}
              onChange={handleToggleSkip}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:bg-bvg-yellow transition-colors duration-200"></div>
            <div className="absolute top-[2px] left-[2px] bg-white peer-checked:bg-bvg-dark w-4 h-4 rounded-full transition-transform duration-200 peer-checked:translate-x-4 shadow-sm"></div>
          </label>
        </div>

        {/* Live Indicator */}
        <div className="hidden sm:flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white/80">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] tracking-wide font-medium">Berlin Skyline Drone Feed</span>
        </div>
      </div>

      {/* 3D Floral Gateway */}
      <AnimatePresence>
        {!isInside && !skipIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.35 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 min-h-[80vh] sm:min-h-[85vh] flex flex-col items-center justify-center px-4 text-center"
            style={{ perspective: 1200 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-bvg-yellow text-bvg-dark font-black text-xs uppercase tracking-widest shadow-md mb-3">
                <Sparkles className="w-3.5 h-3.5 fill-bvg-dark" />
                <span>BerlinBase Portal</span>
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-2xl font-serif">
                Enter the Heart of Berlin
              </h1>
              <p className="text-xs sm:text-sm text-gray-200 mt-2 max-w-lg mx-auto font-medium drop-shadow">
                Click the floral door to step inside and unveil the Fernsehturm skyline.
              </p>
            </motion.div>

            {/* 3D Portal Gateway Frame with Floral Elements */}
            <div 
              onClick={handleOpenDoor}
              className="relative group cursor-pointer w-72 sm:w-80 h-96 sm:h-[410px] rounded-t-[140px] border-4 border-amber-300/80 shadow-[0_0_50px_rgba(240,215,34,0.35)] p-2 bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105"
              style={{ transformStyle: 'preserve-3d' }}
              title="Click to Open Gateway"
            >
              <div className="absolute -top-7 -left-6 -right-6 h-16 pointer-events-none flex justify-between px-2 text-2xl filter drop-shadow">
                <span>🌸</span>
                <span>🌿</span>
                <span>✨</span>
                <span>🌿</span>
                <span>🌸</span>
              </div>

              <div className="relative w-full h-full rounded-t-[130px] overflow-hidden flex shadow-inner bg-gradient-to-b from-amber-900/30 to-black/60 border border-white/20">
                {/* Left Door */}
                <motion.div
                  animate={isDoorOpen ? { rotateY: -95, opacity: 0.15 } : { rotateY: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'left center' }}
                  className="w-1/2 h-full bg-gradient-to-r from-[#2c2419] to-[#453624] border-r border-amber-400/40 p-3 flex flex-col justify-between shadow-2xl relative"
                >
                  <div className="text-xl opacity-70">🌿</div>
                  <div className="text-center">
                    <div className="w-3 h-8 rounded-full border-2 border-amber-400/70 mx-auto" />
                  </div>
                  <div className="text-sm text-amber-200/50 font-serif">BERLIN</div>
                </motion.div>

                {/* Right Door */}
                <motion.div
                  animate={isDoorOpen ? { rotateY: 95, opacity: 0.15 } : { rotateY: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'right center' }}
                  className="w-1/2 h-full bg-gradient-to-l from-[#2c2419] to-[#453624] border-l border-amber-400/40 p-3 flex flex-col justify-between shadow-2xl relative"
                >
                  <div className="text-xl opacity-70 text-right">🌸</div>
                  <div className="text-center">
                    <div className="w-3 h-8 rounded-full border-2 border-amber-400/70 mx-auto" />
                  </div>
                  <div className="text-sm text-amber-200/50 font-serif text-right">BASE</div>
                </motion.div>

                {!isDoorOpen && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="bg-bvg-yellow text-bvg-dark font-black text-xs sm:text-sm px-4 py-2 rounded-full shadow-2xl border-2 border-bvg-dark group-hover:scale-110 transition-transform flex items-center space-x-1.5">
                      <span>Click to Enter</span>
                      <span>→</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="absolute -bottom-4 -left-4 text-2xl pointer-events-none">🌺</div>
              <div className="absolute -bottom-4 -right-4 text-2xl pointer-events-none">🌼</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inside State: Fullscreen Cinematic Skyline Header */}
      {(isInside || skipIntro) && (
        <motion.div
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="relative z-20 min-h-[55vh] sm:min-h-[65vh] flex flex-col items-center justify-center px-4 text-center pb-8"
        >
          <div className="max-w-4xl mx-auto space-y-3 pt-6">
            <motion.span 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-bvg-yellow text-bvg-dark font-black text-xs uppercase tracking-widest shadow-lg"
            >
              <span>Alexanderplatz Skyline</span>
            </motion.span>
            
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
            >
              Welcome to <span className="text-bvg-yellow">BerlinBase</span>
            </motion.h2>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-lg text-gray-200 max-w-2xl mx-auto font-medium drop-shadow-md leading-relaxed"
            >
              Your data-driven portal to housing reality, realistic living costs, and neighborhood matching.
            </motion.p>
          </div>

          {skipIntro && (
            <button
              onClick={() => {
                setSkipIntro(false);
                setIsDoorOpen(false);
                setIsInside(false);
                localStorage.setItem('berlinbase_skip_intro', 'false');
              }}
              className="mt-6 inline-flex items-center space-x-1.5 text-xs text-white/70 hover:text-bvg-yellow transition-colors bg-black/40 px-3 py-1.5 rounded-full border border-white/15"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Watch Portal Intro Again</span>
            </button>
          )}

          <div className="pt-6 animate-bounce">
            <ArrowDown className="w-5 h-5 text-bvg-yellow" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
