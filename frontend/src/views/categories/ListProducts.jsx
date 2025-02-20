import "./ListProducts.css";
import { Link } from "react-router-dom";

export const ListProducts = () => {

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
                            <tr>
                                <td>12345678</td>
                                <td>Estilo Palermo</td>
                                <td><button onclick="eliminarFila(this)">Eliminar</button></td>
                            </tr>
                            <tr>
                                <td>12345678</td>
                                <td>Estilo Palermo</td>
                                <td><button onclick="eliminarFila(this)">Eliminar</button></td>
                            </tr>
                            <tr>
                                <td>12345678</td>
                                <td>Estilo Palermo</td>
                                <td><button onclick="eliminarFila(this)">Eliminar</button></td>
                            </tr>
                            <tr>
                                <td>12345678</td>
                                <td>Estilo Palermo</td>
                                <td><button onclick="eliminarFila(this)">Eliminar</button></td>
                            </tr>
                            <tr>
                                <td>12345678</td>
                                <td>Estilo Palermo</td>
                                <td><button onclick="eliminarFila(this)">Eliminar</button></td>
                            </tr>
                            <tr>
                                <td>12345678</td>
                                <td>Estilo Palermo</td>
                                <td><button onclick="eliminarFila(this)" className="">Eliminar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}