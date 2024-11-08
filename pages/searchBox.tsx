/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useRouter } from "next/router";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return; // Evitar búsqueda si el campo está vacío

    try {
      const response = await fetch(`/api/items?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Error al realizar la búsqueda");
      }

      const data = await response.json();

      // Redirige a la página de resultados con los datos de la búsqueda
      router.push({
        pathname: "/items",
        query: { search: searchTerm },
      });
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  return (
    <div className="flex mt-5">
      <input
        type="text"
        className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-blue-500"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="button"
        className="px-12 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
        onClick={handleSearch} // Llama a handleSearch al hacer clic
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBox;
