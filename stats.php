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
    if($username != "all"){
        $usernameSql = " and faculty='{$username}'";
        $allFaculty[] = $username;
    }
    if(!empty($startDate) && !empty($endDate))
        $dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";

    if($username == "all")
        $facultyMembers = $mysqli->query("select username from users where type='faculty'");
    $requests = $mysqli->query("select faculty from requests where status='pending' or status='complete' or status='disabled'".$usernameSql.$dateSql);
    $evaluations = $mysqli->query("select faculty from requests where status='complete' and requestedBy!=faculty".$usernameSql.$dateSql);

    while($username == "all" && $facultyMember = $facultyMembers->fetch_assoc()){
        $allFaculty[] = $facultyMember["username"];
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

        foreach($facultyWithoutRequests as $faculty){
            if($i == 15){
                $out .= "</tr><tr>";
                $i = 0;
            }
            $out .= "<td>".$faculty."</td>";
            $i += 1;
        }
        $out .= "</tr></table>";
        $out .= "<br /><br />";
    }

    if(isset($facultyWithoutCompletedEvals)){
        $out .= "<h3>Not completed any evaluations</h3>";
        $out .= "<table class='table'><tr>";
        $i = 0;
        foreach($facultyWithoutCompletedEvals as $faculty){
            if($i == 15){
                $out .= "</tr><tr>";
                $i = 0;
            }
            $out .= "<td>".$faculty."</td>";
            $i += 1;
        }
        $out .= "</tr></table>";
    }

    return $out;
}

function averageEvaluationCompletionTimeFaculty($username, $startDate, $endDate){
    global $mysqli;
    $out = "";
    $usernameSql = "";
    $dateSql = "";
    if($username != "all")
        $usernameSql = " and faculty='{$username}'";
    if(!empty($startDate) && !empty($endDate))
        $dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";

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
    $out .= "<table class='table'>";
    $out .= "<tr>";

    ksort($totalTime);

    foreach($totalTime as $faculty => $time){
        $out .= "<th>{$faculty}</th>";
        $averageTime[$faculty] = $time/$numRequests[$faculty];
        $d1 = new DateTime();
        $d2 = new DateTime();
        $d2->add(new DateInterval("PT".round($averageTime[$faculty])."S"));
        $interval = $d2->diff($d1);
        $averageDateTime[$faculty] = $interval->format("%a days<br />%H hours");
    }
    $out .= "<th>Total</th>";
    $out .= "</tr>";
    $totalAverageTime = $totalTotalTime/$totalNumRequests;
    $d1 = new DateTime();
    $d2 = new DateTime();
    $d2->add(new DateInterval("PT".round($totalAverageTime)."S"));
    $interval = $d2->diff($d1);
    $totalAverageDateTime = $interval->format("%a days<br />%H hours");

    $out .= "<tr>";
    foreach($averageDateTime as $avg){
        $out .= "<td>{$avg}</td>";
    }
    $out .= "<td>{$totalAverageDateTime}</td>";
    $out .= "</tr>";

    $out .= "</table>";
    return $out;
}

function lastCompletedEvaluationsFaculty($username, $startDate, $endDate){
    global $mysqli;
    $out = "";
    $usernameSql = "";
    $dateSql = "";
    if($username != "all")
        $usernameSql = " and faculty='{$username}'";
    if(!empty($startDate) && !empty($endDate))
        $dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";

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
        $out .= "<table class='table'>";
        $out .= "<tr>";
        foreach($evaluations as $faculty => $date){
            $out .= "<th>{$faculty}</th>";
        }
        $out .= "</tr>";
        $out .= "<tr>";
        foreach($evaluations as $faculty => $date){
            $out .= "<td>{$date}</td>";
        }
        $out .= "</tr>";
        $out .= "</table>";
    }
    return $out;
}

