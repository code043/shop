"use client";

import { useState, useEffect } from "react";
import { ProductType } from "../types/product";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function useGetProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProdcts() {
      try {
        const res = await fetch(`${baseURL}/products/`);

        if (!res.ok) throw new Error("Get products error");

        const json = await res.json();
        setProducts(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadProdcts();
  }, []);

  return {
    products,
    loading,
  };
}
