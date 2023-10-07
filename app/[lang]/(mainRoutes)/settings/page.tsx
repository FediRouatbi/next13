import { db } from "@/util/db";
import Link from "next/link";
import React from "react";

const page = async () => {
  const data = await db.post.findMany();
  return (
    <div>
      <Link href={"https://ui.shadcn.com/examples/forms/account"}></Link>
      {data.map((el) => (
        <>{el.title}</>
      ))}
    </div>
  );
};

export default page;
