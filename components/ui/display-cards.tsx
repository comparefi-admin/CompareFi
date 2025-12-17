"use client";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";

/* -----------------------------------------------
   Single Card Component — Card Look Matched
------------------------------------------------ */
function DisplayCard({
  title,
  data,
  isMasked = true,
  isDimmed = false,
  isCenter = false,
  className,
}: {
  title: string;
  data: { label: string; value: string }[];
  isMasked?: boolean;
  isDimmed?: boolean;
  isCenter?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between h-[25rem] w-[18rem] rounded-[1.8rem] p-5",

        // Card surface: close to flat white/grey like the reference
        isCenter
          ? "bg-gradient-to-b from-[#fdfefe] via-[#f4f5f8] to-[#e8ebf2]" // center
          : "bg-gradient-to-b from-[#f7f8fb] via-[#eceff4] to-[#e0e4ee]", // sides

        // Very soft border + strong but smooth drop shadow
        "border border-[#f5f6fb] shadow-[0_18px_45px_rgba(0,0,0,0.30)]",

        // Side-card fade
        isMasked ? "mask-gradient" : "mask-none",

        // Side-card dim
        isDimmed ? "opacity-55 scale-[0.96]" : "opacity-100",

        "transition-all duration-700 ease-out",
        className
      )}
    >
      {/* Subtle bottom glow (like the central light in the sample image) */}
      <div className="pointer-events-none absolute inset-x-6 bottom-[-18px] h-16 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent)]" />

      {/* Very light top sheen */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] bg-gradient-to-b from-white/28 via-transparent to-transparent" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#FF5732] to-[#ff6a50] p-2 shadow-md">
          <Sparkles className="w-5 h-5 text-white" />
        </span>
        <p className="text-lg font-medium tracking-tight text-[#0A0F2C] leading-tight">
          {title}
        </p>
      </div>

      {/* Data List */}
      <div className="flex flex-col gap-4 w-full relative z-10">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-start rounded-xl bg-white/95 py-4 px-4 shadow-sm border border-[#e1e5f0]"
          >
            <span className="text-gray-600 text-xs sm:text-sm">
              {item.label}
            </span>
            <span className="text-[#FF5732] font-semibold tracking-tight text-sm sm:text-base mt-1">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------
   3D Tilt Layout Display
------------------------------------------------ */
export default function DisplayCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const cards = [
  {
    title: "Margin Trading Facility (MTF)",
    data: [
      { label: "Interest", value: "7–19%" },
      { label: "Type of Collateral", value: "Cash + Stocks" },
      { label: "Holding Period", value: "365 Days / Unlimited" },
    ],
  },
  {
    title: "Loan Against Shares (LAS)",
    data: [
      { label: "Interest Rate", value: "8–20%" },
      { label: "Funding Amount", value: "20–80%" },
      { label: "Tenure", value: "12–36 Months" },
    ],
  },
  {
    title: "Loan Against Mutual Funds (LAMF)",
    data: [
      { label: "Interest Rate", value: "8–20%" },
      { label: "Funding Amount", value: "45–80%" },
      { label: "Tenure", value: "12–36 Months" },
    ],
  },
];



  // Layout positions
  const cardLayoutClasses = [
    "z-10 rotate-[-12deg] translate-x-[30px] translate-y-[24px]",
    "z-30 rotate-0 translate-y-[-24px]",
    "z-20 rotate-[12deg] translate-x-[-30px] translate-y-[24px]",
  ];

  return (
    <div className="flex justify-center items-center py-20 mt-2 scale-[1.20] origin-top">
      <div className="flex justify-center items-center -space-x-20 pointer-events-auto">
        {cards.map((card, i) => {
          const layoutClass = cardLayoutClasses[i];
          const isHovered = hoveredIndex === i;
          const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

          return (
            <div
              key={i}
              className={cn(
                "transition-all duration-700 ease-out",
                layoutClass,
                // float + straighten + zoom on hover for ALL cards
                isHovered &&
                  "z-40 rotate-0 translate-y-[-70px] translate-x-0 scale-[1.14] opacity-100"
              )}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <DisplayCard
                {...card}
                isDimmed={isDimmed}
                isMasked={!isHovered}
                isCenter={i === 1}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
