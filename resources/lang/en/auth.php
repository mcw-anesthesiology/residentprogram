<?php

$adminEmail = config("app.admin_email");

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used during authentication for various
    | messages that we need to display to the user. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'failed' => 'Username or password seems to be incorrect, please try again.',
	'failed-multiple' => "If you are unable to login, please try to reset your password with the button below. If you still experience problems, please contact me at <a href='mailto:{$adminEmail}'>{$adminEmail}</a>.",
    'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',

];
