"use client";
import { CircleUser, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart-context";

export default function Navbar() {
  const { user, loading } = useAuth();
  const { cart } = useCart();
  return (
    <header className="w-full fixed bg-white flex justify-center text-red-500 z-50 shadow-sm">
      {/* MOBILE BUTTON */}
      <button className="md:hidden p-3" aria-label="Toggle menu">
        <Menu />
      </button>

      <div className="w-full max-w-[1800] text-4xl ">
        <div className="flex items-center justify-between px-2 py-4">
          {/* LOGO */}
          <Link href="/">
            <h2 className="ml-1 font-bold text-4xl tracking-tight leading-8">
              SHOP
            </h2>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:block text-[14px] mx-1 font-bold">
            <ul className="flex space-x-8 items-center">
              <li className="hover:text-black hover:underline  text-[16px]">
                <Link href="/products">PRODUCTS</Link>
              </li>

              <li className="hover:text-black hover:underline text-[16px]">
                <Link href="/about">ABOUT</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* MOBILE BUTTON */}
      <div className="flex justify-between gap-4 px-3 font-extrabold">
        <ul className="flex items-center gap-4">
          <li>
            <Link href={"/cart/" + cart?.id}>
              <div className="relative">
                <ShoppingCart size={28} />

                {cart && cart?.items?.length > 0 && (
                  <span
                    className="absolute -top-1 -right-1 flex items-center justify-center 
                 min-w-[16px] h-4 px-1 text-[10px] font-bold 
                 bg-green-600 text-white rounded-full"
                  >
                    {cart.items.length}
                  </span>
                )}
              </div>
            </Link>
          </li>
          {/* AUTH STATUS */}
          {loading ? (
            <li className="hover:text-red-500">
              <CircleUser className="rounded-full bg-orange-200 animate-pulse" />
            </li>
          ) : user ? (
            <li className="hover:text-red-500">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-sans font-bold uppercase">
                {user.name[0] ?? "?"}
              </div>
            </li>
          ) : (
            <li className="hover:text-blue-500">
              <CircleUser />
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
