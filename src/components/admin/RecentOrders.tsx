"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: Date;
  items: Array<{
    product: { name: string };
    quantity: number;
  }>;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  PENDING: { label: "En attente", color: "bg-amber-50 text-amber-600", icon: Clock },
  CONFIRMED: { label: "Confirmée", color: "bg-blue-50 text-blue-600", icon: CheckCircle },
  PROCESSING: { label: "En préparation", color: "bg-violet-50 text-violet-600", icon: Package },
  SHIPPED: { label: "Expédiée", color: "bg-cyan-50 text-cyan-600", icon: Truck },
  DELIVERED: { label: "Livrée", color: "bg-emerald-50 text-emerald-600", icon: CheckCircle },
  CANCELLED: { label: "Annulée", color: "bg-red-50 text-red-600", icon: XCircle },
};

export default function RecentOrders({ orders }: { orders: Order[] }) {
  const displayOrders = orders.length > 0 ? orders : getMockOrders();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm"
    >
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-display font-bold text-deep">Commandes récentes</h3>
          <p className="text-sm text-gray-500">Dernières 10 commandes</p>
        </div>
        <Link 
          href="/admin/commandes" 
          className="text-sm text-mediterranean font-semibold hover:underline flex items-center gap-1"
        >
          Voir tout
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">Commande</th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">Client</th>
              <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">Statut</th>
              <th className="text-right text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.map((order, index) => {
              const config = statusConfig[order.status] || statusConfig.PENDING;
              const StatusIcon = config.icon;

              return (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-deep">#{order.id.slice(-6).toUpperCase()}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-deep">{order.firstName} {order.lastName}</p>
                      <p className="text-xs text-gray-400">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-semibold text-deep">{order.total.toFixed(2)}€</p>
                    <p className="text-xs text-gray-400">{order.items.reduce((s, i) => s + i.quantity, 0)} article(s)</p>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function getMockOrders(): Order[] {
  return [
    { id: "1", email: "sophie@email.com", firstName: "Sophie", lastName: "Martin", status: "SHIPPED", paymentStatus: "PAID", total: 89.80, createdAt: new Date(), items: [{ product: { name: "T-shirt + Serviette" }, quantity: 2 }] },
    { id: "2", email: "marc@email.com", firstName: "Marc", lastName: "Dubois", status: "PROCESSING", paymentStatus: "PAID", total: 45.00, createdAt: new Date(Date.now() - 3600000), items: [{ product: { name: "Serviette Plage" }, quantity: 1 }] },
    { id: "3", email: "laura@email.com", firstName: "Laura", lastName: "Bernard", status: "PENDING", paymentStatus: "PENDING", total: 124.50, createdAt: new Date(Date.now() - 7200000), items: [{ product: { name: "Pack Instagrammable" }, quantity: 1 }] },
    { id: "4", email: "julien@email.com", firstName: "Julien", lastName: "Petit", status: "DELIVERED", paymentStatus: "PAID", total: 29.90, createdAt: new Date(Date.now() - 86400000), items: [{ product: { name: "T-shirt Classic" }, quantity: 1 }] },
    { id: "5", email: "emma@email.com", firstName: "Emma", lastName: "Leroy", status: "CONFIRMED", paymentStatus: "PAID", total: 67.80, createdAt: new Date(Date.now() - 172800000), items: [{ product: { name: "Coque + Bracelet" }, quantity: 2 }] },
  ];
}