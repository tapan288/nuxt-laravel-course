<?php

namespace App\Http\Controllers;

use App\Http\Resources\SectionResource;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $sections = Section::query()
            ->where('unit_id', $request->unit_id)
            ->get();

        return SectionResource::collection($sections);
    }
}
