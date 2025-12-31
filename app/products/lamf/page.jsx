"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MessageCircle, FileText } from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import SpotlightCard from "@/components/SpotlightCard.jsx";
import EnquiryModal from "../../components/EnquiryModal.jsx";
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

  // For enquiry form
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryInstitution, setEnquiryInstitution] = useState(null);

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
    if (!val) return Infinity;

    const str = String(val).toLowerCase();

    // hard stop for non-numeric disclosures
    if (
      str.includes("data not") ||
      str.includes("not disclosed") ||
      str.includes("na") ||
      str.includes("n/a")
    ) {
      return Infinity;
    }

    // extract first valid number
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

  const formatLoanAmount = (value) => {
    if (!value || typeof value !== "string") return value;

    const v = value.toLowerCase().replace(/\s+/g, " ").trim();

    if (v.includes("thousand")) {
      return v.replace(/thousand/i, "K").replace(/\s/g, "");
    }
    if (v.includes("lakh") || v.includes("lac")) {
      return v.replace(/lakh|lac/i, "L").replace(/\s/g, "");
    }
    if (v.includes("crore")) {
      return v.replace(/crore/i, "Cr").replace(/\s/g, "");
    }

    return value;
  };

  const SORTABLE_DYNAMIC_COLUMNS = {
    interest_rate: "interestMedian",
    ltv: "ltv.min",
  };

  const [sortConfig, setSortConfig] = useState({
    key: "firstYear",
    order: "asc",
  });

  const getSortableValue = (row, key) => {
    switch (key) {
      case "institution":
        return row.institution_name ?? "";

      case "firstYear":
        return clean(row.cost_first_year?.amount);

      case "secondYear":
        return clean(row.cost_second_year?.amount);

      case "interestMedian":
        return clean(row.interest_rate?.median);

      case "ltv.min":
        return clean(row.ltv?.min);

      case "ltv.max":
        return clean(row.ltv?.max);

      default:
        return null;
    }
  };

  const sortedTableData = useMemo(() => {
    if (!sortConfig.key) return data;

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

  const normalizeDefaultCharges = (val) => {
    if (!val || typeof val !== "object") {
      return { penal: null, base: null, collection: null };
    }

    let penal = null;
    let base = null;
    let collection = null;

    Object.entries(val).forEach(([key, value]) => {
      const k = key.toLowerCase().replace(/\s+/g, " ").trim();

      if (k.includes("penal")) penal = value;

      if (k === "default charges") base = value;

      if (
        k.includes("collection") ||
        k.includes("legal") ||
        k.includes("voluntary")
      ) {
        collection = value;
      }
    });

    return { penal, base, collection };
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
      { key: "interest_rate", label: "Interest Rate (Min / Max / Median %)" },
    ],
    majorCost: [
      { key: "regularization_period", label: "Margin Call Period (Days)" },
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
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Ambient Blobs */}
        <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] bg-[#1F5E3C]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[35vw] h-[35vw] bg-[#10B981]/5 blur-[120px] rounded-full" />
      </div>
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
          <section className="w-[90%] mx-auto px-2 pt-24 pb-12 sm:pt-32 sm:pb-20 flex flex-col items-center">
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
                Compare interest rates, LTV for debt & equity funds, and the
                true overall cost with clear, unbiased data to help you choose
                the best LAMF provider confidently.
              </p>
            </SpotlightCard>
          </section>

          {/* ========== INFO CARDS (LAS-THEME EXACT) ========== */}
          <section className="max-w-[90%] mx-auto px-3 sm:px-6 pb-10 sm:pb-16">
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
                  text: `Ideal when you want liquidity without interrupting compounding MF NAV volatility is lower than stocks.`,
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
                  <div className="text-gray-800 leading-relaxed text-lg">
                    {card.text}
                  </div>
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
                  ["Interest Range", "8–20% p.a."],
                  ["Tenure", "Up to 36 months"],
                  ["Collateral Type", "Mutual Funds"],
                  ["Disbursal", "1-2 Days"], // ← changed here
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
          <section className="max-w-[90%] mx-auto px-3 sm:px-6 mt-6 sm:mt-10 mb-4">
            <h3 className="text-4xl font-bold text-center mb-10 text-[#0A0F2C]">
              Before You Compare LAMF Costs
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div
                className="
                bg-white/18 backdrop-blur-xl 
                border border-[rgba(35,104,126,0.2)]
                rounded-3xl p-5 sm:p-8 shadow-[0_16px_38px_rgba(0,0,0,0.12)]
                transition-all duration-500 hover:-translate-y-3
                hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
              "
              >
                <h4 className="text-2xl font-bold mb-4 text-[#0D3A27]">
                  How the Cost Summary Is Calculated{" "}
                  <span className="text-red-500 font-bold">*</span>
                </h4>

                <p className="text-gray-800 leading-relaxed text-lg">
                  The table below shows the total cost of a{" "}
                  <strong>₹1,00,000 Loan Against Mutual Funds (LAMF)</strong>
                  over 12 months for each lender. Collateral given is{" "}
                  <strong>₹2,00,000 MF</strong> and an assumed{" "}
                  <strong>50% funding ratio</strong> across financial
                  institutions.
                </p>

                <p className="mt-3 text-gray-700 text-[1rem]">
                  We convert Year 1 and Year 2 interest rates, lender fees, and
                  all charges into <strong>a single comparable number</strong>{" "}
                  so you instantly understand which lender is{" "}
                  <strong>cheapest overall</strong>.
                </p>
              </div>

              {/* Card 2 */}
              <div
                className="
                  bg-white/18 backdrop-blur-xl 
                  border border-[rgba(35,104,126,0.2)]
                  rounded-3xl p-5 sm:p-8 shadow-[0_16px_38px_rgba(0,0,0,0.12)]
                  transition-all duration-500 hover:-translate-y-3
                  hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
                "
              >
                <h4 className="text-2xl font-bold mb-4 text-[#0D3A27]">
                  What You Can Quickly Compare
                </h4>

                <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
                  <li>
                    Overall cost for <strong>equity MF</strong> and{" "}
                    <strong>debt MF</strong> loans
                  </li>
                  <li>Interest-rate structure across lenders</li>
                  <li>
                    Differences in <strong>approved MF lists</strong>
                  </li>
                  <li>
                    <strong>LTV</strong> ranges for debt vs equity funds
                  </li>
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
          <section className="max-w-[90%] mx-auto px-2 sm:px-6 py-6 sm:py-10 flex flex-col items-center">
            <h3 className="text-4xl font-bold mb-10 text-[#0A0F2C]">
              Cost Summary
            </h3>

            <div
              className="
                  w-full bg-white backdrop-blur-2xl 
                  border border-[rgba(255,255,255,0.06)]
                  shadow-[0_12px_32px_rgba(0,0,0,0.22)]
                  rounded-xl overflow-x-auto p-0
                "
            >
              <table className="w-full border-collapse text-gray-800 text-[16px] leading-[1.35] table-highlight text-center">
                <thead>
                  <tr className="text-center font-semibold border-b border-gray-300">
                    {/* Institution */}
                    <th
                      style={{ background: "#124434", color: "#FFFFFF" }}
                      className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide"
                    >
                      <div className="flex items-center gap-2">
                        Institution
                        <SortButton columnKey="institution" />
                      </div>
                    </th>

                    {/* 1st Year */}
                    <th
                      style={{ background: "#124434", color: "#FFFFFF" }}
                      className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide min-w-[140px]"
                    >
                      <div className="flex items-center justify-center">
                        <div className="leading-tight text-center">
                          <div>1st Year</div>
                          <div>
                            (₹1L LAS)
                            <span className="text-red-500 font-bold">*</span>
                          </div>
                        </div>

                        <SortButton columnKey="firstYear" />
                      </div>
                    </th>

                    {/* 2nd Year */}
                    <th
                      style={{ background: "#124434", color: "#FFFFFF" }}
                      className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide min-w-[140px]"
                    >
                      <div className="flex items-center justify-center">
                        <div className="leading-tight text-center">
                          <div>2nd Year</div>
                          <div>
                            (₹1L LAS)
                            <span className="text-red-500 font-bold">*</span>
                          </div>
                        </div>

                        <SortButton columnKey="secondYear" />
                      </div>
                    </th>

                    {/* Approved Funds */}
                    <th className="px-3 py-3 border bg-[#124434] text-white uppercase text-sm">
                      Approved Funds
                    </th>

                    {/* Tenure */}
                    <th className="px-2 py-2 border bg-[#124434] text-white uppercase text-sm">
                      Tenure (Months)
                    </th>

                    {/* Equity MF Loan */}
                    <th className="px-3 py-3 border bg-[#124434] text-white uppercase text-sm min-w-[160px]">
                      <div className="flex flex-col items-center gap-2">
                        <span>Equity MF Loan</span>
                        <div className="grid grid-cols-2 w-full text-xs border-t border-white/30 pt-2">
                          <span>Min</span>
                          <span className="border-l border-white/30">Max</span>
                        </div>
                      </div>
                    </th>

                    {/* Debt MF Loan */}
                    <th className="px-3 py-3 border bg-[#124434] text-white uppercase text-sm min-w-[160px]">
                      <div className="flex flex-col items-center gap-2">
                        <span>Debt MF Loan</span>
                        <div className="grid grid-cols-2 w-full text-xs border-t border-white/30 pt-2">
                          <span>Min</span>
                          <span className="border-l border-white/30">Max</span>
                        </div>
                      </div>
                    </th>

                    {/* LTV */}
                    <th className="px-3 py-3 border bg-[#124434] text-white uppercase text-sm min-w-[200px]">
                      <div className="flex flex-col items-center gap-2">
                        <span>LTV (%)</span>
                        <div className="grid grid-cols-2 w-full text-xs border-t border-white/30 pt-2">
                          <span>Debt</span>
                          <span className="border-l border-white/30">
                            Equity
                          </span>
                        </div>
                      </div>
                    </th>

                    {/* Interest Rate */}
                    <th className="px-3 py-3 border bg-[#124434] text-white uppercase text-sm min-w-[220px]">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span>Interest Rate</span>
                          <SortButton columnKey="interestMedian" />
                        </div>
                        <div className="grid grid-cols-3 w-full text-xs border-t border-white/30 pt-2">
                          <span>Min</span>
                          <span className="border-l border-r border-white/30">
                            Max
                          </span>
                          <span>Median</span>
                        </div>
                      </div>
                    </th>

                    {/* Contact */}
                    <th
                      style={{ background: "#124434", color: "#FFFFFF" }}
                      className="px-3 py-3 border border-gray-300 uppercase text-sm tracking-wide min-w-[190px]"
                    >
                      Contact
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sortedTableData.map((row, index) => (
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
                      <td className="px-5 py-4 border border-gray-300 text-center text-[#1F5E3C] font-medium">
                        {row.cost_first_year ? (
                          <div className="flex flex-col items-center gap-1">
                            {/* Percent */}
                            <div className="font-semibold text-green-700 text-base">
                              {formatPercent1Dec(
                                row.cost_first_year.percent ?? "—"
                              )}
                            </div>

                            {/* Soft Divider Line */}
                            <div
                              className="w-full border-t my-1"
                              style={{ borderColor: "rgba(0,0,0,0.12)" }}
                            ></div>

                            {/* Amount (NO comma formatting) */}
                            <div className="text-sm text-gray-600">
                              {formatRupees(row.cost_first_year.amount ?? "—")}
                            </div>
                          </div>
                        ) : (
                          DEFAULT_NULL_TEXT
                        )}
                      </td>

                      {/* 2nd Year */}
                      <td className="px-5 py-4 border border-gray-300 text-center text-[#124434] font-medium">
                        {row.cost_second_year ? (
                          <div className="flex flex-col items-center gap-1">
                            {/* Percent */}
                            <div className="font-semibold text-green-700 text-base">
                              {formatPercent1Dec(
                                row.cost_second_year.percent ?? "—"
                              )}
                            </div>

                            {/* Soft Divider Line */}
                            <div
                              className="w-full border-t my-1"
                              style={{ borderColor: "rgba(0,0,0,0.12)" }}
                            ></div>

                            {/* Amount (NO comma formatting) */}
                            <div className="text-sm text-gray-600">
                              {formatRupees(row.cost_second_year.amount ?? "—")}
                            </div>
                          </div>
                        ) : (
                          DEFAULT_NULL_TEXT
                        )}
                      </td>

                      {/* Approved Funds */}
                      <td className="px-3 py-3 border border-gray-300 text-gray-800 whitespace-pre-wrap text-center">
                        {row.approved_funds
                          ? `~ ${row.approved_funds}`
                          : DEFAULT_NULL_TEXT}
                      </td>

                      {/* Tenure */}
                      <td className="px-3 py-3 border border-gray-300 text-center">
                        {row.tenure_months ?? DEFAULT_NULL_TEXT}
                      </td>

                      {/* Loan Equity */}
                      <td className="px-3 py-3 border border-gray-300">
                        {row.loan_equity ? (
                          <div className="grid sm:grid-cols-2 text-sm text-center">
                            <div className="font-semibold">
                              {formatLoanAmount(row.loan_equity.min) ?? "—"}
                            </div>
                            <div className="font-semibold sm:border-l border-gray-300">
                              {formatLoanAmount(row.loan_equity.max) ?? "—"}
                            </div>
                          </div>
                        ) : (
                          DEFAULT_NULL_TEXT
                        )}
                      </td>

                      {/* Loan Debt */}
                      <td className="px-3 py-3 border border-gray-300">
                        {row.loan_debt ? (
                          <div className="grid sm:grid-cols-2 text-sm text-center">
                            <div className="font-semibold">
                              {formatLoanAmount(row.loan_debt.min) ?? "—"}
                            </div>
                            <div className="font-semibold sm:border-l border-gray-300">
                              {formatLoanAmount(row.loan_debt.max) ?? "—"}
                            </div>
                          </div>
                        ) : (
                          DEFAULT_NULL_TEXT
                        )}
                      </td>

                      {/* LTV Funding */}
                      <td className="px-3 py-3 border border-gray-300">
                        {row.ltv ? (
                          <div className="grid sm:grid-cols-2 text-sm text-center">
                            <div>{formatPercent1Dec(row.ltv.debt ?? "—")}</div>
                            <div className="sm:border-l border-gray-300">
                              {formatPercent1Dec(row.ltv.equity ?? "—")}
                            </div>
                          </div>
                        ) : (
                          DEFAULT_NULL_TEXT
                        )}
                      </td>

                      {/* Interest */}
                      <td className="px-3 py-3 border border-gray-300">
                        {row.interest_rate ? (
                          <div className="grid grid-cols-3 text-center text-sm">
                            <span>
                              {formatPercent1Dec(row.interest_rate.min ?? "—")}
                            </span>
                            <span className="border-l border-r border-gray-300">
                              {formatPercent1Dec(row.interest_rate.max ?? "—")}
                            </span>
                            <span className="font-semibold text-[#1F5E3C]">
                              {formatPercent1Dec(
                                row.interest_rate.median ?? "—"
                              )}
                            </span>
                          </div>
                        ) : (
                          DEFAULT_NULL_TEXT
                        )}
                      </td>

                      {/* Contact Buttons */}
                      <td className="px-3 py-3 border border-gray-300 text-center">
                        <a
                          href={`https://wa.me/919082930770?text=Hi! I’m interested in LAMF by ${encodeURIComponent(
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
                            className="w-10 h-4"
                          >
                            <path d="M16 .8C7.6.8.8 7.6.8 16c0 2.8.8 5.6 2.4 8L0 32l8.4-3.2c2.4 1.2 4.8 1.6 7.6 1.6 8.4 0 15.2-6.8 15.2-15.2S24.4.8 16 .8zm0 27.6c-2.4 0-4.8-.8-6.8-1.6l-.4-.4-5.2 2 2-5.2-.4-.4c-1.6-2-2.4-4.4-2.4-6.8 0-7.2 5.6-12.8 12.8-12.8s12.8 5.6 12.8 12.8S23.2 28.4 16 28.4zm7.2-9.2c-.4-.4-2-1.2-2.4-1.2-.4 0-.8 0-1.2.4-.4.4-.8 1.2-1.2 1.6-.4.4-.8.4-1.2.2-1.2-.6-2.4-1.4-3.4-2.6-.8-.8-1.4-1.8-2-3-.2-.4 0-.8.2-1.2.2-.2.4-.6.6-.8.2-.2.2-.4.4-.8 0-.4 0-.8-.2-1.2-.2-.4-1.2-2.2-1.6-3s-.8-.6-1.2-.6h-1c-.4 0-.8.2-1.2.6-.4.6-1.6 1.6-1.6 4s1.6 4.6 1.8 5c.2.4 3 4.8 7.2 6.8 4.2 2.2 4.8 1.6 5.6 1.6.8 0 2.8-1 3.2-2 .4-.8.4-1.6.2-2-.2-.4-.4-.6-.8-.8z" />
                          </svg>
                          Enquire
                        </a>

                        <div className="mt-3">
                          <button
                            onClick={() => {
                              setEnquiryInstitution(row.institution_name);
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

              {/* Empty state */}
              {(!data || data.length === 0) && (
                <div className="text-gray-600 text-center py-8 font-medium text-[15px]">
                  No data available.
                </div>
              )}
            </div>
          </section>

          {/* PRE–DETAILED COST SUMMARY INFO CARDS (LAMF) */}
          <section className="max-w-[90%] mx-auto px-3 sm:px-6 mt-6 sm:mt-10 mb-6">
            <h3 className="text-4xl font-bold text-center mb-10 text-[#0A0F2C]">
              Understanding the Full LAMF Cost Breakdown
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div
                className="
                    bg-white/18 backdrop-blur-xl 
                    border border-[rgba(35,104,126,0.2)]
                    rounded-3xl p-5 sm:p-8 shadow-[0_16px_38px_rgba(0,0,0,0.12)]
                    transition-all duration-500 hover:-translate-y-3
                    hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
                  "
              >
                <h4 className="text-2xl font-bold mb-4 text-[#0D3A27]">
                  What This Section Shows
                </h4>

                <p className="text-gray-800 leading-relaxed text-lg">
                  The detailed cost tables below show the complete pricing
                  structure for every lender including year-wise interest,
                  approved fund lists, loan limits, LTV levels for debt and
                  equity funds, and margin-call periods.
                </p>

                <p className="mt-3 text-gray-700 text-[1rem]">
                  This gives <strong>full transparency</strong> into how lenders
                  price LAMF loans and shows the exact components used to
                  compute the overall cost in the summary table above.
                </p>
              </div>

              {/* Card 2 */}
              <div
                className="
                    bg-white/18 backdrop-blur-xl 
                    border border-[rgba(35,104,126,0.2)]
                    rounded-3xl p-5 sm:p-8 shadow-[0_16px_38px_rgba(0,0,0,0.12)]
                    transition-all duration-500 hover:-translate-y-3
                    hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)]
                  "
              >
                <h4 className="text-2xl font-bold mb-4 text-[#0D3A27]">
                  How to Use the Tabs Above
                </h4>

                <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
                  <li>
                    <strong>Funding-Related Details:</strong> Loan limits,
                    approved funds list, LTV for debt & equity
                  </li>
                  <li>
                    <strong>Major Cost:</strong> Processing, renewal & annual
                    maintenance fees
                  </li>
                  <li>
                    <strong>Default Charges:</strong> Penal interest, overdue
                    charges, margin shortfall penalties
                  </li>
                  <li>
                    <strong>Other Miscellaneous Cost:</strong> DP/lien charges,
                    brokerage, stamp duty, fund-house fees
                  </li>
                </ul>

                <p className="mt-3 text-gray-700 text-[1rem]">
                  Perfect for users who want to verify calculations or compare
                  lender policies in detail.
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
           *  DETAILED LAMF COST SUMMARY — EXACT LAS THEME
           * ===================================================== */}
          <section className="max-w-[90%] mx-auto px-2 sm:px-6 py-6 sm:py-10 flex flex-col items-center">
            <h3 className="text-4xl font-bold mb-8 text-[#0A0F2C]">
              Detailed LAMF Cost Summary
            </h3>

            <div
              className="
                  w-full bg-white backdrop-blur-xl 
                  border border-[rgba(255,255,255,0.06)]
                  shadow-[0_12px_32px_rgba(0,0,0,0.22)]
                  rounded-xl overflow-x-auto p-4
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
                <table className="w-full border-collapse text-[15px] text-gray-900 table-highlight text-center">
                  <thead>
                    <tr className="font-semibold border-b border-gray-300">
                      {/* Institution */}
                      <th
                        className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide text-center"
                        style={{ background: "#124434", color: "#fff" }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          Institution
                          <SortButton columnKey="institution" />
                        </div>
                      </th>

                      {/* 1st Year */}
                      <th
                        className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide text-center"
                        style={{ background: "#124434", color: "#fff" }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className="leading-tight text-center">
                            <div>1st Year</div>
                            <div>
                              (₹1L LAS){" "}
                              <span className="text-red-500 font-bold">*</span>
                            </div>
                          </div>

                          <SortButton columnKey="firstYear" />
                        </div>
                      </th>

                      {/* 2nd Year */}
                      <th
                        className="px-5 py-4 border border-gray-300 uppercase text-sm tracking-wide text-center"
                        style={{ background: "#124434", color: "#fff" }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className="leading-tight text-center">
                            <div>2nd Year</div>
                            <div>
                              (₹1L LAS)
                              <span className="text-red-500 font-bold">*</span>
                            </div>
                          </div>

                          <SortButton columnKey="secondYear" />
                        </div>
                      </th>

                      {/* ================= DYNAMIC COLUMNS ================= */}
                      {rightTableColumns[activeTableCategory].map((col) => {
                        /* ================= EQUITY / DEBT MF LOAN (MIN | MAX) ================= */
                        if (
                          col.key === "loan_equity" ||
                          col.key === "loan_debt"
                        ) {
                          return (
                            <th
                              key={col.key}
                              className="px-3 py-3 border border-gray-300 uppercase text-sm tracking-wide"
                              style={{
                                background: "#124434",
                                color: "#fff",
                                minWidth: 220,
                              }}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <span>{col.label}</span>

                                <div className="grid grid-cols-2 w-full text-xs border-t border-white/30 pt-2">
                                  <span className="text-center">Min</span>
                                  <span className="text-center border-l border-white/30">
                                    Max
                                  </span>
                                </div>
                              </div>
                            </th>
                          );
                        }

                        /* ================= LTV (DEBT | EQUITY %) ================= */
                        if (col.key === "ltv") {
                          return (
                            <th
                              key={col.key}
                              className="px-3 py-3 border border-gray-300 uppercase text-sm tracking-wide"
                              style={{
                                background: "#124434",
                                color: "#fff",
                                minWidth: 220,
                              }}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <span>LTV (%)</span>

                                <div className="grid grid-cols-2 w-full text-xs border-t border-white/30 pt-2">
                                  <span className="text-center">Debt</span>
                                  <span className="text-center border-l border-white/30">
                                    Equity
                                  </span>
                                </div>
                              </div>
                            </th>
                          );
                        }

                        /* ================= INTEREST RATE (MIN | MAX | MEDIAN) ================= */
                        if (col.key === "interest_rate") {
                          return (
                            <th
                              key={col.key}
                              className="px-3 py-3 border border-gray-300 uppercase text-sm tracking-wide"
                              style={{
                                background: "#124434",
                                color: "#fff",
                                minWidth: 260,
                              }}
                            >
                              <div className="flex flex-col items-center gap-2">
                                {/* title + sort */}
                                <div className="flex items-center gap-2">
                                  <span>Interest Rate</span>
                                  <SortButton columnKey="interestMedian" />
                                </div>

                                <div className="grid grid-cols-3 w-full text-xs border-t border-white/30 pt-2">
                                  <span className="text-center">Min</span>
                                  <span className="text-center border-l border-r border-white/30">
                                    Max
                                  </span>
                                  <span className="text-center">Median</span>
                                </div>
                              </div>
                            </th>
                          );
                        }

                        /* ================= DEFAULT CHARGES (PENAL | DEFAULT | COLLECTION) ================= */
                        if (col.key === "default_charges") {
                          return (
                            <th
                              key={col.key}
                              className="px-3 py-3 border border-gray-300 uppercase text-sm tracking-wide"
                              style={{
                                background: "#124434",
                                color: "#fff",
                                minWidth: 260,
                              }}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <span>Default Charges</span>

                                <div className="grid grid-cols-3 w-full text-xs border-t border-white/30 pt-2">
                                  <span className="text-center">Penal</span>
                                  <span className="text-center border-l border-r border-white/30">
                                    Default
                                  </span>
                                  <span className="text-center">
                                    Collection / Legal
                                  </span>
                                </div>
                              </div>
                            </th>
                          );
                        }

                        /* ================= FALLBACK NORMAL COLUMN ================= */
                        return (
                          <th
                            key={col.key}
                            className="px-3 py-3 border border-gray-300 uppercase text-sm tracking-wide text-center"
                            style={{ background: "#124434", color: "#fff" }}
                          >
                            {col.label}
                          </th>
                        );
                      })}

                      {/* Contact */}
                      <th
                        className="px-3 py-3 border border-gray-300 uppercase text-sm tracking-wide text-center min-w-[180px]"
                        style={{ background: "#124434", color: "#fff" }}
                      >
                        Contact
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {sortedTableData.map((row, index) => (
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
                            <div className="flex flex-col items-center gap-1">
                              {/* Percent */}
                              <div className="font-semibold text-green-700 text-base">
                                {formatPercent1Dec(
                                  row.cost_first_year.percent ?? "—"
                                )}
                              </div>

                              {/* Soft Divider Line */}
                              <div
                                className="w-full border-t my-1"
                                style={{ borderColor: "rgba(0,0,0,0.12)" }}
                              ></div>

                              {/* Amount (NO comma formatting) */}
                              <div className="text-sm text-gray-600">
                                {formatRupees(
                                  row.cost_first_year.amount ?? "—"
                                )}
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
                                {formatPercent1Dec(
                                  row.cost_second_year.percent ?? "—"
                                )}
                              </div>

                              {/* Soft Divider Line */}
                              <div
                                className="w-full border-t my-1"
                                style={{ borderColor: "rgba(0,0,0,0.12)" }}
                              ></div>

                              {/* Amount (NO comma formatting) */}
                              <div className="text-sm text-gray-600">
                                {formatRupees(
                                  row.cost_second_year.amount ?? "—"
                                )}
                              </div>
                            </div>
                          ) : (
                            DEFAULT_NULL_TEXT
                          )}
                        </td>

                        {/* ================= DYNAMIC FIELDS ================= */}
                        {rightTableColumns[activeTableCategory].map((c) => {
                          const val = row[c.key];

                          /* ================= EQUITY MF LOAN (MIN | MAX) ================= */
                          if (c.key === "loan_equity") {
                            return (
                              <td
                                key={`${row.id}-${c.key}`}
                                className="px-3 py-3 border border-gray-300 text-center"
                                style={{ minWidth: "160px" }}
                              >
                                {val ? (
                                  <div className="grid sm:grid-cols-2 text-sm">
                                    <div className="font-semibold">
                                      {formatLoanAmount(val.min) ?? "—"}
                                    </div>
                                    <div className="font-semibold sm:border-l border-gray-300">
                                      {formatLoanAmount(val.max) ?? "—"}
                                    </div>
                                  </div>
                                ) : (
                                  DEFAULT_NULL_TEXT
                                )}
                              </td>
                            );
                          }

                          /* ================= DEBT MF LOAN (MIN | MAX) ================= */
                          if (c.key === "loan_debt") {
                            return (
                              <td
                                key={`${row.id}-${c.key}`}
                                className="px-3 py-3 border border-gray-300 text-center"
                                style={{ minWidth: "160px" }}
                              >
                                {val ? (
                                  <div className="grid sm:grid-cols-2 text-sm">
                                    <div className="font-semibold">
                                      {formatLoanAmount(val.min) ?? "—"}
                                    </div>
                                    <div className="font-semibold sm:border-l border-gray-300">
                                      {formatLoanAmount(val.max) ?? "—"}
                                    </div>
                                  </div>
                                ) : (
                                  DEFAULT_NULL_TEXT
                                )}
                              </td>
                            );
                          }

                          /* ================= LTV (DEBT | EQUITY %) ================= */
                          if (c.key === "ltv") {
                            return (
                              <td
                                key={`${row.id}-${c.key}`}
                                className="px-3 py-3 border border-gray-300 text-center"
                                style={{ minWidth: "160px" }}
                              >
                                {val ? (
                                  <div className="grid sm:grid-cols-2 text-sm">
                                    <div>
                                      {formatPercent1Dec(val.debt ?? "—")}
                                    </div>
                                    <div className="sm:border-l border-gray-300">
                                      {formatPercent1Dec(val.equity ?? "—")}
                                    </div>
                                  </div>
                                ) : (
                                  DEFAULT_NULL_TEXT
                                )}
                              </td>
                            );
                          }

                          /* ================= INTEREST RATE (MIN | MAX | MEDIAN) ================= */
                          if (c.key === "interest_rate") {
                            return (
                              <td
                                key={`${row.id}-${c.key}`}
                                className="px-3 py-3 border border-gray-300 text-center"
                                style={{ minWidth: "220px" }}
                              >
                                {val ? (
                                  <div className="grid grid-cols-3 text-sm">
                                    <span>
                                      {formatPercent1Dec(val.min ?? "—")}
                                    </span>
                                    <span className="border-l border-r border-gray-300">
                                      {formatPercent1Dec(val.max ?? "—")}
                                    </span>
                                    <span className="font-semibold text-[#1F5E3C]">
                                      {formatPercent1Dec(val.median ?? "—")}
                                    </span>
                                  </div>
                                ) : (
                                  DEFAULT_NULL_TEXT
                                )}
                              </td>
                            );
                          }

                          /* ================= OTHER EXPENSES (LAMF — SAME TABLE STYLE) ================= */
                          if (c.key === "other_expenses") {
                            return (
                              <td
                                key={`${row.id}-${c.key}`}
                                className="px-3 py-3 border border-gray-300 text-left"
                                style={{ minWidth: "220px" }}
                              >
                                {val && typeof val === "object" ? (
                                  <div className="flex flex-col">
                                    {Object.entries(val).map(
                                      ([label, value], index, arr) => (
                                        <div
                                          key={label}
                                          className="flex flex-col"
                                        >
                                          {/* Label + Value */}
                                          <div className="flex justify-between gap-4">
                                            <span>{label}</span>
                                            <span className="text-gray-600 text-right">
                                              {value ?? "—"}
                                            </span>
                                          </div>

                                          {/* Soft Divider (not after last item) */}
                                          {index !== arr.length - 1 && (
                                            <div
                                              className="w-full border-t my-1"
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

                          /* ================= PROCESSING FEE (LAMF — LAS STYLE MATCHED) ================= */
                          if (c.key === "processing_fee") {
                            const text = typeof val === "string" ? val : "";

                            const lines = text
                              .split(/\n+/)
                              .map((l) => l.trim())
                              .filter(Boolean);

                            const hasMin = lines.some((l) =>
                              l.toLowerCase().startsWith("min")
                            );
                            const hasMax = lines.some((l) =>
                              l.toLowerCase().startsWith("max")
                            );

                            const hasDigital = lines.some(
                              (l) =>
                                l.toLowerCase().includes("digital") &&
                                !l.toLowerCase().includes("non")
                            );
                            const hasNonDigital = lines.some((l) =>
                              l.toLowerCase().includes("non digital")
                            );

                            // SPECIAL CASE: ₹1,499 - Digital Cases (leave untouched)
                            const isSpecialDigitalCase =
                              lines.length === 2 &&
                              lines[0].startsWith("₹") &&
                              lines[1].toLowerCase().includes("digital") &&
                              !lines[1].toLowerCase().includes("non");

                            return (
                              <td
                                key={`${row.id}-${c.key}`}
                                className="px-5 py-4 border border-gray-300 text-center"
                                style={{ minWidth: "260px" }}
                              >
                                <div className="flex flex-col text-sm text-gray-900">
                                  {lines.map((line, index) => {
                                    const lower = line.toLowerCase();

                                    const isMin = lower.startsWith("min");
                                    const isMax = lower.startsWith("max");
                                    const isDigital =
                                      lower.includes("digital") &&
                                      !lower.includes("non");
                                    const isNonDigital =
                                      lower.includes("non digital");

                                    // Split label & value
                                    const parts = line.split(/[:–-]/);
                                    const label = parts[0]?.trim();
                                    const value = parts
                                      .slice(1)
                                      .join(":")
                                      .trim();

                                    /* ===== SPECIAL DIGITAL CASE (NO FORMATTING) ===== */
                                    if (isSpecialDigitalCase) {
                                      return (
                                        <div
                                          key={index}
                                          className="text-gray-900"
                                        >
                                          {line}
                                        </div>
                                      );
                                    }

                                    return (
                                      <div
                                        key={index}
                                        className="flex flex-col"
                                      >
                                        {/* ===== STATEMENT LINE ===== */}
                                        {!isMin &&
                                          !isMax &&
                                          !isDigital &&
                                          !isNonDigital && (
                                            <>
                                              <div className="text-gray-900">
                                                {line}
                                              </div>

                                              {/* Divider ONLY if Min / Max exists */}
                                              {(hasMin || hasMax) &&
                                                index === 0 && (
                                                  <div
                                                    className="w-full border-t my-2"
                                                    style={{
                                                      borderColor:
                                                        "rgba(0,0,0,0.12)",
                                                    }}
                                                  />
                                                )}
                                            </>
                                          )}

                                        {/* ===== MIN / MAX (NO divider between them) ===== */}
                                        {(isMin || isMax) && (
                                          <div className="flex justify-between gap-4">
                                            <span className="font-medium capitalize">
                                              {label}
                                            </span>
                                            <span className="text-right">
                                              {value}
                                            </span>
                                          </div>
                                        )}

                                        {/* ===== DIGITAL / NON-DIGITAL ===== */}
                                        {(isDigital || isNonDigital) && (
                                          <>
                                            <div className="flex justify-between gap-4">
                                              <span className="font-medium">
                                                {isDigital
                                                  ? "Digital"
                                                  : "Non Digital"}
                                              </span>
                                              <span className="text-right">
                                                {value}
                                              </span>
                                            </div>

                                            {/* Divider ONLY between Digital ↔ Non-Digital */}
                                            {isDigital && hasNonDigital && (
                                              <div
                                                className="w-full border-t my-2"
                                                style={{
                                                  borderColor:
                                                    "rgba(0,0,0,0.12)",
                                                }}
                                              />
                                            )}
                                          </>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </td>
                            );
                          }

                          if (
                            ["processing_fee", "annual_maintenance"].includes(
                              c.key
                            )
                          ) {
                            const raw = typeof val === "string" ? val : "";

                            // 🚨 IMPORTANT: handle null / empty explicitly
                            if (
                              !raw ||
                              raw.toLowerCase().includes("not available")
                            ) {
                              return (
                                <td
                                  key={`${row.id}-${c.key}`}
                                  className="px-3 py-3 border border-gray-300 text-center text-gray-700"
                                  style={{ minWidth: "240px" }}
                                >
                                  {raw || "Data publicly not available"}
                                </td>
                              );
                            }

                            const lines = raw
                              .split(/\n+/)
                              .map((l) => l.trim())
                              .filter(Boolean);

                            const hasMin = lines.some((l) =>
                              l.toLowerCase().startsWith("min")
                            );
                            const hasMax = lines.some((l) =>
                              l.toLowerCase().startsWith("max")
                            );

                            return (
                              <td
                                key={`${row.id}-${c.key}`}
                                className="px-3 py-3 border border-gray-300 text-center"
                                style={{ minWidth: "240px" }}
                              >
                                <div className="flex flex-col text-sm text-gray-900 gap-1">
                                  {lines.map((line, index) => {
                                    const lower = line.toLowerCase();

                                    const isMin = lower.startsWith("min");
                                    const isMax = lower.startsWith("max");

                                    const hasLabelSeparator = /[:–-]/.test(
                                      line
                                    );

                                    // Split label & value safely
                                    const parts = line.split(/[:–-]/);
                                    const label = parts[0]?.trim();
                                    const value = parts
                                      .slice(1)
                                      .join(":")
                                      .trim();

                                    /* ================= STATEMENT ================= */
                                    if (
                                      !isMin &&
                                      !isMax &&
                                      !hasLabelSeparator
                                    ) {
                                      return (
                                        <div key={index}>
                                          <div>{line}</div>

                                          {/* Divider ONLY if Min/Max exists later */}
                                          {(hasMin || hasMax) &&
                                            index === 0 && (
                                              <div
                                                className="w-full border-t my-2"
                                                style={{
                                                  borderColor:
                                                    "rgba(0,0,0,0.12)",
                                                }}
                                              />
                                            )}
                                        </div>
                                      );
                                    }

                                    /* ================= LABEL : VALUE ================= */
                                    if (hasLabelSeparator) {
                                      return (
                                        <div
                                          key={index}
                                          className="flex justify-between gap-4"
                                        >
                                          <span className="font-medium">
                                            {label}
                                          </span>
                                          <span className="text-right">
                                            {value}
                                          </span>
                                        </div>
                                      );
                                    }

                                    return null;
                                  })}
                                </div>
                              </td>
                            );
                          }

                          /* ================= PENAL CHARGES (%) ================= */
                          if (c.key === "penal_charges") {
                            return (
                              <td
                                key={`${row.id}-${c.key}`}
                                className="px-3 py-3 border border-gray-300 text-center"
                                style={{ minWidth: "160px" }}
                              >
                                {val == null || val === ""
                                  ? DEFAULT_NULL_TEXT
                                  : String(val).includes("%")
                                  ? val
                                  : `${val}%`}
                              </td>
                            );
                          }

                          /* ================= DEFAULT CHARGES (PENAL | DEFAULT | COLLECTION) ================= */
                          if (c.key === "default_charges") {
                            const charges = normalizeDefaultCharges(val);

                            return (
                              <td
                                key={`${row.id}-${c.key}`}
                                className="px-3 py-3 border border-gray-300 text-center"
                                style={{ minWidth: "220px" }}
                              >
                                <div className="grid grid-cols-3 text-sm">
                                  {/* Penal */}
                                  <span className="font-semibold text-gray-900">
                                    {formatPercent1Dec(charges.penal ?? "—")}
                                  </span>

                                  {/* Default */}
                                  <span className="border-l border-r border-gray-300">
                                    {charges.base ?? "—"}
                                  </span>

                                  {/* Collection / Legal / Voluntary */}
                                  <span className="font-semibold text-[#1F5E3C]">
                                    {charges.collection ?? "—"}
                                  </span>
                                </div>
                              </td>
                            );
                          }

                          /* ================= FALLBACK (OTHER MISC / SIMPLE FIELDS) ================= */
                          return (
                            <td
                              key={`${row.id}-${c.key}`}
                              className="px-5 py-4 border border-gray-300 text-center whitespace-pre-wrap"
                            >
                              {val == null
                                ? DEFAULT_NULL_TEXT
                                : typeof val === "object"
                                ? Object.entries(val).map(([k, v], i) => (
                                    <div key={`${row.id}-${c.key}-${i}`}>
                                      {k}: {v ?? "—"}
                                    </div>
                                  ))
                                : val}
                            </td>
                          );
                        })}

                        {/* Contact */}
                        <td className="px-3 py-3 border border-gray-300 text-center">
                          <a
                            href={`https://wa.me/919082930770?text=Hi! I'm interested in LAMF by ${encodeURIComponent(
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
                              className="w-10 h-4"
                            >
                              <path d="M16 .8C7.6.8.8 7.6.8 16c0 2.8.8 5.6 2.4 8L0 32l8.4-3.2c2.4 1.2 4.8 1.6 7.6 1.6 8.4 0 15.2-6.8 15.2-15.2S24.4.8 16 .8zm0 27.6c-2.4 0-4.8-.8-6.8-1.6l-.4-.4-5.2 2 2-5.2-.4-.4c-1.6-2-2.4-4.4-2.4-6.8 0-7.2 5.6-12.8 12.8-12.8s12.8 5.6 12.8 12.8S23.2 28.4 16 28.4zm7.2-9.2c-.4-.4-2-1.2-2.4-1.2-.4 0-.8 0-1.2.4-.4.4-.8 1.2-1.2 1.6-.4.4-.8.4-1.2.2-1.2-.6-2.4-1.4-3.4-2.6-.8-.8-1.4-1.8-2-3-.2-.4 0-.8.2-1.2.2-.2.4-.6.6-.8.2-.2.2-.4.4-.8 0-.4 0-.8-.2-1.2-.2-.4-1.2-2.2-1.6-3s-.8-.6-1.2-.6h-1c-.4 0-.8.2-1.2.6-.4.6-1.6 1.6-1.6 4s1.6 4.6 1.8 5c.2.4 3 4.8 7.2 6.8 4.2 2.2 4.8 1.6 5.6 1.6.8 0 2.8-1 3.2-2 .4-.8.4-1.6.2-2-.2-.4-.4-.6-.8-.8z" />
                            </svg>
                            Enquire
                          </a>

                          <div className="mt-3">
                            <button
                              onClick={() => {
                                setEnquiryInstitution(row.institution_name);
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
            </div>
          </section>

          {/* LAMF Summary — Before FAQ */}
          <section className="max-w-[90%] mx-auto px-3 sm:px-6 py-10 sm:py-16">
            <h2 className="text-4xl font-bold text-center mb-10 text-[#0A0F2C]">
              Key Takeaways to Guide Your LAMF Decision
            </h2>

            <div
              className="
      bg-white/20 backdrop-blur-xl
      border border-[rgba(255,255,255,0.10)]
      shadow-[0_16px_38px_rgba(0,0,0,0.15)]
      rounded-3xl p-6 sm:p-10
      leading-relaxed text-gray-900
    "
            >
              <p className="text-[1.15rem] mb-6">
                <strong>Loan Against Mutual Funds (LAMF)</strong> allows you to
                borrow against your existing MF investments without redeeming
                them, helping you maintain compounding benefits while getting
                quick liquidity. Interest rates are typically lower than
                personal loans, and lenders provide separate{" "}
                <strong>LTV structures for debt and equity mutual funds</strong>
                .
              </p>

              <p className="text-[1.15rem] mb-6">
                CompareFi calculates the <strong>true overall cost</strong> of a
                ₹1,00,000 LAMF (based on ₹2,00,000 pledged MF units at ~50%
                funding) across lenders including interest, charges, and taxes.
                This removes the confusion around different APR structures and
                allows you to see which lender is genuinely{" "}
                <strong>most cost-effective</strong>.
              </p>

              <p className="text-[1.15rem] mb-6">
                Debt mutual funds usually receive <strong>higher LTV</strong>{" "}
                (sometimes up to 80–90%), while equity-oriented funds receive
                lower LTVs due to volatility. Some lenders also approve more
                mutual funds than others, which directly affects your borrowing
                flexibility. Margin-call buffers differ as well, impacting your
                risk during NAV dips.
              </p>

              <p className="text-[1.15rem]">
                Before choosing a lender, assess their overall cost, LTV for
                your specific fund type, approved MF list coverage, and
                margin-call flexibility. CompareFi makes this simple with
                transparent and unbiased data.
              </p>
            </div>

            {/* CTA Block */}
            <div className="mt-12 flex flex-col items-center text-center">
              <h3 className="text-3xl font-bold text-[#0A0F2C] mb-4">
                Enquire Now We’ll Suggest the Best LAMF Provider for You
              </h3>

              <p className="text-gray-700 max-w-2xl mb-8">
                Chat on WhatsApp or submit a short form we’ll analyse your
                mutual funds and recommend the{" "}
                <strong>lowest-cost LAMF option</strong> based on your
                portfolio.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/919082930770?text=Hi! I need help choosing the best LAMF provider."
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

          {/* HOW TO APPLY & KEY FACTORS */}
          <section className="max-w-[90%] mx-auto px-3 sm:px-6 py-10 sm:py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Card 1 */}
            <div
              className="backdrop-blur-xl border bg-[#e8feff3f]
          shadow-[0_16px_38px_rgba(0,0,0,0.05)] border-[rgba(35,104,126,0.2)] rounded-3xl p-6 sm:p-10 transition-all duration-500 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)] hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold mb-6 text-[#0D3A27]">
                How to Apply for LAMF in 2025: Step-by-Step Guide
              </h3>
              <ol className="list-decimal list-inside space-y-3 leading-relaxed text-[1.05rem] mb-6 text-gray-800">
                <li>
                  <strong>Select Eligible Funds:</strong> Verify mutual funds
                  are on the lender’s approved list.
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
                  Aadhaar, MF statement, bank proof; pledge marking.
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
  shadow-[0_16px_38px_rgba(0,0,0,0.05) backdrop-blur-xl border border-[rgba(255,255,255,0.2)] rounded-3xl p-6 sm:p-10 transition-all duration-500 hover:shadow-[0_16px_38px_rgba(0,0,0,0.26)] hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold mb-6 text-black">
                Key Factors: Choosing the Best LAMF Provider
              </h3>

              <ul className="list-disc list-inside space-y-3 text-black leading-relaxed text-[1.05rem]">
                <li>
                  <strong>LTV Ratio:</strong> Choose funds that offer a higher
                  LTV, as this allows you to borrow a larger loan amount against
                  the same value of pledged securities.
                </li>

                <li>
                  <strong>Approved MF:</strong> Broader approved lists give
                  greater flexibility.
                </li>

                <li>
                  <strong>Margin Call Period:</strong> Longer periods (e.g., 7
                  days with certain lenders) provide more time to regularize
                  positions.
                </li>

                <li>
                  <strong>Total Costs:</strong> Make your decision based on the{" "}
                  <strong>“Overall Cost”</strong> column to know the
                  detailed cost across years to find the lenders with cheapest
                  cost.
                </li>
              </ul>
            </div>
          </section>

          {/* ================ FAQ SECTION ================ */}
          <section className="relative max-w-[90%] mx-auto px-3 sm:px-6 py-12 sm:py-20">
            <h2 className="text-4xl font-bold text-center mb-12">
              Frequently Asked Questions about LAMF
            </h2>

            {/* Categories */}
            <div className="bg-white/20 backdrop-blur-xl p-5 sm:p-8 rounded-3xl shadow mb-10">
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
            <div className="bg-white/20 backdrop-blur-xl p-6 sm:p-10 rounded-3xl shadow">
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
          <section className="max-w-[85%] mx-auto px-3 sm:px-6 py-8 sm:py-12 text-center flex flex-col items-center">
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
                  "https://wa.me/919082930770?text=Hi! I’m interested in learning more about LAMF options.",
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

      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        product="Loan Against Mutual Funds (LAMF)"
        institution={enquiryInstitution}
      />

      <Footer />
    </div>
  );
}
