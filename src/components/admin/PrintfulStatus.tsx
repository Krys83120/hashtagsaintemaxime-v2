"use client";

import { motion } from "framer-motion";
import { RefreshCw, CheckCircle, AlertCircle, Package, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

export default function PrintfulStatus() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("Il y a 15 min");
  const [status, setStatus] = useState<"connected" | "syncing" | "error">("connected");

  const handleSync = async () => {
    setIsSyncing(true);
    setStatus("syncing");
    // Simulation API call
    await new Promise(r => setTimeout(r, 2000));
    setIsSyncing(false);
    setStatus("connected");
    setLastSync("À l'instant");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            status === "connected" ? "bg-emerald-50" : 
            status === "syncing" ? "bg-blue-50" : "bg-red-50"
          }`}>
            <LinkIcon className={`w-5 h-5 ${
              status === "connected" ? "text-emerald-600" : 
              status === "syncing" ? "text-blue-600" : "text-red-600"
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-deep">Printful</h3>
            <p className="text-sm text-gray-500">Synchronisation produits</p>
          </div>
        </div>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 text-gray-500 ${isSyncing ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-gray-600">Connexion API</span>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Active</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">Produits synchronisés</span>
          </div>
          <span className="text-sm font-semibold text-deep">48</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-gray-600">Commandes en attente</span>
          </div>
          <span className="text-sm font-semibold text-deep">3</span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Dernière synchro</span>
          </div>
          <span className="text-xs text-gray-400">{lastSync}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="w-full py-2.5 bg-mediterranean text-white rounded-lg font-semibold text-sm hover:bg-mediterranean-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
          {isSyncing ? "Synchronisation..." : "Synchroniser maintenant"}
        </button>
      </div>
    </motion.div>
  );
}