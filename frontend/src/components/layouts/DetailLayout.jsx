import { useState, useEffect } from "react";
import ImageGallery from "../ImageGallery";
import BookingPanel from "../BookingPanel";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { getFavorites, addFavorite, removeFavorite } from "../../services/favoriteService";
import { FaShare } from "react-icons/fa";
import ModalBase from "../modal/ModalBase";
import ShareModal from "../modal/ShareModal";

const DetailLayout = ({ children, space }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    // avoid space.images is undefined
    const spaceImage = "https://cdn.pixabay.com/photo/2020/08/13/16/43/coworking-space-in-gurgaon-5485822_960_720.jpg";

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
            <div className="mb-8 flex justify-between">
                {alertMessage && (
                    <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 transform rounded-md bg-red-500 px-6 py-3 text-white shadow-lg">
                        {alertMessage}
                    </div>
                )}
                <h1 className="text-3xl font-semibold">{space.name}</h1>
                <div className="flex gap-2">
                    <button
                        className="flex items-center gap-1 rounded-full border border-gray-300 px-3 text-black"
                        onClick={() => setIsShareModalOpen(true)}
                    >
                        <FaShare />
                        <span className="inline-block pb-1">Compartir</span>
                    </button>
                    <button
                        className="flex items-center gap-1 rounded-full border border-gray-300 px-3 text-black"
                        onClick={handleToggleFavorite}
                    >
                        {isFavorite ? <MdFavorite className="text-[#F43F5E]" /> : <MdFavoriteBorder />}
                        <span className="inline-block pb-1">Guardar</span>
                    </button>
                </div>
            </div>
            <div className="w-full">
                <ImageGallery images={space.images || []} />
            </div>

            <div className="mt-8 flex flex-col gap-6 md:flex-row">
                <div className="md:w-2/3">{children}</div>
                <div className="flex justify-end md:w-1/3">
                    <BookingPanel price={space.hourPrice} />
                </div>
            </div>
            <ModalBase isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)}>
                <ShareModal spaceTitle={space.name} spaceDescription={space.description} spaceImage={spaceImage} />
            </ModalBase>
        </div>
    );
};

export default DetailLayout;
