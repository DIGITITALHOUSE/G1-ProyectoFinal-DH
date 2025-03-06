import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaTrash, FaSearch, FaEdit } from "react-icons/fa";
import CenteredMessage from "../../components/MessageDialog";

export const ListUsers = () => {
    const [loading, setLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState({ isOpen: false, type: "info", message: "", onConfirm: null });
    const API_URL = "http://localhost:8081/users";
    // Cargar datos cuando el componente se monte
    useEffect(() => {
        fetchProducts()
    }, []);

    const showMessage = (type, message, onConfirm = null) => {
        setMessage({ isOpen: true, type, message, onConfirm });
    };

    const closeMessage = () => {
        setMessage((prev) => ({ ...prev, isOpen: false })); // 🔹 Cierra el mensaje correctamente
    };

    // Función para obtener usuarios desde la API
    const fetchProducts = async () => {
        try {
            const response = await fetch(API_URL,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors"
            }); // Petición GET
            if (!response.ok) {
                throw new Error("Error al obtener los usuarios");
            }
            const data = await response.json();
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error("Error obteniendo los usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar producto desde la API con fetch
    const deleteProducts = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                mode: "cors"
            });

            if (!response.ok) {
                throw new Error("No se pudo eliminar el usuario");
            }
            // Filtrar la lista de productos para quitar el eliminado
            const updatedProducts = products.filter((product) => product.id !== id);
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
            showMessage("success", `Usuario eliminado correctamente`)
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            showMessage("error", `${error}`)
        }
    };
    // Para buscar datos
    useEffect(() => {
        const filtered = products.filter((product) =>
            product.name.toString().includes(search) ||
            product.email.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filtered)
    }, [search, products]);

    // Definir columnas para la tabla
    const columns = [
        {
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
            center: true,
            style: {
                backgroundColor: "",
                fontWeight: "bold",
                fontSize: "16px",
            },
        },
        {
            name: "Apellido",
            selector: (row) => row.lastName,
            sortable: true,
            style: {
                backgroundColor: "",
                fontWeight: "bold",
                fontSize: "16px",
            },
        },
        {
            name: "Correo",
            selector: (row) => row.email,
            sortable: true,
            style: {
                backgroundColor: "",
                fontWeight: "bold",
                fontSize: "16px",
            },
        },
        {
            name: "Teléfono",
            selector: (row) => row.cellPhone,
            sortable: true,
            style: {
                backgroundColor: "",
                fontWeight: "bold",
                fontSize: "16px",
            },
        },
        {
            name: "Acción",
            cell: (row) => (
                <div className="flex">
                    <Link to="">
                        <button className="px-4 text-lg flex items-center gap-1">
                            <FaEdit />
                        </button>
                    </Link>
                    <button onClick={() => showMessage("confirm", "¿Está seguro de eliminar este usuario?", () => deleteProducts(row.id))}
                        className="px-4 text-lg flex items-center gap-1">
                        <FaTrash />
                    </button>
                </div>
            ),
            center: true,
            style: {
                backgroundColor: "",
                fontWeight: "bold",
            },
        },
    ];

    return (
        <>
            <div>
                <div className="flex flex-col px-4">
                    <div className="mt-4 mb-4 p-4">
                        <div className="flex">
                            <div className="text-2xl font-bold mr-5">Listado Usuarios</div>
                            <Link to="">
                                <button className="bg-[#F43F5E] text-white px-4 py-1 rounded-full cursor-pointer text-lg transition w-auto">
                                    <i className="fas fa-plus"></i> Agregar
                                </button>
                            </Link>
                        </div>
                        <div className="flex justify-end mb-4">
                            <div className="relative">
                                <FaSearch className="absolute left-2 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar usuario..."
                                    className="p-2 pl-8 border border-gray-300 rounded-md w-80 bg-gray-100 focus:ring-2 focus:ring-blue-400"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <DataTable
                            columns={columns}
                            data={filteredProducts}
                            progressPending={loading}
                            pagination
                            highlightOnHover
                            responsive
                            customStyles={{
                                headRow: {
                                    style: {
                                        backgroundColor: "#111827",
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
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-lg flex flex-col items-center">
                        <svg className="animate-spin h-8 w-8 text-[#F43F5E]" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" fill="none" />
                        </svg>
                        <p className="mt-2 text-gray-700">Cargando...</p>
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
        </>
    );
};
