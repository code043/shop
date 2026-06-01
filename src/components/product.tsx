"use client";

import Image from "next/image";
import { ProductType } from "../types/product";
const product: ProductType = {
  id: "1",
  name: "Tshirt",
  image: "http://",
  description: "",
  slug: "t-shirt",
};

export default function Product({ slug }: { slug: string }) {
  return (
    <div className="text-white bg-black px-6 md:px-10 overflow-x-hidden">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl font-body ">
          {/* NAME */}
          <h1 className="text-xl md:text-5xl font-bold mt-10 mb-6">
            {product.name}
          </h1>
          {/* HERO IMAGE */}
          <div className="relative w-full aspect-video overflow-hidden rounded-md cursor-zoom-in">
            {product.image && (
              <Image
                src={product.image}
                alt="imagem"
                width={900}
                height={200}
                className="w-full h-full object-cover "
              />
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="mt-3 md:mt-10 mb-5">
            <h2
              className="text-sm md:text-3xl  
	px-1 font-body break-words whitespace-normal text-gray-200"
            >
              {product.description}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
