"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Mail, MapPin, Phone, Heart } from "lucide-react";

const footerLinks = {
  boutique: [
    { label: "Tous les produits", href: "/boutique" },
    { label: "Vêtements", href: "/boutique?categorie=vetements" },
    { label: "Accessoires Plage", href: "/boutique?categorie=accessoires-plage" },
    { label: "Coques & Tech", href: "/boutique?categorie=coques-tech" },
    { label: "Nouveautés", href: "/boutique?tri=nouveautes" },
  ],
  marque: [
    { label: "Notre histoire", href: "/a-propos" },
    { label: "La marque déposée", href: "/a-propos#marque" },
    { label: "Ambassadeurs", href: "/ambassadeurs" },
    { label: "Presse & Médias", href: "/presse" },
  ],
  aide: [
    { label: "Livraison & Retours", href: "/livraison" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "CGV", href: "/cgv" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-sm-deep text-white">
      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand avec logo */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="relative w-48">
                <Image
                  src="/images/Logo-saintemaxime.png"
                  alt="#SAINTEMAXIME Lifestyle"
                  width={192}
                  height={60}
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm">
              La marque lifestyle officielle de Sainte-Maxime depuis 2019. 
              Des produits uniques estampillés <span className="text-sm-turquoise font-semibold">#SAINTEMAXIME</span> pour porter le Golfe de Saint-Tropez.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-sm-turquoise" />
                <span>Sainte-Maxime, Var 83120, France</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-sm-turquoise" />
                <span>contact@hashtagsaintemaxime.fr</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-sm-turquoise" />
                <span>+33 6 XX XX XX XX</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-sm-turquoise">Boutique</h4>
            <ul className="space-y-3">
              {footerLinks.boutique.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-sm-turquoise transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-sm-turquoise">La Marque</h4>
            <ul className="space-y-3">
              {footerLinks.marque.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-sm-turquoise transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-sm-turquoise">Aide</h4>
            <ul className="space-y-3">
              {footerLinks.aide.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-sm-turquoise transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm flex items-center gap-1">
            © 2026 <span className="text-sm-turquoise font-semibold">#SAINTEMAXIME</span> Lifestyle. Marque déposée. Tous droits réservés.
            <Heart className="w-3 h-3 text-sm-red inline ml-1" />
          </p>
          <div className="flex items-center gap-6 text-white/40 text-sm">
            <Link href="/mentions-legales" className="hover:text-sm-turquoise transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-sm-turquoise transition-colors">Confidentialité</Link>
            <Link href="/cgv" className="hover:text-sm-turquoise transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}