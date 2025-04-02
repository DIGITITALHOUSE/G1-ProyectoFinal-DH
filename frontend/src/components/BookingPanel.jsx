import Calendar from "../components/Calendar";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSpacesAvailability } from "../services/spaceService";
import { useParams } from "react-router-dom";
import ReserveModal from "./ReserveModal";
import CenteredMessage from "./MessageDialog";

const hardcodedImages = [
    "https://cdn.pixabay.com/photo/2020/08/13/16/43/coworking-space-in-gurgaon-5485822_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/04/12/16/07/coworking-6173112_960_720.jpg",
    "https://plus.unsplash.com/premium_photo-1684769161054-2fa9a998dcb6?q=80&w=2104&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661962361446-f450f3f21495?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const BookingPanel = ({ price, name, img, id }) => {
    const { spaceId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedHour, setSelectedHour] = useState([]);
    const [hours, setHours] = useState([]);
    const navigate = useNavigate();
    const [message, setMessage] = useState({ isOpen: false, type: "info", message: "", onConfirm: null });
    const calendarRef = useRef();
    const updateSelectedDate = (date) => {
        setSelectedDate(date);
    };

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * hardcodedImages.length);
        return hardcodedImages[randomIndex];
    }

    const showMessage = (type, message, onConfirm = null) => {
        setMessage({ isOpen: true, type, message, onConfirm });
    };
    const closeMessage = () => {
        setMessage((prev) => ({ ...prev, isOpen: false })); // 🔹 Cierra el mensaje correctamente
    };

    // Función para convertir la fecha a formato YYYY-MM-DD
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Mes en formato 2 dígitos
        const day = String(d.getDate()).padStart(2, '0'); // Día en formato 2 dígitos
        return `${year}-${month}-${day}`;
    };

    let date = formatDate(selectedDate)
    let imagenes = getRandomImage()

    let reservaEjemplo = {
        nombre: name,
        id: id,
        imagen: imagenes,
        fecha: date,
        hora: selectedHour,
        precio: price,
        cantidad: selectedHour.length,
    };

    useEffect(() => {
        let date = formatDate(selectedDate)
        getSpacesAvailability(spaceId, date)
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

    const validatorReserve = () => {
        let token = localStorage.getItem('token');
        if (token) {
            if (selectedDate == '' || selectedHour.length === 0) {
                showMessage('warning','Seleccione una fecha y hora para realizar la reserva')
            }else{
                setShowModal(true)
            }
        } else {
            showMessage('warning', 'Para realizar una reserva inicie sesión')
            setTimeout(() => navigate("/auth/login"), 1500);
        }
    };

    return (
        <div className="w-full bg-white p-4 shadow-lg rounded-lg">
            <h2 className="text-3xl font-semibold">${price} <span className="text-2xl text-gray-400">/hora</span></h2>
            <button className="bg-[#F43F5E] text-white w-full p-2 rounded mt-4" onClick={() => validatorReserve()}>
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
                                    className={`p-2 rounded-lg text-center transition-all ${hora.available
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
                    ) :
                        <p className="items-center">No existen horarios disponibles</p>
                    }
                </div>
            </div>
            {/* Modal */}
            <ReserveModal isOpen={showModal} onClose={() => setShowModal(false)} reserve={reservaEjemplo} 
            updateDate={setSelectedDate} hours={hours} updateHour={setSelectedHour} />
            <CenteredMessage
                isOpen={message.isOpen}
                type={message.type}
                message={message.message}
                onClose={closeMessage}
                onConfirm={() => {
                    if (message.onConfirm) message.onConfirm();
                    closeMessage();
                }}
            />
        </div>
    );
};


export default BookingPanel;
