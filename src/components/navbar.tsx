"use client"
import { Menu } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../context/auth";

export default function Navbar() {
  const { user, loading } = useAuth();
  return (
    <header className="w-full fixed bg-white flex justify-center text-red-500 z-50 shadow-sm">
      <div className="w-full max-w-[1800] text-4xl ">
        <div className="flex items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Link href="/">
            <h2 className="ml-1 text-4xl tracking-tight leading-8">
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
                {/* AUTH STATUS */}
              {loading ? (
                <li className="hover:text-red-500">
                  <div className="w-5 h-5 rounded-full bg-zinc-600 animate-pulse" />
                </li>
              ) : user ? (
                <li className="hover:text-red-500">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-sans font-bold uppercase">
                    {user.name[0] ?? "?"}
                  </div>
                </li>
              ) : (
                <li className="hover:text-blue-500">
                  <div className="w-5 h-5 rounded-full bg-black" />
                </li>
              )}
            </ul>
          </nav>

          {/* MOBILE BUTTON */}
          <button
           
            className="md:hidden p-3"
            aria-label="Toggle menu"
          >
            <Menu/>
          </button>
        </div>
        </div>
      
    </header>
  );
}
