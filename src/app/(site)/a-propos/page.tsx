import { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Award, MapPin, Users, TrendingUp, Heart, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Notre Histoire | #SAINTEMAXIME Lifestyle - Marque Déposée depuis 2019",
  description: "Découvrez l'histoire de la marque #SAINTEMAXIME Lifestyle, déposée depuis 2019. Notre mission : porter l'esprit du Golfe de Saint-Tropez partout dans le monde.",
  keywords: ["#SAINTEMAXIME", "marque déposée", "histoire", "Sainte-Maxime", "Saint-Tropez", "Golfe de Saint-Tropez", "lifestyle"],
};

const stats = [
  { icon: Award, value: "2019", label: "Année de dépôt", description: "Marque officiellement déposée" },
  { icon: Users, value: "50+", label: "Produits uniques", description: "Dans notre catalogue" },
  { icon: MapPin, value: "83120", label: "Code postal", description: "Sainte-Maxime, Var" },
  { icon: TrendingUp, value: "2.8K", label: "Posts #SAINTEMAXIME", description: "Sur les réseaux sociaux" },
];

const values = [
  {
    icon: Heart,
    title: "Passion Méditerranéenne",
    description: "Chaque produit est conçu avec amour, inspiré par la lumière, les couleurs et l'atmosphère unique du Golfe de Saint-Tropez.",
  },
  {
    icon: Globe,
    title: "Qualité Internationale",
    description: "Nous collaborons avec Printful pour garantir une qualité d'impression et de fabrication à la hauteur de notre marque.",
  },
  {
    icon: Award,
    title: "Marque Protégée",
    description: "#SAINTEMAXIME est une marque déposée depuis 2019. Un actif unique que nous défendons et valorisons chaque jour.",
  },
];

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-sm-cream">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 section-padding bg-gradient-to-b from-sm-turquoise/5 to-sm-cream">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-sm-turquoise font-semibold uppercase tracking-widest text-sm">Notre Histoire</span>
            <div className="flex justify-center my-6">
              <div className="relative w-64 md:w-80">
                <Image
                  src="/images/Logo-saintemaxime.png"
                  alt="#SAINTEMAXIME Lifestyle"
                  width={320}
                  height={100}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-sm-deep mb-6">
              Le Lifestyle du Golfe
            </h1>
            <p className="text-xl text-sm-gray leading-relaxed max-w-2xl mx-auto">
              Depuis 2019, nous créons des produits uniques qui portent l'identité de Sainte-Maxime 
              et du Golfe de Saint-Tropez. Une marque déposée, un style inimitable
              <span className="font-script text-sm-red text-2xl ml-1">❤</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-sm-turquoise/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-sm-turquoise" />
              </div>
              <p className="text-3xl font-display font-bold text-sm-deep">{stat.value}</p>
              <p className="text-sm font-semibold text-gray-600 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="section-padding py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-sm-deep mb-6">L'Origine d'une Marque</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Née de la passion pour Sainte-Maxime et le Golfe de Saint-Tropez, la marque 
                  <strong className="text-sm-turquoise"> #SAINTEMAXIME</strong> a été officiellement déposée en 2019. Notre objectif était clair : 
                  créer une identité visuelle forte qui représente l'esprit méditerranéen et le partage 
                  avec le monde entier.
                </p>
                <p>
                  Chaque produit est pensé comme un ambassadeur de notre ville. Des vêtements aux accessoires, 
                  en passant par les produits de plage, nous proposons une gamme complète qui permet à chacun 
                  de porter un morceau de Sainte-Maxime au quotidien.
                </p>
                <p>
                  Notre collaboration avec <strong>Printful</strong> nous permet de garantir une qualité 
                  d'impression et de fabrication internationale, tout en maintenant une flexibilité 
                  totale sur nos designs et nos collections.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/#saintemaxime.jpg"
                alt="#SAINTEMAXIME - La plage de Sainte-Maxime"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sm-turquoise/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sm-deep">Nos Valeurs</h2>
            <p className="text-sm-gray mt-3 max-w-2xl mx-auto">
              Ce qui guide chaque décision, chaque produit, chaque interaction avec notre communauté
              <span className="font-script text-sm-red text-xl ml-1">❤</span>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-sm-turquoise to-sm-red rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-sm-deep mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-20 bg-gradient-to-br from-sm-turquoise to-sm-deep text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Rejoignez le mouvement #SAINTEMAXIME
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Portez l'esprit du Golfe de Saint-Tropez. Partagez vos moments avec le hashtag 
            <strong className="text-sm-white"> #SAINTEMAXIME</strong>
            <span className="font-script text-sm-red text-2xl ml-1">❤</span>
          </p>
          <a href="/boutique" className="inline-flex items-center gap-2 px-8 py-4 bg-sm-sand text-white font-bold rounded-xl hover:bg-sm-red transition-colors">
            Découvrir la boutique
            <TrendingUp className="w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
