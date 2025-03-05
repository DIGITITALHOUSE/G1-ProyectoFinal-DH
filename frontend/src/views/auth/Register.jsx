import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { AiFillCheckCircle, AiFillClockCircle, AiFillSafetyCertificate } from "react-icons/ai";

export const Register = () => {
    const navigate = useNavigate();
    let links = [
        { name: "Espacios", link: "/" },
        { name: "Precios", link: "/" },
        { name: "Contacto", link: "/" },
    ];
    let [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        avatar: null,
        termsAccepted: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "file") {
            setFormData({ ...formData, avatar: files[0] });
        } else if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.termsAccepted) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }
        console.log("Datos enviados:", formData);
        navigate("/login");
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
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-8">
                    <h2 className="text-2xl font-bold text-center">Bienvenido a Cowork  </h2>
                    <p className="text-center text-gray-500 mb-4">Únete a nuestra comunidad de trabajo colaborativo</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-2">
                            <div className="w-1/2">
                                <label className="text-sm font-medium">Nombre</label>
                                <input type="text" name="firstName" placeholder="Tu nombre" className="w-full p-2 border rounded" onChange={handleChange} required />
                            </div>
                            <div className="w-1/2">
                                <label className="text-sm font-medium">Apellido</label>
                                <input type="text" name="lastName" placeholder="Tu apellido" className="w-full p-2 border rounded" onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Avatar */}
                        <div className="flex items-center gap-4">
                            {formData.avatar ? (
                                <img src={URL.createObjectURL(formData.avatar)} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
                            ) : (
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-gray-500 text-sm">Avatar</span>
                                </div>
                            )}
                            <label className="bg-gray-300 px-3 py-1 rounded cursor-pointer text-sm">
                                Cambiar avatar
                                <input type="file" name="avatar" className="hidden" onChange={handleChange} />
                            </label>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Correo electrónico</label>
                            <input type="email" name="email" placeholder="ejemplo@correo.com" className="w-full p-2 border rounded" onChange={handleChange} required />
                            <p className="text-xs text-gray-500">Ingresa un correo electrónico válido</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Celular</label>
                            <input type="tel" name="phone" placeholder="Número celular" className="w-full p-2 border rounded" onChange={handleChange} required />
                            <p className="text-xs text-gray-500">Ingresa un número válido</p>
                        </div>

                        <div>
                            <label className="text-sm font-medium">Contraseña</label>
                            <input type="password" name="password" placeholder="Mínimo 8 caracteres" className="w-full p-2 border rounded" onChange={handleChange} required minLength="8" />
                            <p className="text-xs text-gray-500">La contraseña debe tener al menos 8 caracteres</p>
                        </div>

                        {/* Checkbox de términos */}
                        <div className="flex items-center">
                            <input type="checkbox" name="termsAccepted" className="mr-2" onChange={handleChange} />
                            <label className="text-sm">Acepto los términos y condiciones y la política de privacidad</label>
                        </div>

                        {/* Botón de registro */}
                        <button
                            type="submit"
                            className={`w-full mt-6 px-4 py-2 text-white rounded-full transition bg-[#F43F5E] hover:bg-[#E11D48]`}
                        >
                            Crear cuenta
                        </button>

                        <p className="text-center text-sm mt-2">
                            ¿Ya tienes una cuenta? <a href="/auth/login" className="text-[#F43F5E]">Inicia sesión</a>
                        </p>
                    </form>
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
            </div>
            <Footer />
        </>
    );
};


