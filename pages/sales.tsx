import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Sale {
  product_name: string;
  price: number;
  brand: string;
  category: string;
  description: string;
  sale_date: string;
}

const SalesPage = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch("/api/sales");
        const result = await response.json();

        if (result.success) {
          setSales(result.data);
        } else {
          console.error("Error al obtener las ventas:", result.message);
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return <p>Cargando compras...</p>;
  }

  const handleNavigate = () => {
    router.push("/items");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-6xl w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-4">
          Historial de Compras
        </h2>

        {/* Botón para navegar a /items */}
        <button
          onClick={handleNavigate}
          className="mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Volver a resultados de busqueda
        </button>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b">Producto</th>
              <th className="px-4 py-2 text-left border-b">Precio</th>
              <th className="px-4 py-2 text-left border-b">Marca</th>
              <th className="px-4 py-2 text-left border-b">Categoría</th>
              <th className="px-4 py-2 text-left border-b">Descripción</th>
              <th className="px-4 py-2 text-left border-b">
                Fecha y Hora de Venta
              </th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center">
                  No se encontraron ventas
                </td>
              </tr>
            ) : (
              sales.map((sale, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b">{sale.product_name}</td>
                  <td className="px-4 py-2 border-b">${sale.price}</td>
                  <td className="px-4 py-2 border-b">{sale.brand}</td>
                  <td className="px-4 py-2 border-b">{sale.category}</td>
                  <td className="px-4 py-2 border-b">{sale.description}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(sale.sale_date).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesPage;
