<?php
	//TODO: add proposed ideal average level for graph
	
	
	function sd_square($x, $mean) { 
		return pow($x - $mean,2); 
	}
	// Function to calculate square of value - mean

	
	function sd($array) {
		// Function to calculate standard deviation (uses sd_square)    
		
		// square root of sum of squares devided by N-1
		return sqrt(array_sum(array_map("sd_square", $array, array_fill(0,count($array), (array_sum($array) / count($array)) ) ) ) / (count($array)-1) );
	}
	
	function createReportTable($trainingLevel, $startDate, $endDate){
		global $mysqli;
		
		$query = "select requests.resident, responses.requestId, responses.questionId, responses.response, responses.weight, milestones.milestoneId, milestones.title, competencies.competencyId, competencies.title from responses join requests on requests.requestId=responses.requestId join milestones_questions on responses.questionId=milestones_questions.questionId and requests.formId=milestones_questions.formId join milestones on milestones_questions.milestoneId=milestones.milestoneId join competencies_questions on responses.questionId=competencies_questions.questionId and requests.formId=competencies_questions.formId join competencies on competencies_questions.competencyId=competencies.competencyId join evaluations on evaluations.requestId=requests.requestId where requests.requestDate>? and requests.requestDate<? and evaluations.currentTrainingLevel=?;";
		
		if($responsesStmt = $mysqli->prepare($query)){
			if($responsesStmt->bind_param("sss", $startDate, $endDate, $trainingLevel)){
				if($responsesStmt->bind_result($resident, $requestId, $questionId, $response, $weight, $milestoneId, $milestoneTitle, $competencyId, $competencyTitle)){
					if($responsesStmt->execute()){
						while($responsesStmt->fetch()){
							$milestones[] = $milestoneId;
							$milestoneTitles[$milestoneId] = $milestoneTitle;
							$competencies[] = $competencyId;
							$competencyTitles[$competencyId] = $competencyTitle;
							$residents[] = $resident;
							
							$weightedResponsesMilestones[$resident][$milestoneId][] = (floatval($response)*floatval($weight))/floatval($weight);
							$weightedResponsesCompetencies[$resident][$competencyId][] = (floatval($response)*floatval($weight))/floatval($weight);
							
							$averageWeightedResponsesMilestones[$milestoneId][] = (floatval($response)*floatval($weight))/floatval($weight);
							$averageWeightedResponsesCompetencies[$competencyId][] = (floatval($response)*floatval($weight))/floatval($weight);
						}
					}
					else{
						echo $responsesStmt->error;
					}
				}
				else{
					echo $responsesStmt->error;
				}
			}
			else{
				echo $responsesStmt->error;
			}
		}
		else{
			echo $mysqli->error;
		}
		
		echo "<table>";
		echo "<thead><tr>";
		echo "<th>Resident</th>";
		
		foreach(array_unique($milestones) as $milestone){
			$milestoneClassAverages[$milestone] = array_sum($averageWeightedResponsesMilestones[$milestone])/count($averageWeightedResponsesMilestones[$milestone]);
			$milestoneClassStandardDevations[$milestone] = sd($averageWeightedResponsesMilestones[$milestone]);
			
			echo "<th>{$milestone}</th>";
			echo "<th>D{$milestone}</th>";
		}
		
		foreach(array_unique($competencies) as $competency){
			$competencyClassAverages[$competency] = array_sum($averageWeightedResponsesCompetencies[$competency])/count($averageWeightedResponsesCompetencies[$competency]);
			$competencyClassStandardDevations[$competency] = sd($averageWeightedResponsesCompetencies[$competency]);
			
			echo "<th>{$competency}-C</th>";
			echo "<th>D{$competency}-C</th>";
		}
		
		echo "</tr></thead>";
		echo "<tbody>";		
		
		foreach (array_unique($residents) as $resident){
			echo "<tr>";
			echo "<td>{$resident}</td>"; //TODO: change to name
			foreach(array_unique($milestones) as $milestone){
				if(!array_key_exists($milestone, $weightedResponsesMilestones[$resident]) || count($weightedResponsesMilestones[$resident][$milestone]) === 0){
					$milestoneResidentAverage = "x";
					$deviations = "x";
				}
				else{
					$milestoneResidentAverage = array_sum($weightedResponsesMilestones[$resident][$milestone])/count($weightedResponsesMilestones[$resident][$milestone]);
					$deviations = round(($milestoneResidentAverage-$milestoneClassAverages[$milestone])/$milestoneClassStandardDevations[$milestone], 3);
				}
				
				echo "<td>{$milestoneResidentAverage}</td>";
				echo "<td>{$deviations}</td>";
			}
			foreach(array_unique($competencies) as $competency){
				if(!array_key_exists($competency, $weightedResponsesCompetencies[$resident]) || count($weightedResponsesCompetencies[$resident][$competency]) === 0){
					$competencyResidentAverage = "x";
					$deviations = "x";
				}
				else{
					$competencyResidentAverage = array_sum($weightedResponsesCompetencies[$resident][$competency])/count($weightedResponsesCompetencies[$resident][$competency]);
					$deviations = round(($competencyResidentAverage-$competencyClassAverages[$competency])/$competencyClassStandardDevations[$competency], 3);
				}
				
				echo "<td>{$competencyResidentAverage}</td>";
				echo "<td>{$deviations}</td>";
			}
			echo "</tr>";
		}
		echo "</tbody>";
		echo "</table>";
		
		//var_dump($weightedResponsesMilestones);
	}
	
	function drawIndividualGraphs($resident, $trainingLevel, $startDate, $endDate, $milestoneOutput, $competencyOutput){
		global $mysqli;
		
		$responseBaseline = 10; //assuming this for now idk
		$responseMax = 10;
		
		//if(!is_null($resident)){
		//	$query = "select responses.requestId, responses.questionId, responses.response, responses.weight, milestones.milestoneId, milestones.title, competencies.competencyId, competencies.title from responses join requests on requests.requestId=responses.requestId join milestones_questions on responses.questionId=milestones_questions.questionId and requests.formId=milestones_questions.formId join milestones on milestones_questions.milestoneId=milestones.milestoneId join competencies_questions on responses.questionId=competencies_questions.questionId and requests.formId=competencies_questions.formId join competencies on competencies_questions.competencyId=competencies.competencyId join evaluations on evaluations.requestId=requests.requestId where requests.resident=? and requests.requestDate>? and requests.requestDate<? and evaluations.currentTrainingLevel=?;";
		//}
		//else{
		$query = "select requests.resident, responses.requestId, responses.questionId, responses.response, responses.weight, milestones.milestoneId, milestones.title, competencies.competencyId, competencies.title from responses join requests on requests.requestId=responses.requestId join milestones_questions on responses.questionId=milestones_questions.questionId and requests.formId=milestones_questions.formId join milestones on milestones_questions.milestoneId=milestones.milestoneId join competencies_questions on responses.questionId=competencies_questions.questionId and requests.formId=competencies_questions.formId join competencies on competencies_questions.competencyId=competencies.competencyId join evaluations on evaluations.requestId=requests.requestId where requests.requestDate>? and requests.requestDate<? and evaluations.currentTrainingLevel=?;";
		//}
		
		if($responsesStmt = $mysqli->prepare($query)){
			if($responsesStmt->bind_param("sss", $startDate, $endDate, $trainingLevel)){
				if($responsesStmt->bind_result($requestResident, $requestId, $questionId, $response, $weight, $milestoneId, $milestoneTitle, $competencyId, $competencyTitle)){
					if($responsesStmt->execute()){
						while($responsesStmt->fetch()){
							$requestIds[] = $requestId;
							$questionIds[] = $questionId;
							$milestones[] = $milestoneId;
							$milestoneTitles[$milestoneId] = $milestoneTitle;
							$competencies[] = $competencyId;
							$competencyTitles[$competencyId] = $competencyTitle;
							$responses[] = $response;
							$weights[] = $weight;
							
							//$weightedResponsesMilestones[$requestResident][$milestoneId][] = (floatval($response)*floatval($weight))/$responseBaseline*floatval($weight);
							//$weightedResponsesCompetencies[$requestResident][$competencyId][] = (floatval($response)*floatval($weight))/$responseBaseline*floatval($weight);
							
							$averageWeightedResponsesMilestones[$milestoneId][] = (floatval($response)*floatval($weight))/($responseBaseline*floatval($weight));
							$averageWeightedResponsesCompetencies[$competencyId][] = (floatval($response)*floatval($weight))/($responseBaseline*floatval($weight));
							if($requestResident === $resident){
								$residentWeightedResponsesMilestones[$milestoneId][] = (floatval($response)*floatval($weight))/($responseBaseline*floatval($weight));
								$residentWeightedResponsesCompetencies[$competencyId][] = (floatval($response)*floatval($weight))/($responseBaseline*floatval($weight));
								//$residentMilestones[] = $milestonesId;
								//$residentMilestoneTitles[$milestoneId] = $milestoneTitle;
								//$residentCompetencies[] = $competencyId;
								//$residentCompetencyTitles[$competencyId] = $competencyTitle;
							}
							
						}
					}
					else{
						echo $responsesStmt->error;
					}
				}
				else{
					echo $responsesStmt->error;
				}
			}
			else{
				echo $responsesStmt->error;
			}
		}
		else{
			echo $mysqli->error;
		}
		
		foreach (array_unique($milestones) as $milestone){
			$averageWeightedResponsesMilestonesSum[$milestone] = array_sum($averageWeightedResponsesMilestones[$milestone])*$responseMax;
			$averageWeightedResponsesMilestonesAverage[$milestone] = round(($averageWeightedResponsesMilestonesSum[$milestone]/count($averageWeightedResponsesMilestones[$milestone])), 1);
			
			$residentWeightedResponsesMilestonesSum[$milestone] = array_sum($residentWeightedResponsesMilestones[$milestone])*$responseMax;
			$residentWeightedResponsesMilestonesAverage[$milestone] = round(($residentWeightedResponsesMilestonesSum[$milestone]/count($residentWeightedResponsesMilestones[$milestone])), 1);
		}
		
		foreach (array_unique($competencies) as $competency){
			$averageWeightedResponsesCompetenciesSum[$competency] = array_sum($averageWeightedResponsesCompetencies[$competency])*$responseMax;
			$averageWeightedResponsesCompetenciesAverage[$competency] = round(($averageWeightedResponsesCompetenciesSum[$competency]/count($averageWeightedResponsesCompetencies[$competency])), 1);
			
			$residentWeightedResponsesCompetenciesSum[$competency] = array_sum($residentWeightedResponsesCompetencies[$competency])*$responseMax;
			$residentWeightedResponsesCompetenciesAverage[$competency] = round(($residentWeightedResponsesCompetenciesSum[$competency]/count($residentWeightedResponsesCompetencies[$competency])), 1);
		}
		
		//var_dump($weightedResponsesMilestones);
		//var_dump($weightedResponsesMilestonesAverage);
		//var_dump($weightedResponsesCompetenciesAverage);
		//var_dump($milestoneTitles);
		//var_dump(array_unique($competencies));
		//var_dump($competencyTitles);
		

		drawRadar($residentWeightedResponsesMilestonesAverage, $averageWeightedResponsesMilestonesAverage, $milestoneTitles, "Milestones", "Example Milestone Graph", $responseBaseline, $responseMax, $milestoneOutput);
		drawRadar($residentWeightedResponsesCompetenciesAverage, $averageWeightedResponsesCompetenciesAverage, $competencyTitles, "Competencies", "Example Competency Graph", $responseBaseline, $responseMax, $competencyOutput);

	}
	
	function drawRadar($residentValues, $averageValues, $indeces, $indecesLabel, $title, $baseline, $max, $output){
		require_once "pChart2.1.4/class/pData.class.php";
		require_once "pChart2.1.4/class/pDraw.class.php";
		require_once "pChart2.1.4/class/pRadar.class.php";
		require_once "pChart2.1.4/class/pImage.class.php";
		
		
		$myData = new pData();
		$myData->addPoints($averageValues, "Average");
		$myData->addPoints($residentValues, "Resident");
		$myData->setSerieDescription("Resident", "Individual Performance");
		$myData->setSerieDescription("Average", "Average Resident Performance");
		$myData->setPalette("Resident", array("R"=>157, "G"=>196, "B"=>22));
		$myData->setPalette("Average", array("R"=>255, "G"=>165, "B"=>0));
		$myData->addPoints($indeces, $indecesLabel);
		$myData->setAbscissa($indecesLabel);
		
		$myPicture = new pImage(500, 500, $myData);
		$myPicture->drawGradientArea(0,0,500,500,DIRECTION_VERTICAL,array("StartR"=>200,"StartG"=>200,"StartB"=>200,"EndR"=>240,"EndG"=>240,"EndB"=>240,"Alpha"=>100));
		$myPicture->drawGradientArea(0,0,500,20,DIRECTION_HORIZONTAL,array("StartR"=>30,"StartG"=>30,"StartB"=>30,"EndR"=>100,"EndG"=>100,"EndB"=>100,"Alpha"=>100));
		$myPicture->drawLine(0,20,500,20,array("R"=>255,"G"=>255,"B"=>255));
		
		$myPicture->setFontProperties(array("FontName"=>"pChart2.1.4/fonts/verdana.ttf","FontSize"=>8));
		$myPicture->drawText(10,13,$title,array("R"=>255,"G"=>255,"B"=>255));
		
		$myChart = new pRadar();
		$myPicture->setGraphArea(10, 25, 490, 490);
		$myOptions = array("DrawPoly"=>TRUE,"WriteValues"=>TRUE,"ValueFontSize"=>8,"Layout"=>RADAR_LAYOUT_CIRCLE,"BackgroundGradient"=>array("StartR"=>255,"StartG"=>255,"StartB"=>255,"StartAlpha"=>100,"EndR"=>207,"EndG"=>227,"EndB"=>125,"EndAlpha"=>50));
		
		$segments = 5;
		$myOptions["Segments"] = $segments;
		$myOptions["SegmentHeight"] = $max/$segments;
		
		$myChart->drawRadar($myPicture, $myData, $myOptions);
		
		$myPicture->render($output);
	}
	
	

