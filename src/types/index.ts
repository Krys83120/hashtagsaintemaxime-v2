export interface Product {
  id: string;
  printfulId?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  tags: string[];
  variants: Variant[];
  seoTitle?: string;
  seoDesc?: string;
  h1?: string;
  h2?: string;
  isActive: boolean;
  isFeatured: boolean;
  stock: number;
  sales: number;
  createdAt: Date;
}

export interface Variant {
  id: string;
  productId: string;
  printfulVariantId?: string;
  size?: string;
  color?: string;
  sku: string;
  stock: number;
  price?: number;
  image?: string;
}

export interface Order {
  id: string;
  userId?: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  shippingCost: number;
  printfulOrderId?: string;
  trackingNumber?: string;
  items: OrderItem[];
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  total: number;
  product?: Product;
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role: "USER" | "EDITOR" | "MANAGER" | "ADMIN";
  image?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalRevenue: number;
  todayRevenue: number;
  totalOrders: number;
  todayOrders: number;
  totalProducts: number;
  totalUsers: number;
  lowStock: number;
  pendingOrders: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  seoTitle?: string;
  seoDesc?: string;
  h1?: string;
  h2?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  h1?: string;
  h2?: string[];
}