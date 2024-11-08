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

  const fetchProducts = async (query: string) => {
    try {
      const res = await fetch(`/api/items?q=${query}`);
      const data = await res.json();
      setFilteredProducts(data);
      setResultCount(data.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (search) {
      fetchProducts(search);
    } else {
      fetchProducts("");
    }
  }, [search]);

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
    <div className="flex flex-col items-center justify-center min-h-screen mt-5">
      {/* Caja de búsqueda */}
      <div className="mb-5 mt-5">
        <div className="flex">
          <i className="fa-solid fa-bag-shopping text-blue-500 text-5xl mr-5"></i>
          <input
            type="text"
            className="px-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Actualizar búsqueda
          />
        </div>
      </div>

      {/* Título y cantidad de resultados */}
      <p className="font-bold text-center text-gray-700 mb-4">
        {search
          ? `Resultados de la búsqueda de "${search}" : ${resultCount}`
          : `Resultados de la búsqueda: ${resultCount}`}
      </p>

      {/* Listado de productos filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 m-5">
        {/* Verifica que filteredProducts sea un arreglo antes de mapear */}
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg bg-gray-200 shadow-md relative"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-48 h-48 object-cover rounded-full  transform translate-x-1/4"
              />
              <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
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
