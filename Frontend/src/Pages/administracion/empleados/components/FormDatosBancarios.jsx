import React, { useEffect, useState } from "react";
import useEmpleados from "../../../../hooks/useEmpleados";
import { useNavigate } from "react-router-dom";

const FormDatosBancarios = ({
  handlePrev,
  formDatosbancarios,
  setFormDatosBancarios,
  completarFormulario,
}) => {
  const [error, setError] = useState(false);
  const { datosBancarios, getDatosBancarios, alerta } = useEmpleados();
  const navigate = useNavigate();

  /* 
  useEffect(() => {
    getDatosBancarios();
  }, []);
  console.log(datosBancarios) */

  const hanldeChange = (e) => {
    setFormDatosBancarios({
      ...formDatosbancarios,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const camposObligatorios = ["nombreBanco", "numeroCuenta"];
    for (const campo of camposObligatorios) {
      if (formDatosbancarios[campo] === "") {
        setError(true);

        setTimeout(() => {
          setError(false);
        }, 3000);

        return;
      }
    }
    completarFormulario();
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-500 py-1 px-3 text-white font-bold rounded-md text-center mt-2 mb-5">
            Por favor, completa todos los campos obligatorios.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="mb-4">
            <label
              htmlFor="nombreBanco"
              className="block text-sm font-medium text-gray-600"
            >
              Nombre del Banco
            </label>
            <input
              type="text"
              id="nombreBanco"
              name="nombreBanco"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={formDatosbancarios.nombreBanco}
              onChange={hanldeChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="numeroCuenta"
              className="block text-sm font-medium text-gray-600"
            >
              Número de Cuenta
            </label>
            <input
              type="text"
              id="numeroCuenta"
              name="numeroCuenta"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={formDatosbancarios.numeroCuenta}
              onChange={hanldeChange}
            />
          </div>

          {/* Columna 2 */}
          <div className="mb-4">
            <label
              htmlFor="tipoCuenta"
              className="block text-sm font-medium text-gray-600"
            >
              Tipo de Cuenta
            </label>
            <select
              id="tipoCuenta"
              name="tipoCuenta"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={formDatosbancarios.tipoCuenta}
              onChange={hanldeChange}
            >
              <option value="">Selecciona una opción</option>
              <option value="">Ahorros</option>
              <option value="">Corriente</option>
            </select>
          </div>
        </div>
        <div className="col-span-3 flex justify-end ">
          <button
            type="button"
            className="bg-yellow-700 text-white py-2 px-5 rounded-lg mr-5"
            onClick={handlePrev}
          >
            Anterior
          </button>
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-5 rounded-lg"
          >
            GUARDAR
          </button>
        </div>
      </form>
      {alerta.tipo === "error" ? (
        <p className="bg-red-500 text-white font-bold text-center mt-4 mx-2 my-2 rounded-lg">
          {alerta.mensaje}
        </p>
      ) : (
        <p className="text-center font-bold text-green-500">{alerta.mensaje}</p>
      )}
    </div>
  );
};

export default FormDatosBancarios;
