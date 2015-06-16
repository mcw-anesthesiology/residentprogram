<?php

function facultyStats($username, $startDate, $endDate){
    $out = "";
    $out .= totalCompletedEvaluationsFaculty($username, $startDate, $endDate);
    $out .= "<br /><br />";
    $out .= facultyWithoutEvals($username, $startDate, $endDate);
    $out .= "<br /><br />";
    $out .= averageEvaluationCompletionTimeFaculty($username, $startDate, $endDate);
    $out .= "<br /><br />";
    $out .= lastCompletedEvaluationsFaculty($username, $startDate, $endDate);
    return $out;
}

function facultyWithoutEvals($username, $startDate, $endDate){
    global $mysqli;
	$out = "";
    $usernameSql = "";
	$dateSql = "";
	$userSql = "";
	if($username != "all"){
		$userSql = " and username='{$username}'";
        $usernameSql = " and faculty='{$username}'";
    }
    if(!empty($startDate) && !empty($endDate))
        $dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";

    $facultyMembers = $mysqli->query("select username, firstName, lastName from users where type='faculty' and status='active'".$userSql);
    $requests = $mysqli->query("select faculty from requests where status='pending' or status='complete' or status='disabled'".$usernameSql.$dateSql);
    $evaluations = $mysqli->query("select faculty from requests where status='complete' and requestedBy!=faculty".$usernameSql.$dateSql);

    while($facultyMember = $facultyMembers->fetch_assoc()){
		$allFaculty[] = $facultyMember["username"];
		$facultyName[$facultyMember["username"]] = $facultyMember["lastName"].", ".$facultyMember["firstName"];
    }
    while($request = $requests->fetch_assoc()){
        $requestedEvals[] = $request["faculty"];
    }
    while($evaluation = $evaluations->fetch_assoc()){
        $completedEvals[] = $evaluation["faculty"];
    }

    foreach(array_unique($allFaculty) as $faculty){
        if(!in_array($faculty, $requestedEvals))
            $facultyWithoutRequests[] = $faculty;

        if(!in_array($faculty, $completedEvals))
            $facultyWithoutCompletedEvals[] = $faculty;
    }

    if(isset($facultyWithoutRequests)){
        //print them out
        $out .= "<h3>Never received a request</h3>";
        $out .= "<table class='table'><tr>";
        $i = 0;
		$tsv = "";
        foreach($facultyWithoutRequests as $faculty){
            if($i == 3){
                $out .= "</tr><tr>";
                $i = 0;
            }
			$out .= "<td>".$facultyName[$faculty]."</td>";
			$tsv .= $facultyName[$faculty]."\n";
            $i += 1;
		}
		while($i < 3){
			$out .= "<td></td>";
			$i += 1;
		}
		$out .= "</tr></table>";
		$out .= "<form style='text-align:center;' target='_blank' method='post' action='save_table.php'><input type='hidden' name='filename' value='Faculty Without Requests' /><button type='submit' class='btn btn-default' name='tsv' value=\"{$tsv}\">Save as TSV</button></form>";
        $out .= "<br /><br />";
    }

    if(isset($facultyWithoutCompletedEvals)){
        $out .= "<h3>Not completed any evaluations</h3>";
        $out .= "<table class='table'><tr>";
		$i = 0;
		$tsv = "";
        foreach($facultyWithoutCompletedEvals as $faculty){
            if($i == 3){
                $out .= "</tr><tr>";
                $i = 0;
            }
			$out .= "<td>".$facultyName[$faculty]."</td>";
			$tsv .= $facultyName[$faculty]."\n";
            $i += 1;
		}
		while($i < 3){
			$out .= "<td></td>";
			$i += 1;
		}
		$out .= "</tr></table>";
		$out .= "<form style='text-align:center;' target='_blank' method='post' action='save_table.php'><input type='hidden' name='filename' value='Faculty Without Completed' /><button type='submit' class='btn btn-default' name='tsv' value=\"{$tsv}\">Save as TSV</button></form>";
    }

    return $out;
}

