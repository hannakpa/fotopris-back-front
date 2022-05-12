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
import MostrarModal from "./MostrarModal";

function Select() {
  const Context = useContext(UserContext);

  //crear un usestate con un array vacio. dentro se guardaran los nombres de la foto y de los tamanos seleccionados con el precio total. guardar y reutilizar con contex

  let mostrarCartas = Context.articulos.map((carta, i) => (
    <>
      <Card style={{ width: "10rem" }} key={i}>
        <Card.Img variant="top" src={carta.url} />
        <Card.Body>
          <Card.Title>Foto {carta.id}</Card.Title>
          <Card.Text>
            Precio:
            {carta.categoria === "A"
              ? "19,99 €"
              : carta.categoria === "B"
              ? "39,99 €"
              : carta.categoria === "C"
              ? "59,99 €"
              : null}
          </Card.Text>
          {/* <button
            className="btn btn-outline-dark"
            onClick={() => {
              handleShow());
            }}
          >
            Seleccionar
          </button> 
          el botón no puede estar aquí. Debe estar dentro del modal 
          
          CADA VEZ QUE HAY UN CAMBIO DE ESTADO HAY UN RENDER*/}
        </Card.Body>

        {/* EL MOSTRAR MODAL DEBE ESTAR DENTRO DE CARD. SINO PIERDE EL CONTEXTO y coja la carta sobre la que se está presionando.  */}
        <MostrarModal carta={carta} formatos={Context.formatos} />
      </Card>
    </>
  ));

  return (
    <Row xs={1} md={2} className="g-3">
      {mostrarCartas}
    </Row>
  );
}
export default Select;
