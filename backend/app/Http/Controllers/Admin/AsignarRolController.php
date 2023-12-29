<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Rol;
use App\Models\Estado;
use Illuminate\Http\Request;

class AsignarRolController extends Controller
{
    public function asignarRol(Request $request)
    {
        // Obtener el usuario autenticado con Laravel Sanctum
        $usuarioAutenticado = auth()->user();

        // Validar que el usuario autenticado no sea el mismo que se está modificando
        if ($usuarioAutenticado && $usuarioAutenticado->usuario === $request->input('usuario')) {
            return response()->json(['error' => 'No puedes cambiar tu propio rol'], 400);
        }

        // Validar la existencia del usuario
        $usuario = User::where('usuario', $request->input('usuario'))->first();

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        // Validar si el usuario está activo
        if (!$this->isUserActive($usuario)) {
            return response()->json(['error' => 'Usuario inactivo'], 400);
        }

        // Validar la existencia del nuevo rol
        $nuevoRol = $request->input('rol');
        $rolExistente = $usuario->getRoleNames()->first();

        if (!$this->existeRol($nuevoRol)) {
            return response()->json(['error' => 'El nuevo rol no existe'], 404);
        }

        if (!$rolExistente) {
            // Si el usuario no tiene un rol asignado, asignar el nuevo rol
            $usuario->assignRole($nuevoRol);
            return response()->json(['message' => 'Rol asignado con éxito']);
        }

        // Si el usuario ya tiene un rol, eliminar el antiguo y asignar el nuevo
        $usuario->removeRole($rolExistente);
        $usuario->assignRole($nuevoRol);

        return response()->json(['message' => 'Rol actualizado con éxito']);
    }

    // Función para verificar si el usuario está activo
    private function isUserActive($user)
    {
        $estadoActivo = Estado::where('tipoEstado', 'Activo')->first();

        if (!$estadoActivo) {
            return false; // Manejar caso donde no se encuentra el estado activo
        }

        return $user->idTipoEstado == $estadoActivo->idEstado;
    }

    // Función para verificar la existencia de un rol
    private function existeRol($rol)
    {
        return Rol::where('name', $rol)->exists();
    }
}