function averageEvaluationCompletionTimeFaculty($username, $startDate, $endDate){
    global $mysqli;
    $out = "";
    $usernameSql = "";
	$dateSql = "";
	$userSql = "";
    if($username != "all"){
		$usernameSql = " and faculty='{$username}'";
		$userSql = " and username='{$username}'";
	}
    if(!empty($startDate) && !empty($endDate))
		$dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";

	$facultyMembers = $mysqli->query("select username, firstName, lastName from users where type='faculty' and status='active'".$userSql);

	foreach($facultyMembers as $facultyMember){
		$facultyName[$facultyMember["username"]] = $facultyMember["lastName"].", ".$facultyMember["firstName"];
	}

    $requests = $mysqli->query("select requestDate, completeDate, faculty from requests where status='complete'".$usernameSql.$dateSql);

    $totalTotalTime = 0;
    $totalNumRequests = 0;

    while($request = $requests->fetch_assoc()){
        $requestDate = DateTime::createFromFormat("Y-m-d H:i:s", $request["requestDate"]);
        $completeDate = DateTime::createFromFormat("Y-m-d H:i:s", $request["completeDate"]);
        $elapsedTime = $completeDate->getTimestamp()-$requestDate->getTimestamp();
        if(!isset($totalTime[$request["faculty"]])){
            $totalTime[$request["faculty"]] = $elapsedTime;
            $numRequests[$request["faculty"]] = 1;
        }
        else{
            $totalTime[$request["faculty"]] += $elapsedTime;
            $numRequests[$request["faculty"]]++;
        }
        $totalTotalTime += $elapsedTime;
        $totalNumRequests++;
    }
    $out .= "<h3>Average evaluation completion time</h3>";
	$out .= "<table class='table table-striped datatable'>";
	$out .= "<thead><tr><th>User</th><th>Time</th></tr></thead>";
	$out .= "<tbody>";
	$tsv = "User\tTime\n";

    ksort($totalTime);

	foreach($totalTime as $faculty => $time){
		if(!isset($facultyName[$faculty]))
			continue;
		$out .= "<tr>";
		$out .= "<th>{$facultyName[$faculty]}</th>";
		$tsv .= $facultyName[$faculty]."\t";
        $averageTime = $time/$numRequests[$faculty];
        $d1 = new DateTime();
        $d2 = new DateTime();
        $d2->add(new DateInterval("PT".round($averageTime)."S"));
		$interval = $d2->diff($d1);
		$period = $interval->format("%a days<br />%H hours");
		$out .= "<td>".$period."</td>";
		$tsv .= $period."\n";
		$out .= "</tr>";
    }
	if($username == "all"){
		$out .= "<tr>";
		$out .= "<th>Total</th>";
		$tsv .= "Total\t";
    	$totalAverageTime = $totalTotalTime/$totalNumRequests;
   		$d1 = new DateTime();
    	$d2 = new DateTime();
    	$d2->add(new DateInterval("PT".round($totalAverageTime)."S"));
		$interval = $d2->diff($d1);
		$period = $interval->format("%a days<br />%H hours");
		$out .= "<td>".$period."</td>";
		$tsv .= $period."\n";
		$out .= "</tr>";
	}
	$out .= "</tbody>";
	$out .= "</table>";
	$out .= "<form style='text-align:center;' target='_blank' method='post' action='save_table.php'><input type='hidden' name='filename' value='Faculty Completion Time' /><button type='submit' class='btn btn-default' name='tsv' value=\"{$tsv}\">Save as TSV</button></form>";
    return $out;
}

function lastCompletedEvaluationsFaculty($username, $startDate, $endDate){
    global $mysqli;
    $out = "";
    $usernameSql = "";
	$dateSql = "";
	$userSql = "";
    if($username != "all"){
		$usernameSql = " and faculty='{$username}'";
		$userSql = " and username='{$username}'";
	}
    if(!empty($startDate) && !empty($endDate))
        $dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";

	$facultyMembers = $mysqli->query("select username, firstName, lastName from users where type='faculty' and status='active'".$userSql);

	foreach($facultyMembers as $facultyMember){
		$facultyName[$facultyMember["username"]] = $facultyMember["lastName"].", ".$facultyMember["firstName"];
	}

    $requests = $mysqli->query("select faculty, completeDate from requests where status='complete'".$usernameSql.$dateSql);

    while($request = $requests->fetch_assoc()){
        if(!isset($evaluations[$request["faculty"]]) || $request["completeDate"] > $evaluations[$request["faculty"]]){
            $evaluations[$request["faculty"]] = $request["completeDate"];
        }
    }
    if(isset($evaluations)){
        ksort($evaluations);
        //print out
        $out .= "<h3>Last completed evaluations</h3>";
		$out .= "<table class='table table-striped datatable'>";
		$out .= "<thead><tr><th>User</th><th>Date</th></tr></thead>";
		$tsv = "User\tDate\n";
		$out .= "<tbody>";
		foreach($evaluations as $faculty => $date){
			if(!isset($facultyName[$faculty]))
				continue;
			$evaluationDate = new DateTime($date);
			$evaluationDate->setTimezone(new DateTimeZone("America/Chicago"));
        	$out .= "<tr>";
			$out .= "<th>{$facultyName[$faculty]}</th>";
			$out .= "<td>".$evaluationDate->format("d-m-Y g:i A")."</th>";
			$tsv .= $facultyname[$faculty]."\t";
			$tsv .= $date."\n";
        	$out .= "</tr>";
        }
		$out .= "</tbody>";
		$out .= "</table>";
		$out .= "<form style='text-align:center;' target='_blank' method='post' action='save_table.php'><input type='hidden' name='filename' value='Last Faculty Evaluations' /><button type='submit' class='btn btn-default' name='tsv' value=\"{$tsv}\">Save as TSV</button></form>";
		
    }
    return $out;
}

