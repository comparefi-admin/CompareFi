"use client";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";

/* -----------------------------------------------
   🔹 Single Card Component (Now with fade bottom)
------------------------------------------------ */
function DisplayCard({
  title,
  data,
  isDimmed = false,
  className,
}: {
  title: string;
  data: { label: string; value: string }[];
  isDimmed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // Card baseline styles
        "flex flex-col justify-between h-[22rem] w-[15rem] rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-md p-5 shadow-lg transition-all duration-500 hover:-translate-y-[4px]",
        // 🔥 Gradient fade added here
        "mask-gradient",
        // Dim effect
        isDimmed ? "opacity-50 scale-[0.97]" : "opacity-100",
        className
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

      {/* Vertical Data List */}
      <div className="flex flex-col gap-4 w-full">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-start rounded-xl bg-[#f9fafb] py-3 px-4 shadow-sm border border-gray-100"
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
   🔹 3D Tilt Layout Display
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
      ],
    },
    {
      title: "Loan Against Mutual Funds",
      data: [
        { label: "Interest Range", value: "9–18% p.a." },
        { label: "Tenure", value: "Up to 24 months" },
        { label: "Disbursal Time", value: "1–3 Days" },
      ],
    },
    {
      title: "Loan Against Bonds",
      data: [
        { label: "Interest Range", value: "10–15% p.a." },
        { label: "Tenure", value: "Up to 48 months" },
        { label: "Disbursal Time", value: "2–4 Days" },
      ],
    },
  ];

  // Card tilt & overlay stacking
  const cardLayoutClasses = [
    "z-10 rotate-[-10deg] translate-x-[25px] opacity-50",
    "z-30 rotate-0",
    "z-20 rotate-[10deg] translate-x-[-25px] opacity-50",
  ];

  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex justify-center items-center -space-x-20 pointer-events-auto">
        {cards.map((card, i) => {
          const layoutClass = cardLayoutClasses[i];

          return (
            <div
              key={i}
              className={cn(
                "transition-all duration-700 ease-out",
                layoutClass,
                // Hover effect: bring card forward
                hoveredIndex === i
                  ? "z-40 rotate-0 translate-x-0 scale-[1.05] opacity-100"
                  : ""
              )}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <DisplayCard
                {...card}
                isDimmed={hoveredIndex !== null && hoveredIndex !== i}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
