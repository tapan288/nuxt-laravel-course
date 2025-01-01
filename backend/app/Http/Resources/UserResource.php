<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $this?->loadMissing('roles.permissions');
        $permissions = [];

        if ($user) {
            foreach ($user->roles as $role) {
                foreach ($role->permissions as $singlePermission) {
                    $permissions[] = $singlePermission->title;
                }
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->toDateString(),
            'two_factor_enabled' => !is_null($this->two_factor_confirmed_at),
            'permissions' => collect($permissions)->unique()->map(function ($permission) {
                return [
                    $permission => true,
                ];
            })->collapse()->toArray(),
        ];
    }
}
