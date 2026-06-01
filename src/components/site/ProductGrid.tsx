"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/components/site/CartProvider";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  category: string;
  sales: number;
  isFeatured: boolean;
  variants: Array<{
    id: string;
    size?: string | null;
    color?: string | null;
    sku: string;
  }>;
}

export default function ProductGrid({ 
  products, 
  total, 
  page, 
  totalPages 
}: { 
  products: Product[]; 
  total: number; 
  page: number; 
  totalPages: number;
}) {
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/placeholder.jpg",
      quantity: 1,
    });
    toast.success(`${product.name} ajouté au panier ! ❤`, {
      icon: "🛍️",
      style: { borderRadius: "12px", background: "#1A1A1A", color: "#fff" },
    });
  };

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">{total} produit{total > 1 ? "s" : ""} trouvé{total > 1 ? "s" : ""}</p>

        <select 
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sm-turquoise/20"
          onChange={(e) => {
            const url = new URL(window.location.href);
            url.searchParams.set("tri", e.target.value);
            window.location.href = url.toString();
          }}
        >
          <option value="nouveautes">Nouveautés</option>
          <option value="popularite">Popularité</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <Link href={`/produit/${product.slug}`} className="block relative aspect-square overflow-hidden">
                <Image
                  src={product.images[0] || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button 
                      onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                      className="flex-1 bg-white text-sm-deep py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-sm-turquoise hover:text-white transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Ajouter
                    </button>
                    <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-sm-red/10 transition-colors">
                      <Heart className="w-5 h-5 text-sm-deep" />
                    </button>
                    <Link 
                      href={`/produit/${product.slug}`}
                      className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-sm-turquoise hover:text-white transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {product.comparePrice && (
                  <span className="absolute top-3 left-3 bg-sm-red text-white text-xs font-bold px-3 py-1 rounded-full">
                    -{Math.round((1 - product.price / product.comparePrice) * 100)}%
                  </span>
                )}
                {product.isFeatured && (
                  <span className="absolute top-3 right-3 bg-sm-turquoise text-white text-xs font-bold px-3 py-1 rounded-full">
                    Best-seller
                  </span>
                )}
              </Link>

              <div className="p-5">
                <span className="text-xs text-sm-turquoise font-semibold uppercase tracking-wider">{product.category}</span>
                <Link href={`/produit/${product.slug}`}>
                  <h3 className="text-lg font-display font-bold text-sm-deep mt-1 group-hover:text-sm-turquoise transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xl font-bold text-sm-deep">{product.price.toFixed(2)}€</span>
                  {product.comparePrice && (
                    <span className="text-sm text-gray-400 line-through">{product.comparePrice.toFixed(2)}€</span>
                  )}
                </div>

                {product.variants.length > 0 && (
                  <div className="flex gap-1 mt-3">
                    {product.variants.slice(0, 4).map((v) => (
                      <span key={v.id} className="w-6 h-6 rounded-full bg-gray-100 text-[10px] flex items-center justify-center text-sm-gray border border-gray-200">
                        {v.size?.charAt(0) || "S"}
                      </span>
                    ))}
                    {product.variants.length > 4 && (
                      <span className="w-6 h-6 rounded-full bg-gray-100 text-[10px] flex items-center justify-center text-sm-gray">
                        +{product.variants.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <a href={`?page=${Math.max(1, page - 1)}`} className={`p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors ${page === 1 ? "opacity-50 pointer-events-none" : ""}`}>
            <ChevronLeft className="w-5 h-5" />
          </a>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <a key={pageNum} href={`?page=${pageNum}`} className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-colors ${page === pageNum ? "bg-sm-turquoise text-white" : "border border-gray-200 hover:bg-gray-50 text-sm-deep"}`}>
                {pageNum}
              </a>
            );
          })}
          <a href={`?page=${Math.min(totalPages, page + 1)}`} className={`p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors ${page === totalPages ? "opacity-50 pointer-events-none" : ""}`}>
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      )}
    </div>
  );
}