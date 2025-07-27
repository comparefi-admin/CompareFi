'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from './components/navbar';
import Footer from './components/footer';
import {
  ArrowRight,
  Shield,
  TrendingUp,
  CreditCard,
  Briefcase,
  LineChart,
  BarChart3,
} from 'lucide-react';

import './components/hero.css';
import './components/HeroSection.css';

export default function HomePage() {
  const products = [
    { name: 'LAS', icon: Briefcase, description: 'Loan Against Securities made simple and flexible.' },
    { name: 'LAMF', icon: LineChart, description: 'Loan Against Mutual Funds with instant approval.' },
    { name: 'MTF', icon: BarChart3, description: 'Margin Trading Facility to boost your portfolio.' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Comparisons',
      description: 'All data is securely encrypted and privacy-first.',
    },
    {
      icon: TrendingUp,
      title: 'Smarter Choices',
      description: 'We help you choose the best financial products.',
    },
    {
      icon: CreditCard,
      title: 'Real Savings',
      description: 'Users save thousands by switching through CompareFi.',
    },
  ];

  return (
    <div className="relative bg-[#e8f0f8] min-h-screen">
      {/* ✅ Fixed Navbar always on top */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
        <Navbar />
      </div>

      {/* ✅ Padding top so content doesn't hide behind navbar */}
      <main className="pt-28 animated-bg text-black">
        {/* HERO SECTION */}
        <section id="hero" className="glass-card py-20 mx-4 mb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              {/* LEFT */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-extrabold text-black leading-tight">
                  Compare<span className="text-blue-400">Fi</span>
                </h1>
                <p className="text-2xl lg:text-3xl font-medium text-black/90">
                  Your shortcut to{' '}
                  <span className="text-green-400 font-semibold">
                    smarter money moves
                  </span>
                </p>
                <p className="text-lg text-black/70 max-w-xl">
                  Discover, compare and choose the best financial products in
                  seconds — no hidden fees, no jargon, just clarity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/products"
                    className="bg-blue-600 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center"
                  >
                    Start Comparing
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link
                    href="/about"
                    className="border-2 border-black/30 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-400 hover:text-blue-400 transition-colors inline-flex items-center justify-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex justify-center items-center relative min-h-[300px]">
                <div className="honeycomb">
                  <div></div><div></div><div></div>
                  <div></div><div></div><div></div><div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section id="featured" className="glass-card py-20 mx-4 my-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-black mb-6">
              Explore Our Top Products
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(({ name, icon: Icon, description }) => (
                <div
                  key={name}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-black"
                >
                  <div className="w-14 h-14 bg-blue-600/20 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{name}</h3>
                  <p className="text-black/80">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section id="contact" className="glass-card py-20 mx-4 my-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-black mb-6">
              Why Choose CompareFi?
            </h2>
            <p className="text-black/70 mb-10 max-w-2xl mx-auto">
              We make financial decision-making simple, smart, and secure.
              Here's why millions trust us:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-blue-600/30 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-black/80">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
