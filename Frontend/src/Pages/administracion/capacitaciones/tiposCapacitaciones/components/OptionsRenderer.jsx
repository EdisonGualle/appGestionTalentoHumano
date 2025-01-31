import React, { useState } from "react";
// import Modal from "react-modal";
// import PerfilEmpleado from "./PerfilEmpleado";
// import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useTiposCapacitaciones from "../../../../../hooks/useTiposCapacitaciones";

const OptionsRenderer = (params) => {
  const { eliminarTipoCapacitacion, actualizarTipoCapacitacion } = useTiposCapacitaciones();
  const MySwal = withReactContent(Swal);
  const { data } = params;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const isCurrentRowEditing = params.api
    .getEditingCells()
    .some((cell) => cell.rowIndex === params.node.rowIndex);

  const customStyles = {
    content: {
      width: "80%", // Ajusta el ancho según tus necesidades
      height: "80%", // Ajusta la altura según tus necesidades
      margin: "auto",
      marginLeft: "15%",
      zIndex: 9999, // Establece un z-index alto
    },
  };
 /* const onVerClick = () => {
    setModalIsOpen(true);
  };*/

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const onEditarClick = (data) => {
    console.log(data);
  };

  const handleActualizar = () => {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción actualizará el tipo de capacitación. ¿Quieres continuar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        actualizarTipoCapacitacion(data.idCapacitacion, data);
        MySwal.fire("Actualizado", "Tipo de capacitación Actualizado.", "success");
      }
    });
  };

  const onEliminarClick = () => {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el tipo de capacitación. ¿Quieres continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        /*         ;

         */
        eliminarTipoCapacitacion(data.idCapacitacion);
        MySwal.fire("Eliminada", "Tipo de capacitación Eliminado.", "success");
      }
    });
  };

  return (
    <>
      <div>
        {isCurrentRowEditing ? (
          <>
            <button
              className="bg-blue-400 hover:bg-blue-500 rounded-xl text-white px-2  mr-2"
              data-action="update"
              onClick={handleActualizar}
            >
              Actualizar
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 rounded-xl text-white px-2 "
              data-action="cancel"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onEditarClick(data)}
              className="bg-green-400 hover:bg-green-500 rounded-xl text-white px-4  mr-2"
              data-action="edit"
            >
              Editar
            </button>

            <button
              onClick={() => onEliminarClick(data)}
              className="bg-red-500 hover:bg-red-700 rounded-xl text-white px-4 "
              data-action="delete"
            >
              Eliminar
            </button>
          </>
        )}
      </div>

    </>
  );
};
export default OptionsRenderer;
