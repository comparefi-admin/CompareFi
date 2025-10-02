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
  const [faqOpen, setFaqOpen] = useState(null);

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
    if (typeof val === "string") {
      return parseFloat(val.replace(/[₹,%]/g, "")) || val;
    }
    return val;
  };

  const handleSort = (field, section) => {
    if (section === "funding") {
      if (sortFieldFunding === field) {
        setSortOrderFunding(sortOrderFunding === "asc" ? "desc" : "asc");
      } else {
        setSortFieldFunding(field);
        setSortOrderFunding("asc");
      }
    } else {
      if (sortFieldCost === field) {
        setSortOrderCost(sortOrderCost === "asc" ? "desc" : "asc");
      } else {
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
      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrderFunding === "asc" ? valA - valB : valB - valA;
      }
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
      if (typeof valA === "number" && typeof valB === "number") {
        return sortOrderCost === "asc" ? valA - valB : valB - valA;
      }
      return sortOrderCost === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortFieldCost, sortOrderCost]);

  const switchTable = () => setCurrentTable(currentTable === "funding" ? "cost" : "funding");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Loading data from Firebase...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <Navbar />

      {/* About LAS */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <h1 className="text-5xl font-bold mb-4">About Loan Against Shares (LAS)</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Loan Against Shares (LAS) allows investors to borrow funds using their share holdings as collateral. 
            This provides liquidity without selling your investments.
          </p>
        </div>
      </section>

      {/* Table Section */}
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

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions about LAS</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">What is a Loan Against Shares (LAS)?</h3>
            <p className="text-gray-700">LAS is a secured loan where you pledge your shares as collateral to get funds without selling your holdings.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Who is eligible for LAS?</h3>
            <p className="text-gray-700">Individuals holding shares in a registered stock exchange are eligible. Loan amount depends on pledged share value.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">What is the loan-to-value ratio (LTV)?</h3>
            <p className="text-gray-700">LTV is the maximum amount you can borrow against your shares. It varies by lender and share type.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">How is interest charged on LAS?</h3>
            <p className="text-gray-700">Interest is charged on borrowed funds at rates defined by lenders. Flexible repayment options may be available.</p>
          </div>
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
