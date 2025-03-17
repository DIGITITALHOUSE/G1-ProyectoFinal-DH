const API_URL = import.meta.env.VITE_DATABASE_URL + "/space-type";

export const getAllSpaceTypes = async () => {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!response.ok) return [];
    return response.json();
};


export const createSpaceType = async (spaceTypeData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(spaceTypeData),
    });
    const res = await response.json();
    if (!response.ok) {
        throw new Error(res.message || "Error");
    }
    return res;
};
