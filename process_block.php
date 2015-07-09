<?php

session_start();
include "init.php";

if($_SESSION["type"] !== "admin")
	header("Location: dashboard.php?success=false");

if(!isset($_POST["year"]) || ($_POST["year"] == "new" && !isset($_POST["newYear"])) || ($_FILES["schedule"]["size"] == 0  || $_FILES["schedule"]["error"] !== UPLOAD_ERR_OK)){
	header("Location: block_schedule.php?success=false");
}

$users = $mysqli->query("select username, firstName, lastName from users where status='active'");

foreach($users as $user){
	$usernames[$user["username"]] = preg_replace("/\W/", "",strtolower($user["lastName"].",".substr($user["firstName"], 0, 1)));
}

//var_dump($usernames);

//error_reporting(!E_WARNING);
libxml_use_internal_errors(true);

$dom = new DOMDocument;
$dom->loadHTMLFile($_FILES["schedule"]["tmp_name"]);

$trs = $dom->getElementsByTagName("table")->item(0)->childNodes;
//$trs = $dom->getElementById("ctl04_grdReport")->childNodes;

for($i = 1; $i < $trs->item(0)->childNodes->length; $i++){
	$blocks[$i] = trim($trs->item(0)->childNodes->item($i)->nodeValue);
	preg_match("/\((\d\d\/\d\d\/\d\d\d\d) \- (\d\d\/\d\d\/\d\d\d\d)\)/", $blocks[$i], $matches);
	if(count($matches) == 3){
		$blockStart[$i] = $matches[1];
		$blockEnd[$i] = $matches[2];
	}
}

//var_dump($blocks);
//var_dump($blockStart);
//var_dump($blockEnd);

$hits = 0;
$misses = 0;

for($i = 1; $i < $trs->length; $i++){
	if($trs->item($i)->getAttribute("style") == "background-color:LightSteelBlue;")
		continue;
	
	$tds = $trs->item($i)->childNodes;
	$user = preg_replace("/\W/", "", strtolower($tds->item(0)->nodeValue));

	for($j = 1; $j < $tds->length; $j++){
		if($tds->item($j)->nodeType == 3)
			continue;
		$entries = $tds->item($j)->getElementsByTagName("td");
		foreach($entries as $entry){
			$location = trim(preg_replace("/\(.*\)/", "", $entry->nodeValue));
			if(in_array($user, $usernames)){
				$username = array_search($user, $usernames);	
				$assignments[$j][$username][] = $location;
				$hits++;
			} else{
				$misses++;
			}
		}
	}
}

//var_dump($assignments);
//echo "hits: ".$hits."\n";
//echo "misses: ".$misses."\n";

if($stmt = $mysqli->prepare("insert into block_assignments(year, blockNumber, blockName, user, location) values(?, ?, ?, ?, ?)")){
	$stmt->bind_param("sssss", $year, $blockNumber, $blockName, $username, $location);
	$deleteStmt = $mysqli->prepare("delete from block_assignments where year=? and blockNumber=? and user=?");
	$deleteStmt->bind_param("sss", $year, $blockNumber, $username);
	$blockStmt = $mysqli->prepare("insert ignore into blocks(name, startDate, endDate, year) values(?, ?, ?, ?)");
	$blockStmt->bind_param("ssss", $blockName, $startDate, $endDate, $year);
	if($_POST["year"] == "new")
		$year = $_POST["newYear"];
	else
		$year = $_POST["year"];

	foreach($blocks as $blockNumber => $blockName){
			if($blockName == "")
				continue;
			if(isset($blockStart[$blockNumber])){
				$nums = explode("/", $blockStart[$blockNumber]);
				$startDate = $nums[2]."-".$nums[0]."-".$nums[1];
			}	
			else
				$startDate = "";
			if(isset($blockEnd[$blockNumber])){
				$nums = explode("/", $blockEnd[$blockNumber]);
				$endDate = $nums[2]."-".$nums[0]."-".$nums[1];
			}
			else
				$endDate = "";
			$blockStmt->execute();
	}

	foreach($assignments as $blockNumber => $blockAssignments){
		$blockName = $blocks[$blockNumber];
		foreach($blockAssignments as $username => $userBlockAssignments){
			$deleteStmt->execute();
			foreach($userBlockAssignments as $location){
				$stmt->execute();
				//echo $year." ".$blockName." ".$username." ".$location."\n";
			}
		}
	}
	$deleteStmt->close();
	$blockStmt->close();
	$stmt->close();
}

header("Location: block_schedule.php?success=true");
