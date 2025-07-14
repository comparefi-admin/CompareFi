"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, DollarSign, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid layout */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* ==== LEFT : Branding & CTA ==== */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Compare<span className="text-blue-600">Fi</span>
            </h1>

            <p className="text-2xl lg:text-3xl font-medium text-gray-700">
              Your shortcut to&nbsp;
              <span className="text-green-600 font-semibold">
                smarter&nbsp;money&nbsp;moves
              </span>
            </p>

            <p className="text-lg text-gray-600 max-w-xl">
              Discover, compare and choose the best financial products in
              seconds — no hidden fees, no jargon, just clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold
             hover:bg-blue-700 transition-all transform hover:scale-105
             flex items-center justify-center"
              >
                Start Comparing
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="/about"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg
             text-lg font-semibold hover:border-blue-600 hover:text-blue-600
             transition-colors inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* ==== RIGHT : Animation ==== */}
          <div className="relative">
            {/* --- For MP4 / WebM animation --- */}
            <video
              src="/hero-animation.mp4" // place your file in /public or use a full URL
              autoPlay
              muted
              loop
              playsInline
              className="w-full rounded-2xl shadow-2xl"
            />

            {/* Decorative “spotlight” behind the video */}
            <div className="absolute inset-0 -z-10 bg-blue-100 rounded-2xl blur-3xl opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
