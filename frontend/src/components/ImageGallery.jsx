import { useState } from "react";
import ImageModal from "./ImageModal";

export default function ImageGallery({ images }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hardcoded images
    const hardcodedImages = [
        "https://cdn.pixabay.com/photo/2020/08/13/16/43/coworking-space-in-gurgaon-5485822_960_720.jpg",
        "https://cdn.pixabay.com/photo/2021/04/12/16/07/coworking-6173112_960_720.jpg",
        "https://plus.unsplash.com/premium_photo-1684769161054-2fa9a998dcb6?q=80&w=2104&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1661962361446-f450f3f21495?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    // Borrar esta asignacion
    images = hardcodedImages;

    // Array de las primeras 5 imagenes, y si no hay completar con valores vacios
    const firstFiveImages = images.slice(0, 5).concat(Array(5 - images.length).fill(""));
    console.log(firstFiveImages);

    return (
        <div className="relative">
            <div className="grid h-[480px] min-h-[335px] grid-cols-1 gap-2 overflow-hidden rounded-2xl md:grid-cols-2 md:rounded-l-xl">
                {/* Primera imagen */}
                <div className="h-[480px] md:col-span-1">
                    {firstFiveImages[0] ? (
                        <img src={firstFiveImages[0]} alt="Principal" className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-300">
                            <span className="text-gray-500">Imagen no disponible</span>
                        </div>
                    )}
                </div>

                {/* Grid 2x2 para imágenes adicionales */}
                <div className="hidden h-[480px] grid-cols-2 grid-rows-2 gap-2 md:col-span-1 md:grid">
                    {firstFiveImages.slice(1, 5).map((image, index) => (
                        <div
                            key={index}
                            className={`flex h-full w-full items-center justify-center overflow-hidden ${index === 1 ? "rounded-tr-xl" : index === 3 ? "rounded-br-xl" : ""} bg-gray-300`}
                        >
                            {image !== "" ? (
                                <img src={image} alt={`Imagen ${index + 2}`} className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-gray-500">Imagen no disponible</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Botón "Ver más" SIEMPRE visible */}
            <button
                className="absolute bottom-3 right-3 rounded-lg bg-white px-8 py-1.5 text-black shadow-md transition duration-300 ease-in-out hover:bg-gray-200"
                onClick={() => setIsModalOpen(true)}
            >
                Ver más
            </button>

            {/* Modal de imágenes */}
            {isModalOpen && <ImageModal images={images} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}
