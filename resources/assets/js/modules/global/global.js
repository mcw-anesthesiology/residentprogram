/* global moment */
/* eslint-disable no-var */

$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $("meta[name='csrf_token']").attr("content")
	}
});

moment.updateLocale("en", {
	calendar: {
		lastDay: '[Yesterday at] LT',
		sameDay: '[Today at] LT',
		nextDay: '[Tomorrow at] LT',
		lastWeek: '[Last] dddd [at] LT',
		nextWeek: 'dddd [at] LT',
		sameElse: "ll"
	}
});

 $(".modal-specRpt").on("click", ".remove-report-group", function(){
	$(this).parent().remove();
 });

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

$.fn.select2.defaults.set('theme', 'bootstrap');

$("#individual-milestones, #aggregate-milestones").multiSelect({
	selectableOptgroup: true
});

// https://davidwalsh.name/essential-javascript-functions
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

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
	var isExpanded = $("#" + questionName).hasClass("expanded-descriptions");

	if (isExpanded) {
		$("." + questionName + " .description").velocity("slideUp", function(){
			$("#" + questionName).removeClass("expanded-descriptions");
		});
		$(this).html('<span class="glyphicon glyphicon-zoom-in"></span> Show descriptions');
	} else {
		$("#" + questionName).addClass("expanded-descriptions");
		$("." + questionName + " .description").velocity("slideDown");
		$(this).html('<span class="glyphicon glyphicon-zoom-out"></span> Hide descriptions');
	}
});

$(document).on("mouseenter", ".table-date-cell", function(){
	var date = $(this).data("date-value");
	if (date) {
		$(this).data("original-value", $(this).text());
		$(this).text(moment(date).format("ll"));
	}
});

$(document).on("mouseenter", ".table-date-time-cell", function(){
	var date = $(this).data("date-value");
	if (date) {
		$(this).data("original-value", $(this).text());
		$(this).text(moment(date).format("ll LT"));
	}
});

$(document).on("mouseenter", ".table-date-range-cell", function(){
	var dateRange = $(this).data("date-range-value");
	if (dateRange) {
		$(this).data("original-value", $(this).text());
		$(this).text(dateRange);
	}
});

$(document).on("mouseleave", ".table-date-cell, .table-date-time-cell, .table-date-range-cell", function(){
	var originalValue = $(this).data("originalValue");
	if (originalValue) {
		$(this).text(originalValue);
	}
});

// eslint-disable-next-line no-unused-vars
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
	$(this).attr("title", "Refreshed!").tooltip("fixTitle").tooltip("show");
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


// eslint-disable-next-line no-unused-vars
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
