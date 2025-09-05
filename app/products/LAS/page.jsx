"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ArrowUpDown } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";

export default function LASPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortFieldFunding, setSortFieldFunding] = useState(null);
  const [sortOrderFunding, setSortOrderFunding] = useState("asc");
  const [sortFieldCost, setSortFieldCost] = useState(null);
  const [sortOrderCost, setSortOrderCost] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "LAS"));
        const firebaseData = querySnapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            name: d["Financial Institution"] ?? "—",

            // Funding related
            approvedShares:
              d["Approved List of Shares"] ??
              d["Approved List of MF"] ??
              d["Approved Shares"] ??
              d["Approved Stocks"] ??
              "—",
            tenure: d["Tenure"] ?? "—",
            minMaxLoanDebt: d["Debt MF Min and Max Loan"] ?? "—",
            minMaxLoanEquity: d["Equity MF Min and Max Loan"] ?? "—",
            marginPeriod:
              d["Regularization period / Margin Call Period"] ?? "—",
            ltvMin: d["LTV - Funding"]?.Min ?? "—",
            ltvMax: d["LTV - Funding"]?.Max ?? "—",

            // Major cost
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
    } else if (section === "cost") {
      if (sortFieldCost === field) {
        setSortOrderCost(sortOrderCost === "asc" ? "desc" : "asc");
      } else {
        setSortFieldCost(field);
        setSortOrderCost("asc");
      }
    }
  };

  const sortedFundingData = [...data].sort((a, b) => {
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

  const sortedCostData = [...data].sort((a, b) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Loading data from Firebase...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-teal-50 min-h-screen text-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Funding Related Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <p className="text-pink-600 italic text-center text-sm">
            Snapshot of what lenders offer
          </p>
          <h2 className="text-3xl font-bold text-center mb-8">
            Funding Related Details
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  {[
                    { key: "name", label: "Institution" },
                    { key: "approvedShares", label: "Approved Shares" },
                    { key: "tenure", label: "Tenure" },
                    { key: "marginPeriod", label: "Margin Period" },
                    { key: "ltvMin", label: "LTV Min" },
                    { key: "ltvMax", label: "LTV Max" },
                  ].map((h) => (
                    <th
                      key={h.key}
                      className="px-4 py-3 border-b text-sm font-semibold"
                    >
                      <div className="flex items-center gap-1">
                        {h.label}
                        <button
                          onClick={() => handleSort(h.key, "funding")}
                          className="text-gray-500 hover:text-gray-800"
                        >
                          <ArrowUpDown size={14} />
                        </button>
                        {sortFieldFunding === h.key && (
                          <span className="text-xs">
                            {sortOrderFunding === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedFundingData.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                    }`}
                  >
                    <td className="px-4 py-3 border-b">{row.name}</td>
                    <td className="px-4 py-3 border-b">{row.approvedShares}</td>
                    <td className="px-4 py-3 border-b">{row.tenure}</td>
                    <td className="px-4 py-3 border-b">{row.marginPeriod}</td>
                    <td className="px-4 py-2 border-b">{row.ltvMin}</td>
                    <td className="px-4 py-2 border-b">{row.ltvMax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Major Cost Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <p className="text-teal-600 italic text-center text-sm">
            Understand the true cost of borrowing
          </p>
          <h2 className="text-3xl font-bold text-center mb-8">Major Cost</h2>
          <div className="overflow-x-auto">
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
                    <th
                      key={h.key}
                      className="px-4 py-3 border-b text-sm font-semibold"
                    >
                      <div className="flex items-center gap-1">
                        {h.label}
                        <button
                          onClick={() => handleSort(h.key, "cost")}
                          className="text-gray-500 hover:text-gray-800"
                        >
                          <ArrowUpDown size={14} />
                        </button>
                        {sortFieldCost === h.key && (
                          <span className="text-xs">
                            {sortOrderCost === "asc" ? "▲" : "▼"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedCostData.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-gray-50 ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                    }`}
                  >
                    <td className="px-4 py-3 border-b">{row.name}</td>
                    <td className="px-4 py-3 border-b text-teal-600 font-medium">
                      {row.minRate}
                    </td>
                    <td className="px-4 py-3 border-b text-pink-600 font-medium">
                      {row.maxRate}
                    </td>
                    <td className="px-4 py-3 border-b">{row.medianRate}</td>
                    <td className="px-4 py-3 border-b">{row.processingFee}</td>
                    <td className="px-4 py-3 border-b">
                      {row.prepaymentCharges}
                    </td>
                    <td className="px-4 py-3 border-b">{row.renewalFee}</td>
                    <td className="px-4 py-3 border-b">{row.penalCharges}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
