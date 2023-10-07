import { db } from "@/util/db";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

export const POST = async (req: Request) => {
  const { otp, id: userID } = await req.json();
  let token: string;
  try {
    const user = await db.user.findUnique({ where: { id: userID || "" } });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    if (user?.otp === otp)
      db.user.update({ where: { id: userID }, data: { active: true } });
    else
      return new Response("Invalid otp code", {
        status: 400,
      });
    const genratedToken = jwt.sign(
      { user: user.id },
      process.env?.TOKEN_KEY || ""
    );
    token = genratedToken;
  } catch (err) {
    return NextResponse.json("Something went wrong", { status: 404 });
  }

  return NextResponse.json({ token }, { status: 200 });
};

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id");

  try {
    const user = await db.user.findUnique({ where: { id: id || "" } });
    if (user) return NextResponse.json({ email: user.email }, { status: 200 });
  } catch (err) {}
  return NextResponse.json("NO email found", { status: 200 });
};
