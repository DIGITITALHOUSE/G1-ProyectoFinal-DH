import { useState } from "react";
import ImageModal from "./ImageModal";

export default function ImageGallery({ images }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 max-h-[580px] min-h-[335px] gap-2 rounded-2xl overflow-hidden">
        {/* Primera imagen */}
        <div className="md:col-span-1 max-h-[580px]">
          {images[0] ? (
            <img src={images[0]} alt="Principal" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">Imagen no disponible</span>
            </div>
          )}
        </div>

        {/* Grid 2x2 para imágenes adicionales */}
        <div className="md:col-span-1 grid grid-cols-2 grid-rows-2 h-full gap-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
              {images[index + 1] ? (
                <img src={images[index + 1]} alt={`Imagen ${index + 2}`} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-gray-500">Imagen no disponible</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Botón "Ver más" SIEMPRE visible */}
      <button
        className="absolute bottom-2 right-2 bg-[#b21872] text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-md hover:bg-[#991761] transition"
        onClick={() => setIsModalOpen(true)}
      >
        Ver más
      </button>

      {/* Modal de imágenes */}
      {isModalOpen && <ImageModal images={images} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

  
