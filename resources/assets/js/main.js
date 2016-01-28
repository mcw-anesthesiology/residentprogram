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
	$(report).appendTo(".modal-specRpt").slideDown();
	$(".datepicker").datepicker({
		dateFormat: "yy-mm-dd"
	});
});

 $(".modal-specRpt").on("click", ".remove-report-group", function(){
	$(this).parent().slideUp(function(){
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
	var d = new Date();
	var day = d.getDate();
	day = ("0"+day).slice(-2); //converts possible D dates to DD format
	var month = d.getMonth()+1;
	month = ("0"+month).slice(-2); //converts possible M months to MM format
	var year = d.getFullYear();
	var date = year+"-"+month+"-"+day;
	$(this).parents(".report-options").find(".endDate").val(date);

	d.setMonth(d.getMonth()-6);
	day = d.getDate();
	day = ("0"+day).slice(-2);
	month = d.getMonth()+1;
	month = ("0"+month).slice(-2);
	year = d.getFullYear();
	date = year+"-"+month+"-"+day;
	$(this).parents(".report-options").find(".startDate").val(date);
}

function lastThreeMonths(){
	var d = new Date();
	var day = d.getDate();
	day = ("0"+day).slice(-2); //converts possible D dates to DD format
	var month = d.getMonth()+1;
	month = ("0"+month).slice(-2); //converts possible M months to MM format
	var year = d.getFullYear();
	var date = year+"-"+month+"-"+day;
	$(this).parents(".report-options").find(".endDate").val(date);

	d.setMonth(d.getMonth()-3);
	day = d.getDate();
	day = ("0"+day).slice(-2);
	month = d.getMonth()+1;
	month = ("0"+month).slice(-2);
	year = d.getFullYear();
	date = year+"-"+month+"-"+day;
	$(this).parents(".report-options").find(".startDate").val(date);
}

function appendAlert(alertText, parent, alertType){
	alertType = (typeof(alertType) == "undefined" ? "danger" : alertType);

	var alert = document.createElement("div");
	alert.className = "alert alert-" + alertType + " alert-dismissable";
	alert.role = "alert";

	var close = document.createElement("button");
	close.type = "button";
	close.className = "close";
	close.dataset.dismiss = "alert";
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
