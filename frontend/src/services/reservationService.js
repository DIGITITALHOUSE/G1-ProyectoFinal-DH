const API_URL = import.meta.env.VITE_DATABASE_URL + "/reservations";

export const getAllReservation = async () => {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.ok ? response.json() : [];
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

export const deleteReservation = async (id) => {
    return fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
