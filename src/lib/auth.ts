"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "default-secret");

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(userId: string, email: string, role: string) {
  const token = await new SignJWT({ sub: userId, email, role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  cookies().set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: "/",
  });

  return token;
}

export async function verifyToken() {
  const token = cookies().get("admin-token")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const payload = await verifyToken();
  if (!payload?.sub) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.sub as string },
    select: { id: true, name: true, email: true, role: true, image: true },
  });

  return user;
}

export async function logout() {
  cookies().delete("admin-token");
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Non authentifié");
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== "ADMIN" && user.role !== "MANAGER") {
    throw new Error("Accès refusé");
  }
  return user;
}