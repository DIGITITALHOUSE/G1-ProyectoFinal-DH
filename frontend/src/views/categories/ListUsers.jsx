import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaCheck,FaSearch, FaEdit } from "react-icons/fa";
import CenteredMessage from "../../components/MessageDialog";
import { getAllUsers,updateUser } from "../../services/userService";

export const ListUsers = () => {
    const rolesEnum = ["ADMIN", "USER"];
    const [loading, setLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState({ isOpen: false, type: "info", message: "", onConfirm: null });
    //const API_URL = "http://localhost:8081/users";
    // Estado para controlar si el select de cada usuario está habilitado
    const [editMode, setEditMode] = useState({}); 
    const [selectedRoles, setSelectedRoles] = useState({});
    
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

    // Habilitar edición para un usuario específico
    const enableEdit = (userId) => {
        setEditMode((prev) => ({ ...prev, [userId]: true }));
    };

    // Manejar cambio de rol en el select
    const handleRoleChange = (userId, newRole) => {
        setSelectedRoles((prev) => ({ ...prev, [userId]: newRole }));
    };

    // Función para obtener usuarios desde la API
    const fetchProducts = async () => {
        try {
            setLoading(true);
            let response = await getAllUsers();
            if (response) {
                setProducts(response);
                setFilteredProducts(response);
            }
        } catch (error) {
            console.error("Error obteniendo los usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar producto desde la API con fetch
    /*const deleteProducts = async (id) => {
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
    };*/

    // Enviar actualización al backend
    const saveRoleChange = (userId) => {
        const user = products.find((u) => u.id === userId); // Obtener usuario completo por ID
        if (!user) return showMessage('error', 'Usuario no valido'); // Evitar errores si no se encuentra
        const updatedUser = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            cellPhone: user.cellPhone,
            rol: selectedRoles[userId] || user.rol, // Si no cambió, usa el mismo rol
        };

        try {
            setLoading(true);
            let response = updateUser(userId,updatedUser)
            if (response) {
                showMessage('success', 'Usuario actualizado correctamente');
                setProducts((prevProducts) =>
                    prevProducts.map((p) =>
                        p.id === userId ? { ...p, rol: updatedUser.rol } : p
                    )
                );
        
                // Deshabilitar edición después de actualizar
                setEditMode((prev) => ({ ...prev, [userId]: false }));
            }
        } catch (error) {
            console.log('Se produjo un error'+error)
        } finally{
            setLoading(false);
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
            name: "Rol",
            cell: (row) => (
                <select
                    value={selectedRoles[row.id] || row.rol} // Usa el rol actual o el seleccionado
                    onChange={(e) => handleRoleChange(row.id, e.target.value)}
                    disabled={!editMode[row.id]} // Deshabilitado hasta presionar "Editar"
                    style={{ padding: "5px", borderRadius: "5px", backgroundColor: editMode[row.id] ? "#fff" : "#ddd" }}
                >
                    {rolesEnum.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            ),
            sortable: true,
            style: { fontWeight: "bold", fontSize: "16px" },
        },
        {
            name: "Acción",
            cell: (row) => (
                <div className="flex">
                    <button className="px-4 text-lg flex items-center gap-1" onClick={() => enableEdit(row.id)}>
                        <FaEdit />
                    </button>
                    {editMode[row.id] && (
                    <button className="px-4 text-lg flex items-center gap-1" onClick={() => showMessage("confirm", "Se actualizara el rol del usuario ¿Continuar?", () => saveRoleChange(row.id))}>
                        <FaCheck />
                    </button>
                    )}
                    {/*<button onClick={() => showMessage("confirm", "¿Está seguro de eliminar este usuario?", () => deleteProducts(row.id))}
                        className="px-4 text-lg flex items-center gap-1">
                        <FaTrash />
                    </button>*/}
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
                            {/*<Link to="">
                                <button className="bg-[#F43F5E] text-white px-4 py-1 rounded-full cursor-pointer text-lg transition w-auto">
                                    <i className="fas fa-plus"></i> Agregar
                                </button>
                            </Link>*/}
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
