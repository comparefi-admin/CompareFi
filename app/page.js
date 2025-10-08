'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { motion } from 'framer-motion';
import { Briefcase, LineChart, BarChart3, Shield, CreditCard, TrendingUp } from 'lucide-react';

// ShadCN components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider } from '@/components/ui/tooltip';

// Fonts
import { Instrument_Serif, Outfit, Bebas_Neue } from 'next/font/google';
const instrument = Instrument_Serif({ weight: ['400'], subsets: ['latin'] });
const outfit = Outfit({ weight: ['300','400','600'], subsets: ['latin'] });
const bebas = Bebas_Neue({ weight: ['400'], subsets: ['latin'] });

// Data
const PRODUCTS = [
  {
    id: 'las',
    title: 'Loan Against Securities (LAS)',
    blurb: 'Unlock liquidity from your portfolio without selling core holdings.',
    bullets: ['Borrow up to 70% of eligible securities', 'Minimal documentation', 'Flexible repayment schedules'],
    icon: <Briefcase className="w-6 h-6" />,
    color: 'from-emerald-400 to-emerald-600',
    metrics: [
      { name: 'Liquidity', value: 80, color: '#10B981' },
      { name: 'Cost', value: 40, color: '#34D399' },
      { name: 'Complexity', value: 30, color: '#6EE7B7' },
      { name: 'Turnaround', value: 70, color: '#A7F3D0' },
    ],
  },
  {
    id: 'lamf',
    title: 'Loan Against Mutual Funds (LAMF)',
    blurb: 'Quick cash against mutual investments — no redemption required.',
    bullets: ['Instant approval for qualifying funds', 'No exit-loads', 'Linked to NAVs for simplicity'],
    icon: <LineChart className="w-6 h-6" />,
    color: 'from-pink-400 to-pink-600',
    metrics: [
      { name: 'Liquidity', value: 70, color: '#F472B6' },
      { name: 'Cost', value: 50, color: '#F9A8D4' },
      { name: 'Complexity', value: 35, color: '#FBCFE8' },
      { name: 'Turnaround', value: 80, color: '#FEE2E2' },
    ],
  },
  {
    id: 'mtf',
    title: 'Margin Trading Facility (MTF)',
    blurb: 'Amplify buying power with controlled leverage for active traders.',
    bullets: ['Leverage up to 4x', 'Transparent interest & margin calls', 'Real-time risk monitoring'],
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'from-indigo-400 to-indigo-600',
    metrics: [
      { name: 'Liquidity', value: 60, color: '#6366F1' },
      { name: 'Cost', value: 30, color: '#818CF8' },
      { name: 'Complexity', value: 60, color: '#A5B4FC' },
      { name: 'Turnaround', value: 50, color: '#C7D2FE' },
    ],
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const [parallaxIcons, setParallaxIcons] = useState([]);

  // Create multiple copies of the three icons (client-side only)
  useEffect(() => {
    const iconsData = [Shield, CreditCard, TrendingUp];
    const NUM_ICONS = 15;

    const icons = Array.from({ length: NUM_ICONS }).map((_, i) => {
      const Icon = iconsData[i % iconsData.length];
      return {
        Icon,
        id: `${Icon.name}-${i}`,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 30 + Math.random() * 50,
        color: ['text-emerald-300','text-pink-300','text-indigo-300'][i % 3],
        speed: 0.1 + Math.random() * 0.4,
        floatOffset: Math.random() * 20,
        floatSpeed: 1 + Math.random() * 1.5
      };
    });

    setParallaxIcons(icons);
  }, []);

  const handleMouseMove = (e) => {
    parallaxIcons.forEach(icon => {
      const el = document.getElementById(icon.id);
      if (el) {
        const moveX = (e.clientX - window.innerWidth / 2) * icon.speed;
        const moveY = (e.clientY - window.innerHeight / 2) * icon.speed;
        el.style.transform = `translate(${moveX}px, ${moveY + Math.sin(Date.now()/1000*icon.floatSpeed)*icon.floatOffset}px)`;
      }
    });
  };

  return (
    <TooltipProvider>
      <div
        className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Navbar */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
          <Navbar />
        </div>

        <main className="flex-grow pt-24 sm:pt-28">

          {/* HERO */}
          <section
            ref={heroRef}
            className="relative max-w-7xl mx-auto px-4 py-16 md:py-20 flex flex-col gap-12 items-start text-center md:text-left overflow-hidden"
          >
            {parallaxIcons.map(({ Icon, id, x, y, size, color }) => (
              <Icon
                key={id}
                id={id}
                className={`${color} absolute`}
                style={{
                  top: y,
                  left: x,
                  width: size,
                  height: size,
                  zIndex: 0,
                  opacity: 0.15,
                }}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-6 w-full relative z-10"
            >
              <Badge className="text-sm sm:text-base md:text-lg px-3 py-1 rounded-full bg-gradient-to-r from-emerald-200 to-emerald-300 text-emerald-800">
                Curated by CA Het Doshi
              </Badge>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-extrabold" style={{ fontFamily: "'SF Pro Display', serif" }}>
                CompareFi
              </h1>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-700">
                Financial products, explained and compared — so you don’t have to guess.
              </h2>

              <p className={`${outfit.className} text-base sm:text-lg text-slate-600 max-w-4xl mx-auto md:mx-0`}>
                CompareFi gives you a concise, trustworthy summary of lending & trading solutions — LAS, LAMF and MTF — curated by CA Het Doshi. Clear metrics, practical guidance, and eligibility checks to act with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
                <Link href="/products"><Button className="px-8 py-4 sm:px-10 sm:py-6">Explore Products</Button></Link>
                <Link href="/about"><Button variant="outline" className="px-8 py-4 sm:px-10 sm:py-6">About Het</Button></Link>
              </div>

              {/* Feature Icons */}
              <div className="mt-12 flex flex-col sm:flex-row flex-wrap gap-8 sm:gap-12 justify-center md:justify-start">
                <div className="flex items-center gap-4 sm:gap-6">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500" />
                  <div>
                    <div className="text-base sm:text-lg font-semibold">Transparent Fees</div>
                    <div className="text-sm text-slate-500">No hidden charges</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500" />
                  <div>
                    <div className="text-base sm:text-lg font-semibold">Fast Decisions</div>
                    <div className="text-sm text-slate-500">Quick eligibility & turnaround</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500" />
                  <div>
                    <div className="text-base sm:text-lg font-semibold">Data-first</div>
                    <div className="text-sm text-slate-500">Metrics you can trust</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* PRODUCT HIGHLIGHTS */}
          <Card className='bg-gray-200'>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
              <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">Product Highlights</h2>
              <div className="flex flex-wrap gap-8 justify-center">
                {PRODUCTS.map((p, idx) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                  >
                    <Card
                      className="w-full sm:w-80 md:w-96 bg-white/90 backdrop-blur-md hover:shadow-2xl transition-shadow rounded-3xl p-6"
                    >
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-xl font-bold">{p.title}</CardTitle>
                        <CardDescription className="text-base text-slate-600">{p.blurb}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="grid grid-cols-2 gap-4">
                          {p.metrics.map((m, idx2) => (
                            <div key={idx2} className="flex flex-col">
                              <div className="text-sm text-slate-500">{m.name}</div>
                              <div className="h-3 w-full bg-gray-200 rounded-full mt-1 overflow-hidden">
                                <motion.div
                                  className="h-3 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${m.value}%` }}
                                  transition={{ duration: 1, delay: 0.3 }}
                                  style={{ background: m.color }}
                                ></motion.div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                          <Link href={`/products/${p.id}`} >
                            <Button className='py-3 px-5 w-full sm:w-auto'>Learn More</Button>
                          </Link>
                          <Link href={`/products/${p.id}#eligibility`}>
                            <Button variant="ghost" className='py-3 px-5 w-full sm:w-auto'>Check Eligibility</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          </Card>

          {/* COMPARE PRODUCTS */}
          <Card className="bg-gray-50">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center">Compare Products</h2>
              <Tabs defaultValue="las">
               <TabsList
  className="
   mb-7
  "
>
  {PRODUCTS.map((p) => (
    <TabsTrigger
      key={p.id}
      value={p.id}
      className="
        text-base 
        sm:text-lg 
        px-4 
        sm:px-6 
        py-2 
        sm:py-3 
        rounded-xl
        whitespace-nowrap
        transition
        font-medium
        focus-visible:ring-2
        focus-visible:ring-emerald-400
      "
    >
      {p.title.split('(')[0].trim()}
    </TabsTrigger>
  ))}
</TabsList>


                {PRODUCTS.map((p) => (
                  <TabsContent key={p.id} value={p.id}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                      <div className="grid md:grid-cols-2 gap-10 items-start text-center md:text-left">
                        {/* Left Info */}
                        <div>
                          <h4 className="text-2xl font-semibold">{p.title}</h4>
                          <p className="text-lg text-slate-700 mt-3">{p.blurb}</p>
                          <ul className="mt-6 text-base text-slate-700 space-y-3">
                            {p.bullets.map((b, i) => (
                              <li key={i}>• {b}</li>
                            ))}
                          </ul>
                          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link href={`/products/${p.id}`}><Button size="lg">Deep Dive</Button></Link>
                            <Link href={`/contact`}><Button variant="outline" size="lg">Talk to Het</Button></Link>
                          </div>
                        </div>

                        {/* Right Metrics */}
                        <div>
                          <Card className="p-6 rounded-3xl shadow-lg">
                            <CardContent className="p-4">
                              <div className="text-sm text-slate-500 font-medium">Quick metrics</div>
                              <div className="mt-4 grid grid-cols-2 gap-6">
                                {p.metrics.map((m, idx) => (
                                  <div key={idx} className="text-base">
                                    <div className="text-sm text-slate-500">{m.name}</div>
                                    <div className="text-lg font-semibold">{m.value}%</div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                          <div className="mt-6 text-base text-slate-700">
                            <div className="font-semibold">Example</div>
                            <div className="mt-2">
                              Borrow ₹1,00,000 on a portfolio worth ₹2,00,000 vs alternatives — clear numbers, no surprises.
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </Tabs>
            </section>
          </Card>

          {/* FEATURES */}
          <Card className="bg-gray-200">
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
              {[ /* ...features array (unchanged) */ ].map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i*0.2 }}>
                  <Card className="p-8 rounded-3xl shadow-lg">
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl font-semibold">{f.title}</CardTitle>
                      <CardDescription className="text-base text-slate-600 mt-1">{f.desc}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-6">
                      <ul className="list-disc list-inside text-base text-slate-700 space-y-3">
                        {f.points.map((pt, j) => <li key={j}>{pt}</li>)}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </section>
          </Card>

          {/* CTA */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-emerald-400 to-indigo-500 text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Ready to get clarity?</h3>
                <p className="text-base sm:text-lg md:text-xl mt-3 max-w-xl mx-auto md:mx-0">
                  Compare products, check eligibility, and act confidently — all in one place.
                </p>
              </div>
              <Link href="/contact">
                <Button size="lg" className="px-10 py-4">Talk to Het</Button>
              </Link>
            </motion.div>
          </section>

        </main>

        <Footer />
      </div>
    </TooltipProvider>
  );
}
