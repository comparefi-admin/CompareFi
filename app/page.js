'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  CreditCard,
  Shield,
  Mail,
  TrendingUp,
  PiggyBank,
  TrendingUp as InvestIcon,
  Home as HomeIcon,
  Car,
  Briefcase,
  LineChart,
  BarChart3
} from 'lucide-react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import HeroSection from './components/hero';

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
      description: 'All data is securely encrypted and privacy-first.'
    },
    {
      icon: TrendingUp,
      title: 'Smarter Choices',
      description: 'We help you choose the best financial products.'
    },
    {
      icon: CreditCard,
      title: 'Real Savings',
      description: 'Users save thousands by switching through CompareFi.'
    },
  ];

  return (
    <div className="min-h-screen bg-[#fef9f4]">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-6 md:p-10 mx-4 md:mx-10 my-10">
        <HeroSection />
      </section>

      {/* Products Section */}
      <section id="featured" className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-6 md:p-10 mx-4 md:mx-10 my-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Our Top Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(({ name, icon: Icon, description }) => (
              <div key={name} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Why Us Section */}
      <section id="contact" className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-6 md:p-10 mx-4 md:mx-10 my-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose CompareFi?</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            We make financial decision-making simple, smart, and secure. Here's why millions trust us:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
