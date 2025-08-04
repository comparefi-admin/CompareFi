'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

// 🔹 Sample Data
const data = [
  {
    name: 'BAJAJ',
    approvedStocks: '1000+',
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
    secondYearAmount: '₹12,680',
    turnaround: '24hrs',
    digitalProcess: 'Yes',
    rating: '4.5/5',
  },
  {
    name: 'SBI',
    approvedStocks: '1000+',
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
    secondYearAmount: '₹13,050',
    turnaround: '48hrs',
    digitalProcess: 'Partial',
    rating: '4.2/5',
  },
  {
    name: 'HDFC Securities',
    approvedStocks: '950+',
    tenure: '24 Months',
    loanRange: '₹50K – ₹50Cr',
    minRate: '9%',
    maxRate: '13%',
    medianRate: '11%',
    ltvMin: '25%',
    processingFee: '2%',
    renewalFee: '₹999',
    penalCharges: '12%',
    firstYearPercent: '12.5%',
    firstYearAmount: '₹12,500',
    secondYearPercent: '11.2%',
    secondYearAmount: '₹11,200',
    turnaround: '36hrs',
    digitalProcess: 'Yes',
    rating: '4.3/5',
  },
  {
    name: 'ICICI Direct',
    approvedStocks: '900+',
    tenure: '18 Months',
    loanRange: '₹1L – ₹25Cr',
    minRate: '9.5%',
    maxRate: '14%',
    medianRate: '11.8%',
    ltvMin: '22%',
    processingFee: '1.5%',
    renewalFee: '₹850',
    penalCharges: '12.75%',
    firstYearPercent: '12.9%',
    firstYearAmount: '₹12,900',
    secondYearPercent: '11.6%',
    secondYearAmount: '₹11,600',
    turnaround: '24hrs',
    digitalProcess: 'Yes',
    rating: '4.4/5',
  },
  {
    name: 'Kotak Securities',
    approvedStocks: '850+',
    tenure: '24 Months',
    loanRange: '₹50K – ₹15Cr',
    minRate: '10%',
    maxRate: '14%',
    medianRate: '12%',
    ltvMin: '20%',
    processingFee: '2.25%',
    renewalFee: '₹750',
    penalCharges: '13%',
    firstYearPercent: '13.2%',
    firstYearAmount: '₹13,200',
    secondYearPercent: '12%',
    secondYearAmount: '₹12,000',
    turnaround: '30hrs',
    digitalProcess: 'Partial',
    rating: '4.1/5',
  },
  {
    name: 'Axis Bank',
    approvedStocks: '920+',
    tenure: '12 Months',
    loanRange: '₹1L – ₹10Cr',
    minRate: '9%',
    maxRate: '13.5%',
    medianRate: '11.2%',
    ltvMin: '23%',
    processingFee: '1.2%',
    renewalFee: '₹600',
    penalCharges: '12.25%',
    firstYearPercent: '12.8%',
    firstYearAmount: '₹12,800',
    secondYearPercent: '11.4%',
    secondYearAmount: '₹11,400',
    turnaround: '48hrs',
    digitalProcess: 'Yes',
    rating: '4.0/5',
  },
  {
    name: 'Motilal Oswal',
    approvedStocks: '800+',
    tenure: '24 Months',
    loanRange: '₹75K – ₹30Cr',
    minRate: '10.2%',
    maxRate: '14.5%',
    medianRate: '12.3%',
    ltvMin: '21%',
    processingFee: '1.8%',
    renewalFee: '₹900',
    penalCharges: '13.25%',
    firstYearPercent: '13.7%',
    firstYearAmount: '₹13,700',
    secondYearPercent: '12.2%',
    secondYearAmount: '₹12,200',
    turnaround: '72hrs',
    digitalProcess: 'Partial',
    rating: '4.0/5',
  },
  {
    name: 'Reliance Securities',
    approvedStocks: '780+',
    tenure: '18 Months',
    loanRange: '₹50K – ₹8Cr',
    minRate: '11%',
    maxRate: '15%',
    medianRate: '13%',
    ltvMin: '19%',
    processingFee: '2.5%',
    renewalFee: '₹700',
    penalCharges: '13.75%',
    firstYearPercent: '14%',
    firstYearAmount: '₹14,000',
    secondYearPercent: '12.8%',
    secondYearAmount: '₹12,800',
    turnaround: '96hrs',
    digitalProcess: 'No',
    rating: '3.8/5',
  },
  {
    name: 'Yes Bank',
    approvedStocks: '820+',
    tenure: '12 Months',
    loanRange: '₹1L – ₹12Cr',
    minRate: '9.8%',
    maxRate: '13.8%',
    medianRate: '12%',
    ltvMin: '20%',
    processingFee: '1.4%',
    renewalFee: '₹650',
    penalCharges: '12.6%',
    firstYearPercent: '13%',
    firstYearAmount: '₹13,000',
    secondYearPercent: '11.7%',
    secondYearAmount: '₹11,700',
    turnaround: '36hrs',
    digitalProcess: 'Yes',
    rating: '4.1/5',
  },
  {
    name: 'Edelweiss',
    approvedStocks: '700+',
    tenure: '24 Months',
    loanRange: '₹50K – ₹7Cr',
    minRate: '10.5%',
    maxRate: '14%',
    medianRate: '12.5%',
    ltvMin: '18%',
    processingFee: '2%',
    renewalFee: '₹500',
    penalCharges: '13%',
    firstYearPercent: '13.8%',
    firstYearAmount: '₹13,800',
    secondYearPercent: '12.4%',
    secondYearAmount: '₹12,400',
    turnaround: '72hrs',
    digitalProcess: 'Partial',
    rating: '3.9/5',
  },
];


