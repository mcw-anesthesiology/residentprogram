/**
 * This plug-in for DataTables represents the ultimate option in extensibility
 * for sorting date / time strings correctly. It uses
 * [Moment.js](http://momentjs.com) to create automatic type detection and
 * sorting plug-ins for DataTables based on a given format. This way, DataTables
 * will automatically detect your temporal information and sort it correctly.
 *
 * For usage instructions, please see the DataTables blog
 * post that [introduces it](//datatables.net/blog/2014-12-18).
 *
 * @name Ultimate Date / Time sorting
 * @summary Sort date and time in any format using Moment.js
 * @author [Allan Jardine](//datatables.net)
 * @depends DataTables 1.10+, Moment.js 1.7+
 *
 * @example
 *    $.fn.dataTable.moment( 'HH:mm MMM D, YY' );
 *    $.fn.dataTable.moment( 'dddd, MMMM Do, YYYY' );
 *
 *    $('#example').DataTable();
 */

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery", "moment", "datatables"], factory);
	} else {
		factory(jQuery, moment);
	}
}(function ($, moment) {

$.fn.dataTable.moment = function ( format, locale ) {
	var types = $.fn.dataTable.ext.type;

	// Add type detection
	types.detect.unshift( function ( d ) {
		// Strip HTML tags if possible
		if ( d && d.replace ) {
			d = d.replace(/<.*?>/g, '');
		}

		// Null and empty values are acceptable
		if ( d === '' || d === null ) {
			return 'moment-'+format;
		}

		return moment( d, format, locale, true ).isValid() ?
			'moment-'+format :
			null;
	} );

	// Add sorting method - use an integer for the sorting
	types.order[ 'moment-'+format+'-pre' ] = function ( d ) {
		return d === '' || d === null ?
			-Infinity :
			parseInt( moment( d.replace ? d.replace(/<.*?>/g, '') : d, format, locale, true ).format( 'x' ), 10 );
	};
};

}));

