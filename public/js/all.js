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

/* eslint-disable */
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
	evalHistoryChart[canvas] = new Chart1(ctx).Line(data, options);
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

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["moment"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("moment")) : factory(root["moment"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_32__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _caseLogDetailsSchema = __webpack_require__(1);
	
	Object.keys(_caseLogDetailsSchema).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _caseLogDetailsSchema[key];
	    }
	  });
	});
	
	var _datatableUtils = __webpack_require__(57);
	
	Object.keys(_datatableUtils).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _datatableUtils[key];
	    }
	  });
	});
	
	var _formUtils = __webpack_require__(60);
	
	Object.keys(_formUtils).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _formUtils[key];
	    }
	  });
	});
	
	var _utils = __webpack_require__(59);
	
	Object.keys(_utils).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _utils[key];
	    }
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.caseLogDetailsSchemaIsValid = caseLogDetailsSchemaIsValid;
	exports.renderCaseLogDetailsSchema = renderCaseLogDetailsSchema;
	exports.generateCaseLogDetailsReport = generateCaseLogDetailsReport;
	exports.generateCaseLogDetailsReportCharts = generateCaseLogDetailsReportCharts;
	exports.generateCaseLogLocationReportTable = generateCaseLogLocationReportTable;
	
	var _chart = __webpack_require__(2);
	
	var _chart2 = _interopRequireDefault(_chart);
	
	var _jsonschema = __webpack_require__(46);
	
	var _caseLogDetails = __webpack_require__(56);
	
	var _caseLogDetails2 = _interopRequireDefault(_caseLogDetails);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var v = new _jsonschema.Validator();
	function caseLogDetailsSchemaIsValid(detailsSchema) {
		return v.validate(detailsSchema, _caseLogDetails2.default).valid;
	}
	
	function renderCaseLogDetailsSchema(schema, responses) {
		var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.createElement('section');
	
		schema.forEach(function (section) {
			var panel = document.createElement('section');
			var panelBody = document.createElement('div');
	
			panel.className = 'panel panel-default';
	
			if (section.title) {
				var panelHeading = document.createElement('div');
				var panelTitle = document.createElement('h4');
	
				panelHeading.className = 'panel-heading';
				panelTitle.className = 'panel-title';
				panelTitle.appendChild(document.createTextNode(section.title));
				panelHeading.appendChild(panelTitle);
				panel.appendChild(panelHeading);
			}
	
			panelBody.className = 'panel-body';
			panel.appendChild(panelBody);
	
			section.subsections.forEach(function (subsection) {
				var subsectionContainer = document.createElement('section');
				var row = document.createElement('div');
				row.className = 'row';
				if (subsection.title) {
					var subsectionHeading = document.createElement('h5');
					subsectionHeading.className = 'sub-header';
					subsectionHeading.appendChild(document.createTextNode(subsection.title));
					subsectionContainer.appendChild(subsectionHeading);
				}
	
				subsection.inputs.forEach(function (input) {
					renderInput(input, subsection.name, row);
				});
	
				subsectionContainer.appendChild(row);
				panelBody.appendChild(subsectionContainer);
			});
	
			container.appendChild(panel);
		});
	
		return container;
	
		function renderInput(input, name, container) {
			switch (input.type) {
				case 'checkbox':
					{
						var checkboxContainer = document.createElement('div');
						var label = document.createElement('label');
						var checkbox = document.createElement('input');
	
						checkboxContainer.className = 'col-md-4 checkbox';
						checkbox.type = 'checkbox';
						checkbox.name = 'details[' + name + '][]';
						checkbox.value = input.value || input.label;
						if (responses && responses[name] && responses[name].indexOf(checkbox.value) !== -1) checkbox.checked = true;
						if (responses) checkbox.readonly = true;
						label.appendChild(checkbox);
						label.appendChild(document.createTextNode(input.label));
						checkboxContainer.appendChild(label);
	
						container.appendChild(checkboxContainer);
						break;
					}
			}
		}
	}
	
	function generateCaseLogDetailsReport(caseLogs) {
		if (!caseLogs || caseLogs.length === 0) return;
	
		var report = {};
		caseLogs.forEach(function (caseLog) {
			if (!report.hasOwnProperty(caseLog.details_schema.details_type)) report[caseLog.details_schema.details_type] = {
				numCases: 0,
				types: {}
			};
			var detailsReport = report[caseLog.details_schema.details_type];
			detailsReport.numCases++;
	
			var _loop = function _loop(typeName) {
				if (!detailsReport.types.hasOwnProperty(typeName)) detailsReport.types[typeName] = {
					count: 0,
					responses: {},
					locations: {}
				};
	
				detailsReport.types[typeName].count++;
				caseLog.details[typeName].forEach(function (response) {
					if (!detailsReport.types[typeName].responses.hasOwnProperty(response)) detailsReport.types[typeName].responses[response] = {
						count: 0,
						locations: {}
					};
					detailsReport.types[typeName].responses[response].count++;
	
					if (!detailsReport.types[typeName].responses[response].locations.hasOwnProperty(caseLog.location.name)) detailsReport.types[typeName].responses[response].locations[caseLog.location.name] = {
						count: 0,
						caseLogs: []
					};
					detailsReport.types[typeName].responses[response].locations[caseLog.location.name].count++;
					detailsReport.types[typeName].responses[response].locations[caseLog.location.name].caseLogs.push(caseLog);
	
					if (!detailsReport.types[typeName].locations.hasOwnProperty(caseLog.location.name)) detailsReport.types[typeName].locations[caseLog.location.name] = {
						count: 0,
						caseLogs: []
					};
					detailsReport.types[typeName].locations[caseLog.location.name].count++;
					detailsReport.types[typeName].locations[caseLog.location.name].caseLogs.push(caseLog);
				});
			};
	
			for (var typeName in caseLog.details) {
				_loop(typeName);
			}
		});
		return report;
	}
	
	var chartColors = ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB', '#7eda35', '#462aa3', '#dd2727', '#f09113', '#1a7829'];
	
	function generateCaseLogDetailsReportCharts(report, name, container) {
		var charts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
		if (!report || report.length === 0) return;
	
		var reportGroupNames = Object.keys(report);
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = container.querySelectorAll('row')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var section = _step.value;
	
				if (!section.hasAttribute('data-report-group-name') || !(reportGroupNames.indexOf(section.getAttribute('data-report-group-name')) !== -1)) container.removeChild(section);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	
		for (var chartName in charts) {
			if (!(reportGroupNames.indexOf(chartName) !== -1)) {
				charts[chartName].destroy();
				delete charts[chartName];
			}
		}
	
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;
	
		try {
			for (var _iterator2 = reportGroupNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var reportGroupName = _step2.value;
	
	
				var data = {
					datasets: [{
						label: name,
						data: [],
						backgroundColor: []
					}],
					labels: []
				};
	
				var canvas = void 0,
				    numCasesTd = void 0,
				    tbody = void 0;
				var reportGroupSection = container.querySelector('section[data-report-group-name="' + reportGroupName + '"]');
				if (reportGroupSection) {
					numCasesTd = reportGroupSection.querySelector('table.num-cases-table td');
					tbody = reportGroupSection.querySelector('table.stats-table tbody');
				} else {
					reportGroupSection = document.createElement('section');
					var reportGroupTitle = document.createElement('h2');
					var canvasContainer = document.createElement('div');
					canvas = document.createElement('canvas');
					reportGroupSection.className = 'row';
					reportGroupSection.setAttribute('data-report-group-name', reportGroupName);
					reportGroupSection.appendChild(reportGroupTitle);
					reportGroupTitle.appendChild(document.createTextNode(reportGroupName.toUpperCase()));
					canvasContainer.className = 'col-md-8 case-log-report-chart-container';
					container.appendChild(reportGroupSection);
					reportGroupSection.appendChild(canvasContainer);
					canvasContainer.appendChild(canvas);
	
					var statsContainer = document.createElement('div');
					var numTable = document.createElement('table');
					var statsTable = document.createElement('table');
					var thead = document.createElement('thead');
					tbody = document.createElement('tbody');
					var tr = document.createElement('tr');
					var th = document.createElement('th');
					numCasesTd = document.createElement('td');
					statsContainer.className = 'col-md-4 case-log-report-stats-container';
					reportGroupSection.appendChild(statsContainer);
					numTable.className = 'table num-cases-table';
					statsContainer.appendChild(numTable);
					numTable.appendChild(tr);
					tr.appendChild(th);
					th.appendChild(document.createTextNode('Number of cases'));
					tr.appendChild(numCasesTd);
	
					tr = document.createElement('tr');
					th = document.createElement('th');
					statsTable.className = 'table table-striped table-bordered stats-table';
					statsContainer.appendChild(statsTable);
					statsTable.appendChild(thead);
					thead.appendChild(tr);
					tr.appendChild(th);
					statsTable.appendChild(tbody);
					th.appendChild(document.createTextNode('Response'));
					tr.appendChild(th);
					th = document.createElement('th');
					th.appendChild(document.createTextNode('Times selected'));
					tr.appendChild(th);
					th = document.createElement('th');
					th.appendChild(document.createTextNode('Percentage'));
					tr.appendChild(th);
				}
	
				while (tbody.firstChild) {
					tbody.removeChild(tbody.firstChild);
				}var numCases = report[reportGroupName].numCases;
				while (numCasesTd.firstChild) {
					numCasesTd.removeChild(numCasesTd.firstChild);
				}numCasesTd.appendChild(document.createTextNode(numCases));
				if (report[reportGroupName].types[name]) {
					var responses = Object.keys(report[reportGroupName].types[name].responses).sort();
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;
	
					try {
						for (var _iterator3 = responses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var response = _step3.value;
	
							var count = report[reportGroupName].types[name].responses[response].count;
							var percentage = Math.round(count / numCases * 100);
							data.datasets[0].data.push(count);
							data.datasets[0].backgroundColor.push(chartColors[data.datasets[0].data.length - 1]);
							data.labels.push(response);
	
							var _tr = document.createElement('tr');
							var _th = document.createElement('th');
							var selectedTd = document.createElement('td');
							var percentageTd = document.createElement('td');
	
							_th.appendChild(document.createTextNode(response));
							selectedTd.appendChild(document.createTextNode(count));
							percentageTd.appendChild(document.createTextNode(percentage + '%'));
	
							_tr.appendChild(_th);
							_tr.appendChild(selectedTd);
							_tr.appendChild(percentageTd);
							tbody.appendChild(_tr);
						}
					} catch (err) {
						_didIteratorError3 = true;
						_iteratorError3 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion3 && _iterator3.return) {
								_iterator3.return();
							}
						} finally {
							if (_didIteratorError3) {
								throw _iteratorError3;
							}
						}
					}
				}
	
				if (charts[reportGroupName]) {
					charts[reportGroupName].data.datasets = data.datasets;
					charts[reportGroupName].data.labels = data.labels;
					charts[reportGroupName].update();
				} else {
					charts[reportGroupName] = new _chart2.default(canvas, {
						data: data,
						type: 'polarArea',
						options: {
							scale: {
								ticks: {
									stepSize: 1
								}
							}
						}
					});
				}
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}
	
		return charts;
	}
	
	function generateCaseLogLocationReportTable(report, name, container) {
		if (!report || report.length === 0) return;
	
		var reportGroupNames = Object.keys(report);
		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;
	
		try {
			for (var _iterator4 = reportGroupNames[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var reportGroupName = _step4.value;
	
				var reportGroupSection = container.querySelector('section[data-report-group-name="' + reportGroupName + '"]');
				var tbody = reportGroupSection.querySelector('table.location-table tbody');
				if (!tbody) {
					var statsContainer = reportGroupSection.querySelector('.case-log-report-stats-container');
					var locationTable = document.createElement('table');
					var thead = document.createElement('thead');
					tbody = document.createElement('tbody');
					var tr = document.createElement('tr');
					var th = document.createElement('th');
					locationTable.className = 'table table-striped table-bordered location-table';
					statsContainer.appendChild(locationTable);
					locationTable.appendChild(thead);
					locationTable.appendChild(tbody);
					thead.appendChild(tr);
					tr.appendChild(th);
					th.appendChild(document.createTextNode('Location'));
					th = document.createElement('th');
					tr.appendChild(th);
					th.appendChild(document.createTextNode('Times selected'));
					th = document.createElement('th');
					tr.appendChild(th);
					th.appendChild(document.createTextNode('Percentage'));
				}
	
				while (tbody.firstChild) {
					tbody.removeChild(tbody.firstChild);
				}var numCases = report[reportGroupName].numCases;
				if (report[reportGroupName].types[name]) {
					var locations = Object.keys(report[reportGroupName].types[name].locations).sort();
					var _iteratorNormalCompletion5 = true;
					var _didIteratorError5 = false;
					var _iteratorError5 = undefined;
	
					try {
						for (var _iterator5 = locations[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
							var location = _step5.value;
	
							var count = report[reportGroupName].types[name].locations[location].count;
							var percentage = Math.round(count / numCases * 100);
	
							var _tr2 = document.createElement('tr');
							var _th2 = document.createElement('th');
							var selectedTd = document.createElement('td');
							var percentageTd = document.createElement('td');
	
							_th2.appendChild(document.createTextNode(location));
							selectedTd.appendChild(document.createTextNode(count));
							percentageTd.appendChild(document.createTextNode(percentage + '%'));
	
							_tr2.appendChild(_th2);
							_tr2.appendChild(selectedTd);
							_tr2.appendChild(percentageTd);
							tbody.appendChild(_tr2);
						}
					} catch (err) {
						_didIteratorError5 = true;
						_iteratorError5 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion5 && _iterator5.return) {
								_iterator5.return();
							}
						} finally {
							if (_didIteratorError5) {
								throw _iteratorError5;
							}
						}
					}
				}
			}
		} catch (err) {
			_didIteratorError4 = true;
			_iteratorError4 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion4 && _iterator4.return) {
					_iterator4.return();
				}
			} finally {
				if (_didIteratorError4) {
					throw _iteratorError4;
				}
			}
		}
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @namespace Chart
	 */
	var Chart = __webpack_require__(3)();
	
	__webpack_require__(4)(Chart);
	__webpack_require__(10)(Chart);
	__webpack_require__(11)(Chart);
	__webpack_require__(12)(Chart);
	__webpack_require__(13)(Chart);
	__webpack_require__(14)(Chart);
	__webpack_require__(15)(Chart);
	__webpack_require__(16)(Chart);
	__webpack_require__(17)(Chart);
	__webpack_require__(18)(Chart);
	__webpack_require__(19)(Chart);
	__webpack_require__(20)(Chart);
	__webpack_require__(21)(Chart);
	
	__webpack_require__(22)(Chart);
	__webpack_require__(23)(Chart);
	__webpack_require__(24)(Chart);
	__webpack_require__(25)(Chart);
	
	__webpack_require__(26)(Chart);
	__webpack_require__(27)(Chart);
	__webpack_require__(28)(Chart);
	__webpack_require__(29)(Chart);
	__webpack_require__(30)(Chart);
	__webpack_require__(31)(Chart);
	
	// Controllers must be loaded after elements
	// See Chart.core.datasetController.dataElementType
	__webpack_require__(33)(Chart);
	__webpack_require__(34)(Chart);
	__webpack_require__(35)(Chart);
	__webpack_require__(36)(Chart);
	__webpack_require__(37)(Chart);
	__webpack_require__(38)(Chart);
	
	__webpack_require__(39)(Chart);
	__webpack_require__(40)(Chart);
	__webpack_require__(41)(Chart);
	__webpack_require__(42)(Chart);
	__webpack_require__(43)(Chart);
	__webpack_require__(44)(Chart);
	__webpack_require__(45)(Chart);
	
	window.Chart = module.exports = Chart;


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function() {
	
		// Occupy the global variable of Chart, and create a simple base class
		var Chart = function(context, config) {
			var me = this;
			var helpers = Chart.helpers;
			me.config = config || {
				data: {
					datasets: []
				}
			};
	
			// Support a jQuery'd canvas element
			if (context.length && context[0].getContext) {
				context = context[0];
			}
	
			// Support a canvas domnode
			if (context.getContext) {
				context = context.getContext('2d');
			}
	
			me.ctx = context;
			me.canvas = context.canvas;
	
			context.canvas.style.display = context.canvas.style.display || 'block';
	
			// Figure out what the size of the chart will be.
			// If the canvas has a specified width and height, we use those else
			// we look to see if the canvas node has a CSS width and height.
			// If there is still no height, fill the parent container
			me.width = context.canvas.width || parseInt(helpers.getStyle(context.canvas, 'width'), 10) || helpers.getMaximumWidth(context.canvas);
			me.height = context.canvas.height || parseInt(helpers.getStyle(context.canvas, 'height'), 10) || helpers.getMaximumHeight(context.canvas);
	
			me.aspectRatio = me.width / me.height;
	
			if (isNaN(me.aspectRatio) || isFinite(me.aspectRatio) === false) {
				// If the canvas has no size, try and figure out what the aspect ratio will be.
				// Some charts prefer square canvases (pie, radar, etc). If that is specified, use that
				// else use the canvas default ratio of 2
				me.aspectRatio = config.aspectRatio !== undefined ? config.aspectRatio : 2;
			}
	
			// Store the original style of the element so we can set it back
			me.originalCanvasStyleWidth = context.canvas.style.width;
			me.originalCanvasStyleHeight = context.canvas.style.height;
	
			// High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
			helpers.retinaScale(me);
			me.controller = new Chart.Controller(me);
	
			// Always bind this so that if the responsive state changes we still work
			helpers.addResizeListener(context.canvas.parentNode, function() {
				if (me.controller && me.controller.config.options.responsive) {
					me.controller.resize();
				}
			});
	
			return me.controller ? me.controller : me;
	
		};
	
		// Globally expose the defaults to allow for user updating/changing
		Chart.defaults = {
			global: {
				responsive: true,
				responsiveAnimationDuration: 0,
				maintainAspectRatio: true,
				events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
				hover: {
					onHover: null,
					mode: 'single',
					animationDuration: 400
				},
				onClick: null,
				defaultColor: 'rgba(0,0,0,0.1)',
				defaultFontColor: '#666',
				defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
				defaultFontSize: 12,
				defaultFontStyle: 'normal',
				showLines: true,
	
				// Element defaults defined in element extensions
				elements: {},
	
				// Legend callback string
				legendCallback: function(chart) {
					var text = [];
					text.push('<ul class="' + chart.id + '-legend">');
					for (var i = 0; i < chart.data.datasets.length; i++) {
						text.push('<li><span style="background-color:' + chart.data.datasets[i].backgroundColor + '"></span>');
						if (chart.data.datasets[i].label) {
							text.push(chart.data.datasets[i].label);
						}
						text.push('</li>');
					}
					text.push('</ul>');
	
					return text.join('');
				}
			}
		};
	
		Chart.Chart = Chart;
	
		return Chart;
	
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* global window: false */
	/* global document: false */
	'use strict';
	
	var color = __webpack_require__(5);
	
	module.exports = function(Chart) {
		// Global Chart helpers object for utility methods and classes
		var helpers = Chart.helpers = {};
	
		// -- Basic js utility methods
		helpers.each = function(loopable, callback, self, reverse) {
			// Check to see if null or undefined firstly.
			var i, len;
			if (helpers.isArray(loopable)) {
				len = loopable.length;
				if (reverse) {
					for (i = len - 1; i >= 0; i--) {
						callback.call(self, loopable[i], i);
					}
				} else {
					for (i = 0; i < len; i++) {
						callback.call(self, loopable[i], i);
					}
				}
			} else if (typeof loopable === 'object') {
				var keys = Object.keys(loopable);
				len = keys.length;
				for (i = 0; i < len; i++) {
					callback.call(self, loopable[keys[i]], keys[i]);
				}
			}
		};
		helpers.clone = function(obj) {
			var objClone = {};
			helpers.each(obj, function(value, key) {
				if (helpers.isArray(value)) {
					objClone[key] = value.slice(0);
				} else if (typeof value === 'object' && value !== null) {
					objClone[key] = helpers.clone(value);
				} else {
					objClone[key] = value;
				}
			});
			return objClone;
		};
		helpers.extend = function(base) {
			var setFn = function(value, key) {
				base[key] = value;
			};
			for (var i = 1, ilen = arguments.length; i < ilen; i++) {
				helpers.each(arguments[i], setFn);
			}
			return base;
		};
		// Need a special merge function to chart configs since they are now grouped
		helpers.configMerge = function(_base) {
			var base = helpers.clone(_base);
			helpers.each(Array.prototype.slice.call(arguments, 1), function(extension) {
				helpers.each(extension, function(value, key) {
					if (key === 'scales') {
						// Scale config merging is complex. Add out own function here for that
						base[key] = helpers.scaleMerge(base.hasOwnProperty(key) ? base[key] : {}, value);
	
					} else if (key === 'scale') {
						// Used in polar area & radar charts since there is only one scale
						base[key] = helpers.configMerge(base.hasOwnProperty(key) ? base[key] : {}, Chart.scaleService.getScaleDefaults(value.type), value);
					} else if (base.hasOwnProperty(key) && helpers.isArray(base[key]) && helpers.isArray(value)) {
						// In this case we have an array of objects replacing another array. Rather than doing a strict replace,
						// merge. This allows easy scale option merging
						var baseArray = base[key];
	
						helpers.each(value, function(valueObj, index) {
	
							if (index < baseArray.length) {
								if (typeof baseArray[index] === 'object' && baseArray[index] !== null && typeof valueObj === 'object' && valueObj !== null) {
									// Two objects are coming together. Do a merge of them.
									baseArray[index] = helpers.configMerge(baseArray[index], valueObj);
								} else {
									// Just overwrite in this case since there is nothing to merge
									baseArray[index] = valueObj;
								}
							} else {
								baseArray.push(valueObj); // nothing to merge
							}
						});
	
					} else if (base.hasOwnProperty(key) && typeof base[key] === 'object' && base[key] !== null && typeof value === 'object') {
						// If we are overwriting an object with an object, do a merge of the properties.
						base[key] = helpers.configMerge(base[key], value);
	
					} else {
						// can just overwrite the value in this case
						base[key] = value;
					}
				});
			});
	
			return base;
		};
		helpers.scaleMerge = function(_base, extension) {
			var base = helpers.clone(_base);
	
			helpers.each(extension, function(value, key) {
				if (key === 'xAxes' || key === 'yAxes') {
					// These properties are arrays of items
					if (base.hasOwnProperty(key)) {
						helpers.each(value, function(valueObj, index) {
							var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
							var axisDefaults = Chart.scaleService.getScaleDefaults(axisType);
							if (index >= base[key].length || !base[key][index].type) {
								base[key].push(helpers.configMerge(axisDefaults, valueObj));
							} else if (valueObj.type && valueObj.type !== base[key][index].type) {
								// Type changed. Bring in the new defaults before we bring in valueObj so that valueObj can override the correct scale defaults
								base[key][index] = helpers.configMerge(base[key][index], axisDefaults, valueObj);
							} else {
								// Type is the same
								base[key][index] = helpers.configMerge(base[key][index], valueObj);
							}
						});
					} else {
						base[key] = [];
						helpers.each(value, function(valueObj) {
							var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
							base[key].push(helpers.configMerge(Chart.scaleService.getScaleDefaults(axisType), valueObj));
						});
					}
				} else if (base.hasOwnProperty(key) && typeof base[key] === 'object' && base[key] !== null && typeof value === 'object') {
					// If we are overwriting an object with an object, do a merge of the properties.
					base[key] = helpers.configMerge(base[key], value);
	
				} else {
					// can just overwrite the value in this case
					base[key] = value;
				}
			});
	
			return base;
		};
		helpers.getValueAtIndexOrDefault = function(value, index, defaultValue) {
			if (value === undefined || value === null) {
				return defaultValue;
			}
	
			if (helpers.isArray(value)) {
				return index < value.length ? value[index] : defaultValue;
			}
	
			return value;
		};
		helpers.getValueOrDefault = function(value, defaultValue) {
			return value === undefined ? defaultValue : value;
		};
		helpers.indexOf = Array.prototype.indexOf?
			function(array, item) {
				return array.indexOf(item);
			}:
			function(array, item) {
				for (var i = 0, ilen = array.length; i < ilen; ++i) {
					if (array[i] === item) {
						return i;
					}
				}
				return -1;
			};
		helpers.where = function(collection, filterCallback) {
			if (helpers.isArray(collection) && Array.prototype.filter) {
				return collection.filter(filterCallback);
			}
			var filtered = [];
	
			helpers.each(collection, function(item) {
				if (filterCallback(item)) {
					filtered.push(item);
				}
			});
	
			return filtered;
		};
		helpers.findIndex = Array.prototype.findIndex?
			function(array, callback, scope) {
				return array.findIndex(callback, scope);
			} :
			function(array, callback, scope) {
				scope = scope === undefined? array : scope;
				for (var i = 0, ilen = array.length; i < ilen; ++i) {
					if (callback.call(scope, array[i], i, array)) {
						return i;
					}
				}
				return -1;
			};
		helpers.findNextWhere = function(arrayToSearch, filterCallback, startIndex) {
			// Default to start of the array
			if (startIndex === undefined || startIndex === null) {
				startIndex = -1;
			}
			for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
				var currentItem = arrayToSearch[i];
				if (filterCallback(currentItem)) {
					return currentItem;
				}
			}
		};
		helpers.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex) {
			// Default to end of the array
			if (startIndex === undefined || startIndex === null) {
				startIndex = arrayToSearch.length;
			}
			for (var i = startIndex - 1; i >= 0; i--) {
				var currentItem = arrayToSearch[i];
				if (filterCallback(currentItem)) {
					return currentItem;
				}
			}
		};
		helpers.inherits = function(extensions) {
			// Basic javascript inheritance based on the model created in Backbone.js
			var me = this;
			var ChartElement = (extensions && extensions.hasOwnProperty('constructor')) ? extensions.constructor : function() {
				return me.apply(this, arguments);
			};
	
			var Surrogate = function() {
				this.constructor = ChartElement;
			};
			Surrogate.prototype = me.prototype;
			ChartElement.prototype = new Surrogate();
	
			ChartElement.extend = helpers.inherits;
	
			if (extensions) {
				helpers.extend(ChartElement.prototype, extensions);
			}
	
			ChartElement.__super__ = me.prototype;
	
			return ChartElement;
		};
		helpers.noop = function() {};
		helpers.uid = (function() {
			var id = 0;
			return function() {
				return id++;
			};
		}());
		// -- Math methods
		helpers.isNumber = function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		};
		helpers.almostEquals = function(x, y, epsilon) {
			return Math.abs(x - y) < epsilon;
		};
		helpers.max = function(array) {
			return array.reduce(function(max, value) {
				if (!isNaN(value)) {
					return Math.max(max, value);
				}
				return max;
			}, Number.NEGATIVE_INFINITY);
		};
		helpers.min = function(array) {
			return array.reduce(function(min, value) {
				if (!isNaN(value)) {
					return Math.min(min, value);
				}
				return min;
			}, Number.POSITIVE_INFINITY);
		};
		helpers.sign = Math.sign?
			function(x) {
				return Math.sign(x);
			} :
			function(x) {
				x = +x; // convert to a number
				if (x === 0 || isNaN(x)) {
					return x;
				}
				return x > 0 ? 1 : -1;
			};
		helpers.log10 = Math.log10?
			function(x) {
				return Math.log10(x);
			} :
			function(x) {
				return Math.log(x) / Math.LN10;
			};
		helpers.toRadians = function(degrees) {
			return degrees * (Math.PI / 180);
		};
		helpers.toDegrees = function(radians) {
			return radians * (180 / Math.PI);
		};
		// Gets the angle from vertical upright to the point about a centre.
		helpers.getAngleFromPoint = function(centrePoint, anglePoint) {
			var distanceFromXCenter = anglePoint.x - centrePoint.x,
				distanceFromYCenter = anglePoint.y - centrePoint.y,
				radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
	
			var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
	
			if (angle < (-0.5 * Math.PI)) {
				angle += 2.0 * Math.PI; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
			}
	
			return {
				angle: angle,
				distance: radialDistanceFromCenter
			};
		};
		helpers.aliasPixel = function(pixelWidth) {
			return (pixelWidth % 2 === 0) ? 0 : 0.5;
		};
		helpers.splineCurve = function(firstPoint, middlePoint, afterPoint, t) {
			// Props to Rob Spencer at scaled innovation for his post on splining between points
			// http://scaledinnovation.com/analytics/splines/aboutSplines.html
	
			// This function must also respect "skipped" points
	
			var previous = firstPoint.skip ? middlePoint : firstPoint,
				current = middlePoint,
				next = afterPoint.skip ? middlePoint : afterPoint;
	
			var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
			var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));
	
			var s01 = d01 / (d01 + d12);
			var s12 = d12 / (d01 + d12);
	
			// If all points are the same, s01 & s02 will be inf
			s01 = isNaN(s01) ? 0 : s01;
			s12 = isNaN(s12) ? 0 : s12;
	
			var fa = t * s01; // scaling factor for triangle Ta
			var fb = t * s12;
	
			return {
				previous: {
					x: current.x - fa * (next.x - previous.x),
					y: current.y - fa * (next.y - previous.y)
				},
				next: {
					x: current.x + fb * (next.x - previous.x),
					y: current.y + fb * (next.y - previous.y)
				}
			};
		};
		helpers.EPSILON = Number.EPSILON || 1e-14;
		helpers.splineCurveMonotone = function(points) {
			// This function calculates Bézier control points in a similar way than |splineCurve|,
			// but preserves monotonicity of the provided data and ensures no local extremums are added
			// between the dataset discrete points due to the interpolation.
			// See : https://en.wikipedia.org/wiki/Monotone_cubic_interpolation
	
			var pointsWithTangents = (points || []).map(function(point) {
				return {
					model: point._model,
					deltaK: 0,
					mK: 0
				};
			});
	
			// Calculate slopes (deltaK) and initialize tangents (mK)
			var pointsLen = pointsWithTangents.length;
			var i, pointBefore, pointCurrent, pointAfter;
			for (i = 0; i < pointsLen; ++i) {
				pointCurrent = pointsWithTangents[i];
				if (pointCurrent.model.skip) {
					continue;
				}
	
				pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
				pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
				if (pointAfter && !pointAfter.model.skip) {
					pointCurrent.deltaK = (pointAfter.model.y - pointCurrent.model.y) / (pointAfter.model.x - pointCurrent.model.x);
				}
	
				if (!pointBefore || pointBefore.model.skip) {
					pointCurrent.mK = pointCurrent.deltaK;
				} else if (!pointAfter || pointAfter.model.skip) {
					pointCurrent.mK = pointBefore.deltaK;
				} else if (this.sign(pointBefore.deltaK) !== this.sign(pointCurrent.deltaK)) {
					pointCurrent.mK = 0;
				} else {
					pointCurrent.mK = (pointBefore.deltaK + pointCurrent.deltaK) / 2;
				}
			}
	
			// Adjust tangents to ensure monotonic properties
			var alphaK, betaK, tauK, squaredMagnitude;
			for (i = 0; i < pointsLen - 1; ++i) {
				pointCurrent = pointsWithTangents[i];
				pointAfter = pointsWithTangents[i + 1];
				if (pointCurrent.model.skip || pointAfter.model.skip) {
					continue;
				}
	
				if (helpers.almostEquals(pointCurrent.deltaK, 0, this.EPSILON)) {
					pointCurrent.mK = pointAfter.mK = 0;
					continue;
				}
	
				alphaK = pointCurrent.mK / pointCurrent.deltaK;
				betaK = pointAfter.mK / pointCurrent.deltaK;
				squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
				if (squaredMagnitude <= 9) {
					continue;
				}
	
				tauK = 3 / Math.sqrt(squaredMagnitude);
				pointCurrent.mK = alphaK * tauK * pointCurrent.deltaK;
				pointAfter.mK = betaK * tauK * pointCurrent.deltaK;
			}
	
			// Compute control points
			var deltaX;
			for (i = 0; i < pointsLen; ++i) {
				pointCurrent = pointsWithTangents[i];
				if (pointCurrent.model.skip) {
					continue;
				}
	
				pointBefore = i > 0 ? pointsWithTangents[i - 1] : null;
				pointAfter = i < pointsLen - 1 ? pointsWithTangents[i + 1] : null;
				if (pointBefore && !pointBefore.model.skip) {
					deltaX = (pointCurrent.model.x - pointBefore.model.x) / 3;
					pointCurrent.model.controlPointPreviousX = pointCurrent.model.x - deltaX;
					pointCurrent.model.controlPointPreviousY = pointCurrent.model.y - deltaX * pointCurrent.mK;
				}
				if (pointAfter && !pointAfter.model.skip) {
					deltaX = (pointAfter.model.x - pointCurrent.model.x) / 3;
					pointCurrent.model.controlPointNextX = pointCurrent.model.x + deltaX;
					pointCurrent.model.controlPointNextY = pointCurrent.model.y + deltaX * pointCurrent.mK;
				}
			}
		};
		helpers.nextItem = function(collection, index, loop) {
			if (loop) {
				return index >= collection.length - 1 ? collection[0] : collection[index + 1];
			}
			return index >= collection.length - 1 ? collection[collection.length - 1] : collection[index + 1];
		};
		helpers.previousItem = function(collection, index, loop) {
			if (loop) {
				return index <= 0 ? collection[collection.length - 1] : collection[index - 1];
			}
			return index <= 0 ? collection[0] : collection[index - 1];
		};
		// Implementation of the nice number algorithm used in determining where axis labels will go
		helpers.niceNum = function(range, round) {
			var exponent = Math.floor(helpers.log10(range));
			var fraction = range / Math.pow(10, exponent);
			var niceFraction;
	
			if (round) {
				if (fraction < 1.5) {
					niceFraction = 1;
				} else if (fraction < 3) {
					niceFraction = 2;
				} else if (fraction < 7) {
					niceFraction = 5;
				} else {
					niceFraction = 10;
				}
			} else if (fraction <= 1.0) {
				niceFraction = 1;
			} else if (fraction <= 2) {
				niceFraction = 2;
			} else if (fraction <= 5) {
				niceFraction = 5;
			} else {
				niceFraction = 10;
			}
	
			return niceFraction * Math.pow(10, exponent);
		};
		// Easing functions adapted from Robert Penner's easing equations
		// http://www.robertpenner.com/easing/
		var easingEffects = helpers.easingEffects = {
			linear: function(t) {
				return t;
			},
			easeInQuad: function(t) {
				return t * t;
			},
			easeOutQuad: function(t) {
				return -1 * t * (t - 2);
			},
			easeInOutQuad: function(t) {
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * t * t;
				}
				return -1 / 2 * ((--t) * (t - 2) - 1);
			},
			easeInCubic: function(t) {
				return t * t * t;
			},
			easeOutCubic: function(t) {
				return 1 * ((t = t / 1 - 1) * t * t + 1);
			},
			easeInOutCubic: function(t) {
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * t * t * t;
				}
				return 1 / 2 * ((t -= 2) * t * t + 2);
			},
			easeInQuart: function(t) {
				return t * t * t * t;
			},
			easeOutQuart: function(t) {
				return -1 * ((t = t / 1 - 1) * t * t * t - 1);
			},
			easeInOutQuart: function(t) {
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * t * t * t * t;
				}
				return -1 / 2 * ((t -= 2) * t * t * t - 2);
			},
			easeInQuint: function(t) {
				return 1 * (t /= 1) * t * t * t * t;
			},
			easeOutQuint: function(t) {
				return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
			},
			easeInOutQuint: function(t) {
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * t * t * t * t * t;
				}
				return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
			},
			easeInSine: function(t) {
				return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
			},
			easeOutSine: function(t) {
				return 1 * Math.sin(t / 1 * (Math.PI / 2));
			},
			easeInOutSine: function(t) {
				return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
			},
			easeInExpo: function(t) {
				return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
			},
			easeOutExpo: function(t) {
				return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
			},
			easeInOutExpo: function(t) {
				if (t === 0) {
					return 0;
				}
				if (t === 1) {
					return 1;
				}
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * Math.pow(2, 10 * (t - 1));
				}
				return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
			},
			easeInCirc: function(t) {
				if (t >= 1) {
					return t;
				}
				return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
			},
			easeOutCirc: function(t) {
				return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
			},
			easeInOutCirc: function(t) {
				if ((t /= 1 / 2) < 1) {
					return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
				}
				return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
			},
			easeInElastic: function(t) {
				var s = 1.70158;
				var p = 0;
				var a = 1;
				if (t === 0) {
					return 0;
				}
				if ((t /= 1) === 1) {
					return 1;
				}
				if (!p) {
					p = 1 * 0.3;
				}
				if (a < Math.abs(1)) {
					a = 1;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(1 / a);
				}
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
			},
			easeOutElastic: function(t) {
				var s = 1.70158;
				var p = 0;
				var a = 1;
				if (t === 0) {
					return 0;
				}
				if ((t /= 1) === 1) {
					return 1;
				}
				if (!p) {
					p = 1 * 0.3;
				}
				if (a < Math.abs(1)) {
					a = 1;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(1 / a);
				}
				return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
			},
			easeInOutElastic: function(t) {
				var s = 1.70158;
				var p = 0;
				var a = 1;
				if (t === 0) {
					return 0;
				}
				if ((t /= 1 / 2) === 2) {
					return 1;
				}
				if (!p) {
					p = 1 * (0.3 * 1.5);
				}
				if (a < Math.abs(1)) {
					a = 1;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(1 / a);
				}
				if (t < 1) {
					return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
				}
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
			},
			easeInBack: function(t) {
				var s = 1.70158;
				return 1 * (t /= 1) * t * ((s + 1) * t - s);
			},
			easeOutBack: function(t) {
				var s = 1.70158;
				return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
			},
			easeInOutBack: function(t) {
				var s = 1.70158;
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
				}
				return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
			},
			easeInBounce: function(t) {
				return 1 - easingEffects.easeOutBounce(1 - t);
			},
			easeOutBounce: function(t) {
				if ((t /= 1) < (1 / 2.75)) {
					return 1 * (7.5625 * t * t);
				} else if (t < (2 / 2.75)) {
					return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
				} else if (t < (2.5 / 2.75)) {
					return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
				}
				return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
			},
			easeInOutBounce: function(t) {
				if (t < 1 / 2) {
					return easingEffects.easeInBounce(t * 2) * 0.5;
				}
				return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
			}
		};
		// Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
		helpers.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(callback) {
					return window.setTimeout(callback, 1000 / 60);
				};
		}());
		helpers.cancelAnimFrame = (function() {
			return window.cancelAnimationFrame ||
				window.webkitCancelAnimationFrame ||
				window.mozCancelAnimationFrame ||
				window.oCancelAnimationFrame ||
				window.msCancelAnimationFrame ||
				function(callback) {
					return window.clearTimeout(callback, 1000 / 60);
				};
		}());
		// -- DOM methods
		helpers.getRelativePosition = function(evt, chart) {
			var mouseX, mouseY;
			var e = evt.originalEvent || evt,
				canvas = evt.currentTarget || evt.srcElement,
				boundingRect = canvas.getBoundingClientRect();
	
			var touches = e.touches;
			if (touches && touches.length > 0) {
				mouseX = touches[0].clientX;
				mouseY = touches[0].clientY;
	
			} else {
				mouseX = e.clientX;
				mouseY = e.clientY;
			}
	
			// Scale mouse coordinates into canvas coordinates
			// by following the pattern laid out by 'jerryj' in the comments of
			// http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
			var paddingLeft = parseFloat(helpers.getStyle(canvas, 'padding-left'));
			var paddingTop = parseFloat(helpers.getStyle(canvas, 'padding-top'));
			var paddingRight = parseFloat(helpers.getStyle(canvas, 'padding-right'));
			var paddingBottom = parseFloat(helpers.getStyle(canvas, 'padding-bottom'));
			var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
			var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;
	
			// We divide by the current device pixel ratio, because the canvas is scaled up by that amount in each direction. However
			// the backend model is in unscaled coordinates. Since we are going to deal with our model coordinates, we go back here
			mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / (width) * canvas.width / chart.currentDevicePixelRatio);
			mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / (height) * canvas.height / chart.currentDevicePixelRatio);
	
			return {
				x: mouseX,
				y: mouseY
			};
	
		};
		helpers.addEvent = function(node, eventType, method) {
			if (node.addEventListener) {
				node.addEventListener(eventType, method);
			} else if (node.attachEvent) {
				node.attachEvent('on' + eventType, method);
			} else {
				node['on' + eventType] = method;
			}
		};
		helpers.removeEvent = function(node, eventType, handler) {
			if (node.removeEventListener) {
				node.removeEventListener(eventType, handler, false);
			} else if (node.detachEvent) {
				node.detachEvent('on' + eventType, handler);
			} else {
				node['on' + eventType] = helpers.noop;
			}
		};
		helpers.bindEvents = function(chartInstance, arrayOfEvents, handler) {
			// Create the events object if it's not already present
			var events = chartInstance.events = chartInstance.events || {};
	
			helpers.each(arrayOfEvents, function(eventName) {
				events[eventName] = function() {
					handler.apply(chartInstance, arguments);
				};
				helpers.addEvent(chartInstance.chart.canvas, eventName, events[eventName]);
			});
		};
		helpers.unbindEvents = function(chartInstance, arrayOfEvents) {
			var canvas = chartInstance.chart.canvas;
			helpers.each(arrayOfEvents, function(handler, eventName) {
				helpers.removeEvent(canvas, eventName, handler);
			});
		};
	
		// Private helper function to convert max-width/max-height values that may be percentages into a number
		function parseMaxStyle(styleValue, node, parentProperty) {
			var valueInPixels;
			if (typeof(styleValue) === 'string') {
				valueInPixels = parseInt(styleValue, 10);
	
				if (styleValue.indexOf('%') !== -1) {
					// percentage * size in dimension
					valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
				}
			} else {
				valueInPixels = styleValue;
			}
	
			return valueInPixels;
		}
	
		/**
		 * Returns if the given value contains an effective constraint.
		 * @private
		 */
		function isConstrainedValue(value) {
			return value !== undefined && value !== null && value !== 'none';
		}
	
		// Private helper to get a constraint dimension
		// @param domNode : the node to check the constraint on
		// @param maxStyle : the style that defines the maximum for the direction we are using (maxWidth / maxHeight)
		// @param percentageProperty : property of parent to use when calculating width as a percentage
		// @see http://www.nathanaeljones.com/blog/2013/reading-max-width-cross-browser
		function getConstraintDimension(domNode, maxStyle, percentageProperty) {
			var view = document.defaultView;
			var parentNode = domNode.parentNode;
			var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
			var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
			var hasCNode = isConstrainedValue(constrainedNode);
			var hasCContainer = isConstrainedValue(constrainedContainer);
			var infinity = Number.POSITIVE_INFINITY;
	
			if (hasCNode || hasCContainer) {
				return Math.min(
					hasCNode? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity,
					hasCContainer? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity);
			}
	
			return 'none';
		}
		// returns Number or undefined if no constraint
		helpers.getConstraintWidth = function(domNode) {
			return getConstraintDimension(domNode, 'max-width', 'clientWidth');
		};
		// returns Number or undefined if no constraint
		helpers.getConstraintHeight = function(domNode) {
			return getConstraintDimension(domNode, 'max-height', 'clientHeight');
		};
		helpers.getMaximumWidth = function(domNode) {
			var container = domNode.parentNode;
			var paddingLeft = parseInt(helpers.getStyle(container, 'padding-left'), 10);
			var paddingRight = parseInt(helpers.getStyle(container, 'padding-right'), 10);
			var w = container.clientWidth - paddingLeft - paddingRight;
			var cw = helpers.getConstraintWidth(domNode);
			return isNaN(cw)? w : Math.min(w, cw);
		};
		helpers.getMaximumHeight = function(domNode) {
			var container = domNode.parentNode;
			var paddingTop = parseInt(helpers.getStyle(container, 'padding-top'), 10);
			var paddingBottom = parseInt(helpers.getStyle(container, 'padding-bottom'), 10);
			var h = container.clientHeight - paddingTop - paddingBottom;
			var ch = helpers.getConstraintHeight(domNode);
			return isNaN(ch)? h : Math.min(h, ch);
		};
		helpers.getStyle = function(el, property) {
			return el.currentStyle ?
				el.currentStyle[property] :
				document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
		};
		helpers.retinaScale = function(chart) {
			var ctx = chart.ctx;
			var canvas = chart.canvas;
			var width = canvas.width;
			var height = canvas.height;
			var pixelRatio = chart.currentDevicePixelRatio = window.devicePixelRatio || 1;
	
			if (pixelRatio !== 1) {
				canvas.height = height * pixelRatio;
				canvas.width = width * pixelRatio;
				ctx.scale(pixelRatio, pixelRatio);
	
				// Store the device pixel ratio so that we can go backwards in `destroy`.
				// The devicePixelRatio changes with zoom, so there are no guarantees that it is the same
				// when destroy is called
				chart.originalDevicePixelRatio = chart.originalDevicePixelRatio || pixelRatio;
			}
	
			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';
		};
		// -- Canvas methods
		helpers.clear = function(chart) {
			chart.ctx.clearRect(0, 0, chart.width, chart.height);
		};
		helpers.fontString = function(pixelSize, fontStyle, fontFamily) {
			return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
		};
		helpers.longestText = function(ctx, font, arrayOfThings, cache) {
			cache = cache || {};
			var data = cache.data = cache.data || {};
			var gc = cache.garbageCollect = cache.garbageCollect || [];
	
			if (cache.font !== font) {
				data = cache.data = {};
				gc = cache.garbageCollect = [];
				cache.font = font;
			}
	
			ctx.font = font;
			var longest = 0;
			helpers.each(arrayOfThings, function(thing) {
				// Undefined strings and arrays should not be measured
				if (thing !== undefined && thing !== null && helpers.isArray(thing) !== true) {
					longest = helpers.measureText(ctx, data, gc, longest, thing);
				} else if (helpers.isArray(thing)) {
					// if it is an array lets measure each element
					// to do maybe simplify this function a bit so we can do this more recursively?
					helpers.each(thing, function(nestedThing) {
						// Undefined strings and arrays should not be measured
						if (nestedThing !== undefined && nestedThing !== null && !helpers.isArray(nestedThing)) {
							longest = helpers.measureText(ctx, data, gc, longest, nestedThing);
						}
					});
				}
			});
	
			var gcLen = gc.length / 2;
			if (gcLen > arrayOfThings.length) {
				for (var i = 0; i < gcLen; i++) {
					delete data[gc[i]];
				}
				gc.splice(0, gcLen);
			}
			return longest;
		};
		helpers.measureText = function(ctx, data, gc, longest, string) {
			var textWidth = data[string];
			if (!textWidth) {
				textWidth = data[string] = ctx.measureText(string).width;
				gc.push(string);
			}
			if (textWidth > longest) {
				longest = textWidth;
			}
			return longest;
		};
		helpers.numberOfLabelLines = function(arrayOfThings) {
			var numberOfLines = 1;
			helpers.each(arrayOfThings, function(thing) {
				if (helpers.isArray(thing)) {
					if (thing.length > numberOfLines) {
						numberOfLines = thing.length;
					}
				}
			});
			return numberOfLines;
		};
		helpers.drawRoundedRectangle = function(ctx, x, y, width, height, radius) {
			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			ctx.lineTo(x + width - radius, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			ctx.lineTo(x + width, y + height - radius);
			ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			ctx.lineTo(x + radius, y + height);
			ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
			ctx.lineTo(x, y + radius);
			ctx.quadraticCurveTo(x, y, x + radius, y);
			ctx.closePath();
		};
		helpers.color = function(c) {
			if (!color) {
				console.error('Color.js not found!');
				return c;
			}
	
			/* global CanvasGradient */
			if (c instanceof CanvasGradient) {
				return color(Chart.defaults.global.defaultColor);
			}
	
			return color(c);
		};
		helpers.addResizeListener = function(node, callback) {
			// Hide an iframe before the node
			var hiddenIframe = document.createElement('iframe');
			var hiddenIframeClass = 'chartjs-hidden-iframe';
	
			if (hiddenIframe.classlist) {
				// can use classlist
				hiddenIframe.classlist.add(hiddenIframeClass);
			} else {
				hiddenIframe.setAttribute('class', hiddenIframeClass);
			}
	
			// Set the style
			hiddenIframe.tabIndex = -1;
			var style = hiddenIframe.style;
			style.width = '100%';
			style.display = 'block';
			style.border = 0;
			style.height = 0;
			style.margin = 0;
			style.position = 'absolute';
			style.left = 0;
			style.right = 0;
			style.top = 0;
			style.bottom = 0;
	
			// Insert the iframe so that contentWindow is available
			node.insertBefore(hiddenIframe, node.firstChild);
	
			(hiddenIframe.contentWindow || hiddenIframe).onresize = function() {
				if (callback) {
					return callback();
				}
			};
		};
		helpers.removeResizeListener = function(node) {
			var hiddenIframe = node.querySelector('.chartjs-hidden-iframe');
	
			// Remove the resize detect iframe
			if (hiddenIframe) {
				hiddenIframe.parentNode.removeChild(hiddenIframe);
			}
		};
		helpers.isArray = Array.isArray?
			function(obj) {
				return Array.isArray(obj);
			} :
			function(obj) {
				return Object.prototype.toString.call(obj) === '[object Array]';
			};
		// ! @see http://stackoverflow.com/a/14853974
		helpers.arrayEquals = function(a0, a1) {
			var i, ilen, v0, v1;
	
			if (!a0 || !a1 || a0.length !== a1.length) {
				return false;
			}
	
			for (i = 0, ilen=a0.length; i < ilen; ++i) {
				v0 = a0[i];
				v1 = a1[i];
	
				if (v0 instanceof Array && v1 instanceof Array) {
					if (!helpers.arrayEquals(v0, v1)) {
						return false;
					}
				} else if (v0 !== v1) {
					// NOTE: two different object instances will never be equal: {x:20} != {x:20}
					return false;
				}
			}
	
			return true;
		};
		helpers.callCallback = function(fn, args, _tArg) {
			if (fn && typeof fn.call === 'function') {
				fn.apply(_tArg, args);
			}
		};
		helpers.getHoverColor = function(colorValue) {
			/* global CanvasPattern */
			return (colorValue instanceof CanvasPattern) ?
				colorValue :
				helpers.color(colorValue).saturate(0.5).darken(0.1).rgbString();
		};
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* MIT license */
	var convert = __webpack_require__(6);
	var string = __webpack_require__(8);
	
	var Color = function (obj) {
		if (obj instanceof Color) {
			return obj;
		}
		if (!(this instanceof Color)) {
			return new Color(obj);
		}
	
		this.values = {
			rgb: [0, 0, 0],
			hsl: [0, 0, 0],
			hsv: [0, 0, 0],
			hwb: [0, 0, 0],
			cmyk: [0, 0, 0, 0],
			alpha: 1
		};
	
		// parse Color() argument
		var vals;
		if (typeof obj === 'string') {
			vals = string.getRgba(obj);
			if (vals) {
				this.setValues('rgb', vals);
			} else if (vals = string.getHsla(obj)) {
				this.setValues('hsl', vals);
			} else if (vals = string.getHwb(obj)) {
				this.setValues('hwb', vals);
			} else {
				throw new Error('Unable to parse color from string "' + obj + '"');
			}
		} else if (typeof obj === 'object') {
			vals = obj;
			if (vals.r !== undefined || vals.red !== undefined) {
				this.setValues('rgb', vals);
			} else if (vals.l !== undefined || vals.lightness !== undefined) {
				this.setValues('hsl', vals);
			} else if (vals.v !== undefined || vals.value !== undefined) {
				this.setValues('hsv', vals);
			} else if (vals.w !== undefined || vals.whiteness !== undefined) {
				this.setValues('hwb', vals);
			} else if (vals.c !== undefined || vals.cyan !== undefined) {
				this.setValues('cmyk', vals);
			} else {
				throw new Error('Unable to parse color from object ' + JSON.stringify(obj));
			}
		}
	};
	
	Color.prototype = {
		rgb: function () {
			return this.setSpace('rgb', arguments);
		},
		hsl: function () {
			return this.setSpace('hsl', arguments);
		},
		hsv: function () {
			return this.setSpace('hsv', arguments);
		},
		hwb: function () {
			return this.setSpace('hwb', arguments);
		},
		cmyk: function () {
			return this.setSpace('cmyk', arguments);
		},
	
		rgbArray: function () {
			return this.values.rgb;
		},
		hslArray: function () {
			return this.values.hsl;
		},
		hsvArray: function () {
			return this.values.hsv;
		},
		hwbArray: function () {
			var values = this.values;
			if (values.alpha !== 1) {
				return values.hwb.concat([values.alpha]);
			}
			return values.hwb;
		},
		cmykArray: function () {
			return this.values.cmyk;
		},
		rgbaArray: function () {
			var values = this.values;
			return values.rgb.concat([values.alpha]);
		},
		hslaArray: function () {
			var values = this.values;
			return values.hsl.concat([values.alpha]);
		},
		alpha: function (val) {
			if (val === undefined) {
				return this.values.alpha;
			}
			this.setValues('alpha', val);
			return this;
		},
	
		red: function (val) {
			return this.setChannel('rgb', 0, val);
		},
		green: function (val) {
			return this.setChannel('rgb', 1, val);
		},
		blue: function (val) {
			return this.setChannel('rgb', 2, val);
		},
		hue: function (val) {
			if (val) {
				val %= 360;
				val = val < 0 ? 360 + val : val;
			}
			return this.setChannel('hsl', 0, val);
		},
		saturation: function (val) {
			return this.setChannel('hsl', 1, val);
		},
		lightness: function (val) {
			return this.setChannel('hsl', 2, val);
		},
		saturationv: function (val) {
			return this.setChannel('hsv', 1, val);
		},
		whiteness: function (val) {
			return this.setChannel('hwb', 1, val);
		},
		blackness: function (val) {
			return this.setChannel('hwb', 2, val);
		},
		value: function (val) {
			return this.setChannel('hsv', 2, val);
		},
		cyan: function (val) {
			return this.setChannel('cmyk', 0, val);
		},
		magenta: function (val) {
			return this.setChannel('cmyk', 1, val);
		},
		yellow: function (val) {
			return this.setChannel('cmyk', 2, val);
		},
		black: function (val) {
			return this.setChannel('cmyk', 3, val);
		},
	
		hexString: function () {
			return string.hexString(this.values.rgb);
		},
		rgbString: function () {
			return string.rgbString(this.values.rgb, this.values.alpha);
		},
		rgbaString: function () {
			return string.rgbaString(this.values.rgb, this.values.alpha);
		},
		percentString: function () {
			return string.percentString(this.values.rgb, this.values.alpha);
		},
		hslString: function () {
			return string.hslString(this.values.hsl, this.values.alpha);
		},
		hslaString: function () {
			return string.hslaString(this.values.hsl, this.values.alpha);
		},
		hwbString: function () {
			return string.hwbString(this.values.hwb, this.values.alpha);
		},
		keyword: function () {
			return string.keyword(this.values.rgb, this.values.alpha);
		},
	
		rgbNumber: function () {
			var rgb = this.values.rgb;
			return (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
		},
	
		luminosity: function () {
			// http://www.w3.org/TR/WCAG20/#relativeluminancedef
			var rgb = this.values.rgb;
			var lum = [];
			for (var i = 0; i < rgb.length; i++) {
				var chan = rgb[i] / 255;
				lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
			}
			return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
		},
	
		contrast: function (color2) {
			// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
			var lum1 = this.luminosity();
			var lum2 = color2.luminosity();
			if (lum1 > lum2) {
				return (lum1 + 0.05) / (lum2 + 0.05);
			}
			return (lum2 + 0.05) / (lum1 + 0.05);
		},
	
		level: function (color2) {
			var contrastRatio = this.contrast(color2);
			if (contrastRatio >= 7.1) {
				return 'AAA';
			}
	
			return (contrastRatio >= 4.5) ? 'AA' : '';
		},
	
		dark: function () {
			// YIQ equation from http://24ways.org/2010/calculating-color-contrast
			var rgb = this.values.rgb;
			var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
			return yiq < 128;
		},
	
		light: function () {
			return !this.dark();
		},
	
		negate: function () {
			var rgb = [];
			for (var i = 0; i < 3; i++) {
				rgb[i] = 255 - this.values.rgb[i];
			}
			this.setValues('rgb', rgb);
			return this;
		},
	
		lighten: function (ratio) {
			var hsl = this.values.hsl;
			hsl[2] += hsl[2] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},
	
		darken: function (ratio) {
			var hsl = this.values.hsl;
			hsl[2] -= hsl[2] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},
	
		saturate: function (ratio) {
			var hsl = this.values.hsl;
			hsl[1] += hsl[1] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},
	
		desaturate: function (ratio) {
			var hsl = this.values.hsl;
			hsl[1] -= hsl[1] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},
	
		whiten: function (ratio) {
			var hwb = this.values.hwb;
			hwb[1] += hwb[1] * ratio;
			this.setValues('hwb', hwb);
			return this;
		},
	
		blacken: function (ratio) {
			var hwb = this.values.hwb;
			hwb[2] += hwb[2] * ratio;
			this.setValues('hwb', hwb);
			return this;
		},
	
		greyscale: function () {
			var rgb = this.values.rgb;
			// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
			var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
			this.setValues('rgb', [val, val, val]);
			return this;
		},
	
		clearer: function (ratio) {
			var alpha = this.values.alpha;
			this.setValues('alpha', alpha - (alpha * ratio));
			return this;
		},
	
		opaquer: function (ratio) {
			var alpha = this.values.alpha;
			this.setValues('alpha', alpha + (alpha * ratio));
			return this;
		},
	
		rotate: function (degrees) {
			var hsl = this.values.hsl;
			var hue = (hsl[0] + degrees) % 360;
			hsl[0] = hue < 0 ? 360 + hue : hue;
			this.setValues('hsl', hsl);
			return this;
		},
	
		/**
		 * Ported from sass implementation in C
		 * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		 */
		mix: function (mixinColor, weight) {
			var color1 = this;
			var color2 = mixinColor;
			var p = weight === undefined ? 0.5 : weight;
	
			var w = 2 * p - 1;
			var a = color1.alpha() - color2.alpha();
	
			var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
			var w2 = 1 - w1;
	
			return this
				.rgb(
					w1 * color1.red() + w2 * color2.red(),
					w1 * color1.green() + w2 * color2.green(),
					w1 * color1.blue() + w2 * color2.blue()
				)
				.alpha(color1.alpha() * p + color2.alpha() * (1 - p));
		},
	
		toJSON: function () {
			return this.rgb();
		},
	
		clone: function () {
			// NOTE(SB): using node-clone creates a dependency to Buffer when using browserify,
			// making the final build way to big to embed in Chart.js. So let's do it manually,
			// assuming that values to clone are 1 dimension arrays containing only numbers,
			// except 'alpha' which is a number.
			var result = new Color();
			var source = this.values;
			var target = result.values;
			var value, type;
	
			for (var prop in source) {
				if (source.hasOwnProperty(prop)) {
					value = source[prop];
					type = ({}).toString.call(value);
					if (type === '[object Array]') {
						target[prop] = value.slice(0);
					} else if (type === '[object Number]') {
						target[prop] = value;
					} else {
						console.error('unexpected color value:', value);
					}
				}
			}
	
			return result;
		}
	};
	
	Color.prototype.spaces = {
		rgb: ['red', 'green', 'blue'],
		hsl: ['hue', 'saturation', 'lightness'],
		hsv: ['hue', 'saturation', 'value'],
		hwb: ['hue', 'whiteness', 'blackness'],
		cmyk: ['cyan', 'magenta', 'yellow', 'black']
	};
	
	Color.prototype.maxes = {
		rgb: [255, 255, 255],
		hsl: [360, 100, 100],
		hsv: [360, 100, 100],
		hwb: [360, 100, 100],
		cmyk: [100, 100, 100, 100]
	};
	
	Color.prototype.getValues = function (space) {
		var values = this.values;
		var vals = {};
	
		for (var i = 0; i < space.length; i++) {
			vals[space.charAt(i)] = values[space][i];
		}
	
		if (values.alpha !== 1) {
			vals.a = values.alpha;
		}
	
		// {r: 255, g: 255, b: 255, a: 0.4}
		return vals;
	};
	
	Color.prototype.setValues = function (space, vals) {
		var values = this.values;
		var spaces = this.spaces;
		var maxes = this.maxes;
		var alpha = 1;
		var i;
	
		if (space === 'alpha') {
			alpha = vals;
		} else if (vals.length) {
			// [10, 10, 10]
			values[space] = vals.slice(0, space.length);
			alpha = vals[space.length];
		} else if (vals[space.charAt(0)] !== undefined) {
			// {r: 10, g: 10, b: 10}
			for (i = 0; i < space.length; i++) {
				values[space][i] = vals[space.charAt(i)];
			}
	
			alpha = vals.a;
		} else if (vals[spaces[space][0]] !== undefined) {
			// {red: 10, green: 10, blue: 10}
			var chans = spaces[space];
	
			for (i = 0; i < space.length; i++) {
				values[space][i] = vals[chans[i]];
			}
	
			alpha = vals.alpha;
		}
	
		values.alpha = Math.max(0, Math.min(1, (alpha === undefined ? values.alpha : alpha)));
	
		if (space === 'alpha') {
			return false;
		}
	
		var capped;
	
		// cap values of the space prior converting all values
		for (i = 0; i < space.length; i++) {
			capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
			values[space][i] = Math.round(capped);
		}
	
		// convert to all the other color spaces
		for (var sname in spaces) {
			if (sname !== space) {
				values[sname] = convert[space][sname](values[space]);
			}
		}
	
		return true;
	};
	
	Color.prototype.setSpace = function (space, args) {
		var vals = args[0];
	
		if (vals === undefined) {
			// color.rgb()
			return this.getValues(space);
		}
	
		// color.rgb(10, 10, 10)
		if (typeof vals === 'number') {
			vals = Array.prototype.slice.call(args);
		}
	
		this.setValues(space, vals);
		return this;
	};
	
	Color.prototype.setChannel = function (space, index, val) {
		var svalues = this.values[space];
		if (val === undefined) {
			// color.red()
			return svalues[index];
		} else if (val === svalues[index]) {
			// color.red(color.red())
			return this;
		}
	
		// color.red(100)
		svalues[index] = val;
		this.setValues(space, svalues);
	
		return this;
	};
	
	if (typeof window !== 'undefined') {
		window.Color = Color;
	}
	
	module.exports = Color;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var conversions = __webpack_require__(7);
	var route = __webpack_require__(124);
	
	var convert = {};
	
	var models = Object.keys(conversions);
	
	function wrapRaw(fn) {
		var wrappedFn = function (args) {
			if (args === undefined || args === null) {
				return args;
			}
	
			if (arguments.length > 1) {
				args = Array.prototype.slice.call(arguments);
			}
	
			return fn(args);
		};
	
		// preserve .conversion property if there is one
		if ('conversion' in fn) {
			wrappedFn.conversion = fn.conversion;
		}
	
		return wrappedFn;
	}
	
	function wrapRounded(fn) {
		var wrappedFn = function (args) {
			if (args === undefined || args === null) {
				return args;
			}
	
			if (arguments.length > 1) {
				args = Array.prototype.slice.call(arguments);
			}
	
			var result = fn(args);
	
			// we're assuming the result is an array here.
			// see notice in conversions.js; don't use box types
			// in conversion functions.
			if (typeof result === 'object') {
				for (var len = result.length, i = 0; i < len; i++) {
					result[i] = Math.round(result[i]);
				}
			}
	
			return result;
		};
	
		// preserve .conversion property if there is one
		if ('conversion' in fn) {
			wrappedFn.conversion = fn.conversion;
		}
	
		return wrappedFn;
	}
	
	models.forEach(function (fromModel) {
		convert[fromModel] = {};
	
		Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	
		var routes = route(fromModel);
		var routeModels = Object.keys(routes);
	
		routeModels.forEach(function (toModel) {
			var fn = routes[toModel];
	
			convert[fromModel][toModel] = wrapRounded(fn);
			convert[fromModel][toModel].raw = wrapRaw(fn);
		});
	});
	
	module.exports = convert;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* MIT license */
	var cssKeywords = __webpack_require__(123);
	
	// NOTE: conversions should only return primitive values (i.e. arrays, or
	//       values that give correct `typeof` results).
	//       do not use box values types (i.e. Number(), String(), etc.)
	
	var reverseKeywords = {};
	for (var key in cssKeywords) {
		if (cssKeywords.hasOwnProperty(key)) {
			reverseKeywords[cssKeywords[key]] = key;
		}
	}
	
	var convert = module.exports = {
		rgb: {channels: 3},
		hsl: {channels: 3},
		hsv: {channels: 3},
		hwb: {channels: 3},
		cmyk: {channels: 4},
		xyz: {channels: 3},
		lab: {channels: 3},
		lch: {channels: 3},
		hex: {channels: 1},
		keyword: {channels: 1},
		ansi16: {channels: 1},
		ansi256: {channels: 1},
		hcg: {channels: 3},
		apple: {channels: 3}
	};
	
	// hide .channels property
	for (var model in convert) {
		if (convert.hasOwnProperty(model)) {
			if (!('channels' in convert[model])) {
				throw new Error('missing channels property: ' + model);
			}
	
			var channels = convert[model].channels;
			delete convert[model].channels;
			Object.defineProperty(convert[model], 'channels', {value: channels});
		}
	}
	
	convert.rgb.hsl = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var min = Math.min(r, g, b);
		var max = Math.max(r, g, b);
		var delta = max - min;
		var h;
		var s;
		var l;
	
		if (max === min) {
			h = 0;
		} else if (r === max) {
			h = (g - b) / delta;
		} else if (g === max) {
			h = 2 + (b - r) / delta;
		} else if (b === max) {
			h = 4 + (r - g) / delta;
		}
	
		h = Math.min(h * 60, 360);
	
		if (h < 0) {
			h += 360;
		}
	
		l = (min + max) / 2;
	
		if (max === min) {
			s = 0;
		} else if (l <= 0.5) {
			s = delta / (max + min);
		} else {
			s = delta / (2 - max - min);
		}
	
		return [h, s * 100, l * 100];
	};
	
	convert.rgb.hsv = function (rgb) {
		var r = rgb[0];
		var g = rgb[1];
		var b = rgb[2];
		var min = Math.min(r, g, b);
		var max = Math.max(r, g, b);
		var delta = max - min;
		var h;
		var s;
		var v;
	
		if (max === 0) {
			s = 0;
		} else {
			s = (delta / max * 1000) / 10;
		}
	
		if (max === min) {
			h = 0;
		} else if (r === max) {
			h = (g - b) / delta;
		} else if (g === max) {
			h = 2 + (b - r) / delta;
		} else if (b === max) {
			h = 4 + (r - g) / delta;
		}
	
		h = Math.min(h * 60, 360);
	
		if (h < 0) {
			h += 360;
		}
	
		v = ((max / 255) * 1000) / 10;
	
		return [h, s, v];
	};
	
	convert.rgb.hwb = function (rgb) {
		var r = rgb[0];
		var g = rgb[1];
		var b = rgb[2];
		var h = convert.rgb.hsl(rgb)[0];
		var w = 1 / 255 * Math.min(r, Math.min(g, b));
	
		b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
	
		return [h, w * 100, b * 100];
	};
	
	convert.rgb.cmyk = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var c;
		var m;
		var y;
		var k;
	
		k = Math.min(1 - r, 1 - g, 1 - b);
		c = (1 - r - k) / (1 - k) || 0;
		m = (1 - g - k) / (1 - k) || 0;
		y = (1 - b - k) / (1 - k) || 0;
	
		return [c * 100, m * 100, y * 100, k * 100];
	};
	
	/**
	 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	 * */
	function comparativeDistance(x, y) {
		return (
			Math.pow(x[0] - y[0], 2) +
			Math.pow(x[1] - y[1], 2) +
			Math.pow(x[2] - y[2], 2)
		);
	}
	
	convert.rgb.keyword = function (rgb) {
		var reversed = reverseKeywords[rgb];
		if (reversed) {
			return reversed;
		}
	
		var currentClosestDistance = Infinity;
		var currentClosestKeyword;
	
		for (var keyword in cssKeywords) {
			if (cssKeywords.hasOwnProperty(keyword)) {
				var value = cssKeywords[keyword];
	
				// Compute comparative distance
				var distance = comparativeDistance(rgb, value);
	
				// Check if its less, if so set as closest
				if (distance < currentClosestDistance) {
					currentClosestDistance = distance;
					currentClosestKeyword = keyword;
				}
			}
		}
	
		return currentClosestKeyword;
	};
	
	convert.keyword.rgb = function (keyword) {
		return cssKeywords[keyword];
	};
	
	convert.rgb.xyz = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
	
		// assume sRGB
		r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
		g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
		b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);
	
		var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
		var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
		var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);
	
		return [x * 100, y * 100, z * 100];
	};
	
	convert.rgb.lab = function (rgb) {
		var xyz = convert.rgb.xyz(rgb);
		var x = xyz[0];
		var y = xyz[1];
		var z = xyz[2];
		var l;
		var a;
		var b;
	
		x /= 95.047;
		y /= 100;
		z /= 108.883;
	
		x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
		y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
		z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
	
		l = (116 * y) - 16;
		a = 500 * (x - y);
		b = 200 * (y - z);
	
		return [l, a, b];
	};
	
	convert.hsl.rgb = function (hsl) {
		var h = hsl[0] / 360;
		var s = hsl[1] / 100;
		var l = hsl[2] / 100;
		var t1;
		var t2;
		var t3;
		var rgb;
		var val;
	
		if (s === 0) {
			val = l * 255;
			return [val, val, val];
		}
	
		if (l < 0.5) {
			t2 = l * (1 + s);
		} else {
			t2 = l + s - l * s;
		}
	
		t1 = 2 * l - t2;
	
		rgb = [0, 0, 0];
		for (var i = 0; i < 3; i++) {
			t3 = h + 1 / 3 * -(i - 1);
			if (t3 < 0) {
				t3++;
			}
			if (t3 > 1) {
				t3--;
			}
	
			if (6 * t3 < 1) {
				val = t1 + (t2 - t1) * 6 * t3;
			} else if (2 * t3 < 1) {
				val = t2;
			} else if (3 * t3 < 2) {
				val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
			} else {
				val = t1;
			}
	
			rgb[i] = val * 255;
		}
	
		return rgb;
	};
	
	convert.hsl.hsv = function (hsl) {
		var h = hsl[0];
		var s = hsl[1] / 100;
		var l = hsl[2] / 100;
		var smin = s;
		var lmin = Math.max(l, 0.01);
		var sv;
		var v;
	
		l *= 2;
		s *= (l <= 1) ? l : 2 - l;
		smin *= lmin <= 1 ? lmin : 2 - lmin;
		v = (l + s) / 2;
		sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);
	
		return [h, sv * 100, v * 100];
	};
	
	convert.hsv.rgb = function (hsv) {
		var h = hsv[0] / 60;
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;
		var hi = Math.floor(h) % 6;
	
		var f = h - Math.floor(h);
		var p = 255 * v * (1 - s);
		var q = 255 * v * (1 - (s * f));
		var t = 255 * v * (1 - (s * (1 - f)));
		v *= 255;
	
		switch (hi) {
			case 0:
				return [v, t, p];
			case 1:
				return [q, v, p];
			case 2:
				return [p, v, t];
			case 3:
				return [p, q, v];
			case 4:
				return [t, p, v];
			case 5:
				return [v, p, q];
		}
	};
	
	convert.hsv.hsl = function (hsv) {
		var h = hsv[0];
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;
		var vmin = Math.max(v, 0.01);
		var lmin;
		var sl;
		var l;
	
		l = (2 - s) * v;
		lmin = (2 - s) * vmin;
		sl = s * vmin;
		sl /= (lmin <= 1) ? lmin : 2 - lmin;
		sl = sl || 0;
		l /= 2;
	
		return [h, sl * 100, l * 100];
	};
	
	// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
	convert.hwb.rgb = function (hwb) {
		var h = hwb[0] / 360;
		var wh = hwb[1] / 100;
		var bl = hwb[2] / 100;
		var ratio = wh + bl;
		var i;
		var v;
		var f;
		var n;
	
		// wh + bl cant be > 1
		if (ratio > 1) {
			wh /= ratio;
			bl /= ratio;
		}
	
		i = Math.floor(6 * h);
		v = 1 - bl;
		f = 6 * h - i;
	
		if ((i & 0x01) !== 0) {
			f = 1 - f;
		}
	
		n = wh + f * (v - wh); // linear interpolation
	
		var r;
		var g;
		var b;
		switch (i) {
			default:
			case 6:
			case 0: r = v; g = n; b = wh; break;
			case 1: r = n; g = v; b = wh; break;
			case 2: r = wh; g = v; b = n; break;
			case 3: r = wh; g = n; b = v; break;
			case 4: r = n; g = wh; b = v; break;
			case 5: r = v; g = wh; b = n; break;
		}
	
		return [r * 255, g * 255, b * 255];
	};
	
	convert.cmyk.rgb = function (cmyk) {
		var c = cmyk[0] / 100;
		var m = cmyk[1] / 100;
		var y = cmyk[2] / 100;
		var k = cmyk[3] / 100;
		var r;
		var g;
		var b;
	
		r = 1 - Math.min(1, c * (1 - k) + k);
		g = 1 - Math.min(1, m * (1 - k) + k);
		b = 1 - Math.min(1, y * (1 - k) + k);
	
		return [r * 255, g * 255, b * 255];
	};
	
	convert.xyz.rgb = function (xyz) {
		var x = xyz[0] / 100;
		var y = xyz[1] / 100;
		var z = xyz[2] / 100;
		var r;
		var g;
		var b;
	
		r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
		g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
		b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);
	
		// assume sRGB
		r = r > 0.0031308
			? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
			: r * 12.92;
	
		g = g > 0.0031308
			? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
			: g * 12.92;
	
		b = b > 0.0031308
			? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
			: b * 12.92;
	
		r = Math.min(Math.max(0, r), 1);
		g = Math.min(Math.max(0, g), 1);
		b = Math.min(Math.max(0, b), 1);
	
		return [r * 255, g * 255, b * 255];
	};
	
	convert.xyz.lab = function (xyz) {
		var x = xyz[0];
		var y = xyz[1];
		var z = xyz[2];
		var l;
		var a;
		var b;
	
		x /= 95.047;
		y /= 100;
		z /= 108.883;
	
		x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
		y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
		z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);
	
		l = (116 * y) - 16;
		a = 500 * (x - y);
		b = 200 * (y - z);
	
		return [l, a, b];
	};
	
	convert.lab.xyz = function (lab) {
		var l = lab[0];
		var a = lab[1];
		var b = lab[2];
		var x;
		var y;
		var z;
	
		y = (l + 16) / 116;
		x = a / 500 + y;
		z = y - b / 200;
	
		var y2 = Math.pow(y, 3);
		var x2 = Math.pow(x, 3);
		var z2 = Math.pow(z, 3);
		y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
		x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
		z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
	
		x *= 95.047;
		y *= 100;
		z *= 108.883;
	
		return [x, y, z];
	};
	
	convert.lab.lch = function (lab) {
		var l = lab[0];
		var a = lab[1];
		var b = lab[2];
		var hr;
		var h;
		var c;
	
		hr = Math.atan2(b, a);
		h = hr * 360 / 2 / Math.PI;
	
		if (h < 0) {
			h += 360;
		}
	
		c = Math.sqrt(a * a + b * b);
	
		return [l, c, h];
	};
	
	convert.lch.lab = function (lch) {
		var l = lch[0];
		var c = lch[1];
		var h = lch[2];
		var a;
		var b;
		var hr;
	
		hr = h / 360 * 2 * Math.PI;
		a = c * Math.cos(hr);
		b = c * Math.sin(hr);
	
		return [l, a, b];
	};
	
	convert.rgb.ansi16 = function (args) {
		var r = args[0];
		var g = args[1];
		var b = args[2];
		var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization
	
		value = Math.round(value / 50);
	
		if (value === 0) {
			return 30;
		}
	
		var ansi = 30
			+ ((Math.round(b / 255) << 2)
			| (Math.round(g / 255) << 1)
			| Math.round(r / 255));
	
		if (value === 2) {
			ansi += 60;
		}
	
		return ansi;
	};
	
	convert.hsv.ansi16 = function (args) {
		// optimization here; we already know the value and don't need to get
		// it converted for us.
		return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
	};
	
	convert.rgb.ansi256 = function (args) {
		var r = args[0];
		var g = args[1];
		var b = args[2];
	
		// we use the extended greyscale palette here, with the exception of
		// black and white. normal palette only has 4 greyscale shades.
		if (r === g && g === b) {
			if (r < 8) {
				return 16;
			}
	
			if (r > 248) {
				return 231;
			}
	
			return Math.round(((r - 8) / 247) * 24) + 232;
		}
	
		var ansi = 16
			+ (36 * Math.round(r / 255 * 5))
			+ (6 * Math.round(g / 255 * 5))
			+ Math.round(b / 255 * 5);
	
		return ansi;
	};
	
	convert.ansi16.rgb = function (args) {
		var color = args % 10;
	
		// handle greyscale
		if (color === 0 || color === 7) {
			if (args > 50) {
				color += 3.5;
			}
	
			color = color / 10.5 * 255;
	
			return [color, color, color];
		}
	
		var mult = (~~(args > 50) + 1) * 0.5;
		var r = ((color & 1) * mult) * 255;
		var g = (((color >> 1) & 1) * mult) * 255;
		var b = (((color >> 2) & 1) * mult) * 255;
	
		return [r, g, b];
	};
	
	convert.ansi256.rgb = function (args) {
		// handle greyscale
		if (args >= 232) {
			var c = (args - 232) * 10 + 8;
			return [c, c, c];
		}
	
		args -= 16;
	
		var rem;
		var r = Math.floor(args / 36) / 5 * 255;
		var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
		var b = (rem % 6) / 5 * 255;
	
		return [r, g, b];
	};
	
	convert.rgb.hex = function (args) {
		var integer = ((Math.round(args[0]) & 0xFF) << 16)
			+ ((Math.round(args[1]) & 0xFF) << 8)
			+ (Math.round(args[2]) & 0xFF);
	
		var string = integer.toString(16).toUpperCase();
		return '000000'.substring(string.length) + string;
	};
	
	convert.hex.rgb = function (args) {
		var match = args.toString(16).match(/[a-f0-9]{6}/i);
		if (!match) {
			return [0, 0, 0];
		}
	
		var integer = parseInt(match[0], 16);
		var r = (integer >> 16) & 0xFF;
		var g = (integer >> 8) & 0xFF;
		var b = integer & 0xFF;
	
		return [r, g, b];
	};
	
	convert.rgb.hcg = function (rgb) {
		var r = rgb[0] / 255;
		var g = rgb[1] / 255;
		var b = rgb[2] / 255;
		var max = Math.max(Math.max(r, g), b);
		var min = Math.min(Math.min(r, g), b);
		var chroma = (max - min);
		var grayscale;
		var hue;
	
		if (chroma < 1) {
			grayscale = min / (1 - chroma);
		} else {
			grayscale = 0;
		}
	
		if (chroma <= 0) {
			hue = 0;
		} else
		if (max === r) {
			hue = ((g - b) / chroma) % 6;
		} else
		if (max === g) {
			hue = 2 + (b - r) / chroma;
		} else {
			hue = 4 + (r - g) / chroma + 4;
		}
	
		hue /= 6;
		hue %= 1;
	
		return [hue * 360, chroma * 100, grayscale * 100];
	};
	
	convert.hsl.hcg = function (hsl) {
		var s = hsl[1] / 100;
		var l = hsl[2] / 100;
		var c = 1;
		var f = 0;
	
		if (l < 0.5) {
			c = 2.0 * s * l;
		} else {
			c = 2.0 * s * (1.0 - l);
		}
	
		if (c < 1.0) {
			f = (l - 0.5 * c) / (1.0 - c);
		}
	
		return [hsl[0], c * 100, f * 100];
	};
	
	convert.hsv.hcg = function (hsv) {
		var s = hsv[1] / 100;
		var v = hsv[2] / 100;
	
		var c = s * v;
		var f = 0;
	
		if (c < 1.0) {
			f = (v - c) / (1 - c);
		}
	
		return [hsv[0], c * 100, f * 100];
	};
	
	convert.hcg.rgb = function (hcg) {
		var h = hcg[0] / 360;
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;
	
		if (c === 0.0) {
			return [g * 255, g * 255, g * 255];
		}
	
		var pure = [0, 0, 0];
		var hi = (h % 1) * 6;
		var v = hi % 1;
		var w = 1 - v;
		var mg = 0;
	
		switch (Math.floor(hi)) {
			case 0:
				pure[0] = 1; pure[1] = v; pure[2] = 0; break;
			case 1:
				pure[0] = w; pure[1] = 1; pure[2] = 0; break;
			case 2:
				pure[0] = 0; pure[1] = 1; pure[2] = v; break;
			case 3:
				pure[0] = 0; pure[1] = w; pure[2] = 1; break;
			case 4:
				pure[0] = v; pure[1] = 0; pure[2] = 1; break;
			default:
				pure[0] = 1; pure[1] = 0; pure[2] = w;
		}
	
		mg = (1.0 - c) * g;
	
		return [
			(c * pure[0] + mg) * 255,
			(c * pure[1] + mg) * 255,
			(c * pure[2] + mg) * 255
		];
	};
	
	convert.hcg.hsv = function (hcg) {
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;
	
		var v = c + g * (1.0 - c);
		var f = 0;
	
		if (v > 0.0) {
			f = c / v;
		}
	
		return [hcg[0], f * 100, v * 100];
	};
	
	convert.hcg.hsl = function (hcg) {
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;
	
		var l = g * (1.0 - c) + 0.5 * c;
		var s = 0;
	
		if (l > 0.0 && l < 0.5) {
			s = c / (2 * l);
		} else
		if (l >= 0.5 && l < 1.0) {
			s = c / (2 * (1 - l));
		}
	
		return [hcg[0], s * 100, l * 100];
	};
	
	convert.hcg.hwb = function (hcg) {
		var c = hcg[1] / 100;
		var g = hcg[2] / 100;
		var v = c + g * (1.0 - c);
		return [hcg[0], (v - c) * 100, (1 - v) * 100];
	};
	
	convert.hwb.hcg = function (hwb) {
		var w = hwb[1] / 100;
		var b = hwb[2] / 100;
		var v = 1 - b;
		var c = v - w;
		var g = 0;
	
		if (c < 1) {
			g = (v - c) / (1 - c);
		}
	
		return [hwb[0], c * 100, g * 100];
	};
	
	convert.apple.rgb = function (apple) {
		return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
	};
	
	convert.rgb.apple = function (rgb) {
		return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* MIT license */
	var colorNames = __webpack_require__(9);
	
	module.exports = {
	   getRgba: getRgba,
	   getHsla: getHsla,
	   getRgb: getRgb,
	   getHsl: getHsl,
	   getHwb: getHwb,
	   getAlpha: getAlpha,
	
	   hexString: hexString,
	   rgbString: rgbString,
	   rgbaString: rgbaString,
	   percentString: percentString,
	   percentaString: percentaString,
	   hslString: hslString,
	   hslaString: hslaString,
	   hwbString: hwbString,
	   keyword: keyword
	}
	
	function getRgba(string) {
	   if (!string) {
	      return;
	   }
	   var abbr =  /^#([a-fA-F0-9]{3})$/,
	       hex =  /^#([a-fA-F0-9]{6})$/,
	       rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
	       per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
	       keyword = /(\w+)/;
	
	   var rgb = [0, 0, 0],
	       a = 1,
	       match = string.match(abbr);
	   if (match) {
	      match = match[1];
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = parseInt(match[i] + match[i], 16);
	      }
	   }
	   else if (match = string.match(hex)) {
	      match = match[1];
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
	      }
	   }
	   else if (match = string.match(rgba)) {
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = parseInt(match[i + 1]);
	      }
	      a = parseFloat(match[4]);
	   }
	   else if (match = string.match(per)) {
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
	      }
	      a = parseFloat(match[4]);
	   }
	   else if (match = string.match(keyword)) {
	      if (match[1] == "transparent") {
	         return [0, 0, 0, 0];
	      }
	      rgb = colorNames[match[1]];
	      if (!rgb) {
	         return;
	      }
	   }
	
	   for (var i = 0; i < rgb.length; i++) {
	      rgb[i] = scale(rgb[i], 0, 255);
	   }
	   if (!a && a != 0) {
	      a = 1;
	   }
	   else {
	      a = scale(a, 0, 1);
	   }
	   rgb[3] = a;
	   return rgb;
	}
	
	function getHsla(string) {
	   if (!string) {
	      return;
	   }
	   var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
	   var match = string.match(hsl);
	   if (match) {
	      var alpha = parseFloat(match[4]);
	      var h = scale(parseInt(match[1]), 0, 360),
	          s = scale(parseFloat(match[2]), 0, 100),
	          l = scale(parseFloat(match[3]), 0, 100),
	          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
	      return [h, s, l, a];
	   }
	}
	
	function getHwb(string) {
	   if (!string) {
	      return;
	   }
	   var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
	   var match = string.match(hwb);
	   if (match) {
	    var alpha = parseFloat(match[4]);
	      var h = scale(parseInt(match[1]), 0, 360),
	          w = scale(parseFloat(match[2]), 0, 100),
	          b = scale(parseFloat(match[3]), 0, 100),
	          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
	      return [h, w, b, a];
	   }
	}
	
	function getRgb(string) {
	   var rgba = getRgba(string);
	   return rgba && rgba.slice(0, 3);
	}
	
	function getHsl(string) {
	  var hsla = getHsla(string);
	  return hsla && hsla.slice(0, 3);
	}
	
	function getAlpha(string) {
	   var vals = getRgba(string);
	   if (vals) {
	      return vals[3];
	   }
	   else if (vals = getHsla(string)) {
	      return vals[3];
	   }
	   else if (vals = getHwb(string)) {
	      return vals[3];
	   }
	}
	
	// generators
	function hexString(rgb) {
	   return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1])
	              + hexDouble(rgb[2]);
	}
	
	function rgbString(rgba, alpha) {
	   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
	      return rgbaString(rgba, alpha);
	   }
	   return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
	}
	
	function rgbaString(rgba, alpha) {
	   if (alpha === undefined) {
	      alpha = (rgba[3] !== undefined ? rgba[3] : 1);
	   }
	   return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2]
	           + ", " + alpha + ")";
	}
	
	function percentString(rgba, alpha) {
	   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
	      return percentaString(rgba, alpha);
	   }
	   var r = Math.round(rgba[0]/255 * 100),
	       g = Math.round(rgba[1]/255 * 100),
	       b = Math.round(rgba[2]/255 * 100);
	
	   return "rgb(" + r + "%, " + g + "%, " + b + "%)";
	}
	
	function percentaString(rgba, alpha) {
	   var r = Math.round(rgba[0]/255 * 100),
	       g = Math.round(rgba[1]/255 * 100),
	       b = Math.round(rgba[2]/255 * 100);
	   return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
	}
	
	function hslString(hsla, alpha) {
	   if (alpha < 1 || (hsla[3] && hsla[3] < 1)) {
	      return hslaString(hsla, alpha);
	   }
	   return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
	}
	
	function hslaString(hsla, alpha) {
	   if (alpha === undefined) {
	      alpha = (hsla[3] !== undefined ? hsla[3] : 1);
	   }
	   return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, "
	           + alpha + ")";
	}
	
	// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
	// (hwb have alpha optional & 1 is default value)
	function hwbString(hwb, alpha) {
	   if (alpha === undefined) {
	      alpha = (hwb[3] !== undefined ? hwb[3] : 1);
	   }
	   return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%"
	           + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
	}
	
	function keyword(rgb) {
	  return reverseNames[rgb.slice(0, 3)];
	}
	
	// helpers
	function scale(num, min, max) {
	   return Math.min(Math.max(min, num), max);
	}
	
	function hexDouble(num) {
	  var str = num.toString(16).toUpperCase();
	  return (str.length < 2) ? "0" + str : str;
	}
	
	
	//create a list of reverse color names
	var reverseNames = {};
	for (var name in colorNames) {
	   reverseNames[colorNames[name]] = name;
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {
		"aliceblue": [240, 248, 255],
		"antiquewhite": [250, 235, 215],
		"aqua": [0, 255, 255],
		"aquamarine": [127, 255, 212],
		"azure": [240, 255, 255],
		"beige": [245, 245, 220],
		"bisque": [255, 228, 196],
		"black": [0, 0, 0],
		"blanchedalmond": [255, 235, 205],
		"blue": [0, 0, 255],
		"blueviolet": [138, 43, 226],
		"brown": [165, 42, 42],
		"burlywood": [222, 184, 135],
		"cadetblue": [95, 158, 160],
		"chartreuse": [127, 255, 0],
		"chocolate": [210, 105, 30],
		"coral": [255, 127, 80],
		"cornflowerblue": [100, 149, 237],
		"cornsilk": [255, 248, 220],
		"crimson": [220, 20, 60],
		"cyan": [0, 255, 255],
		"darkblue": [0, 0, 139],
		"darkcyan": [0, 139, 139],
		"darkgoldenrod": [184, 134, 11],
		"darkgray": [169, 169, 169],
		"darkgreen": [0, 100, 0],
		"darkgrey": [169, 169, 169],
		"darkkhaki": [189, 183, 107],
		"darkmagenta": [139, 0, 139],
		"darkolivegreen": [85, 107, 47],
		"darkorange": [255, 140, 0],
		"darkorchid": [153, 50, 204],
		"darkred": [139, 0, 0],
		"darksalmon": [233, 150, 122],
		"darkseagreen": [143, 188, 143],
		"darkslateblue": [72, 61, 139],
		"darkslategray": [47, 79, 79],
		"darkslategrey": [47, 79, 79],
		"darkturquoise": [0, 206, 209],
		"darkviolet": [148, 0, 211],
		"deeppink": [255, 20, 147],
		"deepskyblue": [0, 191, 255],
		"dimgray": [105, 105, 105],
		"dimgrey": [105, 105, 105],
		"dodgerblue": [30, 144, 255],
		"firebrick": [178, 34, 34],
		"floralwhite": [255, 250, 240],
		"forestgreen": [34, 139, 34],
		"fuchsia": [255, 0, 255],
		"gainsboro": [220, 220, 220],
		"ghostwhite": [248, 248, 255],
		"gold": [255, 215, 0],
		"goldenrod": [218, 165, 32],
		"gray": [128, 128, 128],
		"green": [0, 128, 0],
		"greenyellow": [173, 255, 47],
		"grey": [128, 128, 128],
		"honeydew": [240, 255, 240],
		"hotpink": [255, 105, 180],
		"indianred": [205, 92, 92],
		"indigo": [75, 0, 130],
		"ivory": [255, 255, 240],
		"khaki": [240, 230, 140],
		"lavender": [230, 230, 250],
		"lavenderblush": [255, 240, 245],
		"lawngreen": [124, 252, 0],
		"lemonchiffon": [255, 250, 205],
		"lightblue": [173, 216, 230],
		"lightcoral": [240, 128, 128],
		"lightcyan": [224, 255, 255],
		"lightgoldenrodyellow": [250, 250, 210],
		"lightgray": [211, 211, 211],
		"lightgreen": [144, 238, 144],
		"lightgrey": [211, 211, 211],
		"lightpink": [255, 182, 193],
		"lightsalmon": [255, 160, 122],
		"lightseagreen": [32, 178, 170],
		"lightskyblue": [135, 206, 250],
		"lightslategray": [119, 136, 153],
		"lightslategrey": [119, 136, 153],
		"lightsteelblue": [176, 196, 222],
		"lightyellow": [255, 255, 224],
		"lime": [0, 255, 0],
		"limegreen": [50, 205, 50],
		"linen": [250, 240, 230],
		"magenta": [255, 0, 255],
		"maroon": [128, 0, 0],
		"mediumaquamarine": [102, 205, 170],
		"mediumblue": [0, 0, 205],
		"mediumorchid": [186, 85, 211],
		"mediumpurple": [147, 112, 219],
		"mediumseagreen": [60, 179, 113],
		"mediumslateblue": [123, 104, 238],
		"mediumspringgreen": [0, 250, 154],
		"mediumturquoise": [72, 209, 204],
		"mediumvioletred": [199, 21, 133],
		"midnightblue": [25, 25, 112],
		"mintcream": [245, 255, 250],
		"mistyrose": [255, 228, 225],
		"moccasin": [255, 228, 181],
		"navajowhite": [255, 222, 173],
		"navy": [0, 0, 128],
		"oldlace": [253, 245, 230],
		"olive": [128, 128, 0],
		"olivedrab": [107, 142, 35],
		"orange": [255, 165, 0],
		"orangered": [255, 69, 0],
		"orchid": [218, 112, 214],
		"palegoldenrod": [238, 232, 170],
		"palegreen": [152, 251, 152],
		"paleturquoise": [175, 238, 238],
		"palevioletred": [219, 112, 147],
		"papayawhip": [255, 239, 213],
		"peachpuff": [255, 218, 185],
		"peru": [205, 133, 63],
		"pink": [255, 192, 203],
		"plum": [221, 160, 221],
		"powderblue": [176, 224, 230],
		"purple": [128, 0, 128],
		"rebeccapurple": [102, 51, 153],
		"red": [255, 0, 0],
		"rosybrown": [188, 143, 143],
		"royalblue": [65, 105, 225],
		"saddlebrown": [139, 69, 19],
		"salmon": [250, 128, 114],
		"sandybrown": [244, 164, 96],
		"seagreen": [46, 139, 87],
		"seashell": [255, 245, 238],
		"sienna": [160, 82, 45],
		"silver": [192, 192, 192],
		"skyblue": [135, 206, 235],
		"slateblue": [106, 90, 205],
		"slategray": [112, 128, 144],
		"slategrey": [112, 128, 144],
		"snow": [255, 250, 250],
		"springgreen": [0, 255, 127],
		"steelblue": [70, 130, 180],
		"tan": [210, 180, 140],
		"teal": [0, 128, 128],
		"thistle": [216, 191, 216],
		"tomato": [255, 99, 71],
		"turquoise": [64, 224, 208],
		"violet": [238, 130, 238],
		"wheat": [245, 222, 179],
		"white": [255, 255, 255],
		"whitesmoke": [245, 245, 245],
		"yellow": [255, 255, 0],
		"yellowgreen": [154, 205, 50]
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
		// Global Chart canvas helpers object for drawing items to canvas
		var helpers = Chart.canvasHelpers = {};
	
		helpers.drawPoint = function(ctx, pointStyle, radius, x, y) {
			var type, edgeLength, xOffset, yOffset, height, size;
	
			if (typeof pointStyle === 'object') {
				type = pointStyle.toString();
				if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
					ctx.drawImage(pointStyle, x - pointStyle.width / 2, y - pointStyle.height / 2);
					return;
				}
			}
	
			if (isNaN(radius) || radius <= 0) {
				return;
			}
	
			switch (pointStyle) {
			// Default includes circle
			default:
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
				break;
			case 'triangle':
				ctx.beginPath();
				edgeLength = 3 * radius / Math.sqrt(3);
				height = edgeLength * Math.sqrt(3) / 2;
				ctx.moveTo(x - edgeLength / 2, y + height / 3);
				ctx.lineTo(x + edgeLength / 2, y + height / 3);
				ctx.lineTo(x, y - 2 * height / 3);
				ctx.closePath();
				ctx.fill();
				break;
			case 'rect':
				size = 1 / Math.SQRT2 * radius;
				ctx.beginPath();
				ctx.fillRect(x - size, y - size, 2 * size, 2 * size);
				ctx.strokeRect(x - size, y - size, 2 * size, 2 * size);
				break;
			case 'rectRot':
				size = 1 / Math.SQRT2 * radius;
				ctx.beginPath();
				ctx.moveTo(x - size, y);
				ctx.lineTo(x, y + size);
				ctx.lineTo(x + size, y);
				ctx.lineTo(x, y - size);
				ctx.closePath();
				ctx.fill();
				break;
			case 'cross':
				ctx.beginPath();
				ctx.moveTo(x, y + radius);
				ctx.lineTo(x, y - radius);
				ctx.moveTo(x - radius, y);
				ctx.lineTo(x + radius, y);
				ctx.closePath();
				break;
			case 'crossRot':
				ctx.beginPath();
				xOffset = Math.cos(Math.PI / 4) * radius;
				yOffset = Math.sin(Math.PI / 4) * radius;
				ctx.moveTo(x - xOffset, y - yOffset);
				ctx.lineTo(x + xOffset, y + yOffset);
				ctx.moveTo(x - xOffset, y + yOffset);
				ctx.lineTo(x + xOffset, y - yOffset);
				ctx.closePath();
				break;
			case 'star':
				ctx.beginPath();
				ctx.moveTo(x, y + radius);
				ctx.lineTo(x, y - radius);
				ctx.moveTo(x - radius, y);
				ctx.lineTo(x + radius, y);
				xOffset = Math.cos(Math.PI / 4) * radius;
				yOffset = Math.sin(Math.PI / 4) * radius;
				ctx.moveTo(x - xOffset, y - yOffset);
				ctx.lineTo(x + xOffset, y + yOffset);
				ctx.moveTo(x - xOffset, y + yOffset);
				ctx.lineTo(x + xOffset, y - yOffset);
				ctx.closePath();
				break;
			case 'line':
				ctx.beginPath();
				ctx.moveTo(x - radius, y);
				ctx.lineTo(x + radius, y);
				ctx.closePath();
				break;
			case 'dash':
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(x + radius, y);
				ctx.closePath();
				break;
			}
	
			ctx.stroke();
		};
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.elements = {};
	
		Chart.Element = function(configuration) {
			helpers.extend(this, configuration);
			this.initialize.apply(this, arguments);
		};
	
		helpers.extend(Chart.Element.prototype, {
	
			initialize: function() {
				this.hidden = false;
			},
	
			pivot: function() {
				var me = this;
				if (!me._view) {
					me._view = helpers.clone(me._model);
				}
				me._start = helpers.clone(me._view);
				return me;
			},
	
			transition: function(ease) {
				var me = this;
	
				if (!me._view) {
					me._view = helpers.clone(me._model);
				}
	
				// No animation -> No Transition
				if (ease === 1) {
					me._view = me._model;
					me._start = null;
					return me;
				}
	
				if (!me._start) {
					me.pivot();
				}
	
				helpers.each(me._model, function(value, key) {
	
					if (key[0] === '_') {
						// Only non-underscored properties
					// Init if doesn't exist
					} else if (!me._view.hasOwnProperty(key)) {
						if (typeof value === 'number' && !isNaN(me._view[key])) {
							me._view[key] = value * ease;
						} else {
							me._view[key] = value;
						}
					// No unnecessary computations
					} else if (value === me._view[key]) {
						// It's the same! Woohoo!
					// Color transitions if possible
					} else if (typeof value === 'string') {
						try {
							var color = helpers.color(me._model[key]).mix(helpers.color(me._start[key]), ease);
							me._view[key] = color.rgbString();
						} catch (err) {
							me._view[key] = value;
						}
					// Number transitions
					} else if (typeof value === 'number') {
						var startVal = me._start[key] !== undefined && isNaN(me._start[key]) === false ? me._start[key] : 0;
						me._view[key] = ((me._model[key] - startVal) * ease) + startVal;
					// Everything else
					} else {
						me._view[key] = value;
					}
				}, me);
	
				return me;
			},
	
			tooltipPosition: function() {
				return {
					x: this._model.x,
					y: this._model.y
				};
			},
	
			hasValue: function() {
				return helpers.isNumber(this._model.x) && helpers.isNumber(this._model.y);
			}
		});
	
		Chart.Element.extend = helpers.inherits;
	
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	/* global window: false */
	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.global.animation = {
			duration: 1000,
			easing: 'easeOutQuart',
			onProgress: helpers.noop,
			onComplete: helpers.noop
		};
	
		Chart.Animation = Chart.Element.extend({
			currentStep: null, // the current animation step
			numSteps: 60, // default number of steps
			easing: '', // the easing to use for this animation
			render: null, // render function used by the animation service
	
			onAnimationProgress: null, // user specified callback to fire on each step of the animation
			onAnimationComplete: null // user specified callback to fire when the animation finishes
		});
	
		Chart.animationService = {
			frameDuration: 17,
			animations: [],
			dropFrames: 0,
			request: null,
			addAnimation: function(chartInstance, animationObject, duration, lazy) {
				var me = this;
	
				if (!lazy) {
					chartInstance.animating = true;
				}
	
				for (var index = 0; index < me.animations.length; ++index) {
					if (me.animations[index].chartInstance === chartInstance) {
						// replacing an in progress animation
						me.animations[index].animationObject = animationObject;
						return;
					}
				}
	
				me.animations.push({
					chartInstance: chartInstance,
					animationObject: animationObject
				});
	
				// If there are no animations queued, manually kickstart a digest, for lack of a better word
				if (me.animations.length === 1) {
					me.requestAnimationFrame();
				}
			},
			// Cancel the animation for a given chart instance
			cancelAnimation: function(chartInstance) {
				var index = helpers.findIndex(this.animations, function(animationWrapper) {
					return animationWrapper.chartInstance === chartInstance;
				});
	
				if (index !== -1) {
					this.animations.splice(index, 1);
					chartInstance.animating = false;
				}
			},
			requestAnimationFrame: function() {
				var me = this;
				if (me.request === null) {
					// Skip animation frame requests until the active one is executed.
					// This can happen when processing mouse events, e.g. 'mousemove'
					// and 'mouseout' events will trigger multiple renders.
					me.request = helpers.requestAnimFrame.call(window, function() {
						me.request = null;
						me.startDigest();
					});
				}
			},
			startDigest: function() {
				var me = this;
	
				var startTime = Date.now();
				var framesToDrop = 0;
	
				if (me.dropFrames > 1) {
					framesToDrop = Math.floor(me.dropFrames);
					me.dropFrames = me.dropFrames % 1;
				}
	
				var i = 0;
				while (i < me.animations.length) {
					if (me.animations[i].animationObject.currentStep === null) {
						me.animations[i].animationObject.currentStep = 0;
					}
	
					me.animations[i].animationObject.currentStep += 1 + framesToDrop;
	
					if (me.animations[i].animationObject.currentStep > me.animations[i].animationObject.numSteps) {
						me.animations[i].animationObject.currentStep = me.animations[i].animationObject.numSteps;
					}
	
					me.animations[i].animationObject.render(me.animations[i].chartInstance, me.animations[i].animationObject);
					if (me.animations[i].animationObject.onAnimationProgress && me.animations[i].animationObject.onAnimationProgress.call) {
						me.animations[i].animationObject.onAnimationProgress.call(me.animations[i].chartInstance, me.animations[i]);
					}
	
					if (me.animations[i].animationObject.currentStep === me.animations[i].animationObject.numSteps) {
						if (me.animations[i].animationObject.onAnimationComplete && me.animations[i].animationObject.onAnimationComplete.call) {
							me.animations[i].animationObject.onAnimationComplete.call(me.animations[i].chartInstance, me.animations[i]);
						}
	
						// executed the last frame. Remove the animation.
						me.animations[i].chartInstance.animating = false;
	
						me.animations.splice(i, 1);
					} else {
						++i;
					}
				}
	
				var endTime = Date.now();
				var dropFrames = (endTime - startTime) / me.frameDuration;
	
				me.dropFrames += dropFrames;
	
				// Do we have more stuff to animate?
				if (me.animations.length > 0) {
					me.requestAnimationFrame();
				}
			}
		};
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		// Create a dictionary of chart types, to allow for extension of existing types
		Chart.types = {};
	
		// Store a reference to each instance - allowing us to globally resize chart instances on window resize.
		// Destroy method on the chart will remove the instance of the chart from this reference.
		Chart.instances = {};
	
		// Controllers available for dataset visualization eg. bar, line, slice, etc.
		Chart.controllers = {};
	
		/**
		 * @class Chart.Controller
		 * The main controller of a chart.
		 */
		Chart.Controller = function(instance) {
	
			this.chart = instance;
			this.config = instance.config;
			this.options = this.config.options = helpers.configMerge(Chart.defaults.global, Chart.defaults[this.config.type], this.config.options || {});
			this.id = helpers.uid();
	
			Object.defineProperty(this, 'data', {
				get: function() {
					return this.config.data;
				}
			});
	
			// Add the chart instance to the global namespace
			Chart.instances[this.id] = this;
	
			if (this.options.responsive) {
				// Silent resize before chart draws
				this.resize(true);
			}
	
			this.initialize();
	
			return this;
		};
	
		helpers.extend(Chart.Controller.prototype, /** @lends Chart.Controller */ {
	
			initialize: function() {
				var me = this;
				// Before init plugin notification
				Chart.plugins.notify('beforeInit', [me]);
	
				me.bindEvents();
	
				// Make sure controllers are built first so that each dataset is bound to an axis before the scales
				// are built
				me.ensureScalesHaveIDs();
				me.buildOrUpdateControllers();
				me.buildScales();
				me.updateLayout();
				me.resetElements();
				me.initToolTip();
				me.update();
	
				// After init plugin notification
				Chart.plugins.notify('afterInit', [me]);
	
				return me;
			},
	
			clear: function() {
				helpers.clear(this.chart);
				return this;
			},
	
			stop: function() {
				// Stops any current animation loop occuring
				Chart.animationService.cancelAnimation(this);
				return this;
			},
	
			resize: function(silent) {
				var me = this;
				var chart = me.chart;
				var canvas = chart.canvas;
				var newWidth = helpers.getMaximumWidth(canvas);
				var aspectRatio = chart.aspectRatio;
				var newHeight = (me.options.maintainAspectRatio && isNaN(aspectRatio) === false && isFinite(aspectRatio) && aspectRatio !== 0) ? newWidth / aspectRatio : helpers.getMaximumHeight(canvas);
	
				var sizeChanged = chart.width !== newWidth || chart.height !== newHeight;
	
				if (!sizeChanged) {
					return me;
				}
	
				canvas.width = chart.width = newWidth;
				canvas.height = chart.height = newHeight;
	
				helpers.retinaScale(chart);
	
				// Notify any plugins about the resize
				var newSize = {width: newWidth, height: newHeight};
				Chart.plugins.notify('resize', [me, newSize]);
	
				// Notify of resize
				if (me.options.onResize) {
					me.options.onResize(me, newSize);
				}
	
				if (!silent) {
					me.stop();
					me.update(me.options.responsiveAnimationDuration);
				}
	
				return me;
			},
	
			ensureScalesHaveIDs: function() {
				var options = this.options;
				var scalesOptions = options.scales || {};
				var scaleOptions = options.scale;
	
				helpers.each(scalesOptions.xAxes, function(xAxisOptions, index) {
					xAxisOptions.id = xAxisOptions.id || ('x-axis-' + index);
				});
	
				helpers.each(scalesOptions.yAxes, function(yAxisOptions, index) {
					yAxisOptions.id = yAxisOptions.id || ('y-axis-' + index);
				});
	
				if (scaleOptions) {
					scaleOptions.id = scaleOptions.id || 'scale';
				}
			},
	
			/**
			 * Builds a map of scale ID to scale object for future lookup.
			 */
			buildScales: function() {
				var me = this;
				var options = me.options;
				var scales = me.scales = {};
				var items = [];
	
				if (options.scales) {
					items = items.concat(
						(options.scales.xAxes || []).map(function(xAxisOptions) {
							return {options: xAxisOptions, dtype: 'category'};
						}),
						(options.scales.yAxes || []).map(function(yAxisOptions) {
							return {options: yAxisOptions, dtype: 'linear'};
						})
					);
				}
	
				if (options.scale) {
					items.push({options: options.scale, dtype: 'radialLinear', isDefault: true});
				}
	
				helpers.each(items, function(item) {
					var scaleOptions = item.options;
					var scaleType = helpers.getValueOrDefault(scaleOptions.type, item.dtype);
					var scaleClass = Chart.scaleService.getScaleConstructor(scaleType);
					if (!scaleClass) {
						return;
					}
	
					var scale = new scaleClass({
						id: scaleOptions.id,
						options: scaleOptions,
						ctx: me.chart.ctx,
						chart: me
					});
	
					scales[scale.id] = scale;
	
					// TODO(SB): I think we should be able to remove this custom case (options.scale)
					// and consider it as a regular scale part of the "scales"" map only! This would
					// make the logic easier and remove some useless? custom code.
					if (item.isDefault) {
						me.scale = scale;
					}
				});
	
				Chart.scaleService.addScalesToLayout(this);
			},
	
			updateLayout: function() {
				Chart.layoutService.update(this, this.chart.width, this.chart.height);
			},
	
			buildOrUpdateControllers: function() {
				var me = this;
				var types = [];
				var newControllers = [];
	
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					var meta = me.getDatasetMeta(datasetIndex);
					if (!meta.type) {
						meta.type = dataset.type || me.config.type;
					}
	
					types.push(meta.type);
	
					if (meta.controller) {
						meta.controller.updateIndex(datasetIndex);
					} else {
						meta.controller = new Chart.controllers[meta.type](me, datasetIndex);
						newControllers.push(meta.controller);
					}
				}, me);
	
				if (types.length > 1) {
					for (var i = 1; i < types.length; i++) {
						if (types[i] !== types[i - 1]) {
							me.isCombo = true;
							break;
						}
					}
				}
	
				return newControllers;
			},
	
			resetElements: function() {
				var me = this;
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					me.getDatasetMeta(datasetIndex).controller.reset();
				}, me);
			},
	
			update: function(animationDuration, lazy) {
				var me = this;
				Chart.plugins.notify('beforeUpdate', [me]);
	
				// In case the entire data object changed
				me.tooltip._data = me.data;
	
				// Make sure dataset controllers are updated and new controllers are reset
				var newControllers = me.buildOrUpdateControllers();
	
				// Make sure all dataset controllers have correct meta data counts
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					me.getDatasetMeta(datasetIndex).controller.buildOrUpdateElements();
				}, me);
	
				Chart.layoutService.update(me, me.chart.width, me.chart.height);
	
				// Apply changes to the dataets that require the scales to have been calculated i.e BorderColor chages
				Chart.plugins.notify('afterScaleUpdate', [me]);
	
				// Can only reset the new controllers after the scales have been updated
				helpers.each(newControllers, function(controller) {
					controller.reset();
				});
	
				me.updateDatasets();
	
				// Do this before render so that any plugins that need final scale updates can use it
				Chart.plugins.notify('afterUpdate', [me]);
	
				me.render(animationDuration, lazy);
			},
	
			/**
			 * @method beforeDatasetsUpdate
			 * @description Called before all datasets are updated. If a plugin returns false,
			 * the datasets update will be cancelled until another chart update is triggered.
			 * @param {Object} instance the chart instance being updated.
			 * @returns {Boolean} false to cancel the datasets update.
			 * @memberof Chart.PluginBase
			 * @since version 2.1.5
			 * @instance
			 */
	
			/**
			 * @method afterDatasetsUpdate
			 * @description Called after all datasets have been updated. Note that this
			 * extension will not be called if the datasets update has been cancelled.
			 * @param {Object} instance the chart instance being updated.
			 * @memberof Chart.PluginBase
			 * @since version 2.1.5
			 * @instance
			 */
	
			/**
			 * Updates all datasets unless a plugin returns false to the beforeDatasetsUpdate
			 * extension, in which case no datasets will be updated and the afterDatasetsUpdate
			 * notification will be skipped.
			 * @protected
			 * @instance
			 */
			updateDatasets: function() {
				var me = this;
				var i, ilen;
	
				if (Chart.plugins.notify('beforeDatasetsUpdate', [me])) {
					for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
						me.getDatasetMeta(i).controller.update();
					}
	
					Chart.plugins.notify('afterDatasetsUpdate', [me]);
				}
			},
	
			render: function(duration, lazy) {
				var me = this;
				Chart.plugins.notify('beforeRender', [me]);
	
				var animationOptions = me.options.animation;
				if (animationOptions && ((typeof duration !== 'undefined' && duration !== 0) || (typeof duration === 'undefined' && animationOptions.duration !== 0))) {
					var animation = new Chart.Animation();
					animation.numSteps = (duration || animationOptions.duration) / 16.66; // 60 fps
					animation.easing = animationOptions.easing;
	
					// render function
					animation.render = function(chartInstance, animationObject) {
						var easingFunction = helpers.easingEffects[animationObject.easing];
						var stepDecimal = animationObject.currentStep / animationObject.numSteps;
						var easeDecimal = easingFunction(stepDecimal);
	
						chartInstance.draw(easeDecimal, stepDecimal, animationObject.currentStep);
					};
	
					// user events
					animation.onAnimationProgress = animationOptions.onProgress;
					animation.onAnimationComplete = animationOptions.onComplete;
	
					Chart.animationService.addAnimation(me, animation, duration, lazy);
				} else {
					me.draw();
					if (animationOptions && animationOptions.onComplete && animationOptions.onComplete.call) {
						animationOptions.onComplete.call(me);
					}
				}
				return me;
			},
	
			draw: function(ease) {
				var me = this;
				var easingDecimal = ease || 1;
				me.clear();
	
				Chart.plugins.notify('beforeDraw', [me, easingDecimal]);
	
				// Draw all the scales
				helpers.each(me.boxes, function(box) {
					box.draw(me.chartArea);
				}, me);
				if (me.scale) {
					me.scale.draw();
				}
	
				Chart.plugins.notify('beforeDatasetsDraw', [me, easingDecimal]);
	
				// Draw each dataset via its respective controller (reversed to support proper line stacking)
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					if (me.isDatasetVisible(datasetIndex)) {
						me.getDatasetMeta(datasetIndex).controller.draw(ease);
					}
				}, me, true);
	
				Chart.plugins.notify('afterDatasetsDraw', [me, easingDecimal]);
	
				// Finally draw the tooltip
				me.tooltip.transition(easingDecimal).draw();
	
				Chart.plugins.notify('afterDraw', [me, easingDecimal]);
			},
	
			// Get the single element that was clicked on
			// @return : An object containing the dataset index and element index of the matching element. Also contains the rectangle that was draw
			getElementAtEvent: function(e) {
				var me = this;
				var eventPosition = helpers.getRelativePosition(e, me.chart);
				var elementsArray = [];
	
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					if (me.isDatasetVisible(datasetIndex)) {
						var meta = me.getDatasetMeta(datasetIndex);
						helpers.each(meta.data, function(element) {
							if (element.inRange(eventPosition.x, eventPosition.y)) {
								elementsArray.push(element);
								return elementsArray;
							}
						});
					}
				});
	
				return elementsArray.slice(0, 1);
			},
	
			getElementsAtEvent: function(e) {
				var me = this;
				var eventPosition = helpers.getRelativePosition(e, me.chart);
				var elementsArray = [];
	
				var found = function() {
					if (me.data.datasets) {
						for (var i = 0; i < me.data.datasets.length; i++) {
							var meta = me.getDatasetMeta(i);
							if (me.isDatasetVisible(i)) {
								for (var j = 0; j < meta.data.length; j++) {
									if (meta.data[j].inRange(eventPosition.x, eventPosition.y)) {
										return meta.data[j];
									}
								}
							}
						}
					}
				}.call(me);
	
				if (!found) {
					return elementsArray;
				}
	
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					if (me.isDatasetVisible(datasetIndex)) {
						var meta = me.getDatasetMeta(datasetIndex),
							element = meta.data[found._index];
						if (element && !element._view.skip) {
							elementsArray.push(element);
						}
					}
				}, me);
	
				return elementsArray;
			},
	
			getElementsAtXAxis: function(e) {
				var me = this;
				var eventPosition = helpers.getRelativePosition(e, me.chart);
				var elementsArray = [];
	
				var found = function() {
					if (me.data.datasets) {
						for (var i = 0; i < me.data.datasets.length; i++) {
							var meta = me.getDatasetMeta(i);
							if (me.isDatasetVisible(i)) {
								for (var j = 0; j < meta.data.length; j++) {
									if (meta.data[j].inLabelRange(eventPosition.x, eventPosition.y)) {
										return meta.data[j];
									}
								}
							}
						}
					}
				}.call(me);
	
				if (!found) {
					return elementsArray;
				}
	
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					if (me.isDatasetVisible(datasetIndex)) {
						var meta = me.getDatasetMeta(datasetIndex);
						var index = helpers.findIndex(meta.data, function(it) {
							return found._model.x === it._model.x;
						});
						if (index !== -1 && !meta.data[index]._view.skip) {
							elementsArray.push(meta.data[index]);
						}
					}
				}, me);
	
				return elementsArray;
			},
	
			getElementsAtEventForMode: function(e, mode) {
				var me = this;
				switch (mode) {
				case 'single':
					return me.getElementAtEvent(e);
				case 'label':
					return me.getElementsAtEvent(e);
				case 'dataset':
					return me.getDatasetAtEvent(e);
				case 'x-axis':
					return me.getElementsAtXAxis(e);
				default:
					return e;
				}
			},
	
			getDatasetAtEvent: function(e) {
				var elementsArray = this.getElementAtEvent(e);
	
				if (elementsArray.length > 0) {
					elementsArray = this.getDatasetMeta(elementsArray[0]._datasetIndex).data;
				}
	
				return elementsArray;
			},
	
			getDatasetMeta: function(datasetIndex) {
				var me = this;
				var dataset = me.data.datasets[datasetIndex];
				if (!dataset._meta) {
					dataset._meta = {};
				}
	
				var meta = dataset._meta[me.id];
				if (!meta) {
					meta = dataset._meta[me.id] = {
						type: null,
						data: [],
						dataset: null,
						controller: null,
						hidden: null,			// See isDatasetVisible() comment
						xAxisID: null,
						yAxisID: null
					};
				}
	
				return meta;
			},
	
			getVisibleDatasetCount: function() {
				var count = 0;
				for (var i = 0, ilen = this.data.datasets.length; i<ilen; ++i) {
					if (this.isDatasetVisible(i)) {
						count++;
					}
				}
				return count;
			},
	
			isDatasetVisible: function(datasetIndex) {
				var meta = this.getDatasetMeta(datasetIndex);
	
				// meta.hidden is a per chart dataset hidden flag override with 3 states: if true or false,
				// the dataset.hidden value is ignored, else if null, the dataset hidden state is returned.
				return typeof meta.hidden === 'boolean'? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
			},
	
			generateLegend: function() {
				return this.options.legendCallback(this);
			},
	
			destroy: function() {
				var me = this;
				me.stop();
				me.clear();
				helpers.unbindEvents(me, me.events);
				helpers.removeResizeListener(me.chart.canvas.parentNode);
	
				// Reset canvas height/width attributes
				var canvas = me.chart.canvas;
				canvas.width = me.chart.width;
				canvas.height = me.chart.height;
	
				// if we scaled the canvas in response to a devicePixelRatio !== 1, we need to undo that transform here
				if (me.chart.originalDevicePixelRatio !== undefined) {
					me.chart.ctx.scale(1 / me.chart.originalDevicePixelRatio, 1 / me.chart.originalDevicePixelRatio);
				}
	
				// Reset to the old style since it may have been changed by the device pixel ratio changes
				canvas.style.width = me.chart.originalCanvasStyleWidth;
				canvas.style.height = me.chart.originalCanvasStyleHeight;
	
				Chart.plugins.notify('destroy', [me]);
	
				delete Chart.instances[me.id];
			},
	
			toBase64Image: function() {
				return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
			},
	
			initToolTip: function() {
				var me = this;
				me.tooltip = new Chart.Tooltip({
					_chart: me.chart,
					_chartInstance: me,
					_data: me.data,
					_options: me.options.tooltips
				}, me);
			},
	
			bindEvents: function() {
				var me = this;
				helpers.bindEvents(me, me.options.events, function(evt) {
					me.eventHandler(evt);
				});
			},
	
			updateHoverStyle: function(elements, mode, enabled) {
				var method = enabled? 'setHoverStyle' : 'removeHoverStyle';
				var element, i, ilen;
	
				switch (mode) {
				case 'single':
					elements = [elements[0]];
					break;
				case 'label':
				case 'dataset':
				case 'x-axis':
					// elements = elements;
					break;
				default:
					// unsupported mode
					return;
				}
	
				for (i=0, ilen=elements.length; i<ilen; ++i) {
					element = elements[i];
					if (element) {
						this.getDatasetMeta(element._datasetIndex).controller[method](element);
					}
				}
			},
	
			eventHandler: function(e) {
				var me = this;
				var tooltip = me.tooltip;
				var options = me.options || {};
				var hoverOptions = options.hover;
				var tooltipsOptions = options.tooltips;
	
				me.lastActive = me.lastActive || [];
				me.lastTooltipActive = me.lastTooltipActive || [];
	
				// Find Active Elements for hover and tooltips
				if (e.type === 'mouseout') {
					me.active = [];
					me.tooltipActive = [];
				} else {
					me.active = me.getElementsAtEventForMode(e, hoverOptions.mode);
					me.tooltipActive = me.getElementsAtEventForMode(e, tooltipsOptions.mode);
				}
	
				// On Hover hook
				if (hoverOptions.onHover) {
					hoverOptions.onHover.call(me, me.active);
				}
	
				if (me.legend && me.legend.handleEvent) {
					me.legend.handleEvent(e);
				}
	
				if (e.type === 'mouseup' || e.type === 'click') {
					if (options.onClick) {
						options.onClick.call(me, e, me.active);
					}
				}
	
				// Remove styling for last active (even if it may still be active)
				if (me.lastActive.length) {
					me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
				}
	
				// Built in hover styling
				if (me.active.length && hoverOptions.mode) {
					me.updateHoverStyle(me.active, hoverOptions.mode, true);
				}
	
				// Built in Tooltips
				if (tooltipsOptions.enabled || tooltipsOptions.custom) {
					tooltip.initialize();
					tooltip._active = me.tooltipActive;
					tooltip.update(true);
				}
	
				// Hover animations
				tooltip.pivot();
	
				if (!me.animating) {
					// If entering, leaving, or changing elements, animate the change via pivot
					if (!helpers.arrayEquals(me.active, me.lastActive) ||
						!helpers.arrayEquals(me.tooltipActive, me.lastTooltipActive)) {
	
						me.stop();
	
						if (tooltipsOptions.enabled || tooltipsOptions.custom) {
							tooltip.update(true);
						}
	
						// We only need to render at this point. Updating will cause scales to be
						// recomputed generating flicker & using more memory than necessary.
						me.render(hoverOptions.animationDuration, true);
					}
				}
	
				// Remember Last Actives
				me.lastActive = me.active;
				me.lastTooltipActive = me.tooltipActive;
				return me;
			}
		});
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		var noop = helpers.noop;
	
		// Base class for all dataset controllers (line, bar, etc)
		Chart.DatasetController = function(chart, datasetIndex) {
			this.initialize(chart, datasetIndex);
		};
	
		helpers.extend(Chart.DatasetController.prototype, {
	
			/**
			 * Element type used to generate a meta dataset (e.g. Chart.element.Line).
			 * @type {Chart.core.element}
			 */
			datasetElementType: null,
	
			/**
			 * Element type used to generate a meta data (e.g. Chart.element.Point).
			 * @type {Chart.core.element}
			 */
			dataElementType: null,
	
			initialize: function(chart, datasetIndex) {
				var me = this;
				me.chart = chart;
				me.index = datasetIndex;
				me.linkScales();
				me.addElements();
			},
	
			updateIndex: function(datasetIndex) {
				this.index = datasetIndex;
			},
	
			linkScales: function() {
				var me = this;
				var meta = me.getMeta();
				var dataset = me.getDataset();
	
				if (meta.xAxisID === null) {
					meta.xAxisID = dataset.xAxisID || me.chart.options.scales.xAxes[0].id;
				}
				if (meta.yAxisID === null) {
					meta.yAxisID = dataset.yAxisID || me.chart.options.scales.yAxes[0].id;
				}
			},
	
			getDataset: function() {
				return this.chart.data.datasets[this.index];
			},
	
			getMeta: function() {
				return this.chart.getDatasetMeta(this.index);
			},
	
			getScaleForId: function(scaleID) {
				return this.chart.scales[scaleID];
			},
	
			reset: function() {
				this.update(true);
			},
	
			createMetaDataset: function() {
				var me = this;
				var type = me.datasetElementType;
				return type && new type({
					_chart: me.chart.chart,
					_datasetIndex: me.index
				});
			},
	
			createMetaData: function(index) {
				var me = this;
				var type = me.dataElementType;
				return type && new type({
					_chart: me.chart.chart,
					_datasetIndex: me.index,
					_index: index
				});
			},
	
			addElements: function() {
				var me = this;
				var meta = me.getMeta();
				var data = me.getDataset().data || [];
				var metaData = meta.data;
				var i, ilen;
	
				for (i=0, ilen=data.length; i<ilen; ++i) {
					metaData[i] = metaData[i] || me.createMetaData(meta, i);
				}
	
				meta.dataset = meta.dataset || me.createMetaDataset();
			},
	
			addElementAndReset: function(index) {
				var me = this;
				var element = me.createMetaData(index);
				me.getMeta().data.splice(index, 0, element);
				me.updateElement(element, index, true);
			},
	
			buildOrUpdateElements: function() {
				// Handle the number of data points changing
				var meta = this.getMeta(),
					md = meta.data,
					numData = this.getDataset().data.length,
					numMetaData = md.length;
	
				// Make sure that we handle number of datapoints changing
				if (numData < numMetaData) {
					// Remove excess bars for data points that have been removed
					md.splice(numData, numMetaData - numData);
				} else if (numData > numMetaData) {
					// Add new elements
					for (var index = numMetaData; index < numData; ++index) {
						this.addElementAndReset(index);
					}
				}
			},
	
			update: noop,
	
			draw: function(ease) {
				var easingDecimal = ease || 1;
				helpers.each(this.getMeta().data, function(element) {
					element.transition(easingDecimal).draw();
				});
			},
	
			removeHoverStyle: function(element, elementOpts) {
				var dataset = this.chart.data.datasets[element._datasetIndex],
					index = element._index,
					custom = element.custom || {},
					valueOrDefault = helpers.getValueAtIndexOrDefault,
					model = element._model;
	
				model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueOrDefault(dataset.backgroundColor, index, elementOpts.backgroundColor);
				model.borderColor = custom.borderColor ? custom.borderColor : valueOrDefault(dataset.borderColor, index, elementOpts.borderColor);
				model.borderWidth = custom.borderWidth ? custom.borderWidth : valueOrDefault(dataset.borderWidth, index, elementOpts.borderWidth);
			},
	
			setHoverStyle: function(element) {
				var dataset = this.chart.data.datasets[element._datasetIndex],
					index = element._index,
					custom = element.custom || {},
					valueOrDefault = helpers.getValueAtIndexOrDefault,
					getHoverColor = helpers.getHoverColor,
					model = element._model;
	
				model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueOrDefault(dataset.hoverBackgroundColor, index, getHoverColor(model.backgroundColor));
				model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : valueOrDefault(dataset.hoverBorderColor, index, getHoverColor(model.borderColor));
				model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : valueOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
			}
	
		});
	
		Chart.DatasetController.extend = helpers.inherits;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		// The layout service is very self explanatory.  It's responsible for the layout within a chart.
		// Scales, Legends and Plugins all rely on the layout service and can easily register to be placed anywhere they need
		// It is this service's responsibility of carrying out that layout.
		Chart.layoutService = {
			defaults: {},
	
			// Register a box to a chartInstance. A box is simply a reference to an object that requires layout. eg. Scales, Legend, Plugins.
			addBox: function(chartInstance, box) {
				if (!chartInstance.boxes) {
					chartInstance.boxes = [];
				}
				chartInstance.boxes.push(box);
			},
	
			removeBox: function(chartInstance, box) {
				if (!chartInstance.boxes) {
					return;
				}
				chartInstance.boxes.splice(chartInstance.boxes.indexOf(box), 1);
			},
	
			// The most important function
			update: function(chartInstance, width, height) {
	
				if (!chartInstance) {
					return;
				}
	
				var xPadding = 0;
				var yPadding = 0;
	
				var leftBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === 'left';
				});
				var rightBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === 'right';
				});
				var topBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === 'top';
				});
				var bottomBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === 'bottom';
				});
	
				// Boxes that overlay the chartarea such as the radialLinear scale
				var chartAreaBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === 'chartArea';
				});
	
				// Ensure that full width boxes are at the very top / bottom
				topBoxes.sort(function(a, b) {
					return (b.options.fullWidth ? 1 : 0) - (a.options.fullWidth ? 1 : 0);
				});
				bottomBoxes.sort(function(a, b) {
					return (a.options.fullWidth ? 1 : 0) - (b.options.fullWidth ? 1 : 0);
				});
	
				// Essentially we now have any number of boxes on each of the 4 sides.
				// Our canvas looks like the following.
				// The areas L1 and L2 are the left axes. R1 is the right axis, T1 is the top axis and
				// B1 is the bottom axis
				// There are also 4 quadrant-like locations (left to right instead of clockwise) reserved for chart overlays
				// These locations are single-box locations only, when trying to register a chartArea location that is already taken,
				// an error will be thrown.
				//
				// |----------------------------------------------------|
				// |                  T1 (Full Width)                   |
				// |----------------------------------------------------|
				// |    |    |                 T2                  |    |
				// |    |----|-------------------------------------|----|
				// |    |    | C1 |                           | C2 |    |
				// |    |    |----|                           |----|    |
				// |    |    |                                     |    |
				// | L1 | L2 |           ChartArea (C0)            | R1 |
				// |    |    |                                     |    |
				// |    |    |----|                           |----|    |
				// |    |    | C3 |                           | C4 |    |
				// |    |----|-------------------------------------|----|
				// |    |    |                 B1                  |    |
				// |----------------------------------------------------|
				// |                  B2 (Full Width)                   |
				// |----------------------------------------------------|
				//
				// What we do to find the best sizing, we do the following
				// 1. Determine the minimum size of the chart area.
				// 2. Split the remaining width equally between each vertical axis
				// 3. Split the remaining height equally between each horizontal axis
				// 4. Give each layout the maximum size it can be. The layout will return it's minimum size
				// 5. Adjust the sizes of each axis based on it's minimum reported size.
				// 6. Refit each axis
				// 7. Position each axis in the final location
				// 8. Tell the chart the final location of the chart area
				// 9. Tell any axes that overlay the chart area the positions of the chart area
	
				// Step 1
				var chartWidth = width - (2 * xPadding);
				var chartHeight = height - (2 * yPadding);
				var chartAreaWidth = chartWidth / 2; // min 50%
				var chartAreaHeight = chartHeight / 2; // min 50%
	
				// Step 2
				var verticalBoxWidth = (width - chartAreaWidth) / (leftBoxes.length + rightBoxes.length);
	
				// Step 3
				var horizontalBoxHeight = (height - chartAreaHeight) / (topBoxes.length + bottomBoxes.length);
	
				// Step 4
				var maxChartAreaWidth = chartWidth;
				var maxChartAreaHeight = chartHeight;
				var minBoxSizes = [];
	
				function getMinimumBoxSize(box) {
					var minSize;
					var isHorizontal = box.isHorizontal();
	
					if (isHorizontal) {
						minSize = box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, horizontalBoxHeight);
						maxChartAreaHeight -= minSize.height;
					} else {
						minSize = box.update(verticalBoxWidth, chartAreaHeight);
						maxChartAreaWidth -= minSize.width;
					}
	
					minBoxSizes.push({
						horizontal: isHorizontal,
						minSize: minSize,
						box: box
					});
				}
	
				helpers.each(leftBoxes.concat(rightBoxes, topBoxes, bottomBoxes), getMinimumBoxSize);
	
				// At this point, maxChartAreaHeight and maxChartAreaWidth are the size the chart area could
				// be if the axes are drawn at their minimum sizes.
	
				// Steps 5 & 6
				var totalLeftBoxesWidth = xPadding;
				var totalRightBoxesWidth = xPadding;
				var totalTopBoxesHeight = yPadding;
				var totalBottomBoxesHeight = yPadding;
	
				// Function to fit a box
				function fitBox(box) {
					var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBox) {
						return minBox.box === box;
					});
	
					if (minBoxSize) {
						if (box.isHorizontal()) {
							var scaleMargin = {
								left: totalLeftBoxesWidth,
								right: totalRightBoxesWidth,
								top: 0,
								bottom: 0
							};
	
							// Don't use min size here because of label rotation. When the labels are rotated, their rotation highly depends
							// on the margin. Sometimes they need to increase in size slightly
							box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, chartHeight / 2, scaleMargin);
						} else {
							box.update(minBoxSize.minSize.width, maxChartAreaHeight);
						}
					}
				}
	
				// Update, and calculate the left and right margins for the horizontal boxes
				helpers.each(leftBoxes.concat(rightBoxes), fitBox);
	
				helpers.each(leftBoxes, function(box) {
					totalLeftBoxesWidth += box.width;
				});
	
				helpers.each(rightBoxes, function(box) {
					totalRightBoxesWidth += box.width;
				});
	
				// Set the Left and Right margins for the horizontal boxes
				helpers.each(topBoxes.concat(bottomBoxes), fitBox);
	
				// Figure out how much margin is on the top and bottom of the vertical boxes
				helpers.each(topBoxes, function(box) {
					totalTopBoxesHeight += box.height;
				});
	
				helpers.each(bottomBoxes, function(box) {
					totalBottomBoxesHeight += box.height;
				});
	
				function finalFitVerticalBox(box) {
					var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minSize) {
						return minSize.box === box;
					});
	
					var scaleMargin = {
						left: 0,
						right: 0,
						top: totalTopBoxesHeight,
						bottom: totalBottomBoxesHeight
					};
	
					if (minBoxSize) {
						box.update(minBoxSize.minSize.width, maxChartAreaHeight, scaleMargin);
					}
				}
	
				// Let the left layout know the final margin
				helpers.each(leftBoxes.concat(rightBoxes), finalFitVerticalBox);
	
				// Recalculate because the size of each layout might have changed slightly due to the margins (label rotation for instance)
				totalLeftBoxesWidth = xPadding;
				totalRightBoxesWidth = xPadding;
				totalTopBoxesHeight = yPadding;
				totalBottomBoxesHeight = yPadding;
	
				helpers.each(leftBoxes, function(box) {
					totalLeftBoxesWidth += box.width;
				});
	
				helpers.each(rightBoxes, function(box) {
					totalRightBoxesWidth += box.width;
				});
	
				helpers.each(topBoxes, function(box) {
					totalTopBoxesHeight += box.height;
				});
				helpers.each(bottomBoxes, function(box) {
					totalBottomBoxesHeight += box.height;
				});
	
				// Figure out if our chart area changed. This would occur if the dataset layout label rotation
				// changed due to the application of the margins in step 6. Since we can only get bigger, this is safe to do
				// without calling `fit` again
				var newMaxChartAreaHeight = height - totalTopBoxesHeight - totalBottomBoxesHeight;
				var newMaxChartAreaWidth = width - totalLeftBoxesWidth - totalRightBoxesWidth;
	
				if (newMaxChartAreaWidth !== maxChartAreaWidth || newMaxChartAreaHeight !== maxChartAreaHeight) {
					helpers.each(leftBoxes, function(box) {
						box.height = newMaxChartAreaHeight;
					});
	
					helpers.each(rightBoxes, function(box) {
						box.height = newMaxChartAreaHeight;
					});
	
					helpers.each(topBoxes, function(box) {
						if (!box.options.fullWidth) {
							box.width = newMaxChartAreaWidth;
						}
					});
	
					helpers.each(bottomBoxes, function(box) {
						if (!box.options.fullWidth) {
							box.width = newMaxChartAreaWidth;
						}
					});
	
					maxChartAreaHeight = newMaxChartAreaHeight;
					maxChartAreaWidth = newMaxChartAreaWidth;
				}
	
				// Step 7 - Position the boxes
				var left = xPadding;
				var top = yPadding;
	
				function placeBox(box) {
					if (box.isHorizontal()) {
						box.left = box.options.fullWidth ? xPadding : totalLeftBoxesWidth;
						box.right = box.options.fullWidth ? width - xPadding : totalLeftBoxesWidth + maxChartAreaWidth;
						box.top = top;
						box.bottom = top + box.height;
	
						// Move to next point
						top = box.bottom;
	
					} else {
	
						box.left = left;
						box.right = left + box.width;
						box.top = totalTopBoxesHeight;
						box.bottom = totalTopBoxesHeight + maxChartAreaHeight;
	
						// Move to next point
						left = box.right;
					}
				}
	
				helpers.each(leftBoxes.concat(topBoxes), placeBox);
	
				// Account for chart width and height
				left += maxChartAreaWidth;
				top += maxChartAreaHeight;
	
				helpers.each(rightBoxes, placeBox);
				helpers.each(bottomBoxes, placeBox);
	
				// Step 8
				chartInstance.chartArea = {
					left: totalLeftBoxesWidth,
					top: totalTopBoxesHeight,
					right: totalLeftBoxesWidth + maxChartAreaWidth,
					bottom: totalTopBoxesHeight + maxChartAreaHeight
				};
	
				// Step 9
				helpers.each(chartAreaBoxes, function(box) {
					box.left = chartInstance.chartArea.left;
					box.top = chartInstance.chartArea.top;
					box.right = chartInstance.chartArea.right;
					box.bottom = chartInstance.chartArea.bottom;
	
					box.update(maxChartAreaWidth, maxChartAreaHeight);
				});
			}
		};
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.scaleService = {
			// Scale registration object. Extensions can register new scale types (such as log or DB scales) and then
			// use the new chart options to grab the correct scale
			constructors: {},
			// Use a registration function so that we can move to an ES6 map when we no longer need to support
			// old browsers
	
			// Scale config defaults
			defaults: {},
			registerScaleType: function(type, scaleConstructor, defaults) {
				this.constructors[type] = scaleConstructor;
				this.defaults[type] = helpers.clone(defaults);
			},
			getScaleConstructor: function(type) {
				return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
			},
			getScaleDefaults: function(type) {
				// Return the scale defaults merged with the global settings so that we always use the latest ones
				return this.defaults.hasOwnProperty(type) ? helpers.scaleMerge(Chart.defaults.scale, this.defaults[type]) : {};
			},
			updateScaleDefaults: function(type, additions) {
				var defaults = this.defaults;
				if (defaults.hasOwnProperty(type)) {
					defaults[type] = helpers.extend(defaults[type], additions);
				}
			},
			addScalesToLayout: function(chartInstance) {
				// Adds each scale to the chart.boxes array to be sized accordingly
				helpers.each(chartInstance.scales, function(scale) {
					Chart.layoutService.addBox(chartInstance, scale);
				});
			}
		};
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var noop = Chart.helpers.noop;
	
		/**
		 * The plugin service singleton
		 * @namespace Chart.plugins
		 * @since 2.1.0
		 */
		Chart.plugins = {
			_plugins: [],
	
			/**
			 * Registers the given plugin(s) if not already registered.
			 * @param {Array|Object} plugins plugin instance(s).
			 */
			register: function(plugins) {
				var p = this._plugins;
				([]).concat(plugins).forEach(function(plugin) {
					if (p.indexOf(plugin) === -1) {
						p.push(plugin);
					}
				});
			},
	
			/**
			 * Unregisters the given plugin(s) only if registered.
			 * @param {Array|Object} plugins plugin instance(s).
			 */
			unregister: function(plugins) {
				var p = this._plugins;
				([]).concat(plugins).forEach(function(plugin) {
					var idx = p.indexOf(plugin);
					if (idx !== -1) {
						p.splice(idx, 1);
					}
				});
			},
	
			/**
			 * Remove all registered p^lugins.
			 * @since 2.1.5
			 */
			clear: function() {
				this._plugins = [];
			},
	
			/**
			 * Returns the number of registered plugins?
			 * @returns {Number}
			 * @since 2.1.5
			 */
			count: function() {
				return this._plugins.length;
			},
	
			/**
			 * Returns all registered plugin intances.
			 * @returns {Array} array of plugin objects.
			 * @since 2.1.5
			 */
			getAll: function() {
				return this._plugins;
			},
	
			/**
			 * Calls registered plugins on the specified extension, with the given args. This
			 * method immediately returns as soon as a plugin explicitly returns false. The
			 * returned value can be used, for instance, to interrupt the current action.
			 * @param {String} extension the name of the plugin method to call (e.g. 'beforeUpdate').
			 * @param {Array} [args] extra arguments to apply to the extension call.
			 * @returns {Boolean} false if any of the plugins return false, else returns true.
			 */
			notify: function(extension, args) {
				var plugins = this._plugins;
				var ilen = plugins.length;
				var i, plugin;
	
				for (i=0; i<ilen; ++i) {
					plugin = plugins[i];
					if (typeof plugin[extension] === 'function') {
						if (plugin[extension].apply(plugin, args || []) === false) {
							return false;
						}
					}
				}
	
				return true;
			}
		};
	
		/**
		 * Plugin extension methods.
		 * @interface Chart.PluginBase
		 * @since 2.1.0
		 */
		Chart.PluginBase = Chart.Element.extend({
			// Called at start of chart init
			beforeInit: noop,
	
			// Called at end of chart init
			afterInit: noop,
	
			// Called at start of update
			beforeUpdate: noop,
	
			// Called at end of update
			afterUpdate: noop,
	
			// Called at start of draw
			beforeDraw: noop,
	
			// Called at end of draw
			afterDraw: noop,
	
			// Called during destroy
			destroy: noop
		});
	
		/**
		 * Provided for backward compatibility, use Chart.plugins instead
		 * @namespace Chart.pluginService
		 * @deprecated since version 2.1.5
		 * @todo remove me at version 3
		 */
		Chart.pluginService = Chart.plugins;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.scale = {
			display: true,
			position: 'left',
	
			// grid line settings
			gridLines: {
				display: true,
				color: 'rgba(0, 0, 0, 0.1)',
				lineWidth: 1,
				drawBorder: true,
				drawOnChartArea: true,
				drawTicks: true,
				tickMarkLength: 10,
				zeroLineWidth: 1,
				zeroLineColor: 'rgba(0,0,0,0.25)',
				offsetGridLines: false,
				borderDash: [],
				borderDashOffset: 0.0
			},
	
			// scale label
			scaleLabel: {
				// actual label
				labelString: '',
	
				// display property
				display: false
			},
	
			// label settings
			ticks: {
				beginAtZero: false,
				minRotation: 0,
				maxRotation: 50,
				mirror: false,
				padding: 10,
				reverse: false,
				display: true,
				autoSkip: true,
				autoSkipPadding: 0,
				labelOffset: 0,
				// We pass through arrays to be rendered as multiline labels, we convert Others to strings here.
				callback: function(value) {
					return helpers.isArray(value) ? value : '' + value;
				}
			}
		};
	
		Chart.Scale = Chart.Element.extend({
	
			// These methods are ordered by lifecyle. Utilities then follow.
			// Any function defined here is inherited by all scale types.
			// Any function can be extended by the scale type
	
			beforeUpdate: function() {
				helpers.callCallback(this.options.beforeUpdate, [this]);
			},
			update: function(maxWidth, maxHeight, margins) {
				var me = this;
	
				// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
				me.beforeUpdate();
	
				// Absorb the master measurements
				me.maxWidth = maxWidth;
				me.maxHeight = maxHeight;
				me.margins = helpers.extend({
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}, margins);
	
				// Dimensions
				me.beforeSetDimensions();
				me.setDimensions();
				me.afterSetDimensions();
	
				// Data min/max
				me.beforeDataLimits();
				me.determineDataLimits();
				me.afterDataLimits();
	
				// Ticks
				me.beforeBuildTicks();
				me.buildTicks();
				me.afterBuildTicks();
	
				me.beforeTickToLabelConversion();
				me.convertTicksToLabels();
				me.afterTickToLabelConversion();
	
				// Tick Rotation
				me.beforeCalculateTickRotation();
				me.calculateTickRotation();
				me.afterCalculateTickRotation();
				// Fit
				me.beforeFit();
				me.fit();
				me.afterFit();
				//
				me.afterUpdate();
	
				return me.minSize;
	
			},
			afterUpdate: function() {
				helpers.callCallback(this.options.afterUpdate, [this]);
			},
	
			//
	
			beforeSetDimensions: function() {
				helpers.callCallback(this.options.beforeSetDimensions, [this]);
			},
			setDimensions: function() {
				var me = this;
				// Set the unconstrained dimension before label rotation
				if (me.isHorizontal()) {
					// Reset position before calculating rotation
					me.width = me.maxWidth;
					me.left = 0;
					me.right = me.width;
				} else {
					me.height = me.maxHeight;
	
					// Reset position before calculating rotation
					me.top = 0;
					me.bottom = me.height;
				}
	
				// Reset padding
				me.paddingLeft = 0;
				me.paddingTop = 0;
				me.paddingRight = 0;
				me.paddingBottom = 0;
			},
			afterSetDimensions: function() {
				helpers.callCallback(this.options.afterSetDimensions, [this]);
			},
	
			// Data limits
			beforeDataLimits: function() {
				helpers.callCallback(this.options.beforeDataLimits, [this]);
			},
			determineDataLimits: helpers.noop,
			afterDataLimits: function() {
				helpers.callCallback(this.options.afterDataLimits, [this]);
			},
	
			//
			beforeBuildTicks: function() {
				helpers.callCallback(this.options.beforeBuildTicks, [this]);
			},
			buildTicks: helpers.noop,
			afterBuildTicks: function() {
				helpers.callCallback(this.options.afterBuildTicks, [this]);
			},
	
			beforeTickToLabelConversion: function() {
				helpers.callCallback(this.options.beforeTickToLabelConversion, [this]);
			},
			convertTicksToLabels: function() {
				var me = this;
				// Convert ticks to strings
				me.ticks = me.ticks.map(function(numericalTick, index, ticks) {
					if (me.options.ticks.userCallback) {
						return me.options.ticks.userCallback(numericalTick, index, ticks);
					}
					return me.options.ticks.callback(numericalTick, index, ticks);
				},
				me);
			},
			afterTickToLabelConversion: function() {
				helpers.callCallback(this.options.afterTickToLabelConversion, [this]);
			},
	
			//
	
			beforeCalculateTickRotation: function() {
				helpers.callCallback(this.options.beforeCalculateTickRotation, [this]);
			},
			calculateTickRotation: function() {
				var me = this;
				var context = me.ctx;
				var globalDefaults = Chart.defaults.global;
				var optionTicks = me.options.ticks;
	
				// Get the width of each grid by calculating the difference
				// between x offsets between 0 and 1.
				var tickFontSize = helpers.getValueOrDefault(optionTicks.fontSize, globalDefaults.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(optionTicks.fontStyle, globalDefaults.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(optionTicks.fontFamily, globalDefaults.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
				context.font = tickLabelFont;
	
				var firstWidth = context.measureText(me.ticks[0]).width;
				var lastWidth = context.measureText(me.ticks[me.ticks.length - 1]).width;
				var firstRotated;
	
				me.labelRotation = optionTicks.minRotation || 0;
				me.paddingRight = 0;
				me.paddingLeft = 0;
	
				if (me.options.display) {
					if (me.isHorizontal()) {
						me.paddingRight = lastWidth / 2 + 3;
						me.paddingLeft = firstWidth / 2 + 3;
	
						if (!me.longestTextCache) {
							me.longestTextCache = {};
						}
						var originalLabelWidth = helpers.longestText(context, tickLabelFont, me.ticks, me.longestTextCache);
						var labelWidth = originalLabelWidth;
						var cosRotation;
						var sinRotation;
	
						// Allow 3 pixels x2 padding either side for label readability
						// only the index matters for a dataset scale, but we want a consistent interface between scales
						var tickWidth = me.getPixelForTick(1) - me.getPixelForTick(0) - 6;
	
						// Max label rotation can be set or default to 90 - also act as a loop counter
						while (labelWidth > tickWidth && me.labelRotation < optionTicks.maxRotation) {
							cosRotation = Math.cos(helpers.toRadians(me.labelRotation));
							sinRotation = Math.sin(helpers.toRadians(me.labelRotation));
	
							firstRotated = cosRotation * firstWidth;
	
							// We're right aligning the text now.
							if (firstRotated + tickFontSize / 2 > me.yLabelWidth) {
								me.paddingLeft = firstRotated + tickFontSize / 2;
							}
	
							me.paddingRight = tickFontSize / 2;
	
							if (sinRotation * originalLabelWidth > me.maxHeight) {
								// go back one step
								me.labelRotation--;
								break;
							}
	
							me.labelRotation++;
							labelWidth = cosRotation * originalLabelWidth;
						}
					}
				}
	
				if (me.margins) {
					me.paddingLeft = Math.max(me.paddingLeft - me.margins.left, 0);
					me.paddingRight = Math.max(me.paddingRight - me.margins.right, 0);
				}
			},
			afterCalculateTickRotation: function() {
				helpers.callCallback(this.options.afterCalculateTickRotation, [this]);
			},
	
			//
	
			beforeFit: function() {
				helpers.callCallback(this.options.beforeFit, [this]);
			},
			fit: function() {
				var me = this;
				// Reset
				var minSize = me.minSize = {
					width: 0,
					height: 0
				};
	
				var opts = me.options;
				var globalDefaults = Chart.defaults.global;
				var tickOpts = opts.ticks;
				var scaleLabelOpts = opts.scaleLabel;
				var gridLineOpts = opts.gridLines;
				var display = opts.display;
				var isHorizontal = me.isHorizontal();
	
				var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(tickOpts.fontStyle, globalDefaults.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(tickOpts.fontFamily, globalDefaults.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
	
				var scaleLabelFontSize = helpers.getValueOrDefault(scaleLabelOpts.fontSize, globalDefaults.defaultFontSize);
	
				var tickMarkLength = opts.gridLines.tickMarkLength;
	
				// Width
				if (isHorizontal) {
					// subtract the margins to line up with the chartArea if we are a full width scale
					minSize.width = me.isFullWidth() ? me.maxWidth - me.margins.left - me.margins.right : me.maxWidth;
				} else {
					minSize.width = display && gridLineOpts.drawTicks ? tickMarkLength : 0;
				}
	
				// height
				if (isHorizontal) {
					minSize.height = display && gridLineOpts.drawTicks ? tickMarkLength : 0;
				} else {
					minSize.height = me.maxHeight; // fill all the height
				}
	
				// Are we showing a title for the scale?
				if (scaleLabelOpts.display && display) {
					if (isHorizontal) {
						minSize.height += (scaleLabelFontSize * 1.5);
					} else {
						minSize.width += (scaleLabelFontSize * 1.5);
					}
				}
	
				if (tickOpts.display && display) {
					// Don't bother fitting the ticks if we are not showing them
					if (!me.longestTextCache) {
						me.longestTextCache = {};
					}
	
					var largestTextWidth = helpers.longestText(me.ctx, tickLabelFont, me.ticks, me.longestTextCache);
					var tallestLabelHeightInLines = helpers.numberOfLabelLines(me.ticks);
					var lineSpace = tickFontSize * 0.5;
	
					if (isHorizontal) {
						// A horizontal axis is more constrained by the height.
						me.longestLabelWidth = largestTextWidth;
	
						// TODO - improve this calculation
						var labelHeight = (Math.sin(helpers.toRadians(me.labelRotation)) * me.longestLabelWidth) + (tickFontSize * tallestLabelHeightInLines) + (lineSpace * tallestLabelHeightInLines);
	
						minSize.height = Math.min(me.maxHeight, minSize.height + labelHeight);
						me.ctx.font = tickLabelFont;
	
						var firstLabelWidth = me.ctx.measureText(me.ticks[0]).width;
						var lastLabelWidth = me.ctx.measureText(me.ticks[me.ticks.length - 1]).width;
	
						// Ensure that our ticks are always inside the canvas. When rotated, ticks are right aligned which means that the right padding is dominated
						// by the font height
						var cosRotation = Math.cos(helpers.toRadians(me.labelRotation));
						var sinRotation = Math.sin(helpers.toRadians(me.labelRotation));
						me.paddingLeft = me.labelRotation !== 0 ? (cosRotation * firstLabelWidth) + 3 : firstLabelWidth / 2 + 3; // add 3 px to move away from canvas edges
						me.paddingRight = me.labelRotation !== 0 ? (sinRotation * (tickFontSize / 2)) + 3 : lastLabelWidth / 2 + 3; // when rotated
					} else {
						// A vertical axis is more constrained by the width. Labels are the dominant factor here, so get that length first
						var maxLabelWidth = me.maxWidth - minSize.width;
	
						// Account for padding
						var mirror = tickOpts.mirror;
						if (!mirror) {
							largestTextWidth += me.options.ticks.padding;
						} else {
							// If mirrored text is on the inside so don't expand
							largestTextWidth = 0;
						}
	
						if (largestTextWidth < maxLabelWidth) {
							// We don't need all the room
							minSize.width += largestTextWidth;
						} else {
							// Expand to max size
							minSize.width = me.maxWidth;
						}
	
						me.paddingTop = tickFontSize / 2;
						me.paddingBottom = tickFontSize / 2;
					}
				}
	
				if (me.margins) {
					me.paddingLeft = Math.max(me.paddingLeft - me.margins.left, 0);
					me.paddingTop = Math.max(me.paddingTop - me.margins.top, 0);
					me.paddingRight = Math.max(me.paddingRight - me.margins.right, 0);
					me.paddingBottom = Math.max(me.paddingBottom - me.margins.bottom, 0);
				}
	
				me.width = minSize.width;
				me.height = minSize.height;
	
			},
			afterFit: function() {
				helpers.callCallback(this.options.afterFit, [this]);
			},
	
			// Shared Methods
			isHorizontal: function() {
				return this.options.position === 'top' || this.options.position === 'bottom';
			},
			isFullWidth: function() {
				return (this.options.fullWidth);
			},
	
			// Get the correct value. NaN bad inputs, If the value type is object get the x or y based on whether we are horizontal or not
			getRightValue: function(rawValue) {
				// Null and undefined values first
				if (rawValue === null || typeof(rawValue) === 'undefined') {
					return NaN;
				}
				// isNaN(object) returns true, so make sure NaN is checking for a number
				if (typeof(rawValue) === 'number' && isNaN(rawValue)) {
					return NaN;
				}
				// If it is in fact an object, dive in one more level
				if (typeof(rawValue) === 'object') {
					if ((rawValue instanceof Date) || (rawValue.isValid)) {
						return rawValue;
					}
					return this.getRightValue(this.isHorizontal() ? rawValue.x : rawValue.y);
				}
	
				// Value is good, return it
				return rawValue;
			},
	
			// Used to get the value to display in the tooltip for the data at the given index
			// function getLabelForIndex(index, datasetIndex)
			getLabelForIndex: helpers.noop,
	
			// Used to get data value locations.  Value can either be an index or a numerical value
			getPixelForValue: helpers.noop,
	
			// Used to get the data value from a given pixel. This is the inverse of getPixelForValue
			getValueForPixel: helpers.noop,
	
			// Used for tick location, should
			getPixelForTick: function(index, includeOffset) {
				var me = this;
				if (me.isHorizontal()) {
					var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
					var tickWidth = innerWidth / Math.max((me.ticks.length - ((me.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
					var pixel = (tickWidth * index) + me.paddingLeft;
	
					if (includeOffset) {
						pixel += tickWidth / 2;
					}
	
					var finalVal = me.left + Math.round(pixel);
					finalVal += me.isFullWidth() ? me.margins.left : 0;
					return finalVal;
				}
				var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
				return me.top + (index * (innerHeight / (me.ticks.length - 1)));
			},
	
			// Utility for getting the pixel location of a percentage of scale
			getPixelForDecimal: function(decimal /* , includeOffset*/) {
				var me = this;
				if (me.isHorizontal()) {
					var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
					var valueOffset = (innerWidth * decimal) + me.paddingLeft;
	
					var finalVal = me.left + Math.round(valueOffset);
					finalVal += me.isFullWidth() ? me.margins.left : 0;
					return finalVal;
				}
				return me.top + (decimal * me.height);
			},
	
			getBasePixel: function() {
				var me = this;
				var min = me.min;
				var max = me.max;
	
				return me.getPixelForValue(
					me.beginAtZero? 0:
					min < 0 && max < 0? max :
					min > 0 && max > 0? min :
					0);
			},
	
			// Actualy draw the scale on the canvas
			// @param {rectangle} chartArea : the area of the chart to draw full grid lines on
			draw: function(chartArea) {
				var me = this;
				var options = me.options;
				if (!options.display) {
					return;
				}
	
				var context = me.ctx;
				var globalDefaults = Chart.defaults.global;
				var optionTicks = options.ticks;
				var gridLines = options.gridLines;
				var scaleLabel = options.scaleLabel;
	
				var isRotated = me.labelRotation !== 0;
				var skipRatio;
				var useAutoskipper = optionTicks.autoSkip;
				var isHorizontal = me.isHorizontal();
	
				// figure out the maximum number of gridlines to show
				var maxTicks;
				if (optionTicks.maxTicksLimit) {
					maxTicks = optionTicks.maxTicksLimit;
				}
	
				var tickFontColor = helpers.getValueOrDefault(optionTicks.fontColor, globalDefaults.defaultFontColor);
				var tickFontSize = helpers.getValueOrDefault(optionTicks.fontSize, globalDefaults.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(optionTicks.fontStyle, globalDefaults.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(optionTicks.fontFamily, globalDefaults.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
				var tl = gridLines.tickMarkLength;
				var borderDash = helpers.getValueOrDefault(gridLines.borderDash, globalDefaults.borderDash);
				var borderDashOffset = helpers.getValueOrDefault(gridLines.borderDashOffset, globalDefaults.borderDashOffset);
	
				var scaleLabelFontColor = helpers.getValueOrDefault(scaleLabel.fontColor, globalDefaults.defaultFontColor);
				var scaleLabelFontSize = helpers.getValueOrDefault(scaleLabel.fontSize, globalDefaults.defaultFontSize);
				var scaleLabelFontStyle = helpers.getValueOrDefault(scaleLabel.fontStyle, globalDefaults.defaultFontStyle);
				var scaleLabelFontFamily = helpers.getValueOrDefault(scaleLabel.fontFamily, globalDefaults.defaultFontFamily);
				var scaleLabelFont = helpers.fontString(scaleLabelFontSize, scaleLabelFontStyle, scaleLabelFontFamily);
	
				var labelRotationRadians = helpers.toRadians(me.labelRotation);
				var cosRotation = Math.cos(labelRotationRadians);
				var longestRotatedLabel = me.longestLabelWidth * cosRotation;
	
				// Make sure we draw text in the correct color and font
				context.fillStyle = tickFontColor;
	
				var itemsToDraw = [];
	
				if (isHorizontal) {
					skipRatio = false;
	
					// Only calculate the skip ratio with the half width of longestRotateLabel if we got an actual rotation
					// See #2584
					if (isRotated) {
						longestRotatedLabel /= 2;
					}
	
					if ((longestRotatedLabel + optionTicks.autoSkipPadding) * me.ticks.length > (me.width - (me.paddingLeft + me.paddingRight))) {
						skipRatio = 1 + Math.floor(((longestRotatedLabel + optionTicks.autoSkipPadding) * me.ticks.length) / (me.width - (me.paddingLeft + me.paddingRight)));
					}
	
					// if they defined a max number of optionTicks,
					// increase skipRatio until that number is met
					if (maxTicks && me.ticks.length > maxTicks) {
						while (!skipRatio || me.ticks.length / (skipRatio || 1) > maxTicks) {
							if (!skipRatio) {
								skipRatio = 1;
							}
							skipRatio += 1;
						}
					}
	
					if (!useAutoskipper) {
						skipRatio = false;
					}
				}
	
	
				var xTickStart = options.position === 'right' ? me.left : me.right - tl;
				var xTickEnd = options.position === 'right' ? me.left + tl : me.right;
				var yTickStart = options.position === 'bottom' ? me.top : me.bottom - tl;
				var yTickEnd = options.position === 'bottom' ? me.top + tl : me.bottom;
	
				helpers.each(me.ticks, function(label, index) {
					// If the callback returned a null or undefined value, do not draw this line
					if (label === undefined || label === null) {
						return;
					}
	
					var isLastTick = me.ticks.length === index + 1;
	
					// Since we always show the last tick,we need may need to hide the last shown one before
					var shouldSkip = (skipRatio > 1 && index % skipRatio > 0) || (index % skipRatio === 0 && index + skipRatio >= me.ticks.length);
					if (shouldSkip && !isLastTick || (label === undefined || label === null)) {
						return;
					}
	
					var lineWidth, lineColor;
					if (index === (typeof me.zeroLineIndex !== 'undefined' ? me.zeroLineIndex : 0)) {
						// Draw the first index specially
						lineWidth = gridLines.zeroLineWidth;
						lineColor = gridLines.zeroLineColor;
					} else {
						lineWidth = helpers.getValueAtIndexOrDefault(gridLines.lineWidth, index);
						lineColor = helpers.getValueAtIndexOrDefault(gridLines.color, index);
					}
	
					// Common properties
					var tx1, ty1, tx2, ty2, x1, y1, x2, y2, labelX, labelY;
					var textAlign = 'middle';
					var textBaseline = 'middle';
	
					if (isHorizontal) {
						if (!isRotated) {
							textBaseline = options.position === 'top' ? 'bottom' : 'top';
						}
	
						textAlign = isRotated ? 'right' : 'center';
	
						var xLineValue = me.getPixelForTick(index) + helpers.aliasPixel(lineWidth); // xvalues for grid lines
						labelX = me.getPixelForTick(index, gridLines.offsetGridLines) + optionTicks.labelOffset; // x values for optionTicks (need to consider offsetLabel option)
						labelY = (isRotated) ? me.top + 12 : options.position === 'top' ? me.bottom - tl : me.top + tl;
	
						tx1 = tx2 = x1 = x2 = xLineValue;
						ty1 = yTickStart;
						ty2 = yTickEnd;
						y1 = chartArea.top;
						y2 = chartArea.bottom;
					} else {
						if (options.position === 'left') {
							if (optionTicks.mirror) {
								labelX = me.right + optionTicks.padding;
								textAlign = 'left';
							} else {
								labelX = me.right - optionTicks.padding;
								textAlign = 'right';
							}
						// right side
						} else if (optionTicks.mirror) {
							labelX = me.left - optionTicks.padding;
							textAlign = 'right';
						} else {
							labelX = me.left + optionTicks.padding;
							textAlign = 'left';
						}
	
						var yLineValue = me.getPixelForTick(index); // xvalues for grid lines
						yLineValue += helpers.aliasPixel(lineWidth);
						labelY = me.getPixelForTick(index, gridLines.offsetGridLines);
	
						tx1 = xTickStart;
						tx2 = xTickEnd;
						x1 = chartArea.left;
						x2 = chartArea.right;
						ty1 = ty2 = y1 = y2 = yLineValue;
					}
	
					itemsToDraw.push({
						tx1: tx1,
						ty1: ty1,
						tx2: tx2,
						ty2: ty2,
						x1: x1,
						y1: y1,
						x2: x2,
						y2: y2,
						labelX: labelX,
						labelY: labelY,
						glWidth: lineWidth,
						glColor: lineColor,
						glBorderDash: borderDash,
						glBorderDashOffset: borderDashOffset,
						rotation: -1 * labelRotationRadians,
						label: label,
						textBaseline: textBaseline,
						textAlign: textAlign
					});
				});
	
				// Draw all of the tick labels, tick marks, and grid lines at the correct places
				helpers.each(itemsToDraw, function(itemToDraw) {
					if (gridLines.display) {
						context.save();
						context.lineWidth = itemToDraw.glWidth;
						context.strokeStyle = itemToDraw.glColor;
						if (context.setLineDash) {
							context.setLineDash(itemToDraw.glBorderDash);
							context.lineDashOffset = itemToDraw.glBorderDashOffset;
						}
	
						context.beginPath();
	
						if (gridLines.drawTicks) {
							context.moveTo(itemToDraw.tx1, itemToDraw.ty1);
							context.lineTo(itemToDraw.tx2, itemToDraw.ty2);
						}
	
						if (gridLines.drawOnChartArea) {
							context.moveTo(itemToDraw.x1, itemToDraw.y1);
							context.lineTo(itemToDraw.x2, itemToDraw.y2);
						}
	
						context.stroke();
						context.restore();
					}
	
					if (optionTicks.display) {
						context.save();
						context.translate(itemToDraw.labelX, itemToDraw.labelY);
						context.rotate(itemToDraw.rotation);
						context.font = tickLabelFont;
						context.textBaseline = itemToDraw.textBaseline;
						context.textAlign = itemToDraw.textAlign;
	
						var label = itemToDraw.label;
						if (helpers.isArray(label)) {
							for (var i = 0, y = -(label.length - 1)*tickFontSize*0.75; i < label.length; ++i) {
								// We just make sure the multiline element is a string here..
								context.fillText('' + label[i], 0, y);
								// apply same lineSpacing as calculated @ L#320
								y += (tickFontSize * 1.5);
							}
						} else {
							context.fillText(label, 0, 0);
						}
						context.restore();
					}
				});
	
				if (scaleLabel.display) {
					// Draw the scale label
					var scaleLabelX;
					var scaleLabelY;
					var rotation = 0;
	
					if (isHorizontal) {
						scaleLabelX = me.left + ((me.right - me.left) / 2); // midpoint of the width
						scaleLabelY = options.position === 'bottom' ? me.bottom - (scaleLabelFontSize / 2) : me.top + (scaleLabelFontSize / 2);
					} else {
						var isLeft = options.position === 'left';
						scaleLabelX = isLeft ? me.left + (scaleLabelFontSize / 2) : me.right - (scaleLabelFontSize / 2);
						scaleLabelY = me.top + ((me.bottom - me.top) / 2);
						rotation = isLeft ? -0.5 * Math.PI : 0.5 * Math.PI;
					}
	
					context.save();
					context.translate(scaleLabelX, scaleLabelY);
					context.rotate(rotation);
					context.textAlign = 'center';
					context.textBaseline = 'middle';
					context.fillStyle = scaleLabelFontColor; // render in correct colour
					context.font = scaleLabelFont;
					context.fillText(scaleLabel.labelString, 0, 0);
					context.restore();
				}
	
				if (gridLines.drawBorder) {
					// Draw the line at the edge of the axis
					context.lineWidth = helpers.getValueAtIndexOrDefault(gridLines.lineWidth, 0);
					context.strokeStyle = helpers.getValueAtIndexOrDefault(gridLines.color, 0);
					var x1 = me.left,
						x2 = me.right,
						y1 = me.top,
						y2 = me.bottom;
	
					var aliasPixel = helpers.aliasPixel(context.lineWidth);
					if (isHorizontal) {
						y1 = y2 = options.position === 'top' ? me.bottom : me.top;
						y1 += aliasPixel;
						y2 += aliasPixel;
					} else {
						x1 = x2 = options.position === 'left' ? me.right : me.left;
						x1 += aliasPixel;
						x2 += aliasPixel;
					}
	
					context.beginPath();
					context.moveTo(x1, y1);
					context.lineTo(x2, y2);
					context.stroke();
				}
			}
		});
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.global.title = {
			display: false,
			position: 'top',
			fullWidth: true, // marks that this box should take the full width of the canvas (pushing down other boxes)
	
			fontStyle: 'bold',
			padding: 10,
	
			// actual title
			text: ''
		};
	
		var noop = helpers.noop;
		Chart.Title = Chart.Element.extend({
	
			initialize: function(config) {
				var me = this;
				helpers.extend(me, config);
				me.options = helpers.configMerge(Chart.defaults.global.title, config.options);
	
				// Contains hit boxes for each dataset (in dataset order)
				me.legendHitBoxes = [];
			},
	
			// These methods are ordered by lifecyle. Utilities then follow.
	
			beforeUpdate: function() {
				var chartOpts = this.chart.options;
				if (chartOpts && chartOpts.title) {
					this.options = helpers.configMerge(Chart.defaults.global.title, chartOpts.title);
				}
			},
			update: function(maxWidth, maxHeight, margins) {
				var me = this;
	
				// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
				me.beforeUpdate();
	
				// Absorb the master measurements
				me.maxWidth = maxWidth;
				me.maxHeight = maxHeight;
				me.margins = margins;
	
				// Dimensions
				me.beforeSetDimensions();
				me.setDimensions();
				me.afterSetDimensions();
				// Labels
				me.beforeBuildLabels();
				me.buildLabels();
				me.afterBuildLabels();
	
				// Fit
				me.beforeFit();
				me.fit();
				me.afterFit();
				//
				me.afterUpdate();
	
				return me.minSize;
	
			},
			afterUpdate: noop,
	
			//
	
			beforeSetDimensions: noop,
			setDimensions: function() {
				var me = this;
				// Set the unconstrained dimension before label rotation
				if (me.isHorizontal()) {
					// Reset position before calculating rotation
					me.width = me.maxWidth;
					me.left = 0;
					me.right = me.width;
				} else {
					me.height = me.maxHeight;
	
					// Reset position before calculating rotation
					me.top = 0;
					me.bottom = me.height;
				}
	
				// Reset padding
				me.paddingLeft = 0;
				me.paddingTop = 0;
				me.paddingRight = 0;
				me.paddingBottom = 0;
	
				// Reset minSize
				me.minSize = {
					width: 0,
					height: 0
				};
			},
			afterSetDimensions: noop,
	
			//
	
			beforeBuildLabels: noop,
			buildLabels: noop,
			afterBuildLabels: noop,
	
			//
	
			beforeFit: noop,
			fit: function() {
				var me = this,
					valueOrDefault = helpers.getValueOrDefault,
					opts = me.options,
					globalDefaults = Chart.defaults.global,
					display = opts.display,
					fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize),
					minSize = me.minSize;
	
				if (me.isHorizontal()) {
					minSize.width = me.maxWidth; // fill all the width
					minSize.height = display ? fontSize + (opts.padding * 2) : 0;
				} else {
					minSize.width = display ? fontSize + (opts.padding * 2) : 0;
					minSize.height = me.maxHeight; // fill all the height
				}
	
				me.width = minSize.width;
				me.height = minSize.height;
	
			},
			afterFit: noop,
	
			// Shared Methods
			isHorizontal: function() {
				var pos = this.options.position;
				return pos === 'top' || pos === 'bottom';
			},
	
			// Actualy draw the title block on the canvas
			draw: function() {
				var me = this,
					ctx = me.ctx,
					valueOrDefault = helpers.getValueOrDefault,
					opts = me.options,
					globalDefaults = Chart.defaults.global;
	
				if (opts.display) {
					var fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize),
						fontStyle = valueOrDefault(opts.fontStyle, globalDefaults.defaultFontStyle),
						fontFamily = valueOrDefault(opts.fontFamily, globalDefaults.defaultFontFamily),
						titleFont = helpers.fontString(fontSize, fontStyle, fontFamily),
						rotation = 0,
						titleX,
						titleY,
						top = me.top,
						left = me.left,
						bottom = me.bottom,
						right = me.right;
	
					ctx.fillStyle = valueOrDefault(opts.fontColor, globalDefaults.defaultFontColor); // render in correct colour
					ctx.font = titleFont;
	
					// Horizontal
					if (me.isHorizontal()) {
						titleX = left + ((right - left) / 2); // midpoint of the width
						titleY = top + ((bottom - top) / 2); // midpoint of the height
					} else {
						titleX = opts.position === 'left' ? left + (fontSize / 2) : right - (fontSize / 2);
						titleY = top + ((bottom - top) / 2);
						rotation = Math.PI * (opts.position === 'left' ? -0.5 : 0.5);
					}
	
					ctx.save();
					ctx.translate(titleX, titleY);
					ctx.rotate(rotation);
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillText(opts.text, 0, 0);
					ctx.restore();
				}
			}
		});
	
		// Register the title plugin
		Chart.plugins.register({
			beforeInit: function(chartInstance) {
				var opts = chartInstance.options;
				var titleOpts = opts.title;
	
				if (titleOpts) {
					chartInstance.titleBlock = new Chart.Title({
						ctx: chartInstance.chart.ctx,
						options: titleOpts,
						chart: chartInstance
					});
	
					Chart.layoutService.addBox(chartInstance, chartInstance.titleBlock);
				}
			}
		});
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		var noop = helpers.noop;
	
		Chart.defaults.global.legend = {
	
			display: true,
			position: 'top',
			fullWidth: true, // marks that this box should take the full width of the canvas (pushing down other boxes)
			reverse: false,
	
			// a callback that will handle
			onClick: function(e, legendItem) {
				var index = legendItem.datasetIndex;
				var ci = this.chart;
				var meta = ci.getDatasetMeta(index);
	
				// See controller.isDatasetVisible comment
				meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;
	
				// We hid a dataset ... rerender the chart
				ci.update();
			},
	
			onHover: null,
	
			labels: {
				boxWidth: 40,
				padding: 10,
				// Generates labels shown in the legend
				// Valid properties to return:
				// text : text to display
				// fillStyle : fill of coloured box
				// strokeStyle: stroke of coloured box
				// hidden : if this legend item refers to a hidden item
				// lineCap : cap style for line
				// lineDash
				// lineDashOffset :
				// lineJoin :
				// lineWidth :
				generateLabels: function(chart) {
					var data = chart.data;
					return helpers.isArray(data.datasets) ? data.datasets.map(function(dataset, i) {
						return {
							text: dataset.label,
							fillStyle: (!helpers.isArray(dataset.backgroundColor) ? dataset.backgroundColor : dataset.backgroundColor[0]),
							hidden: !chart.isDatasetVisible(i),
							lineCap: dataset.borderCapStyle,
							lineDash: dataset.borderDash,
							lineDashOffset: dataset.borderDashOffset,
							lineJoin: dataset.borderJoinStyle,
							lineWidth: dataset.borderWidth,
							strokeStyle: dataset.borderColor,
							pointStyle: dataset.pointStyle,
	
							// Below is extra data used for toggling the datasets
							datasetIndex: i
						};
					}, this) : [];
				}
			}
		};
	
		Chart.Legend = Chart.Element.extend({
	
			initialize: function(config) {
				helpers.extend(this, config);
	
				// Contains hit boxes for each dataset (in dataset order)
				this.legendHitBoxes = [];
	
				// Are we in doughnut mode which has a different data type
				this.doughnutMode = false;
			},
	
			// These methods are ordered by lifecyle. Utilities then follow.
			// Any function defined here is inherited by all legend types.
			// Any function can be extended by the legend type
	
			beforeUpdate: noop,
			update: function(maxWidth, maxHeight, margins) {
				var me = this;
	
				// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
				me.beforeUpdate();
	
				// Absorb the master measurements
				me.maxWidth = maxWidth;
				me.maxHeight = maxHeight;
				me.margins = margins;
	
				// Dimensions
				me.beforeSetDimensions();
				me.setDimensions();
				me.afterSetDimensions();
				// Labels
				me.beforeBuildLabels();
				me.buildLabels();
				me.afterBuildLabels();
	
				// Fit
				me.beforeFit();
				me.fit();
				me.afterFit();
				//
				me.afterUpdate();
	
				return me.minSize;
			},
			afterUpdate: noop,
	
			//
	
			beforeSetDimensions: noop,
			setDimensions: function() {
				var me = this;
				// Set the unconstrained dimension before label rotation
				if (me.isHorizontal()) {
					// Reset position before calculating rotation
					me.width = me.maxWidth;
					me.left = 0;
					me.right = me.width;
				} else {
					me.height = me.maxHeight;
	
					// Reset position before calculating rotation
					me.top = 0;
					me.bottom = me.height;
				}
	
				// Reset padding
				me.paddingLeft = 0;
				me.paddingTop = 0;
				me.paddingRight = 0;
				me.paddingBottom = 0;
	
				// Reset minSize
				me.minSize = {
					width: 0,
					height: 0
				};
			},
			afterSetDimensions: noop,
	
			//
	
			beforeBuildLabels: noop,
			buildLabels: function() {
				var me = this;
				me.legendItems = me.options.labels.generateLabels.call(me, me.chart);
				if (me.options.reverse) {
					me.legendItems.reverse();
				}
			},
			afterBuildLabels: noop,
	
			//
	
			beforeFit: noop,
			fit: function() {
				var me = this;
				var opts = me.options;
				var labelOpts = opts.labels;
				var display = opts.display;
	
				var ctx = me.ctx;
	
				var globalDefault = Chart.defaults.global,
					itemOrDefault = helpers.getValueOrDefault,
					fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
					fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
					fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
					labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);
	
				// Reset hit boxes
				var hitboxes = me.legendHitBoxes = [];
	
				var minSize = me.minSize;
				var isHorizontal = me.isHorizontal();
	
				if (isHorizontal) {
					minSize.width = me.maxWidth; // fill all the width
					minSize.height = display ? 10 : 0;
				} else {
					minSize.width = display ? 10 : 0;
					minSize.height = me.maxHeight; // fill all the height
				}
	
				// Increase sizes here
				if (display) {
					ctx.font = labelFont;
	
					if (isHorizontal) {
						// Labels
	
						// Width of each line of legend boxes. Labels wrap onto multiple lines when there are too many to fit on one
						var lineWidths = me.lineWidths = [0];
						var totalHeight = me.legendItems.length ? fontSize + (labelOpts.padding) : 0;
	
						ctx.textAlign = 'left';
						ctx.textBaseline = 'top';
	
						helpers.each(me.legendItems, function(legendItem, i) {
							var boxWidth = labelOpts.usePointStyle ?
								fontSize * Math.sqrt(2) :
								labelOpts.boxWidth;
	
							var width = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;
							if (lineWidths[lineWidths.length - 1] + width + labelOpts.padding >= me.width) {
								totalHeight += fontSize + (labelOpts.padding);
								lineWidths[lineWidths.length] = me.left;
							}
	
							// Store the hitbox width and height here. Final position will be updated in `draw`
							hitboxes[i] = {
								left: 0,
								top: 0,
								width: width,
								height: fontSize
							};
	
							lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
						});
	
						minSize.height += totalHeight;
	
					} else {
						var vPadding = labelOpts.padding;
						var columnWidths = me.columnWidths = [];
						var totalWidth = labelOpts.padding;
						var currentColWidth = 0;
						var currentColHeight = 0;
						var itemHeight = fontSize + vPadding;
	
						helpers.each(me.legendItems, function(legendItem, i) {
							// If usePointStyle is set, multiple boxWidth by 2 since it represents
							// the radius and not truly the width
							var boxWidth = labelOpts.usePointStyle ? 2 * labelOpts.boxWidth : labelOpts.boxWidth;
	
							var itemWidth = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;
	
							// If too tall, go to new column
							if (currentColHeight + itemHeight > minSize.height) {
								totalWidth += currentColWidth + labelOpts.padding;
								columnWidths.push(currentColWidth); // previous column width
	
								currentColWidth = 0;
								currentColHeight = 0;
							}
	
							// Get max width
							currentColWidth = Math.max(currentColWidth, itemWidth);
							currentColHeight += itemHeight;
	
							// Store the hitbox width and height here. Final position will be updated in `draw`
							hitboxes[i] = {
								left: 0,
								top: 0,
								width: itemWidth,
								height: fontSize
							};
						});
	
						totalWidth += currentColWidth;
						columnWidths.push(currentColWidth);
						minSize.width += totalWidth;
					}
				}
	
				me.width = minSize.width;
				me.height = minSize.height;
			},
			afterFit: noop,
	
			// Shared Methods
			isHorizontal: function() {
				return this.options.position === 'top' || this.options.position === 'bottom';
			},
	
			// Actualy draw the legend on the canvas
			draw: function() {
				var me = this;
				var opts = me.options;
				var labelOpts = opts.labels;
				var globalDefault = Chart.defaults.global,
					lineDefault = globalDefault.elements.line,
					legendWidth = me.width,
					lineWidths = me.lineWidths;
	
				if (opts.display) {
					var ctx = me.ctx,
						cursor,
						itemOrDefault = helpers.getValueOrDefault,
						fontColor = itemOrDefault(labelOpts.fontColor, globalDefault.defaultFontColor),
						fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
						fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
						fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
						labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);
	
					// Canvas setup
					ctx.textAlign = 'left';
					ctx.textBaseline = 'top';
					ctx.lineWidth = 0.5;
					ctx.strokeStyle = fontColor; // for strikethrough effect
					ctx.fillStyle = fontColor; // render in correct colour
					ctx.font = labelFont;
	
					var boxWidth = labelOpts.boxWidth,
						hitboxes = me.legendHitBoxes;
	
					// current position
					var drawLegendBox = function(x, y, legendItem) {
						if (isNaN(boxWidth) || boxWidth <= 0) {
							return;
						}
	
						// Set the ctx for the box
						ctx.save();
	
						ctx.fillStyle = itemOrDefault(legendItem.fillStyle, globalDefault.defaultColor);
						ctx.lineCap = itemOrDefault(legendItem.lineCap, lineDefault.borderCapStyle);
						ctx.lineDashOffset = itemOrDefault(legendItem.lineDashOffset, lineDefault.borderDashOffset);
						ctx.lineJoin = itemOrDefault(legendItem.lineJoin, lineDefault.borderJoinStyle);
						ctx.lineWidth = itemOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
						ctx.strokeStyle = itemOrDefault(legendItem.strokeStyle, globalDefault.defaultColor);
						var isLineWidthZero = (itemOrDefault(legendItem.lineWidth, lineDefault.borderWidth) === 0);
	
						if (ctx.setLineDash) {
							// IE 9 and 10 do not support line dash
							ctx.setLineDash(itemOrDefault(legendItem.lineDash, lineDefault.borderDash));
						}
	
						if (opts.labels && opts.labels.usePointStyle) {
							// Recalulate x and y for drawPoint() because its expecting
							// x and y to be center of figure (instead of top left)
							var radius = fontSize * Math.SQRT2 / 2;
							var offSet = radius / Math.SQRT2;
							var centerX = x + offSet;
							var centerY = y + offSet;
	
							// Draw pointStyle as legend symbol
							Chart.canvasHelpers.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY);
						} else {
							// Draw box as legend symbol
							if (!isLineWidthZero) {
								ctx.strokeRect(x, y, boxWidth, fontSize);
							}
							ctx.fillRect(x, y, boxWidth, fontSize);
						}
	
						ctx.restore();
					};
					var fillText = function(x, y, legendItem, textWidth) {
						ctx.fillText(legendItem.text, boxWidth + (fontSize / 2) + x, y);
	
						if (legendItem.hidden) {
							// Strikethrough the text if hidden
							ctx.beginPath();
							ctx.lineWidth = 2;
							ctx.moveTo(boxWidth + (fontSize / 2) + x, y + (fontSize / 2));
							ctx.lineTo(boxWidth + (fontSize / 2) + x + textWidth, y + (fontSize / 2));
							ctx.stroke();
						}
					};
	
					// Horizontal
					var isHorizontal = me.isHorizontal();
					if (isHorizontal) {
						cursor = {
							x: me.left + ((legendWidth - lineWidths[0]) / 2),
							y: me.top + labelOpts.padding,
							line: 0
						};
					} else {
						cursor = {
							x: me.left + labelOpts.padding,
							y: me.top + labelOpts.padding,
							line: 0
						};
					}
	
					var itemHeight = fontSize + labelOpts.padding;
					helpers.each(me.legendItems, function(legendItem, i) {
						var textWidth = ctx.measureText(legendItem.text).width,
							width = labelOpts.usePointStyle ?
								fontSize + (fontSize / 2) + textWidth :
								boxWidth + (fontSize / 2) + textWidth,
							x = cursor.x,
							y = cursor.y;
	
						if (isHorizontal) {
							if (x + width >= legendWidth) {
								y = cursor.y += itemHeight;
								cursor.line++;
								x = cursor.x = me.left + ((legendWidth - lineWidths[cursor.line]) / 2);
							}
						} else if (y + itemHeight > me.bottom) {
							x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
							y = cursor.y = me.top;
							cursor.line++;
						}
	
						drawLegendBox(x, y, legendItem);
	
						hitboxes[i].left = x;
						hitboxes[i].top = y;
	
						// Fill the actual label
						fillText(x, y, legendItem, textWidth);
	
						if (isHorizontal) {
							cursor.x += width + (labelOpts.padding);
						} else {
							cursor.y += itemHeight;
						}
	
					});
				}
			},
	
			// Handle an event
			handleEvent: function(e) {
				var me = this;
				var opts = me.options;
				var type = e.type === 'mouseup' ? 'click' : e.type;
	
				if (type === 'mousemove') {
					if (!opts.onHover) {
						return;
					}
				} else if (type === 'click') {
					if (!opts.onClick) {
						return;
					}
				} else {
					return;
				}
	
				var position = helpers.getRelativePosition(e, me.chart.chart),
					x = position.x,
					y = position.y;
	
				if (x >= me.left && x <= me.right && y >= me.top && y <= me.bottom) {
					// See if we are touching one of the dataset boxes
					var lh = me.legendHitBoxes;
					for (var i = 0; i < lh.length; ++i) {
						var hitBox = lh[i];
	
						if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
							// Touching an element
							if (type === 'click') {
								opts.onClick.call(me, e, me.legendItems[i]);
								break;
							} else if (type === 'mousemove') {
								opts.onHover.call(me, e, me.legendItems[i]);
								break;
							}
						}
					}
				}
			}
		});
	
		// Register the legend plugin
		Chart.plugins.register({
			beforeInit: function(chartInstance) {
				var opts = chartInstance.options;
				var legendOpts = opts.legend;
	
				if (legendOpts) {
					chartInstance.legend = new Chart.Legend({
						ctx: chartInstance.chart.ctx,
						options: legendOpts,
						chart: chartInstance
					});
	
					Chart.layoutService.addBox(chartInstance, chartInstance.legend);
				}
			}
		});
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.global.tooltips = {
			enabled: true,
			custom: null,
			mode: 'single',
			backgroundColor: 'rgba(0,0,0,0.8)',
			titleFontStyle: 'bold',
			titleSpacing: 2,
			titleMarginBottom: 6,
			titleFontColor: '#fff',
			titleAlign: 'left',
			bodySpacing: 2,
			bodyFontColor: '#fff',
			bodyAlign: 'left',
			footerFontStyle: 'bold',
			footerSpacing: 2,
			footerMarginTop: 6,
			footerFontColor: '#fff',
			footerAlign: 'left',
			yPadding: 6,
			xPadding: 6,
			yAlign: 'center',
			xAlign: 'center',
			caretSize: 5,
			cornerRadius: 6,
			multiKeyBackground: '#fff',
			callbacks: {
				// Args are: (tooltipItems, data)
				beforeTitle: helpers.noop,
				title: function(tooltipItems, data) {
					// Pick first xLabel for now
					var title = '';
					var labels = data.labels;
					var labelCount = labels ? labels.length : 0;
	
					if (tooltipItems.length > 0) {
						var item = tooltipItems[0];
	
						if (item.xLabel) {
							title = item.xLabel;
						} else if (labelCount > 0 && item.index < labelCount) {
							title = labels[item.index];
						}
					}
	
					return title;
				},
				afterTitle: helpers.noop,
	
				// Args are: (tooltipItems, data)
				beforeBody: helpers.noop,
	
				// Args are: (tooltipItem, data)
				beforeLabel: helpers.noop,
				label: function(tooltipItem, data) {
					var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
					return datasetLabel + ': ' + tooltipItem.yLabel;
				},
				labelColor: function(tooltipItem, chartInstance) {
					var meta = chartInstance.getDatasetMeta(tooltipItem.datasetIndex);
					var activeElement = meta.data[tooltipItem.index];
					var view = activeElement._view;
					return {
						borderColor: view.borderColor,
						backgroundColor: view.backgroundColor
					};
				},
				afterLabel: helpers.noop,
	
				// Args are: (tooltipItems, data)
				afterBody: helpers.noop,
	
				// Args are: (tooltipItems, data)
				beforeFooter: helpers.noop,
				footer: helpers.noop,
				afterFooter: helpers.noop
			}
		};
	
		// Helper to push or concat based on if the 2nd parameter is an array or not
		function pushOrConcat(base, toPush) {
			if (toPush) {
				if (helpers.isArray(toPush)) {
					// base = base.concat(toPush);
					Array.prototype.push.apply(base, toPush);
				} else {
					base.push(toPush);
				}
			}
	
			return base;
		}
	
		function getAveragePosition(elements) {
			if (!elements.length) {
				return false;
			}
	
			var i, len;
			var xPositions = [];
			var yPositions = [];
	
			for (i = 0, len = elements.length; i < len; ++i) {
				var el = elements[i];
				if (el && el.hasValue()) {
					var pos = el.tooltipPosition();
					xPositions.push(pos.x);
					yPositions.push(pos.y);
				}
			}
	
			var x = 0,
				y = 0;
			for (i = 0; i < xPositions.length; ++i) {
				if (xPositions[i]) {
					x += xPositions[i];
					y += yPositions[i];
				}
			}
	
			return {
				x: Math.round(x / xPositions.length),
				y: Math.round(y / xPositions.length)
			};
		}
	
		// Private helper to create a tooltip iteam model
		// @param element : the chart element (point, arc, bar) to create the tooltip item for
		// @return : new tooltip item
		function createTooltipItem(element) {
			var xScale = element._xScale;
			var yScale = element._yScale || element._scale; // handle radar || polarArea charts
			var index = element._index,
				datasetIndex = element._datasetIndex;
	
			return {
				xLabel: xScale ? xScale.getLabelForIndex(index, datasetIndex) : '',
				yLabel: yScale ? yScale.getLabelForIndex(index, datasetIndex) : '',
				index: index,
				datasetIndex: datasetIndex
			};
		}
	
		Chart.Tooltip = Chart.Element.extend({
			initialize: function() {
				var me = this;
				var globalDefaults = Chart.defaults.global;
				var tooltipOpts = me._options;
				var getValueOrDefault = helpers.getValueOrDefault;
	
				helpers.extend(me, {
					_model: {
						// Positioning
						xPadding: tooltipOpts.xPadding,
						yPadding: tooltipOpts.yPadding,
						xAlign: tooltipOpts.xAlign,
						yAlign: tooltipOpts.yAlign,
	
						// Body
						bodyFontColor: tooltipOpts.bodyFontColor,
						_bodyFontFamily: getValueOrDefault(tooltipOpts.bodyFontFamily, globalDefaults.defaultFontFamily),
						_bodyFontStyle: getValueOrDefault(tooltipOpts.bodyFontStyle, globalDefaults.defaultFontStyle),
						_bodyAlign: tooltipOpts.bodyAlign,
						bodyFontSize: getValueOrDefault(tooltipOpts.bodyFontSize, globalDefaults.defaultFontSize),
						bodySpacing: tooltipOpts.bodySpacing,
	
						// Title
						titleFontColor: tooltipOpts.titleFontColor,
						_titleFontFamily: getValueOrDefault(tooltipOpts.titleFontFamily, globalDefaults.defaultFontFamily),
						_titleFontStyle: getValueOrDefault(tooltipOpts.titleFontStyle, globalDefaults.defaultFontStyle),
						titleFontSize: getValueOrDefault(tooltipOpts.titleFontSize, globalDefaults.defaultFontSize),
						_titleAlign: tooltipOpts.titleAlign,
						titleSpacing: tooltipOpts.titleSpacing,
						titleMarginBottom: tooltipOpts.titleMarginBottom,
	
						// Footer
						footerFontColor: tooltipOpts.footerFontColor,
						_footerFontFamily: getValueOrDefault(tooltipOpts.footerFontFamily, globalDefaults.defaultFontFamily),
						_footerFontStyle: getValueOrDefault(tooltipOpts.footerFontStyle, globalDefaults.defaultFontStyle),
						footerFontSize: getValueOrDefault(tooltipOpts.footerFontSize, globalDefaults.defaultFontSize),
						_footerAlign: tooltipOpts.footerAlign,
						footerSpacing: tooltipOpts.footerSpacing,
						footerMarginTop: tooltipOpts.footerMarginTop,
	
						// Appearance
						caretSize: tooltipOpts.caretSize,
						cornerRadius: tooltipOpts.cornerRadius,
						backgroundColor: tooltipOpts.backgroundColor,
						opacity: 0,
						legendColorBackground: tooltipOpts.multiKeyBackground
					}
				});
			},
	
			// Get the title
			// Args are: (tooltipItem, data)
			getTitle: function() {
				var me = this;
				var opts = me._options;
				var callbacks = opts.callbacks;
	
				var beforeTitle = callbacks.beforeTitle.apply(me, arguments),
					title = callbacks.title.apply(me, arguments),
					afterTitle = callbacks.afterTitle.apply(me, arguments);
	
				var lines = [];
				lines = pushOrConcat(lines, beforeTitle);
				lines = pushOrConcat(lines, title);
				lines = pushOrConcat(lines, afterTitle);
	
				return lines;
			},
	
			// Args are: (tooltipItem, data)
			getBeforeBody: function() {
				var lines = this._options.callbacks.beforeBody.apply(this, arguments);
				return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
			},
	
			// Args are: (tooltipItem, data)
			getBody: function(tooltipItems, data) {
				var me = this;
				var callbacks = me._options.callbacks;
				var bodyItems = [];
	
				helpers.each(tooltipItems, function(tooltipItem) {
					var bodyItem = {
						before: [],
						lines: [],
						after: []
					};
					pushOrConcat(bodyItem.before, callbacks.beforeLabel.call(me, tooltipItem, data));
					pushOrConcat(bodyItem.lines, callbacks.label.call(me, tooltipItem, data));
					pushOrConcat(bodyItem.after, callbacks.afterLabel.call(me, tooltipItem, data));
	
					bodyItems.push(bodyItem);
				});
	
				return bodyItems;
			},
	
			// Args are: (tooltipItem, data)
			getAfterBody: function() {
				var lines = this._options.callbacks.afterBody.apply(this, arguments);
				return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
			},
	
			// Get the footer and beforeFooter and afterFooter lines
			// Args are: (tooltipItem, data)
			getFooter: function() {
				var me = this;
				var callbacks = me._options.callbacks;
	
				var beforeFooter = callbacks.beforeFooter.apply(me, arguments);
				var footer = callbacks.footer.apply(me, arguments);
				var afterFooter = callbacks.afterFooter.apply(me, arguments);
	
				var lines = [];
				lines = pushOrConcat(lines, beforeFooter);
				lines = pushOrConcat(lines, footer);
				lines = pushOrConcat(lines, afterFooter);
	
				return lines;
			},
	
			update: function(changed) {
				var me = this;
				var opts = me._options;
				var model = me._model;
				var active = me._active;
	
				var data = me._data;
				var chartInstance = me._chartInstance;
	
				var i, len;
	
				if (active.length) {
					model.opacity = 1;
	
					var labelColors = [],
						tooltipPosition = getAveragePosition(active);
	
					var tooltipItems = [];
					for (i = 0, len = active.length; i < len; ++i) {
						tooltipItems.push(createTooltipItem(active[i]));
					}
	
					// If the user provided a sorting function, use it to modify the tooltip items
					if (opts.itemSort) {
						tooltipItems = tooltipItems.sort(function(a, b) {
							return opts.itemSort(a, b, data);
						});
					}
	
					// If there is more than one item, show color items
					if (active.length > 1) {
						helpers.each(tooltipItems, function(tooltipItem) {
							labelColors.push(opts.callbacks.labelColor.call(me, tooltipItem, chartInstance));
						});
					}
	
					// Build the Text Lines
					helpers.extend(model, {
						title: me.getTitle(tooltipItems, data),
						beforeBody: me.getBeforeBody(tooltipItems, data),
						body: me.getBody(tooltipItems, data),
						afterBody: me.getAfterBody(tooltipItems, data),
						footer: me.getFooter(tooltipItems, data),
						x: Math.round(tooltipPosition.x),
						y: Math.round(tooltipPosition.y),
						caretPadding: helpers.getValueOrDefault(tooltipPosition.padding, 2),
						labelColors: labelColors
					});
	
					// We need to determine alignment of
					var tooltipSize = me.getTooltipSize(model);
					me.determineAlignment(tooltipSize); // Smart Tooltip placement to stay on the canvas
	
					helpers.extend(model, me.getBackgroundPoint(model, tooltipSize));
				} else {
					me._model.opacity = 0;
				}
	
				if (changed && opts.custom) {
					opts.custom.call(me, model);
				}
	
				return me;
			},
			getTooltipSize: function(vm) {
				var ctx = this._chart.ctx;
	
				var size = {
					height: vm.yPadding * 2, // Tooltip Padding
					width: 0
				};
	
				// Count of all lines in the body
				var body = vm.body;
				var combinedBodyLength = body.reduce(function(count, bodyItem) {
					return count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length;
				}, 0);
				combinedBodyLength += vm.beforeBody.length + vm.afterBody.length;
	
				var titleLineCount = vm.title.length;
				var footerLineCount = vm.footer.length;
				var titleFontSize = vm.titleFontSize,
					bodyFontSize = vm.bodyFontSize,
					footerFontSize = vm.footerFontSize;
	
				size.height += titleLineCount * titleFontSize; // Title Lines
				size.height += (titleLineCount - 1) * vm.titleSpacing; // Title Line Spacing
				size.height += titleLineCount ? vm.titleMarginBottom : 0; // Title's bottom Margin
				size.height += combinedBodyLength * bodyFontSize; // Body Lines
				size.height += combinedBodyLength ? (combinedBodyLength - 1) * vm.bodySpacing : 0; // Body Line Spacing
				size.height += footerLineCount ? vm.footerMarginTop : 0; // Footer Margin
				size.height += footerLineCount * (footerFontSize); // Footer Lines
				size.height += footerLineCount ? (footerLineCount - 1) * vm.footerSpacing : 0; // Footer Line Spacing
	
				// Title width
				var widthPadding = 0;
				var maxLineWidth = function(line) {
					size.width = Math.max(size.width, ctx.measureText(line).width + widthPadding);
				};
	
				ctx.font = helpers.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
				helpers.each(vm.title, maxLineWidth);
	
				// Body width
				ctx.font = helpers.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
				helpers.each(vm.beforeBody.concat(vm.afterBody), maxLineWidth);
	
				// Body lines may include some extra width due to the color box
				widthPadding = body.length > 1 ? (bodyFontSize + 2) : 0;
				helpers.each(body, function(bodyItem) {
					helpers.each(bodyItem.before, maxLineWidth);
					helpers.each(bodyItem.lines, maxLineWidth);
					helpers.each(bodyItem.after, maxLineWidth);
				});
	
				// Reset back to 0
				widthPadding = 0;
	
				// Footer width
				ctx.font = helpers.fontString(footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
				helpers.each(vm.footer, maxLineWidth);
	
				// Add padding
				size.width += 2 * vm.xPadding;
	
				return size;
			},
			determineAlignment: function(size) {
				var me = this;
				var model = me._model;
				var chart = me._chart;
				var chartArea = me._chartInstance.chartArea;
	
				if (model.y < size.height) {
					model.yAlign = 'top';
				} else if (model.y > (chart.height - size.height)) {
					model.yAlign = 'bottom';
				}
	
				var lf, rf; // functions to determine left, right alignment
				var olf, orf; // functions to determine if left/right alignment causes tooltip to go outside chart
				var yf; // function to get the y alignment if the tooltip goes outside of the left or right edges
				var midX = (chartArea.left + chartArea.right) / 2;
				var midY = (chartArea.top + chartArea.bottom) / 2;
	
				if (model.yAlign === 'center') {
					lf = function(x) {
						return x <= midX;
					};
					rf = function(x) {
						return x > midX;
					};
				} else {
					lf = function(x) {
						return x <= (size.width / 2);
					};
					rf = function(x) {
						return x >= (chart.width - (size.width / 2));
					};
				}
	
				olf = function(x) {
					return x + size.width > chart.width;
				};
				orf = function(x) {
					return x - size.width < 0;
				};
				yf = function(y) {
					return y <= midY ? 'top' : 'bottom';
				};
	
				if (lf(model.x)) {
					model.xAlign = 'left';
	
					// Is tooltip too wide and goes over the right side of the chart.?
					if (olf(model.x)) {
						model.xAlign = 'center';
						model.yAlign = yf(model.y);
					}
				} else if (rf(model.x)) {
					model.xAlign = 'right';
	
					// Is tooltip too wide and goes outside left edge of canvas?
					if (orf(model.x)) {
						model.xAlign = 'center';
						model.yAlign = yf(model.y);
					}
				}
			},
			getBackgroundPoint: function(vm, size) {
				// Background Position
				var pt = {
					x: vm.x,
					y: vm.y
				};
	
				var caretSize = vm.caretSize,
					caretPadding = vm.caretPadding,
					cornerRadius = vm.cornerRadius,
					xAlign = vm.xAlign,
					yAlign = vm.yAlign,
					paddingAndSize = caretSize + caretPadding,
					radiusAndPadding = cornerRadius + caretPadding;
	
				if (xAlign === 'right') {
					pt.x -= size.width;
				} else if (xAlign === 'center') {
					pt.x -= (size.width / 2);
				}
	
				if (yAlign === 'top') {
					pt.y += paddingAndSize;
				} else if (yAlign === 'bottom') {
					pt.y -= size.height + paddingAndSize;
				} else {
					pt.y -= (size.height / 2);
				}
	
				if (yAlign === 'center') {
					if (xAlign === 'left') {
						pt.x += paddingAndSize;
					} else if (xAlign === 'right') {
						pt.x -= paddingAndSize;
					}
				} else if (xAlign === 'left') {
					pt.x -= radiusAndPadding;
				} else if (xAlign === 'right') {
					pt.x += radiusAndPadding;
				}
	
				return pt;
			},
			drawCaret: function(tooltipPoint, size, opacity) {
				var vm = this._view;
				var ctx = this._chart.ctx;
				var x1, x2, x3;
				var y1, y2, y3;
				var caretSize = vm.caretSize;
				var cornerRadius = vm.cornerRadius;
				var xAlign = vm.xAlign,
					yAlign = vm.yAlign;
				var ptX = tooltipPoint.x,
					ptY = tooltipPoint.y;
				var width = size.width,
					height = size.height;
	
				if (yAlign === 'center') {
					// Left or right side
					if (xAlign === 'left') {
						x1 = ptX;
						x2 = x1 - caretSize;
						x3 = x1;
					} else {
						x1 = ptX + width;
						x2 = x1 + caretSize;
						x3 = x1;
					}
	
					y2 = ptY + (height / 2);
					y1 = y2 - caretSize;
					y3 = y2 + caretSize;
				} else {
					if (xAlign === 'left') {
						x1 = ptX + cornerRadius;
						x2 = x1 + caretSize;
						x3 = x2 + caretSize;
					} else if (xAlign === 'right') {
						x1 = ptX + width - cornerRadius;
						x2 = x1 - caretSize;
						x3 = x2 - caretSize;
					} else {
						x2 = ptX + (width / 2);
						x1 = x2 - caretSize;
						x3 = x2 + caretSize;
					}
	
					if (yAlign === 'top') {
						y1 = ptY;
						y2 = y1 - caretSize;
						y3 = y1;
					} else {
						y1 = ptY + height;
						y2 = y1 + caretSize;
						y3 = y1;
					}
				}
	
				var bgColor = helpers.color(vm.backgroundColor);
				ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.lineTo(x3, y3);
				ctx.closePath();
				ctx.fill();
			},
			drawTitle: function(pt, vm, ctx, opacity) {
				var title = vm.title;
	
				if (title.length) {
					ctx.textAlign = vm._titleAlign;
					ctx.textBaseline = 'top';
	
					var titleFontSize = vm.titleFontSize,
						titleSpacing = vm.titleSpacing;
	
					var titleFontColor = helpers.color(vm.titleFontColor);
					ctx.fillStyle = titleFontColor.alpha(opacity * titleFontColor.alpha()).rgbString();
					ctx.font = helpers.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
	
					var i, len;
					for (i = 0, len = title.length; i < len; ++i) {
						ctx.fillText(title[i], pt.x, pt.y);
						pt.y += titleFontSize + titleSpacing; // Line Height and spacing
	
						if (i + 1 === title.length) {
							pt.y += vm.titleMarginBottom - titleSpacing; // If Last, add margin, remove spacing
						}
					}
				}
			},
			drawBody: function(pt, vm, ctx, opacity) {
				var bodyFontSize = vm.bodyFontSize;
				var bodySpacing = vm.bodySpacing;
				var body = vm.body;
	
				ctx.textAlign = vm._bodyAlign;
				ctx.textBaseline = 'top';
	
				var bodyFontColor = helpers.color(vm.bodyFontColor);
				var textColor = bodyFontColor.alpha(opacity * bodyFontColor.alpha()).rgbString();
				ctx.fillStyle = textColor;
				ctx.font = helpers.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
	
				// Before Body
				var xLinePadding = 0;
				var fillLineOfText = function(line) {
					ctx.fillText(line, pt.x + xLinePadding, pt.y);
					pt.y += bodyFontSize + bodySpacing;
				};
	
				// Before body lines
				helpers.each(vm.beforeBody, fillLineOfText);
	
				var drawColorBoxes = body.length > 1;
				xLinePadding = drawColorBoxes ? (bodyFontSize + 2) : 0;
	
				// Draw body lines now
				helpers.each(body, function(bodyItem, i) {
					helpers.each(bodyItem.before, fillLineOfText);
	
					helpers.each(bodyItem.lines, function(line) {
						// Draw Legend-like boxes if needed
						if (drawColorBoxes) {
							// Fill a white rect so that colours merge nicely if the opacity is < 1
							ctx.fillStyle = helpers.color(vm.legendColorBackground).alpha(opacity).rgbaString();
							ctx.fillRect(pt.x, pt.y, bodyFontSize, bodyFontSize);
	
							// Border
							ctx.strokeStyle = helpers.color(vm.labelColors[i].borderColor).alpha(opacity).rgbaString();
							ctx.strokeRect(pt.x, pt.y, bodyFontSize, bodyFontSize);
	
							// Inner square
							ctx.fillStyle = helpers.color(vm.labelColors[i].backgroundColor).alpha(opacity).rgbaString();
							ctx.fillRect(pt.x + 1, pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);
	
							ctx.fillStyle = textColor;
						}
	
						fillLineOfText(line);
					});
	
					helpers.each(bodyItem.after, fillLineOfText);
				});
	
				// Reset back to 0 for after body
				xLinePadding = 0;
	
				// After body lines
				helpers.each(vm.afterBody, fillLineOfText);
				pt.y -= bodySpacing; // Remove last body spacing
			},
			drawFooter: function(pt, vm, ctx, opacity) {
				var footer = vm.footer;
	
				if (footer.length) {
					pt.y += vm.footerMarginTop;
	
					ctx.textAlign = vm._footerAlign;
					ctx.textBaseline = 'top';
	
					var footerFontColor = helpers.color(vm.footerFontColor);
					ctx.fillStyle = footerFontColor.alpha(opacity * footerFontColor.alpha()).rgbString();
					ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
	
					helpers.each(footer, function(line) {
						ctx.fillText(line, pt.x, pt.y);
						pt.y += vm.footerFontSize + vm.footerSpacing;
					});
				}
			},
			draw: function() {
				var ctx = this._chart.ctx;
				var vm = this._view;
	
				if (vm.opacity === 0) {
					return;
				}
	
				var tooltipSize = this.getTooltipSize(vm);
				var pt = {
					x: vm.x,
					y: vm.y
				};
	
				// IE11/Edge does not like very small opacities, so snap to 0
				var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity;
	
				if (this._options.enabled) {
					// Draw Background
					var bgColor = helpers.color(vm.backgroundColor);
					ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
					helpers.drawRoundedRectangle(ctx, pt.x, pt.y, tooltipSize.width, tooltipSize.height, vm.cornerRadius);
					ctx.fill();
	
					// Draw Caret
					this.drawCaret(pt, tooltipSize, opacity);
	
					// Draw Title, Body, and Footer
					pt.x += vm.xPadding;
					pt.y += vm.yPadding;
	
					// Titles
					this.drawTitle(pt, vm, ctx, opacity);
	
					// Body
					this.drawBody(pt, vm, ctx, opacity);
	
					// Footer
					this.drawFooter(pt, vm, ctx, opacity);
				}
			}
		});
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers,
			globalOpts = Chart.defaults.global;
	
		globalOpts.elements.arc = {
			backgroundColor: globalOpts.defaultColor,
			borderColor: '#fff',
			borderWidth: 2
		};
	
		Chart.elements.Arc = Chart.Element.extend({
			inLabelRange: function(mouseX) {
				var vm = this._view;
	
				if (vm) {
					return (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2));
				}
				return false;
			},
			inRange: function(chartX, chartY) {
				var vm = this._view;
	
				if (vm) {
					var pointRelativePosition = helpers.getAngleFromPoint(vm, {
							x: chartX,
							y: chartY
						}),
						angle = pointRelativePosition.angle,
						distance = pointRelativePosition.distance;
	
					// Sanitise angle range
					var startAngle = vm.startAngle;
					var endAngle = vm.endAngle;
					while (endAngle < startAngle) {
						endAngle += 2.0 * Math.PI;
					}
					while (angle > endAngle) {
						angle -= 2.0 * Math.PI;
					}
					while (angle < startAngle) {
						angle += 2.0 * Math.PI;
					}
	
					// Check if within the range of the open/close angle
					var betweenAngles = (angle >= startAngle && angle <= endAngle),
						withinRadius = (distance >= vm.innerRadius && distance <= vm.outerRadius);
	
					return (betweenAngles && withinRadius);
				}
				return false;
			},
			tooltipPosition: function() {
				var vm = this._view;
	
				var centreAngle = vm.startAngle + ((vm.endAngle - vm.startAngle) / 2),
					rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;
				return {
					x: vm.x + (Math.cos(centreAngle) * rangeFromCentre),
					y: vm.y + (Math.sin(centreAngle) * rangeFromCentre)
				};
			},
			draw: function() {
	
				var ctx = this._chart.ctx,
					vm = this._view,
					sA = vm.startAngle,
					eA = vm.endAngle;
	
				ctx.beginPath();
	
				ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
				ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);
	
				ctx.closePath();
				ctx.strokeStyle = vm.borderColor;
				ctx.lineWidth = vm.borderWidth;
	
				ctx.fillStyle = vm.backgroundColor;
	
				ctx.fill();
				ctx.lineJoin = 'bevel';
	
				if (vm.borderWidth) {
					ctx.stroke();
				}
			}
		});
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		var globalDefaults = Chart.defaults.global;
	
		Chart.defaults.global.elements.line = {
			tension: 0.4,
			backgroundColor: globalDefaults.defaultColor,
			borderWidth: 3,
			borderColor: globalDefaults.defaultColor,
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			capBezierPoints: true,
			fill: true // do we fill in the area between the line and its base axis
		};
	
		Chart.elements.Line = Chart.Element.extend({
			draw: function() {
				var me = this;
				var vm = me._view;
				var spanGaps = vm.spanGaps;
				var scaleZero = vm.scaleZero;
				var loop = me._loop;
	
				var ctx = me._chart.ctx;
				ctx.save();
	
				// Helper function to draw a line to a point
				function lineToPoint(previousPoint, point) {
					var pointVM = point._view;
					if (point._view.steppedLine === true) {
						ctx.lineTo(pointVM.x, previousPoint._view.y);
						ctx.lineTo(pointVM.x, pointVM.y);
					} else if (point._view.tension === 0) {
						ctx.lineTo(pointVM.x, pointVM.y);
					} else {
						ctx.bezierCurveTo(
							previousPoint._view.controlPointNextX,
							previousPoint._view.controlPointNextY,
							pointVM.controlPointPreviousX,
							pointVM.controlPointPreviousY,
							pointVM.x,
							pointVM.y
						);
					}
				}
	
				var points = me._children.slice(); // clone array
				var lastDrawnIndex = -1;
	
				// If we are looping, adding the first point again
				if (loop && points.length) {
					points.push(points[0]);
				}
	
				var index, current, previous, currentVM;
	
				// Fill Line
				if (points.length && vm.fill) {
					ctx.beginPath();
	
					for (index = 0; index < points.length; ++index) {
						current = points[index];
						previous = helpers.previousItem(points, index);
						currentVM = current._view;
	
						// First point moves to it's starting position no matter what
						if (index === 0) {
							if (loop) {
								ctx.moveTo(scaleZero.x, scaleZero.y);
							} else {
								ctx.moveTo(currentVM.x, scaleZero);
							}
	
							if (!currentVM.skip) {
								lastDrawnIndex = index;
								ctx.lineTo(currentVM.x, currentVM.y);
							}
						} else {
							previous = lastDrawnIndex === -1 ? previous : points[lastDrawnIndex];
	
							if (currentVM.skip) {
								// Only do this if this is the first point that is skipped
								if (!spanGaps && lastDrawnIndex === (index - 1)) {
									if (loop) {
										ctx.lineTo(scaleZero.x, scaleZero.y);
									} else {
										ctx.lineTo(previous._view.x, scaleZero);
									}
								}
							} else {
								if (lastDrawnIndex !== (index - 1)) {
									// There was a gap and this is the first point after the gap. If we've never drawn a point, this is a special case.
									// If the first data point is NaN, then there is no real gap to skip
									if (spanGaps && lastDrawnIndex !== -1) {
										// We are spanning the gap, so simple draw a line to this point
										lineToPoint(previous, current);
									} else if (loop) {
										ctx.lineTo(currentVM.x, currentVM.y);
									} else {
										ctx.lineTo(currentVM.x, scaleZero);
										ctx.lineTo(currentVM.x, currentVM.y);
									}
								} else {
									// Line to next point
									lineToPoint(previous, current);
								}
								lastDrawnIndex = index;
							}
						}
					}
	
					if (!loop && lastDrawnIndex !== -1) {
						ctx.lineTo(points[lastDrawnIndex]._view.x, scaleZero);
					}
	
					ctx.fillStyle = vm.backgroundColor || globalDefaults.defaultColor;
					ctx.closePath();
					ctx.fill();
				}
	
				// Stroke Line Options
				var globalOptionLineElements = globalDefaults.elements.line;
				ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle;
	
				// IE 9 and 10 do not support line dash
				if (ctx.setLineDash) {
					ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
				}
	
				ctx.lineDashOffset = vm.borderDashOffset || globalOptionLineElements.borderDashOffset;
				ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
				ctx.lineWidth = vm.borderWidth || globalOptionLineElements.borderWidth;
				ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor;
	
				// Stroke Line
				ctx.beginPath();
				lastDrawnIndex = -1;
	
				for (index = 0; index < points.length; ++index) {
					current = points[index];
					previous = helpers.previousItem(points, index);
					currentVM = current._view;
	
					// First point moves to it's starting position no matter what
					if (index === 0) {
						if (!currentVM.skip) {
							ctx.moveTo(currentVM.x, currentVM.y);
							lastDrawnIndex = index;
						}
					} else {
						previous = lastDrawnIndex === -1 ? previous : points[lastDrawnIndex];
	
						if (!currentVM.skip) {
							if ((lastDrawnIndex !== (index - 1) && !spanGaps) || lastDrawnIndex === -1) {
								// There was a gap and this is the first point after the gap
								ctx.moveTo(currentVM.x, currentVM.y);
							} else {
								// Line to next point
								lineToPoint(previous, current);
							}
							lastDrawnIndex = index;
						}
					}
				}
	
				ctx.stroke();
				ctx.restore();
			}
		});
	};


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers,
			globalOpts = Chart.defaults.global,
			defaultColor = globalOpts.defaultColor;
	
		globalOpts.elements.point = {
			radius: 3,
			pointStyle: 'circle',
			backgroundColor: defaultColor,
			borderWidth: 1,
			borderColor: defaultColor,
			// Hover
			hitRadius: 1,
			hoverRadius: 4,
			hoverBorderWidth: 1
		};
	
		Chart.elements.Point = Chart.Element.extend({
			inRange: function(mouseX, mouseY) {
				var vm = this._view;
				return vm ? ((Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2)) < Math.pow(vm.hitRadius + vm.radius, 2)) : false;
			},
			inLabelRange: function(mouseX) {
				var vm = this._view;
				return vm ? (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hitRadius, 2)) : false;
			},
			tooltipPosition: function() {
				var vm = this._view;
				return {
					x: vm.x,
					y: vm.y,
					padding: vm.radius + vm.borderWidth
				};
			},
			draw: function() {
				var vm = this._view;
				var ctx = this._chart.ctx;
				var pointStyle = vm.pointStyle;
				var radius = vm.radius;
				var x = vm.x;
				var y = vm.y;
	
				if (vm.skip) {
					return;
				}
	
				ctx.strokeStyle = vm.borderColor || defaultColor;
				ctx.lineWidth = helpers.getValueOrDefault(vm.borderWidth, globalOpts.elements.point.borderWidth);
				ctx.fillStyle = vm.backgroundColor || defaultColor;
	
				Chart.canvasHelpers.drawPoint(ctx, pointStyle, radius, x, y);
			}
		});
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var globalOpts = Chart.defaults.global;
	
		globalOpts.elements.rectangle = {
			backgroundColor: globalOpts.defaultColor,
			borderWidth: 0,
			borderColor: globalOpts.defaultColor,
			borderSkipped: 'bottom'
		};
	
		Chart.elements.Rectangle = Chart.Element.extend({
			draw: function() {
				var ctx = this._chart.ctx;
				var vm = this._view;
	
				var halfWidth = vm.width / 2,
					leftX = vm.x - halfWidth,
					rightX = vm.x + halfWidth,
					top = vm.base - (vm.base - vm.y),
					halfStroke = vm.borderWidth / 2;
	
				// Canvas doesn't allow us to stroke inside the width so we can
				// adjust the sizes to fit if we're setting a stroke on the line
				if (vm.borderWidth) {
					leftX += halfStroke;
					rightX -= halfStroke;
					top += halfStroke;
				}
	
				ctx.beginPath();
				ctx.fillStyle = vm.backgroundColor;
				ctx.strokeStyle = vm.borderColor;
				ctx.lineWidth = vm.borderWidth;
	
				// Corner points, from bottom-left to bottom-right clockwise
				// | 1 2 |
				// | 0 3 |
				var corners = [
					[leftX, vm.base],
					[leftX, top],
					[rightX, top],
					[rightX, vm.base]
				];
	
				// Find first (starting) corner with fallback to 'bottom'
				var borders = ['bottom', 'left', 'top', 'right'];
				var startCorner = borders.indexOf(vm.borderSkipped, 0);
				if (startCorner === -1) {
					startCorner = 0;
				}
	
				function cornerAt(index) {
					return corners[(startCorner + index) % 4];
				}
	
				// Draw rectangle from 'startCorner'
				ctx.moveTo.apply(ctx, cornerAt(0));
				for (var i = 1; i < 4; i++) {
					ctx.lineTo.apply(ctx, cornerAt(i));
				}
	
				ctx.fill();
				if (vm.borderWidth) {
					ctx.stroke();
				}
			},
			height: function() {
				var vm = this._view;
				return vm.base - vm.y;
			},
			inRange: function(mouseX, mouseY) {
				var vm = this._view;
				return vm ?
						(vm.y < vm.base ?
							(mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) && (mouseY >= vm.y && mouseY <= vm.base) :
							(mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) && (mouseY >= vm.base && mouseY <= vm.y)) :
						false;
			},
			inLabelRange: function(mouseX) {
				var vm = this._view;
				return vm ? (mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) : false;
			},
			tooltipPosition: function() {
				var vm = this._view;
				return {
					x: vm.x,
					y: vm.y
				};
			}
		});
	
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers,
			noop = helpers.noop;
	
		Chart.LinearScaleBase = Chart.Scale.extend({
			handleTickRangeOptions: function() {
				var me = this;
				var opts = me.options;
				var tickOpts = opts.ticks;
	
				// If we are forcing it to begin at 0, but 0 will already be rendered on the chart,
				// do nothing since that would make the chart weird. If the user really wants a weird chart
				// axis, they can manually override it
				if (tickOpts.beginAtZero) {
					var minSign = helpers.sign(me.min);
					var maxSign = helpers.sign(me.max);
	
					if (minSign < 0 && maxSign < 0) {
						// move the top up to 0
						me.max = 0;
					} else if (minSign > 0 && maxSign > 0) {
						// move the botttom down to 0
						me.min = 0;
					}
				}
	
				if (tickOpts.min !== undefined) {
					me.min = tickOpts.min;
				} else if (tickOpts.suggestedMin !== undefined) {
					me.min = Math.min(me.min, tickOpts.suggestedMin);
				}
	
				if (tickOpts.max !== undefined) {
					me.max = tickOpts.max;
				} else if (tickOpts.suggestedMax !== undefined) {
					me.max = Math.max(me.max, tickOpts.suggestedMax);
				}
	
				if (me.min === me.max) {
					me.max++;
	
					if (!tickOpts.beginAtZero) {
						me.min--;
					}
				}
			},
			getTickLimit: noop,
			handleDirectionalChanges: noop,
	
			buildTicks: function() {
				var me = this;
				var opts = me.options;
				var ticks = me.ticks = [];
				var tickOpts = opts.ticks;
				var getValueOrDefault = helpers.getValueOrDefault;
	
				// Figure out what the max number of ticks we can support it is based on the size of
				// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
				// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
				// the graph
	
				var maxTicks = me.getTickLimit();
	
				// Make sure we always have at least 2 ticks
				maxTicks = Math.max(2, maxTicks);
	
				// To get a "nice" value for the tick spacing, we will use the appropriately named
				// "nice number" algorithm. See http://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
				// for details.
	
				var spacing;
				var fixedStepSizeSet = (tickOpts.fixedStepSize && tickOpts.fixedStepSize > 0) || (tickOpts.stepSize && tickOpts.stepSize > 0);
				if (fixedStepSizeSet) {
					spacing = getValueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize);
				} else {
					var niceRange = helpers.niceNum(me.max - me.min, false);
					spacing = helpers.niceNum(niceRange / (maxTicks - 1), true);
				}
				var niceMin = Math.floor(me.min / spacing) * spacing;
				var niceMax = Math.ceil(me.max / spacing) * spacing;
				var numSpaces = (niceMax - niceMin) / spacing;
	
				// If very close to our rounded value, use it.
				if (helpers.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
					numSpaces = Math.round(numSpaces);
				} else {
					numSpaces = Math.ceil(numSpaces);
				}
	
				// Put the values into the ticks array
				ticks.push(tickOpts.min !== undefined ? tickOpts.min : niceMin);
				for (var j = 1; j < numSpaces; ++j) {
					ticks.push(niceMin + (j * spacing));
				}
				ticks.push(tickOpts.max !== undefined ? tickOpts.max : niceMax);
	
				me.handleDirectionalChanges();
	
				// At this point, we need to update our max and min given the tick values since we have expanded the
				// range of the scale
				me.max = helpers.max(ticks);
				me.min = helpers.min(ticks);
	
				if (tickOpts.reverse) {
					ticks.reverse();
	
					me.start = me.max;
					me.end = me.min;
				} else {
					me.start = me.min;
					me.end = me.max;
				}
			},
			convertTicksToLabels: function() {
				var me = this;
				me.ticksAsNumbers = me.ticks.slice();
				me.zeroLineIndex = me.ticks.indexOf(0);
	
				Chart.Scale.prototype.convertTicksToLabels.call(me);
			}
		});
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		// Default config for a category scale
		var defaultConfig = {
			position: 'bottom'
		};
	
		var DatasetScale = Chart.Scale.extend({
			/**
			* Internal function to get the correct labels. If data.xLabels or data.yLabels are defined, use tose
			* else fall back to data.labels
			* @private
			*/
			getLabels: function() {
				var data = this.chart.data;
				return (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels;
			},
			// Implement this so that
			determineDataLimits: function() {
				var me = this;
				var labels = me.getLabels();
				me.minIndex = 0;
				me.maxIndex = labels.length - 1;
				var findIndex;
	
				if (me.options.ticks.min !== undefined) {
					// user specified min value
					findIndex = helpers.indexOf(labels, me.options.ticks.min);
					me.minIndex = findIndex !== -1 ? findIndex : me.minIndex;
				}
	
				if (me.options.ticks.max !== undefined) {
					// user specified max value
					findIndex = helpers.indexOf(labels, me.options.ticks.max);
					me.maxIndex = findIndex !== -1 ? findIndex : me.maxIndex;
				}
	
				me.min = labels[me.minIndex];
				me.max = labels[me.maxIndex];
			},
	
			buildTicks: function() {
				var me = this;
				var labels = me.getLabels();
				// If we are viewing some subset of labels, slice the original array
				me.ticks = (me.minIndex === 0 && me.maxIndex === labels.length - 1) ? labels : labels.slice(me.minIndex, me.maxIndex + 1);
			},
	
			getLabelForIndex: function(index, datasetIndex) {
				var me = this;
				var data = me.chart.data;
				var isHorizontal = me.isHorizontal();
	
				if ((data.xLabels && isHorizontal) || (data.yLabels && !isHorizontal)) {
					return me.getRightValue(data.datasets[datasetIndex].data[index]);
				}
				return me.ticks[index];
			},
	
			// Used to get data value locations.  Value can either be an index or a numerical value
			getPixelForValue: function(value, index, datasetIndex, includeOffset) {
				var me = this;
				// 1 is added because we need the length but we have the indexes
				var offsetAmt = Math.max((me.maxIndex + 1 - me.minIndex - ((me.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
	
				if (value !== undefined && isNaN(index)) {
					var labels = me.getLabels();
					var idx = labels.indexOf(value);
					index = idx !== -1 ? idx : index;
				}
	
				if (me.isHorizontal()) {
					var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
					var valueWidth = innerWidth / offsetAmt;
					var widthOffset = (valueWidth * (index - me.minIndex)) + me.paddingLeft;
	
					if (me.options.gridLines.offsetGridLines && includeOffset || me.maxIndex === me.minIndex && includeOffset) {
						widthOffset += (valueWidth / 2);
					}
	
					return me.left + Math.round(widthOffset);
				}
				var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
				var valueHeight = innerHeight / offsetAmt;
				var heightOffset = (valueHeight * (index - me.minIndex)) + me.paddingTop;
	
				if (me.options.gridLines.offsetGridLines && includeOffset) {
					heightOffset += (valueHeight / 2);
				}
	
				return me.top + Math.round(heightOffset);
			},
			getPixelForTick: function(index, includeOffset) {
				return this.getPixelForValue(this.ticks[index], index + this.minIndex, null, includeOffset);
			},
			getValueForPixel: function(pixel) {
				var me = this;
				var value;
				var offsetAmt = Math.max((me.ticks.length - ((me.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
				var horz = me.isHorizontal();
				var innerDimension = horz ? me.width - (me.paddingLeft + me.paddingRight) : me.height - (me.paddingTop + me.paddingBottom);
				var valueDimension = innerDimension / offsetAmt;
	
				pixel -= horz ? me.left : me.top;
	
				if (me.options.gridLines.offsetGridLines) {
					pixel -= (valueDimension / 2);
				}
				pixel -= horz ? me.paddingLeft : me.paddingTop;
	
				if (pixel <= 0) {
					value = 0;
				} else {
					value = Math.round(pixel / valueDimension);
				}
	
				return value;
			},
			getBasePixel: function() {
				return this.bottom;
			}
		});
	
		Chart.scaleService.registerScaleType('category', DatasetScale, defaultConfig);
	
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		var defaultConfig = {
			position: 'left',
			ticks: {
				callback: function(tickValue, index, ticks) {
					// If we have lots of ticks, don't use the ones
					var delta = ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0];
	
					// If we have a number like 2.5 as the delta, figure out how many decimal places we need
					if (Math.abs(delta) > 1) {
						if (tickValue !== Math.floor(tickValue)) {
							// not an integer
							delta = tickValue - Math.floor(tickValue);
						}
					}
	
					var logDelta = helpers.log10(Math.abs(delta));
					var tickString = '';
	
					if (tickValue !== 0) {
						var numDecimal = -1 * Math.floor(logDelta);
						numDecimal = Math.max(Math.min(numDecimal, 20), 0); // toFixed has a max of 20 decimal places
						tickString = tickValue.toFixed(numDecimal);
					} else {
						tickString = '0'; // never show decimal places for 0
					}
	
					return tickString;
				}
			}
		};
	
		var LinearScale = Chart.LinearScaleBase.extend({
			determineDataLimits: function() {
				var me = this;
				var opts = me.options;
				var chart = me.chart;
				var data = chart.data;
				var datasets = data.datasets;
				var isHorizontal = me.isHorizontal();
	
				function IDMatches(meta) {
					return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
				}
	
				// First Calculate the range
				me.min = null;
				me.max = null;
	
				if (opts.stacked) {
					var valuesPerType = {};
	
					helpers.each(datasets, function(dataset, datasetIndex) {
						var meta = chart.getDatasetMeta(datasetIndex);
						if (valuesPerType[meta.type] === undefined) {
							valuesPerType[meta.type] = {
								positiveValues: [],
								negativeValues: []
							};
						}
	
						// Store these per type
						var positiveValues = valuesPerType[meta.type].positiveValues;
						var negativeValues = valuesPerType[meta.type].negativeValues;
	
						if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
							helpers.each(dataset.data, function(rawValue, index) {
								var value = +me.getRightValue(rawValue);
								if (isNaN(value) || meta.data[index].hidden) {
									return;
								}
	
								positiveValues[index] = positiveValues[index] || 0;
								negativeValues[index] = negativeValues[index] || 0;
	
								if (opts.relativePoints) {
									positiveValues[index] = 100;
								} else if (value < 0) {
									negativeValues[index] += value;
								} else {
									positiveValues[index] += value;
								}
							});
						}
					});
	
					helpers.each(valuesPerType, function(valuesForType) {
						var values = valuesForType.positiveValues.concat(valuesForType.negativeValues);
						var minVal = helpers.min(values);
						var maxVal = helpers.max(values);
						me.min = me.min === null ? minVal : Math.min(me.min, minVal);
						me.max = me.max === null ? maxVal : Math.max(me.max, maxVal);
					});
	
				} else {
					helpers.each(datasets, function(dataset, datasetIndex) {
						var meta = chart.getDatasetMeta(datasetIndex);
						if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
							helpers.each(dataset.data, function(rawValue, index) {
								var value = +me.getRightValue(rawValue);
								if (isNaN(value) || meta.data[index].hidden) {
									return;
								}
	
								if (me.min === null) {
									me.min = value;
								} else if (value < me.min) {
									me.min = value;
								}
	
								if (me.max === null) {
									me.max = value;
								} else if (value > me.max) {
									me.max = value;
								}
							});
						}
					});
				}
	
				// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
				this.handleTickRangeOptions();
			},
			getTickLimit: function() {
				var maxTicks;
				var me = this;
				var tickOpts = me.options.ticks;
	
				if (me.isHorizontal()) {
					maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(me.width / 50));
				} else {
					// The factor of 2 used to scale the font size has been experimentally determined.
					var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, Chart.defaults.global.defaultFontSize);
					maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(me.height / (2 * tickFontSize)));
				}
	
				return maxTicks;
			},
			// Called after the ticks are built. We need
			handleDirectionalChanges: function() {
				if (!this.isHorizontal()) {
					// We are in a vertical orientation. The top value is the highest. So reverse the array
					this.ticks.reverse();
				}
			},
			getLabelForIndex: function(index, datasetIndex) {
				return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
			},
			// Utils
			getPixelForValue: function(value) {
				// This must be called after fit has been run so that
				// this.left, this.top, this.right, and this.bottom have been defined
				var me = this;
				var paddingLeft = me.paddingLeft;
				var paddingBottom = me.paddingBottom;
				var start = me.start;
	
				var rightValue = +me.getRightValue(value);
				var pixel;
				var innerDimension;
				var range = me.end - start;
	
				if (me.isHorizontal()) {
					innerDimension = me.width - (paddingLeft + me.paddingRight);
					pixel = me.left + (innerDimension / range * (rightValue - start));
					return Math.round(pixel + paddingLeft);
				}
				innerDimension = me.height - (me.paddingTop + paddingBottom);
				pixel = (me.bottom - paddingBottom) - (innerDimension / range * (rightValue - start));
				return Math.round(pixel);
			},
			getValueForPixel: function(pixel) {
				var me = this;
				var isHorizontal = me.isHorizontal();
				var paddingLeft = me.paddingLeft;
				var paddingBottom = me.paddingBottom;
				var innerDimension = isHorizontal ? me.width - (paddingLeft + me.paddingRight) : me.height - (me.paddingTop + paddingBottom);
				var offset = (isHorizontal ? pixel - me.left - paddingLeft : me.bottom - paddingBottom - pixel) / innerDimension;
				return me.start + ((me.end - me.start) * offset);
			},
			getPixelForTick: function(index) {
				return this.getPixelForValue(this.ticksAsNumbers[index]);
			}
		});
		Chart.scaleService.registerScaleType('linear', LinearScale, defaultConfig);
	
	};


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		var defaultConfig = {
			position: 'left',
	
			// label settings
			ticks: {
				callback: function(value, index, arr) {
					var remain = value / (Math.pow(10, Math.floor(helpers.log10(value))));
	
					if (value === 0) {
						return '0';
					} else if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
						return value.toExponential();
					}
					return '';
				}
			}
		};
	
		var LogarithmicScale = Chart.Scale.extend({
			determineDataLimits: function() {
				var me = this;
				var opts = me.options;
				var tickOpts = opts.ticks;
				var chart = me.chart;
				var data = chart.data;
				var datasets = data.datasets;
				var getValueOrDefault = helpers.getValueOrDefault;
				var isHorizontal = me.isHorizontal();
				function IDMatches(meta) {
					return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
				}
	
				// Calculate Range
				me.min = null;
				me.max = null;
				me.minNotZero = null;
	
				if (opts.stacked) {
					var valuesPerType = {};
	
					helpers.each(datasets, function(dataset, datasetIndex) {
						var meta = chart.getDatasetMeta(datasetIndex);
						if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
							if (valuesPerType[meta.type] === undefined) {
								valuesPerType[meta.type] = [];
							}
	
							helpers.each(dataset.data, function(rawValue, index) {
								var values = valuesPerType[meta.type];
								var value = +me.getRightValue(rawValue);
								if (isNaN(value) || meta.data[index].hidden) {
									return;
								}
	
								values[index] = values[index] || 0;
	
								if (opts.relativePoints) {
									values[index] = 100;
								} else {
									// Don't need to split positive and negative since the log scale can't handle a 0 crossing
									values[index] += value;
								}
							});
						}
					});
	
					helpers.each(valuesPerType, function(valuesForType) {
						var minVal = helpers.min(valuesForType);
						var maxVal = helpers.max(valuesForType);
						me.min = me.min === null ? minVal : Math.min(me.min, minVal);
						me.max = me.max === null ? maxVal : Math.max(me.max, maxVal);
					});
	
				} else {
					helpers.each(datasets, function(dataset, datasetIndex) {
						var meta = chart.getDatasetMeta(datasetIndex);
						if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
							helpers.each(dataset.data, function(rawValue, index) {
								var value = +me.getRightValue(rawValue);
								if (isNaN(value) || meta.data[index].hidden) {
									return;
								}
	
								if (me.min === null) {
									me.min = value;
								} else if (value < me.min) {
									me.min = value;
								}
	
								if (me.max === null) {
									me.max = value;
								} else if (value > me.max) {
									me.max = value;
								}
	
								if (value !== 0 && (me.minNotZero === null || value < me.minNotZero)) {
									me.minNotZero = value;
								}
							});
						}
					});
				}
	
				me.min = getValueOrDefault(tickOpts.min, me.min);
				me.max = getValueOrDefault(tickOpts.max, me.max);
	
				if (me.min === me.max) {
					if (me.min !== 0 && me.min !== null) {
						me.min = Math.pow(10, Math.floor(helpers.log10(me.min)) - 1);
						me.max = Math.pow(10, Math.floor(helpers.log10(me.max)) + 1);
					} else {
						me.min = 1;
						me.max = 10;
					}
				}
			},
			buildTicks: function() {
				var me = this;
				var opts = me.options;
				var tickOpts = opts.ticks;
				var getValueOrDefault = helpers.getValueOrDefault;
	
				// Reset the ticks array. Later on, we will draw a grid line at these positions
				// The array simply contains the numerical value of the spots where ticks will be
				var ticks = me.ticks = [];
	
				// Figure out what the max number of ticks we can support it is based on the size of
				// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
				// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
				// the graph
	
				var tickVal = getValueOrDefault(tickOpts.min, Math.pow(10, Math.floor(helpers.log10(me.min))));
	
				while (tickVal < me.max) {
					ticks.push(tickVal);
	
					var exp;
					var significand;
	
					if (tickVal === 0) {
						exp = Math.floor(helpers.log10(me.minNotZero));
						significand = Math.round(me.minNotZero / Math.pow(10, exp));
					} else {
						exp = Math.floor(helpers.log10(tickVal));
						significand = Math.floor(tickVal / Math.pow(10, exp)) + 1;
					}
	
					if (significand === 10) {
						significand = 1;
						++exp;
					}
	
					tickVal = significand * Math.pow(10, exp);
				}
	
				var lastTick = getValueOrDefault(tickOpts.max, tickVal);
				ticks.push(lastTick);
	
				if (!me.isHorizontal()) {
					// We are in a vertical orientation. The top value is the highest. So reverse the array
					ticks.reverse();
				}
	
				// At this point, we need to update our max and min given the tick values since we have expanded the
				// range of the scale
				me.max = helpers.max(ticks);
				me.min = helpers.min(ticks);
	
				if (tickOpts.reverse) {
					ticks.reverse();
	
					me.start = me.max;
					me.end = me.min;
				} else {
					me.start = me.min;
					me.end = me.max;
				}
			},
			convertTicksToLabels: function() {
				this.tickValues = this.ticks.slice();
	
				Chart.Scale.prototype.convertTicksToLabels.call(this);
			},
			// Get the correct tooltip label
			getLabelForIndex: function(index, datasetIndex) {
				return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
			},
			getPixelForTick: function(index) {
				return this.getPixelForValue(this.tickValues[index]);
			},
			getPixelForValue: function(value) {
				var me = this;
				var innerDimension;
				var pixel;
	
				var start = me.start;
				var newVal = +me.getRightValue(value);
				var range;
				var paddingTop = me.paddingTop;
				var paddingBottom = me.paddingBottom;
				var paddingLeft = me.paddingLeft;
				var opts = me.options;
				var tickOpts = opts.ticks;
	
				if (me.isHorizontal()) {
					range = helpers.log10(me.end) - helpers.log10(start); // todo: if start === 0
					if (newVal === 0) {
						pixel = me.left + paddingLeft;
					} else {
						innerDimension = me.width - (paddingLeft + me.paddingRight);
						pixel = me.left + (innerDimension / range * (helpers.log10(newVal) - helpers.log10(start)));
						pixel += paddingLeft;
					}
				} else {
					// Bottom - top since pixels increase downard on a screen
					innerDimension = me.height - (paddingTop + paddingBottom);
					if (start === 0 && !tickOpts.reverse) {
						range = helpers.log10(me.end) - helpers.log10(me.minNotZero);
						if (newVal === start) {
							pixel = me.bottom - paddingBottom;
						} else if (newVal === me.minNotZero) {
							pixel = me.bottom - paddingBottom - innerDimension * 0.02;
						} else {
							pixel = me.bottom - paddingBottom - innerDimension * 0.02 - (innerDimension * 0.98/ range * (helpers.log10(newVal)-helpers.log10(me.minNotZero)));
						}
					} else if (me.end === 0 && tickOpts.reverse) {
						range = helpers.log10(me.start) - helpers.log10(me.minNotZero);
						if (newVal === me.end) {
							pixel = me.top + paddingTop;
						} else if (newVal === me.minNotZero) {
							pixel = me.top + paddingTop + innerDimension * 0.02;
						} else {
							pixel = me.top + paddingTop + innerDimension * 0.02 + (innerDimension * 0.98/ range * (helpers.log10(newVal)-helpers.log10(me.minNotZero)));
						}
					} else {
						range = helpers.log10(me.end) - helpers.log10(start);
						innerDimension = me.height - (paddingTop + paddingBottom);
						pixel = (me.bottom - paddingBottom) - (innerDimension / range * (helpers.log10(newVal) - helpers.log10(start)));
					}
				}
				return pixel;
			},
			getValueForPixel: function(pixel) {
				var me = this;
				var range = helpers.log10(me.end) - helpers.log10(me.start);
				var value, innerDimension;
	
				if (me.isHorizontal()) {
					innerDimension = me.width - (me.paddingLeft + me.paddingRight);
					value = me.start * Math.pow(10, (pixel - me.left - me.paddingLeft) * range / innerDimension);
				} else {  // todo: if start === 0
					innerDimension = me.height - (me.paddingTop + me.paddingBottom);
					value = Math.pow(10, (me.bottom - me.paddingBottom - pixel) * range / innerDimension) / me.start;
				}
				return value;
			}
		});
		Chart.scaleService.registerScaleType('logarithmic', LogarithmicScale, defaultConfig);
	
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		var globalDefaults = Chart.defaults.global;
	
		var defaultConfig = {
			display: true,
	
			// Boolean - Whether to animate scaling the chart from the centre
			animate: true,
			lineArc: false,
			position: 'chartArea',
	
			angleLines: {
				display: true,
				color: 'rgba(0, 0, 0, 0.1)',
				lineWidth: 1
			},
	
			// label settings
			ticks: {
				// Boolean - Show a backdrop to the scale label
				showLabelBackdrop: true,
	
				// String - The colour of the label backdrop
				backdropColor: 'rgba(255,255,255,0.75)',
	
				// Number - The backdrop padding above & below the label in pixels
				backdropPaddingY: 2,
	
				// Number - The backdrop padding to the side of the label in pixels
				backdropPaddingX: 2
			},
	
			pointLabels: {
				// Number - Point label font size in pixels
				fontSize: 10,
	
				// Function - Used to convert point labels
				callback: function(label) {
					return label;
				}
			}
		};
	
		var LinearRadialScale = Chart.LinearScaleBase.extend({
			getValueCount: function() {
				return this.chart.data.labels.length;
			},
			setDimensions: function() {
				var me = this;
				var opts = me.options;
				var tickOpts = opts.ticks;
				// Set the unconstrained dimension before label rotation
				me.width = me.maxWidth;
				me.height = me.maxHeight;
				me.xCenter = Math.round(me.width / 2);
				me.yCenter = Math.round(me.height / 2);
	
				var minSize = helpers.min([me.height, me.width]);
				var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
				me.drawingArea = opts.display ? (minSize / 2) - (tickFontSize / 2 + tickOpts.backdropPaddingY) : (minSize / 2);
			},
			determineDataLimits: function() {
				var me = this;
				var chart = me.chart;
				me.min = null;
				me.max = null;
	
	
				helpers.each(chart.data.datasets, function(dataset, datasetIndex) {
					if (chart.isDatasetVisible(datasetIndex)) {
						var meta = chart.getDatasetMeta(datasetIndex);
	
						helpers.each(dataset.data, function(rawValue, index) {
							var value = +me.getRightValue(rawValue);
							if (isNaN(value) || meta.data[index].hidden) {
								return;
							}
	
							if (me.min === null) {
								me.min = value;
							} else if (value < me.min) {
								me.min = value;
							}
	
							if (me.max === null) {
								me.max = value;
							} else if (value > me.max) {
								me.max = value;
							}
						});
					}
				});
	
				// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
				me.handleTickRangeOptions();
			},
			getTickLimit: function() {
				var tickOpts = this.options.ticks;
				var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
				return Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * tickFontSize)));
			},
			convertTicksToLabels: function() {
				var me = this;
				Chart.LinearScaleBase.prototype.convertTicksToLabels.call(me);
	
				// Point labels
				me.pointLabels = me.chart.data.labels.map(me.options.pointLabels.callback, me);
			},
			getLabelForIndex: function(index, datasetIndex) {
				return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
			},
			fit: function() {
				/*
				 * Right, this is really confusing and there is a lot of maths going on here
				 * The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
				 *
				 * Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
				 *
				 * Solution:
				 *
				 * We assume the radius of the polygon is half the size of the canvas at first
				 * at each index we check if the text overlaps.
				 *
				 * Where it does, we store that angle and that index.
				 *
				 * After finding the largest index and angle we calculate how much we need to remove
				 * from the shape radius to move the point inwards by that x.
				 *
				 * We average the left and right distances to get the maximum shape radius that can fit in the box
				 * along with labels.
				 *
				 * Once we have that, we can find the centre point for the chart, by taking the x text protrusion
				 * on each side, removing that from the size, halving it and adding the left x protrusion width.
				 *
				 * This will mean we have a shape fitted to the canvas, as large as it can be with the labels
				 * and position it in the most space efficient manner
				 *
				 * https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif
				 */
	
				var pointLabels = this.options.pointLabels;
				var pointLabelFontSize = helpers.getValueOrDefault(pointLabels.fontSize, globalDefaults.defaultFontSize);
				var pointLabeFontStyle = helpers.getValueOrDefault(pointLabels.fontStyle, globalDefaults.defaultFontStyle);
				var pointLabeFontFamily = helpers.getValueOrDefault(pointLabels.fontFamily, globalDefaults.defaultFontFamily);
				var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);
	
				// Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
				// Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
				var largestPossibleRadius = helpers.min([(this.height / 2 - pointLabelFontSize - 5), this.width / 2]),
					pointPosition,
					i,
					textWidth,
					halfTextWidth,
					furthestRight = this.width,
					furthestRightIndex,
					furthestRightAngle,
					furthestLeft = 0,
					furthestLeftIndex,
					furthestLeftAngle,
					xProtrusionLeft,
					xProtrusionRight,
					radiusReductionRight,
					radiusReductionLeft;
				this.ctx.font = pointLabeFont;
	
				for (i = 0; i < this.getValueCount(); i++) {
					// 5px to space the text slightly out - similar to what we do in the draw function.
					pointPosition = this.getPointPosition(i, largestPossibleRadius);
					textWidth = this.ctx.measureText(this.pointLabels[i] ? this.pointLabels[i] : '').width + 5;
	
					// Add quarter circle to make degree 0 mean top of circle
					var angleRadians = this.getIndexAngle(i) + (Math.PI / 2);
					var angle = (angleRadians * 360 / (2 * Math.PI)) % 360;
	
					if (angle === 0 || angle === 180) {
						// At angle 0 and 180, we're at exactly the top/bottom
						// of the radar chart, so text will be aligned centrally, so we'll half it and compare
						// w/left and right text sizes
						halfTextWidth = textWidth / 2;
						if (pointPosition.x + halfTextWidth > furthestRight) {
							furthestRight = pointPosition.x + halfTextWidth;
							furthestRightIndex = i;
						}
						if (pointPosition.x - halfTextWidth < furthestLeft) {
							furthestLeft = pointPosition.x - halfTextWidth;
							furthestLeftIndex = i;
						}
					} else if (angle < 180) {
						// Less than half the values means we'll left align the text
						if (pointPosition.x + textWidth > furthestRight) {
							furthestRight = pointPosition.x + textWidth;
							furthestRightIndex = i;
						}
					// More than half the values means we'll right align the text
					} else if (pointPosition.x - textWidth < furthestLeft) {
						furthestLeft = pointPosition.x - textWidth;
						furthestLeftIndex = i;
					}
				}
	
				xProtrusionLeft = furthestLeft;
				xProtrusionRight = Math.ceil(furthestRight - this.width);
	
				furthestRightAngle = this.getIndexAngle(furthestRightIndex);
				furthestLeftAngle = this.getIndexAngle(furthestLeftIndex);
	
				radiusReductionRight = xProtrusionRight / Math.sin(furthestRightAngle + Math.PI / 2);
				radiusReductionLeft = xProtrusionLeft / Math.sin(furthestLeftAngle + Math.PI / 2);
	
				// Ensure we actually need to reduce the size of the chart
				radiusReductionRight = (helpers.isNumber(radiusReductionRight)) ? radiusReductionRight : 0;
				radiusReductionLeft = (helpers.isNumber(radiusReductionLeft)) ? radiusReductionLeft : 0;
	
				this.drawingArea = Math.round(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2);
				this.setCenterPoint(radiusReductionLeft, radiusReductionRight);
			},
			setCenterPoint: function(leftMovement, rightMovement) {
				var me = this;
				var maxRight = me.width - rightMovement - me.drawingArea,
					maxLeft = leftMovement + me.drawingArea;
	
				me.xCenter = Math.round(((maxLeft + maxRight) / 2) + me.left);
				// Always vertically in the centre as the text height doesn't change
				me.yCenter = Math.round((me.height / 2) + me.top);
			},
	
			getIndexAngle: function(index) {
				var angleMultiplier = (Math.PI * 2) / this.getValueCount();
				var startAngle = this.chart.options && this.chart.options.startAngle ?
					this.chart.options.startAngle :
					0;
	
				var startAngleRadians = startAngle * Math.PI * 2 / 360;
	
				// Start from the top instead of right, so remove a quarter of the circle
				return index * angleMultiplier - (Math.PI / 2) + startAngleRadians;
			},
			getDistanceFromCenterForValue: function(value) {
				var me = this;
	
				if (value === null) {
					return 0; // null always in center
				}
	
				// Take into account half font size + the yPadding of the top value
				var scalingFactor = me.drawingArea / (me.max - me.min);
				if (me.options.reverse) {
					return (me.max - value) * scalingFactor;
				}
				return (value - me.min) * scalingFactor;
			},
			getPointPosition: function(index, distanceFromCenter) {
				var me = this;
				var thisAngle = me.getIndexAngle(index);
				return {
					x: Math.round(Math.cos(thisAngle) * distanceFromCenter) + me.xCenter,
					y: Math.round(Math.sin(thisAngle) * distanceFromCenter) + me.yCenter
				};
			},
			getPointPositionForValue: function(index, value) {
				return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
			},
	
			getBasePosition: function() {
				var me = this;
				var min = me.min;
				var max = me.max;
	
				return me.getPointPositionForValue(0,
					me.beginAtZero? 0:
					min < 0 && max < 0? max :
					min > 0 && max > 0? min :
					0);
			},
	
			draw: function() {
				var me = this;
				var opts = me.options;
				var gridLineOpts = opts.gridLines;
				var tickOpts = opts.ticks;
				var angleLineOpts = opts.angleLines;
				var pointLabelOpts = opts.pointLabels;
				var getValueOrDefault = helpers.getValueOrDefault;
	
				if (opts.display) {
					var ctx = me.ctx;
	
					// Tick Font
					var tickFontSize = getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
					var tickFontStyle = getValueOrDefault(tickOpts.fontStyle, globalDefaults.defaultFontStyle);
					var tickFontFamily = getValueOrDefault(tickOpts.fontFamily, globalDefaults.defaultFontFamily);
					var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
	
					helpers.each(me.ticks, function(label, index) {
						// Don't draw a centre value (if it is minimum)
						if (index > 0 || opts.reverse) {
							var yCenterOffset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index]);
							var yHeight = me.yCenter - yCenterOffset;
	
							// Draw circular lines around the scale
							if (gridLineOpts.display && index !== 0) {
								ctx.strokeStyle = helpers.getValueAtIndexOrDefault(gridLineOpts.color, index - 1);
								ctx.lineWidth = helpers.getValueAtIndexOrDefault(gridLineOpts.lineWidth, index - 1);
	
								if (opts.lineArc) {
									// Draw circular arcs between the points
									ctx.beginPath();
									ctx.arc(me.xCenter, me.yCenter, yCenterOffset, 0, Math.PI * 2);
									ctx.closePath();
									ctx.stroke();
								} else {
									// Draw straight lines connecting each index
									ctx.beginPath();
									for (var i = 0; i < me.getValueCount(); i++) {
										var pointPosition = me.getPointPosition(i, yCenterOffset);
										if (i === 0) {
											ctx.moveTo(pointPosition.x, pointPosition.y);
										} else {
											ctx.lineTo(pointPosition.x, pointPosition.y);
										}
									}
									ctx.closePath();
									ctx.stroke();
								}
							}
	
							if (tickOpts.display) {
								var tickFontColor = getValueOrDefault(tickOpts.fontColor, globalDefaults.defaultFontColor);
								ctx.font = tickLabelFont;
	
								if (tickOpts.showLabelBackdrop) {
									var labelWidth = ctx.measureText(label).width;
									ctx.fillStyle = tickOpts.backdropColor;
									ctx.fillRect(
										me.xCenter - labelWidth / 2 - tickOpts.backdropPaddingX,
										yHeight - tickFontSize / 2 - tickOpts.backdropPaddingY,
										labelWidth + tickOpts.backdropPaddingX * 2,
										tickFontSize + tickOpts.backdropPaddingY * 2
									);
								}
	
								ctx.textAlign = 'center';
								ctx.textBaseline = 'middle';
								ctx.fillStyle = tickFontColor;
								ctx.fillText(label, me.xCenter, yHeight);
							}
						}
					});
	
					if (!opts.lineArc) {
						ctx.lineWidth = angleLineOpts.lineWidth;
						ctx.strokeStyle = angleLineOpts.color;
	
						var outerDistance = me.getDistanceFromCenterForValue(opts.reverse ? me.min : me.max);
	
						// Point Label Font
						var pointLabelFontSize = getValueOrDefault(pointLabelOpts.fontSize, globalDefaults.defaultFontSize);
						var pointLabeFontStyle = getValueOrDefault(pointLabelOpts.fontStyle, globalDefaults.defaultFontStyle);
						var pointLabeFontFamily = getValueOrDefault(pointLabelOpts.fontFamily, globalDefaults.defaultFontFamily);
						var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);
	
						for (var i = me.getValueCount() - 1; i >= 0; i--) {
							if (angleLineOpts.display) {
								var outerPosition = me.getPointPosition(i, outerDistance);
								ctx.beginPath();
								ctx.moveTo(me.xCenter, me.yCenter);
								ctx.lineTo(outerPosition.x, outerPosition.y);
								ctx.stroke();
								ctx.closePath();
							}
							// Extra 3px out for some label spacing
							var pointLabelPosition = me.getPointPosition(i, outerDistance + 5);
	
							// Keep this in loop since we may support array properties here
							var pointLabelFontColor = getValueOrDefault(pointLabelOpts.fontColor, globalDefaults.defaultFontColor);
							ctx.font = pointLabeFont;
							ctx.fillStyle = pointLabelFontColor;
	
							var pointLabels = me.pointLabels;
	
							// Add quarter circle to make degree 0 mean top of circle
							var angleRadians = this.getIndexAngle(i) + (Math.PI / 2);
							var angle = (angleRadians * 360 / (2 * Math.PI)) % 360;
	
							if (angle === 0 || angle === 180) {
								ctx.textAlign = 'center';
							} else if (angle < 180) {
								ctx.textAlign = 'left';
							} else {
								ctx.textAlign = 'right';
							}
	
							// Set the correct text baseline based on outer positioning
							if (angle === 90 || angle === 270) {
								ctx.textBaseline = 'middle';
							} else if (angle > 270 || angle < 90) {
								ctx.textBaseline = 'bottom';
							} else {
								ctx.textBaseline = 'top';
							}
	
							ctx.fillText(pointLabels[i] ? pointLabels[i] : '', pointLabelPosition.x, pointLabelPosition.y);
						}
					}
				}
			}
		});
		Chart.scaleService.registerScaleType('radialLinear', LinearRadialScale, defaultConfig);
	
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* global window: false */
	'use strict';
	
	var moment = __webpack_require__(32);
	moment = typeof(moment) === 'function' ? moment : window.moment;
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		var time = {
			units: [{
				name: 'millisecond',
				steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
			}, {
				name: 'second',
				steps: [1, 2, 5, 10, 30]
			}, {
				name: 'minute',
				steps: [1, 2, 5, 10, 30]
			}, {
				name: 'hour',
				steps: [1, 2, 3, 6, 12]
			}, {
				name: 'day',
				steps: [1, 2, 5]
			}, {
				name: 'week',
				maxStep: 4
			}, {
				name: 'month',
				maxStep: 3
			}, {
				name: 'quarter',
				maxStep: 4
			}, {
				name: 'year',
				maxStep: false
			}]
		};
	
		var defaultConfig = {
			position: 'bottom',
	
			time: {
				parser: false, // false == a pattern string from http://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
				format: false, // DEPRECATED false == date objects, moment object, callback or a pattern string from http://momentjs.com/docs/#/parsing/string-format/
				unit: false, // false == automatic or override with week, month, year, etc.
				round: false, // none, or override with week, month, year, etc.
				displayFormat: false, // DEPRECATED
				isoWeekday: false, // override week start day - see http://momentjs.com/docs/#/get-set/iso-weekday/
				minUnit: 'millisecond',
	
				// defaults to unit's corresponding unitFormat below or override using pattern string from http://momentjs.com/docs/#/displaying/format/
				displayFormats: {
					millisecond: 'h:mm:ss.SSS a', // 11:20:01.123 AM,
					second: 'h:mm:ss a', // 11:20:01 AM
					minute: 'h:mm:ss a', // 11:20:01 AM
					hour: 'MMM D, hA', // Sept 4, 5PM
					day: 'll', // Sep 4 2015
					week: 'll', // Week 46, or maybe "[W]WW - YYYY" ?
					month: 'MMM YYYY', // Sept 2015
					quarter: '[Q]Q - YYYY', // Q3
					year: 'YYYY' // 2015
				}
			},
			ticks: {
				autoSkip: false
			}
		};
	
		var TimeScale = Chart.Scale.extend({
			initialize: function() {
				if (!moment) {
					throw new Error('Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com');
				}
	
				Chart.Scale.prototype.initialize.call(this);
			},
			getLabelMoment: function(datasetIndex, index) {
				if (datasetIndex === null || index === null) {
					return null;
				}
	
				if (typeof this.labelMoments[datasetIndex] !== 'undefined') {
					return this.labelMoments[datasetIndex][index];
				}
	
				return null;
			},
			getLabelDiff: function(datasetIndex, index) {
				var me = this;
				if (datasetIndex === null || index === null) {
					return null;
				}
	
				if (me.labelDiffs === undefined) {
					me.buildLabelDiffs();
				}
	
				if (typeof me.labelDiffs[datasetIndex] !== 'undefined') {
					return me.labelDiffs[datasetIndex][index];
				}
	
				return null;
			},
			getMomentStartOf: function(tick) {
				var me = this;
				if (me.options.time.unit === 'week' && me.options.time.isoWeekday !== false) {
					return tick.clone().startOf('isoWeek').isoWeekday(me.options.time.isoWeekday);
				}
				return tick.clone().startOf(me.tickUnit);
			},
			determineDataLimits: function() {
				var me = this;
				me.labelMoments = [];
	
				// Only parse these once. If the dataset does not have data as x,y pairs, we will use
				// these
				var scaleLabelMoments = [];
				if (me.chart.data.labels && me.chart.data.labels.length > 0) {
					helpers.each(me.chart.data.labels, function(label) {
						var labelMoment = me.parseTime(label);
	
						if (labelMoment.isValid()) {
							if (me.options.time.round) {
								labelMoment.startOf(me.options.time.round);
							}
							scaleLabelMoments.push(labelMoment);
						}
					}, me);
	
					me.firstTick = moment.min.call(me, scaleLabelMoments);
					me.lastTick = moment.max.call(me, scaleLabelMoments);
				} else {
					me.firstTick = null;
					me.lastTick = null;
				}
	
				helpers.each(me.chart.data.datasets, function(dataset, datasetIndex) {
					var momentsForDataset = [];
					var datasetVisible = me.chart.isDatasetVisible(datasetIndex);
	
					if (typeof dataset.data[0] === 'object' && dataset.data[0] !== null) {
						helpers.each(dataset.data, function(value) {
							var labelMoment = me.parseTime(me.getRightValue(value));
	
							if (labelMoment.isValid()) {
								if (me.options.time.round) {
									labelMoment.startOf(me.options.time.round);
								}
								momentsForDataset.push(labelMoment);
	
								if (datasetVisible) {
									// May have gone outside the scale ranges, make sure we keep the first and last ticks updated
									me.firstTick = me.firstTick !== null ? moment.min(me.firstTick, labelMoment) : labelMoment;
									me.lastTick = me.lastTick !== null ? moment.max(me.lastTick, labelMoment) : labelMoment;
								}
							}
						}, me);
					} else {
						// We have no labels. Use the ones from the scale
						momentsForDataset = scaleLabelMoments;
					}
	
					me.labelMoments.push(momentsForDataset);
				}, me);
	
				// Set these after we've done all the data
				if (me.options.time.min) {
					me.firstTick = me.parseTime(me.options.time.min);
				}
	
				if (me.options.time.max) {
					me.lastTick = me.parseTime(me.options.time.max);
				}
	
				// We will modify these, so clone for later
				me.firstTick = (me.firstTick || moment()).clone();
				me.lastTick = (me.lastTick || moment()).clone();
			},
			buildLabelDiffs: function() {
				var me = this;
				me.labelDiffs = [];
				var scaleLabelDiffs = [];
				// Parse common labels once
				if (me.chart.data.labels && me.chart.data.labels.length > 0) {
					helpers.each(me.chart.data.labels, function(label) {
						var labelMoment = me.parseTime(label);
	
						if (labelMoment.isValid()) {
							if (me.options.time.round) {
								labelMoment.startOf(me.options.time.round);
							}
							scaleLabelDiffs.push(labelMoment.diff(me.firstTick, me.tickUnit, true));
						}
					}, me);
				}
	
				helpers.each(me.chart.data.datasets, function(dataset) {
					var diffsForDataset = [];
	
					if (typeof dataset.data[0] === 'object' && dataset.data[0] !== null) {
						helpers.each(dataset.data, function(value) {
							var labelMoment = me.parseTime(me.getRightValue(value));
	
							if (labelMoment.isValid()) {
								if (me.options.time.round) {
									labelMoment.startOf(me.options.time.round);
								}
								diffsForDataset.push(labelMoment.diff(me.firstTick, me.tickUnit, true));
							}
						}, me);
					} else {
						// We have no labels. Use common ones
						diffsForDataset = scaleLabelDiffs;
					}
	
					me.labelDiffs.push(diffsForDataset);
				}, me);
			},
			buildTicks: function() {
				var me = this;
	
				me.ctx.save();
				var tickFontSize = helpers.getValueOrDefault(me.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(me.options.ticks.fontStyle, Chart.defaults.global.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(me.options.ticks.fontFamily, Chart.defaults.global.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
				me.ctx.font = tickLabelFont;
	
				me.ticks = [];
				me.unitScale = 1; // How much we scale the unit by, ie 2 means 2x unit per step
				me.scaleSizeInUnits = 0; // How large the scale is in the base unit (seconds, minutes, etc)
	
				// Set unit override if applicable
				if (me.options.time.unit) {
					me.tickUnit = me.options.time.unit || 'day';
					me.displayFormat = me.options.time.displayFormats[me.tickUnit];
					me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
					me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, 1);
				} else {
					// Determine the smallest needed unit of the time
					var innerWidth = me.isHorizontal() ? me.width - (me.paddingLeft + me.paddingRight) : me.height - (me.paddingTop + me.paddingBottom);
	
					// Crude approximation of what the label length might be
					var tempFirstLabel = me.tickFormatFunction(me.firstTick, 0, []);
					var tickLabelWidth = me.ctx.measureText(tempFirstLabel).width;
					var cosRotation = Math.cos(helpers.toRadians(me.options.ticks.maxRotation));
					var sinRotation = Math.sin(helpers.toRadians(me.options.ticks.maxRotation));
					tickLabelWidth = (tickLabelWidth * cosRotation) + (tickFontSize * sinRotation);
					var labelCapacity = innerWidth / (tickLabelWidth);
	
					// Start as small as possible
					me.tickUnit = me.options.time.minUnit;
					me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
					me.displayFormat = me.options.time.displayFormats[me.tickUnit];
	
					var unitDefinitionIndex = 0;
					var unitDefinition = time.units[unitDefinitionIndex];
	
					// While we aren't ideal and we don't have units left
					while (unitDefinitionIndex < time.units.length) {
						// Can we scale this unit. If `false` we can scale infinitely
						me.unitScale = 1;
	
						if (helpers.isArray(unitDefinition.steps) && Math.ceil(me.scaleSizeInUnits / labelCapacity) < helpers.max(unitDefinition.steps)) {
							// Use one of the prefedined steps
							for (var idx = 0; idx < unitDefinition.steps.length; ++idx) {
								if (unitDefinition.steps[idx] >= Math.ceil(me.scaleSizeInUnits / labelCapacity)) {
									me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, unitDefinition.steps[idx]);
									break;
								}
							}
	
							break;
						} else if ((unitDefinition.maxStep === false) || (Math.ceil(me.scaleSizeInUnits / labelCapacity) < unitDefinition.maxStep)) {
							// We have a max step. Scale this unit
							me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, Math.ceil(me.scaleSizeInUnits / labelCapacity));
							break;
						} else {
							// Move to the next unit up
							++unitDefinitionIndex;
							unitDefinition = time.units[unitDefinitionIndex];
	
							me.tickUnit = unitDefinition.name;
							var leadingUnitBuffer = me.firstTick.diff(me.getMomentStartOf(me.firstTick), me.tickUnit, true);
							var trailingUnitBuffer = me.getMomentStartOf(me.lastTick.clone().add(1, me.tickUnit)).diff(me.lastTick, me.tickUnit, true);
							me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true) + leadingUnitBuffer + trailingUnitBuffer;
							me.displayFormat = me.options.time.displayFormats[unitDefinition.name];
						}
					}
				}
	
				var roundedStart;
	
				// Only round the first tick if we have no hard minimum
				if (!me.options.time.min) {
					me.firstTick = me.getMomentStartOf(me.firstTick);
					roundedStart = me.firstTick;
				} else {
					roundedStart = me.getMomentStartOf(me.firstTick);
				}
	
				// Only round the last tick if we have no hard maximum
				if (!me.options.time.max) {
					var roundedEnd = me.getMomentStartOf(me.lastTick);
					var delta = roundedEnd.diff(me.lastTick, me.tickUnit, true);
					if (delta < 0) {
						// Do not use end of because we need me to be in the next time unit
						me.lastTick = me.getMomentStartOf(me.lastTick.add(1, me.tickUnit));
					} else if (delta >= 0) {
						me.lastTick = roundedEnd;
					}
	
					me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
				}
	
				// Tick displayFormat override
				if (me.options.time.displayFormat) {
					me.displayFormat = me.options.time.displayFormat;
				}
	
				// first tick. will have been rounded correctly if options.time.min is not specified
				me.ticks.push(me.firstTick.clone());
	
				// For every unit in between the first and last moment, create a moment and add it to the ticks tick
				for (var i = 1; i <= me.scaleSizeInUnits; ++i) {
					var newTick = roundedStart.clone().add(i, me.tickUnit);
	
					// Are we greater than the max time
					if (me.options.time.max && newTick.diff(me.lastTick, me.tickUnit, true) >= 0) {
						break;
					}
	
					if (i % me.unitScale === 0) {
						me.ticks.push(newTick);
					}
				}
	
				// Always show the right tick
				var diff = me.ticks[me.ticks.length - 1].diff(me.lastTick, me.tickUnit);
				if (diff !== 0 || me.scaleSizeInUnits === 0) {
					// this is a weird case. If the <max> option is the same as the end option, we can't just diff the times because the tick was created from the roundedStart
					// but the last tick was not rounded.
					if (me.options.time.max) {
						me.ticks.push(me.lastTick.clone());
						me.scaleSizeInUnits = me.lastTick.diff(me.ticks[0], me.tickUnit, true);
					} else {
						me.ticks.push(me.lastTick.clone());
						me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
					}
				}
	
				me.ctx.restore();
	
				// Invalidate label diffs cache
				me.labelDiffs = undefined;
			},
			// Get tooltip label
			getLabelForIndex: function(index, datasetIndex) {
				var me = this;
				var label = me.chart.data.labels && index < me.chart.data.labels.length ? me.chart.data.labels[index] : '';
	
				if (typeof me.chart.data.datasets[datasetIndex].data[0] === 'object') {
					label = me.getRightValue(me.chart.data.datasets[datasetIndex].data[index]);
				}
	
				// Format nicely
				if (me.options.time.tooltipFormat) {
					label = me.parseTime(label).format(me.options.time.tooltipFormat);
				}
	
				return label;
			},
			// Function to format an individual tick mark
			tickFormatFunction: function(tick, index, ticks) {
				var formattedTick = tick.format(this.displayFormat);
				var tickOpts = this.options.ticks;
				var callback = helpers.getValueOrDefault(tickOpts.callback, tickOpts.userCallback);
	
				if (callback) {
					return callback(formattedTick, index, ticks);
				}
				return formattedTick;
			},
			convertTicksToLabels: function() {
				var me = this;
				me.tickMoments = me.ticks;
				me.ticks = me.ticks.map(me.tickFormatFunction, me);
			},
			getPixelForValue: function(value, index, datasetIndex) {
				var me = this;
				var offset = null;
				if (index !== undefined && datasetIndex !== undefined) {
					offset = me.getLabelDiff(datasetIndex, index);
				}
	
				if (offset === null) {
					if (!value || !value.isValid) {
						// not already a moment object
						value = me.parseTime(me.getRightValue(value));
					}
					if (value && value.isValid && value.isValid()) {
						offset = value.diff(me.firstTick, me.tickUnit, true);
					}
				}
	
				if (offset !== null) {
					var decimal = offset !== 0 ? offset / me.scaleSizeInUnits : offset;
	
					if (me.isHorizontal()) {
						var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
						var valueOffset = (innerWidth * decimal) + me.paddingLeft;
	
						return me.left + Math.round(valueOffset);
					}
					var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
					var heightOffset = (innerHeight * decimal) + me.paddingTop;
	
					return me.top + Math.round(heightOffset);
				}
			},
			getPixelForTick: function(index) {
				return this.getPixelForValue(this.tickMoments[index], null, null);
			},
			getValueForPixel: function(pixel) {
				var me = this;
				var innerDimension = me.isHorizontal() ? me.width - (me.paddingLeft + me.paddingRight) : me.height - (me.paddingTop + me.paddingBottom);
				var offset = (pixel - (me.isHorizontal() ? me.left + me.paddingLeft : me.top + me.paddingTop)) / innerDimension;
				offset *= me.scaleSizeInUnits;
				return me.firstTick.clone().add(moment.duration(offset, me.tickUnit).asSeconds(), 'seconds');
			},
			parseTime: function(label) {
				var me = this;
				if (typeof me.options.time.parser === 'string') {
					return moment(label, me.options.time.parser);
				}
				if (typeof me.options.time.parser === 'function') {
					return me.options.time.parser(label);
				}
				// Date objects
				if (typeof label.getMonth === 'function' || typeof label === 'number') {
					return moment(label);
				}
				// Moment support
				if (label.isValid && label.isValid()) {
					return label;
				}
				// Custom parsing (return an instance of moment)
				if (typeof me.options.time.format !== 'string' && me.options.time.format.call) {
					console.warn('options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale');
					return me.options.time.format(label);
				}
				// Moment format parsing
				return moment(label, me.options.time.format);
			}
		});
		Chart.scaleService.registerScaleType('time', TimeScale, defaultConfig);
	
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.bar = {
			hover: {
				mode: 'label'
			},
	
			scales: {
				xAxes: [{
					type: 'category',
	
					// Specific to Bar Controller
					categoryPercentage: 0.8,
					barPercentage: 0.9,
	
					// grid line settings
					gridLines: {
						offsetGridLines: true
					}
				}],
				yAxes: [{
					type: 'linear'
				}]
			}
		};
	
		Chart.controllers.bar = Chart.DatasetController.extend({
	
			dataElementType: Chart.elements.Rectangle,
	
			initialize: function(chart, datasetIndex) {
				Chart.DatasetController.prototype.initialize.call(this, chart, datasetIndex);
	
				// Use this to indicate that this is a bar dataset.
				this.getMeta().bar = true;
			},
	
			// Get the number of datasets that display bars. We use this to correctly calculate the bar width
			getBarCount: function() {
				var me = this;
				var barCount = 0;
				helpers.each(me.chart.data.datasets, function(dataset, datasetIndex) {
					var meta = me.chart.getDatasetMeta(datasetIndex);
					if (meta.bar && me.chart.isDatasetVisible(datasetIndex)) {
						++barCount;
					}
				}, me);
				return barCount;
			},
	
			update: function(reset) {
				var me = this;
				helpers.each(me.getMeta().data, function(rectangle, index) {
					me.updateElement(rectangle, index, reset);
				}, me);
			},
	
			updateElement: function(rectangle, index, reset) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var yScale = me.getScaleForId(meta.yAxisID);
				var scaleBase = yScale.getBasePixel();
				var rectangleElementOptions = me.chart.options.elements.rectangle;
				var custom = rectangle.custom || {};
				var dataset = me.getDataset();
	
				helpers.extend(rectangle, {
					// Utility
					_xScale: xScale,
					_yScale: yScale,
					_datasetIndex: me.index,
					_index: index,
	
					// Desired view properties
					_model: {
						x: me.calculateBarX(index, me.index),
						y: reset ? scaleBase : me.calculateBarY(index, me.index),
	
						// Tooltip
						label: me.chart.data.labels[index],
						datasetLabel: dataset.label,
	
						// Appearance
						base: reset ? scaleBase : me.calculateBarBase(me.index, index),
						width: me.calculateBarWidth(index),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
						borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
						borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
					}
				});
				rectangle.pivot();
			},
	
			calculateBarBase: function(datasetIndex, index) {
				var me = this;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var base = 0;
	
				if (yScale.options.stacked) {
					var chart = me.chart;
					var datasets = chart.data.datasets;
					var value = Number(datasets[datasetIndex].data[index]);
	
					for (var i = 0; i < datasetIndex; i++) {
						var currentDs = datasets[i];
						var currentDsMeta = chart.getDatasetMeta(i);
						if (currentDsMeta.bar && currentDsMeta.yAxisID === yScale.id && chart.isDatasetVisible(i)) {
							var currentVal = Number(currentDs.data[index]);
							base += value < 0 ? Math.min(currentVal, 0) : Math.max(currentVal, 0);
						}
					}
	
					return yScale.getPixelForValue(base);
				}
	
				return yScale.getBasePixel();
			},
	
			getRuler: function(index) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var datasetCount = me.getBarCount();
	
				var tickWidth;
	
				if (xScale.options.type === 'category') {
					tickWidth = xScale.getPixelForTick(index + 1) - xScale.getPixelForTick(index);
				} else {
					// Average width
					tickWidth = xScale.width / xScale.ticks.length;
				}
				var categoryWidth = tickWidth * xScale.options.categoryPercentage;
				var categorySpacing = (tickWidth - (tickWidth * xScale.options.categoryPercentage)) / 2;
				var fullBarWidth = categoryWidth / datasetCount;
	
				if (xScale.ticks.length !== me.chart.data.labels.length) {
					var perc = xScale.ticks.length / me.chart.data.labels.length;
					fullBarWidth = fullBarWidth * perc;
				}
	
				var barWidth = fullBarWidth * xScale.options.barPercentage;
				var barSpacing = fullBarWidth - (fullBarWidth * xScale.options.barPercentage);
	
				return {
					datasetCount: datasetCount,
					tickWidth: tickWidth,
					categoryWidth: categoryWidth,
					categorySpacing: categorySpacing,
					fullBarWidth: fullBarWidth,
					barWidth: barWidth,
					barSpacing: barSpacing
				};
			},
	
			calculateBarWidth: function(index) {
				var xScale = this.getScaleForId(this.getMeta().xAxisID);
				if (xScale.options.barThickness) {
					return xScale.options.barThickness;
				}
				var ruler = this.getRuler(index);
				return xScale.options.stacked ? ruler.categoryWidth : ruler.barWidth;
			},
	
			// Get bar index from the given dataset index accounting for the fact that not all bars are visible
			getBarIndex: function(datasetIndex) {
				var barIndex = 0;
				var meta, j;
	
				for (j = 0; j < datasetIndex; ++j) {
					meta = this.chart.getDatasetMeta(j);
					if (meta.bar && this.chart.isDatasetVisible(j)) {
						++barIndex;
					}
				}
	
				return barIndex;
			},
	
			calculateBarX: function(index, datasetIndex) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var barIndex = me.getBarIndex(datasetIndex);
	
				var ruler = me.getRuler(index);
				var leftTick = xScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
				leftTick -= me.chart.isCombo ? (ruler.tickWidth / 2) : 0;
	
				if (xScale.options.stacked) {
					return leftTick + (ruler.categoryWidth / 2) + ruler.categorySpacing;
				}
	
				return leftTick +
					(ruler.barWidth / 2) +
					ruler.categorySpacing +
					(ruler.barWidth * barIndex) +
					(ruler.barSpacing / 2) +
					(ruler.barSpacing * barIndex);
			},
	
			calculateBarY: function(index, datasetIndex) {
				var me = this;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var value = Number(me.getDataset().data[index]);
	
				if (yScale.options.stacked) {
	
					var sumPos = 0,
						sumNeg = 0;
	
					for (var i = 0; i < datasetIndex; i++) {
						var ds = me.chart.data.datasets[i];
						var dsMeta = me.chart.getDatasetMeta(i);
						if (dsMeta.bar && dsMeta.yAxisID === yScale.id && me.chart.isDatasetVisible(i)) {
							var stackedVal = Number(ds.data[index]);
							if (stackedVal < 0) {
								sumNeg += stackedVal || 0;
							} else {
								sumPos += stackedVal || 0;
							}
						}
					}
	
					if (value < 0) {
						return yScale.getPixelForValue(sumNeg + value);
					}
					return yScale.getPixelForValue(sumPos + value);
				}
	
				return yScale.getPixelForValue(value);
			},
	
			draw: function(ease) {
				var me = this;
				var easingDecimal = ease || 1;
				helpers.each(me.getMeta().data, function(rectangle, index) {
					var d = me.getDataset().data[index];
					if (d !== null && d !== undefined && !isNaN(d)) {
						rectangle.transition(easingDecimal).draw();
					}
				}, me);
			},
	
			setHoverStyle: function(rectangle) {
				var dataset = this.chart.data.datasets[rectangle._datasetIndex];
				var index = rectangle._index;
	
				var custom = rectangle.custom || {};
				var model = rectangle._model;
				model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
				model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
				model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
			},
	
			removeHoverStyle: function(rectangle) {
				var dataset = this.chart.data.datasets[rectangle._datasetIndex];
				var index = rectangle._index;
				var custom = rectangle.custom || {};
				var model = rectangle._model;
				var rectangleElementOptions = this.chart.options.elements.rectangle;
	
				model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor);
				model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor);
				model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth);
			}
	
		});
	
	
		// including horizontalBar in the bar file, instead of a file of its own
		// it extends bar (like pie extends doughnut)
		Chart.defaults.horizontalBar = {
			hover: {
				mode: 'label'
			},
	
			scales: {
				xAxes: [{
					type: 'linear',
					position: 'bottom'
				}],
				yAxes: [{
					position: 'left',
					type: 'category',
	
					// Specific to Horizontal Bar Controller
					categoryPercentage: 0.8,
					barPercentage: 0.9,
	
					// grid line settings
					gridLines: {
						offsetGridLines: true
					}
				}]
			},
			elements: {
				rectangle: {
					borderSkipped: 'left'
				}
			},
			tooltips: {
				callbacks: {
					title: function(tooltipItems, data) {
						// Pick first xLabel for now
						var title = '';
	
						if (tooltipItems.length > 0) {
							if (tooltipItems[0].yLabel) {
								title = tooltipItems[0].yLabel;
							} else if (data.labels.length > 0 && tooltipItems[0].index < data.labels.length) {
								title = data.labels[tooltipItems[0].index];
							}
						}
	
						return title;
					},
					label: function(tooltipItem, data) {
						var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
						return datasetLabel + ': ' + tooltipItem.xLabel;
					}
				}
			}
		};
	
		Chart.controllers.horizontalBar = Chart.controllers.bar.extend({
			updateElement: function(rectangle, index, reset) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var yScale = me.getScaleForId(meta.yAxisID);
				var scaleBase = xScale.getBasePixel();
				var custom = rectangle.custom || {};
				var dataset = me.getDataset();
				var rectangleElementOptions = me.chart.options.elements.rectangle;
	
				helpers.extend(rectangle, {
					// Utility
					_xScale: xScale,
					_yScale: yScale,
					_datasetIndex: me.index,
					_index: index,
	
					// Desired view properties
					_model: {
						x: reset ? scaleBase : me.calculateBarX(index, me.index),
						y: me.calculateBarY(index, me.index),
	
						// Tooltip
						label: me.chart.data.labels[index],
						datasetLabel: dataset.label,
	
						// Appearance
						base: reset ? scaleBase : me.calculateBarBase(me.index, index),
						height: me.calculateBarHeight(index),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
						borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
						borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
					},
	
					draw: function() {
						var ctx = this._chart.ctx;
						var vm = this._view;
	
						var halfHeight = vm.height / 2,
							topY = vm.y - halfHeight,
							bottomY = vm.y + halfHeight,
							right = vm.base - (vm.base - vm.x),
							halfStroke = vm.borderWidth / 2;
	
						// Canvas doesn't allow us to stroke inside the width so we can
						// adjust the sizes to fit if we're setting a stroke on the line
						if (vm.borderWidth) {
							topY += halfStroke;
							bottomY -= halfStroke;
							right += halfStroke;
						}
	
						ctx.beginPath();
	
						ctx.fillStyle = vm.backgroundColor;
						ctx.strokeStyle = vm.borderColor;
						ctx.lineWidth = vm.borderWidth;
	
						// Corner points, from bottom-left to bottom-right clockwise
						// | 1 2 |
						// | 0 3 |
						var corners = [
							[vm.base, bottomY],
							[vm.base, topY],
							[right, topY],
							[right, bottomY]
						];
	
						// Find first (starting) corner with fallback to 'bottom'
						var borders = ['bottom', 'left', 'top', 'right'];
						var startCorner = borders.indexOf(vm.borderSkipped, 0);
						if (startCorner === -1) {
							startCorner = 0;
						}
	
						function cornerAt(cornerIndex) {
							return corners[(startCorner + cornerIndex) % 4];
						}
	
						// Draw rectangle from 'startCorner'
						ctx.moveTo.apply(ctx, cornerAt(0));
						for (var i = 1; i < 4; i++) {
							ctx.lineTo.apply(ctx, cornerAt(i));
						}
	
						ctx.fill();
						if (vm.borderWidth) {
							ctx.stroke();
						}
					},
	
					inRange: function(mouseX, mouseY) {
						var vm = this._view;
						var inRange = false;
	
						if (vm) {
							if (vm.x < vm.base) {
								inRange = (mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2) && (mouseX >= vm.x && mouseX <= vm.base);
							} else {
								inRange = (mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2) && (mouseX >= vm.base && mouseX <= vm.x);
							}
						}
	
						return inRange;
					}
				});
	
				rectangle.pivot();
			},
	
			calculateBarBase: function(datasetIndex, index) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var base = 0;
	
				if (xScale.options.stacked) {
					var chart = me.chart;
					var datasets = chart.data.datasets;
					var value = Number(datasets[datasetIndex].data[index]);
	
					for (var i = 0; i < datasetIndex; i++) {
						var currentDs = datasets[i];
						var currentDsMeta = chart.getDatasetMeta(i);
						if (currentDsMeta.bar && currentDsMeta.xAxisID === xScale.id && chart.isDatasetVisible(i)) {
							var currentVal = Number(currentDs.data[index]);
							base += value < 0 ? Math.min(currentVal, 0) : Math.max(currentVal, 0);
						}
					}
	
					return xScale.getPixelForValue(base);
				}
	
				return xScale.getBasePixel();
			},
	
			getRuler: function(index) {
				var me = this;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var datasetCount = me.getBarCount();
	
				var tickHeight;
				if (yScale.options.type === 'category') {
					tickHeight = yScale.getPixelForTick(index + 1) - yScale.getPixelForTick(index);
				} else {
					// Average width
					tickHeight = yScale.width / yScale.ticks.length;
				}
				var categoryHeight = tickHeight * yScale.options.categoryPercentage;
				var categorySpacing = (tickHeight - (tickHeight * yScale.options.categoryPercentage)) / 2;
				var fullBarHeight = categoryHeight / datasetCount;
	
				if (yScale.ticks.length !== me.chart.data.labels.length) {
					var perc = yScale.ticks.length / me.chart.data.labels.length;
					fullBarHeight = fullBarHeight * perc;
				}
	
				var barHeight = fullBarHeight * yScale.options.barPercentage;
				var barSpacing = fullBarHeight - (fullBarHeight * yScale.options.barPercentage);
	
				return {
					datasetCount: datasetCount,
					tickHeight: tickHeight,
					categoryHeight: categoryHeight,
					categorySpacing: categorySpacing,
					fullBarHeight: fullBarHeight,
					barHeight: barHeight,
					barSpacing: barSpacing
				};
			},
	
			calculateBarHeight: function(index) {
				var me = this;
				var yScale = me.getScaleForId(me.getMeta().yAxisID);
				if (yScale.options.barThickness) {
					return yScale.options.barThickness;
				}
				var ruler = me.getRuler(index);
				return yScale.options.stacked ? ruler.categoryHeight : ruler.barHeight;
			},
	
			calculateBarX: function(index, datasetIndex) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var value = Number(me.getDataset().data[index]);
	
				if (xScale.options.stacked) {
	
					var sumPos = 0,
						sumNeg = 0;
	
					for (var i = 0; i < datasetIndex; i++) {
						var ds = me.chart.data.datasets[i];
						var dsMeta = me.chart.getDatasetMeta(i);
						if (dsMeta.bar && dsMeta.xAxisID === xScale.id && me.chart.isDatasetVisible(i)) {
							var stackedVal = Number(ds.data[index]);
							if (stackedVal < 0) {
								sumNeg += stackedVal || 0;
							} else {
								sumPos += stackedVal || 0;
							}
						}
					}
	
					if (value < 0) {
						return xScale.getPixelForValue(sumNeg + value);
					}
					return xScale.getPixelForValue(sumPos + value);
				}
	
				return xScale.getPixelForValue(value);
			},
	
			calculateBarY: function(index, datasetIndex) {
				var me = this;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var barIndex = me.getBarIndex(datasetIndex);
	
				var ruler = me.getRuler(index);
				var topTick = yScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
				topTick -= me.chart.isCombo ? (ruler.tickHeight / 2) : 0;
	
				if (yScale.options.stacked) {
					return topTick + (ruler.categoryHeight / 2) + ruler.categorySpacing;
				}
	
				return topTick +
					(ruler.barHeight / 2) +
					ruler.categorySpacing +
					(ruler.barHeight * barIndex) +
					(ruler.barSpacing / 2) +
					(ruler.barSpacing * barIndex);
			}
		});
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.bubble = {
			hover: {
				mode: 'single'
			},
	
			scales: {
				xAxes: [{
					type: 'linear', // bubble should probably use a linear scale by default
					position: 'bottom',
					id: 'x-axis-0' // need an ID so datasets can reference the scale
				}],
				yAxes: [{
					type: 'linear',
					position: 'left',
					id: 'y-axis-0'
				}]
			},
	
			tooltips: {
				callbacks: {
					title: function() {
						// Title doesn't make sense for scatter since we format the data as a point
						return '';
					},
					label: function(tooltipItem, data) {
						var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
						var dataPoint = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
						return datasetLabel + ': (' + dataPoint.x + ', ' + dataPoint.y + ', ' + dataPoint.r + ')';
					}
				}
			}
		};
	
		Chart.controllers.bubble = Chart.DatasetController.extend({
	
			dataElementType: Chart.elements.Point,
	
			update: function(reset) {
				var me = this;
				var meta = me.getMeta();
				var points = meta.data;
	
				// Update Points
				helpers.each(points, function(point, index) {
					me.updateElement(point, index, reset);
				});
			},
	
			updateElement: function(point, index, reset) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var yScale = me.getScaleForId(meta.yAxisID);
	
				var custom = point.custom || {};
				var dataset = me.getDataset();
				var data = dataset.data[index];
				var pointElementOptions = me.chart.options.elements.point;
				var dsIndex = me.index;
	
				helpers.extend(point, {
					// Utility
					_xScale: xScale,
					_yScale: yScale,
					_datasetIndex: dsIndex,
					_index: index,
	
					// Desired view properties
					_model: {
						x: reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(typeof data === 'object' ? data : NaN, index, dsIndex, me.chart.isCombo),
						y: reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, dsIndex),
						// Appearance
						radius: reset ? 0 : custom.radius ? custom.radius : me.getRadius(data),
	
						// Tooltip
						hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
					}
				});
	
				// Trick to reset the styles of the point
				Chart.DatasetController.prototype.removeHoverStyle.call(me, point, pointElementOptions);
	
				var model = point._model;
				model.skip = custom.skip ? custom.skip : (isNaN(model.x) || isNaN(model.y));
	
				point.pivot();
			},
	
			getRadius: function(value) {
				return value.r || this.chart.options.elements.point.radius;
			},
	
			setHoverStyle: function(point) {
				var me = this;
				Chart.DatasetController.prototype.setHoverStyle.call(me, point);
	
				// Radius
				var dataset = me.chart.data.datasets[point._datasetIndex];
				var index = point._index;
				var custom = point.custom || {};
				var model = point._model;
				model.radius = custom.hoverRadius ? custom.hoverRadius : (helpers.getValueAtIndexOrDefault(dataset.hoverRadius, index, me.chart.options.elements.point.hoverRadius)) + me.getRadius(dataset.data[index]);
			},
	
			removeHoverStyle: function(point) {
				var me = this;
				Chart.DatasetController.prototype.removeHoverStyle.call(me, point, me.chart.options.elements.point);
	
				var dataVal = me.chart.data.datasets[point._datasetIndex].data[point._index];
				var custom = point.custom || {};
				var model = point._model;
	
				model.radius = custom.radius ? custom.radius : me.getRadius(dataVal);
			}
		});
	};


/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers,
			defaults = Chart.defaults;
	
		defaults.doughnut = {
			animation: {
				// Boolean - Whether we animate the rotation of the Doughnut
				animateRotate: true,
				// Boolean - Whether we animate scaling the Doughnut from the centre
				animateScale: false
			},
			aspectRatio: 1,
			hover: {
				mode: 'single'
			},
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');
	
				var data = chart.data;
				var datasets = data.datasets;
				var labels = data.labels;
	
				if (datasets.length) {
					for (var i = 0; i < datasets[0].data.length; ++i) {
						text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
						if (labels[i]) {
							text.push(labels[i]);
						}
						text.push('</li>');
					}
				}
	
				text.push('</ul>');
				return text.join('');
			},
			legend: {
				labels: {
					generateLabels: function(chart) {
						var data = chart.data;
						if (data.labels.length && data.datasets.length) {
							return data.labels.map(function(label, i) {
								var meta = chart.getDatasetMeta(0);
								var ds = data.datasets[0];
								var arc = meta.data[i];
								var custom = arc && arc.custom || {};
								var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
								var arcOpts = chart.options.elements.arc;
								var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
								var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
								var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
	
								return {
									text: label,
									fillStyle: fill,
									strokeStyle: stroke,
									lineWidth: bw,
									hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
	
									// Extra data used for toggling the correct item
									index: i
								};
							});
						}
						return [];
					}
				},
	
				onClick: function(e, legendItem) {
					var index = legendItem.index;
					var chart = this.chart;
					var i, ilen, meta;
	
					for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
						meta = chart.getDatasetMeta(i);
						// toggle visibility of index if exists
						if (meta.data[index]) {
							meta.data[index].hidden = !meta.data[index].hidden;
						}
					}
	
					chart.update();
				}
			},
	
			// The percentage of the chart that we cut out of the middle.
			cutoutPercentage: 50,
	
			// The rotation of the chart, where the first data arc begins.
			rotation: Math.PI * -0.5,
	
			// The total circumference of the chart.
			circumference: Math.PI * 2.0,
	
			// Need to override these to give a nice default
			tooltips: {
				callbacks: {
					title: function() {
						return '';
					},
					label: function(tooltipItem, data) {
						return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
					}
				}
			}
		};
	
		defaults.pie = helpers.clone(defaults.doughnut);
		helpers.extend(defaults.pie, {
			cutoutPercentage: 0
		});
	
	
		Chart.controllers.doughnut = Chart.controllers.pie = Chart.DatasetController.extend({
	
			dataElementType: Chart.elements.Arc,
	
			linkScales: helpers.noop,
	
			// Get index of the dataset in relation to the visible datasets. This allows determining the inner and outer radius correctly
			getRingIndex: function(datasetIndex) {
				var ringIndex = 0;
	
				for (var j = 0; j < datasetIndex; ++j) {
					if (this.chart.isDatasetVisible(j)) {
						++ringIndex;
					}
				}
	
				return ringIndex;
			},
	
			update: function(reset) {
				var me = this;
				var chart = me.chart,
					chartArea = chart.chartArea,
					opts = chart.options,
					arcOpts = opts.elements.arc,
					availableWidth = chartArea.right - chartArea.left - arcOpts.borderWidth,
					availableHeight = chartArea.bottom - chartArea.top - arcOpts.borderWidth,
					minSize = Math.min(availableWidth, availableHeight),
					offset = {
						x: 0,
						y: 0
					},
					meta = me.getMeta(),
					cutoutPercentage = opts.cutoutPercentage,
					circumference = opts.circumference;
	
				// If the chart's circumference isn't a full circle, calculate minSize as a ratio of the width/height of the arc
				if (circumference < Math.PI * 2.0) {
					var startAngle = opts.rotation % (Math.PI * 2.0);
					startAngle += Math.PI * 2.0 * (startAngle >= Math.PI ? -1 : startAngle < -Math.PI ? 1 : 0);
					var endAngle = startAngle + circumference;
					var start = {x: Math.cos(startAngle), y: Math.sin(startAngle)};
					var end = {x: Math.cos(endAngle), y: Math.sin(endAngle)};
					var contains0 = (startAngle <= 0 && 0 <= endAngle) || (startAngle <= Math.PI * 2.0 && Math.PI * 2.0 <= endAngle);
					var contains90 = (startAngle <= Math.PI * 0.5 && Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle);
					var contains180 = (startAngle <= -Math.PI && -Math.PI <= endAngle) || (startAngle <= Math.PI && Math.PI <= endAngle);
					var contains270 = (startAngle <= -Math.PI * 0.5 && -Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle);
					var cutout = cutoutPercentage / 100.0;
					var min = {x: contains180 ? -1 : Math.min(start.x * (start.x < 0 ? 1 : cutout), end.x * (end.x < 0 ? 1 : cutout)), y: contains270 ? -1 : Math.min(start.y * (start.y < 0 ? 1 : cutout), end.y * (end.y < 0 ? 1 : cutout))};
					var max = {x: contains0 ? 1 : Math.max(start.x * (start.x > 0 ? 1 : cutout), end.x * (end.x > 0 ? 1 : cutout)), y: contains90 ? 1 : Math.max(start.y * (start.y > 0 ? 1 : cutout), end.y * (end.y > 0 ? 1 : cutout))};
					var size = {width: (max.x - min.x) * 0.5, height: (max.y - min.y) * 0.5};
					minSize = Math.min(availableWidth / size.width, availableHeight / size.height);
					offset = {x: (max.x + min.x) * -0.5, y: (max.y + min.y) * -0.5};
				}
	
				chart.borderWidth = me.getMaxBorderWidth(meta.data);
				chart.outerRadius = Math.max((minSize - chart.borderWidth) / 2, 0);
				chart.innerRadius = Math.max(cutoutPercentage ? (chart.outerRadius / 100) * (cutoutPercentage) : 1, 0);
				chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
				chart.offsetX = offset.x * chart.outerRadius;
				chart.offsetY = offset.y * chart.outerRadius;
	
				meta.total = me.calculateTotal();
	
				me.outerRadius = chart.outerRadius - (chart.radiusLength * me.getRingIndex(me.index));
				me.innerRadius = me.outerRadius - chart.radiusLength;
	
				helpers.each(meta.data, function(arc, index) {
					me.updateElement(arc, index, reset);
				});
			},
	
			updateElement: function(arc, index, reset) {
				var me = this;
				var chart = me.chart,
					chartArea = chart.chartArea,
					opts = chart.options,
					animationOpts = opts.animation,
					centerX = (chartArea.left + chartArea.right) / 2,
					centerY = (chartArea.top + chartArea.bottom) / 2,
					startAngle = opts.rotation, // non reset case handled later
					endAngle = opts.rotation, // non reset case handled later
					dataset = me.getDataset(),
					circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : me.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI)),
					innerRadius = reset && animationOpts.animateScale ? 0 : me.innerRadius,
					outerRadius = reset && animationOpts.animateScale ? 0 : me.outerRadius,
					valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
	
				helpers.extend(arc, {
					// Utility
					_datasetIndex: me.index,
					_index: index,
	
					// Desired view properties
					_model: {
						x: centerX + chart.offsetX,
						y: centerY + chart.offsetY,
						startAngle: startAngle,
						endAngle: endAngle,
						circumference: circumference,
						outerRadius: outerRadius,
						innerRadius: innerRadius,
						label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
					}
				});
	
				var model = arc._model;
				// Resets the visual styles
				this.removeHoverStyle(arc);
	
				// Set correct angles if not resetting
				if (!reset || !animationOpts.animateRotate) {
					if (index === 0) {
						model.startAngle = opts.rotation;
					} else {
						model.startAngle = me.getMeta().data[index - 1]._model.endAngle;
					}
	
					model.endAngle = model.startAngle + model.circumference;
				}
	
				arc.pivot();
			},
	
			removeHoverStyle: function(arc) {
				Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
			},
	
			calculateTotal: function() {
				var dataset = this.getDataset();
				var meta = this.getMeta();
				var total = 0;
				var value;
	
				helpers.each(meta.data, function(element, index) {
					value = dataset.data[index];
					if (!isNaN(value) && !element.hidden) {
						total += Math.abs(value);
					}
				});
	
				/* if (total === 0) {
					total = NaN;
				}*/
	
				return total;
			},
	
			calculateCircumference: function(value) {
				var total = this.getMeta().total;
				if (total > 0 && !isNaN(value)) {
					return (Math.PI * 2.0) * (value / total);
				}
				return 0;
			},
	
			// gets the max border or hover width to properly scale pie charts
			getMaxBorderWidth: function(elements) {
				var max = 0,
					index = this.index,
					length = elements.length,
					borderWidth,
					hoverWidth;
	
				for (var i = 0; i < length; i++) {
					borderWidth = elements[i]._model ? elements[i]._model.borderWidth : 0;
					hoverWidth = elements[i]._chart ? elements[i]._chart.config.data.datasets[index].hoverBorderWidth : 0;
	
					max = borderWidth > max ? borderWidth : max;
					max = hoverWidth > max ? hoverWidth : max;
				}
				return max;
			}
		});
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.line = {
			showLines: true,
			spanGaps: false,
	
			hover: {
				mode: 'label'
			},
	
			scales: {
				xAxes: [{
					type: 'category',
					id: 'x-axis-0'
				}],
				yAxes: [{
					type: 'linear',
					id: 'y-axis-0'
				}]
			}
		};
	
		function lineEnabled(dataset, options) {
			return helpers.getValueOrDefault(dataset.showLine, options.showLines);
		}
	
		Chart.controllers.line = Chart.DatasetController.extend({
	
			datasetElementType: Chart.elements.Line,
	
			dataElementType: Chart.elements.Point,
	
			addElementAndReset: function(index) {
				var me = this;
				var options = me.chart.options;
				var meta = me.getMeta();
	
				Chart.DatasetController.prototype.addElementAndReset.call(me, index);
	
				// Make sure bezier control points are updated
				if (lineEnabled(me.getDataset(), options) && meta.dataset._model.tension !== 0) {
					me.updateBezierControlPoints();
				}
			},
	
			update: function(reset) {
				var me = this;
				var meta = me.getMeta();
				var line = meta.dataset;
				var points = meta.data || [];
				var options = me.chart.options;
				var lineElementOptions = options.elements.line;
				var scale = me.getScaleForId(meta.yAxisID);
				var i, ilen, custom;
				var dataset = me.getDataset();
				var showLine = lineEnabled(dataset, options);
	
				// Update Line
				if (showLine) {
					custom = line.custom || {};
	
					// Compatibility: If the properties are defined with only the old name, use those values
					if ((dataset.tension !== undefined) && (dataset.lineTension === undefined)) {
						dataset.lineTension = dataset.tension;
					}
	
					// Utility
					line._scale = scale;
					line._datasetIndex = me.index;
					// Data
					line._children = points;
					// Model
					line._model = {
						// Appearance
						// The default behavior of lines is to break at null values, according
						// to https://github.com/chartjs/Chart.js/issues/2435#issuecomment-216718158
						// This option gives linse the ability to span gaps
						spanGaps: dataset.spanGaps ? dataset.spanGaps : options.spanGaps,
						tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : (dataset.backgroundColor || lineElementOptions.backgroundColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : (dataset.borderWidth || lineElementOptions.borderWidth),
						borderColor: custom.borderColor ? custom.borderColor : (dataset.borderColor || lineElementOptions.borderColor),
						borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : (dataset.borderCapStyle || lineElementOptions.borderCapStyle),
						borderDash: custom.borderDash ? custom.borderDash : (dataset.borderDash || lineElementOptions.borderDash),
						borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : (dataset.borderDashOffset || lineElementOptions.borderDashOffset),
						borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : (dataset.borderJoinStyle || lineElementOptions.borderJoinStyle),
						fill: custom.fill ? custom.fill : (dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill),
						steppedLine: custom.steppedLine ? custom.steppedLine : helpers.getValueOrDefault(dataset.steppedLine, lineElementOptions.stepped),
						cubicInterpolationMode: custom.cubicInterpolationMode ? custom.cubicInterpolationMode : helpers.getValueOrDefault(dataset.cubicInterpolationMode, lineElementOptions.cubicInterpolationMode),
						// Scale
						scaleTop: scale.top,
						scaleBottom: scale.bottom,
						scaleZero: scale.getBasePixel()
					};
	
					line.pivot();
				}
	
				// Update Points
				for (i=0, ilen=points.length; i<ilen; ++i) {
					me.updateElement(points[i], i, reset);
				}
	
				if (showLine && line._model.tension !== 0) {
					me.updateBezierControlPoints();
				}
	
				// Now pivot the point for animation
				for (i=0, ilen=points.length; i<ilen; ++i) {
					points[i].pivot();
				}
			},
	
			getPointBackgroundColor: function(point, index) {
				var backgroundColor = this.chart.options.elements.point.backgroundColor;
				var dataset = this.getDataset();
				var custom = point.custom || {};
	
				if (custom.backgroundColor) {
					backgroundColor = custom.backgroundColor;
				} else if (dataset.pointBackgroundColor) {
					backgroundColor = helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, backgroundColor);
				} else if (dataset.backgroundColor) {
					backgroundColor = dataset.backgroundColor;
				}
	
				return backgroundColor;
			},
	
			getPointBorderColor: function(point, index) {
				var borderColor = this.chart.options.elements.point.borderColor;
				var dataset = this.getDataset();
				var custom = point.custom || {};
	
				if (custom.borderColor) {
					borderColor = custom.borderColor;
				} else if (dataset.pointBorderColor) {
					borderColor = helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, borderColor);
				} else if (dataset.borderColor) {
					borderColor = dataset.borderColor;
				}
	
				return borderColor;
			},
	
			getPointBorderWidth: function(point, index) {
				var borderWidth = this.chart.options.elements.point.borderWidth;
				var dataset = this.getDataset();
				var custom = point.custom || {};
	
				if (custom.borderWidth) {
					borderWidth = custom.borderWidth;
				} else if (dataset.pointBorderWidth) {
					borderWidth = helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, borderWidth);
				} else if (dataset.borderWidth) {
					borderWidth = dataset.borderWidth;
				}
	
				return borderWidth;
			},
	
			updateElement: function(point, index, reset) {
				var me = this;
				var meta = me.getMeta();
				var custom = point.custom || {};
				var dataset = me.getDataset();
				var datasetIndex = me.index;
				var value = dataset.data[index];
				var yScale = me.getScaleForId(meta.yAxisID);
				var xScale = me.getScaleForId(meta.xAxisID);
				var pointOptions = me.chart.options.elements.point;
				var x, y;
				var labels = me.chart.data.labels || [];
				var includeOffset = (labels.length === 1 || dataset.data.length === 1) || me.chart.isCombo;
	
				// Compatibility: If the properties are defined with only the old name, use those values
				if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
					dataset.pointRadius = dataset.radius;
				}
				if ((dataset.hitRadius !== undefined) && (dataset.pointHitRadius === undefined)) {
					dataset.pointHitRadius = dataset.hitRadius;
				}
	
				x = xScale.getPixelForValue(typeof value === 'object' ? value : NaN, index, datasetIndex, includeOffset);
				y = reset ? yScale.getBasePixel() : me.calculatePointY(value, index, datasetIndex);
	
				// Utility
				point._xScale = xScale;
				point._yScale = yScale;
				point._datasetIndex = datasetIndex;
				point._index = index;
	
				// Desired view properties
				point._model = {
					x: x,
					y: y,
					skip: custom.skip || isNaN(x) || isNaN(y),
					// Appearance
					radius: custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointOptions.radius),
					pointStyle: custom.pointStyle || helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointOptions.pointStyle),
					backgroundColor: me.getPointBackgroundColor(point, index),
					borderColor: me.getPointBorderColor(point, index),
					borderWidth: me.getPointBorderWidth(point, index),
					tension: meta.dataset._model ? meta.dataset._model.tension : 0,
					steppedLine: meta.dataset._model ? meta.dataset._model.steppedLine : false,
					// Tooltip
					hitRadius: custom.hitRadius || helpers.getValueAtIndexOrDefault(dataset.pointHitRadius, index, pointOptions.hitRadius)
				};
			},
	
			calculatePointY: function(value, index, datasetIndex) {
				var me = this;
				var chart = me.chart;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var sumPos = 0;
				var sumNeg = 0;
				var i, ds, dsMeta;
	
				if (yScale.options.stacked) {
					for (i = 0; i < datasetIndex; i++) {
						ds = chart.data.datasets[i];
						dsMeta = chart.getDatasetMeta(i);
						if (dsMeta.type === 'line' && dsMeta.yAxisID === yScale.id && chart.isDatasetVisible(i)) {
							var stackedRightValue = Number(yScale.getRightValue(ds.data[index]));
							if (stackedRightValue < 0) {
								sumNeg += stackedRightValue || 0;
							} else {
								sumPos += stackedRightValue || 0;
							}
						}
					}
	
					var rightValue = Number(yScale.getRightValue(value));
					if (rightValue < 0) {
						return yScale.getPixelForValue(sumNeg + rightValue);
					}
					return yScale.getPixelForValue(sumPos + rightValue);
				}
	
				return yScale.getPixelForValue(value);
			},
	
			updateBezierControlPoints: function() {
				var me = this;
				var meta = me.getMeta();
				var area = me.chart.chartArea;
				var points = (meta.data || []);
				var i, ilen, point, model, controlPoints;
	
				// Only consider points that are drawn in case the spanGaps option is used
				if (meta.dataset._model.spanGaps) {
					points = points.filter(function(pt) {
						return !pt._model.skip;
					});
				}
	
				function capControlPoint(pt, min, max) {
					return Math.max(Math.min(pt, max), min);
				}
	
				if (meta.dataset._model.cubicInterpolationMode === 'monotone') {
					helpers.splineCurveMonotone(points);
				} else {
					for (i = 0, ilen = points.length; i < ilen; ++i) {
						point = points[i];
						model = point._model;
						controlPoints = helpers.splineCurve(
							helpers.previousItem(points, i)._model,
							model,
							helpers.nextItem(points, i)._model,
							meta.dataset._model.tension
						);
						model.controlPointPreviousX = controlPoints.previous.x;
						model.controlPointPreviousY = controlPoints.previous.y;
						model.controlPointNextX = controlPoints.next.x;
						model.controlPointNextY = controlPoints.next.y;
					}
				}
	
				if (me.chart.options.elements.line.capBezierPoints) {
					for (i = 0, ilen = points.length; i < ilen; ++i) {
						model = points[i]._model;
						model.controlPointPreviousX = capControlPoint(model.controlPointPreviousX, area.left, area.right);
						model.controlPointPreviousY = capControlPoint(model.controlPointPreviousY, area.top, area.bottom);
						model.controlPointNextX = capControlPoint(model.controlPointNextX, area.left, area.right);
						model.controlPointNextY = capControlPoint(model.controlPointNextY, area.top, area.bottom);
					}
				}
			},
	
			draw: function(ease) {
				var me = this;
				var meta = me.getMeta();
				var points = meta.data || [];
				var easingDecimal = ease || 1;
				var i, ilen;
	
				// Transition Point Locations
				for (i=0, ilen=points.length; i<ilen; ++i) {
					points[i].transition(easingDecimal);
				}
	
				// Transition and Draw the line
				if (lineEnabled(me.getDataset(), me.chart.options)) {
					meta.dataset.transition(easingDecimal).draw();
				}
	
				// Draw the points
				for (i=0, ilen=points.length; i<ilen; ++i) {
					points[i].draw();
				}
			},
	
			setHoverStyle: function(point) {
				// Point
				var dataset = this.chart.data.datasets[point._datasetIndex];
				var index = point._index;
				var custom = point.custom || {};
				var model = point._model;
	
				model.radius = custom.hoverRadius || helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
				model.backgroundColor = custom.hoverBackgroundColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
				model.borderColor = custom.hoverBorderColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
				model.borderWidth = custom.hoverBorderWidth || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
			},
	
			removeHoverStyle: function(point) {
				var me = this;
				var dataset = me.chart.data.datasets[point._datasetIndex];
				var index = point._index;
				var custom = point.custom || {};
				var model = point._model;
	
				// Compatibility: If the properties are defined with only the old name, use those values
				if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
					dataset.pointRadius = dataset.radius;
				}
	
				model.radius = custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, me.chart.options.elements.point.radius);
				model.backgroundColor = me.getPointBackgroundColor(point, index);
				model.borderColor = me.getPointBorderColor(point, index);
				model.borderWidth = me.getPointBorderWidth(point, index);
			}
		});
	};


/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.polarArea = {
	
			scale: {
				type: 'radialLinear',
				lineArc: true, // so that lines are circular
				ticks: {
					beginAtZero: true
				}
			},
	
			// Boolean - Whether to animate the rotation of the chart
			animation: {
				animateRotate: true,
				animateScale: true
			},
	
			startAngle: -0.5 * Math.PI,
			aspectRatio: 1,
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');
	
				var data = chart.data;
				var datasets = data.datasets;
				var labels = data.labels;
	
				if (datasets.length) {
					for (var i = 0; i < datasets[0].data.length; ++i) {
						text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '">');
						if (labels[i]) {
							text.push(labels[i]);
						}
						text.push('</span></li>');
					}
				}
	
				text.push('</ul>');
				return text.join('');
			},
			legend: {
				labels: {
					generateLabels: function(chart) {
						var data = chart.data;
						if (data.labels.length && data.datasets.length) {
							return data.labels.map(function(label, i) {
								var meta = chart.getDatasetMeta(0);
								var ds = data.datasets[0];
								var arc = meta.data[i];
								var custom = arc.custom || {};
								var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
								var arcOpts = chart.options.elements.arc;
								var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
								var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
								var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
	
								return {
									text: label,
									fillStyle: fill,
									strokeStyle: stroke,
									lineWidth: bw,
									hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
	
									// Extra data used for toggling the correct item
									index: i
								};
							});
						}
						return [];
					}
				},
	
				onClick: function(e, legendItem) {
					var index = legendItem.index;
					var chart = this.chart;
					var i, ilen, meta;
	
					for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
						meta = chart.getDatasetMeta(i);
						meta.data[index].hidden = !meta.data[index].hidden;
					}
	
					chart.update();
				}
			},
	
			// Need to override these to give a nice default
			tooltips: {
				callbacks: {
					title: function() {
						return '';
					},
					label: function(tooltipItem, data) {
						return data.labels[tooltipItem.index] + ': ' + tooltipItem.yLabel;
					}
				}
			}
		};
	
		Chart.controllers.polarArea = Chart.DatasetController.extend({
	
			dataElementType: Chart.elements.Arc,
	
			linkScales: helpers.noop,
	
			update: function(reset) {
				var me = this;
				var chart = me.chart;
				var chartArea = chart.chartArea;
				var meta = me.getMeta();
				var opts = chart.options;
				var arcOpts = opts.elements.arc;
				var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
				chart.outerRadius = Math.max((minSize - arcOpts.borderWidth / 2) / 2, 0);
				chart.innerRadius = Math.max(opts.cutoutPercentage ? (chart.outerRadius / 100) * (opts.cutoutPercentage) : 1, 0);
				chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
	
				me.outerRadius = chart.outerRadius - (chart.radiusLength * me.index);
				me.innerRadius = me.outerRadius - chart.radiusLength;
	
				meta.count = me.countVisibleElements();
	
				helpers.each(meta.data, function(arc, index) {
					me.updateElement(arc, index, reset);
				});
			},
	
			updateElement: function(arc, index, reset) {
				var me = this;
				var chart = me.chart;
				var dataset = me.getDataset();
				var opts = chart.options;
				var animationOpts = opts.animation;
				var scale = chart.scale;
				var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
				var labels = chart.data.labels;
	
				var circumference = me.calculateCircumference(dataset.data[index]);
				var centerX = scale.xCenter;
				var centerY = scale.yCenter;
	
				// If there is NaN data before us, we need to calculate the starting angle correctly.
				// We could be way more efficient here, but its unlikely that the polar area chart will have a lot of data
				var visibleCount = 0;
				var meta = me.getMeta();
				for (var i = 0; i < index; ++i) {
					if (!isNaN(dataset.data[i]) && !meta.data[i].hidden) {
						++visibleCount;
					}
				}
	
				// var negHalfPI = -0.5 * Math.PI;
				var datasetStartAngle = opts.startAngle;
				var distance = arc.hidden ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
				var startAngle = datasetStartAngle + (circumference * visibleCount);
				var endAngle = startAngle + (arc.hidden ? 0 : circumference);
	
				var resetRadius = animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
	
				helpers.extend(arc, {
					// Utility
					_datasetIndex: me.index,
					_index: index,
					_scale: scale,
	
					// Desired view properties
					_model: {
						x: centerX,
						y: centerY,
						innerRadius: 0,
						outerRadius: reset ? resetRadius : distance,
						startAngle: reset && animationOpts.animateRotate ? datasetStartAngle : startAngle,
						endAngle: reset && animationOpts.animateRotate ? datasetStartAngle : endAngle,
						label: getValueAtIndexOrDefault(labels, index, labels[index])
					}
				});
	
				// Apply border and fill style
				me.removeHoverStyle(arc);
	
				arc.pivot();
			},
	
			removeHoverStyle: function(arc) {
				Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
			},
	
			countVisibleElements: function() {
				var dataset = this.getDataset();
				var meta = this.getMeta();
				var count = 0;
	
				helpers.each(meta.data, function(element, index) {
					if (!isNaN(dataset.data[index]) && !element.hidden) {
						count++;
					}
				});
	
				return count;
			},
	
			calculateCircumference: function(value) {
				var count = this.getMeta().count;
				if (count > 0 && !isNaN(value)) {
					return (2 * Math.PI) / count;
				}
				return 0;
			}
		});
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.radar = {
			scale: {
				type: 'radialLinear'
			},
			elements: {
				line: {
					tension: 0 // no bezier in radar
				}
			}
		};
	
		Chart.controllers.radar = Chart.DatasetController.extend({
	
			datasetElementType: Chart.elements.Line,
	
			dataElementType: Chart.elements.Point,
	
			linkScales: helpers.noop,
	
			addElementAndReset: function(index) {
				Chart.DatasetController.prototype.addElementAndReset.call(this, index);
	
				// Make sure bezier control points are updated
				this.updateBezierControlPoints();
			},
	
			update: function(reset) {
				var me = this;
				var meta = me.getMeta();
				var line = meta.dataset;
				var points = meta.data;
				var custom = line.custom || {};
				var dataset = me.getDataset();
				var lineElementOptions = me.chart.options.elements.line;
				var scale = me.chart.scale;
	
				// Compatibility: If the properties are defined with only the old name, use those values
				if ((dataset.tension !== undefined) && (dataset.lineTension === undefined)) {
					dataset.lineTension = dataset.tension;
				}
	
				helpers.extend(meta.dataset, {
					// Utility
					_datasetIndex: me.index,
					// Data
					_children: points,
					_loop: true,
					// Model
					_model: {
						// Appearance
						tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : (dataset.backgroundColor || lineElementOptions.backgroundColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : (dataset.borderWidth || lineElementOptions.borderWidth),
						borderColor: custom.borderColor ? custom.borderColor : (dataset.borderColor || lineElementOptions.borderColor),
						fill: custom.fill ? custom.fill : (dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill),
						borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : (dataset.borderCapStyle || lineElementOptions.borderCapStyle),
						borderDash: custom.borderDash ? custom.borderDash : (dataset.borderDash || lineElementOptions.borderDash),
						borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : (dataset.borderDashOffset || lineElementOptions.borderDashOffset),
						borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : (dataset.borderJoinStyle || lineElementOptions.borderJoinStyle),
	
						// Scale
						scaleTop: scale.top,
						scaleBottom: scale.bottom,
						scaleZero: scale.getBasePosition()
					}
				});
	
				meta.dataset.pivot();
	
				// Update Points
				helpers.each(points, function(point, index) {
					me.updateElement(point, index, reset);
				}, me);
	
	
				// Update bezier control points
				me.updateBezierControlPoints();
			},
			updateElement: function(point, index, reset) {
				var me = this;
				var custom = point.custom || {};
				var dataset = me.getDataset();
				var scale = me.chart.scale;
				var pointElementOptions = me.chart.options.elements.point;
				var pointPosition = scale.getPointPositionForValue(index, dataset.data[index]);
	
				helpers.extend(point, {
					// Utility
					_datasetIndex: me.index,
					_index: index,
					_scale: scale,
	
					// Desired view properties
					_model: {
						x: reset ? scale.xCenter : pointPosition.x, // value not used in dataset scale, but we want a consistent API between scales
						y: reset ? scale.yCenter : pointPosition.y,
	
						// Appearance
						tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.tension, me.chart.options.elements.line.tension),
						radius: custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointElementOptions.radius),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor),
						borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth),
						pointStyle: custom.pointStyle ? custom.pointStyle : helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointElementOptions.pointStyle),
	
						// Tooltip
						hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
					}
				});
	
				point._model.skip = custom.skip ? custom.skip : (isNaN(point._model.x) || isNaN(point._model.y));
			},
			updateBezierControlPoints: function() {
				var chartArea = this.chart.chartArea;
				var meta = this.getMeta();
	
				helpers.each(meta.data, function(point, index) {
					var model = point._model;
					var controlPoints = helpers.splineCurve(
						helpers.previousItem(meta.data, index, true)._model,
						model,
						helpers.nextItem(meta.data, index, true)._model,
						model.tension
					);
	
					// Prevent the bezier going outside of the bounds of the graph
					model.controlPointPreviousX = Math.max(Math.min(controlPoints.previous.x, chartArea.right), chartArea.left);
					model.controlPointPreviousY = Math.max(Math.min(controlPoints.previous.y, chartArea.bottom), chartArea.top);
	
					model.controlPointNextX = Math.max(Math.min(controlPoints.next.x, chartArea.right), chartArea.left);
					model.controlPointNextY = Math.max(Math.min(controlPoints.next.y, chartArea.bottom), chartArea.top);
	
					// Now pivot the point for animation
					point.pivot();
				});
			},
	
			draw: function(ease) {
				var meta = this.getMeta();
				var easingDecimal = ease || 1;
	
				// Transition Point Locations
				helpers.each(meta.data, function(point) {
					point.transition(easingDecimal);
				});
	
				// Transition and Draw the line
				meta.dataset.transition(easingDecimal).draw();
	
				// Draw the points
				helpers.each(meta.data, function(point) {
					point.draw();
				});
			},
	
			setHoverStyle: function(point) {
				// Point
				var dataset = this.chart.data.datasets[point._datasetIndex];
				var custom = point.custom || {};
				var index = point._index;
				var model = point._model;
	
				model.radius = custom.hoverRadius ? custom.hoverRadius : helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
				model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
				model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
				model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
			},
	
			removeHoverStyle: function(point) {
				var dataset = this.chart.data.datasets[point._datasetIndex];
				var custom = point.custom || {};
				var index = point._index;
				var model = point._model;
				var pointElementOptions = this.chart.options.elements.point;
	
				model.radius = custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.radius, index, pointElementOptions.radius);
				model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor);
				model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor);
				model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth);
			}
		});
	};


/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		Chart.Bar = function(context, config) {
			config.type = 'bar';
	
			return new Chart(context, config);
		};
	
	};


/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		Chart.Bubble = function(context, config) {
			config.type = 'bubble';
			return new Chart(context, config);
		};
	
	};


/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		Chart.Doughnut = function(context, config) {
			config.type = 'doughnut';
	
			return new Chart(context, config);
		};
	
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		Chart.Line = function(context, config) {
			config.type = 'line';
	
			return new Chart(context, config);
		};
	
	};


/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		Chart.PolarArea = function(context, config) {
			config.type = 'polarArea';
	
			return new Chart(context, config);
		};
	
	};


/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		Chart.Radar = function(context, config) {
			config.options = Chart.helpers.configMerge({aspectRatio: 1}, config.options);
			config.type = 'radar';
	
			return new Chart(context, config);
		};
	
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function(Chart) {
	
		var defaultConfig = {
			hover: {
				mode: 'single'
			},
	
			scales: {
				xAxes: [{
					type: 'linear', // scatter should not use a category axis
					position: 'bottom',
					id: 'x-axis-1' // need an ID so datasets can reference the scale
				}],
				yAxes: [{
					type: 'linear',
					position: 'left',
					id: 'y-axis-1'
				}]
			},
	
			tooltips: {
				callbacks: {
					title: function() {
						// Title doesn't make sense for scatter since we format the data as a point
						return '';
					},
					label: function(tooltipItem) {
						return '(' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
					}
				}
			}
		};
	
		// Register the default config for this type
		Chart.defaults.scatter = defaultConfig;
	
		// Scatter charts use line controllers
		Chart.controllers.scatter = Chart.controllers.line;
	
		Chart.Scatter = function(context, config) {
			config.type = 'scatter';
			return new Chart(context, config);
		};
	
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Validator = module.exports.Validator = __webpack_require__(47);
	
	module.exports.ValidatorResult = __webpack_require__(55).ValidatorResult;
	module.exports.ValidationError = __webpack_require__(55).ValidationError;
	module.exports.SchemaError = __webpack_require__(55).SchemaError;
	
	module.exports.validate = function (instance, schema, options) {
	  var v = new Validator();
	  return v.validate(instance, schema, options);
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var urilib = __webpack_require__(48);
	
	var attribute = __webpack_require__(54);
	var helpers = __webpack_require__(55);
	var ValidatorResult = helpers.ValidatorResult;
	var SchemaError = helpers.SchemaError;
	var SchemaContext = helpers.SchemaContext;
	
	/**
	 * Creates a new Validator object
	 * @name Validator
	 * @constructor
	 */
	var Validator = function Validator () {
	  // Allow a validator instance to override global custom formats or to have their
	  // own custom formats.
	  this.customFormats = Object.create(Validator.prototype.customFormats);
	  this.schemas = {};
	  this.unresolvedRefs = [];
	
	  // Use Object.create to make this extensible without Validator instances stepping on each other's toes.
	  this.types = Object.create(types);
	  this.attributes = Object.create(attribute.validators);
	};
	
	// Allow formats to be registered globally.
	Validator.prototype.customFormats = {};
	
	// Hint at the presence of a property
	Validator.prototype.schemas = null;
	Validator.prototype.types = null;
	Validator.prototype.attributes = null;
	Validator.prototype.unresolvedRefs = null;
	
	/**
	 * Adds a schema with a certain urn to the Validator instance.
	 * @param schema
	 * @param urn
	 * @return {Object}
	 */
	Validator.prototype.addSchema = function addSchema (schema, uri) {
	  if (!schema) {
	    return null;
	  }
	  var ourUri = uri || schema.id;
	  this.addSubSchema(ourUri, schema);
	  if (ourUri) {
	    this.schemas[ourUri] = schema;
	  }
	  return this.schemas[ourUri];
	};
	
	Validator.prototype.addSubSchema = function addSubSchema(baseuri, schema) {
	  if(!schema || typeof schema!='object') return;
	  // Mark all referenced schemas so we can tell later which schemas are referred to, but never defined
	  if(schema.$ref){
	    var resolvedUri = urilib.resolve(baseuri, schema.$ref);
	    // Only mark unknown schemas as unresolved
	    if (this.schemas[resolvedUri] === undefined) {
	      this.schemas[resolvedUri] = null;
	      this.unresolvedRefs.push(resolvedUri);
	    }
	    return;
	  }
	  var ourUri = schema.id && urilib.resolve(baseuri, schema.id);
	  var ourBase = ourUri || baseuri;
	  if (ourUri) {
	    if(this.schemas[ourUri]){
	      if(!helpers.deepCompareStrict(this.schemas[ourUri], schema)){
	        throw new Error('Schema <'+schema+'> already exists with different definition');
	      }
	      return this.schemas[ourUri];
	    }
	    this.schemas[ourUri] = schema;
	    var documentUri = ourUri.replace(/^([^#]*)#$/, '$1');
	    this.schemas[documentUri] = schema;
	  }
	  this.addSubSchemaArray(ourBase, ((schema.items instanceof Array)?schema.items:[schema.items]));
	  this.addSubSchemaArray(ourBase, ((schema.extends instanceof Array)?schema.extends:[schema.extends]));
	  this.addSubSchema(ourBase, schema.additionalItems);
	  this.addSubSchemaObject(ourBase, schema.properties);
	  this.addSubSchema(ourBase, schema.additionalProperties);
	  this.addSubSchemaObject(ourBase, schema.definitions);
	  this.addSubSchemaObject(ourBase, schema.patternProperties);
	  this.addSubSchemaObject(ourBase, schema.dependencies);
	  this.addSubSchemaArray(ourBase, schema.disallow);
	  this.addSubSchemaArray(ourBase, schema.allOf);
	  this.addSubSchemaArray(ourBase, schema.anyOf);
	  this.addSubSchemaArray(ourBase, schema.oneOf);
	  this.addSubSchema(ourBase, schema.not);
	  return this.schemas[ourUri];
	};
	
	Validator.prototype.addSubSchemaArray = function addSubSchemaArray(baseuri, schemas) {
	  if(!(schemas instanceof Array)) return;
	  for(var i=0; i<schemas.length; i++){
	    this.addSubSchema(baseuri, schemas[i]);
	  }
	};
	
	Validator.prototype.addSubSchemaObject = function addSubSchemaArray(baseuri, schemas) {
	  if(!schemas || typeof schemas!='object') return;
	  for(var p in schemas){
	    this.addSubSchema(baseuri, schemas[p]);
	  }
	};
	
	
	
	/**
	 * Sets all the schemas of the Validator instance.
	 * @param schemas
	 */
	Validator.prototype.setSchemas = function setSchemas (schemas) {
	  this.schemas = schemas;
	};
	
	/**
	 * Returns the schema of a certain urn
	 * @param urn
	 */
	Validator.prototype.getSchema = function getSchema (urn) {
	  return this.schemas[urn];
	};
	
	/**
	 * Validates instance against the provided schema
	 * @param instance
	 * @param schema
	 * @param [options]
	 * @param [ctx]
	 * @return {Array}
	 */
	Validator.prototype.validate = function validate (instance, schema, options, ctx) {
	  if (!options) {
	    options = {};
	  }
	  var propertyName = options.propertyName || 'instance';
	  // This will work so long as the function at uri.resolve() will resolve a relative URI to a relative URI
	  var base = urilib.resolve(options.base||'/', schema.id||'');
	  if(!ctx){
	    ctx = new SchemaContext(schema, options, propertyName, base, Object.create(this.schemas));
	    if (!ctx.schemas[base]) {
	      ctx.schemas[base] = schema;
	    }
	  }
	  if (schema) {
	    var result = this.validateSchema(instance, schema, options, ctx);
	    if (!result) {
	      throw new Error('Result undefined');
	    }
	    return result;
	  }
	  throw new SchemaError('no schema specified', schema);
	};
	
	/**
	 * Validates an instance against the schema (the actual work horse)
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @private
	 * @return {ValidatorResult}
	 */
	Validator.prototype.validateSchema = function validateSchema (instance, schema, options, ctx) {
	  var self = this;
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!schema) {
	    throw new Error("schema is undefined");
	  }
	
	  /**
	  * @param Object schema
	  * @return mixed schema uri or false
	  */
	  function shouldResolve(schema) {
	    var ref = (typeof schema === 'string') ? schema : schema.$ref;
	    if (typeof ref=='string') return ref;
	    return false;
	  }
	  /**
	  * @param Object schema
	  * @param SchemaContext ctx
	  * @returns Object schema or resolved schema
	  */
	  function resolve(schema, ctx) {
	    var ref;
	    if(ref = shouldResolve(schema)) {
	      return self.resolve(schema, ref, ctx).subschema;
	    }
	    return schema;
	  }
	
	  if (schema['extends']) {
	    if (schema['extends'] instanceof Array) {
	      schema['extends'].forEach(function (s) {
	        schema = helpers.deepMerge(schema, resolve(s, ctx));
	      });
	    } else {
	      schema = helpers.deepMerge(schema, resolve(schema['extends'], ctx));
	    }
	  }
	
	  var switchSchema;
	  if (switchSchema = shouldResolve(schema)) {
	    var resolved = this.resolve(schema, switchSchema, ctx);
	    var subctx = new SchemaContext(resolved.subschema, options, ctx.propertyPath, resolved.switchSchema, ctx.schemas);
	    return this.validateSchema(instance, resolved.subschema, options, subctx);
	  }
	
	  var skipAttributes = options && options.skipAttributes || [];
	  // Validate each schema attribute against the instance
	  for (var key in schema) {
	    if (!attribute.ignoreProperties[key] && skipAttributes.indexOf(key) < 0) {
	      var validatorErr = null;
	      var validator = self.attributes[key];
	      if (validator) {
	        validatorErr = validator.call(self, instance, schema, options, ctx);
	      } else if (options.allowUnknownAttributes === false) {
	        // This represents an error with the schema itself, not an invalid instance
	        throw new SchemaError("Unsupported attribute: " + key, schema);
	      }
	      if (validatorErr) {
	        result.importErrors(validatorErr);
	      }
	    }
	  }
	
	  if (typeof options.rewrite == 'function') {
	    var value = options.rewrite.call(this, instance, schema, options, ctx);
	    result.instance = value;
	  }
	  return result;
	};
	
	/**
	* @private
	* @param Object schema
	* @param Object switchSchema
	* @param SchemaContext ctx
	* @return Object resolved schemas {subschema:String, switchSchema: String}
	* @thorws SchemaError
	*/
	Validator.prototype.resolve = function resolve (schema, switchSchema, ctx) {
	  switchSchema = ctx.resolve(switchSchema);
	  // First see if the schema exists under the provided URI
	  if (ctx.schemas[switchSchema]) {
	    return {subschema: ctx.schemas[switchSchema], switchSchema: switchSchema};
	  }
	  // Else try walking the property pointer
	  var parsed = urilib.parse(switchSchema);
	  var fragment = parsed && parsed.hash;
	  var document = fragment && fragment.length && switchSchema.substr(0, switchSchema.length - fragment.length);
	  if (!document || !ctx.schemas[document]) {
	    throw new SchemaError("no such schema <" + switchSchema + ">", schema);
	  }
	  var subschema = helpers.objectGetPath(ctx.schemas[document], fragment.substr(1));
	  if(subschema===undefined){
	    throw new SchemaError("no such schema " + fragment + " located in <" + document + ">", schema);
	  }
	  return {subschema: subschema, switchSchema: switchSchema};
	};
	
	/**
	 * Tests whether the instance if of a certain type.
	 * @private
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @param type
	 * @return {boolean}
	 */
	Validator.prototype.testType = function validateType (instance, schema, options, ctx, type) {
	  if (typeof this.types[type] == 'function') {
	    return this.types[type].call(this, instance);
	  }
	  if (type && typeof type == 'object') {
	    var res = this.validateSchema(instance, type, options, ctx);
	    return res === undefined || !(res && res.errors.length);
	  }
	  // Undefined or properties not on the list are acceptable, same as not being defined
	  return true;
	};
	
	var types = Validator.prototype.types = {};
	types.string = function testString (instance) {
	  return typeof instance == 'string';
	};
	types.number = function testNumber (instance) {
	  // isFinite returns false for NaN, Infinity, and -Infinity
	  return typeof instance == 'number' && isFinite(instance);
	};
	types.integer = function testInteger (instance) {
	  return (typeof instance == 'number') && instance % 1 === 0;
	};
	types.boolean = function testBoolean (instance) {
	  return typeof instance == 'boolean';
	};
	types.array = function testArray (instance) {
	  return instance instanceof Array;
	};
	types['null'] = function testNull (instance) {
	  return instance === null;
	};
	types.date = function testDate (instance) {
	  return instance instanceof Date;
	};
	types.any = function testAny (instance) {
	  return true;
	};
	types.object = function testObject (instance) {
	  // TODO: fix this - see #15
	  return instance && (typeof instance) === 'object' && !(instance instanceof Array) && !(instance instanceof Date);
	};
	
	module.exports = Validator;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var punycode = __webpack_require__(49);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(51);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
	            'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  Object.keys(this).forEach(function(k) {
	    result[k] = this[k];
	  }, this);
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function(k) {
	      if (k !== 'protocol')
	        result[k] = relative[k];
	    });
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function(k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host) && (last === '.' || last === '..') ||
	      last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};
	
	function isString(arg) {
	  return typeof arg === "string";
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return  arg == null;
	}


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)(module), (function() { return this; }())))

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(52);
	exports.encode = exports.stringify = __webpack_require__(53);


/***/ },
/* 52 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 53 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var helpers = __webpack_require__(55);
	
	/** @type ValidatorResult */
	var ValidatorResult = helpers.ValidatorResult;
	/** @type SchemaError */
	var SchemaError = helpers.SchemaError;
	
	var attribute = {};
	
	attribute.ignoreProperties = {
	  // informative properties
	  'id': true,
	  'default': true,
	  'description': true,
	  'title': true,
	  // arguments to other properties
	  'exclusiveMinimum': true,
	  'exclusiveMaximum': true,
	  'additionalItems': true,
	  // special-handled properties
	  '$schema': true,
	  '$ref': true,
	  'extends': true
	};
	
	/**
	 * @name validators
	 */
	var validators = attribute.validators = {};
	
	/**
	 * Validates whether the instance if of a certain type
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {ValidatorResult|null}
	 */
	validators.type = function validateType (instance, schema, options, ctx) {
	  // Ignore undefined instances
	  if (instance === undefined) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var types = (schema.type instanceof Array) ? schema.type : [schema.type];
	  if (!types.some(this.testType.bind(this, instance, schema, options, ctx))) {
	    var list = types.map(function (v) {
	      return v.id && ('<' + v.id + '>') || (v+'');
	    });
	    result.addError({
	      name: 'type',
	      argument: list,
	      message: "is not of a type(s) " + list,
	    });
	  }
	  return result;
	};
	
	function testSchema(instance, options, ctx, schema){
	  return this.validateSchema(instance, schema, options, ctx).valid;
	}
	
	/**
	 * Validates whether the instance matches some of the given schemas
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {ValidatorResult|null}
	 */
	validators.anyOf = function validateAnyOf (instance, schema, options, ctx) {
	  // Ignore undefined instances
	  if (instance === undefined) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!(schema.anyOf instanceof Array)){
	    throw new SchemaError("anyOf must be an array");
	  }
	  if (!schema.anyOf.some(testSchema.bind(this, instance, options, ctx))) {
	    var list = schema.anyOf.map(function (v, i) {
	      return (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema '+i+']';
	    });
	    result.addError({
	      name: 'anyOf',
	      argument: list,
	      message: "is not any of " + list.join(','),
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance matches every given schema
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null}
	 */
	validators.allOf = function validateAllOf (instance, schema, options, ctx) {
	  // Ignore undefined instances
	  if (instance === undefined) {
	    return null;
	  }
	  if (!(schema.allOf instanceof Array)){
	    throw new SchemaError("allOf must be an array");
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var self = this;
	  schema.allOf.forEach(function(v, i){
	    var valid = self.validateSchema(instance, v, options, ctx);
	    if(!valid.valid){
	      var msg = (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema '+i+']';
	      result.addError({
	        name: 'allOf',
	        argument: { id: msg, length: valid.errors.length, valid: valid },
	        message: 'does not match allOf schema ' + msg + ' with ' + valid.errors.length + ' error[s]:',
	      });
	      result.importErrors(valid);
	    }
	  });
	  return result;
	};
	
	/**
	 * Validates whether the instance matches exactly one of the given schemas
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null}
	 */
	validators.oneOf = function validateOneOf (instance, schema, options, ctx) {
	  // Ignore undefined instances
	  if (instance === undefined) {
	    return null;
	  }
	  if (!(schema.oneOf instanceof Array)){
	    throw new SchemaError("oneOf must be an array");
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var count = schema.oneOf.filter(testSchema.bind(this, instance, options, ctx)).length;
	  var list = schema.oneOf.map(function (v, i) {
	    return (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema '+i+']';
	  });
	  if (count!==1) {
	    result.addError({
	      name: 'oneOf',
	      argument: list,
	      message: "is not exactly one from " + list.join(','),
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates properties
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null|ValidatorResult}
	 */
	validators.properties = function validateProperties (instance, schema, options, ctx) {
	  if(instance === undefined || !(instance instanceof Object)) return;
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var properties = schema.properties || {};
	  for (var property in properties) {
	    var prop = (instance || undefined) && instance[property];
	    var res = this.validateSchema(prop, properties[property], options, ctx.makeChild(properties[property], property));
	    if(res.instance !== result.instance[property]) result.instance[property] = res.instance;
	    result.importErrors(res);
	  }
	  return result;
	};
	
	/**
	 * Test a specific property within in instance against the additionalProperties schema attribute
	 * This ignores properties with definitions in the properties schema attribute, but no other attributes.
	 * If too many more types of property-existance tests pop up they may need their own class of tests (like `type` has)
	 * @private
	 * @return {boolean}
	 */
	function testAdditionalProperty (instance, schema, options, ctx, property, result) {
	  if (schema.properties && schema.properties[property] !== undefined) {
	    return;
	  }
	  if (schema.additionalProperties === false) {
	    result.addError({
	      name: 'additionalProperties',
	      argument: property,
	      message: "additionalProperty " + JSON.stringify(property) + " exists in instance when not allowed",
	    });
	  } else {
	    var additionalProperties = schema.additionalProperties || {};
	    var res = this.validateSchema(instance[property], additionalProperties, options, ctx.makeChild(additionalProperties, property));
	    if(res.instance !== result.instance[property]) result.instance[property] = res.instance;
	    result.importErrors(res);
	  }
	}
	
	/**
	 * Validates patternProperties
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null|ValidatorResult}
	 */
	validators.patternProperties = function validatePatternProperties (instance, schema, options, ctx) {
	  if(instance === undefined) return;
	  if(!this.types.object(instance)) return;
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var patternProperties = schema.patternProperties || {};
	
	  for (var property in instance) {
	    var test = true;
	    for (var pattern in patternProperties) {
	      var expr = new RegExp(pattern);
	      if (!expr.test(property)) {
	        continue;
	      }
	      test = false;
	      var res = this.validateSchema(instance[property], patternProperties[pattern], options, ctx.makeChild(patternProperties[pattern], property));
	      if(res.instance !== result.instance[property]) result.instance[property] = res.instance;
	      result.importErrors(res);
	    }
	    if (test) {
	      testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
	    }
	  }
	
	  return result;
	};
	
	/**
	 * Validates additionalProperties
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null|ValidatorResult}
	 */
	validators.additionalProperties = function validateAdditionalProperties (instance, schema, options, ctx) {
	  if(instance === undefined) return;
	  if(!this.types.object(instance)) return;
	  // if patternProperties is defined then we'll test when that one is called instead
	  if (schema.patternProperties) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  for (var property in instance) {
	    testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.minProperties = function validateMinProperties (instance, schema, options, ctx) {
	  if (!instance || typeof instance !== 'object') {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var keys = Object.keys(instance);
	  if (!(keys.length >= schema.minProperties)) {
	    result.addError({
	      name: 'minProperties',
	      argument: schema.minProperties,
	      message: "does not meet minimum property length of " + schema.minProperties,
	    })
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.maxProperties = function validateMaxProperties (instance, schema, options, ctx) {
	  if (!instance || typeof instance !== 'object') {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var keys = Object.keys(instance);
	  if (!(keys.length <= schema.maxProperties)) {
	    result.addError({
	      name: 'maxProperties',
	      argument: schema.maxProperties,
	      message: "does not meet maximum property length of " + schema.maxProperties,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates items when instance is an array
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null|ValidatorResult}
	 */
	validators.items = function validateItems (instance, schema, options, ctx) {
	  if (!(instance instanceof Array)) {
	    return null;
	  }
	  var self = this;
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (instance === undefined || !schema.items) {
	    return result;
	  }
	  instance.every(function (value, i) {
	    var items = (schema.items instanceof Array) ? (schema.items[i] || schema.additionalItems) : schema.items;
	    if (items === undefined) {
	      return true;
	    }
	    if (items === false) {
	      result.addError({
	        name: 'items',
	        message: "additionalItems not permitted",
	      });
	      return false;
	    }
	    var res = self.validateSchema(value, items, options, ctx.makeChild(items, i));
	    if(res.instance !== result.instance[i]) result.instance[i] = res.instance;
	    result.importErrors(res);
	    return true;
	  });
	  return result;
	};
	
	/**
	 * Validates minimum and exclusiveMinimum when the type of the instance value is a number.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.minimum = function validateMinimum (instance, schema, options, ctx) {
	  if (typeof instance !== 'number') {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var valid = true;
	  if (schema.exclusiveMinimum && schema.exclusiveMinimum === true) {
	    valid = instance > schema.minimum;
	  } else {
	    valid = instance >= schema.minimum;
	  }
	  if (!valid) {
	    result.addError({
	      name: 'minimum',
	      argument: schema.minimum,
	      message: "must have a minimum value of " + schema.minimum,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates maximum and exclusiveMaximum when the type of the instance value is a number.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.maximum = function validateMaximum (instance, schema, options, ctx) {
	  if (typeof instance !== 'number') {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var valid;
	  if (schema.exclusiveMaximum && schema.exclusiveMaximum === true) {
	    valid = instance < schema.maximum;
	  } else {
	    valid = instance <= schema.maximum;
	  }
	  if (!valid) {
	    result.addError({
	      name: 'maximum',
	      argument: schema.maximum,
	      message: "must have a maximum value of " + schema.maximum,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates divisibleBy when the type of the instance value is a number.
	 * Of course, this is susceptible to floating point error since it compares the floating points
	 * and not the JSON byte sequences to arbitrary precision.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.divisibleBy = function validateDivisibleBy (instance, schema, options, ctx) {
	  if (typeof instance !== 'number') {
	    return null;
	  }
	
	  if (schema.divisibleBy == 0) {
	    throw new SchemaError("divisibleBy cannot be zero");
	  }
	
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (instance / schema.divisibleBy % 1) {
	    result.addError({
	      name: 'divisibleBy',
	      argument: schema.divisibleBy,
	      message: "is not divisible by (multiple of) " + JSON.stringify(schema.divisibleBy),
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates divisibleBy when the type of the instance value is a number.
	 * Of course, this is susceptible to floating point error since it compares the floating points
	 * and not the JSON byte sequences to arbitrary precision.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.multipleOf = function validateMultipleOf (instance, schema, options, ctx) {
	  if (typeof instance !== 'number') {
	    return null;
	  }
	
	  if (schema.multipleOf == 0) {
	    throw new SchemaError("multipleOf cannot be zero");
	  }
	
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (instance / schema.multipleOf % 1) {
	    result.addError({
	      name: 'multipleOf',
	      argument:  schema.multipleOf,
	      message: "is not a multiple of (divisible by) " + JSON.stringify(schema.multipleOf),
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is present.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.required = function validateRequired (instance, schema, options, ctx) {
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (instance === undefined && schema.required === true) {
	    result.addError({
	      name: 'required',
	      message: "is required"
	    });
	  } else if (instance && typeof instance==='object' && Array.isArray(schema.required)) {
	    schema.required.forEach(function(n){
	      if(instance[n]===undefined){
	        result.addError({
	          name: 'required',
	          argument: n,
	          message: "requires property " + JSON.stringify(n),
	        });
	      }
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value matches the regular expression, when the instance value is a string.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.pattern = function validatePattern (instance, schema, options, ctx) {
	  if (typeof instance !== 'string') {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!instance.match(schema.pattern)) {
	    result.addError({
	      name: 'pattern',
	      argument: schema.pattern,
	      message: "does not match pattern " + JSON.stringify(schema.pattern),
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is of a certain defined format or a custom
	 * format.
	 * The following formats are supported for string types:
	 *   - date-time
	 *   - date
	 *   - time
	 *   - ip-address
	 *   - ipv6
	 *   - uri
	 *   - color
	 *   - host-name
	 *   - alpha
	 *   - alpha-numeric
	 *   - utc-millisec
	 * @param instance
	 * @param schema
	 * @param [options]
	 * @param [ctx]
	 * @return {String|null}
	 */
	validators.format = function validateFormat (instance, schema, options, ctx) {
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!result.disableFormat && !helpers.isFormat(instance, schema.format, this)) {
	    result.addError({
	      name: 'format',
	      argument: schema.format,
	      message: "does not conform to the " + JSON.stringify(schema.format) + " format",
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.minLength = function validateMinLength (instance, schema, options, ctx) {
	  if (!(typeof instance === 'string')) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!(instance.length >= schema.minLength)) {
	    result.addError({
	      name: 'minLength',
	      argument: schema.minLength,
	      message: "does not meet minimum length of " + schema.minLength,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.maxLength = function validateMaxLength (instance, schema, options, ctx) {
	  if (!(typeof instance === 'string')) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!(instance.length <= schema.maxLength)) {
	    result.addError({
	      name: 'maxLength',
	      argument: schema.maxLength,
	      message: "does not meet maximum length of " + schema.maxLength,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether instance contains at least a minimum number of items, when the instance is an Array.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.minItems = function validateMinItems (instance, schema, options, ctx) {
	  if (!(instance instanceof Array)) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!(instance.length >= schema.minItems)) {
	    result.addError({
	      name: 'minItems',
	      argument: schema.minItems,
	      message: "does not meet minimum length of " + schema.minItems,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether instance contains no more than a maximum number of items, when the instance is an Array.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.maxItems = function validateMaxItems (instance, schema, options, ctx) {
	  if (!(instance instanceof Array)) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!(instance.length <= schema.maxItems)) {
	    result.addError({
	      name: 'maxItems',
	      argument: schema.maxItems,
	      message: "does not meet maximum length of " + schema.maxItems,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates that every item in an instance array is unique, when instance is an array
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null|ValidatorResult}
	 */
	validators.uniqueItems = function validateUniqueItems (instance, schema, options, ctx) {
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!(instance instanceof Array)) {
	    return result;
	  }
	  function testArrays (v, i, a) {
	    for (var j = i + 1; j < a.length; j++) if (helpers.deepCompareStrict(v, a[j])) {
	      return false;
	    }
	    return true;
	  }
	  if (!instance.every(testArrays)) {
	    result.addError({
	      name: 'uniqueItems',
	      message: "contains duplicate item",
	    });
	  }
	  return result;
	};
	
	/**
	 * Deep compares arrays for duplicates
	 * @param v
	 * @param i
	 * @param a
	 * @private
	 * @return {boolean}
	 */
	function testArrays (v, i, a) {
	  var j, len = a.length;
	  for (j = i + 1, len; j < len; j++) {
	    if (helpers.deepCompareStrict(v, a[j])) {
	      return false;
	    }
	  }
	  return true;
	}
	
	/**
	 * Validates whether there are no duplicates, when the instance is an Array.
	 * @param instance
	 * @return {String|null}
	 */
	validators.uniqueItems = function validateUniqueItems (instance, schema, options, ctx) {
	  if (!(instance instanceof Array)) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!instance.every(testArrays)) {
	    result.addError({
	      name: 'uniqueItems',
	      message: "contains duplicate item",
	    });
	  }
	  return result;
	};
	
	/**
	 * Validate for the presence of dependency properties, if the instance is an object.
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {null|ValidatorResult}
	 */
	validators.dependencies = function validateDependencies (instance, schema, options, ctx) {
	  if (!instance || typeof instance != 'object') {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  for (var property in schema.dependencies) {
	    if (instance[property] === undefined) {
	      continue;
	    }
	    var dep = schema.dependencies[property];
	    var childContext = ctx.makeChild(dep, property);
	    if (typeof dep == 'string') {
	      dep = [dep];
	    }
	    if (dep instanceof Array) {
	      dep.forEach(function (prop) {
	        if (instance[prop] === undefined) {
	          result.addError({
	            // FIXME there's two different "dependencies" errors here with slightly different outputs
	            // Can we make these the same? Or should we create different error types?
	            name: 'dependencies',
	            argument: childContext.propertyPath,
	            message: "property " + prop + " not found, required by " + childContext.propertyPath,
	          });
	        }
	      });
	    } else {
	      var res = this.validateSchema(instance, dep, options, childContext);
	      if(result.instance !== res.instance) result.instance = res.instance;
	      if (res && res.errors.length) {
	        result.addError({
	          name: 'dependencies',
	          argument: childContext.propertyPath,
	          message: "does not meet dependency required by " + childContext.propertyPath,
	        });
	        result.importErrors(res);
	      }
	    }
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is one of the enumerated values.
	 *
	 * @param instance
	 * @param schema
	 * @return {ValidatorResult|null}
	 */
	validators['enum'] = function validateEnum (instance, schema, options, ctx) {
	  if (!(schema['enum'] instanceof Array)) {
	    throw new SchemaError("enum expects an array", schema);
	  }
	  if (instance === undefined) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!schema['enum'].some(helpers.deepCompareStrict.bind(null, instance))) {
	    result.addError({
	      name: 'enum',
	      argument: schema['enum'],
	      message: "is not one of enum values: " + schema['enum'].join(','),
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance if of a prohibited type.
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {null|ValidatorResult}
	 */
	validators.not = validators.disallow = function validateNot (instance, schema, options, ctx) {
	  var self = this;
	  if(instance===undefined) return null;
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var notTypes = schema.not || schema.disallow;
	  if(!notTypes) return null;
	  if(!(notTypes instanceof Array)) notTypes=[notTypes];
	  notTypes.forEach(function (type) {
	    if (self.testType(instance, schema, options, ctx, type)) {
	      var schemaId = type && type.id && ('<' + type.id + '>') || type;
	      result.addError({
	        name: 'not',
	        argument: schemaId,
	        message: "is of prohibited type " + schemaId,
	      });
	    }
	  });
	  return result;
	};
	
	module.exports = attribute;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var uri = __webpack_require__(48);
	
	var ValidationError = exports.ValidationError = function ValidationError (message, instance, schema, propertyPath, name, argument) {
	  if (propertyPath) {
	    this.property = propertyPath;
	  }
	  if (message) {
	    this.message = message;
	  }
	  if (schema) {
	    if (schema.id) {
	      this.schema = schema.id;
	    } else {
	      this.schema = schema;
	    }
	  }
	  if (instance) {
	    this.instance = instance;
	  }
	  this.name = name;
	  this.argument = argument;
	  this.stack = this.toString();
	};
	
	ValidationError.prototype.toString = function toString() {
	  return this.property + ' ' + this.message;
	};
	
	var ValidatorResult = exports.ValidatorResult = function ValidatorResult(instance, schema, options, ctx) {
	  this.instance = instance;
	  this.schema = schema;
	  this.propertyPath = ctx.propertyPath;
	  this.errors = [];
	  this.throwError = options && options.throwError;
	  this.disableFormat = options && options.disableFormat === true;
	};
	
	ValidatorResult.prototype.addError = function addError(detail) {
	  var err;
	  if (typeof detail == 'string') {
	    err = new ValidationError(detail, this.instance, this.schema, this.propertyPath);
	  } else {
	    if (!detail) throw new Error('Missing error detail');
	    if (!detail.message) throw new Error('Missing error message');
	    if (!detail.name) throw new Error('Missing validator type');
	    err = new ValidationError(detail.message, this.instance, this.schema, this.propertyPath, detail.name, detail.argument);
	  }
	
	  if (this.throwError) {
	    throw err;
	  }
	  this.errors.push(err);
	  return err;
	};
	
	ValidatorResult.prototype.importErrors = function importErrors(res) {
	  if (typeof res == 'string' || (res && res.validatorType)) {
	    this.addError(res);
	  } else if (res && res.errors) {
	    var errs = this.errors;
	    res.errors.forEach(function (v) {
	      errs.push(v);
	    });
	  }
	};
	
	ValidatorResult.prototype.toString = function toString(res) {
	  return this.errors.map(function(v,i){ return i+': '+v.toString()+'\n'; }).join('');
	};
	
	Object.defineProperty(ValidatorResult.prototype, "valid", { get: function() {
	  return !this.errors.length;
	} });
	
	/**
	 * Describes a problem with a Schema which prevents validation of an instance
	 * @name SchemaError
	 * @constructor
	 */
	var SchemaError = exports.SchemaError = function SchemaError (msg, schema) {
	  this.message = msg;
	  this.schema = schema;
	  Error.call(this, msg);
	  Error.captureStackTrace(this, SchemaError);
	};
	SchemaError.prototype = Object.create(Error.prototype,
	  { constructor: {value: SchemaError, enumerable: false}
	  , name: {value: 'SchemaError', enumerable: false}
	  });
	
	var SchemaContext = exports.SchemaContext = function SchemaContext (schema, options, propertyPath, base, schemas) {
	  this.schema = schema;
	  this.options = options;
	  this.propertyPath = propertyPath;
	  this.base = base;
	  this.schemas = schemas;
	};
	
	SchemaContext.prototype.resolve = function resolve (target) {
	  return uri.resolve(this.base, target);
	};
	
	SchemaContext.prototype.makeChild = function makeChild(schema, propertyName){
	  var propertyPath = (propertyName===undefined) ? this.propertyPath : this.propertyPath+makeSuffix(propertyName);
	  var base = uri.resolve(this.base, schema.id||'');
	  var ctx = new SchemaContext(schema, this.options, propertyPath, base, Object.create(this.schemas));
	  if(schema.id && !ctx.schemas[base]){
	    ctx.schemas[base] = schema;
	  }
	  return ctx;
	}
	
	var FORMAT_REGEXPS = exports.FORMAT_REGEXPS = {
	  'date-time': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])[tT ](2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])(\.\d+)?([zZ]|[+-]([0-5][0-9]):(60|[0-5][0-9]))$/,
	  'date': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])$/,
	  'time': /^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/,
	
	  'email': /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
	  'ip-address': /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
	  'ipv6': /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
	  'uri': /^[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*$/,
	
	  'color': /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,
	
	  // hostname regex from: http://stackoverflow.com/a/1420225/5628
	  'hostname': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
	  'host-name': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
	
	  'alpha': /^[a-zA-Z]+$/,
	  'alphanumeric': /^[a-zA-Z0-9]+$/,
	  'utc-millisec': function (input) {
	    return (typeof input === 'string') && parseFloat(input) === parseInt(input, 10) && !isNaN(input);
	  },
	  'regex': function (input) {
	    var result = true;
	    try {
	      new RegExp(input);
	    } catch (e) {
	      result = false;
	    }
	    return result;
	  },
	  'style': /\s*(.+?):\s*([^;]+);?/g,
	  'phone': /^\+(?:[0-9] ?){6,14}[0-9]$/
	};
	
	FORMAT_REGEXPS.regexp = FORMAT_REGEXPS.regex;
	FORMAT_REGEXPS.pattern = FORMAT_REGEXPS.regex;
	FORMAT_REGEXPS.ipv4 = FORMAT_REGEXPS['ip-address'];
	
	exports.isFormat = function isFormat (input, format, validator) {
	  if (typeof input === 'string' && FORMAT_REGEXPS[format] !== undefined) {
	    if (FORMAT_REGEXPS[format] instanceof RegExp) {
	      return FORMAT_REGEXPS[format].test(input);
	    }
	    if (typeof FORMAT_REGEXPS[format] === 'function') {
	      return FORMAT_REGEXPS[format](input);
	    }
	  } else if (validator && validator.customFormats &&
	      typeof validator.customFormats[format] === 'function') {
	    return validator.customFormats[format](input);
	  }
	  return true;
	};
	
	var makeSuffix = exports.makeSuffix = function makeSuffix (key) {
	  key = key.toString();
	  // This function could be capable of outputting valid a ECMAScript string, but the
	  // resulting code for testing which form to use would be tens of thousands of characters long
	  // That means this will use the name form for some illegal forms
	  if (!key.match(/[.\s\[\]]/) && !key.match(/^[\d]/)) {
	    return '.' + key;
	  }
	  if (key.match(/^\d+$/)) {
	    return '[' + key + ']';
	  }
	  return '[' + JSON.stringify(key) + ']';
	};
	
	exports.deepCompareStrict = function deepCompareStrict (a, b) {
	  if (typeof a !== typeof b) {
	    return false;
	  }
	  if (a instanceof Array) {
	    if (!(b instanceof Array)) {
	      return false;
	    }
	    if (a.length !== b.length) {
	      return false;
	    }
	    return a.every(function (v, i) {
	      return deepCompareStrict(a[i], b[i]);
	    });
	  }
	  if (typeof a === 'object') {
	    if (!a || !b) {
	      return a === b;
	    }
	    var aKeys = Object.keys(a);
	    var bKeys = Object.keys(b);
	    if (aKeys.length !== bKeys.length) {
	      return false;
	    }
	    return aKeys.every(function (v) {
	      return deepCompareStrict(a[v], b[v]);
	    });
	  }
	  return a === b;
	};
	
	module.exports.deepMerge = function deepMerge (target, src) {
	  var array = Array.isArray(src);
	  var dst = array && [] || {};
	
	  if (array) {
	    target = target || [];
	    dst = dst.concat(target);
	    src.forEach(function (e, i) {
	      if (typeof e === 'object') {
	        dst[i] = deepMerge(target[i], e)
	      } else {
	        if (target.indexOf(e) === -1) {
	          dst.push(e)
	        }
	      }
	    });
	  } else {
	    if (target && typeof target === 'object') {
	      Object.keys(target).forEach(function (key) {
	        dst[key] = target[key];
	      });
	    }
	    Object.keys(src).forEach(function (key) {
	      if (typeof src[key] !== 'object' || !src[key]) {
	        dst[key] = src[key];
	      }
	      else {
	        if (!target[key]) {
	          dst[key] = src[key];
	        } else {
	          dst[key] = deepMerge(target[key], src[key])
	        }
	      }
	    });
	  }
	
	  return dst;
	};
	
	/**
	 * Validates instance against the provided schema
	 * Implements URI+JSON Pointer encoding, e.g. "%7e"="~0"=>"~", "~1"="%2f"=>"/"
	 * @param o
	 * @param s The path to walk o along
	 * @return any
	 */
	exports.objectGetPath = function objectGetPath(o, s) {
	  var parts = s.split('/').slice(1);
	  var k;
	  while (typeof (k=parts.shift()) == 'string') {
	    var n = decodeURIComponent(k.replace(/~0/,'~').replace(/~1/g,'/'));
	    if (!(n in o)) return;
	    o = o[n];
	  }
	  return o;
	};
	
	/**
	 * Accept an Array of property names and return a JSON Pointer URI fragment
	 * @param Array a
	 * @return {String}
	 */
	exports.encodePath = function encodePointer(a){
		// ~ must be encoded explicitly because hacks
		// the slash is encoded by encodeURIComponent
		return a.map(function(v){ return '/'+encodeURIComponent(v).replace(/~/g,'%7E'); }).join('');
	};


/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = {
		"$schema": "http://json-schema.org/draft-04/schema#",
		"title": "Case Log Details Schema",
		"type": "array",
		"items": {
			"title": "Section",
			"description": "Section of form, displayed as a panel",
			"type": "object",
			"properties": {
				"title": {
					"type": "string"
				},
				"subsections": {
					"type": "array",
					"items": {
						"$ref": "#/definitions/subsection"
					}
				}
			},
			"required": "subsections"
		},
		"definitions": {
			"subsection": {
				"title": "Subsection",
				"type": "object",
				"properties": {
					"title": {
						"type": "string"
					},
					"name": {
						"type": "string"
					},
					"report": {
						"$ref": "#/definitions/stringBool"
					},
					"inputs": {
						"type": "array",
						"items": {
							"$ref": "#/definitions/input"
						}
					}
				},
				"required": [
					"name",
					"inputs"
				]
			},
			"input": {
				"title": "Input",
				"type": "object",
				"oneOf": [
					{
						"$ref": "#/definitions/checkbox"
					},
					{
						"$ref": "#/definitions/text"
					}
				]
			},
			"checkbox": {
				"properties": {
					"type": {
						"enum": [
							"checkbox"
						]
					},
					"label": {
						"type": "string"
					},
					"name": {
						"type": "string"
					},
					"properties": {
						"$ref": "#/definitions/properties"
					}
				},
				"required": [
					"type",
					"label"
				]
			},
			"text": {
				"properties": {
					"type": {
						"enum": [
							"text"
						]
					},
					"label": {
						"type": "string"
					},
					"name": {
						"type": "string"
					},
					"placeholder": {
						"type": "string"
					},
					"properties": {
						"$ref": "#/definitions/properties"
					},
					"report": {
						"type": "boolean",
						"default": false
					}
				},
				"required": [
					"type",
					"label"
				]
			},
			"properties": {
				"type": "array",
				"items": {
					"$ref": "#/definitions/property"
				}
			},
			"property": {
				"enum": [
					"required",
					"readonly",
					"selected"
				]
			},
			"stringBool": {
				"enum": [
					"true",
					"false"
				],
				"default": "false"
			}
		}
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.unlimitTableEvals = unlimitTableEvals;
	exports.unlimitRestTableEvals = unlimitRestTableEvals;
	exports.createDateCell = createDateCell;
	exports.createDateTimeCell = createDateTimeCell;
	exports.renderDateCell = renderDateCell;
	exports.renderDateTimeCell = renderDateTimeCell;
	exports.renderAccountStatus = renderAccountStatus;
	exports.renderEvaluationStatus = renderEvaluationStatus;
	exports.renderTrainingLevel = renderTrainingLevel;
	exports.renderSecondaryTrainingLevel = renderSecondaryTrainingLevel;
	exports.renderSubjectEvalUrl = renderSubjectEvalUrl;
	exports.renderEvaluatorEvalUrl = renderEvaluatorEvalUrl;
	exports.renderNewTag = renderNewTag;
	exports.createEditAndDeleteButtons = createEditAndDeleteButtons;
	exports.getDataAttributes = getDataAttributes;
	
	var _constants = __webpack_require__(58);
	
	var _utils = __webpack_require__(59);
	
	var _moment = __webpack_require__(32);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function unlimitTableEvals() {
		var dt = this.DataTable({
			retrieve: true
		});
		var url = dt.ajax.url();
		dt.ajax.url(url.substring(0, url.lastIndexOf("/"))).load().draw();
	}
	
	function unlimitRestTableEvals() {
		var dt = this.DataTable({
			retrieve: true
		});
		var url = dt.ajax.url();
		dt.ajax.url(url.substring(0, url.lastIndexOf("?"))).load().draw();
	}
	
	function createDateCell(td, date) {
		if (date && $(td).text() !== (0, _moment2.default)(date).format("ll")) $(td).attr("data-date-value", (0, _moment2.default)(date).valueOf()).addClass("table-date-cell");
	}
	
	function createDateTimeCell(td, date) {
		if (date && $(td).text() !== (0, _moment2.default)(date).format("ll LT")) $(td).attr("data-date-value", (0, _moment2.default)(date).valueOf()).addClass("table-date-time-cell");
	}
	
	function renderDateCell(date, type) {
		if (type === "sort" || type === "type") return date ? (0, _moment2.default)(date).valueOf() : "";
	
		return date ? (0, _moment2.default)(date).format("MMMM Y") : "";
	}
	
	function renderDateTimeCell(date, type) {
		if (type === "sort" || type === "type") return date ? (0, _moment2.default)(date).valueOf() : "";
	
		return date ? (0, _moment2.default)(date).calendar() : "";
	}
	
	function renderAccountStatus(status) {
		var labelContext = void 0;
		switch (status) {
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
		return '<span class="label ' + labelContext + '">' + (0, _utils.ucfirst)(status) + '</span>';
	}
	
	function renderEvaluationStatus(status) {
		var labelContext = void 0;
		switch (status) {
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
		return '<span class="label ' + labelContext + '">' + (0, _utils.ucfirst)(status) + '</span>';
	}
	
	function renderTrainingLevel(trainingLevel) {
		if (trainingLevel) {
			if (trainingLevel.indexOf("ca-") > -1) return trainingLevel.toUpperCase();else return (0, _utils.ucfirst)(trainingLevel);
		}
	
		return "";
	}
	
	function renderSecondaryTrainingLevel(secondaryTrainingLevel) {
		if (secondaryTrainingLevel) {
			var allCaps = ["raaps"];
			if (allCaps.indexOf(secondaryTrainingLevel) > -1) return secondaryTrainingLevel.toUpperCase();else return (0, _utils.ucfirst)(secondaryTrainingLevel);
		}
	
		return "";
	}
	
	function renderSubjectEvalUrl(url, type, evaluation) {
		if (['sort', 'type'].indexOf(type) !== -1) {
			if (evaluation.seen_by_subject_at) {
				return evaluation.id;
			} else {
				if (typeof evaluation.id === 'number') return evaluation.id * _constants.UNSEEN_EVALUATION_PRIORITY;else return '~' + evaluation.id;
			}
		}
	
		if (evaluation.seen_by_subject_at) return url;else return _constants.NEW_ITEM_TAG + ' ' + url;
	}
	
	function renderEvaluatorEvalUrl(url, type, evaluation) {
		if (['sort', 'type'].indexOf(type) !== -1) {
			if (evaluation.seen_by_evaluator_at) {
				return evaluation.id;
			} else {
				if (typeof evaluation.id === 'number') return evaluation.id * _constants.UNSEEN_EVALUATION_PRIORITY;else return '~' + evaluation.id;
			}
		}
	
		if (evaluation.seen_by_evaluator_at) return url;else return _constants.NEW_ITEM_TAG + ' ' + url;
	}
	
	function renderNewTag(type, evaluation) {
		if (evaluation.seen_by_evaluator_at) return '';else return _constants.NEW_ITEM_TAG;
	}
	
	function createEditAndDeleteButtons(thing, name) {
		var dataAttributes = getDataAttributes(thing);
	
		var editButton = '<button type="button" class="btn btn-xs btn-info edit-' + name + '-button" ' + dataAttributes + '><span class="glyphicon glyphicon-edit"></span> Edit</button>';
	
		var deleteButton = '<button type="button" class="btn btn-xs btn-danger delete-' + name + '-button" ' + dataAttributes + '><span class="glyphicon glyphicon-remove"></span> Delete</button>';
	
		return [editButton, deleteButton];
	}
	
	function getDataAttributes(thing) {
		var excludes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
		var dataAttributes = "";
		Object.getOwnPropertyNames(thing).forEach(function (propName) {
			if (!(excludes.indexOf(propName) !== -1) && thing[propName] != null) dataAttributes += 'data-' + propName + '="' + thing[propName] + '" ';
		});
		return dataAttributes;
	}

/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var NEW_ITEM_TAG = exports.NEW_ITEM_TAG = '<span class="label label-primary">NEW</span>';
	
	var UNSEEN_EVALUATION_PRIORITY = exports.UNSEEN_EVALUATION_PRIORITY = 1000000;
	
	var STANDARD_OPTIONS = exports.STANDARD_OPTIONS = {
		RESIDENT: [{ value: 0, text: "Not at CBY" }, { value: 1, text: "" }, { value: 2, text: "CBY" }, { value: 3, text: "" }, { value: 4, text: "CA-1" }, { value: 5, text: "" }, { value: 6, text: "CA-2" }, { value: 7, text: "" }, { value: 8, text: "CA-3" }, { value: 9, text: "" }, { value: 10, text: "Attending" }],
		FELLOW: [{ value: 0, text: "Not at fellowship level" }, { value: 1, text: "" }, { value: 2, text: "Fellow - 1" }, { value: 3, text: "" }, { value: 4, text: "Fellow - 2" }, { value: 5, text: "" }, { value: 6, text: "Fellow - 3" }, { value: 7, text: "" }, { value: 8, text: "Fellow - 4" }, { value: 9, text: "" }, { value: 10, text: "Fellow - 5" }],
		FACULTY: [{ value: "strongly-disagree", text: "Strongly Disagree" }, { value: "disagree", text: "Disagree" }, { value: "undecided", text: "Undecided" }, { value: "agree", text: "Agree" }, { value: "strongly-agree", text: "Strongly Agree" }, { value: "n-a", text: "N/A" }]
	};
	
	var REPORT_TYPES = exports.REPORT_TYPES = {
		TRAINEE: 'trainee',
		FORM: 'form'
	};
	
	var CHART_TYPES = exports.CHART_TYPES = ['line', 'bar', 'radar', 'polarArea', 'pie', 'doughnut', 'bubble'];
	
	var CHART_COLORS = exports.CHART_COLORS = {
		MILESTONE: '#ffce56',
		COMPETENCY: '#ff6384',
		OTHER: ['#4bc0c0', '#e7e9ed', '#36a2eb', '#7eda35', '#462aa3', '#dd2727', '#f09113', '#1a7829']
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.appendAlert = appendAlert;
	exports.ucfirst = ucfirst;
	exports.camelCaseToWords = camelCaseToWords;
	exports.fetchMilestoneGroups = fetchMilestoneGroups;
	function appendAlert(alertText) {
		var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#alert-container';
		var alertType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'danger';
		var dismissable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	
		var alert = document.createElement("div");
		alert.className = "alert alert-" + alertType;
		alert.role = "alert";
	
		if (dismissable) {
			alert.className += " alert-dismissable";
			var close = document.createElement("button");
			close.type = "button";
			close.className = "close";
			close.setAttribute("data-dismiss", "alert");
			close.setAttribute("aria-label", "Close");
	
			var innerClose = document.createElement("span");
			innerClose.setAttribute("aria-hidden", "true");
			innerClose.innerHTML = "&times;";
			close.appendChild(innerClose);
	
			alert.appendChild(close);
		}
	
		alert.insertAdjacentHTML("beforeend", alertText);
	
		$(parent).append(alert);
	}
	
	function ucfirst(str) {
		return str.charAt(0).toUpperCase() + str.substring(1);
	}
	
	function camelCaseToWords(str) {
		var result = '';
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var char = _step.value;
	
				if (result === '') {
					result += char.toUpperCase();
				} else if (char === char.toUpperCase()) {
					result += ' ' + char.toLowerCase();
				} else {
					result += char;
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	
		return result;
	}
	
	function fetchMilestoneGroups() {
		return fetch('/milestones', { credentials: 'same-origin' }).then(function (response) {
			if (response.ok) return response.json();else {
				var err = new Error(response.statusText);
				err.response = response;
				throw err;
			}
		}).then(function (milestones) {
			var milestoneGroups = {};
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;
	
			try {
				for (var _iterator2 = milestones[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var milestone = _step2.value;
	
					var _groupTitle = ucfirst(milestone.type);
					if (milestone.training_level) _groupTitle += ' \u2014 ' + milestone.training_level;
					if (!milestoneGroups[_groupTitle]) milestoneGroups[_groupTitle] = {
						text: _groupTitle,
						children: []
					};
					milestoneGroups[_groupTitle].children.push({
						id: milestone.id.toString(),
						text: milestone.title
					});
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
	
			for (var groupTitle in milestoneGroups) {
				var milestoneGroup = milestoneGroups[groupTitle];
				milestoneGroup.children.sort(function (a, b) {
					if (a.text < b.text) return 1;else if (a.text > b.text) return -1;else return 0;
				});
			}
			return Object.values(milestoneGroups);
		});
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.renderMilestoneCompetencyLists = renderMilestoneCompetencyLists;
	
	var _vue = __webpack_require__(61);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _MilestoneCompetencyQuestionLists = __webpack_require__(63);
	
	var _MilestoneCompetencyQuestionLists2 = _interopRequireDefault(_MilestoneCompetencyQuestionLists);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function renderMilestoneCompetencyLists(milestoneQuestions, competencyQuestions) {
		var questionMilestonesCompetencies = {};
		for (var questionId in milestoneQuestions) {
			if (!questionMilestonesCompetencies[questionId]) questionMilestonesCompetencies[questionId] = {
				milestones: [],
				competencies: []
			};
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = milestoneQuestions[questionId][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var mq = _step.value;
	
					questionMilestonesCompetencies[questionId].milestones.push(mq.milestone);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	
		for (var _questionId in competencyQuestions) {
			if (!questionMilestonesCompetencies[_questionId]) questionMilestonesCompetencies[_questionId] = {
				milestones: [],
				competencies: []
			};
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;
	
			try {
				for (var _iterator2 = competencyQuestions[_questionId][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var _mq = _step2.value;
	
					questionMilestonesCompetencies[_questionId].competencies.push(_mq.competency);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	
		var containers = {};
		var toggleButtons = {};
		for (var _questionId2 in questionMilestonesCompetencies) {
			containers[_questionId2] = document.createElement('div');
	
			var questionPanel = document.querySelector('#' + _questionId2);
			var questionFooter = questionPanel.querySelector('.question-footer');
			if (!questionFooter) {
				questionFooter = document.createElement('div');
				questionFooter.className = 'question-footer panel-footer';
				questionPanel.appendChild(questionFooter);
			}
			var toggleContainer = questionFooter.querySelector('.question-description-toggle');
			if (!toggleContainer) {
				toggleContainer = document.createElement('div');
				toggleContainer.className = 'question-description-toggle';
				questionFooter.appendChild(toggleContainer);
			}
	
			toggleButtons[_questionId2] = document.createElement('button');
			toggleButtons[_questionId2].type = 'button';
			toggleButtons[_questionId2].className = 'btn btn-info toggle-milestone-competencies-button';
			var glyph = document.createElement('span');
			glyph.className = 'glyphicon glyphicon-list';
			toggleButtons[_questionId2].appendChild(glyph);
			toggleButtons[_questionId2].appendChild(document.createTextNode(' Show milestones and competencies'));
			toggleContainer.appendChild(toggleButtons[_questionId2]);
	
			questionFooter.appendChild(containers[_questionId2]);
		}
	
		var vms = {};
	
		var _loop = function _loop(_questionId3) {
			vms[_questionId3] = new _vue2.default({
				el: containers[_questionId3],
				render: function render(h) {
					return h(_MilestoneCompetencyQuestionLists2.default, {
						props: {
							milestones: questionMilestonesCompetencies[_questionId3].milestones,
							competencies: questionMilestonesCompetencies[_questionId3].competencies
						}
					});
				}
			});
	
			toggleButtons[_questionId3].addEventListener('click', function () {
				toggleButtons[_questionId3].classList.toggle('active');
				vms[_questionId3].$children[0].toggleLists();
			});
		};
	
		for (var _questionId3 in questionMilestonesCompetencies) {
			_loop(_questionId3);
		}
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/*  */
	
	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}
	
	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val, 10)
	  return (n || n === 0) ? n : val
	}
	
	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null)
	  var list = str.split(',')
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}
	
	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true)
	
	/**
	 * Remove an item from an array
	 */
	function remove$1 (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item)
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}
	
	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}
	
	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}
	
	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null)
	  return function cachedFn (str) {
	    var hit = cache[str]
	    return hit || (cache[str] = fn(str))
	  }
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 */
	var camelizeRE = /-(\w)/g
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	})
	
	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	})
	
	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	})
	
	/**
	 * Simple bind, faster than native
	 */
	function bind$1 (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length
	  return boundFn
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0
	  var i = list.length - start
	  var ret = new Array(i)
	  while (i--) {
	    ret[i] = list[i + start]
	  }
	  return ret
	}
	
	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key]
	  }
	  return to
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString
	var OBJECT_STRING = '[object Object]'
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}
	
	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {}
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i])
	    }
	  }
	  return res
	}
	
	/**
	 * Perform no operation.
	 */
	function noop () {}
	
	/**
	 * Always return false.
	 */
	var no = function () { return false; }
	
	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (
	    isObject(a) && isObject(b)
	      ? JSON.stringify(a) === JSON.stringify(b)
	      : false
	  )
	  /* eslint-enable eqeqeq */
	}
	
	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}
	
	/*  */
	
	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),
	
	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,
	
	  /**
	   * Whether to enable devtools
	   */
	  devtools: process.env.NODE_ENV !== 'production',
	
	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,
	
	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: null,
	
	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),
	
	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,
	
	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,
	
	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,
	
	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,
	
	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],
	
	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],
	
	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100,
	
	  /**
	   * Server rendering?
	   */
	  _isServer: process.env.VUE_ENV === 'server'
	}
	
	/*  */
	
	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0)
	  return c === 0x24 || c === 0x5F
	}
	
	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  })
	}
	
	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w\.\$]/
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  } else {
	    var segments = path.split('.')
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) { return }
	        obj = obj[segments[i]]
	      }
	      return obj
	    }
	  }
	}
	
	/*  */
	/* globals MutationObserver */
	
	// can we use __proto__?
	var hasProto = '__proto__' in {}
	
	// Browser environment sniffing
	var inBrowser =
	  typeof window !== 'undefined' &&
	  Object.prototype.toString.call(window) !== '[object Object]'
	
	var UA = inBrowser && window.navigator.userAgent.toLowerCase()
	var isIE = UA && /msie|trident/.test(UA)
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0
	var isEdge = UA && UA.indexOf('edge/') > 0
	var isAndroid = UA && UA.indexOf('android') > 0
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
	
	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__
	
	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}
	
	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = []
	  var pending = false
	  var timerFunc
	
	  function nextTickHandler () {
	    pending = false
	    var copies = callbacks.slice(0)
	    callbacks.length = 0
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]()
	    }
	  }
	
	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve()
	    timerFunc = function () {
	      p.then(nextTickHandler)
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop) }
	    }
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1
	    var observer = new MutationObserver(nextTickHandler)
	    var textNode = document.createTextNode(String(counter))
	    observer.observe(textNode, {
	      characterData: true
	    })
	    timerFunc = function () {
	      counter = (counter + 1) % 2
	      textNode.data = String(counter)
	    }
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = setTimeout
	  }
	
	  return function queueNextTick (cb, ctx) {
	    var func = ctx
	      ? function () { cb.call(ctx) }
	      : cb
	    callbacks.push(func)
	    if (!pending) {
	      pending = true
	      timerFunc(nextTickHandler, 0)
	    }
	  }
	})()
	
	var _Set
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null)
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] !== undefined
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = 1
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null)
	    };
	
	    return Set;
	  }())
	}
	
	/* not type checking this file because flow doesn't play well with Proxy */
	
	var hasProxy;
	var proxyHandlers;
	var initProxy
	
	if (process.env.NODE_ENV !== 'production') {
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  )
	
	  hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/)
	
	  proxyHandlers = {
	    has: function has (target, key) {
	      var has = key in target
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_'
	      if (!has && !isAllowed) {
	        warn(
	          "Property or method \"" + key + "\" is not defined on the instance but " +
	          "referenced during render. Make sure to declare reactive data " +
	          "properties in the data option.",
	          target
	        )
	      }
	      return has || !isAllowed
	    }
	  }
	
	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      vm._renderProxy = new Proxy(vm, proxyHandlers)
	    } else {
	      vm._renderProxy = vm
	    }
	  }
	}
	
	/*  */
	
	
	var uid$2 = 0
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$2++
	  this.subs = []
	};
	
	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub)
	};
	
	Dep.prototype.removeSub = function removeSub (sub) {
	  remove$1(this.subs, sub)
	};
	
	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this)
	  }
	};
	
	Dep.prototype.notify = function notify () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice()
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update()
	  }
	};
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null
	var targetStack = []
	
	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target) }
	  Dep.target = _target
	}
	
	function popTarget () {
	  Dep.target = targetStack.pop()
	}
	
	/*  */
	
	
	var queue = []
	var has$1 = {}
	var circular = {}
	var waiting = false
	var flushing = false
	var index = 0
	
	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0
	  has$1 = {}
	  if (process.env.NODE_ENV !== 'production') {
	    circular = {}
	  }
	  waiting = flushing = false
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true
	
	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; })
	
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    var watcher = queue[index]
	    var id = watcher.id
	    has$1[id] = null
	    watcher.run()
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has$1[id] != null) {
	      circular[id] = (circular[id] || 0) + 1
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        )
	        break
	      }
	    }
	  }
	
	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush')
	  }
	
	  resetSchedulerState()
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id
	  if (has$1[id] == null) {
	    has$1[id] = true
	    if (!flushing) {
	      queue.push(watcher)
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher)
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true
	      nextTick(flushSchedulerQueue)
	    }
	  }
	}
	
	/*  */
	
	var uid$1 = 0
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  if ( options === void 0 ) options = {};
	
	  this.vm = vm
	  vm._watchers.push(this)
	  // options
	  this.deep = !!options.deep
	  this.user = !!options.user
	  this.lazy = !!options.lazy
	  this.sync = !!options.sync
	  this.expression = expOrFn.toString()
	  this.cb = cb
	  this.id = ++uid$1 // uid for batching
	  this.active = true
	  this.dirty = this.lazy // for lazy watchers
	  this.deps = []
	  this.newDeps = []
	  this.depIds = new _Set()
	  this.newDepIds = new _Set()
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn
	  } else {
	    this.getter = parsePath(expOrFn)
	    if (!this.getter) {
	      this.getter = function () {}
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      )
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get()
	};
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this)
	  var value = this.getter.call(this.vm, this.vm)
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value)
	  }
	  popTarget()
	  this.cleanupDeps()
	  return value
	};
	
	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id)
	    this.newDeps.push(dep)
	    if (!this.depIds.has(id)) {
	      dep.addSub(this)
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;
	
	  var i = this.deps.length
	  while (i--) {
	    var dep = this$1.deps[i]
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1)
	    }
	  }
	  var tmp = this.depIds
	  this.depIds = this.newDepIds
	  this.newDepIds = tmp
	  this.newDepIds.clear()
	  tmp = this.deps
	  this.deps = this.newDeps
	  this.newDeps = tmp
	  this.newDeps.length = 0
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true
	  } else if (this.sync) {
	    this.run()
	  } else {
	    queueWatcher(this)
	  }
	};
	
	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get()
	      if (
	        value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value
	      this.value = value
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue)
	        } catch (e) {
	          process.env.NODE_ENV !== 'production' && warn(
	            ("Error in watcher \"" + (this.expression) + "\""),
	            this.vm
	          )
	          /* istanbul ignore else */
	          if (config.errorHandler) {
	            config.errorHandler.call(null, e, this.vm)
	          } else {
	            throw e
	          }
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue)
	      }
	    }
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get()
	  this.dirty = false
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;
	
	  var i = this.deps.length
	  while (i--) {
	    this$1.deps[i].depend()
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;
	
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      remove$1(this.vm._watchers, this)
	    }
	    var i = this.deps.length
	    while (i--) {
	      this$1.deps[i].removeSub(this$1)
	    }
	    this.active = false
	  }
	};
	
	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set()
	function traverse (val, seen) {
	  var i, keys
	  if (!seen) {
	    seen = seenObjects
	    seen.clear()
	  }
	  var isA = Array.isArray(val)
	  var isO = isObject(val)
	  if ((isA || isO) && Object.isExtensible(val)) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id
	      if (seen.has(depId)) {
	        return
	      } else {
	        seen.add(depId)
	      }
	    }
	    if (isA) {
	      i = val.length
	      while (i--) { traverse(val[i], seen) }
	    } else if (isO) {
	      keys = Object.keys(val)
	      i = keys.length
	      while (i--) { traverse(val[keys[i]], seen) }
	    }
	  }
	}
	
	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */
	
	var arrayProto = Array.prototype
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method]
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;
	
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length
	    var args = new Array(i)
	    while (i--) {
	      args[i] = arguments$1[i]
	    }
	    var result = original.apply(this, args)
	    var ob = this.__ob__
	    var inserted
	    switch (method) {
	      case 'push':
	        inserted = args
	        break
	      case 'unshift':
	        inserted = args
	        break
	      case 'splice':
	        inserted = args.slice(2)
	        break
	    }
	    if (inserted) { ob.observeArray(inserted) }
	    // notify change
	    ob.dep.notify()
	    return result
	  })
	})
	
	/*  */
	
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods)
	
	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	}
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value
	  this.dep = new Dep()
	  this.vmCount = 0
	  def(value, '__ob__', this)
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment
	    augment(value, arrayMethods, arrayKeys)
	    this.observeArray(value)
	  } else {
	    this.walk(value)
	  }
	};
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj)
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]])
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i])
	  }
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * istanbul ignore next
	 */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i]
	    def(target, key, src[key])
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__
	  } else if (
	    observerState.shouldConvert &&
	    !config._isServer &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value)
	  }
	  return ob
	}
	
	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep()
	
	  var property = Object.getOwnPropertyDescriptor(obj, key)
	  if (property && property.configurable === false) {
	    return
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get
	  var setter = property && property.set
	
	  var childOb = observe(val)
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val
	      if (Dep.target) {
	        dep.depend()
	        if (childOb) {
	          childOb.dep.depend()
	        }
	        if (Array.isArray(value)) {
	          for (var e = void 0, i = 0, l = value.length; i < l; i++) {
	            e = value[i]
	            e && e.__ob__ && e.__ob__.dep.depend()
	          }
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val
	      if (newVal === value) {
	        return
	      }
	      if (process.env.NODE_ENV !== 'production' && customSetter) {
	        customSetter()
	      }
	      if (setter) {
	        setter.call(obj, newVal)
	      } else {
	        val = newVal
	      }
	      childOb = observe(newVal)
	      dep.notify()
	    }
	  })
	}
	
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (obj, key, val) {
	  if (Array.isArray(obj)) {
	    obj.splice(key, 1, val)
	    return val
	  }
	  if (hasOwn(obj, key)) {
	    obj[key] = val
	    return
	  }
	  var ob = obj.__ob__
	  if (obj._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    )
	    return
	  }
	  if (!ob) {
	    obj[key] = val
	    return
	  }
	  defineReactive$$1(ob.value, key, val)
	  ob.dep.notify()
	  return val
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (obj, key) {
	  var ob = obj.__ob__
	  if (obj._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    )
	    return
	  }
	  if (!hasOwn(obj, key)) {
	    return
	  }
	  delete obj[key]
	  if (!ob) {
	    return
	  }
	  ob.dep.notify()
	}
	
	/*  */
	
	function initState (vm) {
	  vm._watchers = []
	  initProps(vm)
	  initData(vm)
	  initComputed(vm)
	  initMethods(vm)
	  initWatch(vm)
	}
	
	function initProps (vm) {
	  var props = vm.$options.props
	  if (props) {
	    var propsData = vm.$options.propsData || {}
	    var keys = vm.$options._propKeys = Object.keys(props)
	    var isRoot = !vm.$parent
	    // root instance props should be converted
	    observerState.shouldConvert = isRoot
	    var loop = function ( i ) {
	      var key = keys[i]
	      /* istanbul ignore else */
	      if (process.env.NODE_ENV !== 'production') {
	        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
	          if (vm.$parent && !observerState.isSettingProps) {
	            warn(
	              "Avoid mutating a prop directly since the value will be " +
	              "overwritten whenever the parent component re-renders. " +
	              "Instead, use a data or computed property based on the prop's " +
	              "value. Prop being mutated: \"" + key + "\"",
	              vm
	            )
	          }
	        })
	      } else {
	        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm))
	      }
	    };
	
	    for (var i = 0; i < keys.length; i++) loop( i );
	    observerState.shouldConvert = true
	  }
	}
	
	function initData (vm) {
	  var data = vm.$options.data
	  data = vm._data = typeof data === 'function'
	    ? data.call(vm)
	    : data || {}
	  if (!isPlainObject(data)) {
	    data = {}
	    process.env.NODE_ENV !== 'production' && warn(
	      'data functions should return an object.',
	      vm
	    )
	  }
	  // proxy data on instance
	  var keys = Object.keys(data)
	  var props = vm.$options.props
	  var i = keys.length
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      )
	    } else {
	      proxy(vm, keys[i])
	    }
	  }
	  // observe data
	  observe(data)
	  data.__ob__ && data.__ob__.vmCount++
	}
	
	var computedSharedDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	}
	
	function initComputed (vm) {
	  var computed = vm.$options.computed
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key]
	      if (typeof userDef === 'function') {
	        computedSharedDefinition.get = makeComputedGetter(userDef, vm)
	        computedSharedDefinition.set = noop
	      } else {
	        computedSharedDefinition.get = userDef.get
	          ? userDef.cache !== false
	            ? makeComputedGetter(userDef.get, vm)
	            : bind$1(userDef.get, vm)
	          : noop
	        computedSharedDefinition.set = userDef.set
	          ? bind$1(userDef.set, vm)
	          : noop
	      }
	      Object.defineProperty(vm, key, computedSharedDefinition)
	    }
	  }
	}
	
	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, noop, {
	    lazy: true
	  })
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate()
	    }
	    if (Dep.target) {
	      watcher.depend()
	    }
	    return watcher.value
	  }
	}
	
	function initMethods (vm) {
	  var methods = vm.$options.methods
	  if (methods) {
	    for (var key in methods) {
	      if (methods[key] != null) {
	        vm[key] = bind$1(methods[key], vm)
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn(("Method \"" + key + "\" is undefined in options."), vm)
	      }
	    }
	  }
	}
	
	function initWatch (vm) {
	  var watch = vm.$options.watch
	  if (watch) {
	    for (var key in watch) {
	      var handler = watch[key]
	      if (Array.isArray(handler)) {
	        for (var i = 0; i < handler.length; i++) {
	          createWatcher(vm, key, handler[i])
	        }
	      } else {
	        createWatcher(vm, key, handler)
	      }
	    }
	  }
	}
	
	function createWatcher (vm, key, handler) {
	  var options
	  if (isPlainObject(handler)) {
	    options = handler
	    handler = handler.handler
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler]
	  }
	  vm.$watch(key, handler, options)
	}
	
	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {}
	  dataDef.get = function () {
	    return this._data
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      )
	    }
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef)
	
	  Vue.prototype.$set = set
	  Vue.prototype.$delete = del
	
	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this
	    options = options || {}
	    options.user = true
	    var watcher = new Watcher(vm, expOrFn, cb, options)
	    if (options.immediate) {
	      cb.call(vm, watcher.value)
	    }
	    return function unwatchFn () {
	      watcher.teardown()
	    }
	  }
	}
	
	function proxy (vm, key) {
	  if (!isReserved(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return vm._data[key]
	      },
	      set: function proxySetter (val) {
	        vm._data[key] = val
	      }
	    })
	  }
	}
	
	/*  */
	
	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  ns,
	  context,
	  componentOptions
	) {
	  this.tag = tag
	  this.data = data
	  this.children = children
	  this.text = text
	  this.elm = elm
	  this.ns = ns
	  this.context = context
	  this.key = data && data.key
	  this.componentOptions = componentOptions
	  this.child = undefined
	  this.parent = undefined
	  this.raw = false
	  this.isStatic = false
	  this.isRootInsert = true
	  this.isComment = false
	  this.isCloned = false
	};
	
	var emptyVNode = function () {
	  var node = new VNode()
	  node.text = ''
	  node.isComment = true
	  return node
	}
	
	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.ns,
	    vnode.context,
	    vnode.componentOptions
	  )
	  cloned.isStatic = vnode.isStatic
	  cloned.key = vnode.key
	  cloned.isCloned = true
	  return cloned
	}
	
	function cloneVNodes (vnodes) {
	  var res = new Array(vnodes.length)
	  for (var i = 0; i < vnodes.length; i++) {
	    res[i] = cloneVNode(vnodes[i])
	  }
	  return res
	}
	
	/*  */
	
	function normalizeChildren (
	  children,
	  ns,
	  nestedIndex
	) {
	  if (isPrimitive(children)) {
	    return [createTextVNode(children)]
	  }
	  if (Array.isArray(children)) {
	    var res = []
	    for (var i = 0, l = children.length; i < l; i++) {
	      var c = children[i]
	      var last = res[res.length - 1]
	      //  nested
	      if (Array.isArray(c)) {
	        res.push.apply(res, normalizeChildren(c, ns, i))
	      } else if (isPrimitive(c)) {
	        if (last && last.text) {
	          last.text += String(c)
	        } else if (c !== '') {
	          // convert primitive to vnode
	          res.push(createTextVNode(c))
	        }
	      } else if (c instanceof VNode) {
	        if (c.text && last && last.text) {
	          last.text += c.text
	        } else {
	          // inherit parent namespace
	          if (ns) {
	            applyNS(c, ns)
	          }
	          // default key for nested array children (likely generated by v-for)
	          if (c.tag && c.key == null && nestedIndex != null) {
	            c.key = "__vlist_" + nestedIndex + "_" + i + "__"
	          }
	          res.push(c)
	        }
	      }
	    }
	    return res
	  }
	}
	
	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}
	
	function applyNS (vnode, ns) {
	  if (vnode.tag && !vnode.ns) {
	    vnode.ns = ns
	    if (vnode.children) {
	      for (var i = 0, l = vnode.children.length; i < l; i++) {
	        applyNS(vnode.children[i], ns)
	      }
	    }
	  }
	}
	
	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}
	
	function mergeVNodeHook (def$$1, key, hook) {
	  var oldHook = def$$1[key]
	  if (oldHook) {
	    var injectedHash = def$$1.__injected || (def$$1.__injected = {})
	    if (!injectedHash[key]) {
	      injectedHash[key] = true
	      def$$1[key] = function () {
	        oldHook.apply(this, arguments)
	        hook.apply(this, arguments)
	      }
	    }
	  } else {
	    def$$1[key] = hook
	  }
	}
	
	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1
	) {
	  var name, cur, old, fn, event, capture
	  for (name in on) {
	    cur = on[name]
	    old = oldOn[name]
	    if (!cur) {
	      process.env.NODE_ENV !== 'production' && warn(
	        ("Handler for event \"" + name + "\" is undefined.")
	      )
	    } else if (!old) {
	      capture = name.charAt(0) === '!'
	      event = capture ? name.slice(1) : name
	      if (Array.isArray(cur)) {
	        add(event, (cur.invoker = arrInvoker(cur)), capture)
	      } else {
	        if (!cur.invoker) {
	          fn = cur
	          cur = on[name] = {}
	          cur.fn = fn
	          cur.invoker = fnInvoker(cur)
	        }
	        add(event, cur.invoker, capture)
	      }
	    } else if (cur !== old) {
	      if (Array.isArray(old)) {
	        old.length = cur.length
	        for (var i = 0; i < old.length; i++) { old[i] = cur[i] }
	        on[name] = old
	      } else {
	        old.fn = cur
	        on[name] = old
	      }
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      event = name.charAt(0) === '!' ? name.slice(1) : name
	      remove$$1(event, oldOn[name].invoker)
	    }
	  }
	}
	
	function arrInvoker (arr) {
	  return function (ev) {
	    var arguments$1 = arguments;
	
	    var single = arguments.length === 1
	    for (var i = 0; i < arr.length; i++) {
	      single ? arr[i](ev) : arr[i].apply(null, arguments$1)
	    }
	  }
	}
	
	function fnInvoker (o) {
	  return function (ev) {
	    var single = arguments.length === 1
	    single ? o.fn(ev) : o.fn.apply(null, arguments)
	  }
	}
	
	/*  */
	
	var activeInstance = null
	
	function initLifecycle (vm) {
	  var options = vm.$options
	
	  // locate first non-abstract parent
	  var parent = options.parent
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent
	    }
	    parent.$children.push(vm)
	  }
	
	  vm.$parent = parent
	  vm.$root = parent ? parent.$root : vm
	
	  vm.$children = []
	  vm.$refs = {}
	
	  vm._watcher = null
	  vm._inactive = false
	  vm._isMounted = false
	  vm._isDestroyed = false
	  vm._isBeingDestroyed = false
	}
	
	function lifecycleMixin (Vue) {
	  Vue.prototype._mount = function (
	    el,
	    hydrating
	  ) {
	    var vm = this
	    vm.$el = el
	    if (!vm.$options.render) {
	      vm.$options.render = emptyVNode
	      if (process.env.NODE_ENV !== 'production') {
	        /* istanbul ignore if */
	        if (vm.$options.template) {
	          warn(
	            'You are using the runtime-only build of Vue where the template ' +
	            'option is not available. Either pre-compile the templates into ' +
	            'render functions, or use the compiler-included build.',
	            vm
	          )
	        } else {
	          warn(
	            'Failed to mount component: template or render function not defined.',
	            vm
	          )
	        }
	      }
	    }
	    callHook(vm, 'beforeMount')
	    vm._watcher = new Watcher(vm, function () {
	      vm._update(vm._render(), hydrating)
	    }, noop)
	    hydrating = false
	    // root instance, call mounted on self
	    // mounted is called for child components in its inserted hook
	    if (vm.$root === vm) {
	      vm._isMounted = true
	      callHook(vm, 'mounted')
	    }
	    return vm
	  }
	
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate')
	    }
	    var prevEl = vm.$el
	    var prevActiveInstance = activeInstance
	    activeInstance = vm
	    var prevVnode = vm._vnode
	    vm._vnode = vnode
	    if (!prevVnode) {
	      // Vue.prototype.__patch__ is injected in entry points
	      // based on the rendering backend used.
	      vm.$el = vm.__patch__(vm.$el, vnode, hydrating)
	    } else {
	      vm.$el = vm.__patch__(prevVnode, vnode)
	    }
	    activeInstance = prevActiveInstance
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el
	    }
	    if (vm._isMounted) {
	      callHook(vm, 'updated')
	    }
	  }
	
	  Vue.prototype._updateFromParent = function (
	    propsData,
	    listeners,
	    parentVnode,
	    renderChildren
	  ) {
	    var vm = this
	    var hasChildren = !!(vm.$options._renderChildren || renderChildren)
	    vm.$options._parentVnode = parentVnode
	    vm.$options._renderChildren = renderChildren
	    // update props
	    if (propsData && vm.$options.props) {
	      observerState.shouldConvert = false
	      if (process.env.NODE_ENV !== 'production') {
	        observerState.isSettingProps = true
	      }
	      var propKeys = vm.$options._propKeys || []
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i]
	        vm[key] = validateProp(key, vm.$options.props, propsData, vm)
	      }
	      observerState.shouldConvert = true
	      if (process.env.NODE_ENV !== 'production') {
	        observerState.isSettingProps = false
	      }
	    }
	    // update listeners
	    if (listeners) {
	      var oldListeners = vm.$options._parentListeners
	      vm.$options._parentListeners = listeners
	      vm._updateListeners(listeners, oldListeners)
	    }
	    // resolve slots + force update if has children
	    if (hasChildren) {
	      vm.$slots = resolveSlots(renderChildren, vm._renderContext)
	      vm.$forceUpdate()
	    }
	  }
	
	  Vue.prototype.$forceUpdate = function () {
	    var vm = this
	    if (vm._watcher) {
	      vm._watcher.update()
	    }
	  }
	
	  Vue.prototype.$destroy = function () {
	    var vm = this
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy')
	    vm._isBeingDestroyed = true
	    // remove self from parent
	    var parent = vm.$parent
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove$1(parent.$children, vm)
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown()
	    }
	    var i = vm._watchers.length
	    while (i--) {
	      vm._watchers[i].teardown()
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--
	    }
	    // call the last hook...
	    vm._isDestroyed = true
	    callHook(vm, 'destroyed')
	    // turn off all instance listeners.
	    vm.$off()
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null
	    }
	  }
	}
	
	function callHook (vm, hook) {
	  var handlers = vm.$options[hook]
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm)
	    }
	  }
	  vm.$emit('hook:' + hook)
	}
	
	/*  */
	
	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 }
	var hooksToMerge = Object.keys(hooks)
	
	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }
	
	  if (isObject(Ctor)) {
	    Ctor = Vue$2.extend(Ctor)
	  }
	
	  if (typeof Ctor !== 'function') {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(("Invalid Component definition: " + (String(Ctor))), context)
	    }
	    return
	  }
	
	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate()
	      })
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }
	
	  data = data || {}
	
	  // extract props
	  var propsData = extractProps(data, Ctor)
	
	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }
	
	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn
	
	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {}
	  }
	
	  // merge component management hooks onto the placeholder node
	  mergeHooks(data)
	
	  // return a placeholder vnode
	  var name = Ctor.options.name || tag
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  )
	  return vnode
	}
	
	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {}
	  var propOptions = Ctor.options.props
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData)
	    }
	  }
	  return Ctor.options.render.call(
	    null,
	    // ensure the createElement function in functional components
	    // gets a unique context - this is necessary for correct named slot check
	    bind$1(createElement, { _self: Object.create(context) }),
	    {
	      props: props,
	      data: data,
	      parent: context,
	      children: normalizeChildren(children),
	      slots: function () { return resolveSlots(children, context); }
	    }
	  )
	}
	
	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent // activeInstance in lifecycle state
	) {
	  var vnodeComponentOptions = vnode.componentOptions
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children
	  }
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render
	    options.staticRenderFns = inlineTemplate.staticRenderFns
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}
	
	function init (vnode, hydrating) {
	  if (!vnode.child || vnode.child._isDestroyed) {
	    var child = vnode.child = createComponentInstanceForVnode(vnode, activeInstance)
	    child.$mount(hydrating ? vnode.elm : undefined, hydrating)
	  }
	}
	
	function prepatch (
	  oldVnode,
	  vnode
	) {
	  var options = vnode.componentOptions
	  var child = vnode.child = oldVnode.child
	  child._updateFromParent(
	    options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	  )
	}
	
	function insert (vnode) {
	  if (!vnode.child._isMounted) {
	    vnode.child._isMounted = true
	    callHook(vnode.child, 'mounted')
	  }
	  if (vnode.data.keepAlive) {
	    vnode.child._inactive = false
	    callHook(vnode.child, 'activated')
	  }
	}
	
	function destroy$1 (vnode) {
	  if (!vnode.child._isDestroyed) {
	    if (!vnode.data.keepAlive) {
	      vnode.child.$destroy()
	    } else {
	      vnode.child._inactive = true
	      callHook(vnode.child, 'deactivated')
	    }
	  }
	}
	
	function resolveAsyncComponent (
	  factory,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb)
	  } else {
	    factory.requested = true
	    var cbs = factory.pendingCallbacks = [cb]
	    var sync = true
	
	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = Vue$2.extend(res)
	      }
	      // cache resolved
	      factory.resolved = res
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res)
	        }
	      }
	    }
	
	    var reject = function (reason) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      )
	    }
	
	    var res = factory(resolve, reject)
	
	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject)
	    }
	
	    sync = false
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}
	
	function extractProps (data, Ctor) {
	  // we are only extrating raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props
	  if (!propOptions) {
	    return
	  }
	  var res = {}
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key)
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey)
	    }
	  }
	  return res
	}
	
	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key]
	      if (!preserve) {
	        delete hash[key]
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey]
	      if (!preserve) {
	        delete hash[altKey]
	      }
	      return true
	    }
	  }
	  return false
	}
	
	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {}
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i]
	    var fromParent = data.hook[key]
	    var ours = hooks[key]
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours
	  }
	}
	
	function mergeHook$1 (a, b) {
	  // since all hooks have at most two args, use fixed args
	  // to avoid having to use fn.apply().
	  return function (_, __) {
	    a(_, __)
	    b(_, __)
	  }
	}
	
	/*  */
	
	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  tag,
	  data,
	  children
	) {
	  if (data && (Array.isArray(data) || typeof data !== 'object')) {
	    children = data
	    data = undefined
	  }
	  // make sure to use real instance instead of proxy as context
	  return _createElement(this._self, tag, data, children)
	}
	
	function _createElement (
	  context,
	  tag,
	  data,
	  children
	) {
	  if (data && data.__ob__) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    )
	    return
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return emptyVNode()
	  }
	  if (typeof tag === 'string') {
	    var Ctor
	    var ns = config.getTagNamespace(tag)
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      return new VNode(
	        tag, data, normalizeChildren(children, ns),
	        undefined, undefined, ns, context
	      )
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      return createComponent(Ctor, data, context, children, tag)
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      return new VNode(
	        tag, data, normalizeChildren(children, ns),
	        undefined, undefined, ns, context
	      )
	    }
	  } else {
	    // direct component options / constructor
	    return createComponent(tag, data, context, children)
	  }
	}
	
	/*  */
	
	function initRender (vm) {
	  vm.$vnode = null // the placeholder node in parent tree
	  vm._vnode = null // the root of the child tree
	  vm._staticTrees = null
	  vm._renderContext = vm.$options._parentVnode && vm.$options._parentVnode.context
	  vm.$slots = resolveSlots(vm.$options._renderChildren, vm._renderContext)
	  // bind the public createElement fn to this instance
	  // so that we get proper render context inside it.
	  vm.$createElement = bind$1(createElement, vm)
	  if (vm.$options.el) {
	    vm.$mount(vm.$options.el)
	  }
	}
	
	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this)
	  }
	
	  Vue.prototype._render = function () {
	    var vm = this
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;
	
	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key])
	      }
	    }
	
	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = []
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode
	    // render self
	    var vnode
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement)
	    } catch (e) {
	      if (process.env.NODE_ENV !== 'production') {
	        warn(("Error when rendering " + (formatComponentName(vm)) + ":"))
	      }
	      /* istanbul ignore else */
	      if (config.errorHandler) {
	        config.errorHandler.call(null, e, vm)
	      } else {
	        if (config._isServer) {
	          throw e
	        } else {
	          setTimeout(function () { throw e }, 0)
	        }
	      }
	      // return previous vnode to prevent render error causing blank component
	      vnode = vm._vnode
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        )
	      }
	      vnode = emptyVNode()
	    }
	    // set parent
	    vnode.parent = _parentVnode
	    return vnode
	  }
	
	  // shorthands used in render functions
	  Vue.prototype._h = createElement
	  // toString for mustaches
	  Vue.prototype._s = _toString
	  // number conversion
	  Vue.prototype._n = toNumber
	  // empty vnode
	  Vue.prototype._e = emptyVNode
	  // loose equal
	  Vue.prototype._q = looseEqual
	  // loose indexOf
	  Vue.prototype._i = looseIndexOf
	
	  // render static tree by index
	  Vue.prototype._m = function renderStatic (
	    index,
	    isInFor
	  ) {
	    var tree = this._staticTrees[index]
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree by doing a shallow clone.
	    if (tree && !isInFor) {
	      return Array.isArray(tree)
	        ? cloneVNodes(tree)
	        : cloneVNode(tree)
	    }
	    // otherwise, render a fresh tree.
	    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy)
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        tree[i].isStatic = true
	        tree[i].key = "__static__" + index + "_" + i
	      }
	    } else {
	      tree.isStatic = true
	      tree.key = "__static__" + index
	    }
	    return tree
	  }
	
	  // filter resolution helper
	  var identity = function (_) { return _; }
	  Vue.prototype._f = function resolveFilter (id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity
	  }
	
	  // render v-for
	  Vue.prototype._l = function renderList (
	    val,
	    render
	  ) {
	    var ret, i, l, keys, key
	    if (Array.isArray(val)) {
	      ret = new Array(val.length)
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i)
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val)
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i)
	      }
	    } else if (isObject(val)) {
	      keys = Object.keys(val)
	      ret = new Array(keys.length)
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i]
	        ret[i] = render(val[key], key, i)
	      }
	    }
	    return ret
	  }
	
	  // renderSlot
	  Vue.prototype._t = function (
	    name,
	    fallback
	  ) {
	    var slotNodes = this.$slots[name]
	    // warn duplicate slot usage
	    if (slotNodes && process.env.NODE_ENV !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      )
	      slotNodes._rendered = true
	    }
	    return slotNodes || fallback
	  }
	
	  // apply v-bind object
	  Vue.prototype._b = function bindProps (
	    data,
	    value,
	    asProp
	  ) {
	    if (value) {
	      if (!isObject(value)) {
	        process.env.NODE_ENV !== 'production' && warn(
	          'v-bind without argument expects an Object or Array value',
	          this
	        )
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value)
	        }
	        for (var key in value) {
	          if (key === 'class' || key === 'style') {
	            data[key] = value[key]
	          } else {
	            var hash = asProp || config.mustUseProp(key)
	              ? data.domProps || (data.domProps = {})
	              : data.attrs || (data.attrs = {})
	            hash[key] = value[key]
	          }
	        }
	      }
	    }
	    return data
	  }
	
	  // expose v-on keyCodes
	  Vue.prototype._k = function getKeyCodes (key) {
	    return config.keyCodes[key]
	  }
	}
	
	function resolveSlots (
	  renderChildren,
	  context
	) {
	  var slots = {}
	  if (!renderChildren) {
	    return slots
	  }
	  var children = normalizeChildren(renderChildren) || []
	  var defaultSlot = []
	  var name, child
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i]
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if (child.context === context &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []))
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children)
	      } else {
	        slot.push(child)
	      }
	    } else {
	      defaultSlot.push(child)
	    }
	  }
	  // ignore single whitespace
	  if (defaultSlot.length && !(
	    defaultSlot.length === 1 &&
	    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
	  )) {
	    slots.default = defaultSlot
	  }
	  return slots
	}
	
	/*  */
	
	function initEvents (vm) {
	  vm._events = Object.create(null)
	  // init parent attached events
	  var listeners = vm.$options._parentListeners
	  var on = bind$1(vm.$on, vm)
	  var off = bind$1(vm.$off, vm)
	  vm._updateListeners = function (listeners, oldListeners) {
	    updateListeners(listeners, oldListeners || {}, on, off)
	  }
	  if (listeners) {
	    vm._updateListeners(listeners)
	  }
	}
	
	function eventsMixin (Vue) {
	  Vue.prototype.$on = function (event, fn) {
	    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn)
	    return vm
	  }
	
	  Vue.prototype.$once = function (event, fn) {
	    var vm = this
	    function on () {
	      vm.$off(event, on)
	      fn.apply(vm, arguments)
	    }
	    on.fn = fn
	    vm.$on(event, on)
	    return vm
	  }
	
	  Vue.prototype.$off = function (event, fn) {
	    var vm = this
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null)
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event]
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null
	      return vm
	    }
	    // specific handler
	    var cb
	    var i = cbs.length
	    while (i--) {
	      cb = cbs[i]
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1)
	        break
	      }
	    }
	    return vm
	  }
	
	  Vue.prototype.$emit = function (event) {
	    var vm = this
	    var cbs = vm._events[event]
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs
	      var args = toArray(arguments, 1)
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args)
	      }
	    }
	    return vm
	  }
	}
	
	/*  */
	
	var uid = 0
	
	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this
	    // a uid
	    vm._uid = uid++
	    // a flag to avoid this being observed
	    vm._isVue = true
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options)
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm),
	        options || {},
	        vm
	      )
	    }
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      initProxy(vm)
	    } else {
	      vm._renderProxy = vm
	    }
	    // expose real self
	    vm._self = vm
	    initLifecycle(vm)
	    initEvents(vm)
	    callHook(vm, 'beforeCreate')
	    initState(vm)
	    callHook(vm, 'created')
	    initRender(vm)
	  }
	
	  function initInternalComponent (vm, options) {
	    var opts = vm.$options = Object.create(resolveConstructorOptions(vm))
	    // doing this because it's faster than dynamic enumeration.
	    opts.parent = options.parent
	    opts.propsData = options.propsData
	    opts._parentVnode = options._parentVnode
	    opts._parentListeners = options._parentListeners
	    opts._renderChildren = options._renderChildren
	    opts._componentTag = options._componentTag
	    if (options.render) {
	      opts.render = options.render
	      opts.staticRenderFns = options.staticRenderFns
	    }
	  }
	
	  function resolveConstructorOptions (vm) {
	    var Ctor = vm.constructor
	    var options = Ctor.options
	    if (Ctor.super) {
	      var superOptions = Ctor.super.options
	      var cachedSuperOptions = Ctor.superOptions
	      if (superOptions !== cachedSuperOptions) {
	        // super option changed
	        Ctor.superOptions = superOptions
	        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
	        if (options.name) {
	          options.components[options.name] = Ctor
	        }
	      }
	    }
	    return options
	  }
	}
	
	function Vue$2 (options) {
	  if (process.env.NODE_ENV !== 'production' &&
	    !(this instanceof Vue$2)) {
	    warn('Vue is a constructor and should be called with the `new` keyword')
	  }
	  this._init(options)
	}
	
	initMixin(Vue$2)
	stateMixin(Vue$2)
	eventsMixin(Vue$2)
	lifecycleMixin(Vue$2)
	renderMixin(Vue$2)
	
	var warn = noop
	var formatComponentName
	
	if (process.env.NODE_ENV !== 'production') {
	  var hasConsole = typeof console !== 'undefined'
	
	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ))
	    }
	  }
	
	  formatComponentName = function (vm) {
	    if (vm.$root === vm) {
	      return 'root instance'
	    }
	    var name = vm._isVue
	      ? vm.$options.name || vm.$options._componentTag
	      : vm.name
	    return name ? ("component <" + name + ">") : "anonymous component"
	  }
	
	  var formatLocation = function (str) {
	    if (str === 'anonymous component') {
	      str += " - use the \"name\" option for better debugging messages."
	    }
	    return ("(found in " + str + ")")
	  }
	}
	
	/*  */
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies
	
	/**
	 * Options with restrictions
	 */
	if (process.env.NODE_ENV !== 'production') {
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      )
	    }
	    return defaultStrat(parent, child)
	  }
	
	  strats.name = function (parent, child, vm) {
	    if (vm && child) {
	      warn(
	        'options "name" can only be used as a component definition option, ' +
	        'not during instance creation.'
	      )
	    }
	    return defaultStrat(parent, child)
	  }
	}
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  var key, toVal, fromVal
	  for (key in from) {
	    toVal = to[key]
	    fromVal = from[key]
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal)
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal)
	    }
	  }
	  return to
	}
	
	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      )
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	}
	
	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}
	
	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook
	})
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null)
	  return childVal
	    ? extend(res, childVal)
	    : res
	}
	
	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets
	})
	
	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = {}
	  extend(ret, parentVal)
	  for (var key in childVal) {
	    var parent = ret[key]
	    var child = childVal[key]
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent]
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child]
	  }
	  return ret
	}
	
	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null)
	  extend(ret, parentVal)
	  extend(ret, childVal)
	  return ret
	}
	
	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	}
	
	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 */
	function normalizeComponents (options) {
	  if (options.components) {
	    var components = options.components
	    var def
	    for (var key in components) {
	      var lower = key.toLowerCase()
	      if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	        process.env.NODE_ENV !== 'production' && warn(
	          'Do not use built-in or reserved HTML elements as component ' +
	          'id: ' + key
	        )
	        continue
	      }
	      def = components[key]
	      if (isPlainObject(def)) {
	        components[key] = Vue$2.extend(def)
	      }
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props
	  if (!props) { return }
	  var res = {}
	  var i, val, name
	  if (Array.isArray(props)) {
	    i = props.length
	    while (i--) {
	      val = props[i]
	      if (typeof val === 'string') {
	        name = camelize(val)
	        res[name] = { type: null }
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('props must be strings when using array syntax.')
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key]
	      name = camelize(key)
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val }
	    }
	  }
	  options.props = res
	}
	
	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key]
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def }
	      }
	    }
	  }
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  normalizeComponents(child)
	  normalizeProps(child)
	  normalizeDirectives(child)
	  var extendsFrom = child.extends
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm)
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i]
	      if (mixin.prototype instanceof Vue$2) {
	        mixin = mixin.options
	      }
	      parent = mergeOptions(parent, mixin, vm)
	    }
	  }
	  var options = {}
	  var key
	  for (key in parent) {
	    mergeField(key)
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key)
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat
	    options[key] = strat(parent[key], child[key], vm, key)
	  }
	  return options
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type]
	  var res = assets[id] ||
	    // camelCase ID
	    assets[camelize(id)] ||
	    // Pascal Case ID
	    assets[capitalize(camelize(id))]
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    )
	  }
	  return res
	}
	
	/*  */
	
	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key]
	  var absent = !hasOwn(propsData, key)
	  var value = propsData[key]
	  // handle boolean props
	  if (getType(prop.type) === 'Boolean') {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false
	    } else if (value === '' || value === hyphenate(key)) {
	      value = true
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key)
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert
	    observerState.shouldConvert = true
	    observe(value)
	    observerState.shouldConvert = prevShouldConvert
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    assertProp(prop, key, value, vm, absent)
	  }
	  return value
	}
	
	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, name) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Invalid default value for prop "' + name + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    )
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && prop.type !== Function
	    ? def.call(vm)
	    : def
	}
	
	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    )
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type
	  var valid = !type || type === true
	  var expectedTypes = []
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type]
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i])
	      expectedTypes.push(assertedType.expectedType)
	      valid = assertedType.valid
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    )
	    return
	  }
	  var validator = prop.validator
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      )
	    }
	  }
	}
	
	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid
	  var expectedType = getType(type)
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string')
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number')
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean')
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function')
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value)
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value)
	  } else {
	    valid = value instanceof type
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}
	
	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/)
	  return match && match[1]
	}
	
	
	
	var util = Object.freeze({
		defineReactive: defineReactive$$1,
		_toString: _toString,
		toNumber: toNumber,
		makeMap: makeMap,
		isBuiltInTag: isBuiltInTag,
		remove: remove$1,
		hasOwn: hasOwn,
		isPrimitive: isPrimitive,
		cached: cached,
		camelize: camelize,
		capitalize: capitalize,
		hyphenate: hyphenate,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		toObject: toObject,
		noop: noop,
		no: no,
		genStaticKeys: genStaticKeys,
		looseEqual: looseEqual,
		looseIndexOf: looseIndexOf,
		isReserved: isReserved,
		def: def,
		parsePath: parsePath,
		hasProto: hasProto,
		inBrowser: inBrowser,
		UA: UA,
		isIE: isIE,
		isIE9: isIE9,
		isEdge: isEdge,
		isAndroid: isAndroid,
		isIOS: isIOS,
		devtools: devtools,
		nextTick: nextTick,
		get _Set () { return _Set; },
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		get warn () { return warn; },
		get formatComponentName () { return formatComponentName; },
		validateProp: validateProp
	});
	
	/*  */
	
	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1)
	    args.unshift(this)
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args)
	    } else {
	      plugin.apply(null, args)
	    }
	    plugin.installed = true
	    return this
	  }
	}
	
	/*  */
	
	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin)
	  }
	}
	
	/*  */
	
	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0
	  var cid = 1
	
	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {}
	    var Super = this
	    var isFirstExtend = Super.cid === 0
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor
	    }
	    var name = extendOptions.name || Super.options.name
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characaters and the hyphen.'
	        )
	        name = null
	      }
	    }
	    var Sub = function VueComponent (options) {
	      this._init(options)
	    }
	    Sub.prototype = Object.create(Super.prototype)
	    Sub.prototype.constructor = Sub
	    Sub.cid = cid++
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    )
	    Sub['super'] = Super
	    // allow further extension
	    Sub.extend = Super.extend
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type]
	    })
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub
	    }
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options
	    Sub.extendOptions = extendOptions
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub
	    }
	    return Sub
	  }
	}
	
	/*  */
	
	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            )
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id
	          definition = Vue.extend(definition)
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition }
	        }
	        this.options[type + 's'][id] = definition
	        return definition
	      }
	    }
	  })
	}
	
	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	  created: function created () {
	    this.cache = Object.create(null)
	  },
	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default)
	    if (vnode && vnode.componentOptions) {
	      var opts = vnode.componentOptions
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? opts.Ctor.cid + '::' + opts.tag
	        : vnode.key
	      if (this.cache[key]) {
	        vnode.child = this.cache[key].child
	      } else {
	        this.cache[key] = vnode
	      }
	      vnode.data.keepAlive = true
	    }
	    return vnode
	  },
	  destroyed: function destroyed () {
	    var this$1 = this;
	
	    for (var key in this.cache) {
	      var vnode = this$1.cache[key]
	      callHook(vnode.child, 'deactivated')
	      vnode.child.$destroy()
	    }
	  }
	}
	
	var builtInComponents = {
	  KeepAlive: KeepAlive
	}
	
	/*  */
	
	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {}
	  configDef.get = function () { return config; }
	  if (process.env.NODE_ENV !== 'production') {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      )
	    }
	  }
	  Object.defineProperty(Vue, 'config', configDef)
	  Vue.util = util
	  Vue.set = set
	  Vue.delete = del
	  Vue.nextTick = nextTick
	
	  Vue.options = Object.create(null)
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null)
	  })
	
	  extend(Vue.options.components, builtInComponents)
	
	  initUse(Vue)
	  initMixin$1(Vue)
	  initExtend(Vue)
	  initAssetRegisters(Vue)
	}
	
	initGlobalAPI(Vue$2)
	
	Object.defineProperty(Vue$2.prototype, '$isServer', {
	  get: function () { return config._isServer; }
	})
	
	Vue$2.version = '2.0.1'
	
	/*  */
	
	// attributes that should be using props for binding
	var mustUseProp = makeMap('value,selected,checked,muted')
	
	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck')
	
	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	)
	
	var isAttr = makeMap(
	  'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
	  'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
	  'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
	  'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
	  'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
	  'form,formaction,headers,<th>,height,hidden,high,href,hreflang,http-equiv,' +
	  'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
	  'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
	  'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
	  'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
	  'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
	  'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
	  'target,title,type,usemap,value,width,wrap'
	)
	
	
	
	var xlinkNS = 'http://www.w3.org/1999/xlink'
	
	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	}
	
	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	}
	
	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	}
	
	/*  */
	
	function genClassForVnode (vnode) {
	  var data = vnode.data
	  var parentNode = vnode
	  var childNode = vnode
	  while (childNode.child) {
	    childNode = childNode.child._vnode
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data)
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data)
	    }
	  }
	  return genClassFromData(data)
	}
	
	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}
	
	function genClassFromData (data) {
	  var dynamicClass = data.class
	  var staticClass = data.staticClass
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}
	
	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}
	
	function stringifyClass (value) {
	  var res = ''
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' '
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' ' }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}
	
	/*  */
	
	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	}
	
	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	)
	
	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr',
	  true
	)
	
	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
	  true
	)
	
	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track',
	  true
	)
	
	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font,' +
	  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	)
	
	
	
	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	}
	
	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}
	
	var unknownElementCache = Object.create(null)
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase()
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag)
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}
	
	/*  */
	
	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selector = el
	    el = document.querySelector(el)
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn(
	        'Cannot find element: ' + selector
	      )
	      return document.createElement('div')
	    }
	  }
	  return el
	}
	
	/*  */
	
	function createElement$1 (tagName) {
	  return document.createElement(tagName)
	}
	
	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}
	
	function createTextNode (text) {
	  return document.createTextNode(text)
	}
	
	function createComment (text) {
	  return document.createComment(text)
	}
	
	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode)
	}
	
	function removeChild (node, child) {
	  node.removeChild(child)
	}
	
	function appendChild (node, child) {
	  node.appendChild(child)
	}
	
	function parentNode (node) {
	  return node.parentNode
	}
	
	function nextSibling (node) {
	  return node.nextSibling
	}
	
	function tagName (node) {
	  return node.tagName
	}
	
	function setTextContent (node, text) {
	  node.textContent = text
	}
	
	function childNodes (node) {
	  return node.childNodes
	}
	
	function setAttribute (node, key, val) {
	  node.setAttribute(key, val)
	}
	
	
	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		childNodes: childNodes,
		setAttribute: setAttribute
	});
	
	/*  */
	
	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode)
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true)
	      registerRef(vnode)
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true)
	  }
	}
	
	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref
	  if (!key) { return }
	
	  var vm = vnode.context
	  var ref = vnode.child || vnode.elm
	  var refs = vm.$refs
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove$1(refs[key], ref)
	    } else if (refs[key] === ref) {
	      refs[key] = undefined
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key])) {
	        refs[key].push(ref)
	      } else {
	        refs[key] = [ref]
	      }
	    } else {
	      refs[key] = ref
	    }
	  }
	}
	
	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *
	
	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */
	
	var emptyData = {}
	var emptyNode = new VNode('', emptyData, [])
	var hooks$1 = ['create', 'update', 'postpatch', 'remove', 'destroy']
	
	function isUndef (s) {
	  return s == null
	}
	
	function isDef (s) {
	  return s != null
	}
	
	function sameVnode (vnode1, vnode2) {
	  return (
	    vnode1.key === vnode2.key &&
	    vnode1.tag === vnode2.tag &&
	    vnode1.isComment === vnode2.isComment &&
	    !vnode1.data === !vnode2.data
	  )
	}
	
	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key
	  var map = {}
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key
	    if (isDef(key)) { map[key] = i }
	  }
	  return map
	}
	
	function createPatchFunction (backend) {
	  var i, j
	  var cbs = {}
	
	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;
	
	  for (i = 0; i < hooks$1.length; ++i) {
	    cbs[hooks$1[i]] = []
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]) }
	    }
	  }
	
	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }
	
	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeElement(childElm)
	      }
	    }
	    remove$$1.listeners = listeners
	    return remove$$1
	  }
	
	  function removeElement (el) {
	    var parent = nodeOps.parentNode(el)
	    nodeOps.removeChild(parent, el)
	  }
	
	  function createElm (vnode, insertedVnodeQueue, nested) {
	    var i
	    var data = vnode.data
	    vnode.isRootInsert = !nested
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode) }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(i = vnode.child)) {
	        initComponent(vnode, insertedVnodeQueue)
	        return vnode.elm
	      }
	    }
	    var children = vnode.children
	    var tag = vnode.tag
	    if (isDef(tag)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (
	          !vnode.ns &&
	          !(config.ignoredElements && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          )
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag)
	      setScope(vnode)
	      createChildren(vnode, children, insertedVnodeQueue)
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue)
	      }
	    } else if (vnode.isComment) {
	      vnode.elm = nodeOps.createComment(vnode.text)
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text)
	    }
	    return vnode.elm
	  }
	
	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        nodeOps.appendChild(vnode.elm, createElm(children[i], insertedVnodeQueue, true))
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text))
	    }
	  }
	
	  function isPatchable (vnode) {
	    while (vnode.child) {
	      vnode = vnode.child._vnode
	    }
	    return isDef(vnode.tag)
	  }
	
	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode)
	    }
	    i = vnode.data.hook // Reuse variable
	    if (isDef(i)) {
	      if (i.create) { i.create(emptyNode, vnode) }
	      if (i.insert) { insertedVnodeQueue.push(vnode) }
	    }
	  }
	
	  function initComponent (vnode, insertedVnodeQueue) {
	    if (vnode.data.pendingInsert) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert)
	    }
	    vnode.elm = vnode.child.$el
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue)
	      setScope(vnode)
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode)
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode)
	    }
	  }
	
	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i
	    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '')
	    }
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '')
	    }
	  }
	
	  function addVnodes (parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      nodeOps.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before)
	    }
	  }
	
	  function invokeDestroyHook (vnode) {
	    var i, j
	    var data = vnode.data
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode) }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode) }
	    }
	    if (isDef(i = vnode.child) && !data.keepAlive) {
	      invokeDestroyHook(i._vnode)
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j])
	      }
	    }
	  }
	
	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx]
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch)
	          invokeDestroyHook(ch)
	        } else { // Text node
	          nodeOps.removeChild(parentElm, ch.elm)
	        }
	      }
	    }
	  }
	
	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners)
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm)
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm)
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm)
	      } else {
	        rm()
	      }
	    } else {
	      removeElement(vnode.elm)
	    }
	  }
	
	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0
	    var newStartIdx = 0
	    var oldEndIdx = oldCh.length - 1
	    var oldStartVnode = oldCh[0]
	    var oldEndVnode = oldCh[oldEndIdx]
	    var newEndIdx = newCh.length - 1
	    var newStartVnode = newCh[0]
	    var newEndVnode = newCh[newEndIdx]
	    var oldKeyToIdx, idxInOld, elmToMove, before
	
	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly
	
	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx]
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
	        oldStartVnode = oldCh[++oldStartIdx]
	        newStartVnode = newCh[++newStartIdx]
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
	        oldEndVnode = oldCh[--oldEndIdx]
	        newEndVnode = newCh[--newEndIdx]
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
	        oldStartVnode = oldCh[++oldStartIdx]
	        newEndVnode = newCh[--newEndIdx]
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
	        oldEndVnode = oldCh[--oldEndIdx]
	        newStartVnode = newCh[++newStartIdx]
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null
	        if (isUndef(idxInOld)) { // New element
	          nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm)
	          newStartVnode = newCh[++newStartIdx]
	        } else {
	          elmToMove = oldCh[idxInOld]
	          /* istanbul ignore if */
	          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            )
	          }
	          if (elmToMove.tag !== newStartVnode.tag) {
	            // same key but different element. treat as new element
	            nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm)
	            newStartVnode = newCh[++newStartIdx]
	          } else {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
	            oldCh[idxInOld] = undefined
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
	            newStartVnode = newCh[++newStartIdx]
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
	    }
	  }
	
	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (vnode.isStatic &&
	        oldVnode.isStatic &&
	        vnode.key === oldVnode.key &&
	        vnode.isCloned) {
	      vnode.elm = oldVnode.elm
	      return
	    }
	    var i, hook
	    var hasData = isDef(i = vnode.data)
	    if (hasData && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode)
	    }
	    var elm = vnode.elm = oldVnode.elm
	    var oldCh = oldVnode.children
	    var ch = vnode.children
	    if (hasData && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode) }
	      if (isDef(hook) && isDef(i = hook.update)) { i(oldVnode, vnode) }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly) }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, '') }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '')
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text)
	    }
	    if (hasData) {
	      for (i = 0; i < cbs.postpatch.length; ++i) { cbs.postpatch[i](oldVnode, vnode) }
	      if (isDef(hook) && isDef(i = hook.postpatch)) { i(oldVnode, vnode) }
	    }
	  }
	
	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (initial && vnode.parent) {
	      vnode.parent.data.pendingInsert = queue
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i])
	      }
	    }
	  }
	
	  var bailed = false
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */) }
	      if (isDef(i = vnode.child)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue)
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        var childNodes = nodeOps.childNodes(elm)
	        // empty element, allow client to pick up and populate children
	        if (!childNodes.length) {
	          createChildren(vnode, children, insertedVnodeQueue)
	        } else {
	          var childrenMatch = true
	          if (childNodes.length !== children.length) {
	            childrenMatch = false
	          } else {
	            for (var i$1 = 0; i$1 < children.length; i$1++) {
	              if (!hydrate(childNodes[i$1], children[i$1], insertedVnodeQueue)) {
	                childrenMatch = false
	                break
	              }
	            }
	          }
	          if (!childrenMatch) {
	            if (process.env.NODE_ENV !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true
	              console.warn('Parent: ', elm)
	              console.warn('Mismatching childNodes vs. VNodes: ', childNodes, children)
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue)
	      }
	    }
	    return true
	  }
	
	  function assertNodeMatch (node, vnode) {
	    if (vnode.tag) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag === nodeOps.tagName(node).toLowerCase()
	      )
	    } else {
	      return _toString(vnode.text) === node.data
	    }
	  }
	
	  return function patch (oldVnode, vnode, hydrating, removeOnly) {
	    var elm, parent
	    var isInitialPatch = false
	    var insertedVnodeQueue = []
	
	    if (!oldVnode) {
	      // empty mount, create new root element
	      isInitialPatch = true
	      createElm(vnode, insertedVnodeQueue)
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType)
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered')
	            hydrating = true
	          }
	          if (hydrating) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true)
	              return oldVnode
	            } else if (process.env.NODE_ENV !== 'production') {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              )
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode)
	        }
	        elm = oldVnode.elm
	        parent = nodeOps.parentNode(elm)
	
	        createElm(vnode, insertedVnodeQueue)
	
	        // component root element replaced.
	        // update parent placeholder node element.
	        if (vnode.parent) {
	          vnode.parent.elm = vnode.elm
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent)
	            }
	          }
	        }
	
	        if (parent !== null) {
	          nodeOps.insertBefore(parent, vnode.elm, nodeOps.nextSibling(elm))
	          removeVnodes(parent, [oldVnode], 0, 0)
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode)
	        }
	      }
	    }
	
	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
	    return vnode.elm
	  }
	}
	
	/*  */
	
	var directives = {
	  create: function bindDirectives (oldVnode, vnode) {
	    var hasInsert = false
	    forEachDirective(oldVnode, vnode, function (def, dir) {
	      callHook$1(def, dir, 'bind', vnode, oldVnode)
	      if (def.inserted) {
	        hasInsert = true
	      }
	    })
	    if (hasInsert) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	        applyDirectives(oldVnode, vnode, 'inserted')
	      })
	    }
	  },
	  update: function updateDirectives (oldVnode, vnode) {
	    applyDirectives(oldVnode, vnode, 'update')
	    // if old vnode has directives but new vnode doesn't
	    // we need to teardown the directives on the old one.
	    if (oldVnode.data.directives && !vnode.data.directives) {
	      applyDirectives(oldVnode, oldVnode, 'unbind')
	    }
	  },
	  postpatch: function postupdateDirectives (oldVnode, vnode) {
	    applyDirectives(oldVnode, vnode, 'componentUpdated')
	  },
	  destroy: function unbindDirectives (vnode) {
	    applyDirectives(vnode, vnode, 'unbind')
	  }
	}
	
	var emptyModifiers = Object.create(null)
	
	function forEachDirective (
	  oldVnode,
	  vnode,
	  fn
	) {
	  var dirs = vnode.data.directives
	  if (dirs) {
	    for (var i = 0; i < dirs.length; i++) {
	      var dir = dirs[i]
	      var def = resolveAsset(vnode.context.$options, 'directives', dir.name, true)
	      if (def) {
	        var oldDirs = oldVnode && oldVnode.data.directives
	        if (oldDirs) {
	          dir.oldValue = oldDirs[i].value
	        }
	        if (!dir.modifiers) {
	          dir.modifiers = emptyModifiers
	        }
	        fn(def, dir)
	      }
	    }
	  }
	}
	
	function applyDirectives (
	  oldVnode,
	  vnode,
	  hook
	) {
	  forEachDirective(oldVnode, vnode, function (def, dir) {
	    callHook$1(def, dir, hook, vnode, oldVnode)
	  })
	}
	
	function callHook$1 (def, dir, hook, vnode, oldVnode) {
	  var fn = def && def[hook]
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode)
	  }
	}
	
	var baseModules = [
	  ref,
	  directives
	]
	
	/*  */
	
	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old
	  var elm = vnode.elm
	  var oldAttrs = oldVnode.data.attrs || {}
	  var attrs = vnode.data.attrs || {}
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs)
	  }
	
	  for (key in attrs) {
	    cur = attrs[key]
	    old = oldAttrs[key]
	    if (old !== cur) {
	      setAttr(elm, key, cur)
	    }
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key))
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key)
	      }
	    }
	  }
	}
	
	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key)
	    } else {
	      el.setAttribute(key, key)
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true')
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key))
	    } else {
	      el.setAttributeNS(xlinkNS, key, value)
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key)
	    } else {
	      el.setAttribute(key, value)
	    }
	  }
	}
	
	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	}
	
	/*  */
	
	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm
	  var data = vnode.data
	  var oldData = oldVnode.data
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }
	
	  var cls = genClassForVnode(vnode)
	
	  // handle transition classes
	  var transitionClass = el._transitionClasses
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass))
	  }
	
	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls)
	    el._prevClass = cls
	  }
	}
	
	var klass = {
	  create: updateClass,
	  update: updateClass
	}
	
	// skip type checking this file because we need to attach private properties
	// to elements
	
	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {}
	  var oldOn = oldVnode.data.on || {}
	  var add = vnode.elm._v_add || (vnode.elm._v_add = function (event, handler, capture) {
	    vnode.elm.addEventListener(event, handler, capture)
	  })
	  var remove = vnode.elm._v_remove || (vnode.elm._v_remove = function (event, handler) {
	    vnode.elm.removeEventListener(event, handler)
	  })
	  updateListeners(on, oldOn, add, remove)
	}
	
	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	}
	
	/*  */
	
	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur
	  var elm = vnode.elm
	  var oldProps = oldVnode.data.domProps || {}
	  var props = vnode.data.domProps || {}
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props)
	  }
	
	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = undefined
	    }
	  }
	  for (key in props) {
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if ((key === 'textContent' || key === 'innerHTML') && vnode.children) {
	      vnode.children.length = 0
	    }
	    cur = props[key]
	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur)
	      if (elm.value !== strCur) {
	        elm.value = strCur
	      }
	    } else {
	      elm[key] = cur
	    }
	  }
	}
	
	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	}
	
	/*  */
	
	var prefixes = ['Webkit', 'Moz', 'ms']
	
	var testEl
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div')
	  prop = camelize(prop)
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1)
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	})
	
	function updateStyle (oldVnode, vnode) {
	  if ((!oldVnode.data || !oldVnode.data.style) && !vnode.data.style) {
	    return
	  }
	  var cur, name
	  var el = vnode.elm
	  var oldStyle = oldVnode.data.style || {}
	  var style = vnode.data.style || {}
	
	  // handle string
	  if (typeof style === 'string') {
	    el.style.cssText = style
	    return
	  }
	
	  var needClone = style.__ob__
	
	  // handle array syntax
	  if (Array.isArray(style)) {
	    style = vnode.data.style = toObject(style)
	  }
	
	  // clone the style for future updates,
	  // in case the user mutates the style object in-place.
	  if (needClone) {
	    style = vnode.data.style = extend({}, style)
	  }
	
	  for (name in oldStyle) {
	    if (!style[name]) {
	      el.style[normalize(name)] = ''
	    }
	  }
	  for (name in style) {
	    cur = style[name]
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      el.style[normalize(name)] = cur == null ? '' : cur
	    }
	  }
	}
	
	var style = {
	  create: updateStyle,
	  update: updateStyle
	}
	
	/*  */
	
	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); })
	    } else {
	      el.classList.add(cls)
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' '
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim())
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); })
	    } else {
	      el.classList.remove(cls)
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' '
	    var tar = ' ' + cls + ' '
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ')
	    }
	    el.setAttribute('class', cur.trim())
	  }
	}
	
	/*  */
	
	var hasTransition = inBrowser && !isIE9
	var TRANSITION = 'transition'
	var ANIMATION = 'animation'
	
	// Transition property/event sniffing
	var transitionProp = 'transition'
	var transitionEndEvent = 'transitionend'
	var animationProp = 'animation'
	var animationEndEvent = 'animationend'
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition'
	    transitionEndEvent = 'webkitTransitionEnd'
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation'
	    animationEndEvent = 'webkitAnimationEnd'
	  }
	}
	
	var raf = (inBrowser && window.requestAnimationFrame) || setTimeout
	function nextFrame (fn) {
	  raf(function () {
	    raf(fn)
	  })
	}
	
	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls)
	  addClass(el, cls)
	}
	
	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove$1(el._transitionClasses, cls)
	  }
	  removeClass(el, cls)
	}
	
	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent
	  var ended = 0
	  var end = function () {
	    el.removeEventListener(event, onEnd)
	    cb()
	  }
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end()
	      }
	    }
	  }
	  setTimeout(function () {
	    if (ended < propCount) {
	      end()
	    }
	  }, timeout + 1)
	  el.addEventListener(event, onEnd)
	}
	
	var transformRE = /\b(transform|all)(,|$)/
	
	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el)
	  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ')
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ')
	  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations)
	  var animationDelays = styles[animationProp + 'Delay'].split(', ')
	  var animationDurations = styles[animationProp + 'Duration'].split(', ')
	  var animationTimeout = getTimeout(animationDelays, animationDurations)
	
	  var type
	  var timeout = 0
	  var propCount = 0
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION
	      timeout = transitionTimeout
	      propCount = transitionDurations.length
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION
	      timeout = animationTimeout
	      propCount = animationDurations.length
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout)
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property'])
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}
	
	function getTimeout (delays, durations) {
	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}
	
	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}
	
	/*  */
	
	function enter (vnode) {
	  var el = vnode.elm
	
	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true
	    el._leaveCb()
	  }
	
	  var data = resolveTransition(vnode.data.transition)
	  if (!data) {
	    return
	  }
	
	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }
	
	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	
	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var transitionNode = activeInstance.$vnode
	  var context = transitionNode && transitionNode.parent
	    ? transitionNode.parent.context
	    : activeInstance
	
	  var isAppear = !context._isMounted || !vnode.isRootInsert
	
	  if (isAppear && !appear && appear !== '') {
	    return
	  }
	
	  var startClass = isAppear ? appearClass : enterClass
	  var activeClass = isAppear ? appearActiveClass : enterActiveClass
	  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter
	  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter
	  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter
	  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled
	
	  var expectsCSS = css !== false && !isIE9
	  var userWantsControl =
	    enterHook &&
	    // enterHook may be a bound method which exposes
	    // the length of original fn as _length
	    (enterHook._length || enterHook.length) > 1
	
	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, activeClass)
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass)
	      }
	      enterCancelledHook && enterCancelledHook(el)
	    } else {
	      afterEnterHook && afterEnterHook(el)
	    }
	    el._enterCb = null
	  })
	
	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key]
	      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb()
	      }
	      enterHook && enterHook(el, cb)
	    })
	  }
	
	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el)
	  if (expectsCSS) {
	    addTransitionClass(el, startClass)
	    addTransitionClass(el, activeClass)
	    nextFrame(function () {
	      removeTransitionClass(el, startClass)
	      if (!cb.cancelled && !userWantsControl) {
	        whenTransitionEnds(el, type, cb)
	      }
	    })
	  }
	
	  if (vnode.data.show) {
	    enterHook && enterHook(el, cb)
	  }
	
	  if (!expectsCSS && !userWantsControl) {
	    cb()
	  }
	}
	
	function leave (vnode, rm) {
	  var el = vnode.elm
	
	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true
	    el._enterCb()
	  }
	
	  var data = resolveTransition(vnode.data.transition)
	  if (!data) {
	    return rm()
	  }
	
	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }
	
	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	
	  var expectsCSS = css !== false && !isIE9
	  var userWantsControl =
	    leave &&
	    // leave hook may be a bound method which exposes
	    // the length of original fn as _length
	    (leave._length || leave.length) > 1
	
	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveActiveClass)
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass)
	      }
	      leaveCancelled && leaveCancelled(el)
	    } else {
	      rm()
	      afterLeave && afterLeave(el)
	    }
	    el._leaveCb = null
	  })
	
	  if (delayLeave) {
	    delayLeave(performLeave)
	  } else {
	    performLeave()
	  }
	
	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode
	    }
	    beforeLeave && beforeLeave(el)
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass)
	      addTransitionClass(el, leaveActiveClass)
	      nextFrame(function () {
	        removeTransitionClass(el, leaveClass)
	        if (!cb.cancelled && !userWantsControl) {
	          whenTransitionEnds(el, type, cb)
	        }
	      })
	    }
	    leave && leave(el, cb)
	    if (!expectsCSS && !userWantsControl) {
	      cb()
	    }
	  }
	}
	
	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {}
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'))
	    }
	    extend(res, def$$1)
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}
	
	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    leaveClass: (name + "-leave"),
	    appearClass: (name + "-enter"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveActiveClass: (name + "-leave-active"),
	    appearActiveClass: (name + "-enter-active")
	  }
	})
	
	function once (fn) {
	  var called = false
	  return function () {
	    if (!called) {
	      called = true
	      fn()
	    }
	  }
	}
	
	var transition = inBrowser ? {
	  create: function create (_, vnode) {
	    if (!vnode.data.show) {
	      enter(vnode)
	    }
	  },
	  remove: function remove (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm)
	    } else {
	      rm()
	    }
	  }
	} : {}
	
	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	]
	
	/*  */
	
	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules)
	
	var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules })
	
	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */
	
	var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_\-]*)?$/
	
	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement
	    if (el && el.vmodel) {
	      trigger(el, 'input')
	    }
	  })
	}
	
	var model = {
	  bind: function bind (el, binding, vnode) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!modelableTagRE.test(vnode.tag)) {
	        warn(
	          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
	          'If you are working with contenteditable, it\'s recommended to ' +
	          'wrap a library dedicated for that purpose inside a custom component.',
	          vnode.context
	        )
	      }
	    }
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context)
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        var cb = function () {
	          setSelected(el, binding, vnode.context)
	        }
	        nextTick(cb)
	        setTimeout(cb, 0)
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text') {
	      if (!isAndroid) {
	        el.addEventListener('compositionstart', onCompositionStart)
	        el.addEventListener('compositionend', onCompositionEnd)
	      }
	      /* istanbul ignore if */
	      if (isIE9) {
	        el.vmodel = true
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context)
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matchig
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : hasNoMatchingOption(binding.value, el.options)
	      if (needReset) {
	        trigger(el, 'change')
	      }
	    }
	  }
	}
	
	function setSelected (el, binding, vm) {
	  var value = binding.value
	  var isMultiple = el.multiple
	  if (isMultiple && !Array.isArray(value)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    )
	    return
	  }
	  var selected, option
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i]
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1
	      if (option.selected !== selected) {
	        option.selected = selected
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1
	  }
	}
	
	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}
	
	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}
	
	function onCompositionStart (e) {
	  e.target.composing = true
	}
	
	function onCompositionEnd (e) {
	  e.target.composing = false
	  trigger(e.target, 'input')
	}
	
	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents')
	  e.initEvent(type, true, true)
	  el.dispatchEvent(e)
	}
	
	/*  */
	
	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.child && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.child._vnode)
	    : vnode
	}
	
	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;
	
	    vnode = locateNode(vnode)
	    var transition = vnode.data && vnode.data.transition
	    if (value && transition && !isIE9) {
	      enter(vnode)
	    }
	    var originalDisplay = el.style.display === 'none' ? '' : el.style.display
	    el.style.display = value ? originalDisplay : 'none'
	    el.__vOriginalDisplay = originalDisplay
	  },
	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;
	
	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode)
	    var transition = vnode.data && vnode.data.transition
	    if (transition && !isIE9) {
	      if (value) {
	        enter(vnode)
	        el.style.display = el.__vOriginalDisplay
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none'
	        })
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none'
	    }
	  }
	}
	
	var platformDirectives = {
	  model: model,
	  show: show
	}
	
	/*  */
	
	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)
	
	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String
	}
	
	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recrusively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}
	
	function extractTransitionData (comp) {
	  var data = {}
	  var options = comp.$options
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key]
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1].fn
	  }
	  return data
	}
	
	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}
	
	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}
	
	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	  render: function render (h) {
	    var this$1 = this;
	
	    var children = this.$slots.default
	    if (!children) {
	      return
	    }
	
	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; })
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }
	
	    // warn multiple elements
	    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      )
	    }
	
	    var mode = this.mode
	
	    // warn invalid mode
	    if (process.env.NODE_ENV !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      )
	    }
	
	    var rawChild = children[0]
	
	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }
	
	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild)
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }
	
	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }
	
	    child.key = child.key == null || child.isStatic
	      ? ("__v" + (child.tag + this._uid) + "__")
	      : child.key
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this)
	    var oldRawChild = this._vnode
	    var oldChild = getRealChild(oldRawChild)
	
	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true
	    }
	
	    if (oldChild && oldChild.data && oldChild.key !== child.key) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild.data.transition = extend({}, data)
	
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false
	          this$1.$forceUpdate()
	        })
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave
	        var performLeave = function () { delayedLeave() }
	        mergeVNodeHook(data, 'afterEnter', performLeave)
	        mergeVNodeHook(data, 'enterCancelled', performLeave)
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	          delayedLeave = leave
	        })
	      }
	    }
	
	    return rawChild
	  }
	}
	
	/*  */
	
	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.
	
	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final disired state. This way in the second pass removed
	// nodes will remain where they should be.
	
	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps)
	
	delete props.mode
	
	var TransitionGroup = {
	  props: props,
	
	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span'
	    var map = Object.create(null)
	    var prevChildren = this.prevChildren = this.children
	    var rawChildren = this.$slots.default || []
	    var children = this.children = []
	    var transitionData = extractTransitionData(this)
	
	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i]
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c)
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData
	        } else if (process.env.NODE_ENV !== 'production') {
	          var opts = c.componentOptions
	          var name = opts
	            ? (opts.Ctor.options.name || opts.tag)
	            : c.tag
	          warn(("<transition-group> children must be keyed: <" + name + ">"))
	        }
	      }
	    }
	
	    if (prevChildren) {
	      var kept = []
	      var removed = []
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1]
	        c$1.data.transition = transitionData
	        c$1.data.pos = c$1.elm.getBoundingClientRect()
	        if (map[c$1.key]) {
	          kept.push(c$1)
	        } else {
	          removed.push(c$1)
	        }
	      }
	      this.kept = h(tag, null, kept)
	      this.removed = removed
	    }
	
	    return h(tag, null, children)
	  },
	
	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    )
	    this._vnode = this.kept
	  },
	
	  updated: function updated () {
	    var children = this.prevChildren
	    var moveClass = this.moveClass || (this.name + '-move')
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }
	
	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs)
	    children.forEach(recordPosition)
	    children.forEach(applyTranslation)
	
	    // force reflow to put everything in position
	    var f = document.body.offsetHeight // eslint-disable-line
	
	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm
	        var s = el.style
	        addTransitionClass(el, moveClass)
	        s.transform = s.WebkitTransform = s.transitionDuration = ''
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb)
	            el._moveCb = null
	            removeTransitionClass(el, moveClass)
	          }
	        })
	      }
	    })
	  },
	
	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      addTransitionClass(el, moveClass)
	      var info = getTransitionInfo(el)
	      removeTransitionClass(el, moveClass)
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	}
	
	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb()
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb()
	  }
	}
	
	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect()
	}
	
	function applyTranslation (c) {
	  var oldPos = c.data.pos
	  var newPos = c.data.newPos
	  var dx = oldPos.left - newPos.left
	  var dy = oldPos.top - newPos.top
	  if (dx || dy) {
	    c.data.moved = true
	    var s = c.elm.style
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)"
	    s.transitionDuration = '0s'
	  }
	}
	
	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	}
	
	/*  */
	
	// install platform specific utils
	Vue$2.config.isUnknownElement = isUnknownElement
	Vue$2.config.isReservedTag = isReservedTag
	Vue$2.config.getTagNamespace = getTagNamespace
	Vue$2.config.mustUseProp = mustUseProp
	
	// install platform runtime directives & components
	extend(Vue$2.options.directives, platformDirectives)
	extend(Vue$2.options.components, platformComponents)
	
	// install platform patch function
	Vue$2.prototype.__patch__ = config._isServer ? noop : patch$1
	
	// wrap mount
	Vue$2.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && !config._isServer ? query(el) : undefined
	  return this._mount(el, hydrating)
	}
	
	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$2)
	    } else if (
	      process.env.NODE_ENV !== 'production' &&
	      inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)
	    ) {
	      console.log(
	        'Download the Vue Devtools for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      )
	    }
	  }
	}, 0)
	
	module.exports = Vue$2;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62)))

/***/ },
/* 62 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	
	/* styles */
	__webpack_require__(64)
	
	/* script */
	__vue_exports__ = __webpack_require__(68)
	
	/* template */
	var __vue_template__ = __webpack_require__(69)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.name = __vue_options__.name || "MilestoneCompetencyQuestionLists"
	__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MilestoneCompetencyQuestionLists.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-6739f1e8"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6739f1e8", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-6739f1e8", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] MilestoneCompetencyQuestionLists.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(65);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(67)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6739f1e8&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MilestoneCompetencyQuestionLists.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6739f1e8&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MilestoneCompetencyQuestionLists.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(66)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.milestone-competency-question-lists[data-v-6739f1e8] {\n\tmargin-top: 10px;\n\ttext-align: left;\n}\n.milestone-competency-question-lists .panel-heading[data-v-6739f1e8] {\n\tposition: relative;\n}\n.description-button[data-v-6739f1e8] {\n\tposition: absolute;\n\ttop: 8px;\n\tright: 10px;\n}\n", "", {"version":3,"sources":["/./resources/assets/js/vue-components/MilestoneCompetencyQuestionLists.vue?9de57d2c"],"names":[],"mappings":";AAmEA;CACA,iBAAA;CACA,iBAAA;CACA;AAEA;CACA,mBAAA;CACA;AAEA;CACA,mBAAA;CACA,SAAA;CACA,YAAA;CACA","file":"MilestoneCompetencyQuestionLists.vue","sourcesContent":["<template>\n\t<div v-show=\"showLists\" class=\"milestone-competency-question-lists row\">\n\t\t<div v-for=\"(group, groupName) of groups\" class=\"col-sm-6\">\n\t\t\t<div class=\"panel panel-info milestones-panel\">\n\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t<h4 class=\"panel-title\">\n\t\t\t\t\t\t{{ucfirst(groupName)}}\n\t\t\t\t\t</h4>\n\t\t\t\t\t<button v-on:click=\"toggleDescriptions(groupName)\"\n\t\t\t\t\t\t\ttype=\"button\" class=\"description-button btn btn-info btn-xs\"\n\t\t\t\t\t\t\tv-bind:class=\"{ active: showDescriptions[groupName] }\">\n\t\t\t\t\t\tShow descriptions\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<ul class=\"list-group\">\n\t\t\t\t\t<li v-for=\"item of group\" class=\"list-group-item\">\n\t\t\t\t\t\t<b>{{item.title}}</b>\n\t\t\t\t\t\t<span v-show=\"showDescriptions[groupName]\">\n\t\t\t\t\t\t\t— {{item.description}}\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport { ucfirst } from '../modules/utils.js';\nexport default {\n\tprops: [\n\t\t'milestones',\n\t\t'competencies'\n\t],\n\tcomputed: {\n\t\tgroups(){\n\t\t\treturn {\n\t\t\t\t'milestones': this.milestones,\n\t\t\t\t'competencies': this.competencies\n\t\t\t};\n\t\t}\n\t},\n\tdata(){\n\t\treturn {\n\t\t\tshowLists: false,\n\t\t\tshowDescriptions: {\n\t\t\t\tmilestones: false,\n\t\t\t\tcompetencies: false\n\t\t\t}\n\t\t};\n\t},\n\tmethods: {\n\t\ttoggleLists(){\n\t\t\tthis.showLists = !this.showLists;\n\t\t},\n\t\ttoggleDescriptions(type){\n\t\t\tif(this.showDescriptions.hasOwnProperty(type))\n\t\t\t\tthis.showDescriptions[type] = !this.showDescriptions[type];\n\t\t},\n\t\tucfirst(str){\n\t\t\treturn ucfirst(str);\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n\t.milestone-competency-question-lists {\n\t\tmargin-top: 10px;\n\t\ttext-align: left;\n\t}\n\n\t.milestone-competency-question-lists .panel-heading {\n\t\tposition: relative;\n\t}\n\n\t.description-button {\n\t\tposition: absolute;\n\t\ttop: 8px;\n\t\tright: 10px;\n\t}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 66 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _utils = __webpack_require__(59);
	
	exports.default = {
		props: ['milestones', 'competencies'],
		computed: {
			groups: function groups() {
				return {
					'milestones': this.milestones,
					'competencies': this.competencies
				};
			}
		},
		data: function data() {
			return {
				showLists: false,
				showDescriptions: {
					milestones: false,
					competencies: false
				}
			};
		},
	
		methods: {
			toggleLists: function toggleLists() {
				this.showLists = !this.showLists;
			},
			toggleDescriptions: function toggleDescriptions(type) {
				if (this.showDescriptions.hasOwnProperty(type)) this.showDescriptions[type] = !this.showDescriptions[type];
			},
			ucfirst: function ucfirst(str) {
				return (0, _utils.ucfirst)(str);
			}
		}
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    directives: [{
	      name: "show",
	      value: (showLists),
	      expression: "showLists"
	    }],
	    staticClass: "milestone-competency-question-lists row"
	  }, [_l((groups), function(group, groupName) {
	    return _h('div', {
	      staticClass: "col-sm-6"
	    }, [_h('div', {
	      staticClass: "panel panel-info milestones-panel"
	    }, [_h('div', {
	      staticClass: "panel-heading"
	    }, [_h('h4', {
	      staticClass: "panel-title"
	    }, ["\n\t\t\t\t\t" + _s(ucfirst(groupName)) + "\n\t\t\t\t"]), " ", _h('button', {
	      staticClass: "description-button btn btn-info btn-xs",
	      class: {
	        active: showDescriptions[groupName]
	      },
	      attrs: {
	        "type": "button"
	      },
	      on: {
	        "click": function($event) {
	          toggleDescriptions(groupName)
	        }
	      }
	    }, ["\n\t\t\t\t\tShow descriptions\n\t\t\t\t"])]), " ", _h('ul', {
	      staticClass: "list-group"
	    }, [_l((group), function(item) {
	      return _h('li', {
	        staticClass: "list-group-item"
	      }, [_h('b', [_s(item.title)]), " ", _h('span', {
	        directives: [{
	          name: "show",
	          value: (showDescriptions[groupName]),
	          expression: "showDescriptions[groupName]"
	        }]
	      }, ["\n\t\t\t\t\t\t— " + _s(item.description) + "\n\t\t\t\t\t"])])
	    })])])])
	  })])
	}},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6739f1e8", module.exports)
	  }
	}

/***/ },
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */
/***/ function(module, exports) {

	module.exports = {
		aliceblue: [240, 248, 255],
		antiquewhite: [250, 235, 215],
		aqua: [0, 255, 255],
		aquamarine: [127, 255, 212],
		azure: [240, 255, 255],
		beige: [245, 245, 220],
		bisque: [255, 228, 196],
		black: [0, 0, 0],
		blanchedalmond: [255, 235, 205],
		blue: [0, 0, 255],
		blueviolet: [138, 43, 226],
		brown: [165, 42, 42],
		burlywood: [222, 184, 135],
		cadetblue: [95, 158, 160],
		chartreuse: [127, 255, 0],
		chocolate: [210, 105, 30],
		coral: [255, 127, 80],
		cornflowerblue: [100, 149, 237],
		cornsilk: [255, 248, 220],
		crimson: [220, 20, 60],
		cyan: [0, 255, 255],
		darkblue: [0, 0, 139],
		darkcyan: [0, 139, 139],
		darkgoldenrod: [184, 134, 11],
		darkgray: [169, 169, 169],
		darkgreen: [0, 100, 0],
		darkgrey: [169, 169, 169],
		darkkhaki: [189, 183, 107],
		darkmagenta: [139, 0, 139],
		darkolivegreen: [85, 107, 47],
		darkorange: [255, 140, 0],
		darkorchid: [153, 50, 204],
		darkred: [139, 0, 0],
		darksalmon: [233, 150, 122],
		darkseagreen: [143, 188, 143],
		darkslateblue: [72, 61, 139],
		darkslategray: [47, 79, 79],
		darkslategrey: [47, 79, 79],
		darkturquoise: [0, 206, 209],
		darkviolet: [148, 0, 211],
		deeppink: [255, 20, 147],
		deepskyblue: [0, 191, 255],
		dimgray: [105, 105, 105],
		dimgrey: [105, 105, 105],
		dodgerblue: [30, 144, 255],
		firebrick: [178, 34, 34],
		floralwhite: [255, 250, 240],
		forestgreen: [34, 139, 34],
		fuchsia: [255, 0, 255],
		gainsboro: [220, 220, 220],
		ghostwhite: [248, 248, 255],
		gold: [255, 215, 0],
		goldenrod: [218, 165, 32],
		gray: [128, 128, 128],
		green: [0, 128, 0],
		greenyellow: [173, 255, 47],
		grey: [128, 128, 128],
		honeydew: [240, 255, 240],
		hotpink: [255, 105, 180],
		indianred: [205, 92, 92],
		indigo: [75, 0, 130],
		ivory: [255, 255, 240],
		khaki: [240, 230, 140],
		lavender: [230, 230, 250],
		lavenderblush: [255, 240, 245],
		lawngreen: [124, 252, 0],
		lemonchiffon: [255, 250, 205],
		lightblue: [173, 216, 230],
		lightcoral: [240, 128, 128],
		lightcyan: [224, 255, 255],
		lightgoldenrodyellow: [250, 250, 210],
		lightgray: [211, 211, 211],
		lightgreen: [144, 238, 144],
		lightgrey: [211, 211, 211],
		lightpink: [255, 182, 193],
		lightsalmon: [255, 160, 122],
		lightseagreen: [32, 178, 170],
		lightskyblue: [135, 206, 250],
		lightslategray: [119, 136, 153],
		lightslategrey: [119, 136, 153],
		lightsteelblue: [176, 196, 222],
		lightyellow: [255, 255, 224],
		lime: [0, 255, 0],
		limegreen: [50, 205, 50],
		linen: [250, 240, 230],
		magenta: [255, 0, 255],
		maroon: [128, 0, 0],
		mediumaquamarine: [102, 205, 170],
		mediumblue: [0, 0, 205],
		mediumorchid: [186, 85, 211],
		mediumpurple: [147, 112, 219],
		mediumseagreen: [60, 179, 113],
		mediumslateblue: [123, 104, 238],
		mediumspringgreen: [0, 250, 154],
		mediumturquoise: [72, 209, 204],
		mediumvioletred: [199, 21, 133],
		midnightblue: [25, 25, 112],
		mintcream: [245, 255, 250],
		mistyrose: [255, 228, 225],
		moccasin: [255, 228, 181],
		navajowhite: [255, 222, 173],
		navy: [0, 0, 128],
		oldlace: [253, 245, 230],
		olive: [128, 128, 0],
		olivedrab: [107, 142, 35],
		orange: [255, 165, 0],
		orangered: [255, 69, 0],
		orchid: [218, 112, 214],
		palegoldenrod: [238, 232, 170],
		palegreen: [152, 251, 152],
		paleturquoise: [175, 238, 238],
		palevioletred: [219, 112, 147],
		papayawhip: [255, 239, 213],
		peachpuff: [255, 218, 185],
		peru: [205, 133, 63],
		pink: [255, 192, 203],
		plum: [221, 160, 221],
		powderblue: [176, 224, 230],
		purple: [128, 0, 128],
		rebeccapurple: [102, 51, 153],
		red: [255, 0, 0],
		rosybrown: [188, 143, 143],
		royalblue: [65, 105, 225],
		saddlebrown: [139, 69, 19],
		salmon: [250, 128, 114],
		sandybrown: [244, 164, 96],
		seagreen: [46, 139, 87],
		seashell: [255, 245, 238],
		sienna: [160, 82, 45],
		silver: [192, 192, 192],
		skyblue: [135, 206, 235],
		slateblue: [106, 90, 205],
		slategray: [112, 128, 144],
		slategrey: [112, 128, 144],
		snow: [255, 250, 250],
		springgreen: [0, 255, 127],
		steelblue: [70, 130, 180],
		tan: [210, 180, 140],
		teal: [0, 128, 128],
		thistle: [216, 191, 216],
		tomato: [255, 99, 71],
		turquoise: [64, 224, 208],
		violet: [238, 130, 238],
		wheat: [245, 222, 179],
		white: [255, 255, 255],
		whitesmoke: [245, 245, 245],
		yellow: [255, 255, 0],
		yellowgreen: [154, 205, 50]
	};
	


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var conversions = __webpack_require__(7);
	
	/*
		this function routes a model to all other models.
	
		all functions that are routed have a property `.conversion` attached
		to the returned synthetic function. This property is an array
		of strings, each with the steps in between the 'from' and 'to'
		color models (inclusive).
	
		conversions that are not possible simply are not included.
	*/
	
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);
	
	function buildGraph() {
		var graph = {};
	
		for (var len = models.length, i = 0; i < len; i++) {
			graph[models[i]] = {
				// http://jsperf.com/1-vs-infinity
				// micro-opt, but this is simple.
				distance: -1,
				parent: null
			};
		}
	
		return graph;
	}
	
	// https://en.wikipedia.org/wiki/Breadth-first_search
	function deriveBFS(fromModel) {
		var graph = buildGraph();
		var queue = [fromModel]; // unshift -> queue -> pop
	
		graph[fromModel].distance = 0;
	
		while (queue.length) {
			var current = queue.pop();
			var adjacents = Object.keys(conversions[current]);
	
			for (var len = adjacents.length, i = 0; i < len; i++) {
				var adjacent = adjacents[i];
				var node = graph[adjacent];
	
				if (node.distance === -1) {
					node.distance = graph[current].distance + 1;
					node.parent = current;
					queue.unshift(adjacent);
				}
			}
		}
	
		return graph;
	}
	
	function link(from, to) {
		return function (args) {
			return to(from(args));
		};
	}
	
	function wrapConversion(toModel, graph) {
		var path = [graph[toModel].parent, toModel];
		var fn = conversions[graph[toModel].parent][toModel];
	
		var cur = graph[toModel].parent;
		while (graph[cur].parent) {
			path.unshift(graph[cur].parent);
			fn = link(conversions[graph[cur].parent][cur], fn);
			cur = graph[cur].parent;
		}
	
		fn.conversion = path;
		return fn;
	}
	
	module.exports = function (fromModel) {
		var graph = deriveBFS(fromModel);
		var conversion = {};
	
		var models = Object.keys(graph);
		for (var len = models.length, i = 0; i < len; i++) {
			var toModel = models[i];
			var node = graph[toModel];
	
			if (node.parent === null) {
				// no possible conversion, or this node is the source model.
				continue;
			}
	
			conversion[toModel] = wrapConversion(toModel, graph);
		}
	
		return conversion;
	};
	


/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.js.map
//# sourceMappingURL=all.js.map
