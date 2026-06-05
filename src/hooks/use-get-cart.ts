/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Cart } from "../types/cart";
import { useAuth } from "../context/auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function useGetCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getAccessToken, tryRefresh } = useAuth();

  const loadCart = useCallback(async () => {
    if (!baseURL) return;

    try {
      setLoading(true);
      setError(null);

      let token = getAccessToken();

      let res = await fetch(`${baseURL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (res.status === 401) {
        const refreshed = await tryRefresh();

        if (!refreshed) throw new Error("Unauthorized");

        token = getAccessToken();

        res = await fetch(`${baseURL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
      }

      if (!res.ok) throw new Error("Get cart error");

      const json = await res.json();
      setCart(json);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [getAccessToken, tryRefresh]);

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
