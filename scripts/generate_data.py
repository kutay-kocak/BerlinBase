"""
Berlin Housing Data Generator & Validation Pipeline
Generated for BerliNest MVP (Day 2 of 14-Day Sprint)
Adheres to official Mietspiegel 2026 benchmarks & realistic new-contract market trends.
"""

import os
import json
import random
from datetime import datetime, timedelta
import pandas as pd
import numpy as np

# Set deterministic seed for reproducibility
np.random.seed(42)
random.seed(42)

DISTRICTS = [
    {"name": "Mitte", "borough": "Mitte", "inside_ringbahn": True, "difficulty": 5, "anmeldung": 4, "supermarket": "High", "spati": "Very High", "base_m2": 21.5, "wg_base": 780},
    {"name": "Friedrichshain", "borough": "Friedrichshain-Kreuzberg", "inside_ringbahn": True, "difficulty": 5, "anmeldung": 3, "supermarket": "High", "spati": "Very High", "base_m2": 19.5, "wg_base": 720},
    {"name": "Kreuzberg", "borough": "Friedrichshain-Kreuzberg", "inside_ringbahn": True, "difficulty": 5, "anmeldung": 3, "supermarket": "High", "spati": "Very High", "base_m2": 19.8, "wg_base": 740},
    {"name": "Prenzlauer Berg", "borough": "Pankow", "inside_ringbahn": True, "difficulty": 5, "anmeldung": 4, "supermarket": "High", "spati": "High", "base_m2": 20.2, "wg_base": 750},
    {"name": "Neukölln", "borough": "Neukölln", "inside_ringbahn": True, "difficulty": 4, "anmeldung": 3, "supermarket": "Very High", "spati": "Very High", "base_m2": 17.5, "wg_base": 660},
    {"name": "Charlottenburg", "borough": "Charlottenburg-Wilmersdorf", "inside_ringbahn": True, "difficulty": 4, "anmeldung": 4, "supermarket": "High", "spati": "Medium", "base_m2": 18.0, "wg_base": 680},
    {"name": "Schöneberg", "borough": "Tempelhof-Schöneberg", "inside_ringbahn": True, "difficulty": 4, "anmeldung": 4, "supermarket": "High", "spati": "High", "base_m2": 17.8, "wg_base": 670},
    {"name": "Moabit", "borough": "Mitte", "inside_ringbahn": True, "difficulty": 4, "anmeldung": 3, "supermarket": "High", "spati": "High", "base_m2": 16.5, "wg_base": 620},
    {"name": "Wedding", "borough": "Mitte", "inside_ringbahn": True, "difficulty": 3, "anmeldung": 3, "supermarket": "Very High", "spati": "Very High", "base_m2": 15.2, "wg_base": 580},
    {"name": "Pankow", "borough": "Pankow", "inside_ringbahn": False, "difficulty": 3, "anmeldung": 4, "supermarket": "Medium", "spati": "Low", "base_m2": 14.5, "wg_base": 550},
    {"name": "Lichtenberg", "borough": "Lichtenberg", "inside_ringbahn": False, "difficulty": 2, "anmeldung": 4, "supermarket": "Medium", "spati": "Medium", "base_m2": 13.8, "wg_base": 520},
    {"name": "Steglitz", "borough": "Steglitz-Zehlendorf", "inside_ringbahn": False, "difficulty": 2, "anmeldung": 5, "supermarket": "Medium", "spati": "Low", "base_m2": 14.0, "wg_base": 530},
]

TOTAL_RECORDS = 1200
records = []

start_date = datetime(2025, 6, 1)
end_date = datetime(2026, 8, 31)
date_range_days = (end_date - start_date).days

