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
		sameElse: "ll LT"
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

function addSendEmailModalBody(modal, replacements){
	modal.find(".ids-list-button").click(function(){
		$(".ids-container").slideToggle();
	});

	modal.find(".body-rendered").mouseenter(showEmailBody);
	modal.find(".body-rendered").focusin(focusEmailBody);

	function showEmailBody(){
		modal.find(".body-rendered").hide();
		modal.find(".body").show();
	}

	function focusEmailBody(){
		showEmailBody();
		modal.find(".body").focus()
	}

	modal.find(".body").mouseleave(function(){
		if(!$(this).is(document.activeElement))
			unfocusEmailBody();
	});
	modal.find(".body").focusout(unfocusEmailBody);

	unfocusEmailBody();

	function unfocusEmailBody(){
		modal.find(".body").hide();
		markupEmailBody();
		modal.find(".body-rendered").show();
	}


	function markupEmailBody(){
		var bodyText = marked(modal.find(".body").val());

		for(var i = 0; i < replacements.length; i++){
			var replacement = replacements[i];
			var pattern = new RegExp("\\[\\[" + replacement + "\\]\\]", "g");
			var label = '<span class="label label-info">' + replacement + '</span>';
			bodyText = bodyText.replace(pattern, label);
		}

		modal.find(".body-rendered").html(bodyText);
	}
}

