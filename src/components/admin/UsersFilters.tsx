"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function UsersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    router.push(`/admin/utilisateurs?${current.toString()}`);
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
            placeholder="Rechercher par nom, email..."
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
          value={searchParams.get("role") || ""}
          onChange={(e) => applyFilters({ role: e.target.value })}
          className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mediterranean/20"
        >
          <option value="">Tous les rôles</option>
          <option value="ADMIN">Super Admin</option>
          <option value="MANAGER">Manager</option>
          <option value="EDITOR">Éditeur</option>
          <option value="USER">Client</option>
        </select>

        <select
          className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mediterranean/20"
        >
          <option value="">Trier par</option>
          <option value="newest">Plus récents</option>
          <option value="oldest">Plus anciens</option>
          <option value="orders">Nombre de commandes</option>
        </select>
      </div>
    </div>
  );
}