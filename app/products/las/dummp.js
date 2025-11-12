
<section className="w-full py-10 px-6 sm:px-10 lg:px-20 mb-[5%] overflow-hidden">
  <SpotlightCard
    className="flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-20 rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl transition-all duration-700 border-none"
    spotlightColor="rgba(255,255,255,0.4)"
  >
    {/* Left Section (Image) */}
    <div className="w-full lg:w-1/2 flex justify-center items-center">
      <div className="w-[95%] max-w-xl">
        <Image
          src={pc}
          alt="CompareFi Overview"
          className="w-full h-auto mix-blend-multiply scale-105 sm:scale-110"
        />
      </div>
    </div>

    {/* Right Section (Text + Cards) */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left mt-8 lg:mt-0">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0F2C] mb-4 leading-tight break-words">
        Why CompareFi?
      </h2>

      <p className="text-[#4B5563] mb-6 sm:text-sm md:text-lg lg:text-2xl leading-relaxed break-words">
        Empowering you to see clearly, decide wisely, and choose confidently.
      </p>

      <a className="button1" href="/about">
        <span>Read More</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
          <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
          <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
          <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
        </svg>
      </a>

      {/* ✅ Feature Cards */}
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 w-full max-w-2xl 
                   place-items-center auto-rows-fr"
      >
        {[
          {
            title: "Transparent Comparisons",
            description:
              "We uncover the hidden costs, conditions, and fine print behind every financial product — so you see the true picture before you decide.",
          },
          {
            title: "Independent & Unbiased",
            description:
              "CompareFi is a neutral platform with no affiliations or commissions. Every insight is objective, data-backed, and built to help you, not any brand.",
          },
          {
            title: "Smart, Simple Insights",
            description:
              "Complex numbers made easy. Our AI-powered comparisons and clear visuals help you choose what’s truly right for you — faster and with confidence.",
          },
        ].map((feature, i, arr) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`w-full sm:w-[90%] rounded-3xl shadow-[0_12px_25px_-5px_rgba(102,102,102,0.5)] 
                       transition-all duration-500 ease-out p-8 sm:p-10 flex flex-col 
                       items-center text-center bg-gradient-to-tr from-white/10 to-white/5 
                       border border-[#c3c6ce] hover:border-[#99e33d] 
                       hover:shadow-[0_4px_18px_0_rgba(0,0,0,0.25)] overflow-hidden break-words 
                       ${
                         i === arr.length - 1
                           ? "sm:col-span-2 sm:justify-self-center sm:w-[80%]"
                           : ""
                       }`}
          >
            {/* Header */}
            <div className="flex flex-row items-center justify-center sm:justify-start gap-4 w-full mb-3">
              <div className="flex justify-center items-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#FF5732] flex-shrink-0">
                <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#0A0F2C] break-words">
                <BlurText
                  text={feature.title}
                  delay={20}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                />
              </h4>
            </div>

            {/* Description */}
            <p className="text-[#4B5563] mt-2 leading-relaxed text-sm sm:text-base break-words">
              <BlurText
                text={feature.description}
                delay={30}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
              />
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </SpotlightCard>
</section>













//Display cards code 

"use client";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";
// Removed 'motion' import for a simpler, non-hovered stacking effect
// import { motion } from "framer-motion"; 

/* -----------------------------------------------
   🔹 Single Card Component (No functional change needed)
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
        // Card size: Taller (h-[22rem]) and narrower (w-[15rem])
        "flex flex-col justify-between h-[22rem] w-[15rem] rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-md p-5 shadow-lg transition-all duration-500 hover:-translate-y-[4px]",
        isDimmed ? "opacity-50 scale-[0.97]" : "opacity-100",
        className // Apply additional classes for rotation/translation
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
   🔹 3D Tilt Layout Display (Revised for Equal Dimming)
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

  // Define z-index and transform classes for the desired stacking/tilt
  const cardLayoutClasses = [
    // Card 1 (Left): Opacity set to 50%
    "z-10 rotate-[-10deg] translate-x-[25px] opacity-50", 
    // Card 2 (Center): Opacity 100%
    "z-30 rotate-0", 
    // Card 3 (Right): Opacity set to 50%
    "z-20 rotate-[10deg] translate-x-[-25px] opacity-50", 
  ];

  return (
    // The main container for centering and context
    <div className="flex justify-center items-center py-20"> 
      {/* Negative margin adjusted to -space-x-20 for thinner cards */}
      <div className="flex justify-center items-center -space-x-20 pointer-events-auto">
        {cards.map((card, i) => {
          // Determine the class based on the card index
          const layoutClass = cardLayoutClasses[i];
          
          return (
            <div
              key={i}
              className={cn(
                "transition-all duration-700 ease-out", 
                layoutClass, 
                // Hover brings the card to the front and centers it
                hoveredIndex === i ? "z-40 rotate-0 translate-x-0 scale-[1.05] opacity-100" : ""
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


//Display cards other option 
"use client";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";
// Removed 'motion' import for a simpler, non-hovered stacking effect
// import { motion } from "framer-motion"; 

/* -----------------------------------------------
   🔹 Single Card Component (No Change Needed Here)
------------------------------------------------ */
function DisplayCard({
  title,
  data,
  isDimmed = false,
  className, // Added className prop to apply Tailwind/CSS transforms
}: {
  title: string;
  data: { label: string; value: string }[];
  isDimmed?: boolean;
  className?: string; // Prop type for className
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between h-[17rem] w-[25rem] rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-md p-5 shadow-lg transition-all duration-500 hover:-translate-y-[4px]",
        isDimmed ? "opacity-50 scale-[0.97]" : "opacity-100",
        className // Apply additional classes for rotation/translation
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
   🔹 3D Tilt Layout Display (Revised)
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

  // Define z-index and transform classes for the desired stacking/tilt
  const cardLayoutClasses = [
    // Card 1 (Left, appears at the back)
    "z-10 rotate-[-10deg] translate-x-[40px] opacity-70", 
    // Card 2 (Center, appears on top)
    "z-30 rotate-0", 
    // Card 3 (Right, appears in the middle layer)
    "z-20 rotate-[10deg] translate-x-[-40px] opacity-85", 
  ];

  return (
    // The main container for centering and context
    <div className="flex justify-center items-center py-20"> 
      {/* Container for the cards with negative margin for overlap */}
      <div className="flex justify-center items-center -space-x-32 pointer-events-auto">
        {cards.map((card, i) => {
          // Determine the class based on the card index
          const layoutClass = cardLayoutClasses[i];
          
          return (
            <div
              key={i}
              className={cn(
                "transition-all duration-700 ease-out", // General transition for smoothness
                layoutClass, // Apply the tilt, position, and z-index
                // Adjust z-index on hover to bring the current card to the front
                hoveredIndex === i ? "z-40 rotate-0 translate-x-0 scale-[1.05]" : ""
              )}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <DisplayCard
                {...card}
                // Dim other cards when one is hovered
                isDimmed={hoveredIndex !== null && hoveredIndex !== i}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}