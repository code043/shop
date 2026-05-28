"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { User } from "../types/user";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  getAccessToken: () => string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const accessTokenRef = useRef<string | null>(null);

  async function login(email: string, password: string) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Erro no login!");

    const data = await res.json();
    accessTokenRef.current = data.token;

    await loadUser(data.token);
  }

  async function loadUser(token?: string) {
    const accessToken = token ?? accessTokenRef.current;

    if (!accessToken) {
      const refreshed = await tryRefresh();
      if (!refreshed) return;
      return;
    }

    try {
      const res = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setUser(data);
    } catch {
    }
  }

  async function tryRefresh(): Promise<boolean> {
    try {
      const res = await fetch("/api/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) return false;

      const data = await res.json();
      accessTokenRef.current = data.token;

      await loadUser(data.token);
      return true;
    } catch {
      return false;
    }
  }


  useEffect(() => {
    async function init() {
      await loadUser();
      setLoading(false);
    }

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        getAccessToken: () => accessTokenRef.current,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("You are out of provider!");
  return context;
}
