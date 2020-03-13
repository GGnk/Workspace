<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        $user = \Auth::user();
        //Только супер-админы
        Gate::define('super_admins', function ($user) {
            return in_array($user->roles_id, [1]);
        });
        //Только админы
        Gate::define('admins', function ($user) {
            return in_array($user->roles_id, [1, 2]);
        });
        //Обновить пользователя
        Gate::define('update_user', function ($user, $update_user) {
            if($user->isSuperAdmin()) return true;
            if($update_user->isSuperAdmin()) return false;

            if ($user->roles_id == $update_user->roles_id) {
                return true;
            }

            return in_array($user->roles_id, [1, 2]);
        });
        //Удалить пользователя
        Gate::define('del_user', function ($user, $del_user) {
            if (in_array($user->roles_id, [1, 2]) && !$del_user->isSuperAdmin() && $user->id != $del_user->id ) {
                return true;
            }

            return false;
        });
    }
}
