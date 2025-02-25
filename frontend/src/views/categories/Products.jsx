
import { useEffect, useState } from "react"; import "./Products.css";
import { Link } from "react-router-dom";

export const Products = () => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const [countries, setCountries] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      const uniqueId = Date.now() + Math.random();

      reader.onloadend = () => {
        // Guardar todas las imágenes previas y las nuevas en una sola variable
        setImagePreviews((prevImagePreviews) => [
          ...prevImagePreviews,
          { src: reader.result, id: uniqueId },
        ]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (id) => {
    setImagePreviews(imagePreviews.filter((image) => image.id !== id));
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/lang/spanish?fields=name,cca2,flag,flags")
      .then((response) => response.json())
      .then((data) => {
        const filteredCountries = data.filter(
          (country) => !["GU", "GQ","BZ","EH"].includes(country.cca2)
        );
        setCountries(filteredCountries);
      });
  }, []);

  return (
    <>
      <div className="flex bg-[#3C79CF] justify-between items-center mb-4">
        <h2 className="ml-4 font-bold text-white">Agregar producto</h2>
        <Link to="/list-products">
          <button className="mr-4 mt-2 mb-2 bg-[#AB0D6A] text-white border-none px-6 py-3 rounded-full cursor-pointer font-bold text-lg transition duration-300 hover:bg-[#8A0B57] whitespace-nowrap">
            <i className="fas fa-arrow-left"></i> Regresar
          </button>
        </Link>
      </div>

      <form className="grid grid-cols-2 gap-8 mx-auto p-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Información</h3>
          <div className="flex flex-col">
            <label htmlFor="title" className="font-bold mb-1">Nombre:</label>
            <input type="text" name="title" id="title" className="w-full px-4 py-2 border border-black rounded-lg text-sm" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="describe" className="font-bold mb-1">Descripción:</label>
            <input type="text" name="describe" id="describe" className="w-full px-4 py-2 border border-black rounded-lg text-sm h-20" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="type" className="font-bold mb-1">Tipo espacio:</label>
            <input type="text" name="type" id="type" className="w-full px-4 py-2 border border-black rounded-lg text-sm" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="capacity" className="font-bold mb-1">Capacidad:</label>
            <input type="text" name="capacity" id="capacity" className="w-full px-4 py-2 border border-black rounded-lg text-sm" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="font-bold mb-1">Precio hora:</label>
            <input type="text" name="price" id="price" className="w-full px-4 py-2 border border-black rounded-lg text-sm" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Localización</h3>
          <div className="flex flex-col">
            <label htmlFor="country" className="font-bold mb-1">País:</label>
            <select name="country" id="country" className="w-full px-4 py-2 border border-black rounded-lg text-sm"
            >
              <option value="">Seleccione un país</option>
              {
                countries.map((country) => (
                  <option key={country.name.nativeName.spa.common} value={country.name.common} className="before:content-['asd']">
                    {country.flag + " " + country.name.nativeName.spa.common}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="region" className="font-bold mb-1">Región:</label>
            <input type="text" name="region" id="region" className="w-full px-4 py-2 border border-black rounded-lg text-sm" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="suite" className="font-bold mb-1">Localidad:</label>
            <input type="text" name="suite" id="suite" className="w-full px-4 py-2 border border-black rounded-lg text-sm" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="zip" className="font-bold mb-1">Código postal:</label>
            <input type="text" name="zip" id="zip" className="w-full px-4 py-2 border border-black rounded-lg text-sm" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="extra" className="font-bold mb-1">Indicaciones extras:</label>
            <input type="text" name="extra" id="extra" className="w-full px-4 py-2 border border-black rounded-lg text-sm" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="img" className="font-bold text-lg mb-4">Agrega imágenes:</label>
          <div>
            <label htmlFor="img" className="font-bold mb-1 rounded-lg bg-primary text-white px-4 py-2 cursor-pointer hover:bg-[#8A0B57]">Subir imagenes</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} name="img" id="img" className="w-full mt-4 mb-2 hidden" />
            <div className="image-previews flex flex-wrap mt-4">
              {imagePreviews.map((preview) => (
                <div key={preview.id} className="relative mb-4 mr-4">
                  <img
                    src={preview.src}
                    alt={`Preview ${preview.id}`}
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                    className="rounded-md"
                  />
                  <button
                    onClick={() => handleImageRemove(preview.id)} // Eliminar la imagen usando su id único
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    style={{ fontSize: '12px' }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-start mt-4">
            <button className="bg-[#AB0D6A] text-white px-6 py-2 rounded-full cursor-pointer font-bold text-lg transition duration-300 hover:bg-[#8A0B57]">
              Guardar
            </button>
          </div>
        </div>
      </form>

    </>
  )

}