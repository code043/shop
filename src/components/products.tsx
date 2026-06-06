"use client";
import Image from "next/image";
import Link from "next/link";
import { useGetProducts } from "../hooks/use-get-products";

export default function Products() {
  const { products, loading } = useGetProducts();
  if (loading) {
    return (
      <div className="mx-auto mt-30">
        <p>Carregando..</p>
      </div>
    );
  }
  return (
    <div className="mx-auto mt-30">
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {products.map((prod) => {
          return (
            <li key={prod.id} className="flex flex-col">
              <div className="overflow-hidden h-50 relative w-full">
                {prod.image && (
                  <Link href={"/product/" + prod.slug}>
                    <Image
                      src={prod.image}
                      width={300}
                      height={200}
                      alt="image"
                      className="object-cover w-full h-full block"
                    />
                  </Link>
                )}
              </div>

              <Link href={"/product/" + prod.slug}>
                <p className="text-center w-full max-w-md px-3 py-4 text-[#526070] hover:text-white hover:underline break-words whitespace-normal">
                  {prod.name}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
