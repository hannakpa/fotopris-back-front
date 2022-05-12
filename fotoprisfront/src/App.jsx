import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Form, Col, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
// import wallpaper from "./img/wallpaper.jpg";
import Slideshow from "./Slideshow";
import "./App.css";
import UserContext from "./UserContext";
import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";

function App() {
  const [articulos, setArticulos] = useState([]);
  const [formatos, setFormatos] = useState([]);

  const [carrito, setCarrito] = useState([]);
  const [precioFinal, setPrecioFinal] = useState(0);

  console.log(carrito);

  function getArticulos() {
    fetch("http://localhost:4001/api/articulos")
      .then((datos) => datos.json())
      .then((datos) => setArticulos(datos.data)) ///.data porque a la API le di dos elementos: ok y data. ok mustra el estatus(true/false) y data contiene la informacion de la tabla.
      //EN EL BACKEND: articulo-controller>
      // modelos.Articulo.findAll({ limit: 500 }).then((items) =>
      //   res.json({
      //     ok: true,
      //     data: items,
      //   })
      // );
      .catch((err) => console.log(err));
  }
  function getFormatos() {
    fetch("http://localhost:4001/api/formatos")
      .then((datos) => datos.json())
      .then((datos) => setFormatos(datos.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getArticulos();
    getFormatos();
  }, []);

  // esta función estará a nivel global poorque quiero que sirva para todos los componentes hijos. aquí se hará la operación que resetea el precio final cada vez que cambie/se añade o borre un elemento del carrito(por consiguiente se borra o añade un precio).

  function sumaTotalCarrito() {
    let total = 0;
    carrito.forEach((el) => {
      total += Number(el.total_sel); //Number convierte el valor a n'umero. A veces esto lee los n'umeros como strings y en vez de sumar 13+12=25, suma 1312. para evitar esto, me puedo asegurar de que lee como n'umero usando un constructor Number.
    });
    setPrecioFinal(total.toFixed(2)); //toFixed(2) se encarga de mostrar la cantidad de decimales que le pida entre par'entesis.
  }

  ////meto la función de suma total en un useEffect global del App para que cada vez que se cambie algo del carrito esté en el modal que esté, se ejecute automáticamente un recálculo de la suma y se actualice el precio que está al lado del icono carrito.

  ///En un useEffect pido que se ejecute automáticamente la suma de los total_sel de cada elemento del carrito (función de arriba sumaTotalCarrito) cada vez que haya una actualización en la variable carrito.
  useEffect(() => {
    sumaTotalCarrito();
  }, [carrito]);

  function eliminar(pedido) {
    setCarrito(carrito.filter((el) => el.total_sel !== pedido.total_sel));
    setPrecioFinal(sumaTotalCarrito - pedido.total_sel);
  }

  return (
    <div>
      {/* con el PROVIDER envuelvo todas las etiquetas que recibirán estos valores. incluido el OUTLET, que cuenta con todas las rutas que le he indicado */}
      <UserContext.Provider
        value={{
          articulos,
          formatos,
          setCarrito,
          carrito,
          precioFinal,
          setPrecioFinal,
          eliminar,
        }}
      >
        <Container fluid>
          <Row>
            <Navbar bg="dark" variant="dark" expand="lg">
              {" "}
              <Link className="nav-link" to="/">
                <i>
                  <AiOutlineHome />
                </i>
              </Link>
              <div className="icono-carrito">
                <Link to="factura">
                  <span>
                    <AiOutlineShoppingCart />
                  </span>
                  <span style={{ "font-size": "1rem" }}> {precioFinal} €</span>
                </Link>
              </div>
            </Navbar>
          </Row>

          {/* ABRE SEGUNDO ROW. COL IZQUIERDA FIJA. COL DERECHA OUTLET CON RUTAS. */}
          <Row>
            <Col md="5">
              <div className="big-box">
                <Slideshow />
              </div>
            </Col>
            <Col md="7">
              <div className="big-box">
                <Outlet />
              </div>
            </Col>
          </Row>
        </Container>
      </UserContext.Provider>
    </div>
  );
}

export default App;