function openSendEmailModal(users, modal, subjectText, bodyText,
							sendSingleCallback, sendAllCallback,
							usersTitle, replacements){
	var user;
	modal.find(".send")
		.off("click", sendSingleCallback)
		.off("click", sendAllCallback);

	if(Array.isArray(users)){
		var list = modal.find(".ids-list")[0];
		var li, checkbox, label, labelText;
		var numSentUsers = 0;

		$(list).empty();
		for(var i = 0; i < users.length; i++){
			user = users[i];

			li = document.createElement("li");
			label = document.createElement("label");
			checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.className = "send-all-id";
			checkbox.value = user.id;
			if(!user.email)
				checkbox.disabled = true;
			else if(user.send){
				checkbox.checked = true;
				numSentUsers++;
			}
			if(user.data){
				var dataKeys = Object.keys(user.data);
				for(var j = 0; j < dataKeys.length; j++){
					checkbox.setAttribute("data-" + dataKeys[j], user.data[dataKeys[j]]);
				}
			}

			label.appendChild(checkbox);
			labelText = document.createTextNode(" " + user.full_name);
			label.appendChild(labelText);
			li.appendChild(label);
			list.appendChild(li);
		}

		if(numSentUsers <= 6)
			modal.find(".ids-container").show();
		else
			modal.find(".ids-container").hide();

		$(".send-all-id").change(function(){
			var numSentUsers = parseInt($(".to").val().split(" ")[0], 10);
			if($(this).prop("checked"))
				numSentUsers++;
			else
				numSentUsers--;
			$(".to").val(numSentUsers + " " + usersTitle);
		});

		modal.find(".to").val(numSentUsers + " " + usersTitle);
		modal.find(".to-container").addClass("input-group");
		modal.find(".ids-list-button-container").show();
		appendAlert("Please verify list of residents before sending", modal.find(".alert-container"), "warning");
		modal.find(".send").click(sendAllCallback);
	} else {
		user = users;
		modal.find(".id").val(user.id);
		modal.find(".to").val(user.full_name + " <" + user.email + ">");
		modal.find(".to-container").removeClass("input-group");
		modal.find(".ids-list-button-container").hide();
		modal.find(".ids-list").empty();
		modal.find(".ids-container").hide();
		modal.find(".send").click(sendSingleCallback);
	}

	modal.find(".subject").val(subjectText);
	modal.find(".body").val(bodyText);

	var bodyHeight = 300;
	modal.find(".body-rendered").height(bodyHeight);
	addSendEmailModalBody(modal, replacements);
	modal.modal("show");
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
	if(!parent)
		parent = "#alert-container";

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

function unlimitRestTableEvals(){
	var dt = this.DataTable({
		retrieve: true
	});
	var url = dt.ajax.url();
	dt.ajax.url(url.substring(0, url.lastIndexOf("?"))).load().draw();
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

$("table").on("mouseenter", ".table-date-cell", function(){
	var date = $(this).data("date-value");
	if(date){
		$(this).data("original-value", $(this).text());
		$(this).text(moment(date).format("ll"));
	}
});

$("table").on("mouseenter", ".table-date-time-cell", function(){
	var date = $(this).data("date-value");
	if(date){
		$(this).data("original-value", $(this).text());
		$(this).text(moment(date).format("ll LT"));
	}
});

$("table").on("mouseleave", ".table-date-cell, .table-date-time-cell", function(){
	var originalValue = $(this).data("originalValue");
	if(originalValue)
		$(this).text(originalValue);
});

function ucfirst(str){
	return str.charAt(0).toUpperCase() + str.substring(1);
}

function createDateCell(td, date, rowData, rowIndex, colIndex){
	if(date && $(td).text() !== moment(date).format("ll"))
		$(td).attr("data-date-value", moment(date).valueOf())
			.addClass("table-date-cell");
}

function createDateTimeCell(td, date, rowData, rowIndex, colIndex){
	if(date && $(td).text() !== moment(date).format("ll LT"))
		$(td).attr("data-date-value", moment(date).valueOf())
			.addClass("table-date-time-cell");
}

function renderDateCell(date, type){
	if(type === "sort" || type === "type")
		return date ? moment(date).valueOf() : "";

	return date ? moment(date).format("MMMM Y") : "";
}

function renderDateTimeCell(date, type){
	if(type === "sort" || type === "type")
		return date ? moment(date).valueOf() : "";

	return date ? moment(date).calendar() : "";
}

function renderAccountStatus(status){
	var labelContext;
	switch(status){
		case "active":
			labelContext = "label-success";
			break;
		case "inactive":
			labelContext = "label-danger";
			break;
		case "pending":
			labelContext = "label-warning";
			break;
		default:
			labelContext = "label-default";
			break;
	}
	return '<span class="label ' + labelContext + '">' + ucfirst(status) + '</span>';
}

function renderEvaluationStatus(status){
	var labelContext;
	switch(status){
		case "complete":
			labelContext = "label-success";
			break;
		case "disabled":
		case "canceled by admin":
		case "canceled by faculty":
		case "canceled by resident":
		case "canceled by fellow":
		case "canceled by staff":
			labelContext = "label-danger";
			break;
		case "pending":
			labelContext = "label-warning";
			break;
		default:
			labelContext = "label-default";
			break;
	}
	return '<span class="label ' + labelContext + '">' + ucfirst(status) + '</span>';
}

function renderTrainingLevel(trainingLevel){
	if(trainingLevel){
		if(trainingLevel.indexOf("ca-") > -1)
			return trainingLevel.toUpperCase();
		else
			return ucfirst(trainingLevel);
	}

	return "";
}

function renderSecondaryTrainingLevel(secondaryTrainingLevel){
	if(secondaryTrainingLevel){
		var allCaps = ["raaps"];
		if(allCaps.indexOf(secondaryTrainingLevel) > -1)
			return secondaryTrainingLevel.toUpperCase();
		else
			return ucfirst(secondaryTrainingLevel);
	}

	return "";
}

function createEditAndDeleteButtons(thing, name){
	var dataAttributes = getDataAttributes(thing);

	var editButton = '<button type="button" class="btn btn-xs btn-info edit-' + name + '-button" '
		+ dataAttributes
		+ '><span class="glyphicon glyphicon-edit"></span> Edit</button>';

	var deleteButton = '<button type="button" class="btn btn-xs btn-danger delete-' + name + '-button" '
		+ dataAttributes
		+ '><span class="glyphicon glyphicon-remove"></span> Delete</button>';

	return [editButton, deleteButton];
}

function confirmDeletion(event){
	event.stopPropagation();
	$(".confirm-delete").removeClass("confirm-delete")
		.html('<span class="glyphicon glyphicon-remove"></span> Delete');
	$(this).addClass("confirm-delete")
		.html('<span class="glyphicon glyphicon-remove"></span> Confirm delete');
}

function getDataAttributes(thing, excludes){
	var dataAttributes = "";
	Object.getOwnPropertyNames(thing).forEach(function(propName){
		if(excludes.indexOf(propName) === -1 && thing[propName] != null)
			dataAttributes += 'data-' + propName + '="' + thing[propName] + '" ';
	});
	return dataAttributes;
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

function renderCaseLogSchema(schema, container){
	if(!container)
		container = document.createElement("section");
	Object.getOwnPropertyNames(schema).forEach(function(sectionTitle){
		var section = schema[sectionTitle];

		var panel = document.createElement("section");
		var panelHeading = document.createElement("div");
		var panelTitle = document.createElement("h4");
		var panelBody = document.createElement("div");

		panel.className = "panel panel-default";
		panelHeading.className = "panel-heading";
		panelTitle.className = "panel-title";
		panelBody.className = "panel-body";
		panelTitle.appendChild(document.createTextNode(sectionTitle));
		panelHeading.appendChild(panelTitle);
		panel.appendChild(panelHeading);
		panel.appendChild(panelBody);


		Object.getOwnPropertyNames(section).forEach(function(subsectionTitle){
			var subsection = section[subsectionTitle];

			var subsectionContainer = document.createElement("section");
			var row = document.createElement("div");
			if(isNaN(subsectionTitle)){
				var subsectionHeading = document.createElement("h5");
				subsectionHeading.className = "sub-header";
				subsectionHeading.appendChild(document.createTextNode(subsectionTitle));
				subsectionContainer.appendChild(subsectionHeading);
			}
			row.className = "row";

			subsection.forEach(function(input, inputIndex){
				switch(input.type){
					case "checkbox":
						var checkboxContainer = document.createElement("div");
						var label = document.createElement("label");
						var nameInput = document.createElement("input");
						var typeInput = document.createElement("input");
						var falseInput = document.createElement("input");
						var trueInput = document.createElement("input");

						checkboxContainer.className = "col-md-4 checkbox";
						nameInput.type = "hidden";
						nameInput.name = "details[" + sectionTitle + "][" + subsectionTitle + "][" + inputIndex + "][name]";
						nameInput.value = input.name;
						typeInput.type = "hidden";
						typeInput.name = "details[" + sectionTitle + "][" + subsectionTitle + "][" + inputIndex + "][type]";
						typeInput.value = "checkbox";
						falseInput.type = "hidden";
						falseInput.name = "details[" + sectionTitle + "][" + subsectionTitle + "][" + inputIndex + "][value]";
						falseInput.value = "0";
						trueInput.checked = (input.value == 0);
						trueInput.type = "checkbox";
						trueInput.name = "details[" + sectionTitle + "][" + subsectionTitle + "][" + inputIndex + "][value]";
						trueInput.value = "1";
						trueInput.checked = (input.value == 1);
						label.appendChild(nameInput);
						label.appendChild(typeInput);
						label.appendChild(falseInput);
						label.appendChild(trueInput);
						label.appendChild(document.createTextNode(input.name));
						checkboxContainer.appendChild(label);
						row.appendChild(checkboxContainer);
						break;
				}
			});

			subsectionContainer.appendChild(row);
			panelBody.appendChild(subsectionContainer);
		});

		container.appendChild(panel);
	});

	return container;
}

$(document).on("click", ".close-body-block-button", function(){
	$(this).parents(".body-block").velocity("fadeOut");
});

$(document).on("click", ".hide-body-block-button", function(){
	$(this).parents(".body-block").velocity("slideUp");
});
