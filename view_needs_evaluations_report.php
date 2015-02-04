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
		.n { background-color: pink; }
		.y { background-color: lightgreen; }
		table {border-collapse:collapse;}
		tr {border: none;}
		td {border: solid 1px black;}
	</style>
  </head>

  <body>
	<?php require 'header.php'; ?>

	<?php createRequiresEvaluationTable(); ?>
	<?php
		include "scripts.html";
	?>
  </body>
</html>
