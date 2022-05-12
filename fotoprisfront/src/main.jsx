import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppU from "./AppU";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import HolaUsuario from "./rutas/appU/HolaUsuario";
import Select from "./rutas/app/Select";
import Registro from "./rutas/app/Registro";
import Welcome from "./rutas/app/Welcome";
import Factura from "./rutas/app/Factura";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      {/* ruta general. el index es lo que se vera por defecto. los path son los que cambiarán */}
      <Route path="/" element={<App />}>
        <Route index element={<Welcome />} />
        <Route path="select" element={<Select />} />
        <Route path="factura" element={<Factura />} />
        <Route path="registro" element={<Registro />} />
      </Route>
      {/* ruta para usuario. aqu'i en el appu modificar'en su parte fija tambien */}
      <Route path="/u/" element={<AppU />}>
        <Route path="holaUsuario" element={<HolaUsuario />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
