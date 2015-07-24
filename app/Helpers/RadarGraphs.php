<?php

namespace App\Helpers;

use CpChart\Services\pChartFactory;
use CpChart\Classes\pCache;
use CpChart\Classes\pRadar;

class RadarGraphs{

	static function draw($subjectMilestone, $averageMilestone, $milestones, $subjectCompetency, $averageCompetency, $competencies, $subject, $trainingLevel, $max){

		$factory = new pChartFactory();

		$milestoneData = $factory->newData();
		$milestoneData->addPoints($averageMilestone, "Average");
		$milestoneData->addPoints($subjectMilestone, "Resident");
		$milestoneData->setSerieDescription("Resident", "Individual Performance");
		$milestoneData->setSerieDescription("Average", "Average Resident Performance");
		$milestoneData->setPalette("Resident", array("R"=>227, "G"=>0, "B"=>0));
		$milestoneData->setPalette("Average", array("R"=>227, "G"=>227, "B"=>0));
		$milestoneData->addPoints($milestones, "Milestones");
		$milestoneData->setAbscissa("Milestones");

		$competencyData = $factory->newData();
		$competencyData->addPoints($averageCompetency, "Average");
		$competencyData->addPoints($subjectCompetency, "Resident");
		$competencyData->setSerieDescription("Resident", "Individual Performance");
		$competencyData->setSerieDescription("Average", "Average Resident Performance");
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
			$picture = $factory->newImage(1800, 600, $milestoneData);
			$picture->drawGradientArea(0,0,1800,600,DIRECTION_VERTICAL,array("StartR"=>200,"StartG"=>200,"StartB"=>200,"EndR"=>240,"EndG"=>240,"EndB"=>240,"Alpha"=>100));
			$picture->drawGradientArea(0,0,1800,20,DIRECTION_HORIZONTAL,array("StartR"=>30,"StartG"=>30,"StartB"=>30,"EndR"=>100,"EndG"=>100,"EndB"=>100,"Alpha"=>100));
			$picture->drawLine(0,20,1800,20,array("R"=>255,"G"=>255,"B"=>255));

			$picture->setFontProperties(array("FontName"=>"verdana.ttf","FontSize"=>8));
			$picture->drawText(10,13,$subject.": ".$trainingLevel." Milestones",array("R"=>255,"G"=>255,"B"=>255));
			$picture->drawText(910,13,$subject.": "$trainingLevel." Competencies",array("R"=>255,"G"=>255,"B"=>255));

			$picture->drawLine(900, 0, 900, 600, array("R"=>255,"G"=>255,"B"=>255));

			$chart = new pRadar();

			$options = array("DrawAxisValues"=>FALSE,"WriteValues"=>FALSE,"WriteValuesInBubble"=>FALSE,"DrawPoly"=>TRUE,"Layout"=>RADAR_LAYOUT_CIRCLE,"BackgroundGradient"=>array("StartR"=>255,"StartG"=>255,"StartB"=>255,"StartAlpha"=>100,"EndR"=>6,"EndG"=>85,"EndB"=>144,"EndAlpha"=>50), "LabelPos"=>RADAR_LABELS_HORIZONTAL);

			$segments = 5;
			$options["Segments"] = $segments;
			$options["SegmentHeight"] = $max/$segments;

			$picture->setGraphArea(200, 50, 700, 550);
			$chart->drawRadar($picture, $milestoneData, $options);

			$options["BackgroundGradient"] = array("StartR"=>255,"StartG"=>255,"StartB"=>255,"StartAlpha"=>100,"EndR"=>1,"EndG"=>108,"EndB"=>100,"EndAlpha"=>50);

			$picture->setGraphArea(1100, 50, 1600, 550);
			$chart->drawRadar($picture, $competencyData, $options);

			$picture->drawText(435, 275, "CA-0", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(435, 225, "CA-1", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(435, 175, "CA-2", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(435, 125, "CA-3", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(420, 75, "Attending", array("R"=>0,"G"=>0,"B"=>0));

			$picture->drawText(1335, 275, "CA-0", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(1335, 225, "CA-1", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(1335, 175, "CA-2", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(1335, 125, "CA-3", array("R"=>0,"G"=>0,"B"=>0));
			$picture->drawText(1320, 75, "Attending", array("R"=>0,"G"=>0,"B"=>0));

			$picture->drawLegend(737, 550, array("Style"=>LEGEND_BOX, "Mode"=>LEGEND_HORIZONTAL));

			$picture->render($output);
		}
		return $chartHash.$extension;
	}
}
