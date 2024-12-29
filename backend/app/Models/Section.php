<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    /** @use HasFactory<\Database\Factories\SectionFactory> */
    use HasFactory;

    protected $fillable = ['unit_id', 'name'];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
