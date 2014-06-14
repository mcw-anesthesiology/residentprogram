<?php
	//This page is the main dashboard for all resident users. It is included by dashboard.php and includes a table for all pending evaluations for the resident,
	//and another table for all completed evaluations for the resident.
	  $requests = $mysqli->query("select * from requests left join forms on requests.formId=forms.formId left join users on requests.faculty=users.username where requests.resident='{$_SESSION["username"]}' and requests.status='pending' order by requestId asc;");
	  $requestRow = $requests->fetch_assoc();
	  
	  $requestDate = new DateTime($requestRow["requestDate"]);
	  $requestDate->setTimezone(new DateTimeZone("America/Chicago"));
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Pending Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped datatable" id="keywordsPending" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortDown"><span>#</span></th>
                  <th><span>Faculty</span></th>
                  <th><span>Evaluation Form</span></th>
                  <th><span>Request Date</span></th>
                  <th><span>Action</span></th>
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
							  <?php if($requestRow["requestedBy"] == $_SESSION["username"]){?>
								<td><button class="cancelEvalResident btn btn-danger btn-xs" data-toggle="modal" data-target=".bs-cancel-resident-modal-sm" data-id="<?= $requestRow["requestId"] ?>"><span class="glyphicon glyphicon-remove"></span> Cancel</button></td>
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
		$requests = $mysqli->query("select * from requests left join forms on requests.formId=forms.formId left join users on requests.faculty=users.username where resident='{$_SESSION["username"]}' and requests.status='complete' order by completeDate desc;");
		$requestRow = $requests->fetch_assoc();
		
		$requestDate = new DateTime($requestRow["requestDate"]);
		$requestDate->setTimezone(new DateTimeZone("America/Chicago"));
		$completeDate = new DateTime($requestRow["completeDate"]);
		$completeDate->setTimezone(new DateTimeZone("America/Chicago"));
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Completed Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped datatable" id="keywordsComplete" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="headerSortUp"><span>#</span></th>
                  <th><span>Faculty</span></th>
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
