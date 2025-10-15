'use client';
import Image from 'next/image';
import globe from './images/globe.png';
import TiltedCard from '@/components/TiltedCard'; 

import SpotlightCard from './components/SpotlightCard.jsx'; // Import the SpotlightCard component from './components/SpotlightCard';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { motion } from 'framer-motion';
import { Briefcase, LineChart, BarChart3, Shield, CreditCard, TrendingUp, Sparkles } from 'lucide-react';
import DisplayCards from "@/components/ui/display-cards";
import "./globals.css";
import CompareProductsTable from "./components/CompareProductsTable";

// ShadCN components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TooltipProvider } from '@/components/ui/tooltip';

// Hero cards
const defaultCards = [
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Featured",
    description: "Discover amazing content",
    date: "Just now",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "Popular",
    description: "Trending this week",
    date: "2 days ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-blue-300" />,
    title: "New",
    description: "Latest updates and features",
    date: "Today",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

// Products data
const PRODUCTS = [
  {
    id: 'las',
    title: 'Loan Against Securities (LAS)',
    blurb: 'Unlock liquidity from your portfolio without selling core holdings.',
    bullets: ['Borrow up to 70% of eligible securities', 'Minimal documentation', 'Flexible repayment schedules'],
    icon: <Briefcase className="w-6 h-6" />,
    color: 'from-emerald-400 to-emerald-600',
    metrics: [
      { name: 'Liquidity', value: 80, color: '#10B981' },
      { name: 'Cost', value: 40, color: '#34D399' },
      { name: 'Complexity', value: 30, color: '#6EE7B7' },
      { name: 'Turnaround', value: 70, color: '#A7F3D0' },
    ],
  },
  {
    id: 'lamf',
    title: 'Loan Against Mutual Funds (LAMF)',
    blurb: 'Quick cash against mutual investments — no redemption required.',
    bullets: ['Instant approval for qualifying funds', 'No exit-loads', 'Linked to NAVs for simplicity'],
    icon: <LineChart className="w-6 h-6" />,
    color: 'from-pink-400 to-pink-600',
    metrics: [
      { name: 'Liquidity', value: 70, color: '#F472B6' },
      { name: 'Cost', value: 50, color: '#F9A8D4' },
      { name: 'Complexity', value: 35, color: '#FBCFE8' },
      { name: 'Turnaround', value: 80, color: '#FEE2E2' },
    ],
  },
  {
    id: 'mtf',
    title: 'Margin Trading Facility (MTF)',
    blurb: 'Amplify buying power with controlled leverage for active traders.',
    bullets: ['Leverage up to 4x', 'Transparent interest & margin calls', 'Real-time risk monitoring'],
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'from-indigo-400 to-indigo-600',
    metrics: [
      { name: 'Liquidity', value: 60, color: '#6366F1' },
      { name: 'Cost', value: 30, color: '#818CF8' },
      { name: 'Complexity', value: 60, color: '#A5B4FC' },
      { name: 'Turnaround', value: 50, color: '#C7D2FE' },
    ],
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const [parallaxIcons, setParallaxIcons] = useState([]);

  // Create multiple floating icons for parallax effect
  useEffect(() => {
    const iconsData = [Shield, CreditCard, TrendingUp];
    const NUM_ICONS = 15;

    const icons = Array.from({ length: NUM_ICONS }).map((_, i) => {
      const Icon = iconsData[i % iconsData.length];
      return {
        Icon,
        id: `${Icon.name}-${i}`,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 30 + Math.random() * 50,
        color: ['text-emerald-300','text-pink-300','text-indigo-300'][i % 3],
        speed: 0.1 + Math.random() * 0.4,
        floatOffset: Math.random() * 20,
        floatSpeed: 1 + Math.random() * 1.5
      };
    });

    setParallaxIcons(icons);
  }, []);

  const handleMouseMove = (e) => {
    parallaxIcons.forEach(icon => {
      const el = document.getElementById(icon.id);
      if (el) {
        const moveX = (e.clientX - window.innerWidth / 2) * icon.speed;
        const moveY = (e.clientY - window.innerHeight / 2) * icon.speed;
        el.style.transform = `translate(${moveX}px, ${moveY + Math.sin(Date.now()/1000*icon.floatSpeed)*icon.floatOffset}px)`;
      }
    });
  };

  return (
    <TooltipProvider>
      <div
        className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Navbar */}
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
          <Navbar />
        </div>

        <main className="flex-grow bg-gradient-to-b from-violet-100/70 to-white">

          {/* HERO SECTION */}
          <section className="relative flex items-center justify-center min-h-[85vh] bg-white bg-opacity-0 overflow-hidden px-4 sm:px-6 lg:px-10" >
            {/* Background noise layer */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-100 mix-blend-overlay pointer-events-none"></div>

            {/* Glass Card */}
            <motion.div
              className="relative z-10 w-full max-w-full rounded-3xl   min-h-[70vh] bg-gradient-to-b from-[#6D8EF4] to-[#3D66E1]
 backdrop-blur-lg border border-white/30 shadow-xl p-6 sm:p-10 md:p-14 lg:p-20 flex flex-col md:flex-row mt-[7%] mb-[7%] gap-10 md:gap-14 items-center justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* LEFT */}
              <div className="flex-1 text-center md:text-left space-y-5 sm:space-y-6 lg:space-y-8 pl-20">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
                >
                  Compare<span className="text-white">Fi</span>
                </motion.h1>

                <motion.h2
                  className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium text-slate-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
                >
                  Smart <span className="text-blue-200 font-semibold">Investing</span> Starts Here
                </motion.h2>

                <motion.p
                  className="text-sm sm:text-base md:text-lg text-slate-300 max-w-md mx-auto md:mx-0 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
                >
                  Unlock powerful, AI-driven insights to grow your wealth intelligently. Compare, analyze, and invest with confidence.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
                >
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-base sm:text-lg shadow-lg shadow-blue-500/20 transition-transform hover:scale-105 duration-300"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>

              {/* RIGHT */}
              <motion.div
                className="flex-1 flex justify-center items-center w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <div className="flex w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl items-center justify-center py-10 sm:py-14 md:py-20">
                  <DisplayCards cards={defaultCards} />
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* PRODUCT HIGHLIGHTS */}
   <section className="w-full bg-[#EEF1FA] bg-opacity-0 py-20 px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start">
  {/* Left Section */}
  <div className="lg:w-1/3 mb-10 lg:mb-0">
    <h2 className="text-4xl font-extrabold text-[#0A0F2C] mb-6 leading-tight">
      Product Highlights
    </h2>
    <a
      href="/products" // <-- Link to the page showing all products
      className="text-[#0A0F2C] font-medium underline underline-offset-4 hover:text-blue-600 transition"
    >
      View All
    </a>
  </div>

  {/* Right Section (Cards Grid) */}
  <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    
    {/* Card 1 */}
    <a href="/products/las" className="flex items-center space-x-5 
           bg-white rounded-2xl shadow-sm 
           hover:shadow-2xl 
           hover:scale-[1.03] 
           hover:-translate-y-0.5 
           transition-transform transition-shadow 
           duration-400 ease-in-out 
           p-6 will-change-transform"
>
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-b from-[#6D8EF4] to-[#3D66E1] shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 2a9 9 0 11-9-9 9 9 0 019 9z" />
        </svg>
      </div>
      <span className="text-[#0A0F2C] font-medium text-lg">LAS</span>
    </a>

    {/* Card 2 */}
    <a href="/products/lamf"  className="flex items-center space-x-5 
           bg-white rounded-2xl shadow-sm 
           hover:shadow-2xl 
           hover:scale-[1.03] 
           hover:-translate-y-0.5 
           transition-transform transition-shadow 
           duration-400 ease-in-out 
           p-6 will-change-transform">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-b from-[#6D8EF4] to-[#3D66E1] shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
      <span className="text-[#0A0F2C] font-medium text-lg">LAMF</span>
    </a>

    {/* Card 3 */}
    <a href="/products/mtf"  className="flex items-center space-x-5 
           bg-white rounded-2xl shadow-sm 
           hover:shadow-2xl 
           hover:scale-[1.03] 
           hover:-translate-y-0.5 
           transition-transform transition-shadow 
           duration-400 ease-in-out 
           p-6 will-change-transform">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-b from-[#6D8EF4] to-[#3D66E1] shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h11l4 8H7z" />
        </svg>
      </div>
      <span className="text-[#0A0F2C] font-medium text-lg">MTF</span>
    </a>

  </div>
</section>



{/* COMPARE PRODUCTS */}
<section className="relative flex justify-center items-center min-h-[80vh] overflow-hidden px-4 sm:px-6 lg:px-10 bg-white bg-opacity-0">
  {/* Background noise layer */}
  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10  mix-blend-overlay pointer-events-none"></div>

  {/* Glass card container */}
  <SpotlightCard className="relative z-10 w-[95%] rounded-3xl bg-gradient-to-bl from-indigo-800 to-blue-950 backdrop-blur-lg  shadow-xl p-8 sm:p-12 md:p-16 flex flex-col"  spotlightColor="rgba(255,255,255,0.1)">
 <motion.div
    
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center text-white">Compare Products</h2>

    <Tabs defaultValue="las">
      <TabsList className="mb-7">
        {PRODUCTS.map((p) => (
          <TabsTrigger
            key={p.id}
            value={p.id}
            className="text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 rounded-xl whitespace-nowrap transition font-medium focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {p.title.split('(')[0].trim()}
          </TabsTrigger>
        ))}
      </TabsList>

      {PRODUCTS.map((p) => (
        <TabsContent key={p.id} value={p.id}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className="grid md:grid-cols-2 gap-10 items-start text-center md:text-left">
              {/* Left Info */}
              <div>
                <h4 className="text-2xl font-semibold text-white">{p.title}</h4>
                <p className="text-lg text-slate-200 mt-3">{p.blurb}</p>
                <ul className="mt-6 text-base text-slate-200 space-y-3">
                  {p.bullets.map((b, i) => (
                    <li key={i}>• {b}</li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link href={`/products/${p.id}`}><Button size="lg">Deep Dive</Button></Link>
                  <Link href={`/contact`}><Button variant="outline" size="lg">Talk to Het</Button></Link>
                </div>
              </div>

              {/* Right Metrics */}
             {/* Right Metrics → Replaced with Firebase Table */}
<div>
  <CompareProductsTable productType={p.id} />
</div>

            </div>
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  </motion.div>
</SpotlightCard>
  
</section>
          {/* FEATURES SECTION */}
          <section className="w-full bg-[#F9FAFB] py-20 px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start">
  <section className="w-full bg-[#F9FAFB] py-20 px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start">
  {/* Left Section */}
  <div className="w-1/2 h-1/2 mt-28 flex flex-col justify-center">
    <h2 className="text-4xl font-extrabold text-[#0A0F2C] mb-6 leading-tight">
      About CompareFi
    </h2>
    <p className="text-[#4B5563] mb-6 text-lg leading-relaxed">
      CompareFi is India’s most transparent financial comparison platform, helping you make smarter borrowing and investing decisions. Explore Loan Against Shares (LAS), Loan Against Mutual Funds (LAMF), or Margin Trading Facility (MTF) — all with real-time, unbiased comparisons.
    </p>
    <a
      href="/about" 
      className="text-pink-500 font-medium underline underline-offset-4 hover:text-pink-700 transition"
    >
      Read More
    </a>
  </div>

  {/* Right Section (Image / Illustration) */}
  <div className="lg:w-1/2 flex justify-center">
    <div className="w-[80%]">
      <Image
        src={globe}
        alt="CompareFi Overview"
        className=""
      />
    </div>
  </div>
</section>

</section>
{/* WHY COMPAREFI SECTION */}
<section className="w-full bg-[#EEF1FA] py-20 px-6 lg:px-20">
  <div className="max-w-7xl mx-auto text-center mb-14">
    <h2 className="text-4xl font-extrabold text-[#0A0F2C] mb-4">
      Why CompareFi?
    </h2>
    <p className="text-[#4B5563] text-lg max-w-2xl mx-auto">
      Discover how CompareFi helps you make confident, data-driven financial decisions
      with transparency and speed.
    </p>
  </div>

  {/* Cards Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
    {/* Card 1 */}
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center">
      <div className="flex justify-center items-center w-16 h-16 rounded-xl bg-gradient-to-b from-[#6D8EF4] to-[#3D66E1] mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h4 className="text-xl font-semibold text-[#0A0F2C] mb-3">
        Transparent Comparisons
      </h4>
      <p className="text-[#4B5563] text-base leading-relaxed">
        Interest rates, hidden charges, LTV ratios, and fees — all verified and updated regularly.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center">
      <div className="flex justify-center items-center w-16 h-16 rounded-xl bg-gradient-to-b from-[#6D8EF4] to-[#3D66E1] mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17a4 4 0 100-8 4 4 0 000 8zm-7 4h14M3 4h18" />
        </svg>
      </div>
      <h4 className="text-xl font-semibold text-[#0A0F2C] mb-3">
        Data-Driven Insights
      </h4>
      <p className="text-[#4B5563] text-base leading-relaxed">
        Analysis powered by top banks and brokers including SBI, HDFC, ICICI and more.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center">
      <div className="flex justify-center items-center w-16 h-16 rounded-xl bg-gradient-to-b from-[#6D8EF4] to-[#3D66E1] mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 2a9 9 0 11-9-9 9 9 0 019 9z" />
        </svg>
      </div>
      <h4 className="text-xl font-semibold text-[#0A0F2C] mb-3">
        Smart Filters & Guidance
      </h4>
      <p className="text-[#4B5563] text-base leading-relaxed">
       Navigate complex LAS, LAMF, and MTF choices with clarity — CompareFi simplifies data so you choose what truly fits your financial goals.
      </p>
    </div>
  </div>
</section>


        </main>
        {/* FOOTER */}
        <Footer />
      </div>
    </TooltipProvider>
  );
}
