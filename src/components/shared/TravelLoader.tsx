"use client";

import { Plane, MapPin } from "lucide-react";

interface TravelLoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
  showIcon?: boolean;
}

const SIZE_CLASSES = {
  sm: { container: "w-20 h-20", text: "text-[10px]", icon: 12 },
  md: { container: "w-32 h-32", text: "text-[13.6px]", icon: 16 },
  lg: { container: "w-48 h-48", text: "text-[18px]", icon: 24 },
  xl: { container: "w-64 h-64", text: "text-[24px]", icon: 32 },
} as const;

export default function TravelLoader({
  text = "Preparing your journey...",
  size = "md",
  className = "",
  animated = true,
  showIcon = true,
}: TravelLoaderProps) {
  const { container, text: textSize, icon: iconSize } = SIZE_CLASSES[size];

  return (
    <div
      className={`flex flex-col items-center gap-4 justify-center min-h-screen ${className}`}
    >
      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes dash-flight {
          0% {
            stroke-dashoffset: 400;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes float-plane {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes glow {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.15;
          }
        }

        .orbit {
          animation: orbit 6s linear infinite;
        }

        .flight-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: dash-flight 2.5s ease-in-out infinite;
        }

        .float-plane {
          animation: float-plane 2s ease-in-out infinite;
        }

        .glow {
          animation: glow 3s ease-in-out infinite;
        }

        .no-animation * {
          animation: none !important;
        }
      `}</style>

      {/* Loader */}
      <div
        className={`relative ${container} ${!animated ? "no-animation" : ""}`}
      >
        {/* Globe Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/60" />

        {/* Orbit */}
        {animated && (
          <div className="absolute inset-0 orbit">
            <div className="absolute top-1/2 right-0 -translate-y-1/2">
              <Plane
                size={iconSize}
                className="text-emerald-500 rotate-45"
              />
            </div>
          </div>
        )}

        {/* Inner Route */}
        <div className="absolute inset-[18%] flex items-center justify-center">
          {showIcon ? (
            <MapPin
              size={iconSize}
              className={`text-emerald-500 ${
                animated ? "float-plane" : ""
              }`}
            />
          ) : (
            <svg
              className="w-full h-full"
              viewBox="0 0 64 64"
              fill="none"
            >
              <path
                d="M8 40C16 28 28 24 40 28C48 31 56 24 56 24"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={animated ? "flight-path" : ""}
              />
            </svg>
          )}
        </div>

        {/* Soft Glow */}
        {animated && (
          <div className="absolute inset-[18%] rounded-full bg-emerald-500/20 glow" />
        )}
      </div>

      {/* Text */}
      {text && (
        <p
          className={`text-center font-medium text-muted-foreground ${textSize}`}
        >
          {text}
        </p>
      )}
    </div>
  );
}
