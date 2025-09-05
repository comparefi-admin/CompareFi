'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from './components/navbar';
import Footer from './components/footer';
import {
  Shield,
  TrendingUp,
  CreditCard,
  Briefcase,
  LineChart,
  BarChart3,
} from 'lucide-react';

import './components/hero.css';
import './components/HeroSection.css';

// Google Fonts
import { Playfair_Display, Inter, Satisfy } from 'next/font/google';
const playfair = Playfair_Display({ weight: ['400', '700'], subsets: ['latin'] });
const inter = Inter({ weight: ['300', '400', '600'], subsets: ['latin'] });
const satisfy = Satisfy({ weight: ['400'], subsets: ['latin'] });

export default function HomePage() {
  const products = [
    { name: 'LAS', icon: Briefcase, description: 'Loan Against Securities made simple and flexible.' },
    { name: 'LAMF', icon: LineChart, description: 'Loan Against Mutual Funds with instant approval.' },
    { name: 'MTF', icon: BarChart3, description: 'Margin Trading Facility to boost your portfolio.' },
  ];

  const features = [
    { icon: Shield, title: 'Secure Comparisons', description: 'All data is securely encrypted and privacy-first.' },
    { icon: TrendingUp, title: 'Smarter Choices', description: 'We help you choose the best financial products.' },
    { icon: CreditCard, title: 'Real Savings', description: 'Users save thousands by switching through CompareFi.' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#fdfdfd] via-[#f8f9fa] to-[#f0f2f5] text-gray-900 overflow-hidden">
      {/* Subtle Grain */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/textures/grain.png')] opacity-[0.15] mix-blend-overlay"></div>

      {/* Floating pastel gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-300/40 rounded-full blur-[160px]"></div>
      <div className="absolute -top-80 -right-10 w-96 h-96 bg-pink-300/40 rounded-full blur-[160px]"></div>
      <div className="absolute bottom-[50%] right-[4.5%] w-[24rem] h-[24rem] bg-[#FFB347]/30 rounded-full blur-[160px]"></div>

      {/* Navbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-28 space-y-16">
        {/* HERO */}
        <section id="hero" className="glass-card py-20 mx-4 mb-10 neon-border relative overflow-hidden">
          <div className="w-full max-w-screen-2xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center justify-items-center">
            {/* LEFT */}
            <div className="space-y-8">
              <p
                className={`${satisfy.className} text-2xl text-[#FF6F91] opacity-0 animate-fadeInUp`}
                style={{ animationDelay: '0.05s' }}
              >
                Your story, your numbers.
              </p>

              <h2
                className={`${playfair.className} text-4xl md:text-5xl text-gray-800 tracking-wide leading-snug opacity-0 animate-fadeInUp`}
                style={{ animationDelay: '0.15s' }}
              >
                Your journey to <span className="text-[#0ABAB5]">financial clarity</span> begins here
              </h2>

              <h1
                className={`${playfair.className} text-6xl lg:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF6F91] via-[#0ABAB5] to-[#C3B1E1] opacity-0 animate-fadeInUp`}
                style={{ animationDelay: '0.3s' }}
              >
                CompareFi
              </h1>

              <p
                className={`${inter.className} text-lg lg:text-xl text-gray-700 max-w-xl leading-relaxed opacity-0 animate-fadeInUp`}
                style={{ animationDelay: '0.45s' }}
              >
                Imagine a world where{' '}
                <span className="font-semibold text-[#0ABAB5]">every decision</span> you make about your money feels clear, confident, and rewarding.
                That’s what we bring to your screen —{' '}
                <span className="underline decoration-[#FF6F91]">every single day</span>.
              </p>

              <p
                className={`${inter.className} text-sm text-gray-500 uppercase tracking-widest opacity-0 animate-fadeInUp`}
                style={{ animationDelay: '0.6s' }}
              >
                No fine print. No hidden catches. Just financial freedom.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0 animate-fadeInUp"
                style={{ animationDelay: '0.75s' }}
              >
                <Link href="/products">
                  <button className="animated-button">
                    <span className="text">Get Started</span>
                    <span className="circle"></span>
                  </button>
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-[#FF6F91] hover:text-[#FF6F91] transition-all hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* RIGHT */}
            <div
              className="flex justify-center items-center relative min-h-[300px] opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.9s' }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl transition-all duration-500 w-full max-w-md glow-box hover-glow">
                <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
                  <source src="/videos/Video_Generation_Without_Finance.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
<section id="featured" className="glass-card py-24 mx-4 my-16 neon-border">
  <div className="w-full max-w-screen-2xl mx-auto px-6 text-center">
    <h2 className={`${playfair.className} text-5xl font-bold mb-20 shimmer-text text-gray-800`}>
      Explore Our Top Products
    </h2>

    <div className="flex flex-col gap-20">
      {/* LAS */}
      <div className="group bg-gradient-to-r from-[#e0f7f9] to-[#fdf7ff] backdrop-blur-xl rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-start gap-12 hover:scale-[1.01] transition-all duration-500 relative overflow-hidden">
        <div className="w-28 h-28 bg-[#0ABAB5]/20 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
          <Briefcase className="w-14 h-14 text-[#0ABAB5]" />
        </div>
        <div className="flex-1 text-left">
          <h3 className={`${playfair.className} text-4xl font-bold mb-4 text-gray-800`}>
            Loan Against Securities (LAS)
          </h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Unlock liquidity from your portfolio <span className="font-semibold text-[#0ABAB5]">without selling</span>.  
            Access capital instantly while your investments continue to grow.
          </p>
          <div className="flex gap-4">
            <Link href="/products/las">
              <button className="animated-button">
                <span className="text">Learn More</span>
                <span className="circle"></span>
              </button>
            </Link>
            <button className="border-2 border-[#0ABAB5] text-[#0ABAB5] px-6 py-3 rounded-lg font-semibold hover:bg-[#0ABAB5]/10 transition-all">
              Check Eligibility
            </button>
          </div>

          {/* Expand on Hover */}
          <div className="max-h-0 group-hover:max-h-52 transition-all duration-500 ease-in-out overflow-hidden">
            <div className="mt-6 pt-6 border-t border-gray-200 text-gray-600 text-base leading-relaxed space-y-2">
              <p>💡 <span className="font-semibold">Why LAS?</span></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Borrow up to <span className="font-semibold">70% of your securities’ value</span>.</li>
                <li>Keep your portfolio intact while accessing funds.</li>
                <li>Flexible repayment options tailored to you.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* LAMF */}
      <div className="group bg-gradient-to-r from-[#fff7fa] to-[#f0faff] backdrop-blur-xl rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-start gap-12 hover:scale-[1.01] transition-all duration-500 relative overflow-hidden">
        <div className="w-28 h-28 bg-[#FF6F91]/20 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
          <LineChart className="w-14 h-14 text-[#FF6F91]" />
        </div>
        <div className="flex-1 text-left">
          <h3 className={`${playfair.className} text-4xl font-bold mb-4 text-gray-800`}>
            Loan Against Mutual Funds (LAMF)
          </h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Need quick liquidity? <span className="font-semibold text-[#FF6F91]">LAMF</span>  
            lets you unlock funds from your mutual investments — without redemption or exit loads.
          </p>
          <div className="flex gap-4">
            <Link href="/products/lamf">
              <button className="animated-button">
                <span className="text">Learn More</span>
                <span className="circle"></span>
              </button>
            </Link>
            <button className="border-2 border-[#FF6F91] text-[#FF6F91] px-6 py-3 rounded-lg font-semibold hover:bg-[#FF6F91]/10 transition-all">
              Apply Now
            </button>
          </div>

          {/* Expand on Hover */}
          <div className="max-h-0 group-hover:max-h-52 transition-all duration-500 ease-in-out overflow-hidden">
            <div className="mt-6 pt-6 border-t border-gray-200 text-gray-600 text-base leading-relaxed space-y-2">
              <p>💡 <span className="font-semibold">Why LAMF?</span></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Instant approval with minimal documentation.</li>
                <li>Funds directly linked to your mutual fund portfolio.</li>
                <li>Stay invested while accessing quick liquidity.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* MTF */}
      <div className="group bg-gradient-to-r from-[#f3f0ff] to-[#f9f9f9] backdrop-blur-xl rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-start gap-12 hover:scale-[1.01] transition-all duration-500 relative overflow-hidden">
        <div className="w-28 h-28 bg-[#C3B1E1]/20 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
          <BarChart3 className="w-14 h-14 text-[#C3B1E1]" />
        </div>
        <div className="flex-1 text-left">
          <h3 className={`${playfair.className} text-4xl font-bold mb-4 text-gray-800`}>
            Margin Trading Facility (MTF)
          </h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Multiply your buying power with <span className="font-semibold text-[#C3B1E1]">MTF</span>.  
            Trade smarter, seize more opportunities, and maximize returns with controlled leverage.
          </p>
          <div className="flex gap-4">
            <Link href="/products/mtf">
              <button className="animated-button">
                <span className="text">Learn More</span>
                <span className="circle"></span>
              </button>
            </Link>
            <button className="border-2 border-[#C3B1E1] text-[#C3B1E1] px-6 py-3 rounded-lg font-semibold hover:bg-[#C3B1E1]/10 transition-all">
              Start Trading
            </button>
          </div>

          {/* Expand on Hover */}
          <div className="max-h-0 group-hover:max-h-52 transition-all duration-500 ease-in-out overflow-hidden">
            <div className="mt-6 pt-6 border-t border-gray-200 text-gray-600 text-base leading-relaxed space-y-2">
              <p>💡 <span className="font-semibold">Why MTF?</span></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Leverage up to <span className="font-semibold">4x your cash balance</span>.</li>
                <li>Low interest rates with flexible tenure.</li>
                <li>Boost your portfolio while staying in control.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* WHY CHOOSE US */}
        <section id="contact" className="glass-card py-20 mx-4 my-10 neon-border">
          <div className="w-full max-w-screen-2xl mx-auto px-6 text-center">
            <h2 className={`${playfair.className} text-3xl font-bold mb-6 shimmer-text text-gray-800`}>
              Why Choose CompareFi?
            </h2>
            <p className={`${inter.className} text-gray-600 mb-10 max-w-2xl mx-auto`}>
              We make financial decision-making simple, smart, and secure. Here's why millions trust us:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-[#FF6F91]/50 rounded-full flex items-center justify-center mb-4 inner-glow">
                    <Icon className="w-6 h-6 text-[#FF6F91]" />
                  </div>
                  <h3 className={`${inter.className} text-xl font-semibold mb-2 text-gray-800`}>{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer pinned at bottom */}
      <Footer />

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
