"use client";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";

/* -----------------------------------------------
   🔹 Single Card Component — Fi-style Glass Cards
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
        "relative flex flex-col justify-between h-[22rem] w-[15rem] rounded-2xl p-5",
        // Glass acrylic effect
        "backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.15)]",
        // Fi chrome gradient
        isCenter
          ? "bg-[linear-gradient(145deg,rgba(255,255,255,0.90)_0%,rgba(240,240,240,0.75)_45%,rgba(220,220,220,0.55)_100%)]"
          : "bg-[linear-gradient(145deg,rgba(255,255,255,0.85)_0%,rgba(240,240,240,0.65)_45%,rgba(220,220,220,0.40)_100%)]",

        // Mask fade (removes on hover)
        isMasked ? "mask-gradient" : "mask-none",
        // Dimmed side cards
        isDimmed ? "opacity-50 scale-[0.96]" : "opacity-100",
        "transition-all duration-700 ease-out",
        className
      )}
    >
      {/* Glossy top highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/40 to-transparent" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#FF5732] to-[#ff785a] p-2 shadow-md">
          <Sparkles className="w-5 h-5 text-white" />
        </span>
        <p className="text-lg font-medium tracking-tight text-[#0A0F2C] leading-tight">
          {title}
        </p>
      </div>

      {/* Vertical Data List */}
      <div className="flex flex-col gap-4 w-full">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-start rounded-xl bg-white/60 backdrop-blur-sm py-3 px-4 shadow-sm border border-white/40"
          >
            <span className="text-gray-600 text-xs sm:text-sm">
              {item.label}
            </span>
            <span className="text-[#FF5732] font-medium tracking-tight text-sm sm:text-base mt-1">
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

  const cardLayoutClasses = [
    "z-10 rotate-[-10deg] translate-x-[25px] translate-y-[20px] opacity-50",
    "z-30 rotate-0 translate-y-[-20px]",
    "z-20 rotate-[10deg] translate-x-[-25px] translate-y-[20px] opacity-50",
  ];

  return (
    <div className="flex justify-center items-center py-20">
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
                "z-40 rotate-0 translate-x-0 scale-[1.08] opacity-100"
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
