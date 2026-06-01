import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (searchParams.get("category")) where.category = searchParams.get("category");
    if (searchParams.get("active") === "true") where.isActive = true;
    if (searchParams.get("featured") === "true") where.isFeatured = true;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { variants: true },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ products, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        comparePrice: body.comparePrice,
        images: body.images || [],
        category: body.category,
        tags: body.tags || [],
        seoTitle: body.seoTitle,
        seoDesc: body.seoDesc,
        h1: body.h1,
        h2: body.h2,
        isActive: body.isActive ?? true,
        isFeatured: body.isFeatured ?? false,
        stock: body.stock || 0,
        variants: {
          create: body.variants?.map((v: any) => ({
            size: v.size,
            color: v.color,
            sku: v.sku,
            stock: v.stock || 0,
            price: v.price,
            image: v.image,
          })) || [],
        },
      },
      include: { variants: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    if (error.message === "Non authentifié" || error.message === "Accès refusé") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("Products POST error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}