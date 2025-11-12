"use client";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

/* -----------------------------------------------
   🔹 Single Card Component
------------------------------------------------ */
function DisplayCard({
  title,
  data,
  isDimmed = false,
}: {
  title: string;
  data: { label: string; value: string }[];
  isDimmed?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between h-[17rem] w-[25rem] rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-md p-5 shadow-lg transition-all duration-500 hover:-translate-y-[4px]",
        isDimmed ? "opacity-50 scale-[0.97]" : "opacity-100"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#FF5732] to-[#ff785a] p-2 shadow-md">
          <Sparkles className="w-5 h-5 text-white" />
        </span>
        <p className="text-lg font-semibold text-[#0A0F2C] leading-tight">
          {title}
        </p>
      </div>

      {/* 2×2 Grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center rounded-xl bg-[#f9fafb] py-3 shadow-sm border border-gray-100"
          >
            <span className="text-gray-500 text-xs sm:text-sm">
              {item.label}
            </span>
            <span className="text-[#FF5732] font-semibold text-sm sm:text-base mt-1">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------
   🔹 DisplayCards — perfectly balanced row
------------------------------------------------ */
export default function DisplayCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cards = [
    {
      title: "Loan Against Shares",
      data: [
        { label: "Interest Range", value: "8–20% p.a." },
        { label: "Tenure", value: "Up to 36 months" },
        { label: "Disbursal Time", value: "1–2 Days" },
        { label: "Collateral Type", value: "Listed Shares" },
      ],
    },
    {
      title: "Loan Against Mutual Funds",
      data: [
        { label: "Interest Range", value: "9–18% p.a." },
        { label: "Tenure", value: "Up to 24 months" },
        { label: "Disbursal Time", value: "1–3 Days" },
        { label: "Collateral Type", value: "Mutual Fund Units" },
      ],
    },
    {
      title: "Loan Against Bonds",
      data: [
        { label: "Interest Range", value: "10–15% p.a." },
        { label: "Tenure", value: "Up to 48 months" },
        { label: "Disbursal Time", value: "2–4 Days" },
        { label: "Collateral Type", value: "Corporate Bonds" },
      ],
    },
  ];

  return (
    <div
      className="
        relative w-full flex justify-center
        mt-[-6rem] mb-[6rem]
        pointer-events-none
      "
    >
      

      {/* Cards Row */}
      <div
        className="
          flex justify-center items-center gap-14
          w-[85%] 
          relative z-10 pointer-events-auto
        "
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.6, ease: 'easeOut' }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.25, ease: 'easeOut' },
            }}
            className="transition-all duration-300"
          >
            <DisplayCard
              {...card}
              isDimmed={hoveredIndex !== null && hoveredIndex !== i}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
