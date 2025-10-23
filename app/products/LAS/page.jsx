"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";
import { faqData } from "./faqdata"; // adjust the path based on where you place the file
import SpotlightCard from '@/components/SpotlightCard.jsx';

export default function LASPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortFieldFunding, setSortFieldFunding] = useState(null);
  const [sortOrderFunding, setSortOrderFunding] = useState("asc");
  const [sortFieldCost, setSortFieldCost] = useState(null);
  const [sortOrderCost, setSortOrderCost] = useState("asc");

  const [currentTable, setCurrentTable] = useState("funding");
  const faqCategories = [
    "All FAQs",
    "Overview",
    "Interest & Charges",
    "Eligibility & Application Process",
    "Securities Accepted",
    "Loan Amount & LTV",
    "Tenure & Repayment",
    "Risks",
    "Other FAQs",
  ];

  const [activeCategory, setActiveCategory] = useState(["All FAQs"]);

  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const displayedFaqs =
    activeCategory === "All FAQs"
      ? Object.values(faqData).flat()
      : faqData[activeCategory] || [];

  // Buttons for categories
  const categoryButtons = [
    { key: "fundingDetails", label: "Funding Related Details" },
    { key: "majorCost", label: "Major Cost" },
    { key: "defaultCharges", label: "Default Charges" },
    { key: "otherMiscCost", label: "Other Misc Cost" },
  ];

  // Define which columns show for each category in the right table
  const rightTableColumns = {
    fundingDetails: [
      { key: "approvedShares", label: "Approved List of Shares" },
      { key: "tenure", label: "Tenure" },
      { key: "minMaxLoan", label: "Minimum and Maximum Loan" },
      { key: "marginPeriod", label: "Regularization / Margin Call Period" },
      { key: "ltvMin", label: "LTV - Funding (Min)" },
      { key: "ltvMax", label: "LTV - Funding (Max)" },
    ],
    majorCost: [
      { key: "minRate", label: "Interest Rate (Min)" },
      { key: "maxRate", label: "Interest Rate (Max)" },
      { key: "medianRate", label: "Interest Rate (Median)" },
      { key: "processingFee", label: "Processing Fee" },
      { key: "prepaymentCharges", label: "Pre-payment Charges" },
      { key: "renewalFee", label: "Annual Maintenance / Renewal Fees" },
      { key: "penalCharges", label: "Penal Charges" },
    ],
    defaultCharges: [{ key: "defaultCharges", label: "Default Charges" }],
    otherMiscCost: [
      { key: "otherExpenses", label: "Other Expenses" }, // ← new column
    ],
  };
  const [activeTableCategory, setActiveTableCategory] =
    useState("fundingDetails");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "LAS"));
        const firebaseData = querySnapshot.docs.map((doc) => {
          const d = doc.data();
          const minMaxLoanStr = (() => {
            const loanMap = d["Minimum and Maximum Loan"];
            if (loanMap && typeof loanMap === "object") {
              const min = loanMap.Min ?? loanMap.min ?? "—";
              const max = loanMap.Max ?? loanMap.max ?? "—";
              return `${min} - ${max}`;
            }
            return "—";
          })();
          return {
            id: doc.id,
            name: d["Financial Institution"] ?? "—",
            approvedShares:
              d["Approved List of Shares"] ??
              d["Approved List of MF"] ??
              d["Approved Shares"] ??
              d["Approved Stocks"] ??
              "—",
            tenure: d["Tenure"] ?? "—",
            minMaxLoan: minMaxLoanStr,
            marginPeriod:
              d["Regularization period / Margin Call Period"] ?? "—",
            ltvMin: d["LTV - Funding"]?.Min ?? d["LTV - Funding"]?.min ?? "—",
            ltvMax: d["LTV - Funding"]?.Max ?? d["LTV - Funding"]?.max ?? "—",
            minRate: d["Interest Rate"]?.Min ?? "—",
            maxRate: d["Interest Rate"]?.Max ?? "—",
            medianRate: d["Interest Rate"]?.Median ?? "—",
            processingFee: d["Processing Fee"] ?? "—",
            prepaymentCharges: d["Pre-payment Charges"] ?? "—",
            renewalFee: d["Annual Maintenance Charges / Renewal Fees"] ?? "—",
            penalCharges: d["Penal Charges"] ?? "—",
            defaultCharges: d["Default Charges"] ?? "—",
            otherExpenses:
              d["Other Expenses"] && typeof d["Other Expenses"] === "object"
                ? d["Other Expenses"]
                : {},
          };
        });
        setData(firebaseData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const clean = (val) => {
    if (typeof val === "string")
      return parseFloat(val.replace(/[₹,%]/g, "")) || val;
    return val;
  };

  const handleSort = (field, section) => {
    if (section === "funding") {
      if (sortFieldFunding === field)
        setSortOrderFunding(sortOrderFunding === "asc" ? "desc" : "asc");
      else {
        setSortFieldFunding(field);
        setSortOrderFunding("asc");
      }
    } else {
      if (sortFieldCost === field)
        setSortOrderCost(sortOrderCost === "asc" ? "desc" : "asc");
      else {
        setSortFieldCost(field);
        setSortOrderCost("asc");
      }
    }
  };

  const sortedFundingData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortFieldFunding) return 0;
      let valA = clean(a[sortFieldFunding]);
      let valB = clean(b[sortFieldFunding]);
      if (typeof valA === "number" && typeof valB === "number")
        return sortOrderFunding === "asc" ? valA - valB : valB - valA;
      return sortOrderFunding === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortFieldFunding, sortOrderFunding]);

  const sortedCostData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortFieldCost) return 0;
      let valA = clean(a[sortFieldCost]);
      let valB = clean(b[sortFieldCost]);
      if (typeof valA === "number" && typeof valB === "number")
        return sortOrderCost === "asc" ? valA - valB : valB - valA;
      return sortOrderCost === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortFieldCost, sortOrderCost]);

  const switchTable = () =>
    setCurrentTable(currentTable === "funding" ? "cost" : "funding");

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Loading data...
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <Navbar />

      {/* Hero / Overview */}
      {/* Hero / Overview */}
      <section className="w-[90%] mx-auto px-2 py-32 flex flex-col items-center justify-center text-center">
        <div className="w-full flex flex-col items-center justify-center mb-10">
          <SpotlightCard
            className="relative z-10 w-[90%] rounded-3xl bg-gradient-to-b from-[#B1ED67] to-white
            backdrop-blur-xl shadow-2xl sm:p-10 md:p-14 lg:p-20 flex flex-col items-center justify-center 
             mb-[7%] md:gap-14 hover:drop-shadow-2xl hover:scale-102 transition-all duration-700 ease-in-out
            border-none will-change-transform"
            spotlightColor="rgba(255,255,255,0.3)"
          >
            <h1 className="text-5xl font-bold mb-4">Loan Against Shares</h1>
          </SpotlightCard>

          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Compare Interest Rates, Eligibility, Hidden Charges & More. Access
            detailed, filterable breakdowns from top lenders like Bajaj Finserv,
            SBI, Mirae Asset, Axis Bank, Kotak, ICICI Bank, Tata Capital,
            Zerodha, and HDFC—updated in 2025.
          </p>
        </div>
      </section>


      {/* Tables Section */}
      <section className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center">
        {/* Outer glass box */}
        <div className="w-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 flex">
          {/* 3-column container */}
          <div className="flex w-full gap-4">
            {/* Left Table — Fixed columns */}
            <div className="w-1/3 bg-white/30 rounded-xl p-4 shadow-lg">
              <table className="w-full border-collapse text-sm text-gray-800">
                <thead>
                  <tr className="text-left font-semibold text-gray-700 border-b border-white/30">
                    <th className="px-4 py-3">Institution</th>
                    <th className="px-4 py-3">Cost-1st Year</th>
                    <th className="px-4 py-3">Cost-2nd Year</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCostData.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-white/10 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 font-medium">{row.name}</td>
                      <td className="px-4 py-3 text-teal-600 font-medium">
                        {row.cost1stYear}
                      </td>
                      <td className="px-4 py-3 text-pink-600 font-medium">
                        {row.cost2ndYear}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Middle Table — Dynamic columns */}
            <div className="flex-1 bg-white/30 rounded-xl p-4 shadow-lg">
              <table className="w-full border-collapse text-sm text-gray-800">
                <thead>
                  <tr className="text-left font-semibold text-gray-700 border-b border-white/30">
                    {rightTableColumns[activeTableCategory].map((col) => (
                      <th key={col.key} className="px-4 py-3">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedCostData.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-white/10 transition-colors duration-150"
                    >
                      {rightTableColumns[activeTableCategory].map((col) => (
                       <td key={col.key} className="px-4 py-3 whitespace-pre-wrap">
  {col.key === "defaultCharges" && row[col.key] ? (
    // format default charges string
    row[col.key]
      .replace(/:\s*/g, ": ")
      .replace(/Default Charges:/g, "\nDefault Charges:")
      .replace(/Penal Charges\s*:/g, "\nPenal Charges:")
      .split("\n")
      .map((line, idx) => <div key={idx}>{line.trim()}</div>)
  ) : col.key === "otherExpenses" && row[col.key] ? (
    // row[col.key] is an object → iterate its keys
    Object.entries(row[col.key]).map(([key, value], idx) => (
      <div key={idx}>
        {key}: {value}
      </div>
    ))
  ) : (
    row[col.key] || "-"
  )}
</td>

                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right Buttons — Bigger vertical buttons */}
            <div className="flex flex-col gap-4 h-full">
              {categoryButtons.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveTableCategory(cat.key)}
                  className={`bg-teal-600 hover:bg-teal-700 text-white rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center font-semibold text-base whitespace-nowrap flex-1 ${
                    activeTableCategory === cat.key ? "scale-105" : ""
                  }`}
                  style={{
                    writingMode: "vertical-rl",
                    padding: "1rem 1.25rem",
                  }}
                >
                  <span className="tracking-wide">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        {/* BUTTON BOX */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 mb-10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(13,148,136,0.25)]">
          <div className="flex flex-wrap justify-center gap-6">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat === "All FAQs") {
                    setActiveCategory(["All FAQs"]);
                  } else {
                    setActiveCategory((prev) => {
                      const isSelected = prev.includes(cat);
                      const newSelection = isSelected
                        ? prev.filter((c) => c !== cat)
                        : [...prev.filter((c) => c !== "All FAQs"), cat];
                      return newSelection.length === 0
                        ? ["All FAQs"]
                        : newSelection;
                    });
                  }
                }}
                className={`min-w-[220px] px-8 py-5 rounded-2xl text-lg font-semibold border-2 transition-all duration-300 backdrop-blur-sm
            ${
              activeCategory.includes(cat)
                ? "bg-teal-600/90 text-white border-teal-600 shadow-lg scale-105"
                : "bg-white/40 text-gray-800 border-white/30 hover:bg-white/60 hover:shadow-lg hover:border-teal-400"
            }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* QUESTIONS BOX */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(13,148,136,0.25)]">
          <div className="space-y-4">
            {(activeCategory.includes("All FAQs")
              ? Object.values(faqData).flat()
              : activeCategory.flatMap((cat) => faqData[cat] || [])
            ).map((item, idx) => (
              <div
                key={idx}
                className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() =>
                    setOpenQuestionIndex(openQuestionIndex === idx ? null : idx)
                  }
                  className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                >
                  <span className="font-semibold text-gray-900">{item.q}</span>
                  <svg
                    className={`w-5 h-5 text-gray-700 transform transition-transform duration-300 ${
                      openQuestionIndex === idx ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openQuestionIndex === idx && (
                  <div className="px-6 pb-4 text-gray-800 text-sm bg-white/40 rounded-b-2xl">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquire Now Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Enquire Now</h2>
        <p className="text-gray-700 mb-6 text-center max-w-2xl">
          Fill in your details and we will get back to you with the best LAS
          options available.
        </p>
        <button className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 font-semibold">
          Contact Us
        </button>
      </section>

      <Footer />
    </div>
  );
}
