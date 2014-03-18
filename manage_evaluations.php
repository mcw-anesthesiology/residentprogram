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
  if($_SESSION["type"] == "admin"){       // ************************************ ADMIN ***********************************************************************
    $requests = $mysqli->query("select * from requests;");
    $requestRow = $requests->fetch_assoc();   
?>
    <div class="container-fluid">
      <div class="row">
        <h2 class="sub-header">Manage Evaluations</h2>
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
          <?php
          while(!is_null($requestRow)){
          ?>
            <tr>
              <td><a href="complete_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
              <td><?= $requestRow["requestedBy"] ?></td>
              <td><?= $requestRow["faculty"] ?></td>
              <td><?= $requestRow["requestDate"] ?></td>
              <td><?= $requestRow["completeDate"] ?></td>
              <td><?= $requestRow["status"] ?></td>
              <?php
                if($requestRow["status"] == "disabled"){
              ?>
                <td><a href="#" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-ok"></span> Enable</a></td>
              <?php
                }
                else{
              ?>
                <td><a href="#" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Disable</a></td>
              <?php
                }
              ?>
            </tr>
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