function totalCompletedEvaluationsFaculty($username, $startDate, $endDate){
    global $mysqli;
    $out = "";
    $usernameSql = "";
	$dateSql = "";
	$userSql = "";
    if($username != "all"){
		$usernameSql = " and faculty='{$username}'";
		$userSql = " and username='{$username}'";
	}
    if(!empty($startDate) && !empty($endDate))
		$dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";

	$facultyMembers = $mysqli->query("select username, firstName, lastName from users where type='faculty' and status='active'".$userSql);

	foreach($facultyMembers as $facultyMember){
		$facultyName[$facultyMember["username"]] = $facultyMember["lastName"].", ".$facultyMember["firstName"];
	}

    $requests = $mysqli->query("select faculty, status from requests where 1=1".$usernameSql.$dateSql);

    while($request = $requests->fetch_assoc()){
        $allFaculty[] = $request["faculty"];
        if(!isset($numRequests[$request["faculty"]]))
            $numRequests[$request["faculty"]] = 1;
        else
            $numRequests[$request["faculty"]]++;

        if($request["status"] == "complete"){
            if(!isset($numCompletedEvals[$request["faculty"]]))
                $numCompletedEvals[$request["faculty"]] = 1;
            else
                $numCompletedEvals[$request["faculty"]]++;
        }
    }

    if(isset($allFaculty)){
        $allFaculty = array_unique($allFaculty);
        asort($allFaculty);

        //print out
        $out .= "<h3>Evaluation Statistics</h3>";
		$out .= "<table class='table table-striped datatable'>";
		$out .= "<thead><tr><th>User</th><th>Completed</th><th>Requests</th><th>Ratio</th></tr></thead>";
		$tsv = "User\tCompleted\tRequests\tRatio\n";
		$out .= "<tbody>";
		foreach($allFaculty as $faculty){
			if(!isset($facultyName[$faculty]))
				continue;
			$out .= "<tr>";
			$out .= "<th>{$facultyName[$faculty]}</th>";
			$out .= "<td>{$numCompletedEvals[$faculty]}</td>";
			$out .= "<td>{$numRequests[$faculty]}</td>";
            $percentage = round(($numCompletedEvals[$faculty]/$numRequests[$faculty])*100);
			$out .= "<td>{$percentage}%</td>";
			$out .= "</tr>";
			$tsv .= $facultyName[$faculty]."\t";
			$tsv .= $numCompletedEvals[$faculty]."\t";
			$tsv .= $numRequests[$faculty]."\t";
			$tsv .= $percentage."%\n";
		}
		$out .= "</tbody>";
		$out .= "</table>";
		$out .= "<form style='text-align:center;' target='_blank' method='post' action='save_table.php'><input type='hidden' name='filename' value='Faculty Evaluation Statistics' /><button type='submit' class='btn btn-default' name='tsv' value=\"{$tsv}\">Save as TSV</button></form>";
    }
    return $out;
}

function residentStats($username, $startDate, $endDate, $type) {
    $out = "";
    $out .= totalCompletedEvaluationsResident($username, $startDate, $endDate, $type);
    $out .= "<br /><br />";
    $out .= residentsWithoutEvals($username, $startDate, $endDate, $type);
    $out .= "<br /><br />";
    $out .= lastCompletedEvaluationsResident($username, $startDate, $endDate, $type);
    return $out;
}

