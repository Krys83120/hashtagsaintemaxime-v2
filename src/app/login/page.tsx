"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erreur de connexion");
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sm-deep via-sm-turquoiseDark to-sm-deep flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="relative w-48 mx-auto">
              <Image
                src="/images/Logo-saintemaxime.png"
                alt="#SAINTEMAXIME Lifestyle"
                width={192}
                height={60}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </Link>
          <p className="text-white/60 mt-3 font-script text-xl">❤ Espace administrateur</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-display font-bold text-sm-deep mb-1">Connexion</h2>
          <p className="text-gray-500 text-sm mb-6">Accédez à votre tableau de bord</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-sm-red/10 text-sm-red text-sm p-3 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-sm-deep mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hashtagsaintemaxime.fr"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sm-turquoise/20 focus:border-sm-turquoise transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-sm-deep mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sm-turquoise/20 focus:border-sm-turquoise transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-500">Se souvenir de moi</span>
              </label>
              <Link href="/forgot-password" className="text-sm-turquoise hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-sm-turquoise text-white rounded-xl font-semibold hover:bg-sm-turquoiseDark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? "Connexion..." : (
                <>
                  Se connecter
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-sm-turquoise transition-colors">
              ← Retour au site
            </Link>
          </div>
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          © 2026 <span className="text-sm-turquoise font-semibold">#SAINTEMAXIME</span> Lifestyle. Tous droits réservés.
          <span className="text-sm-red ml-1">❤</span>
        </p>
      </motion.div>
    </div>
  );
}