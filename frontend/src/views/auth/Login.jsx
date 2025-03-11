
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CenteredMessage from "../../components/MessageDialog";
import { login } from "../../services/authService";

export const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState({ isOpen: false, type: "info", message: "", onConfirm: null });

    const showMessage = (type, message, onConfirm = null) => {
        setMessage({ isOpen: true, type, message, onConfirm });
    };

    const closeMessage = () => {
        setMessage((prev) => ({ ...prev, isOpen: false })); // 🔹 Cierra el mensaje correctamente
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Activa el estado de carga

        try {
            await login(email, password);

            navigate("/");
        } catch (error) {
            showMessage('error', 'No se puedo iniciar sesión')
            console.error("Error al iniciar sesión", error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full -mb-3.5">
                <div className="max-w-md bg-white p-8 rounded-lg shadow-md mt-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        Bienvendido de nuevo
                    </h2>
                    <p className="text-1xl text-center text-gray-500">Inicia sesión para agilizar tus reservas</p>
                    <form className="mt-10" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700">Correo electrónico</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#111827]"
                                placeholder="ejemplo@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#111827]"
                                placeholder="•••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full mt-6 px-4 py-2 text-white rounded-full transition bg-[#F43F5E] hover:bg-[#E11D48]`}
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    <p className="mt-8 text-center text-gray-600">
                        ¿No tienes una cuenta?
                        <Link to="/auth/register">
                            <button
                                className="text-[#F43F5E]"
                                onClick={() => setIsRegister(!isRegister)}
                            >
                                Regístrate
                            </button>
                        </Link>
                    </p>
                </div>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white p-6 rounded-lg flex flex-col items-center">
                            <svg className="animate-spin h-8 w-8 text-[#F43F5E]" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" fill="none" />
                            </svg>
                            <p className="mt-2 text-gray-700">Iniciando Sesión...</p>
                        </div>
                    </div>
                )}
                <CenteredMessage
                    isOpen={message.isOpen}
                    type={message.type}
                    message={message.message}
                    onClose={closeMessage}
                    onConfirm={() => {
                        if (message.onConfirm) message.onConfirm();
                        closeMessage();
                    }}
                />
            </div>
        </>
    );
};