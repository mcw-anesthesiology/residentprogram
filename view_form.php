<?php
	$formLocation = $_POST["formLocation"];
?><!DOCTYPE html>
<html lang="en">
  <head>
    <?php
		include "head.html";
	?>
	<style>
		textarea{
			width:100%;
			resize: none;
		}
	</style>
  </head>

  <body>
	<div id="form">
	<?php include "form_reader.php"; ?>
	</div>

	<?php
		include "scripts.html";
	?>
	<script>
		$(document).ready(function(){
			$("#form input").prop("disabled", true);
			$("#form textarea").prop("disabled", true);
		});

		$(".toggleDescriptions").click(function(){
			var questionName = $(this).data("id");
			$("."+questionName).toggle();
		});
	</script>
  </body>
</html>