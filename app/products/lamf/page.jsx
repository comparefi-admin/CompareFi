"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MessageCircle, FileText } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import SpotlightCard from "@/components/SpotlightCard.jsx";
import { faqData } from "./faqdata";
import { fetchLAMF, DEFAULT_NULL_TEXT } from "@/lib/fetchData";

/**
 * LAMFPage — Same UI/UX theme as LAS Page.
 */

export default function LAMFPage() {
  /** -------------------------------------------------------
   *  ALL HOOKS MUST COME BEFORE ANY CONDITIONAL RETURN !!!
   * --------------------------------------------------------*/

  // main data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // sorting
  const [sortFieldFunding, setSortFieldFunding] = useState(null);
  const [sortOrderFunding, setSortOrderFunding] = useState("asc");
  const [sortFieldCost, setSortFieldCost] = useState(null);
  const [sortOrderCost, setSortOrderCost] = useState("asc");

  // table + faq
  const [currentTable, setCurrentTable] = useState("funding");
  const [faqOpen, setFaqOpen] = useState(null);
  const [activeCategories, setActiveCategories] = useState(["All FAQs"]);
  const [activeTableCategory, setActiveTableCategory] =
    useState("fundingDetails");

  const allCategories = ["All FAQs", ...Object.keys(faqData)];

  /** ----------------------
   *  Helper Functions
   * ----------------------*/
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

  /** ----------------------
   *  Fetch Data
   * ----------------------*/
  useEffect(() => {
    const get = async () => {
      try {
        const lamf = await fetchLAMF();
        setData(lamf || []);
      } catch (err) {
        console.error("LAMF fetch error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    get();
  }, []);

  /** ----------------------
   *  Sorting Memo
   * ----------------------*/
  const sortedFundingData = useMemo(() => {
    if (!sortFieldFunding) return data;
    return [...data].sort((a, b) => {
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
    if (!sortFieldCost) return data;
    return [...data].sort((a, b) => {
      let valA = clean(a[sortFieldCost]);
      let valB = clean(b[sortFieldCost]);
      if (typeof valA === "number" && typeof valB === "number")
        return sortOrderCost === "asc" ? valA - valB : valB - valA;

      return sortOrderCost === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortFieldCost, sortOrderCost]);

  /** ----------------------
   *  FAQ Filter (SAFE)
   * ----------------------*/
  const filteredFaqs = useMemo(() => {
    if (!faqData) return [];

    // faqData array
    if (Array.isArray(faqData)) {
      if (activeCategories.includes("All FAQs")) return faqData;
      return faqData.filter((f) => activeCategories.includes(f.category));
    }

    // faqData object
    if (activeCategories.includes("All FAQs"))
      return Object.values(faqData).flat();

    return activeCategories.flatMap((cat) => faqData[cat] || []);
  }, [activeCategories, faqData]);

  const handleCategoryClick = (cat) => {
    setActiveCategories((prev) => {
      if (cat === "All FAQs") return ["All FAQs"];

      const isSelected = prev.includes(cat);
      let newSel = isSelected
        ? prev.filter((c) => c !== cat)
        : [...prev.filter((c) => c !== "All FAQs"), cat];

      return newSel.length ? newSel : ["All FAQs"];
    });
  };

  /** ----------------------
   *  Table Column Structure
   * ----------------------*/
  const categoryButtons = [
    { key: "fundingDetails", label: "Funding Related Details" },
    { key: "majorCost", label: "Major Cost" },
    { key: "defaultCharges", label: "Default Charges" },
    { key: "otherMiscCost", label: "Other Miscellaneous Cost" },
  ];

  const rightTableColumns = {
    fundingDetails: [
      { key: "approved_funds", label: "Approved Funds" },
      { key: "tenure_months", label: "Tenure (Months)" },
      { key: "loan_equity", label: "Equity MF Loan" },
      { key: "loan_debt", label: "Debt MF Loan" },
      { key: "ltv", label: "LTV - Funding (Debt/Equity %)" },
      { key: "regularization_period", label: "Margin Call Period (Days)" },
    ],
    majorCost: [
      { key: "interest_rate", label: "Interest Rate (Min / Max / Median %)" },
      { key: "processing_fee", label: "Processing Fee" },
      { key: "prepayment_charges", label: "Pre-payment Charges" },
      { key: "annual_maintenance", label: "Annual Maintenance / Renewal Fees" },
      { key: "penal_charges", label: "Penal Charges (%)" },
    ],
    defaultCharges: [{ key: "default_charges", label: "Default Charges" }],
    otherMiscCost: [{ key: "other_expenses", label: "Other Expenses" }],
  };

  /** ============================================================
   *                    ⬇⬇ RENDER STARTS HERE ⬇⬇
   * ============================================================ */

  return (
    <div className="bg-[#EFF3F6] min-h-screen">
      <Navbar />

      {/* ---------- LOADING ---------- */}
      {loading ? (
        <div className="flex items-center justify-center h-screen text-xl text-gray-600">
          Loading LAMF data...
        </div>
      ) : (
        <>
          {/** ---------------------------------------------------
           *   EVERYTHING BELOW RUNS ONLY AFTER LOADING
           * ---------------------------------------------------*/}

          {/* HERO */}
          <section className="w-[90%] mx-auto px-2 pt-32 pb-20 flex flex-col items-center">
            <SpotlightCard
              className="
                relative z-10 w-[90%] rounded-3xl
                bg-gradient-to-b from-[#1F5E3C] to-[#124434]
                backdrop-blur-xl
                shadow-[0_12px_32px_rgba(0,0,0,0.22)]
                sm:p-10 md:p-14 lg:p-20
                flex flex-col items-center justify-center mb-6
                hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
                hover:-translate-y-1 transition-all duration-700
                border border-white/10
              "
              spotlightColor="rgba(177,237,103,0.22)"
            >
             <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight text-center">
  Loan Against Mutual Funds (LAMF)
</h1>

<p className="mt-6 text-lg md:text-xl text-gray-100 text-center max-w-2xl leading-relaxed">
  Compare interest rates, LTV for debt & equity funds, and the true overall cost — 
  with clear, unbiased data to help you choose the best LAMF provider confidently.
</p>

            </SpotlightCard>
          </section>

          {/* ========== INFO CARDS (LAS-THEME EXACT) ========== */}
          <section className="max-w-[90%] mx-auto px-6 pb-16">
            <h2 className="text-4xl font-bold text-center mb-14 text-[#0A0F2C]">
              Understanding Loan Against Mutual Funds (LAMF)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                {
                  title: "What is LAMF?",
                  text: `Loan Against Mutual Funds lets you borrow funds by pledging your MF units while your investments continue compounding.`,
                },
                {
                  title: "Key Benefits",
                  text: (
                    <ul className="list-disc list-inside space-y-2">
                      <li>Liquidity without redeeming MF units.</li>
                      <li>Lower interest vs personal loan.</li>
                      <li>Continue earning returns on portfolio.</li>
                      <li>Fast approval via CAMS / KFintech.</li>
                    </ul>
                  ),
                },
                {
                  title: "LAMF vs Personal Loan",
                  text: (
                    <ul className="space-y-2">
                      <li>
                        <strong>Collateral:</strong> MF units.
                      </li>
                      <li>
                        <strong>Interest:</strong> Lower than personal loans.
                      </li>
                      <li>
                        <strong>Tenure:</strong> 12–36 months.
                      </li>
                      <li>
                        <strong>Disbursal:</strong> Same-day possible.
                      </li>
                    </ul>
                  ),
                },
                {
                  title: "Why Choose LAMF?",
                  text: `Ideal when you want liquidity without interrupting compounding—MF NAV volatility is lower than stocks.`,
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="
          bg-white/18 backdrop-blur-xl border border-[rgba(35,104,126,0.2)]
          rounded-3xl p-8
          bg-[#e8feff3f]
          shadow-[0_16px_38px_rgba(0,0,0,0.12)]
          transition-all duration-500
          hover:-translate-y-3
          hover:shadow-[0_16px_38px_rgba(0,0,0,0.26),0_6px_18px_rgba(0,0,0,0.08)]
          will-change-transform
        "
                >
                  <h3 className="text-2xl font-bold mb-4 text-[#0D3A27]">
                    {card.title}
                  </h3>
                  <p className="text-gray-800 leading-relaxed text-lg">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>

            {/* SNAPSHOT — EXACT LAS VERSION */}
            <div className="mt-16 text-center">
              <h3 className="text-4xl font-bold mb-8 text-[#0A0F2C]">
                Quick Snapshot
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  ["Interest Range", "8–18% p.a."],
                  ["Tenure", "Up to 36 months"],
                  ["Collateral Type", "Mutual Funds"],
                  ["Approval", "CAMS / KFintech"],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="
            bg-white/22 backdrop-blur-md border border-[rgba(255,255,255,0.06)]
            rounded-2xl p-4
            transition-all
            bg-[#20463B]
            shadow-[0_16px_38px_rgba(0,0,0,0.05)]
            hover:-translate-y-2
            hover:shadow-[0_14px_36px_rgba(0,0,0,0.22),inset_0_0_18px_rgba(255,255,255,0.06)]
          "
                  >
                    <p className="text-gray-100 text-sm">{label}</p>
                    <p className="text-2xl font-bold text-[#AFE619]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>



          {/* PRE–COST SUMMARY INFO CARDS (LAMF) */}
<section className="max-w-[90%] mx-auto px-6 mt-10 mb-4">
  <h3 className="text-4xl font-bold text-center mb-10 text-[#0A0F2C]">
    Before You Compare LAMF Costs
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* Card 1 */}
    <div
      className="
        bg-white/18 backdrop-blur-xl 
        border border-[rgba(35,104,126,0.2)]
        rounded-3xl p-8 shadow-[0_16px_38px_rgba(0,0,0,0.12)]
        transition-all duration-500 hover:-translate-y-3
        hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      "
    >
      <h4 className="text-2xl font-bold mb-4 text-[#0D3A27]">
        How the Cost Summary Is Calculated
      </h4>

      <p className="text-gray-800 leading-relaxed text-lg">
        The table below shows the total cost of a <strong>₹1,00,000 Loan Against Mutual Funds (LAMF)</strong> 
        over 12 months for each lender. Collateral given is <strong>₹2,00,000 MF</strong> and 
        an assumed <strong>50% funding ratio</strong> across financial institutions.
      </p>

      <p className="mt-3 text-gray-700 text-[1rem]">
        We convert Year-1 and Year-2 interest rates, lender fees, and all charges 
        into <strong>a single comparable number</strong> so you instantly understand 
        which lender is <strong>cheapest overall</strong>.
      </p>
    </div>

    {/* Card 2 */}
    <div
      className="
        bg-white/18 backdrop-blur-xl 
        border border-[rgba(35,104,126,0.2)]
        rounded-3xl p-8 shadow-[0_16px_38px_rgba(0,0,0,0.12)]
        transition-all duration-500 hover:-translate-y-3
        hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      "
    >
      <h4 className="text-2xl font-bold mb-4 text-[#0D3A27]">
        What You Can Quickly Compare
      </h4>

      <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
        <li>Overall cost for <strong>equity MF</strong> and <strong>debt MF</strong> loans</li>
        <li>Interest-rate structure across lenders</li>
        <li>Differences in <strong>approved MF lists</strong></li>
        <li><strong>LTV</strong> ranges for debt vs equity funds</li>
        <li>Margin-call timelines (buffer during NAV drops)</li>
      </ul>

      <p className="mt-3 text-gray-700 text-[1rem]">
        Most users only need this summary to choose the most 
        <strong> cost-effective lender</strong>.
      </p>
    </div>

  </div>
</section>


          {/* =============== COST SUMMARY TABLE (LAMF — EXACT LAS THEME) =============== */}
          <section className="max-w-[90%] mx-auto px-6 py-10 flex flex-col items-center">
            <h3 className="text-4xl font-bold mb-10 text-[#0A0F2C]">
              Cost Summary
            </h3>

            <div
              className="
    w-full bg-white backdrop-blur-2xl 
    border border-[rgba(255,255,255,0.06)]
    shadow-[0_12px_32px_rgba(0,0,0,0.22)]
    rounded-2xl overflow-x-auto
  "
            >
              <table className="w-full border-collapse text-gray-800 text-[16px] leading-[1.35] table-highlight">
              <thead>
  <tr className="text-left font-semibold border-b border-gray-300">

    {/* Institution */}
    <th
      style={{ background: "#124434", color: "#FFFFFF" }}
      className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
    >
      Institution
    </th>

    {/* 1st Year */}
    <th
      style={{ background: "#124434", color: "#FFFFFF" }}
      className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
    >
      1st Year
    </th>

    {/* 2nd Year */}
    <th
      style={{ background: "#124434", color: "#FFFFFF" }}
      className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
    >
      2nd Year
    </th>

    {/* Dynamic columns */}
    {rightTableColumns[activeTableCategory].map((col) => (
      <th
        key={col.key}
        style={{ background: "#124434", color: "#FFFFFF" }}
        className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
      >
        {col.label}
      </th>
    ))}

    

  </tr>
</thead>






                <tbody>
                  {data.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`
              transition-all duration-300
              ${index % 2 === 0 ? "bg-white/55" : "bg-white/36"}
              hover:bg-[#B1ED67]/22
              hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)]
            `}
                    >
                      {/* Institution */}
                      <td
                        className="
              px-5 py-4 border border-gray-300 font-semibold text-[#0A0F2C]
              bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5]
            "
                      >
                        {row.institution_name ?? DEFAULT_NULL_TEXT}
                      </td>

                      {/* 1st Year */}
                      <td className="px-5 py-4 border border-gray-300 text-[#1F5E3C] font-medium text-center">
                        {row.cost_first_year ? (
                          <>
                            <div>
                              Percent: {row.cost_first_year.percent ?? "—"}
                            </div>
                            <div>{row.cost_first_year.amount ?? "—"}</div>
                          </>
                        ) : (
                          DEFAULT_NULL_TEXT
                        )}
                      </td>

                      {/* 2nd Year */}
                      <td className="px-5 py-4 border border-gray-300 text-[#124434] font-medium text-center">
                        {row.cost_second_year ? (
                          <>
                            <div>
                              Percent: {row.cost_second_year.percent ?? "—"}
                            </div>
                            <div>{row.cost_second_year.amount ?? "—"}</div>
                          </>
                        ) : (
                          DEFAULT_NULL_TEXT
                        )}
                      </td>

                      {/* Approved Funds */}
                      <td className="px-5 py-4 border border-gray-300 text-gray-800 whitespace-pre-wrap text-center">
                        {row.approved_funds
                          ? `~ ${row.approved_funds}`
                          : DEFAULT_NULL_TEXT}
                      </td>

                      {/* Tenure */}
                      <td className="px-5 py-4 border border-gray-300 text-center">
                        {row.tenure_months ?? DEFAULT_NULL_TEXT}
                      </td>

                      {/* Loan Debt/Equity */}
                      <td className="px-5 py-4 border border-gray-300 text-center">
                        <div>
                          <strong>Debt:</strong>{" "}
                          {row.loan_debt
                            ? `${row.loan_debt.min ?? "—"} / ${
                                row.loan_debt.max ?? "—"
                              }`
                            : DEFAULT_NULL_TEXT}
                        </div>
                        <div>
                          <strong>Equity:</strong>{" "}
                          {row.loan_equity
                            ? `${row.loan_equity.min ?? "—"} / ${
                                row.loan_equity.max ?? "—"
                              }`
                            : DEFAULT_NULL_TEXT}
                        </div>
                      </td>

                      {/* Interest */}
                      <td className="px-5 py-4 border border-gray-300 text-center">
                        {row.interest_rate ? (
                          <>
                            <div>Min: {row.interest_rate.min ?? "—"}</div>
                            <div>Max: {row.interest_rate.max ?? "—"}</div>
                            <div>
                              Median: {row.interest_rate.median ?? "—"}
                            </div>
                          </>
                        ) : (
                          DEFAULT_NULL_TEXT
                        )}
                      </td>

                      {/* Margin */}
                      <td className="px-5 py-4 border border-gray-300 text-center">
                        {row.regularization_period ?? DEFAULT_NULL_TEXT}
                      </td>

                      {/* Contact Buttons */}
                      <td className="px-5 py-4 border border-gray-300 text-center">
                        <a
                          href={`https://wa.me/919930584020?text=Hi! I’m interested in LAMF by ${encodeURIComponent(
                            row.institution_name || "this institution"
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="
                  inline-flex items-center justify-center gap-2
                  bg-gradient-to-b from-[#1F5E3C] to-[#124434]
                  text-white px-4 py-2 rounded-lg
                  shadow-[0_10px_30px_rgba(0,0,0,0.20)]
                  hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
                  transition-all duration-300 transform hover:-translate-y-0.5
                "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M16 .8C7.6.8.8 7.6.8 16c0 2.8.8 5.6 2.4 8L0 32l8.4-3.2c2.4 1.2 4.8 1.6 7.6 1.6 8.4 0 15.2-6.8 15.2-15.2S24.4.8 16 .8zm0 27.6c-2.4 0-4.8-.8-6.8-1.6l-.4-.4-5.2 2 2-5.2-.4-.4c-1.6-2-2.4-4.4-2.4-6.8 0-7.2 5.6-12.8 12.8-12.8s12.8 5.6 12.8 12.8S23.2 28.4 16 28.4zm7.2-9.2c-.4-.4-2-1.2-2.4-1.2-.4 0-.8 0-1.2.4-.4.4-.8 1.2-1.2 1.6-.4.4-.8.4-1.2.2-1.2-.6-2.4-1.4-3.4-2.6-.8-.8-1.4-1.8-2-3-.2-.4 0-.8.2-1.2.2-.2.4-.6.6-.8.2-.2.2-.4.4-.8 0-.4 0-.8-.2-1.2-.2-.4-1.2-2.2-1.6-3s-.8-.6-1.2-.6h-1c-.4 0-.8.2-1.2.6-.4.6-1.6 1.6-1.6 4s1.6 4.6 1.8 5c.2.4 3 4.8 7.2 6.8 4.2 2.2 4.8 1.6 5.6 1.6.8 0 2.8-1 3.2-2 .4-.8.4-1.6.2-2-.2-.4-.4-.6-.8-.8z" />
                          </svg>
                          Enquire
                        </a>

                     <div className="mt-3">
  <a
    href={row.google_form_link || "#"}
    target="_blank"
    rel="noreferrer"
    className="
      inline-flex items-center justify-center gap-2
      bg-gradient-to-b from-[#5e009c] to-[#c401ff]
      text-white px-4 py-2 rounded-lg
      shadow-[0_10px_30px_rgba(0,0,0,0.20)]
      hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      transition-all duration-300 transform hover:-translate-y-0.5
      whitespace-nowrap
    "
  >
    <FileText className="w-10 h-4" /> Fill Enquiry
  </a>
</div>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty state */}
              {(!data || data.length === 0) && (
                <div className="text-gray-600 text-center py-8 font-medium text-[15px]">
                  No data available.
                </div>
              )}
            </div>
          </section>



{/* PRE–DETAILED COST SUMMARY INFO CARDS (LAMF) */}
<section className="max-w-[90%] mx-auto px-6 mt-10 mb-6">
  <h3 className="text-4xl font-bold text-center mb-10 text-[#0A0F2C]">
    Understanding the Full LAMF Cost Breakdown
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* Card 1 */}
    <div
      className="
        bg-white/18 backdrop-blur-xl 
        border border-[rgba(35,104,126,0.2)]
        rounded-3xl p-8 shadow-[0_16px_38px_rgba(0,0,0,0.12)]
        transition-all duration-500 hover:-translate-y-3
        hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      "
    >
      <h4 className="text-2xl font-bold mb-4 text-[#0D3A27]">
        What This Section Shows
      </h4>

      <p className="text-gray-800 leading-relaxed text-lg">
        The detailed cost tables below show the complete pricing structure for every lender —
        including year-wise interest, approved fund lists, loan limits, LTV levels for 
        debt and equity funds, and margin-call periods.
      </p>

      <p className="mt-3 text-gray-700 text-[1rem]">
        This gives <strong>full transparency</strong> into how lenders price LAMF loans and 
        shows the exact components used to compute the overall cost in the summary table above.
      </p>
    </div>

    {/* Card 2 */}
    <div
      className="
        bg-white/18 backdrop-blur-xl 
        border border-[rgba(35,104,126,0.2)]
        rounded-3xl p-8 shadow-[0_16px_38px_rgba(0,0,0,0.12)]
        transition-all duration-500 hover:-translate-y-3
        hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      "
    >
      <h4 className="text-2xl font-bold mb-4 text-[#0D3A27]">
        How to Use the Tabs Above
      </h4>

      <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
        <li><strong>Funding-Related Details:</strong> Loan limits, approved funds list, LTV for debt & equity</li>
        <li><strong>Major Cost:</strong> Processing, renewal & annual maintenance fees</li>
        <li><strong>Default Charges:</strong> Penal interest, overdue charges, margin shortfall penalties</li>
        <li><strong>Other Miscellaneous Cost:</strong> DP/lien charges, brokerage, stamp duty, fund-house fees</li>
      </ul>

      <p className="mt-3 text-gray-700 text-[1rem]">
        Perfect for users who want to verify calculations or compare lender policies in detail.
      </p>
    </div>

  </div>
</section>

          {/* =====================================================
           *  DETAILED LAMF COST SUMMARY — EXACT LAS THEME
           * ===================================================== */}
          <section className="max-w-[90%] mx-auto px-6 py-10 flex flex-col items-center">
            <h3 className="text-4xl font-bold mb-8 text-[#0A0F2C]">
              Detailed LAMF Cost Summary
            </h3>

            <div
              className="
      w-full bg-white backdrop-blur-xl 
      border border-[rgba(255,255,255,0.06)]
      shadow-[0_12px_32px_rgba(0,0,0,0.22)]
      rounded-2xl p-6
    "
            >
              {/* CATEGORY BUTTONS (Exact LAS style) */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {categoryButtons.map((b) => (
                  <button
                    key={b.key}
                    onClick={() => setActiveTableCategory(b.key)}
                    className={`
            px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300
            ${
              activeTableCategory === b.key
                ? "bg-[#124434] text-white scale-105 shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
                : "bg-white/60 text-gray-800 hover:bg-white hover:shadow-md"
            }
          `}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-base text-gray-900 table-highlight">
             <thead>
  <tr className="text-left font-semibold border-b border-gray-300">

    {/* Institution */}
    <th
      style={{ background: "#124434", color: "#FFFFFF" }}
      className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
    >
      Institution
    </th>

    {/* 1st Year */}
    <th
      style={{ background: "#124434", color: "#FFFFFF" }}
      className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
    >
      1st Year
    </th>

    {/* 2nd Year */}
    <th
      style={{ background: "#124434", color: "#FFFFFF" }}
      className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
    >
      2nd Year
    </th>

    {/* Dynamic columns */}
    {rightTableColumns[activeTableCategory].map((col) => (
      <th
        key={col.key}
        style={{ background: "#124434", color: "#FFFFFF" }}
        className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
      >
        {col.label}
      </th>
    ))}

    {/* Contact */}
    <th
      style={{ background: "#124434", color: "#FFFFFF" }}
      className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
    >
      Contact
    </th>

  </tr>
</thead>







                  <tbody>
                    {sortedCostData.map((row, index) => (
                      <tr
                        key={row.id}
                        className={`
                transition-all duration-300 
                ${index % 2 === 0 ? "bg-white/55" : "bg-white/36"}
                hover:bg-[#B1ED67]/22 
                hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)]
              `}
                      >
                        {/* Institution */}
                        <td className="px-5 py-4 border border-gray-300 font-semibold text-[#0A0F2C] bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5] rounded-md">
                          {row.institution_name ?? DEFAULT_NULL_TEXT}
                        </td>

                        {/* 1st Year */}
                        <td className="px-5 py-4 border border-gray-300 text-center text-[#1F5E3C] bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5] rounded-md">
                          {row.cost_first_year ? (
                            <>
                              <div>
                                Percent: {row.cost_first_year.percent ?? "—"}
                              </div>
                              <div>{row.cost_first_year.amount ?? "—"}</div>
                            </>
                          ) : (
                            DEFAULT_NULL_TEXT
                          )}
                        </td>

                        {/* 2nd Year */}
                        <td className="px-5 py-4 border border-gray-300 text-center text-[#124434] bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5] rounded-md">
                          {row.cost_second_year ? (
                            <>
                              <div>
                                Percent: {row.cost_second_year.percent ?? "—"}
                              </div>
                              <div>{row.cost_second_year.amount ?? "—"}</div>
                            </>
                          ) : (
                            DEFAULT_NULL_TEXT
                          )}
                        </td>

                        {/* Dynamic Fields */}
                        {rightTableColumns[activeTableCategory].map((c) => {
                          const v = row[c.key];
                          return (
                            <td
                              key={c.key}
                              className="px-5 py-4 border border-gray-300 whitespace-pre-wrap"
                            >
                              {v == null
                                ? DEFAULT_NULL_TEXT
                                : typeof v === "object"
                                ? Object.entries(v).map(([k, val], i) => (
                                    <div key={i}>
                                      {k}: {val ?? "—"}
                                    </div>
                                  ))
                                : v}
                            </td>
                          );
                        })}

                        {/* Contact */}
                        <td className="px-5 py-4 border border-gray-300 text-center">
                          <a
                            href={`https://wa.me/919930584020?text=Hi! I'm interested in LAMF by ${encodeURIComponent(
                              row.institution_name || "this institution"
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="
                    inline-flex items-center justify-center gap-2
                    bg-gradient-to-b from-[#1F5E3C] to-[#124434]
                    text-white px-4 py-2 rounded-lg
                    shadow-[0_10px_30px_rgba(0,0,0,0.20)]
                    hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
                    transition-all duration-300 transform hover:-translate-y-0.5
                  "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                              fill="currentColor"
                              className="w-12 h-4"
                            >
                              <path d="M16 .8C7.6.8.8 7.6.8 16c0 2.8.8 5.6 2.4 8L0 32l8.4-3.2c2.4 1.2 4.8 1.6 7.6 1.6 8.4 0 15.2-6.8 15.2-15.2S24.4.8 16 .8zm0 27.6c-2.4 0-4.8-.8-6.8-1.6l-.4-.4-5.2 2 2-5.2-.4-.4c-1.6-2-2.4-4.4-2.4-6.8 0-7.2 5.6-12.8 12.8-12.8s12.8 5.6 12.8 12.8S23.2 28.4 16 28.4zm7.2-9.2c-.4-.4-2-1.2-2.4-1.2-.4 0-.8 0-1.2.4-.4.4-.8 1.2-1.2 1.6-.4.4-.8.4-1.2.2-1.2-.6-2.4-1.4-3.4-2.6-.8-.8-1.4-1.8-2-3-.2-.4 0-.8.2-1.2.2-.2.4-.6.6-.8.2-.2.2-.4.4-.8 0-.4 0-.8-.2-1.2-.2-.4-1.2-2.2-1.6-3s-.8-.6-1.2-.6h-1c-.4 0-.8.2-1.2.6-.4.6-1.6 1.6-1.6 4s1.6 4.6 1.8 5c.2.4 3 4.8 7.2 6.8 4.2 2.2 4.8 1.6 5.6 1.6.8 0 2.8-1 3.2-2 .4-.8.4-1.6.2-2-.2-.4-.4-.6-.8-.8z" />
                            </svg>
                            Enquire
                          </a>

                         <div className="mt-3">
  <a
    href={row.google_form_link || "#"}
    target="_blank"
    rel="noreferrer"
    className="
      inline-flex items-center justify-center gap-2
      bg-gradient-to-b from-[#5e009c] to-[#c401ff]
      text-white px-4 py-2 rounded-lg
      shadow-[0_10px_30px_rgba(0,0,0,0.20)]
      hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      transition-all duration-300 transform hover:-translate-y-0.5
      whitespace-nowrap
    "
  >
    <FileText className="w-10 h-4" /> Fill Enquiry
  </a>
</div>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>


          {/* LAMF Summary — Before FAQ */}
<section className="max-w-[90%] mx-auto px-6 py-16">
  <h2 className="text-4xl font-bold text-center mb-10 text-[#0A0F2C]">
    Key Takeaways to Guide Your LAMF Decision
  </h2>

  <div
    className="
      bg-white/20 backdrop-blur-xl
      border border-[rgba(255,255,255,0.10)]
      shadow-[0_16px_38px_rgba(0,0,0,0.15)]
      rounded-3xl p-10
      leading-relaxed text-gray-900
    "
  >
    <p className="text-[1.15rem] mb-6">
      <strong>Loan Against Mutual Funds (LAMF)</strong> allows you to borrow against your existing 
      MF investments without redeeming them, helping you maintain compounding benefits while getting 
      quick liquidity. Interest rates are typically lower than personal loans, and lenders provide 
      separate <strong>LTV structures for debt and equity mutual funds</strong>.
    </p>

    <p className="text-[1.15rem] mb-6">
      CompareFi calculates the <strong>true overall cost</strong> of a ₹1,00,000 LAMF (based on 
      ₹2,00,000 pledged MF units at ~50% funding) across lenders — including interest, charges, 
      and taxes. This removes the confusion around different APR structures and allows you to see 
      which lender is genuinely <strong>most cost-effective</strong>.
    </p>

    <p className="text-[1.15rem] mb-6">
      Debt mutual funds usually receive <strong>higher LTV</strong> (sometimes up to 80–90%), while 
      equity-oriented funds receive lower LTVs due to volatility. Some lenders also approve more 
      mutual funds than others, which directly affects your borrowing flexibility. Margin-call 
      buffers differ as well, impacting your risk during NAV dips.
    </p>

    <p className="text-[1.15rem]">
      Before choosing a lender, assess their overall cost, LTV for your specific fund type, 
      approved MF list coverage, and margin-call flexibility. CompareFi makes this simple with 
      transparent and unbiased data.
    </p>
  </div>

  {/* CTA Block */}
  <div className="mt-12 flex flex-col items-center text-center">
    <h3 className="text-3xl font-bold text-[#0A0F2C] mb-4">
      Enquire Now — We’ll Suggest the Best LAMF Provider for You
    </h3>

    <p className="text-gray-700 max-w-2xl mb-8">
      Chat on WhatsApp or submit a short form — we’ll analyse your mutual funds and 
      recommend the <strong>lowest-cost LAMF option</strong> based on your portfolio.
    </p>

    <div className="flex flex-wrap justify-center gap-6">

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919930584020?text=Hi! I need help choosing the best LAMF provider."
        target="_blank"
        rel="noreferrer"
        className="
          inline-flex items-center justify-center gap-2
          bg-gradient-to-b from-[#1F5E3C] to-[#124434]
          text-white px-8 py-4 rounded-2xl text-lg font-semibold
          shadow-[0_16px_38px_rgba(0,0,0,0.26)]
          hover:shadow-[0_18px_42px_rgba(0,0,0,0.30)]
          transition-all duration-300 hover:-translate-y-1
        "
      >
        <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
      </a>

      {/* Google Form Button */}
      <a
        href="https://forms.gle/yourformlink"
        target="_blank"
        rel="noreferrer"
        className="
          inline-flex items-center justify-center gap-2
          bg-gradient-to-b from-[#5e009c] to-[#c401ff]
          text-white px-8 py-4 rounded-2xl text-lg font-semibold
          shadow-[0_16px_38px_rgba(0,0,0,0.26)]
          hover:shadow-[0_18px_42px_rgba(0,0,0,0.30)]
          transition-all duration-300 hover:-translate-y-1
        "
      >
        <FileText className="w-5 h-5" /> Submit Form
      </a>
    </div>

    <p className="mt-4 text-gray-600 text-sm">
      Free & unbiased comparison • No data sharing • No obligation to apply
    </p>
  </div>
</section>


          {/* HOW TO APPLY & KEY FACTORS */}
          <section className="max-w-[90%] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Card 1 */}
            <div
              className="backdrop-blur-xl border bg-[#e8feff3f]
          shadow-[0_16px_38px_rgba(0,0,0,0.05)] border-[rgba(35,104,126,0.2)] rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)] hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold mb-6 text-[#0D3A27]">
                How to Apply for LAMF in 2025: Step-by-Step Guide
              </h3>
              <ol className="list-decimal list-inside space-y-3 leading-relaxed text-[1.05rem] mb-6 text-gray-800">
                <li>
                  <strong>Select Eligible Funds:</strong> Verify mutual funds
                  are on the lender’s approved list (via CAMS / KFintech).
                </li>
                <li>
                  <strong>Compare Lenders:</strong> Use our tables to shortlist
                  based on rates, LTV, and fees.
                </li>
                <li>
                  <strong>Apply Online:</strong> Submit application via lender
                  portal or fintech platform.
                </li>
                <li>
                  <strong>Complete KYC & Lien Marking:</strong> Provide PAN,
                  Aadhaar, MF statement, bank proof; pledge via CAMS / KFintech.
                </li>
                <li>
                  <strong>Disbursal:</strong> Funds credited in{" "}
                  <strong>4–24 hours</strong> for digital applications.
                </li>
              </ol>
              <p className="text-sm text-gray-700">
                <strong>Tip:</strong> Digital-first lenders and fintechs
                typically deliver the fastest disbursal.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="bg-[#C0CDCF]
          shadow-[0_16px_38px_rgba(0,0,0,0.05) backdrop-blur-xl border border-[rgba(255,255,255,0.2)] rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)] hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold mb-6 text-black">
                Key Factors: Choosing the Best LAMF Provider
              </h3>
              <ul className="list-disc list-inside space-y-3 text-black leading-relaxed text-[1.05rem]">
                <li>
                  <strong>LTV Ratio:</strong> Up to <strong>90%</strong> for
                  debt funds (example: some lenders); ~50–60% for
                  equity-oriented funds.
                </li>
                <li>
                  <strong>Approved Funds:</strong> Broader approved lists (e.g.,
                  Tata Capital, HDFC ~1000+ funds) give greater flexibility.
                </li>
                <li>
                  <strong>Margin Call Period:</strong> Longer periods (e.g., 7
                  days with certain lenders) provide more time to regularize
                  positions.
                </li>
                <li>
                  <strong>Total Costs:</strong> Watch renewal & penal fees — low
                  renewal fees (e.g., SBI ~₹550) reduce long-term expense.
                </li>
              </ul>
            </div>
          </section>

          {/* ================ FAQ SECTION ================ */}
          <section className="relative max-w-[90%] mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold text-center mb-12">
              Frequently Asked Questions about LAMF
            </h2>

            {/* Categories */}
            <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow mb-10">
              <div className="flex flex-wrap justify-center gap-6">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`min-w-[200px] px-8 py-5 rounded-2xl text-lg font-semibold border transition-all
                      ${
                        activeCategories.includes(cat)
                          ? "bg-[#124434] text-white scale-105 shadow-xl"
                          : "bg-white/40 text-gray-900 border-white/40 hover:bg-white/60"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ list */}
            <div className="bg-white/20 backdrop-blur-xl p-10 rounded-3xl shadow">
              <div className="space-y-4">
                {filteredFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="
                      bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl
                      shadow transition hover:shadow-xl
                    "
                  >
                    <button
                      onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                      className="w-full flex justify-between items-center px-6 py-4 text-left"
                    >
                      <span className="font-semibold text-gray-900">
                        {faq.question ?? faq.q}
                      </span>
                      <svg
                        className={`w-5 h-5 transition ${
                          faqOpen === idx ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {faqOpen === idx && (
                      <div className="px-6 pb-4 text-gray-800 bg-white/40">
                        {faq.answer ?? faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================ ENQUIRE NOW ================ */}
          <section className="max-w-[85%] mx-auto px-6 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#0A0F2C]">
              Enquire Now
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Fill in your details and we will get back to you with the best
              LAMF options.
            </p>

            <button
              onClick={() =>
                window.open(
                  "https://wa.me/919930584020?text=Hi! I’m interested in learning more about LAMF options.",
                  "_blank"
                )
              }
              className="
    bg-gradient-to-b from-[#1F5E3C] to-[#124434]
    text-white px-8 py-4 rounded-2xl shadow-xl
    hover:-translate-y-1 transition
  "
            >
              Contact Us
            </button>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
