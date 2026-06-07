"use client";

import Image from "next/image";
import { useState } from "react";
import { useGetProductBySlug } from "../hooks/use-get-product-by-slug";
import { Minus, Plus, Star, StarHalfIcon } from "lucide-react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/navigation";
import { useCart } from "../context/cart-context";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function Product({ slug }: { slug: string }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const { getAccessToken, tryRefresh } = useAuth();
  const { cart, reload } = useCart();
  const { product } = useGetProductBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!product) return null;

  async function handleAddToCart() {
    try {
      setLoading(true);

      let token = getAccessToken();

      let res = await fetch(`${baseURL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          productId: product?.id,
          quantity,
        }),
      });

      if (res.status === 401) {
        const refreshed = await tryRefresh();

        if (!refreshed) {
          throw new Error("Session is expired");
        }

        token = getAccessToken();

        res = await fetch(`${baseURL}/cart/add-cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            productId: product?.id,
            quantity,
          }),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      await reload();
      setAdded(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  function goToCart(id: string | undefined) {
    if (id) {
      router.push(`/cart/${id}`);
    }
  }
  return (
    <div className="mt-30 px-6 md:px-10 overflow-x-hidden">
      <div className="flex justify-center">
        <div className="w-full max-w-3xl font-body ">
          {/* IMAGE */}
          <div className="relative w-full aspect-video overflow-hidden rounded-md">
            {product.image && (
              <Image
                src={product.image}
                alt="imagem"
                width={800}
                height={100}
                className="w-full h-full object-cover"
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
            <h2 className="text-sm md:text-3xl text-gray-500">
              {product.description}
            </h2>
          </div>

          {/* CONTROLS */}
          <div className="flex justify-between mt-30">
            <div className="flex justify-around items-center bg-gray-100 h-10 w-28 rounded-full">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <Minus />
              </button>

              <span>{quantity}</span>

              <button onClick={() => setQuantity((q) => q + 1)}>
                <Plus />
              </button>
            </div>
            {added ? (
              <button
                onClick={() => goToCart(cart?.id)}
                className="flex justify-center items-center bg-red-500 h-10 w-50 rounded-full"
              >
                Go to cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex justify-center items-center bg-green-500 h-10 w-50 rounded-full"
              >
                Add to cart
              </button>
            )}

           
          </div>
        </div>
      </div>
    </div>
  );
}
