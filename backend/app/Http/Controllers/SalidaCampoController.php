<?php

namespace App\Http\Controllers;

use App\Models\SalidaCampo;
use App\Models\Empleado;
use App\Models\TipoSalida;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SalidaCampoController extends Controller
{
    /**
     * Lista todas las salidas de campo.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listarSalidasCampo()
    {
        $salidasCampo = SalidaCampo::all();
        return response()->json(['successful' => true, 'data' => $salidasCampo]);
    }

    /**
     * Muestra los detalles de una salida de campo específica.
     *
     * @param  int  $id - ID de la salida de campo
     * @return \Illuminate\Http\JsonResponse
     */
    public function mostrarSalidaCampo($id)
    {
        $salidaCampo = SalidaCampo::find($id);

        if (!$salidaCampo) {
            return response()->json(['successful' => false, 'error' => 'Salida de Campo no encontrada'], 404);
        }

        return response()->json(['successful' => true, 'data' => $salidaCampo]);
    }

    /**
     * Crea una nueva salida de campo con los datos proporcionados en la solicitud.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function crearSalidaCampo(Request $request)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'fecha' => 'required|date',
            'horaSalida' => 'required|date_format:H:i:s',
            'horaLlegada' => 'required|date_format:H:i:s|after:horaSalida',
            'aprobacionJefeInmediato' => 'required|boolean',
            'aprobacionTalentoHumano' => 'required|boolean',
            'idEmpleado' => 'required|integer|exists:empleados,idEmpleado',
            'idTipoSalida' => 'required|integer|exists:tipo_salidas,idTipoSalida',
        ]);

        // Si la validación falla, retornar errores
        if ($validator->fails()) {
            return response()->json(['successful' => false, 'errors' => $validator->errors()], 422);
        }

        // Crear la salida de campo
        $salidaCampo = SalidaCampo::create($request->all());

        return response()->json(['successful' => true, 'data' => $salidaCampo], 201);
    }

    /**
     * Actualiza los detalles de una salida de campo existente.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id - ID de la salida de campo a actualizar
     * @return \Illuminate\Http\JsonResponse
     */
    public function actualizarSalidaCampo(Request $request, $id)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'nombre' => 'string|max:255',
            'fecha' => 'date',
            'horaSalida' => 'date_format:H:i:s',
            'horaLlegada' => 'date_format:H:i:s|after:horaSalida',
            'aprobacionJefeInmediato' => 'boolean',
            'aprobacionTalentoHumano' => 'boolean',
            'idEmpleado' => 'integer|exists:empleados,idEmpleado',
            'idTipoSalida' => 'integer|exists:tipo_salidas,idTipoSalida',
        ]);

        // Si la validación falla, retornar errores
        if ($validator->fails()) {
            return response()->json(['successful' => false, 'errors' => $validator->errors()], 422);
        }

        $salidaCampo = SalidaCampo::find($id);

        if (!$salidaCampo) {
            return response()->json(['successful' => false, 'error' => 'Salida de Campo no encontrada'], 404);
        }

        // Actualizar la salida de campo
        $salidaCampo->update($request->all());

        return response()->json(['successful' => true, 'data' => $salidaCampo]);
    }

    /**
     * Elimina una salida de campo existente.
     *
     * @param  int  $id - ID de la salida de campo a eliminar
     * @return \Illuminate\Http\JsonResponse
     */
    public function eliminarSalidaCampo($id)
    {
        $salidaCampo = SalidaCampo::find($id);

        if (!$salidaCampo) {
            return response()->json(['successful' => false, 'error' => 'Salida de Campo no encontrada'], 404);
        }

        $salidaCampo->delete();

        return response()->json(['successful' => true, 'message' => 'Salida de Campo eliminada correctamente']);
    }
}
