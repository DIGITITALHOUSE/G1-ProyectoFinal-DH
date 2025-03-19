import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllSpaces, searchSpaces } from "../services/spaceService";
import { getFavorites, addFavorite, removeFavorite } from "../services/favoriteService";
import Section from "../views/Section";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Pagination from "./Pagination";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

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
    const [favorites, setFavorites] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const location = useLocation();
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const keyword = params.get("keyword") || "";
        const date = params.get("date") || "";
        const spaceType = params.get("spaceType") || "";
    
        const userId = localStorage.getItem("id");
    
        if (keyword || date || spaceType) {
            searchSpaces({ keyword, date, spaceType }).then((data) => {
                setSpacesData(data);
                setFilteredSpaces(shuffleArray(data));
            });
        } else {
            getAllSpaces().then((data) => {
                setSpacesData(data);
                setFilteredSpaces(shuffleArray(data));
    
                if (userId) {
                    getFavorites(userId).then((favs) => {
                        const favMap = {};
                        favs.forEach((fav) => (favMap[fav.id] = true));
                        setFavorites(favMap);  
                    });
                }
            });
        }
    }, [location.search]);

    const toggleFavorite = async (id) => {
        const userId = localStorage.getItem("id");
    
        if (!userId) {
            setAlertMessage("Por favor, inicia sesión para agregar favoritos.");
            setTimeout(() => setAlertMessage(""), 1000); 
            return;
        }
    
        if (favorites[id]) {
            await removeFavorite(userId, id);
        } else {
            await addFavorite(userId, id);
        }
    
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [id]: !prevFavorites[id],
        }));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentSpaces = filteredSpaces.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Section>
            <div className="container mx-auto max-w-7xl p-4">
                {alertMessage && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg">
                        {alertMessage}
                    </div>
                )}
                {currentSpaces.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {currentSpaces.map((space) => (
                            <Link
                                to={`/space/${space.id}`}
                                key={space.id}
                                className="relative rounded-lg bg-white p-4 shadow-md"
                            >
                                <button
                                    className="absolute top-6 right-5 flex items-center justify-center rounded-full p-2 bg-white bg-opacity-50 shadow-md cursor-pointer transition-all"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavorite(space.id);
                                    }}
                                >
                                    {favorites[space.id] ? (
                                        <MdFavorite className="text-[#F43F5E]" />
                                    ) : (
                                        <MdFavoriteBorder className="text-gray-700" />
                                    )}
                                </button>
                                <img
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
