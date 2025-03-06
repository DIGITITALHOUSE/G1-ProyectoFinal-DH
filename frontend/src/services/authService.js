const API_URL_LOGIN = import.meta.env.VITE_DATABASE_URL + "/auth/login";
// const API_URL_REGISTER = import.meta.env.VITE_DATABASE_URL + "/auth/register";

export const login = async (email, password) => {
    const response = await fetch(API_URL_LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error("Error en la solicitud de inicio de sesión");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({ name: data.name, avatar: data.avatar }));
    return data;
};
