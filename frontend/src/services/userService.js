const API_URL = import.meta.env.VITE_DATABASE_URL + "/users";

export const getAllUsers = async () => {
    const response = await fetch(API_URL);
    return response.ok ? response.json() : [];
};

export const getUserById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.ok ? response.json() : null;
};

export const createUser = async (userData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        body: userData,
    });
    return response.ok ? response.json() : null;
};

export const updateUser = async (id, userData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.ok ? response.json() : null;
};

export const deleteUser = async (id) => {
    return fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
