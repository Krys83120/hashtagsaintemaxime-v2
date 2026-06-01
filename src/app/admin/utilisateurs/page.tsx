import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import UsersTable from "@/components/admin/UsersTable";
import UsersFilters from "@/components/admin/UsersFilters";

export const metadata: Metadata = {
  title: "Gestion des Utilisateurs | Admin #SAINTEMAXIME",
};

async function getUsers(searchParams: { [key: string]: string | string[] | undefined }) {
  const page = Number(searchParams.page) || 1;
  const limit = 25;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (searchParams.q) {
    where.OR = [
      { name: { contains: searchParams.q as string, mode: "insensitive" } },
      { email: { contains: searchParams.q as string, mode: "insensitive" } },
    ];
  }

  if (searchParams.role) {
    where.role = searchParams.role;
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
        _count: { select: { orders: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  return { users, total, page, totalPages: Math.ceil(total / limit) };
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getUsers(searchParams);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-deep">Utilisateurs</h1>
          <p className="text-gray-500 mt-1">{data.total} utilisateurs enregistrés</p>
        </div>
        <a
          href="/admin/utilisateurs/nouveau"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-mediterranean text-white rounded-lg font-semibold text-sm hover:bg-mediterranean-dark transition-colors"
        >
          + Nouvel utilisateur
        </a>
      </div>

      <UsersFilters />
      <UsersTable 
        users={data.users} 
        totalPages={data.totalPages} 
        currentPage={data.page}
      />
    </div>
  );
}