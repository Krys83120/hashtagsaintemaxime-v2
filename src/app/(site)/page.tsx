import { Suspense } from "react";
import { Metadata } from "next";
import Hero from "@/components/site/Hero";
import FeaturedProducts from "@/components/site/FeaturedProducts";
import Categories from "@/components/site/Categories";
import ViralSection from "@/components/site/ViralSection";
import UGCSection from "@/components/site/UGCSection";
import Newsletter from "@/components/site/Newsletter";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "#SAINTEMAXIME | Boutique Officielle - Souvenirs Sainte-Maxime & Golfe de Saint-Tropez",
  description: "Boutique officielle #SAINTEMAXIME. Marque déposée depuis 2019. Découvrez vêtements, accessoires, produits de plage et souvenirs uniques de Sainte-Maxime.",
  keywords: ["#SAINTEMAXIME", "Sainte-Maxime", "Saint-Tropez", "souvenirs", "boutique", "Côte d'Azur"],
  openGraph: {
    title: "#SAINTEMAXIME | Boutique Officielle",
    description: "Produits uniques estampillés #SAINTEMAXIME - Marque déposée",
    images: ["/og-image.jpg"],
  },
};

async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    take: 8,
    include: { variants: true },
    orderBy: { sales: "desc" },
  });
}

async function getCategories() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      <section id="collections" className="section-padding py-20">
        <Categories categories={categories} />
      </section>

      <section className="section-padding py-20 bg-white">
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Chargement...</div>}>
          <FeaturedProducts products={products} />
        </Suspense>
      </section>

      <ViralSection />

      <UGCSection />

      <Newsletter />

      <Footer />
    </main>
  );
}