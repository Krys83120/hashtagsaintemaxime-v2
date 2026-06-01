"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function FiltersSidebar({ categories }: { categories: Category[] }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("categorie");

  const priceRanges = [
    { label: "Moins de 20€", min: 0, max: 20 },
    { label: "20€ - 40€", min: 20, max: 40 },
    { label: "40€ - 60€", min: 40, max: 60 },
    { label: "Plus de 60€", min: 60, max: 999 },
  ];

  const filters = [
    { title: "Catégories", items: categories.map(c => ({ label: c.name, value: c.slug, count: 0 })) },
    { title: "Prix", items: priceRanges.map(r => ({ label: r.label, value: `${r.min}-${r.max}`, count: 0 })) },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-mediterranean text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <SlidersHorizontal className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`w-64 flex-shrink-0 lg:block ${isMobileOpen ? "fixed left-0 top-0 bottom-0 z-50 bg-white shadow-xl" : "hidden"}`}
        initial={false}
        animate={isMobileOpen ? { x: 0 } : { x: -100 }}
      >
        <div className="p-6 lg:p-0 lg:sticky lg:top-24">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="text-lg font-display font-bold">Filtres</h3>
            <button onClick={() => setIsMobileOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {filters.map((filter) => (
              <FilterGroup key={filter.title} title={filter.title} items={filter.items} currentValue={currentCategory} />
            ))}
          </div>

          {/* Reset */}
          <Link
            href="/boutique"
            className="mt-6 block w-full py-2.5 text-center text-sm font-semibold text-mediterranean border border-mediterranean rounded-xl hover:bg-mediterranean hover:text-white transition-colors"
          >
            Réinitialiser les filtres
          </Link>
        </div>
      </motion.aside>
    </>
  );
}

function FilterGroup({ title, items, currentValue }: { title: string; items: Array<{ label: string; value: string; count: number }>; currentValue: string | null }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-gray-100 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-3"
      >
        <h4 className="font-semibold text-deep text-sm">{title}</h4>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-2"
          >
            {items.map((item) => {
              const isActive = currentValue === item.value;
              const href = isActive ? "/boutique" : `/boutique?categorie=${item.value}`;

              return (
                <Link
                  key={item.value}
                  href={href}
                  className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? "bg-mediterranean/10 text-mediterranean font-semibold" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.count > 0 && (
                    <span className="text-xs text-gray-400">{item.count}</span>
                  )}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}