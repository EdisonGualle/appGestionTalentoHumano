<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contrato;

class ContratoController extends Controller
{
    public function listarContratos()
    {
        $contratos = Contrato::with('usuario', 'cargo')->get();
        return response()->json($contratos);
    }

    public function mostrarContrato($id)
    {
        $contrato = Contrato::with('usuario', 'cargo')->find($id);

        if (!$contrato) {
            return response()->json(['error' => 'Contrato no encontrado'], 404);
        }

        return response()->json($contrato);
    }

    public function crearContrato(Request $request)
    {
        $contrato = Contrato::create($request->all());
        return response()->json($contrato, 201);
    }

    public function actualizarContrato(Request $request, $id)
    {
        $contrato = Contrato::find($id);

        if (!$contrato) {
            return response()->json(['error' => 'Contrato no encontrado'], 404);
        }

        $contrato->update($request->all());

        return response()->json($contrato, 200);
    }

    public function eliminarContrato($id)
    {
        $contrato = Contrato::find($id);

        if (!$contrato) {
            return response()->json(['error' => 'Contrato no encontrado'], 404);
        }

        $contrato->delete();

        return response()->json(['message' => 'Contrato eliminado correctamente'], 200);
    }
}
