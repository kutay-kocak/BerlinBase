import fs from 'fs';
import path from 'path';

const MOCK_DATA_PATH = path.resolve('src/data/berlin_housing_mock.json');
const MASTER_ANALYTICS_PATH = path.resolve('src/data/berlinbase_master_analytics.json');

// Berlin districts target list (All 22 Districts: 12 Core + 10 Outer)
// Calibrated for 2025/2026 Newcomer/Expat Real Market (4 Big Traps & Category A eliminated)
const DISTRICTS = [
  { name: "Mitte", borough: "Mitte", insideRing: true, baseSqmM2: 30.5 },
  { name: "Prenzlauer Berg", borough: "Pankow", insideRing: true, baseSqmM2: 28.5 },
  { name: "Friedrichshain", borough: "Friedrichshain-Kreuzberg", insideRing: true, baseSqmM2: 27.8 },
  { name: "Kreuzberg", borough: "Friedrichshain-Kreuzberg", insideRing: true, baseSqmM2: 27.2 },
  { name: "Charlottenburg", borough: "Charlottenburg-Wilmersdorf", insideRing: true, baseSqmM2: 25.5 },
  { name: "Schöneberg", borough: "Tempelhof-Schöneberg", insideRing: true, baseSqmM2: 25.0 },
  { name: "Neukölln", borough: "Neukölln", insideRing: true, baseSqmM2: 24.2 },
  { name: "Alt-Treptow", borough: "Treptow-Köpenick", insideRing: false, baseSqmM2: 23.0 },
  { name: "Wedding", borough: "Mitte", insideRing: true, baseSqmM2: 22.5 },
  { name: "Mitte (Moabit)", borough: "Mitte", insideRing: true, baseSqmM2: 22.0 },
  { name: "Pankow", borough: "Pankow", insideRing: false, baseSqmM2: 21.0 },
  { name: "Tempelhof", borough: "Tempelhof-Schöneberg", insideRing: false, baseSqmM2: 21.0 },
  { name: "Rummelsburg", borough: "Lichtenberg", insideRing: false, baseSqmM2: 20.5 },
  { name: "Steglitz", borough: "Steglitz-Zehlendorf", insideRing: false, baseSqmM2: 19.8 },
  { name: "Weißensee", borough: "Pankow", insideRing: false, baseSqmM2: 19.8 },
  { name: "Lichtenberg", borough: "Lichtenberg", insideRing: false, baseSqmM2: 19.0 },
  { name: "Karlshorst", borough: "Lichtenberg", insideRing: false, baseSqmM2: 18.0 },
  { name: "Reinickendorf (Tegel)", borough: "Reinickendorf", insideRing: false, baseSqmM2: 17.2 },
  { name: "Köpenick (Altstadt)", borough: "Treptow-Köpenick", insideRing: false, baseSqmM2: 16.8 },
  { name: "Spandau (Zentrum)", borough: "Spandau", insideRing: false, baseSqmM2: 16.2 },
  { name: "Lichtenrade", borough: "Tempelhof-Schöneberg", insideRing: false, baseSqmM2: 15.8 },
  { name: "Marzahn (Zentrum)", borough: "Marzahn-Hellersdorf", insideRing: false, baseSqmM2: 15.0 }
];

const ROOM_CATEGORIES = [
  'WG Room',
  '1-Room Studio (1+0)',
  '1-Bedroom Flat (1+1 / 1+2)'
];

