const API_URL = import.meta.env.VITE_DATABASE_URL + "/space-type";

export const getAllSpaceTypes = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) return [];
    return response.json();
};