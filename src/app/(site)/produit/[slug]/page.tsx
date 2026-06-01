import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ProductDetail from "@/components/site/ProductDetail";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    select: { name: true, description: true, seoTitle: true, seoDesc: true, images: true },
  });

  if (!product) return { title: "Produit non trouvé | #SAINTEMAXIME" };

  return {
    title: product.seoTitle || `${product.name} | #SAINTEMAXIME`,
    description: product.seoDesc || product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images[0] ? [product.images[0]] : undefined,
    },
  };
}

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug, isActive: true },
    include: { variants: true },
  });

  if (!product) return null;

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id },
      isActive: true,
    },
    take: 4,
    include: { variants: true },
  });

  return { product, relatedProducts };
}

export default async function ProductPage({ params }: Props) {
  const data = await getProduct(params.slug);
  if (!data) notFound();

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <ProductDetail product={data.product} relatedProducts={data.relatedProducts} />
      <Footer />
    </main>
  );
}