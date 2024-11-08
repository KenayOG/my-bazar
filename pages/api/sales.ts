import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://grjahmmpfvosptbdytbg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyamFobW1wZnZvc3B0YmR5dGJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNjk3MzgsImV4cCI6MjA0NjY0NTczOH0._YtpguUDQ9Vo_FQU0B1phDYswt8xN16i661vIf4C-4Q"
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("sales").select("*");

    if (error) {
      console.error("Error al obtener las ventas:", error);
      return res
        .status(500)
        .json({ success: false, message: "Error al obtener las ventas" });
    }

    res.status(200).json({ success: true, data });
  } else {
    
    res.status(405).json({ success: false, message: "Método no permitido" });
  }
}
