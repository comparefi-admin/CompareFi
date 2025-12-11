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
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {productType.toUpperCase()} Comparison
        </h2>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 text-sm text-center">
          <thead>
            <tr>
              <th
                style={{ background: "#124434", color: "#FFF" }}
                className="px-4 py-3 border-r"
              >
                {type === "mtf" ? "Broker" : "Institution"}
              </th>

              {(type === "las" || type === "lamf") && (
                <>
                  {/* LAS headings */}
                  {type === "las" && (
                    <>
                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                      className="px-4 py-3 border-r leading-tight whitespace-normal min-w-[150px]"

                      >
                        <div>~Overall Cost</div>
                        <div>over 1 lakh LAS</div>
                        <div className="text-xs mt-1">(1st Year Cost)</div>
                      </th>

                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                       className="px-4 py-3 border-r leading-tight whitespace-normal min-w-[150px]"

                      >
                        <div>~Overall Cost</div>
                        <div>over 1 lakh LAS</div>
                        <div className="text-xs mt-1">(2nd Year Cost)</div>
                      </th>
                    </>
                  )}

                  {/* LAMF headings */}
                  {type === "lamf" && (
                    <>
                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 border-r leading-tight whitespace-normal"
                      >
                        <div>~Overall Cost</div>
                        <div>over 1 lakh LAMF**</div>
                        <div className="text-xs mt-1">(1st Year Cost)</div>
                      </th>

                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 border-r leading-tight whitespace-normal"
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
                      className="px-4 py-3 whitespace-nowrap min-w-[110px]"
                    >
                      LTV
                    </th>
                  )}

                  {type === "lamf" && (
                    <>
                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 border-r whitespace-nowrap min-w-[110px]"
                      >
                        LTV – Debt
                      </th>

                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 whitespace-nowrap min-w-[110px]"
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
                    className="px-4 py-3 border-r leading-tight whitespace-normal"
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

          <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                <td className="px-4 py-4 border-r font-medium">
                  {renderValue(row.name)}
                </td>

                {(type === "las" || type === "lamf") && (
                  <>
                    {/* Cost First Year */}
                    <td className="px-4 py-4 border-r text-center">
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
                      ) : "—"}
                    </td>

                    {/* Cost Second Year */}
                    <td className="px-4 py-4 border-r text-center">
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
                      ) : "—"}
                    </td>

                    <td className="px-4 py-4 border-r">
                      {renderValue(row.approved_assets)}
                    </td>

                    <td className="px-4 py-4 border-r">
                      {renderValue(row.regularization_period)}
                    </td>

                    {type === "las" && (
                      <td className="px-4 py-4 whitespace-nowrap min-w-[110px]">
                        {row.ltv
                          ? `${renderValue(row.ltv.min)}–${renderValue(
                              row.ltv.max
                            )}`
                          : "—"}
                      </td>
                    )}

                    {type === "lamf" && (
                      <>
                        <td className="px-4 py-4 border-r whitespace-nowrap min-w-[110px]">
                          {row.ltv?.debt
                            ? row.ltv.debt.replace("/", "–")
                            : "—"}
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap min-w-[110px]">
                          {row.ltv?.equity
                            ? row.ltv.equity.replace("/", "–")
                            : "—"}
                        </td>
                      </>
                    )}
                  </>
                )}

                {type === "mtf" && (
                  <>
                    <td className="px-4 py-4 border-r text-center">
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
                      ) : "—"}
                    </td>

                    <td className="px-4 py-4 border-r">
                      {renderValue(row.margin_requirement)}
                    </td>

                    <td className="px-4 py-4">
                      {renderValue(row.approved_assets)}
                    </td>
                  </>
                )}
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
