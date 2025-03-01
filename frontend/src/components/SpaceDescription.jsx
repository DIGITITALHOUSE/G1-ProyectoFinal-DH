import { FaPeopleLine, FaBuildingUser } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";

const SpaceDescription = ({ description, features = [] }) => {
    const hardcodedFeatures = [
        "WiFi de alta velocidad",
        "Café ilimitado",
        "Impresora y escaner",
        "Sala de conferencias",
    ];
    features = [...hardcodedFeatures, ...features];
    return (
        <div className="w-full px-4 sm:px-0">
            {/* Sección Detalles */}
            <section>
                <h1 className="text-2xl">Detalles del espacio</h1>
                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="flex items-center gap-4">
                        <FaPeopleLine size={30} className="text-gray-600" />
                        <div>
                            <p>Capacidad</p>
                            <p className="text-gray-700">Hasta 20 personas</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <FaBuildingUser size={30} className="text-gray-600" />
                        <div>
                            <p>Tipo de espacio</p>
                            <p className="text-gray-600">Oficina Privada</p>
                        </div>
                    </div>
                </div>
                <p className="mt-4 leading-4 text-gray-600">{description}</p>
            </section>
            <hr className="mt-8 text-gray-300" />
            {/* Sección Ubicación */}
            <section className="mt-4">
                <h1 className="text-2xl">Ubicación</h1>
                <p className="mt-4 leading-4 text-gray-600">Calle principal 123, Ciudad, País</p>
                <img
                    className="my-4 rounded-xl"
                    src="https://www.figma.com/file/w0e0EOjhYr1C5RfnKY2IST/image/e4e3f3abf285931c3b01945e170f2e7f2e89ca6f"
                    alt="Ubicación de espacio"
                />
            </section>
            <hr className="mt-8 text-gray-300" />
            {/* Sección Características */}
            <section className="mt-4">
                <h1 className="text-2xl">Características</h1>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {features.length > 0 ? (
                        features.map((feature, index) => (
                            <p key={index} className="flex items-center gap-2">
                                <FaRegCheckCircle /> {feature}
                            </p>
                        ))
                    ) : (
                        <p className="text-gray-500">No hay características disponibles.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SpaceDescription;
