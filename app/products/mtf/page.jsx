"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import SpotlightCard from "@/components/SpotlightCard.jsx";
import { MessageCircle, FileText } from "lucide-react";
import { fetchMTF, DEFAULT_NULL_TEXT } from "@/lib/fetchData";
import { faqData } from "./faqdata"; // ← correct path for your MTF page


export default function MTFPage() {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTableCategory, setActiveTableCategory] = useState("marginDetails");
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

  const clean = (val) => {
    if (typeof val === "string") return parseFloat(val.replace(/[₹,%]/g, "")) || val;
    return val;
  };

  const sortedData = useMemo(() => {
    if (!sortField) return [...data];
    return [...data].sort((a, b) => {
      let valA = clean(a[sortField]);
      let valB = clean(b[sortField]);

      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }
      return sortOrder === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortField, sortOrder]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading data...
      </div>
    );

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
    if (activeTableCategory === "defaultCharges") return ["unpaid_mtf_interest"];
    return ["platform_rating", "feedback_rating"];
  };

  const activeCols = getActiveColumns();

  return (
    <div className="bg-[#EFF3F6] min-h-screen text-[#0A0F2C]">
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
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Margin Trading Facility
          </h1>
        </SpotlightCard>
      </section>

      {/* ===== INFO CARDS (unchanged) ===== */}
      <section className="max-w-[90%] mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold text-center mb-14 text-[#0A0F2C]">
          Understanding Margin Trading Facility (MTF)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              title: "What is MTF?",
              text: `MTF allows investors to trade with borrowed capital against holdings
keeping positions overnight while following SEBI-regulated margin rules.`,
            },
            {
              title: "Key Benefits",
              text: (
                <ul className="list-disc list-inside space-y-2">
                  <li>Higher leveraged exposure for positional trades</li>
                  <li>Efficient margin usage</li>
                  <li>Subscription/carry based pricing</li>
                </ul>
              ),
            },
            {
              title: "MTF vs MIS / Intraday",
              text: (
                <ul className="space-y-2">
                  <li><strong>MTF:</strong> Carry overnight positions</li>
                  <li><strong>MIS:</strong> Intraday only</li>
                  <li><strong>Exposure:</strong> Higher under MTF</li>
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
      </section>

      {/* ===== DETAILED TABLE (LAS STYLE) ===== */}
      <section className="max-w-[90%] mx-auto px-6 py-10 flex flex-col items-center">
        <h3 className="text-4xl font-bold mb-8 text-[#0A0F2C]">Detailed MTF Comparison</h3>

        {/* CATEGORY BUTTONS MOVED TO TOP — MATCHES LAS */}
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
        <div className="w-full bg-white backdrop-blur-xl border border-[rgba(255,255,255,0.06)] shadow-[0_12px_32px_rgba(0,0,0,0.22)] rounded-2xl overflow-x-auto p-6">
          <table className="w-full border-collapse text-gray-800 text-[16px] leading-[1.35] table-highlight">
            <thead className="bg-white/80 border-b border-gray-300">
              <tr>
                <th className="px-5 py-3 font-semibold border border-gray-300 uppercase text-sm tracking-wide bg-gradient-to-br from-[#FBFCFD] to-[#EFF7F1]">
                  Broker
                </th>

                <th className="px-5 py-3 font-semibold border border-gray-300 uppercase text-sm tracking-wide bg-white/70">
                  Cost Summary
                </th>

                {activeCols.map((colKey) => (
                  <th
                    key={colKey}
                    className="px-5 py-3 font-semibold border border-gray-300 uppercase text-sm tracking-wide bg-white/70"
                  >
                    {colKey.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </th>
                ))}

                <th className="px-5 py-3 font-semibold border border-gray-300 uppercase text-sm tracking-wide bg-white/70">
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
                  <td className="px-5 py-4 border border-gray-300 font-semibold text-[#0A0F2C] bg-gradient-to-br from-[#FBFCFD] to-[#F3FFF5]">
                    {row.broker_name ?? DEFAULT_NULL_TEXT}
                  </td>

                  <td className="px-5 py-4 border border-gray-300 whitespace-pre-line">
                    {row.cost_summary && typeof row.cost_summary === "object"
                      ? Object.entries(row.cost_summary).map(([k, v], i) => (
                          <div key={i}>
                            {k}: {v ?? "—"}
                          </div>
                        ))
                      : row.cost_summary ?? DEFAULT_NULL_TEXT}
                  </td>

                  {activeCols.map((colKey) => (
                    <td key={colKey} className="px-5 py-4 border border-gray-300 whitespace-pre-wrap">
                      {(() => {
                        const v = row[colKey];
                        if (v == null || v === "") return DEFAULT_NULL_TEXT;
                        if (typeof v === "object") {
                          return Object.entries(v).map(([k, val], j) => (
                            <div key={j}>
                              {k}: {val ?? "—"}
                            </div>
                          ));
                        }
                        return v;
                      })()}
                    </td>
                  ))}

                  <td className="px-5 py-4 border border-gray-300 text-center">
                    <a
                      href={`https://wa.me/919930584020?text=Hi! I’m interested in learning more about MTF by ${encodeURIComponent(
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
                      <MessageCircle className="w-4 h-4" /> Enquire
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

          {(!data || data.length === 0) && (
            <div className="text-gray-600 text-center py-8 font-medium text-[15px]">
              No MTF data available.
            </div>
          )}
        </div>
      </section>

      {/* EXTRA SECTIONS (unchanged) */}
      <section className="max-w-[90%] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="backdrop-blur-xl border bg-[#e8feff3f]
                shadow-[0_16px_38px_rgba(0,0,0,0.05)] border-[rgba(35,104,126,0.2)] rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)] hover:-translate-y-2">
          <h3 className="text-2xl font-bold mb-6 text-[#0D3A27]">How to Apply for MTF</h3>
          <ol className="list-decimal list-inside space-y-3 leading-relaxed text-[1.05rem] mb-6">
            <li><strong>Check eligibility</strong> with your broker</li>
            <li><strong>Compare subscription & carry fees</strong></li>
            <li><strong>Submit pledge</strong> for approved stocks</li>
            <li><strong>Monitor margins</strong> to avoid auto square-off</li>
          </ol>
        </div>

        <div className="bg-[#C0CDCF]
                shadow-[0_16px_38px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-[rgba(35,104,126,0.2)] rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)] hover:-translate-y-2">
          <h3 className="text-2xl font-bold mb-6 text-[#0D3A27]">Why Our MTF Comparison</h3>
          <ul className="list-disc list-inside space-y-3 text-gray-800 leading-relaxed text-[1.05rem]">
            <li>Accurate verified data</li>
            <li>Mobile-first UI/UX</li>
            <li>Transparent cost comparison</li>
          </ul>
        </div>

        <div className="bg-[#2E494D]
                shadow-[0_16px_38px_rgba(0,0,0,0.05)] backdrop-blur-xl border border-[rgba(255,255,255,0.2)] rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)] hover:-translate-y-2">
          <h3 className="text-2xl font-bold mb-6 text-white">Key Factors</h3>
          <ul className="list-disc list-inside space-y-3 text-white leading-relaxed text-[1.05rem]">
            <li>Approved stock list</li>
            <li>Subscription & carry fees</li>
            <li>Margin rules & auto-square-off policies</li>
          </ul>
        </div>
      </section>

      {/* ========================= MTF FAQ SECTION ========================= */}
<section className="relative max-w-[90%] mx-auto px-6 py-20">
  <h2 className="text-4xl font-bold text-center mb-12">
    Frequently Asked Questions (MTF)
  </h2>

  {/* CATEGORY BUTTONS */}
  <div className="bg-white/20 backdrop-blur-xl border border-[rgba(255,255,255,0.06)] 
                  shadow-[0_12px_32px_rgba(0,0,0,0.22)] rounded-3xl p-8 mb-10">
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
  <div className="bg-white/20 backdrop-blur-xl border border-[rgba(255,255,255,0.06)] 
                  shadow-[0_12px_32px_rgba(0,0,0,0.22)] rounded-3xl p-10">
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
          href="https://wa.me/919930584020?text=Hi!%20I%20am%20interested%20in%20MTF%20options"
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

      <Footer />
    </div>
  );
}
