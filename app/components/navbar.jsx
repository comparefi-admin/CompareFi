'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, CreditCard, Shield, Mail, Menu, X } from 'lucide-react';
import blackLogo from '../images/Black.png';
import whiteLogo from '../images/white.png';
import { usePathname } from "next/navigation";

const navItems = [
  { baseLabel: 'Home', path: '/', icon: Home },
  { baseLabel: 'Products', path: '/#featured', icon: CreditCard },
  { baseLabel: 'About', path: '/about', icon: Shield },
  { baseLabel: 'Contact', path: '/contact', icon: Mail },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 🆕 We track active manually — NOT from URL
const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
const pathname = usePathname();

useEffect(() => {
  if (!pathname) return;

  if (pathname === "/about") {
    setActiveTab("About");
  } else if (pathname === "/contact") {
    setActiveTab("Contact");
  } else if (pathname === "/" && window.location.hash === "#featured") {
    setActiveTab("Products");
  } else {
    setActiveTab("Home");
  }
}, [pathname]);

  return (
    <div className="fixed top-4 left-0 w-full z-50 flex items-center justify-center px-4">

      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <Link
          href="/"
          onClick={() => setActiveTab('Home')}
          className="flex-shrink-0"
        >
          <Image
            src={!isScrolled && activeTab === 'Home' ? whiteLogo : blackLogo}
            width={170}
            height={80}
            alt="Logo"
            className="cursor-pointer transition-opacity duration-300"
          />
        </Link>
      </div>

      <nav
        className={`h-16 pointer-events-auto rounded-full border px-6 py-3 transition-all duration-300 flex justify-center
          ${isScrolled
            ? 'bg-white/70 backdrop-blur-sm shadow-md border-gray-200'
            : 'bg-white/60 backdrop-blur-md border-gray-100'
          }`}
      >
        <ul className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.baseLabel;

            return (
              <li key={item.baseLabel}>
                <Link
                  href={item.path}
                  onClick={() => setActiveTab(item.baseLabel)}
                  className={`px-4 py-2 rounded-full flex items-center space-x-2 transition
                    ${isActive ? 'bg-gray-900 text-white' : 'text-gray-820 hover:bg-gray-100 hover:text-black'}
                  `}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-gray-400'} />
                  <span className="text-sm font-medium tracking-wide">{item.baseLabel}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="md:hidden flex items-center justify-end">
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 rounded-b-2xl shadow-md md:hidden">
            <ul className="flex flex-col space-y-1 p-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.baseLabel;

                return (
                  <li key={item.baseLabel}>
                    <Link
                      href={item.path}
                      onClick={() => {
                        setActiveTab(item.baseLabel);
                        setMobileOpen(false);
                      }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition
                        ${isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}
                      `}
                    >
                      <Icon size={16} />
                      <span className="font-medium">{item.baseLabel}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>

    </div>
  );
}
