/* eslint-disable */

window.Chart1 = window.Chart;

$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $("meta[name='csrf_token']").attr("content")
	}
});

moment.updateLocale("en", {
	calendar: {
		lastDay : '[Yesterday at] LT',
		sameDay : '[Today at] LT',
		nextDay : '[Tomorrow at] LT',
		lastWeek : '[Last] dddd [at] LT',
		nextWeek : 'dddd [at] LT',
		sameElse: "ll"
	}
});

var numSpecificReports = 0;
function reportHtml(i) {
	return '<div class="report-options">'+
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
	$(report).appendTo(".modal-specRpt");
	$(".datepicker").datepicker({
		dateFormat: "yy-mm-dd"
	});
});

 $(".modal-specRpt").on("click", ".remove-report-group", function(){
	$(this).parent().remove();
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

function addDateSelectors(dateName, idPrefix, containerQuery, defaultMonth, lastDaySelectedByDefault){
	// This is a better input method, but I wanted a non-js fallback so that's the default

	var html =
	'<input type="hidden" id="' + idPrefix +  'date" name="' + dateName + '" />' +
	'<div class="row">' +
		'<label><input type="checkbox" id="' + idPrefix + 'date-unknown" /> Unknown<label>' +
	'</div>' +
	'<div class="row" id="' + idPrefix + 'parts-container">' +
		'<div class="col-md-4">' +
			'<label for="' + idPrefix +  'date-year">Year</label>' +
			'<select class="form-control" id="' + idPrefix +  'date-year"></select>' +
		'</div>' +
		'<div class="col-md-4">' +
			'<label for="' + idPrefix +  'date-month">Month</label>' +
			'<select class="form-control" id="' + idPrefix +  'date-month"></select>' +
		'</div>' +
		'<div class="col-md-4">' +
			'<label for="' + idPrefix +  'date-day">Day</label>' +
			'<select class="form-control" id="' + idPrefix +  'date-day"></select>' +
		'</div>' +
	'</div>';

	var container = $(containerQuery);
	container.append(html);
	var option;

	var yearSelect = container.find("#" + idPrefix +  "date-year")[0];
	var year = moment().get("year");
	for(var i = 0; i < 100; i++, year--){
		option = document.createElement("option");
		option.value = year;
		option.appendChild(document.createTextNode(year));
		yearSelect.appendChild(option);
	}

	var monthSelect = container.find("#" + idPrefix +  "date-month")[0];
	moment.months().forEach(function(month, index){
		option = document.createElement("option");
		option.value = index;
		option.appendChild(document.createTextNode(month));
		if(index == defaultMonth)
			option.selected = true;
		monthSelect.appendChild(option);
	});

	var daySelect = container.find("#" + idPrefix +  "date-day")[0];
	for(var day = 0; day <= 30; day++){
		option = document.createElement("option");
		option.value = day;
		option.appendChild(document.createTextNode(day));
		if(day == 30 & lastDaySelectedByDefault)
			option.selected = true;
		daySelect.appendChild(option);
	}

	$("#" + idPrefix +  "date-year").change(function(){
		var daySelect = $("#" + idPrefix +  "date-day")[0];
		while(daySelect.firstChild)
			daySelect.removeChild(daySelect.firstChild);

		var year = parseInt($(this).val(), 10);
		var month = parseInt($("#" + idPrefix +  "date-month").val(), 10);
		var daysInMonth = moment().year(year).month(month).daysInMonth();
		for(var day = 1; day <= daysInMonth; day++){
			option = document.createElement("option");
			option.value = day;
			option.appendChild(document.createTextNode(day));
			if(day == daysInMonth && lastDaySelectedByDefault)
				option.selected = true;
			daySelect.appendChild(option);
		}
	});

	$("#" + idPrefix +  "date-month").change(function(){
		var date = moment($("#" + idPrefix + "date").val());
		var daySelect = $("#" + idPrefix +  "date-day")[0];
		while(daySelect.firstChild)
			daySelect.removeChild(daySelect.firstChild);

		var month = parseInt($(this).val(), 10);
		var year = parseInt($("#" + idPrefix +  "date-year").val(), 10);
		var daysInMonth = moment().year(year).month(month).daysInMonth();
		for(var day = 1; day <= daysInMonth; day++){
			option = document.createElement("option");
			option.value = day;
			option.appendChild(document.createTextNode(day));
			if(day == daysInMonth && lastDaySelectedByDefault)
				option.selected = true;
			daySelect.appendChild(option);
		}
	});

	function updateDate(){
		if($("#" + idPrefix + "date-unknown").prop("checked")){
			$("#" + idPrefix +  "date").val("");
			return;
		}

		var year = parseInt($("#" + idPrefix +  "date-year").val(), 10);
		var month = parseInt($("#" + idPrefix +  "date-month").val(), 10);
		var day = parseInt($("#" + idPrefix +  "date-day").val(), 10);
		var date = moment().year(year).month(month).date(day);
		if(date.isValid())
			$("#" + idPrefix +  "date").val(date.format("YYYY-MM-DD"));
	}

	$("#" + idPrefix +  "date-year, #" + idPrefix +  "date-month, #" + idPrefix +  "date-day").change(updateDate);

	function unknownDate(){
		$("#" + idPrefix +  "date-year, #" + idPrefix +  "date-month, #" + idPrefix +  "date-day")
			.prop("disabled", $(this).prop("checked"));
		updateDate();

		$(this).prop("checked")
			? $("#" + idPrefix + "parts-container").velocity("slideUp")
			: $("#" + idPrefix + "parts-container").velocity("slideDown");
	}

	$("#" + idPrefix + "date-unknown").change(unknownDate);
}

$.fn.select2.defaults.set("theme", "bootstrap");

$(".select2").val(null).select2({
	placeholder: "Please select"
});

$(".report").submit(checkReportQuery);
$(".report").on("click", ".lastSixMonths", lastSixMonths);
$(".report").on("click", ".lastThreeMonths", lastThreeMonths);
$(".datepicker").datepicker({
	dateFormat: "yy-mm-dd"
});

$("#addNewSpecificReport").click();

$.extend(true, $.fn.dataTable.defaults, {
	language: {
		emptyTable: "No entries available",
		zeroRecords: "No matching entries, please revise your search",
		paginate: {
			previous: "&lt;",
			next: "&gt;"
		}
	},
	stateSave: true,
	deferRender: true,
	dom: "lfprtip"
});

$("body").css("padding-top", $("#main-navbar").height()+5);

$("#individual-milestones, #aggregate-milestones").multiSelect({
	selectableOptgroup: true
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

$(document).on("click", ".table .view-evaluation", function(){
	var requestId = $(this).children("td").eq(0).children("a").html();
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

$(".toggle-descriptions").click(function(){
	var questionName = $(this).data("id");
	var headerHeight = $("#main-navbar").height();
	var padding = 5;
	var scrollto = $(this).parents(".question").velocity("scroll", {offset: -(headerHeight + padding)});
	var isExpanded = $("#" + questionName).hasClass("expanded-descriptions");
	if(isExpanded){
		$("." + questionName + " .description").velocity("slideUp", function(){
			$("#" + questionName).removeClass("expanded-descriptions");
		});
		$(this).html('<span class="glyphicon glyphicon-zoom-in"></span> Show descriptions');
	}
	else {
		$("#" + questionName).addClass("expanded-descriptions");
		$("." + questionName + " .description").velocity("slideDown");
		$(this).html('<span class="glyphicon glyphicon-zoom-out"></span> Hide descriptions');
	}
});

$(document).on("mouseenter", ".table-date-cell", function(){
	var date = $(this).data("date-value");
	if(date){
		$(this).data("original-value", $(this).text());
		$(this).text(moment(date).format("ll"));
	}
});

$(document).on("mouseenter", ".table-date-time-cell", function(){
	var date = $(this).data("date-value");
	if(date){
		$(this).data("original-value", $(this).text());
		$(this).text(moment(date).format("ll LT"));
	}
});

$(document).on("mouseenter", ".table-date-range-cell", function(){
	var dateRange = $(this).data("date-range-value");
	if(dateRange){
		$(this).data("original-value", $(this).text());
		$(this).text(dateRange);
	}
});

$(document).on("mouseleave",
		".table-date-cell, .table-date-time-cell, .table-date-range-cell", function(){
	var originalValue = $(this).data("originalValue");
	if(originalValue)
		$(this).text(originalValue);
});

function confirmDeletion(event){
	event.stopPropagation();
	$(".confirm-delete").removeClass("confirm-delete")
		.html('<span class="glyphicon glyphicon-remove"></span> Delete');
	$(this).addClass("confirm-delete")
		.html('<span class="glyphicon glyphicon-remove"></span> Confirm delete');
}

$(".table-filter-select").change(function(){
	var filterType = $(this).val();
	$($(this).data("filterTable")).DataTable({
		retrieve: true
	}).column($(this).data("filterColumn")).search(filterType, false, false, false).draw();
});

$(".refresh-table-glyph").click(function(){
	$($(this).data("table")).DataTable({
		retrieve: true
	}).ajax.reload();
	$(this).attr("title", "Refreshed!").tooltip("fixTitle").tooltip("show");;
});

$(".refresh-table-glyph").on("hidden.bs.tooltip", function(){
	$(this).attr("title", "Refresh").tooltip("fixTitle");
});

$("[data-toggle='tooltip']").tooltip();

$(document).on("click", ".close-body-block-button", function(){
	$(this).parents(".body-block").velocity("fadeOut");
});

$(document).on("click", ".hide-body-block-button", function(){
	$(this).parents(".body-block").velocity("slideUp");
});


function checkCookies(container, email) {
	if (!cookiesEnabled()) {
		var alert = document.createElement('div');
		alert.className = 'alert alert-danger';
		alert.innerHTML = '<p>Cookies are required for Resident Program to function correctly. '
			+ 'Please <a target="_blank" rel="noopener noreferrer" href="https://www.whatismybrowser.com/guides/how-to-enable-cookies/auto">enable cookies</a> in your web browser.</p>'
			+ '<p>Please feel free to contact me at <a href="mailto:' + email + '">'
			+ email
			+ '</a> if you have any questions.</p>';
		container.insertBefore(alert, container.children[0]);
	}
}

function cookiesEnabled() {
	var enabled = Boolean(navigator.cookieEnabled);
	if (enabled) {
		document.cookie = 'testcookie';
		enabled = document.cookie.indexOf('testcookie') !== -1;
	}

	return enabled;
}
