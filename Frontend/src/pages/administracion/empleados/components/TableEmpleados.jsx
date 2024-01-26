/* import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useMemo, useState } from "react";
import OptionsRenderer from "./OptionsRenderer";
// Constants
import { TRANSLATIONS, LANGUAGE_OPTIONS } from "./traduccionTableGrid";

const TableEmpleados = ({ empleados, handleEliminarClick }) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    setRowData(empleados);
  }, [empleados]);

  const colDefs = useMemo(() => [
    {
      headerName: "Cedula",
      field: "cedula",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      suppressMenu: true,
    },
    {
      headerName: "Opciones",
      cellRenderer: OptionsRenderer,
      checkboxSelection: false,
      filter: false,
      suppressMenu: true,
      width: 150,
    },
    {
      headerName: "Nombre Completo",
      suppressMenu: true,
      valueGetter: (params) =>
        `${params.data.primerNombre} ${params.data.segundoNombre} ${params.data.primerApellido} ${params.data.segundoApellido}`,
    },
    {
      headerName: "Fecha de Nacimiento",
      field: "fechaNacimiento",
      filter: "agDateColumnFilter",
      suppressMenu: true,
    },
    { headerName: "Correo", field: "correo", suppressMenu: true },
    { headerName: "Genero", field: "genero", suppressMenu: true },
    {
      headerName: "Teléfono Personal",
      field: "telefonoPersonal",
      suppressMenu: true,
    },
    {
      headerName: "Teléfono Trabajo",
      field: "telefonoTrabajo",
      suppressMenu: true,
    },
    { headerName: "Etnia", field: "etnia", suppressMenu: true },
    { headerName: "Estado Civil", field: "estadoCivil", suppressMenu: true },
    { headerName: "Tipo de Sangre", field: "tipoSangre", suppressMenu: true },
    { headerName: "Nacionalidad", field: "nacionalidad", suppressMenu: true },
    // Agrega más columnas según sea necesario
  ]);

  const defaultColDef = useMemo(
    () => ({
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["contains"],
        defaultFilterOption: "contains",
        suppressAndOrCondition: true,
      },
      floatingFilter: true,
    }),
    []
  );

  return (
    <div className="ag-theme-quartz" style={{ width: "100%", height: "90%" }}>
      <AgGridReact
        localeText={TRANSLATIONS[LANGUAGE_OPTIONS.ES]}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        frameworkComponents={{
          optionsRenderer: (props) => <OptionsRenderer {...props} />,
        }}
        pagination={true}
        rowSelection="multiple"
      />
    </div>
  );
};

export default TableEmpleados;
 */
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import OptionsRenderer from "./OptionsRenderer";

const TableEmpleados = ({ empleados }) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    setRowData(empleados);
  }, [empleados]);

  const [gridOptions] = useState({
    suppressClickEdit: true,
    onCellClicked: handleCellClicked,
    onRowEditingStarted: handleRowEditingStarted,
    onRowEditingStopped: handleRowEditingStopped,
    editType: "fullRow",
    columnDefs: [
      {
        field: "cedula",
        headerName: "cedula",
        minWidth: 150,
        editable: true,
        suppressMenu: true,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        chartDataType: "category",
      },
      {
        headerName: "Acciones",
        minWidth: 150,
        cellRenderer: OptionsRenderer,
        editable: false,
        colId: "acciones",
        checkboxSelection: false,
        filter: false,
      },
      {
        headerName: "Nombre Completo",
        suppressMenu: true,
        valueGetter: (params) =>
          `${params.data.primerNombre} ${params.data.segundoNombre} ${params.data.primerApellido} ${params.data.segundoApellido}`,
      },
      {
        headerName: "Fecha de Nacimiento",
        field: "fechaNacimiento",
        filter: "agDateColumnFilter",
        suppressMenu: true,
      },
      { headerName: "Correo", field: "correo", suppressMenu: true },
      { headerName: "Genero", field: "genero", suppressMenu: true },
      {
        headerName: "Teléfono Personal",
        field: "telefonoPersonal",
        suppressMenu: true,
      },
      {
        headerName: "Teléfono Trabajo",
        field: "telefonoTrabajo",
        suppressMenu: true,
      },
      { headerName: "Etnia", field: "etnia", suppressMenu: true },
      { headerName: "Estado Civil", field: "estadoCivil", suppressMenu: true },
      { headerName: "Tipo de Sangre", field: "tipoSangre", suppressMenu: true },
      { headerName: "Nacionalidad", field: "nacionalidad", suppressMenu: true },
    ],
    defaultColDef: {
      editable: true,
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["contains"],
        defaultFilterOption: "contains",
        suppressAndOrCondition: true,
      },
      floatingFilter: true,
    },
  });

  function actionCellRenderer(params) {
    const isCurrentRowEditing = params.api
      .getEditingCells()
      .some((cell) => cell.rowIndex === params.node.rowIndex);

    return (
      <div>
        {isCurrentRowEditing ? (
          <>
            <button
              className="bg-blue-400 text-white px-4  mr-2"
              data-action="update"
            >
              Actualizar
            </button>

            <button
              className="bg-gray-100 text-black px-4 border border-gray-300"
              data-action="cancel"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-green-400 hover:bg-green-500 text-white px-4  mr-2"
              data-action="edit"
            >
              Editar
            </button>
            <button
              className="bg-red-500 text-white px-4 "
              data-action="delete"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    );
  }

  function handleCellClicked(params) {
    if (
      params.column.colId === "acciones" &&
      params.event.target.dataset.action
    ) {
      const action = params.event.target.dataset.action;

      if (action === "edit") {
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          colKey: "cedula", // Puedes especificar la columna que deseas editar aquí
        });
      }

      if (action === "delete") {
        params.api.applyTransaction({
          remove: [params.node.data],
        });
      }

      if (action === "update") {
        params.api.stopEditing(false);
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }
  }

  function handleRowEditingStarted(params) {
    params.api.refreshCells({
      columns: ["acciones"],
      rowNodes: [params.node],
      force: true,
    });
  }

  function handleRowEditingStopped(params) {
    params.api.refreshCells({
      columns: ["acciones"],
      rowNodes: [params.node],
      force: true,
    });
  }

  return (
    <div className="ag-theme-quartz" style={{ width: "100%", height: "90%" }}>
      <AgGridReact
        pagination={true}
        enableRangeSelection={true}
        gridOptions={gridOptions}
        rowData={rowData}
        rowSelection="multiple"
      />
    </div>
  );
};

export default TableEmpleados;
