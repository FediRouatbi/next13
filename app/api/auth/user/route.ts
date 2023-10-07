import { db } from "@/util/db";
import { getCurrentUser } from "@/util/getCurrentUser";
import * as jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  const { token } = await req.json();

  try {
    const user = await getCurrentUser(token);

    if (!user) {
      return NextResponse.json("worng credentials", { status: 400 });
    }

    const { id, name, email } = user;
    return NextResponse.json({ id, name, email }, { status: 200 });
  } catch (err) {
    return NextResponse.json("worng credentials", { status: 400 });
  }
};
