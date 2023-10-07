import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/util/db";
import { generateRandom4Digits } from "@/util/generate";
import { sendEmail } from "@/util/sendEmail";
const validatePassword = (password: string, cryptedPasssword: string) => {
  return bcrypt.compare(password, cryptedPasssword).then((hash) => hash);
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body as { email: string; password: string };

  let data;
  const validationCode = generateRandom4Digits();
  try {
    const user = await db.user.findUnique({
      where: { email: email },
    });
    const correctPassword = await validatePassword(
      password,
      user?.password || ""
    );

    if (!user || !correctPassword)
      return new Response(
        JSON.stringify({ message: "Incorrect password or email !" }),
        {
          status: 403,
        }
      );

    await db.user.update({
      where: { email: email },
      data: { otp: validationCode },
    });

    const { id } = user;
    sendEmail(email, validationCode);
    data = { id };
  } catch (err) {
    return NextResponse.json({message:"error"}, { status: 400 });
  }

  return NextResponse.json(data);
}
