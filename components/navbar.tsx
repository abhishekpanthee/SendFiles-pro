"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-14 items-center justify-between px-14">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2" aria-label="FileShare Pro Home">
            <FileText className="h-6 w-6" aria-hidden="true" />
            <span className="font-bold hidden sm:inline">FileShare Pro</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/blog"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/blog" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Blog
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-background border-b md:hidden">
            <nav className="container py-4 flex flex-col space-y-4">
              <Link
                href="/blog"
                className={cn(
                  "transition-colors hover:text-foreground/80 px-4 py-2 rounded-md",
                  pathname === "/blog" ? "bg-muted" : ""
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTheme(theme === "light" ? "dark" : "light");
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-start"
                  aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                >
                  {theme === "light" ? (
                    <Moon className="h-4 w-4 mr-2" aria-hidden="true" />
                  ) : (
                    <Sun className="h-4 w-4 mr-2" aria-hidden="true" />
                  )}
                  {theme === "light" ? "Dark Theme" : "Light Theme"}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
