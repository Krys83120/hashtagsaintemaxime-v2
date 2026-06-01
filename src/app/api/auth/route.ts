import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword, createToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    if (action === "register") {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });
      }

      const hashedPassword = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: "USER",
        },
      });

      const token = await createToken(user.id, user.email, user.role);
      return NextResponse.json({ success: true, token });
    }

    if (action === "login") {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.password) {
        return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
      }

      const isValid = await verifyPassword(password, user.password);
      if (!isValid) {
        return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
      }

      const token = await createToken(user.id, user.email, user.role);
      return NextResponse.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    }

    return NextResponse.json({ error: "Action invalide" }, { status: 400 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}