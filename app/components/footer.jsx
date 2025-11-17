'use client';

import React from 'react';
import logo from '../images/Black 1.png';
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#EFF3F6] text-[#1e2e2b] py-12 border-t border-[#B1ED67]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
    <div>
 <div className="-mt-6">
  <Link href="/">
    <Image
      src={logo}
      alt="CompareFi Logo"
      width={160}
      height={160}
      className="object-contain w-28 h-28 cursor-pointer"
    />
  </Link>

  <p className="text-[#1e2e2b]/80 leading-relaxed mt-3">
    Compare right Chose right
  </p>
</div>
</div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-[#1e2e2b]">Products</h4>
            <ul className="space-y-2 text-[#1e2e2b]/80">
              <li>
                <a href="/products/LAS" className="hover:text-[#1e2e2b] transition-colors">
                  Loan Against Shares (LAS)
                </a>
              </li>
              <li>
                <a href="/products/lamf" className="hover:text-[#1e2e2b] transition-colors">
                  Loan Against Mutual Funds (LAMF)
                </a>
              </li>
              <li>
                <a href="/products/mtf" className="hover:text-[#1e2e2b] transition-colors">
                  Margin Trading Facility (MTF)
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-[#131f1c]">Company</h4>
            <ul className="space-y-2 text-[#1e2e2b]/80">
              <li><a href="/about" className="hover:text-[#1e2e2b] transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-[#1e2e2b] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-[#1e2e2b]">Support</h4>
            <ul className="space-y-2 text-[#1e2e2b]/80">
              <li><a href="/help" className="hover:text-[#1e2e2b] transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-[#1e2e2b] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-[#1e2e2b] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1e2e2b]/20 mt-8 pt-8 text-center text-[#1e2e2b]/70">
          <p>&copy; 2025 CompareFi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
