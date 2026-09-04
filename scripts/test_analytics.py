"""
DuckDB In-Memory Analytical Execution Script
Runs the PostgreSQL analytical queries directly against the generated 3,250-row CSV file.
Validates Window Functions (LAG, DENSE_RANK, CTEs) with real data.
"""

import duckdb
import pandas as pd

con = duckdb.connect(database=':memory:')

# Load the deep 5-year dataset into DuckDB virtual table
con.execute("""
    CREATE TABLE listings AS 
    SELECT * FROM read_csv_auto('berlin_housing_deep_5yr.csv');
""")

print("="*70)
print("1. QUERY: TOP EXPENSIVE DISTRICTS BY PROPERTY TYPE (DENSE_RANK WINDOW FUNCTION)")
print("="*70)
res1 = con.execute("""
    SELECT 
        district_name,
        property_type,
        ROUND(AVG(warm_rent_eur), 2) AS avg_warm_rent,
        ROUND(AVG(effective_m2_cold), 2) AS avg_cold_m2,
        DENSE_RANK() OVER (
            PARTITION BY property_type 
            ORDER BY AVG(warm_rent_eur) DESC
        ) AS expense_rank
    FROM listings
    WHERE year = 2026
    GROUP BY district_name, property_type
    ORDER BY property_type, expense_rank
    LIMIT 10;
""").df()
print(res1.to_string(index=False))

print("\n" + "="*70)
print("2. QUERY: 5-YEAR YoY RENT GROWTH USING LAG() WINDOW FUNCTION (SAMPLE: MITTE & NEUKÖLLN)")
print("="*70)
res2 = con.execute("""
    WITH yearly_rents AS (
        SELECT 
            district_name,
            property_type,
            year,
            ROUND(AVG(warm_rent_eur), 2) AS avg_warm_rent
        FROM listings
        WHERE district_name IN ('Mitte', 'Neukölln')
        GROUP BY district_name, property_type, year
    )
    SELECT 
        district_name,
        property_type,
        year,
        avg_warm_rent,
        LAG(avg_warm_rent, 1) OVER (
            PARTITION BY district_name, property_type 
            ORDER BY year
        ) AS prev_year_rent,
        ROUND(
            ((avg_warm_rent - LAG(avg_warm_rent, 1) OVER (PARTITION BY district_name, property_type ORDER BY year)) 
            / LAG(avg_warm_rent, 1) OVER (PARTITION BY district_name, property_type ORDER BY year)) * 100, 
            2
        ) AS yoy_growth_pct
    FROM yearly_rents
    ORDER BY district_name, property_type, year;
""").df()
print(res2.to_string(index=False))

print("\n" + "="*70)
print("3. QUERY: ROOM (WG) VS. APARTMENT M² SPREAD & PREMIUM (2026 CTE ANALYSIS)")
print("="*70)
res3 = con.execute("""
    WITH m2_summary AS (
        SELECT 
            district_name,
            inside_ringbahn,
            property_type,
            AVG(effective_m2_cold) AS avg_m2
        FROM listings
        WHERE year = 2026
        GROUP BY district_name, inside_ringbahn, property_type
    )
    SELECT 
        r.district_name,
        r.inside_ringbahn,
        ROUND(r.avg_m2, 2) AS room_m2_eur,
        ROUND(a.avg_m2, 2) AS apt_m2_eur,
        ROUND(r.avg_m2 - a.avg_m2, 2) AS room_premium_m2,
        ROUND(((r.avg_m2 - a.avg_m2) / a.avg_m2) * 100, 1) AS room_premium_pct
    FROM m2_summary r
    JOIN m2_summary a ON r.district_name = a.district_name AND a.property_type = 'Apartment'
    WHERE r.property_type = 'Room'
    ORDER BY room_premium_pct DESC;
""").df()
print(res3.to_string(index=False))