function residentsWithoutEvals($username, $startDate, $endDate, $type){
    global $mysqli;
    $out = "";
    $usernameSql = "";
	$dateSql = "";
	$userSql = "";
    if($type == "fellow")
        $typeSql = " and trainingLevel='fellow'";
    else
        $typeSql = " and trainingLevel!='fellow'";
	if($username != "all"){
		$userSql = " and username='{$username}'";
        $usernameSql = " and resident='{$username}'";
    }
    if(!empty($startDate) && !empty($endDate))
        $dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";

    $residents = $mysqli->query("select username, firstName, lastName from users where type='resident' and status='active'".$typeSql.$userSql);
    $requests = $mysqli->query("select resident from requests join users on requests.resident=users.username where requests.status='pending' or requests.status='complete' or requests.status='disabled'".$typeSql.$usernameSql.$dateSql);
    $evaluations = $mysqli->query("select resident from requests join users on requests.resident=users.username where requests.status='complete'".$typeSql.$usernameSql.$dateSql);

    while($resident = $residents->fetch_assoc()){
		$allResidents[] = $resident["username"];
		$residentName[$resident["username"]] = $resident["lastName"].", ".$resident["firstName"];
    }
    while($request = $requests->fetch_assoc()){
        $requestedEvals[] = $request["resident"];
    }
    while($evaluation = $evaluations->fetch_assoc()){
        $completedEvals[] = $evaluation["resident"];
    }

    foreach(array_unique($allResidents) as $resident){
        if(!in_array($resident, $requestedEvals))
        $residentsWithoutRequests[] = $resident;

        if(!in_array($resident, $completedEvals))
        $residentsWithoutCompletedEvals[] = $resident;
    }

    if(isset($residentsWithoutRequests)){
        //print them out
        $out .= "<h3>Never received a request</h3>";
        $out .= "<table class='table'><tr>";
        $i = 0;
		$tsv = "";
        foreach($residentsWithoutRequests as $resident){
            if($i == 3){
                $out .= "</tr><tr>";
                $i = 0;
            }
			$out .= "<td>".$residentName[$resident]."</td>";
			$tsv .= $residentName[$resident]."\n";
            $i += 1;
		}
		while($i < 3){
			$out .= "<td></td>";
			$i += 1;
		}
		$out .= "</tr></table>";
		$out .= "<form style='text-align:center;' target='_blank' method='post' action='save_table.php'><input type='hidden' name='filename' value='Residents Without Requests' /><button type='submit' class='btn btn-default' name='tsv' value=\"{$tsv}\">Save as TSV</button></form>";
        $out .= "<br /><br />";
    }

    if(isset($residentsWithoutCompletedEvals)){
        $out .= "<h3>No evaluations completed</h3>";
        $out .= "<table class='table'><tr>";
        $i = 0;
		$tsv = "";
        foreach($residentsWithoutCompletedEvals as $resident){
            if($i == 3){
                $out .= "</tr><tr>";
                $i = 0;
			}
			$out .= "<td>".$residentName[$resident]."</td>";
			$tsv .= $residentName[$resident]."\n";
            $i += 1;
		}
		while($i < 3){
			$out .= "<td></td>";
			$i += 1;
		}
        $out .= "</tr></table>";
		$out .= "<form style='text-align:center;' target='_blank' method='post' action='save_table.php'><input type='hidden' name='filename' value='Residents Without Completed' /><button type='submit' class='btn btn-default' name='tsv' value=\"{$tsv}\">Save as TSV</button></form>";
    }
    return $out;
}

