/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetch(`/api/items/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) =>
          console.error("Error al obtener el producto:", error)
        );
    }
  }, [id]);

  const fetchProductBySearchTerm = async () => {
    try {
      const response = await fetch(`/api/items?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Error al obtener resultados de búsqueda");
      }
      const data = await response.json();
      // Redirige a la página de resultados con el término de búsqueda en la URL
      router.push({
        pathname: "/items",
        query: { search: searchTerm },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBuy = async () => {
    if (product) {
      const saleData = {
        product_name: product.title,
        price: product.price,
        brand: product.brand,
        category: product.category,
        description: product.description,
        sale_date: new Date().toISOString(),
      };
      try {
        const response = await fetch("/api/addSale", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saleData),
        });

        const result = await response.json();
        if (result.success) {
          alert("Compra registrada con éxito");
        } else {
          alert("Hubo un error al registrar la compra");
        }
      } catch (error) {
        console.error("Error al registrar la compra:", error);
        alert("Error al registrar la compra");
      }
    }
  };

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex mt-5 mb-3">
        <i className="fa-solid fa-bag-shopping text-blue-500 text-5xl mr-5 mt-2"></i>
        <input
          type="text"
          value={searchTerm}
          className="px-8 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500"
          placeholder="Buscar productos..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={fetchProductBySearchTerm}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none mb-5 ml-5 mt-5"
        >
          Buscar producto
        </button>
      </div>
      <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-md">
        <div className="text-right">
          <div className="mt-2">
            <span className="text-black-400">⭐ {product.rating}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4 mt-2">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.title} - ${index + 1}`}
              className="w-26 h-24 object-cover mb-4 rounded-full md:w-48 md:h-48"
            />
          ))}
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-2 text-blue-700">
            {product.title}
          </h2>
          <p className="text-md text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">Precio: ${product.price}</p>
          <p className="text-md text-gray-500">Marca: {product.brand}</p>
          <p className="text-md text-gray-500">Categoría: {product.category}</p>
          <p className="text-md text-gray-500">Stock: {product.stock}</p>
        </div>
        <div className="text-center">
          <div className="mt-2">
            <button
              type="button"
              onClick={handleBuy}
              className="px-8 py-3 bg-green-700 text-white rounded-r-lg hover:bg-green-600 focus:outline-none"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
