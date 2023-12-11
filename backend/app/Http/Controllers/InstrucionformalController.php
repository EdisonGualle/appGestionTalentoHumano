<?php

namespace App\Http\Controllers;

use App\Models\InstrucionFormal;
use Illuminate\Http\Request;

class InstruccionFormalController extends Controller
{
    public function listarInstruccionesFormales()
    {
        $instruccionesFormales = InstrucionFormal::all();
        return response()->json($instruccionesFormales);
    }

    public function mostrarInstruccionFormal($id)
    {
        $instruccionFormal = InstrucionFormal::find($id);

        if (!$instruccionFormal) {
            return response()->json(['error' => 'Instrucción Formal no encontrada'], 404);
        }

        return response()->json($instruccionFormal);
    }

    public function crearInstruccionFormal(Request $request)
    {
        $instruccionFormal = InstrucionFormal::create($request->all());
        return response()->json($instruccionFormal, 201);
    }

    public function actualizarInstruccionFormal(Request $request, $id)
    {
        $instruccionFormal = InstrucionFormal::find($id);

        if (!$instruccionFormal) {
            return response()->json(['error' => 'Instrucción Formal no encontrada'], 404);
        }

        $instruccionFormal->update($request->all());

        return response()->json($instruccionFormal, 200);
    }

    public function eliminarInstruccionFormal($id)
    {
        $instruccionFormal = InstrucionFormal::find($id);

        if (!$instruccionFormal) {
            return response()->json(['error' => 'Instrucción Formal no encontrada'], 404);
        }

        $instruccionFormal->delete();

        return response()->json(['message' => 'Instrucción Formal eliminada correctamente'], 200);
    }
}
