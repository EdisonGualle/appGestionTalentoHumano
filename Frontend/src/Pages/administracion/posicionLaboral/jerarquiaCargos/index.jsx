import React from "react";
import useJerarquiaCargos from "../../../../hooks/useJerarquiaCargos"; // Actualiza la importación según la ubicación de tu hook de jerarquía de cargos
import TableJerarquiaCargos from "./components/TableJerarquiaCargos"; // Actualiza la importación según la ubicación de tu componente de tabla de jerarquía de cargos
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FormNuevaJerarquiaCargos from "./components/FormNuevaJerarquiaCargos";

import NavegacionPosicionesLaborales from "../components/NavegacionPosicionesLaborales";
import useDirecciones from "../../../../hooks/useDirecciones";
import useUnidades from "../../../../hooks/useUnidades";
import useCargos from "../../../../hooks/useCargos";
const IndexJerarquiaCargosAdministrador = () => {

  const { jerarquiaCargos, setCargando } = useJerarquiaCargos();

  const {direcciones}=useDirecciones();
  const {unidades}=useUnidades();
  const {cargos}=useCargos();

  const MySwal = withReactContent(Swal);

  const handleEliminarClick = () => {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la jerarquia cargos. ¿Quieres continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes realizar la lógica para eliminar el cargo
        MySwal.fire("Eliminado", "La jerarquia cargos ha sido eliminado.", "success");
      }
    });
  };

  const handleNuevaClick = () => {
    MySwal.fire({
      title: "Nueva Jerarquia Cargos",
      html: <FormNuevaJerarquiaCargos direcciones={direcciones} unidades={unidades} cargos={cargos}/>,
      showCancelButton: true,
      showCloseButton: true,
      reverseButtons: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Crear",
      width: "50%",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes realizar la lógica para eliminar la unidad
        MySwal.fire("Success", "Jerarquia Cargos creada correctamente", "success");
      }
    });
  };

  return (
    <>
      <NavegacionPosicionesLaborales />
      <div className="uppercase bg-white py-2 font-bold rounded-lg mb-1 p-10">
        <div className="flex justify-start my-3">
          <h1 className="ms-0 me-10">
            Total de jerarquias cargos:{" "}
            <span className="text-blue-700">{jerarquiaCargos.length}</span>{" "}
          </h1>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-700 text-white mx-10 py-2 px-5 rounded-lg"
            onClick={handleEliminarClick}
          >
            Eliminar
          </button>

          <button
            className="bg-blue-700 text-white py-2 px-5 rounded-lg"
            onClick={handleNuevaClick}
          >
            Nuevo
          </button>
        </div>
        <div className="flex justify-start">
          {/* Puedes agregar controles adicionales o filtros relacionados con los cargos aquí */}
        </div>
      </div>
      <div className="h-full">
        <TableJerarquiaCargos jerarquiaCargos={jerarquiaCargos} />
      </div>
    </>
  );
};

export default IndexJerarquiaCargosAdministrador;
