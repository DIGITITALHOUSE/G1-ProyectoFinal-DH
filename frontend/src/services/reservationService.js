const API_URL = import.meta.env.VITE_DATABASE_URL + "/reservations";

export const getReservations = async (userId) => {
    const response = await fetch(`${API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching reservations");
    }

    return response.json();
};

export const cancelReservation = async (reservationId) => {
    await fetch(`${API_URL}/${reservationId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};
