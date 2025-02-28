const SpaceDescription = ({ title, description, features = [] }) => {
    return (
        <div className="w-full md:w-2/3 p-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-gray-700 mt-2">{description}</p>
            <div className="mt-4">
                {features.length > 0 ? (
                    features.map((feature, index) => (
                        <p key={index} className="flex items-center gap-2">
                            ✅ {feature}
                        </p>
                    ))
                ) : (
                    <p className="text-gray-500">No hay características disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default SpaceDescription;
