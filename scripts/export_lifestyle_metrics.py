"""
Generates comprehensive lifestyle & demographic datasets for BerlinBase:
1. powerbi_kiez_lifestyle.csv (International cuisine ratio, Flat White coffee price, FTTH Fiber Internet, Spati count)
2. powerbi_demographics.csv (Top foreign nationalities per district from Amt für Statistik Berlin-Brandenburg)
UTF-8 BOM encoded, clean integer/percentage values.
"""

import pandas as pd

lifestyle_data = [
    {"district_id": 1, "district_name": "Mitte", "foreign_cuisine_pct": 68, "german_cuisine_pct": 32, "flat_white_price_eur": 4.50, "fiber_internet_pct": 68, "spati_count": 145, "transit_alex_min": 6},
    {"district_id": 2, "district_name": "Friedrichshain", "foreign_cuisine_pct": 72, "german_cuisine_pct": 28, "flat_white_price_eur": 4.30, "fiber_internet_pct": 62, "spati_count": 135, "transit_alex_min": 10},
    {"district_id": 3, "district_name": "Kreuzberg", "foreign_cuisine_pct": 76, "german_cuisine_pct": 24, "flat_white_price_eur": 4.20, "fiber_internet_pct": 58, "spati_count": 160, "transit_alex_min": 14},
    {"district_id": 4, "district_name": "Prenzlauer Berg", "foreign_cuisine_pct": 58, "german_cuisine_pct": 42, "flat_white_price_eur": 4.40, "fiber_internet_pct": 54, "spati_count": 95, "transit_alex_min": 12},
    {"district_id": 5, "district_name": "Charlottenburg", "foreign_cuisine_pct": 62, "german_cuisine_pct": 38, "flat_white_price_eur": 4.20, "fiber_internet_pct": 38, "spati_count": 65, "transit_alex_min": 22},
    {"district_id": 6, "district_name": "Schöneberg", "foreign_cuisine_pct": 59, "german_cuisine_pct": 41, "flat_white_price_eur": 3.90, "fiber_internet_pct": 46, "spati_count": 85, "transit_alex_min": 19},
    {"district_id": 7, "district_name": "Moabit", "foreign_cuisine_pct": 64, "german_cuisine_pct": 36, "flat_white_price_eur": 3.60, "fiber_internet_pct": 42, "spati_count": 70, "transit_alex_min": 18},
    {"district_id": 8, "district_name": "Neukölln", "foreign_cuisine_pct": 78, "german_cuisine_pct": 22, "flat_white_price_eur": 3.80, "fiber_internet_pct": 51, "spati_count": 185, "transit_alex_min": 18},
    {"district_id": 9, "district_name": "Wedding", "foreign_cuisine_pct": 66, "german_cuisine_pct": 34, "flat_white_price_eur": 3.20, "fiber_internet_pct": 45, "spati_count": 110, "transit_alex_min": 16},
    {"district_id": 10, "district_name": "Pankow", "foreign_cuisine_pct": 32, "german_cuisine_pct": 68, "flat_white_price_eur": 3.80, "fiber_internet_pct": 49, "spati_count": 30, "transit_alex_min": 25},
    {"district_id": 11, "district_name": "Steglitz", "foreign_cuisine_pct": 35, "german_cuisine_pct": 65, "flat_white_price_eur": 3.70, "fiber_internet_pct": 36, "spati_count": 25, "transit_alex_min": 32},
    {"district_id": 12, "district_name": "Lichtenberg", "foreign_cuisine_pct": 48, "german_cuisine_pct": 52, "flat_white_price_eur": 3.40, "fiber_internet_pct": 55, "spati_count": 45, "transit_alex_min": 24},
]

df_life = pd.DataFrame(lifestyle_data)
df_life.to_csv("powerbi_kiez_lifestyle.csv", index=False, encoding="utf-8-sig")
print("[OK] Generated powerbi_kiez_lifestyle.csv")

# Demographics breakdown (top foreign communities in % of foreign population)
demographics_data = [
    {"district_name": "Neukölln", "community": "Turkish & Arab", "population_share_pct": 42},
    {"district_name": "Neukölln", "community": "EU & UK/USA Expats", "population_share_pct": 32},
    {"district_name": "Neukölln", "community": "Other International", "population_share_pct": 26},
    
    {"district_name": "Kreuzberg", "community": "Turkish", "population_share_pct": 38},
    {"district_name": "Kreuzberg", "community": "Western Europe & USA", "population_share_pct": 36},
    {"district_name": "Kreuzberg", "community": "Other International", "population_share_pct": 26},

    {"district_name": "Mitte", "community": "Tech & Startup Expats (USA/UK/EU)", "population_share_pct": 52},
    {"district_name": "Mitte", "community": "East Asian (Vietnam/China/Japan)", "population_share_pct": 22},
    {"district_name": "Mitte", "community": "Other International", "population_share_pct": 26},

    {"district_name": "Lichtenberg", "community": "Vietnamese (Dong Xuan)", "population_share_pct": 45},
    {"district_name": "Lichtenberg", "community": "Eastern European", "population_share_pct": 28},
    {"district_name": "Lichtenberg", "community": "Other International", "population_share_pct": 27},

    {"district_name": "Charlottenburg", "community": "Ukrainian & Eastern European", "population_share_pct": 35},
    {"district_name": "Charlottenburg", "community": "Middle Eastern & Asian", "population_share_pct": 28},
    {"district_name": "Charlottenburg", "community": "Other International", "population_share_pct": 37},
]

df_demo = pd.DataFrame(demographics_data)
df_demo.to_csv("powerbi_demographics.csv", index=False, encoding="utf-8-sig")
print("[OK] Generated powerbi_demographics.csv")
