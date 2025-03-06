const API_URL = import.meta.env.VITE_DATABASE_URL + "/space-type";

export const getAllSpaceTypes = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) return [];
    return response.json();
};

// export const getSpaceTypeById = async (id) => {
//     const response = await fetch(`${API_URL}/${id}`);
//     return response.ok ? response.json() : null;
// };

export const createSpaceType = async (spaceTypeData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(spaceTypeData),
    });
    const res = await response.json();
    if (!response.ok) {
        throw new Error(res.message || "Error");
    }
    return res;
};
