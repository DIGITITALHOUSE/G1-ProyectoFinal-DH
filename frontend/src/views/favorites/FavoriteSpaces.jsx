import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../../services/favoriteService";
import Section from "../Section";
import { Link } from "react-router-dom";
import { MdFavorite } from "react-icons/md";

export const FavoriteSpaces = () => {
    const [favoriteSpaces, setFavoriteSpaces] = useState([]);
    const userId = localStorage.getItem("id");

    useEffect(() => {
        if (userId) {
            getFavorites(userId)
                .then(setFavoriteSpaces)
                .catch(() => setFavoriteSpaces([]));
        } else {
            setFavoriteSpaces([]);
        }
    }, [userId]);

    const handleRemoveFavorite = async (spaceId) => {
        await removeFavorite(userId, spaceId);
        setFavoriteSpaces((prev) => prev.filter((space) => space.id !== spaceId));
    };

    return (
        <Section>
            <div className="container mx-auto max-w-7xl p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Coworking Favoritos</h2>
                {favoriteSpaces.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {favoriteSpaces.map((space) => (
                            <Link
                                to={`/space/${space.id}`}
                                key={space.id}
                                className="relative rounded-lg bg-white p-4 shadow-md"
                            >
                                <button
                                    className="absolute top-6 right-5 flex items-center justify-center rounded-full p-2 bg-white bg-opacity-50 shadow-md cursor-pointer transition-all"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleRemoveFavorite(space.id);
                                    }}
                                >
                                    <MdFavorite className="text-[#F43F5E]" />
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
                    <p className="text-center text-gray-500">No hay favoritos agregados.</p>
                )}
            </div>
        </Section>
    );
};


