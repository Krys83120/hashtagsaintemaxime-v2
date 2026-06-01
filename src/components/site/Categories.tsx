"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";

const defaultCategories = [
  {
    name: "Vêtements",
    slug: "vetements",
    description: "T-shirts, polos, sweats & plus",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    count: 18,
  },
  {
    name: "Accessoires Plage",
    slug: "accessoires-plage",
    description: "Serviettes, tote bags, coussins",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    count: 12,
  },
  {
    name: "Coques & Tech",
    slug: "coques-tech",
    description: "Coques iPhone, Samsung, etc.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    count: 8,
  },
  {
    name: "Bracelets & Bijoux",
    slug: "bracelets",
    description: "Silicone, métal, personnalisés",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    count: 6,
  },
];

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
}

export default function Categories({ categories }: { categories: Category[] }) {
  const displayCategories = categories.length > 0 
    ? categories.map(c => ({
        name: c.name,
        slug: c.slug,
        description: c.description || "",
        image: c.image || defaultCategories[0].image,
        count: 0,
      }))
    : defaultCategories;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-sm-turquoise font-semibold uppercase tracking-widest text-sm">Nos Collections</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-sm-deep mt-3">
          Explorez nos univers
        </h2>
        <p className="text-sm-gray mt-4 max-w-2xl mx-auto">
          Des produits pour chaque moment de votre séjour dans le Golfe de Saint-Tropez
          <span className="font-script text-sm-red text-xl ml-1">❤</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayCategories.map((category, index) => (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/boutique?categorie=${category.slug}`} className="group block relative overflow-hidden rounded-2xl aspect-[4/5]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sm-deep/80 via-sm-deep/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-sm">{category.description}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-sm-turquoise/20 backdrop-blur-sm flex items-center justify-center 
                                  group-hover:bg-sm-turquoise transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}