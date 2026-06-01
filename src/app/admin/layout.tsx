import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/admin");
  }

  if (user.role !== "ADMIN" && user.role !== "MANAGER" && user.role !== "EDITOR") {
    redirect("/unauthorized");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar user={user} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <AdminHeader user={user} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}