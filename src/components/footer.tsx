import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full ">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col items-center">

        <Link href={"/"}>
          <h1 className="text-center text-4xl">Shop</h1>
        </Link>

        
        <ul className="flex justify-center gap-4 mt-10">
          <li className="underline">Instagram</li>
          <li className="underline">Tiktok</li>
          <li className="underline">YouTube</li>
        </ul>

        <div className="text-center my-10 text-sm font-sans">
          © 2026 Shop. All rights reserved.
        </div>
        <div>
          
        </div>
      </div>
    </footer>
  );
}