import { db } from "@/util/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name } = body as {
    title: string;
    name: string;
  };
  try {
    await db.category.create({
      data: { name },
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(err);
  }
  return NextResponse.json(body);
}
