import { useState } from "react";
import { createSpaceType } from "../../services/spaceTypeService";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const Categories = () => {
    const [categoryName, setCategoryName] = useState("");
    const [imagen, setImagen] = useState(null);

    const [errors, setErrors] = useState({
        categoryName: "",
    });

    const handleImagen = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCategory = { categoryName };

        if (newCategory.categoryName.trim() === "") {
            setErrors({ ...errors, categoryName: "El nombre de la categoría es obligatorio" });
            return;
        }

        // Enviamos los datos a la API
        const data = {
            name: newCategory.categoryName,
        };

        try {
            await toast.promise(createSpaceType(data), {
                pending: "Cargando",
                success: "Categoría creada correctamente",
                error: "Error al crear la categoría",
            });

            setCategoryName("");
        } catch (error) {
            console.error("Error al crear la categoría:", error);
        }
    };
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <ToastContainer />
                <form className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg" onSubmit={handleSubmit}>
                    <h2 className="mb-4 text-xl font-semibold">Nueva Categoría</h2>

                    <div className="mb-4">
                        <label className="block font-medium text-gray-700">
                            Nombre de la Categoría <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={
                                `mt-1 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500` +
                                (errors.categoryName ? " border-red-500" : "")
                            }
                            value={categoryName}
                            onChange={(e) => {
                                setCategoryName(e.target.value);
                                if (errors.categoryName) {
                                    setErrors({ ...errors, categoryName: "" });
                                }
                            }}
                        />
                        {errors.categoryName && <span className="text-red-500">{errors.categoryName}</span>}
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-gray-700">Descripción</label>
                        <textarea
                            className="mt-1 w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium text-gray-700">Imagen Representativa</label>
                        <div className="mt-2 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center">
                            {imagen ? (
                                <img
                                    src={imagen}
                                    alt="Imagen seleccionada"
                                    className="mx-auto h-20 rounded-lg object-cover"
                                />
                            ) : (
                                <div>
                                    <span className="block text-gray-500">Arrastra una imagen aquí o</span>
                                    <label className="mt-2 inline-block cursor-pointer rounded-md bg-gray-600 px-4 py-1 text-white">
                                        Seleccionar Imagen
                                        <input type="file" className="hidden" onChange={handleImagen} />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <Link to="/list-categories">
                            <button className="rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-200">
                                Cancelar
                            </button>
                        </Link>
                        <button className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-900" type="submit">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
