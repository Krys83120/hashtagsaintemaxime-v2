"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Heart } from "lucide-react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitted(true);
    toast.success("Bienvenue dans la communauté #SAINTEMAXIME ! ❤", {
      icon: "✨",
      style: { borderRadius: "12px", background: "#1A1A1A", color: "#fff" },
    });
  };

  return (
    <section className="section-padding py-24 bg-gradient-to-br from-sm-turquoise via-sm-turquoiseDark to-sm-deep">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="w-8 h-8 text-sm-red animate-heart-beat" />
            <span className="font-script text-3xl text-white">Lifestyle</span>
            <Heart className="w-8 h-8 text-sm-red animate-heart-beat" />
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Rejoignez le mouvement
          </h2>
          <p className="text-white/80 text-lg mb-2 max-w-2xl mx-auto">
            Inscrivez-vous pour recevoir en avant-première les nouveautés, les drops exclusifs et les offres spéciales.
          </p>
          <p className="text-sm-sand font-semibold mb-10 text-lg">
            -10% sur votre première commande + accès aux drops en avant-première
            <span className="font-script text-sm-red text-xl ml-2">❤</span>
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 
                         focus:outline-none focus:border-sm-sand focus:ring-2 focus:ring-sm-sand/20 transition-all"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-sm-sand text-white font-bold rounded-xl hover:bg-sm-red transition-colors 
                         flex items-center justify-center gap-2 group"
              >
                S'inscrire
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 text-white"
            >
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-xl font-semibold">Vous êtes inscrit ! Vérifiez vos emails.</span>
            </motion.div>
          )}

          <p className="text-white/40 text-sm mt-6">
            Pas de spam. Désinscription à tout moment. En vous inscrivant, vous acceptez nos conditions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}