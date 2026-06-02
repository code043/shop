import Product from "@/src/components/product";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  return (
    <section className="flex justify-center py-2">
      <Product slug={slug} />
    </section>
  );
}
