import TypeCard from "@/components/ui/TypeCard";
import React from "react";

const page = () => {
  return (
    <div className="mx-auto my-5 max-w-7xl gap-4 px-4  grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))]">
      {new Array(10).fill(5).map((el, i) => (
        <TypeCard key={i} />
      ))}
    </div>
  );
};

export default page;
