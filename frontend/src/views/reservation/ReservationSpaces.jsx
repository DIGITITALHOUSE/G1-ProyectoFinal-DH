import { useEffect, useState } from "react";
import { getUserReservations } from "../../services/reservationService";
import Section from "../Section";
import { Link } from "react-router-dom";

export const ReservationSpaces = () => {
    const [reservations, setReservations] = useState([]);
    const userId = localStorage.getItem("id");

    useEffect(() => {
        if (userId) {
            getUserReservations(userId)
                .then(setReservations)
                .catch(() => setReservations([]));
        } else {
            setReservations([]);
        }
    }, [userId]);

    return (
        <Section>
            <div className="container mx-auto max-w-7xl p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Historial de Reservas</h2>
                {reservations.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {reservations.map((res) => (
                            <Link
                                to={`/space/${res.spaceId}`}
                                key={res.id}
                                className="relative rounded-lg bg-white p-4 shadow-md"
                            >
                                <img
                                    src="https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?w=2048"
                                    alt={res.spaceName}
                                    className="h-48 w-full rounded-md object-cover"
                                />
                                <h2 className="mt-2 text-lg font-semibold">{res.spaceName}</h2>
                                <p className="text-gray-500">Fecha: {res.reservationDate}</p>
                                <p className="text-sm text-gray-500">
                                    {res.startHour} - {res.endHour}
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

