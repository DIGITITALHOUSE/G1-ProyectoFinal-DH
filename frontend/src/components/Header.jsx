import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Header = () => {
    let Links = [{ name: "Administrar", link: "/products" }];
    let [open, setOpen] = useState(false);

    return (
        <header className="px-[5%] lg:px-[2%] flex items-center justify-between shadow-lg top-0 w-full bg-white sticky z-30">
            <div className="flex items-center gap-3">
            <a href="/" className="flex items-center text-center space-y-2 gap-5">
                <img
                    className="max-w-[150px] max-h-[60px]"
                    src="/src/assets/logo.jpeg"
                    alt="logo"
                />
                <span className="hidden md:block text-lg font-bold text-tertiary-700 leading-tight">
                    Donde las ideas se conectan <br />
                    y los espacios se unen
                </span>
            </a>
            </div>

            <div
                onClick={() => setOpen(!open)}
                className="text-3xl absolute right-8 cursor-pointer lg:hidden text-primary"
            >
                <FaBars />
            </div>

            <ul
                className={`lg:flex lg:items-center lg:pb-0 pb-6 absolute lg:static bg-white lg:z-auto lg:gap-4 z-50 left-0 w-full lg:w-auto transition-all duration-500 ease-in ${
                    open ? "top-[113px]" : "top-[-490px]"
                }`}
            >
                {Links.map((link) => (
                    <li key={link.name} className="lg:ml-2 text-lg font-bold my-6 lg:my-0">
                        <a
                            href={link.link}
                            className="text-neutral-800 text-tertiary transition-all hover:opacity-75 duration-500"
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
                <button
                    className="rounded-full border bg-primary py-3 px-6 text-xs font-bold uppercase text-white transition-all hover:opacity-75 focus:ring focus:ring-tertiary"
                >
                    Crear Cuenta
                </button>
                <button
                    className="rounded-full bg-primary py-3 px-6 text-xs font-bold uppercase text-white shadow-sm transition-all hover:shadow-secondary"
                >
                    Iniciar Sesión
                </button>
            </ul>
        </header>
    );
};

export default Header;
