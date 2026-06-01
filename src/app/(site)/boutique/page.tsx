import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ProductGrid from "@/components/site/ProductGrid";
import FiltersSidebar from "@/components/site/FiltersSidebar";

export const metadata: Metadata = {
  title: "Boutique #SAINTEMAXIME | Vêtements, Accessoires & Souvenirs Sainte-Maxime",
  description: "Découvrez tous nos produits estampillés #SAINTEMAXIME. Vêtements, accessoires de plage, coques, bracelets et souvenirs uniques du Golfe de Saint-Tropez.",
  keywords: ["boutique #SAINTEMAXIME", "vêtements Sainte-Maxime", "souvenirs Saint-Tropez", "accessoires plage", "coques téléphone"],
  openGraph: {
    title: "Boutique #SAINTEMAXIME | Produits Uniques",
    description: "Tous nos produits estampillés #SAINTEMAXIME - Marque déposée",
    images: ["/og-boutique.jpg"],
  },
};

async function getProducts(searchParams: { [key: string]: string | string[] | undefined }) {
  const page = Number(searchParams.page) || 1;
  const limit = 24;
  const skip = (page - 1) * limit;

  const where: any = { isActive: true };

  if (searchParams.categorie) {
    where.category = searchParams.categorie;
  }

  if (searchParams.q) {
    where.OR = [
      { name: { contains: searchParams.q as string, mode: "insensitive" } },
      { description: { contains: searchParams.q as string, mode: "insensitive" } },
    ];
  }

  const orderBy: any = {};
  switch (searchParams.tri) {
    case "prix-asc": orderBy.price = "asc"; break;
    case "prix-desc": orderBy.price = "desc"; break;
    case "nouveautes": orderBy.createdAt = "desc"; break;
    case "popularite": orderBy.sales = "desc"; break;
    default: orderBy.createdAt = "desc";
  }

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: { variants: true },
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
  ]);

  return { products, total, categories, page, totalPages: Math.ceil(total / limit) };
}

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getProducts(searchParams);

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="pt-32 pb-12 section-padding bg-gradient-to-b from-mediterranean/5 to-cream">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-deep mb-4">
            Notre Boutique
          </h1>
          <p className="text-deep-light text-lg max-w-2xl">
            Tous nos produits estampillés #SAINTEMAXIME, conçus pour porter l'esprit du Golfe de Saint-Tropez partout avec vous.
          </p>
        </div>
      </section>

      <section className="section-padding pb-24">
        <div className="max-w-7xl mx-auto flex gap-8">
          <FiltersSidebar categories={data.categories} />
          <ProductGrid 
            products={data.products} 
            total={data.total}
            page={data.page}
            totalPages={data.totalPages}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}