"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Shield, Heart } from "lucide-react";
import { useCart } from "@/components/site/CartProvider";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export default function PanierPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shippingCost = totalPrice > 50 ? 0 : 5.90;
  const total = totalPrice + shippingCost;

  return (
    <main className="min-h-screen bg-sm-cream">
      <Navbar />

      <div className="pt-28 pb-24 section-padding">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-sm-deep mb-2">Votre Panier</h1>
          <p className="text-gray-500 mb-8">{totalItems} article{totalItems > 1 ? "s" : ""} <span className="text-sm-red">❤</span></p>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-sm-deep mb-2">Votre panier est vide</h2>
              <p className="text-gray-500 mb-6">Découvrez nos produits #SAINTEMAXIME Lifestyle</p>
              <Link href="/boutique" className="btn-primary inline-flex bg-sm-turquoise hover:bg-sm-turquoiseDark">
                Continuer les achats
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.productId}-${item.variantId}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm-deep truncate">{item.name}</h3>
                      {item.size && <p className="text-sm text-gray-500">Taille: {item.size}</p>}
                      {item.color && <p className="text-sm text-gray-500">Couleur: {item.color}</p>}
                      <p className="text-sm font-bold text-sm-turquoise mt-1">{item.price.toFixed(2)}€</p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="p-2 text-gray-400 hover:text-sm-red transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
                  <h2 className="text-lg font-display font-bold text-sm-deep mb-4">Récapitulatif</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sous-total</span>
                      <span className="font-semibold">{totalPrice.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Livraison</span>
                      <span className="font-semibold">{shippingCost === 0 ? "Gratuite" : `${shippingCost.toFixed(2)}€`}</span>
                    </div>
                    {shippingCost > 0 && (
                      <p className="text-xs text-sm-turquoise">
                        Plus que {(50 - totalPrice).toFixed(2)}€ pour la livraison gratuite !
                      </p>
                    )}
                    <div className="border-t border-gray-100 pt-3 flex justify-between text-lg font-bold text-sm-deep">
                      <span>Total</span>
                      <span>{total.toFixed(2)}€</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckingOut(true)}
                    disabled={isCheckingOut}
                    className="w-full mt-6 py-4 bg-sm-turquoise text-white rounded-xl font-bold hover:bg-sm-turquoiseDark transition-colors disabled:opacity-50"
                  >
                    {isCheckingOut ? "Redirection..." : "Procéder au paiement"}
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>Paiement sécurisé par Stripe</span>
                  </div>

                  <Link href="/boutique" className="block text-center mt-4 text-sm text-sm-turquoise hover:underline">
                    Continuer les achats
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}