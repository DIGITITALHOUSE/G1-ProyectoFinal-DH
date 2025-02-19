
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Section from '../Section';

export const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");

  const handleSearch = () => {
    console.log("Buscando:", { location, time });
  };

  return (
    <Section>
        <div className="bg-blue-600 py-6">
            <h2 className="text-white text-lg md:text-xl font-bold text-center">
                Reserva tu espacio, crea tu ambiente
            </h2>

            <div className="flex justify-center items-center gap-3 bg-blue-50 p-4 rounded-lg mt-4 max-w-4xl mx-auto">
                {/* Input País / Ciudad */}
                <input
                type="text"
                placeholder="País/Ciudad"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-1/3 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Input Hora Entrada / Salida */}
                <input
                type="text"
                placeholder="Hora de entrada/Hora de salida"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-1/3 px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Botón de Búsqueda */}
                <button
                onClick={handleSearch}
                className="flex items-center gap-2 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition"
                >
                <FaSearch />
                Buscar
                </button>
            </div>
        </div>
    </Section>
    
  );
};
