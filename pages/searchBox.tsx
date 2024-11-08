import { useState } from "react";
import Link from "next/link";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex mt-5">
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
          className="px-12 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
        >
          Buscar
        </button>
      </Link>
    </div>
  );
};

export default SearchBox;
