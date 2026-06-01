"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, Calendar } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrdersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [isOpen, setIsOpen] = useState(false);

  const applyFilters = (params: Record<string, string>) => {
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    });
    router.push(`/admin/commandes?${current.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters({ q: search })}
            placeholder="Rechercher par client, email..."
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

        <select
          value={searchParams.get("status") || ""}
          onChange={(e) => applyFilters({ status: e.target.value })}
          className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mediterranean/20"
        >
          <option value="">Tous les statuts</option>
          <option value="PENDING">En attente</option>
          <option value="CONFIRMED">Confirmée</option>
          <option value="PROCESSING">En préparation</option>
          <option value="SHIPPED">Expédiée</option>
          <option value="DELIVERED">Livrée</option>
          <option value="CANCELLED">Annulée</option>
        </select>

        <select
          value={searchParams.get("payment") || ""}
          onChange={(e) => applyFilters({ payment: e.target.value })}
          className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mediterranean/20"
        >
          <option value="">Tous les paiements</option>
          <option value="PAID">Payé</option>
          <option value="PENDING">En attente</option>
          <option value="FAILED">Échoué</option>
        </select>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Date de début</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="date" className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Date de fin</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="date" className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Montant min</label>
            <input 
              type="number" 
              placeholder="0€" 
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" 
            />
          </div>
        </div>
      )}
    </div>
  );
}