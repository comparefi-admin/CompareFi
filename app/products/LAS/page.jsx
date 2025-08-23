'use client';

import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ weight: ['400','700'], subsets: ['latin'] });
const inter = Inter({ weight: ['300','400','600'], subsets: ['latin'] });

// import your sample data (same as you already have)
import { data } from './data';

export default function LASPage() {
  return (
    <div className="relative bg-gradient-to-b from-[#fdfdfd] via-[#f8f9fa] to-[#f0f2f5] min-h-screen text-gray-900">
      {/* Background grain + pastel blobs */}
      <div className="absolute inset-0 bg-[url('/textures/grain.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-40 left-10 w-80 h-80 bg-pink-300/30 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/30 rounded-full blur-[160px]"></div>

      {/* Navbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-screen-xl px-4 pt-4">
        <Navbar />
      </div>

      <main className="pt-28 space-y-20">
        
        {/* SECTION 1: KEY HIGHLIGHTS */}
        <section className="glass-card mx-4 p-10 rounded-3xl shadow-xl neon-border">
          <h2 className={`${playfair.className} text-3xl font-bold text-center mb-8 shimmer-text`}>
            Key Highlights
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/70 text-gray-700">
                  {['Institution','Approved Stocks','Tenure','Loan Range','Min Rate'].map((h,i)=>(
                    <th key={i} className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx)=>(
                  <tr key={idx} className={idx%2===0 ? 'bg-white/60' : 'bg-gray-50/60'}>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.approvedStocks}</td>
                    <td className="px-4 py-3">{item.tenure}</td>
                    <td className="px-4 py-3">{item.loanRange}</td>
                    <td className="px-4 py-3">{item.minRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: COST & RETURNS */}
        <section className="glass-card mx-4 p-10 rounded-3xl shadow-xl neon-border">
          <h2 className={`${playfair.className} text-3xl font-bold text-center mb-12 shimmer-text`}>
            Cost & Returns
          </h2>
          <div className="space-y-8">
            {data.map((item, idx)=>(
              <div key={idx} className="p-6 rounded-2xl bg-white/40 backdrop-blur-md border border-white/30 shadow-md hover:shadow-xl transition-all">
                <h3 className={`${inter.className} text-xl font-semibold mb-4 text-gray-800`}>{item.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700 text-sm">
                  <p><span className="font-semibold">Max Rate:</span> {item.maxRate}</p>
                  <p><span className="font-semibold">Median Rate:</span> {item.medianRate}</p>
                  <p><span className="font-semibold">Processing Fee:</span> {item.processingFee}</p>
                  <p><span className="font-semibold">Renewal Fee:</span> {item.renewalFee}</p>
                  <p><span className="font-semibold">Penal Charges:</span> {item.penalCharges}</p>
                  <p><span className="font-semibold">1st Year Cost:</span> {item.firstYearPercent} ({item.firstYearAmount})</p>
                  <p><span className="font-semibold">2nd Year Cost:</span> {item.secondYearPercent} ({item.secondYearAmount})</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: OPERATIONAL FACTORS */}
        <section className="glass-card mx-4 p-10 rounded-3xl shadow-xl neon-border">
          <h2 className={`${playfair.className} text-3xl font-bold text-center mb-12 shimmer-text`}>
            Operational & Experience Factors
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item, idx)=>(
              <div key={idx} className="p-6 rounded-2xl bg-white/50 backdrop-blur-md border border-white/30 shadow-md hover:scale-105 transition-all flex flex-col items-center text-center">
                <h3 className={`${inter.className} text-lg font-semibold text-gray-800 mb-2`}>{item.name}</h3>
                <p className="text-gray-600 text-sm">LTV Min: {item.ltvMin || '—'}</p>
                <p className="text-gray-600 text-sm">Turnaround: {item.turnaround}</p>
                <p className="text-gray-600 text-sm">Digital: {item.digitalProcess}</p>
                <p className="text-[#FF6F91] font-semibold">Rating: {item.rating}</p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
