import type { Metadata } from "next";
import { Inter, Montserrat, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  display: "swap",
});

const dancing = Dancing_Script({ 
  subsets: ["latin"], 
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "#SAINTEMAXIME Lifestyle | Boutique Officielle - Souvenirs Sainte-Maxime & Golfe de Saint-Tropez",
  description: "Boutique officielle #SAINTEMAXIME Lifestyle. Découvrez nos produits uniques estampillés de la marque déposée : vêtements, accessoires, produits de plage et souvenirs de Sainte-Maxime. Livraison dans le Golfe de Saint-Tropez.",
  keywords: ["#SAINTEMAXIME", "Sainte-Maxime", "Saint-Tropez", "souvenirs", "boutique", "Côte d'Azur", "Golfe de Saint-Tropez", "vêtements", "accessoires plage", "lifestyle"],
  authors: [{ name: "#SAINTEMAXIME Lifestyle" }],
  creator: "#SAINTEMAXIME Lifestyle",
  publisher: "#SAINTEMAXIME Lifestyle",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://hashtagsaintemaxime.fr",
    siteName: "#SAINTEMAXIME Lifestyle",
    title: "#SAINTEMAXIME Lifestyle | Boutique Officielle",
    description: "Produits uniques estampillés #SAINTEMAXIME Lifestyle - Marque déposée depuis 2019",
    images: [{
      url: "https://hashtagsaintemaxime.fr/images/Logo-saintemaxime.png",
      width: 1200,
      height: 630,
      alt: "#SAINTEMAXIME Lifestyle Boutique Officielle",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "#SAINTEMAXIME Lifestyle | Boutique Officielle",
    description: "Produits uniques estampillés #SAINTEMAXIME Lifestyle",
    images: ["https://hashtagsaintemaxime.fr/images/Logo-saintemaxime.png"],
  },
  alternates: {
    canonical: "https://hashtagsaintemaxime.fr",
  },
  verification: {
    google: "votre-code-verification-google",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable} ${dancing.variable}`}>
      <body className="font-sans antialiased bg-sm-cream text-sm-deep">
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}