import Link from "next/link";

export default function Navbar() {
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
                <Link href="/articles">PRODUCTS</Link>
              </li>

              <li className="hover:text-black hover:underline text-[16px]">
                <Link href="/about">ABOUT</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
