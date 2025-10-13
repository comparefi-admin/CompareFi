"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React from "react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="w-6 h-6 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-[12rem] w-[22rem] -skew-y-[9deg] select-none flex-col justify-between rounded-2xl border-2 bg-muted/50 p-6 shadow-md transition-all duration-700 hover:-translate-y-4 hover:shadow-lg hover:shadow-blue-500/20 overflow-hidden after:absolute after:inset-0 after:-z-10 after:rounded-2xl after:bg-gradient-to-l after:from-background/70 after:to-transparent after:pointer-events-none after:mix-blend-overlay [&>*]:flex [&>*]:items-center [&>*]:gap-4",
        className
      )}
    >
      <div>
        <span className={cn("relative inline-block rounded-full bg-blue-800 p-1", iconClassName)}>
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="text-lg">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  // Default stacked cards with sequential animation and spacing
  const defaultCards = [
    {
      className: "animate-hover-cycle delay-[0ms] translate-x-0 translate-y-0 z-[3]",
    },
    {
      className: "animate-hover-cycle delay-[1000ms] translate-x-24 translate-y-12 z-[2]",
    },
    {
      className: "animate-hover-cycle delay-[2000ms] translate-x-48 translate-y-24 z-[1]",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="relative grid [grid-template-areas:'stack'] place-items-center gap-6">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
