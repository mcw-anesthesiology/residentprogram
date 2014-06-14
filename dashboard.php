<?php 
	//This is the main homepage for all users. For compartmentalization purposes, the user-type specific code is stored in dashboard_[user-type].php. 

	//TODO: Change favicon links to favicon.png or change filename to favicon.ico
	//TODO: Better sql security, parsing inputs and prepared statements
	//TODO: Email notification functionality
	//TODO: Show evaluation title and training level in all request tables
	//TODO: Include in all header statements a success/failure get attribute
	//TODO:	Store question weight in a new table and not in xml so it can be changed whenever
	//TODO: Adjust datatable pagination so that every single request isn't queried at once
	
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
    <link rel="shortcut icon" href="favicon.ico">

    <title><?php echo ucfirst($_SESSION["type"])." Dashboard"; ?></title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="dashboard.css" rel="stylesheet">
    <link href="http://cdn.datatables.net/1.10.0/css/jquery.dataTables.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style>
		.view, .complete, span { cursor: pointer }
		
    </style>
  </head>

  <body>

<?php require 'header.php'; ?>

<?php 
	//Main dashboard code is split into a separate file unique to each user type
  if($_SESSION["type"] == "admin"){
	require "dashboard_admin.php";
  }
  else if($_SESSION["type"] == "faculty"){
	require "dashboard_faculty.php";
  }
  else if($_SESSION["type"] == "resident"){	
	require "dashboard_resident.php";
  }
  //print $user->data['username'];
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
    <script type="text/javascript" src="http://cdn.datatables.net/1.10.0/js/jquery.dataTables.js"></script>
    <script>
		$(document).on("click", ".cancelEvalResident", function(){
		  var requestId = $(this).data('id');
		  $(".modal-cancel-resident #requestId").val(requestId);
		});
		
		$(document).on("click", ".cancelEvalFaculty", function(){
		  var requestId = $(this).data('id');
		  $(".modal-cancel-faculty #requestId").val(requestId);
		}); 
		
		$("tbody").on("click", ".view", function(){
			//Sets entire table rows clickable instead of just the ID hyperlink on the leftmost columns
			var requestId = $(this).parent().data("id");
			window.location.href = "view_specific.php?request="+requestId;
		});
		
		$("tbody").on("click", ".complete", function(){
			//Sets entire table rows clickable instead of just the ID hyperlink on the leftmost columns
			var requestId = $(this).parent().data("id");
			window.location.href = "complete_specific.php?request="+requestId;
		});

		$(document).ready(function(){
		  $(".datatable").each(function(){
			  //Enables the datatable functionality that supports the sorting and searching functionality in the tables
			$(this).dataTable(); 
		  });
		});
    </script>
  </body>
</html>
