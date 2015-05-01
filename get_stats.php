<?php
    session_start();

    include "init.php";
    include "stats.php";

    $startDate = "";
    $endDate = "";
    $username = "";
    $type = "";

    if(isset($_POST["startDate"]))
        $startDate = $_POST["startDate"];
    if(isset($_POST["endDate"]))
        $endDate = $_POST["endDate"];
    $username = $_POST["username"];
    $type = $_POST["type"];

    $result = -1;

    if($type == "faculty")
        $result = facultyStats($username, $startDate, $endDate);
    elseif($type == "resident" || $type == "fellow")
        $result = residentStats($username, $startDate, $endDate, $type);

    echo $result;
?>
