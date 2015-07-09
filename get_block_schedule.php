<?php

session_start();
require "init.php";
$result = "";

if($_SESSION["type"] == "admin" && isset($_POST["year"])){
	$numStmt = $mysqli->prepare("select count(distinct blockName) from block_assignments where year=?");
	$numStmt->bind_param("s", $_POST["year"]);
	$numStmt->bind_result($num);
	$numStmt->execute();
	$numStmt->fetch();
	$numBlocks = $num;
	$numStmt->close();

	$blockStmt = $mysqli->prepare("select distinct(blockName) from block_assignments where year=? order by blockNumber asc");
	$blockStmt->bind_param("s", $_POST["year"]);
	$blockStmt->bind_result($blockName);
	$blockStmt->execute();

	$result .= "<table class='table table-striped datatable'>";
	$result .= "<thead><tr>";
	$result .= "<th>Person</th>";
	while($blockStmt->fetch()){
		$result .= "<th>".$blockName."</th>";
	}
	$result .= "</tr></thead>";
	$blockStmt->close();

	$stmt = $mysqli->prepare("select assignmentId, year, blockNumber, blockName, username, firstName, lastName, location from block_assignments join users on block_assignments.user=users.username where year=? order by user, blockNumber asc");
	$stmt->bind_param("s", $_POST["year"]);
	$stmt->bind_result($assignmentId, $year, $blockNumber, $blockName, $username, $firstName, $lastName, $location);
	$stmt->execute();
	
	$result .= "<tbody>";
	$lastBlock = -1;
	$lastUser = "";
	while($stmt->fetch()){
		if($username != $lastUser){
			if($lastUser !== ""){
				for($i = 0; $i < $numBlocks-$lastBlock; $i++){
					$result .= "<td></td>";
				}
				$result .= "</tr>";
			}
			$result .= "<tr>";
			$result .= "<th>".$lastName.", ".$firstName."</th>";
			$lastBlock = 0;
			$lastUser = $username;
		}

		if($blockNumber != $lastBlock){
			if($lastBlock != -1){
				$result .= "</td>";
				for($i = 1; $i < $blockNumber-$lastBlock; $i++){
					$result .= "<td></td>";
				}
			}
			$result .= "<td>";
			$lastBlock = $blockNumber;
		} else {
			$result .= "<br />";
		}

		$result .= $location;
	}
	for($i = 0; $i < $numBlocks-$lastBlock; $i++){
		$result .= "<td></td>";
	}
	$result .= "</tr>";
	$result .= "</tbody>";
	$result .= "</table>";
	$stmt->close();
}

echo $result;

?>
