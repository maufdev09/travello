"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AISearchBar } from "@/components/shared/AiSearchBar";

interface HeroSectionProps {
  backgroundUrl: string;
  tagline?: string;
  title?: string;
  subtitle?: string;
}

export function HeroSection({
  backgroundUrl,
  tagline = "The World Awaits",
  title = "Discover Your Next Adventure",
  subtitle = "Experience the world's most breathtaking destinations curated just for you.",
}: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax animation
  const yBackground = useTransform(scrollY, [0, 1000], [0, 400]);
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute inset-0 h-[120%] w-full"
      >
        <Image
          src={backgroundUrl}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 flex flex-col items-center px-4 text-center max-w-5xl mx-auto"
      >
        {/* Tagline */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-travello-sand font-medium tracking-[0.2em] uppercase mb-6"
        >
          {tagline}
        </motion.span>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity:1 , y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white font-serif font-bold leading-tight drop-shadow-lg text-4xl md:text-6xl lg:text-7xl"
        >
          {title.split(" ").slice(0, 2).join(" ")} <br />
          <span className="  bg-clip-text bg-gradient-to-r from-travello-sand to-white italic ">
            {title.split(" ").slice(2).join(" ")}
          </span>
        </motion.h1>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-2xl mb-10 mt-6"
        >
          <AISearchBar />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-gray-200 text-lg max-w-xl leading-relaxed drop-shadow-md"
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-travello-sand/80">
          Scroll to Explore
        </span>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </div>
  );
}
