import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllSpaces, searchSpaces } from "../services/spaceService";
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

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const keyword = params.get("keyword") || "";
        const date = params.get("date") || "";
        const spaceType = params.get("spaceType") || "";

        if (keyword || date || spaceType) {
            searchSpaces({ keyword, date, spaceType }).then((data) => {
                setSpacesData(data);
                setFilteredSpaces(data);
            });
        } else {
            getAllSpaces().then((data) => {
                console.log(data);
                setSpacesData(data);
                setFilteredSpaces(shuffleArray(data));
            });
        }
    }, [location.search]);

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
