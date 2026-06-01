"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw, Star, ChevronLeft, ChevronRight } from "lucide-react";
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
  tags: string[];
  seoTitle?: string | null;
  seoDesc?: string | null;
  h1?: string | null;
  h2?: string | null;
  sales: number;
  stock: number;
  variants: Array<{
    id: string;
    size?: string | null;
    color?: string | null;
    sku: string;
    stock: number;
    price?: number | null;
    image?: string | null;
  }>;
}

interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  category: string;
  variants: Array<{ id: string; size?: string | null; sku: string }>;
}

export default function ProductDetail({ product, relatedProducts }: { product: Product; relatedProducts: RelatedProduct[] }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const variant = product.variants.find(v => v.id === selectedVariant);
    addItem({
      productId: product.id,
      variantId: selectedVariant || undefined,
      name: product.name,
      price: variant?.price || product.price,
      image: product.images[0] || "/placeholder.jpg",
      quantity,
      size: variant?.size || undefined,
      color: variant?.color || undefined,
    });
    toast.success(`${product.name} ajouté au panier ! ❤`, {
      icon: "🛍️",
      style: { borderRadius: "12px", background: "#1A1A1A", color: "#fff" },
    });
  };

  const discount = product.comparePrice ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

  return (
    <div className="pt-28 pb-24 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-sm-turquoise transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/boutique" className="hover:text-sm-turquoise transition-colors">Boutique</Link>
          <span>/</span>
          <Link href={`/boutique?categorie=${product.category}`} className="hover:text-sm-turquoise transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-sm-deep font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100"
            >
              <Image
                src={product.images[selectedImage] || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-sm-red text-white text-sm font-bold px-4 py-2 rounded-full">
                  -{discount}%
                </span>
              )}
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImage === index ? "border-sm-turquoise" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-sm-turquoise font-semibold uppercase tracking-wider">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-sm-deep mt-2">
                {product.h1 || product.name}
              </h1>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">4.9 ({product.sales} ventes)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-sm-deep">{product.price.toFixed(2)}€</span>
              {product.comparePrice && (
                <span className="text-xl text-gray-400 line-through">{product.comparePrice.toFixed(2)}€</span>
              )}
              {discount > 0 && (
                <span className="text-sm font-semibold text-sm-red bg-sm-red/10 px-2 py-1 rounded-lg">
                  Économisez {(product.comparePrice! - product.price).toFixed(2)}€
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-sm-deep mb-2">Taille / Variante</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                        selectedVariant === variant.id
                          ? "border-sm-turquoise bg-sm-turquoise/5 text-sm-turquoise"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      } ${variant.stock < 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={variant.stock < 1}
                    >
                      {variant.size || variant.color || "Standard"}
                      {variant.stock < 5 && variant.stock > 0 && (
                        <span className="ml-1 text-[10px] text-sm-red">({variant.stock} restant{variant.stock > 1 ? "s" : ""})</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-sm-deep mb-2">Quantité</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-sm-turquoise text-white rounded-xl font-bold text-lg hover:bg-sm-turquoiseDark transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Ajouter au panier
              </button>
              <button className="w-14 h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-sm-red hover:bg-sm-red/5 transition-colors">
                <Heart className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-14 h-14 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-sm-turquoise hover:bg-sm-turquoise/5 transition-colors">
                <Share2 className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center">
                <Truck className="w-6 h-6 text-sm-turquoise mx-auto mb-2" />
                <p className="text-xs font-semibold text-sm-deep">Livraison rapide</p>
                <p className="text-[10px] text-gray-500">2-5 jours ouvrés</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-sm-turquoise mx-auto mb-2" />
                <p className="text-xs font-semibold text-sm-deep">Paiement sécurisé</p>
                <p className="text-[10px] text-gray-500">Stripe & SSL</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-sm-turquoise mx-auto mb-2" />
                <p className="text-xs font-semibold text-sm-deep">Retours 14 jours</p>
                <p className="text-[10px] text-gray-500">Satisfait ou remboursé</p>
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold text-sm-deep mb-8">Vous aimerez aussi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp, index) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/produit/${rp.slug}`} className="group block">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                      <Image
                        src={rp.images[0] || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&q=80"}
                        alt={rp.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-semibold text-sm-deep group-hover:text-sm-turquoise transition-colors">{rp.name}</h3>
                    <p className="text-sm text-gray-500">{rp.category}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-sm-deep">{rp.price.toFixed(2)}€</span>
                      {rp.comparePrice && (
                        <span className="text-xs text-gray-400 line-through">{rp.comparePrice.toFixed(2)}€</span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}