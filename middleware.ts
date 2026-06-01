import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/", "/boutique", "/produit", "/contact", "/a-propos", "/login", "/register"];
const ADMIN_PATHS = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Autoriser les fichiers statiques et API publiques
  if (pathname.startsWith("/_next") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Vérifier si c'est une route admin
  const isAdminRoute = ADMIN_PATHS.some((path) => pathname.startsWith(path));

  if (isAdminRoute) {
    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login?redirect=/admin", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "default-secret");
      const { payload } = await jwtVerify(token, secret);

      // Vérifier le rôle admin
      if (payload.role !== "ADMIN" && payload.role !== "MANAGER") {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      // Ajouter l'info utilisateur aux headers pour les Server Components
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", payload.sub as string);
      requestHeaders.set("x-user-role", payload.role as string);

      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } catch {
      return NextResponse.redirect(new URL("/login?redirect=/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};