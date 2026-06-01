"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Image as ImageIcon,
  FileText,
  Megaphone,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface User {
  name?: string | null;
  email: string;
  role: string;
  image?: string | null;
}

const menuItems = [
  { href: "/admin/dashboard", label: "Tableau de bord", icon: LayoutDashboard, roles: ["ADMIN", "MANAGER", "EDITOR"] },
  { href: "/admin/produits", label: "Produits", icon: Package, roles: ["ADMIN", "MANAGER", "EDITOR"] },
  { href: "/admin/commandes", label: "Commandes", icon: ShoppingCart, roles: ["ADMIN", "MANAGER"] },
  { href: "/admin/utilisateurs", label: "Utilisateurs", icon: Users, roles: ["ADMIN", "MANAGER"] },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3, roles: ["ADMIN", "MANAGER"] },
  { href: "/admin/medias", label: "Médias", icon: ImageIcon, roles: ["ADMIN", "EDITOR"] },
  { href: "/admin/pages", label: "Pages", icon: FileText, roles: ["ADMIN", "EDITOR"] },
  { href: "/admin/marketing", label: "Marketing", icon: Megaphone, roles: ["ADMIN", "MANAGER"] },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings, roles: ["ADMIN"] },
];

export default function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredMenu = menuItems.filter((item) => item.roles.includes(user.role));

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 bg-sm-deep text-white z-40 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } hidden lg:flex flex-col`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
        {!isCollapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-1">
            <div className="relative w-32">
              <Image
                src="/images/Logo-saintemaxime.png"
                alt="#SAINTEMAXIME"
                width={128}
                height={40}
                className="object-contain brightness-0 invert"
              />
            </div>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-hide">
        {filteredMenu.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-sm-turquoise text-white shadow-lg shadow-sm-turquoise/25"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-white/40 group-hover:text-white"}`} />
              {!isCollapsed && (
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
              )}
              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-sm-red"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/10">
        <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sm-turquoise to-sm-red flex items-center justify-center text-sm font-bold flex-shrink-0">
            {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user.name || user.email}</p>
              <p className="text-xs text-white/40 capitalize">{user.role.toLowerCase()}</p>
            </div>
          )}
        </div>

        <form action="/api/auth/logout" className={`mt-3 ${isCollapsed ? "flex justify-center" : ""}`}>
          <button
            type="submit"
            className={`flex items-center gap-2 text-white/40 hover:text-sm-red transition-colors text-sm ${
              isCollapsed ? "justify-center w-full" : ""
            }`}
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </form>
      </div>
    </aside>
  );
}