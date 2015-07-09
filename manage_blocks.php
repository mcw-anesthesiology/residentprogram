<?php
	session_start();
	include "init.php";

	$blocks = $mysqli->query("select * from blocks");
?>

<!DOCTYPE html>
<html>
	<head>
		<?php include "head.html"; ?>
	</head>
	<body>
		<?php include "header.php"; ?>
		<div class="container-fluid">
			<h2 class="sub-header">Manage Blocks</h2>
			<div class="table-responsive">
				<table class="table table-striped datatable">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Start</th>
							<th>End</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
<?php
	foreach($blocks as $block){
		echo "<td>".$block["blockId"]."</td>";
		echo "<td>".$block["name"]."</td>";
		echo "<td>".$block["startDate"]."</td>";
		echo "<td>".$block["endDate"]."</td>";
		echo "<td><button type='button' class='edit-block btn btn-primary btn-xs' data-target='.bs-edit-modal' data-id='{$block["blockId"]}'><span class='glyphicon glyphicon-edit'></span> Edit Block</button></td>"; 
	}
?>
					</tbody>
				</table>
			</div>
		</div>

		<div class="modal fade bs-edit-modal" tabindex="-1" role="dialog" aria-labelledby="editModal" aria-hidden="true" id="editModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">Edit Block</h4>
					</div>
					<form method="post" action="edit_block.php">
						<div class="modal-body modal-edit">
							<div class="form-group">
								<label for="block-name">Name</label>
								<input class="form-control" id="block-name" readonly />
							</div>
							<div class="form-group">
								<label for="block-start">Start</label>
								<input type="text" id="block-start" name="blockStart" class="form-control datepicker" />
							</div>
							<div class="form-group">
								<label for="block-end">End</label>
								<input type="text" id="block-end" name="blockEnd" class="form-control datepicker" />
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
							<button type="submit" class="btn btn-success" name="blockId" value="">Save</button>	
						</div>
					</form> 
				</div>
			</div> 
		</div>		

		<?php include "scripts.html"; ?>
		<script>
			
		</script>
	</body>
</html>
