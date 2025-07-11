'use client';

import React, { useEffect, useState } from 'react';
import { Home, CreditCard, Shield, PiggyBank } from 'lucide-react';

const navSections = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'products', label: 'Products', icon: CreditCard },
  { id: 'about', label: 'About', icon: Shield },
  { id: 'resources', label: 'Resources', icon: PiggyBank },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const offset = window.scrollY + 100;

      let foundSection = false;
      for (const section of navSections) {
        const el = document.getElementById(section.id);
        if (
          el &&
          (section.id === 'home'
            ? window.scrollY < 200
            : offset >= el.offsetTop && offset < el.offsetTop + el.offsetHeight)
        ) {
          setActiveSection(section.id);
          foundSection = true;
          break;
        }
      }

      if (!foundSection && window.scrollY < 200) {
        setActiveSection('home');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full border transition-all duration-300
        ${isScrolled 
          ? 'bg-white/70 shadow-md border-gray-200 backdrop-blur-sm' 
          : 'bg-white/60 border-gray-100 backdrop-blur-md'
        }`}
    >
      <div className="px-6 py-3">
        <div className="hidden md:flex items-center space-x-2">
          {navSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative px-4 py-2 rounded-full transition-all duration-200 flex items-center space-x-2 group ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-black'} />
                <span className="text-sm font-medium tracking-wide">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
