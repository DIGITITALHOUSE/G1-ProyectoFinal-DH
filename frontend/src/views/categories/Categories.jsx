import { useState } from "react";

export const Categories = () => {
  const [imagen, setImagen] = useState(null);

  const handleImagen = (e) => {
      const file = e.target.files[0];
      if (file) {
          setImagen(URL.createObjectURL(file));
      }
  };
  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">Nueva Categoría</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Nombre de la Categoría</label>
                    <input type="text" className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Descripción</label>
                    <textarea className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4"></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Imagen Representativa</label>
                    <div className="mt-2 border-dashed border-2 border-gray-300 p-4 text-center rounded-lg cursor-pointer">
                        {imagen ? (
                            <img src={imagen} alt="Imagen seleccionada" className="mx-auto h-20 object-cover rounded-lg" />
                        ) : (
                            <div>
                                <span className="block text-gray-500">Arrastra una imagen aquí o</span>
                                <label className="bg-gray-600 text-white px-4 py-1 rounded-md cursor-pointer mt-2 inline-block">
                                    Seleccionar Imagen
                                    <input type="file" className="hidden" onChange={handleImagen} />
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between">
                    <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-200">
                        Cancelar
                    </button>
                    <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}