// pages/api/items/[id].ts
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

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
