import { NextApiRequest, NextApiResponse } from "next";
import productsData from "../../../data/products.json";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const product = productsData.products.find(
    (product: Product) => product.id === parseInt(id as string)
  );

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
}
