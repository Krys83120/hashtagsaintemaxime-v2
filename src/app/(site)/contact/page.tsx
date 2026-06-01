import { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { Mail, MapPin, Phone, Clock, Instagram, Facebook, Send, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | #SAINTEMAXIME Lifestyle - Boutique Officielle Sainte-Maxime",
  description: "Contactez l'équipe #SAINTEMAXIME Lifestyle. Questions, collaborations, suggestions ? Nous sommes là pour vous aider.",
  keywords: ["contact #SAINTEMAXIME", "Sainte-Maxime", "service client", "collaboration", "lifestyle"],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-sm-cream">
      <Navbar />

      <section className="pt-32 pb-20 section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="relative w-40">
                <Image
                  src="/images/Logo-saintemaxime.png"
                  alt="#SAINTEMAXIME Lifestyle"
                  width={160}
                  height={50}
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-sm-deep mb-4">Contactez-nous</h1>
            <p className="text-sm-gray max-w-2xl mx-auto">
              Une question, une suggestion, ou envie de collaborer ? L'équipe #SAINTEMAXIME Lifestyle est à votre écoute
              <span className="font-script text-sm-red text-xl ml-1">❤</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-display font-bold text-sm-deep mb-6">Nos Coordonnées</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sm-turquoise/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-sm-turquoise" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm-deep">Adresse</h3>
                      <p className="text-sm-gray text-sm mt-1">Sainte-Maxime, 83120 Var, France</p>
                      <p className="text-gray-400 text-xs mt-0.5">Golfe de Saint-Tropez</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sm-turquoise/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-sm-turquoise" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm-deep">Email</h3>
                      <p className="text-sm-gray text-sm mt-1">contact@hashtagsaintemaxime.fr</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sm-turquoise/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-sm-turquoise" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm-deep">Téléphone</h3>
                      <p className="text-sm-gray text-sm mt-1">+33 6 XX XX XX XX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sm-turquoise/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-sm-turquoise" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm-deep">Disponibilité</h3>
                      <p className="text-sm-gray text-sm mt-1">Lun - Ven : 9h - 18h</p>
                      <p className="text-gray-400 text-xs mt-0.5">Réponse sous 24h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-display font-bold text-sm-deep mb-4">Réseaux Sociaux</h2>
                <div className="flex gap-4">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                     className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                     className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-sm-gray text-sm mt-4">
                  Suivez-nous et partagez vos moments avec <strong className="text-sm-turquoise">#SAINTEMAXIME</strong>
                  <span className="text-sm-red ml-1">❤</span>
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-display font-bold text-sm-deep mb-6">Envoyez un message</h2>

              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sm-deep mb-1.5">Prénom</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sm-turquoise/20 focus:border-sm-turquoise transition-all" placeholder="Jean" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sm-deep mb-1.5">Nom</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sm-turquoise/20 focus:border-sm-turquoise transition-all" placeholder="Dupont" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sm-deep mb-1.5">Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sm-turquoise/20 focus:border-sm-turquoise transition-all" placeholder="jean@email.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sm-deep mb-1.5">Sujet</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sm-turquoise/20 focus:border-sm-turquoise transition-all">
                    <option>Question sur un produit</option>
                    <option>Commande</option>
                    <option>Collaboration</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sm-deep mb-1.5">Message</label>
                  <textarea rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sm-turquoise/20 focus:border-sm-turquoise transition-all resize-none" placeholder="Votre message..."></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-sm-turquoise text-white rounded-xl font-bold hover:bg-sm-turquoiseDark transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Envoyer le message
                  <Heart className="w-4 h-4 text-sm-red" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
