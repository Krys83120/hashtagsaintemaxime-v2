import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { createPrintfulOrder } from "@/lib/printful";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 25;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (searchParams.get("status")) where.status = searchParams.get("status");
    if (searchParams.get("paymentStatus")) where.paymentStatus = searchParams.get("paymentStatus");

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

    return NextResponse.json({ orders, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const order = await prisma.order.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        address: body.address,
        city: body.city,
        postalCode: body.postalCode,
        country: body.country || "FR",
        phone: body.phone,
        total: body.total,
        shippingCost: body.shippingCost || 0,
        status: "PENDING",
        paymentStatus: "PENDING",
        items: {
          create: body.items.map((item: any) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    try {
      if (process.env.PRINTFUL_API_KEY) {
        const printfulOrder = await createPrintfulOrder({
          recipient: {
            name: `${body.firstName} ${body.lastName}`,
            email: body.email,
            phone: body.phone,
            address1: body.address,
            city: body.city,
            zip: body.postalCode,
            country_code: body.country || "FR",
          },
          items: body.items.map((item: any) => ({
            variant_id: item.printfulVariantId,
            quantity: item.quantity,
            retail_price: item.price.toFixed(2),
          })),
        });

        await prisma.order.update({
          where: { id: order.id },
          data: { printfulOrderId: printfulOrder.result?.id?.toString() },
        });
      }
    } catch (printfulError) {
      console.error("Printful order error:", printfulError);
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Orders POST error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}