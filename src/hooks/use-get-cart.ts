/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function useGetCart() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCart = useCallback(async () => {
    if (!baseURL) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${baseURL}/cart`, {
        credentials: "include", // remove se não usar auth
      });

      if (!res.ok) throw new Error("Get cart error");

      const json = await res.json();
      setCart(json);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCart();
  }, [loadCart]);

  return {
    cart,
    loading,
    error,
    reload: loadCart,
  };
}
