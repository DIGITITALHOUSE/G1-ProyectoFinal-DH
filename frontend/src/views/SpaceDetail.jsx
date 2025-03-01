import { useParams } from "react-router-dom";
import { spacesData } from "../models/SpaceModel";
import DetailLayout from "../components/layouts/DetailLayout";
import SpaceDescription from "../components/SpaceDescription";

export const SpaceDetail = () => {
    const { spaceId } = useParams();
    const space = spacesData.find((s) => s.id === Number(spaceId)); // Aseguramos que sea un número

    if (!space) {
        return (
            <div className="py-10 text-center text-gray-700">
                <h2 className="text-2xl font-semibold">Espacio no encontrado</h2>
            </div>
        );
    }

    return (
        <DetailLayout space={space}>
            {" "}
            {/* Pasamos 'space' para evitar errores */}
            <SpaceDescription description={space.description} features={space.features || []} />
        </DetailLayout>
    );
};
