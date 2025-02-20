import { useState, useEffect } from "react";
import { spacesData } from "../models/SpaceModel";
import Section from "../views/Section";
import { Link } from "react-router-dom";

export const CoworkingList = () => {
  const [randomSpaces, setRandomSpaces] = useState([]);

  useEffect(() => {
    // Algoritmo para seleccionar 10 espacios aleatorios sin repetirse
    const shuffled = [...spacesData].sort(() => 0.5 - Math.random());
    setRandomSpaces(shuffled.slice(0, 10));
  }, []);

  return (
    <Section>
        <div className="container mx-auto max-w-7xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {randomSpaces.map((space) => (
            <Link to={`/space/${space.id}`} key={space.id} className="bg-white rounded-lg shadow-md p-4">
                <img src={new URL(`../assets/${space.image.split('/').pop()}`, import.meta.url).href} alt={space.title} className="w-full h-48 object-cover rounded-md" />
                <h2 className="text-lg font-semibold mt-2">{space.title}</h2>
                <p className="text-xl font-bold text-gray-700">{space.price}</p>
                <p className="text-gray-500">{space.description}</p>
            </Link>
            ))}
        </div>
        </div>
    </Section>
  );
};

