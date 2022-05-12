import { Table, Form, Button } from "react-bootstrap";
import UserContext from "../../UserContext.js";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";

function Factura() {
  const navigateTo = useNavigate();
  const goRegistro = () => {
    navigateTo("/registro");
  };

  const Context = useContext(UserContext);
  console.log(Context.carrito);
  const [destino, setDestino] = useState("");
  const [precioEnvio, setPrecioEnvio] = useState(0);
  const [precioFinalEnvio, setPrecioFinalEnvio] = useState(0);

  function handleValue(e) {
    setDestino(e.currentTarget.value);
  }

  useEffect(() => {
    switch (destino) {
      case "espania":
        setPrecioEnvio(6 * 1);
        break;
      case "eu":
        setPrecioEnvio(12 * 1);
        break;
      case "mundo":
        setPrecioEnvio(25 * 1); //*1 para que no devuelva mil decimales. me lo convierte a un  integro
        break;
      default:
        setPrecioEnvio(0);
        break;
    }
  }, [destino]);

  function sumaTotalEnvio() {
    if (
      Context.precioFinal >= 100 &&
      (destino == "eu" || destino == "espania")
    ) {
      setPrecioFinalEnvio(Number(Context.precioFinal).toFixed(2) * 1);
    } else {
      setPrecioFinalEnvio(
        Number(Context.precioFinal) + precioEnvio.toFixed(2) * 1
      );
    }
  }

  useEffect(() => {
    //console.log(Context.precioFinal);
    sumaTotalEnvio();
  }, [precioEnvio, Context.precioFinal]);

  const mostrarpedidos = Context.carrito.map((pedido, i) => (
    <tr key={i}>
      <td>
        <BsTrash
          style={{ cursor: "pointer" }}
          onClick={() => Context.eliminar(pedido)}
        />
      </td>
      <td>{i + 1}</td>
      <td>
        <img
          style={{ height: "10rem" }}
          src={pedido.urlFoto_sel}
          alt={pedido.precioFoto_sel}
        />
      </td>
      <td>
        <table>
          <tbody>
            <tr>
              <td>Precio de la foto:</td>
              <td>{pedido.precioFoto_sel} €</td>
            </tr>
            <tr>
              <td>Tamaño {pedido.nombreFormato_sel}:</td>
              <td>{pedido.precioFormato_sel} €</td>
            </tr>
          </tbody>
        </table>
        {/* IF NOT NULL////BUSCAR SINTAXIS CORRECTA */}
        {/* <p>
          {pedido.destino_sel
            ? "Gastos de envío a {pedido.destino_sel}:{pedido.precioEnvio_sel}"
            : null}
        </p> */}
      </td>
      <td style={{ "font-weight": "bold" }}>{pedido.total_sel} €</td>
    </tr>
  ));

  return (
    <>
      <h3>Tu carrito</h3>
      <Table hover variant="light">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Foto</th>
            <th>Detalles</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>{mostrarpedidos}</tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              Gastos de envío:
              <Form.Select
                value={destino}
                onChange={(e) => handleValue(e)}
                aria-label="Default select example"
                style={{ display: "inline" }}
              >
                <option>Elija el destino</option>
                <option value="espania">España</option>
                <option value="eu">Unión Europea</option>
                <option value="mundo">Resto del mundo</option>
              </Form.Select>
            </td>
            <td style={{ fontWeight: "bold" }}>{precioEnvio * 1} €</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }} colSpan={4}>
              TOTAL
            </td>
            <td style={{ fontWeight: "bold" }}>
              {precioFinalEnvio.toFixed(2) * 1} €
            </td>
          </tr>
        </tfoot>
      </Table>
      <Button variant="success" onClick={goRegistro}>
        Realizar la compra
      </Button>
    </>
  );
}

export default Factura;
