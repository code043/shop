import Hero from "../components/hero";
import Products from "../components/products";

export default function Home() {
  return (
    <>
      {" "}
      <section>
        <Hero />
      </section>
      <section className="py-10">
        <Products />
      </section>
    </>
  );
}
