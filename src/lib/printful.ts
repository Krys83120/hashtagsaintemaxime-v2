"use server";

const PRINTFUL_BASE_URL = "https://api.printful.com/v2";

async function printfulRequest(endpoint: string, options: RequestInit = {}) {
  const apiKey = process.env.PRINTFUL_API_KEY;
  const storeId = process.env.PRINTFUL_STORE_ID;

  if (!apiKey) throw new Error("PRINTFUL_API_KEY manquant");

  const headers: Record<string, string> = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    ...(storeId ? { "X-PF-Store-Id": storeId } : {}),
  };

  const response = await fetch(`${PRINTFUL_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Printful API error: ${response.status}`);
  }

  return response.json();
}

// Produits du catalogue
export async function getPrintfulProducts() {
  return printfulRequest("/catalog/products");
}

export async function getPrintfulProduct(productId: string) {
  return printfulRequest(`/catalog/products/${productId}`);
}

export async function getPrintfulVariants(productId: string) {
  return printfulRequest(`/catalog/products/${productId}/variants`);
}

// Commandes
export async function createPrintfulOrder(orderData: any) {
  return printfulRequest("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

export async function getPrintfulOrder(orderId: string) {
  return printfulRequest(`/orders/${orderId}`);
}

export async function confirmPrintfulOrder(orderId: string) {
  return printfulRequest(`/orders/${orderId}/confirm`, {
    method: "POST",
  });
}

// Mockup generator
export async function createMockup(productId: string, variantId: string, imageUrl: string) {
  return printfulRequest("/mockup-generator/create-task", {
    method: "POST",
    body: JSON.stringify({
      variant_ids: [parseInt(variantId)],
      format: "png",
      width: 1000,
      product_template_id: parseInt(productId),
      files: [{
        placement: "front",
        image_url: imageUrl,
        position: { area_width: 8, area_height: 8, width: 4, height: 4, top: 2, left: 2 }
      }]
    }),
  });
}

// Shipping rates
export async function getShippingRates(address: any, items: any[]) {
  return printfulRequest("/shipping/rates", {
    method: "POST",
    body: JSON.stringify({
      recipient: address,
      items: items.map(item => ({
        quantity: item.quantity,
        catalog_variant_id: item.variantId,
      })),
    }),
  });
}

// Webhook handlers
export async function setupPrintfulWebhooks(webhookUrl: string) {
  return printfulRequest("/webhooks", {
    method: "POST",
    body: JSON.stringify({
      default_url: webhookUrl,
      events: [
        { type: "order_created" },
        { type: "order_updated" },
        { type: "order_failed" },
        { type: "package_shipped" },
        { type: "package_delivered" },
        { type: "order_put_hold" },
        { type: "stock_updated" },
      ],
    }),
  });
}

export async function syncPrintfulProductsToDB() {
  const { prisma } = await import("./prisma");

  try {
    const catalog = await getPrintfulProducts();
    const products = catalog.result || [];

    for (const product of products) {
      await prisma.product.upsert({
        where: { printfulId: product.id.toString() },
        update: {
          name: product.name,
          description: product.description || "",
          category: product.type || "Autre",
          isActive: true,
        },
        create: {
          printfulId: product.id.toString(),
          name: product.name,
          slug: `produit-${product.id}`,
          description: product.description || "",
          price: 0,
          category: product.type || "Autre",
          images: product.thumbnail_url ? [product.thumbnail_url] : [],
          isActive: true,
        },
      });
    }

    return { success: true, count: products.length };
  } catch (error) {
    console.error("Erreur sync Printful:", error);
    throw error;
  }
}