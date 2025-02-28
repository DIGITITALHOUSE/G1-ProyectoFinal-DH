import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaTrash, FaSearch, FaArrowLeft, FaPlus } from "react-icons/fa";
import "./ListProducts.css";

export const ListProducts = () => {
    const navigate = useNavigate();
    const hasRedirected = useRef(false);
    const [loading, setLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([
        { id: "12345678", name: "Estilo Palermo" },
        { id: "12345679", name: "Estilo Madrid" },
        { id: "12345680", name: "Estilo Barcelona" },
        { id: "12345681", name: "Estilo Londres" },
        { id: "12345682", name: "Estilo Paris" },
        { id: "12345683", name: "Estilo Roma" }
    ]);
    const API_URL = "http://api/productos";

    // Función para obtener productos desde la API
    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL); // Petición GET
            if (!response.ok) {
                throw new Error("Error al obtener los productos");
            }
            const data = await response.json();
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error("Error obteniendo los productos:", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar producto desde la API con fetch
    const deleteProducts = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("No se pudo eliminar el producto");
            }

            // Filtrar la lista de productos para quitar el eliminado
            const updatedProducts = products.filter((product) => product.id !== id);
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert("No se pudo eliminar el producto.");
        }
    };

    // Cargar datos cuando el componente se monte
    useEffect(() => {
        const filtered = products.filter((product) =>
            product.id.toString().includes(search) ||
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, products]);

    // Definir columnas para la tabla
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            center: true,
            style: {
                backgroundColor: "#f0f8ff", 
                fontWeight: "bold",
                fontSize: "16px",
            },
        },
        {
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
            style: {
                backgroundColor: "#f0f8ff", 
                fontWeight: "bold",
                fontSize: "16px",
            },
        },
        {
            name: "Acción",
            cell: (row) => (
                <button
                    onClick={() => eliminarFila(row.id)} //deleteProducts
                    className="bg-[#AB0D6A] text-white px-5 py-1 rounded-full font-bold text-lg transition duration-300 hover:bg-pink-700 flex items-center gap-2"
                >
                    Eliminar
                    <FaTrash />
                </button>
            ),
            center: true,
            style: {
                backgroundColor: "#f0f8ff", 
                fontWeight: "bold",
            },
        },
    ];

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

    //Verifica tamaño de pantalla y redirecciona a access-denied-products
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                navigate("/access-denied-products", { replace: true });
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [navigate]);

    return (
        <>
            <div>
                <div className="flex justify-between items-center bg-[#3C79CF] flex-col md:flex-row p-4">
                    <h2 className="ml-4 text-xl font-bold text-white">Panel de administración</h2>
                    <div className="flex gap-3 mr-2 flex flex-col md:flex-row">
                        {/*
                        <Link to="/products">
                            <button className="bg-[#AB0D6A] text-white px-6 py-3 rounded-full cursor-pointer font-bold text-lg transition duration-300 hover:bg-pink-700 w-auto">
                                <i className="fas fa-plus"></i> Agregar
                            </button>
                        </Link>
                        */}
                        <Link to="/">
                            <button className="bg-[#AB0D6A] text-white px-6 py-3 rounded-full cursor-pointer font-bold text-lg transition duration-300 hover:bg-pink-700 w-auto flex items-center gap-2">
                                <FaArrowLeft /> Regresar
                            </button>
                        </Link>
                    </div>
                </div>

                 {/* Nueva cabecera con contenedor central */}
                <div className="flex justify-center items-center mt-10">
                    <div className="border border-gray-400 p-6 rounded-lg bg-white shadow-md text-center">
                        <h3 className="text-lg font-semibold mb-4">Gestiona tus productos desde aquí</h3>
                        <div className="flex gap-4 justify-center">
                            <Link to="/">
                                <button className="bg-[#AB0D6A] text-white px-4 py-2 rounded-full font-bold text-sm transition duration-300 hover:bg-pink-700">
                                    Lista de productos
                                </button>
                            </Link>
                            <Link to="/">
                                <button className="bg-[#AB0D6A] text-white px-4 py-2 rounded-full font-bold text-sm transition duration-300 hover:bg-pink-700">
                                    Agregar producto
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>  

                <div className="flex flex-col mt-10 px-4">
                    <div className="text-2xl font-bold mb-4">Listado de productos</div>

                    <div className="mt-4 mb-4 p-4">
                        <div className="flex justify-end mb-4">
                            <div className="relative">
                                <FaSearch className="absolute left-2 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="p-2 pl-8 border border-gray-300 rounded-full w-80 bg-gray-100 focus:ring-2 focus:ring-blue-400"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <DataTable
                            columns={columns}
                            data={products} //filteredProducts
                            //progressPending={loading}
                            pagination
                            highlightOnHover
                            responsive
                            customStyles={{
                                headRow: {
                                    style: {
                                        backgroundColor: "#3C79CF",
                                        color: "white",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    },
                                },
                                rows: {
                                    style: {
                                        backgroundColor: "#ffffff",
                                        "&:nth-of-type(odd)": {
                                            backgroundColor: "#f8f9fa",
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
