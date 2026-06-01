"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  sales: number;
  price: number;
  images: string[];
}

export default function TopProducts({ products }: { products: Product[] }) {
  const displayProducts = products.length > 0 ? products : getMockProducts();
  const maxSales = Math.max(...displayProducts.map(p => p.sales));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm"
    >
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-display font-bold text-deep">Top produits</h3>
          <p className="text-sm text-gray-500">Meilleures ventes du mois</p>
        </div>
        <Link 
          href="/admin/produits" 
          className="text-sm text-mediterranean font-semibold hover:underline flex items-center gap-1"
        >
          Voir tout
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="p-4 space-y-4">
        {displayProducts.map((product, index) => {
          const percentage = (product.sales / maxSales) * 100;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={product.images[0] || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&q=80"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-deep truncate">{product.name}</p>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    {product.sales}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-mediterranean to-sand"
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-12 text-right">{product.price.toFixed(2)}€</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function getMockProducts(): Product[] {
  return [
    { id: "1", name: "T-shirt #SAINTEMAXIME Classic", sales: 120, price: 29.90, images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80"] },
    { id: "2", name: "Bracelet Silicone Édition Été", sales: 350, price: 12.90, images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&q=80"] },
    { id: "3", name: "Coque iPhone #SAINTEMAXIME", sales: 200, price: 24.90, images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80"] },
    { id: "4", name: "Serviette de Plage Premium", sales: 85, price: 45.00, images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&q=80"] },
    { id: "5", name: "Tote Bag #SAINTEMAXIME", sales: 95, price: 19.90, images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=100&q=80"] },
  ];
}