<?php 
	session_start();
	require "init.php";
	
	
	$forms = $mysqli->query("select `formId`, `title` from `forms` where `status`='active';"); //active status
	$formsRow = $forms->fetch_assoc();
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

<?php include 'header.php'; ?>

    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Request Evaluation</h2>
            <form role="form" action="process_request.php" method="post">
<?php 
  if($_SESSION["type"] == "admin" || $_SESSION["type"] == "faculty"){
	  $residents = $mysqli->query("select username, firstName, lastName from users where type='resident';");
	  $residentRow = $residents->fetch_assoc();
?>
              <div class="form-group">
                <label for="resident">Resident</label>
                <select class="form-control" name="resident">
					<?php
						while(!is_null($residentRow)){
							echo "<option value=\"{$residentRow["username"]}\">{$residentRow["firstName"]} {$residentRow["lastName"]}</option>";
							$residentRow = $residents->fetch_assoc();
						}
					?>
                </select>
              </div>
<?php
  }
  if($_SESSION["type"] != "faculty"){
	$faculty = $mysqli->query("select username, firstName, lastName from users where type='faculty';");
	$facultyRow = $faculty->fetch_assoc();
?>
              <div class="form-group">
                <label for="facultyMember">Faculty Member</label>
                <select class="form-control" name="faculty">
					<?php
						while(!is_null($facultyRow)){
							echo "<option value=\"{$facultyRow["username"]}\">{$facultyRow["firstName"]} {$facultyRow["lastName"]}</option>";
							$facultyRow = $faculty->fetch_assoc();
						}
					?>
                </select>
              </div>
<?php
	}
?>
              <div class="form-group">
                <label for="evaluationForm">Evaluation Form</label>
                <select class="form-control" name="evaluationForm">
					<?php
						while(!is_null($formsRow)){
							echo "<option value=\"{$formsRow["formId"]}\">{$formsRow["title"]}</option>";
							$formsRow = $forms->fetch_assoc();
						}
					?>
                </select>
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
  </body>
</html>
