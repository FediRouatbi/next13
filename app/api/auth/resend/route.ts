import { db } from "@/util/db";
import { generateRandom4Digits } from "@/util/generate";
import { sendEmail } from "@/util/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id");
  const newCode = generateRandom4Digits();
  if (!id) return NextResponse.json("Worng Path", { status: 200 });

  try {
    const user = await db.user.findUnique({ where: { id: id || "" } });
    if (user?.email) {
      sendEmail(user?.email, newCode);
      await db.user.update({ where: { id: id || "" }, data: { otp: newCode } });
    }
  } catch (err) {}
  return NextResponse.json("Email sent Successfully", { status: 200 });
};
