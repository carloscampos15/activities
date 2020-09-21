<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Rol;

class RolsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Rol::create(['name' => 'Estudiante', 'description' => 'Estudiante']);
        Rol::create(['name' => 'Docente', 'description' => 'Docente']);
    }
}
