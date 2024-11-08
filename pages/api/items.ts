import { NextApiRequest, NextApiResponse } from "next";
import productsData from "../../data/products.json";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  images: string[];
  rating: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  if (q) {
    const query = q as string;
    const filteredItems: Product[] = productsData.products.filter(
      (product: Product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );
    res.status(200).json(filteredItems);
  } else {
    res.status(200).json(productsData.products);
  }
}
