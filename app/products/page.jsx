'use client';

import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Link from 'next/link';
import { Briefcase, LineChart, BarChart3 } from 'lucide-react';

import '../components/hero.css';
import '../components/HeroSection.css';
// Fonts
import { Playfair_Display, Inter, Satisfy } from 'next/font/google';
const playfair = Playfair_Display({ weight: ['400', '700'], subsets: ['latin'] });
const inter = Inter({ weight: ['300', '400', '600'], subsets: ['latin'] });
const satisfy = Satisfy({ weight: ['400'], subsets: ['latin'] });

export default function ProductPage() {
  const products = [
    {
      id: 'LAS',
      name: 'Loan Against Securities (LAS)',
      icon: Briefcase,
      description:
        'Leverage your existing securities portfolio to access funds without liquidating your assets. Suitable for short-term liquidity needs while preserving your investment strategy.',
    },
    {
      id: 'lamf',
      name: 'Loan Against Mutual Funds (LAMF)',
      icon: LineChart,
      description:
        'Access quick loans using your mutual fund investments as collateral. Ideal for emergencies or planned expenditures without disturbing your long-term goals.',
    },
    {
      id: 'mtf',
      name: 'Margin Trading Facility (MTF)',
      icon: BarChart3,
      description:
        'Enhance your purchasing power in the stock market with our Margin Trading Facility. Suitable for experienced investors seeking leverage opportunities.',
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-[#fdfdfd] via-[#f8f9fa] to-[#f0f2f5] min-h-screen text-gray-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/textures/grain.png')] opacity-[0.08] mix-blend-overlay"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-300/40 rounded-full blur-[160px]"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0ABAB5]/30 rounded-full blur-[160px]"></div>

      {/* Navbar */}
      {/* Navbar — consistent with homepage */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
        <Navbar />
      </div>


      {/* Hero Section */}
      <section id="products" className="pt-32 pb-16 px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <p className={`${satisfy.className} text-2xl text-[#FF6F91] animate-fadeInUp`}>
            Your money, your choice.
          </p>
          <h1
            className={`${playfair.className} text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fadeInUp`}
          >
            Explore Our <span className="text-[#0ABAB5]">Products</span>
          </h1>
          <p
            className={`${inter.className} text-lg text-gray-700 mb-4 max-w-2xl mx-auto animate-fadeInUp`}
          >
            Whether you need liquidity, leverage, or investment flexibility, CompareFi has the
            right product for you.
          </p>
          <p
            className={`${inter.className} text-md text-gray-600 animate-fadeInUp`}
          >
            Browse through LAS, LAMF, and MTF to find the right fit for your financial goals.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="relative z-10 max-w-10xl mx-auto px-6 pb-32 grid gap-12 md:grid-cols-3">
        {products.map(({ id, name, icon: Icon, description }, i) => (
          <div
            key={id}
            className="group glass-card p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
          >
            {/* Gradient blob */}
            <div className="absolute -top-10 -right-10 w-70 h-40 bg-gradient-to-br from-[#0ABAB5]/30 to-[#FF6F91]/20 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition" />

            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-[#0ABAB5] to-[#FF6F91] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition">
              <Icon className="w-8 h-8 text-white" />
            </div>

            {/* Text */}
            <h2
              className={`${playfair.className} text-2xl font-bold text-gray-900 mb-4`}
            >
              {name}
            </h2>
            <p className={`${inter.className} text-gray-700 mb-8 leading-relaxed`}>
              {description}
            </p>

            {/* CTA */}
            <Link
              href={`/products/${id}`}
              className="animated-button "
            >
              Explore {name.split('(')[0].trim()}
            </Link>
          </div>
        ))}
      </section>

      <Footer />

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
      `}</style>
    </div>
  );
}
