"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";

export default function LASPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortFieldFunding, setSortFieldFunding] = useState(null);
  const [sortOrderFunding, setSortOrderFunding] = useState("asc");
  const [sortFieldCost, setSortFieldCost] = useState(null);
  const [sortOrderCost, setSortOrderCost] = useState("asc");

  const [currentTable, setCurrentTable] = useState("funding");

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
            approvedShares: d["Approved List of Shares"] ?? d["Approved List of MF"] ?? d["Approved Shares"] ?? d["Approved Stocks"] ?? "—",
            tenure: d["Tenure"] ?? "—",
            minMaxLoan: minMaxLoanStr,
            marginPeriod: d["Regularization period / Margin Call Period"] ?? "—",
            ltvMin: d["LTV - Funding"]?.Min ?? d["LTV - Funding"]?.min ?? "—",
            ltvMax: d["LTV - Funding"]?.Max ?? d["LTV - Funding"]?.max ?? "—",
            minRate: d["Interest Rate"]?.Min ?? "—",
            maxRate: d["Interest Rate"]?.Max ?? "—",
            medianRate: d["Interest Rate"]?.Median ?? "—",
            processingFee: d["Processing Fee"] ?? "—",
            prepaymentCharges: d["Pre-payment Charges"] ?? "—",
            renewalFee: d["Annual Maintenance Charges / Renewal Fees"] ?? "—",
            penalCharges: d["Penal Charges"] ?? d["Default Charges"] ?? "—",
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
    if (typeof val === "string") return parseFloat(val.replace(/[₹,%]/g, "")) || val;
    return val;
  };

  const handleSort = (field, section) => {
    if (section === "funding") {
      if (sortFieldFunding === field) setSortOrderFunding(sortOrderFunding === "asc" ? "desc" : "asc");
      else { setSortFieldFunding(field); setSortOrderFunding("asc"); }
    } else {
      if (sortFieldCost === field) setSortOrderCost(sortOrderCost === "asc" ? "desc" : "asc");
      else { setSortFieldCost(field); setSortOrderCost("asc"); }
    }
  };

  const sortedFundingData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortFieldFunding) return 0;
      let valA = clean(a[sortFieldFunding]);
      let valB = clean(b[sortFieldFunding]);
      if (typeof valA === "number" && typeof valB === "number") return sortOrderFunding === "asc" ? valA - valB : valB - valA;
      return sortOrderFunding === "asc" ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    });
  }, [data, sortFieldFunding, sortOrderFunding]);

  const sortedCostData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortFieldCost) return 0;
      let valA = clean(a[sortFieldCost]);
      let valB = clean(b[sortFieldCost]);
      if (typeof valA === "number" && typeof valB === "number") return sortOrderCost === "asc" ? valA - valB : valB - valA;
      return sortOrderCost === "asc" ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    });
  }, [data, sortFieldCost, sortOrderCost]);

  const switchTable = () => setCurrentTable(currentTable === "funding" ? "cost" : "funding");

  if (loading) return <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">Loading data...</div>;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <Navbar />

      {/* Hero / Overview */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4">Loan Against Shares</h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Compare Interest Rates, Eligibility, Hidden Charges & More. Access detailed, filterable breakdowns from top lenders like Bajaj Finserv, SBI, Mirae Asset, Axis Bank, Kotak, ICICI Bank, Tata Capital, Zerodha, and HDFC—updated in 2025.
          </p>
        </div>

        {/* Key Highlight Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 border-l-4 border-teal-500">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">💰 Best Interest Rates</h2>
            <p className="text-gray-700 text-sm">Access the latest LAS rates from top financial institutions and choose the most cost-effective option.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">📋 Eligibility & Loan Limits</h2>
            <p className="text-gray-700 text-sm">Check your eligibility and explore minimum & maximum loan amounts for various share types and lenders.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 border-l-4 border-pink-500">
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">📝 Transparent Charges</h2>
            <p className="text-gray-700 text-sm">Understand hidden fees, prepayment charges, and renewal costs upfront so there are no surprises.</p>
          </div>
        </div>
      </section>

      {/* LAS Info Cards */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
          <h2 className="text-xl font-semibold mb-2">What is LAS?</h2>
          <p className="text-gray-700 text-sm">LAS (Loan Against Shares) is a secured overdraft facility where you pledge listed shares as collateral to borrow funds without selling them. Retain ownership, earn dividends, and access liquidity at lower rates (8-20% p.a.).</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
          <h2 className="text-xl font-semibold mb-2">LAS vs Personal Loan</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li><strong>Collateral:</strong> LAS requires pledged shares; personal loans are unsecured.</li>
            <li><strong>Interest Rates:</strong> LAS: 8-15%; Personal: 10-24%.</li>
            <li><strong>Tenure:</strong> LAS: Up to 36 months (renewable); Personal: Fixed EMIs.</li>
            <li><strong>Disbursal:</strong> LAS: 1-2 days with digital pledge.</li>
          </ul>
        </div>
        <div className="p-6 bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
          <h2 className="text-xl font-semibold mb-2">Why LAS?</h2>
          <p className="text-gray-700 text-sm">Maintain market exposure while unlocking cash—perfect for investors in volatile markets.</p>
        </div>
      </section>

      {/* Tables */}
      <section className="max-w-7xl mx-auto px-6 py-8 flex gap-4">
        <div className="flex-1 bg-white rounded-xl shadow-lg overflow-x-auto">
          {currentTable === "funding" && (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  {[
                    { key: "name", label: "Institution" },
                    { key: "approvedShares", label: "Approved Shares" },
                    { key: "tenure", label: "Tenure" },
                    { key: "minMaxLoan", label: "Min & Max Loan" },
                    { key: "marginPeriod", label: "Margin Period" },
                    { key: "ltvMin", label: "LTV Min" },
                    { key: "ltvMax", label: "LTV Max" },
                  ].map((h) => (
                    <th key={h.key} className="px-4 py-3 border-b text-sm font-semibold">
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
              <tbody>
                {sortedFundingData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-3 font-semibold">{row.name}</td>
                    <td className="px-4 py-3">{row.approvedShares}</td>
                    <td className="px-4 py-3">{row.tenure}</td>
                    <td className="px-4 py-3">{row.minMaxLoan}</td>
                    <td className="px-4 py-3">{row.marginPeriod}</td>
                    <td className="px-4 py-3 text-center">{row.ltvMin}</td>
                    <td className="px-4 py-3 text-center">{row.ltvMax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {currentTable === "cost" && (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  {[
                    { key: "name", label: "Institution" },
                    { key: "minRate", label: "Min Rate" },
                    { key: "maxRate", label: "Max Rate" },
                    { key: "medianRate", label: "Median Rate" },
                    { key: "processingFee", label: "Processing Fee" },
                    { key: "prepaymentCharges", label: "Pre-payment Charges" },
                    { key: "renewalFee", label: "Renewal Fee" },
                    { key: "penalCharges", label: "Penal Charges" },
                  ].map((h) => (
                    <th key={h.key} className="px-4 py-3 border-b text-sm font-semibold">
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
              <tbody>
                {sortedCostData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-3 font-semibold">{row.name}</td>
                    <td className="px-4 py-3 text-teal-600 font-medium">{row.minRate}</td>
                    <td className="px-4 py-3 text-pink-600 font-medium">{row.maxRate}</td>
                    <td className="px-4 py-3">{row.medianRate}</td>
                    <td className="px-4 py-3">{row.processingFee}</td>
                    <td className="px-4 py-3">{row.prepaymentCharges}</td>
                    <td className="px-4 py-3">{row.renewalFee}</td>
                    <td className="px-4 py-3">{row.penalCharges}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      {/* Step-by-Step Guide Section */}
<section className="max-w-7xl mx-auto px-6 py-16">
  <h2 className="text-4xl font-bold text-center mb-12">Step-by-Step Guide: How to Apply for LAS in 2025</h2>

  {/* Steps Cards */}
  <div className="grid md:grid-cols-3 gap-6 mb-12">
    <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 border-l-4 border-teal-500">
      <h3 className="text-xl font-semibold mb-2">1. Assess Eligibility</h3>
      <p className="text-gray-700 text-sm">Age 18-70, Indian resident/NRI, good credit, approved shares in demat.</p>
    </div>
    <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 border-l-4 border-blue-500">
      <h3 className="text-xl font-semibold mb-2">2. Compare & Shortlist</h3>
      <p className="text-gray-700 text-sm">Use our tables/filter for rates, LTV (e.g., HDFC up to 80%).</p>
    </div>
    <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 border-l-4 border-pink-500">
      <h3 className="text-xl font-semibold mb-2">3. Gather Documents</h3>
      <p className="text-gray-700 text-sm">PAN, Aadhaar, demat statement, pledge form, photo, bank proof.</p>
    </div>
    <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 border-l-4 border-purple-500">
      <h3 className="text-xl font-semibold mb-2">4. Apply Online</h3>
      <p className="text-gray-700 text-sm">Via lender portal; pledge via NSDL/CDSL.</p>
    </div>
    <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 border-l-4 border-orange-500">
      <h3 className="text-xl font-semibold mb-2">5. Disbursal & Monitoring</h3>
      <p className="text-gray-700 text-sm">Funds in 1-2 days; watch for margin calls. Tip: Digital apps speed up to 24 hours.</p>
    </div>
  </div>

  {/* Why Our LAS Comparison Ranks #1 */}
  <div className="mb-12">
    <h3 className="text-3xl font-bold mb-6 text-center">Why Our LAS Comparison Ranks #1</h3>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl shadow-lg hover:shadow-2xl transition">
        <h4 className="text-xl font-semibold mb-2">SEO-Optimized Depth</h4>
        <p className="text-gray-700 text-sm">Keyword-rich content for “best LAS providers 2025.”</p>
      </div>
      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-lg hover:shadow-2xl transition">
        <h4 className="text-xl font-semibold mb-2">User-First Design</h4>
        <p className="text-gray-700 text-sm">Filterable tables, charts for mobile and desktop.</p>
      </div>
      <div className="p-6 bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl shadow-lg hover:shadow-2xl transition">
        <h4 className="text-xl font-semibold mb-2">Fresh, Accurate Data</h4>
        <p className="text-gray-700 text-sm">October 2025 updates from official sources.</p>
      </div>
      <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl shadow-lg hover:shadow-2xl transition">
        <h4 className="text-xl font-semibold mb-2">Beyond Competitors</h4>
        <p className="text-gray-700 text-sm">Detailed hidden charges vs Policy Bazaar’s overviews.</p>
      </div>
    </div>
  </div>

  {/* Key Factors for Choosing LAS */}
  <div>
    <h3 className="text-3xl font-bold mb-6 text-center">Key Factors for Choosing the Best LAS Provider 2025</h3>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
        <h4 className="text-xl font-semibold mb-2">LTV Ratio</h4>
        <p className="text-gray-700 text-sm">Higher (e.g., HDFC 65-80%) means more borrowing.</p>
      </div>
      <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
        <h4 className="text-xl font-semibold mb-2">Approved Shares</h4>
        <p className="text-gray-700 text-sm">Broader lists (Tata Capital ~1004) offer flexibility.</p>
      </div>
      <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
        <h4 className="text-xl font-semibold mb-2">Margin Call Period</h4>
        <p className="text-gray-700 text-sm">Longer (7 days, Bajaj/Mirae) gives buffer time.</p>
      </div>
      <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition">
        <h4 className="text-xl font-semibold mb-2">Total Costs</h4>
        <p className="text-gray-700 text-sm">Factor renewal/penal charges (e.g., Bank of Baroda low at 10.23% Year 2).</p>
      </div>
    </div>
  </div>
</section>


      {/* Enquire Now Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Enquire Now</h2>
        <p className="text-gray-700 mb-6 text-center max-w-2xl">
          Fill in your details and we will get back to you with the best LAS options available.
        </p>
        <button className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 font-semibold">
          Contact Us
        </button>
      </section>

      <Footer />
    </div>
  );
}
