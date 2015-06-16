<?php
$mysqli = new mysqli("localhost", "ab49752_resprog", "imsdcnj239jcDKgpw34Fv1", "ab49752_resprogdata");
	if($mysqli->connect_errno){
		echo "Failed to connect to MySQL: " . $mysqli->connect_errno . " ) " . $mysqli->connect_error;
	}

$result = $mysqli->query("select username, password, type, firstName, lastName from users where username='admin' and status='active';")->fetch_assoc();
echo $result["username"];

?>