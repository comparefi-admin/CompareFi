'use client';

import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import {
  Briefcase,
  LineChart,
  BarChart3,
  CheckCircle,
} from 'lucide-react';

export default function ProductPage() {
  const products = [
    {
      id: 'las',
      name: 'Loan Against Securities (LAS)',
      icon: Briefcase,
      description:
        'Leverage your existing securities portfolio to access funds without liquidating your assets. Suitable for short-term liquidity needs while preserving your investment strategy.',
      image:
        'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'lamf',
      name: 'Loan Against Mutual Funds (LAMF)',
      icon: LineChart,
      description:
        'Access quick loans using your mutual fund investments as collateral. Ideal for emergencies or planned expenditures without disturbing your long-term goals.',
      image:
        'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 'mtf',
      name: 'Margin Trading Facility (MTF)',
      icon: BarChart3,
      description:
        'Enhance your purchasing power in the stock market with our Margin Trading Facility. Suitable for experienced investors seeking leverage opportunities.',
      image:
        'https://images.pexels.com/photos/4386365/pexels-photo-4386365.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Product Hero Section */}
      <section id="products" className="pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Explore Our Products</h1>
          <p className="text-lg text-gray-700 mb-4">
            Whether you need liquidity, leverage, or investment flexibility, CompareFi has the right product for you.
          </p>
          <p className="text-md text-gray-600">
            Browse through our offerings like LAS, LAMF, and MTF to find the right fit for your financial goals.
          </p>
        </div>
      </section>

      {/* Product Sections */}
      {products.map(({ id, name, icon: Icon, description, image }) => (
        <section id={id} key={id} className="py-20 px-6 bg-gray-50 border-b">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <img
                src={image}
                alt={name}
                className="rounded-xl shadow-lg w-full max-w-xs h-auto object-cover"
              />
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{name}</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">{description}</p>
              <a
                href="#"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Explore {name.split('(')[0].trim()}
              </a>
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
}
