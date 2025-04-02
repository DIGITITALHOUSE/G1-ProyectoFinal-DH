import { useState, useEffect } from "react";
import ImageGallery from "../ImageGallery";
import BookingPanel from "../BookingPanel";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { getFavorites, addFavorite, removeFavorite } from "../../services/favoriteService";

const DetailLayout = ({ children, space }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("id");

        if (userId) {
            getFavorites(userId).then((favs) => {
                const found = favs.some((fav) => fav.id === space.id);
                setIsFavorite(found);
            });
        }
    }, [space.id]);

    const handleToggleFavorite = async () => {
        const userId = localStorage.getItem("id");

        if (!userId) {
            setAlertMessage("Por favor, inicia sesión para agregar favoritos.");
            setTimeout(() => setAlertMessage(""), 1000);
            return;
        }

        if (isFavorite) {
            await removeFavorite(userId, space.id);
        } else {
            await addFavorite(userId, space.id);
        }

        setIsFavorite(!isFavorite);
    };

    if (!space) return null;

    return (
        <div className="container mx-auto max-w-6xl py-8">
            <div className="mb-8 flex">
                {alertMessage && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg">
                        {alertMessage}
                    </div>
                )}
                <h1 className="text-3xl font-semibold">{space.title}</h1>
                <button
                    className="ml-auto flex items-center gap-1 rounded-full border border-gray-300 px-3 text-black"
                    onClick={handleToggleFavorite}
                >
                    {isFavorite ? (
                        <MdFavorite className="text-[#F43F5E]" />
                    ) : (
                        <MdFavoriteBorder />
                    )}
                    <span className="inline-block pb-1">Guardar</span>
                </button>
            </div>
            <div className="w-full">
                <ImageGallery images={space.images || []} />
            </div>

            <div className="mt-8 flex flex-col gap-6 md:flex-row">
                <div className="md:w-2/3">{children}</div>
                <div className="flex justify-end md:w-1/3">
                    <BookingPanel price={space.hourPrice} name={space.name} img={space.images} id={space.id} />
                </div>
            </div>
        </div>
    );
};

export default DetailLayout;
