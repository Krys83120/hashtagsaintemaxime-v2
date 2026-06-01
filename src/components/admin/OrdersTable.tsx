"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  ChevronLeft, ChevronRight, Eye, Package, Truck, CheckCircle, 
  Clock, XCircle, Download, Printer 
} from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  paymentStatus: string;
  total: number;
  shippingCost: number;
  printfulOrderId?: string | null;
  trackingNumber?: string | null;
  createdAt: Date;
  items: Array<{
    product: { name: string; images: string[] };
    quantity: number;
    price: number;
    variantId?: string | null;
  }>;
}

const statusConfig: Record<string, { label: string; color: string; icon: any; next?: string }> = {
  PENDING: { label: "En attente", color: "bg-amber-50 text-amber-600 border-amber-200", icon: Clock, next: "CONFIRMED" },
  CONFIRMED: { label: "Confirmée", color: "bg-blue-50 text-blue-600 border-blue-200", icon: CheckCircle, next: "PROCESSING" },
  PROCESSING: { label: "En préparation", color: "bg-violet-50 text-violet-600 border-violet-200", icon: Package, next: "SHIPPED" },
  SHIPPED: { label: "Expédiée", color: "bg-cyan-50 text-cyan-600 border-cyan-200", icon: Truck, next: "DELIVERED" },
  DELIVERED: { label: "Livrée", color: "bg-emerald-50 text-emerald-600 border-emerald-200", icon: CheckCircle },
  CANCELLED: { label: "Annulée", color: "bg-red-50 text-red-600 border-red-200", icon: XCircle },
  REFUNDED: { label: "Remboursée", color: "bg-gray-50 text-gray-600 border-gray-200", icon: XCircle },
};

export default function OrdersTable({ 
  orders, 
  totalPages, 
  currentPage 
}: { 
  orders: Order[]; 
  totalPages: number; 
  currentPage: number;
}) {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    // API call simulation
    await new Promise(r => setTimeout(r, 500));
    setUpdatingStatus(null);
    // Refresh page
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">N° Commande</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Client</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Statut</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Paiement</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Total</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const config = statusConfig[order.status] || statusConfig.PENDING;
              const StatusIcon = config.icon;
              const isExpanded = expandedOrder === order.id;

              return (
                <>
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-deep">#{order.id.slice(-6).toUpperCase()}</p>
                        {order.printfulOrderId && (
                          <p className="text-[10px] text-blue-500 font-medium mt-0.5">
                            PF: {order.printfulOrderId.slice(-8)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-deep">{order.firstName} {order.lastName}</p>
                        <p className="text-xs text-gray-400">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        order.paymentStatus === "PAID" 
                          ? "bg-emerald-50 text-emerald-600" 
                          : order.paymentStatus === "PENDING"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-red-50 text-red-600"
                      }`}>
                        {order.paymentStatus === "PAID" ? "Payé" : order.paymentStatus === "PENDING" ? "En attente" : "Échoué"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-semibold text-deep">{(order.total + order.shippingCost).toFixed(2)}€</p>
                      <p className="text-xs text-gray-400">{order.items.length} article(s)</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <Printer className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50/50">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-4"
                        >
                          {/* Items */}
                          <div className="bg-white rounded-lg border border-gray-100 p-4">
                            <h4 className="text-sm font-semibold text-deep mb-3">Articles commandés</h4>
                            <div className="space-y-3">
                              {order.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <Image
                                      src={item.product.images[0] || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&q=80"}
                                      alt={item.product.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-deep truncate">{item.product.name}</p>
                                    <p className="text-xs text-gray-400">Qté: {item.quantity} × {item.price.toFixed(2)}€</p>
                                  </div>
                                  <p className="text-sm font-semibold text-deep">{(item.quantity * item.price).toFixed(2)}€</p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
                              <span className="text-gray-500">Sous-total</span>
                              <span className="font-semibold text-deep">{order.total.toFixed(2)}€</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Livraison</span>
                              <span className="font-semibold text-deep">{order.shippingCost.toFixed(2)}€</span>
                            </div>
                            <div className="flex justify-between text-base font-bold text-deep pt-2 border-t border-gray-100">
                              <span>Total</span>
                              <span>{(order.total + order.shippingCost).toFixed(2)}€</span>
                            </div>
                          </div>

                          {/* Status Pipeline */}
                          <div className="bg-white rounded-lg border border-gray-100 p-4">
                            <h4 className="text-sm font-semibold text-deep mb-3">Pipeline de traitement</h4>
                            <div className="flex items-center gap-2">
                              {["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"].map((step, i) => {
                                const stepConfig = statusConfig[step];
                                const isActive = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"].indexOf(order.status) >= i;
                                const isCurrent = order.status === step;

                                return (
                                  <div key={step} className="flex items-center gap-2 flex-1">
                                    <div className={`flex-1 h-2 rounded-full ${
                                      isActive ? "bg-mediterranean" : "bg-gray-200"
                                    } ${isCurrent ? "ring-2 ring-mediterranean/30" : ""}`} />
                                    {i < 4 && (
                                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                        isActive ? "bg-mediterranean text-white" : "bg-gray-200"
                                      }`}>
                                        <stepConfig.icon className="w-2.5 h-2.5" />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] text-gray-400 uppercase tracking-wider">
                              <span>En attente</span>
                              <span>Confirmée</span>
                              <span>Préparation</span>
                              <span>Expédiée</span>
                              <span>Livrée</span>
                            </div>
                          </div>

                          {/* Actions */}
                          {config.next && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleStatusUpdate(order.id, config.next!)}
                                disabled={updatingStatus === order.id}
                                className="px-4 py-2 bg-mediterranean text-white rounded-lg text-sm font-semibold hover:bg-mediterranean-dark transition-colors disabled:opacity-50"
                              >
                                {updatingStatus === order.id ? "Mise à jour..." : `Passer à "${statusConfig[config.next]?.label}"`}
                              </button>
                              <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                                Annuler la commande
                              </button>
                            </div>
                          )}

                          {order.trackingNumber && (
                            <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-2">
                              <Truck className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-blue-700">
                                Numéro de suivi: <strong>{order.trackingNumber}</strong>
                              </span>
                            </div>
                          )}
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Page {currentPage} sur {totalPages}</p>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/commandes?page=${Math.max(1, currentPage - 1)}`}
              className={`p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors ${
                currentPage === 1 ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <Link
              href={`/admin/commandes?page=${Math.min(totalPages, currentPage + 1)}`}
              className={`p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors ${
                currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}