function totalCompletedEvaluationsFaculty($username, $startDate, $endDate){
    global $mysqli;
    $out = "";
    $usernameSql = "";
    $dateSql = "";
    if($username != "all")
        $usernameSql = " and faculty='{$username}'";
    if(!empty($startDate) && !empty($endDate))
        $dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";

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
        $out .= "<table class='table'>";
        $out .= "<tr>";
        $out .= "<th></th>";
        foreach($allFaculty as $faculty){
            $out .= "<th>{$faculty}</th>";
        }
        $out .= "</tr>";

        $out .= "<tr>";
        $out .= "<th>Completed</th>";
        foreach($allFaculty as $faculty){
            $out .= "<td>{$numCompletedEvals[$faculty]}</td>";
        }
        $out .= "</tr>";

        $out .= "<tr>";
        $out .= "<th>Requests</th>";
        foreach($allFaculty as $faculty){
            $out .= "<td>{$numRequests[$faculty]}</td>";
        }
        $out .= "</tr>";

        $out .= "<tr>";
        $out .= "<th>Ratio</th>";
        foreach($allFaculty as $faculty){
            $percentage = round(($numCompletedEvals[$faculty]/$numRequests[$faculty])*100);
            $out .= "<td>{$percentage}%</td>";
        }
        $out .= "</tr>";

        $out .= "</table>";
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
    if($type == "fellow")
        $typeSql = " and trainingLevel='fellow'";
    else
        $typeSql = " and trainingLevel!='fellow'";
    if($username != "all"){
        $usernameSql = " and resident='{$username}'";
        $allResidents[] = $username;
    }
    if(!empty($startDate) && !empty($endDate))
        $dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";

    if($username == "all")
        $residents = $mysqli->query("select username from users where type='resident'".$typeSql);
    $requests = $mysqli->query("select resident from requests join users on requests.resident=users.username where requests.status='pending' or requests.status='complete' or requests.status='disabled'".$typeSql.$usernameSql.$dateSql);
    $evaluations = $mysqli->query("select resident from requests join users on requests.resident=users.username where requests.status='complete'".$typeSql.$usernameSql.$dateSql);

    while($username == "all" && $resident = $residents->fetch_assoc()){
        $allResidents[] = $resident["username"];
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

        foreach($residentsWithoutRequests as $resident){
            if($i == 15){
                $out .= "</tr><tr>";
                $i = 0;
            }
            $out .= "<td>".$resident."</td>";
            $i += 1;
        }
        $out .= "</tr></table>";
        $out .= "<br /><br />";
    }

    if(isset($residentsWithoutCompletedEvals)){
        $out .= "<h3>No evaluations completed</h3>";
        $out .= "<table class='table'><tr>";
        $i = 0;

        foreach($residentsWithoutCompletedEvals as $resident){
            if($i == 15){
                $out .= "</tr><tr>";
                $i = 0;
            }
            $out .= "<td>".$resident."</td>";
            $i += 1;
        }
        $out .= "</tr></table>";
    }
    return $out;
}

function lastCompletedEvaluationsResident($username, $startDate, $endDate, $type){
    global $mysqli;
    $out = "";
    $usernameSql = "";
    $dateSql = "";
    if($type == "fellow")
        $typeSql = " and trainingLevel='fellow'";
    else
        $typeSql = " and trainingLevel!='fellow'";
    if($username != "all")
        $usernameSql = " and resident='{$username}'";
    if(!empty($startDate) && !empty($endDate)){
        $dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";
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
        $out .= "<table class='table'>";
        $out .= "<tr>";
        foreach($evaluations as $resident => $date){
            $out .= "<th>{$resident}</th>";
        }
        $out .= "</tr>";
        $out .= "<tr>";
        foreach($evaluations as $resident => $date){
            $out .= "<td>{$date}</td>";
        }
        $out .= "</tr>";
        $out .= "</table>";
    }
    return $out;
}

function totalCompletedEvaluationsResident($username, $startDate, $endDate, $type){
    global $mysqli;
    $out = "";
    $usernameSql = "";
    $dateSql = "";
    if($type == "fellow")
        $typeSql = " and trainingLevel='fellow'";
    else
        $typeSql = " and trainingLevel!='fellow'";
    if($username != "all")
        $usernameSql = " and resident='{$username}'";
    if(!empty($startDate) && !empty($endDate)){
        $dateSql = " and requestDate>='{$startDate}' and requestDate<='{$endDate}'";
    }

    $requests = $mysqli->query("select resident, requests.status from requests join users on requests.resident=users.username where 1=1".$typeSql.$usernameSql.$dateSql);

    while($request = $requests->fetch_assoc()){
        if(!isset($numCompletedEvals[$request["resident"]]))
            $numCompletedEvals[$request["resident"]] = 1;
        $allResidents[] = $request["resident"];
        if(!isset($numRequests[$request["resident"]]))
        $numRequests[$request["resident"]] = 1;
        else
        $numRequests[$request["resident"]]++;

        if($request["status"] == "complete"){
            $numCompletedEvals[$request["resident"]]++;
        }
    }

    if(isset($allResidents)){
        $allResidents = array_unique($allResidents);
        asort($allResidents);

        //print out
        $out .= "<h3>Evaluation Statistics</h3>";
        $out .= "<table class='table'>";
        $out .= "<tr>";
        $out .= "<th></th>";
        foreach($allResidents as $resident){
            $out .= "<th>{$resident}</th>";
        }
        $out .= "</tr>";

        $out .= "<tr>";
        $out .= "<th>Completed</th>";
        foreach($allResidents as $resident){
            $out .= "<td>{$numCompletedEvals[$resident]}</td>";
        }
        $out .= "</tr>";

        $out .= "<tr>";
        $out .= "<th>Requests</th>";
        foreach($allResidents as $resident){
            $out .= "<td>{$numRequests[$resident]}</td>";
        }
        $out .= "</tr>";

        $out .= "<tr>";
        $out .= "<th>Ratio</th>";
        foreach($allResidents as $resident){
            $percentage = round(($numCompletedEvals[$resident]/$numRequests[$resident])*100);
            $out .= "<td>{$percentage}%</td>";
        }
        $out .= "</tr>";

        $out .= "</table>";
    }
    return $out;
}
