<?php
	//This is the login page. If there is no user currently logged in, it displays boxes to enter username and password.
	//Otherwise, it simply redirects to the user's dashboard.

	session_start();
	if(isset($_SESSION["username"])){
		header("Location: dashboard.php");
	}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
	<meta name="sitelock-site-verification" content="1956" />
    <?php
		include "head.html";
	?>
	<link href="signin.css" rel="stylesheet">
	<style>
		.footer{ display: none }
	</style>
  </head>

  <body>

    <div class="container-fluid">

      <form class="form-signin" role="form" method="post" action="authenticate.php">
        <h2 class="form-signin-heading">Resident Program</h2>
        <input class="form-control" placeholder="Username" name="username" required autofocus>
        <input type="password" class="form-control" placeholder="Password" name="password" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
      <form class="form-signin" role="form" action="recover_password.php">
		<button class="btn btn-lg btn-block" type="submit">Forgot Password</button>
      </form>

    </div>
	<?php
		include "scripts.html";
	?>
  </body>
</html>
