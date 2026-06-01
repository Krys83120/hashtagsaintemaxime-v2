import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            product: { select: { name: true, images: true } },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order GET error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const body = await request.json();

    const order = await prisma.order.update({
      where: { id: params.id },
      data: {
        status: body.status,
        paymentStatus: body.paymentStatus,
        trackingNumber: body.trackingNumber,
      },
      include: {
        items: {
          include: {
            product: { select: { name: true, images: true } },
          },
        },
      },
    });

    return NextResponse.json(order);
  } catch (error: any) {
    if (error.message === "Non authentifié" || error.message === "Accès refusé") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("Order PUT error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();

    await prisma.order.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === "Non authentifié" || error.message === "Accès refusé") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("Order DELETE error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}