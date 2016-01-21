var evalHistoryChart = [];

var solidColors = {
	Requested: "rgba(227,227,0,1)",
	Completed: "rgba(227,0,0,1)"
};

var fillColors = {
	Requested: "rgba(227,227,0,0.3)",
	Completed: "rgba(227,0,0,0.3)"
};

var options = {
	responsive: true,
	tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
	legendTemplate: "<ul class=\"legend <%=name.toLowerCase()%>-legend\">" +
		"<% for (var i=0; i<datasets.length; i++){%>" +
			"<li><span class=\"glyphicon glyphicon-stop\" style=\"color:<%=datasets[i].strokeColor%>\"></span> " +
			"<%if(datasets[i].label){%><%=datasets[i].label%>" +
		"<%}%></li><%}%></ul>",
};

function drawLineChart(canvas, chartData, chartLabels){
	if(evalHistoryChart[canvas] != undefined)
		evalHistoryChart[canvas].destroy();

	var ctx = $(canvas).get(0).getContext("2d");

	var datasets = [];
	for(var i in chartData){
		datasets.push({
			label: i,
			fillColor: fillColors[i],
			strokeColor: solidColors[i],
			pointColor: solidColors[i],
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: solidColors[i],
			data: chartData[i]
		});
	}

	var data = {
		labels: chartLabels,
		datasets: datasets
	}

	evalHistoryChart[canvas] = new Chart(ctx).Line(data, options);
	$(canvas+"-legend").html(evalHistoryChart[canvas].generateLegend());
}

var labelFormats = {
	year: "YYYY",
	month: "MMMM",
	week: "[Week of] MMM D",
	day: "MMM D"
};

function getChartEvalData(evals, range, increment, rangeNum, incrementNum){
	range = range != undefined ? range : "year";
	rangeNum = rangeNum != undefined ? rangeNum : 1;
	increment = increment != undefined ? increment : "month";
	incrementNum = incrementNum != undefined ? incrementNum : 1;

	var now = moment();
	var labelFormat = "MMM D";
	if(labelFormats[increment] != undefined)
		labelFormat = labelFormats[increment];
	var labels = [];
	var chartData = {
		Requested: [],
		Completed: []
	};

	for(var start = moment().startOf(increment).subtract(rangeNum, range); start < now; start.add(incrementNum, increment)){
		var end = moment(start).add(incrementNum, increment);
		var r = evals.reduce(function(num, eval){
			if(eval.request_date != undefined){
				var rd = moment(eval.request_date);
				if(rd >= start && rd < end)
					return num + 1;
			}
			return num;
		}, 0);

		var c = evals.reduce(function(num, eval){
			if(eval.complete_date != undefined && eval.status == "complete"){
				var cd = moment(eval.complete_date);
				if(cd >= start && cd < end)
					return num + 1;
			}
			return num;
		}, 0);

		labels.push(start.format(labelFormat));
		chartData["Requested"].push(r);
		chartData["Completed"].push(c);
	}

	return [chartData, labels];
}
