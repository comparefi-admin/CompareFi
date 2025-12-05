"use client";

import React, { useEffect, useState } from "react";
import { fetchLAS, fetchLAMF, fetchMTF } from "../../lib/fetchData";

/* Utility: Handle null/undefined values */
const renderValue = (value) =>
  value === null || value === undefined || value === "" ? "—" : value;

const ACCENT_COLOR = "text-green-700";
const ACCENT_BG = "bg-green-600 hover:bg-green-700";

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
    <div className="bg-white rounded-xl shadow-lg shadow-gray-200/20 p-6 md:p-8 max-w-full transition-all duration-500 mx-auto border-2 border-[#2b7146] hover:shadow-[0_16px_38px_rgba(0,0,0,0.26),0_6px_18px_rgba(0,0,0,0.08)]">
      {/* Title */}
      <div className="w-full flex justify-center mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
          {productType.toUpperCase()} Comparison
        </h2>
      </div>

      {/* Table (NO SCROLL ANYMORE) */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <table className="w-full table-fixed divide-y divide-gray-200 text-sm sm:text-base">
          <thead>
  <tr>

    {/* Column 1 */}
    <th
      style={{ background: "#124434", color: "#FFFFFF" }}
      className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider border-r border-gray-200"
    >
      {productType.toLowerCase() === "mtf"
        ? "Broker"
        : "Financial Institution"}
    </th>

    {/* Non-MTF Columns */}
    {productType.toLowerCase() !== "mtf" && (
      <>
        <th
          style={{ background: "#124434", color: "#FFFFFF" }}
          className="px-4 py-3 text-sm text-center font-semibold uppercase tracking-wider border-r border-gray-200"
        >
          1st Year Cost
        </th>

        <th
          style={{ background: "#124434", color: "#FFFFFF" }}
          className="px-4 py-3 text-sm text-center font-semibold uppercase tracking-wider border-r border-gray-200"
        >
          2nd Year Cost
        </th>

        <th
          style={{ background: "#124434", color: "#FFFFFF" }}
          className="px-4 py-3 text-sm text-center font-semibold uppercase tracking-wider border-r border-gray-200"
        >
          Min Interest
        </th>

        <th
          style={{ background: "#124434", color: "#FFFFFF" }}
          className="px-4 py-3 text-sm text-center font-semibold uppercase tracking-wider"
        >
          Max Interest
        </th>
      </>
    )}

    {/* MTF Columns */}
    {productType.toLowerCase() === "mtf" && (
      <>
        <th
          style={{ background: "#124434", color: "#FFFFFF" }}
          className="px-4 py-3 text-left font-semibold uppercase tracking-wider border-r border-gray-200"
        >
          Cost Summary
        </th>
        <th
          style={{ background: "#124434", color: "#FFFFFF" }}
          className="px-4 py-3 text-left font-semibold uppercase tracking-wider border-r border-gray-200"
        >
          Margin Requirement
        </th>
      </>
    )}

    {/* Approved Assets */}
    <th
      style={{ background: "#124434", color: "#FFFFFF" }}
      className="px-4 py-3 text-center font-semibold uppercase tracking-wider text-sm"
    >
      Approved Assets
    </th>

  </tr>
</thead>


          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer hover:shadow-md hover:z-20 transform hover:scale-[1.005] active:bg-gray-200"
              >
                <td className="px-4 py-4 font-medium text-gray-800 border-r border-gray-100">
                  {renderValue(row.name)}
                </td>

                {productType.toLowerCase() !== "mtf" && (
                  <>
                    <td className="px-4 py-4 text-center border-r border-gray-100">
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

                    <td className="px-4 py-4 text-center border-r border-gray-100">
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

                    <td className="px-4 py-4 text-center font-bold text-lg text-green-600 border-r border-gray-100">
                      {renderValue(row.interestMin)}
                    </td>

                    <td className="px-4 py-4 text-center font-bold text-lg text-gray-600">
                      {renderValue(row.interestMax)}
                    </td>
                  </>
                )}

                {productType.toLowerCase() === "mtf" && (
                  <>
                    <td className="px-4 py-4 text-sm text-gray-600 border-r border-gray-100">
                      {row.CostSummary
                        ? Object.entries(row.CostSummary).map(([k, v], i) => (
                            <div key={i}>
                              <span className="text-gray-900 font-semibold">
                                {k}:
                              </span>{" "}
                              {renderValue(v)}
                            </div>
                          ))
                        : "—"}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600 border-r border-gray-100">
                      {renderValue(row.marginRequirement)}
                    </td>
                  </>
                )}

                <td className="px-4 py-4 text-center font-medium text-gray-700">
                  {renderValue(row.approvedStocks)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button */}
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
