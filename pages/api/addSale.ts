// pages/api/addSale.ts
import { NextApiRequest, NextApiResponse } from "next";

/* interface AddSale {
  productId: number;
  quantity: number;
  date: string;
} */

//let sales: AddSale[] = []; // Simulación de ventas, idealmente esto debería guardarse en una base de datos

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    /* const sale: Sale = { productId, quantity, date: new Date().toISOString() };
    sales.push(sale); */

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
