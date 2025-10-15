"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";

/* -----------------------------------------------
   🔹 DisplayCard — Individual Card Component
------------------------------------------------ */
interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  isHovered?: boolean;
  isDimmed?: boolean;
  lift?: number;
}

function DisplayCard({
  className,
  icon = <Sparkles className="w-6 h-6 text-white" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName,
  titleClassName,
  isHovered = false,
  isDimmed = false,
  lift = 0,
}: DisplayCardProps) {
  /* -------------------------
     🎨 Base Card Styles
  -------------------------- */
  const baseCardStyles = cn(
    "absolute flex h-[12rem] w-[22rem] -skew-y-[9deg]",
    "select-none flex-col justify-between rounded-2xl border border-blue-100",
    "bg-white/90 p-6 shadow-md overflow-hidden",
    "transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
  );

  /* -------------------------
     💫 Hover Animation Styles
     - Lift + Scale + Shadow
  -------------------------- */
  const hoverStyles = isHovered
    ? `-translate-y-[${lift}px] scale-[1.05] shadow-2xl`
    : "";

  /* -------------------------
     🌫️ Dimmed (Non-hovered) Styles
     - Fade + Slight Scale Down
  -------------------------- */
  const dimmedStyles = isDimmed ? "opacity-10 scale-[0.97]" : "";

  /* -------------------------
     ✨ Combined Classnames
  -------------------------- */
  const combinedClass = cn(baseCardStyles, hoverStyles, dimmedStyles, className);

  /* -------------------------
     🔧 Inline Transform Logic
     - Optional fine control for movement
  -------------------------- */
  const inlineTransform = {
    transform: isHovered
      ? `translateY(-${lift}px) scale(1.05)`
      : undefined,
  };

  /* -------------------------
     🧩 Card Structure
  -------------------------- */
  return (
    <div className={combinedClass} style={inlineTransform}>
      {/* -------------------------
          🔵 Card Header (Icon + Title)
      -------------------------- */}
      <div className="flex items-center gap-5">
        <span
          className={cn(
            "relative inline-flex items-center justify-center rounded-full",
            "bg-gradient-to-b from-[#6D8EF4] to-[#3D66E1] p-2 shadow-md transition-transform duration-300",
            iconClassName
          )}
        >
          {icon}
        </span>
        <p
          className={cn(
            "text-lg font-semibold text-[#0A254F]",
            titleClassName
          )}
        >
          {title}
        </p>
      </div>

      {/* -------------------------
          📝 Card Body (Description)
      -------------------------- */}
      <p className="text-[1rem] text-slate-700 mt-2">{description}</p>

      {/* -------------------------
          ⏱️ Card Footer (Date / Tag)
      -------------------------- */}
      <p className="text-sm text-slate-500">{date}</p>
    </div>
  );
}

/* -----------------------------------------------
   🔹 DisplayCards — Container for Stacked Cards
------------------------------------------------ */
interface DisplayCardsProps {
  cards?: Omit<DisplayCardProps, "isHovered" | "isDimmed" | "lift">[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  /* -------------------------
     📚 Default Cards Config
     - Each card can have unique rotation, offset, lift, etc.
  -------------------------- */
  const defaultCards = [
    {
      className: "z-[3] translate-x-[0px] translate-y-[0px] rotate-[-2deg]",
      title: "LAS",
      description: "Learning Analytics System",
      lift: 40,
    },
    {
      className: "z-[2] translate-x-[60px] translate-y-[30px] rotate-[1deg]",
      title: "LAMF",
      description: "Learning & Management Framework",
      lift: 60,
    },
    {
      className: "z-[1] translate-x-[120px] translate-y-[60px] rotate-[-4deg]",
      title: "MTF",
      description: "Metrics & Tracking Framework",
      lift: 80,
    },
  ];

  const displayCards = (cards as any) || defaultCards;

  /* -------------------------
     🎬 Render Cards
     - Each card reacts to hover individually
  -------------------------- */
  return (
    <div className="relative w-[30rem] h-[20rem] mx-auto mt-10">
      {displayCards.map((cardProps: any, index: number) => {
        const isHovered = hoveredIndex === index;
        const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

        return (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <DisplayCard
              {...cardProps}
              isHovered={isHovered}
              isDimmed={isDimmed}
              lift={cardProps.lift}
            />
          </div>
        );
      })}
    </div>
  );
}
