
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiFillCheckCircle, AiFillClockCircle, AiFillSafetyCertificate } from "react-icons/ai";
import CenteredMessage from "../../components/MessageDialog";
import { Footer } from "../../components/Footer";
import { login } from "../../services/authService";

export const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    let links = [
        { name: "Espacios", link: "/" },
        { name: "Precios", link: "/" },
        { name: "Contacto", link: "/" },
    ];
    let [open, setOpen] = useState(false);
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

        // try {
        //     //(reemplázalo por API)
        //     const response = await fetch("http://localhost:8081/users", { //cambiar
        //         method: "POST",
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ email, password }),
        //       });
        //     if (response) {
        //         localStorage.setItem("token", response.token);
        //         localStorage.setItem("user", JSON.stringify({ name: response.name, avatar: response.avatar }));
        //         navigate("/");
        //     }else{
        //         showMessage('error', 'Usuario o contraseña incorrectos')
        //     }
        // } catch (error) {
        //     showMessage('error', 'No se puedo iniciar sesión')
        //     console.error("Error al iniciar sesión", error);
        // } finally {
        //     setLoading(false); // Desactiva el estado de carga
        // }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full -mb-3.5">
                <header className="px-8 flex items-center justify-between shadow-lg top-0 w-full bg-white sticky z-30 h-20">
                    {/* <header className="px-[5%] lg:px-[2%] grid grid-cols-3 items-center justify-between shadow-lg top-0 w-full bg-white sticky z-30 h-20"> */}
                    <div className="flex items-center gap-3">
                        <a href="/" className="flex items-center text-center space-y-2 gap-5">
                            <img className="max-w-[150px] max-h-[60px]" src="/src/assets/logo.png" alt="logo" />
                        </a>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center gap-4">
                        {links.map((link) => (
                            <a href={link.link} className="text-grayTertiary" key={link.name}>
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div
                        onClick={() => setOpen(!open)}
                        className="text-3xl absolute right-8 cursor-pointer lg:hidden text-primary"
                    >
                        <FaBars />
                    </div>
                </header>
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
                <div className="w-screen flex flex-col mt-20 bg-gray-100">
                    <div className="text-center mt-5">
                        <p className="text-3xl">¿Porqué elegir Cowork?</p>
                    </div>
                    <div className="flex justify-between items-center mt-8 text-center mb-8">
                        <div className="flex-1 flex flex-col items-center">
                            <AiFillCheckCircle className="text-4xl text-[#F43F5E]" />
                            <p className="font-semibold">Espacios verificados</p>
                            <p className="text-sm max-w-xs">
                                Todos nuestros espacios son verificados para poder garantizar la mejor calidad
                            </p>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <AiFillClockCircle className="text-4xl text-[#F43F5E]" />
                            <p className="font-semibold">Reserva Flexible</p>
                            <p className="text-sm max-w-xs">
                                Reserva por hora según tus necesidades
                            </p>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <AiFillSafetyCertificate className="text-4xl text-[#F43F5E]" />
                            <p className="font-semibold">100% seguro</p>
                            <p className="text-sm max-w-xs">
                                Pagos seguros y soporte 24/7 para tu tranquilidad
                            </p>
                        </div>
                    </div>
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
            <Footer />
        </>
    );
};