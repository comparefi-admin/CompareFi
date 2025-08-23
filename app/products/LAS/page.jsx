'use client';

import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Playfair_Display, Inter, Satisfy } from 'next/font/google';

// Fonts
const playfair = Playfair_Display({ weight: ['400','700'], subsets: ['latin'] });
const inter = Inter({ weight: ['300','400','600'], subsets: ['latin'] });
const satisfy = Satisfy({ weight: ['400'], subsets: ['latin'] });

// Sample Data
import { data } from './data';

export default function LASPage() {
  return (
    <div className="relative bg-gradient-to-b from-[#fdfdfd] via-[#f8f9fa] to-[#f0f2f5] min-h-screen text-gray-900 overflow-hidden">
      
      {/* Background grain + pastel blobs */}
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
                <tr className="bg-gray-100/80 text-gray-700">
                  {['Institution','Approved Stocks','Tenure','Loan Range','Min Rate'].map((h,i)=>(
                    <th key={i} className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx)=>(
                  <tr key={idx} className={`transition hover:bg-[#0ABAB5]/10 ${idx%2===0 ? 'bg-white/70' : 'bg-gray-50/60'}`}>
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
                <tr className="bg-gray-100/80 text-gray-700">
                  {['Institution','Max Rate','Median Rate','Processing Fee','Renewal Fee','Penal Charges','1st Year Cost','2nd Year Cost'].map((h,i)=>(
                    <th key={i} className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx)=>(
                  <tr key={idx} className={`transition hover:bg-[#FF6F91]/10 ${idx%2===0 ? 'bg-white/70' : 'bg-gray-50/60'}`}>
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
                <tr className="bg-gray-100/80 text-gray-700">
                  {['Institution','LTV Min','Turnaround','Digital Process','Rating'].map((h,i)=>(
                    <th key={i} className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx)=>(
                  <tr key={idx} className={`transition hover:bg-[#C3B1E1]/10 ${idx%2===0 ? 'bg-white/70' : 'bg-gray-50/60'}`}>
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
