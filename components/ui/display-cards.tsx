"use client";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";

function DisplayCard({ title, data, isMasked = true, isDimmed = false, isCenter = false, className }: any) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-[1.8rem] p-5",
        "h-[clamp(22rem,24vw,25rem)] w-[clamp(16rem,18vw,18rem)]",
        isCenter
          ? "bg-gradient-to-b from-[#fdfefe] via-[#f4f5f8] to-[#e8ebf2]"
          : "bg-gradient-to-b from-[#f7f8fb] via-[#eceff4] to-[#e0e4ee]",
        "border border-[#f5f6fb] shadow-[0_18px_45px_rgba(0,0,0,0.30)]",
        isMasked ? "mask-gradient" : "mask-none",
        isDimmed ? "opacity-55" : "opacity-100",
        "transition-all duration-700 ease-out",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#FF5732] to-[#ff6a50] p-2 shadow-md">
          <Sparkles className="w-5 h-5 text-white" />
        </span>
        <p className="text-lg font-medium tracking-tight text-[#0A0F2C] leading-tight">{title}</p>
      </div>

      <div className="flex flex-col gap-4 w-full relative z-10">
        {data.map((item: any, idx: number) => (
          <div key={idx} className="flex flex-col rounded-xl bg-white/95 py-4 px-4 shadow-sm border border-[#e1e5f0]">
            <span className="text-gray-600 text-xs sm:text-sm">{item.label}</span>
            <span className="text-[#FF5732] font-semibold tracking-tight text-sm sm:text-base mt-1">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

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

  return (
    <div className="relative w-full flex flex-col items-center overflow-visible">
      
      {/* BACKGROUND STARS */}
      <img
        src="/icons/Group 23 (2).svg"
        alt=""
        className="absolute bottom-20 left-[10%] w-[500px] opacity-100 pointer-events-none rotate-[-10deg] scale-x-[-1] z-0"
      />
      <img
        src="/icons/Group 23 (2).svg"
        alt=""
        className="absolute bottom-20 right-[10%] w-[500px] opacity-100 pointer-events-none rotate-[10deg] scale-x-[-1] z-0"
      />

      {/* SAME LAYOUT ALL SCREENS — ONLY SCALE CHANGES */}
      <div className="relative z-10 w-full flex justify-center pt-10 pb-32 overflow-visible">
        
        <div className="
          flex justify-center items-center
          -space-x-20
          scale-[0.65] xs:scale-[0.72] sm:scale-[0.85] md:scale-[0.95] lg:scale-[1.1]
          transition-all duration-500 origin-center
          overflow-visible
        ">
          {cards.map((card, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "transition-all duration-700 ease-out transform-gpu will-change-transform",

                  // CONSTANT TILT + POSITION (All Screens)
                  i === 0 && !isHovered && "rotate-[-12deg] translate-y-6 translate-x-12 z-10",
                  i === 1 && !isHovered && "-translate-y-6 z-20",
                  i === 2 && !isHovered && "rotate-[12deg] translate-y-6 -translate-x-12 z-10",

                  // Hover stays same
                  isHovered && "z-[150] rotate-0 -translate-y-20 scale-110"
                )}
              >
                <DisplayCard 
                  {...card} 
                  isDimmed={hoveredIndex !== null && !isHovered} 
                  isMasked={!isHovered} 
                  isCenter={i === 1} 
                />
              </div>
            );
          })}
        </div>

      </div>

      {/* FADE OVERLAY */}
      <div 
        className="absolute bottom-0 inset-x-0 h-64 pointer-events-none z-[40]"
        style={{
          background: 'linear-gradient(to top, #EFF3F6 25%, transparent 100%)'
        }}
      />
    </div>
  );
}
