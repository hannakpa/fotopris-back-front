import UserContext from "../../UserContext.js";
import { useState, useEffect, useContext } from "react";
import {
  Card,
  Row,
  Modal,
  Button,
  Container,
  Col,
  Form,
  Table,
} from "react-bootstrap";

function MostrarModal({ carta, formatos }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Context = useContext(UserContext);
  const [nombreFormato, setNombreFormato] = useState("");
  const [precioFoto, setPrecioFoto] = useState(0);
  const [precioFormato, setPrecioFormato] = useState(0);

  const [total, setTotal] = useState(0);

  ///PRIMERO PUSE AQU'I LA FUNCI'ON DE LA SUMA, PERO NO SE ACTUALIZABA EL NUMERO EN EL NAVBAR. ASI QUE LO PAS'E AL APP PARA QUE SE ACTUALIZARA CON EL USEEFFECT SIEMPRE QUE CAMBIARA ALGO EN EL CARRITO. DE ESA FORMA QUEDA COMO UN VALOR GLOBAL ///
  // function pasartotal() {
  //   let total = 0;
  //   Context.carrito.forEach((el) => {
  //     total += Number(el.total_sel);
  //   });
  //   Context.setPrecioFinal(total);
  // }

  ///MUESTRA AUTOM'ATICAMENTE LOS VALORES DE PRECIO Y ASIGNA EL PRECIO DE LA FOTO AUTOM'ATICAMENTE SEG'UN LA CATEGOR'IA QUE TENGA

  useEffect(() => {
    carta.categoria === "A"
      ? setPrecioFoto(19.99)
      : carta.categoria === "B"
      ? setPrecioFoto(39.99)
      : carta.categoria === "C"
      ? setPrecioFoto(59.99)
      : null;
  }, []);

  ///para se haga un set autom'aticamente del total de la foto elegida cuando cambian el precio de envio o de formato

  useEffect(() => {
    setTotal((precioFormato + precioFoto).toFixed(2) * 1);
  }, [precioFormato]);

  function handleFormat(formato) {
    setPrecioFormato(formato.precio);
    setNombreFormato(formato.formato);
    setPrecioFoto(
      carta.categoria === "A"
        ? 19.99
        : carta.categoria === "B"
        ? 39.99
        : carta.categoria === "C"
        ? 59.99
        : null
    );
  }

  function handleValue(e) {
    setDestino(e.currentTarget.value);
  }

  function creaPedido(e) {
    //al enviar el pedido construyo un array que contenga ...Context.carrito(si es que ya hab'ia elementos en el carrito) y un array con todos los datos que he seleccionado en este modal. Esta funci'on se encarga de crear un paquete que se guardar'a en el carrito como elemento del array. se ir'an agregando. El carrito est'a disponible a nivel global en APP y est'a disponible para todos los modales mediante el Context. Si hay un cambio en el carrito, todos los otros modales lo sabr'an y actualizar'an el valor del carrito.
    e.preventDefault();
    Context.setCarrito([
      ...Context.carrito,
      {
        urlFoto_sel: carta.url, //puedo obtener directamente la url de la carta. ya que Select me ha pasado solo la URL de una de las fotos del array.
        precioFoto_sel: precioFoto,
        nombreFormato_sel: nombreFormato,
        precioFormato_sel: precioFormato,
        total_sel: total,
      },
    ]);
    handleClose();
  }

  return (
    <>
      <button className="btn btn-outline-dark" onClick={handleShow}>
        Seleccionar
      </button>

      {/* LA ESTRUCTURA ES LA SIGUIENTE:
<CARTA>
----foto---
----precio-------
--componente-<MOSTRAR MODAL>
    <BOTON>
    <MODAL>
--componente-</MOSTRAR MODAL>
</CARTA> */}

      <Modal
        style={{ color: "black" }}
        show={show}
        onHide={handleClose}
        animation={true}
        className="show-grid"
      >
        <Modal.Header closeButton>
          <Modal.Title>Foto {carta.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {/* COLUMNA PARA LA IMAGEN */}
              <Col xs={12} md={6}>
                <Card.Img variant="top" src={carta.url} />
              </Col>
              {/* COLUMNA PARA LOS PRECIOS Y ELECCIONES */}
              <Col xs={6} md={6}>
                <Row>
                  <p>Tamaño (cm):</p>
                  {formatos.map((boton, i) => (
                    <button
                      key={i}
                      className="btn m-1 btn-outline-secondary"
                      onClick={() => handleFormat(boton)}
                    >
                      {boton.formato}
                    </button>
                  ))}
                </Row>

                <Row>
                  <Table className="mt-3" striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th colSpan={2}>Cálculo de presupuesto</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Foto elegida</td>
                        <td>{precioFoto} €</td>
                      </tr>
                      <tr>
                        <td>Tamaño</td>
                        <td>{precioFormato} €</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>{total} €</td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={creaPedido}>
            Añadir al carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MostrarModal;
