type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
};

type CartItem = {
  id: string;
  quantity: number;
  product: Product;
};

export type Cart = {
  id: string;
  items: CartItem[];
};