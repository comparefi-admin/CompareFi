'use client';

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Link from 'next/link';
import { Briefcase, LineChart, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

// ShadCN UI
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Outfit } from 'next/font/google';

// Fonts
import { Instrument_Serif, Outfit, Bebas_Neue } from 'next/font/google';
const instrument = Instrument_Serif({ weight: ['400'], subsets: ['latin'] });
const outfit = Outfit({ weight: ['300', '400', '600'], subsets: ['latin'] });
const bebas = Bebas_Neue({ weight: ['400'], subsets: ['latin'] });

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
      id: 'las',
      name: 'Loan Against Securities (LAS)',
      icon: Briefcase,
      gradient: 'from-emerald-400 to-emerald-600',
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
      gradient: 'from-pink-400 to-pink-600',
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
      gradient: 'from-indigo-400 to-indigo-600',
      description:
        'Amplify your buying power in the market with controlled leverage. Ideal for experienced investors.',
      highlights: [
        'Leverage up to 4x your cash balance',
        'Low interest rates with flexible tenure',
        'Boost portfolio while staying in control',
      ],
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full bg-transparent z-50">
        <Navbar />
      </div>

      <main className="flex-grow pt-28">

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="space-y-6"
          >
            
            <h1 className={`${outfit.className} text-5xl sm:text-6xl md:text-7xl font-bold`}>
              CompareFi Products
            </h1>
            <p className={`${outfit.className} text-lg text-slate-600 max-w-3xl mx-auto`}>
              Liquidity, leverage, or investment flexibility — discover the solution that fits your financial journey best.
            </p>
          </motion.div>
        </section>

        {/* PRODUCT CARDS */}
        <section className="max-w-7xl mx-auto px-4 pb-20 flex flex-wrap justify-center gap-10">
          {products.map(({ id, name, icon: Icon, description, highlights, gradient }, i) => (
            <motion.div
              key={id}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Card
                className={`relative w-80 md:w-96 bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg border overflow-hidden transition-all duration-500
                ${hoveredIndex === i ? 'shadow-2xl scale-[1.03]' : 'scale-100'}`}
              >
                {/* Top Accent Bar */}
                <div className={`h-2 bg-gradient-to-r ${gradient}`} />

                <CardHeader className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} text-white`}>
                      <Icon size={28} />
                    </div>
                    <CardTitle className="text-2xl font-bold">{name}</CardTitle>
                  </div>
                  <CardDescription className="text-base text-slate-600">{description}</CardDescription>
                </CardHeader>

                <CardContent className="px-6 pb-6 space-y-5">
                  <ul className="space-y-2 text-slate-700 text-base">
                    {highlights.map((h, idx) => (
                      <li key={idx}>• {h}</li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link href={`/products/${id}`}>
                      <Button className="w-full sm:w-auto px-5 py-3">Learn More</Button>
                    </Link>
                    <Link href={`/products/${id}#eligibility`}>
                      <Button variant="ghost" className="w-full sm:w-auto px-5 py-3">
                        Check Eligibility
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* CTA SECTION */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-emerald-400 to-indigo-500 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Ready to choose the right product?</h3>
              <p className="text-base sm:text-lg md:text-xl mt-3 max-w-xl mx-auto md:mx-0">
                Check your eligibility in minutes or book a call with Het for tailored advice.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0">
              <Link href="/eligibility">
                <Button className="bg-white text-slate-900 px-8 py-4 text-base sm:text-lg font-semibold">
                  Check Eligibility
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="border-white/30 px-8 py-4 text-base sm:text-lg font-semibold">
                  Book a call
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
}
