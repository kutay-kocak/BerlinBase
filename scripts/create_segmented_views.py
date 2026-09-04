"""
Creates segmented clean summary tables and SQL views:
1. WG Rooms (Single shared rooms)
2. 1-Room Studios (1+0 Studio flats)
3. 1-Bedroom Flats (1+1 Flats)
4. 2-Bedroom Flats (1+2 Flats)
Each with its own distinct integer rent and sample counts.
"""

import psycopg2
import pandas as pd

conn = psycopg2.connect(host="localhost", port=5432, user="postgres", password="admin", dbname="berlinbase_db")
cur = conn.cursor()

# 1. Create dedicated SQL Views in PostgreSQL for each apartment type
cur.execute("""
-- 1. WG Rooms Summary View
CREATE OR REPLACE VIEW v_wg_rooms_summary AS
SELECT 
    d.district_name,
    d.district_id,
    'WG Room' AS room_category,
    ROUND(AVG(f.total_monthly_rent_eur))::INTEGER AS average_monthly_rent_eur,
    COUNT(*)::INTEGER AS sample_count
FROM fact_rentals f
JOIN dim_district d ON f.district_id = d.district_id
WHERE f.property_type = 'WG Room'
GROUP BY d.district_name, d.district_id
ORDER BY average_monthly_rent_eur DESC;

-- 2. 1-Room Studio (1+0) Summary View
CREATE OR REPLACE VIEW v_studio_1plus0_summary AS
SELECT 
    d.district_name,
    d.district_id,
    '1-Room Studio (1+0)' AS room_category,
    ROUND(AVG(f.total_monthly_rent_eur))::INTEGER AS average_monthly_rent_eur,
    COUNT(*)::INTEGER AS sample_count
FROM fact_rentals f
JOIN dim_district d ON f.district_id = d.district_id
WHERE f.property_type = '1-Room Studio (1+0)'
GROUP BY d.district_name, d.district_id
ORDER BY average_monthly_rent_eur DESC;

-- 3. 1-Bedroom Flat (1+1) Summary View
CREATE OR REPLACE VIEW v_flat_1plus1_summary AS
SELECT 
    d.district_name,
    d.district_id,
    '1-Bedroom Flat (1+1 / 1+2)' AS room_category,
    ROUND(AVG(f.total_monthly_rent_eur))::INTEGER AS average_monthly_rent_eur,
    COUNT(*)::INTEGER AS sample_count
FROM fact_rentals f
JOIN dim_district d ON f.district_id = d.district_id
WHERE f.property_type = '1-Bedroom Flat (1+1 / 1+2)'
GROUP BY d.district_name, d.district_id
ORDER BY average_monthly_rent_eur DESC;

-- 4. Master Property Comparison View (Directly feedable to charts with slicer)
CREATE OR REPLACE VIEW v_rentals_by_room_type AS
SELECT 
    d.district_name,
    d.district_id,
    f.property_type AS room_category,
    ROUND(AVG(f.total_monthly_rent_eur))::INTEGER AS average_monthly_rent_eur,
    COUNT(*)::INTEGER AS sample_count
FROM fact_rentals f
JOIN dim_district d ON f.district_id = d.district_id
GROUP BY d.district_name, d.district_id, f.property_type
ORDER BY d.district_name, room_category;
""")

conn.commit()

# Export them also to ready-made CSVs in case user prefers direct file import
df_master = pd.read_sql("SELECT * FROM v_rentals_by_room_type", conn)
df_master.to_csv("powerbi_rentals_by_room_type.csv", index=False, encoding="utf-8-sig")

conn.close()
print("[OK] Separated Room Categories in PostgreSQL Views and exported powerbi_rentals_by_room_type.csv")
