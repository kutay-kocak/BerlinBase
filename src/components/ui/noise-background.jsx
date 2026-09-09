import React from "react";
import { cn } from "../../lib/utils";

export const NoiseBackground = ({
  children,
  className,
  containerClassName,
  gradientColors = [
    "rgb(240, 215, 34)",
    "rgb(34, 211, 238)",
    "rgb(227, 6, 19)"
  ],
  noiseOpacity = 0.25,
  speed = "fast",
}) => {
  const gradientString = gradientColors.join(", ");

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl p-[1px] transition-all duration-300",
        containerClassName
      )}
    >
      {/* Dynamic Animated Gradient Background */}
      <div
        className="absolute inset-[-100%] z-[-2] animate-[spin_6s_linear_infinite] opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `conic-gradient(from 0deg, ${gradientString}, ${gradientColors[0]})`,
        }}
      />

      {/* SVG Grain Noise Layer */}
      <div
        className="absolute inset-0 z-[-1] mix-blend-overlay pointer-events-none transition-opacity duration-300"
        style={{
          opacity: noiseOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Inner Card Container */}
      <div className={cn("relative h-full w-full rounded-[15px] bg-[#12131C]/90 backdrop-blur-md", className)}>
        {children}
      </div>
    </div>
  );
};
