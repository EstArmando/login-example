import { User } from "@/generated/prisma";
import { prisma } from "@/libs/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as User;

    const email = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (email) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const username = await prisma.user.findFirst({
      where: {
        username: body.username,
      },
    });

    if (username) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const { password: _, ...user } = await prisma.user.create({
      data: { ...body, password: hashedPassword },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
