<?php
	//This page is used to define functions used in generating reports for users. 

	//TODO: add proposed ideal average level for graph
	//TODO: try to remove numbers from graph and replace with "ca-1", etc
	//TODO: make the graph not look so ugly
	//TODO: graph keys
	
	
	function sd_square($x, $mean) { 
	// Function to calculate square of value - mean
		return pow($x - $mean,2); 
	}
	
	
	function sd($array) {
	// Function to calculate standard deviation (uses sd_square)    
		
		// square root of sum of squares devided by N-1
		return sqrt(array_sum(array_map("sd_square", $array, array_fill(0,count($array), (array_sum($array) / count($array)) ) ) ) / (count($array)-1) );
	}
	
	function createReportTable($trainingLevel, $startDate, $endDate){
	//Creates the report table that is displayed in aggregate reports that displays resident milestone/competency averages and number of standard deviations from the mean of resident milestone/competency averages.
		global $mysqli;
		
		//$startDateCentral = $startDate;
		$startDateCentral = new DateTime($startDate, new DateTimeZone("America/Chicago"));
		$startDateCentral->setTimezone("UTC");
		$startDate = $startDateCentral->format("Y-m-d H:i:s");
		
		$endDateCentral = new DateTime($endDate, new DateTimeZone("America/Chicago"));
		$endDateCentral->setTimezone("UTC");
		$endDate = $endDateCentral->format("Y-m-d H:i:s");
				
		$redStandardDeviation = 1;
		$yellowStandardDeviation = 0.75;
		$greenStandardDeviation = 0.5;
		
		$query = "select requests.resident, responses.requestId, responses.questionId, responses.response, responses.weight, milestones.milestoneId, milestones.title, competencies.competencyId, competencies.title from responses join requests on requests.requestId=responses.requestId join milestones_questions on responses.questionId=milestones_questions.questionId and requests.formId=milestones_questions.formId join milestones on milestones_questions.milestoneId=milestones.milestoneId join competencies_questions on responses.questionId=competencies_questions.questionId and requests.formId=competencies_questions.formId join competencies on competencies_questions.competencyId=competencies.competencyId join evaluations on evaluations.requestId=requests.requestId where requests.status='complete' and requests.requestDate>? and requests.requestDate<? and evaluations.currentTrainingLevel=?;";
		
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
							$requests[] = $requestId;
							
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
		
		if(empty($requests)){
			echo "<h3>No completed evaluations found with the selected parameters. Please adjust your inputs and try again.</h3>";
			return;
		}
		
		echo "<table class='table'>";
		echo "<thead><tr>";
		echo "<th>Resident</th>";
		
		$tsv = "Resident\t";
		
		sort($milestones);
		sort($competencies);
		
		foreach(array_unique($milestones) as $milestone){
			$milestoneClassAverages[$milestone] = array_sum($averageWeightedResponsesMilestones[$milestone])/array_sum($averageWeightedResponsesMilestonesDenominator[$milestone]);
			foreach ($residents as $resident){
				$milestoneClassAveragesResidents[$milestone][$resident] = array_sum($residentWeightedResponsesMilestones[$resident][$milestone])/array_sum($residentWeightedResponsesMilestonesDenominator[$resident][$milestone]);
			}
			$milestoneClassStandardDevations[$milestone] = sd($milestoneClassAveragesResidents[$milestone]);
			
			echo "<th nowrap>{$milestone}</th>"; $tsv .= $milestone."\t";
			echo "<th nowrap>D{$milestone}</th>"; $tsv .= "D".$milestone."\t";
		}
		
		foreach(array_unique($competencies) as $competency){
			$competencyClassAverages[$competency] = array_sum($averageWeightedResponsesCompetencies[$competency])/array_sum($averageWeightedResponsesCompetenciesDenominator[$competency]);
			foreach ($residents as $resident){
				$competencyClassAveragesResidents[$competency][$resident] = array_sum($residentWeightedResponsesCompetencies[$resident][$competency])/array_sum($residentWeightedResponsesCompetenciesDenominator[$resident][$competency]);
			}
			$competencyClassStandardDevations[$competency] = sd($competencyClassAveragesResidents[$competency]);
			
			echo "<th nowrap>{$competency}-C</th>"; $tsv .= $competency."-C\t";
			echo "<th nowrap>D{$competency}-C</th>"; $tsv .= "D".$competency."-C\t";
		}
		
		echo "</tr></thead>";
		echo "<tbody>";		
		$tsv .= "\n";
		
		foreach (array_unique($residents) as $resident){
			echo "<tr>";
			echo "<td>{$resident}</td>"; //TODO: change to name instead of username
			$tsv .= $resident."\t";
			foreach(array_unique($milestones) as $milestone){
				if(!array_key_exists($milestone, $residentWeightedResponsesMilestones[$resident]) || !array_key_exists($milestone, $residentWeightedResponsesMilestonesDenominator[$resident])){
					$milestoneResidentAverage = "x";
					$deviations = "x";
				}
				else{
					$milestoneResidentAverage = round(array_sum($residentWeightedResponsesMilestones[$resident][$milestone])/array_sum($residentWeightedResponsesMilestonesDenominator[$resident][$milestone]), 3);
					$deviations = round(($milestoneResidentAverage-$milestoneClassAverages[$milestone])/$milestoneClassStandardDevations[$milestone], 3);
				}
				
				/*
				$colorClass = "";
				
				if($deviations === "x" || abs($deviations) > $redStandardDeviation){
					//$colorClass = "red";
				}
				else if(abs($deviations) > $yellowStandardDeviation){
					//$colorClass = "yellow";
				}
				else if(abs($deviations) < $greenStandardDeviation){
					//$colorClass = "green";
				}
				*/
				
				echo "<td>{$milestoneResidentAverage}</td>"; $tsv .= $milestoneResidentAverage."\t";
				echo "<td class='{$colorClass}'>{$deviations}</td>"; $tsv .= $deviations."\t";
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
				
				/*
				$colorClass = "";
				
				if($deviations === "x" || abs($deviations) > $redStandardDeviation){
					//$colorClass = "red";
				}
				else if(abs($deviations) > $yellowStandardDeviation){
					//$colorClass = "yellow";
				}
				else if(abs($deviations) < $greenStandardDeviation){
					//$colorClass = "green";
				}
				*/				
				
				echo "<td>{$competencyResidentAverage}</td>"; $tsv .= $competencyResidentAverage."\t";
				echo "<td class='{$colorClass}'>{$deviations}</td>"; $tsv .= $deviations."\t";
			}
			echo "</tr>"; $tsv .= "\n";
		}
		echo "</tbody>";
		echo "</table>";
		
		echo "<form style='text-align:center;' target='_blank' method='post' action='save_table.php'><button type='submit' class='btn btn-default' name='tsv' value='{$tsv}'>Save as TSV</button></form>";
		echo "<br />";
		
	}
	
	function drawAllGraphs($trainingLevel, $startDate, $endDate){
	//Simply a convenience class to call drawIndividualGraphs and print all graphs instead of the graphs for just one resident
		drawIndividualGraphs(null, $trainingLevel, $startDate, $endDate);
	}
	
	function drawIndividualGraphs($resident, $trainingLevel, $startDate, $endDate){
	//Pulls responses for all residents with evaluations completed within the specified trainingLevel and between startDate and endDate. Data for all residents is averaged, and
	//the drawRadar function is called to draw the radar graphs for each resident selected.
		global $mysqli;
		
		$responseBaseline = 10; //assuming this for now idk
		$responseMax = 10;
		
		$query = "select requests.resident, responses.requestId, responses.questionId, responses.response, responses.weight, milestones.milestoneId, milestones.title, competencies.competencyId, competencies.title from responses join requests on requests.requestId=responses.requestId join milestones_questions on responses.questionId=milestones_questions.questionId and requests.formId=milestones_questions.formId join milestones on milestones_questions.milestoneId=milestones.milestoneId join competencies_questions on responses.questionId=competencies_questions.questionId and requests.formId=competencies_questions.formId join competencies on competencies_questions.competencyId=competencies.competencyId join evaluations on evaluations.requestId=requests.requestId where requests.status='complete' and requests.requestDate>? and requests.requestDate<? and evaluations.currentTrainingLevel=?;";
		
		if($responsesStmt = $mysqli->prepare($query)){
			if($responsesStmt->bind_param("sss", $startDate, $endDate, $trainingLevel)){
				if($responsesStmt->bind_result($requestResident, $requestId, $questionId, $response, $weight, $milestoneId, $milestoneTitle, $competencyId, $competencyTitle)){
					if($responsesStmt->execute()){
						while($responsesStmt->fetch()){
							$residents[] = $requestResident;
							$requests[] = $requestId;
							$questionIds[] = $questionId;
							$milestones[] = $milestoneId;
							$milestoneTitles[$milestoneId] = $milestoneTitle;
							$competencies[] = $competencyId;
							$competencyTitles[$competencyId] = $competencyTitle;
							$responses[] = $response;
							$weights[] = $weight;
							
							
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
		
		if(empty($requests)){
			echo "<h3>No completed evaluations found with the selected parameters. Please adjust your inputs and try again.</h3>";
			return;
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
				
				echo "<div class='graphs'>";
				drawRadar($residentWeightedResponsesMilestonesAverage[$resident], $averageWeightedResponsesMilestonesAverage, $milestoneTitles, $residentWeightedResponsesCompetenciesAverage[$resident], $averageWeightedResponsesCompetenciesAverage, $competencyTitles, $resident, $trainingLevel, $responseMax);
				echo "</div><br/>";
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
				
				echo "<div class='graphs'>";
				drawRadar($residentWeightedResponsesMilestonesAverage[$resident], $averageWeightedResponsesMilestonesAverage, $milestoneTitles, $residentWeightedResponsesCompetenciesAverage[$resident], $averageWeightedResponsesCompetenciesAverage, $competencyTitles, $resident, $trainingLevel, $responseMax);
				echo "</div><br/>";
		}

	}
	
	function writeTextResponses($resident, $trainingLevel, $startDate, $endDate){
		
		global $mysqli;
		
		$query = "select response from textResponses join requests on textResponses.requestId=requests.requestId join users on requests.resident=users.username where resident=? and trainingLevel=? and requestDate>? and requestDate<? and requests.status='complete';";
		
		if($stmt = $mysqli->prepare($query)){
			if($stmt->bind_param("ssss", $resident, $trainingLevel, $startDate, $endDate)){
				if($stmt->bind_result($response)){
					if($stmt->execute()){
						while($stmt->fetch()){
							echo "<p>";
							echo $response;
							echo "</p>";
						}
					}
					else{
						print $stmt->error;
					}
				}
				else{
					print $stmt->error;
				}
			}
			else{
				print $stmt->error;
			}
		}
		else{
			print $mysqli->error;
		}
		
	}
	
	function drawRadar($milestoneResidentValues, $milestoneAverageValues, $milestoneTitles, $competencyResidentValues, $competencyAverageValues, $competencyTitles, $resident, $trainingLevel, $max){
	//Uses pChart (http://www.pchart.net/) to display radar graphs for resident milestones/competencies in regards to the average of resident milestones/competencies
		
		//TODO: need to also remove image files after a certain amount of time to save disk space
		require_once "pChart2.1.4/class/pData.class.php";
		require_once "pChart2.1.4/class/pDraw.class.php";
		require_once "pChart2.1.4/class/pRadar.class.php";
		require_once "pChart2.1.4/class/pImage.class.php";
		require_once "pChart2.1.4/class/pCache.class.php";
		
		
		$milestoneData = new pData();
		$milestoneData->addPoints($milestoneAverageValues, "Average");
		$milestoneData->addPoints($milestoneResidentValues, "Resident");
		$milestoneData->setSerieDescription("Resident", "Individual Performance");
		$milestoneData->setSerieDescription("Average", "Average Resident Performance");
		$milestoneData->setPalette("Resident", array("R"=>227, "G"=>0, "B"=>0));
		$milestoneData->setPalette("Average", array("R"=>227, "G"=>227, "B"=>0));
		$milestoneData->addPoints($milestoneTitles, "Milestones");
		$milestoneData->setAbscissa("Milestones");
		
		$competencyData = new pData();
		$competencyData->addPoints($competencyAverageValues, "Average");
		$competencyData->addPoints($competencyResidentValues, "Resident");
		$competencyData->setSerieDescription("Resident", "Individual Performance");
		$competencyData->setSerieDescription("Average", "Average Resident Performance");
		$competencyData->setPalette("Resident", array("R"=>227, "G"=>0, "B"=>0));
		$competencyData->setPalette("Average", array("R"=>227, "G"=>227, "B"=>0));
		$competencyData->addPoints($competencyTitles, "Competencies");
		$competencyData->setAbscissa("Competencies");
		
		$myCache = new pCache();
		$chartHash = $myCache->getHash($milestoneData);
		$output = "graphs/".$chartHash.".png";
		
		if($myCache->isInCache($chartHash)){
			$myCache->saveFromCache($chartHash, $output);
		}
		else{		
			$myPicture = new pImage(1800, 600, $milestoneData);
			$myPicture->drawGradientArea(0,0,1800,600,DIRECTION_VERTICAL,array("StartR"=>200,"StartG"=>200,"StartB"=>200,"EndR"=>240,"EndG"=>240,"EndB"=>240,"Alpha"=>100));
			$myPicture->drawGradientArea(0,0,1800,20,DIRECTION_HORIZONTAL,array("StartR"=>30,"StartG"=>30,"StartB"=>30,"EndR"=>100,"EndG"=>100,"EndB"=>100,"Alpha"=>100));
			$myPicture->drawLine(0,20,1800,20,array("R"=>255,"G"=>255,"B"=>255));
			
			$myPicture->setFontProperties(array("FontName"=>"pChart2.1.4/fonts/verdana.ttf","FontSize"=>8));
			$myPicture->drawText(10,13,$resident." Milestone ".$trainingLevel,array("R"=>255,"G"=>255,"B"=>255));
			$myPicture->drawText(910,13,$resident." Competency ".$trainingLevel,array("R"=>255,"G"=>255,"B"=>255));
			
			$myPicture->drawLine(900, 0, 900, 600, array("R"=>255,"G"=>255,"B"=>255));
			
			$myChart = new pRadar();
			
			$myOptions = array("DrawAxisValues"=>FALSE,"WriteValues"=>FALSE,"WriteValuesInBubble"=>FALSE,"DrawPoly"=>TRUE,"Layout"=>RADAR_LAYOUT_CIRCLE,"BackgroundGradient"=>array("StartR"=>255,"StartG"=>255,"StartB"=>255,"StartAlpha"=>100,"EndR"=>6,"EndG"=>85,"EndB"=>144,"EndAlpha"=>50), "LabelPos"=>RADAR_LABELS_HORIZONTAL);
			
			$segments = 5;
			$myOptions["Segments"] = $segments;
			$myOptions["SegmentHeight"] = $max/$segments;
			
			$myPicture->setGraphArea(200, 50, 700, 550);
			$myChart->drawRadar($myPicture, $milestoneData, $myOptions);

			$myOptions["BackgroundGradient"] = array("StartR"=>255,"StartG"=>255,"StartB"=>255,"StartAlpha"=>100,"EndR"=>1,"EndG"=>108,"EndB"=>100,"EndAlpha"=>50);
			
			$myPicture->setGraphArea(1100, 50, 1600, 550);
			$myChart->drawRadar($myPicture, $competencyData, $myOptions);
			
			$myPicture->drawText(435, 275, "CA-0", array("R"=>0,"G"=>0,"B"=>0));
			$myPicture->drawText(435, 225, "CA-1", array("R"=>0,"G"=>0,"B"=>0));
			$myPicture->drawText(435, 175, "CA-2", array("R"=>0,"G"=>0,"B"=>0));
			$myPicture->drawText(435, 125, "CA-3", array("R"=>0,"G"=>0,"B"=>0));
			$myPicture->drawText(420, 75, "Attending", array("R"=>0,"G"=>0,"B"=>0));
			
			$myPicture->drawText(1335, 275, "CA-0", array("R"=>0,"G"=>0,"B"=>0));
			$myPicture->drawText(1335, 225, "CA-1", array("R"=>0,"G"=>0,"B"=>0));
			$myPicture->drawText(1335, 175, "CA-2", array("R"=>0,"G"=>0,"B"=>0));
			$myPicture->drawText(1335, 125, "CA-3", array("R"=>0,"G"=>0,"B"=>0));
			$myPicture->drawText(1320, 75, "Attending", array("R"=>0,"G"=>0,"B"=>0));
			
			$myPicture->drawLegend(737, 550, array("Style"=>LEGEND_BOX, "Mode"=>LEGEND_HORIZONTAL));
			
			$myPicture->render($output);
		}
		
		echo "<img src='{$output}'/>";
	}
	
	function clearCache(){
	//Clears the chart cache
		require_once "pChart2.1.4/class/pCache.class.php";
		$myCache = new pCache();
		$myCache->removeOlderThan(60*60*24);
	}
	
	

