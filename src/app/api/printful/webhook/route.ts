import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { type, data } = payload;

    switch (type) {
      case "order_created":
      case "order_updated": {
        if (data.order?.id) {
          await prisma.order.updateMany({
            where: { printfulOrderId: data.order.id.toString() },
            data: { status: mapPrintfulStatus(data.order.status) },
          });
        }
        break;
      }

      case "package_shipped": {
        if (data.order?.id) {
          await prisma.order.updateMany({
            where: { printfulOrderId: data.order.id.toString() },
            data: { 
              status: "SHIPPED",
              trackingNumber: data.shipment?.tracking_number || null,
            },
          });
        }
        break;
      }

      case "package_delivered": {
        if (data.order?.id) {
          await prisma.order.updateMany({
            where: { printfulOrderId: data.order.id.toString() },
            data: { status: "DELIVERED" },
          });
        }
        break;
      }

      case "order_failed": {
        if (data.order?.id) {
          await prisma.order.updateMany({
            where: { printfulOrderId: data.order.id.toString() },
            data: { status: "CANCELLED" },
          });
        }
        break;
      }

      case "stock_updated": {
        if (data.variant?.id) {
          await prisma.variant.updateMany({
            where: { printfulVariantId: data.variant.id.toString() },
            data: { stock: data.variant.quantity || 0 },
          });
        }
        break;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ success: true });
  }
}

function mapPrintfulStatus(status: string): string {
  const statusMap: Record<string, string> = {
    "pending": "PENDING",
    "draft": "PENDING",
    "failed": "CANCELLED",
    "canceled": "CANCELLED",
    "inprocess": "PROCESSING",
    "onhold": "PENDING",
    "partial": "PROCESSING",
    "fulfilled": "SHIPPED",
  };
  return statusMap[status.toLowerCase()] || "PROCESSING";
}