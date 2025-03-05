import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { spacesData } from "../models/SpaceModel";
import { getSpaceById } from "../services/spaceService";
import DetailLayout from "../components/layouts/DetailLayout";
import SpaceDescription from "../components/SpaceDescription";

export const SpaceDetail = () => {
    const { spaceId } = useParams();
    // const space = spacesData.find((s) => s.id === Number(spaceId));
    const [space, setSpace] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSpaceById(spaceId)
            .then((data) => {
                setSpace(data);
            })
            .catch((error) => {
                console.error("Error fetching space:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [spaceId]);

    // if (!space) {
    //     return (
    //         <div className="py-10 text-center text-gray-700">
    //             <h2 className="text-2xl font-semibold">Espacio no encontrado</h2>
    //         </div>
    //     );
    // }

    if (loading) {
        return <p className="text-center text-gray-500">Cargando...</p>;
    }

    return (
        <DetailLayout space={space}>
            {" "}
            {/* Pasamos 'space' para evitar errores */}
            <SpaceDescription description={space.description} features={space.features || []} />
        </DetailLayout>
    );
};

// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { getSpaceById } from "../services/spaceService";
// import DetailLayout from "../components/layouts/DetailLayout";
// import SpaceDescription from "../components/SpaceDescription";

// export const SpaceDetail = () => {
//     const { spaceId } = useParams();
//     const [space, setSpace] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchSpace = async () => {
//             try {
//                 const data = await getSpaceById(spaceId);
//                 setSpace(data);
//             } catch (error) {
//                 console.error("Error fetching space:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSpace();
//     }, [spaceId]);

//     if (loading) {
//         return <p className="text-center text-gray-500">Cargando...</p>;
//     }

//     if (!space) {
//         return (
//             <div className="py-10 text-center text-gray-700">
//                 <h2 className="text-2xl font-semibold">Espacio no encontrado</h2>
//             </div>
//         );
//     }

//     return (
//         <DetailLayout space={space}>
//             <SpaceDescription description={space.description} features={space.extras || []} />
//         </DetailLayout>
//     );
// };
