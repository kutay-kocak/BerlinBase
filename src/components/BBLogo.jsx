import React from 'react';

/**
 * Primary Logo: #31 - BerlinBase Fernsehturm Negative Spire
 * Crisp hollow geometric BB with TV Tower silhouette channel and sphere
 */
export function BBLogo({ className = "w-8 h-8", ...props }) {
  return (
    <svg 
      viewBox="0 0 160 160" 
      className={`fill-white ${className}`} 
      aria-label="BerlinBase Logo"
      {...props}
    >
      {/* First B with hollow windows */}
      <path d="M 25 20 L 78 20 C 95 20 105 28 105 44 C 105 55 98 64 88 68 C 102 72 112 82 112 104 C 112 124 95 138 75 138 L 25 138 Z M 48 42 L 48 60 L 70 60 C 76 60 80 55 80 51 C 80 46 76 42 70 42 Z M 48 84 L 48 115 L 72 115 C 80 115 84 108 84 100 C 84 92 80 84 72 84 Z" />
      {/* Second B with hollow windows & opacity */}
      <path 
        d="M 80 30 L 128 30 C 142 30 152 38 152 50 C 152 60 145 68 136 72 C 148 76 156 86 156 102 C 156 120 142 132 124 132 L 80 132 Z M 100 48 L 100 64 L 118 64 C 122 64 126 60 126 56 C 126 52 122 48 118 48 Z M 100 86 L 100 114 L 120 114 C 126 114 130 108 130 100 C 130 92 126 86 120 86 Z" 
        opacity="0.85" 
      />
      {/* TV Tower Silhouette Cutting Through Center */}
      <polygon points="79,5 81,5 84,155 76,155" fill="#08090D" />
      <circle cx="80" cy="55" r="10" fill="#08090D" stroke="#FFFFFF" strokeWidth="2.5" />
    </svg>
  );
}

/**
 * Backup / Alternative Logo: Pinterest Diagonal Razor Slice
 * Saved for future toggle or branding switch as requested by user.
 */
export function BBRazorSliceLogo({ className = "w-9 h-8", ...props }) {
  return (
    <svg 
      viewBox="0 0 200 160" 
      className={`text-white fill-current ${className}`} 
      aria-label="BerlinBase Razor Slice Logo"
      {...props}
    >
      <defs>
        <clipPath id="slice-cut-left">
          <polygon points="0,0 200,0 80,160 0,160" />
        </clipPath>
        <clipPath id="slice-cut-right">
          <polygon points="105,0 200,0 200,160 85,160" />
        </clipPath>
      </defs>
      {/* B1 Left */}
      <path 
        d="M 20 15 L 75 15 C 98 15 110 26 110 44 C 110 56 102 66 90 70 C 105 75 115 86 115 106 C 115 125 100 137 75 137 L 20 137 Z M 52 38 L 52 62 L 72 62 C 80 62 85 57 85 50 C 85 43 80 38 72 38 Z M 52 86 L 52 114 L 75 114 C 83 114 89 108 89 100 C 89 92 83 86 75 86 Z" 
        clipPath="url(#slice-cut-left)" 
      />
      {/* B2 Right */}
      <path 
        d="M 95 23 L 150 23 C 173 23 185 34 185 52 C 185 64 177 74 165 78 C 180 83 190 94 190 114 C 190 133 175 145 150 145 L 95 145 Z M 127 46 L 127 70 L 147 70 C 155 70 160 65 160 58 C 160 51 155 46 147 46 Z M 127 94 L 127 122 L 150 122 C 158 122 164 116 164 108 C 164 100 158 94 150 94 Z" 
        clipPath="url(#slice-cut-right)" 
      />
      {/* Razor Spike Accent in BVG Yellow */}
      <polygon points="86,160 140,20 134,20 80,160" fill="#F0D722" />
    </svg>
  );
}

export default BBLogo;
