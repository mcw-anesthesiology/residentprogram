<?php 
	session_start();
	require "init.php";

  $stats_One = $mysqli->query("select status, count(status) as total from requests where status in ('complete','pending','disabled') group by status;");
  $stats_Two = $mysqli->query("select u.firstName, u.lastName, count(r.status) as pending from users u, requests r where u.username = r.faculty and r.status = 'pending' group by u.username order by pending desc limit 3;");
  $stats_Three = $mysqli->query("select u.firstName, u.lastName, r.completeDate from users u, requests r where u.username = r.resident and r.status not in ('pending','disabled') group by u.userName order by r.completeDate limit 3;");
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

<?php require 'header.php'; ?>

<?php 
  if($_SESSION["type"] == "admin"){
	require "dashboard_admin.php";
  }
  else if($_SESSION["type"] == "faculty"){
	require "dashboard_faculty.php";
  }
  else if($_SESSION["type"] == "resident"){	
	require "dashboard_resident.php";
  }
?>

<!-- Canceled Modal Resident-->
<div class="modal fade bs-cancel-resident-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalCancelResident" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalCancelResident">Cancel Evaluation</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>cancel</b> the selected evaluation. Would you like to continue?
      </div>
      <div class="modal-footer modal-cancel-resident">
    <form method="post" action="cancel_evaluation_resident.php">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-danger" id="requestId" name="requestId" value="">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Canceled Modal Faculty-->
<div class="modal fade bs-cancel-faculty-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalCancelFaculty" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalCancelFaculty">Cancel Evaluation</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>cancel</b> the selected evaluation. Would you like to continue?
      </div>
      <div class="modal-footer modal-cancel-faculty">
    <form method="post" action="cancel_evaluation_faculty.php">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button type="submit" class="btn btn-danger" id="requestId" name="requestId" value="">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="../../assets/js/docs.min.js"></script>
    <script type="text/javascript" src="bootstrap/js/jquery.tablesorter.min.js"></script>
    <script>
    $(document).on("click", ".cancelEvalResident", function(){
      var requestId = $(this).data('id');
      $(".modal-cancel-resident #requestId").val(requestId);
    });
    
    $(document).on("click", ".cancelEvalFaculty", function(){
      var requestId = $(this).data('id');
      $(".modal-cancel-faculty #requestId").val(requestId);
    }); 

    $(function(){
      $('#keywordsAll').tablesorter(); 
    });

    $(function(){
      $('#keywordsPending').tablesorter(); 
    });

    $(function(){
      $('#keywordsComplete').tablesorter(); 
    });
    </script>
  </body>
</html>
