import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProductsTable from "@/components/admin/ProductsTable";
import ProductsFilters from "@/components/admin/ProductsFilters";

export const metadata: Metadata = {
  title: "Gestion des Produits | Admin #SAINTEMAXIME",
};

async function getProducts(searchParams: { [key: string]: string | string[] | undefined }) {
  const page = Number(searchParams.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (searchParams.q) {
    where.OR = [
      { name: { contains: searchParams.q as string, mode: "insensitive" } },
      { description: { contains: searchParams.q as string, mode: "insensitive" } },
    ];
  }

  if (searchParams.category) {
    where.category = searchParams.category;
  }

  if (searchParams.status === "active") {
    where.isActive = true;
  } else if (searchParams.status === "inactive") {
    where.isActive = false;
  }

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { variants: true },
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({ where: { isActive: true } }),
  ]);

  return { products, total, categories, page, totalPages: Math.ceil(total / limit) };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getProducts(searchParams);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-deep">Produits</h1>
          <p className="text-gray-500 mt-1">{data.total} produits dans votre catalogue</p>
        </div>
        <a
          href="/admin/produits/nouveau"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-mediterranean text-white rounded-lg font-semibold text-sm hover:bg-mediterranean-dark transition-colors"
        >
          + Nouveau produit
        </a>
      </div>

      <ProductsFilters categories={data.categories} />

      <ProductsTable 
        products={data.products} 
        totalPages={data.totalPages} 
        currentPage={data.page}
      />
    </div>
  );
}