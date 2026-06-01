"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar } from "lucide-react";

export default function SalesChart({ data }: { data: any[] }) {
  // Format data for chart
  const chartData = data.map((d: any) => ({
    date: new Date(d.createdAt).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" }),
    ventes: d._sum?.total || 0,
  }));

  // Mock data if empty
  const displayData = chartData.length > 0 ? chartData : [
    { date: "Lun 20", ventes: 450 },
    { date: "Mar 21", ventes: 320 },
    { date: "Mer 22", ventes: 680 },
    { date: "Jeu 23", ventes: 520 },
    { date: "Ven 24", ventes: 890 },
    { date: "Sam 25", ventes: 1200 },
    { date: "Dim 26", ventes: 750 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-bold text-deep">Évolution des ventes</h3>
          <p className="text-sm text-gray-500">7 derniers jours</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Cette semaine</span>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData}>
            <defs>
              <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0066CC" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0066CC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 12 }} tickFormatter={(v) => `${v}€`} />
            <Tooltip 
              contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              formatter={(value: number) => [`${value.toFixed(2)}€`, "Ventes"]}
            />
            <Area 
              type="monotone" 
              dataKey="ventes" 
              stroke="#0066CC" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorVentes)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}