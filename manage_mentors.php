<?php
	//This page is used to add/remove/view mentorships between faculty and residents. It contains a button to add a new mentorship, and a single table that represents all mentorships in the system.

	session_start();
	require "init.php";
	if($_SESSION["type"] !== "admin"){
		header("Location: dashboard.php");
	}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
		include "head.html";
	?>
  </head>

  <body>

<?php require 'header.php'; ?>


<?php
    $mentorships = $mysqli->query("select mentorships.mentorshipId, mentorships.createdDate as mentorshipCreatedDate, faculty.username as facultyUsername, faculty.firstName as facultyFirst, faculty.lastName as facultyLast, resident.username as residentUsername, resident.firstName as residentFirst, resident.lastName as residentLast from mentorships join users faculty on mentorships.faculty=faculty.username join users resident on mentorships.resident=resident.username where faculty.type='faculty' and faculty.status='active' and mentorships.status='active' order by faculty.username;"); // ************************************ FACULTY ***********************************************************************
    $mentorship = $mentorships->fetch_assoc();
    $facultyUsername = "";
    $faculties = $mysqli->query("select * from users where type='faculty' and status='active' order by lastName;");
	$faculty = $faculties->fetch_assoc();
    $residents = $mysqli->query("select * from users where type='resident' and status='active' order by lastName;");
    $resident = $residents->fetch_assoc();
?>
    <div class="container-fluid">
      <div class="row">
        <h2 class="sub-header">Mentorships <button class="btn btn-success btn-xs" data-toggle="modal" data-target=".bs-add-modal" id="addBtn"><span class="glyphicon glyphicon-plus"></span> Add New</button></h2>
          <div class="table-responsive">
            <table class="table table-striped user-table datatable">
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
		$createdDate = new DateTime($mentorship["mentorshipCreatedDate"]);
		$createdDate->setTimezone(new DateTimeZone("America/Chicago"));
?>
				<td><?= $mentorship["mentorshipId"] ?></td>
				<td><?= $mentorship["facultyFirst"]." ".$mentorship["facultyLast"] ?></td>
				<td><?= $mentorship["residentFirst"]." ".$mentorship["residentLast"] ?></td>
				<td><?= $createdDate->format("d-m-Y g:i A") ?></td>
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
          <h4 class="modal-title" id="myModalAdd">Add Mentorship</h4>
        </div>
        <form method="post" action="process_mentorship.php">
        <div class="modal-body">
          <div class="form-group">
            <label for="faculty">Faculty</label>
            <select class="form-control" id="faculty" name="faculty">
            <?php
              while(!is_null($faculty)){
                echo "<option value='{$faculty["username"]}'>{$faculty["lastName"]}, {$faculty["firstName"]}</option>";
                $faculty = $faculties->fetch_assoc();
              }
            ?>
            </select>
          </div>
          <div class="form-group">
            <label for="resident">Resident</label>
            <select class="form-control" id="resident" name="resident">
            <?php
              while(!is_null($resident)){
                echo "<option value='{$resident["username"]}'>{$resident["lastName"]}, {$resident["firstName"]}</option>";
                $resident = $residents->fetch_assoc();
              }
            ?>
            </select>
          </div>
        </div>
        <div class="modal-footer modal-disable">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-success">Confirm</button>
        </div>
      </form>
      </div>
    </div>
  </div>

<!-- Remove Modal -->
    <div class="modal fade bs-remove-modal" tabindex="-1" role="dialog" aria-labelledby="modalRemove" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalRemove">Disable Mentorship</h4>
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

	<?php
		include "scripts.html";
	?>
    <script>
		$("table").on("click", ".removeMentorship", function(){
			var mentorshipId = $(this).data("id");
			$("#mentorshipId").val(mentorshipId);
		});

		$(document).ready(function(){
		  $(".datatable").each(function(){
			  $(this).dataTable({
				  "order": [[0, "desc"]],
				"dom": "lfprtip",
				stateSave: true	  
			  });
		  });
		});
    </script>
  </body>
</html>
