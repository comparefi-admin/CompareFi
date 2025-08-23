'use client';

import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Playfair_Display, Inter, Satisfy } from 'next/font/google';
import { ArrowUpDown } from 'lucide-react';

// Fonts
const playfair = Playfair_Display({ weight: ['400','700'], subsets: ['latin'] });
const inter = Inter({ weight: ['300','400','600'], subsets: ['latin'] });
const satisfy = Satisfy({ weight: ['400'], subsets: ['latin'] });

// Sample Data
import { data } from './data';

export default function LASPage() {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

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
        <section className="glass-card mx-4 p-10 rounded-3xl shadow-xl neon-border opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <p className={`${satisfy.className} text-xl text-[#FF6F91] text-center mb-2`}>Snapshot of what lenders offer</p>
          <h2 className={`${playfair.className} text-3xl font-bold text-center mb-8 shimmer-text`}>
            Key Highlights
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
              <thead>
                {renderHeader([
                  { key: 'name', label: 'Institution' },
                  { key: 'approvedStocks', label: 'Approved Stocks' },
                  { key: 'tenure', label: 'Tenure' },
                  { key: 'loanRange', label: 'Loan Range' },
                  { key: 'minRate', label: 'Min Rate' },
                ])}
              </thead>
              <tbody>
                {sortedData.map((item, idx) => (
                  <tr key={idx} className={`transition hover:bg-[#0ABAB5]/10 ${idx % 2 === 0 ? 'bg-white/70' : 'bg-gray-50/60'}`}>
                    <td className="px-4 py-3 font-semibold text-gray-800">{item.name}</td>
                    <td className="px-4 py-3">{item.approvedStocks}</td>
                    <td className="px-4 py-3">{item.tenure}</td>
                    <td className="px-4 py-3">{item.loanRange}</td>
                    <td className="px-4 py-3 text-[#0ABAB5] font-medium">{item.minRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: COST & RETURNS */}
        <section className="glass-card mx-4 p-10 rounded-3xl shadow-xl neon-border opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <p className={`${satisfy.className} text-xl text-[#0ABAB5] text-center mb-2`}>Understand the true cost of borrowing</p>
          <h2 className={`${playfair.className} text-3xl font-bold text-center mb-8 shimmer-text`}>
            Cost & Returns
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
              <thead>
                {renderHeader([
                  { key: 'name', label: 'Institution' },
                  { key: 'maxRate', label: 'Max Rate' },
                  { key: 'medianRate', label: 'Median Rate' },
                  { key: 'processingFee', label: 'Processing Fee' },
                  { key: 'renewalFee', label: 'Renewal Fee' },
                  { key: 'penalCharges', label: 'Penal Charges' },
                  { key: 'firstYearPercent', label: '1st Year Cost' },
                  { key: 'secondYearPercent', label: '2nd Year Cost' },
                ])}
              </thead>
              <tbody>
                {sortedData.map((item, idx) => (
                  <tr key={idx} className={`transition hover:bg-[#FF6F91]/10 ${idx % 2 === 0 ? 'bg-white/70' : 'bg-gray-50/60'}`}>
                    <td className="px-4 py-3 font-semibold text-gray-800">{item.name}</td>
                    <td className="px-4 py-3">{item.maxRate}</td>
                    <td className="px-4 py-3">{item.medianRate}</td>
                    <td className="px-4 py-3">{item.processingFee}</td>
                    <td className="px-4 py-3">{item.renewalFee}</td>
                    <td className="px-4 py-3">{item.penalCharges}</td>
                    <td className="px-4 py-3">{item.firstYearPercent} ({item.firstYearAmount})</td>
                    <td className="px-4 py-3">{item.secondYearPercent} ({item.secondYearAmount})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: OPERATIONAL FACTORS */}
        <section className="glass-card mx-4 p-10 rounded-3xl shadow-xl neon-border opacity-0 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <p className={`${satisfy.className} text-xl text-[#C3B1E1] text-center mb-2`}>Your experience matters as much as the numbers</p>
          <h2 className={`${playfair.className} text-3xl font-bold text-center mb-8 shimmer-text`}>
            Operational & Experience Factors
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
              <thead>
                {renderHeader([
                  { key: 'name', label: 'Institution' },
                  { key: 'ltvMin', label: 'LTV Min' },
                  { key: 'turnaround', label: 'Turnaround' },
                  { key: 'digitalProcess', label: 'Digital Process' },
                  { key: 'rating', label: 'Rating' },
                ])}
              </thead>
              <tbody>
                {sortedData.map((item, idx) => (
                  <tr key={idx} className={`transition hover:bg-[#C3B1E1]/10 ${idx % 2 === 0 ? 'bg-white/70' : 'bg-gray-50/60'}`}>
                    <td className="px-4 py-3 font-semibold text-gray-800">{item.name}</td>
                    <td className="px-4 py-3">{item.ltvMin || '—'}</td>
                    <td className="px-4 py-3">{item.turnaround}</td>
                    <td className="px-4 py-3">{item.digitalProcess}</td>
                    <td className="px-4 py-3 text-[#FF6F91] font-medium">{item.rating}</td>
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
