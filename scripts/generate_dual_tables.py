"""
Dual-Table Architecture for BerlinBase:
Rule: Whenever detailed listing/financial data is produced:
Table 1: Deep raw dataset (3,760+ rows with all variance for statistical depth and records).
Table 2: Clean aggregated summary table calculated directly from Table 1 with strict rounded integer euros and integer sample counts.
Ensures zero-decimal, perfectly formatted charts in Power BI without relying on client-side DAX rounding.
"""

import pandas as pd
import numpy as np

# Load Table 1 (Deep Raw Data)
df_wg_raw = pd.read_csv("powerbi_wg_rooms_allin.csv", encoding="utf-8-sig")

# Generate Table 2 (Clean Integer Summary directly derived from Table 1)
summary = df_wg_raw.groupby("district_name").agg(
    district_id=("district_id", "first"),
    average_monthly_rent_eur=("total_monthly_rent_eur", lambda x: int(round(x.mean()))),
    total_listings_analyzed=("id", "count")
).reset_index()

# Sort by rent descending for instant optimal charting
summary = summary.sort_values(by="average_monthly_rent_eur", ascending=False)

# Export Table 2 with UTF-8 BOM
summary_csv = "powerbi_wg_summary.csv"
summary.to_csv(summary_csv, index=False, encoding="utf-8-sig")
print(f"[OK] Generated Clean Summary Table 2: {summary_csv}")
print(summary.to_string(index=False))
