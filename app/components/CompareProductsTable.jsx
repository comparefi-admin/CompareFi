"use client";

import React, { useEffect, useState } from "react";
import { fetchLAS, fetchLAMF, fetchMTF } from "../../lib/fetchData";

const renderValue = (value) =>
  value === null || value === undefined || value === "" ? "—" : value;

const formatRupees = (value) => {
  if (value === null || value === undefined || value === "") return "—";

  const num =
    typeof value === "number"
      ? value
      : Number(
        String(value)
          .replace(/₹|rs\.?|,/gi, "")
          .trim()
      );

  if (isNaN(num)) return value;
  return `₹${num.toLocaleString("en-IN")}`;
};

const formatPercent1Dec = (val) => {
  if (val === null || val === undefined || val === "") return "—";
  const num = parseFloat(String(val).replace("%", ""));
  if (Number.isNaN(num)) return val;
  return `${num.toFixed(1)}%`;
};

const getNumericAmount = (obj) => {
  if (!obj || obj.amount === null || obj.amount === undefined) return Infinity;

  const num =
    typeof obj.amount === "number"
      ? obj.amount
      : Number(
        String(obj.amount)
          .replace(/₹|rs\.?|,/gi, "")
          .trim()
      );

  return Number.isNaN(num) ? Infinity : num;
};

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
              : ["kotak - trade free pro plan", "hdfc sky", "dhan"];

        const filtered = clean.filter((r) =>
          filterNames.includes((r.name || "").trim().toLowerCase())
        );

        // ✅ DEFAULT ASCENDING SORT
        const sorted = [...filtered].sort((a, b) => {
          if (type === "las" || type === "lamf") {
            return (
              getNumericAmount(a.cost_first_year) -
              getNumericAmount(b.cost_first_year)
            );
          }

          if (type === "mtf") {
            return (
              getNumericAmount(a.cost_summary) -
              getNumericAmount(b.cost_summary)
            );
          }

          return 0;
        });

        setData(sorted);
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
        /* ================= HIGHLIGHT COLUMN ================= */
        .highlight-col {
          position: relative;
          background: linear-gradient(
            180deg,
            rgba(242, 255, 245, 0.92),
            rgba(225, 245, 230, 0.85)
          );
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Simplified base shadow */
          transition: transform 0.2s ease;
          will-change: transform;
        }

        /* LEFT GREEN ACCENT */
        .highlight-col::before {
          content: "";
          position: absolute;
          left: 6px;
          top: 12px;
          bottom: 12px;
          width: 4px;
          border-radius: 6px;
          background: linear-gradient(180deg, #b1ed67, #1f5e3c);
        }

        /* ================= HEADER GREEN ACCENT ================= */
        .highlight-head {
          position: relative;
        }

        .highlight-head::before {
          content: "";
          position: absolute;
          left: 6px;
          top: 10px;
          bottom: 10px;
          width: 4px;
          border-radius: 6px;
          background: linear-gradient(180deg, #b1ed67, #1f5e3c);
        }

        /* Row lift – Optimized */
        .row-hover {
          transition: transform 0.2s ease, background-color 0.2s ease;
          will-change: transform;
          transform: translateZ(0); /* Hardware Acceleration */
        }

        .row-hover:hover {
          transform: translateY(-2px) translateZ(0);
          z-index: 10;
        }

        /* Base hover background for entire row - Simplified */
        .row-hover:hover td {
          background: rgba(16, 185, 129, 0.04);
        }

        /* SUBTLE hover for highlight column */
        .row-hover:hover .highlight-col {
          background: linear-gradient(
            180deg,
            rgba(242, 255, 245, 0.98),
            rgba(225, 245, 230, 0.92)
          );
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); /* Balanced shadow */
        }

        /* Optimization: Remove expensive shadow from all other columns */
        .row-hover:hover td:not(.highlight-col) {
          background: #ffffff;
          /* Removed box-shadow from every cell to fix lag */
        }

        /* Header rounding only */
        .highlight-head {
          border-radius: 9px;
        }

        table {
          border-collapse: collapse;
          table-layout: auto;
        }
      `}</style>

      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {productType.toUpperCase()} Comparison
        </h2>
      </div>

      <div className="rounded-2xl overflow-x-auto border border-gray-200/80">
        <table className="min-w-[800px] w-full divide-y divide-gray-200 text-sm text-center">
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

                        <div>
                          over 1 lakh LAS
                          <span className="text-red-500 font-bold ml-0.5">
                            *
                          </span>
                        </div>

                        <div className="text-xs mt-1">(1st Year Cost)</div>
                      </th>

                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 border-r leading-tight min-w-[150px] highlight-head"
                      >
                        <div>~Overall Cost</div>
                        <div>
                          over 1 lakh LAS
                          <span className="text-red-500 font-bold ml-0.5">
                            *
                          </span>
                        </div>
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
                        <div>
                          over 1 lakh LAMF
                          <span className="text-red-500 font-bold ml-0.5">
                            *
                          </span>
                        </div>
                        <div className="text-xs mt-1">(1st Year Cost)</div>
                      </th>

                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 border-r leading-tight highlight-head"
                      >
                        <div>~Overall Cost</div>
                        <div>
                          over 1 lakh LAMF
                          <span className="text-red-500 font-bold ml-0.5">
                            *
                          </span>
                        </div>
                        <div className="text-xs mt-1">(2nd Year Cost)</div>
                      </th>
                    </>
                  )}

                  <th
                    style={{ background: "#124434", color: "#FFF" }}
                    className="px-4 py-3 border-r"
                  >
                    {type === "lamf" ? "Approved MF" : "Approved Shares"}
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
                    <div className="text-xs">
                      (1st Year Cost)
                      <span className="text-red-500 font-bold ml-0.5">*</span>
                    </div>
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
                      className={`px-4 py-4 border-r font-medium ${type !== "mtf" ? "highlight-col" : "highlight-col"
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
                        className={`px-4 py-4 border-r text-center ${important.includes(col) ? "highlight-col" : ""
                          }`}
                      >
                        {row.cost_first_year ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="font-bold text-green-600 text-base">
                              {formatPercent1Dec(
                                row.cost_first_year.percent ?? "—"
                              )}
                            </div>
                            <div className="w-full border-t border-gray-300 my-1"></div>
                            <div className="text-sm text-gray-700">
                              {row.cost_first_year.amount
                                ? ` ${formatRupees(row.cost_first_year.amount)}`
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
                        className={`px-4 py-4 border-r text-center ${important.includes(col) ? "highlight-col" : ""
                          }`}
                      >
                        {row.cost_second_year ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="font-bold text-green-600 text-base">
                              {formatPercent1Dec(
                                row.cost_second_year.percent ?? "—"
                              )}
                            </div>
                            <div className="w-full border-t border-gray-300 my-1"></div>
                            <div className="text-sm text-gray-700">
                              {row.cost_second_year.amount
                                ? ` ${formatRupees(
                                  row.cost_second_year.amount
                                )}`
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
                        className={`px-4 py-4 border-r text-center ${important.includes(col) ? "highlight-col" : ""
                          }`}
                      >
                        {row.cost_summary ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="font-bold text-green-600 text-base">
                              {formatPercent1Dec(
                                row.cost_summary.percent ?? "—"
                              )}
                            </div>
                            <div className="w-full border-t border-gray-300 my-1"></div>
                            <div className="text-sm text-gray-700">
                              {row.cost_summary.amount
                                ? ` ${formatRupees(row.cost_summary.amount)}`
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
                        className={`px-4 py-4 border-r ${important.includes(col) ? "highlight-col" : ""
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

      <div className="text-center mt-6 flex flex-col items-center gap-3">
        <a
          href={`/products/${type}`}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold text-sm tracking-wide"
        >
          View All {productType.toUpperCase()}
        </a>

        {/* --------- EXPLANATORY NOTE --------- */}
        <p className="max-w-3xl text-xs md:text-sm text-gray-600 leading-relaxed text-center">
          <span className="text-red-500 font-bold">*</span>
          {type === "las" &&
            "Example calculation is based on: ₹1,00,000 LAS position held for 12 months. Collateral given is ₹2,00,000 LAS and assumed 50% funding across Financial Institutions."}

          {type === "lamf" &&
            "Example calculation is based on: ₹1,00,000 LAMF position held for 12 months. Collateral given is ₹2,00,000 LAMF and assumed 50% funding across Financial Institutions."}

          {type === "mtf" &&
            "Example calculation is based on: ₹5,00,000 Reliance position held for 12 months, collateral of ₹4,00,000 in approved shares, zero cash collateral and broker specific haircuts/charges including GST."}
        </p>

      </div>
    </div>
  );
}
