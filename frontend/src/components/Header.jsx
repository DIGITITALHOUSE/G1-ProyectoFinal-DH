import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import Button from "./buttons/Button";

export const Header = () => {
    let links = [
        { name: "Espacios", link: "/" },
        { name: "Precios", link: "/" },
        { name: "Contacto", link: "/" },
    ];
    let [open, setOpen] = useState(false);
    let [isOpen, setIsOpen] = useState(false);
    let [islogin, setIsLogin] = useState(true);
    let [user, setUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLogin(false)
            const user = localStorage.getItem("user");
            setUser(user ? JSON.parse(user) : "");
        }
    }, []);

    const logout = () => {
        // Eliminar el token del localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLogin(true);
        setIsOpen(false);
        // Redirigir a inicio
        navigate("/");
    };

     // Función para manejar la navegación y cerrar el menú
    const handleNavigation = (path) => {
        navigate(path); // Redirigir a la ruta seleccionada
        setIsOpen(false); // Cerrar el menú
    };

    return (
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
            {islogin ? (
                <>
                    <ul
                        className={`hidden lg:flex lg:items-center lg:pb-0 pb-6 absolute lg:static bg-white lg:z-auto lg:gap-4 z-50 left-0 w-full lg:w-auto transition-all duration-500 ease-in ${open ? "top-[113px]" : "top-[-490px]"
                            }`}
                    >
                        <a href="/list-products" className="hidden lg:block">
                            Administrar
                        </a>
                        <Link to="/auth/register">
                            <Button text="Crear Cuenta" filled={false} />
                        </Link>
                        <Link to="/auth/login">
                            <Button text="Iniciar Sesión" filled={true} />
                        </Link>
                    </ul>

                    <ul
                        className={`lg:hidden absolute bottom-0 shadow-lg border-t border-primary translate-y-full bg-white w-full left-0 flex flex-col gap-4 items-center py-4 transition-all duration-500 ease-in
                ${open ? "bottom-0 " : "bottom-[500px]"}
                `}
                    >
                        {links.map((link) => (
                            <a href={link.link} className="text-grayTertiary text-lg" key={link.name}>
                                {link.name}
                            </a>
                        ))}
                        <Button text="Crear Cuenta" filled={false} />
                        <Link to="/auth/login">
                            <Button text="Iniciar Sesión" filled={true} />
                        </Link>
                    </ul>
                </>
            ) :
                <div className="relative flex items-center gap-3">
                    {/* Imagen de perfil y nombre */}
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Bienvenido {user.name}</span>
                        <img
                            //src={user.image}
                            alt=""
                            className="w-10 h-10 rounded-full border-2 border-gray-300"
                        />
                    </div>
                    {/* Botón de menú {user.name} */}
                    <button
                        className="px-3 py-2 rounded-lg focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        ☰
                    </button>

                    {/* Contenido del dropdown */}
                    {isOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                            <button onClick={() => handleNavigation("/perfil")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Mi Perfil
                            </button>
                            <button onClick={() => handleNavigation("/reservar")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Reservar
                            </button>
                            <button onClick={() => handleNavigation("/mensajes")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Mensajes
                            </button>
                            <button onClick={() => handleNavigation("/favoritos")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Favoritos
                            </button>
                            <button onClick={() => handleNavigation("/list-products")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Administración
                            </button>
                            <button onClick={() => handleNavigation("/ayuda")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Centro de Ayuda
                            </button>
                            <button
                            onClick={() => logout()}
                            className="text-red-500 block px-4 py-2"
                            >
                            Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>
            }
        </header>
    );
};

export default Header;
