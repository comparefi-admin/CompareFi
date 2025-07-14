'use client';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Users, Award, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section id="story" className="pt-32 pb-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Mission is to Simplify Finance
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At ComparisonFi, we believe everyone deserves access to clear, unbiased financial information.
            We're here to make complex choices easier and help you save money while reaching your goals.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Where We Started</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2022 by a group of fintech enthusiasts, ComparisonFi started as a small project
                aimed at helping people compare credit cards and savings accounts. Since then, we've grown
                into a trusted platform used by millions.
              </p>
              <p className="text-gray-700">
                Our team is passionate about empowering people to make confident financial decisions.
              </p>
            </div>
            <img
              src="https://images.pexels.com/photos/3184636/pexels-photo-3184636.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our Team"
              className="rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Values / Features */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h2>
          <p className="text-lg text-gray-600 mb-12">
            These values guide everything we do.
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Clarity</h3>
              </div>
              <p className="text-gray-600">
                We simplify complicated financial data so you can make informed choices quickly.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Trust</h3>
              </div>
              <p className="text-gray-600">
                No sponsored bias—our comparisons are 100% transparent and user-first.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-yellow-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Excellence</h3>
              </div>
              <p className="text-gray-600">
                We constantly improve and innovate to provide the best comparison experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