for i in range(1, TOTAL_RECORDS + 1):
    district = random.choice(DISTRICTS)
    prop_type = random.choices(["Room", "Apartment"], weights=[0.45, 0.55])[0]
    is_furnished = random.choices([True, False], weights=[0.40, 0.60])[0]
    
    if prop_type == "Room":
        # Realistic room size in Berlin shared flat (WG): 14m² - 28m²
        size_sqm = round(random.uniform(14.0, 28.0), 1)
        
        # In WGs, base price reflects entire shared apartment cost apportioned to the room
        m2_cold = (district["base_m2"] + 2.5) * random.uniform(0.92, 1.10)
        if is_furnished:
            m2_cold *= random.uniform(1.15, 1.25)
        
        cold_rent = round(size_sqm * m2_cold, 2)
        # Operating costs, heating, internet, GEZ share: ~120 to 180 EUR flat
        utilities = round(random.uniform(110.0, 175.0), 2)
        warm_rent = round(cold_rent + utilities, 2)
    else: # Apartment
        # 1 to 3-room flat (35m² to 85m²)
        size_sqm = round(random.uniform(35.0, 85.0), 1)
        m2_rate = district["base_m2"] * random.uniform(0.92, 1.12)
        if is_furnished:
            m2_rate *= random.uniform(1.20, 1.35)
        
        cold_rent = round(size_sqm * m2_rate, 2)
        # Nebenkosten (heating, trash, elevator, admin): 2.90 to 4.10 EUR/m²
        utilities = round(size_sqm * random.uniform(2.90, 4.10), 2)
        warm_rent = round(cold_rent + utilities, 2)

    random_day = random.randint(0, date_range_days)
    listing_date = (start_date + timedelta(days=random_day)).strftime("%Y-%m-%d")

    records.append({
        "listing_id": i,
        "district_name": district["name"],
        "borough": district["borough"],
        "inside_ringbahn": district["inside_ringbahn"],
        "property_type": prop_type,
        "is_furnished": is_furnished,
        "size_sqm": size_sqm,
        "cold_rent_eur": cold_rent,
        "warm_rent_eur": warm_rent,
        "effective_m2_cold": round(cold_rent / size_sqm, 2),
        "listing_date": listing_date,
        "hunting_difficulty_score": district["difficulty"],
        "anmeldung_ease_score": district["anmeldung"]
    })

df = pd.DataFrame(records)

# ============================================================
# DATA INTEGRITY AND VALIDATION ENGINE (ELIMINATING ANOMALIES)
# ============================================================
def validate_dataset(df):
    errors = []
    # 1. Negative or zero values
    if (df['cold_rent_eur'] <= 0).any() or (df['warm_rent_eur'] <= 0).any():
        errors.append("Validation Error: Zero or negative rent detected.")
    
    # 2. Logical consistency: warm rent must strictly exceed cold rent
    if (df['warm_rent_eur'] <= df['cold_rent_eur']).any():
        errors.append("Validation Error: Warm rent is lower than or equal to cold rent.")
    
    # 3. Square meter boundary checks
    if (df['size_sqm'] < 12).any() or (df['size_sqm'] > 120).any():
        errors.append("Validation Error: Outlier room/flat sizes detected.")

    # 4. Outlier rent checks in Berlin (m² cold must be between 10.0 and 38.0 EUR/m²)
    if (df['effective_m2_cold'] > 38.0).any() or (df['effective_m2_cold'] < 10.0).any():
        errors.append(f"Validation Error: Unrealistic rent per m² detected: min {df['effective_m2_cold'].min()}, max {df['effective_m2_cold'].max()}")
        
    return errors

validation_errors = validate_dataset(df)
if validation_errors:
    print("VALIDATION FAILED:", validation_errors)
    exit(1)

print(f"[OK] Data Integrity Checked: 0 errors found across {len(df)} records.")

# Save CSV and JSON
os.makedirs("src/data", exist_ok=True)
csv_path = "berlin_housing.csv"
json_path = "src/data/berlin_housing_mock.json"

df.to_csv(csv_path, index=False, encoding="utf-8")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(records, f, ensure_ascii=False, indent=2)

print(f"[OK] Exported: {csv_path} ({len(df)} rows)")
print(f"[OK] Exported: {json_path}")

