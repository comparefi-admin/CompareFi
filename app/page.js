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
import { motion } from 'framer-motion';
import './components/hero.css';
import './components/HeroSection.css';

// Google Fonts (modern pairings)
import { Instrument_Serif, Outfit, Bebas_Neue } from 'next/font/google';

const instrument = Instrument_Serif({ weight: ['400'], subsets: ['latin'] });
const outfit = Outfit({ weight: ['300', '400', '600'], subsets: ['latin'] });
const bebas = Bebas_Neue({ weight: ['400'], subsets: ['latin'] });

// Animation variants
// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay },
  }),
};

const blurIn = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 1, ease: 'easeOut', delay },
  }),
};




export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#fcfcff] via-[#ffffff] via-[#ffffff] to-[#ccd6f7] text-gray-900 overflow-hidden">
      {/* Subtle Grain */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/textures/grain.png')] opacity-[0.12] mix-blend-overlay"></div>

      {/* Floating color blooms (Indigo / Mint / Hot Pink) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#6C63FF]/35 rounded-full blur-[160px]"></div>
      <div className="absolute -top-80 -right-10 w-96 h-96 bg-[#FF4D8D]/35 rounded-full blur-[160px]"></div>
      <div className="absolute bottom-[50%] right-[4.5%] w-[24rem] h-[24rem] bg-[#00E5A8]/35 rounded-full blur-[160px]"></div>

      {/* Navbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-28 space-y-16">
        {/* HERO */}
        <section
          id="hero"
          className="glass-card1 py-24 px-6 mx-4 mb-20 neon-border relative overflow-hidden text-center"
        >
          <motion.div
            className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Tagline */}
            <motion.p
              className={`${instrument.className} text-2xl text-[#6C63FF] italic tracking-wide`}
              variants={fadeUp}
              custom={0.2}
            >
              Your story, your numbers.
            </motion.p>

            {/* Heading */}
            <motion.h2
              className={`${instrument.className} text-4xl md:text-5xl text-gray-800 leading-snug`}
              variants={fadeUp}
              custom={0.5}
            >
              Your journey to{' '}
              <span className="text-[#06906b]">financial clarity</span> begins here
            </motion.h2>

            {/* Brand */}
            <motion.h1
              className={`${bebas.className} text-6xl lg:text-9xl font-normal text-transparent bg-clip-text bg-black`}
              variants={fadeUp}
              custom={0.9}
            >
              CompareFi
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className={`${outfit.className} text-lg lg:text-xl text-gray-700 max-w-2xl leading-relaxed`}
              variants={fadeUp}
              custom={1.3}
            >
              Imagine a world where{' '}
              <span className="font-semibold text-[#00E5A8]">every decision</span> you
              make about your money feels clear, confident, and rewarding. That’s what
              we bring to your screen —{' '}
              <span className="underline decoration-[#FF4D8D] underline-offset-4">
                every single day
              </span>.
            </motion.p>

            {/* Motto */}
            <motion.p
              className={`${outfit.className} text-sm text-gray-500 uppercase tracking-[0.25em]`}
              variants={blurIn}
              custom={1.8}
            >
              No fine print. No hidden catches. Just financial freedom.
            </motion.p>


            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 pt-10"
              variants={fadeUp}
              custom={2.2}
            >
              <Link href="/products">
                <button className="animated-button px-10 py-4 w-200 rounded-xl text-lg font-semibold">
                  <span className="text">Get Started</span>
                  <span className="circle"></span>
                </button>
              </Link>
              <Link
                href="/about"
                className=" px-10 py-4 rounded-xl text-lg font-semibold animated-button bg-slate-50 transition-all hover:scale-105"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* PRODUCTS */}
<section
  id="featured"
  className="relative glass-card2 neon-border min-h-screen flex flex-col items-center mx-6 justify-center px-6 py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