function lastCompletedEvaluationsResident($username, $startDate, $endDate, $type){
    global $mysqli;
    $out = "";
    $usernameSql = "";
	$dateSql = "";
	$userSql = "";
    if($type == "fellow")
        $typeSql = " and trainingLevel='fellow'";
    else
        $typeSql = " and trainingLevel!='fellow'";
    if($username != "all"){
		$usernameSql = " and resident='{$username}'";
		$userSql = " and username='{$username}'";
	}
    if(!empty($startDate) && !empty($endDate)){
        $dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";
	}

	$residents = $mysqli->query("select username, firstName, lastName from users where type='resident' and status='active'".$userSql);

	foreach($residents as $resident){
		$residentName[$resident["username"]] = $resident["lastName"].", ".$resident["firstName"];
	}

    $requests = $mysqli->query("select resident, completeDate from requests join users on requests.resident=users.username where requests.status='complete'".$typeSql.$usernameSql.$dateSql);

    while($request = $requests->fetch_assoc()){
        if(!isset($evaluations[$request["resident"]]) || $request["completeDate"] > $evaluations[$request["resident"]]){
            $evaluations[$request["resident"]] = $request["completeDate"];
        }
    }
    if(isset($evaluations)){
        ksort($evaluations);
        //print out
        $out .= "<h3>Last completed evaluations</h3>";
        $out .= "<table class='table table-striped datatable'>";
		$out .= "<thead><tr><th>User</th><th>Date</th></tr></thead>";
		$tsv = "User\tDate\n";
        $out .= "<tbody>";
		foreach($evaluations as $resident => $date){
			if(!isset($residentName[$resident]))
				continue;
			$evaluationDate = new DateTime($date);
			$evaluationDate->setTimezone(new DateTimeZone("America/Chicago"));
			$out .= "<tr>";
			$out .= "<th>{$residentName[$resident]}</th>";
			$out .= "<td>".$evaluationDate->format("d-m-Y g:i A")."</th>";
			$tsv .= $facultyName[$resident]."\t";
			$tsv .= $date."\n";
			$out .= "</tr>";
        }
        $out .= "</tbody>";
        $out .= "</table>";
		$out .= "<form style='text-align:center;' target='_blank' method='post' action='save_table.php'><input type='hidden' name='filename' value='Last Resident Evaluations' /><button type='submit' class='btn btn-default' name='tsv' value=\"{$tsv}\">Save as TSV</button></form>";
    }
    return $out;
}

function totalCompletedEvaluationsResident($username, $startDate, $endDate, $type){
    global $mysqli;
    $out = "";
    $usernameSql = "";
	$dateSql = "";
	$userSql = "";
    if($type == "fellow")
        $typeSql = " and trainingLevel='fellow'";
    else
        $typeSql = " and trainingLevel!='fellow'";
    if($username != "all"){
		$usernameSql = " and resident='{$username}'";
		$userSql = " and username='{$username}'";
	}
    if(!empty($startDate) && !empty($endDate)){
        $dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";
    }

	$residents = $mysqli->query("select username, firstName, lastName from users where type='resident' and status='active'".$userSql);

	foreach($residents as $resident){
		$residentName[$resident["username"]] = $resident["lastName"].", ".$resident["firstName"];
	}

    $requests = $mysqli->query("select resident, requests.status from requests join users on requests.resident=users.username where 1=1".$typeSql.$usernameSql.$dateSql);

    while($request = $requests->fetch_assoc()){
        $allResidents[] = $request["resident"];
        if(!isset($numRequests[$request["resident"]]))
        $numRequests[$request["resident"]] = 1;
        else
        $numRequests[$request["resident"]]++;

        if($request["status"] == "complete"){
			if(!isset($numCompletedEvals[$request["resident"]]))
				$numCompletedEvals[$request["resident"]] = 1;
			else
				$numCompletedEvals[$request["resident"]]++;
        }
    }

    if(isset($allResidents)){
        $allResidents = array_unique($allResidents);
        asort($allResidents);

        //print out
        $out .= "<h3>Evaluation Statistics</h3>";
        $out .= "<table class='table table-striped datatable'>";
		$out .= "<thead><tr><th>User</th><th>Completed</th><th>Requests</th><th>Ratio</th></tr></thead>";
		$tsv .= "User\tCompleted\tRequests\tRatio\n";
        $out .= "<tbody>";
		foreach($allResidents as $resident){
			if(!isset($residentName[$resident]))
				continue;
			$out .= "<tr>";
			$out .= "<th>{$residentName[$resident]}</th>";
			$out .= "<td>{$numCompletedEvals[$resident]}</td>";
			$out .= "<td>{$numRequests[$resident]}</td>";
            $percentage = round(($numCompletedEvals[$resident]/$numRequests[$resident])*100);
			$out .= "<td>{$percentage}%</td>";
			$out .= "</tr>";
			$tsv .= $residentName[$resident]."\t";
			$tsv .= $numCompletedEvals[$resident]."\t";
			$tsv .= $numRequests[$resident]."\t";
			$tsv .= $percentage."%\n";
		}
        $out .= "</tbody>";
        $out .= "</table>";
		$out .= "<form style='text-align:center;' target='_blank' method='post' action='save_table.php'><input type='hidden' name='filename' value='Resident Evaluation Statistics' /><button type='submit' class='btn btn-default' name='tsv' value=\"{$tsv}\">Save as TSV</button></form>";
    }
    return $out;
}
