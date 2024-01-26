import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbars/AdminNavbar";
import HeaderStats from "./components/Headers/HeaderStats";
import DatosPersonales from "./DatosPersonales";
import DatosLaborales from "./DatosLaborales";
import Asistencia from "./Asistencia";
import useEmpleados from "../../../hooks/useEmpleados";
import Habilidades from "./Habilidades";
import Configuracion from "../../layouts/components/Configuracion";

const IndexPerfil = () => {
  return (
    <>
      <Sidebar />
      <div className="md:ml-64 bg-indigo-500 h-64">
        <Navbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto -m-24">
          <Outlet /> {/* Renderiza las rutas secundarias aquí */}
        </div>
      </div>
    </>
  );
};

const Perfil = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPerfil />}>
        <Route path="datos-personales" element={<DatosPersonales />} />
        <Route path="datos-laborales" element={<DatosLaborales />} />
        <Route path="asistencias" element={<Asistencia />} />
        <Route path="habilidades" element={<Habilidades />} />
        <Route path="configuracion" element={<Configuracion/>} />
      </Route>
    </Routes>
  );
};

export default Perfil;