>
  {/* Parallax floating glow */}
  <motion.div
    className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-3xl -z-10"
    initial={{ y: 100, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    viewport={{ once: true }}
    style={{ transform: "translate(-50%, -50%)" }}
  />

  {/* Section Heading */}
  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
    className={`${instrument.className} text-4xl md:text-6xl text-gray-800 tracking-tight mb-16 text-center`}
  >
    Explore Our <span className="text-[#04af82]">Top Products</span>
  </motion.h2>

  {/* Product Grid */}
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.25,
        },
      },
    }}
  >
    {[{
      title: 'Loan Against Securities (LAS)',
      desc: 'Unlock liquidity from your portfolio without selling. Access capital instantly while your investments continue to grow.',
      why: [
        'Borrow up to 70% of your securities’ value.',
        'Keep your portfolio intact while accessing funds.',
        'Flexible repayment options tailored to you.'
      ],
      icon: <Briefcase className="w-12 h-12 text-[#00E5A8]" />,
      color: '#00E5A8',
      btn1: 'Learn More',
      btn2: 'Check Eligibility'
    }, {
      title: 'Loan Against Mutual Funds (LAMF)',
      desc: 'Need quick liquidity? LAMF lets you unlock funds from your mutual investments — without redemption or exit loads.',
      why: [
        'Instant approval with minimal documentation.',
        'Funds directly linked to your mutual fund portfolio.',
        'Stay invested while accessing quick liquidity.'
      ],
      icon: <LineChart className="w-12 h-12 text-[#FF4D8D]" />,
      color: '#FF4D8D',
      btn1: 'Learn More',
      btn2: 'Apply Now'
    }].map((p, i) => (
      <motion.div
        key={i}
        variants={{
          hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.9, ease: "easeOut" },
          },
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 flex flex-col items-start gap-6"
      >
        {/* Icon */}
        <div
          className="w-20 h-20 rounded-xl flex items-center justify-center shadow-md"
          style={{ backgroundColor: `${p.color}20`, border: `1px solid ${p.color}40` }}
        >
          {p.icon}
        </div>

        {/* Content */}
        <div className="flex-1 text-left space-y-3">
          <h3 className={`${instrument.className} text-2xl text-gray-800`}>
            {p.title}
          </h3>
          <p className={`${outfit.className} text-base text-gray-700 leading-relaxed`}>
            {p.desc}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button className="animated-button px-6 py-2.5 rounded-lg text-base font-semibold">
              <span className="text">{p.btn1}</span>
              <span className="circle"></span>
            </button>
            <button
              className="border-2 text-gray-900 px-6 py-2.5 rounded-lg font-semibold transition-all"
              style={{ borderColor: p.color }}
            >
              {p.btn2}
            </button>
          </div>

          {/* Expand on hover */}
          <div className="max-h-0 group-hover:max-h-40 transition-all duration-700 ease-out overflow-hidden">
            <div className="mt-4 pt-4 border-t border-gray-200 text-gray-600 text-sm leading-relaxed space-y-1">
              <p>💡 <span className="font-semibold">Why {p.title.split('(')[0].trim()}?</span></p>
              <ul className="list-disc list-inside space-y-1">
                {p.why.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>

  <motion.div
  className="mt-12 max-w-md w-full"
  initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  viewport={{ once: true }}
  transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
>
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    className="group relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:bg-white/90 transition-all text-center"
  >
    <BarChart3 className="w-12 h-12 text-[#6C63FF] mx-auto mb-4" />
    <h3 className={`${instrument.className} text-2xl text-gray-800 mb-2`}>
      Margin Trading Facility (MTF)
    </h3>
    <p className={`${outfit.className} text-base text-gray-700 leading-relaxed`}>
      Multiply your buying power with MTF. Trade smarter, seize more opportunities, and maximize returns with controlled leverage.
    </p>

    {/* CTA Buttons */}
    <div className="flex justify-center gap-3 pt-4">
      <button className="animated-button px-6 py-2.5 rounded-lg text-base font-semibold">
        <span className="text">Learn More</span>
        <span className="circle"></span>
      </button>
      <button
        className="border-2 text-gray-900 px-6 py-2.5 rounded-lg font-semibold transition-all"
        style={{ borderColor: "#6C63FF" }}
      >
        Apply Now
      </button>
    </div>

    {/* Expand on hover */}
    <div className="max-h-0 group-hover:max-h-40 transition-all duration-700 ease-out overflow-hidden">
      <div className="mt-4 pt-4 border-t border-gray-200 text-gray-600 text-sm leading-relaxed space-y-1">
        <p>💡 <span className="font-semibold">Why MTF?</span></p>
        <ul className="list-disc list-inside space-y-1">
          <li>Leverage up to 4x your cash balance.</li>
          <li>Low interest rates with flexible tenure.</li>
          <li>Boost your portfolio while staying in control.</li>
        </ul>
      </div>
    </div>
  </motion.div>
</motion.div>
</section>



        {/* WHY COMPAREFI */}
        <section
          id="why-comparefi"
          className="glass-card3 relative py-28 mx-4  neon-border rounded-3xl  my-1000 overflow-hidden"
        >
          <motion.div
            className="max-w-6xl mx-auto px-6 text-center space-y-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="space-y-4" variants={fadeUp} custom={0.2}>
              <h2 className="text-5xl font-semibold text-gray-900 tracking-tight">
                Why <span className="text-[#6C63FF]">CompareFi</span> Stands Out
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
                Not just comparisons — we bring{' '}
                <span className="font-semibold text-[#007c5b]">clarity, speed, and trust</span>
                to every financial decision you make.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              {['98% Customer satisfaction from real users', '3x Faster than traditional financial discovery platforms', 'Zero Hidden fees, catches, or fine print'].map((txt, i) => (
                <motion.div
                  key={i}
                  className="p-10 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
                  variants={fadeUp}
                  custom={0.4 + i * 0.2}
                >
                  <h3 className="text-4xl font-bold text-[#6C63FF]">
                    {i === 0 ? '98%' : i === 1 ? '3x Faster' : 'Zero'}
                  </h3>
                  <p className="mt-3 text-gray-700">{txt.replace(/^[^ ]+ /, '')}</p>
                </motion.div>
              ))}
            </div>

            <motion.div className="relative mt-20" variants={fadeUp} custom={1.2}>
              <p className="text-2xl md:text-3xl font-medium text-gray-800">
                CompareFi is where <span className="text-[#6C63FF] font-semibold">clarity</span> meets
                <span className="text-[#FF4D8D] font-semibold"> confidence</span> 🚀
              </p>
              <div className="absolute inset-0 -z-10 flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-r from-[#6C63FF]/20 via-[#00E5A8]/20 to-[#FF4D8D]/20 rounded-full blur-[120px]"></div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
