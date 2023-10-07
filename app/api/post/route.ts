import { db } from "@/util/db";
import { getCurrentUser } from "@/util/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = request.headers.get("Authorization")?.slice(7);
  if (!token) return NextResponse.json("no token provided", { status: 501 });

  const { title, categoryType } = body as {
    title: string;
    categoryType: string;
  };
  try {
    const { id } = await getCurrentUser(token);

    await db.post.create({
      data: { authorId: id, title, categoryType },
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(err);
  }
  return NextResponse.json(body);
}
