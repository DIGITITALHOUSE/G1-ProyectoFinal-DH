import { useEffect, useState } from "react";
import { getReservations, cancelReservation } from "../../services/reservationService";
import Section from "../Section";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";

export const ReservationSpaces = () => {
    const [reservations, setReservations] = useState([]);
    const userId = localStorage.getItem("id");

    useEffect(() => {
        if (userId) {
            getReservations(userId)
                .then(setReservations)
                .catch(() => setReservations([]));
        } else {
            setReservations([]);
        }
    }, [userId]);

    const handleCancelReservation = async (reservationId) => {
        await cancelReservation(reservationId);
        setReservations((prev) => prev.filter((res) => res.id !== reservationId));
    };

    return (
        <Section>
            <div className="container mx-auto max-w-7xl p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Historial de Reservas</h2>
                {reservations.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {reservations.map((res) => (
                            <Link
                                to={`/space/${res.space.id}`}
                                key={res.id}
                                className="relative rounded-lg bg-white p-4 shadow-md"
                            >
                                <button
                                    className="absolute top-6 right-5 flex items-center justify-center rounded-full p-2 bg-white bg-opacity-50 shadow-md cursor-pointer transition-all"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleCancelReservation(res.id);
                                    }}
                                >
                                    <MdCancel className="text-[#F43F5E]" />
                                </button>

                                <img
                                    src="https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?w=2048"
                                    alt={res.space.name}
                                    className="h-48 w-full rounded-md object-cover"
                                />
                                <h2 className="mt-2 text-lg font-semibold">{res.space.name}</h2>
                                <p className="text-xl font-bold text-gray-700">{res.totalPrice} USD</p>
                                <p className="text-gray-500">Fecha: {res.reservationDate}</p>
                                <p className="text-sm text-gray-600">
                                    {res.space.city}, {res.space.country}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No tienes reservas.</p>
                )}
            </div>
        </Section>
    );
};
