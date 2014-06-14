<?php
	//This page is the main dashboard for all faculty users. It is included by dashboard.php and includes a table of all pending requests for the logged in user at the top.
	//Below that, it shows a table of evaluations for each of the user's mentees. Finally, it shows a table for all non-disabled evaluations completed by the user.
	
	  $requests = $mysqli->query("select * from requests left join forms on requests.formId=forms.formId left join users on requests.resident=users.username where faculty='{$_SESSION["username"]}' and requests.status='pending' order by requestId asc;");
	  $requestRow = $requests->fetch_assoc();
	  
?>
	<!-- *********************************** PENDING REQUESTS ****************************** -->
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Pending Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped datatable" id="keywordsPending" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortUp"><span>#</span></th>
                  <th><span>Resident</span></th>
                  <th><span>Evaluation Form</span></th>
                  <th><span>Request Date</span></th>
                  <th><span>Action</span></th>
                </tr>
              </thead>
              <tbody>
				  <?php
						while(!is_null($requestRow)){
							$requestDate = new DateTime($request["requestDate"]);
							$requestDate->setTimezone(new DateTimeZone("America/Chicago"));
				  ?>
							<tr class="complete" data-id="<?= $requestRow["requestId"] ?>">
							  <td class="lalign"><a href="complete_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["firstName"] ?> <?= $requestRow["lastName"] ?></td>
							  <td><?= $requestRow["title"] ?></td>
							  <td><?= $requestDate->format("Y-m-d H:i:s") ?></td>
							  <?php if($requestRow["requestedBy"] == $_SESSION["username"]){?>
								<td><button class="cancelEvalFaculty btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-cancel-faculty-modal-sm" data-id="<?= $requestRow["requestId"] ?>"><span class="glyphicon glyphicon-remove"></span> Cancel</button></td>
							  <?php } else echo "<td></td>"; ?>
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
		$menteeRequests = $mysqli->query("select requestId, title, requestDate, completeDate, requests.status, requests.resident, faculty.firstName as facultyFirst, faculty.lastName as facultyLast, resident.firstName as residentFirst, resident.lastName as residentLast from requests join forms on requests.formId=forms.formId join users as resident on requests.resident=resident.username join users as faculty on requests.faculty=faculty.username join mentorships on mentorships.resident=requests.resident where mentorships.faculty='{$_SESSION["username"]}' and mentorships.status='active' and requests.status!='disabled' order by mentorships.resident, requestId asc;");
		$menteeRequest = $menteeRequests->fetch_assoc();
		while(!is_null($menteeRequest)){
			$mentee = $menteeRequest["resident"];
			$requestDate = new DateTime($menteeRequest["requestDate"]);
			$requestDate->setTimezone(new DateTimeZone("America/Chicago"));
			$completeDate = new DateTime($menteeRequest["completeDate"]);
			$completeDate->setTimezone(new DateTimeZone("America/Chicago"));
?>
	<!-- *********************************** MENTEE EVALUATIONS ****************************** -->
	<div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Requests -- <?= $menteeRequest["residentFirst"] ?> <?= $menteeRequest["residentLast"] ?></h2>
          <div class="table-responsive">
            <table class="table table-striped datatable" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortUp"><span>#</span></th>
                  <th><span>Faculty</span></th>
                  <th><span>Evaluation Form</span></th>
                  <th><span>Request Date</span></th>
                  <th><span>Completion Date</span></th>
                  <th><span>Status</span></th>
                </tr>
              </thead>
              <tbody>
				  <?php
						while($menteeRequest["resident"] == $mentee){
				  ?>
							<tr class="view" data-id="<?= $menteeRequest["requestId"] ?>">
							  <td class="lalign"><a href="view_specific.php?request=<?= $menteeRequest["requestId"] ?>"><?= $menteeRequest["requestId"] ?></a></td>
							  <td><?= $menteeRequest["facultyFirst"] ?> <?= $menteeRequest["facultyLast"] ?></td>
							  <td><?= $menteeRequest["title"] ?></td>
							  <td><?= $requestDate->format("Y-m-d H:i:s") ?></td>
							  <td><?= $completeDate->format("Y-m-d H:i:s") ?></td>
							  <td><?= $menteeRequest["status"] ?></td>
							</tr>
					<?php
						$menteeRequest = $menteeRequests->fetch_assoc();
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
		$requests = $mysqli->query("select * from requests left join forms on requests.formId=forms.formId left join users on requests.resident=users.username where faculty='{$_SESSION["username"]}' and requests.status='complete' order by completeDate desc;");
		$requestRow = $requests->fetch_assoc();
		
		$requestDate = new DateTime($requestRow["requestDate"]);
		$requestDate->setTimezone(new DateTimeZone("America/Chicago"));
		$completeDate = new DateTime($requestRow["completeDate"]);
		$completeDate->setTimezone(new DateTimeZone("America/Chicago"));
?>
	<!-- *********************************** FACULTY EVALUATIONS ****************************** -->
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Completed Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped datatable" id="keywordsComplete" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortUp"><span>#</span></th>
                  <th><span>Resident</span></th>
                  <th><span>Evaluation Form</span></th>
                  <th><span>Request Date</span></th>
                  <th><span>Completion Date</span></th>
                </tr>
              </thead>
              <tbody>
				  <?php
						while(!is_null($requestRow)){
				  ?>
							<tr class="view" data-id="<?= $requestRow["requestId"] ?>">
							  <td class="lalign"><a href="view_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["firstName"] ?> <?= $requestRow["lastName"] ?></td>
							  <td><?= $requestRow["title"] ?></td>
							  <td><?= $requestDate->format("Y-m-d H:i:s") ?></td>
							  <td><?= $completeDate->format("Y-m-d H:i:s") ?></td>
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
