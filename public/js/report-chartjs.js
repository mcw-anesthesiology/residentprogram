// Sort subject ids by subject name
var subjectIds = _.keys(subjects).sort(function(a, b){return subjects[a].localeCompare(subjects[b]);})

// MCW Colors
// var averageSolidColor = "rgba(0,67,100,1)";
// var averageFillColor = "rgba(0,67,100,0.2)";
// var individualSolidColor = "rgba(1,108,100,1)";
// var individualFillColor = "rgba(1,108,100,0.2)";

var averageSolidColor = "rgba(227,227,0,1)";
var averageFillColor = "rgba(227,227,0,0.2)";
var individualSolidColor = "rgba(227,0,0,1)";
var individualFillColor = "rgba(227,0,0,0.2)";

if(trainingLevel == "fellow")
	var scaleLabels = ["", "Fellow Level 1", "Fellow Level 2", "Fellow Level 3", "Fellow Level 4", "Fellow Level 5"];
else
	var scaleLabels = ["", "PGY-1", "CA-1", "CA-2", "CA-3", "Attending"];

var options = {
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

var averageMilestoneDataset = {
	label: "Average Performance",
	fillColor: averageFillColor,
	strokeColor: averageSolidColor,
	pointColor: averageSolidColor,
	pointStrokeColor: "#fff",
	pointHighlightFill: "#fff",
	pointHighlightStroke: averageSolidColor,
	data: averageMilestones
};

var averageCompetencyDataset = {
	label: "Average Performance",
	fillColor: averageFillColor,
	strokeColor: averageSolidColor,
	pointColor: averageSolidColor,
	pointStrokeColor: "#fff",
	pointHighlightFill: "#fff",
	pointHighlightStroke: averageSolidColor,
	data: averageCompetencies
};


function drawGraphs(milestoneData, competencyData, title){
	var div = document.getElementById("graphs");
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

	if(graphType == "radar"){
		var mGraph = new Chart(milestoneCanvas.getContext("2d")).Radar(milestoneData, options);
		var cGraph = new Chart(competencyCanvas.getContext("2d")).Radar(competencyData, options);
	}
	else if(graphType == "bar"){
		var mGraph = new Chart(milestoneCanvas.getContext("2d")).Bar(milestoneData, options);
		var cGraph = new Chart(competencyCanvas.getContext("2d")).Bar(competencyData, options);
	}
	else if(graphType == "line"){
		var mGraph = new Chart(milestoneCanvas.getContext("2d")).Line(milestoneData, options);
		var cGraph = new Chart(competencyCanvas.getContext("2d")).Line(competencyData, options);
	}

	var legend = mGraph.generateLegend();
	$(row).append(legend);
}

$("#graph-type").change(function(){
	$("#graphs").html("");
	Chart.helpers.each(Chart.instances,function(instance){
		instance.destroy();
	});
	drawAllGraphs();
});

function drawAllGraphs(){
	subjectIds.forEach(function(subjectId){
		var milestoneData = {
			labels: milestoneLabels,
			datasets: [
				averageMilestoneDataset,
				{
					label: "Individual Performance",
					fillColor: individualFillColor,
					strokeColor: individualSolidColor,
					pointColor: individualSolidColor,
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: individualSolidColor,
					data: _.values(subjectMilestone[subjectId])
				}
			]
		};

		var competencyData = {
			labels: competencyLabels,
			datasets: [
				averageCompetencyDataset,
				{
					label: "Individual Performance",
					fillColor: individualFillColor,
					strokeColor: individualSolidColor,
					pointColor: individualSolidColor,
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: individualSolidColor,
					data: _.values(subjectCompetency[subjectId])
				}
			]
		};

		drawGraphs(milestoneData, competencyData, subjects[subjectId]);
	});
}

function drawAverageGraphs(){
	var milestoneData = {
		labels: milestoneLabels,
		datasets: [
			averageMilestoneDataset
		]
	};

	var competencyData = {
		labels: competencyLabels,
		datasets: [
			averageCompetencyDataset
		]
	}

	drawGraphs(milestoneData, competencyData, "Title");
}
