<?php 
	session_start();
	require "init.php";

  $pending = $mysqli->query("select u.username, u.firstName, u.lastName, u.status, count(r.status) as pending from users u, requests r where u.username = r.faculty and r.status = 'pending' group by username order by pending desc;");

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.ico">

    <title><?php echo ucfirst($_SESSION["type"])." Dashboard"; ?></title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="dashboard.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

<?php require 'header.php'; ?>

<?php 
  if($_SESSION["type"] == "admin"){				// ************************************ ADMIN ***********************************************************************
	  $requests = $mysqli->query("select * from requests order by requestId desc;");
	  $requestRow = $requests->fetch_assoc();	  
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">All Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Total Pending</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
<?php
$pendingRow = $pending->fetch_assoc();
while(!is_null($pendingRow)){
?>
						<tr>
						  <td><?= $pendingRow["username"] ?></td>
						  <td><?= $pendingRow["firstName"] ?></td>
						  <td><?= $pendingRow["lastName"] ?></td>
						  <td><?= $pendingRow["pending"] ?></td>
						  <td><?= $pendingRow["status"] ?></td>
						</tr>
						
<?php
$pendingRow = $pending->fetch_assoc();
}
?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
<?php 
}
?>
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
  </body>
</html>
