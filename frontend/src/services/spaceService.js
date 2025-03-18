const API_URL = import.meta.env.VITE_DATABASE_URL + "/spaces";

export const getAllSpaces = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) return [];
    return response.json();
};

export const getSpaceById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.ok ? response.json() : null;
};

export const createSpace = async (spaceData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: spaceData,
    });
    return response.ok ? response.json() : null;
};

export const updateSpace = async (id, spaceData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(spaceData),
    });
    return response.ok ? response.json() : null;
};

export const deleteSpace = async (id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const searchSpaces = async ({ keyword, date, spaceType }) => {
    try {
        const params = new URLSearchParams({
            ...(keyword && { keyword }),
            ...(date && { date }),
            ...(spaceType && { spaceType })
        });

        const response = await fetch(`${API_URL}/search?${params.toString()}`);

        if (!response.ok) {
            throw new Error(`Error al obtener espacios: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching spaces:', error);
        throw error; // Permite manejar el error en el componente que llama el servicio
    }
};

