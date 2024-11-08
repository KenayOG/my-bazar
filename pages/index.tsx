import { useState } from "react";
import Link from "next/link";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4">Aqui va el icono de la pagina</div>
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-4">
        Bazar Online
      </h1>
      <div className="flex">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-blue-500"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Solo habilitar el botón si hay texto de búsqueda */}
        <Link href={`/items?search=${searchTerm}`}>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
          >
            Buscar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
