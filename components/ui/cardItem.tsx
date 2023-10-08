import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const CardItem = () => {
  return (
    <div className="border-b border-r cursor-pointer justify-self-center p-7 group">
      <div className="overflow-hidden relative  transition-all rounded-md aspect-square group-hover:opacity-80 group-hover:scale-105">
        <Image
          src="https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg"
          alt="qsd"
          fill
        />
      </div>
      <div className="pt-10 text-center">
        <h3 className="awa awe axv">
          <a href="#">
            <span aria-hidden="true" className="aa ak"></span>Organize Basic Set
            (Walnut)
          </a>
        </h3>
        <div className="">
          <p className="t">5 out of 5 stars</p>
          <div className="flex justify-center ">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <p className="ku awa axr">38 reviews</p>
        </div>
        <p className="lh avy awe axv">$149</p>
      </div>
    </div>
  );
};

export default CardItem;
