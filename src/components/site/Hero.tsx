"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Play, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background avec photo #saintemaxime */}
      <div className="absolute inset-0">
        <Image
          src="/images/#saintemaxime.jpg"
          alt="#SAINTEMAXIME - La plage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sm-deep/70 via-sm-deep/50 to-sm-deep/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-sm-turquoise/20 to-transparent" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-sm-turquoise/30 rounded-full"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 800,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding text-center max-w-5xl mx-auto pt-20">
        {/* Logo Lifestyle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-64 md:w-80">
            <Image
              src="/images/Logo-saintemaxime.png"
              alt="#SAINTEMAXIME Lifestyle"
              width={320}
              height={100}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-sm-turquoise/20 backdrop-blur-sm rounded-full text-sm-turquoise text-sm font-semibold border border-sm-turquoise/30">
            <TrendingUp className="w-4 h-4" />
            Marque déposée depuis 2019
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white mb-6 leading-tight text-shadow-lg"
        >
          Le Lifestyle du
          <br />
          <span className="text-sm-turquoise">Golfe de Saint-Tropez</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/80 mb-4 font-light max-w-2xl mx-auto"
        >
          Vêtements, accessoires & produits de plage estampillés 
          <span className="text-sm-turquoise font-semibold"> #SAINTEMAXIME</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/60 mb-10 max-w-xl mx-auto"
        >
          Des souvenirs uniques que vous ne trouverez nulle part ailleurs.
          <br />
          <span className="font-script text-xl text-sm-red">❤</span> Livraison dans le Golfe de Saint-Tropez
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/boutique" className="btn-primary text-lg px-8 py-4 group bg-sm-turquoise hover:bg-sm-turquoiseDark">
            Découvrir la boutique
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="flex items-center gap-3 text-white hover:text-sm-turquoise transition-colors group">
            <span className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-sm-turquoise transition-colors">
              <Play className="w-5 h-5 ml-1" />
            </span>
            <span className="font-semibold">Voir la vidéo</span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: "50+", label: "Produits uniques" },
            { value: "2.8K", label: "# postés" },
            { value: "4.9", label: "Note clients" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-sm-turquoise/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-sm-turquoise rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}