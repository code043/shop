"use client";

import Image from "next/image";
import { useGetProductBySlug } from "../hooks/use-get-product-by-slug";

export default function Product({ slug }: { slug: string }) {
  const { product } = useGetProductBySlug(slug);
  
  if (!product) return;
  return (
    <div className=" px-6 md:px-10 overflow-x-hidden">
      <div className="flex justify-center">
        <div className="w-full max-w-3xl font-body ">
          {/* NAME */}
          <h1 className="text-xl md:text-5xl font-bold mt-10 mb-6">
            {product.name}
          </h1>
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

          {/* DESCRIPTION */}
          <div className="mt-3 md:mt-10 mb-5">
            <h2
              className="text-sm md:text-3xl  
	px-1 font-body break-words whitespace-normal text-gray-500"
            >
              {product.description}
            </h2>
          </div>
        </div>
      </div>
      button
    </div>
  );
}
