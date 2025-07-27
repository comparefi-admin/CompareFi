'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CreditCard, Shield, Mail } from 'lucide-react';

const navItems = [
  {
    baseLabel: 'Home',
    path: '/',
    icon: Home,
    dropdown: [
      { label: 'Home', hash: '#hero' },
      { label: 'Featured Products', hash: '#featured' },
      { label: 'Contact Info', hash: '#contact' },
    ],
  },
  {
    baseLabel: 'Products',
    path: '/products',
    icon: CreditCard,
    dropdown: [
      { label: 'LAS', hash: '#las' },
      { label: 'LAMF', hash: '#lamf' },
      { label: 'MTF', hash: '#mtf' },
    ],
  },
  {
    baseLabel: 'About',
    path: '/about',
    icon: Shield,
    dropdown: [
      { label: 'Story', hash: '#story' },
      { label: 'Team', hash: '#team' },
    ],
  },
  {
    baseLabel: 'Contact',
    path: '/contact',
    icon: Mail,
    dropdown: [
      { label: 'Support', hash: '#support' },
      { label: 'Locations', hash: '#locations' },
    ],
  },
];

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

function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!sectionIds.length) return;
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

export default function Navbar() {
  const pathname = usePathname();
  const [clickLabels, setClickLabels] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const isHomePage = pathname === '/';

  useSmoothHashScroll();

  const allIds = navItems.flatMap((n) => n.dropdown?.map((d) => d.hash.slice(1)) ?? []);
  const activeSection = useScrollSpy(allIds);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const setLabel = (path, lbl) => setClickLabels((p) => ({ ...p, [path]: lbl }));
  const resetLabel = (path) => setClickLabels((p) => ({ ...p, [path]: undefined }));

  const homepageSectionToNavItem = {
    featured: 'Products',
    contact: 'Contact',
  };

  return (
    <div className="fixed top-4 left-0 w-full z-50 flex justify-center pointer-events-none">
      <nav
        className={`pointer-events-auto rounded-full border px-6 py-3 transition-all duration-300
        ${isScrolled
          ? 'bg-white/70 backdrop-blur-sm shadow-md border-gray-200'
          : 'bg-white/60 backdrop-blur-md border-gray-100'
        }`}
      >
        <ul className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActivePage = pathname === item.path;
            const labelMatch = item.dropdown?.find((d) => d.hash.slice(1) === activeSection);

            let label;
            if (item.baseLabel === 'Home' && isHomePage) {
              label = 'Home';
            } else {
              label = clickLabels[item.path] || (labelMatch?.label ?? item.baseLabel);
            }

            const shouldHighlight =
              isHomePage && homepageSectionToNavItem[activeSection] === item.baseLabel;

            return (
              <li key={item.baseLabel} className="relative group">
                <Link
                  href={item.path}
                  onClick={() => resetLabel(item.path)}
                  className={`px-4 py-2 rounded-full flex items-center space-x-2 transition
                    ${isActivePage ? 'bg-gray-900 text-white' : 'text-gray-820 hover:bg-gray-100 hover:text-black'}
                    ${shouldHighlight ? 'ring-2 ring-blue-900 bg-gray-300 text-gray-900 ring-offset-2' : ''}
                  `}
                >
                  <Icon
                    size={16}
                    className={isActivePage ? 'text-white' : 'text-gray-400 group-hover:text-black'}
                  />
                  <span className="text-sm font-medium tracking-wide">{label}</span>
                </Link>

                {item.dropdown && (
                  <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block group-focus-within:block bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg p-2 space-y-1">
                    {item.dropdown.map((sub) => {
                      const href = `${item.path}${sub.hash}`;
                      return (
                        <Link
                          key={sub.label}
                          href={href}
                          prefetch={false}
                          onClick={(e) => {
                            if (isActivePage && typeof window !== 'undefined') {
                              e.preventDefault();
                              setLabel(item.path, sub.label);
                              const el = document.querySelector(sub.hash);
                              if (el) {
                                window.history.pushState(null, '', href);
                                el.scrollIntoView({ behavior: 'smooth' });
                              }
                            } else {
                              setLabel(item.path, sub.label);
                            }
                          }}
                          className="block whitespace-nowrap px-4 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
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
    </div>
  );
}
