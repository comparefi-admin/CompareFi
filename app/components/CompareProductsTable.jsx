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
              ltv: d.ltv ?? null
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
                  <th
                    style={{ background: "#124434", color: "#FFF" }}
                    className="px-4 py-3 border-r"
                  >
                    1st Year Cost
                  </th>
                  <th
                    style={{ background: "#124434", color: "#FFF" }}
                    className="px-4 py-3 border-r"
                  >
                    2nd Year Cost
                  </th>
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
                      className="px-4 py-3"
                    >
                      LTV
                    </th>
                  )}

                  {type === "lamf" && (
                    <>
                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3 border-r"
                      >
                        LTV – Debt
                      </th>
                      <th
                        style={{ background: "#124434", color: "#FFF" }}
                        className="px-4 py-3"
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
                    className="px-4 py-3 border-r"
                  >
                    Cost Summary
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
                    <td className="px-4 py-4 border-r">
                      {row.cost_first_year
                        ? renderValue(row.cost_first_year.percent)
                        : "—"}
                    </td>
                    <td className="px-4 py-4 border-r">
                      {row.cost_second_year
                        ? renderValue(row.cost_second_year.percent)
                        : "—"}
                    </td>
                    <td className="px-4 py-4 border-r">
                      {renderValue(row.approved_assets)}
                    </td>
                    <td className="px-4 py-4 border-r">
                      {renderValue(row.regularization_period)}
                    </td>

                    {type === "las" && (
                      <td className="px-4 py-4">
  {row.ltv
    ? `${renderValue(row.ltv.min)}–${renderValue(row.ltv.max)}%`
    : "—"}
</td>

                    )}

                    {type === "lamf" && (
                      <>
                        {/* LTV - Debt */}
<td className="px-4 py-4 border-r">
  {row.ltv?.debt
    ? row.ltv.debt.replace("/", "–")
    : "—"}
</td>

{/* LTV - Equity */}
<td className="px-4 py-4">
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
                    <td className="px-4 py-4 border-r text-left">
                      {row.cost_summary
                        ? Object.entries(row.cost_summary).map(([k, v], i) => (
                            <div key={i}>
                              <span className="font-semibold">{k}:</span>{" "}
                              {renderValue(v)}
                            </div>
                          ))
                        : "—"}
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
