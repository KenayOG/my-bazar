import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Definimos la interfaz para el tipo de producto
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

const ResultsPage = () => {
  const router = useRouter();
  const { search } = router.query; // Obtener el término de búsqueda de la URL
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchResults = async () => {
      if (search) {
        try {
          const response = await fetch(`/api/items?q=${search}`);
          if (!response.ok) {
            throw new Error("Error al obtener resultados de búsqueda");
          }
          const data: Product[] = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchResults();
  }, [search]); // Ejecuta el efecto cuando cambia `search`

  // Función para redirigir al detalle del producto
  const handleViewDetail = (id: number) => {
    router.push(`/item/${id}`);
  };

  const fetchAllItems = async () => {
    try {
      const response = await fetch(`/api/items`);
      if (!response.ok) {
        throw new Error("Error al obtener todos los productos");
      }
      const data: Product[] = await response.json();
      setSearchResults(data);
      router.push({
        pathname: "/items",
        query: { search: searchTerm },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchProductBySearchTerm = async () => {
    try {
      const response = await fetch(`/api/items?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Error al obtener resultados de búsqueda");
      }
      const data: Product[] = await response.json();
      setSearchResults(data);
      router.push({
        pathname: "/items",
        query: { search: searchTerm },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-5">
      {/* Caja de búsqueda */}
      <div className="mb-5 mt-5">
        <div className="flex">
          <i className="fa-solid fa-bag-shopping text-blue-500 text-5xl mr-5 mt-2"></i>
          <input
            type="text"
            value={searchTerm}
            className="px-5 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
            placeholder="Buscar productos..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={fetchProductBySearchTerm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none mb-5 ml-5 mt-5"
          >
            Buscar producto
          </button>
          <button
            onClick={fetchAllItems}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none mb-5 ml-5 mt-5 px-3"
          >
            Ver todos
          </button>
        </div>
      </div>
      {/* Título y cantidad de resultados */}
      <p className="font-bold text-center text-gray-700 mb-4">
        Resultados de la búsqueda de {search}: {searchResults.length}
      </p>
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 m-5">
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg bg-gray-200 shadow-md relative"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-48 h-48 object-cover rounded-full  transform translate-x-2/4"
              />
              <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold">${product.price}</p>
              <p className="text-sm text-gray-500">
                Categoría: {product.category}
              </p>
              <br />
              <br />
              <br />
              <div className="mt-2 absolute bottom-4 left-4">
                <span className="text-black-400">⭐ {product.rating}</span>
              </div>
              <button
                type="button"
                onClick={() => handleViewDetail(product.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none absolute bottom-4 right-4"
              >
                Ver detalle
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron productos para {search}</p>
      )}
    </div>
  );
};

export default ResultsPage;
