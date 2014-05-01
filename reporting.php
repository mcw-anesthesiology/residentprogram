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
		
		$redStandardDeviation = 1;
		$yellowStandardDeviation = 0.75;
		$greenStandardDeviation = 0.5;
		
		$query = "select requests.resident, responses.requestId, responses.questionId, responses.response, responses.weight, milestones.milestoneId, milestones.title, competencies.competencyId, competencies.title from responses join requests on requests.requestId=responses.requestId join milestones_questions on responses.questionId=milestones_questions.questionId and requests.formId=milestones_questions.formId join milestones on milestones_questions.milestoneId=milestones.milestoneId join competencies_questions on responses.questionId=competencies_questions.questionId and requests.formId=competencies_questions.formId join competencies on competencies_questions.competencyId=competencies.competencyId join evaluations on evaluations.requestId=requests.requestId where requests.requestDate>? and requests.requestDate<? and evaluations.currentTrainingLevel=?;";
		
		if($responsesStmt = $mysqli->prepare($query)){
			if($responsesStmt->bind_param("sss", $startDate, $endDate, $trainingLevel)){
				if($responsesStmt->bind_result($requestResident, $requestId, $questionId, $response, $weight, $milestoneId, $milestoneTitle, $competencyId, $competencyTitle)){
					if($responsesStmt->execute()){
						while($responsesStmt->fetch()){
							$milestones[] = $milestoneId;
							$milestoneTitles[$milestoneId] = $milestoneTitle;
							$competencies[] = $competencyId;
							$competencyTitles[$competencyId] = $competencyTitle;
							$residents[] = $requestResident;
							
							$averageWeightedResponsesMilestones[$milestoneId][] = (floatval($response)*floatval($weight));
							$averageWeightedResponsesMilestonesDenominator[$milestoneId][] = floatval($weight);
							$averageWeightedResponsesCompetencies[$competencyId][] = (floatval($response)*floatval($weight));
							$averageWeightedResponsesCompetenciesDenominator[$competencyId][] = floatval($weight);
							
							$residentWeightedResponsesMilestones[$requestResident][$milestoneId][] = (floatval($response)*floatval($weight));
							$residentWeightedResponsesMilestonesDenominator[$requestResident][$milestoneId][] = floatval($weight);
							$residentWeightedResponsesCompetencies[$requestResident][$competencyId][] = (floatval($response)*floatval($weight));
							$residentWeightedResponsesCompetenciesDenominator[$requestResident][$competencyId][] = floatval($weight);
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
		
		echo "<table class='table'>";
		echo "<thead><tr>";
		echo "<th>Resident</th>";
		
		foreach(array_unique($milestones) as $milestone){
			$milestoneClassAverages[$milestone] = array_sum($averageWeightedResponsesMilestones[$milestone])/array_sum($averageWeightedResponsesMilestonesDenominator[$milestone]);
			foreach ($residents as $resident){
				$milestoneClassAveragesResidents[$milestone][$resident] = array_sum($residentWeightedResponsesMilestones[$resident][$milestone])/array_sum($residentWeightedResponsesMilestonesDenominator[$resident][$milestone]);
			}
			$milestoneClassStandardDevations[$milestone] = sd($milestoneClassAveragesResidents[$milestone]);
			
			echo "<th>{$milestone}</th>";
			echo "<th>D{$milestone}</th>";
		}
		
		foreach(array_unique($competencies) as $competency){
			$competencyClassAverages[$competency] = array_sum($averageWeightedResponsesCompetencies[$competency])/array_sum($averageWeightedResponsesCompetenciesDenominator[$competency]);
			foreach ($residents as $resident){
				$competencyClassAveragesResidents[$competency][$resident] = array_sum($residentWeightedResponsesCompetencies[$resident][$competency])/array_sum($residentWeightedResponsesCompetenciesDenominator[$resident][$competency]);
			}
			$competencyClassStandardDevations[$competency] = sd($competencyClassAveragesResidents[$competency]);
			
			echo "<th>{$competency}-C</th>";
			echo "<th>D{$competency}-C</th>";
		}
		
		echo "</tr></thead>";
		echo "<tbody>";		
		
		foreach (array_unique($residents) as $resident){
			echo "<tr>";
			echo "<td>{$resident}</td>"; //TODO: change to name
			foreach(array_unique($milestones) as $milestone){
				if(!array_key_exists($milestone, $residentWeightedResponsesMilestones[$resident]) || !array_key_exists($milestone, $residentWeightedResponsesMilestonesDenominator[$resident])){
					$milestoneResidentAverage = "x";
					$deviations = "x";
				}
				else{
					$milestoneResidentAverage = round(array_sum($residentWeightedResponsesMilestones[$resident][$milestone])/array_sum($residentWeightedResponsesMilestonesDenominator[$resident][$milestone]), 3);
					$deviations = round(($milestoneResidentAverage-$milestoneClassAverages[$milestone])/$milestoneClassStandardDevations[$milestone], 3);
				}
				
				$colorClass = "";
				
				if($deviations === "x" || abs($deviations) > $redStandardDeviation){
					$colorClass = "red";
				}
				else if(abs($deviations) > $yellowStandardDeviation){
					$colorClass = "yellow";
				}
				else if(abs($deviations) < $greenStandardDeviation){
					$colorClass = "green";
				}
				
				echo "<td>{$milestoneResidentAverage}</td>";
				echo "<td class='{$colorClass}'>{$deviations}</td>";
			}
			foreach(array_unique($competencies) as $competency){
				if(!array_key_exists($competency, $residentWeightedResponsesCompetencies[$resident]) || !array_key_exists($competency, $residentWeightedResponsesCompetenciesDenominator[$resident])){
					$competencyResidentAverage = "x";
					$deviations = "x";
				}
				else{
					$competencyResidentAverage = round(array_sum($residentWeightedResponsesCompetencies[$resident][$competency])/array_sum($residentWeightedResponsesCompetenciesDenominator[$resident][$competency]), 3);
					$deviations = round(($competencyResidentAverage-$competencyClassAverages[$competency])/$competencyClassStandardDevations[$competency], 3);
				}
				
				$colorClass = "";
				
				if($deviations === "x" || abs($deviations) > $redStandardDeviation){
					$colorClass = "red";
				}
				else if(abs($deviations) > $yellowStandardDeviation){
					$colorClass = "yellow";
				}
				else if(abs($deviations) < $greenStandardDeviation){
					$colorClass = "green";
				}				
				
				echo "<td>{$competencyResidentAverage}</td>";
				echo "<td class='{$colorClass}'>{$deviations}</td>";
			}
			echo "</tr>";
		}
		echo "</tbody>";
		echo "</table>";
		
		//var_dump($weightedResponsesMilestones);
	}
	
	function drawAllGraphs($trainingLevel, $startDate, $endDate){
		drawIndividualGraphs(null, $trainingLevel, $startDate, $endDate);
	}
	
	function drawIndividualGraphs($resident, $trainingLevel, $startDate, $endDate){
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
							$residents[] = $requestResident;
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
							
							$averageWeightedResponsesMilestones[$milestoneId][] = (floatval($response)*floatval($weight));
							$averageWeightedResponsesMilestonesDenominator[$milestoneId][] = floatval($weight);
							$averageWeightedResponsesCompetencies[$competencyId][] = (floatval($response)*floatval($weight));
							$averageWeightedResponsesCompetenciesDenominator[$competencyId][] = floatval($weight);
							//if($requestResident === $resident){
								$residentWeightedResponsesMilestones[$requestResident][$milestoneId][] = (floatval($response)*floatval($weight));
								$residentWeightedResponsesMilestonesDenominator[$requestResident][$milestoneId][] = floatval($weight);
								$residentWeightedResponsesCompetencies[$requestResident][$competencyId][] = (floatval($response)*floatval($weight));
								$residentWeightedResponsesCompetenciesDenominator[$requestResident][$competencyId][] = floatval($weight);
								//$residentMilestones[] = $milestonesId;
								//$residentMilestoneTitles[$milestoneId] = $milestoneTitle;
								//$residentCompetencies[] = $competencyId;
								//$residentCompetencyTitles[$competencyId] = $competencyTitle;
							//}
							
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
			$averageWeightedResponsesMilestonesSum[$milestone] = (array_sum($averageWeightedResponsesMilestones[$milestone])/array_sum($averageWeightedResponsesMilestonesDenominator[$milestone]));
			$averageWeightedResponsesMilestonesAverage[$milestone] = round(($averageWeightedResponsesMilestonesSum[$milestone]), 1);
		}
		
		foreach (array_unique($competencies) as $competency){
			$averageWeightedResponsesCompetenciesSum[$competency] = (array_sum($averageWeightedResponsesCompetencies[$competency])/array_sum($averageWeightedResponsesCompetenciesDenominator[$competency]));
			$averageWeightedResponsesCompetenciesAverage[$competency] = round(($averageWeightedResponsesCompetenciesSum[$competency]), 1);
		}
		
		if(is_null($resident)){
			foreach (array_unique($residents) as $resident){
				foreach (array_unique($milestones) as $milestone){
					$residentWeightedResponsesMilestonesSum[$resident][$milestone] = (array_sum($residentWeightedResponsesMilestones[$resident][$milestone])/array_sum($residentWeightedResponsesMilestonesDenominator[$resident][$milestone]));
					$residentWeightedResponsesMilestonesAverage[$resident][$milestone] = round(($residentWeightedResponsesMilestonesSum[$resident][$milestone]), 1);
				}
				
				foreach (array_unique($competencies) as $competency){
					$residentWeightedResponsesCompetenciesSum[$resident][$competency] = (array_sum($residentWeightedResponsesCompetencies[$resident][$competency])/array_sum($residentWeightedResponsesCompetenciesDenominator[$resident][$competency]));
					$residentWeightedResponsesCompetenciesAverage[$resident][$competency] = round(($residentWeightedResponsesCompetenciesSum[$resident][$competency]), 1);
				}
				
				drawRadar($residentWeightedResponsesMilestonesAverage[$resident], $averageWeightedResponsesMilestonesAverage, $milestoneTitles, "Milestones", $resident." Milestone Graph ".$trainingLevel, $responseMax);
				drawRadar($residentWeightedResponsesCompetenciesAverage[$resident], $averageWeightedResponsesCompetenciesAverage, $competencyTitles, "Competencies", $resident." Competency Graph ".$trainingLevel, $responseMax);
				echo "<br/>";
			}
		}
		else{
			foreach (array_unique($milestones) as $milestone){
				$residentWeightedResponsesMilestonesSum[$resident][$milestone] = (array_sum($residentWeightedResponsesMilestones[$resident][$milestone])/array_sum($residentWeightedResponsesMilestonesDenominator[$resident][$milestone]));
				$residentWeightedResponsesMilestonesAverage[$resident][$milestone] = round(($residentWeightedResponsesMilestonesSum[$resident][$milestone]), 1);
			}
			
			foreach (array_unique($competencies) as $competency){
				$residentWeightedResponsesCompetenciesSum[$resident][$competency] = (array_sum($residentWeightedResponsesCompetencies[$resident][$competency])/array_sum($residentWeightedResponsesCompetenciesDenominator[$resident][$competency]));
				$residentWeightedResponsesCompetenciesAverage[$resident][$competency] = round(($residentWeightedResponsesCompetenciesSum[$resident][$competency]), 1);
			}
			
			drawRadar($residentWeightedResponsesMilestonesAverage[$resident], $averageWeightedResponsesMilestonesAverage, $milestoneTitles, "Milestones", $resident." Milestone Graph ".$trainingLevel, $responseMax);
			drawRadar($residentWeightedResponsesCompetenciesAverage[$resident], $averageWeightedResponsesCompetenciesAverage, $competencyTitles, "Competencies", $resident." Competency Graph ".$trainingLevel, $responseMax);
		}

		
		//var_dump($weightedResponsesMilestones);
		//var_dump($weightedResponsesMilestonesAverage);
		//var_dump($weightedResponsesCompetenciesAverage);
		//var_dump($milestoneTitles);
		//var_dump(array_unique($competencies));
		//var_dump($competencyTitles);

	}
	
	function averageMilestonesCompetencies($resident, $milestones, $competencies, $responseMax, $residentWeightedResponsesMilestones, $residentWeightedResponsesMilestonesDenominator, $residentWeightedResponsesCompetencies, $residentWeightedResponsesCompetenciesDenominator){
		
		
	}
	
	function drawRadar($residentValues, $averageValues, $indeces, $indecesLabel, $title, $max){
		//TODO: need to also remove image files after a certain amount of time to save disk space
		require_once "pChart2.1.4/class/pData.class.php";
		require_once "pChart2.1.4/class/pDraw.class.php";
		require_once "pChart2.1.4/class/pRadar.class.php";
		require_once "pChart2.1.4/class/pImage.class.php";
		require_once "pChart2.1.4/class/pCache.class.php";
		
		
		$myData = new pData();
		$myData->addPoints($averageValues, "Average");
		$myData->addPoints($residentValues, "Resident");
		$myData->setSerieDescription("Resident", "Individual Performance");
		$myData->setSerieDescription("Average", "Average Resident Performance");
		$myData->setPalette("Resident", array("R"=>157, "G"=>196, "B"=>22));
		$myData->setPalette("Average", array("R"=>255, "G"=>165, "B"=>0));
		$myData->addPoints($indeces, $indecesLabel);
		$myData->setAbscissa($indecesLabel);
		
		$myCache = new pCache();
		$chartHash = $myCache->getHash($myData);
		$output = "graphs/".$chartHash.".png";
		
		if($myCache->isInCache($chartHash)){
			$myCache->saveFromCache($chartHash, $output);
		}
		else{		
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
		
		echo "<img src='{$output}'/>";
	}
	
	function clearCache(){
		require_once "pChart2.1.4/class/pCache.class.php";
		$myCache = new pCache();
		$myCache->removeOlderThan(60*60*24);
	}
	
	

