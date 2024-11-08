// pages/item/[id].tsx
import { useRouter } from "next/router";
import productsData from "../../data/products.json";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Obtener el id del producto desde la URL

  // Buscar el producto correspondiente usando el id
  const product = productsData.products.find(
    (product) => product.id === parseInt(id as string)
  );

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
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
          <h2 className="text-3xl font-semibold mb-2">{product.title}</h2>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
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
