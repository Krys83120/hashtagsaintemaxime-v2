import { Suspense } from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import DashboardStats from "@/components/admin/DashboardStats";
import RecentOrders from "@/components/admin/RecentOrders";
import TopProducts from "@/components/admin/TopProducts";
import SalesChart from "@/components/admin/SalesChart";
import PrintfulStatus from "@/components/admin/PrintfulStatus";

export const metadata: Metadata = {
  title: "Tableau de bord | Admin #SAINTEMAXIME",
};

async function getDashboardData() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalRevenue,
    todayRevenue,
    totalOrders,
    todayOrders,
    totalProducts,
    totalUsers,
    lowStock,
    pendingOrders,
    recentOrders,
    topProducts,
    salesData,
  ] = await Promise.all([
    // Total revenue
    prisma.order.aggregate({
      where: { paymentStatus: "PAID" },
      _sum: { total: true },
    }).then(r => r._sum.total || 0),

    // Today revenue
    prisma.order.aggregate({
      where: { 
        paymentStatus: "PAID",
        createdAt: { gte: today },
      },
      _sum: { total: true },
    }).then(r => r._sum.total || 0),

    // Total orders
    prisma.order.count(),

    // Today orders
    prisma.order.count({ where: { createdAt: { gte: today } } }),

    // Total products
    prisma.product.count({ where: { isActive: true } }),

    // Total users
    prisma.user.count(),

    // Low stock
    prisma.product.count({ where: { stock: { lt: 10 } } }),

    // Pending orders
    prisma.order.count({ where: { status: "PENDING" } }),

    // Recent orders
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        items: { include: { product: { select: { name: true } } } },
      },
    }),

    // Top products
    prisma.product.findMany({
      take: 5,
      orderBy: { sales: "desc" },
      select: { id: true, name: true, sales: true, price: true, images: true },
    }),

    // Sales data for chart (last 7 days)
    prisma.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        paymentStatus: "PAID",
      },
      _sum: { total: true },
    }),
  ]);

  return {
    stats: { totalRevenue, todayRevenue, totalOrders, todayOrders, totalProducts, totalUsers, lowStock, pendingOrders },
    recentOrders,
    topProducts,
    salesData,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-deep">Tableau de bord</h1>
        <p className="text-gray-500 mt-1">Vue d'ensemble de votre boutique #SAINTEMAXIME</p>
      </div>

      <DashboardStats stats={data.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={data.salesData} />
        </div>
        <PrintfulStatus />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={data.recentOrders} />
        <TopProducts products={data.topProducts} />
      </div>
    </div>
  );
}