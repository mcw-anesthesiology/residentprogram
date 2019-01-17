<?php

namespace App\Policies;

use App\User;
use App\ScenarioResponse;
use Illuminate\Auth\Access\HandlesAuthorization;

class ScenarioResponsePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the scenario response.
     *
     * @param  \App\User  $user
     * @param  \App\ScenarioResponse  $scenarioResponse
     * @return mixed
     */
    public function view(User $user, ScenarioResponse $scenarioResponse)
    {
        //
    }

    /**
     * Determine whether the user can create scenario responses.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the scenario response.
     *
     * @param  \App\User  $user
     * @param  \App\ScenarioResponse  $scenarioResponse
     * @return mixed
     */
    public function update(User $user, ScenarioResponse $scenarioResponse)
    {
        //
    }

    /**
     * Determine whether the user can delete the scenario response.
     *
     * @param  \App\User  $user
     * @param  \App\ScenarioResponse  $scenarioResponse
     * @return mixed
     */
    public function delete(User $user, ScenarioResponse $scenarioResponse)
    {
        //
    }

    /**
     * Determine whether the user can restore the scenario response.
     *
     * @param  \App\User  $user
     * @param  \App\ScenarioResponse  $scenarioResponse
     * @return mixed
     */
    public function restore(User $user, ScenarioResponse $scenarioResponse)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the scenario response.
     *
     * @param  \App\User  $user
     * @param  \App\ScenarioResponse  $scenarioResponse
     * @return mixed
     */
    public function forceDelete(User $user, ScenarioResponse $scenarioResponse)
    {
        //
    }
}
