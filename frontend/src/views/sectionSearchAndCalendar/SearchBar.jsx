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
      <div className="bg-[#1E3F75] py-8">
        <h2 className="text-white text-lg md:text-xl font-medium text-center">
          Reserva tu espacio, crea tu ambiente
        </h2>

        <div className="flex justify-center items-center gap-4 bg-blue-50 p-4 rounded-lg mt-6 max-w-4xl mx-auto shadow-lg">
          <input
            type="text"
            placeholder="País/Ciudad"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setSearchLocation(e.target.value); // Dynamically filter results
            }}
            className="w-1/3 px-6 py-3 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />

          <button
            onClick={handleSearch}
            className="flex items-center gap-3 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-all"
          >
            <FaSearch />
            Buscar
          </button>
        </div>
      </div>
    </Section>
  );
};

SearchBar.propTypes = {
  setSearchLocation: PropTypes.func.isRequired, // Expecting a function
};
