"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2, Shield, User, Crown, Eye } from "lucide-react";
import Link from "next/link";

type Role = "USER" | "EDITOR" | "MANAGER" | "ADMIN";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  image: string | null;
  createdAt: Date;
  _count: { orders: number };
}

const roleConfig: Record<Role, { label: string; color: string; icon: any }> = {
  ADMIN: { label: "Super Admin", color: "bg-red-50 text-red-600", icon: Crown },
  MANAGER: { label: "Manager", color: "bg-violet-50 text-violet-600", icon: Shield },
  EDITOR: { label: "Éditeur", color: "bg-blue-50 text-blue-600", icon: Pencil },
  USER: { label: "Client", color: "bg-gray-50 text-gray-600", icon: User },
};

export default function UsersTable({ 
  users, 
  totalPages, 
  currentPage 
}: { 
  users: User[]; 
  totalPages: number; 
  currentPage: number;
}) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {selectedUsers.length > 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="bg-mediterranean/5 border-b border-mediterranean/10 px-6 py-3 flex items-center gap-4"
        >
          <span className="text-sm font-semibold text-mediterranean">
            {selectedUsers.length} sélectionné(s)
          </span>
          <button className="text-sm text-red-600 hover:text-red-700 font-medium">
            Supprimer
          </button>
        </motion.div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-4 py-3">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(users.map(u => u.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Utilisateur</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Email</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Rôle</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Commandes</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Inscription</th>
              <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const config = roleConfig[user.role];
              const RoleIcon = config.icon;

              return (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleSelect(user.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mediterranean to-sand flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-deep">{user.name || "Sans nom"}</p>
                        <p className="text-xs text-gray-400">ID: {user.id.slice(-8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.color}`}>
                      <RoleIcon className="w-3 h-3" />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-deep">{user._count.orders}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <Link 
                        href={`/admin/utilisateurs/${user.id}`}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-400" />
                      </Link>
                      <Link 
                        href={`/admin/utilisateurs/${user.id}/edit`}
                        className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4 text-blue-500" />
                      </Link>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Page {currentPage} sur {totalPages}</p>
          <div className="flex items-center gap-2">
            <Link
              href={`/admin/utilisateurs?page=${Math.max(1, currentPage - 1)}`}
              className={`p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors ${
                currentPage === 1 ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              ←
            </Link>
            <Link
              href={`/admin/utilisateurs?page=${Math.min(totalPages, currentPage + 1)}`}
              className={`p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors ${
                currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}