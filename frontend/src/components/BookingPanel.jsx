import Calendar from "../components/Calendar";
import { useState, useRef, useEffect } from "react";
import { getSpacesAvailability } from "../services/spaceService";
import { useParams } from "react-router-dom";

const BookingPanel = ({ price }) => {
    const { spaceId } = useParams();
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedHour, setSelectedHour] = useState([]);
    const [hours, setHours] = useState([]);
    const calendarRef = useRef();
    const updateSelectedDate = (date) => {
        setSelectedDate(date);
    };

    // Función para convertir la fecha a formato YYYY-MM-DD
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
        const day = String(d.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        let date = formatDate(selectedDate)
        getSpacesAvailability(spaceId,date)
            .then((data) => {
                setHours(data.availability);
            })
            .catch((error) => {
                console.error("Error fetching space:", error);
            })
    }, [selectedDate]);
    
     // Función para manejar la selección/deselección de horas
    const toggleHourSelection = (hour) => {
        // Verificar si la hora ya está seleccionada
        if (selectedHour.includes(hour)) {
        // Si la hora ya está seleccionada, la deseleccionamos
        setSelectedHour(selectedHour.filter((h) => h !== hour));
        } else {
        // Si no está seleccionada, la agregamos
        setSelectedHour([...selectedHour, hour]);
        }
    };

    return (
        <div className="w-full bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold">${price} <span className="text-2xl text-gray-400">/hora</span></h2>
            <button className="bg-[#F43F5E] text-white w-full p-2 rounded mt-4">
                Reservar ahora
            </button>
            <p className="text-gray-300 text-center mt-2">
                No se te cobrará nada por ahora
            </p>
            <h2 className="text-x mt-4 font-semibold">Disponibilidad</h2>

            {/* Calendario dentro del flujo normal para que empuje los horarios */}
            <div className={`mt-2 transition-all duration-300 ease-in-out ${open ? "block" : "hidden"}`}>
                <div ref={calendarRef} className="bg-white shadow-lg rounded-2xl p-2">
                    <Calendar updateSelectedDate={updateSelectedDate} />
                </div>
            </div>

            {/* Horarios disponibles */}
            <div className="bg-white rounded-lg mt-4">
                <h2 className="text-x font-semibold mb-2">Horarios disponibles</h2>
                <div className="grid grid-cols-3 gap-2">
                {hours != '' && hours != null ? (
                    <>
                       {hours.map((hora, index) => (
                            <button
                            key={index}
                            className={`p-2 rounded-lg text-center transition-all ${
                                hora.available
                                ? selectedHour.includes(hora.hour)
                                    ? "bg-[#F43F5E] text-white" // Estilo cuando la hora está seleccionada
                                    : "bg-gray-100 hover:bg-gray-200 cursor-pointer" // Disponible
                                : "bg-gray-300 text-gray-500 cursor-not-allowed" // No disponible
                            }`}
                            disabled={!hora.available}
                            onClick={() => hora.available && toggleHourSelection(hora.hour)} // Llama a la función para agregar o eliminar
                            >
                            {hora.hour}
                            </button>
                        ))}
                    </>
                ):
                    <p className="items-center">No existen horarios disponibles</p>
                }
                </div>
            </div>
        </div>
    );
};


export default BookingPanel;
