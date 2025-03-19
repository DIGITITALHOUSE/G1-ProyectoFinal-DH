const API_URL = import.meta.env.VITE_DATABASE_URL + "/favorites";

export const getFavorites = async (userId) => {
    const response = await fetch(`${API_URL}/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching favorites");
    }

    return response.json();
};

export const addFavorite = async (userId, spaceId) => {
    await fetch(`${API_URL}/${userId}/${spaceId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};

export const removeFavorite = async (userId, spaceId) => {
    await fetch(`${API_URL}/${userId}/${spaceId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};
