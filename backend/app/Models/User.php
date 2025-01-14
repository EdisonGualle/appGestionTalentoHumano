<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Concerns\HasAttributes; // Agregado




class User extends Authenticatable implements CanResetPassword
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $table = 'usuario';

    protected $primaryKey = 'idUsuario';
    protected $hidden = [
        "updated_at",
        "created_at"
    ];

    protected $fillable = [
        'usuario',
        'correo',
        'password',
        'idRol',
        'idTipoEstado',
        'idEmpleado',
        'intentos_fallidos',
        'bloqueado_hasta',
    ];
    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'idEmpleado');
    }

    public function estado()
    {
        return $this->belongsTo(EstadoUsuario::class, 'idEstado', 'idEstado');
    }
    
    public function routeNotificationForMail()
    {
        return $this->correo;
    }
}
