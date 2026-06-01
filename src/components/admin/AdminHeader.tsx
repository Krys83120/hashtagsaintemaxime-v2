"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";

interface User {
  name?: string | null;
  email: string;
  role: string;
  image?: string | null;
}

export default function AdminHeader({ user }: { user: User }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "Nouvelle commande #1234", time: "2 min", type: "order" },
    { id: 2, text: "Stock faible : T-shirt Classic M", time: "15 min", type: "stock" },
    { id: 3, text: "Nouvel avis client 5★", time: "1h", type: "review" },
  ]);

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Breadcrumb */}
        <nav className="hidden md:flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium text-deep">Admin</span>
          <span>/</span>
          <span className="text-gray-400">Tableau de bord</span>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <AnimatePresence>
            {isSearchOpen && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                type="text"
                placeholder="Rechercher..."
                className="absolute right-10 top-1/2 -translate-y-1/2 w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mediterranean/20"
                autoFocus
              />
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Notifications */}
        <div className="relative group">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-semibold text-sm">Notifications</h4>
            </div>
            <div className="p-2">
              {notifications.map((notif) => (
                <div key={notif.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    notif.type === "order" ? "bg-green-500" : 
                    notif.type === "stock" ? "bg-amber-500" : "bg-blue-500"
                  }`} />
                  <div>
                    <p className="text-sm text-deep">{notif.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-deep">{user.name || user.email}</p>
            <p className="text-xs text-gray-400 capitalize">{user.role.toLowerCase()}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-mediterranean to-sand flex items-center justify-center text-white text-sm font-bold">
            {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}