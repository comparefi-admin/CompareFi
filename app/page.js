'use client';
import Image from 'next/image';
import globe from './images/globe.png';
import pc from './images/pc.png';
import TiltedCard from '@/components/TiltedCard'; 
import BlurText from "@/components/BlurText";
import { DollarSign, PieChart, BarChart } from "lucide-react";
import { Link as ScrollLink } from 'react-scroll';

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

import { Work_Sans, Inter } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-work-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-inter",
});


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
    title: "LAS",
    description: "Discover amazing content",
    date: "Just now",
    iconClassName: "text-blue-500",
    titleClassName: "text-[#FF5732]",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-6 text-black" />,
    title: "LAMF",
    description: "Trending this week",
    date: "2 days ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-[#FF5732]",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-black" />,
    title: "MTF",
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

  const features = ["Transparent Comparisons", "Independent & Unbiased", "Smart, Simple Insights"];

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
        className={`${workSans.variable} ${inter.variable} font-sans min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden`}
        onMouseMove={handleMouseMove}
      >
        {/* Navbar */}
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
          <Navbar />
        </div>

        <main className="flex-grow bg-[#EFF3F6]">

          {/* HERO SECTION (FinGrow-style FIXED) */}

<section
  id="hero"
   className="relative flex flex-col items-center justify-center min-h-[100vh] overflow-visible text-center text-white"
  style={{
    backgroundImage: `url("/images/grid-new.png"), linear-gradient(to bottom, #0B1120 0%, #0E1A2B 45%, #173B38 75%, #EFF3F6 100%)`,
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundPosition: "center -100px, center top",
    backgroundSize: "1920px auto, cover",
    backgroundBlendMode: "overlay, normal",
  }}
>
{/* ==== DOTTED BACKGROUND (LEFT + RIGHT) ==== */}

{/* LEFT SHAPE */}
<img
  src="/icons/Group 23 (2).svg"
  alt=""
  className="
    absolute 
    bottom-[-1rem] 
    left-[18%] 
    w-[500px] 
    opacity-[1] 
    pointer-events-none 
    rotate-[-10deg] 
    scale-x-[-1]
    z-[3]
  "
/>

{/* RIGHT SHAPE (mirrored) */}
<img
  src="/icons/Group 23 (2).svg"
  alt=""
  className="
    absolute 
    bottom-[-1rem] 
    right-[18%] 
    w-[500px] 
    opacity-[1] 
    pointer-events-none 
    rotate-[10deg] 
    scale-x-[-1]
    z-[3]
  "
/>


{/* MASK that hides stars behind the cards */}
<div
  className="absolute inset-0 pointer-events-none z-[15]"
  style={{
    WebkitMaskImage:
      "radial-gradient(circle at center 60%, transparent 25%, black 55%)",
    maskImage:
      "radial-gradient(circle at center 60%, transparent 25%, black 55%)",
  }}
/>


  

  {/* ==== SMALL UPWARD NUDGE (keep spacing) ==== */}
  <div className="mt-[-20%]"></div>

  {/* Badge */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex items-center space-x-2 mb-4 relative z-10"
  >
    <div className="bg-[#B1ED67]/20 text-[#B1ED67] px-3 py-1 rounded-full text-md font-medium">
      Backed by CompareFi
    </div>
  </motion.div>

  {/* Title */}
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-6xl sm:text-6xl md:text-7xl leading-tight tracking-tight text-white max-w-5xl relative z-10"
>
  Compare Right → <span className="text-[#B1ED67]">Choose Right.</span>
</motion.h1>

{/* Subtext */}
<motion.p
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.7 }}
  className="text-slate-300 mt-6 text-lg max-w-xl relative z-10"
>
  No hidden charges. No jargon. No biased recommendations.
  <br />
  Just clear, side-by-side comparisons of financial products so you make confident decisions every time.
</motion.p>


  {/* CTA */}
  <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.7 }}
  className="mt-10 relative z-10"
>
  <Button
    size="lg"
    onClick={() => {
      const el = document.getElementById("featured");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "/#featured"); // Update URL same as clicking Products
      }
    }}
    className="bg-[#B1ED67] hover:bg-[#9CDA59] text-black font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-[#B1ED67]/30 transition-all duration-300"
  >
    Get Started →
  </Button>
</motion.div>


<motion.div
  initial={{ opacity: 0, y: 60, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ delay: 0.8, duration: 0.8 }}
  className="absolute bottom-[-18rem] inset-x-0 flex justify-center z-20"
