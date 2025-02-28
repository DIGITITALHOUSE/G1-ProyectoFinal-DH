import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export const Footer = () => {
    const linksLeft = [
        { name: "Sobre nosotros", link: "/" },
        { name: "Espacios", link: "/" },
        { name: "Blog", link: "/" },
    ];
    const linksRight = [
        { name: "Centro de ayuda", link: "/" },
        { name: "Contacto", link: "/" },
        { name: "Términos y condiciones", link: "/" },
    ];
    return (
        <footer className="bg-[#111827] px-16 sm:px-10 md:px-20 xl:px-0">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-gray-800">
                <div className="order-1">
                    <img src="/src/assets/logoLetras.png" alt="Logo" className="pt-2" />
                    <p className="text-gray-400 mt-6 leading-4">
                        Encuentra el espacio perfecto para trabajar y crecer tu negocio.
                    </p>
                </div>

                <div className="order-4 md:order-2">
                    <p className="text-white text-xl">Enlaces</p>
                    <ul className="mt-3 flex flex-col gap-2">
                        {linksLeft.map((link) => (
                            <li key={link.name}>
                                <Link to={link.link} className="text-gray-400 hover:text-gray-300 duration-500 ">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="order-3">
                    <p className="text-white text-xl">Soporte</p>
                    <ul className="mt-3 flex flex-col gap-2">
                        {linksRight.map((link) => (
                            <li key={link.name}>
                                <Link to={link.link} className="text-gray-400 hover:text-gray-300 duration-500">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="order-2 md:order-4">
                    <p className="text-white text-xl">Síguenos</p>
                    <div className="flex gap-4 mt-3 text-gray-400">
                        <Link
                            href="https://www.facebook.com/"
                            target="_blank"
                            className="hover:text-gray-300 duration-500"
                        >
                            <FaFacebook size={20} />
                        </Link>
                        <Link href="https://www.x.com/" target="_blank" className="hover:text-gray-300 duration-500">
                            <FaTwitter size={20} />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            target="_blank"
                            className="hover:text-gray-300 duration-500"
                        >
                            <FaInstagram size={20} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="pb-20 pt-4  ">
                <p className="text-gray-400 text-center py-4">&copy; 2025 CoWork. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};
