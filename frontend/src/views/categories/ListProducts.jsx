import { useState, useEffect, useRef   } from "react";
import { Link, useNavigate  } from "react-router-dom";
import "./ListProducts.css";

export const ListProducts = () => {
    const navigate = useNavigate();
    const hasRedirected = useRef(false);
    const [products, setProducts] = useState([
        { id: "12345678", name: "Estilo Palermo" },
        { id: "12345679", name: "Estilo Madrid" },
        { id: "12345680", name: "Estilo Barcelona" },
        { id: "12345681", name: "Estilo Londres" },
        { id: "12345682", name: "Estilo Paris" },
        { id: "12345683", name: "Estilo Roma" }
    ]);

    const eliminarFila = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    useEffect(() => {
        if (hasRedirected.current) return;
        // Detecta tipo dispositivo
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
          alert("Acceso restringido a dispositivos móviles.");
          hasRedirected.current = true; 
          navigate("/"); // Redirige a inicio
        }
      }, []);

    return (
        <>
            <div>
                <div className="flex justify-between items-center bg-[#3C79CF] flex-col md:flex-row">
                    <h2 className="ml-4 text-xl font-bold text-white">Panel de administración</h2>
                    <div className="flex gap-3 mr-2flex flex-col md:flex-row gap-1">
                        <Link to="/products">
                            <button className="bg-[#AB0D6A] text-white px-6 py-3 rounded-full cursor-pointer font-bold text-lg transition duration-300 hover:bg-pink-700">
                                <i className="fas fa-plus"></i> Agregar
                            </button>
                        </Link>
                        <Link to="/">
                            <button className="bg-[#AB0D6A] text-white px-6 py-3 rounded-full cursor-pointer font-bold text-lg transition duration-300 hover:bg-pink-700">
                                <i className="fas fa-arrow-left"></i> Regresar
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col mt-10 px-4">
                    <div className="text-2xl font-bold mb-4">Listado de productos</div>

                    <div className="mt-8 mb-8 overflow-x-auto">
                        <table className="w-full min-w-[600px] border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-[#3C79CF] text-white uppercase">
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Nombre</th>
                                    <th className="p-3">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="even:bg-gray-200 hover:bg-gray-300 transition duration-300">
                                        <td className="p-3 text-center">{product.id}</td>
                                        <td className="p-3">{product.name}</td>
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => eliminarFila(product.id)}
                                                className="bg-[#AB0D6A] text-white border-none px-6 py-1 rounded-full cursor-pointer font-bold text-lg transition duration-300 hover:bg-pink-700"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
