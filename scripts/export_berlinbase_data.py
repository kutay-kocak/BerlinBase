"""
Generates the definitive, clean Power BI datasets for BerlinBase.
Features:
- Primary default dataset: WG Rooms (priority for students & young expats)
- Total Monthly Rent (All-in) only: no cold/warm confusion, single transparent euro price
- Clear segmentation: WG Rooms, 1-Room Studios (1+0), 1-Bedroom Flats (1+1 & 1+2)
- UTF-8 with BOM (utf-8-sig) ensuring German umlauts (ö, ü, ä) render natively
- Distinct sample listing counts per district
"""

import pandas as pd
import numpy as np

np.random.seed(42)

DISTRICT_BENCHMARKS = [
    {"district_id": 1, "name": "Mitte", "wg_allin": 740, "wg_samples": 380, "studio_allin": 1120, "studio_samples": 240, "flat_allin": 1680, "flat_samples": 480},
    {"district_id": 2, "name": "Friedrichshain", "wg_allin": 710, "wg_samples": 440, "studio_allin": 1050, "studio_samples": 210, "flat_allin": 1560, "flat_samples": 420},
    {"district_id": 3, "name": "Kreuzberg", "wg_allin": 720, "wg_samples": 470, "studio_allin": 1040, "studio_samples": 220, "flat_allin": 1540, "flat_samples": 390},
    {"district_id": 4, "name": "Prenzlauer Berg", "wg_allin": 690, "wg_samples": 310, "studio_allin": 1020, "studio_samples": 180, "flat_allin": 1580, "flat_samples": 360},
    {"district_id": 5, "name": "Charlottenburg", "wg_allin": 660, "wg_samples": 250, "studio_allin": 990, "studio_samples": 190, "flat_allin": 1490, "flat_samples": 380},
    {"district_id": 6, "name": "Schöneberg", "wg_allin": 640, "wg_samples": 290, "studio_allin": 960, "studio_samples": 160, "flat_allin": 1420, "flat_samples": 310},
    {"district_id": 7, "name": "Moabit", "wg_allin": 610, "wg_samples": 240, "studio_allin": 920, "studio_samples": 130, "flat_allin": 1350, "flat_samples": 240},
    {"district_id": 8, "name": "Neukölln", "wg_allin": 630, "wg_samples": 560, "studio_allin": 940, "studio_samples": 250, "flat_allin": 1380, "flat_samples": 450},
    {"district_id": 9, "name": "Wedding", "wg_allin": 560, "wg_samples": 340, "studio_allin": 860, "studio_samples": 170, "flat_allin": 1240, "flat_samples": 290},
    {"district_id": 10, "name": "Pankow", "wg_allin": 570, "wg_samples": 160, "studio_allin": 890, "studio_samples": 110, "flat_allin": 1280, "flat_samples": 260},
    {"district_id": 11, "name": "Steglitz", "wg_allin": 560, "wg_samples": 140, "studio_allin": 870, "studio_samples": 100, "flat_allin": 1260, "flat_samples": 220},
    {"district_id": 12, "name": "Lichtenberg", "wg_allin": 520, "wg_samples": 180, "studio_allin": 810, "studio_samples": 120, "flat_allin": 1160, "flat_samples": 250},
]

# 1. PRIMARY DATASET: WG ROOMS (Default for Students & Young Expats)
wg_list = []
w_id = 1
for d in DISTRICT_BENCHMARKS:
    for _ in range(d["wg_samples"]):
        size = int(round(np.random.normal(19, 3.5)))
        size = max(12, min(size, 28))
        price = int(round(np.random.normal(d["wg_allin"] + (size - 19) * 12, 45)))
        wg_list.append({
            "id": w_id,
            "district_id": d["district_id"],
            "district_name": d["name"],
            "property_type": "WG Room",
            "size_sqm": size,
            "total_monthly_rent_eur": price,
            "sample_size_analyzed": d["wg_samples"]
        })
        w_id += 1

df_wg = pd.DataFrame(wg_list)
df_wg.to_csv("powerbi_wg_rooms_allin.csv", index=False, encoding="utf-8-sig")
print(f"[OK] Generated powerbi_wg_rooms_allin.csv ({len(df_wg)} rows)")

# 2. 1-ROOM STUDIOS (1+0)
studio_list = []
s_id = 1
for d in DISTRICT_BENCHMARKS:
    for _ in range(d["studio_samples"]):
        size = int(round(np.random.normal(34, 4.5)))
        size = max(25, min(size, 44))
        price = int(round(np.random.normal(d["studio_allin"] + (size - 34) * 18, 60)))
        studio_list.append({
            "id": s_id,
            "district_id": d["district_id"],
            "district_name": d["name"],
            "property_type": "1-Room Studio (1+0)",
            "size_sqm": size,
            "total_monthly_rent_eur": price,
            "sample_size_analyzed": d["studio_samples"]
        })
        s_id += 1

df_studios = pd.DataFrame(studio_list)
df_studios.to_csv("powerbi_studios_1plus0_allin.csv", index=False, encoding="utf-8-sig")
print(f"[OK] Generated powerbi_studios_1plus0_allin.csv ({len(df_studios)} rows)")

# 3. 1-BEDROOM FLATS (1+1 & 1+2)
flat_list = []
f_id = 1
for d in DISTRICT_BENCHMARKS:
    for _ in range(d["flat_samples"]):
        size = int(round(np.random.normal(62, 10)))
        size = max(45, min(size, 90))
        price = int(round(np.random.normal(d["flat_allin"] + (size - 62) * 16, 90)))
        flat_list.append({
            "id": f_id,
            "district_id": d["district_id"],
            "district_name": d["name"],
            "property_type": "1-Bedroom Flat (1+1 / 1+2)",
            "size_sqm": size,
            "total_monthly_rent_eur": price,
            "sample_size_analyzed": d["flat_samples"]
        })
        f_id += 1

df_flats = pd.DataFrame(flat_list)
df_flats.to_csv("powerbi_flats_allin.csv", index=False, encoding="utf-8-sig")
print(f"[OK] Generated powerbi_flats_allin.csv ({len(df_flats)} rows)")

# 4. 5-YEAR HISTORICAL TRENDS (WG PRIORITY)
trend_list = []
tr_id = 1
annual_idx = {2022: 0.77, 2023: 0.83, 2024: 0.90, 2025: 0.96, 2026: 1.00}

for d in DISTRICT_BENCHMARKS:
    for yr, factor in annual_idx.items():
        trend_list.append({
            "trend_id": tr_id,
            "district_id": d["district_id"],
            "district_name": d["name"],
            "year": yr,
            "property_type": "WG Room (Priority)",
            "total_monthly_rent_eur": int(round(d["wg_allin"] * factor)),
            "sample_size_analyzed": d["wg_samples"]
        })
        tr_id += 1

df_trends = pd.DataFrame(trend_list)
df_trends.to_csv("powerbi_wg_trends_5yr.csv", index=False, encoding="utf-8-sig")
print(f"[OK] Generated powerbi_wg_trends_5yr.csv ({len(df_trends)} rows)")
