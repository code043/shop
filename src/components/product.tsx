"use client";

import Image from "next/image";
import { useGetProductBySlug } from "../hooks/use-get-product-by-slug";
import { Minus, Plus, Star, StarHalfIcon } from "lucide-react";

export default function Product({ slug }: { slug: string }) {
  const { product } = useGetProductBySlug(slug);

  if (!product) return;
  return (
    <div className="mt-30 px-6 md:px-10 overflow-x-hidden">
      <div className="flex justify-center">
        <div className="w-full max-w-3xl font-body ">
          {/* IMAGE */}
          <div className="relative w-full aspect-video overflow-hidden rounded-md cursor-zoom-in">
            {product.image && (
              <Image
                src={product.image}
                alt="imagem"
                width={800}
                height={100}
                className="w-full h-full object-cover "
              />
            )}
          </div>
          {/* NAME */}
          <h1 className="text-xl md:text-5xl font-bold mt-10 mb-6">
            {product.name}
          </h1>
          <div className="flex ">
            <Star fill="#FFD700" />
            <Star fill="#FFD700" />
            <Star fill="#FFD700" />
            <Star fill="#FFD700" />
            <StarHalfIcon fill="#FFD700" />
          </div>
          <div className="mt-1">
            <h3>${(product.price / 100).toFixed(2)}</h3>
          </div>
          {/* DESCRIPTION */}
          <div className="mt-3 md:mt-10 mb-6">
            <h2
              className="text-sm md:text-3xl  
	px-1 font-body break-words whitespace-normal text-gray-500"
            >
              {product.description}
            </h2>
          </div>

          <div className="flex justify-between mt-30">
            <div className="flex justify-around items-center bg-gray-100 h-10 w-28 rounded-full">
              <button className="cursor-pointer">
                <Minus />
              </button>
              <span>1</span>
              <button className="cursor-pointer">
                <Plus />
              </button>
            </div>
            <button className="flex justify-around items-center bg-green-500 h-10 w-50 rounded-full cursor-pointer">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
