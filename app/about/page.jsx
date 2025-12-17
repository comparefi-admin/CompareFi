"use client";

import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Image from "next/image";
import Het from "../images/het.jpg"; // Ensure this path is correct
import SpotlightCard from "../components/SpotlightCard.jsx";
import BlurText from "@/components/BlurText"; // Assuming you have this from previous steps
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Lightbulb, 
  Quote, 
  Award, 
  Briefcase 
} from "lucide-react";

import { Work_Sans, Inter } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-work-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

export default function AboutPage() {
  
  const handleAnimationComplete = () => console.log("Text animation done");

  return (
    <div className={`${workSans.variable} ${inter.variable} font-sans min-h-screen bg-[#EFF3F6] text-[#0A0F2C] relative overflow-x-hidden selection:bg-green-200 selection:text-green-900`}>

      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Ambient Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[#1F5E3C]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[35vw] h-[35vw] bg-[#10B981]/10 blur-[120px] rounded-full" />
      </div>

      {/* NAVBAR */}
      <div className="fixed top-4 w-full flex justify-center z-[9999] px-4">
        <div className="w-full max-w-7xl">
          <Navbar />
        </div>
      </div>

      <main className="relative z-10 pt-[160px] pb-20 px-4 sm:px-6">

        {/* --- HERO SECTION --- */}
        <section className="max-w-7xl mx-auto mb-20 lg:mb-32 text-center flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100/80 text-green-800 text-sm font-semibold mb-8 border border-green-200/50 backdrop-blur-sm shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
            The Story Behind the Mission
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-[#0A0F2C] tracking-tight mb-8 leading-[1.1]">
            <BlurText
              text="Unbiased Financial"
              delay={50}
              animateBy="words"
              direction="top"
              className="block"
              onAnimationComplete={handleAnimationComplete}
            />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F5E3C] to-[#10B981]">
               Clarity.
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl leading-relaxed mx-auto"
          >
            A mission-driven platform built to bring transparency to India’s financial ecosystem. 
            No hidden agendas, just pure data.
          </motion.p>

        </section>

        {/* --- FOUNDER SECTION (Cinematic Card) --- */}
        <section className="max-w-7xl mx-auto mb-24">
          <SpotlightCard
            className="rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl p-0 overflow-hidden"
            spotlightColor="rgba(31, 94, 60, 0.1)"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Image Side */}
              <div className="relative h-[400px] lg:h-auto overflow-hidden group">
                 {/* 
                    NOTE: Ensure 'het.jpg' is high res. 
                    Added a slight zoom effect on hover.
                 */}
                 <Image 
                    src={Het} 
                    alt="Het Doshi - Founder"
                    className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                    placeholder="blur"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F2C]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0A0F2C]/5" />
                 
                 {/* Floating Name Tag */}
                 <div className="absolute bottom-6 left-6 text-white z-10">
                    <h3 className="text-3xl font-bold">Het Doshi</h3>
                    <p className="text-green-300 font-medium tracking-wide">Chartered Accountant & Founder</p>
                 </div>
              </div>

              {/* Content Side */}
              <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg text-green-700">
                        <Award className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">The Architect</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-[#0A0F2C] mb-6">
                  Bridging the gap between <span className="text-green-600">institutions</span> and <span className="text-green-600">individuals</span>.
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  "I’m Het Doshi. Having worked across NBFCs, stock brokers, wealth managers, and mutual funds, I realized one thing: 
                  <span className="font-semibold text-gray-800"> The industry is complex by design.</span>"
                </p>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  My goal isn't just to compare rates—it's to decode the fine print. CompareFi is built on the belief that 
                  financial transparency shouldn't be a luxury; it should be the standard.
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <div className="flex flex-col">
                     <span className="text-2xl font-serif italic text-[#1F5E3C]">Het Doshi</span>
                     <span className="text-xs text-gray-400 font-medium">Founder, CompareFi</span>
                  </div>
                </div>
              </div>

            </div>
          </SpotlightCard>
        </section>

        {/* --- THE NARRATIVE (Bento Grid Style) --- */}
        <section className="max-w-7xl mx-auto mb-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0A0F2C]">Why We Exist</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                
                {/* Card 1: The Problem */}
                <SpotlightCard className="md:col-span-2 bg-gradient-to-br from-[#0A0F2C] to-[#151b42] text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Briefcase size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                            <Lightbulb className="text-yellow-300 w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">The Complexity Trap</h3>
                        <p className="text-gray-300 leading-relaxed text-lg max-w-xl">
                            Financial products like Loan Against Shares (LAS) or MTF are often wrapped in jargon. 
                            Hidden charges, floating rates, and opaque terms make it impossible for a regular investor to know the <i>true</i> cost of borrowing.
                        </p>
                    </div>
                </SpotlightCard>

                {/* Card 2: The Solution */}
                <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col justify-between">
                     <div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                            <ShieldCheck className="text-green-600 w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0A0F2C] mb-4">Unbiased Data</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We are bootstrapped. No investors to please. No banks paying us to rank them higher. Just raw, honest data.
                        </p>
                     </div>
                     <div className="mt-8">
                        <div className="text-4xl font-extrabold text-[#1F5E3C]">100%</div>
                        <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Independent</div>
                     </div>
                </div>

                {/* Card 3: The Impact */}
                <div className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col justify-between">
                     <div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                            <Users className="text-blue-600 w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0A0F2C] mb-4">For the People</h3>
                        <p className="text-gray-600 leading-relaxed">
                            If CompareFi helps even one person avoid a bad financial decision, our mission is successful.
                        </p>
                     </div>
                </div>

                {/* Card 4: Vision Statement */}
                <SpotlightCard className="md:col-span-2 bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100 flex flex-col justify-center relative">
                    <Quote className="absolute top-8 right-8 text-gray-100 w-24 h-24 rotate-12" />
                    <h3 className="text-xl font-medium text-green-600 mb-2">Our Vision</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-[#0A0F2C] leading-snug max-w-2xl relative z-10">
                        "To build a financially confident India, driven by clarity, simplicity, and absolute transparency."
                    </p>
                </SpotlightCard>
            </div>
        </section>

        {/* --- MISSION PILLARS --- */}
        <section className="max-w-7xl mx-auto pb-20">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#0A0F2C] mb-3">Our Mission Pillars</h2>
                    <p className="text-gray-600">The core principles that drive every decision we make.</p>
                </div>
                <div className="h-1 w-full md:w-auto md:flex-1 bg-gray-200 rounded-full ml-0 md:ml-8 relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-1/3 bg-green-500 rounded-full" />
                </div>
             </div>

             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {missions.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                        className="bg-white/60 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1F5E3C] to-[#10B981] flex items-center justify-center text-white mb-4">
                            {item.icon}
                        </div>
                        <h4 className="font-bold text-[#0A0F2C] mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
             </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

// Data for Mission Section
const missions = [
    {
        title: "Simplify Complexity",
        desc: "Decoding financial jargon into plain English so everyone can understand what they are signing up for.",
        icon: <Lightbulb size={20} />
    },
    {
        title: "Educate Decisions",
        desc: "Empowering individuals with the knowledge they need to take control of their financial destiny.",
        icon: <Briefcase size={20} />
    },
    {
        title: "Total Transparency",
        desc: "Exposing hidden charges, risks, and benefits. No asterisks, no fine print hidden away.",
        icon: <ShieldCheck size={20} />
    },
    {
        title: "Accessible Literacy",
        desc: "Making high-level financial insights accessible to every Indian, regardless of portfolio size.",
        icon: <TrendingUp size={20} />
    }
];