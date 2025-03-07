import { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { createSpace } from "../../services/spaceService";
import { getAllSpaceTypes } from "../../services/spaceTypeService";

export const Products = () => {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [spaceTypes, setSpaceTypes] = useState([]);
    const [countries, setCountries] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [cities, setCities] = useState([]);

    const handleImageChange = (event) => {
        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            const uniqueId = Date.now() + Math.random();

            reader.onloadend = () => {
                // Guardar todas las imágenes previas y las nuevas en una sola variable
                setImagePreviews((prevImagePreviews) => [...prevImagePreviews, { src: reader.result, id: uniqueId }]);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = (id) => {
        setImagePreviews(imagePreviews.filter((image) => image.id !== id));
    };

    useEffect(() => {
        // Petición de tipos de espacios
        getAllSpaceTypes().then((data) => {
            setSpaceTypes(data);
        });
        // Petición de paises
        fetch("https://restcountries.com/v3.1/lang/spanish?fields=name,cca2,flag,flags")
            .then((response) => response.json())
            .then((data) => {
                const filteredCountries = data.filter(
                    (country) => !["GU", "GQ", "BZ", "EH", "PR"].includes(country.cca2),
                );
                setCountries(filteredCountries);
            });
    }, []);

    const fetchCities = async (country) => {
        if (!country) {
            setCities([]);
            return;
        }

        try {
            const response = await fetch(`https://countriesnow.space/api/v0.1/countries/states`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ country }),
            });

            const data = await response.json();
            setCities(
                data.data.states.map((state) => ({
                    ...state,
                    name: state.name.replace(/ Department| Province| Region$/, ""),
                })),
            );
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        // Revisar los datos del formulario, que no esten vacios
        let errors = false;
        formData.forEach((value) => {
            if (value === "") errors = true;
        });

        if (errors) alert("Todos los campos deben estar llenos");

        // Convertimos extras en un json
        const extrasText = formData.get("extras"); // Obtener el texto del campo extras
        // Borrrar las "" del texto
        formData.set("extras", extrasText);
        console.log(formData);

        if (imagePreviews.length === 0) {
            alert("Debes seleccionar al menos una imagen");
            return;
        }

        if (errors === false) {
            const res = createSpace(formData);

            if (res) {
                alert("Espacio creado con exito");
            }
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="mx-auto grid max-w-4xl grid-cols-2 gap-6 rounded-xl bg-white p-8 shadow-lg"
            >
                {/* Información */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-gray-700">Información</h3>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 font-semibold text-gray-600">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-1 font-semibold text-gray-600">
                            Descripción:
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            className="h-20 w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:ring focus:ring-primary"
                        ></textarea>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="spaceTypeId" className="mb-1 font-semibold text-gray-600">
                            Tipo de espacio:
                        </label>
                        <select
                            name="spaceTypeId"
                            id="spaceTypeId"
                            className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-2 focus:ring focus:ring-primary"
                        >
                            <option value="">Seleccione un tipo de espacio</option>
                            {spaceTypes.map((spaceType) => (
                                <option key={spaceType.id} value={spaceType.id}>
                                    {spaceType.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="capacity" className="mb-1 font-semibold text-gray-600">
                            Capacidad:
                        </label>
                        <input
                            type="number"
                            name="capacity"
                            id="capacity"
                            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="hourPrice" className="mb-1 font-semibold text-gray-600">
                            Precio por hora:
                        </label>
                        <input
                            type="text"
                            name="hourPrice"
                            id="hourPrice"
                            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:ring focus:ring-primary"
                        />
                    </div>
                </div>
                {/*Seccion Localizacion*/}
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-gray-700">Localización</h3>
                    <div className="flex flex-col">
                        <label htmlFor="country" className="mb-1 font-semibold text-gray-600">
                            País:
                        </label>
                        <select
                            name="country"
                            id="country"
                            className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-2 focus:ring focus:ring-primary"
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setSelectedCountry(null);
                                    return;
                                }
                                const country = countries.find((c) => c.name.nativeName.spa.common === e.target.value);
                                setSelectedCountry(country);
                                fetchCities(country.name.common);
                            }}
                        >
                            <option value="">Seleccione un país</option>
                            {countries.map((country) => {
                                const countryName = country.name.nativeName.spa.common;
                                return (
                                    <option key={countryName} value={countryName}>
                                        {country.flag + " " + countryName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="city" className="mb-1 font-semibold text-gray-600">
                            Ciudad:
                        </label>
                        <select
                            name="city"
                            id="city"
                            className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-2 focus:ring focus:ring-primary"
                        >
                            <option value="">Seleccione una ciudad</option>
                            {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="direction" className="mb-1 font-semibold text-gray-600">
                            Dirección:
                        </label>
                        <input
                            type="text"
                            name="direction"
                            id="direction"
                            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="zipCode" className="mb-1 font-semibold text-gray-600">
                            Código postal:
                        </label>
                        <input
                            type="text"
                            name="zipCode"
                            id="zipCode"
                            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:ring focus:ring-primary"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="extras" className="mb-1 font-semibold text-gray-600">
                            Extras:
                        </label>
                        <input
                            type="text"
                            name="extras"
                            id="extras"
                            className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:ring focus:ring-primary"
                            placeholder="extra 1, extra 2, extra 3 etc"
                        />
                    </div>
                </div>
                {/*Seccion Imagenes*/}
                <div className="col-span-2 flex flex-col gap-4">
                    <label htmlFor="img" className="text-xl font-bold text-gray-700">
                        Agrega imágenes:
                    </label>
                    <div className="flex items-center gap-4">
                        <label
                            htmlFor="images"
                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-[#8A0B57]"
                        >
                            <FaCloudUploadAlt className="text-2xl" />
                            <span>Subir imágenes</span>
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            name="images"
                            id="images"
                            className="hidden"
                        />
                    </div>
                    <div className="image-previews mt-4 grid grid-cols-3 gap-6">
                        {imagePreviews.map((preview) => (
                            <div key={preview.id} className="relative flex flex-col items-center">
                                <img
                                    src={preview.src}
                                    alt={`Preview ${preview.id}`}
                                    className="h-40 w-80 rounded-md border border-gray-300 object-cover shadow-md"
                                />
                                <button
                                    onClick={() => handleImageRemove(preview.id)}
                                    className="mt-2 flex items-center gap-2 rounded-lg bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
                                >
                                    <FaTrash />
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/*Boton Guardar*/}
                <div className="col-span-2 mt-6 flex justify-center">
                    <button className="rounded-lg bg-[#F43F5E] px-6 py-3 text-lg font-bold text-white transition duration-300">
                        Guardar
                    </button>
                </div>
            </form>
        </>
    );
};
