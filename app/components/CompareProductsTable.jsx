"use client";

import React, { useEffect, useState } from "react";
import { fetchLAS, fetchLAMF, fetchMTF } from "../../lib/fetchData";

const renderValue = (value) =>
  value === null || value === undefined || value === "" ? "—" : value;

export default function CompareProductsTable({ productType }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const type = productType.toLowerCase();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let rows =
          type === "las"
            ? await fetchLAS()
            : type === "lamf"
            ? await fetchLAMF()
            : await fetchMTF();

        const clean = rows.map((d) => {
          if (type === "mtf") {
            return {
              id: d.id,
              name: d.broker_name ?? "—",
              cost_summary: d.cost_summary ?? null,
              margin_requirement: d.margin_requirement ?? "—",
              approved_assets: d.approved_stocks ?? "—",
            };
          }

          if (type === "lamf") {
            return {
              id: d.id,
              name: d.institution_name ?? "—",
              cost_first_year: d.cost_first_year ?? null,
              cost_second_year: d.cost_second_year ?? null,
              approved_assets: d.approved_funds ?? "—",
              regularization_period: d.regularization_period ?? "—",
              loan_debt: d.loan_debt ?? null,
              loan_equity: d.loan_equity ?? null,
              ltv: d.ltv ?? null,
            };
          }

          return {
            id: d.id,
            name: d.institution_name ?? "—",
            cost_first_year: d.cost_first_year ?? null,
            cost_second_year: d.cost_second_year ?? null,
            approved_assets: d.approved_shares ?? "—",
            regularization_period: d.regularization_period ?? "—",
            ltv: d.ltv ?? null,
          };
        });

        const filterNames =
          type === "las"
            ? ["mirae asset", "zerodha", "kotak", "bajaj"]
            : type === "lamf"
            ? ["bank of baroda", "mirae asset", "kotak", "sbi"]
            : ["kotak", "kotak - trade free youth plan", "hdfc sky", "dhan"];

        const filtered = clean.filter((r) =>
          filterNames.includes((r.name || "").trim().toLowerCase())
        );

        setData(filtered);
      } catch (err) {
        console.error("Comparison Table Error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [type]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-700 bg-white rounded-xl shadow">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mx-auto border-2 border-[#2b7146]">
      {/* ---------------- HIGHLIGHT STYLE BLOCK ---------------- */}
      <style jsx>{`
        .highlight-col {
          position: relative;
          background: linear-gradient(
            180deg,
            rgba(242, 255, 245, 0.92),
            rgba(225, 245, 230, 0.85)
          );
          border-radius: 14px;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.06);
          transition: 0.25s ease;
        }

        .highlight-col:hover {
          background: rgba(210, 240, 215, 0.9);
          transform: translateY(-2px);
        }

        /* REMOVE DECORATIVE LEFT LINE */
        .highlight-col::before,
        .highlight-head::before {
          content: none !important;
        }

        .highlight-head {
          border-radius: 14px;
        }

        .row-hover:hover td {
          background: rgba(230, 245, 235, 0.55) !important;
          transform: scale(1.01);
          transition: 0.25s ease;
        }

        .row-hover:hover .highlight-col {
          background: rgba(210, 240, 215, 0.9) !important;
        }

        .wide-table {
          width: 1500px;
        }

        /* Remove inner vertical borders for first 3 columns */
        table th:nth-child(-n + 3),
        table td:nth-child(-n + 3) {
          border-right: none !important;
          border-left: none !important;
        }

        /* Also remove the top/bottom line inside these cells */
        table th:nth-child(-n + 3),
        table td:nth-child(-n + 3) {
          border-top: none !important;
          border-bottom: none !important;
        }
        /* Add light vertical divider between first 3 columns */
        table td:nth-child(1),
        table th:nth-child(1) {
          border-right: 1px solid rgba(0, 0, 0, 0.12) !important;
        }

        table td:nth-child(2),
        table th:nth-child(2) {
          border-right: 1px solid rgba(0, 0, 0, 0.12) !important;
        }

        @media (max-width: 768px) {
          .wide-table {
            width: 1200px;
          }
        }
      `}</style>

      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {productType.toUpperCase()} Comparison
        </h2>
      </div>

      <div className=" rounded-lg overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 text-sm text-center">
          <thead>
            <tr>
              <th
                style={{ background: "#124434", color: "#FFF" }}
                className="px-4 py-3 border-r highlight-head"
              >
                {type === "mtf" ? "Broker" : "Institution"}
              </th>

              {(type === "las" || type === "lamf") && (
                <>
                  {type === "las" && (
                    <>
                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 border-r leading-tight min-w-[150px] highlight-head"
                      >
                        <div>~Overall Cost</div>
                        <div>over 1 lakh LAS</div>
                        <div className="text-xs mt-1">(1st Year Cost)</div>
                      </th>

                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 border-r leading-tight min-w-[150px] highlight-head"
                      >
                        <div>~Overall Cost</div>
                        <div>over 1 lakh LAS</div>
                        <div className="text-xs mt-1">(2nd Year Cost)</div>
                      </th>
                    </>
                  )}

                  {type === "lamf" && (
                    <>
                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 border-r leading-tight highlight-head"
                      >
                        <div>~Overall Cost</div>
                        <div>over 1 lakh LAMF**</div>
                        <div className="text-xs mt-1">(1st Year Cost)</div>
                      </th>

                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 border-r leading-tight highlight-head"
                      >
                        <div>~Overall Cost</div>
                        <div>over 1 lakh LAMF**</div>
                        <div className="text-xs mt-1">(2nd Year Cost)</div>
                      </th>
                    </>
                  )}

                  <th
                    style={{ background: "#124434", color: "#FFF" }}
                    className="px-4 py-3 border-r"
                  >
                    Approved Assets
                  </th>

                  <th
                    style={{ background: "#124434", color: "#FFF" }}
                    className="px-4 py-3 border-r"
                  >
                    Regularization Period
                  </th>

                  {type === "las" && (
                    <th
                      style={{ background: "#124434", color: "#FFF" }}
                      className="px-4 py-3 min-w-[110px]"
                    >
                      LTV
                    </th>
                  )}

                  {type === "lamf" && (
                    <>
                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 min-w-[110px] border-r"
                      >
                        LTV – Debt
                      </th>

                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 min-w-[110px]"
                      >
                        LTV – Equity
                      </th>
                    </>
                  )}
                </>
              )}

              {type === "mtf" && (
                <>
                  <th
                    style={{ background: "#124434", color: "#FFF" }}
                    className="px-4 py-3 border-r leading-tight highlight-head"
                  >
                    <div>~Overall MTF Cost of</div>
                    <div className="font-semibold">5 lakh</div>
                    <div className="text-xs">(1st Year Cost)***</div>
                  </th>

                  <th
                    style={{ background: "#124434", color: "#FFF" }}
                    className="px-4 py-3 border-r"
                  >
                    Margin Requirement
                  </th>

                  <th
                    style={{ background: "#124434", color: "#FFF" }}
                    className="px-4 py-3"
                  >
                    Approved Stocks
                  </th>
                </>
              )}
            </tr>
          </thead>

          {/* ------------------- TABLE BODY ------------------- */}
          <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="row-hover transition">
                {(() => {
                  let col = 0;
                  const cells = [];
                  const highlightLAS_LAMF = [0, 1, 2];
                  const highlightMTF = [0, 1];

                  // ---------- COL 1: Name ----------
                  cells.push(
                    <td
                      key={col}
                      className={`px-4 py-4 border-r font-medium ${
                        type !== "mtf" ? "highlight-col" : "highlight-col"
                      }`}
                    >
                      {renderValue(row.name)}
                    </td>
                  );
                  col++;

                  // ---------- LAS / LAMF ----------
                  if (type === "las" || type === "lamf") {
                    const important = highlightLAS_LAMF;

                    // Cost 1st year
                    cells.push(
                      <td
                        key={col}
                        className={`px-4 py-4 border-r text-center ${
                          important.includes(col) ? "highlight-col" : ""
                        }`}
                      >
                        {row.cost_first_year ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="font-bold text-green-600 text-base">
                              {row.cost_first_year.percent ?? "—"}
                            </div>
                            <div className="w-full border-t border-gray-300 my-1"></div>
                            <div className="text-sm text-gray-700">
                              {row.cost_first_year.amount
                                ? ` ${row.cost_first_year.amount.toLocaleString()}`
                                : "—"}
                            </div>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                    );
                    col++;

                    // Cost 2nd year
                    cells.push(
                      <td
                        key={col}
                        className={`px-4 py-4 border-r text-center ${
                          important.includes(col) ? "highlight-col" : ""
                        }`}
                      >
                        {row.cost_second_year ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="font-bold text-green-600 text-base">
                              {row.cost_second_year.percent ?? "—"}
                            </div>
                            <div className="w-full border-t border-gray-300 my-1"></div>
                            <div className="text-sm text-gray-700">
                              {row.cost_second_year.amount
                                ? ` ${row.cost_second_year.amount.toLocaleString()}`
                                : "—"}
                            </div>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                    );
                    col++;

                    // Approved assets
                    cells.push(
                      <td key={col} className="px-4 py-4 border-r">
                        {renderValue(row.approved_assets)}
                      </td>
                    );
                    col++;

                    // Regularization period
                    cells.push(
                      <td key={col} className="px-4 py-4 border-r">
                        {renderValue(row.regularization_period)}
                      </td>
                    );
                    col++;

                    // LTV (LAS)
                    if (type === "las") {
                      cells.push(
                        <td key={col} className="px-4 py-4 whitespace-nowrap">
                          {row.ltv
                            ? `${renderValue(row.ltv.min)}–${renderValue(
                                row.ltv.max
                              )}`
                            : "—"}
                        </td>
                      );
                      col++;
                    }

                    // LTV (LAMF)
                    if (type === "lamf") {
                      cells.push(
                        <td key={col} className="px-4 py-4 border-r">
                          {row.ltv?.debt ? row.ltv.debt.replace("/", "–") : "—"}
                        </td>
                      );
                      col++;

                      cells.push(
                        <td key={col} className="px-4 py-4">
                          {row.ltv?.equity
                            ? row.ltv.equity.replace("/", "–")
                            : "—"}
                        </td>
                      );
                      col++;
                    }

                    return cells;
                  }

                  // ---------- MTF ----------
                  if (type === "mtf") {
                    const important = highlightMTF;

                    // Cost summary
                    cells.push(
                      <td
                        key={col}
                        className={`px-4 py-4 border-r text-center ${
                          important.includes(col) ? "highlight-col" : ""
                        }`}
                      >
                        {row.cost_summary ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="font-bold text-green-600 text-base">
                              {row.cost_summary.percent ?? "—"}
                            </div>
                            <div className="w-full border-t border-gray-300 my-1"></div>
                            <div className="text-sm text-gray-700">
                              {row.cost_summary.amount
                                ? ` ${row.cost_summary.amount.toLocaleString()}`
                                : "—"}
                            </div>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                    );
                    col++;

                    // Margin Requirement
                    cells.push(
                      <td
                        key={col}
                        className={`px-4 py-4 border-r ${
                          important.includes(col) ? "highlight-col" : ""
                        }`}
                      >
                        {renderValue(row.margin_requirement)}
                      </td>
                    );
                    col++;

                    // Approved stocks
                    cells.push(
                      <td key={col} className="px-4 py-4">
                        {renderValue(row.approved_assets)}
                      </td>
                    );
                    col++;

                    return cells;
                  }
                })()}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6">
        <a
          href={`/products/${type}`}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold text-sm tracking-wide"
        >
          View All {productType.toUpperCase()}
        </a>
      </div>
    </div>
  );
}