// 🔹 Fixed Fields
const fixedFields = ['name', 'approvedStocks', 'tenure', 'loanRange'];

// 🔹 Layout Configs
const layouts = {
  default: {
    label: 'Default Layout',
    fields: ['minRate', 'maxRate', 'medianRate'],
    position: 'left', // left side
  },
  cost: {
    label: 'Cost Focused Layout',
    fields: ['firstYearPercent', 'firstYearAmount', 'secondYearPercent'],
    position: 'right', // right side
  },
  performance: {
    label: 'Performative Layout',
    fields: ['turnaround', 'digitalProcess', 'rating'],
    position: 'right', // right side
  },
};

export default function LASPage() {
  const [activeLayout, setActiveLayout] = useState('default');
  const dynamicFields = layouts[activeLayout].fields;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-slate-100 to-gray-200 text-gray-800 ">
      <Navbar />

      <div className="flex-1 pt-28 pb-16 px-4 md:px-10 flex justify-center w-full">
        <div className="relative w-full max-w-7xl flex justify-center">

          {/* 🔹 Left Vertical Toggle (Default Layout) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
            <button
              onClick={() => setActiveLayout('default')}
              className={`px-4 py-2 text-xs font-semibold rounded-r-lg shadow-md transition-all duration-300 [writing-mode:vertical-lr]
              ${activeLayout === 'default' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
            >
              {layouts.default.label}
            </button>
          </div>

          {/* 🔹 Right Vertical Toggles (Cost + Performance) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
            {['cost', 'performance'].map((key) => (
              <button
                key={key}
                onClick={() => setActiveLayout(key)}
                className={`px-4 py-2 text-xs font-semibold rounded-l-lg shadow-md transition-all duration-300 [writing-mode:vertical-lr]
                ${activeLayout === key ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-100'}`}
              >
                {layouts[key].label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="flex-1 bg-white border border-gray-300 rounded-3xl shadow-lg overflow-hidden w-[95%]">
            <motion.div
              key={activeLayout}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-6 border-b border-gray-300 text-center">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {layouts[activeLayout].label}
                </h2>
                <p className="text-sm text-gray-600">
                  Compare Loan Against Securities
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="border-b border-gray-300 bg-gray-100">
                      {[...fixedFields, ...dynamicFields].map((field, index) => (
                        <th
                          key={index}
                          className="px-4 py-2 text-left text-gray-700 font-semibold whitespace-nowrap text-sm"
                        >
                          {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white border-b border-gray-200' : 'bg-gray-50 border-b border-gray-200'}
                      >
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
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
