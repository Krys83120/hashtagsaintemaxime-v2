"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search, Heart } from "lucide-react";
import { useCart } from "@/components/site/CartProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/boutique", label: "Boutique" },
    { href: "/collections", label: "Collections" },
    { href: "/a-propos", label: "La Marque" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-lg shadow-lg py-2" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          {/* Logo EXACT charte graphique */}
          <Link href="/" className="flex items-center group">
            <div className={`relative transition-all duration-300 ${isScrolled ? "h-12" : "h-16"}`}>
              <Image
                src="/images/Logo-saintemaxime.png"
                alt="#SAINTEMAXIME Lifestyle"
                width={isScrolled ? 180 : 220}
                height={isScrolled ? 48 : 64}
                className="object-contain h-full w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wider hover:text-sm-turquoise transition-colors ${
                  isScrolled ? "text-sm-deep" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
              isScrolled ? "text-sm-deep" : "text-white"
            }`}>
              <Search className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-full hover:bg-white/10 transition-colors hidden sm:block ${
              isScrolled ? "text-sm-deep" : "text-white"
            }`}>
              <Heart className="w-5 h-5" />
            </button>
            <Link 
              href="/panier" 
              className={`relative p-2 rounded-full hover:bg-white/10 transition-colors ${
                isScrolled ? "text-sm-deep" : "text-white"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-sm-red text-white text-xs font-bold rounded-full flex items-center justify-center animate-heart-beat">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors ${
                isScrolled ? "text-sm-deep" : "text-white"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-sm-deep lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {/* Logo mobile */}
              <div className="mb-8">
                <Image
                  src="/images/Logo-saintemaxime.png"
                  alt="#SAINTEMAXIME Lifestyle"
                  width={200}
                  height={60}
                  className="object-contain"
                />
              </div>

              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-display font-bold text-white hover:text-sm-turquoise transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}