'use client';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
import Het from '../images/het.jpg';

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
  return (
    <div className={`${workSans.variable} ${inter.variable} font-sans min-h-screen bg-[#EFF3F6] text-[#0A0F2C]`}>

      {/* NAVBAR */}
      <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
        <Navbar />
      </div>

      {/* HERO SECTION */}
      <section className="pt-40 sm:pt-48 pb-20 sm:pb-28 flex justify-center text-center bg-[#0E1A2B]">
        <div className="w-[94%] max-w-5xl mx-auto px-4 sm:px-10">

          {/* Badge */}
          <div className="bg-[#B1ED67]/25 text-[#B1ED67] px-4 py-1 rounded-full text-sm font-medium inline-block mb-6">
            About CompareFi
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            The Story Behind <span className="text-[#B1ED67]">CompareFi</span>
          </h1>

          {/* Subtext */}
          <p className="text-slate-300 mt-6 text-base sm:text-lg max-w-2xl mx-auto">
            A mission-driven platform built to bring transparency and clarity to India’s financial world.
          </p>
        </div>
      </section>

      {/* MAIN ABOUT SECTION */}
      <section className="py-12 sm:py-20 flex justify-center">
        <div className="w-[94%] max-w-7xl mx-auto px-4 sm:px-10 
          bg-white rounded-3xl p-6 sm:p-10 md:p-16 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)]">

          {/* Founder Row */}
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center mb-14">

            {/* Founder Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                // src={Het}
                alt="Founder"
                className="w-full h-[280px] sm:h-[350px] md:h-[420px] object-cover"
              />
            </div>

            {/* Founder Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Het Doshi</h2>

              <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
                I’m Het Doshi, a Chartered Accountant with professional experience across NBFCs,
                stock brokers, wealth managers, and mutual funds — giving me a deep understanding of how
                the financial industry really works.
              </p>

              <p className="text-right text-xl sm:text-2xl mt-6 italic text-[#0A0F2C]/90">
                – Het Doshi
              </p>
            </div>
          </div>

          {/* Narrative */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">About CompareFi</h2>

          <div className="space-y-6 text-[#4B5563] text-base sm:text-lg leading-relaxed">
            <p>
              CompareFi was created to give everyday people unbiased, clear, and honest financial comparisons.
            </p>
            <p>
              Whether it’s LAS, LAMF, MTF, or any other financial product, our goal is to bring transparency
              to real costs, risks, and benefits — without hidden agendas.
            </p>
            <p>
              The platform is fully bootstrapped, built with a mission rather than investors. No pressure,
              no bias — just simple clarity.
            </p>
            <p>
              If CompareFi helps even one person avoid a bad financial decision, the mission is successful.
            </p>
          </div>

        </div>
      </section>

      {/* VISION + MISSION */}
      <section className="pb-16 sm:pb-28 flex justify-center">
        <div className="w-[94%] max-w-7xl mx-auto px-4 sm:px-10
          bg-white rounded-3xl p-6 sm:p-10 md:p-16 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.2)]">

          <h2 className="text-3xl sm:text-4xl font-bold mb-10">Vision & Mission</h2>

          {/* Vision */}
          <h3 className="text-xl sm:text-2xl font-semibold text-[#0A0F2C] mb-3">Our Vision</h3>
          <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed mb-10">
            A financially confident India driven by clarity and transparency.
          </p>

          {/* Mission */}
          <h3 className="text-xl sm:text-2xl font-semibold text-[#0A0F2C] mb-6">Our Mission</h3>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              "To simplify complex financial products.",
              "To help individuals make educated financial decisions.",
              "To bring full transparency to charges, risks, and benefits.",
              "To make financial literacy accessible to every Indian."
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F9FAFB] p-5 sm:p-7 rounded-2xl border border-[#e5e7eb]
                shadow-[0_10px_30px_-10px_rgba(0,0,0,0.12)]"
              >
                <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

