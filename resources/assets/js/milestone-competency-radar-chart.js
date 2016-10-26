
// MCW Colors
// var averageSolidColor = "rgba(0,67,100,1)";
// var averageFillColor = "rgba(0,67,100,0.2)";
// var individualSolidColor = "rgba(1,108,100,1)";
// var individualFillColor = "rgba(1,108,100,0.2)";

var averageSolidColor = "rgba(227,227,0,1)";
var averageFillColor = "rgba(227,227,0,0.3)";
var individualSolidColor = "rgba(227,0,0,1)";
var individualFillColor = "rgba(227,0,0,0.3)";

var options = {
	animation: false,
	responsive: true,
	angleLineWidth: 2,
	tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= Math.round10(value, -2) %>",
	multiTooltipTemplate: "<%= Math.round10(value, -2) %>",
	legendTemplate: "<ul class=\"legend <%=name.toLowerCase()%>-legend\">" +
		"<% for (var i=0; i<datasets.length; i++){%>" +
			"<li><span class=\"glyphicon glyphicon-stop\" style=\"color:<%=datasets[i].strokeColor%>\"></span> " +
			"<%if(datasets[i].label){%><%=datasets[i].label%>" +
		"<%}%></li><%}%></ul>",
	scaleShowLabels: true,
	scaleOverride: true,
	scaleLineWidth: 2,
	scaleSteps: 5,
	scaleStepWidth: 2,
	scaleStartValue: 0,
	scaleLabel: function(values){
		return scaleLabels[values.value/2];
	}
};

function drawRadarGraphs(milestoneData, competencyData, title, index){
	index = typeof index != "undefined" ? index : 0;

	var div = document.getElementsByClassName("graphs")[index];
	var row = document.createElement("div");
	row.className = "graph-container";
	var h3 = document.createElement("h3");
	h3.appendChild(document.createTextNode(title));
	row.appendChild(h3);

	var milestoneGraph = document.createElement("div");
	milestoneGraph.className = "graph milestone-graph";
	var milestoneTitle = document.createElement("h4");
	milestoneTitle.appendChild(document.createTextNode("Milestones"));
	milestoneGraph.appendChild(milestoneTitle);
	var milestoneCanvasDiv = document.createElement("div");
	milestoneCanvasDiv.className = "graph-canvas-container";
	var milestoneCanvas = document.createElement("canvas");
	milestoneCanvas.width = 800;
	milestoneCanvas.height = 400;
	milestoneCanvasDiv.appendChild(milestoneCanvas);
	milestoneGraph.appendChild(milestoneCanvasDiv);
	row.appendChild(milestoneGraph);

	var competencyGraph = document.createElement("div");
	competencyGraph.className = "graph competency-graph";
	var competencyTitle = document.createElement("h4");
	competencyTitle.appendChild(document.createTextNode("Competencies"));
	competencyGraph.appendChild(competencyTitle);
	var competencyCanvasDiv = document.createElement("div");
	competencyCanvasDiv.className = "graph-canvas-container";
	var competencyCanvas = document.createElement("canvas");
	competencyCanvas.width = 800;
	competencyCanvas.height = 400;
	competencyCanvasDiv.appendChild(competencyCanvas);
	competencyGraph.appendChild(competencyCanvasDiv);
	row.appendChild(competencyGraph);

	div.appendChild(row);

	var graphType = $("#graph-type").val();
	var vertical = $("#graph-layout").bootstrapSwitch("state");
	if(!vertical){
		milestoneGraph.className += " col-sm-6";
		competencyGraph.className += " col-sm-6";
	}

	var mCtx = milestoneCanvas.getContext("2d");
	var cCtx = competencyCanvas.getContext("2d");

	if(graphType == "radar"){
		var mGraph = new Chart1(mCtx).Radar(milestoneData, options);
		var cGraph = new Chart1(cCtx).Radar(competencyData, options);
	}
	else if(graphType == "bar"){
		var mGraph = new Chart1(mCtx).Bar(milestoneData, options);
		var cGraph = new Chart1(cCtx).Bar(competencyData, options);
	}
	else if(graphType == "line"){
		var mGraph = new Chart1(mCtx).Line(milestoneData, options);
		var cGraph = new Chart1(cCtx).Line(competencyData, options);
	}

	var legend = mGraph.generateLegend();
	$(row).append(legend);
}

