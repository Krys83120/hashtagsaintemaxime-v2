"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ShoppingCart, DollarSign, Package, Users, AlertTriangle, Clock } from "lucide-react";

interface Stats {
  totalRevenue: number;
  todayRevenue: number;
  totalOrders: number;
  todayOrders: number;
  totalProducts: number;
  totalUsers: number;
  lowStock: number;
  pendingOrders: number;
}

export default function DashboardStats({ stats }: { stats: Stats }) {
  const cards = [
    {
      title: "CA Aujourd'hui",
      value: `${stats.todayRevenue.toFixed(2)}€`,
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Commandes Aujourd'hui",
      value: stats.todayOrders.toString(),
      icon: ShoppingCart,
      color: "bg-blue-50 text-blue-600",
      trend: "+5",
      trendUp: true,
    },
    {
      title: "CA Total",
      value: `${stats.totalRevenue.toFixed(2)}€`,
      icon: TrendingUp,
      color: "bg-violet-50 text-violet-600",
      trend: "+23%",
      trendUp: true,
    },
    {
      title: "Commandes Totales",
      value: stats.totalOrders.toString(),
      icon: Package,
      color: "bg-amber-50 text-amber-600",
      trend: "+18%",
      trendUp: true,
    },
    {
      title: "Produits Actifs",
      value: stats.totalProducts.toString(),
      icon: Package,
      color: "bg-cyan-50 text-cyan-600",
      trend: "+3",
      trendUp: true,
    },
    {
      title: "Utilisateurs",
      value: stats.totalUsers.toString(),
      icon: Users,
      color: "bg-rose-50 text-rose-600",
      trend: "+12",
      trendUp: true,
    },
    {
      title: "Stock Faible",
      value: stats.lowStock.toString(),
      icon: AlertTriangle,
      color: "bg-red-50 text-red-600",
      trend: "Urgent",
      trendUp: false,
      alert: true,
    },
    {
      title: "En Attente",
      value: stats.pendingOrders.toString(),
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
      trend: "À traiter",
      trendUp: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${
            card.alert ? "ring-1 ring-red-200" : ""
          }`}
        >
          <div className="flex items-start justify-between">
            <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
              <card.icon className="w-5 h-5" />
            </div>
            <span className={`flex items-center gap-1 text-xs font-semibold ${
              card.trendUp ? "text-emerald-600" : "text-red-500"
            }`}>
              {card.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {card.trend}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-display font-bold text-deep">{card.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{card.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}