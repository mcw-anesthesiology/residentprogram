<?php

namespace App\Helpers;

use CpChart\Services\pChartFactory;
use CpChart\Classes\pCache;
use CpChart\Classes\pRadar;

class RadarGraphs{

	static function draw($subjectMilestone, $averageMilestone, $milestones, $subjectCompetency, $averageCompetency, $competencies, $subject, $startDate, $endDate, $trainingLevel, $max, $graphOrientation){

		$factory = new pChartFactory();

		$milestoneData = $factory->newData();
		$milestoneData->addPoints($averageMilestone, "Average");
		if(!is_null($subjectMilestone))
			$milestoneData->addPoints($subjectMilestone, "Resident");
		$milestoneData->setSerieDescription("Resident", "Individual Performance");
		$milestoneData->setSerieDescription("Average", "Average Performance");
		$milestoneData->setPalette("Resident", array("R"=>227, "G"=>0, "B"=>0));
		$milestoneData->setPalette("Average", array("R"=>227, "G"=>227, "B"=>0));
		$milestoneData->addPoints($milestones, "Milestones");
		$milestoneData->setAbscissa("Milestones");

		$competencyData = $factory->newData();
		$competencyData->addPoints($averageCompetency, "Average");
		if(!is_null($subjectCompetency))
			$competencyData->addPoints($subjectCompetency, "Resident");
		$competencyData->setSerieDescription("Resident", "Individual Performance");
		$competencyData->setSerieDescription("Average", "Average Performance");
		$competencyData->setPalette("Resident", array("R"=>227, "G"=>0, "B"=>0));
		$competencyData->setPalette("Average", array("R"=>227, "G"=>227, "B"=>0));
		$competencyData->addPoints($competencies, "Competencies");
		$competencyData->setAbscissa("Competencies");

		$cache = new pCache();
		$chartHash = $cache->getHash($milestoneData);
		$extension = ".png";
		$output = storage_path("app/graphs/".$chartHash.$extension);

		if($cache->isInCache($chartHash)){
			$cache->saveFromCache($chartHash, $output);
		}
		else{
			if(!is_null($graphOrientation) && $graphOrientation == "vertical"){
				$horizontalOffset = 0;
				$verticalOffset = 600;
			} else {
				$horizontalOffset = 900;
				$verticalOffset = 0;
			}
			$picture = $factory->newImage(900 + $horizontalOffset, 600 + $verticalOffset, $milestoneData);
			$picture->drawGradientArea(0,0,900 + $horizontalOffset,1200 + $verticalOffset,DIRECTION_VERTICAL,array("StartR"=>200,"StartG"=>200,"StartB"=>200,"EndR"=>240,"EndG"=>240,"EndB"=>240,"Alpha"=>100));
			$picture->drawGradientArea(0,0,900,20,DIRECTION_HORIZONTAL,array("StartR"=>30,"StartG"=>30,"StartB"=>30,"EndR"=>100,"EndG"=>100,"EndB"=>100,"Alpha"=>100));
			$picture->drawGradientArea($horizontalOffset,$verticalOffset,900 + $horizontalOffset,20 + $verticalOffset,DIRECTION_HORIZONTAL,array("StartR"=>30,"StartG"=>30,"StartB"=>30,"EndR"=>100,"EndG"=>100,"EndB"=>100,"Alpha"=>100));
			$picture->drawLine(0,20,900 + $horizontalOffset,20,array("R"=>255,"G"=>255,"B"=>255));

			$picture->setFontProperties(array("FontName"=>"verdana.ttf","FontSize"=>8));
			$picture->drawText(10,13,$subject.": ".$startDate->toDateString()." - ".$endDate->toDateString()." ".$trainingLevel." Milestones",array("R"=>255,"G"=>255,"B"=>255));
			$picture->drawText(10 + $horizontalOffset,13 + $verticalOffset,$subject.": ".$startDate->toDateString()." - ".$endDate->toDateString()." ".$trainingLevel." Competencies",array("R"=>255,"G"=>255,"B"=>255));

			$picture->drawLine($horizontalOffset, $verticalOffset, 900, 600, array("R"=>255,"G"=>255,"B"=>255));

			$chart = new pRadar();

			$options = array("DrawAxisValues"=>FALSE,"WriteValues"=>FALSE,"WriteValuesInBubble"=>FALSE,"DrawPoly"=>TRUE,"Layout"=>RADAR_LAYOUT_CIRCLE,"BackgroundGradient"=>array("StartR"=>255,"StartG"=>255,"StartB"=>255,"StartAlpha"=>100,"EndR"=>6,"EndG"=>85,"EndB"=>144,"EndAlpha"=>50), "LabelPos"=>RADAR_LABELS_HORIZONTAL);

			$segments = 5;
			$options["Segments"] = $segments;
			$options["SegmentHeight"] = $max/$segments;

			$picture->setGraphArea(200, 50, 700, 550);
			$chart->drawRadar($picture, $milestoneData, $options);

			$options["BackgroundGradient"] = array("StartR"=>255,"StartG"=>255,"StartB"=>255,"StartAlpha"=>100,"EndR"=>1,"EndG"=>108,"EndB"=>100,"EndAlpha"=>50);

			$picture->setGraphArea(200 + $horizontalOffset, 50 + $verticalOffset, 700 + $horizontalOffset, 550 + $verticalOffset);
			$chart->drawRadar($picture, $competencyData, $options);

			$picture->drawText(435, 275, "CA-0", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(435, 225, "CA-1", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(435, 175, "CA-2", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(435, 125, "CA-3", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(420, 75, "Attending", array("R"=>0,"G"=>0,"B"=>0));

			$picture->drawText(435 + $horizontalOffset, 275 + $verticalOffset, "CA-0", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(435 + $horizontalOffset, 225 + $verticalOffset, "CA-1", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(435 + $horizontalOffset, 175 + $verticalOffset, "CA-2", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(435 + $horizontalOffset, 125 + $verticalOffset, "CA-3", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(420 + $horizontalOffset, 75 + $verticalOffset, "Attending", array("R"=>0,"G"=>0,"B"=>0));

			$picture->drawLegend(320 + ($horizontalOffset/2), 575 + $verticalOffset, array("Style"=>LEGEND_BOX, "Mode"=>LEGEND_HORIZONTAL));

			$picture->render($output);
		}
		return $chartHash.$extension;
	}

	static function drawFaculty($subjectResponse, $averageResponse, $questions, $subject_name, $startDate, $endDate, $max){
		$factory = new pChartFactory();

		$subjectData = $factory->newData();
		$subjectData->addPoints($averageResponse, "Average");
		if(!is_null($subjectResponse))
			$subjectData->addPoints($subjectResponse, "Faculty");
		$subjectData->setSerieDescription("Faculty", "Individual Performance");
		$subjectData->setSerieDescription("Average", "Average Faculty Performance");
		$subjectData->setPalette("Faculty", array("R"=>227, "G"=>0, "B"=>0));
		$subjectData->setPalette("Average", array("R"=>227, "G"=>227, "B"=>0));
		$subjectData->addPoints($questions, "Questions");
		$subjectData->setAbscissa("Questions");


		$cache = new pCache();
		$chartHash = $cache->getHash($subjectData);
		$extension = ".png";
		$output = storage_path("app/graphs/".$chartHash.$extension);

		if($cache->isInCache($chartHash)){
			$cache->saveFromCache($chartHash, $output);
		}
		else{
			$picture = $factory->newImage(800, 600, $subjectData);
			$picture->drawGradientArea(0,0,800,600,DIRECTION_VERTICAL,array("StartR"=>200,"StartG"=>200,"StartB"=>200,"EndR"=>240,"EndG"=>240,"EndB"=>240,"Alpha"=>100));
			$picture->drawGradientArea(0,0,800,20,DIRECTION_HORIZONTAL,array("StartR"=>30,"StartG"=>30,"StartB"=>30,"EndR"=>100,"EndG"=>100,"EndB"=>100,"Alpha"=>100));
			$picture->drawLine(0,20,1800,20,array("R"=>255,"G"=>255,"B"=>255));

			$picture->setFontProperties(array("FontName"=>"verdana.ttf","FontSize"=>8));
			$picture->drawText(10,13,$subject_name.": ".$startDate->toDateString()." - ".$endDate->toDateString(),array("R"=>255,"G"=>255,"B"=>255));

			$chart = new pRadar();

			$options = array("DrawAxisValues"=>FALSE,"WriteValues"=>FALSE,"WriteValuesInBubble"=>FALSE,"DrawPoly"=>TRUE,"Layout"=>RADAR_LAYOUT_CIRCLE,"BackgroundGradient"=>array("StartR"=>255,"StartG"=>255,"StartB"=>255,"StartAlpha"=>100,"EndR"=>6,"EndG"=>85,"EndB"=>144,"EndAlpha"=>50), "LabelPos"=>RADAR_LABELS_HORIZONTAL);

			$segments = 5;
			$options["Segments"] = $segments;
			$options["SegmentHeight"] = $max/$segments;

			$picture->setGraphArea(125, 50, 650, 525);
			$chart->drawRadar($picture, $subjectData, $options);

			$options["BackgroundGradient"] = array("StartR"=>255,"StartG"=>255,"StartB"=>255,"StartAlpha"=>100,"EndR"=>1,"EndG"=>108,"EndB"=>100,"EndAlpha"=>50);

			$picture->drawLegend(237, 550, array("Style"=>LEGEND_BOX, "Mode"=>LEGEND_HORIZONTAL));

			$picture->render($output);
		}
		return $chartHash.$extension;
	}
}
