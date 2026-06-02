"use client";

import { useEffect, useState, useCallback } from "react";
import { ProductType } from "../types/product";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function useGetProductBySlug(slug: string) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${baseURL}/products/slug/${slug}`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("I'ts not possible get the product");
      }

      const data = await res.json();
     
      setProduct(data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, [slug]);


  useEffect(() => {
    if (!slug) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProduct();
  }, [slug, loadProduct]);

  return {
    product,
    loading,
    error,
    reload: loadProduct,
  };
}
