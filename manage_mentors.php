<?php 
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
    $mentorships = $mysqli->query("select mentorships.mentorshipId, mentorships.createdDate as mentorshipCreatedDate, faculty.username as facultyUsername, faculty.firstName as facultyFirst, faculty.lastName as facultyLast, resident.username as residentUsername, resident.firstName as residentFirst, resident.lastName as residentLast from mentorships join users faculty on mentorships.faculty=faculty.username join users resident on mentorships.resident=resident.username where faculty.type='faculty' and faculty.status='active' and mentorships.status='active' order by faculty.username;"); // ************************************ FACULTY ***********************************************************************
    $mentorship = $mentorships->fetch_assoc();
    $facultyUsername = "";
    $faculties = $mysqli->query("select * from users where type='faculty' and status='active';");
	$faculty = $faculties->fetch_assoc();
    $residents = $mysqli->query("select * from users where type='resident' and status='active';");
    $resident = $residents->fetch_assoc();
?>
    <div class="container-fluid">
      <div class="row">
        <h2 class="sub-header">Mentorships <button class="btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
          <div class="table-responsive">
            <table class="table table-striped user-table">
              <thead>
                <tr>
				  <th>#</th>
                  <th>Faculty</th>
                  <th>Resident</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
			  <tr>
<?php
	while(!is_null($mentorship)){
?>
				<td><?= $mentorship["mentorshipId"] ?></td>
				<td><?= $mentorship["facultyFirst"]." ".$mentorship["facultyLast"] ?></td>	
				<td><?= $mentorship["residentFirst"]." ".$mentorship["residentLast"] ?></td>
				<td><?= $mentorship["mentorshipCreatedDate"] ?></td>
				<td><button class="removeMentorship btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-remove-modal" id="rmvBtn" data-id=<?= $mentorship["mentorshipId"] ?>><span class="glyphicon glyphicon-remove"></span> Remove</button></td>
            </tr>            
<?php
	$mentorship = $mentorships->fetch_assoc();
	}
?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

<!-- Add Modal -->
<div class="modal fade bs-add-modal" tabindex="-1" role="dialog" aria-labelledby="modalAdd" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalAdd">Disable Account</h4>
      </div>
      <form method="post" action="process_mentorship.php">
        <div class="modal-body">
			<select class="form-control" name="faculty">
				<?php
					while(!is_null($faculty)){
						echo "<option value='{$faculty["username"]}'>{$faculty["firstName"]} {$faculty["lastName"]}</option>";
						$faculty = $faculties->fetch_assoc();
					}
				?>
			</select>
			<select class="form-control" name="resident">
				<?php
					while(!is_null($resident)){
						echo "<option value='{$resident["username"]}'>{$resident["firstName"]} {$resident["lastName"]}</option>";
						$resident = $residents->fetch_assoc();
					}
				?>
			</select>
          </div>
        <div class="modal-footer modal-disable">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-success">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Remove Modal -->
<div class="modal fade bs-remove-modal" tabindex="-1" role="dialog" aria-labelledby="modalRemove" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="myModalRemove">Disable Account</h4>
      </div>
      <div class="modal-body">
        You have selected to <b>remove</b> the selected mentorship. Would you like to continue?
      </div>
      <div class="modal-footer modal-disable">
		<form method="post" action="process_mentorship.php">
			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			<button type="submit" class="btn btn-danger" id="mentorshipId" name="mentorshipId" value="">Confirm</button>
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
    <script>
		$("table").on("click", ".removeMentorship", function(){
			var mentorshipId = $(this).data("id");
			$("#mentorshipId").val(mentorshipId);
		});
    </script>
  </body>
</html>
