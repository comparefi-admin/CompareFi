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

// Google Fonts — cinematic + human
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
    <div className="relative bg-gradient-to-b from-[#fdfdfd] via-[#f8f9fa] to-[#f0f2f5] min-h-screen overflow-hidden text-gray-900">
      {/* Subtle Grain */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/textures/grain.png')] opacity-[0.15] mix-blend-overlay"></div>

      {/* Floating pastel gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-300/40 rounded-full blur-[160px]"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-teal-200/40 rounded-full blur-[160px]"></div>

      {/* Navbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
        <Navbar />
      </div>

      <main className="pt-28 space-y-16">
        {/* HERO */}
        <section id="hero" className="glass-card py-20 mx-4 mb-10 neon-border relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-2 gap-14 items-center">
            {/* LEFT */}
            <div className="space-y-8">
              <p
                className={`${satisfy.className} text-2xl text-pink-500 opacity-0 animate-fadeInUp`}
                style={{ animationDelay: '0.05s' }}
              >
                Your story, your numbers.
              </p>

              <h2
                className={`${playfair.className} text-4xl md:text-5xl text-gray-800 tracking-wide opacity-0 animate-fadeInUp`}
                style={{ animationDelay: '0.15s' }}
              >
                Your journey to financial clarity begins here
              </h2>

              <h1
                className={`${playfair.className} text-6xl lg:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-teal-500 to-purple-500 opacity-0 animate-fadeInUp`}
                style={{ animationDelay: '0.3s' }}
              >
                CompareFi
              </h1>

              <p
                className={`${inter.className} text-lg lg:text-xl text-gray-700 max-w-xl leading-relaxed opacity-0 animate-fadeInUp`}
                style={{ animationDelay: '0.45s' }}
              >
                Imagine a world where{' '}
                <span className="font-semibold text-teal-600">every decision</span> you make about your money feels clear, confident, and rewarding.
                That’s what we bring to your screen —{' '}
                <span className="underline decoration-pink-400">every single day</span>.
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
                <Link href="/products" className="transition-all transform hover:scale-105 hover:shadow-lg">
                  <button className="animated-button hover-glow bg-gradient-to-r from-pink-400 to-teal-400 text-white">
                    <span className="text">Get Started</span>
                    <span className="circle"></span>
                  </button>
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-pink-400 hover:text-pink-500 transition-all hover:scale-105"
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
        <section id="featured" className="glass-card py-20 mx-4 my-10 neon-border">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className={`${playfair.className} text-3xl font-bold mb-6 shimmer-text text-gray-800`}>Explore Our Top Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(({ name, icon: Icon, description }) => (
                <div
                  key={name}
                  className="bg-white/40 backdrop-blur-md border border-white/30 rounded-xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 text-gray-800"
                >
                  <div className="w-14 h-14 bg-teal-200/40 rounded-full flex items-center justify-center mb-4 inner-glow">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className={`${inter.className} text-xl font-semibold mb-2`}>{name}</h3>
                  <p className="text-gray-700">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="contact" className="glass-card py-20 mx-4 my-10 neon-border">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className={`${playfair.className} text-3xl font-bold mb-6 shimmer-text text-gray-800`}>Why Choose CompareFi?</h2>
            <p className={`${inter.className} text-gray-600 mb-10 max-w-2xl mx-auto`}>
              We make financial decision-making simple, smart, and secure. Here's why millions trust us:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex flex-col items-center text-center hover:scale-105 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-pink-200/50 rounded-full flex items-center justify-center mb-4 inner-glow">
                    <Icon className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className={`${inter.className} text-xl font-semibold mb-2 text-gray-800`}>{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>

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
