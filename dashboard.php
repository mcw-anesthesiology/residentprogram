<?php
	//This is the main homepage for all users. For compartmentalization purposes, the user-type specific code is stored in dashboard_[user-type].php.

	//TODO: Email notification functionality
	//TODO: Show evaluation title and training level in all request tables
	//TODO: Error messages corresponding to success attributes
	//TODO:	Store question weight in a new table and not in xml so it can be changed whenever
	//TODO: Adjust datatable pagination so that every single request isn't queried at once

	session_start();
	require "init.php";

?>
<!DOCTYPE html>
<html lang="en">
  <head>
	<?php
		include "head.html";
	?>
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


<!-- Request Error Modal -->
    <div class="modal fade bs-request-error-modal" tabindex="-1" role="dialog" aria-labelledby="modalError" aria-hidden="true" id="errorRequestModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header alert alert-danger">
					<h3><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Request Error</h3>   					
				</div>
				<div class="modal-body">
					There was an error processing the request. Please try again.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
            </div>
        </div>
    </div>

    <?php
		include "scripts.html";
	?>
    <script>
		$(document).on("click", ".cancelEvalResident", function(){
		  var requestId = $(this).data('id');
		  $(".modal-cancel-resident #requestId").val(requestId);
		});

		$(document).on("click", ".cancelEvalFaculty", function(){
		  var requestId = $(this).data('id');
		  $(".modal-cancel-faculty #requestId").val(requestId);
		});

		$("table").on("click", ".view", function(){
			//Sets entire table rows clickable instead of just the ID hyperlink on the leftmost columns
			var requestId = $(this).parents("tr").children("td").eq(0).children("a").html();
	//		var table = $(this).parents("table").attr("id");
	//		var filter = $("#"+table+"_filter").find("input").val();
	//		var page = $(this).parents("table").DataTable().page();
	//		document.cookie = "filter="+filter;
	//		document.cookie = "table="+table;
	//		document.cookie = "tablePage="+page;
			window.location.href = "view_specific.php?request="+requestId;
		});

		$("table").on("click", ".complete", function(){
			//Sets entire table rows clickable instead of just the ID hyperlink on the leftmost columns
			var requestId = $(this).parents("tr").children("td").eq(0).children("a").html();
			window.location.href = "complete_specific.php?request="+requestId;
		});

		$(document).ready(function(){
		  $(".datatable").each(function(){
			  //Enables the datatable functionality that supports the sorting and searching functionality in the tables
			  $(this).DataTable({
				"order": [[0, "desc"]],
				"dom": "lfprtip",
				stateSave: true  		
			  });
		  });
<?php if($_SESSION["type"] == "admin"){ ?>
		  $(".datatable-admin").DataTable({
				"ajax": "dashboard_json_admin.php",
					deferRedering: true,
					"order": [[0, "desc"]],
					stateSave: true,
					"dom": "lfprtip",
					"createdRow": function(row, data, index){
						$("td", row).addClass("view");
					}
		  });
<?php } ?>
		});

//		$(window).load(function(){
//		  var table = document.cookie.replace(/(?:(?:^|.*;\s* )table\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//		  var filter = document.cookie.replace(/(?:(?:^|.*;\s* )filter\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//		  var page = parseInt(document.cookie.replace(/(?:(?:^|.*;\s* )tablePage\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
//		  alert(page);
//		  $("#"+table).DataTable().search(filter).page(page).draw(false);
//		  document.cookie = "filter=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
//		  document.cookie = "table=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
//		  document.cookie = "tablePage=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
//		});

<?php
	if(isset($_GET["request"]) && $_GET["request"] == "false"){
?>
	$(window).load(function(){
		$("#errorRequestModal").modal("show");
	});
<?php
	}
?>
    </script>
  </body>
</html>