>
  <div
    className="relative flex justify-center w-full max-w-[1200px] pointer-events-none"
    style={{
      height: "900px",  // ⭐️ make the wrapper tall enough
      WebkitMaskImage:
        "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 66%)",
      maskImage:
        "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 66%)",
    }}
  >
    <div className="relative z-10 mt-[-32%] flex justify-center w-full pointer-events-auto">
      <DisplayCards />
    </div>
  </div>
</motion.div>



</section>



          {/* PRODUCT HIGHLIGHTS */}
<section
  id="featured"
  className="relative z-[40] w-full bg-[#EEF1FA] bg-opacity-0 py-20 mx-5 px-10 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start"
>

  {/* Left Section */}
  <div className="lg:w-1/3 mb-10 lg:mb-0 ml-10">
    <h2 className="text-4xl  text-[#0A0F2C] mb-6 leading-tight">
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
<a href="/products/las" 
   className="
     card4 group relative overflow-hidden rounded-lg bg-[#141F2B] shadow-md hover:shadow-lg 
     transition-all duration-300 p-6 cursor-pointer
     before:pointer-events-none
   "
>

  <div className="flex items-center space-x-4">
    {/* Icon on the left */}
 <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#B1ED67]/20 rounded-full group-hover:bg-[#B1ED67]/30 transition-colors">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="w-7 h-7 text-[#B1ED67] group-hover:text-white transition-colors"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* ₹ Rupee Symbol — Hindi/Devanagari style */}
    <path d="M15 10h18M15 18h18M27 10c0 8-4 14-12 14l15 14" />
  </svg>
</div>




    {/* Text */}
    <div>
      <p className="text1-title text-xl font-semibold text-[#FFFFFF]  transition-colors">LAS</p>
      <p className="text1-body text-white mt-1">Loan Against Shares</p>
    </div>
  </div>
  <button className="card4-button mt-4 bg-[#B1ED67] hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-all">More Info</button>
</a>

{/* LAMF Card */}
<a href="/products/lamf" 
   className="
     card4 group relative overflow-hidden rounded-lg bg-[#2E494D] shadow-md hover:shadow-lg 
     transition-all duration-300 p-6 cursor-pointer
     before:pointer-events-none
   "
>

  <div className="flex items-center space-x-4">
    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#B1ED67]/20 rounded-full group-hover:bg-[#B1ED67]/30 transition-colors">
      <PieChart className="w-6 h-6 text-[#B1ED67] group-hover:text-white" />
    </div>
    <div>
      <p className="text1-title text-xl font-semibold text-[#FFFFFF]  transition-colors">LAMF</p>
      <p className="text1-body text-white mt-1">Loan Against Mutual Funds</p>
    </div>
  </div>
  <button className="card4-button mt-4 bg-[#B1ED67] hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-all">More Info</button>
</a>

{/* MTF Card */}
<a href="/products/mtf" className="card4 group relative overflow-hidden rounded-lg bg-[#141F2B] shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer">
  <div className="flex items-center space-x-4">
    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#B1ED67]/20 rounded-full group-hover:bg-[#B1ED67]/30 transition-colors">
      <BarChart className="w-6 h-6 text-[#B1ED67] " />
    </div>
    <div>
      <p className="text1-title text-xl font-semibold text-[#FFFFFF]  transition-colors">MTF</p>
      <p className="text1-body text-white mt-1">Margin Trading Facility</p>
    </div>
  </div>
  <button className="card4-button mt-4 bg-[#B1ED67] hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-all">More Info</button>
</a>

</div>
</section>



{/* COMPARE PRODUCTS */}

<section id="compare" className="relative flex justify-center items-center mb-[2%] pb-[5%] mt-[2%] min-h-[80vh] overflow-hidden px-6 lg:px-10 bg-opacity-0">
  {/* Subtle noise/background */}
  <div className="absolute inset-0 bg-white bg-opacity-0 pointer-events-none"></div>

  {/* Glass card container */}
  <SpotlightCard
    className="relative z-10 w-[90%] rounded-3xl bg-white backdrop-blur-lg p-10 sm:p-14 flex flex-col drop-shadow-2xl shadow-2xl border-none bg-opacity-100"
    spotlightColor="rgba(177,237,103,0)"
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl sm:text-5xl  mb-12 text-center text-black">
        Compare Products
      </h2>

      <Tabs defaultValue="las">
        <TabsList className="mb-10">
          {PRODUCTS.map((p) => (
            <TabsTrigger
              key={p.id}
              value={p.id}
              className={`
                text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-xl whitespace-nowrap transition 
                focus-visible:ring-4 focus-visible:ring-emerald-400
                data-[state=active]:bg-[#2b7146]
                data-[state=active]:text-white
                data-[state=active]:drop-shadow-2xl
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
                      delay={10}
                      animateBy="words"
                      direction="top"
                      onAnimationComplete={handleAnimationComplete}
                      className="text-4xl  text-[#0A0F2C]"
                    />
                  </h4>

                  <BlurText
                    text={p.blurb}
                    delay={10}
                    animateBy="words"
                    direction="bottom"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-xl text-black mt-5 leading-relaxed"
                  />

                  <ul className="mt-8 text-lg text-slate-600 space-y-4">
                    {p.bullets.map((b, i) => (
                      <li key={i}>
                        <BlurText
                          text={`• ${b}`}
                          delay={10 + i * 2}
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

                {/* Right Metrics → Firebase Table */}
               <div className="p-4  rounded-lg">
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
  <div className="w-1/2 h-1/2 mt-20 flex flex-col justify-center ml-[2%]">
    <h2 className="text-7xl  text-[#0A0F2C] mb-6 mt-5 leading-tight font-bold">
      About CompareFi
    </h2>
    <p className="text-[#4B5563] mb-6 text-2xl leading-relaxed font-normal">
      CompareFi is an independent platform built to bring transparency and clarity to finance. We simplify complex financial decisions by helping you compare loans, investments, and other products side by side — so you can understand true costs, uncover hidden charges, and choose what’s genuinely right for you.
      Our mission is to make financial decision-making clear, confident, and fair for everyone

    </p>
    <div>
<a class="button1" href="/about">
  <span>Read More</span>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
    <polygon
      points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"
    ></polygon>
    <polygon
      points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"
    ></polygon>
    <polygon
      points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"
    ></polygon>
  </svg>
</a>
</div>
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





       <section className="w-full flex justify-center items-center py-20 px-4">
  <div className="w-[85%] rounded-3xl px-6 sm:px-16 py-20 relative overflow-hidden bg-[#124434]">
    
    {/* GRID BACKGROUND */}
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage:
          "linear-gradient(to bottom, white 0%, white 70%, transparent 100%), linear-gradient(to right, transparent 0%, white 25%, white 75%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskImage:
          "-webkit-linear-gradient(top, white 0%, white 70%, transparent 100%), -webkit-linear-gradient(left, transparent 0%, white 25%, white 75%, transparent 100%)",
        WebkitMaskComposite: "source-in",
      }}
    />

    {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-[#124434]/40 z-0"></div>

    {/* CTA CONTENT */}
    <div className="relative z-10 text-center flex flex-col items-center gap-6">
      <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
        Still unsure which financial product is
        <br />
        right for you?
      </h2>

      <p className="text-gray-200 text-lg max-w-2xl">
        Talk to us — we will help you compare options
        <br />
        and choose what saves you the most.
      </p>

      <button
        onClick={() => {
          window.open(
            "https://wa.me/919930584020?text=Hi! I would like to know more about your financial products and get help choosing the best option.",
            "_blank"
          );
        }}
        className="mt-4 inline-flex items-center gap-2 bg-[#B5FF4A] hover:bg-[#a4ff2e]
        text-[#0d1c11] font-semibold px-8 py-4 rounded-full transition-all duration-300
        shadow-lg"
      >
        Contact Us

        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16 3C9.37 3 4 8.37 4 15c0 2.64.86 5.09 2.3 7.06L4 29l7.18-2.24A11.9 11.9 0 0016 27c6.63 0 12-5.37 12-12S22.63 3 16 3zm6.48 17.31c-.27.76-1.55 1.49-2.15 1.59-.57.1-1.28.14-2.07-.13-.48-.16-1.1-.35-1.88-.69-3.31-1.43-5.46-4.66-5.62-4.88-.16-.22-1.34-1.78-1.34-3.4 0-1.62.85-2.42 1.15-2.74.3-.32.65-.4.87-.4.22 0 .44.01.63.01.2 0 .47-.07.74.57.27.64.92 2.23 1 2.39.08.16.13.35.02.57-.11.22-.17.35-.34.54-.17.19-.36.42-.52.56-.17.17-.35.35-.15.69.19.33.84 1.39 1.8 2.26 1.24 1.1 2.27 1.45 2.61 1.61.34.16.54.14.74-.08.2-.22.85-.98 1.08-1.32.22-.34.46-.28.77-.17.32.11 2.03.96 2.38 1.14.35.18.58.26.67.4.08.14.08.81-.19 1.58z" />
        </svg>
      </button>
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
