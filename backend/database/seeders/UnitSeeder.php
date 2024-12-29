<?php

namespace Database\Seeders;

use App\Models\Unit;
use App\Models\Section;
use App\Models\Student;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Unit::factory()
            ->count(10)
            ->sequence(fn($sequence) =>
                ['name' => 'Unit ' . $sequence->index + 1])
            ->has(
                Section::factory()
                    ->count(2)
                    ->state(
                        new Sequence(
                            ['name' => 'Section A'],
                            ['name' => 'Section B'],
                        ),
                    )
                    ->has(
                        Student::factory()
                            ->count(5)
                            ->state(function (array $attributes, Section $section) {
                                return ['unit_id' => $section->unit_id];
                            }),
                    ),
            )->create();
    }
}
