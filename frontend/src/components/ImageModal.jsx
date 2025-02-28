import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageModal = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (images.length > 0 && images[currentIndex]) {
      setCurrentImage(images[currentIndex]); 
    }
  }, [currentIndex, images]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Botón de Cerrar - Ahora en la esquina fija */}
      <button
        className="fixed top-4 right-4 text-white bg-gray-900 p-2 rounded-full hover:bg-gray-700 transition z-50"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      <div 
        className="relative w-full max-w-3xl flex justify-center items-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Anterior */}
        <button
          onClick={prevImage}
          className="absolute left-6 text-white bg-gray-900 p-3 rounded-full hover:bg-gray-700 transition"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Imagen */}
        {currentImage ? (
          <img
            src={currentImage}
            alt={`Imagen ${currentIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        ) : (
          <p className="text-white">Imagen no disponible</p>
        )}

        {/* Botón Siguiente */}
        <button
          onClick={nextImage}
          className="absolute right-6 text-white bg-gray-900 p-3 rounded-full hover:bg-gray-700 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
