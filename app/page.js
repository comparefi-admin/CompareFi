"use client";
import Image from "next/image";
import globe from "./images/globe.png";
import TiltedCard from "@/components/TiltedCard";
import BlurText from "@/components/BlurText";
import { DollarSign, PieChart, BarChart } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";

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

import SpotlightCard from "./components/SpotlightCard.jsx";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { motion } from "framer-motion";
import {
  Briefcase,
  LineChart,
  BarChart3,
  Shield,
  CreditCard,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import "./globals.css";
import CompareProductsTable from "./components/CompareProductsTable";

import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";

const PRODUCTS = [
  {
    id: "las",
    title: "Loan Against Securities (LAS)",
    blurb: "Unlock liquidity from your portfolio without selling core holdings.",
    bullets: [
      "Borrow up to 70% of eligible securities",
      "Minimal documentation",
      "Flexible repayment schedules",
    ],
    icon: <Briefcase className="w-6 h-6" />,
    color: "from-emerald-400 to-emerald-600",
  },
  {
    id: "lamf",
    title: "Loan Against Mutual Funds (LAMF)",
    blurb: "Quick cash against mutual investments — no redemption required.",
    bullets: [
      "Instant approval for qualifying funds",
      "No exit-loads",
      "Linked to NAVs for simplicity",
    ],
    icon: <LineChart className="w-6 h-6" />,
    color: "from-pink-400 to-pink-600",
  },
  {
    id: "mtf",
    title: "Margin Trading Facility (MTF)",
    blurb: "Amplify buying power with controlled leverage for active traders.",
    bullets: [
      "Leverage up to 4x",
      "Transparent interest & margin calls",
      "Real-time risk monitoring",
    ],
    icon: <BarChart3 className="w-6 h-6" />,
    color: "from-indigo-400 to-indigo-600",
  },
];

export default function HomePage() {
  const [parallaxIcons, setParallaxIcons] = useState([]);

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
        color: ["text-emerald-300", "text-pink-300", "text-indigo-300"][i % 3],
        speed: 0.1 + Math.random() * 0.4,
        floatOffset: Math.random() * 20,
        floatSpeed: 1 + Math.random() * 1.5,
      };
    });

    setParallaxIcons(icons);
  }, []);

  const handleMouseMove = (e) => {
    parallaxIcons.forEach((icon) => {
      const el = document.getElementById(icon.id);
      if (el) {
        const moveX = (e.clientX - window.innerWidth / 2) * icon.speed;
        const moveY = (e.clientY - window.innerHeight / 2) * icon.speed;
        el.style.transform = `translate(${moveX}px, ${
          moveY + Math.sin((Date.now() / 1000) * icon.floatSpeed) * icon.floatOffset
        }px)`;
      }
    });
  };

  return (
    <TooltipProvider>
      <div
        className={`${workSans.variable} ${inter.variable} font-sans min-h-screen bg-[#EFF3F6] text-[#0A0F2C] relative overflow-x-hidden selection:bg-green-200 selection:text-green-900`}
        onMouseMove={handleMouseMove}
      >
        {/* --- SHARED BACKGROUND LAYER (From About Page) --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Technical Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Ambient Blobs */}
          <div className="absolute top-[20%] right-[-5%] w-[40vw] h-[40vw] bg-[#1F5E3C]/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-10%] w-[35vw] h-[35vw] bg-[#10B981]/5 blur-[120px] rounded-full" />
        </div>

        {/* NAVBAR */}
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-6">
          <Navbar />
        </div>

        {/* CONTENT WRAPPER */}
        <main className="relative z-10 flex-grow">
          
          {/* HERO SECTION - Keep as is, it has its own background logic */}
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
            {/* DOTTED BACKGROUND (LEFT + RIGHT) */}
            <img src="/icons/Group 23 (2).svg" alt="" className="absolute bottom-[-1rem] left-[18%] w-[500px] opacity-[1] pointer-events-none rotate-[-10deg] scale-x-[-1] z-[3]" />
            <img src="/icons/Group 23 (2).svg" alt="" className="absolute bottom-[-1rem] right-[18%] w-[500px] opacity-[1] pointer-events-none rotate-[10deg] scale-x-[-1] z-[3]" />

            {/* MASK */}
            <div className="absolute inset-0 pointer-events-none z-[15]" style={{ WebkitMaskImage: "radial-gradient(circle at center 60%, transparent 25%, black 55%)", maskImage: "radial-gradient(circle at center 60%, transparent 25%, black 55%)" }} />

            <div className="mt-[-20%]"></div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center space-x-2 mb-4 relative z-10">
              <div className="bg-[#B1ED67]/20 text-[#B1ED67] px-3 py-1 rounded-full text-md font-medium">Backed by CompareFi</div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl sm:text-6xl md:text-7xl leading-tight tracking-tight text-white max-w-5xl relative z-10">
              Compare Right → <span className="text-[#B1ED67]">Choose Right.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="text-slate-300 mt-6 text-lg max-w-xl relative z-10">
              No hidden charges. No jargon. No biased recommendations.<br />Just clear, side-by-side comparisons of financial products.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="mt-10 relative z-10">
              <Button size="lg" onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#B1ED67] hover:bg-[#9CDA59] text-black font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300">
                Get Started →
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 60, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="absolute bottom-[-18rem] inset-x-0 flex justify-center z-20">
              <div className="relative flex justify-center w-full max-w-[1200px] pointer-events-none" style={{ height: "900px", WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 66%)", maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 66%)" }}>
                <div className="relative z-10 mt-[-32%] flex justify-center w-full pointer-events-auto">
                  <DisplayCards />
                </div>
              </div>
            </motion.div>
          </section>

          {/* ALL SUBSEQUENT SECTIONS NOW SHOW THE GRID BACKGROUND */}
          
          <section
            id="featured"
            className="relative z-[40] w-full bg-[#EEF1FA] bg-opacity-0 py-20 px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10 lg:gap-0"
          >
            {/* Left Section - Title */}
            <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-10">
              <h2 className="text-3xl sm:text-4xl text-[#0A0F2C] mb-6 leading-tight font-bold">
                Product Highlights
              </h2>
              <a
                href="#compare"
                className="text-[#0A0F2C] font-medium underline underline-offset-4 hover:text-blue-600 transition"
              >
                View All
              </a>
            </div>

            {/* Right Section - Cards Grid */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* LAS Card */}
              <a
                href="/products/las"
                className="
                  card4 group relative overflow-hidden rounded-lg bg-[#141F2B] shadow-md hover:shadow-lg 
                  transition-all duration-300 p-6 cursor-pointer w-full
                  before:pointer-events-none
                "
              >
                <div className="flex items-center space-x-4">
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
                      <path d="M15 10h18M15 18h18M27 10c0 8-4 14-12 14l15 14" />
                    </svg>
                  </div>

                  <div>
                    <p className="text1-title text-xl font-semibold text-[#FFFFFF] transition-colors">
                      LAS
                    </p>
                    <p className="text1-body text-white mt-1">
                      Loan Against Shares
                    </p>
                  </div>
                </div>
                <button className="card4-button mt-4 bg-[#B1ED67] hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-all w-full sm:w-auto">
                  More Info
                </button>
              </a>

              {/* LAMF Card */}
              <a
                href="/products/lamf"
                className="
                  card4 group relative overflow-hidden rounded-lg bg-[#2E494D] shadow-md hover:shadow-lg 
                  transition-all duration-300 p-6 cursor-pointer w-full
                  before:pointer-events-none
                "
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#B1ED67]/20 rounded-full group-hover:bg-[#B1ED67]/30 transition-colors">
                    <PieChart className="w-6 h-6 text-[#B1ED67] group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text1-title text-xl font-semibold text-[#FFFFFF] transition-colors">
                      LAMF
                    </p>
                    <p className="text1-body text-white mt-1">
                      Loan Against Mutual Funds
                    </p>
                  </div>
                </div>
                <button className="card4-button mt-4 bg-[#B1ED67] hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-all w-full sm:w-auto">
                  More Info
                </button>
              </a>

              {/* MTF Card */}
              <a
                href="/products/mtf"
                className="
                  card4 group relative overflow-hidden rounded-lg bg-[#141F2B] shadow-md hover:shadow-lg 
                  transition-all duration-300 p-6 cursor-pointer w-full
                "
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#B1ED67]/20 rounded-full group-hover:bg-[#B1ED67]/30 transition-colors">
                    <BarChart className="w-6 h-6 text-[#B1ED67]" />
                  </div>
                  <div>
                    <p className="text1-title text-xl font-semibold text-[#FFFFFF] transition-colors">
                      MTF
                    </p>
                    <p className="text1-body text-white mt-1">
                      Margin Trading Facility
                    </p>
                  </div>
                </div>
                <button className="card4-button mt-4 bg-[#B1ED67] hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-all w-full sm:w-auto">
                  More Info
                </button>
              </a>
            </div>
          </section>

          {/* COMPARE PRODUCTS */}
          <section
            id="compare"
            className="relative flex justify-center items-center mb-[2%] pb-[5%] mt-[2%] min-h-[80vh] overflow-hidden px-0 sm:px-6 lg:px-10"
          >
            <div className="absolute inset-0 bg-white bg-opacity-0 pointer-events-none"></div>

            <SpotlightCard
              className="relative z-10 w-[90%] rounded-3xl bg-white backdrop-blur-lg 
                p-4 sm:p-10 md:p-14 flex flex-col drop-shadow-2xl shadow-2xl 
                border-none bg-opacity-100"
              spotlightColor="rgba(177,237,103,0)"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="pb-8 sm:pb-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl text-center text-black">
                    Compare Products
                  </h2>
                </div>
                <Tabs defaultValue="las" className="relative">
                  <TabsList
                    className="mt-6 mb-10
                    flex flex-col gap-2
                    sm:flex-row sm:flex-wrap
                    bg-transparent shadow-none border-none
                    w-full
                    relative z-10"
                  >
                    {PRODUCTS.map((p) => (
                      <TabsTrigger
                        key={p.id}
                        value={p.id}
                        className="
                          text-sm sm:text-base md:text-lg
                          px-3 sm:px-5 md:px-6
                          py-2.5 sm:py-3 md:py-3 
                          rounded-xl transition 
                          focus-visible:ring-4 focus-visible:ring-emerald-400
                          data-[state=active]:bg-[#2b7146]
                          data-[state=active]:text-white
                          data-[state=active]:drop-shadow-2xl
                          w-full justify-start
                          sm:w-auto sm:justify-center"
                      >
                        {p.title.split("(")[0].trim()}
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
                        <div
                          className="
                            grid 
                            grid-cols-1 
                            md:grid-cols-[38%_60%] 
                            gap-10 md:gap-12 
                            items-start 
                            text-center md:text-left 
                            pt-6 sm:pt-8
                          "
                        >
                          {/* LEFT CONTENT */}
                          <div>
                            <h4 className="text-2xl sm:text-3xl font-semibold text-[#0A0F2C]">
                              <BlurText
                                text={p.title}
                                delay={10}
                                animateBy="words"
                                direction="top"
                                className="text-3xl sm:text-4xl text-[#0A0F2C]"
                              />
                            </h4>

                            <BlurText
                              text={p.blurb}
                              delay={10}
                              animateBy="words"
                              direction="bottom"
                              className="text-lg sm:text-xl text-black mt-4 sm:mt-5 leading-relaxed"
                            />

                            <ul className="mt-6 sm:mt-8 text-base sm:text-lg text-slate-600 space-y-3 sm:space-y-4 list-none p-0">
                              {p.bullets.map((b, i) => (
                                <li key={i} className="text-left">
                                  <BlurText
                                    text={`• ${b}`}
                                    delay={10 + i * 2}
                                    animateBy="words"
                                    className="text-base sm:text-lg text-slate-700"
                                    direction="bottom"
                                  />
                                </li>
                              ))}
                            </ul>

                            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start">
                              <Link href={`/products/${p.id}`}>
                                <Button
                                  size="lg"
                                  className="text-lg px-8 py-4 bg-[#FF5732] hover:bg-[#FF5732] w-full sm:w-auto"
                                >
                                  Deep Dive
                                </Button>
                              </Link>
                            </div>
                          </div>

                          {/* RIGHT SIDE TABLE */}
                          <div className="sm:p-4 rounded-lg md:ml-[-20px] lg:ml-[-30px] w-full">
                            <div className="-mx-4 sm:mx-0 overflow-x-auto">
                              <CompareProductsTable productType={p.id} />
                            </div>
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
          <section className="w-full bg-[#F9FAFB] bg-opacity-0 py-15 px-6 lg:px-20">
            <div
              className="
              w-full 
              flex flex-col lg:flex-row 
              justify-between 
              items-center lg:items-start 
              gap-12 lg:gap-20
              "
            >
              {/* LEFT SECTION */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center mt-10 lg:mt-20 ml-[2%]">
                <h2
                  className="
                    text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                    text-[#0A0F2C] 
                    mb-6 mt-5
                    leading-tight 
                    font-bold
                  "
                >
                  About CompareFi
                </h2>

                <p
                  className="
                    text-[#4B5563] 
                    mb-6 
                    text-base sm:text-lg md:text-xl lg:text-2xl 
                    leading-relaxed 
                    font-normal
                  "
                >
                  CompareFi is an independent platform built to bring
                  transparency and clarity to finance. We simplify complex
                  financial decisions by helping you compare loans, investments,
                  and other products side by side — so you can understand true
                  costs, uncover hidden charges, and choose what’s genuinely
                  right for you. Our mission is to make financial
                  decision-making clear, confident, and fair for everyone.
                </p>

                <div>
                  <a className="button1" href="/about">
                    <span>Read More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
                      <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
                      <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
                      <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
                    </svg>
                  </a>
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-[80%]">
                  <Image
                    src={globe}
                    alt="CompareFi Overview"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="w-full flex justify-center items-center py-16 px-4 sm:px-6 md:px-10">
            <div
              className="
                w-full sm:w-[90%] lg:w-[85%]
                rounded-3xl 
                px-4 sm:px-10 md:px-16 
                py-14 sm:py-16 md:py-20 
                relative 
                overflow-hidden 
                bg-[#124434]
              "
            >
              {/* GRID BACKGROUND */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
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
              <div className="relative z-10 text-center flex flex-col items-center gap-4 sm:gap-6">
                
                {/* Responsive Heading */}
                <h2
                  className="
                    text-2xl sm:text-4xl md:text-5xl 
                    font-bold 
                    text-white 
                    leading-snug sm:leading-tight
                  "
                >
                  Still unsure which financial product is
                  <br className="hidden sm:block" />
                  right for you?
                </h2>

                {/* Responsive Paragraph */}
                <p
                  className="
                    text-gray-200 
                    text-sm sm:text-base md:text-lg 
                    max-w-xl sm:max-w-2xl 
                    leading-relaxed
                  "
                >
                  Talk to us — we will help you compare options
                  <br className="hidden sm:block" />
                  and choose what saves you the most.
                </p>

                {/* WhatsApp Button */}
                <button
                  onClick={() => {
                    window.open(
                      "https://wa.me/919930584020?text=Hi! I would like to know more about your financial products and get help choosing the best option.",
                      "_blank"
                    );
                  }}
                  className="
                    mt-4 
                    inline-flex items-center gap-2 
                    bg-[#B5FF4A] hover:bg-[#a4ff2e]
                    text-[#0d1c11] font-semibold 
                    px-6 sm:px-8 md:px-10 
                    py-3 sm:py-4 
                    rounded-full 
                    transition-all duration-300
                    shadow-lg
                    text-sm sm:text-base md:text-lg
                  "
                >
                  Contact Us
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
        
        <Footer />
      </div>
    </TooltipProvider>
  );
}