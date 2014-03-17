<?php 
	session_start();
	require "init.php";
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
                  <th>#</th>
                  <th>Resident</th>
                  <th>Faculty</th>
                  <th>Request Date</th>
                  <th>Complete Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
				  <?php
					while(!is_null($requestRow)){
				  ?>
						<tr>
						  <td><a href="complete_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
						  <td><?= $requestRow["resident"] ?></td>
						  <td><?= $requestRow["faculty"] ?></td>
						  <td><?= $requestRow["requestDate"] ?></td>
						  <td><?= $requestRow["completeDate"] ?></td>
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
  else if($_SESSION["type"] == "faculty"){  	// ************************************ FACULTY ***********************************************************************
	  $requests = $mysqli->query("select * from requests where faculty='{$_SESSION["username"]}' and status='pending' order by requestId asc;");
	  $requestRow = $requests->fetch_assoc();
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Pending Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Resident</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
				  <?php
						while(!is_null($requestRow)){
				  ?>
							<tr>
							  <td><a href="complete_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["resident"] ?></td>
							  <td><?= $requestRow["requestDate"] ?></td>
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
		$requests = $mysqli->query("select * from requests where faculty='{$_SESSION["username"]}' and status='complete' order by requestId desc;");
		$requestRow = $requests->fetch_assoc();
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Completed Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Resident</th>
                  <th>Request Date</th>
                  <th>Completion Date</th>
                </tr>
              </thead>
              <tbody>
				  <?php
						while(!is_null($requestRow)){
				  ?>
							<tr>
							  <td><a href="view_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["resident"] ?></td>
							  <td><?= $requestRow["requestDate"] ?></td>
							  <td><?= $requestRow["completeDate"] ?></td>
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
  else if($_SESSION["type"] == "resident"){			// ************************************ RESIDENT ***********************************************************************
	  $requests = $mysqli->query("select * from requests where resident='{$_SESSION["username"]}' and status='pending' order by requestId asc;");
	  $requestRow = $requests->fetch_assoc();
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Pending Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Faculty</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
				   <?php
						while(!is_null($requestRow)){
				  ?>
							<tr>
							  <td><a href="view_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["faculty"] ?></td>
							  <td><?= $requestRow["requestDate"] ?></td>
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
		$requests = $mysqli->query("select * from requests where resident='{$_SESSION["username"]}' and status='complete' order by requestId desc;");
		$requestRow = $requests->fetch_assoc();
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Completed Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Faculty</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
				  <?php
						while(!is_null($requestRow)){
				  ?>
							<tr>
							  <td><a href="view_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["faculty"] ?></td>
							  <td><?= $requestRow["requestDate"] ?></td>
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
