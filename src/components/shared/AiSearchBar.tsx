"use client";

import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";

interface AISearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function AISearchBar({
  placeholder = "Describe your dream trip (e.g., 'Quiet beaches in Italy with good wine')...",
  onSearch,
}: AISearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative group">
      {/* Glowing Pulse Background */}
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute -inset-1 bg-gradient-to-r from-travello-terracotta via-orange-400 to-travello-terracotta rounded-full opacity-70 blur-md group-hover:opacity-100 transition duration-500"
      />

      {/* Main Input */}
      <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-full shadow-2xl p-2 pr-4 transition-transform duration-300 group-hover:scale-[1.02]">
        
        {/* Icon Left */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-travello-sand/30 text-travello-terracotta ml-1">
          <Sparkles className="w-6 h-6" />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none px-4 text-travello-deepBlue placeholder:text-gray-400 text-lg font-medium"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-travello-deepBlue hover:bg-travello-terracotta text-primary p-3 rounded-full transition-colors duration-300 flex items-center justify-center shadow-lg"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* AI Badge */}
      <motion.div
        initial={{ rotate: 0, scale: 0.9 }}
        animate={{ rotate: 3, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute -top-3 right-8 bg-travello-terracotta text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm"
      >
        AI Powered
      </motion.div>
    </div>
  );
}
