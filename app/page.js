'use client';
import Image from 'next/image';
import globe from './images/globe.png';
import pc from './images/pc.png';
import TiltedCard from '@/components/TiltedCard'; 
import BlurText from "@/components/BlurText";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
 import TextType from '@/components/TextType';

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
    icon: <Sparkles className="size-4 text-black" />,
    title: "Featured",
    description: "Discover amazing content",
    date: "Just now",
    iconClassName: "text-blue-500",
    titleClassName: "text-[#FF5732]",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-6 text-black" />,
    title: "Popular",
    description: "Trending this week",
    date: "2 days ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-[#FF5732]",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-black" />,
    title: "New",
    description: "Latest updates and features",
    date: "Today",
    iconClassName: "text-blue-500",
    titleClassName: "text-[#FF5732]",
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

        <main className="flex-grow bg-[#fcfefb]">

          {/* HERO SECTION */}
          <section className="relative flex items-center justify-center min-h-[85vh] bg-white bg-opacity-0 overflow-hidden px-4 sm:px-6 lg:px-10" >
            {/* Background noise layer */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-100 mix-blend-overlay pointer-events-none"></div>

            {/* Glass Card */}
            <motion.div
              className="w-full justify-center items-center flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SpotlightCard className="relative z-10 w-[90%] max-w-full rounded-3xl   min-h-[70vh] bg-gradient-to-b from-[#B1ED67] to-[white]
 backdrop-blur-xl shadow-2xl sm:p-10 md:p-14 lg:p-20 flex flex-col md:flex-row mt-[7%] mb-[7%] gap-10 md:gap-14 items-center justify-center hover:drop-shadow-2xl
           hover:scale-102 transition-all duration-700 
 border-none
           p-6 will-change-transform "  spotlightColor="rgba(255,255,255,0.3)">
              {/* LEFT */}
              <div className="flex-1 text-center md:text-left space-y-5 sm:space-y-6 lg:space-y-8 pl-20">
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
                  >
                   </motion.h1>

                  {/* <TextType 
                    text={["CompareFi"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]'
                  />
                  </motion.h1> */}

                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
                  >
                    <BlurText
                      text="CompareFi"
                      delay={80}
                      animateBy="words" 
                      direction="top" 
                      onAnimationComplete={handleAnimationComplete} 
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    />
                  </motion.h1>
                <motion.h2
                  className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium text-black"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
                >
                  <BlurText
                    text="Smart Investing Starts Here"
                    delay={80}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium text-black"
                  />
                </motion.h2>


                <motion.p
                  className="text-sm sm:text-base md:text-lg text-slate-300 max-w-md mx-auto md:mx-0 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
                >
                  <BlurText
                    text="Unlock powerful, AI-driven insights to grow your wealth intelligently. Compare, analyze, and invest with confidence."
                    delay={10}
                    animateBy="word"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-sm sm:text-base md:text-lg text-slate-700 max-w-md mx-auto md:mx-0 leading-relaxed"
                  />
                </motion.p>


                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
                >
                  <Button
                    size="lg"
                    className="bg-[#fc5732] hover:bg-[#fc5732] shadow-inner-white-500 text-white rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-base sm:text-lg shadow-lg shadow-blue-500/20 transition-transform hover:scale-105 duration-300"
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
              </SpotlightCard>
            </motion.div>
          </section>

          {/* PRODUCT HIGHLIGHTS */}
   <section className="w-full bg-[#EEF1FA] bg-opacity-0 py-20 mx-5 px-10 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start">
  {/* Left Section */}
  <div className="lg:w-1/3 mb-10 lg:mb-0 ml-10">
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
  <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mr-10">
  {/* LAS Card */}
  <a href="/products/las" className="card4 group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 p-6 cursor-pointer">
    <div className="flex items-center space-x-4">
      {/* Icon on the left */}
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#FF5732]/20 rounded-full group-hover:bg-[#FF5732]/30 transition-colors">
        <img src="https://img.icons8.com/ios/452/loan-against-securities.png" alt="LAS Icon" className="w-6 h-6 text-[#FF5732] group-hover:text-white" />
      </div>
      {/* Text */}
      <div>
        <p className="text1-title text-xl font-semibold text-[#0A0F2C] group-hover:text-black transition-colors">LAS</p>
        <p className="text1-body text-gray-600 mt-1">Loan Against Shares</p>
      </div>
    </div>
    <button className="card4-button mt-4 bg-[#FF5732] hover:bg-black text-white font-medium py-2 px-4 rounded-xl transition-all">More Info</button>
  </a>

  {/* LAMF Card */}
  <a href="/products/lamf" className="card4 group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer">
    <div className="flex items-center space-x-4">
      {/* Icon on the left */}
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#FF5732]/20 rounded-full group-hover:bg-[#FF5732]/30 transition-colors">
        <img src="https://img.icons8.com/ios/452/loan-against-securities.png" alt="LAMF Icon" className="w-6 h-6 text-[#FF5732] group-hover:text-white" />
      </div>
      <div>
        <p className="text1-title text-xl font-semibold text-[#0A0F2C] group-hover:text-black transition-colors">LAMF</p>
        <p className="text1-body text-gray-600 mt-1">Loan Against Mutual Funds</p>
      </div>
    </div>
    <button className="card4-button mt-4 bg-[#FF5732] hover:bg-black text-white font-medium py-2 px-4 rounded-xl transition-all">More Info</button>
  </a>

  {/* MTF Card */}
  <a href="/products/mtf" className="card4 group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer">
    <div className="flex items-center space-x-4">
      {/* Icon on the left */}
      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#FF5732]/20 rounded-full group-hover:bg-[#FF5732]/30 transition-colors">
        <img src="https://img.icons8.com/ios/452/loan-against-securities.png" alt="MTF Icon" className="w-6 h-6 text-[#FF5732] group-hover:text-white" />
      </div>
      <div>
        <p className="text1-title text-xl font-semibold text-[#0A0F2C] group-hover:text-black transition-colors">MTF</p>
        <p className="text1-body text-gray-600 mt-1">Margin Trading Facility</p>
      </div>
    </div>
    <button className="card4-button mt-4 bg-[#FF5732] hover:bg-black text-white font-medium py-2 px-4 rounded-xl transition-all">More Info</button>
  </a>
</div>

</section>


{/* COMPARE PRODUCTS */}
{/* COMPARE PRODUCTS */}
<section className="relative flex justify-center items-center mb-[2%] pb-[5%] mt-[2%] min-h-[80vh] overflow-hidden px-10 sm:px-6 lg:px-10 bg-white bg-opacity-0">
  {/* Background noise layer */}
  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

  {/* Glass card container */}
  <SpotlightCard
    className="relative z-10 border-none w-[90%]  rounded-3xl bg-white p-10 sm:p-14 flex drop-shadow-2xl shadow-2xl flex-col"
    spotlightColor="rgba(177,237,103,0.2)"
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-black">
        Compare Products
      </h2>

      <Tabs defaultValue="las">
  <TabsList className="mb-10">
    {PRODUCTS.map((p) => (
      <TabsTrigger
        key={p.id}
        value={p.id}
        className={`
          text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-xl whitespace-nowrap transition font-bold
          focus-visible:ring-4 focus-visible:ring-emerald-400
          // hover:bg-emerald-100 hover:bg
          data-[state=active]:bg-gradient-to-t from-white to-[#B1ED67] data-[state=active]:text-black 
          data-[state=active]:drop-shadow-2xl
          data-[state=active]:hover:bg-emerald-600
        `} 
      >
        {p.title.split('(')[0].trim()}
      </TabsTrigger>
    ))}
  </TabsList>

  {PRODUCTS.map((p) => (
    <TabsContent key={p.id} value={p.id}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-start text-center md:text-left pt-8 pl-2">
          {/* Left Info */}
          <div>
            <h4 className="text-2xl font-semibold text-[#0A0F2C]">
              <BlurText
                text={p.title}
                delay={100}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-4xl font-bold text-[#0A0F2C]"
              />
            </h4>

            {/* Paragraph */}
            <BlurText
              text={p.blurb}
              delay={150}
              animateBy="words"
              direction="bottom"
              onAnimationComplete={handleAnimationComplete}
              className="text-xl text-black mt-5 leading-relaxed"
            />

            {/* Bulleted list */}
            <ul className="mt-8 text-lg text-slate-600 space-y-4">
              {p.bullets.map((b, i) => (
                <li key={i}>
                  <BlurText
                    text={`• ${b}`}
                    delay={200 + i * 50}
                    animateBy="words"
                    direction="bottom"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-lg text-slate-700"
                  />
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <Link href={`/products/${p.id}`}>
                <Button size="lg" className="text-lg px-8 py-4 bg-[#FF5732] hover:bg-[#FF5732]">
                  Deep Dive
                </Button>
              </Link>
            </div>
          </div>

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
          <section className="w-full bg-[#F9FAFB] bg-opacity-0 py-15 px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start">
  <section className="w-full bg-[#F9FAFB]  bg-opacity-0 py-10 px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start">
  {/* Left Section */}
  <div className="w-1/2 h-1/2 mt-20 flex flex-col justify-center ml-[5%]">
    <h2 className="text-7xl font-extrabold text-[#0A0F2C] mb-6 mt-5 leading-tight">
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
    <div className="w-[80%] ml-[10%]">
      <Image
        src={globe}
        alt="CompareFi Overview"
        className=""
      />
    </div>
  </div>
</section>

</section>
{/* WHY COMPAREFI
          <section className="w-full bg-[#EEF1FA] bg-opacity-0 py-20 px-6 lg:px-20">
            <div className="max-w-7xl mx-auto text-center mb-14">
              <h2 className="text-4xl font-extrabold text-[#0A0F2C] mb-4">Why CompareFi?</h2>
              <p className="text-[#4B5563] text-lg max-w-2xl mx-auto">Discover how CompareFi helps you make confident, data-driven financial decisions.</p>
            </div>
            
          </section> */}


{/* UPDATED WHYw */}
<section className="w-full bg-[#f9fafb00] py-4 px-6 lg:px-20 mb-[2%]">
  {/* Top Flex Row */}
  <SpotlightCard
  className="flex flex-col lg:flex-row justify-between items-center gap-16 pb-[5%] 
             rounded-3xl p-8 sm:p-12 md:p-16 
             bg-gradient-to-br b bg-white bg-opacity-0 
            transition-all duration-700 hover:scale-102
 border-none"

  spotlightColor="rgba(255,255,255,0.4)"
>
    
    {/* Left Section (Image) */}
<div className="lg:w-1/2 flex justify-center items-center text-center">
  <div className="w-[90%] max-w-xl"> {/* increased from 80%/md to 90%/xl */}
    <Image
      src={pc}
      alt="CompareFi Overview"
      className="w-full h-auto mix-blend-multiply scale-110"
    />
  </div>
</div>


    {/* Right Section (Text) */}
    <div className="lg:w-1/2 flex flex-col pr-[14%] justify-center items-start text-start">
      <h2 className="text-7xl font-extrabold text-[#0A0F2C] mb-6 leading-tight pl-[5%]">
        Why CompareFi?
      </h2>
      <p className="text-[#4B5563] mb-6 text-lg leading-relaxed max-w-md pl-[5%]">
        Discover how CompareFi helps you make confident, data-driven financial decisions.
      </p>
      <a
        href="/about"
        className="text-[#E8098E] font-medium  underline underline-offset-4 hover:text-pink-700 transition pl-[5%]"
      >
        Read More
      </a>
      <div className="mx-[-8%] mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl pl-[10%] mr-[-30%] mb-[5%] ">
  {['Transparency', 'Speed', 'Intelligence'].map((feature, i) => (
    <div
      key={i}
      className="rounded-2xl shadow-[0_20px_30px_-5px_rgba(102,102,102,1)] transition-all duration-500 ease-out p-8 flex flex-col items-center text-center overflow-visible bg-gradient-to-tr from-[#f9fafb00] via-[#f9fafb00] to-[#f9fafb00] border-2 border-[#c3c6ce] hover:border-[#99e33d]  hover:shadow-[0_4px_18px_0_rgba(0,0,0,0.25)]"

    >
      {/* Header Row */}
      <div className="flex flex-row items-center justify-start gap-4 w-full mb-3 ">
        <div className="flex justify-center items-center w-14 h-14 rounded-xl bg-[#FF5732] flex-shrink-0">
          <Sparkles className="w-7 h-7 text-white" />
        </div>

        <h4 className="flex text-lg sm:text-xl font-semibold text-[#0A0F2C] items-center justify-center">
          <BlurText
            text={feature}
            delay={100}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-lg sm:text-xl font-semibold text-[#0A0F2C]"
          />
        </h4>
      </div>

      {/* Description */}
      <p className="text-[#4B5563] mt-2 leading-relaxed">
        <BlurText
          text="We bring you clarity, speed, and smart insights to guide your investments."
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-[#4B5563]"
        />
      </p>
    </div>
  ))}
</div>

    </div>
  </SpotlightCard>

  {/* Cards Below the Flex */}
  
</section>
<section className="w-full flex justify-center items-center pb-20 mb-30 bg-transparent">
  <div className="m2 w-[80%] flex flex-col p-20 relative">
    {/* Glowing background ring */}
    <div className="absolute z-5 inset-2 blur-[60px] opacity-80 group-hover:opacity-100 transition-all duration-500"
         style={{
           background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)"
         }}>
    </div>

    {/* Text + WhatsApp CTA flowing across the card */}
    <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-6">
      <h2 className="flex-1 text-3xl sm:text-4xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
        Want to compare your financial options? Reach out to CompareFi instantly on WhatsApp!
      </h2>

      <a 
        href="https://wa.me/919999999999"  // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
      >
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.478a11.9 11.9 0 0 0-16.84 16.84L2 22l2.84-.737a11.9 11.9 0 0 0 15.68-17.785zm-8.52 16.02c-2.72 0-5.3-0.9-7.36-2.41l-0.53-.33-4.34 1.15 1.16-4.23-0.35-.55a10.96 10.96 0 1 1 11.42 6.37zM16.06 14.11c-0.23-0.12-1.36-0.67-1.57-0.75-0.21-0.09-0.36-0.13-0.51 0.12s-0.58 0.75-0.71 0.9c-0.13 0.15-0.25 0.17-0.46 0.06-0.21-0.11-0.89-0.33-1.69-1.04-0.63-0.56-1.05-1.25-1.17-1.45-0.12-0.21-0.01-0.32 0.1-0.43 0.1-0.1 0.22-0.25 0.33-0.37 0.11-0.12 0.15-0.21 0.22-0.35 0.07-0.14 0.03-0.26-0.02-0.37-0.05-0.12-0.51-1.23-0.7-1.69-0.18-0.44-0.36-0.38-0.51-0.38s-0.27-0.01-0.41-0.01c-0.14 0-0.36 0.05-0.55 0.26s-0.72 0.7-0.72 1.71c0 1.01 0.74 1.99 0.84 2.13 0.1 0.14 1.45 2.23 3.5 3.13 2.05 0.9 2.05 0.6 2.42 0.56s1.44-0.59 1.65-1.15c0.21-0.57 0.21-1.06 0.15-1.16-0.07-0.1-0.21-0.16-0.44-0.28z"/>
        </svg>
        Contact on WhatsApp
      </a>
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
