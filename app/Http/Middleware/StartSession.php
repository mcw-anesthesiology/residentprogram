<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;

class StartSession extends \Illuminate\Session\Middleware\StartSession {

	const HEADER_NAME = 'X-LARAVEL-SESSION';

    public function getSession(Request $request) {
        return tap($this->manager->driver(), function ($session) use ($request) {
			$id = $request->headers->get(self::HEADER_NAME);
			if (empty($id)) {
				$id = $request->cookies->get($session->getName());
			}
            $session->setId($id);
        });
    }
}
