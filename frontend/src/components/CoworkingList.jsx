import { useState, useEffect } from "react";
// import { spacesData } from "../models/SpaceModel";
import { getAllSpaces } from "../services/spaceService";
import Section from "../views/Section";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Pagination from "./Pagination";

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const CoworkingList = ({ searchLocation }) => {
    const [spacesData, setSpacesData] = useState([]);
    const [filteredSpaces, setFilteredSpaces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Obtenemos todos los espacios
    useEffect(() => {
        getAllSpaces().then((data) => {
            setSpacesData(data);
            setFilteredSpaces(data);
        });
    }, []);

    useEffect(() => {
        const searchTerm = (searchLocation || "").toLowerCase();
        const filtered = spacesData.filter(
            (space) =>
                searchTerm === "" ||
                (space.ciudad && space.ciudad.toLowerCase().includes(searchTerm)) ||
                (space.pais && space.pais.toLowerCase().includes(searchTerm)),
        );
        setFilteredSpaces(shuffleArray(filtered));
    }, [spacesData, searchLocation]);

    // Calcular los elementos de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentSpaces = filteredSpaces.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Section>
            <div className="container mx-auto max-w-7xl p-4">
                {currentSpaces.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {currentSpaces.map((space) => (
                            <Link
                                to={`/space/${space.id}`}
                                key={space.id}
                                className="rounded-lg bg-white p-4 shadow-md"
                            >
                                <img
                                    // ToDo: Imagen de cada espacio
                                    // src={new URL(`../assets/${space.image.split("/").pop()}`, import.meta.url).href}
                                    src="https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?w=2048"
                                    alt={space.name}
                                    className="h-48 w-full rounded-md object-cover"
                                />
                                <h2 className="mt-2 text-lg font-semibold">{space.name}</h2>
                                <p className="text-xl font-bold text-gray-700">{space.hourPrice}</p>
                                <p className="text-gray-500">{space.description}</p>
                                <p className="text-sm text-gray-600">
                                    {space.city}, {space.country}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No se encontraron resultados</p>
                )}

                {/* Componente de paginación */}
                <Pagination
                    totalItems={filteredSpaces.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </Section>
    );
};

CoworkingList.propTypes = {
    searchLocation: PropTypes.string.isRequired,
};

// import { useState, useEffect } from "react";
// import { getAllSpaces } from "../services/spaceService";
// import Section from "../views/Section";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import Pagination from "./Pagination";

// const shuffleArray = (array) => {
//   const shuffled = [...array];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };

// export const CoworkingList = ({ searchLocation }) => {
//   const [filteredSpaces, setFilteredSpaces] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const fetchSpaces = async () => {
//       try {
//         const spaces = await getAllSpaces();
//         setFilteredSpaces(spaces);
//       } catch (error) {
//         console.error("Error fetching spaces:", error);
//       }
//     };

//     fetchSpaces();
//   }, []);

//   const searchTerm = (searchLocation || "").toLowerCase();
//   const filtered = filteredSpaces.filter((space) =>
//     searchTerm === "" ||
//     (space.city && space.city.toLowerCase().includes(searchTerm)) ||
//     (space.country && space.country.toLowerCase().includes(searchTerm))
//   );

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentSpaces = shuffleArray(filtered).slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <Section>
//       <div className="container mx-auto max-w-7xl p-4">
//         {currentSpaces.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//             {currentSpaces.map((space) => (
//               <Link to={`/space/${space.id}`} key={space.id} className="bg-white rounded-lg shadow-md p-4">
//                 <img src={space.spaceImages.length > 0 ? space.spaceImages[0] : "/default-image.jpg"} alt={space.name} className="w-full h-48 object-cover rounded-md" />
//                 <h2 className="text-lg font-semibold mt-2">{space.name}</h2>
//                 <p className="text-xl font-bold text-gray-700">${space.hourPrice}/hr</p>
//                 <p className="text-gray-500">{space.description}</p>
//                 <p className="text-sm text-gray-600">{space.city}, {space.country}</p>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center">No se encontraron resultados</p>
//         )}

//         <Pagination
//           totalItems={filtered.length}
//           itemsPerPage={itemsPerPage}
//           currentPage={currentPage}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </Section>
//   );
// };

// CoworkingList.propTypes = {
//   searchLocation: PropTypes.string.isRequired,
// };
