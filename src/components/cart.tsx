"use client";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetCart } from "../hooks/use-get-cart";

export default function Cart() {
  const { cart, loading } = useGetCart();
  if (loading) return <div>Loading...</div>;

  return (
    <div className=" w-full px-1 md:px-4 md:max-w-6xl md:mx-auto flex flex-col md:flex-row gap-6 mt-30">
      {/* LIST */}
      <ul className="flex flex-col gap-6 w-full md:w-125">
        {cart?.items?.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 p-3 w-full rounded-lg shadow-sm items-stretch"
          >
            <div className="relative w-28 h-28 md:w-36 md:h-36 overflow-hidden rounded">
              <Link href={`/product/${item.product.slug}`}>
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </Link>
            </div>

            <div className="flex flex-col justify-between flex-1">
              <Link href={`/product/${item.product?.slug}`}>
                <p className="hover:underline">{item.product?.name}</p>
              </Link>

              <p className="text-gray-500 text-sm">
                {item.product.description}
              </p>

              <span className="font-semibold">
                ${(item.product.price / 100).toFixed(2)}
              </span>
            </div>

            <div className="flex items-end ml-auto">
              <div className="flex justify-around items-center bg-gray-100 h-10 w-28 rounded-full">
                <button>
                  <Minus />
                </button>

                <span>{item.quantity}</span>

                <button>
                  <Plus />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* CHECKOUT */}
      <div className="w-full md:w-1/3 h-fit bg-gray-100 p-4 rounded sticky top-10">
        <h1 className="text-lg font-semibold mb-4">Total:</h1>

        <button className="w-full bg-red-500 py-2 text-white rounded hover:bg-red-600 transition">
          Checkout
        </button>
      </div>
    </div>
  );
}
