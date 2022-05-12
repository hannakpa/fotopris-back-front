import { Table } from "react-bootstrap";
import UserContext from "../../UserContext.js";
import { useState, useEffect, useContext } from "react";

function Factura() {
  const Context = useContext(UserContext);

  let mostrarpedidos = Context.carrito.map((pedido, i) => {
    <tr key={i}>
      <td>{i}+1</td>
      <td>
        <img src={pedido.urlFoto_sel} alt={pedido.precioFoto_sel} />
      </td>
      <td>
        <p>Precio de la foto: {pedido.precioFoto_sel}</p>
        <p>
          Tamaño: {pedido.nombreFormato_sel} {pedido.precioFormato_sel}
        </p>
        {/* IF NOT NULL */}
        <p>
          Gastos de envío a {pedido.destino_sel}:{pedido.precioEnvio_sel}
        </p>
      </td>
      <td>{pedido.total_sel}</td>
    </tr>;
  });

  return (
    <>
      <h3>Tu carrito</h3>
      <Table hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Foto</th>
            <th>Detalles</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>{mostrarpedidos}</tbody>
        <tfoot>
          <td style={{ "font-weight": "bold" }} colSpan={3}>
            TOTAL
          </td>
          <td>@twitter</td>
        </tfoot>
      </Table>
    </>
  );
}

export default Factura;
