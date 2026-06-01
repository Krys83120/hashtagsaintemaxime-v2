import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { variants: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product GET error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const body = await request.json();

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        comparePrice: body.comparePrice,
        images: body.images,
        category: body.category,
        tags: body.tags,
        seoTitle: body.seoTitle,
        seoDesc: body.seoDesc,
        h1: body.h1,
        h2: body.h2,
        isActive: body.isActive,
        isFeatured: body.isFeatured,
        stock: body.stock,
      },
      include: { variants: true },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    if (error.message === "Non authentifié" || error.message === "Accès refusé") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("Product PUT error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();

    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "Non authentifié" || error.message === "Accès refusé") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("Product DELETE error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}