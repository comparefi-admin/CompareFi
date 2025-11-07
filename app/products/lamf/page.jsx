"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { faqData } from "./faqdata";
import { fetchLAMF } from "@/lib/fetchData";
import { getNullFill } from "@/lib/nullFill";

export default function LAMFPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortFieldFunding, setSortFieldFunding] = useState(null);
  const [sortOrderFunding, setSortOrderFunding] = useState("asc");
  const [sortFieldCost, setSortFieldCost] = useState(null);
  const [sortOrderCost, setSortOrderCost] = useState("asc");
  const [currentTable, setCurrentTable] = useState("funding");
  const [faqOpen, setFaqOpen] = useState(null);
  const [activeCategories, setActiveCategories] = useState(["All FAQs"]); // <-- new hook

  // --- FAQ data hook ---
  const allCategories = ["All FAQs", ...Object.keys(faqData)];

  
const filteredFaqs = useMemo(() => {
  if (activeCategories.includes("All FAQs")) {
    return Object.values(faqData).flat();
  }
  return activeCategories.flatMap((cat) => faqData[cat] || []);
}, [activeCategories]);
  // --- Helpers ---
  
  const parseLTV = (ltv) => {
    let ltvDebt = "—";
    let ltvEquity = "—";
    if (!ltv) return { ltvDebt, ltvEquity };
    if (typeof ltv === "object") {
      if (ltv.Debt) ltvDebt = ltv.Debt;
      if (ltv.Equity) ltvEquity = ltv.Equity;
    } else if (typeof ltv === "string") {
      const m = ltv.match(/Debt:(.+)\s*Equity:(.+)/i);
      if (m) {
        ltvDebt = m[1].trim();
        ltvEquity = m[2].trim();
      } else {
        ltvDebt = ltv;
        ltvEquity = ltv;
      }
    }
    return { ltvDebt, ltvEquity };
  };

  const parseLoanRange = (str) => {
    if (!str || str === "—") return "—";
    const m = str.match(/Min\s*:\s*(.+?)\s*Max\s*:\s*(.+)/i);
    if (m) return `${m[1].trim()} - ${m[2].trim()}`;
    return str;
  };

  const formatRateForDisplay = (val) => {
    if (val === undefined || val === null) return "—";
    if (typeof val === "string") return val;
    if (typeof val === "number") {
      if (val > 0 && val <= 1) {
        const p = (val * 100).toFixed(2).replace(/\.00$/, "");
        return `${p}%`;
      }
      return `${Number(val).toFixed(2).replace(/\.00$/, "")}%`;
    }
    return String(val);
  };

  // --- Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lamf = await fetchLAMF();
        setData(lamf || []);
      } catch (error) {
        console.error("❌ Supabase fetch error:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const clean = (val) => {
    if (!val) return val;
    if (typeof val === "number") return val > 0 && val <= 1 ? val * 100 : val;
    if (typeof val === "string") {
      const cleaned = val.replace(/[₹,%]/g, "").replace(/,/g, "").trim();
      const parsed = parseFloat(cleaned);
      if (!isNaN(parsed)) return parsed;
      return val.toLowerCase();
    }
    return val;
  };

  const handleSort = (field, section) => {
    if (section === "funding") {
      if (sortFieldFunding === field) setSortOrderFunding(sortOrderFunding === "asc" ? "desc" : "asc");
      else {
        setSortFieldFunding(field);
        setSortOrderFunding("asc");
      }
    } else {
      if (sortFieldCost === field) setSortOrderCost(sortOrderCost === "asc" ? "desc" : "asc");
      else {
        setSortFieldCost(field);
        setSortOrderCost("asc");
      }
    }
  };

  const sortedFundingData = useMemo(() => {
    if (!sortFieldFunding) return data;
    return [...data].sort((a, b) => {
      let valA = clean(a[sortFieldFunding]);
      let valB = clean(b[sortFieldFunding]);
      if (typeof valA === "number" && typeof valB === "number") return sortOrderFunding === "asc" ? valA - valB : valB - valA;
      return sortOrderFunding === "asc" ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    });
  }, [data, sortFieldFunding, sortOrderFunding]);

  const sortedCostData = useMemo(() => {
    if (!sortFieldCost) return data;
    return [...data].sort((a, b) => {
      let valA = clean(a[sortFieldCost]);
      let valB = clean(b[sortFieldCost]);
      if (typeof valA === "number" && typeof valB === "number") return sortOrderCost === "asc" ? valA - valB : valB - valA;
      return sortOrderCost === "asc" ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    });
  }, [data, sortFieldCost, sortOrderCost]);

  const switchTable = () => setCurrentTable(currentTable === "funding" ? "cost" : "funding");

  if (loading) return <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">Loading LAMF data...</div>;


const handleCategoryClick = (cat) => {
  setActiveCategories((prev) => {
    if (cat === "All FAQs") return ["All FAQs"];

    const isSelected = prev.includes(cat);
    let newSelection = isSelected
      ? prev.filter((c) => c !== cat)
      : [...prev.filter((c) => c !== "All FAQs"), cat];

    return newSelection.length === 0 ? ["All FAQs"] : newSelection;
  });
};



  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <Navbar />

    {/* About LAMF */}
    <section className="max-w-7xl mx-auto px-6 py-12 text-center">
      <div className="bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-5xl font-bold mb-4">About Loan Against Mutual Funds (LAMF)</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Loan Against Mutual Funds (LAMF) allows investors to borrow funds using their mutual fund holdings as collateral. 
          This type of loan provides quick liquidity while keeping your investments intact and continues earning returns.
        </p>
      </div>
    </section>


    {/* Table Section */}
    <section className="max-w-7xl mx-auto px-6 py-8 flex gap-4">
      <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Funding Table */}
        {currentTable === "funding" && (
          <div className="overflow-x-auto animate-fadeIn">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
                <tr>
                  {[
                    { key: "institution_name", label: "Institution" },
                    { key: "approved_funds", label: "Approved Funds" },
                    { key: "tenure_months", label: "Tenure (Months)" },
                    { key: "regularization_period", label: "Regularization / Margin Period" },
                    { key: "ltv", label: "LTV (Debt / Equity)" },
                    { key: "loan_debt", label: "Debt MF Loan" },
                    { key: "loan_equity", label: "Equity MF Loan" },
                  ].map((h) => (
                    <th
                      key={h.key}
                      className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      <div className="flex items-center gap-1">
                        {h.label}
                        <button
                          onClick={() => handleSort(h.key, "funding")}
                          className="text-gray-500 hover:text-gray-800"
                        >
                          <ArrowUpDown size={14} />
                        </button>
                        {sortFieldFunding === h.key && (
                          <span className="text-xs">
                            {sortOrderFunding === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {sortedFundingData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {row.institution_name ||
                        getNullFill("lamf", row.institution_name, "institution_name")}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {row.approved_funds != null
                        ? `~ ${row.approved_funds} funds`
                        : getNullFill("lamf", row.institution_name, "approved_funds")}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {row.tenure_months != null
                        ? `${row.tenure_months} months`
                        : getNullFill("lamf", row.institution_name, "tenure_months")}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {row.regularization_period != null
                        ? `${row.regularization_period} days`
                        : getNullFill("lamf", row.institution_name, "regularization_period")}
                    </td>

                    <td className="px-6 py-4 text-center text-teal-600 font-semibold">
                      {row.ltv && typeof row.ltv === "object" ? (
                        <div className="flex flex-col gap-0.5">
                          {Object.entries(row.ltv).map(([k, v], idx) => (
                            <div key={idx}>{`${k}: ${
                              typeof v === "object"
                                ? `${v.min ?? "—"} - ${v.max ?? "—"}`
                                : `${v ?? "—"}`
                            }`}</div>
                          ))}
                        </div>
                      ) : (
                        getNullFill("lamf", row.institution_name, "ltv")
                      )}
                    </td>

                    <td className="px-6 py-4 text-center text-slate-600">
                      {row.loan_debt && typeof row.loan_debt === "object" ? (
                        <div className="flex flex-col">
                          <div>Min: {row.loan_debt.min ?? "—"}</div>
                          <div>Max: {row.loan_debt.max ?? "—"}</div>
                        </div>
                      ) : (
                        getNullFill("lamf", row.institution_name, "loan_debt")
                      )}
                    </td>

                    <td className="px-6 py-4 text-center text-slate-600">
                      {row.loan_equity && typeof row.loan_equity === "object" ? (
                        <div className="flex flex-col">
                          <div>Min: {row.loan_equity.min ?? "—"}</div>
                          <div>Max: {row.loan_equity.max ?? "—"}</div>
                        </div>
                      ) : (
                        getNullFill("lamf", row.institution_name, "loan_equity")
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Cost Table */}
        {currentTable === "cost" && (
          <div className="overflow-x-auto animate-fadeIn">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
                <tr>
                  {[
                    { key: "institution_name", label: "Institution" },
                    { key: "interest_rate", label: "Interest Rate (Min / Max / Median)" },
                    { key: "processing_fee", label: "Processing Fee" },
                    { key: "prepayment_charges", label: "Pre-payment Charges" },
                    { key: "annual_maintenance", label: "Annual Maintenance" },
                    { key: "penal_charges", label: "Penal Charges" },
                    { key: "default_charges", label: "Default Charges" },
                    { key: "other_expenses", label: "Other Expenses" },
                  ].map((h) => (
                    <th
                      key={h.key}
                      className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      <div className="flex items-center gap-1">
                        {h.label}
                        <button
                          onClick={() => handleSort(h.key, "cost")}
                          className="text-gray-500 hover:text-gray-800"
                        >
                          <ArrowUpDown size={14} />
                        </button>
                        {sortFieldCost === h.key && (
                          <span className="text-xs">
                            {sortOrderCost === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {sortedCostData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {row.institution_name ||
                        getNullFill("lamf", row.institution_name, "institution_name")}
                    </td>

                    <td className="px-6 py-4 text-center text-slate-700">
                      {row.interest_rate && typeof row.interest_rate === "object" ? (
                        <div className="flex flex-col">
                          <div>Min: {row.interest_rate.min ?? "—"}</div>
                          <div>Max: {row.interest_rate.max ?? "—"}</div>
                          <div>Median: {row.interest_rate.median ?? "—"}</div>
                        </div>
                      ) : (
                        getNullFill("lamf", row.institution_name, "interest_rate")
                      )}
                    </td>

                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {row.processing_fee ||
                        getNullFill("lamf", row.institution_name, "processing_fee")}
                    </td>

                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {row.prepayment_charges ||
                        getNullFill("lamf", row.institution_name, "prepayment_charges")}
                    </td>

                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {row.annual_maintenance ||
                        getNullFill("lamf", row.institution_name, "annual_maintenance")}
                    </td>

                    <td className="px-6 py-4 text-center text-rose-600 font-semibold">
                      {row.penal_charges != null
                        ? `${row.penal_charges}%`
                        : getNullFill("lamf", row.institution_name, "penal_charges")}
                    </td>

                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {row.default_charges && typeof row.default_charges === "object"
                        ? Object.entries(row.default_charges).map(([k, v], idx) => (
                            <div key={idx}>{`${k}: ${v ?? "—"}`}</div>
                          ))
                        : getNullFill("lamf", row.institution_name, "default_charges")}
                    </td>

                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {row.other_expenses && typeof row.other_expenses === "object"
                        ? Object.entries(row.other_expenses).map(([k, v], idx) => (
                            <div key={idx}>{`${k}: ${v ?? "—"}`}</div>
                          ))
                        : getNullFill("lamf", row.institution_name, "other_expenses")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <button
        onClick={switchTable}
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 rounded-xl shadow-lg transition-all duration-300 flex flex-col items-center justify-center gap-3 font-medium text-sm whitespace-nowrap"
        style={{ writingMode: "vertical-rl" }}
      >
        <ChevronRight className="w-5 h-5 rotate-90" />
        <span className="tracking-wide">
          {currentTable === "funding" ? "View Cost Details" : "View Funding Details"}
        </span>
      </button>
    </section>


  {/* --- FAQ Section --- */}
  <section className="max-w-7xl mx-auto px-6 py-12">
  <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions about LAMF</h2>

  {/* Category Buttons */}
  <div className="flex flex-wrap justify-center gap-4 mb-8 p-6 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg">
    {allCategories.map((cat) => (
      <button
        key={cat}
        onClick={() => {
          setActiveCategories((prev) => {
            if (cat === "All FAQs") return ["All FAQs"];
            const isSelected = prev.includes(cat);
            const newSelection = isSelected
              ? prev.filter((c) => c !== cat)
              : [...prev.filter((c) => c !== "All FAQs"), cat];
            return newSelection.length === 0 ? ["All FAQs"] : newSelection;
          });
        }}
        className={`px-8 py-3 rounded-xl shadow-lg font-medium transition-all duration-300 ${
          activeCategories.includes(cat)
            ? "bg-teal-600 text-white shadow-2xl"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>

  {/* FAQ Cards */}
  <div className="grid md:grid-cols-2 gap-6">
    {filteredFaqs.map((faq, idx) => (
      <div
        key={idx}
        className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg transition-all duration-300"
      >
        <button
          onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
          className="w-full flex justify-between items-center font-semibold text-lg text-left focus:outline-none"
        >
          <span>{faq.question}</span>
          <span
            className={`transform transition-transform duration-300 ${
              faqOpen === idx ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </button>
        {faqOpen === idx && (
          <p className="mt-4 text-gray-700">{faq.answer}</p>
        )}
      </div>
    ))}
  </div>
</section>

  {/* Enquire Now */}
      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Enquire Now</h2>
        <p className="text-gray-700 mb-6 text-center max-w-2xl">
          Fill in your details and we will get back to you with the best options available.
        </p>
        <button className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 font-semibold">
          Contact Us
        </button>
      </section>
      <Footer />
    </div>
  );
}