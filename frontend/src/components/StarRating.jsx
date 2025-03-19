import { useState } from "react";

/**
 * Componente de clasificación por estrellas
 * @param {Object} props
 * @param {number} props.value - El valor actual de las estrellas seleccionadas.
 * @param {(value: number) => void} props.onChange - Función que se llama al cambiar la selección de estrellas.
 */
const StarRating = ({ value, onChange }) => {
  // Para manejar el "hover" sobre las estrellas
  const [hovered, setHovered] = useState(0);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  const handleClick = (index) => {
    onChange(index);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          className={`cursor-pointer text-2xl ${
            star <= (hovered || value) ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;