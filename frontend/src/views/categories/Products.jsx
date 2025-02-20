import "./Products.css";
import { Link } from "react-router-dom";

export const Products = () => {

  return (
    <>
      <div className="space">
        <h2>Agregar producto</h2>
        <Link to="/list-products">
            <button><i className="fas fa-arrow-left"></i> Regresar</button>
        </Link>
      </div>
      <form action="" method="" className="form-container">
        <div className="form-section">
          <h3>Información</h3>
          <div className="form-group">
            <label form="title">Nombre:</label>
            <input type="text" name="title" />
          </div>
          <div className="form-group describeSite">
            <label form="describe">Descripción:</label>
            <input type="text" name="describe" />
          </div>
          <div className="form-group">
            <label form="type">Tipo espacio:</label>
            <input type="text" name="type" />
          </div>
          <div className="form-group">
            <label form="capacity">Capacidad:</label>
            <input type="text" name="capacity" />
          </div>
          <div className="form-group">
            <label form="price">Precio hora:</label>
            <input type="text" name="price" />
          </div>
        </div>

        <div className="form-section">
          <h3>Localización</h3>
          <div className="form-group">
            <label form="country">País:</label>
            <select name="country">
            <option value="seleccionar" selected disabled>Seleccionar</option>
              <option value="argentina">Argentina</option>
              <option value="colombia">Colombia</option>
              <option value="ecuador">Ecuador</option>
            </select>
          </div>
          <div className="form-group">
            <label form="region">Región:</label>
            <input type="text" name="region" />
          </div>
          <div className="form-group">
            <label form="suite">Localidad:</label>
            <input type="text" name="suite" />
          </div>
          <div className="form-group">
            <label form="zip">Código postal:</label>
            <input type="text" name="zip" />
          </div>
          <div className="form-group describeSite">
            <label form="extra">Indicaciones extras:</label>
            <input type="text" name="extra" />
          </div>
        </div>

        <div className="add-img">
          <label form="img">Agrega imágenes: </label>
          <input type="file" multiple accept="image/*" name="img" />
          <button type="">Guardar</button>
        </div>
      </form>

    </>
  )

}