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
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="favicon.ico">

    <title>Resident Evaluation Program</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="signin.css" rel="stylesheet">


  </head>

  <body>

    <div class="container">

      <form class="form-signin" role="form" method="post" action="authenticate.php">
        <h2 class="form-signin-heading">Please sign in</h2>
        <input class="form-control" placeholder="Username" name="username" required autofocus>
        <input type="password" class="form-control" placeholder="Password" name="password" required>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>

    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
  </body>
</html>
