import React, { useState } from 'react';
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Home, 
  Utensils, 
  Wifi, 
  Clock, 
  ExternalLink,
  MapPin,
  TrendingUp,
  Award,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import analyticsData from '../data/berlinbase_master_analytics.json';
import vibesData from '../data/vibes.json';

// Curated district pros & cons for balanced decision making
const DISTRICT_PROS_CONS = {
  "Mitte": {
    pros: ["Walking distance to major international tech headquarters", "Highest gigabit fiber internet coverage (68%)", "Abundant specialty third-wave cafes and dining"],
    cons: ["Highest average monthly rent in Berlin", "Crowded with tourists around Hackescher Markt", "High landlord competition on listings"]
  },
  "Friedrichshain": {
    pros: ["Vibrant nightlife, club culture and Boxhagener food markets", "Excellent direct S-Bahn/U-Bahn connectivity to Alexanderplatz (10 min)", "Strong FTTH broadband infrastructure (62%)"],
    cons: ["Weekend street noise on Simon-Dach-Straße", "Competitive rental viewings with high applicant queues", "Rapidly rising rent levels"]
  },
  "Kreuzberg": {
    pros: ["Legendary multicultural energy and Landwehrkanal walks", "World-class street food and historic market halls", "Vibrant community and creative startup scene"],
    cons: ["Elevated Bürgeramt bureaucracy waiting times", "Older Altbau building stock can have varying energy ratings", "Rent levels near the top tier (€670 WG avg)"]
  },
  "Prenzlauer Berg": {
    pros: ["Beautifully restored Altbau facades and green squares (Kollwitzplatz)", "Very quiet, clean, safe and family-friendly atmosphere", "Rich organic bakery, brunch and boutique cafe culture"],
    cons: ["Premium rental costs (€1,400 studio / €2,310 flat avg)", "Low nightlife—quieter evening scene after 10 PM", "High demand for kindergarten and school spots"]
  },
  "Charlottenburg": {
    pros: ["Classic Western elegance, wide leafy boulevards and Kurfürstendamm", "Authentic Asian culinary corridor along Kantstraße", "Fast Bürgeramt processing speeds (~4 weeks)"],
    cons: ["Slower transit commute to East Berlin hubs (22+ min to Alex)", "Lower modern fiber broadband deployment (38%)", "Less youth/subcultural vibe compared to eastern kieze"]
  },
  "Schöneberg": {
    pros: ["Historic welcoming atmosphere with great weekly markets (Winterfeldtplatz)", "Central transit positioning between East and West Berlin", "Cozy residential neighborhood feel"],
    cons: ["Moderate rent levels with fewer budget bargains", "Fiber broadband is average (46%)", "Parking can be challenging in central pockets"]
  },
  "Mitte (Moabit)": {
    pros: ["Central location right next to Hauptbahnhof and Tiergarten", "More affordable rent than central Mitte (€610 WG avg)", "Diverse Middle Eastern street dining along Turmstraße"],
    cons: ["Industrial and transit-heavy pockets", "Gentrification is uneven across northern blocks", "Lower fiber deployment (42%)"]
  },
  "Neukölln": {
    pros: ["Exceptional international dining variety (78% non-German restaurants)", "Vibrant artist community, bustling spätis and lively bars", "Direct access to Tempelhofer Feld and Hasenheide park"],
    cons: ["Bürgeramt appointment wait times are longest (~7 weeks)", "Busy street noise on Sonnenallee and Karl-Marx-Straße", "Fast rising rents over recent years"]
  },
  "Wedding": {
    pros: ["Most affordable central rental rates (€640 WG, €1,160 studio avg)", "Cheapest specialty coffee and döner index in central Berlin", "Fast U-Bahn connection (U6/U8 direct to Mitte in 16 min)"],
    cons: ["Grungier industrial streetscapes in certain quarters", "Fewer polished parks compared to southern boroughs", "Fiber coverage is moderate (45%)"]
  },
  "Pankow": {
    pros: ["Quiet residential haven with abundant green parks (Schlosspark)", "Fastest Bürgeramt appointment access in Berlin (~3 weeks)", "Spacious modern housing developments"],
    cons: ["Outside the S-Bahn Ringbahn zone", "Transit to Alexanderplatz takes ~25 minutes", "Low late-night späti and bar density"]
  },
  "Steglitz": {
    pros: ["Very safe, calm, and leafy residential surroundings", "Exceptional shopping along Schloßstraße", "Quick Bürgeramt appointment turnaround (~3 weeks)"],
    cons: ["32-minute transit latency to central Alexanderplatz", "Lowest fiber broadband coverage in Berlin (36%)", "Quiet nightlife geared toward families and retirees"]
  },
  "Lichtenberg": {
    pros: ["Very affordable rental rates compared to central Kieze (€540 WG, €1,070 studio avg)", "Home to Europe's largest Vietnamese hub (Dong Xuan Center)", "Spacious flats with high availability"],
    cons: ["Outside the Ringbahn ring zone", "Predominance of post-Soviet Plattenbau architecture", "Longer commute to West Berlin business centers"]
  }
};

