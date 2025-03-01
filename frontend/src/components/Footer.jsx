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
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 border-b border-gray-800 py-12 sm:grid-cols-2 md:grid-cols-4">
                <div className="order-1">
                    <img src="/src/assets/logoLetras.png" alt="Logo" className="pt-2" />
                    <p className="mt-6 leading-4 text-gray-400">
                        Encuentra el espacio perfecto para trabajar y crecer tu negocio.
                    </p>
                </div>

                <div className="order-4 md:order-2">
                    <p className="text-xl text-white">Enlaces</p>
                    <ul className="mt-3 flex flex-col gap-2">
                        {linksLeft.map((link) => (
                            <li key={link.name}>
                                <Link to={link.link} className="text-gray-400 duration-500 hover:text-gray-300">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="order-3">
                    <p className="text-xl text-white">Soporte</p>
                    <ul className="mt-3 flex flex-col gap-2">
                        {linksRight.map((link) => (
                            <li key={link.name}>
                                <Link to={link.link} className="text-gray-400 duration-500 hover:text-gray-300">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="order-2 md:order-4">
                    <p className="text-xl text-white">Síguenos</p>
                    <div className="mt-3 flex gap-4 text-gray-400">
                        <Link
                            href="https://www.facebook.com/"
                            target="_blank"
                            className="duration-500 hover:text-gray-300"
                        >
                            <FaFacebook size={20} />
                        </Link>
                        <Link href="https://www.x.com/" target="_blank" className="duration-500 hover:text-gray-300">
                            <FaTwitter size={20} />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            target="_blank"
                            className="duration-500 hover:text-gray-300"
                        >
                            <FaInstagram size={20} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="pb-20 pt-4">
                <p className="py-4 text-center text-gray-400">&copy; 2025 CoWork. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};
