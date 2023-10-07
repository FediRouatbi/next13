import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { db } from "@/util/db";
import { generateRandom4Digits } from "@/util/generate";
import { sendEmail } from "@/util/sendEmail";
const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10).then((hash) => hash);
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body as { email: string; password: string };

  const hashedPassword = await hashPassword(password);

  let data;
  const validationCode = generateRandom4Digits();

  try {
    const user = await db.user.create({
      data: {
        otp: validationCode,
        email,
        password: hashedPassword,
        name: email.split("@")[0],
      },
    });

    const token = jwt.sign({ user: user.id }, process.env?.TOKEN_KEY || "");

    const { password: pass, ...res } = user;
    sendEmail(email, validationCode);
    data = { ...res, token };
  } catch (err) {
    console.log(err);

    return NextResponse.json(err);
  }

  return NextResponse.json(data);
}

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1] || "";
  const decodedToken = jwt.decode(token);
  if (!decodedToken) return NextResponse.json("unauthorized");
  const { user } = decodedToken as { user: string };
  const userData = await db.user.findUnique({ where: { id: user } });
  if (!userData) return NextResponse.json("unauthorized");
  const { password, ...res } = userData;
  return NextResponse.json({ ...res });
}
