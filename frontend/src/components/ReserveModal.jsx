import { useState } from "react";
import Calendar from "../components/Calendar";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import CenteredMessage from "./MessageDialog";
import Avatar from './Avatar';
import { createReservation } from "../services/reservationService";

const ReserveModal = ({ isOpen, onClose, reserve, updateDate, hours, updateHour }) => {
    const [message, setMessage] = useState({ isOpen: false, type: "info", message: "", onConfirm: null });
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showHourSelector, setShowHourSelector] = useState(false);
    const navigate = useNavigate();

    if (!isOpen || !reserve) return null;
    const showMessage = (type, message, onConfirm = null) => {
        setMessage({ isOpen: true, type, message, onConfirm });
    };
    const closeMessage = () => {
        setMessage((prev) => ({ ...prev, isOpen: false })); // 🔹 Cierra el mensaje correctamente
    };

    const toggleHourSelection = (hour) => {
        let updatedHours = reserve.hora.includes(hour)
            ? reserve.hora.filter(h => h !== hour)  // Quitar hora
            : [...reserve.hora, hour];  // Agregar hora

        updateHour(updatedHours);
    };

    let total = reserve.precio * reserve.cantidad;
    let user = localStorage.getItem("user");
    let userObject = JSON.parse(user);
    let correo = localStorage.getItem('correo')

    const handleReservation = async () => {
        setLoading(true); // Activa el estado de carga
        let user = localStorage.getItem("id")
        const horasOrdenadas = reserve.hora.sort((a, b) => a.localeCompare(b));
        const max = horasOrdenadas[0]+':00'
        const min = horasOrdenadas[horasOrdenadas.length - 1]+':00'
        try {
            let reservation = {
                reservationDate: reserve.fecha,
                startHour: max,
                endHour: min,
                userId: Number(user),
                spaceId: reserve.id
            }
            const jsonData = JSON.stringify(reservation);
            const result = await createReservation(jsonData);
            if (result) {
                showMessage("success","Reserva registrada correctamente")
                setTimeout(() =>  navigate("/"), 1500);
            }else{
                showMessage('error', 'No se pudo registrar la reserva')
            }

        } catch (error) {
            showMessage('error', 'No se pudo registrar la reserva '+error.message)
            console.error("Error al iniciar sesión", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[85vh] overflow-hidden">
                {/* Botón de cerrar */}
                <div className="sticky -top-2 -right-4 flex justify-end z-10">
                    <button
                        onClick={onClose}
                        className=" text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-300 transition"
                    >
                        <AiOutlineClose className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 text-gray-700 text-sm space-y-4 max-h-[70vh] overflow-y-auto">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Confirmar tu reserva
                    </h2>
                    <hr />
                    {/* Información de la reserva */}
                    <div className="mb-4 flex ml-8">
                        <img
                            src={reserve.imagen}
                            alt={reserve.nombre}
                            className="w-90 h-40 object-cover rounded-md mb-2 mt-3"
                        />
                        <div className="flex-col ml-6 mt-2">
                            <h3 className="text-lg font-semibold">{reserve.nombre}</h3>
                            <p className="text-gray-600">Capacidad: 20{/*reserve.lugar*/} personas</p>
                            <p className="text-gray-600">Tipo: Oficina Privada{/*reserve.lugar*/}</p>
                        </div>
                    </div>
                    <hr />
                    {/* Detalles de la reserva */}
                    <div className="mb-4 pt-4 ml-8">
                        <h3 className="text-xl text-gray-800 mb-4">
                            Detalle de la reserva
                        </h3>
                        <div className="flex justify-between mb-3">
                            <div className="flex">
                                <p className="mr-6"><FaCalendarAlt /></p>
                                <p className="text-gray-700 -mt-1">
                                    {reserve.fecha.length !== 'NaN-NaN-NaN' ? reserve.fecha : "Ninguna fecha seleccionada"}
                                </p>
                            </div>
                            <button onClick={() => setShowDatePicker(true)} className="text-blue-500">
                                Editar
                            </button>
                        </div>
                        {showDatePicker && (
                            <Calendar
                                updateSelectedDate={(newDate) => {
                                    updateDate(newDate);  // ← Actualiza la fecha en el estado global
                                    setShowDatePicker(false);
                                }}
                            />
                        )}
                        <div className="flex justify-between">
                            <div className="flex">
                                <p className="mr-6"><FaClock /></p>
                                <p className="text-gray-700 -mt-1">
                                    {reserve.hora.length > 0 ? reserve.hora.join(' - ') : "Ninguna hora seleccionada"}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowHourSelector(!showHourSelector)}
                                className="text-blue-500"
                            >
                                {showHourSelector ? "Cerrar" : "Editar"}
                            </button>
                        </div>
                        {showHourSelector && (
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {hours.map((hora, index) => (
                                    <button
                                        key={index}
                                        className={`p-2 rounded-lg text-center transition-all ${hora.available
                                            ? reserve.hora.includes(hora.hour)
                                                ? "bg-[#F43F5E] text-white" // Seleccionado
                                                : "bg-gray-100 hover:bg-gray-200 cursor-pointer" // Disponible
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed" // No disponible
                                            }`}
                                        disabled={!hora.available}
                                        onClick={() => hora.available && toggleHourSelection(hora.hour)}
                                    >
                                        {hora.hour}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className="mb-4 pt-4 ml-8">
                        <h3 className="text-xl text-gray-800 mb-4">
                            Detalle del precio
                        </h3>
                        <div className="flex justify-between">
                            <p className="text-gray-700">
                                ${reserve.precio} x {reserve.cantidad} hora(s)
                            </p>
                            <div>
                                ${total}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-lg font-semibold text-gray-800 mt-3">
                                Total
                            </p>
                            <div className="mt-3">
                                ${total}
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* Datos personales */}
                    <div className="mb-4 pt-4 ml-8">
                        <h3 className="text-xl text-gray-800 mb-4">
                            Datos del usuario
                        </h3>
                        <div className="flex">
                            <div className="mr-4">
                                <Avatar username={userObject.name} />
                            </div>
                            <div className="flex-col">
                                <p className="text-gray-700">
                                    <strong>{userObject.name}</strong>
                                </p>
                                <p className="text-gray-700">
                                    {correo}
                                </p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* Botones */}
                    <div className="flex justify-between mt-4">
                        <button
                            className="bg-[#F43F5E] w-full h-12 text-xl text-white px-4 py-2 rounded-md transition"
                            onClick={() => handleReservation()}
                        >
                            Confirmar reserva
                        </button>
                    </div>
                </div>
            </div>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-lg flex flex-col items-center">
                        <svg className="animate-spin h-8 w-8 text-[#F43F5E]" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" fill="none" />
                        </svg>
                        <p className="mt-2 text-gray-700">Registrando...</p>
                    </div>
                </div>
            )}
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

export default ReserveModal;