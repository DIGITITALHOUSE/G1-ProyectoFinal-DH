import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Section from '../Section';
import PropTypes from "prop-types";

export const SearchBar = ({ setSearchLocation }) => {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    setSearchLocation(location); // Send the input to Home component
  };

  return (
    <Section>
      <div
        className="relative w-full h-96 bg-cover bg-center flex items-center rounded-lg"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXNwYWNpb3MlMjBkZSUyMGNvd29ya2luZ3xlbnwwfHwwfHx8MA%3D%3D')",
        }}
      >

      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

        <div className="relative z-10 max-w-3xl pl-12 text-left">
          <h1 className="text-4xl font-bold text-white">
            Encuentra tu espacio ideal para trabajar
          </h1>
          <p className="mt-2 text-lg text-gray-200">
            Descubre espacios de coworking únicos en tu ciudad
          </p>

          <div className="mt-4 flex w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar espacios..."
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setSearchLocation(e.target.value); // Filtrado dinámico
              }}
              className="flex-grow p-2 rounded-l-full text-gray-800 outline-none shadow-md"
            />

            <button
              onClick={handleSearch}
              className="p-2 bg-red-500 rounded-r-full hover:bg-red-600 transition-all shadow-md"
            >
              <FaSearch className="text-white text-lg" />
            </button>
          </div>
        </div>
      </div>

    </Section>
  );
};

SearchBar.propTypes = {
  setSearchLocation: PropTypes.func.isRequired, // Expecting a function
};
