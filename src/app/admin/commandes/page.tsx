import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import OrdersTable from "@/components/admin/OrdersTable";
import OrdersFilters from "@/components/admin/OrdersFilters";

export const metadata: Metadata = {
  title: "Gestion des Commandes | Admin #SAINTEMAXIME",
};

async function getOrders(searchParams: { [key: string]: string | string[] | undefined }) {
  const page = Number(searchParams.page) || 1;
  const limit = 25;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (searchParams.status) {
    where.status = searchParams.status;
  }

  if (searchParams.q) {
    where.OR = [
      { email: { contains: searchParams.q as string, mode: "insensitive" } },
      { firstName: { contains: searchParams.q as string, mode: "insensitive" } },
      { lastName: { contains: searchParams.q as string, mode: "insensitive" } },
    ];
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: {
            product: { select: { name: true, images: true } },
          },
        },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return { orders, total, page, totalPages: Math.ceil(total / limit) };
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getOrders(searchParams);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-deep">Commandes</h1>
          <p className="text-gray-500 mt-1">{data.total} commandes au total</p>
        </div>
      </div>

      <OrdersFilters />
      <OrdersTable 
        orders={data.orders} 
        totalPages={data.totalPages} 
        currentPage={data.page}
      />
    </div>
  );
}