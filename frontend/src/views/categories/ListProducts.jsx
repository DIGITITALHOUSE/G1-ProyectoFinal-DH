import { useState } from "react";
import { Link } from "react-router-dom";
import "./ListProducts.css";

export const ListProducts = () => {
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

    return (
        <>
            <div className="space">
                <h2>Panel de administración</h2>
                <div>
                    <Link to="/products">
                        <button><i className="fas fa-arrow-left"></i> Agregar</button>
                    </Link>
                    <Link to="/">
                        <button><i className="fas fa-arrow-left"></i> Regresar</button>
                    </Link>
                </div>
            </div>
            <div className="div-container">
                <div className="title">
                    <h3>Listado productos</h3>
                </div>
                <div className="table-controler">
                    <table border="1" width="100%">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>
                                        <button onClick={() => eliminarFila(product.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
