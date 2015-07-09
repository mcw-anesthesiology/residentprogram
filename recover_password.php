<?php

	session_start();

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
		include "head.html";
	?>
	<link href="signin.css" rel="stylesheet">
	<style>
		button { margin-top: 10px }
	</style>
  </head>

  <body>

	<div class="container-fluid">

      <form class="form-signin" role="form" method="post" action="process_recovery.php">
        <h2 class="form-signin-heading">Recover Password</h2>
        <input class="form-control" placeholder="Email Address" name="email" required autofocus>
        <button class="btn btn-lg btn-primary btn-block" type="submit" name="action" value="recoverPassword">Send Recovery Password</button>
      </form>

    </div> <!-- /container -->


	<?php
		include "scripts.html";
	?>
  </body>
</html>
