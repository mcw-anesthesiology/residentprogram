<?php 
	//This page is used to add/edit milestones and competencies. It contains a button to add a new milestone and a table representing all milestones in the system, and likewise for competencies.

  session_start(); 
  require "init.php";
  if($_SESSION["type"] !== "admin"){
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
  </head>
  <body>

<?php require 'header.php'; ?>

<?php 
  if($_SESSION["type"] == "admin"){       
    $milestones = $mysqli->query("select * from milestones;");
    $competencies = $mysqli->query("select * from competencies;");
    $milestone = $milestones->fetch_assoc(); 
    $competency = $competencies->fetch_assoc();    
?>
  <div class="container-fluid">
    <div class="row">
      <h2 class="sub-header">Milestones  <button class="addMSModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-addMS-modal" data-id="Milestone" id="addMSBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
      <div class="table-responsive">
        <table class="table table-striped user-table datatable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
<?php
    while(!is_null($milestone)){
		$numMilestonesQuestions = $mysqli->query("select * from milestones_questions where milestoneId='{$milestone["milestoneId"]}';")->num_rows;
		
?>
            <tr>
              <td class="title"><?= $milestone["title"] ?></td>
              <td class="description"><?= $milestone["description"] ?></td>  
              <td>
				<button class="editMilestone btn btn-info btn-xs" data-toggle="modal" data-target=".bs-editMS-modal" data-id="<?= $milestone["milestoneId"] ?>" id="editBtn"><span class="glyphicon glyphicon-edit"></span> Edit</button>
					<?php
						if($numMilestonesQuestions === 0){
					?>
						<button class="deleteMilestone btn btn-info btn-xs" data-toggle="modal" data-target=".bs-deleteMS-modal" data-id="<?= $milestone["milestoneId"] ?>" id="deleteBtn"><span class="glyphicon glyphicon-remove"></span> Delete</button>
					<?php
						}
					?>
              </td>  
            </tr>         
<?php
      $milestone = $milestones->fetch_assoc();
    }
?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  <div class="container-fluid">
    <div class="row">
      <h2 class="sub-header">Competencies  <button class="addCModal btn btn-success btn-xs" data-toggle="modal" data-target=".bs-addC-modal" data-id="Competency" id="addCBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
      <div class="table-responsive">
        <table class="table table-striped user-table datatable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
<?php
    while(!is_null($competency)){
		$numCompetenciesQuestions = $mysqli->query("select * from competencies_questions where competencyId='{$competency["competencyId"]}';")->num_rows;
?>
            <tr>
              <td class="title"><?= $competency["title"] ?></td>
              <td class="description"><?= $competency["description"] ?></td>
              <td>
				  <button class="editCompetency btn btn-info btn-xs" data-toggle="modal" data-target=".bs-editC-modal" data-id="<?= $competency["competencyId"] ?>" id="editBtn"><span class="glyphicon glyphicon-edit"></span> Edit</button>
				  <?php
						if($numCompetenciesQuestions === 0){
					?>
						<button class="deleteCompetency btn btn-info btn-xs" data-toggle="modal" data-target=".bs-deleteC-modal" data-id="<?= $competency["competencyId"] ?>" id="deleteBtn"><span class="glyphicon glyphicon-remove"></span> Delete</button>
					<?php
						}
					?>
              </td>  
            </tr>         
<?php
      $competency = $competencies->fetch_assoc();
    }
  }
?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- Add Milestone Modal -->
<div class="modal fade bs-addMS-modal" tabindex="-1" role="dialog" aria-labelledby="modalAddMS" aria-hidden="true" id="addMSModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalAddMS">Add Milestone</h4>
      </div>
      <form method="post" action="process_milestone.php">
        <div class="modal-body modal-addMS">
          <div class="form-group">
            <label for="milestoneTitle">Milestone Title</label>
            <input type="text" class="form-control" id="milestoneTitle" name="milestoneTitle" placeholder="Title" required>
          </div>
          <div class="form-group">
            <label for="milestoneDescription">Milestone Description</label>
            <input type="text" class="form-control" id="milestoneDescription" name="milestoneDescription" placeholder="Description" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success" value="">Add</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Edit Milestone Modal -->
<div class="modal fade bs-editMS-modal" tabindex="-1" role="dialog" aria-labelledby="modalAddMS" aria-hidden="true" id="editMSModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalEditMS">Edit Milestone</h4>
      </div>
      <form method="post" action="edit_milestone.php">
        <div class="modal-body modal-addMS">
          <div class="form-group">
            <label for="milestoneTitle">Milestone Title</label>
            <input type="text" class="form-control" id="milestoneTitle" name="milestoneTitle" placeholder="Title" required>
          </div>
          <div class="form-group">
            <label for="milestoneDescription">Milestone Description</label>
            <input type="text" class="form-control" id="milestoneDescription" name="milestoneDescription" placeholder="Description" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success" id="submit" name="milestoneId" value="">Edit</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Delete Milestone Modal -->
<div class="modal fade bs-deleteMS-modal" tabindex="-1" role="dialog" aria-labelledby="modalAddMS" aria-hidden="true" id="deleteMSModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalDeleteMS">Delete Milestone</h4>
      </div>
      <form method="post" action="delete_milestone.php">
        <div class="modal-body modal-addMS">
          Are you sure you want to delete this milestone? This cannot be undone.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-danger" id="submit" name="milestoneId" value="">Delete</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Add Competency Modal -->
<div class="modal fade bs-addC-modal" tabindex="-1" role="dialog" aria-labelledby="modalAddC" aria-hidden="true" id="addCModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalAddC">Add Competency</h4>
      </div>
      <form method="post" action="process_competency.php">
        <div class="modal-body modal-addC">
          <div class="form-group">
            <label for="competencyTitle">Competency Title</label>
            <input type="text" class="form-control" id="competencyTitle" name="competencyTitle" placeholder="Title" required>
          </div>
          <div class="form-group">
            <label for="competencyDescription">Competency Description</label>
            <input type="text" class="form-control" id="competencyDescription" name="competencyDescription" placeholder="Description" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success" value="">Add</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Edit Competency Modal -->
<div class="modal fade bs-editC-modal" tabindex="-1" role="dialog" aria-labelledby="modalEditC" aria-hidden="true" id="editCModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalEditC">Edit Competency</h4>
      </div>
      <form method="post" action="edit_competency.php">
        <div class="modal-body modal-EditC">
          <div class="form-group">
            <label for="competencyTitle">Competency Title</label>
            <input type="text" class="form-control" id="competencyTitle" name="competencyTitle" placeholder="Title" required>
          </div>
          <div class="form-group">
            <label for="competencyDescription">Competency Description</label>
            <input type="text" class="form-control" id="competencyDescription" name="competencyDescription" placeholder="Description" required>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success" id="submit" name="competencyId" value="">Edit</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Delete Competency Modal -->
<div class="modal fade bs-deleteC-modal" tabindex="-1" role="dialog" aria-labelledby="modalDeleteC" aria-hidden="true" id="deleteCModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalDeleteC">Edit Competency</h4>
      </div>
      <form method="post" action="delete_competency.php">
        <div class="modal-body modal-deleteC">
			Are you sure you want to delete this competency? This cannot be undone.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-danger" id="submit" name="competencyId" value="">Delete</button>
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
<script type="text/javascript" src="http://cdn.datatables.net/1.10.0/js/jquery.dataTables.js"></script>
<script>
	$(document).ready(function(){
		$(".editMilestone").click(function(){
			var milestoneId = $(this).data("id");
			var milestoneTitle = $(this).parent().siblings(".title")[0].innerHTML;
			var milestoneDescription = $(this).parent().siblings(".description")[0].innerHTML;
			
			$("#editMSModal").find("#submit").val(milestoneId);
			$("#editMSModal").find("#milestoneTitle").val(milestoneTitle);
			$("#editMSModal").find("#milestoneDescription").val(milestoneDescription);
		});
		
		$(".editCompetency").click(function(){
			var competencyId = $(this).data("id");
			var competencyTitle = $(this).parent().siblings(".title")[0].innerHTML;
			var competencyDescription = $(this).parent().siblings(".description")[0].innerHTML;
			
			$("#editCModal").find("#submit").val(competencyId);
			$("#editCModal").find("#competencyTitle").val(competencyTitle);
			$("#editCModal").find("#competencyDescription").val(competencyDescription);			
		});
		
		$(".datatable").each(function(){
			$(this).dataTable(); 
		});
	});
</script>
</body>
</html>
