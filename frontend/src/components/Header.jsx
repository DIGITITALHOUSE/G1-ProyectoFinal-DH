import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Button from "./buttons/Button";

export const Header = () => {
    let links = [
        { name: "Espacios", link: "/" },
        { name: "Precios", link: "/" },
        { name: "Contacto", link: "/" },
    ];
    let [open, setOpen] = useState(false);

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

            <ul
                className={`hidden lg:flex lg:items-center lg:pb-0 pb-6 absolute lg:static bg-white lg:z-auto lg:gap-4 z-50 left-0 w-full lg:w-auto transition-all duration-500 ease-in ${
                    open ? "top-[113px]" : "top-[-490px]"
                }`}
            >
                <a href="/list-products" className="hidden lg:block">
                    Administrar
                </a>
                <Button text="Crear Cuenta" filled={false} />
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
        </header>
    );
};

export default Header;
