"use client";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";

/* -----------------------------------------------
   🔹 Single Card Component — Fully Opaque Version
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
        "relative flex flex-col justify-between h-[25rem] w-[18rem] rounded-2xl p-5",
        // Opaque luxury card
        isCenter
          ? "bg-gradient-to-br from-[#ffffff] via-[#f4f4f4] to-[#ebebeb]"
          : "bg-gradient-to-br from-[#fefefe] via-[#f2f2f2] to-[#e9e9e9]",

        // Strong premium shadows
        "shadow-[0_12px_32px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.10)] border border-[#e5e5e5]",

        // Mask fade for side cards
        isMasked ? "mask-gradient" : "mask-none",

        // Dim effect on side cards
        isDimmed ? "opacity-60 scale-[0.96]" : "opacity-100",

        "transition-all duration-700 ease-out",
        className
      )}
    >
      {/* Gloss highlight (now subtle + opaque) */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/90 to-transparent" />

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
            className="flex flex-col justify-start rounded-xl bg-[#ffffff] py-4 px-4 shadow-sm border border-[#e2e2e2]"
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

  // Layout positions
  const cardLayoutClasses = [
    "z-10 rotate-[-10deg] translate-x-[25px] translate-y-[20px]",
    "z-30 rotate-0 translate-y-[-20px]",
    "z-20 rotate-[10deg] translate-x-[-25px] translate-y-[20px]",
  ];

  return (
    // Increased responsive top margin to ensure spacing from buttons above
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
                isHovered &&
                  "z-40 rotate-0 translate-x-0 scale-[1.10] opacity-100"
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
