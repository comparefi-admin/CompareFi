'use client';

import React from 'react';
import logo from '../images/Black 1.png';
import Image from "next/image";
import Link from "next/link";

import { Layers, Building2, LifeBuoy } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#EFF3F6] text-[#1e2e2b] py-10 border-t border-[#B1ED67]/20">
      <div className="max-w-7xl mx-auto px-6">

        {/* GRID */}
        <div className="grid md:grid-cols-4 gap-8">

          {/* BRAND — Logo positioning fine, MOVING TAGLINE UP */}
          {/* Adjusted negative margin slightly to compensate for the smaller tagline gap */}
          <div className="md:-mt-10"> 
            <Link href="/">
              <Image
                src={logo}
                alt="CompareFi Logo"
                width={260}
                height={260}
                // Kept w-40 h-40 for size
                className="object-contain w-40 h-40 cursor-pointer" 
              />
            </Link>

            {/* REDUCED top margin (mt-16 -> mt-2) to bring the tagline up closer to the logo. */}
            <p className="text-[#1e2e2b] font-bold text-base leading-snug mt-2">
              Compare right, Choose right.
            </p>
          </div>

          {/* PRODUCTS — Negative margin removed since the previous image indicated column headers were fine */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#1e2e2b]">
              <Layers size={18} />
              Products
            </h4>
            <ul className="space-y-2 text-[#1e2e2b]/80">
              <li><a href="/products/LAS" className="hover:text-[#1e2e2b]">Loan Against Shares (LAS)</a></li>
              <li><a href="/products/lamf" className="hover:text-[#1e2e2b]">Loan Against Mutual Funds (LAMF)</a></li>
              <li><a href="/products/mtf" className="hover:text-[#1e2e2b]">Margin Trading Facility (MTF)</a></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#1e2e2b]">
              <Building2 size={18} />
              Company
            </h4>
            <ul className="space-y-2 text-[#1e2e2b]/80">
              <li><a href="/about" className="hover:text-[#1e2e2b]">About Us</a></li>
              <li><a href="/contact" className="hover:text-[#1e2e2b]">Contact</a></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#1e2e2b]">
              <LifeBuoy size={18} />
              Support
            </h4>
            <ul className="space-y-2 text-[#1e2e2b]/80">
              <li><a href="/help" className="hover:text-[#1e2e2b]">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-[#1e2e2b]">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-[#1e2e2b]">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Horizontal Line */}
        <div className="border-t border-[#1e2e2b]/20 mt-8"></div>


        {/* BOTTOM */}
        <div className="mt-2 pt-6 text-center text-[#1e2e2b]/70 text-sm">
          <p>&copy; 2025 CompareFi. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}