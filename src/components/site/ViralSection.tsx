"use client";

import { motion } from "framer-motion";
import { Camera, Gift, Timer, Zap, TrendingUp, Share2, Heart } from "lucide-react";
import Link from "next/link";

const viralIdeas = [
  {
    icon: Camera,
    title: "#SAINTEMAXIME Challenge",
    description: "Postez votre photo avec le hashtag #SAINTEMAXIME sur Instagram. Chaque mois, le meilleur cliché gagne un week-end à Sainte-Maxime !",
    color: "bg-gradient-to-br from-sm-turquoise to-blue-500",
    stats: "2,847 posts",
    cta: "Participer",
    href: "#challenge",
  },
  {
    icon: Gift,
    title: "Pack Lifestyle",
    description: "Box exclusive : serviette + coque + tote bag coordonnés + carte postale personnalisée avec votre prénom. Le cadeau parfait qui fait le buzz.",
    color: "bg-gradient-to-br from-sm-red to-rose-500",
    stats: "Édition limitée",
    cta: "Commander",
    href: "/boutique?pack=lifestyle",
  },
  {
    icon: Timer,
    title: "Drop Coucher de Soleil",
    description: "Nouvelle collection chaque vendredi 18h. Compte à rebours en direct. Une fois épuisée, elle ne revient jamais. FOMO garanti.",
    color: "bg-gradient-to-br from-orange-400 to-amber-500",
    stats: "Prochain drop : J-3",
    cta: "Activer l'alerte",
    href: "#drops",
  },
  {
    icon: Zap,
    title: "La Serviette Connectée",
    description: "QR code discret sur votre serviette de plage → scan = playlist Spotify 'Saint-Tropez Summer', recette du Tropézien, réduction exclusive.",
    color: "bg-gradient-to-br from-sm-turquoiseLight to-cyan-400",
    stats: "Nouveauté 2026",
    cta: "Découvrir",
    href: "/boutique?produit=serviette-qr",
  },
  {
    icon: TrendingUp,
    title: "Collab Serveurs de Plage",
    description: "20 serveurs et barmans des plages de Sainte-Maxime portent vos bracelets #SAINTEMAXIME. Visibilité organique massive.",
    color: "bg-gradient-to-br from-emerald-400 to-teal-500",
    stats: "Partenariat actif",
    cta: "Devenir ambassadeur",
    href: "#ambassadeur",
  },
  {
    icon: Share2,
    title: "Mur UGC Live",
    description: "Vos photos apparaissent en direct sur notre site. Chaque partage = code promo -10%. Boucle d'engagement infinie.",
    color: "bg-gradient-to-br from-sm-turquoise to-sm-turquoiseDark",
    stats: "Photos en direct",
    cta: "Voir le mur",
    href: "#ugc",
  },
];

export default function ViralSection() {
  return (
    <section className="section-padding py-24 bg-gradient-to-b from-sm-cream to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-sm-red/10 text-sm-red rounded-full text-sm font-bold">
            <Heart className="w-4 h-4 animate-heart-beat" />
            Stratégies Virales 2026
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-sm-deep mt-4">
            Multipliez votre visibilité
          </h2>
          <p className="text-sm-gray mt-4 max-w-2xl mx-auto text-lg">
            Des mécaniques conçues pour créer le buzz et transformer vos clients en ambassadeurs 
            <span className="text-sm-turquoise font-semibold"> #SAINTEMAXIME</span>
            <span className="font-script text-sm-red text-xl ml-1">❤</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {viralIdeas.map((idea, index) => (
            <motion.div
              key={idea.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Header coloré */}
              <div className={`${idea.color} p-6 text-white`}>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <idea.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    {idea.stats}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold mt-4">{idea.title}</h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm-gray text-sm leading-relaxed mb-6">
                  {idea.description}
                </p>
                <Link
                  href={idea.href}
                  className="inline-flex items-center gap-2 text-sm-turquoise font-semibold text-sm hover:gap-3 transition-all"
                >
                  {idea.cta}
                  <span className="text-lg">→</span>
                </Link>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-sm-turquoise/5 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}