<?php
	//This page is used to request a new evaluation to be completed by a faculty member for a resident. It calls process_request.php once the user selects the proper faculty, resident, and form information and submits it.

	session_start();
	require "init.php";

	$blocks = $mysqli->query("select year, name from blocks where startDate<=NOW() order by startDate desc");
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
		include "head.html";
	?>
  </head>

  <body>

<?php include 'header.php'; ?>

    <div class="container-fluid">
		  <h2 class="sub-header">Request Evaluation</h2>
<?php
	if($_SESSION["type"] == "resident" || $_SESSION["type"] == "faculty"){
?>
			<div class="form-group">
				<label for="block">Block</label>
				<select class="form-control" id="block">
				<?php
					if($_SESSION["type"] == "resident")
						$selectType = "faculty";
					elseif($_SESSION["type"] == "faculty")
						$selectType = "residents";
					else
						$selectType = "users";
				?>
					<option value='none'>Select from all <?= $selectType ?></option>
<?php
	foreach($blocks as $block){
		echo "<option value='{$block["name"]}'>{$block["year"]} {$block["name"]}</option>";
	}
?>
				</select>
			</div>
<?php
	}
?>
            <form id="form" role="form" action="process_request.php" method="post">
            </form>
        </div>
	</div>
		<div class="footer">
			<a href="contact.php">Contact</a>
		</div>
	
	<?php
		include "scripts.html";
	?>
	<script>
		function selectBlock(){
			var block = $("#block").val();
			$("#form").html("");
			$.ajax({
				"method": "post",
				"data": "block="+block,
				"url": "request_ajax.php",
				"success": function(response){
					if(response != "")
						$("#form").html(response);
				}
				
			});
		}

		$("#block").change(selectBlock);

		$(document).ready(function(){
			$("#block option:eq(1)").prop("selected", true);
			selectBlock();
		});

		function checkSelectValues(){
			var optionsSelected = true;
			$(".request-select").each(function(){
				if($(this).val() == -1 || $(this).val() == "-1"){
					optionsSelected = false;
				}
			});
			if(!optionsSelected){
				alert("Please complete all selections");
			}
			return optionsSelected;
		}

		$("#form").submit(checkSelectValues);
    </script>
  </body>
</html>
