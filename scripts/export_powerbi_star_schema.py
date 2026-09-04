"""
Prepares dedicated Dimension and Fact tables in CSV format for Power BI Desktop Star Schema.
Generates:
1. dim_neighborhood.csv (One row per district, Primary Key: district_id)
2. fact_listings.csv (3,250 rows, Foreign Key: district_id)
3. fact_price_trends.csv (Aggregated 5-year YoY trends, Foreign Key: district_id)
"""

import pandas as pd
import json

# 1. Load deep data and vibes
df_deep = pd.read_csv("berlin_housing_deep_5yr.csv")
with open("src/data/vibes.json", "r", encoding="utf-8") as f:
    vibes = json.load(f)

# 2. Build Dimension Table: dim_neighborhood
districts = sorted(list(vibes.keys()))
dim_records = []
district_map = {}

for idx, d_name in enumerate(districts, start=1):
    district_map[d_name] = idx
    info = vibes[d_name]
    inside_ring = d_name in ["Mitte", "Friedrichshain", "Kreuzberg", "Prenzlauer Berg", "Neukölln", "Charlottenburg", "Schöneberg", "Moabit", "Wedding"]
    
    dim_records.append({
        "district_id": idx,
        "district_name": d_name,
        "inside_ringbahn": inside_ring,
        "spati_count": info["spati_count"],
        "spati_density": info["spati_density"],
        "avg_doner_eur": info["avg_doner_eur"],
        "transit_to_alex_min": info["transit_alex_min"],
        "anmeldung_speed_wks": info["anmeldung_weeks"],
        "vibe_summary": ", ".join(info["tags"])
    })

df_dim = pd.DataFrame(dim_records)
df_dim.to_csv("powerbi_dim_neighborhood.csv", index=False, encoding="utf-8")
print(f"[OK] Generated powerbi_dim_neighborhood.csv ({len(df_dim)} districts)")

# 3. Build Fact Table: fact_listings with district_id Foreign Key
df_deep["district_id"] = df_deep["district_name"].map(district_map)
# Reorder columns with district_id upfront
fact_cols = ["listing_id", "district_id", "district_name", "borough", "inside_ringbahn", "year", 
             "listing_date", "property_type", "is_furnished", "size_sqm", "cold_rent_eur", 
             "warm_rent_eur", "effective_m2_cold"]
df_fact = df_deep[fact_cols]
df_fact.to_csv("powerbi_fact_listings.csv", index=False, encoding="utf-8")
print(f"[OK] Generated powerbi_fact_listings.csv ({len(df_fact)} listings with Foreign Key)")

# 4. Build Fact Table: fact_price_trends with district_id
df_trends = pd.read_csv("berlin_price_trends_5yr.csv")
df_trends["district_id"] = df_trends["district_name"].map(district_map)
df_trends = df_trends[["trend_id", "district_id", "district_name", "year", "property_type", "avg_warm_rent_eur", "yoy_increase_percentage"]]
df_trends.to_csv("powerbi_fact_price_trends.csv", index=False, encoding="utf-8")
print(f"[OK] Generated powerbi_fact_price_trends.csv ({len(df_trends)} trend rows)")
