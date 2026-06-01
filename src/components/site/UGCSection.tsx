"use client";

import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import Image from "next/image";

const mockPosts = [
  { id: 1, user: "@sophie_sttropez", likes: 234, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80", caption: "Ma serviette #SAINTEMAXIME sur la plage de la Nartelle ☀️❤" },
  { id: 2, user: "@marc_cotedazur", likes: 189, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80", caption: "Le t-shirt parfait pour l'été ! #SAINTEMAXIME Lifestyle ❤" },
  { id: 3, user: "@laura_vacances", likes: 567, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80", caption: "Coque trop stylée 🌊 #SAINTEMAXIME Lifestyle ❤" },
  { id: 4, user: "@julien_golfe", likes: 312, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", caption: "Bracelet en silicone pour toute la famille 👨‍👩‍👧‍👦❤" },
  { id: 5, user: "@emma_sud", likes: 445, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80", caption: "Mon tote bag préféré pour les marchés provençaux 🍋❤" },
  { id: 6, user: "@thomas_ete", likes: 278, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80", caption: "Sweat parfait pour les soirées fraîches au bord de l'eau ❤" },
];

export default function UGCSection() {
  return (
    <section className="section-padding py-24 bg-sm-deep text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-sm-turquoise/20 backdrop-blur-sm rounded-full text-sm font-semibold text-sm-turquoise border border-sm-turquoise/30">
            <Instagram className="w-4 h-4" />
            Communauté #SAINTEMAXIME
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">
            Vos moments, notre marque
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto text-lg">
            Chaque photo partagée avec <span className="text-sm-turquoise font-semibold">#SAINTEMAXIME</span> apparaît ici. 
            Partagez le vôtre pour gagner <span className="text-sm-red font-bold">-10%</span> !
            <span className="font-script text-sm-red text-xl ml-1">❤</span>
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {mockPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer"
            >
              <div className={`relative ${index % 3 === 0 ? "aspect-[3/4]" : index % 3 === 1 ? "aspect-square" : "aspect-[4/5]"}`}>
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-sm-deep/90 via-sm-deep/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium mb-2 line-clamp-2">{post.caption}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-xs">{post.user}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-white/80 text-xs">
                          <Heart className="w-3 h-3 fill-sm-red text-sm-red" />
                          {post.likes}
                        </span>
                        <ExternalLink className="w-4 h-4 text-white/60" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://instagram.com/hashtag/saintemaxime" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm-turquoise hover:text-white transition-colors font-semibold"
          >
            <Instagram className="w-5 h-5" />
            Voir plus sur Instagram
            <Heart className="w-4 h-4 text-sm-red" />
          </a>
        </div>
      </div>
    </section>
  );
}