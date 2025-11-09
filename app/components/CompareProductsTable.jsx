"use client";

import React, { useEffect, useState } from "react";
import { fetchLAS, fetchLAMF, fetchMTF } from "../../lib/fetchData";

export default function CompareProductsTable({ productType }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let rows;

        if (productType.toLowerCase() === "las") rows = await fetchLAS();
        else if (productType.toLowerCase() === "lamf") rows = await fetchLAMF();
        else rows = await fetchMTF();

        const clean = rows.map((d) => ({
          id: d.id,
          name:
            d["institution_name"] ||
            d["Financial Institution"] ||
            d["Institution Name"] ||
            d["Name"] ||
            "—",

          approvedStocks:
            d["approved_funds"] || // ✅ LAMF support
            d["approved_shares"] ||
            d["Approved List of Shares"] ||
            d["Approved Stocks"] ||
            d["Approved List of MF"] ||
            "—",

          cost_first_year: d["cost_first_year"] ?? null,
          cost_second_year: d["cost_second_year"] ?? null,

          interestMin: d?.interest_rate?.min ?? "—",
          interestMax: d?.interest_rate?.max ?? "—",
        }));

        const filtered = clean.filter((r) =>
          ["bajaj", "sbi", "mirae asset"].includes(r.name.trim().toLowerCase())
        );

        setData(filtered);
      } catch (err) {
        console.error("compare table supabase error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [productType]);

  if (loading) {
    return (
      <div className="p-6 text-center text-slate-200 bg-white/10 rounded-2xl">
        Loading data...
      </div>
    );
  }

  return (
    <div className="bg-white/20 rounded-2xl border border-white/20 backdrop-blur-md shadow-lg p-6 overflow-x-auto">
      <h3 className="text-xl font-bold mb-4 text-black text-center">
        {productType.toUpperCase()} Comparison
      </h3>

      <table className="w-full border-collapse text-slate-800 text-sm sm:text-base">
        <thead>
          <tr className="bg-white/10">
            <th className="px-4 py-3 border-b text-left">
              Financial Institution
            </th>
            <th className="px-4 py-3 border-b text-center">
              Cost - 1st Year Amt
            </th>
            <th className="px-4 py-3 border-b text-center">
              Cost - 2nd Year Amt
            </th>
            <th className="px-4 py-3 border-b text-center">Interest Min</th>
            <th className="px-4 py-3 border-b text-center">Interest Max</th>

            <th className="px-4 py-3 border-b text-left">
              Approved List of MF
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-[#B1ED67] hover:shadow-lg transition-colors duration-200"
            >
              <td className="px-4 py-3 border-b">{row.name}</td>

              <td className="px-4 py-3 border-b text-center">
                {row.cost_first_year ? (
                  <div className="flex flex-col gap-0.5">
                    <div>Percent: {row.cost_first_year.percent ?? "—"}</div>
                    <div>Amount: ₹{row.cost_first_year.amount ?? "—"}</div>
                  </div>
                ) : (
                  "—"
                )}
              </td>

              <td className="px-4 py-3 border-b text-center">
                {row.cost_second_year ? (
                  <div className="flex flex-col gap-0.5">
                    <div>Percent: {row.cost_second_year.percent ?? "—"}</div>
                    <div>Amount: ₹{row.cost_second_year.amount ?? "—"}</div>
                  </div>
                ) : (
                  "—"
                )}
              </td>

              <td className="px-4 py-3 border-b text-center text-teal-400 font-semibold">
                {row.interestMin}
              </td>

              <td className="px-4 py-3 border-b text-center text-pink-400 font-semibold">
                {row.interestMax}
              </td>

              <td className="px-4 py-3 border-b">{row.approvedStocks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
