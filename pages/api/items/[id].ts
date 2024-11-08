// pages/api/items/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import productsData from "../../../data/products.json";

// Tipo para un producto
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
