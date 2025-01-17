"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Mail, Facebook, Instagram, Twitter, X } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="sticky bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
        {/* Footer Links */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            href="#"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "#" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/terms" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "#" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Contact Us
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link href="mailto:contact@abhishekpanthee.com.np" aria-label="Email">
            <Mail className="h-6 w-6 text-foreground/60 hover:text-foreground" />
          </Link>
          <Link href="https://facebook.com/abhishek.panthee.7" target="_blank" aria-label="Facebook">
            <Facebook className="h-6 w-6 text-foreground/60 hover:text-foreground" />
          </Link>
          <Link href="https://instagram.com/codecrumbs404" target="_blank" aria-label="Instagram">
            <Instagram className="h-6 w-6 text-foreground/60 hover:text-foreground" />
          </Link>
          <Link href="https://twitter.com/codecrumbs404" target="_blank" aria-label="Twitter">
            <X className="h-6 w-6 text-foreground/60 hover:text-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
