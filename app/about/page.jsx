'use client';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Users, Award, Lightbulb, CreditCard, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-orange-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 flex justify-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center bg-gradient-to-r from-green-100/40 via-white/30 to-orange-100/40 backdrop-blur-2xl rounded-3xl p-14 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/20 transition-all duration-500 hover:scale-[1.02]">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 animate-fadeIn">
            Your Trusted Financial Comparison Platform
          </h1>
          <p className="text-lg sm:text-xl text-gray-800 max-w-3xl mx-auto animate-fadeIn delay-200">
            CompareFi is India’s most transparent financial comparison platform, designed to help you make smarter borrowing and investing decisions.
            We simplify the complex world of finance by offering real-time, unbiased comparisons for Loan Against Shares (LAS), Loan Against Mutual Funds (LAMF), and Margin Trading Facility (MTF).
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 flex justify-center">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center bg-white/20 backdrop-blur-3xl rounded-3xl p-12 shadow-2xl border border-white/30 transition-all duration-500 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="animate-slideInLeft">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-800 mb-4">
              At CompareFi, our mission is to empower every Indian to take control of their financial decisions. 
              We believe that access to clear, reliable, and up-to-date information is the key to financial confidence.
            </p>
            <p className="text-gray-800">
              By providing transparent comparisons, we help you save time, reduce confusion, and make choices that align with your goals.
            </p>
          </div>
          <img
            src="https://images.pexels.com/photos/3184636/pexels-photo-3184636.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Our Team"
            className="rounded-2xl shadow-xl w-full object-cover animate-slideInRight"
          />
        </div>
      </section>

      {/* Why Choose CompareFi */}
      <section className="py-24 flex justify-center">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 animate-fadeIn">Why Choose CompareFi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: 'Transparency First', text: 'We provide unbiased, real-time comparisons with no hidden agendas.', color: 'text-green-500' },
              { icon: Users, title: 'All-in-One Platform', text: 'Access LAS, LAMF, and MTF options in one place.', color: 'text-orange-500' },
              { icon: Award, title: 'User-Friendly', text: 'Designed for simplicity, so you can compare products and make decisions effortlessly.', color: 'text-green-400' },
              { icon: CreditCard, title: 'Trusted Insights', text: 'Our data and analysis come from verified financial sources.', color: 'text-green-500' },
              { icon: TrendingUp, title: 'Empowering Users', text: 'We put the power of financial knowledge in your hands.', color: 'text-orange-400' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500"
              >
                <div className={`flex items-center mb-4 ${item.color}`}>
                  <item.icon className="w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24 flex justify-center">
        <div className="max-w-6xl mx-auto px-6 text-center grid md:grid-cols-3 gap-8">
          {[
            { title: 'Loan Against Shares (LAS)', text: 'Compare top LAS providers, interest rates, loan-to-value ratios, and more to secure the best financing option.' },
            { title: 'Loan Against Mutual Funds (LAMF)', text: 'Explore LAMF products with clarity, helping you leverage your investments without selling your holdings.' },
            { title: 'Margin Trading Facility (MTF)', text: 'Make informed trading decisions with easy-to-understand comparisons and real-time updates.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/20 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20 hover:scale-105 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-700 text-base leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 flex justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center bg-gradient-to-r from-green-100/30 via-white/30 to-orange-100/30 backdrop-blur-3xl rounded-3xl p-12 shadow-2xl border border-white/20 hover:scale-105 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Approach</h2>
          <p className="text-gray-800 text-lg sm:text-xl leading-relaxed">
            We combine financial expertise with technology to create a platform that’s fast, reliable, and accurate. 
            By simplifying complex financial data into clear, actionable insights, CompareFi ensures that you make the right choices — whether borrowing, investing, or trading.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
  