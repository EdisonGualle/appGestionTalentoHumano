<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Employee\EmpleadoCapacitacionController;
use App\Http\Controllers\Employee\EmpleadoCargoController;
use App\Http\Controllers\Employee\EmpleadoContratoController;
use App\Http\Controllers\Employee\EmpleadoDepartamentoController;



//Rutas Capacitaciones
Route::get('/capacitaciones', [EmpleadoCapacitacionController::class, 'listarCapacitacionesPorEmpleadoAuth']);
Route::get('/capacitaciones/total', [EmpleadoCapacitacionController::class, 'obtenerTotalCapacitacionesPorEmpleadoAuth']);

//Rutas Cargo
Route::get('/informacion-empleado-cargo-departamento', [EmpleadoCargoController::class, 'mostrarInformacionEmpleadoCargoDepartamento']);

//Rutas Contrato
Route::get('/informacion-contratos-empleado', [EmpleadoContratoController::class, 'listarContratosPorEmpleadoAuth']);

//Rutas Departamento
Route::get('/mostrar-departamentos', [EmpleadoDepartamentoController::class, 'obtenerDatosEmpleadoAuth']);



