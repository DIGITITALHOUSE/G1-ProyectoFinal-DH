import { useState, useEffect } from "react";
import { spacesData } from "../models/SpaceModel";
import Section from "../views/Section";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Helper function to shuffle the array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};

export const CoworkingList = ({ searchLocation }) => {
  const [filteredSpaces, setFilteredSpaces] = useState([]);

  useEffect(() => {
    const searchTerm = (searchLocation || "").toLowerCase();
    
    // Filter spaces based on search location
    const filtered = spacesData.filter((space) =>
      searchTerm === "" ||
      (space.ciudad && space.ciudad.toLowerCase().includes(searchTerm)) ||
      (space.pais && space.pais.toLowerCase().includes(searchTerm))
    );

    // Randomize the filtered spaces
    setFilteredSpaces(shuffleArray(filtered));
  }, [searchLocation]);

  return (
    <Section>
      <div className="container mx-auto max-w-7xl p-4">
        {filteredSpaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredSpaces.map((space) => (
              <Link to={`/space/${space.id}`} key={space.id} className="bg-white rounded-lg shadow-md p-4">
                <img src={new URL(`../assets/${space.image.split('/').pop()}`, import.meta.url).href} alt={space.title} className="w-full h-48 object-cover rounded-md" />
                <h2 className="text-lg font-semibold mt-2">{space.title}</h2>
                <p className="text-xl font-bold text-gray-700">{space.price}</p>
                <p className="text-gray-500">{space.description}</p>
                <p className="text-sm text-gray-600">{space.ciudad}, {space.pais}</p> {/* Mostramos ciudad y país */}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No se encontraron resultados</p>
        )}
      </div>
    </Section>
  );
};

CoworkingList.propTypes = {
  searchLocation: PropTypes.string.isRequired, // Expecting a string
};
