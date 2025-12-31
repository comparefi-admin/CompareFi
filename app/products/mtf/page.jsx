"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import SpotlightCard from "@/components/SpotlightCard.jsx";
import EnquiryModal from "../../components/EnquiryModal.jsx";
import { MessageCircle, FileText } from "lucide-react";
import { fetchMTF, DEFAULT_NULL_TEXT } from "@/lib/fetchData";
import { faqData } from "./faqdata"; // ← correct path for your MTF page

export default function MTFPage() {
  // For enquiry form
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryInstitution, setEnquiryInstitution] = useState(null);
  const [sortField, setSortField] = useState("cost_summary");
  const [sortOrder, setSortOrder] = useState("asc");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTableCategory, setActiveTableCategory] =
    useState("marginDetails");
  const faqCategories = ["All FAQs", ...Object.keys(faqData)];
  const [activeCategory, setActiveCategory] = useState(["All FAQs"]);
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  // fetch
  useEffect(() => {
    const load = async () => {
      try {
        const mtf = await fetchMTF();
        setData(mtf || []);
      } catch (err) {
        console.error("fetchMTF error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const [sortConfig, setSortConfig] = useState({
    key: "cost_summary", // DEFAULT sort
    order: "asc",
  });

  const getSortableValue = (row, key) => {
    switch (key) {
      case "broker":
        return row.broker_name ?? "";

      case "cost_summary":
        return clean(row.cost_summary?.amount);

      default:
        return null;
    }
  };
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          order: prev.order === "asc" ? "desc" : "asc",
        };
      }
      return { key, order: "asc" };
    });
  };

  const clean = (val) => {
    if (!val) return Infinity;

    const str = String(val).toLowerCase();

    if (
      str.includes("data not") ||
      str.includes("not disclosed") ||
      str.includes("na") ||
      str.includes("n/a")
    ) {
      return Infinity;
    }

    const match = str.match(/[\d,.]+/);
    if (!match) return Infinity;

    return Number(match[0].replace(/,/g, ""));
  };

  // ================= PERCENT FORMATTER (LAMF) =================
  const formatPercent1Dec = (val) => {
    if (val === null || val === undefined || val === "") return "—";

    const num = parseFloat(String(val).replace("%", "").trim());
    if (Number.isNaN(num)) return val;

    return `${num.toFixed(1)}%`;
  };

  // ================= RUPEE FORMATTER (LAMF) =================
  const formatRupees = (val) => {
    if (val === null || val === undefined || val === "") return "—";

    // Handle numbers + strings like "Rs 100000", "INR 2,50,000", "₹300000"
    const num =
      typeof val === "number"
        ? val
        : parseFloat(
            String(val)
              .replace(/₹|rs\.?|inr|,/gi, "")
              .trim()
          );

    if (Number.isNaN(num)) return val;

    return `₹${num.toLocaleString("en-IN")}`;
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return [...data];

    return [...data].sort((a, b) => {
      const valA = getSortableValue(a, sortConfig.key);
      const valB = getSortableValue(b, sortConfig.key);

      if (typeof valA === "number" && typeof valB === "number") {
        return sortConfig.order === "asc" ? valA - valB : valB - valA;
      }

      return sortConfig.order === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortConfig]);

  const SortButton = ({ columnKey }) => {
    const active = sortConfig.key === columnKey;

    return (
      <button
        onClick={() =>
          setSortConfig((prev) => ({
            key: columnKey,
            order:
              prev.key === columnKey && prev.order === "asc" ? "desc" : "asc",
          }))
        }
        className="ml-2 text-xs text-white/80 hover:text-white transition"
      >
        {active ? (sortConfig.order === "asc" ? "▲" : "▼") : "⇅"}
      </button>
    );
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading data...
      </div>
    );

  function formatLoanRangeMTF(label) {
    if (!label || typeof label !== "string") return label;

    return label
      .replace(/Lakhs?/gi, "L")
      .replace(/Crores?/gi, "Cr")
      .replace(/\s+L\b/g, "L")
      .replace(/\s+Cr\b/g, "Cr");
  }

  const getActiveColumns = () => {
    if (activeTableCategory === "marginDetails")
      return ["margin_requirement", "approved_stocks"];
    if (activeTableCategory === "majorCost")
      return [
        "subscription_fee",
        "interest_slabs",
        "intraday_fee",
        "carry_fee",
        "pledge_unpledge_fee",
        "auto_square_off",
        "dp_charges",
      ];
    if (activeTableCategory === "defaultCharges")
      return ["unpaid_mtf_interest"];
    return ["platform_rating", "feedback_rating"];
  };

  const activeCols = getActiveColumns();

  return (
    <div className="bg-[#EFF3F6] min-h-screen text-[#0A0F2C]">
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Ambient Blobs */}
        <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] bg-[#1F5E3C]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[35vw] h-[35vw] bg-[#10B981]/5 blur-[120px] rounded-full" />
      </div>
      <Navbar />

      {/* HERO */}
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
            Margin Trading Facility (MTF)
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-100 text-center max-w-2xl leading-relaxed">
            Compare margin requirements, approved stocks, interest slabs and the
            true overall annual MTF cost explained simply with transparent,
            unbiased data.
          </p>
        </SpotlightCard>
      </section>

      {/* ===== INFO CARDS (MTF — MATCH LAMF STYLING) ===== */}
      <section className="max-w-[90%] mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold text-center mb-14 text-[#0A0F2C]">
          Understanding Margin Trading Facility (MTF)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              title: "What is MTF?",
              text: `MTF allows investors to trade with borrowed capital against holdings,keeping positions overnight while following SEBI-regulated margin rules.`,
            },
            {
              title: "Key Benefits",
              text: (
                <ul className="list-disc list-inside space-y-2">
                  <li>Higher leveraged exposure for positional trades</li>
                  <li>Efficient margin usage</li>
                  <li>Subscription / carry based pricing</li>
                </ul>
              ),
            },
            {
              title: "MTF vs MIS / Intraday",
              text: (
                <ul className="space-y-2">
                  <li>
                    <span className="font-semibold text-[#0D3A27]">MTF:</span>{" "}
                    Carry overnight positions
                  </li>
                  <li>
                    <span className="font-semibold text-[#0D3A27]">MIS:</span>{" "}
                    Intraday only
                  </li>
                  <li>
                    <span className="font-semibold text-[#0D3A27]">
                      Exposure:
                    </span>{" "}
                    Higher under MTF
                  </li>
                </ul>
              ),
            },
            {
              title: "Why choose MTF?",
              text: `For traders with strong conviction, MTF provides regulated leverage with structured costs.`,
            },
          ].map((card, i) => (
            <div
              key={i}
              className="
          bg-white/18 backdrop-blur-xl border border-[rgba(35,104,126,0.2)]
          rounded-3xl p-5 sm:p-8
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

              {/* 🔑 MATCHES LAMF TEXT STYLE */}
              <div className="text-gray-800 leading-relaxed text-base">
                {card.text}
              </div>
            </div>
          ))}
        </div>

        {/* ===== SNAPSHOT (MTF — SAME STYLE AS LAMF) ===== */}
        <div className="mt-16 text-center">
          <h3 className="text-4xl font-bold mb-8 text-[#0A0F2C]">
            Quick Snapshot
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ["Interest", "7–19%"],
              ["Type of Collateral", "Cash + Stocks"],
              ["Holding Period", "365 Days / Unlimited"],
              ["Facility Type", "Margin Trading (MTF)"],
            ].map(([label, value], i) => (
              <div
                key={i}
                className="
          bg-white/22 backdrop-blur-md border border-[rgba(255,255,255,0.06)]
          rounded-2xl p-3 sm:p-4
          transition-all
          bg-[#20463B]
          shadow-[0_16px_38px_rgba(0,0,0,0.05)]
          hover:-translate-y-2
          hover:shadow-[0_14px_36px_rgba(0,0,0,0.22),
                       inset_0_0_18px_rgba(255,255,255,0.06)]
        "
              >
                <p className="text-gray-100 text-sm mb-1">{label}</p>
                <p className="text-2xl font-bold text-[#AFE619]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRE–COST SUMMARY INFO CARDS — MTF */}
      <section className="max-w-[90%] mx-auto px-6 mt-10 mb-4">
        <h3 className="text-4xl font-bold text-center mb-10 text-[#0A0F2C]">
          Before You Compare MTF Costs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div
            className="
        bg-white/18 backdrop-blur-xl 
        border border-[rgba(35,104,126,0.2)]
        rounded-3xl p-8
        shadow-[0_16px_38px_rgba(0,0,0,0.12)]
        transition-all duration-500
        hover:-translate-y-3
        hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      "
          >
            <h4 className="text-2xl font-bold mb-4 text-[#0D3A27]">
              Before Cost Summary
              <span className="text-red-500 font-bold">*</span>
            </h4>

            <p className="text-gray-800 leading-relaxed text-lg">
              The table below shows the total cost of a ₹5,00,000 Margin Trading
              Facility (MTF) position in Reliance Stock held over 12 months.
              Collateral given is ₹4,00,000 in approved stocks, zero cash
              collateral and broker specific haircuts/charges.
            </p>

            <p className="mt-3 text-gray-700 text-[1rem]">
              We convert Year-1 interest rates, broker charges, into a single
              comparable number, so you instantly understand who is cheapest
              overall.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="
        bg-white/18 backdrop-blur-xl 
        border border-[rgba(35,104,126,0.2)]
        rounded-3xl p-8
        shadow-[0_16px_38px_rgba(0,0,0,0.12)]
        transition-all duration-500
        hover:-translate-y-3
        hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      "
          >
            <h4 className="text-2xl font-bold mb-4 text-[#0D3A27]">
              This helps you easily compare:
            </h4>

            <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
              <li>Which broker is cheapest overall</li>
              <li>
                How much yearly cost you would pay for the same funded exposure
              </li>
              <li>Differences in approved stocks</li>
              <li>
                Margin requirement variations that affect your usable leverage t
                during NAV drops
              </li>
            </ul>

            <p className="mt-3 text-gray-700 text-[1rem]">
              Most users only need this summary to choose the most
              cost-effective lender.
            </p>
          </div>
        </div>
      </section>

      {/* MTF COST SUMMARY */}
      <section className="max-w-[90%] mx-auto px-6 py-8 flex flex-col items-center">
        <h3 className="text-4xl font-bold mb-8 text-[#0A0F2C]">Cost Summary</h3>

        <div className="w-full bg-white backdrop-blur-2xl border border-[rgba(255,255,255,0.06)] shadow-[0_12px_32px_rgba(0,0,0,0.22)] rounded-2xl overflow-x-auto">
          <table className="w-full border-collapse text-gray-800 text-[16px] leading-[1.35] table-highlight-2 text-center">
            <thead>
              <tr className="text-center font-semibold border-b border-gray-300">
                {/* Broker */}
                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  <div className="flex items-center justify-center gap-2">
                    Broker
                    <SortButton columnKey="broker" />
                  </div>
                </th>

                {/* Cost Summary */}
                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  <div className="flex items-center justify-center gap-2">
                    Cost Summary
                    <span className="text-red-500 font-bold">*</span>
                    <SortButton columnKey="cost_summary" />
                  </div>
                </th>

                {/* Margin Requirement */}
                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  Margin Requirement
                </th>

                {/* Approved Stocks */}
                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  Approved Stocks
                </th>

                {/* Interest Slabs */}
                <th
                  style={{
                    background: "#124434",
                    color: "#FFFFFF",
                    minWidth: "260px",
                  }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  <div className="flex flex-col items-center gap-2">
                    {/* Main title */}
                    <span>Interest Slabs</span>

                    {/* Sub headers */}
                    <div
                      className="
                        hidden sm:grid
                        grid-cols-2 w-full text-xs font-medium
                        border-t border-white/30 pt-2 px-2
                      "
                    >
                      <span className="text-center px-2">Loan Amount</span>
                      <span className="text-center px-3 border-l border-white/30">
                        ROI
                      </span>
                    </div>
                  </div>
                </th>

                {/* Contact */}
                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide min-w-[200px]"
                >
                  Contact
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedData.map((row, index) => (
                <tr
                  key={row.id ?? index}
                  className={`transition-all duration-300 ${
                    index % 2 === 0 ? "bg-white/55" : "bg-white/36"
                  } hover:bg-[#B1ED67]/22 hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)]`}
                >
                  {/* Broker */}
                  <td className="px-5 py-4 border border-gray-300 font-semibold text-[#0A0F2C] bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5]">
                    {row.broker_name ?? DEFAULT_NULL_TEXT}
                  </td>

                  {/* Cost Summary */}
                  <td className="px-5 py-4 border border-gray-300 text-center">
                    {row.cost_summary &&
                    typeof row.cost_summary === "object" ? (
                      <div className="flex flex-col items-center gap-1">
                        {/* Percent */}
                        <div className="font-semibold text-green-700 text-base">
                          {formatPercent1Dec(row.cost_summary.percent ?? "—")}
                        </div>

                        {/* Soft Divider Line */}
                        <div
                          className="w-full border-t my-1"
                          style={{ borderColor: "rgba(0,0,0,0.12)" }}
                        ></div>

                        {/* Amount */}
                        <div className="text-sm text-gray-600">
                          {formatRupees(row.cost_summary.amount ?? "—")}
                        </div>
                      </div>
                    ) : (
                      row.cost_summary ?? DEFAULT_NULL_TEXT
                    )}
                  </td>

                  {/* Margin Requirement */}
                  <td className="px-5 py-4 border border-gray-300">
                    {row.margin_requirement ?? DEFAULT_NULL_TEXT}
                  </td>

                  {/* Approved Stocks */}
                  <td className="px-5 py-4 border border-gray-300 whitespace-pre-wrap">
                    {row.approved_stocks
                      ? `~ ${row.approved_stocks} Stocks`
                      : DEFAULT_NULL_TEXT}
                  </td>

                  {/* Interest Slabs — rows only (STYLE MATCHED) */}
                  <td
                    className="px-5 py-4 border border-gray-300"
                    style={{ minWidth: "260px" }}
                  >
                    {row.interest_slabs &&
                    typeof row.interest_slabs === "object" ? (
                      <div className="flex flex-col text-gray-900">
                        {Object.entries(row.interest_slabs).map(
                          ([loanAmount, roi], index, arr) => (
                            <div key={index} className="flex flex-col">
                              <div className="grid grid-cols-2 text-center">
                                {/* Loan Amount */}
                                <span className="font-semibold">
                                  {formatLoanRangeMTF(loanAmount)}
                                </span>

                                {/* ROI */}
                                <span className="font-semibold text-[#1F5E3C] border-l border-gray-300">
                                  {formatPercent1Dec(roi ?? "—")}
                                </span>
                              </div>

                              {/* Soft divider (not after last row) */}
                              {index !== arr.length - 1 && (
                                <div
                                  className="w-full border-t my-2"
                                  style={{ borderColor: "rgba(0,0,0,0.12)" }}
                                />
                              )}
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      DEFAULT_NULL_TEXT
                    )}
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4 border border-gray-300 text-center">
                    <a
                      href={`https://wa.me/919082930770?text=Hi! I’m interested in MTF by ${encodeURIComponent(
                        row.broker_name || "this broker"
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
                        {/* WhatsApp Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          fill="currentColor"
                          className="w-10 h-4"
                        >
                          <path d="M16 .8C7.6.8.8 7.6.8 16c0 2.8.8 5.6 2.4 8L0 32l8.4-3.2c2.4 1.2 4.8 1.6 7.6 1.6 8.4 0 15.2-6.8 15.2-15.2S24.4.8 16 .8zm0 27.6c-2.4 0-4.8-.8-6.8-1.6l-.4-.4-5.2 2 2-5.2-.4-.4c-1.6-2-2.4-4.4-2.4-6.8 0-7.2 5.6-12.8 12.8-12.8s12.8 5.6 12.8 12.8S23.2 28.4 16 28.4zm7.2-9.2c-.4-.4-2-1.2-2.4-1.2-.4 0-.8 0-1.2.4-.4.4-.8 1.2-1.2 1.6-.4.4-.8.4-1.2.2-1.2-.6-2.4-1.4-3.4-2.6-.8-.8-1.4-1.8-2-3-.2-.4 0-.8.2-1.2.2-.2.4-.6.6-.8.2-.2.2-.4.4-.8 0-.4 0-.8-.2-1.2-.2-.4-1.2-2.2-1.6-3s-.8-.6-1.2-.6h-1c-.4 0-.8.2-1.2.6-.4.6-1.6 1.6-1.6 4s1.6 4.6 1.8 5c.2.4 3 4.8 7.2 6.8 4.2 2.2 4.8 1.6 5.6 1.6.8 0 2.8-1 3.2-2 .4-.8.4-1.6.2-2-.2-.4-.4-.6-.8-.8z" />
                        </svg>
                        Enquire
                      </>
                    </a>

                    <div className="mt-3">
                      <button
                        onClick={() => {
                          setEnquiryInstitution(row.broker_name);
                          setEnquiryOpen(true);
                        }}
                        className="inline-flex items-center justify-center gap-2
                                              bg-gradient-to-b from-[#5e009c] to-[#c401ff]
                                              text-white px-4 py-2 rounded-lg
                                              shadow-[0_10px_30px_rgba(0,0,0,0.20)]
                                              hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
                                              transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <FileText className="w-4 h-4" /> Enquiry Form
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PRE–DETAILED MTF COST SUMMARY INFO CARDS */}
      <section className="max-w-[90%] mx-auto px-6 mt-10 mb-6">
        <h3 className="text-4xl font-bold text-center mb-10 text-[#0A0F2C]">
          Understanding the Full MTF Cost Breakdown
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
              The detailed comparison below shows the complete structure behind
              each broker’s MTF pricing and policies. While the cost summary
              gives you the total cost, this section explains exactly{" "}
              <strong>how that cost is built.</strong>
            </p>

            <p className="mt-3 text-gray-700 text-[1rem]">
              It helps traders understand margin rules, carry-cost mechanics,
              penalties, and operational policies that influence real trading
              experience.
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
                <strong>Margin Details:</strong> Initial margin, maintenance
                margin, approved stock list, pledge rules
              </li>
              <li>
                <strong>Major Cost:</strong> Subscription charges, daily/annual
                carry cost, funding interest
              </li>
              <li>
                <strong>Default Charges:</strong> Penalties, delayed payment
                interest, auto square-off rules
              </li>
              <li>
                <strong>Platform & User Feedback:</strong> Platform reliability,
                pledge experience, settlement flow, user reviews
              </li>
            </ul>

            <p className="mt-4 text-gray-700 text-[1rem]">
              This section lets advanced traders compare risk rules, operational
              experiences, and hidden cost components offering full transparency
              into how each MTF provider operates.
            </p>

            <p className="mt-3 text-gray-700 text-[1rem]">
              While most users rely on the summary table alone, this detailed
              breakdown is essential for professional or high-value MTF traders.
            </p>
          </div>
        </div>
      </section>

      {/* ===== DETAILED TABLE (LAS STYLE) ===== */}
      <section className="max-w-[90%] mx-auto px-6 py-10 flex flex-col items-center">
        <h3 className="text-4xl font-bold mb-8 text-[#0A0F2C]">
          Detailed MTF Cost Summary
        </h3>

        {/* MAIN WHITE CONTAINER */}
        <div
          className="
              w-full 
              bg-white backdrop-blur-xl 
              border border-[rgba(255,255,255,0.06)]
              shadow-[0_12px_32px_rgba(0,0,0,0.22)]
              rounded-2xl 
              overflow-x-auto 
              p-6
            "
        >
          {/* CATEGORY BUTTONS INSIDE CARD NOW */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {[
              { key: "marginDetails", label: "Margin Details" },
              { key: "majorCost", label: "Major Cost" },
              { key: "defaultCharges", label: "Default Charges" },
              { key: "feedback", label: "Platform & User Feedback" },
            ].map((cat) => (
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
          <table className="w-full border-collapse text-gray-800 text-[16px] leading-[1.35] text-center table-highlight-2">
            <thead>
              <tr className="text-center font-semibold border-b border-gray-300">
                {/* Broker */}
                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  <div className="flex items-center justify-center gap-2">
                    Broker
                    <SortButton columnKey="broker" />
                  </div>
                </th>

                {/* Cost Summary */}
                <th
                  style={{ background: "#124434", color: "#FFFFFF" }}
                  className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                >
                  <div className="flex items-center justify-center gap-2">
                    Cost Summary{" "}
                    <span className="text-red-500 font-bold">*</span>
                    <SortButton columnKey="cost_summary" />
                  </div>
                </th>

                {/* Dynamic Columns */}
                {activeCols.map((colKey) => {
                  if (colKey === "interest_slabs") {
                    return (
                      <th
                        key={colKey}
                        style={{
                          background: "#124434",
                          color: "#FFFFFF",
                          minWidth: "260px",
                        }}
                        className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span>Interest Slabs</span>

                          <div
                            className="
                                        hidden sm:grid
                                        grid-cols-2 w-full text-xs font-medium
                                        border-t border-white/30 pt-2 px-2
                                      "
                          >
                            <span className="text-center px-2">
                              Loan Amount
                            </span>
                            <span className="text-center px-3 border-l border-white/30">
                              ROI
                            </span>
                          </div>
                        </div>
                      </th>
                    );
                  }

                  return (
                    <th
                      key={colKey}
                      style={{ background: "#124434", color: "#FFFFFF" }}
                      className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                    >
                      {colKey
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </th>
                  );
                })}

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
              {sortedData.map((row, index) => (
                <tr
                  key={row.id ?? index}
                  className={`transition-all duration-300 ${
                    index % 2 === 0 ? "bg-white/55" : "bg-white/36"
                  } hover:bg-[#B1ED67]/22 hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)]`}
                >
                  {/* Broker */}
                  <td
                    className="px-5 py-4 border border-gray-300 font-semibold text-[#0A0F2C]
              bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5]"
                  >
                    {row.broker_name ?? DEFAULT_NULL_TEXT}
                  </td>

                  {/* Cost Summary */}
                  <td className="px-5 py-4 border border-gray-300 text-center">
                    {row.cost_summary ? (
                      <div className="flex flex-col items-center gap-1">
                        {/* Percent */}
                        <div className="font-semibold text-green-700 text-base">
                          {formatPercent1Dec(row.cost_summary.percent ?? "—")}
                        </div>

                        {/* Soft Divider Line */}
                        <div
                          className="w-full border-t my-1"
                          style={{ borderColor: "rgba(0,0,0,0.12)" }}
                        ></div>

                        {/* Amount (NO comma formatting) */}
                        <div className="text-sm text-gray-600">
                          {formatRupees(row.cost_summary.amount ?? "—")}
                        </div>
                      </div>
                    ) : (
                      DEFAULT_NULL_TEXT
                    )}
                  </td>

                  {/* Dynamic Columns */}
                  {activeCols.map((colKey) => {
                    const v = row[colKey];

                    /* ================= UNPAID MTF INTEREST (FORMAT LIKE OTHER DYNAMIC COLUMNS) ================= */
                    if (colKey === "unpaid_mtf_interest") {
                      return (
                        <td
                          key={`${row.id}-${colKey}`}
                          className="px-3 py-3 border border-gray-300 text-center"
                        >
                          {formatPercent1Dec(v)}
                        </td>
                      );
                    }

                    /* ===== INTEREST SLABS (Loan Amount | ROI) ===== */
                    if (colKey === "interest_slabs") {
                      return (
                        <td
                          key={colKey}
                          className="px-5 py-4 border border-gray-300"
                          style={{ minWidth: "260px" }}
                        >
                          {v && typeof v === "object" ? (
                            <div className="flex flex-col text-gray-900">
                              {Object.entries(v).map(
                                ([loanAmount, roi], index, arr) => (
                                  <div key={index} className="flex flex-col">
                                    <div className="grid grid-cols-2 text-center">
                                      <span className="font-semibold">
                                        {formatLoanRangeMTF(loanAmount)}
                                      </span>
                                      <span className="font-semibold text-[#1F5E3C] border-l border-gray-300">
                                        {formatPercent1Dec(roi ?? "—")}
                                      </span>
                                    </div>

                                    {index !== arr.length - 1 && (
                                      <div
                                        className="w-full border-t my-2"
                                        style={{
                                          borderColor: "rgba(0,0,0,0.12)",
                                        }}
                                      />
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            DEFAULT_NULL_TEXT
                          )}
                        </td>
                      );
                    }

                    /* ===== ALL OTHER DYNAMIC COLUMNS (UPDATED) ===== */
                    return (
                      <td
                        key={colKey}
                        className="px-5 py-4 border border-gray-300 whitespace-pre-wrap text-center"
                      >
                        {v == null || v === ""
                          ? DEFAULT_NULL_TEXT
                          : colKey === "approved_stocks"
                          ? `~ ${v} Stocks`
                          : colKey === "unpaid_mtf_interest"
                          ? `${v}%`
                          : colKey === "feedback_rating"
                          ? `${v}⭐`
                          : typeof v === "object"
                          ? Object.entries(v).map(([k, val], j) => (
                              <div key={j}>
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
                      href={`https://wa.me/919082930770?text=Hi! I’m interested in learning more about MTF by ${encodeURIComponent(
                        row.broker_name || "this broker"
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
                      {/* WhatsApp icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                        className="w-10 h-4"
                      >
                        <path d="M16 .8C7.6.8.8 7.6.8 16c0 2.8.8 5.6 2.4 8L0 32l8.4-3.2c2.4 1.2 4.8 1.6 7.6 1.6 8.4 0 15.2-6.8 15.2-15.2S24.4.8 16 .8zm0 27.6c-2.4 0-4.8-.8-6.8-1.6l-.4-.4-5.2 2 2-5.2-.4-.4c-1.6-2-2.4-4.4-2.4-6.8 0-7.2 5.6-12.8 12.8-12.8s12.8 5.6 12.8 12.8S23.2 28.4 16 28.4zm7.2-9.2c-.4-.4-2-1.2-2.4-1.2-.4 0-.8 0-1.2.4-.4.4-.8 1.2-1.2 1.6-.4.4-.8.4-1.2.2-1.2-.6-2.4-1.4-3.4-2.6-.8-.8-1.4-1.8-2-3-.2-.4 0-.8.2-1.2.2-.2.4-.6.6-.8.2-.2.2-.4.4-.8 0-.4 0-.8-.2-1.2-.2-.4-1.2-2.2-1.6-3s-.8-.6-1.2-.6h-1c-.4 0-.8.2-1.2.6-.4.6-1.6 1.6-1.6 4s1.6 4.6 1.8 5c.2.4 3 4.8 7.2 6.8 4.2 2.2 4.8 1.6 5.6 1.6.8 0 2.8-1 3.2-2 .4-.8.4-1.6.2-2-.2-.4-.4-.6-.8-.8z" />
                      </svg>
                      Enquire
                    </a>

                    <div className="mt-3">
                      <button
                        onClick={() => {
                          setEnquiryInstitution(row.broker_name);
                          setEnquiryOpen(true);
                        }}
                        className="inline-flex items-center justify-center gap-2
                                              bg-gradient-to-b from-[#5e009c] to-[#c401ff]
                                              text-white px-4 py-2 rounded-lg
                                              shadow-[0_10px_30px_rgba(0,0,0,0.20)]
                                              hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
                                              transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <FileText className="w-4 h-4" /> Enquiry Form
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(!sortedData || sortedData.length === 0) && (
            <div className="text-gray-600 text-center py-8 font-medium text-[15px]">
              No MTF data available.
            </div>
          )}
        </div>
      </section>

      {/* MTF Summary — Before FAQ */}
      <section className="max-w-[90%] mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#0A0F2C]">
          Key Takeaways to Guide Your MTF Decision
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
            <strong>Margin Trading Facility (MTF)</strong> allows traders to
            take leveraged equity positions overnight by using funded exposure
            provided by brokers. Instead of paying everything upfront, you pay a
            combination of{" "}
            <strong>margin + subscription fee + interest/carry cost</strong>{" "}
            depending on the broker’s pricing model.
          </p>

          <p className="text-[1.15rem] mb-6">
            CompareFi simplifies this complexity by converting all charges
            subscription, interest slabs, carry fees, pledging charges and
            operational costs into one{" "}
            <strong>single comparable yearly cost</strong> for the same notional
            funded exposure. This allows you to understand instantly which
            broker is most cost-efficient for your trading style.
          </p>

          <p className="text-[1.15rem] mb-6">
            Brokers also differ significantly in{" "}
            <strong>margin requirements</strong> (affecting usable leverage),
            <strong>approved stocks lists</strong>, auto square-off policies,
            and penalty structures. These differences influence not just cost
            but also risk and convenience especially for active positional
            traders.
          </p>

          <p className="text-[1.15rem]">
            Before choosing an MTF provider, evaluate the true total cost,
            margin flexibility, approved stocks coverage, pledge experience, and
            operational reliability. CompareFi brings all these insights
            together in one transparent view.
          </p>
        </div>

        {/* CTA Block */}
        <div className="mt-12 flex flex-col items-center text-center">
          <h3 className="text-3xl font-bold text-[#0A0F2C] mb-4">
            Enquire Now Get a Personalised MTF Suggestion
          </h3>

          <p className="text-gray-700 max-w-2xl mb-8">
            Chat with us on WhatsApp or fill out a quick form. We'll help you
            identify the
            <strong> lowest-cost and most flexible MTF provider</strong> based
            on your trading needs.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919082930770?text=Hi! I need help choosing the best MTF provider."
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
          </div>

          <p className="mt-4 text-gray-600 text-sm">
            Free & unbiased comparison • No data sharing • No obligation to
            apply
          </p>
        </div>
      </section>

      {/* EXTRA SECTIONS */}
      <section className="max-w-[90%] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Card 1 — How to Apply for MTF */}
        <div
          className="
      backdrop-blur-xl border bg-[#e8feff3f]
      shadow-[0_16px_38px_rgba(0,0,0,0.05)]
      border-[rgba(35,104,126,0.2)]
      rounded-3xl p-10
      transition-all duration-500
      hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
      hover:-translate-y-2
    "
        >
          <h3 className="text-2xl font-bold mb-6 text-[#0D3A27]">
            How to Apply for MTF in 2025: Step-by-Step Guide
          </h3>

          <ol className="list-decimal list-inside space-y-3 leading-relaxed text-[1.05rem] mb-6">
            <li>
              <strong>Check eligibility</strong> with your broker
            </li>
            <li>
              <strong>Compare subscription & carry fees</strong>
            </li>
            <li>
              <strong>Submit pledge</strong> for approved stocks
            </li>
            <li>
              <strong>Monitor margins</strong> to avoid auto square-off
            </li>
          </ol>
        </div>

        {/* Card 2 — Key Factors */}
        <div
          className="
    bg-[#C0CDCF]
    shadow-[0_16px_38px_rgba(0,0,0,0.05)]
    backdrop-blur-xl
    border border-[rgba(255,255,255,0.2)]
    rounded-3xl p-10
    transition-all duration-500
    hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
    hover:-translate-y-2
  "
        >
          <h3 className="text-2xl font-bold mb-6 text-black">
            Key Factors: Choosing the Best MTF Provider
          </h3>

          <ul className="list-disc list-inside space-y-3 text-black leading-relaxed text-[1.05rem]">
            <li>
              <strong>Approved Stock List:</strong> Broader approved lists give
              greater flexibility.
            </li>

            <li>
              <strong>Margin Rules & Auto Square-Off Policies:</strong> When
              brokers apply margin requirements that are higher than
              exchange-prescribed norms, the effective exposure offered is lower
              than what the exchange allows.
            </li>

            <li>
              <strong>Total Cost:</strong> Make your decision based on the{" "}
              <strong>“Overall Cost”</strong> column to know the detailed cost
              across years to find the lenders with cheapest cost.
            </li>
          </ul>
        </div>
      </section>

      {/* ========================= MTF FAQ SECTION ========================= */}
      <section className="relative max-w-[90%] mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions (MTF)
        </h2>

        {/* CATEGORY BUTTONS */}
        <div
          className="bg-white/20 backdrop-blur-xl border border-[rgba(255,255,255,0.06)] 
                  shadow-[0_12px_32px_rgba(0,0,0,0.22)] rounded-3xl p-8 mb-10"
        >
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

        {/* FAQ LIST */}
        <div
          className="bg-white/20 backdrop-blur-xl border border-[rgba(255,255,255,0.06)] 
                  shadow-[0_12px_32px_rgba(0,0,0,0.22)] rounded-3xl p-10"
        >
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

      {/* ENQUIRE */}
      <section className="max-w-[85%] mx-auto px-6 py-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 text-[#0A0F2C]">Enquire Now</h2>
        <p className="text-gray-700 mb-6 text-center max-w-2xl">
          Fill in your details and we'll connect you with the best MTF options.
        </p>

        <a
          href="https://wa.me/919082930770?text=Hi!%20I%20am%20interested%20in%20MTF%20options"
          target="_blank"
          rel="noreferrer"
          className="
            bg-gradient-to-b from-[#1F5E3C] to-[#124434]
            hover:from-[#124434] hover:to-[#0D3A27]
            text-white px-8 py-4 rounded-2xl shadow-[0_16px_38px_rgba(0,0,0,0.26)]
            transition-all duration-300 font-semibold
            transform hover:-translate-y-1
          "
        >
          Contact Us
        </a>
      </section>

      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        product="Margin Trading Facility (MTF)"
        institution={enquiryInstitution}
      />

      <Footer />
    </div>
  );
}
