<?php
	//This page is used to destroy the current session and log the current user out of the system.

	session_start();
	$_SESSION = array();
	
	if (ini_get("session.use_cookies")) {
		$params = session_get_cookie_params();
		setcookie(session_name(), '', time() - 42000,
			$params["path"], $params["domain"],
			$params["secure"], $params["httponly"]
		);
	}

	// Finally, destroy the session.
	session_destroy();
	header("Location: index.php");
?>
