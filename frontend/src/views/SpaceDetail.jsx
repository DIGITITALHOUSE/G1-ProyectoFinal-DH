import { useParams } from "react-router-dom";
import { spacesData } from "../models/SpaceModel";
import Section from "./Section";

export const SpaceDetail = () => {
  const { spaceId } = useParams(); // Obtiene el ID de la URL
  const space = spacesData.find((s) => s.id === parseInt(spaceId));

  if (!space) {
    return (
      <div className="text-center text-gray-700 py-10">
        <h2 className="text-2xl font-semibold">Espacio no encontrado</h2>
      </div>
    );
  }

  return (
    <Section>
        <div className="container mx-auto max-w-4xl p-4">
        <img src={new URL(`../assets/${space.image.split('/').pop()}`, import.meta.url).href} alt={space.title} className="w-full h-64 object-cover rounded-lg" />
        <h1 className="text-3xl font-bold mt-4">{space.title}</h1>
        <p className="text-xl font-semibold text-gray-700">{space.price}</p>
        <p className="text-gray-600 mt-2">{space.description}</p>
        </div>
    </Section>
  );
};
