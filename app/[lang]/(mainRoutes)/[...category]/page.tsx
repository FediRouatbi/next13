import CardItem from "@/components/ui/cardItem";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const page = () => {
  return (
    <section className="mx-auto my-7 max-w-7xl">
      <div className="flex items-center justify-end gap-2 mb-5 ">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="stars">Stars</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="relative flex items-start gap-5">
        <div className="sticky top-7">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]  border-l border-t   ">
          {new Array(30).fill(0).map((el, i) => (
            <CardItem key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
