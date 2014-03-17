<?php 
	session_start(); 
	ini_set('display_errors', 1); ini_set('error_reporting', E_ALL); error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);
	if(empty($_SESSION["username"])){ 
		header("Location: index.php"); 
	}
	
	$mysqli = new mysqli("www.mischka.info", "mcw", "BobbyLite", "mcw");
	if($mysqli->connect_errno){
		echo "Failed to connect to MySQL: " . $mysqli->connect_errno . " ) " . $mysqli->connect_error;
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
	  $requests = $mysqli->query("select * from users where type = 'resident';");
	  $requestRow = $requests->fetch_assoc();	  
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Residents</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Created</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
				  <?php
					while(!is_null($requestRow)){
				  ?>
						<tr>
						  <td><?= $requestRow["username"] ?></td>
						  <td><?= $requestRow["firstName"] ?></td>
						  <td><?= $requestRow["lastName"] ?></td>
						  <td><?= $requestRow["createdDate"] ?></td>
						  <td><?= $requestRow["status"] ?></td>
						</tr>
						
                <?php
						$requestRow = $requests->fetch_assoc();
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

<?php 
  if($_SESSION["type"] == "admin"){       // ************************************ ADMIN ***********************************************************************
    $requests = $mysqli->query("select * from users where type = 'faculty';");
    $requestRow = $requests->fetch_assoc();   
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Faculty</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Created</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
          <?php
          while(!is_null($requestRow)){
          ?>
            <tr>
              <td><?= $requestRow["username"] ?></td>
              <td><?= $requestRow["firstName"] ?></td>
              <td><?= $requestRow["lastName"] ?></td>
              <td><?= $requestRow["createdDate"] ?></td>
              <td><?= $requestRow["status"] ?></td>
            </tr>
            
                <?php
            $requestRow = $requests->fetch_assoc();
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
