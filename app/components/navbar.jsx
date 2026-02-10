"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, CreditCard, Shield, Mail, Menu, X } from "lucide-react";
import blackLogo from "../images/Black.png";
import { usePathname } from "next/navigation";

const navItems = [
  { baseLabel: "Home", path: "/", icon: Home },
  { baseLabel: "Products", path: "/#featured", icon: CreditCard },
  { baseLabel: "About", path: "/about", icon: Shield },
  { baseLabel: "Contact", path: "/contact", icon: Mail },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!pathname) return;

    if (pathname === "/about") setActiveTab("About");
    else if (pathname === "/contact") setActiveTab("Contact");
    else if (pathname === "/" && window.location.hash === "#featured") {
      setActiveTab("Products");
    } else {
      setActiveTab("Home");
    }
  }, [pathname]);

  return (
    <div className="fixed top-4 left-0 w-full z-50 flex justify-center px-4 pt-2">
      
      {/* MOBILE HAMBURGER */}
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 md:hidden p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* LOGO */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 md:left-4 md:translate-x-0">
        <Link
          href="/"
          onClick={() => setActiveTab("Home")}
          className="
            flex items-center justify-center
            h-12 sm:h-12 md:h-13 lg:h-14
            px-5 sm:px-6 md:px-8 lg:px-10
            rounded-full
            bg-white/60 backdrop-blur-md
            border border-white/30
            shadow-lg
            transition-all duration-300
            hover:bg-white/70
          "
        >
          <Image
            src={blackLogo}
            width={140}
            height={50}
            alt="Logo"
            className="
              cursor-pointer transition-all duration-300
              w-[135px]
              sm:w-[145px]
              md:w-[150px]
              lg:w-[165px]
            "
            priority
          />
        </Link>
      </div>

      {/* NAVBAR */}
      <nav
        className={`hidden md:flex h-14 lg:h-16 pointer-events-auto rounded-full border items-center transition-all duration-300
        
        md:px-4 md:py-2
        lg:px-6 lg:py-3

        ${
          isScrolled
            ? "bg-white/70 backdrop-blur-sm shadow-md border-gray-200"
            : "bg-white/60 backdrop-blur-md border-gray-100"
        }`}
      >
        <ul className="flex items-center md:space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.baseLabel;

            return (
              <li key={item.baseLabel}>
                <Link
                  href={item.path}
                  onClick={() => setActiveTab(item.baseLabel)}
                  className={`rounded-full flex items-center transition space-x-2
                  
                  md:px-3 md:py-1.5
                  lg:px-4 lg:py-2

                  ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-black hover:bg-gray-100 hover:text-black"
                  }`}
                >
                  <Icon
                    size={16}
                    className={isActive ? "text-white" : "text-black"}
                  />
                  <span className="text-sm font-medium tracking-wide">
                    {item.baseLabel}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* MOBILE DROPDOWN */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg rounded-b-2xl md:hidden animate-slideDown">
          <ul className="flex flex-col p-4 space-y-2">
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
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition
                      ${
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-black hover:bg-gray-100"
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span>{item.baseLabel}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
