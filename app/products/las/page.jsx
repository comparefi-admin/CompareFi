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
      {
        key: "regularization_period",
        label: "Regularization / Margin Call Period (Days)",
      },
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
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight text-center">
            Loan Against Shares (LAS)
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-100 text-center max-w-2xl leading-relaxed">
            Compare interest rates, charges, LTV, and the true overall cost
            across all providers — with transparent, unbiased data to help you
            choose the lowest-cost LAS option confidently.
          </p>
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
                  <li>
                    Borrow at lower interest rates (8–20% p.a.) compared to
                    personal loans.
                  </li>
                  <li>Quick liquidity without liquidating your portfolio.</li>
                  <li>Retain share ownership and earn dividends.</li>
                  <li>
                    Flexible usage for business, emergencies, or investments
                    (non-speculative)
                  </li>
                </ul>
              ),
            },
            {
              title: "LAS vs Personal Loan",
              text: (
                <ul className="space-y-2">
                  <li>
                    <strong>Collateral:</strong> LAS requires pledged shares;
                    personal loans are unsecured.
                  </li>
                  <li>
                    <strong>Interest:</strong> LAS: 8–15%; Personal: 10–24%.
                  </li>
                  <li>
                    <strong>Tenure:</strong> Up to 36 months
                  </li>
                  <li>
                    <strong>Disbursal:</strong>LAS: 1–2 days with digital
                    pledge.
                  </li>
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
              <p className="text-gray-800 leading-relaxed text-lg">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* SNAPSHOT */}
        <div className="mt-16 text-center">
          <h3 className="text-4xl font-bold mb-8 text-[#0A0F2C]">
            Quick Snapshot
          </h3>

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

      {/* PRE–COST SUMMARY INFO CARDS */}
      <section className="max-w-[90%] mx-auto px-6 mt-10 mb-4">
        <h3 className="text-4xl font-bold text-center mb-10 text-[#0A0F2C]">
          Before You Compare Costs
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
              How This Summary Works
            </h4>
            <p className="text-gray-800 leading-relaxed text-lg">
              The table below shows calculations for a{" "}
              <strong>₹1,00,000 LAS over 12 months</strong>. Collateral given is{" "}
              <strong>₹2,00,000</strong> and an assumed
              <strong> 50% funding ratio</strong> across all financial
              institutions — including interest + all associated charges.
            </p>
            <p className="mt-3 text-gray-700 text-[1rem]">
              You don’t have to calculate APR year-wise — the{" "}
              <strong>“Overall Cost” already includes it</strong>.
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
              What You Can Quickly Identify
            </h4>

            <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
              <li>
                Which institution is <strong>cheapest overall</strong>
              </li>
              <li>
                Which one offers the <strong>best LTV</strong>
              </li>
              <li>
                Who has the <strong>broadest approved stock list</strong>
              </li>
              <li>
                Which lender gives the{" "}
                <strong>maximum margin-call buffer</strong> (lowest selling
                risk)
              </li>
            </ul>

            <p className="mt-3 text-gray-700 text-[1rem]">
              Most users can rely on this short summary to choose the most
              <strong> cost-efficient and safest LAS provider</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* COST SUMMARY */}
      <section className="max-w-[90%] mx-auto px-6 py-10 flex flex-col items-center">
        <h3 className="text-4xl font-bold mb-10 text-[#0A0F2C]">
          Cost Summary
        </h3>

        <div className="w-full bg-white backdrop-blur-2xl border border-[rgba(255,255,255,0.06)] shadow-[0_12px_32px_rgba(0,0,0,0.22)] rounded-2xl overflow-x-auto">
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
                  1st Year (₹1L LAS)
                </th>

                {/* 2nd Year */}
                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  2nd Year (₹1L LAS)
                </th>

                {/* Dynamic main columns */}
                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  Approved Shares
                </th>

                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  Tenure
                </th>

                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  Min–Max Loan
                </th>

                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  Interest Rate
                </th>

                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  Margin Period
                </th>

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
                  <td className="px-5 py-4 border border-gray-300 text-center">
                    {row.cost_first_year ? (
                      <div className="flex flex-col items-center gap-1">
                        {/* Percent */}
                        <div className="font-semibold text-green-700 text-base">
                          {row.cost_first_year.percent ?? "—"}
                        </div>

                        {/* Soft Divider Line */}
                        <div
                          className="w-full border-t my-1"
                          style={{ borderColor: "rgba(0,0,0,0.12)" }}
                        ></div>

                        {/* Amount */}
                        <div className="text-sm text-gray-600">
                          {row.cost_first_year.amount ?? "—"}
                        </div>
                      </div>
                    ) : (
                      DEFAULT_NULL_TEXT
                    )}
                  </td>

                  {/* 2nd Year */}
                  <td className="px-5 py-4 border border-gray-300 text-center">
                    {row.cost_second_year ? (
                      <div className="flex flex-col items-center gap-1">
                        {/* Percent */}
                        <div className="font-semibold text-green-700 text-base">
                          {row.cost_second_year.percent ?? "—"}
                        </div>

                        {/* Soft Divider Line */}
                        <div
                          className="w-full border-t my-1"
                          style={{ borderColor: "rgba(0,0,0,0.12)" }}
                        ></div>

                        {/* Amount (NO comma formatting) */}
                        <div className="text-sm text-gray-600">
                          {row.cost_second_year.amount ?? "—"}
                        </div>
                      </div>
                    ) : (
                      DEFAULT_NULL_TEXT
                    )}
                  </td>

                  {/* Approved Shares */}
                  <td className="px-5 py-4 border border-gray-300 text-gray-800 whitespace-pre-wrap">
                    {row.approved_shares
                      ? `~ ${row.approved_shares}`
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
                        <div>Min: {row.interest_rate.min ?? "—"}</div>
                        <div>Max: {row.interest_rate.max ?? "—"}</div>
                        <div>Median: {row.interest_rate.median ?? "—"}</div>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          fill="currentColor"
                          className="w-10 h-4"
                        >
                          <path
                            d="M16 .8C7.6.8.8 7.6.8 16c0 2.8.8 5.6 2.4 8L0 32l8.4-3.2c2.4 1.2 4.8 1.6 7.6 1.6 8.4 0 15.2-6.8 15.2-15.2S24.4.8 16 .8zm0 27.6c-2.4 0-4.8-.8-6.8-1.6l-.4-.4-5.2 2 2-5.2-.4-.4c-1.6-2-2.4-4.4-2.4-6.8 0-7.2 5.6-12.8 12.8-12.8s12.8 5.6 12.8 12.8S23.2 28.4 16 28.4zm7.2-9.2c-.4-.4-2-1.2-2.4-1.2-.4 0-.8 0-1.2.4-.4.4-.8 1.2-1.2 1.6-.4.4-.8.4-1.2.2-1.2-.6-2.4-1.4-3.4-2.6-.8-.8-1.4-1.8-2-3-.2-.4 0-.8.2-1.2.2-.2.4-.6.6-.8.2-.2.2-.4.4-.8 0-.4 0-.8-.2-1.2-.2-.4-1.2-2.2-1.6-3s-.8-.6-1.2-.6h-1c-.4 0-.8.2-1.2.6-.4.6-1.6 1.6-1.6 4s1.6 4.6 1.8 5c.2.4 3 4.8 7.2 6.8 4.2 2.2 4.8 1.6 5.6 1.6.8 0 2.8-1 3.2-2 .4-.8.4-1.6.2-2-.2-.4-.4-.6-.8-.8z"
                            className="mr-[-20%]"
                          />
                        </svg>
                        Enquire
                      </>
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

      {/* PRE–DETAILED COST SUMMARY INFO CARDS */}
      <section className="max-w-[90%] mx-auto px-6 mt-10 mb-4">
        <h3 className="text-4xl font-bold text-center mb-10 text-[#0A0F2C]">
          Understanding the Full LAS Cost Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div
            className="
        bg-white/18 backdrop-blur-xl 
        border border-[rgba(35,104,126,0.2)]
        rounded-3xl p-8 
        shadow-[0_16px_38px_rgba(0,0,0,0.12)]
        transition-all duration-500 hover:-translate-y-3
        hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      "
          >
            <h4 className="text-2xl font-bold mb-4 text-[#0D3A27]">
              What This Section Shows
            </h4>

            <p className="text-gray-800 leading-relaxed text-lg">
              This section breaks down every cost component of a Loan Against
              Shares across different lenders. Unlike the summary table (which
              shows the final overall cost), this view lets you see
              <strong> exactly how each lender structures its pricing.</strong>
            </p>

            <p className="mt-3 text-gray-700 text-[1rem]">
              If you're comparing providers at a deeper level or validating how
              the summary cost was calculated, this is the most detailed view
              available.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="
        bg-white/18 backdrop-blur-xl 
        border border-[rgba(35,104,126,0.2)]
        rounded-3xl p-8 
        shadow-[0_16px_38px_rgba(0,0,0,0.12)]
        transition-all duration-500 hover:-translate-y-3
        hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      "
          >
            <h4 className="text-2xl font-bold mb-4 text-[#0D3A27]">
              How to Use the Tabs Above
            </h4>

            <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
              <li>
                <strong>Funding-Related Details</strong>: LTV, approved shares
                list, loan limits, margin-call buffer
              </li>
              <li>
                <strong>Major Cost</strong>: Processing fee, renewal/annual fee,
                interest structure
              </li>
              <li>
                <strong>Default Charges</strong>: Penal interest, overdue
                interest, margin shortfall penalties
              </li>
              <li>
                <strong>Other Miscellaneous Cost</strong>: DP charges,
                pledge/unpledge fees, brokerage, stamp duty
              </li>
            </ul>

            <p className="mt-3 text-gray-700 text-[1rem]">
              Most users do not need this level of detail, but if you want full
              transparency across lenders, this table gives a complete
              side-by-side cost breakdown.
            </p>
          </div>
        </div>
      </section>

      {/* DETAILED LAS COST SUMMARY */}
      <section className="max-w-[90%] mx-auto px-6 py-10 flex flex-col items-center">
        <h3 className="text-4xl font-bold mb-8 text-[#0A0F2C]">
          Detailed LAS Cost Summary
        </h3>

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
                    className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide w-[200px]"
                  >
                    1st Year
                  </th>

                  {/* 2nd Year */}
                  <th
                    style={{ background: "#124434", color: "#FFFFFF" }}
                    className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide w-[200px]"
                  >
                    2nd Year
                  </th>

                  {/* Dynamic Columns */}
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
                    className={`transition-all duration-300 ${
                      index % 2 === 0 ? "bg-white/55" : "bg-white/36"
                    } hover:bg-[#B1ED67]/22 hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)]`}
                  >
                    <td className="px-5 py-4 border border-gray-300 font-semibold text-[#0A0F2C] bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5] rounded-md">
                      {row.institution_name ?? DEFAULT_NULL_TEXT}
                    </td>

                    {/* 1st Year */}
                    <td className="px-5 py-4 border border-gray-300 text-center text-[#1F5E3C] bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5] rounded-md ">
                      {row.cost_first_year ? (
                        <div className="flex flex-col items-center gap-1">
                          {/* Percent */}
                          <div className="font-semibold text-green-700 text-base">
                            {row.cost_first_year.percent ?? "—"}
                          </div>

                          {/* Soft Divider Line */}
                          <div
                            className="w-full border-t my-1"
                            style={{ borderColor: "rgba(0,0,0,0.12)" }}
                          ></div>

                          {/* Amount (NO comma formatting) */}
                          <div className="text-sm text-gray-600">
                            {row.cost_first_year.amount ?? "—"}
                          </div>
                        </div>
                      ) : (
                        DEFAULT_NULL_TEXT
                      )}
                    </td>

                    {/* 2nd Year */}
                    <td className="px-5 py-4 border border-gray-300 text-center text-[#124434] bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5] rounded-md">
                      {row.cost_second_year ? (
                        <div className="flex flex-col items-center gap-1">
                          {/* Percent */}
                          <div className="font-semibold text-green-700 text-base">
                            {row.cost_second_year.percent ?? "—"}
                          </div>

                          {/* Soft Divider Line */}
                          <div
                            className="w-full border-t my-1"
                            style={{ borderColor: "rgba(0,0,0,0.12)" }}
                          ></div>

                          {/* Amount (NO comma formatting) */}
                          <div className="text-sm text-gray-600">
                            {row.cost_second_year.amount ?? "—"}
                          </div>
                        </div>
                      ) : (
                        DEFAULT_NULL_TEXT
                      )}
                    </td>

                    {/* Dynamic columns */}
                    {rightTableColumns[activeTableCategory].map((col) => {
                      const val = row[col.key];
                      return (
                        <td
                          key={col.key}
                          className="px-5 py-4 border border-gray-300 whitespace-pre-wrap"
                        >
                          {val == null
                            ? DEFAULT_NULL_TEXT
                            : typeof val === "object"
                            ? Object.entries(val).map(([k, v], i) => (
                                <div key={i}>
                                  {k}: {v ?? "—"}
                                </div>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M16 .8C7.6.8.8 7.6.8 16c0 2.8.8 5.6 2.4 8L0 32l8.4-3.2c2.4 1.2 4.8 1.6 7.6 1.6 8.4 0 15.2-6.8 15.2-15.2S24.4.8 16 .8zm0 27.6c-2.4 0-4.8-.8-6.8-1.6l-.4-.4-5.2 2 2-5.2-.4-.4c-1.6-2-2.4-4.4-2.4-6.8 0-7.2 5.6-12.8 12.8-12.8s12.8 5.6 12.8 12.8S23.2 28.4 16 28.4zm7.2-9.2c-.4-.4-2-1.2-2.4-1.2-.4 0-.8 0-1.2.4-.4.4-.8 1.2-1.2 1.6-.4.4-.8.4-1.2.2-1.2-.6-2.4-1.4-3.4-2.6-.8-.8-1.4-1.8-2-3-.2-.4 0-.8.2-1.2.2-.2.4-.6.6-.8.2-.2.2-.4.4-.8 0-.4 0-.8-.2-1.2-.2-.4-1.2-2.2-1.6-3s-.8-.6-1.2-.6h-1c-.4 0-.8.2-1.2.6-.4.6-1.6 1.6-1.6 4s1.6 4.6 1.8 5c.2.4 3 4.8 7.2 6.8 4.2 2.2 4.8 1.6 5.6 1.6.8 0 2.8-1 3.2-2 .4-.8.4-1.6.2-2-.2-.4-.4-.6-.8-.8z" />
                          </svg>
                          Enquire
                        </>
                      </a>
                      <div className="mt-3">
                        <a
                          href={
                            row.google_form_link ||
                            "https://forms.gle/yourfallback"
                          }
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

      {/* AI-Optimized Summary Section */}
      <section className="max-w-[90%] mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#0A0F2C]">
          Key Takeaways to Guide Your LAS Decision
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
            <strong>Loan Against Shares (LAS)</strong> is a secured overdraft
            where you pledge listed stocks to borrow funds without selling your
            holdings. This helps you maintain market participation, retain
            dividends, and access liquidity at rates between{" "}
            <strong>8–20% p.a.</strong>, which are significantly lower than
            personal loans.
          </p>

          <p className="text-[1.15rem] mb-6">
            CompareFi evaluates LAS providers using a real-world example: a{" "}
            <strong>₹1,00,000 LAS over 12 months</strong> with all interest,
            fees, and taxes included. This eliminates the confusion caused by
            different Year-1 and Year-2 APR structures and shows the{" "}
            <strong>true total cost</strong>.
          </p>

          <p className="text-[1.15rem] mb-6">
            In 2025, <strong>Mirae</strong> ranks as the most cost-efficient
            option overall.
            <strong> HDFC</strong> offers the highest LTV (65–80%), while{" "}
            <strong>Bajaj</strong> provides the broadest approved shares list
            (~1000) and the longest 7-day margin-call buffer — giving borrowers
            more flexibility and lower liquidation risk.
          </p>

          <p className="text-[1.15rem]">
            Before choosing a lender, consider the overall cost, LTV, share
            eligibility, loan limits, and margin-call window. CompareFi
            simplifies this process with clear, unbiased comparisons and
            personalised recommendations.
          </p>
        </div>

        {/* CTA Block */}
        <div className="mt-12 flex flex-col items-center text-center">
          <h3 className="text-3xl font-bold text-[#0A0F2C] mb-4">
            Enquire Now — CompareFi Does the Calculation For You
          </h3>

          <p className="text-gray-700 max-w-2xl mb-8">
            Chat with us on WhatsApp or fill out a quick form. We’ll recommend
            the
            <strong> lowest-cost LAS provider</strong> based on your shares and
            loan requirement.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919930584020?text=Hi! I need help choosing the best LAS provider."
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
            Free & unbiased comparison • We never share your data • No
            obligation to apply
          </p>
        </div>
      </section>

      {/* HOW TO APPLY & KEY FACTORS */}
      <section className="max-w-[90%] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Card 1 */}
        <div
          className=" backdrop-blur-xl border bg-[#e8feff3f]
                shadow-[0_16px_38px_rgba(0,0,0,0.05)] border-[rgba(35,104,126,0.2)] rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)] hover:-translate-y-2"
        >
          <h3 className="text-2xl font-bold mb-6 text-[#0D3A27]">
            How to Apply for LAS in 2025
          </h3>
          <ol className="list-decimal list-inside space-y-3 text-whit leading-relaxed text-[1.05rem] mb-6">
            <li>
              <strong>Assess Eligibility:</strong> Ages 18–70, Indian
              resident/NRI, decent credit score, approved shares in demat.
            </li>
            <li>
              <strong>Compare & Shortlist:</strong> Use our tables/filters for
              interest rate, LTV (HDFC up to 80%).
            </li>
            <li>
              <strong>Gather Documents:</strong> PAN, Aadhaar, demat statement,
              pledge form, photo, bank proof.
            </li>
            <li>
              <strong>Apply Online:</strong> Apply via lender; pledge via
              NSDL/CDSL.
            </li>
            <li>
              <strong>Disbursal & Monitoring:</strong> Funds in 1–2 days;
              monitor for margin calls.
            </li>
          </ol>
          <p className="text-sm text-gray-700">
            <strong>Tip:</strong> 100% digital apps can disburse within 24
            hours.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className="bg-[#C0CDCF]
                shadow-[0_16px_38px_rgba(0,0,0,0.05) backdrop-blur-xl border border-[rgba(255,255,255,0.2)] rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)] hover:-translate-y-2"
        >
          <h3 className="text-2xl font-bold mb-6 text-black">
            Key Factors: Best LAS Provider 2025
          </h3>
          <ul className="list-disc list-inside space-y-3 text-black leading-relaxed text-[1.05rem]">
            <li>
              <strong>LTV Ratio:</strong> Higher LTV (HDFC 65–80%) → more
              borrowing power.
            </li>
            <li>
              <strong>Approved Shares:</strong> Broader lists (Tata Capital
              ~1004+) give flexibility.
            </li>
            <li>
              <strong>Margin Call Period:</strong> Longer (7 days — Bajaj/Mirae)
              = more buffer time.
            </li>
            <li>
              <strong>Total Costs:</strong> Consider renewal & penal charges
              (BoB ~10.23% Yr 2).
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative max-w-[90%] mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

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
