<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'unit' => UnitResource::make(
                $this->whenLoaded('unit'),
            ),
            'section' => SectionResource::make(
                $this->whenLoaded('section'),
            ),
            'created_at' => $this->created_at->toDateString(),
        ];
    }
}
