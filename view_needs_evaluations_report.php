<?php
	//TODO: documentation

	session_start();
	require "init.php";
	require "reporting.php";

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php
		include "head.html";
	?>
	<style>
		.n { background-color: pink !important; }
		.y { background-color: lightgreen !important; }
		td {border: solid 1px black;}
	</style>
  </head>

  <body>
	<?php require 'header.php'; ?>

	<div class="container-fluid">
		<?php createRequiresEvaluationTable(); ?>
	</div>
	<?php
		include "scripts.html";
	?>
	<script>
		$(document).ready(function(){
			$(".datatable").each(function(){
				var table = $(this).DataTable({
					"paging": false,
					"scrollX": true,
					"scrollY": "700px",
					"scrollCollapse": true
				});
				new $.fn.DataTable.FixedColumns( table );
			});
		});
	</script>
  </body>
</html>