$("#graph-type").change(function(){
	$(".graphs").html("");
	Chart1.helpers.each(Chart1.instances,function(instance){
		instance.destroy();
	});
	drawAllRadarGraphs();
});

$("#new-graphs").on("switchChange.bootstrapSwitch", function(){
	$(".graph-type-container").toggle();
	$(".graph-layout-container").toggle();
	$(".img-graphs").toggle();
	$(".graphs").toggle();
});

$("#graph-layout").on("switchChange.bootstrapSwitch", function(){
	$(".graph").toggleClass("col-sm-6");
	Chart1.helpers.each(Chart1.instances,function(instance){
		instance.resize(instance.render, true);
	});
});

function drawAverageRadarGraphs(){
	reportData.forEach(function(report, index){

		prepareReport(report);

		var milestoneData = {
			labels: report.milestoneLabels,
			datasets: [
				report.averageMilestoneDataset
			]
		};

		var competencyData = {
			labels: report.competencyLabels,
			datasets: [
				report.averageCompetencyDataset
			]
		}

		drawRadarGraphs(milestoneData, competencyData, "Average");
	});
}

function drawAllRadarGraphs(){
	reportData.forEach(function(report, index){

		prepareReport(report);

		report.subjectIds.forEach(function(subjectId){
			var milestoneData = {
				labels: report.milestoneLabels,
				datasets: [
					report.averageMilestoneDataset,
					{
						label: "Individual Performance",
						fillColor: individualFillColor,
						strokeColor: individualSolidColor,
						pointColor: individualSolidColor,
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: individualSolidColor,
						data: _.values(report.subjectMilestone[subjectId])
					}
				]
			};

			var competencyData = {
				labels: report.competencyLabels,
				datasets: [
					report.averageCompetencyDataset,
					{
						label: "Individual Performance",
						fillColor: individualFillColor,
						strokeColor: individualSolidColor,
						pointColor: individualSolidColor,
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: individualSolidColor,
						data: _.values(report.subjectCompetency[subjectId])
					}
				]
			};

			drawRadarGraphs(milestoneData, competencyData, report.subjects[subjectId], index);
		});
	});
}

function prepareReport(report){
	// Sort subject ids by subject name
	report.subjectIds = _.keys(report.subjects).sort(function(a, b){return report.subjects[a].localeCompare(report.subjects[b]);})

	if(report.trainingLevel == "fellow")
		report.scaleLabels = ["", "Fellow Level 1", "Fellow Level 2", "Fellow Level 3", "Fellow Level 4", "Fellow Level 5"];
	else
		report.scaleLabels = ["", "CBY", "CA-1", "CA-2", "CA-3", "Attending"];

	options.scaleLabel = function(values){
		return report.scaleLabels[values.value/2];
	};

	report.milestoneLabels = _.values(report.milestones);
	report.averageMilestones = _.values(report.averageMilestone);
	report.competencyLabels = _.values(report.competencies);
	report.averageCompetencies = _.values(report.averageCompetency);

	for(var i = 0; i < report.milestoneLabels.length; i++){
		report.milestoneLabels[i] = report.milestoneLabels[i].replace("Anes Fellow ", "");
		report.milestoneLabels[i] = report.milestoneLabels[i].replace("and", "&");
	}

	report.averageMilestoneDataset = {
		label: "Average Performance",
		fillColor: averageFillColor,
		strokeColor: averageSolidColor,
		pointColor: averageSolidColor,
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: averageSolidColor,
		data: report.averageMilestones
	};

	report.averageCompetencyDataset = {
		label: "Average Performance",
		fillColor: averageFillColor,
		strokeColor: averageSolidColor,
		pointColor: averageSolidColor,
		pointStrokeColor: "#fff",
		pointHighlightFill: "#fff",
		pointHighlightStroke: averageSolidColor,
		data: report.averageCompetencies
	};
}