/*! modernizr 3.2.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-canvas-flexbox-flexwrap-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,s,i,a;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],n=C[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),g.push((o?"":"no-")+a.join("-"))}}function s(e){var n=w.className,t=Modernizr._config.classPrefix||"";if(_&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),_?w.className.baseVal=n:w.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):_?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function a(e,n){return!!~(""+e).indexOf(n)}function l(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function f(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?f(o,t||n):o);return!1}function d(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function p(){var e=n.body;return e||(e=i(_?"svg":"body"),e.fake=!0),e}function c(e,t,r,o){var s,a,l,f,u="modernizr",d=i("div"),c=p();if(parseInt(r,10))for(;r--;)l=i("div"),l.id=o?o[r]:u+(r+1),d.appendChild(l);return s=i("style"),s.type="text/css",s.id="s"+u,(c.fake?c:d).appendChild(s),c.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),d.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",f=w.style.overflow,w.style.overflow="hidden",w.appendChild(c)),a=t(d,e),c.fake?(c.parentNode.removeChild(c),w.style.overflow=f,w.offsetHeight):d.parentNode.removeChild(d),!!a}function m(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(d(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+d(n[o])+":"+r+")");return s=s.join(" or "),c("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function v(e,n,o,s){function f(){d&&(delete T.style,delete T.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var u=m(e,o);if(!r(u,"undefined"))return u}for(var d,p,c,v,h,y=["modernizr","tspan"];!T.style;)d=!0,T.modElem=i(y.shift()),T.style=T.modElem.style;for(c=e.length,p=0;c>p;p++)if(v=e[p],h=T.style[v],a(v,"-")&&(v=l(v)),T.style[v]!==t){if(s||r(o,"undefined"))return f(),"pfx"==n?v:!0;try{T.style[v]=o}catch(g){}if(T.style[v]!=h)return f(),"pfx"==n?v:!0}return f(),!1}function h(e,n,t,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+b.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?v(a,n,o,s):(a=(e+" "+E.join(i+" ")+i).split(" "),u(a,n,t))}function y(e,n,r){return h(e,t,t,n,r)}var g=[],C=[],x={_version:"3.2.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){C.push({name:e,fn:n,options:t})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=x,Modernizr=new Modernizr;var w=n.documentElement,_="svg"===w.nodeName.toLowerCase();Modernizr.addTest("canvas",function(){var e=i("canvas");return!(!e.getContext||!e.getContext("2d"))});var S="Moz O ms Webkit",b=x._config.usePrefixes?S.split(" "):[];x._cssomPrefixes=b;var E=x._config.usePrefixes?S.toLowerCase().split(" "):[];x._domPrefixes=E;var P={elem:i("modernizr")};Modernizr._q.push(function(){delete P.elem});var T={style:P.elem.style};Modernizr._q.unshift(function(){delete T.style}),x.testAllProps=h,x.testAllProps=y,Modernizr.addTest("flexbox",y("flexBasis","1px",!0)),Modernizr.addTest("flexwrap",y("flexWrap","wrap",!0)),o(),s(g),delete x.addTest,delete x.addAsyncTest;for(var z=0;z<Modernizr._q.length;z++)Modernizr._q[z]();e.Modernizr=Modernizr}(window,document);
// Closure
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

moment.updateLocale("en", {
	calendar: {
		sameElse: "D-MM-Y h:m A"
	}
});

var numSpecificReports = 0;
function reportHtml(i) {
	return '<div class="report-options collapse">'+
	'<button type="button" class="close remove-report-group" aria-hidden="true">&times;</button>'+
	'<h3>Report</h3>'+
 '<div class="form-group">'+
   '<label for="startDate'+i+'">Start Date:</label>'+
   '<input type="text" class="form-control datepicker startDate" id="startDate'+i+'" name="startDate'+i+'">'+
 '</div>'+
 '<div class="form-group">'+
   '<label for="endDate">End Date:</label>'+
   '<input type="text" class="form-control datepicker endDate" id="endDate'+i+'" name="endDate'+i+'">'+
 '</div>'+
 '<div class="form-group" style="text-align: center;">'+
   '<button type="button" class="btn lastThreeMonths">Last Three Months</button> '+
   '<button type="button" class="btn lastSixMonths">Last Six Months</button>'+
 '</div>'+
 '<div class="form-group">'+
   '<label for="trainingLevelInput'+i+'">Training Level</label>'+
   '<select class="form-control select2" id="trainingLevelInput'+i+'" name="trainingLevel'+i+'" style="width: 100%" required>'+
	 '<option value="all">All</option>'+
	 '<option value="intern">Intern</option>'+
	 '<option value="ca-1">CA-1</option>'+
	 '<option value="ca-2">CA-2</option>'+
	 '<option value="ca-3">CA-3</option>'+
	 '<option value="fellow">Fellow</option>'+
   '</select>'+
 '</div>'+
 '<hr /><br />'+
 '</div>';
}


$("#addNewSpecificReport").click(function(){
	var report = reportHtml(++numSpecificReports);
	$(report).appendTo(".modal-specRpt").velocity("slideDown");
	$(".datepicker").datepicker({
		dateFormat: "yy-mm-dd"
	});
});

 $(".modal-specRpt").on("click", ".remove-report-group", function(){
	$(this).parent().velocity("slideUp", function(){
		$(this).remove();
	});
 });

function checkReportQuery(){
//Checks the report queries to make sure the entered date is of the correct format because not all browsers support the html5 datepicker being used.
	dateError = false;
	$(this).find("input").each(function(){
		if($(this).attr("type") == "date" || $(this).hasClass("datepicker")){
			var date = $(this).val();
			var regex = /^\d\d\d\d-\d\d-\d\d$/;
			if(!new RegExp(regex).test(date)){
				dateError = true;
			}
		}
	});

	if(dateError){
		alert("Please enter a valid date. If your browser does not support the date selector, date must be formatted YYYY-MM-DD");
	}

	return !dateError;
}

function lastSixMonths(){
	setStartEndDates.call(this, 6);
}

function lastThreeMonths(){
	setStartEndDates.call(this, 3);
}

function setStartEndDates(months){
	months = months != undefined ? months : 3;
	var end = moment().subtract(1, "month").endOf("month");
	var start = moment(end).startOf("month").subtract(months-1, "month");
	$(this).parents(".report-options").find(".startDate").val(start.format("YYYY-MM-DD"));
	$(this).parents(".report-options").find(".endDate").val(end.format("YYYY-MM-DD"));
}

function appendAlert(alertText, parent, alertType){
	alertType = (typeof(alertType) == "undefined" ? "danger" : alertType);

	var alert = document.createElement("div");
	alert.className = "alert alert-" + alertType + " alert-dismissable";
	alert.role = "alert";

	var close = document.createElement("button");
	close.type = "button";
	close.className = "close";
	close.setAttribute("data-dismiss", "alert");
	close.setAttribute("aria-label", "Close");

	var innerClose = document.createElement("span");
	innerClose.setAttribute("aria-hidden", "true");
	innerClose.innerHTML = "&times;";
	close.appendChild(innerClose);

	var text = document.createTextNode(alertText);
	alert.appendChild(close);
	alert.appendChild(text);

	$(parent).append(alert);
}

function unlimitTableEvals(settings, json){
	var dt = this.DataTable({
		retrieve: true
	});
	var url = dt.ajax.url();
	dt.ajax.url(url.substring(0, url.lastIndexOf("/"))).load().draw();
}

$(document).ready(function(){
	$.fn.dataTable.moment( "DD-MMM-YYYY h:mm A" );

	$(".report").submit(checkReportQuery);
	$(".report").on("click", ".lastSixMonths", lastSixMonths);
	$(".report").on("click", ".lastThreeMonths", lastThreeMonths);
	$(".datepicker").datepicker({
		dateFormat: "yy-mm-dd"
	});

	$("#addNewSpecificReport").click();

	$.extend(true, $.fn.dataTable.defaults, {
		language: {
			paginate: {
				previous: "&lt;",
				next: "&gt;"
			}
		},
		stateSave: true,
		"deferRender": true,
		"dom": "lfprtip"
	});

	$.fn.select2.defaults.set("theme", "bootstrap");

	$(".select2").val(null).select2({
		placeholder: "Please select"
	});

	$("body").css("padding-top", $("#main-navbar").height()+5);

	$("#individual-milestones, #aggregate-milestones").multiSelect({
		selectableOptgroup: true
	});

});

// https://davidwalsh.name/essential-javascript-functions
function debounce(func, wait, immediate){
	var timeout;
	return function(){
		var context = this, args = arguments;
		var later = function(){
			timeout = null;
			if(!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if(callNow) func.apply(context, args);
	}
}

var fixNavbarOffset = debounce(function(){
	$("body").css("padding-top", $("#main-navbar").height()+5);
}, 100);

$(window).resize(fixNavbarOffset);

$(".table").on("click", ".view-evaluation", function(){
	var requestId = $(this).parents("tr").children("td").eq(0).children("a").html();
	window.location.href = "/evaluation/"+requestId;
});

$(".report-milestones-info").popover({
	placement: "left",
	html: "true",
	content: "<ul>" +
			"<li>Leave empty to include all milestones in training level in report</li>" +
			"<li>Click a milestone type heading to select all milestones of that type</li>" +
		"</ul>"
});

$(".toggleDescriptions").click(function(){
	var questionName = $(this).data("id");
	var headerHeight = $("#main-navbar").height();
	var padding = 5;
	var scrollto = $(this).parents(".question").velocity("scroll");
	var isExpanded = $("#" + questionName).hasClass("expanded-descriptions");
	if(isExpanded)
		$("." + questionName + " .description").velocity("slideUp", function(){
			$("#" + questionName).removeClass("expanded-descriptions");
		});
	else {
		$("#" + questionName).addClass("expanded-descriptions");
		$("." + questionName + " .description").velocity("slideDown");
	}
});

function ucfirst(str){
	return str.charAt(0).toUpperCase() + str.substring(1);
}


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
		var mGraph = new Chart(mCtx).Radar(milestoneData, options);
		var cGraph = new Chart(cCtx).Radar(competencyData, options);
	}
	else if(graphType == "bar"){
		var mGraph = new Chart(mCtx).Bar(milestoneData, options);
		var cGraph = new Chart(cCtx).Bar(competencyData, options);
	}
	else if(graphType == "line"){
		var mGraph = new Chart(mCtx).Line(milestoneData, options);
		var cGraph = new Chart(cCtx).Line(competencyData, options);
	}

	var legend = mGraph.generateLegend();
	$(row).append(legend);
}

$("#graph-type").change(function(){
	$(".graphs").html("");
	Chart.helpers.each(Chart.instances,function(instance){
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
	Chart.helpers.each(Chart.instances,function(instance){
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

function getChartEvalData(evals, startDate, endDate, increment, incrementNum){
	increment = increment != undefined ? increment : "month";
	incrementNum = incrementNum != undefined ? incrementNum : 1;
	startDate = startDate != undefined ? startDate : moment().subtract(1, "year").startOf(increment);
	endDate = endDate != undefined ? endDate : moment();

	var labelFormat = "MMM D";
	if(labelFormats[increment] != undefined)
		labelFormat = labelFormats[increment];
	var labels = [];
	var chartData = {
		Requested: [],
		Completed: []
	};

	for(var start = startDate; start < endDate; start.add(incrementNum, increment)){
		var end = moment(start).add(incrementNum, increment);
		var r = evals.reduce(function(num, e){
			if(e.request_date != undefined){
				var rd = moment(e.request_date);
				if(rd >= start && rd < end)
					return num + 1;
			}
			return num;
		}, 0);

		var c = evals.reduce(function(num, e){
			if(e.complete_date != undefined && e.status == "complete"){
				var cd = moment(e.complete_date);
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

//# sourceMappingURL=all.js.map