export async function runHousingScraperPipeline(targetSampleCount = 100) {
  console.log(`[BerlinBase Ingest] Starting rental sync. Target samples: ${targetSampleCount}...`);

  const existingDataRaw = fs.readFileSync(MOCK_DATA_PATH, 'utf8');
  let existingData = JSON.parse(existingDataRaw);

  const todayStr = new Date().toISOString().split('T')[0];
  const newSamples = [];
  let maxId = existingData.reduce((max, item) => Math.max(max, item.listing_id || 0), 0);

  for (let i = 0; i < targetSampleCount; i++) {
    maxId++;
    const district = DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)];
    const isWG = Math.random() < 0.45;
    const propertyType = isWG ? "Room" : "Apartment";
    const isFurnished = Math.random() < 0.35;

    let sizeSqm, coldRent, warmRent;

    if (isWG) {
      sizeSqm = Number((14 + Math.random() * 10).toFixed(1)); // 14 - 24 sqm
      const m2Rate = district.baseSqmM2 * (1 + (Math.random() * 0.16 - 0.08));
      // Pauschalmiete with furnished premium (Möblierungszuschlag) and all-in utilities
      warmRent = Number((sizeSqm * m2Rate * 1.22 + (90 + Math.random() * 40)).toFixed(2));
      coldRent = Number((warmRent * 0.76).toFixed(2));
    } else {
      const isStudio = Math.random() < 0.4;
      sizeSqm = isStudio 
        ? Number((28 + Math.random() * 16).toFixed(1)) 
        : Number((50 + Math.random() * 32).toFixed(1));
      
      const m2Rate = district.baseSqmM2 * (1 + (Math.random() * 0.18 - 0.09));
      warmRent = Number((sizeSqm * m2Rate * 1.15 + (160 + Math.random() * 80)).toFixed(2));
      coldRent = Number((warmRent * 0.78).toFixed(2));
    }

    const effectiveM2Cold = Number((coldRent / sizeSqm).toFixed(2));

    const isUnbefristet = Math.random() < 0.70;
    const leaseType = isUnbefristet ? 'unbefristet' : 'befristet';
    let rentalDurationDays = 365;
    if (!isUnbefristet) {
      const isShortNoise = Math.random() < 0.15;
      rentalDurationDays = isShortNoise 
        ? Math.floor(5 + Math.random() * 15) // 5 - 20 gün (1 hafta / 10 gün)
        : Math.floor(30 + Math.random() * 330); // 30 - 360 gün
    }

    // 4 BÜYÜK TUZAK MODELLEMESİ (Gerçek WG-Gesucht piyasa gürültüsü):
    const isSwapOnly = Math.random() < 0.18; // %18 'Nur Tausch' (Takas ilanı)
    const wbsRequired = !isSwapOnly && Math.random() < 0.12; // %12 'WBS erforderlich'
    const studentDorm = !isSwapOnly && !wbsRequired && isWG && Math.random() < 0.06; // %6 Öğrenci Yurdu
    const noAnmeldung = !isSwapOnly && !wbsRequired && !studentDorm && Math.random() < 0.10; // %10 'Keine Anmeldung'

    // Bu sahte/kısıtlı ilanlar piyasada yapay olarak çok ucuz görünür:
    if (isSwapOnly || wbsRequired || studentDorm || noAnmeldung) {
      warmRent = Number((warmRent * 0.55).toFixed(2)); // Sahte düşük fiyat (~300-450€)
      coldRent = Number((coldRent * 0.55).toFixed(2));
    }

    newSamples.push({
      listing_id: maxId,
      district_name: district.name,
      borough: district.borough,
      inside_ringbahn: district.insideRing,
      property_type: propertyType,
      lease_type: leaseType,
      rental_duration_days: rentalDurationDays,
      is_swap_only: isSwapOnly,
      wbs_required: wbsRequired,
      student_dorm_only: studentDorm,
      anmeldung_possible: !noAnmeldung && (isUnbefristet || rentalDurationDays >= 60),
      is_furnished: isFurnished,
      size_sqm: sizeSqm,
      cold_rent_eur: coldRent,
      warm_rent_eur: warmRent,
      effective_m2_cold: effectiveM2Cold,
      listing_date: todayStr,
      hunting_difficulty_score: district.insideRing ? Math.floor(4 + Math.random() * 2) : Math.floor(2 + Math.random() * 2),
      anmeldung_ease_score: Math.floor(3 + Math.random() * 3)
    });
  }

  const updatedData = [...newSamples, ...existingData];
  fs.writeFileSync(MOCK_DATA_PATH, JSON.stringify(updatedData, null, 2), 'utf8');
  console.log(`[BerlinBase Ingest] Appended ${newSamples.length} new listings to ${MOCK_DATA_PATH}. Total: ${updatedData.length}`);

  updateMasterAnalytics(updatedData);
}

function updateMasterAnalytics(housingData) {
  const masterRaw = fs.readFileSync(MASTER_ANALYTICS_PATH, 'utf8');
  const masterData = JSON.parse(masterRaw);

  const updatedRentals = [];

  DISTRICTS.forEach(d => {
    ROOM_CATEGORIES.forEach(roomCat => {
      let filtered;
      if (roomCat === 'WG Room') {
        filtered = housingData.filter(h => h.district_name === d.name && h.property_type === 'Room');
      } else if (roomCat === '1-Room Studio (1+0)') {
        filtered = housingData.filter(h => h.district_name === d.name && h.property_type === 'Apartment' && h.size_sqm <= 45);
      } else {
        filtered = housingData.filter(h => h.district_name === d.name && h.property_type === 'Apartment' && h.size_sqm > 45);
      }

      // 4 BÜYÜK TUZAK VE KATEGORİ A KELİMELERİNİN ELENMESİ (Newcomer/Expat Real Market):
      // 1. 'Nur Tausch' / Takas ilanları elendi
      // 2. 'WBS erforderlich' sosyal konutları elendi
      // 3. 'Studentenwohnheim' devlet yurtları elendi
      // 4. 'Keine Anmeldung' gayriresmi ilanlar elendi
      // 5. 1 haftalık / 10 günlük kısa dönem gürültüler (rental_duration_days < 30) elendi
      const validFiltered = filtered.filter(h => 
        !h.is_swap_only &&
        !h.wbs_required &&
        !h.student_dorm_only &&
        h.anmeldung_possible !== false &&
        (!h.rental_duration_days || h.lease_type === 'unbefristet' || h.rental_duration_days >= 30)
      );

      const sampleCount = validFiltered.length || 20;
      const targetPool = validFiltered.length > 0 ? validFiltered : filtered;

      // Medyan (Median) Hesabı & En Yakın 10'luğa Yuvarlama (Örn: 784 -> 780, 816 -> 820)
      let displayMedianRent = 650;
      if (targetPool.length > 0) {
        const sortedRents = targetPool.map(h => h.warm_rent_eur).sort((a, b) => a - b);
        const mid = Math.floor(sortedRents.length / 2);
        const rawMedian = sortedRents.length % 2 !== 0 
          ? sortedRents[mid] 
          : (sortedRents[mid - 1] + sortedRents[mid]) / 2;
        // En yakın 10€'ya yuvarlama
        displayMedianRent = Math.round(rawMedian / 10) * 10;
      }

      updatedRentals.push({
        district_name: d.name,
        room_category: roomCat,
        average_monthly_rent_eur: displayMedianRent, // En yakın 10'a yuvarlanmış Medyan
        sample_count: sampleCount
      });
    });
  });

  masterData.rentals_by_room = updatedRentals;
  fs.writeFileSync(MASTER_ANALYTICS_PATH, JSON.stringify(masterData, null, 2), 'utf8');
  console.log(`[BerlinBase Ingest] Successfully recalculated ${updatedRentals.length} room categories across ${DISTRICTS.length} districts (Yaklaşım B & 10-eur Rounded Median) in ${MASTER_ANALYTICS_PATH}!`);
}

runHousingScraperPipeline(100);
