// pages/items.tsx
import { useEffect, useState } from "react";
import productsData from "../data/products.json";
import { useRouter } from "next/router";

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

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [resultCount, setResultCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const querySearch = router.query.search;

    if (querySearch && typeof querySearch === "string") {
      setSearch(querySearch);
    }
  }, [router.query.search]);

  // Filtrar productos cuando cambia el término de búsqueda
  useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    if (search.length > 0) {
      const filtered = productsData.products.filter((product: Product) =>
        product.title.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredProducts(filtered);
      console.log(filtered);
      setResultCount(filtered.length);
    } else {
      setFilteredProducts(productsData.products); // Si no hay búsqueda, mostrar todos los productos
      setResultCount(productsData.products.length);
    }
  }, [search]);

  const handlerProductClick = (id: number) => {
    router.push(`/item/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Caja de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Actualizar búsqueda
        />
      </div>

      {/* Título y cantidad de resultados */}
      <p className="font-bold text-center text-gray-700 mb-4">
        {search
          ? `Resultados de la búsqueda de "${search}" : ${resultCount}`
          : `Resultados de la búsqueda: ${resultCount}`}
      </p>

      {/* Listado de productos filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-4">
        {/* Verifica que filteredProducts sea un arreglo antes de mapear */}
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg bg-white shadow-md relative"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold">${product.price}</p>
              <p className="text-sm text-gray-500">
                Categoría: {product.category}
              </p>
              <div className="mt-2">
                <span className="text-yellow-400">⭐ {product.rating}</span>
              </div>
              <button
                type="button"
                onClick={() => handlerProductClick(product.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none absolute bottom-4 right-4"
              >
                Ver detalle
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
