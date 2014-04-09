<?php 
  session_start(); 
  require "init.php";

  $forms = $mysqli->query("select `formId`, `title` from `forms`;");
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

<?php require 'header.php'; ?>

<?php 
  if($_SESSION["type"] == "admin"){       // ************************************ ADMIN ***********************************************************************
    $requests = $mysqli->query("select requestId, resident, faculty, requestDate, completeDate, requestedBy, requests.status, title, residentUsers.firstName as residentFirst, residentUsers.lastName as residentLast, facultyUsers.firstName as facultyFirst, facultyUsers.lastName as facultyLast, requestedByUsers.firstName as requestedByFirst, requestedByUsers.lastName as requestedByLast from requests left join forms on requests.formId=forms.formId left join users residentUsers on resident=residentUsers.username left join users facultyUsers on faculty=facultyUsers.username left join users requestedByUsers on requestedBy=requestedByUsers.username order by requestId desc;");
    $request = $requests->fetch_assoc();   
?>
    <div class="container-fluid">
      <div class="row">
        <h2 class="sub-header">Manage Evaluations <button class="addEval btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" data-id="eval" id="addBtn"><span class="glyphicon glyphicon-plus"></span> New Evaluation Form</button> <button class="addMSC btn btn-success btn-xs" data-toggle="modal" data-target=".bs-milestone-modal" data-id="eval" id="addMSCBtn"><span class="glyphicon glyphicon-plus"></span> New Milestone</button> <button class="addMSC btn btn-success btn-xs" data-toggle="modal" data-target=".bs-competency-modal" data-id="eval" id="addMSCBtn"><span class="glyphicon glyphicon-plus"></span> New Competency</button></h2>
          <div class="table-responsive">
            <table class="table table-striped" id="keywordsAll" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortDown"><span>#</span></th>
                  <th><span>Requested By</span></th>
                  <th><span>Resident</span></th>
                  <th><span>Faculty</span></th>
                  <th><span>Request Date</span></th>
                  <th><span>Complete Date</span></th>
                  <th><span>Status</span></th>
                  <th><span>Action</span></th>
                </tr>
              </thead>
              <tbody>
          <?php
          while(!is_null($request)){
          ?>
            <tr>
              <td><a href="view_specific.php?request=<?= $request["requestId"] ?>"><?= $request["requestId"] ?></a></td>
              <td><?= $request["requestedByFirst"] ?> <?= $request["requestedByLast"] ?></td>
              <td><?= $request["residentFirst"] ?> <?= $request["residentLast"] ?></td>
              <td><?= $request["facultyFirst"] ?> <?= $request["facultyLast"] ?></td>
              <td><?= $request["requestDate"] ?></td>
              <td><?= $request["completeDate"] ?></td>
<?php
  if($request["status"] == "complete"){
?>
              <td><span class="badge badge-complete"><?= $request["status"] ?></span></td>
<?php
  }
  else if($request["status"] == "pending"){
?>
              <td><span class="badge badge-pending"><?= $request["status"] ?></span></td>
<?php
  }
  else{
?>
              <td><span class="badge badge-disabled"><?= $request["status"] ?></span></td>
<?php
  }
?>
              <?php
                if($request["status"] == "disabled"){
              ?>
                <td><button class="enableEval btn btn-success btn-xs" data-toggle="modal" data-target=".bs-enable-modal-sm" data-id="<?= $request["requestId"] ?>"><span class="glyphicon glyphicon-ok"></span> Enable</button></td>
              <?php
                }
                else{
              ?>
                <td><button class="disableEval btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-disable-modal-sm" data-id="<?= $request["requestId"] ?>"><span class="glyphicon glyphicon-remove"></span> Disable</button></td>
              <?php
                }
              ?>
            </tr>
<?php
$request = $requests->fetch_assoc();
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

<!-- Disable Modal -->
<div class="modal fade bs-disable-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalDisable" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalDisable">Disable Evaluation</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>disable</b> the selected evaluation. Would you like to continue?
      </div>
      <div class="modal-footer modal-disable">
		<form method="post" action="disable_evaluation.php">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-danger" id="requestId" name="requestId" value="">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Enable Modal -->
<div class="modal fade bs-enable-modal-sm" tabindex="-1" role="dialog" aria-labelledby="modalEnable" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalEnable">Enable Evaluation</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>enable</b> the selected evaluation. Would you like to continue?
      </div>
      <div class="modal-footer modal-enable">
		<form method="post" action="enable_evaluation.php">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-success" id="requestId" name="requestId" value="">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Milestone Modal -->
<div class="modal fade bs-milestone-modal" tabindex="-1" role="dialog" aria-labelledby="modalMSC" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalMSC">New Milestone</h4>
      </div>
      <form method="post" action="process_milestone.php">
      <div class="modal-body modal-msc">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="milestoneTitle" name="milestoneTitle" placeholder="Milestone title">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" class="form-control" id="milestoneDescription" name="milestoneDescription" placeholder="Milestone description">
        </div>
      </div>
      <div class="modal-footer modal-msc">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-success" id="" name="" value="">Add</button>
      </form>
      </div>
    </div>
  </div>
</div>

<!-- Competency Modal -->
<div class="modal fade bs-competency-modal" tabindex="-1" role="dialog" aria-labelledby="modalMSC" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalMSC">New Competency</h4>
      </div>
      <form method="post" action="process_competency.php">
      <div class="modal-body modal-msc">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="competencyTitle" name="competencyTitle" placeholder="Competency title">
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input type="text" class="form-control" id="competencyDescription" name="competencyDescription" placeholder="Competency description">
        </div>
      </div>
      <div class="modal-footer modal-msc">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-success" id="" name="" value="">Add</button>
      </form>
      </div>
    </div>
  </div>
</div>

<!-- Add Modal -->
<div class="modal fade bs-add-modal" tabindex="-1" role="dialog" aria-labelledby="modalAdd" aria-hidden="true" id="addModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalAdd">Evaluation Builder</h4>
      </div>
      <form action="form_builder.php" method="post">
        <div class="modal-body modal-add">
		  <!--
          <div class="form-group">
            <label for="evaluationForm">Please select a form to duplicate and modify</label>
            <select class="form-control">
				<?php
			//	while(!is_null($formsRow)){
			//	echo "<option value=\"{$formsRow["formId"]}\">{$formsRow["title"]}</option>";
			//	$formsRow = $forms->fetch_assoc();
			//	}
				?>
            </select>
            <br />
              <div class="span7 text-center">
				<button type="submit" class="btn btn-success">Choose</button>
			  </div>
          </div>

          <div class="select-or">
            <hr class="hr-or">
            <span class="span-or">or</span>
          </div>
		  -->
          <div class="form-group">
			<div class="span7 text-center">
				<button type="submit" class="btn btn-success">Create new evaluation form</button>
			</div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
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
    <script type="text/javascript" src="bootstrap/js/jquery.tablesorter.min.js"></script>
    <script>
		$(document).on("click", ".disableEval", function(){
			var requestId = $(this).data('id');
			$(".modal-disable #requestId").val(requestId);
		});
		
		$(document).on("click", ".enableEval", function(){
			var requestId = $(this).data('id');
			$(".modal-enable #requestId").val(requestId);
		});	

    $(function(){
      $('#keywordsAll').tablesorter(); 
    });	
    </script>
  </body>
</html>
