"use client";

import React, { useEffect, useState } from "react";
import { fetchLAS, fetchLAMF, fetchMTF } from "../../lib/fetchData"; // Assuming this path is correct

/**
 * Utility function to render a dash for null/empty values.
 * @param {any} value - The value to check.
 * @returns {string} - The value or '—'.
 */
const renderValue = (value) => (value === null || value === undefined || value === "") ? "—" : value;

// Define a consistent, professional accent color
const ACCENT_COLOR = 'text-green-700'; 
const ACCENT_BG = 'bg-green-600 hover:bg-green-700';

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
      <div className="p-8 text-center text-gray-700 bg-white shadow-lg rounded-xl border border-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-3"></div>
        <p>Loading comparison data...</p>
      </div>
    );
  }

  return (
    // Outer Container: Clean white card with subtle shadow
    <div className="bg-white rounded-xl shadow-lg shadow-gray-200/50 shadow-inner p-6 md:p-8 max-w-full mx-auto">
      
      {/* Title */}
      <div className="w-full flex justify-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          {productType.toUpperCase()} Comparison
        </h2>
      </div>

      {/* Table Container: Added a stronger border and rounded corners */}
      <div className="overflow-x-auto max-h-[600px] border border-gray-300 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          
          {/* HEADER */}
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-5 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider w-1/5 min-w-[150px] border-r border-gray-200">
                {productType.toLowerCase() === "mtf"
                  ? "Broker"
                  : "Financial Institution"}
              </th>

              {productType.toLowerCase() !== "mtf" && (
                <>
                  <th className="px-5 py-3 text-center font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">1st Year Cost</th>
                  <th className="px-5 py-3 text-center font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">2nd Year Cost</th>
                  <th className="px-5 py-3 text-center font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">Min Interest</th>
                  <th className="px-5 py-3 text-center font-semibold text-gray-700 uppercase tracking-wider">Max Interest</th>
                </>
              )}

              {productType.toLowerCase() === "mtf" && (
                <>
                  <th className="px-5 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider w-1/3 border-r border-gray-200">Cost Summary</th>
                  <th className="px-5 py-3 text-left font-semibold text-gray-700 uppercase tracking-wider w-1/4 border-r border-gray-200">Margin Requirement</th>
                </>
              )}

              <th className="px-5 py-3 text-center font-semibold text-gray-700 uppercase tracking-wider">
                Approved Assets
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((row) => (
              <tr
                key={row.id}
                // UPDATED HOVER EFFECT: More noticeable background, subtle lift, and active press state
                className="hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer hover:shadow-md hover:z-20 transform hover:scale-[1.005] active:bg-gray-200"
              >
                {/* Institution Name */}
                <td className="px-5 py-4 whitespace-nowrap font-medium text-gray-800 border-r border-gray-100">
                  {renderValue(row.name)}
                </td>

                {productType.toLowerCase() !== "mtf" && (
                  <>
                    {/* 1st Year Cost */}
                    <td className="px-5 py-4 text-center border-r border-gray-100">
                      {row.cost_first_year ? (
                        <div className="space-y-0.5">
                          <span className={`font-bold text-lg ${ACCENT_COLOR}`}>
                            {renderValue(row.cost_first_year.percent)}%
                          </span>
                          <div className="text-xs text-gray-500">
                            ₹{renderValue(row.cost_first_year.amount)}
                          </div>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* 2nd Year Cost */}
                    <td className="px-5 py-4 text-center border-r border-gray-100">
                      {row.cost_second_year ? (
                        <div className="space-y-0.5">
                          <span className={`font-bold text-lg ${ACCENT_COLOR}`}>
                            {renderValue(row.cost_second_year.percent)}%
                          </span>
                          <div className="text-xs text-gray-500">
                            ₹{renderValue(row.cost_second_year.amount)}
                          </div>
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* Interest Min */}
                    <td className="px-5 py-4 text-center font-bold text-lg text-green-600 border-r border-gray-100">
                      {renderValue(row.interestMin)}
                    </td>

                    {/* Interest Max */}
                    <td className="px-5 py-4 text-center font-bold text-lg text-gray-600">
                      {renderValue(row.interestMax)}
                    </td>
                  </>
                )}

                {/* MTF Fields */}
                {productType.toLowerCase() === "mtf" && (
                  <>
                    {/* Cost Summary */}
                    <td className="px-5 py-4 text-sm text-gray-600 border-r border-gray-100">
                      {row.CostSummary
                        ? Object.entries(row.CostSummary).map(([k, v], i) => (
                              <div key={i} className="font-regular">
                                <span className="text-gray-900 font-semibold">{k}:</span> {renderValue(v)}
                              </div>
                          ))
                        : "—"}
                    </td>

                    {/* Margin Requirement */}
                    <td className="px-5 py-4 text-sm text-gray-600 border-r border-gray-100">
                      <span className="font-medium text-gray-900">{renderValue(row.marginRequirement)}</span>
                    </td>
                  </>
                )}

                {/* Approved Stocks/Funds */}
                <td className="px-5 py-4 text-center font-medium text-gray-700">
                  {renderValue(row.approvedStocks)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Read More Button: Simple, professional fill */}
      <div className="w-full flex justify-center mt-8">
        <a
          href={`/products/${productType.toLowerCase()}`}
          className={`px-8 py-3 ${ACCENT_BG} text-white font-semibold rounded-full shadow-md transition duration-200 text-sm uppercase tracking-wider`}
        >
          View All {productType.toUpperCase()}
        </a>
      </div>
    </div>
  );
}