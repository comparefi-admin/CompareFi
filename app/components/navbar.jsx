'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CreditCard, Shield, Mail } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* NAV ITEMS                                                          */
/* ------------------------------------------------------------------ */
const navItems = [
  {
    baseLabel: 'Home',
    path: '/',                 // homepage
    icon: Home,
    dropdown: [
      { label: 'Hero',             hash: '#hero' },
      { label: 'Featured Products',hash: '#featured' },
      { label: 'Contact Info',     hash: '#contact' },
    ],
  },
  {
    baseLabel: 'Products',
    path: '/products',         // products page
    icon: CreditCard,
    dropdown: [
      { label: 'LAS',  hash: '#las' },
      { label: 'LAMF', hash: '#lamf' },
      { label: 'MTF',  hash: '#mtf' },
    ],
  },
  {
    baseLabel: 'About',
    path: '/about',
    icon: Shield,
    dropdown: [
      { label: 'Story', hash: '#story' },
      { label: 'Team',  hash: '#team' },
    ],
  },
  {
    baseLabel: 'Contact',
    path: '/contact',
    icon: Mail,
    dropdown: [
      { label: 'Support',   hash: '#support' },
      { label: 'Locations', hash: '#locations' },
    ],
  },
];

/* Smooth‑scroll when landing on a hash ---------------------------------- */
function useSmoothHashScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const id = hash.slice(1);
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(t);
  }, [pathname]);
}

/* ------------------------------------------------------------------ */
/* NAVBAR COMPONENT                                                   */
/* ------------------------------------------------------------------ */
export default function Navbar() {
  const pathname = usePathname();
  const [dynamicLabels, setDynamicLabels] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  useSmoothHashScroll();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* helpers */
  const resetLabel = (path) => setDynamicLabels((p) => ({ ...p, [path]: undefined }));
  const setLabel   = (path, lbl) => setDynamicLabels((p) => ({ ...p, [path]: lbl }));

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full border px-6 py-3
                 transition-all duration-300
                 ${isScrolled
                   ? 'bg-white/70 backdrop-blur-sm shadow-md border-gray-200'
                   : 'bg-white/60 backdrop-blur-md border-gray-100'}`}
    >
      <ul className="hidden md:flex items-center space-x-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          const label = dynamicLabels[item.path] || item.baseLabel;

          return (
            <li key={item.baseLabel} className="relative group">
              {/* Trigger */}
              <Link
                href={item.path}
                onClick={() => resetLabel(item.path)}
                className={`px-4 py-2 rounded-full flex items-center space-x-2 transition
                            ${isActive
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-black'} />
                <span className="text-sm font-medium tracking-wide">{label}</span>
              </Link>

              {/* Dropdown */}
              {item.dropdown && (
                <ul
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1
                             hidden group-hover:block group-focus-within:block
                             bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700
                             rounded-xl shadow-lg p-2 space-y-1"
                >
                  {item.dropdown.map((sub) => {
                    const href = `${item.path}${sub.hash}`;
                    return (
                      <Link
                        key={sub.label}
                        href={href}
                        prefetch={false}
                        onClick={(e) => {
                          if (pathname === item.path && typeof window !== 'undefined') {
                            e.preventDefault();
                            setLabel(item.path, sub.label);
                            const el = document.querySelector(sub.hash);
                            if (el) {
                              window.history.pushState(null, '', href);
                              el.scrollIntoView({ behavior: 'smooth' });
                            }
                          } else {
                            /* navigating away; label will show after navigation */
                            setLabel(item.path, sub.label);
                          }
                        }}
                        className="block whitespace-nowrap px-4 py-2 text-sm rounded-lg
                                   text-gray-700 dark:text-gray-300
                                   hover:bg-gray-100 dark:hover:bg-zinc-800"
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
