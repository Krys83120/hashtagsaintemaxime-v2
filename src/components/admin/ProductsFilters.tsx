"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function ProductsFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const applyFilters = (params: Record<string, string>) => {
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    });
    router.push(`/admin/produits?${current.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters({ q: search })}
            placeholder="Rechercher un produit..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mediterranean/20 focus:border-mediterranean"
          />
          {search && (
            <button 
              onClick={() => { setSearch(""); applyFilters({ q: "" }); }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <select
          value={searchParams.get("category") || ""}
          onChange={(e) => applyFilters({ category: e.target.value })}
          className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mediterranean/20"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={searchParams.get("status") || ""}
          onChange={(e) => applyFilters({ status: e.target.value })}
          className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mediterranean/20"
        >
          <option value="">Tous les statuts</option>
          <option value="active">Actifs</option>
          <option value="inactive">Inactifs</option>
        </select>

        {/* Toggle Filters */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Advanced Filters */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Stock</label>
            <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
              <option value="">Tous</option>
              <option value="low">Stock faible (&lt;10)</option>
              <option value="out">Rupture</option>
              <option value="in">En stock</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Source</label>
            <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
              <option value="">Toutes</option>
              <option value="printful">Printful</option>
              <option value="manual">Manuel</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Trier par</label>
            <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
              <option value="newest">Plus récents</option>
              <option value="oldest">Plus anciens</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="sales">Meilleures ventes</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}