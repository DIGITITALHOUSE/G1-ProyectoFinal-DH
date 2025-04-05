import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaBars, FaAlignJustify } from "react-icons/fa";
import Button from "./buttons/Button";
import Avatar from './Avatar';
import ThemeToggle from "./themetoggle";

export const Header = ({showUserInformation} ) => {
    let links = [
        { name: "Espacios", link: "/" },
        { name: "Precios", link: "/" },
        { name: "Contacto", link: "/" },
    ];
    let [open, setOpen] = useState(false);
    let [isOpen, setIsOpen] = useState(false);
    let [islogin, setIsLogin] = useState(true);
    let [user, setUser] = useState("");
    let [rol, setRol] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLogin(false)
            const user = localStorage.getItem("user");
            const rol = localStorage.getItem("rol");
            setRol(rol)
            setUser(user ? JSON.parse(user) : "");
        }
    }, []);

    const logout = () => {
        // Eliminar el token del localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("rol");
        localStorage.removeItem("id");
        localStorage.removeItem("correo");
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
        <header className="px-8 flex items-center justify-between shadow-lg top-0 w-full bg-white dark:bg-gray-900 sticky z-30 h-20">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center text-center space-y-2 gap-5">
              <img className="max-w-[150px] max-h-[60px]" src="/logo.png" alt="logo" />
            </Link>
          </div>
      
          {/* Links centrales (visible solo en desktop) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center gap-4">
            {links.map((link) => (
              <a
                href={link.link}
                className="text-grayTertiary dark:text-white"
                key={link.name}
              >
                {link.name}
              </a>
            ))}
          </div>
      
          <div className="flex items-center gap-4">
            {/* Botón dark mode */}
            <ThemeToggle />
      
            {/* Menú mobile */}
            {showUserInformation && (
              <div
                onClick={() => setOpen(!open)}
                className="text-3xl lg:hidden text-primary dark:text-white cursor-pointer"
              >
                <FaBars />
              </div>
            )}
      
            {/* Login / Usuario */}
            {showUserInformation && (
              <>
                {islogin ? (
                  <ul
                    className={`hidden lg:flex items-center gap-4 transition-all duration-500 ease-in`}
                  >
                    <Link to="/auth/register">
                      <Button text="Crear Cuenta" filled={false} />
                    </Link>
                    <Link to="/auth/login">
                      <Button text="Iniciar Sesión" filled={true} />
                    </Link>
                  </ul>
                ) : (
                  <div className="relative flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-black dark:text-white">
                        Bienvenido {user.name}
                      </span>
                      <Avatar username={user.name} />
                    </div>
                    <button
                      className="px-3 py-2 rounded-lg focus:outline-none"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <FaAlignJustify className="text-black dark:text-white" />
                    </button>
      
                    {isOpen && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200">
                        <button
                          onClick={() => handleNavigation("/perfil")}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Mi Perfil
                        </button>
                        <button
                          onClick={() => handleNavigation("/reservations")}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Reservas
                        </button>
                        <button
                          onClick={() => handleNavigation("/mensajes")}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Mensajes
                        </button>
                        <button
                          onClick={() => handleNavigation("/favorites")}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Favoritos
                        </button>
                        {rol != "USER" && (
                          <button
                            onClick={() => handleNavigation("/list-products")}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            Administración
                          </button>
                        )}
                        <button
                          onClick={() => handleNavigation("/ayuda")}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
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
                )}
              </>
            )}
          </div>
        </header>
      );      
};

export default Header;
