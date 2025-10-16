'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CompareFi</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Making financial decisions easier for millions of users worldwide.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Products</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="/products/LAS" className="hover:text-blue-600 transition-colors">
                  Loan Against Shares (LAS)
                </a>
              </li>
              <li>
                <a href="/products/lamf" className="hover:text-blue-600 transition-colors">
                  Loan Against Mutual Funds (LAMF)
                </a>
              </li>
              <li>
                <a href="/products/mtf" className="hover:text-blue-600 transition-colors">
                  Margin Trading Facility (MTF)
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/about" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="/careers" className="hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="/press" className="hover:text-blue-600 transition-colors">Press</a></li>
              <li><a href="/contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/help" className="hover:text-blue-600 transition-colors">Help Center</a></li>
              <li><a href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="/security" className="hover:text-blue-600 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2025 CompareFi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
