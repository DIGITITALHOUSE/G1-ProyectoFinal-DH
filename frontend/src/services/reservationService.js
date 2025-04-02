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

export const getReservationById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.ok ? response.json() : null;
};

export const createReservation = async (userData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
        body: userData,
    });
    return response.ok ? response.json() : null;
};

export const updateReservation = async (id, userData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
        body: JSON.stringify(userData),
    });
    return response.ok ? response.json() : null;
};

export const cancelReservation = async (reservationId) => {
    await fetch(`${API_URL}/${reservationId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const deleteReservation = async (id) => {
    return fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
