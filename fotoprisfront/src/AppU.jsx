//import { useState } from "react";
import { Navbar, Nav, Container, Modal, Button, Form } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import "./App.css";

function AppU() {
  return (
    <>
      <Navbar bg="success" variant="success" expand="lg">
        <Container>
          <Link to="/" className="navbar-brand">
            HOME
          </Link>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default AppU;
