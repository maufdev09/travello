import { Facebook, Instagram, X } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

function PublicFooter() {
  return (
    <footer className="bg-[#1a4d6f] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 pb-12 md:pb-16 border-b border-white/10">
          {/* Left Section - Brand & Social */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-4">Travello.</h2>
              <p className="text-[#d1d5db] max-w-md">
                Curating the world&apos;s most breathtaking adventures for the modern
                explorer.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <button
                className="bg-white/10 rounded-full size-10 md:size-12 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram></Instagram>
              </button>
              <button
                className="bg-white/10 rounded-full size-10 md:size-12 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Facebook />
              </button>
              <button
                className="bg-white/10 rounded-full size-10 md:size-12 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <X />
              </button>
            </div>
          </div>

          {/* Right Section - Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-3">Join the Adventure</h3>
              <p className="text-[#d1d5db]">
                Subscribe to receive travel inspiration and exclusive offers.
              </p>
            </div>

            {/* Newsletter Form */}
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-[#ccc] h-12 md:h-[50px] focus-visible:border-white/40 focus-visible:ring-white/20"
              />
              <Button
                type="submit"
                className="bg-[#d4745f] hover:bg-[#c4644f] text-white h-12 md:h-[50px] px-6 md:px-8"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Footer - Copyright & Links */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-[#9ca3af]">
            © 2024 Travello Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[#9ca3af]">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
