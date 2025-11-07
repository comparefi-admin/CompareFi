'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Playfair_Display, Inter, Satisfy } from 'next/font/google';
import { ArrowUpDown } from 'lucide-react';
import { fetchMTF } from "@/lib/fetchData";
import { getNullFill } from "@/lib/nullFill";

// Fonts
const playfair = Playfair_Display({ weight: ['400','700'], subsets: ['latin'] });
const inter = Inter({ weight: ['300','400','600'], subsets: ['latin'] });
const satisfy = Satisfy({ weight: ['400'], subsets: ['latin'] });


export default function LASPage() {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //Table Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mtf = await fetchMTF();
        setData(mtf || []);
      } catch (error) {
        console.error("❌ Supabase fetch error:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;

    const clean = (val) => {
      if (typeof val === 'string') {
        return parseFloat(val.replace(/[₹,%]/g, '')) || val;
      }
      return val;
    };

    let valA = clean(a[sortField]);
    let valB = clean(b[sortField]);

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
    return sortOrder === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const renderHeader = (headers) => (
    <tr className="bg-gray-100/80 text-gray-700">
      {headers.map((h) => (
        <th
          key={h.key}
          className="px-4 py-3 font-semibold select-none"
        >
          <div className="flex items-center gap-1">
            {h.label}
            <button
              onClick={() => handleSort(h.key)}
              className="inline-flex items-center text-gray-500 hover:text-gray-800"
            >
              <ArrowUpDown size={14} />
            </button>
            {sortField === h.key && (
              <span className="text-xs">{sortOrder === 'asc' ? '▲' : '▼'}</span>
            )}
          </div>
        </th>
      ))}
    </tr>
  );

  if (loading)
  return (
    <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
      Loading data...
    </div>
  );


  return (
    <div className="relative bg-gradient-to-b from-[#fdfdfd] via-[#f8f9fa] to-[#f0f2f5] min-h-screen text-gray-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/textures/grain.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-40 left-10 w-96 h-96 bg-pink-300/30 rounded-full blur-[160px]"></div>
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#0ABAB5]/25 rounded-full blur-[160px]"></div>
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#C3B1E1]/30 rounded-full blur-[140px]"></div>

      {/* Navbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-screen-xl px-4 pt-4">
        <Navbar />
      </div>

      <main className="pt-28 space-y-20">

      {/* SECTION 1: KEY HIGHLIGHTS */}
      <section
        className="glass-card mx-4 p-10 rounded-3xl shadow-xl neon-border opacity-0 animate-fadeInUp"
        style={{ animationDelay: '0.1s' }}
      >
        <p className={`${satisfy.className} text-xl text-[#FF6F91] text-center mb-2`}>
          Snapshot of what brokers offer
        </p>
        <h2 className={`${playfair.className} text-3xl font-bold text-center mb-8 shimmer-text`}>
          Key Highlights
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
            <thead>
              {renderHeader([
                { key: 'broker_name', label: 'Broker' },
                { key: 'approved_stocks', label: 'Approved Stocks' },
                { key: 'margin_requirement', label: 'Margin Requirement (%)' },
                { key: 'subscription_fee', label: 'Subscription Fee (₹)' },
                { key: 'interest_slabs', label: 'Interest Slabs (Loan → ROI%)' },
              ])}
            </thead>
            <tbody>
              {sortedData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition hover:bg-[#0ABAB5]/10 ${
                    idx % 2 === 0 ? 'bg-white/70' : 'bg-gray-50/60'
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {row.broker_name ||
                      getNullFill("mtf", row.broker_name, "broker_name")}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {row.approved_stocks ?? getNullFill("mtf", row.broker_name, "approved_stocks")}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {row.margin_requirement != null
                      ? `${row.margin_requirement}%`
                      : getNullFill("mtf", row.broker_name, "margin_requirement")}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {row.subscription_fee != null
                      ? `₹${row.subscription_fee}`
                      : getNullFill("mtf", row.broker_name, "subscription_fee")}
                  </td>
                  <td className="px-4 py-3 text-gray-800">
                    {row.interest_slabs && typeof row.interest_slabs === "object"
                      ? Object.entries(row.interest_slabs).map(([range, rate], i) => (
                          <div key={i}>
                            {range}: {rate}
                          </div>
                        ))
                      : getNullFill("mtf", row.broker_name, "interest_slabs")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: COST & RETURNS */}
      <section
        className="glass-card mx-4 p-10 rounded-3xl shadow-xl neon-border opacity-0 animate-fadeInUp"
        style={{ animationDelay: '0.3s' }}
      >
        <p className={`${satisfy.className} text-xl text-[#0ABAB5] text-center mb-2`}>
          Understand all MTF costs and effective ROI
        </p>
        <h2 className={`${playfair.className} text-3xl font-bold text-center mb-8 shimmer-text`}>
          Cost & Returns
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
            <thead>
              {renderHeader([
                { key: 'broker_name', label: 'Broker' },
                { key: 'pledge_unpledge_fee', label: 'Pledge / Unpledge Fee (₹)' },
                { key: 'auto_square_off', label: 'Auto Square-off (₹)' },
                { key: 'dp_charges', label: 'DP Charges (₹)' },
                { key: 'unpaid_mtf_interest', label: 'Unpaid MTF Interest (%)' },
                { key: 'cost_summary', label: 'Cost Summary' },
              ])}
            </thead>
            <tbody>
              {sortedData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition hover:bg-[#FF6F91]/10 ${
                    idx % 2 === 0 ? 'bg-white/70' : 'bg-gray-50/60'
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {row.broker_name || getNullFill("mtf", row.broker_name, "broker_name")}
                  </td>
                  <td className="px-4 py-3">{row.pledge_unpledge_fee ?? getNullFill("mtf", row.broker_name, "pledge_unpledge_fee")}</td>
                  <td className="px-4 py-3">{row.auto_square_off ?? getNullFill("mtf", row.broker_name, "auto_square_off")}</td>
                  <td className="px-4 py-3">{row.dp_charges ?? getNullFill("mtf", row.broker_name, "dp_charges")}</td>
                  <td className="px-4 py-3">{row.unpaid_mtf_interest != null ? `${row.unpaid_mtf_interest}%` : getNullFill("mtf", row.broker_name, "unpaid_mtf_interest")}</td>
                  <td className="px-4 py-3">
                    {row.cost_summary && typeof row.cost_summary === "object"
                      ? Object.entries(row.cost_summary).map(([k, v], i) => (
                          <div key={i}>
                            {k}: {v ?? "—"}
                          </div>
                        ))
                      : getNullFill("mtf", row.broker_name, "cost_summary")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>


      {/* SECTION 3: OPERATIONAL FACTORS */}
      <section
        className="glass-card mx-4 p-10 rounded-3xl shadow-xl neon-border opacity-0 animate-fadeInUp"
        style={{ animationDelay: '0.5s' }}
      >
        <p className={`${satisfy.className} text-xl text-[#C3B1E1] text-center mb-2`}>
          Broker platform quality & user feedback
        </p>
        <h2 className={`${playfair.className} text-3xl font-bold text-center mb-8 shimmer-text`}>
          Operational & Experience Factors
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
            <thead>
              {renderHeader([
                { key: 'broker_name', label: 'Broker' },
                { key: 'intraday_fee', label: 'Intraday Fee' },
                { key: 'carry_fee', label: 'Carry Fee' },
                { key: 'platform_rating', label: 'Platform Rating' },
                { key: 'feedback_rating', label: 'User Feedback Rating' },
              ])}
            </thead>
            <tbody>
              {sortedData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition hover:bg-[#C3B1E1]/10 ${
                    idx % 2 === 0 ? 'bg-white/70' : 'bg-gray-50/60'
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {row.broker_name || getNullFill("mtf", row.broker_name, "broker_name")}
                  </td>
                  <td className="px-4 py-3">{row.intraday_fee || getNullFill("mtf", row.broker_name, "intraday_fee")}</td>
                  <td className="px-4 py-3">{row.carry_fee || getNullFill("mtf", row.broker_name, "carry_fee")}</td>
                  <td className="px-4 py-3 text-[#FF6F91] font-medium">
                    {row.platform_rating != null ? row.platform_rating.toFixed(1) : getNullFill("mtf", row.broker_name, "platform_rating")}
                  </td>
                  <td className="px-4 py-3 text-[#FF6F91] font-medium">
                    {row.feedback_rating != null ? row.feedback_rating.toFixed(1) : getNullFill("mtf", row.broker_name, "feedback_rating")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
        <Footer />
      </main>

      {/* Fade-in animation */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 1s ease forwards; }
      `}</style>
    </div>
  );
}
