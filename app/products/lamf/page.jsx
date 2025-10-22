"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";
import { lamfFaqData } from "./faqdata"; // adjust path as needed

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
  const allCategories = ["All FAQs", ...Object.keys(lamfFaqData)];

  
const filteredFaqs = useMemo(() => {
  if (activeCategories.includes("All FAQs")) {
    return Object.values(lamfFaqData).flat();
  }
  return activeCategories.flatMap((cat) => lamfFaqData[cat] || []);
}, [activeCategories]);
  // --- Helpers ---
  const extractNumberString = (val) => {
    if (!val) return "—";
    if (typeof val === "number") return String(val);
    if (typeof val === "string") {
      const match = val.match(/\d[\d,\.]*/);
      return match ? match[0].replace(/,/g, "") : "—";
    }
    return "—";
  };

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

  const getFieldValue = (obj, fieldName) => {
    if (!obj) return "—";
    const key = Object.keys(obj).find(
      (k) => k.toLowerCase().trim() === fieldName.toLowerCase().trim()
    );
    return key ? obj[key] : "—";
  };

  // --- Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const qs = await getDocs(collection(db, "LAMF"));
        const mapped = qs.docs.map((doc) => {
          const d = doc.data();

          const approvedRaw =
            d["Approved List of MF"] ??
            d["Approved List of Shares"] ??
            d["Approved MF"] ??
            d["Approved Stocks"] ??
            d["Approved Shares"] ??
            "—";
          const approvedStocks = extractNumberString(approvedRaw);

          const interest = d["Interest Rate"] ?? d["InterestRates"] ?? null;
          const minRate =
            interest && interest.Min !== undefined
              ? formatRateForDisplay(interest.Min)
              : interest && interest.min !== undefined
              ? formatRateForDisplay(interest.min)
              : "—";
          const maxRate =
            interest && interest.Max !== undefined
              ? formatRateForDisplay(interest.Max)
              : interest && interest.max !== undefined
              ? formatRateForDisplay(interest.max)
              : "—";
          const medianRate =
            interest && (interest.Median ?? interest.median) !== undefined
              ? formatRateForDisplay(interest.Median ?? interest.median)
              : "—";

          const ltvObj = d["LTV - Funding"] ?? d["LTV - FUNDING"] ?? null;
          const { ltvDebt, ltvEquity } = parseLTV(ltvObj);

          const debtRaw = getFieldValue(d, "Debt MF Min and Max Loan");
          const equityRaw = getFieldValue(d, "Equity MF Min and Max Loan");

          const debtLoanRange = parseLoanRange(debtRaw);
          const equityLoanRange = parseLoanRange(equityRaw);

          let penalRaw = d["Penal Charges"] ?? d["Default Charges"] ?? d["Penal Charges "];
          let penalDisplay = "—";
          if (penalRaw !== undefined && penalRaw !== null) {
            if (typeof penalRaw === "number") penalDisplay = formatRateForDisplay(penalRaw);
            else if (typeof penalRaw === "string") {
              const m = penalRaw.match(/(\d+\.?\d*)\s*%?/);
              penalDisplay = m ? `${m[1]}%` : penalRaw;
            } else penalDisplay = String(penalRaw);
          }

          return {
            id: doc.id,
            name: d["Financial Institution"] ?? d["Name of the Institution"] ?? "—",
            approvedStocks,
            tenure: d["Tenure"] ?? "—",
            marginPeriod: d["Regularization period / Margin Call Period"] ?? "—",
            ltvDebt,
            ltvEquity,
            debtLoanRange,
            equityLoanRange,
            minRate,
            maxRate,
            medianRate,
            processingFee: d["Processing Fee"] ?? "—",
            prepaymentCharges: d["Pre-payment Charges"] ?? "—",
            renewalFee: d["Annual Maintenance Charges / Renewal Fees"] ?? "—",
            penalCharges: penalDisplay,
          };
        });
        setData(mapped);
      } catch (err) {
        console.error("Error fetching LAMF collection:", err);
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
                      { key: "name", label: "Institution" },
                      { key: "approvedStocks", label: "Approved Stocks" },
                      { key: "tenure", label: "Tenure" },
                      { key: "marginPeriod", label: "Margin Period" },
                      { key: "ltvDebt", label: "LTV Debt" },
                      { key: "ltvEquity", label: "LTV Equity" },
                      { key: "debtLoanRange", label: "Debt Loan" },
                      { key: "equityLoanRange", label: "Equity Loan" },
                    ].map((h) => (
                      <th key={h.key} className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          {h.label}
                          <button onClick={() => handleSort(h.key, "funding")} className="text-gray-500 hover:text-gray-800">
                            <ArrowUpDown size={14} />
                          </button>
                          {sortFieldFunding === h.key && <span className="text-xs">{sortOrderFunding === "asc" ? "▲" : "▼"}</span>}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedFundingData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="px-6 py-4 font-semibold text-slate-900">{row.name}</td>
                      <td className="px-6 py-4 text-slate-600">{row.approvedStocks}</td>
                      <td className="px-6 py-4 text-slate-600">{row.tenure}</td>
                      <td className="px-6 py-4 text-slate-600">{row.marginPeriod}</td>
                      <td className="px-6 py-4 text-center text-teal-600 font-semibold">{row.ltvDebt}</td>
                      <td className="px-6 py-4 text-center text-teal-600 font-semibold">{row.ltvEquity}</td>
                      <td className="px-6 py-4 text-center text-slate-600">{row.debtLoanRange}</td>
                      <td className="px-6 py-4 text-center text-slate-600">{row.equityLoanRange}</td>
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
                      { key: "name", label: "Institution" },
                      { key: "minRate", label: "Min Rate" },
                      { key: "maxRate", label: "Max Rate" },
                      { key: "medianRate", label: "Median Rate" },
                      { key: "processingFee", label: "Processing Fee" },
                      { key: "prepaymentCharges", label: "Pre-payment" },
                      { key: "renewalFee", label: "Renewal Fee" },
                      { key: "penalCharges", label: "Penal Charges" },
                    ].map((h) => (
                      <th key={h.key} className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          {h.label}
                          <button onClick={() => handleSort(h.key, "cost")} className="text-gray-500 hover:text-gray-800">
                            <ArrowUpDown size={14} />
                          </button>
                          {sortFieldCost === h.key && <span className="text-xs">{sortOrderCost === "asc" ? "▲" : "▼"}</span>}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedCostData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="px-6 py-4 font-semibold text-slate-900">{row.name}</td>
                      <td className="px-6 py-4 text-center text-emerald-600 font-semibold">{row.minRate}</td>
                      <td className="px-6 py-4 text-center text-rose-600 font-semibold">{row.maxRate}</td>
                      <td className="px-6 py-4 text-center text-slate-600">{row.medianRate}</td>
                      <td className="px-6 py-4 text-slate-600 text-sm">{row.processingFee}</td>
                      <td className="px-6 py-4 text-slate-600 text-sm">{row.prepaymentCharges}</td>
                      <td className="px-6 py-4 text-slate-600 text-sm">{row.renewalFee}</td>
                      <td className="px-6 py-4 text-center text-rose-600 font-semibold">{row.penalCharges}</td>
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
          <span className="tracking-wide">{currentTable === "funding" ? "View Cost Details" : "View Funding Details"}</span>
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
