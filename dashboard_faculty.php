<?php
	  $requests = $mysqli->query("select * from requests left join forms on requests.formId=forms.formId where faculty='{$_SESSION["username"]}' and status='pending' order by requestId asc;");
	  $requestRow = $requests->fetch_assoc();
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Pending Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped" id="keywordsPending" cellspacing="0" cellpadding="0">
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
				  ?>
							<tr>
							  <td class="lalign"><a href="complete_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["resident"] ?></td>
							  <td><?= $requestRow["title"] ?></td>
							  <td><?= $requestRow["requestDate"] ?></td>
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
		$requests = $mysqli->query("select * from requests left join forms on requests.formId=forms.formId where faculty='{$_SESSION["username"]}' and status='complete' order by completeDate desc;");
		$requestRow = $requests->fetch_assoc();
?>
    <div class="container-fluid">
      <div class="row">
          <h2 class="sub-header">Completed Requests</h2>
          <div class="table-responsive">
            <table class="table table-striped" id="keywordsComplete" cellspacing="0" cellpadding="0">
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
							<tr>
							  <td class="lalign"><a href="view_specific.php?request=<?= $requestRow["requestId"] ?>"><?= $requestRow["requestId"] ?></a></td>
							  <td><?= $requestRow["title"] ?></td>
							  <td><?= $requestRow["resident"] ?></td>
							  <td><?= $requestRow["requestDate"] ?></td>
							  <td><?= $requestRow["completeDate"] ?></td>
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
