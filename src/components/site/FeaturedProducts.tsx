"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Heart, Eye, Star } from "lucide-react";
import { useCart } from "@/components/site/CartProvider";
import toast from "react-hot-toast";

interface ProductWithVariants {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  category: string;
  sales: number;
  variants: Array<{
    id: string;
    size?: string | null;
    color?: string | null;
    sku: string;
  }>;
}

export default function FeaturedProducts({ products }: { products: ProductWithVariants[] }) {
  const { addItem } = useCart();

  const handleAddToCart = (product: ProductWithVariants) => {
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

  const displayProducts = products.length > 0 ? products : getMockProducts();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm-turquoise font-semibold uppercase tracking-widest text-sm">Best-Sellers</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-sm-deep mt-3">
          Nos produits phares
        </h2>
        <p className="text-sm-gray mt-4 max-w-2xl mx-auto">
          Les favoris de nos clients, directement inspirés du Golfe de Saint-Tropez
          <span className="font-script text-sm-red text-xl ml-1">❤</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              {/* Image */}
              <Link href={`/produit/${product.slug}`} className="block relative aspect-square overflow-hidden">
                <Image
                  src={product.images[0] || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay actions */}
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

                {/* Badges */}
                {product.comparePrice && (
                  <span className="absolute top-3 left-3 bg-sm-red text-white text-xs font-bold px-3 py-1 rounded-full">
                    -{Math.round((1 - product.price / product.comparePrice) * 100)}%
                  </span>
                )}
                {product.sales > 50 && (
                  <span className="absolute top-3 right-3 bg-sm-turquoise text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Top vente
                  </span>
                )}
              </Link>

              {/* Info */}
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

                {/* Variants */}
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

      <div className="text-center mt-12">
        <Link href="/boutique" className="btn-secondary inline-flex border-sm-turquoise text-sm-turquoise hover:bg-sm-turquoise hover:text-white">
          Voir tous les produits
        </Link>
      </div>
    </div>
  );
}

function getMockProducts(): ProductWithVariants[] {
  return [
    {
      id: "1", name: "T-shirt #SAINTEMAXIME Classic", slug: "tshirt-classic",
      description: "Le must-have de l'été", price: 29.90, comparePrice: 39.90,
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"],
      category: "Vêtements", sales: 120,
      variants: [{ id: "v1", size: "S", color: "Blanc", sku: "TS-001-S" }, { id: "v2", size: "M", sku: "TS-001-M" }, { id: "v3", size: "L", sku: "TS-001-L" }],
    },
    {
      id: "2", name: "Serviette de Plage Premium", slug: "serviette-plage",
      description: "100% coton éponge", price: 45.00,
      images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80"],
      category: "Accessoires Plage", sales: 85,
      variants: [{ id: "v4", size: "Standard", sku: "SP-001" }],
    },
    {
      id: "3", name: "Coque iPhone #SAINTEMAXIME", slug: "coque-iphone",
      description: "Protection premium", price: 24.90,
      images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"],
      category: "Coques & Tech", sales: 200,
      variants: [{ id: "v5", size: "iPhone 14", sku: "CI-14" }, { id: "v6", size: "iPhone 15", sku: "CI-15" }],
    },
    {
      id: "4", name: "Bracelet Silicone Édition Été", slug: "bracelet-ete",
      description: "Couleurs méditerranée", price: 12.90, comparePrice: 15.90,
      images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80"],
      category: "Bracelets", sales: 350,
      variants: [{ id: "v7", size: "S", sku: "BR-S" }, { id: "v8", size: "M", sku: "BR-M" }, { id: "v9", size: "L", sku: "BR-L" }],
    },
    {
      id: "5", name: "Tote Bag #SAINTEMAXIME", slug: "tote-bag",
      description: "Cabas en toile épaisse", price: 19.90,
      images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80"],
      category: "Accessoires Plage", sales: 95,
      variants: [{ id: "v10", size: "Standard", sku: "TB-001" }],
    },
    {
      id: "6", name: "Sweat à Capuche #SAINTEMAXIME", slug: "sweat-capuche",
      description: "Confort pour les soirées", price: 49.90,
      images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80"],
      category: "Vêtements", sales: 60,
      variants: [{ id: "v11", size: "S", sku: "SW-S" }, { id: "v12", size: "M", sku: "SW-M" }, { id: "v13", size: "L", sku: "SW-L" }],
    },
    {
      id: "7", name: "Coussin Décoratif", slug: "coussin-decoratif",
      description: "Pour votre intérieur", price: 34.90,
      images: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=600&q=80"],
      category: "Accessoires Plage", sales: 40,
      variants: [{ id: "v14", size: "40x40", sku: "CU-4040" }],
    },
    {
      id: "8", name: "Polo #SAINTEMAXIME Élégance", slug: "polo-elegance",
      description: "Style méditerranéen", price: 39.90, comparePrice: 49.90,
      images: ["https://images.unsplash.com/photo-1625910513413-5fc7e5e54e8c?w=600&q=80"],
      category: "Vêtements", sales: 75,
      variants: [{ id: "v15", size: "S", sku: "PO-S" }, { id: "v16", size: "M", sku: "PO-M" }],
    },
  ];
}