import { db } from "@/util/db";
import * as jwt from "jsonwebtoken";
export const getCurrentUser = async (token: string) => {
  try {
    const { user: userID } = jwt.verify(
      token,
      process.env?.TOKEN_KEY || ""
    ) as {
      user: string;
      iat: number;
    };
    const user = await db.user.findUnique({ where: { id: userID || "" } });
    if (!user) throw "user not found";
    return user;
  } catch (err) {
    throw err;
  }
};
