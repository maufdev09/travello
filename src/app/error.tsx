"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      {/* Animations */}
      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.6);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes pulse-error {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.15;
          }
        }

        @keyframes glow-destructive {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.25);
            opacity: 0.5;
          }
        }

        .fade-up {
          animation: fade-up 0.5s ease-out;
        }

        .scale-in {
          animation: scale-in 0.6s
            cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .pulse-error {
          animation: pulse-error 2s ease-in-out infinite;
        }

        .glow-destructive {
          animation: glow-destructive 4s ease-in-out infinite;
        }
      `}</style>

      <div className="relative flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/20 p-4 overflow-hidden">
        <div className="w-full max-w-2xl fade-up">
          <Card className="border-destructive/40 shadow-xl">
            <CardContent className="pt-8">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Animated Error Icon */}
                <div className="relative scale-in">
                  <div className="absolute inset-0 rounded-full bg-destructive/10 pulse-error" />
                  <div className="relative z-10 rounded-full bg-destructive/10 p-6">
                    <AlertTriangle className="h-16 w-16 text-destructive" />
                  </div>
                </div>

                {/* Error Text */}
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Something went wrong
                  </h1>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    An unexpected error occurred. Don&apos;t worry — this
                    isn&apos;t your fault.
                  </p>
                </div>

                {/* Dev Error Details */}
                {process.env.NODE_ENV === "development" && (
                  <div className="w-full rounded-lg bg-muted p-4 text-left">
                    <p className="text-sm font-mono text-muted-foreground break-all">
                      {error.message}
                    </p>
                    {error.digest && (
                      <p className="mt-2 text-xs font-mono text-muted-foreground">
                        Error Digest: {error.digest}
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button onClick={reset} size="lg" className="gap-2">
                    <RefreshCcw className="h-4 w-4" />
                    Try Again
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="gap-2"
                  >
                    <Link href="/">
                      <Home className="h-4 w-4" />
                      Back to Home
                    </Link>
                  </Button>
                </div>

                {/* Footer Note */}
                <p className="text-sm text-muted-foreground">
                  If this problem keeps happening, please contact support.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Background Glow */}
        <div className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-destructive/5 blur-3xl glow-destructive" />
      </div>
    </>
  );
}
