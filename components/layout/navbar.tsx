"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./Toggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle closing menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const navLinks = [
    { href: "/#projects", label: "Projects" },
    { href: "/#skills", label: "Skills" },
    { href: "/#experience", label: "Experience" },
    { href: "/#contact", label: "Contact", isButton: true },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-background/0"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight hover:text-primary transition-colors"
          >
            Ctrl + Me
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <div>
                <ModeToggle />
            </div>
            {navLinks.map((link) =>
              link.isButton ? (
                <Link key={link.href} href={link.href}>
                  <Button className="rounded-xl">{link.label}</Button>
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary hover:bg-muted rounded-3xl px-3 py-2 transition-all duration-200 dark:hover:bg-muted "
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors menu-button"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu md:hidden absolute top-16 left-0 right-0 bg-background border-b shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
                <div>
                    <ModeToggle/>
                </div>
              {navLinks.map((link) => (
                <div key={link.href} className="block">
                  {link.isButton ? (
                    <Link href={link.href} onClick={() => setIsOpen(false)}>
                      <Button className="w-full">{link.label}</Button>
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-2 text-foreground/80 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
