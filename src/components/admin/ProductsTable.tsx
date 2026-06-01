"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Pencil, Trash2, Eye, Package, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  category: string;
  isActive: boolean;
  stock: number;
  sales: number;
  printfulId?: string | null;
  variants: Array<{ id: string; size?: string | null; color?: string | null; sku: string; stock: number }>;
}

export default function ProductsTable({ 
  products, 
  totalPages, 
  currentPage 
}: { 
  products: Product[]; 
  totalPages: number; 
  currentPage: number;
}) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="bg-mediterranean/5 border-b border-mediterranean/10 px-6 py-3 flex items-center gap-4"
        >
          <span className="text-sm font-semibold text-mediterranean">
            {selectedProducts.length} sélectionné(s)
          </span>
          <button className="text-sm text-red-600 hover:text-red-700 font-medium">
            Supprimer
          </button>
          <button className="text-sm text-mediterranean hover:text-mediterranean-dark font-medium">
            Activer
          </button>
          <button className="text-sm text-gray-600 hover:text-gray-700 font-medium">
            Désactiver
          </button>
        </motion.div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-4 py-3">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedProducts(products.map(p => p.id));
                    } else {
                      setSelectedProducts([]);
                    }
                  }}
                />
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Produit</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Catégorie</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Stock</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Prix</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Statut</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-4">
                  <input 
                    type="checkbox" 
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleSelect(product.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={product.images[0] || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&q=80"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-deep truncate">{product.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">{product.variants.length} variantes</span>
                        {product.printfulId && (
                          <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
                            Printful
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-gray-600">{product.category}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${
                      product.stock < 10 ? "text-red-600" : "text-deep"
                    }`}>
                      {product.stock}
                    </span>
                    {product.stock < 10 && (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <div>
                    <p className="text-sm font-semibold text-deep">{product.price.toFixed(2)}€</p>
                    {product.comparePrice && (
                      <p className="text-xs text-gray-400 line-through">{product.comparePrice.toFixed(2)}€</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  {product.isActive ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Actif
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      <Package className="w-3 h-3" />
                      Inactif
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <Link 
                      href={`/produit/${product.slug}`}
                      target="_blank"
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link 
                      href={`/admin/produits/${product.id}/edit`}
                      className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-blue-500" />
                    </Link>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {currentPage} sur {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/produits?page=${Math.max(1, currentPage - 1)}`}
              className={`p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors ${
                currentPage === 1 ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <Link
              href={`/admin/produits?page=${Math.min(totalPages, currentPage + 1)}`}
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