export default function BestNeighborhoodQuiz({ onNavigateToDistrict }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    budget: null,
    vibe: null,
    transit: null,
    cuisine: null,
    work: null
  });
  const [result, setResult] = useState(null);

  const { districts_lifestyle, rentals_by_room } = analyticsData;

  // 5 English Questions with "Doesn't matter / Any" on questions 2-5
  const questions = [
    {
      id: 'budget',
      title: 'What is your maximum total monthly rental budget?',
      subtitle: 'Strictly Total Monthly Rent (All-in/Warm)—including heating, water, and building operating fees.',
      options: [
        { label: '500 € – 650 €', desc: 'Student / Budget-Friendly WG Shared Room', val: 'low_wg' },
        { label: '650 € – 950 €', desc: 'Central WG Room or Entry-Level 1-Room Studio (1+0)', val: 'mid_studio' },
        { label: '950 € – 1,400 €', desc: 'Standard 1-Bedroom Flat (1+1 / 1+2)', val: 'high_flat' },
        { label: '1,400 € +', desc: 'Spacious Altbau Flat / Premium Central District', val: 'premium' }
      ]
    },
    {
      id: 'vibe',
      title: 'What kind of neighborhood atmosphere (Vibe) do you prefer?',
      subtitle: 'The everyday energy and street culture you want outside your front door.',
      options: [
        { label: 'Bohemian, Vibrant & Artistic', desc: 'Late-night spätis, street art, lively bars, and cafe culture', val: 'bohemian' },
        { label: 'Quiet, Green & Family-Friendly', desc: 'Expansive public parks, organic bakeries, tree-lined streets', val: 'peaceful' },
        { label: 'Central, Prestigious & Modern', desc: 'Walking distance to tech hubs, polished boulevards, sleek venues', val: 'central' },
        { label: 'Budget-Friendly & Multicultural', desc: 'Authentic markets, affordable kebabs, raw industrial character', val: 'budget_multicultural' },
        { label: "Doesn't matter / Open to any vibe", desc: 'I am adaptable—prioritize my budget, transit, and infrastructure instead', val: 'any_vibe' }
      ]
    },
    {
      id: 'transit',
      title: 'Transit Priority (Commute Time to Alexanderplatz / Center):',
      subtitle: 'Your acceptable travel time on U-Bahn / S-Bahn to reach the central city core.',
      options: [
        { label: '10 – 18 Minutes (Ultra Fast)', desc: 'Inside Ringbahn (Zone A) is essential; my daily commute time is critical', val: 'fast_transit' },
        { label: '20 – 30 Minutes (Balanced)', desc: 'Reasonable metro commute in exchange for more square meters and calmer streets', val: 'mid_transit' },
        { label: '30 – 45 Minutes (Distance is not an issue)', desc: 'Outer ring or suburban peace is fine if rent is more affordable', val: 'relaxed_transit' },
        { label: "Doesn't matter / Flexible transit", desc: 'I work remotely or do not need to commute to Alexanderplatz frequently', val: 'any_transit' }
      ]
    },
    {
      id: 'cuisine',
      title: 'Which dining cultures and street food appeal to you most?',
      subtitle: 'The food profile and restaurant scene you want in your immediate kiez.',
      options: [
        { label: 'Vietnamese, East Asian & Vegan Street Food', desc: 'Fresh Bánh Mì, Pho, Vegan Tapas & Dumplings (Friedrichshain & Lichtenberg)', val: 'vietnamese' },
        { label: 'Turkish, Arabic, Levantine & Middle Eastern', desc: 'Charcoal grills, Döner, Hummus, Shawarma & fresh Pita (Kreuzberg, Neukölln & Wedding)', val: 'middle_eastern' },
        { label: 'Traditional German Bakeries & Classic Wirtshaus', desc: 'Artisan sourdough, Eisbein, Schnitzel & leafy beer gardens (Pankow & Steglitz)', val: 'german' },
        { label: 'Global Fusion, Third-Wave Coffee & Artisan Brunch', desc: 'Specialty roasteries, sourdough bakeries, Italian trattorias (Mitte & Prenzlauer Berg)', val: 'fusion_coffee' },
        { label: "Doesn't matter / Diverse mix", desc: 'I enjoy all foods or cook primarily at home', val: 'any_cuisine' }
      ]
    },
    {
      id: 'work',
      title: 'Internet Speed & Home-Office Requirement:',
      subtitle: 'Your daily digital connectivity needs for work and entertainment.',
      options: [
        { label: 'Software Engineer / Remote Worker: FTTH Gigabit Fiber Critical', desc: 'High bandwidth repos, video conferencing, low latency—need 60%+ fiber coverage', val: 'fiber_critical' },
        { label: 'Standard Broadband is Sufficient, Street Vibe Comes First', desc: 'Standard 50-100 Mbps DSL/cable is fine for streaming; neighborhood life is primary', val: 'fiber_standard' },
        { label: "Doesn't matter / Any standard connection", desc: 'Basic internet connectivity meets all my personal needs', val: 'any_work' }
      ]
    }
  ];

  const handleSelectOption = (value) => {
    const currentQ = questions[currentStep];
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers) => {
    const scored = districts_lifestyle.map((d) => {
      let score = 50;

      // 1. Budget dimension
      const flatRent = rentals_by_room.find(r => r.district_name === d.district_name && r.room_category === '1-Bedroom Flat (1+1 / 1+2)')?.average_monthly_rent_eur || 1400;
      const wgRent = rentals_by_room.find(r => r.district_name === d.district_name && r.room_category === 'WG Room')?.average_monthly_rent_eur || 650;

      if (finalAnswers.budget === 'low_wg') {
        if (wgRent <= 570) score += 35;
        else if (wgRent <= 650) score += 20;
        else score -= 15;
      } else if (finalAnswers.budget === 'mid_studio') {
        if (wgRent <= 700) score += 25;
      } else if (finalAnswers.budget === 'premium') {
        if (d.inside_ringbahn && flatRent >= 1500) score += 30;
      }

      // 2. Vibe dimension
      if (finalAnswers.vibe === 'bohemian' && ['Neukölln', 'Kreuzberg', 'Friedrichshain'].includes(d.district_name)) score += 35;
      if (finalAnswers.vibe === 'peaceful' && ['Prenzlauer Berg', 'Charlottenburg', 'Pankow'].includes(d.district_name)) score += 35;
      if (finalAnswers.vibe === 'central' && ['Mitte', 'Mitte (Moabit)'].includes(d.district_name)) score += 35;
      if (finalAnswers.vibe === 'budget_multicultural' && ['Wedding', 'Lichtenberg', 'Steglitz'].includes(d.district_name)) score += 35;
      if (finalAnswers.vibe === 'any_vibe') score += 10; // Neutral bonus

      // 3. Transit dimension
      if (finalAnswers.transit === 'fast_transit') {
        if (d.transit_to_alex_min <= 15) score += 25;
        else score -= 20;
      } else if (finalAnswers.transit === 'mid_transit') {
        if (d.transit_to_alex_min <= 24) score += 20;
      } else if (finalAnswers.transit === 'relaxed_transit') {
        if (!d.inside_ringbahn) score += 20;
      } else if (finalAnswers.transit === 'any_transit') {
        score += 10;
      }

      // 4. Cuisine dimension
      if (finalAnswers.cuisine === 'vietnamese' && ['Friedrichshain', 'Lichtenberg'].includes(d.district_name)) score += 35;
      if (finalAnswers.cuisine === 'middle_eastern' && ['Kreuzberg', 'Neukölln', 'Wedding', 'Mitte (Moabit)'].includes(d.district_name)) score += 35;
      if (finalAnswers.cuisine === 'german' && ['Pankow', 'Steglitz'].includes(d.district_name)) score += 35;
      if (finalAnswers.cuisine === 'fusion_coffee' && ['Mitte', 'Prenzlauer Berg', 'Charlottenburg'].includes(d.district_name)) score += 35;
      if (finalAnswers.cuisine === 'any_cuisine') score += 10;

      // 5. Fiber Work dimension
      if (finalAnswers.work === 'fiber_critical') {
        if (d.fiber_internet_pct >= 60) score += 30;
        else if (d.fiber_internet_pct >= 50) score += 15;
        else score -= 15;
      } else if (finalAnswers.work === 'any_work') {
        score += 10;
      }

      const prosCons = DISTRICT_PROS_CONS[d.district_name] || {
        pros: ["Convenient transit access", "Established neighborhood community"],
        cons: ["Standard city noise levels", "General housing market competition"]
      };

      return {
        ...d,
        rawScore: score,
        rent_wg: wgRent,
        rent_flat: flatRent,
        pros: prosCons.pros,
        cons: prosCons.cons
      };
    });

    // Sort descending by raw score
    scored.sort((a, b) => b.rawScore - a.rawScore);

    // If 3rd or 4th options are within 15 points of the top score, display up to 4 matches
    const topScore = scored[0].rawScore;
    const qualifiedMatches = scored.filter((d, idx) => idx < 4 && (topScore - d.rawScore) <= 20);

    // Guarantee at least 2, and up to 4
    const finalSelection = qualifiedMatches.length >= 2 ? qualifiedMatches : scored.slice(0, 2);
    setResult(finalSelection);

    // Celebration confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F0D722', '#10b981', '#ffffff', '#00A8FF']
    });
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({ budget: null, vibe: null, transit: null, cuisine: null, work: null });
    setResult(null);
  };

  return (
    <div className="bg-[#15151D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div className="flex items-center space-x-3">
          <span className="w-10 h-10 rounded-xl bg-bvg-yellow flex items-center justify-center text-bvg-dark font-black text-lg shadow-lg shadow-bvg-yellow/10">
            <Compass className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Best Neighborhood for You
              </h2>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-bvg-yellow/10 text-bvg-yellow border border-bvg-yellow/20">
                5-Step Smart Vibe Match
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Personalized district recommendations matching your budget, commute tolerance, and lifestyle.
            </p>
          </div>
        </div>

        {result && (
          <button
            onClick={handleReset}
            className="inline-flex items-center space-x-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-bvg-gray text-gray-300 hover:text-white border border-white/10 hover:border-bvg-yellow transition-metro"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
        )}
      </div>

      {/* Progress Bar (if in quiz) */}
      {!result && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400 font-medium">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span className="text-bvg-yellow font-bold">{Math.round(((currentStep + 1) / questions.length) * 100)}% Completed</span>
          </div>
          <div className="h-2 w-full bg-bvg-dark rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-bvg-yellow"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Active Question or Results Card with Framer Motion */}
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 pt-2"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {questions[currentStep].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                {questions[currentStep].subtitle}
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {questions[currentStep].options.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelectOption(opt.val)}
                  className={`p-4 rounded-xl text-left border transition-metro group flex flex-col justify-between min-h-[95px] ${
                    opt.val.startsWith('any_')
                      ? 'bg-bvg-dark/80 hover:bg-bvg-gray/80 border-dashed border-white/20 hover:border-bvg-yellow/60'
                      : 'bg-bvg-gray/50 hover:bg-bvg-gray border-white/10 hover:border-bvg-yellow/50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-sm text-white group-hover:text-bvg-yellow transition-colors">
                      {opt.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-bvg-yellow transform group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Back Button if step > 0 */}
            {currentStep > 0 && (
              <div className="pt-2">
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Question</span>
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          /* RESULT VIEW */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 pt-2"
          >
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personalized Match Completed!</span>
              </div>
              <h3 className="text-2xl font-black text-white">Your Best Matching Berlin Neighborhoods</h3>
              <p className="text-xs text-gray-400">
                Ranked and validated against our PostgreSQL dataset with realistic pros, trade-offs, and dining metrics:
              </p>
            </div>

            <div className={`grid grid-cols-1 ${result.length > 2 ? 'md:grid-cols-2 lg:grid-cols-2' : 'md:grid-cols-2'} gap-6 pt-2`}>
              {result.map((d, index) => {
                const badgeLabel = index === 0 ? "Best Choice" : index === 1 ? "2nd Choice" : index === 2 ? "3rd Close Match" : "4th Close Match";
                const isTop = index === 0;

                return (
                  <div
                    key={d.district_name}
                    className={`border rounded-2xl p-6 relative flex flex-col justify-between space-y-5 shadow-xl transition-metro ${
                      isTop
                        ? 'bg-gradient-to-b from-[#222230] to-[#171722] border-bvg-yellow/50 ring-1 ring-bvg-yellow/30'
                        : 'bg-bvg-gray/40 border-white/10'
                    }`}
                  >
                    {/* Top Tier Badge (Replaced percentage with clean Rank) */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-1 rounded-lg flex items-center justify-center font-black text-xs ${
                          isTop ? 'bg-bvg-yellow text-bvg-dark' : 'bg-white/10 text-white'
                        }`}>
                          #{index + 1}
                        </span>
                        <span className={`font-black text-xs uppercase tracking-wider ${isTop ? 'text-bvg-yellow' : 'text-gray-300'}`}>
                          {badgeLabel}
                        </span>
                      </div>

                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                        {d.inside_ringbahn ? 'Ringbahn (Zone A)' : 'Outer Ring (Zone B)'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-white tracking-tight">{d.district_name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{d.borough} District</p>
                    </div>

                    {/* Highlighted Specs */}
                    <div className="space-y-2 text-xs">
                      <div className="bg-bvg-dark/80 p-2.5 rounded-lg border border-white/5 flex items-center justify-between">
                        <span className="text-gray-400 flex items-center space-x-1.5">
                          <Home className="w-3.5 h-3.5 text-bvg-yellow" />
                          <span>Average Rent (All-in):</span>
                        </span>
                        <span className="font-bold text-white font-mono">
                          WG: €{d.rent_wg} | Flat: €{d.rent_flat}
                        </span>
                      </div>

                      <div className="bg-bvg-dark/80 p-2.5 rounded-lg border border-white/5 flex items-center justify-between">
                        <span className="text-gray-400 flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-400" />
                          <span>Transit to Alexanderplatz:</span>
                        </span>
                        <span className="font-bold text-white font-mono">{d.transit_to_alex_min} minutes</span>
                      </div>

                      <div className="bg-bvg-dark/80 p-2.5 rounded-lg border border-white/5 space-y-1">
                        <div className="text-gray-400 flex items-center space-x-1.5">
                          <Utensils className="w-3.5 h-3.5 text-bvg-yellow" />
                          <span>Culinary Highlight:</span>
                        </div>
                        <div className="font-bold text-gray-200">{d.primary_cuisine}</div>
                        <div className="text-[11px] text-gray-400">Famous for: {d.famous_specialty}</div>
                        <div className="text-[10px] text-bvg-yellow font-mono">📍 {d.top_street_hotspot}</div>
                      </div>

                      <div className="bg-bvg-dark/80 p-2.5 rounded-lg border border-white/5 flex items-center justify-between">
                        <span className="text-gray-400 flex items-center space-x-1.5">
                          <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Gigabit Fiber Coverage:</span>
                        </span>
                        <span className="font-bold text-cyan-300 font-mono">%{d.fiber_internet_pct}</span>
                      </div>
                    </div>

                    {/* Pros & Cons Matrix */}
                    <div className="pt-2 border-t border-white/5 space-y-2 text-xs">
                      <div>
                        <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1 mb-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>Key Advantages:</span>
                        </div>
                        <ul className="space-y-0.5 text-gray-300 text-[11px] list-disc list-inside">
                          {d.pros.map((p, pIdx) => (
                            <li key={pIdx}>{p}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-1">
                        <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1 mb-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>Things to Consider:</span>
                        </div>
                        <ul className="space-y-0.5 text-gray-400 text-[11px] list-disc list-inside">
                          {d.cons.map((c, cIdx) => (
                            <li key={cIdx}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-white/5">
                      <span className="text-[11px] text-gray-400">
                        Bürgeramt wait: ~{d.buergeramt_speed_wks} wks
                      </span>
                      {onNavigateToDistrict && (
                        <button
                          onClick={() => onNavigateToDistrict(d.district_name)}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-bvg-yellow hover:bg-yellow-400 text-bvg-dark text-xs font-black transition-metro shadow-md shadow-bvg-yellow/10"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>View on Interactive Map</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
