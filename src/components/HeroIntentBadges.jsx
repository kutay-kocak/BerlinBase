import React from "react";

// Kutu 1: Beyaz zeminli, Brandenburg Kapısı çizim tekniğiyle (lacivert kontur + BVG sarısı) revize edilmiş Altbau & BER Bileti
export function BerTicketHouseBadge({ className = "w-14 h-14" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-black/60 border border-bvg-yellow/40 p-1 shadow-xl backdrop-blur-md overflow-hidden ${className}`}>
      {/* Sağ kutucuktaki Brandenburg Kapısı ile birebir uyumlu temiz beyaz iç zemin */}
      <div className="w-full h-full rounded-xl bg-white flex items-center justify-center p-0.5 shadow-inner overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full scale-105">
          {/* Çatı Bacası */}
          <rect x="68" y="10" width="8" height="14" fill="#F0D722" stroke="#002B49" strokeWidth="1.8" />
          <rect x="66" y="8" width="12" height="3" rx="0.5" fill="#002B49" />

          {/* Eğimli Altbau Çatısı & Saçaklar */}
          <polygon points="50,14 84,36 16,36" fill="#F0D722" stroke="#002B49" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="50" cy="26" r="4.5" fill="#FFFFFF" stroke="#002B49" strokeWidth="1.6" />
          <line x1="50" y1="21.5" x2="50" y2="30.5" stroke="#002B49" strokeWidth="1.2" />
          <line x1="45.5" y1="26" x2="54.5" y2="26" stroke="#002B49" strokeWidth="1.2" />

          {/* Kapıdaki Friz ile Birebir Uyumlu Dişli Saçak (Dentils) */}
          <rect x="14" y="36" width="72" height="4" rx="0.5" fill="#FEF08A" stroke="#002B49" strokeWidth="1.8" />
          <line x1="22" y1="36" x2="22" y2="40" stroke="#002B49" strokeWidth="1.2" />
          <line x1="32" y1="36" x2="32" y2="40" stroke="#002B49" strokeWidth="1.2" />
          <line x1="42" y1="36" x2="42" y2="40" stroke="#002B49" strokeWidth="1.2" />
          <line x1="50" y1="36" x2="50" y2="40" stroke="#002B49" strokeWidth="1.2" />
          <line x1="58" y1="36" x2="58" y2="40" stroke="#002B49" strokeWidth="1.2" />
          <line x1="68" y1="36" x2="68" y2="40" stroke="#002B49" strokeWidth="1.2" />
          <line x1="78" y1="36" x2="78" y2="40" stroke="#002B49" strokeWidth="1.2" />

          {/* Altbau Ön Cephe Duvarı */}
          <rect x="18" y="40" width="64" height="52" fill="#FFFFFF" stroke="#002B49" strokeWidth="2" />

          {/* Üst Kat Klasik Pencereleri */}
          <rect x="25" y="45" width="10" height="15" rx="0.5" fill="#FEF08A" stroke="#002B49" strokeWidth="1.5" />
          <line x1="30" y1="45" x2="30" y2="60" stroke="#002B49" strokeWidth="1" />
          <line x1="25" y1="51" x2="35" y2="51" stroke="#002B49" strokeWidth="1" />
          <rect x="23" y="43.5" width="14" height="1.8" fill="#002B49" />

          <rect x="45" y="45" width="10" height="15" rx="0.5" fill="#FEF08A" stroke="#002B49" strokeWidth="1.5" />
          <line x1="50" y1="45" x2="50" y2="60" stroke="#002B49" strokeWidth="1" />
          <line x1="45" y1="51" x2="55" y2="51" stroke="#002B49" strokeWidth="1" />
          <rect x="43" y="43.5" width="14" height="1.8" fill="#002B49" />

          <rect x="65" y="45" width="10" height="15" rx="0.5" fill="#FEF08A" stroke="#002B49" strokeWidth="1.5" />
          <line x1="70" y1="45" x2="70" y2="60" stroke="#002B49" strokeWidth="1" />
          <line x1="65" y1="51" x2="75" y2="51" stroke="#002B49" strokeWidth="1" />
          <rect x="63" y="43.5" width="14" height="1.8" fill="#002B49" />

          {/* Katlar Arası Stukko Silme Kuşağı */}
          <line x1="18" y1="64" x2="82" y2="64" stroke="#002B49" strokeWidth="1.6" />

          {/* Alt Kat Yan Pencereleri */}
          <rect x="25" y="67" width="10" height="14" fill="#FEF08A" stroke="#002B49" strokeWidth="1.5" />
          <line x1="30" y1="67" x2="30" y2="81" stroke="#002B49" strokeWidth="1" />
          <line x1="25" y1="73" x2="35" y2="73" stroke="#002B49" strokeWidth="1" />

          <rect x="65" y="67" width="10" height="14" fill="#FEF08A" stroke="#002B49" strokeWidth="1.5" />
          <line x1="70" y1="67" x2="70" y2="81" stroke="#002B49" strokeWidth="1" />
          <line x1="65" y1="73" x2="75" y2="73" stroke="#002B49" strokeWidth="1" />

          {/* Zemin Kaidesi */}
          <rect x="14" y="92" width="72" height="3" rx="0.5" fill="#002B49" />

          {/* Ön Planda BER Biniş Kartı (Kapı İllüstrasyonunun Kalem Kalınlığı ve Rengiyle Birebir) */}
          <g transform="rotate(-6 50 78)">
            <rect x="8" y="60" width="84" height="34" rx="4" fill="#002B49" stroke="#002B49" strokeWidth="2" />
            <rect x="8" y="60" width="84" height="7" rx="3" fill="#F0D722" />
            <rect x="8" y="64" width="84" height="3" fill="#F0D722" />

            <circle cx="8" cy="77" r="3.6" fill="#FFFFFF" stroke="#002B49" strokeWidth="1.8" />
            <circle cx="92" cy="77" r="3.6" fill="#FFFFFF" stroke="#002B49" strokeWidth="1.8" />
            <line x1="64" y1="67" x2="64" y2="94" stroke="#64748B" strokeWidth="1.2" strokeDasharray="2,1.5" />

            <text x="18" y="80" fill="#F0D722" fontSize="14" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">BER</text>
            <text x="19" y="89" fill="#FFFFFF" fontSize="5.8" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="1">BERLIN</text>

            <line x1="71" y1="72" x2="71" y2="89" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="75" y1="72" x2="75" y2="89" stroke="#FFFFFF" strokeWidth="2.5" />
            <line x1="79" y1="72" x2="79" y2="89" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="83" y1="72" x2="83" y2="89" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// Kutu 2: Kullanıcının yüklediği Brandenburg Kapısı illüstrasyonu (Altındaki yazı silinmiş hali)
export function TechnoQuadrigaBadge({ className = "w-14 h-14" }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-black/60 border border-cyan-500/40 p-1 shadow-xl backdrop-blur-md overflow-hidden ${className}`}>
      {/* İllüstrasyonun iki tonlu mavi çizgilerini en net gösteren temiz zemin */}
      <div className="w-full h-full rounded-xl bg-white flex items-center justify-center p-0.5 shadow-inner overflow-hidden">
        <img
          src="/brandenburg/brandenburg-blue-gate-white.png"
          alt="Brandenburg Gate Berlin"
          className="w-full h-full object-contain scale-105"
        />
      </div>
    </div>
  );
}
