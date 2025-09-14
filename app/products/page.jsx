'use client';

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Link from 'next/link';
import { Briefcase, LineChart, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import '../components/hero.css';
import '../components/HeroSection.css';

// Fonts
import { Instrument_Serif, Outfit, Bebas_Neue } from 'next/font/google';
const instrument = Instrument_Serif({ weight: ['400'], subsets: ['latin'] });
const outfit = Outfit({ weight: ['300', '400', '600'], subsets: ['latin'] });
const bebas = Bebas_Neue({ weight: ['400'], subsets: ['latin'] });

// Motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay },
  }),
};

export default function ProductPage() {
  const products = [
    {
      id: 'LAS',
      name: 'Loan Against Securities (LAS)',
      icon: Briefcase,
      color: '#00E5A8',
      description:
        'Leverage your securities portfolio without selling. Instant liquidity while your investments grow.',
      highlights: [
        'Borrow up to 70% of your securities value',
        'Keep your portfolio intact',
        'Flexible repayment options',
      ],
    },
    {
      id: 'lamf',
      name: 'Loan Against Mutual Funds (LAMF)',
      icon: LineChart,
      color: '#FF4D8D',
      description:
        'Quick loans using mutual funds as collateral. Access funds instantly without disturbing long-term goals.',
      highlights: [
        'Minimal documentation & instant approval',
        'Funds linked to your mutual fund portfolio',
        'Stay invested while accessing liquidity',
      ],
    },
    {
      id: 'mtf',
      name: 'Margin Trading Facility (MTF)',
      icon: BarChart3,
      color: '#6C63FF',
      description:
        'Amplify your buying power in the market with controlled leverage. Ideal for experienced investors.',
      highlights: [
        'Leverage up to 4x your cash balance',
        'Low interest rates with flexible tenure',
        'Boost portfolio while staying in control',
      ],
    },
  ];

  // Track hover state per card
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="relative bg-gradient-to-b from-[#fcfcff] via-[#ffffff] to-[#e6ebfa] min-h-screen text-gray-900 overflow-hidden">
      {/* Grain overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/textures/grain.png')] opacity-[0.08] mix-blend-overlay"></div>

      {/* Floating blooms */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#6C63FF]/30 rounded-full blur-[160px]"></div>
      <div className="absolute -top-80 -right-10 w-96 h-96 bg-[#FF4D8D]/30 rounded-full blur-[160px]"></div>
      <div className="absolute bottom-[25%] right-[5%] w-[24rem] h-[24rem] bg-[#00E5A8]/30 rounded-full blur-[160px]"></div>

      {/* Navbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
        <Navbar />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center relative z-10">
        <motion.div className="max-w-4xl mx-auto space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.p className={`${bebas.className} text-2xl text-[#FF4D8D]`} variants={fadeUp} custom={0.2}>
            Empowering Your Financial Decisions
          </motion.p>
          <motion.h1 className={`${instrument.className} text-4xl md:text-6xl font-bold text-gray-900`} variants={fadeUp} custom={0.5}>
            Discover CompareFi <span className="text-[#00E5A8]">Products</span>
          </motion.h1>
          <motion.p className={`${outfit.className} text-lg text-gray-700`} variants={fadeUp} custom={0.8}>
            Liquidity, leverage, or investment flexibility — we have the right solution for your financial journey.
          </motion.p>
        </motion.div>
      </section>

      {/* Creative Product Layout */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32 flex flex-col md:flex-row md:space-x-12 space-y-12 md:space-y-0 items-center justify-center">
        {products.map(({ id, name, icon: Icon, description, color, highlights }, i) => (
          <motion.div
            key={id}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl p-8 flex flex-col items-start gap-6 transition-all duration-500 overflow-hidden border border-transparent hover:border-white/30`}
            style={{
              transform: hoveredIndex === i ? 'translateY(-10px) rotate(-1deg)' : `translateY(0) rotate(${i % 2 === 0 ? '-2deg' : '2deg'})`,
              zIndex: hoveredIndex === i ? 10 : 1,
            }}
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut", delay: i * 0.2 } }}
          >
            {/* Mini Bloom */}
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full" style={{ background: `radial-gradient(circle, ${color}50, ${color}10)` }}></div>

            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
              style={{ background: `linear-gradient(135deg, ${color}60, ${color}20)` }}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>

            {/* Title */}
            <h3 className={`${instrument.className} text-2xl font-bold text-gray-900`}>{name}</h3>

            {/* Description */}
            <p className={`${outfit.className} text-gray-700 leading-relaxed`}>{description}</p>

            {/* CTA */}
            <Link
              href={`/products/${id}`}
              className="animated-button px-6 py-2 rounded-lg text-base font-semibold mt-auto"
            >
              Explore {name.split('(')[0].trim()}
            </Link>

            {/* Expandable Highlights (isolated per card) */}
            <motion.div
              className={`overflow-hidden transition-all duration-700 ease-out w-full`}
              animate={{ maxHeight: hoveredIndex === i ? 200 : 0 }}
            >
              <div className="mt-4 pt-4 border-t border-gray-200 text-gray-600 text-sm leading-relaxed space-y-1">
                {highlights.map((h, idx) => (
                  <p key={idx}>💡 {h}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
