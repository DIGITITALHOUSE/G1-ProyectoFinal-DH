
import { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";

export const Products = () => {
  const [imagePreviews, setImagePreviews] = useState([]);

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
          (country) => !["GU", "GQ","BZ","EH","PR"].includes(country.cca2)
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
      setCities(data.data.states.map((state) => ({
        ...state,
        name: state.name.replace(/ Department| Province| Region$/, '')
      })));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  return (
    <>
      <form className="max-w-4xl bg-white shadow-lg rounded-xl p-8 mx-auto grid grid-cols-2 gap-6">

        {/* Información */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-gray-700">Información</h3>
          <div className="flex flex-col">
            <label htmlFor="title" className="font-semibold text-gray-600 mb-1">Nombre:</label>
            <input type="text" name="title" id="title" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring focus:ring-primary" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="describe" className="font-semibold text-gray-600 mb-1">Descripción:</label>
            <textarea name="describe" id="describe" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg h-20 focus:ring focus:ring-primary"></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="type" className="font-semibold text-gray-600 mb-1">Tipo de espacio:</label>
            <select name="type" id="type" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-white focus:ring focus:ring-primary">
              <option value="">Seleccione un tipo</option>
              <option value="oficina">Oficina</option>
              <option value="coworking">Coworking</option>
              <option value="sala_reuniones">Sala de reuniones</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="capacity" className="font-semibold text-gray-600 mb-1">Capacidad:</label>
            <input type="number" name="capacity" id="capacity" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring focus:ring-primary" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="font-semibold text-gray-600 mb-1">Precio por hora:</label>
            <input type="text" name="price" id="price" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring focus:ring-primary" />
          </div>
        </div>
        {/*Seccion Localizacion*/ } 
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-gray-700">Localización</h3>
          <div className="flex flex-col">
            <label htmlFor="country" className="font-semibold text-gray-600 mb-1">País:</label>
            <select name="country" id="country" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-white focus:ring focus:ring-primary"
              onChange={(e) => {
                if (e.target.value === "") {
                  setSelectedCountry(null);
                  return;
                }
                const country = countries.find(c => c.name.nativeName.spa.common === e.target.value);
                setSelectedCountry(country);
                fetchCities(country.name.common);
              }}
            >
              <option value="">Seleccione un país</option>
              {
                countries.map((country) => {
                  const countryName = country.name.nativeName.spa.common;
                  return (
                  <option key={countryName} value={countryName}>
                    {country.flag + " " + countryName}
                  </option>
                )})
              }
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="region" className="font-semibold text-gray-600 mb-1">Ciudad:</label>
            <select name="region" id="region" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg bg-white focus:ring focus:ring-primary">
              <option value="">Seleccione una ciudad</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="suite" className="font-semibold text-gray-600 mb-1">Localidad:</label>
            <input type="text" name="suite" id="suite" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring focus:ring-primary" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="zip" className="font-semibold text-gray-600 mb-1">Código postal:</label>
            <input type="text" name="zip" id="zip" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring focus:ring-primary" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="extra" className="font-semibold text-gray-600 mb-1">Indicaciones extras:</label>
            <input type="text" name="extra" id="extra" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring focus:ring-primary" />
          </div>
        </div>
        {/*Seccion Imagenes*/ }       
        <div className="col-span-2 flex flex-col gap-4">
          <label htmlFor="img" className="text-xl font-bold text-gray-700">Agrega imágenes:</label>
          <div className="flex items-center gap-4">
            <label htmlFor="img" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#8A0B57] transition">
              <FaCloudUploadAlt className="text-2xl" />
              <span>Subir imágenes</span>
            </label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} name="img" id="img" className="hidden" />
          </div>
          <div className="image-previews grid grid-cols-3 gap-6 mt-4">
            {imagePreviews.map((preview) => (
              <div key={preview.id} className="relative flex flex-col items-center">
                <img src={preview.src} alt={`Preview ${preview.id}`} className="w-80 h-40 object-cover rounded-md border border-gray-300 shadow-md" />
                <button
                  onClick={() => handleImageRemove(preview.id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-red-600 transition">
                  <FaTrash /> 
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        {/*Boton Guardar*/ } 
        <div className="col-span-2 flex justify-center mt-6">
          <button className="bg-[#F43F5E] text-white px-6 py-3 rounded-lg font-bold text-lg transition duration-300">
            Guardar
          </button>
        </div>

      </form>
    </>
  )
}