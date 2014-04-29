<?php
	function getClassAverage($trainingLevel, $startDate, $endDate){
		global $mysqli;
		
		
	}
	
	function drawIndividualGraph($graph, $resident, $trainingLevel, $startDate, $endDate){
		global $mysqli;
		
		$responseBaseline = 10; //assuming this for now idk
		
		if($responsesStmt = $mysqli->prepare("select responses.requestId, responses.questionId, responses.response, responses.weight, milestones.milestoneId, milestones.title, competencies.competencyId, competencies.title from responses join requests on requests.requestId=responses.requestId join milestones_questions on responses.questionId=milestones_questions.questionId and requests.formId=milestones_questions.formId join milestones on milestones_questions.milestoneId=milestones.milestoneId join competencies_questions on responses.questionId=competencies_questions.questionId and requests.formId=competencies_questions.formId join competencies on competencies_questions.competencyId=competencies.competencyId join evaluations on evaluations.requestId=requests.requestId where requests.resident=? and requests.requestDate>? and requests.requestDate<? and evaluations.currentTrainingLevel=?;")){
			if($responsesStmt->bind_param("ssss", $resident, $startDate, $endDate, $trainingLevel)){
				if($responsesStmt->bind_result($requestId, $questionId, $response, $weight, $milestoneId, $milestoneTitle, $competencyId, $competencyTitle)){
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
							$weightedResponsesMilestones[$milestoneId][] = (floatval($response)*floatval($weight))/floatval($weight);
							$weightedResponsesCompetencies[$competencyId][] = (floatval($response)*floatval($weight))/floatval($weight);
							
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
			$weightedResponsesMilestonesSum[$milestone] = array_sum($weightedResponsesMilestones[$milestone]);
			$weightedResponsesMilestonesAverage[$milestone] = round(($weightedResponsesMilestonesSum[$milestone]/count($weightedResponsesMilestones[$milestone])), 1);
		}
		
		foreach (array_unique($competencies) as $competency){
			$weightedResponsesCompetenciesSum[$competency] = array_sum($weightedResponsesCompetencies[$competency]);
			$weightedResponsesCompetenciesAverage[$competency] = round(($weightedResponsesCompetenciesSum[$competency]/count($weightedResponsesCompetencies[$competency])), 1);
		}
		
		var_dump($weightedResponsesMilestones);
		var_dump($weightedResponsesMilestonesAverage);
		var_dump($weightedResponsesCompetenciesAverage);
		var_dump($milestoneTitles);
		var_dump(array_unique($competencies));
		var_dump($competencyTitles);
		

		drawRadar($weightedResponsesMilestonesAverage, $milestoneTitles, $responseBaseline, "milestones.png");
		drawRadar($weightedResponsesCompetenciesAverage, $competencyTitles, $responseBaseline, "competencies.png");

	}
	
	function createRadar(){
		//$myData = new pData();
	}
	
	function drawRadar($values, $indeces, $baseline, $output){
		require_once "pChart2.1.4/class/pData.class.php";
		require_once "pChart2.1.4/class/pDraw.class.php";
		require_once "pChart2.1.4/class/pRadar.class.php";
		require_once "pChart2.1.4/class/pImage.class.php";
		
		
		$myData = new pData();
		$myData->addPoints($values, "Resident");
		$myData->setSerieDescription("Resident", "Individual Performance");
		$myData->setPalette("Resident", array("R"=>157, "G"=>196, "B"=>22));
		$myData->addPoints($indeces, "Milestones");
		$myData->setAbscissa("Milestones");
		
		$myPicture = new pImage(500, 500, $myData);
		$myPicture->drawGradientArea(0,0,500,500,DIRECTION_VERTICAL,array("StartR"=>200,"StartG"=>200,"StartB"=>200,"EndR"=>240,"EndG"=>240,"EndB"=>240,"Alpha"=>100));
		$myPicture->drawGradientArea(0,0,500,20,DIRECTION_HORIZONTAL,array("StartR"=>30,"StartG"=>30,"StartB"=>30,"EndR"=>100,"EndG"=>100,"EndB"=>100,"Alpha"=>100));
		$myPicture->drawLine(0,20,500,20,array("R"=>255,"G"=>255,"B"=>255));
		
		$myPicture->setFontProperties(array("FontName"=>"pChart2.1.4/fonts/verdana.ttf","FontSize"=>8));
		$myPicture->drawText(10,13,"Test?",array("R"=>255,"G"=>255,"B"=>255));
		
		$myChart = new pRadar();
		$myPicture->setGraphArea(10, 25, 490, 490);
		$myOptions = array("DrawPoly"=>TRUE,"WriteValues"=>TRUE,"ValueFontSize"=>8,"Layout"=>RADAR_LAYOUT_CIRCLE,"BackgroundGradient"=>array("StartR"=>255,"StartG"=>255,"StartB"=>255,"StartAlpha"=>100,"EndR"=>207,"EndG"=>227,"EndB"=>125,"EndAlpha"=>50));
		
		$segments = 5;
		$myOptions["Segments"] = $segments;
		$myOptions["SegmentHeight"] = $baseline/$segments;
		
		$myChart->drawRadar($myPicture, $myData, $myOptions);
		
		$myPicture->autoOutput($output);
	}

