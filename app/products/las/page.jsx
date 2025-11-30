"use client";
import { MessageCircle } from "lucide-react";
import { FileText } from "lucide-react";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import SpotlightCard from "@/components/SpotlightCard.jsx";
import { faqData } from "./faqdata";
import { fetchLAS, DEFAULT_NULL_TEXT } from "@/lib/fetchData";

/**
 * LASPage — Luxury Depth (Option A) theme applied.
 * - Deeper greens: #124434 (primary), #1F5E3C (secondary), #0D3A27 (accent)
 * - Stronger layered shadows for premium depth
 * - Slightly brighter lime glows kept as highlight (#B1ED67)
 *
 * NOTE: Only presentation (CSS classes) modified. No logic changes.
 */

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

  const categoryButtons = [
    { key: "fundingDetails", label: "Funding Related Details" },
    { key: "majorCost", label: "Major Cost" },
    { key: "defaultCharges", label: "Default Charges" },
    { key: "otherMiscCost", label: "Other Miscellaneous Cost" },
  ];

  const rightTableColumns = {
    fundingDetails: [
      { key: "approved_shares", label: "Approved List of Shares" },
      { key: "tenure_months", label: "Tenure (Months)" },
      { key: "loan_amount", label: "Minimum & Maximum Loan" },
      { key: "regularization_period", label: "Regularization / Margin Call Period (Days)" },
      { key: "ltv", label: "LTV - Funding (Min / Max %)" },
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

  const [activeTableCategory, setActiveTableCategory] =
    useState("fundingDetails");

  // fetch
  useEffect(() => {
    const load = async () => {
      try {
        const las = await fetchLAS();
        setData(las || []);
      } catch (err) {
        console.error("fetchLAS error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const clean = (val) => {
    if (typeof val === "string")
      return parseFloat(val.replace(/[₹,%]/g, "")) || val;
    return val;
  };

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading data...
      </div>
    );

  return (
    <div className="bg-[#EFF3F6] min-h-screen">
      <Navbar />

      {/* HERO / SPOTLIGHT */}
      <section className="w-[90%] mx-auto px-2 pt-32 pb-20 flex flex-col items-center">
        <SpotlightCard
          className="
            relative z-10 w-[90%] rounded-3xl
            bg-gradient-to-b from-[#1F5E3C] to-[#124434]
            backdrop-blur-xl
            shadow-[0_12px_32px_rgba(0,0,0,0.22),0_4px_10px_rgba(0,0,0,0.08)]
            sm:p-10 md:p-14 lg:p-20
            flex flex-col items-center justify-center mb-6
            hover:shadow-[0_16px_38px_rgba(0,0,0,0.26),0_6px_14px_rgba(0,0,0,0.10)]
            hover:translate-y-[-2px] transition-all duration-700
            border border-[rgba(255,255,255,0.08)]
          "
          spotlightColor="rgba(177,237,103,0.22)"
        >
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Loan Against Shares
          </h1>
        </SpotlightCard>
      </section>

      {/* INFO CARDS */}
      <section className="max-w-[90%] mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold text-center mb-14 text-[#0A0F2C]">
          Understanding Loan Against Shares (LAS)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              title: "What is Loan Against Shares?",
              text: `Loan Against Shares (LAS), a type of Loan Against Securities, is a secured overdraft facility where you pledge listed shares as collateral to borrow funds without selling them.Retain ownership, earn dividends, and access liquidity at lower rates (8-20% p.a.) than personal loans. Ideal for emergencies, business needs, or investments excluding speculative trading.`,
            },
            {
              title: "Key Benefits",
              text: (
                <ul className="list-disc list-inside space-y-2">
                  <li>Borrow at lower interest rates (8–20% p.a.) compared to personal loans.</li>
                  <li>Quick liquidity without liquidating your portfolio.</li>
                  <li>Retain share ownership and earn dividends.</li>
                  <li>Flexible usage for business, emergencies, or investments (non-speculative)</li>
                </ul>
              ),
            },
            {
              title: "LAS vs Personal Loan",
              text: (
                <ul className="space-y-2">
                  <li><strong>Collateral:</strong>  LAS requires pledged shares; personal loans are unsecured.</li>
                  <li><strong>Interest:</strong> LAS: 8–15%; Personal: 10–24%.</li>
                  <li><strong>Tenure:</strong> Up to 36 months</li>
                  <li><strong>Disbursal:</strong>LAS: 1–2 days with digital pledge.</li>
                </ul>
              ),
            },
            {
              title: "Why Choose LAS?",
              text: `Maintain your market exposure while unlocking the cash value of your portfolio. LAS is ideal for investors navigating volatile markets who want liquidity without losing out on potential growth.`,
            },
          ].map((card, i) => (
            <div
              key={i}
              className="
                bg-white/18 backdrop-blur-xl border border-[rgba(35,104,126,0.2)]
                rounded-3xl
                p-8
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
              <p className="text-gray-800 leading-relaxed text-lg">{card.text}</p>
            </div>
          ))}
        </div>

        {/* SNAPSHOT */}
        <div className="mt-16 text-center">
          <h3 className="text-4xl font-bold mb-8 text-[#0A0F2C]">Quick Snapshot</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ["Interest Range", "8–20% p.a."],
              ["Tenure", "Up to 36 months"],
              ["Disbursal", "1–2 Days"],
              ["Collateral", "Listed Shares"],
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

      {/* COST SUMMARY */}
      <section className="max-w-[90%] mx-auto px-6 py-10 flex flex-col items-center">
        <h3 className="text-4xl font-bold mb-10 text-[#0A0F2C]">Cost Summary</h3>

        <div className="w-full bg-white backdrop-blur-2xl border border-[rgba(255,255,255,0.06)] shadow-[0_12px_32px_rgba(0,0,0,0.22)] rounded-2xl overflow-x-auto">
          <table className="w-full border-collapse text-gray-800 text-[16px] leading-[1.35] table-highlight">

            <thead className="bg-white/80 border-b border-gray-300">
              <tr>
                {[
                  "Institution",
                  "1st Year (₹1L LAS)",
                  "2nd Year (₹1L LAS)",
                  "Approved Shares",
                  "Tenure",
                  "Min–Max Loan",
                  "Interest (Min/Max/Median)",
                  "Margin Period",
                  "Contact",
                ].map((heading, i) => (
                  <th
                    key={i}
                    className={`px-5 py-3 font-semibold border border-gray-300 uppercase text-sm tracking-wide 
                      ${
                        i < 3
                          ? "bg-gradient-to-br from-[#FBFCFD] to-[#EFF7F1]"
                          : "bg-white/70"
                      }
                    `}
                  >
                    {heading}
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
                  <td className="px-5 py-4 border border-gray-300 font-semibold text-[#0A0F2C] bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5]">
                    {row.institution_name ?? DEFAULT_NULL_TEXT}
                  </td>

                  {/* 1st Year */}
                  <td className="px-5 py-4 border border-gray-300 text-[#1F5E3C] font-medium text-center">
                    {row.cost_first_year ? (
                      <>
                        <div>Percent: {row.cost_first_year.percent ?? "—"}</div>
                        <div>₹{row.cost_first_year.amount ?? "—"}</div>
                      </>
                    ) : (
                      DEFAULT_NULL_TEXT
                    )}
                  </td>

                  {/* 2nd Year */}
                  <td className="px-5 py-4 border border-gray-300 text-[#124434] font-medium text-center">
                    {row.cost_second_year ? (
                      <>
                        <div>Percent: {row.cost_second_year.percent ?? "—"}</div>
                        <div>₹{row.cost_second_year.amount ?? "—"}</div>
                      </>
                    ) : (
                      DEFAULT_NULL_TEXT
                    )}
                  </td>

                  {/* Approved Shares */}
                  <td className="px-5 py-4 border border-gray-300 text-gray-800 whitespace-pre-wrap">
                    {row.approved_shares
                      ? `~ ${row.approved_shares} shares`
                      : DEFAULT_NULL_TEXT}
                  </td>

                  {/* Tenure */}
                  <td className="px-5 py-4 border border-gray-300 text-center">
                    {row.tenure_months ?? DEFAULT_NULL_TEXT}
                  </td>

                  {/* Loan Amount */}
                  <td className="px-5 py-4 border border-gray-300 text-center">
                    {row.loan_amount ? (
                      <div>
                        <div>Min: {row.loan_amount.min ?? "—"}</div>
                        <div>Max: {row.loan_amount.max ?? "—"}</div>
                      </div>
                    ) : (
                      DEFAULT_NULL_TEXT
                    )}
                  </td>

                  {/* Interest Rate */}
                  <td className="px-5 py-4 border border-gray-300 text-center">
                    {row.interest_rate ? (
                      <div>
                        <div>Min: {row.interest_rate.min ?? "—"}%</div>
                        <div>Max: {row.interest_rate.max ?? "—"}%</div>
                        <div>Median: {row.interest_rate.median ?? "—"}%</div>
                      </div>
                    ) : (
                      DEFAULT_NULL_TEXT
                    )}
                  </td>

                  {/* Margin Period */}
                  <td className="px-5 py-4 border border-gray-300 text-center">
                    {row.regularization_period ?? DEFAULT_NULL_TEXT}
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4 border border-gray-300 text-center">
                    <a
                      href={`https://wa.me/919930584020?text=Hi! I’m interested in learning more about LAS by ${encodeURIComponent(
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
                      <>
  <MessageCircle className="w-4 h-4" /> Enquire
</>


                    </a>
                    <div className="mt-3">
  <a
    href={row.google_form_link || "https://forms.gle/yourfallback"}
    target="_blank"
    rel="noreferrer"
    className="
      inline-flex items-center justify-center gap-2
      bg-gradient-to-b from-[#5e009c] to-[#c401ff]
      text-white px-4 py-2 rounded-lg
      shadow-[0_10px_30px_rgba(0,0,0,0.20)]
      hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      transition-all duration-300 transform hover:-translate-y-0.5
    "
  >
    <FileText className="w-4 h-4" /> Fill Enquiry
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

      {/* DETAILED LAS COST SUMMARY */}
      <section className="max-w-[90%] mx-auto px-6 py-10 flex flex-col items-center">
        <h3 className="text-4xl font-bold mb-8 text-[#0A0F2C]">Detailed LAS Cost Summary</h3>

        <div className="w-full bg-white backdrop-blur-xl border border-[rgba(255,255,255,0.06)] shadow-[0_12px_32px_rgba(0,0,0,0.22)] rounded-2xl p-6">
          {/* BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {categoryButtons.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTableCategory(cat.key)}
                className={`
                  px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                  ${
                    activeTableCategory === cat.key
                      ? "bg-[#124434] text-white scale-105 shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
                      : "bg-white/60 text-gray-800 hover:bg-white hover:shadow-md"
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-base text-gray-900 table-highlight">
              <thead>
                <tr className="text-left font-semibold border-b border-white/30">
                  <th className="px-5 py-4 bg-gradient-to-br from-[#FBFCFD] to-[#EFF7F1] border border-gray-300 rounded-md">
                    Institution
                  </th>
                  <th className="px-5 py-4 bg-gradient-to-br from-[#FBFCFD] to-[#EFF7F1] border border-gray-300 text-[#1F5E3C] rounded-md">
                    1st Year
                  </th>
                  <th className="px-5 py-4 bg-gradient-to-br from-[#FBFCFD] to-[#EFF7F1] border border-gray-300 text-[#124434] rounded-md">
                    2nd Year
                  </th>

                  {rightTableColumns[activeTableCategory].map((col) => (
                    <th key={col.key} className="px-5 py-4 border border-gray-300 bg-white/60">
                      {col.label}
                    </th>
                  ))}

                  <th className="px-5 py-4 border border-gray-300 bg-white/60">Contact</th>
                </tr>
              </thead>

              <tbody>
                {sortedCostData.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`transition-all duration-300 ${
                      index % 2 === 0 ? "bg-white/55" : "bg-white/36"
                    } hover:bg-[#B1ED67]/22 hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)]`}
                  >
                    <td className="px-5 py-4 border border-gray-300 font-semibold text-[#0A0F2C] bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5] rounded-md">
                      {row.institution_name ?? DEFAULT_NULL_TEXT}
                    </td>

                    {/* 1st Year */}
                    <td className="px-5 py-4 border border-gray-300 text-center text-[#1F5E3C] bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5] rounded-md">
                      {row.cost_first_year ? (
                        <>
                          <div>Percent: {row.cost_first_year.percent ?? "—"}</div>
                          <div>₹{row.cost_first_year.amount ?? "—"}</div>
                        </>
                      ) : (
                        DEFAULT_NULL_TEXT
                      )}
                    </td>

                    {/* 2nd Year */}
                    <td className="px-5 py-4 border border-gray-300 text-center text-[#124434] bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5] rounded-md">
                      {row.cost_second_year ? (
                        <>
                          <div>Percent: {row.cost_second_year.percent ?? "—"}</div>
                          <div>₹{row.cost_second_year.amount ?? "—"}</div>
                        </>
                      ) : (
                        DEFAULT_NULL_TEXT
                      )}
                    </td>

                    {/* Dynamic columns */}
                    {rightTableColumns[activeTableCategory].map((col) => {
                      const val = row[col.key];
                      return (
                        <td key={col.key} className="px-5 py-4 border border-gray-300 whitespace-pre-wrap">
                          {val == null
                            ? DEFAULT_NULL_TEXT
                            : typeof val === "object"
                            ? Object.entries(val).map(([k, v], i) => (
                                <div key={i}>{k}: {v ?? "—"}</div>
                              ))
                            : val}
                        </td>
                      );
                    })}

                    <td className="px-5 py-4 border border-gray-300 text-center">
                    <a
                      href={`https://wa.me/919930584020?text=Hi! I’m interested in learning more about LAS by ${encodeURIComponent(
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
                      <>
  <MessageCircle className="w-4 h-4" /> Enquire
</>


                    </a>
                    <div className="mt-3">
  <a
    href={row.google_form_link || "https://forms.gle/yourfallback"}
    target="_blank"
    rel="noreferrer"
    className="
      inline-flex items-center justify-center gap-2
      bg-gradient-to-b from-[#5e009c] to-[#c401ff]
      text-white px-1 py-2 rounded-lg
      shadow-[0_10px_30px_rgba(0,0,0,0.20)]
      hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      transition-all duration-300 transform hover:-translate-y-0.5
    "
  >
    <FileText className="w-4 h-4" /> Fill Enquiry
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

      {/* HOW TO APPLY & KEY FACTORS */}
      <section className="max-w-[90%] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Card 1 */}
        <div className=" backdrop-blur-xl border bg-[#e8feff3f]
                shadow-[0_16px_38px_rgba(0,0,0,0.05)] border-[rgba(35,104,126,0.2)] rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)] hover:-translate-y-2">
          <h3 className="text-2xl font-bold mb-6 text-[#0D3A27]">How to Apply for LAS in 2025</h3>
          <ol className="list-decimal list-inside space-y-3 text-whit leading-relaxed text-[1.05rem] mb-6">
            <li><strong>Assess Eligibility:</strong> Ages 18–70, Indian resident/NRI, decent credit score, approved shares in demat.</li>
            <li><strong>Compare & Shortlist:</strong> Use our tables/filters for interest rate, LTV (HDFC up to 80%).</li>
            <li><strong>Gather Documents:</strong> PAN, Aadhaar, demat statement, pledge form, photo, bank proof.</li>
            <li><strong>Apply Online:</strong> Apply via lender; pledge via NSDL/CDSL.</li>
            <li><strong>Disbursal & Monitoring:</strong> Funds in 1–2 days; monitor for margin calls.</li>
          </ol>
          <p className="text-sm text-gray-700"><strong>Tip:</strong> 100% digital apps can disburse within 24 hours.</p>
        </div>

        

        {/* Card 3 */}
        <div className="bg-[#C0CDCF]
                shadow-[0_16px_38px_rgba(0,0,0,0.05) backdrop-blur-xl border border-[rgba(255,255,255,0.2)] rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)] hover:-translate-y-2">
          <h3 className="text-2xl font-bold mb-6 text-black">Key Factors: Best LAS Provider 2025</h3>
          <ul className="list-disc list-inside space-y-3 text-black leading-relaxed text-[1.05rem]">
            <li><strong>LTV Ratio:</strong> Higher LTV (HDFC 65–80%) → more borrowing power.</li>
            <li><strong>Approved Shares:</strong> Broader lists (Tata Capital ~1004+) give flexibility.</li>
            <li><strong>Margin Call Period:</strong> Longer (7 days — Bajaj/Mirae) = more buffer time.</li>
            <li><strong>Total Costs:</strong> Consider renewal & penal charges (BoB ~10.23% Yr 2).</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative max-w-[90%] mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

        <div className="bg-white/20 backdrop-blur-xl border border-[rgba(255,255,255,0.06)] shadow-[0_12px_32px_rgba(0,0,0,0.22)] rounded-3xl p-8 mb-10">
          <div className="flex flex-wrap justify-center gap-6">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat === "All FAQs") {
                    setActiveCategory(["All FAQs"]);
                  } else {
                    setActiveCategory((prev) => {
                      const selected = prev.includes(cat);
                      const newSel = selected
                        ? prev.filter((c) => c !== cat)
                        : [...prev.filter((c) => c !== "All FAQs"), cat];
                      return newSel.length === 0 ? ["All FAQs"] : newSel;
                    });
                  }
                }}
                className={`
                  min-w-[220px] px-8 py-5 rounded-2xl text-lg font-semibold 
                  border-2 transition-all duration-300
                  ${
                    activeCategory.includes(cat)
                      ? "bg-[#124434] text-white border-[#124434] shadow-[0_18px_40px_rgba(0,0,0,0.22)] scale-105"
                      : "bg-white/40 text-gray-800 border-white/30 hover:bg-white/60 hover:shadow-md"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-xl border border-[rgba(255,255,255,0.06)] shadow-[0_12px_32px_rgba(0,0,0,0.22)] rounded-3xl p-10">
          <div className="space-y-4">
            {(activeCategory.includes("All FAQs")
              ? Object.values(faqData).flat()
              : activeCategory.flatMap((cat) => faqData[cat] || [])
            ).map((item, idx) => (
              <div
                key={idx}
                className="
                  bg-white/30 backdrop-blur-lg border border-[rgba(255,255,255,0.06)]
                  rounded-2xl shadow-md overflow-hidden transition-all duration-300
                  hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)]
                "
              >
                <button
                  onClick={() =>
                    setOpenQuestionIndex(openQuestionIndex === idx ? null : idx)
                  }
                  className="w-full flex justify-between items-center px-6 py-4 text-left"
                >
                  <span className="font-semibold text-gray-900">{item.q}</span>

                  <svg
                    className={`w-5 h-5 text-gray-700 transition-transform ${
                      openQuestionIndex === idx ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openQuestionIndex === idx && (
                  <div className="px-6 pb-4 text-gray-800 bg-white/40 rounded-b-2xl">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRE NOW */}
      <section className="max-w-[85%] mx-auto px-6 py-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-[#0A0F2C]">Enquire Now</h2>
        <p className="text-gray-700 mb-6 text-center max-w-2xl">
          Fill in your details and we will get back to you with the best LAS
          options available.
        </p>

        <button
  onClick={() =>
    window.open(
      "https://wa.me/919930584020?text=Hi! I want help choosing the best LAS provider.",
      "_blank"
    )
  }
  className="
    bg-gradient-to-b from-[#1F5E3C] to-[#124434]
    hover:from-[#124434] hover:to-[#0D3A27]
    text-white px-8 py-4 rounded-2xl
    shadow-[0_16px_38px_rgba(0,0,0,0.26)]
    transition-all duration-300 font-semibold
    transform hover:-translate-y-1
  "
>
  Contact Us
</button>

      </section>

      <Footer />
    </div>
  );
}
