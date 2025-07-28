'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const data = [
  {
    name: 'BAJAJ',
    approvedStocks: '1000+ stocks',
    tenure: '36 Months & Renewal',
    loanRange: '₹25K – ₹1000Cr',
    minRate: '8%',
    maxRate: '15%',
    medianRate: '12%',
    ltvMin: '20%',
    processingFee: '4.72%',
    renewalFee: '1.18%',
    penalCharges: '10.50%',
    firstYearPercent: '16.22%',
    firstYearAmount: '₹16,220',
    secondYearPercent: '12.68%',
    secondYearAmount: '₹12,680'
  },
  {
    name: 'SBI',
    approvedStocks: '1000+ stocks',
    tenure: '12 Months & Renewal',
    loanRange: '₹25K – ₹20L',
    minRate: '11.5%',
    maxRate: '11.5%',
    medianRate: '12%',
    ltvMin: 'N/A',
    processingFee: '0.75%',
    renewalFee: '₹550',
    penalCharges: '13.50%',
    firstYearPercent: '13.50%',
    firstYearAmount: '₹13,500',
    secondYearPercent: '13.05%',
    secondYearAmount: '₹13,050'
  }
];

const fixedFields = [
  'name', 'approvedStocks', 'tenure', 'loanRange',
  'minRate', 'maxRate'
];

const layouts = {
  charges: {
    label: 'Charges View',
    fields: ['processingFee', 'renewalFee', 'penalCharges']
  },
  cost: {
    label: 'Cost View',
    fields: ['firstYearPercent', 'firstYearAmount', 'secondYearPercent']
  }
};

const LASPage = () => {
  const [activeLayout, setActiveLayout] = useState('charges');
  const dynamicFields = layouts[activeLayout].fields;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-slate-100 to-gray-200 text-gray-800">
      <Navbar />

      <div className="flex-1 pt-24 pb-16 px-4 md:px-10 flex justify-center">
        <div className="relative w-full max-w-7xl flex justify-center">
          {/* Left Navigation Button */}
          {Object.entries(layouts).map(([key, val]) => (
            key !== activeLayout && (
              <button
                key={key}
                onClick={() => setActiveLayout(key)}
                className="absolute left-0 top-0 h-full w-12 flex flex-col justify-center items-center rounded-l-3xl border border-gray-300 bg-white shadow-md hover:bg-gray-100 transition-all duration-300 z-10"
              >
                <span className="rotate-[-90deg] text-xs font-semibold whitespace-nowrap text-gray-700">{val.label}</span>
              </button>
            )
          ))}

          {/* Table Container */}
          <div className="flex-1 bg-white border border-gray-300 rounded-3xl shadow-md overflow-hidden w-[95%]">
            <div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-6 border-b border-gray-300 text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{layouts[activeLayout].label}</h2>
              <p className="text-sm text-gray-600">Compare Loan Against Securities</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-100">
                    {[...fixedFields, ...dynamicFields].map((field, index) => (
                      <th key={index} className="px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap text-sm">
                        {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white border-b border-gray-200' : 'bg-gray-50 border-b border-gray-200'}>
                      {[...fixedFields, ...dynamicFields].map((field) => (
                        <td key={field} className="px-4 py-2 whitespace-nowrap text-gray-800 text-sm">
                          {item[field] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-100 p-4 border-t border-gray-300 text-sm text-gray-600 flex justify-between">
              <span>Showing {data.length} institutions</span>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          {/* Right Navigation Button */}
          {activeLayout !== 'cost' && (
            <button
              onClick={() => setActiveLayout('cost')}
              className="absolute right-0 top-0 h-full w-12 flex flex-col justify-center items-center rounded-r-3xl border border-gray-300 bg-white shadow-md hover:bg-gray-100 transition-all duration-300 z-10"
            >
              <span className="rotate-[-90deg] text-xs font-semibold whitespace-nowrap text-gray-700">Cost View</span>
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LASPage;