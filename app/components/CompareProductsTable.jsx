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

        const clean = rows.map((d) => {
          if (productType.toLowerCase() === "mtf") {
            return {
              id: d.id,
              name: d.broker_name || "—",
              CostSummary: d.cost_summary || null,
              marginRequirement: d.margin_requirement || "—",
              approvedStocks: d.approved_stocks || "—",
            };
          }

          return {
            id: d.id,
            name:
              d["institution_name"] ||
              d["Financial Institution"] ||
              d["Institution Name"] ||
              d["Name"] ||
              "—",

            approvedStocks:
              d["approved_funds"] ||
              d["approved_shares"] ||
              d["Approved List of Shares"] ||
              d["Approved Stocks"] ||
              d["Approved List of MF"] ||
              "—",

            cost_first_year: d["cost_first_year"] ?? null,
            cost_second_year: d["cost_second_year"] ?? null,

            interestMin: d?.interest_rate?.min ?? "—",
            interestMax: d?.interest_rate?.max ?? "—",
          };
        });

        const filtered = clean.filter((r) =>
          [
            "bajaj",
            "sbi",
            "mirae asset",
            "kotak - trade free youth plan",
            "hdfc sky",
            "dhan",
          ].includes((r.name || "").trim().toLowerCase())
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
      <div className="p-6 text-center text-slate-800 bg-white/40 backdrop-blur-xl rounded-2xl border border-[#2B7146]/30 shadow-md">
        Loading data...
      </div>
    );
  }

  return (
    <div className="bg-[#aff3c9]/40 bg-opacity-60 rounded-2xl border border-[#2B7146]/25 backdrop-blur-md shadow-xl p-6 overflow-x-auto">
      
      {/* Title */}
      <div className="w-full flex justify-center mb-6">
        <div className="px-7 py-2 rounded-full bg-white shadow border border-[#2B7146]/40 font-semibold text-lg text-black
        bg-gradient-to-b from-white to-[#f2fff4]">
          {productType.toUpperCase()} Comparison
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[500px]">
        <table className="w-full text-[15px] sm:text-[16px] border border-[#2B7146]/40 rounded-xl bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)]">
          
          {/* HEADER */}
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#2B7146] text-white bg-gradient-to-b from-[#2B7146] to-[#255e3d]">
              <th className="px-5 py-3 text-left border-r border-[#ffffff25]">
                {productType.toLowerCase() === "mtf"
                  ? "Broker"
                  : "Financial Institution"}
              </th>

              {productType.toLowerCase() !== "mtf" && (
                <>
                  <th className="px-5 py-3 text-center border-r border-[#ffffff25]">1st Year Cost</th>
                  <th className="px-5 py-3 text-center border-r border-[#ffffff25]">2nd Year Cost</th>
                  <th className="px-5 py-3 text-center border-r border-[#ffffff25]">Interest Min</th>
                  <th className="px-5 py-3 text-center border-r border-[#ffffff25]">Interest Max</th>
                </>
              )}

              {productType.toLowerCase() === "mtf" && (
                <>
                  <th className="px-5 py-3 text-left border-r border-[#ffffff25]">Cost Summary</th>
                  <th className="px-5 py-3 text-left border-r border-[#ffffff25]">Margin Requirement</th>
                </>
              )}

              <th className="px-5 py-3 text-center">Approved Stocks</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="transition-all hover:bg-[#f3ffef] border-t border-[#2B7146]/10 hover:shadow-sm"
              >
                <td className="px-5 py-4 font-semibold text-[#124326] border-r border-[#2B7146]/10">
                  {row.name}
                </td>

                {productType.toLowerCase() !== "mtf" && (
                  <>
                    {/* 1st Year */}
                    <td className="px-5 py-4 text-center font-medium border-r border-[#2B7146]/10">
                      {row.cost_first_year ? (
                        <div className="space-y-1">
                          <span className="font-semibold text-[#34724A] text-[16px]">
                            {row.cost_first_year.percent ?? "—"}%
                          </span>
                          <div className="text-xs text-gray-600">
                            ₹{row.cost_first_year.amount}
                          </div>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* 2nd Year */}
                    <td className="px-5 py-4 text-center font-medium border-r border-[#2B7146]/10">
                      {row.cost_second_year ? (
                        <div className="space-y-1">
                          <span className="font-semibold text-[#34724A] text-[16px]">
                            {row.cost_second_year.percent ?? "—"}%
                          </span>
                          <div className="text-xs text-gray-600">
                            ₹{row.cost_second_year.amount}
                          </div>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>

                    <td className="px-5 py-4 text-center font-semibold text-[#0C8066] text-[16px] border-r border-[#2B7146]/10">
                      {row.interestMin}
                    </td>

                    <td className="px-5 py-4 text-center font-semibold text-[#D3558C] text-[16px] border-r border-[#2B7146]/10">
                      {row.interestMax}
                    </td>
                  </>
                )}

                {/* MTF */}
                {productType.toLowerCase() === "mtf" && (
                  <>
                    <td className="px-5 py-4 text-[15px] border-r border-[#2B7146]/10">
                      {row.CostSummary
                        ? Object.entries(row.CostSummary).map(([k, v], i) => (
                            <div key={i} className="font-medium">{`${k}: ${v ?? "—"}`}</div>
                          ))
                        : "—"}
                    </td>

                    <td className="px-5 py-4 text-[15px] border-r border-[#2B7146]/10">
                      {row.marginRequirement}
                    </td>
                  </>
                )}

                <td className="px-5 py-4 text-center font-medium text-[16px]">
                  {row.approvedStocks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Read More */}
      <div className="w-full flex justify-center mt-6">
        <a
          href={`/products/${productType.toLowerCase()}`}
          className="px-6 py-2 bg-[#2B7146] hover:bg-[#245d3b] border border-[#2B7146]/40 text-white font-semibold rounded-full shadow-md transition-all"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
