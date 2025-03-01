import ImageGallery from "../ImageGallery";
import BookingPanel from "../BookingPanel";
import { MdFavoriteBorder } from "react-icons/md";

// DetailLayout.jsx
const DetailLayout = ({ children, space }) => {
    if (!space) return null;

    return (
        <div className="container mx-auto max-w-6xl py-8">
            <div className="mb-8 flex">
                <h1 className="text-3xl font-semibold">{space.title}</h1>
                <button className="ml-auto flex items-center gap-1 rounded-full border border-gray-300 px-3 text-black">
                    <MdFavoriteBorder />
                    <span className="inline-block pb-1">Guardar</span>
                </button>
            </div>
            <div className="w-full">
                <ImageGallery images={space.images || []} />
            </div>

            {/* Contenedor Flex para la Descripción y el Panel de Reserva */}
            <div className="mt-8 flex flex-col gap-6 md:flex-row">
                <div className="md:w-2/3">{children}</div>
                <div className="flex justify-end md:w-1/3">
                    {" "}
                    {/* Alinea el BookingPanel a la derecha */}
                    <BookingPanel price={space.price} />
                </div>
            </div>
        </div>
    );
};

export default DetailLayout;
