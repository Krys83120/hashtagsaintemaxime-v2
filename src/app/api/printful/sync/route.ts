import { NextResponse } from "next/server";
import { syncPrintfulProductsToDB } from "@/lib/printful";
import { requireAdmin } from "@/lib/auth";

export async function POST() {
  try {
    await requireAdmin();
    const result = await syncPrintfulProductsToDB();
    return NextResponse.json(result);
  } catch (error: any) {
    if (error.message === "Non authentifié" || error.message === "Accès refusé") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("Printful sync error:", error);
    return NextResponse.json({ error: "Erreur de synchronisation" }, { status: 500 });
  }
}