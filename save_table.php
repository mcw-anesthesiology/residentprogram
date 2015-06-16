<?php
	$date = new DateTime(null, new DateTimeZone("America/Chicago"));
	
	$filename = $_POST["filename"]." ".$date->format("Y-m-d H:i:s").".tsv";

	if(isset($_POST["tsv"])){
		header("Content-type: text/tab-separated-values");
		header("Content-Disposition: attachment; filename={$filename}");
		
		echo $_POST["tsv"];
	}
?>
