function reportHtml(e){return'<div class="report-options collapse"><button type="button" class="close remove-report-group" aria-hidden="true">&times;</button><h3>Report</h3><div class="form-group"><label for="startDate'+e+'">Start Date:</label><input type="text" class="form-control datepicker startDate" id="startDate'+e+'" name="startDate'+e+'"></div><div class="form-group"><label for="endDate">End Date:</label><input type="text" class="form-control datepicker endDate" id="endDate'+e+'" name="endDate'+e+'"></div><div class="form-group" style="text-align: center;"><button type="button" class="btn lastThreeMonths">Last Three Months</button> <button type="button" class="btn lastSixMonths">Last Six Months</button></div><div class="form-group"><label for="trainingLevelInput'+e+'">Training Level</label><select class="form-control select2" id="trainingLevelInput'+e+'" name="trainingLevel'+e+'" style="width: 100%" required><option value="all">All</option><option value="intern">Intern</option><option value="ca-1">CA-1</option><option value="ca-2">CA-2</option><option value="ca-3">CA-3</option><option value="fellow">Fellow</option></select></div><hr /><br /></div>'}function addSendEmailModalBody(e,t){function a(){e.find(".body-rendered").hide(),e.find(".body").show()}function n(){a(),e.find(".body").focus()}function o(){e.find(".body").hide(),l(),e.find(".body-rendered").show()}function l(){for(var a=marked(e.find(".body").val()),n=0;n<t.length;n++){var o=t[n],l=new RegExp("\\[\\["+o+"\\]\\]","g"),r='<span class="label label-info">'+o+"</span>";a=a.replace(l,r)}e.find(".body-rendered").html(a)}e.find(".ids-list-button").click(function(){$(".ids-container").slideToggle()}),e.find(".body-rendered").mouseenter(a),e.find(".body-rendered").focusin(n),e.find(".body").mouseleave(function(){$(this).is(document.activeElement)||o()}),e.find(".body").focusout(o),o()}function openSendEmailModal(e,t,a,n,o,l,r,i){var s;if(t.find(".send").off("click",o).off("click",l),Array.isArray(e)){var d,c,p,u,f=t.find(".ids-list")[0],m=0;$(f).empty();for(var h=0;h<e.length;h++){if(s=e[h],d=document.createElement("li"),p=document.createElement("label"),c=document.createElement("input"),c.type="checkbox",c.className="send-all-id",c.value=s.id,s.email?s.send&&(c.checked=!0,m++):c.disabled=!0,s.data)for(var v=Object.keys(s.data),g=0;g<v.length;g++)c.setAttribute("data-"+v[g],s.data[v[g]]);p.appendChild(c),u=document.createTextNode(" "+s.full_name),p.appendChild(u),d.appendChild(p),f.appendChild(d)}6>=m?t.find(".ids-container").show():t.find(".ids-container").hide(),$(".send-all-id").change(function(){var e=parseInt($(".to").val().split(" ")[0],10);$(this).prop("checked")?e++:e--,$(".to").val(e+" "+r)}),t.find(".to").val(m+" "+r),t.find(".to-container").addClass("input-group"),t.find(".ids-list-button-container").show(),appendAlert("Please verify list of residents before sending",t.find(".alert-container"),"warning"),t.find(".send").click(l)}else s=e,t.find(".id").val(s.id),t.find(".to").val(s.full_name+" <"+s.email+">"),t.find(".to-container").removeClass("input-group"),t.find(".ids-list-button-container").hide(),t.find(".ids-list").empty(),t.find(".ids-container").hide(),t.find(".send").click(o);t.find(".subject").val(a),t.find(".body").val(n);var b=300;t.find(".body-rendered").height(b),addSendEmailModalBody(t,i),t.modal("show")}function checkReportQuery(){return dateError=!1,$(this).find("input").each(function(){if("date"==$(this).attr("type")||$(this).hasClass("datepicker")){var e=$(this).val(),t=/^\d\d\d\d-\d\d-\d\d$/;new RegExp(t).test(e)||(dateError=!0)}}),dateError&&alert("Please enter a valid date. If your browser does not support the date selector, date must be formatted YYYY-MM-DD"),!dateError}function lastSixMonths(){setStartEndDates.call(this,6)}function lastThreeMonths(){setStartEndDates.call(this,3)}function setStartEndDates(e){e=void 0!=e?e:3;var t=moment().subtract(1,"month").endOf("month"),a=moment(t).startOf("month").subtract(e-1,"month");$(this).parents(".report-options").find(".startDate").val(a.format("YYYY-MM-DD")),$(this).parents(".report-options").find(".endDate").val(t.format("YYYY-MM-DD"))}function appendAlert(e,t,a){a="undefined"==typeof a?"danger":a,t||(t="#alert-container");var n=document.createElement("div");n.className="alert alert-"+a+" alert-dismissable",n.role="alert";var o=document.createElement("button");o.type="button",o.className="close",o.setAttribute("data-dismiss","alert"),o.setAttribute("aria-label","Close");var l=document.createElement("span");l.setAttribute("aria-hidden","true"),l.innerHTML="&times;",o.appendChild(l);var r=document.createTextNode(e);n.appendChild(o),n.appendChild(r),$(t).append(n)}function unlimitTableEvals(e,t){var a=this.DataTable({retrieve:!0}),n=a.ajax.url();a.ajax.url(n.substring(0,n.lastIndexOf("/"))).load().draw()}function unlimitRestTableEvals(){var e=this.DataTable({retrieve:!0}),t=e.ajax.url();e.ajax.url(t.substring(0,t.lastIndexOf("?"))).load().draw()}function addDateSelectors(e,t,a,n,o){function l(){if($("#"+t+"date-unknown").prop("checked"))return void $("#"+t+"date").val("");var e=parseInt($("#"+t+"date-year").val(),10),a=parseInt($("#"+t+"date-month").val(),10),n=parseInt($("#"+t+"date-day").val(),10),o=moment().year(e).month(a).date(n);o.isValid()&&$("#"+t+"date").val(o.format("YYYY-MM-DD"))}function r(){$("#"+t+"date-year, #"+t+"date-month, #"+t+"date-day").prop("disabled",$(this).prop("checked")),l(),$(this).prop("checked")?$("#"+t+"parts-container").velocity("slideUp"):$("#"+t+"parts-container").velocity("slideDown")}var i='<input type="hidden" id="'+t+'date" name="'+e+'" /><div class="row"><label><input type="checkbox" id="'+t+'date-unknown" /> Unknown<label></div><div class="row" id="'+t+'parts-container"><div class="col-md-4"><label for="'+t+'date-year">Year</label><select class="form-control" id="'+t+'date-year"></select></div><div class="col-md-4"><label for="'+t+'date-month">Month</label><select class="form-control" id="'+t+'date-month"></select></div><div class="col-md-4"><label for="'+t+'date-day">Day</label><select class="form-control" id="'+t+'date-day"></select></div></div>',s=$(a);s.append(i);for(var d,c=s.find("#"+t+"date-year")[0],p=moment().get("year"),u=0;100>u;u++,p--)d=document.createElement("option"),d.value=p,d.appendChild(document.createTextNode(p)),c.appendChild(d);var f=s.find("#"+t+"date-month")[0];moment.months().forEach(function(e,t){d=document.createElement("option"),d.value=t,d.appendChild(document.createTextNode(e)),t==n&&(d.selected=!0),f.appendChild(d)});for(var m=s.find("#"+t+"date-day")[0],h=0;30>=h;h++)d=document.createElement("option"),d.value=h,d.appendChild(document.createTextNode(h)),30==h&o&&(d.selected=!0),m.appendChild(d);$("#"+t+"date-year").change(function(){for(var e=$("#"+t+"date-day")[0];e.firstChild;)e.removeChild(e.firstChild);for(var a=parseInt($(this).val(),10),n=parseInt($("#"+t+"date-month").val(),10),l=moment().year(a).month(n).daysInMonth(),r=1;l>=r;r++)d=document.createElement("option"),d.value=r,d.appendChild(document.createTextNode(r)),r==l&&o&&(d.selected=!0),e.appendChild(d)}),$("#"+t+"date-month").change(function(){for(var e=(moment($("#"+t+"date").val()),$("#"+t+"date-day")[0]);e.firstChild;)e.removeChild(e.firstChild);for(var a=parseInt($(this).val(),10),n=parseInt($("#"+t+"date-year").val(),10),l=moment().year(n).month(a).daysInMonth(),r=1;l>=r;r++)d=document.createElement("option"),d.value=r,d.appendChild(document.createTextNode(r)),r==l&&o&&(d.selected=!0),e.appendChild(d)}),$("#"+t+"date-year, #"+t+"date-month, #"+t+"date-day").change(l),$("#"+t+"date-unknown").change(r)}function debounce(e,t,a){var n;return function(){var o=this,l=arguments,r=function(){n=null,a||e.apply(o,l)},i=a&&!n;clearTimeout(n),n=setTimeout(r,t),i&&e.apply(o,l)}}function ucfirst(e){return e.charAt(0).toUpperCase()+e.substring(1)}function createDateCell(e,t,a,n,o){t&&$(e).text()!==moment(t).format("ll")&&$(e).attr("data-date-value",moment(t).valueOf()).addClass("table-date-cell")}function createDateTimeCell(e,t,a,n,o){t&&$(e).text()!==moment(t).format("ll LT")&&$(e).attr("data-date-value",moment(t).valueOf()).addClass("table-date-time-cell")}function renderDateCell(e,t){return"sort"===t||"type"===t?e?moment(e).valueOf():"":e?moment(e).format("MMMM Y"):""}function renderDateTimeCell(e,t){return"sort"===t||"type"===t?e?moment(e).valueOf():"":e?moment(e).calendar():""}function renderAccountStatus(e){var t;switch(e){case"active":t="label-success";break;case"inactive":t="label-danger";break;case"pending":t="label-warning";break;default:t="label-default"}return'<span class="label '+t+'">'+ucfirst(e)+"</span>"}function renderEvaluationStatus(e){var t;switch(e){case"complete":t="label-success";break;case"disabled":case"canceled by admin":case"canceled by faculty":case"canceled by resident":case"canceled by fellow":case"canceled by staff":t="label-danger";break;case"pending":t="label-warning";break;default:t="label-default"}return'<span class="label '+t+'">'+ucfirst(e)+"</span>"}function drawRadarGraphs(e,t,a,n){n="undefined"!=typeof n?n:0;var o=document.getElementsByClassName("graphs")[n],l=document.createElement("div");l.className="graph-container";var r=document.createElement("h3");r.appendChild(document.createTextNode(a)),l.appendChild(r);var i=document.createElement("div");i.className="graph milestone-graph";var s=document.createElement("h4");s.appendChild(document.createTextNode("Milestones")),i.appendChild(s);var d=document.createElement("div");d.className="graph-canvas-container";var c=document.createElement("canvas");c.width=800,c.height=400,d.appendChild(c),i.appendChild(d),l.appendChild(i);var p=document.createElement("div");p.className="graph competency-graph";var u=document.createElement("h4");u.appendChild(document.createTextNode("Competencies")),p.appendChild(u);var f=document.createElement("div");f.className="graph-canvas-container";var m=document.createElement("canvas");m.width=800,m.height=400,f.appendChild(m),p.appendChild(f),l.appendChild(p),o.appendChild(l);var h=$("#graph-type").val(),v=$("#graph-layout").bootstrapSwitch("state");v||(i.className+=" col-sm-6",p.className+=" col-sm-6");var g=c.getContext("2d"),b=m.getContext("2d");if("radar"==h){var C=new Chart(g).Radar(e,options);new Chart(b).Radar(t,options)}else if("bar"==h){var C=new Chart(g).Bar(e,options);new Chart(b).Bar(t,options)}else if("line"==h){var C=new Chart(g).Line(e,options);new Chart(b).Line(t,options)}var y=C.generateLegend();$(l).append(y)}function drawAverageRadarGraphs(){reportData.forEach(function(e,t){prepareReport(e);var a={labels:e.milestoneLabels,datasets:[e.averageMilestoneDataset]},n={labels:e.competencyLabels,datasets:[e.averageCompetencyDataset]};drawRadarGraphs(a,n,"Average")})}function drawAllRadarGraphs(){reportData.forEach(function(e,t){prepareReport(e),e.subjectIds.forEach(function(a){var n={labels:e.milestoneLabels,datasets:[e.averageMilestoneDataset,{label:"Individual Performance",fillColor:individualFillColor,strokeColor:individualSolidColor,pointColor:individualSolidColor,pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:individualSolidColor,data:_.values(e.subjectMilestone[a])}]},o={labels:e.competencyLabels,datasets:[e.averageCompetencyDataset,{label:"Individual Performance",fillColor:individualFillColor,strokeColor:individualSolidColor,pointColor:individualSolidColor,pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:individualSolidColor,data:_.values(e.subjectCompetency[a])}]};drawRadarGraphs(n,o,e.subjects[a],t)})})}function prepareReport(e){e.subjectIds=_.keys(e.subjects).sort(function(t,a){return e.subjects[t].localeCompare(e.subjects[a])}),"fellow"==e.trainingLevel?e.scaleLabels=["","Fellow Level 1","Fellow Level 2","Fellow Level 3","Fellow Level 4","Fellow Level 5"]:e.scaleLabels=["","CBY","CA-1","CA-2","CA-3","Attending"],options.scaleLabel=function(t){return e.scaleLabels[t.value/2]},e.milestoneLabels=_.values(e.milestones),e.averageMilestones=_.values(e.averageMilestone),e.competencyLabels=_.values(e.competencies),e.averageCompetencies=_.values(e.averageCompetency);for(var t=0;t<e.milestoneLabels.length;t++)e.milestoneLabels[t]=e.milestoneLabels[t].replace("Anes Fellow ",""),e.milestoneLabels[t]=e.milestoneLabels[t].replace("and","&");e.averageMilestoneDataset={label:"Average Performance",fillColor:averageFillColor,strokeColor:averageSolidColor,pointColor:averageSolidColor,pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:averageSolidColor,data:e.averageMilestones},e.averageCompetencyDataset={label:"Average Performance",fillColor:averageFillColor,strokeColor:averageSolidColor,pointColor:averageSolidColor,pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:averageSolidColor,data:e.averageCompetencies}}function drawLineChart(e,t,a){void 0!=evalHistoryChart[e]&&evalHistoryChart[e].destroy();var n=$(e).get(0).getContext("2d"),o=[];for(var l in t)o.push({label:l,fillColor:fillColors[l],strokeColor:solidColors[l],pointColor:solidColors[l],pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:solidColors[l],data:t[l]});var r={labels:a,datasets:o};evalHistoryChart[e]=new Chart(n).Line(r,options),$(e+"-legend").html(evalHistoryChart[e].generateLegend())}function getChartEvalData(e,t,a,n,o){n=void 0!=n?n:"month",o=void 0!=o?o:1,t=void 0!=t?t:moment().subtract(1,"year").startOf(n),a=void 0!=a?a:moment();var l="MMM D";void 0!=labelFormats[n]&&(l=labelFormats[n]);for(var r=[],i={Requested:[],Completed:[]},s=t;a>s;s.add(o,n)){var d=moment(s).add(o,n),c=e.reduce(function(e,t){if(void 0!=t.request_date){var a=moment(t.request_date);if(a>=s&&d>a)return e+1}return e},0),p=e.reduce(function(e,t){if(void 0!=t.complete_date&&"complete"==t.status){var a=moment(t.complete_date);if(a>=s&&d>a)return e+1}return e},0);r.push(s.format(l)),i.Requested.push(c),i.Completed.push(p)}return[i,r]}!function(e){"function"==typeof define&&define.amd?define(["jquery","moment","datatables"],e):e(jQuery,moment)}(function(e,t){e.fn.dataTable.moment=function(a,n){var o=e.fn.dataTable.ext.type;o.detect.unshift(function(e){return e&&e.replace&&(e=e.replace(/<.*?>/g,"")),""===e||null===e?"moment-"+a:t(e,a,n,!0).isValid()?"moment-"+a:null}),o.order["moment-"+a+"-pre"]=function(e){return""===e||null===e?-(1/0):parseInt(t(e.replace?e.replace(/<.*?>/g,""):e,a,n,!0).format("x"),10)}}}),!function(e,t,a){function n(e,t){return typeof e===t}function o(){var e,t,a,o,l,r,i;for(var s in C)if(C.hasOwnProperty(s)){if(e=[],t=C[s],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(a=0;a<t.options.aliases.length;a++)e.push(t.options.aliases[a].toLowerCase());for(o=n(t.fn,"function")?t.fn():t.fn,l=0;l<e.length;l++)r=e[l],i=r.split("."),1===i.length?$[i[0]]=o:(!$[i[0]]||$[i[0]]instanceof Boolean||($[i[0]]=new Boolean($[i[0]])),$[i[0]][i[1]]=o),b.push((o?"":"no-")+i.join("-"))}}function l(e){var t=w.className,a=$._config.classPrefix||"";if(x&&(t=t.baseVal),$._config.enableJSClass){var n=new RegExp("(^|\\s)"+a+"no-js(\\s|$)");t=t.replace(n,"$1"+a+"js$2")}$._config.enableClasses&&(t+=" "+a+e.join(" "+a),x?w.className.baseVal=t:w.className=t)}function r(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):x?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function i(e,t){return!!~(""+e).indexOf(t)}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,a){return t+a.toUpperCase()}).replace(/^-/,"")}function d(e,t){return function(){return e.apply(t,arguments)}}function c(e,t,a){var o;for(var l in e)if(e[l]in t)return a===!1?e[l]:(o=t[e[l]],n(o,"function")?d(o,a||t):o);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function u(){var e=t.body;return e||(e=r(x?"svg":"body"),e.fake=!0),e}function f(e,a,n,o){var l,i,s,d,c="modernizr",p=r("div"),f=u();if(parseInt(n,10))for(;n--;)s=r("div"),s.id=o?o[n]:c+(n+1),p.appendChild(s);return l=r("style"),l.type="text/css",l.id="s"+c,(f.fake?f:p).appendChild(l),f.appendChild(p),l.styleSheet?l.styleSheet.cssText=e:l.appendChild(t.createTextNode(e)),p.id=c,f.fake&&(f.style.background="",f.style.overflow="hidden",d=w.style.overflow,w.style.overflow="hidden",w.appendChild(f)),i=a(p,e),f.fake?(f.parentNode.removeChild(f),w.style.overflow=d,w.offsetHeight):p.parentNode.removeChild(p),!!i}function m(t,n){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(t[o]),n))return!0;return!1}if("CSSSupportsRule"in e){for(var l=[];o--;)l.push("("+p(t[o])+":"+n+")");return l=l.join(" or "),f("@supports ("+l+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return a}function h(e,t,o,l){function d(){p&&(delete L.style,delete L.modElem)}if(l=n(l,"undefined")?!1:l,!n(o,"undefined")){var c=m(e,o);if(!n(c,"undefined"))return c}for(var p,u,f,h,v,g=["modernizr","tspan"];!L.style;)p=!0,L.modElem=r(g.shift()),L.style=L.modElem.style;for(f=e.length,u=0;f>u;u++)if(h=e[u],v=L.style[h],i(h,"-")&&(h=s(h)),L.style[h]!==a){if(l||n(o,"undefined"))return d(),"pfx"==t?h:!0;try{L.style[h]=o}catch(b){}if(L.style[h]!=v)return d(),"pfx"==t?h:!0}return d(),!1}function v(e,t,a,o,l){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+k.join(r+" ")+r).split(" ");return n(t,"string")||n(t,"undefined")?h(i,t,o,l):(i=(e+" "+M.join(r+" ")+r).split(" "),c(i,t,a))}function g(e,t,n){return v(e,a,a,t,n)}var b=[],C=[],y={_version:"3.2.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var a=this;setTimeout(function(){t(a[e])},0)},addTest:function(e,t,a){C.push({name:e,fn:t,options:a})},addAsyncTest:function(e){C.push({name:null,fn:e})}},$=function(){};$.prototype=y,$=new $;var w=t.documentElement,x="svg"===w.nodeName.toLowerCase();$.addTest("canvas",function(){var e=r("canvas");return!(!e.getContext||!e.getContext("2d"))});var S="Moz O ms Webkit",k=y._config.usePrefixes?S.split(" "):[];y._cssomPrefixes=k;var M=y._config.usePrefixes?S.toLowerCase().split(" "):[];y._domPrefixes=M;var T={elem:r("modernizr")};$._q.push(function(){delete T.elem});var L={style:T.elem.style};$._q.unshift(function(){delete L.style}),y.testAllProps=v,y.testAllProps=g,$.addTest("flexbox",g("flexBasis","1px",!0)),$.addTest("flexwrap",g("flexWrap","wrap",!0)),o(),l(b),delete y.addTest,delete y.addAsyncTest;for(var E=0;E<$._q.length;E++)$._q[E]();e.Modernizr=$}(window,document),function(){function e(e,t,a){return"undefined"==typeof a||0===+a?Math[e](t):(t=+t,a=+a,isNaN(t)||"number"!=typeof a||a%1!==0?NaN:(t=t.toString().split("e"),t=Math[e](+(t[0]+"e"+(t[1]?+t[1]-a:-a))),t=t.toString().split("e"),+(t[0]+"e"+(t[1]?+t[1]+a:a))))}Math.round10||(Math.round10=function(t,a){return e("round",t,a)}),Math.floor10||(Math.floor10=function(t,a){return e("floor",t,a)}),Math.ceil10||(Math.ceil10=function(t,a){return e("ceil",t,a)})}(),$.ajaxSetup({headers:{"X-CSRF-TOKEN":$("meta[name='csrf_token']").attr("content")}}),moment.updateLocale("en",{calendar:{lastDay:"[Yesterday at] LT",sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",lastWeek:"[Last] dddd [at] LT",nextWeek:"dddd [at] LT",sameElse:"ll LT"}});var numSpecificReports=0;$("#addNewSpecificReport").click(function(){var e=reportHtml(++numSpecificReports);$(e).appendTo(".modal-specRpt").velocity("slideDown"),$(".datepicker").datepicker({dateFormat:"yy-mm-dd"})}),$(".modal-specRpt").on("click",".remove-report-group",function(){$(this).parent().velocity("slideUp",function(){$(this).remove()})}),$(document).ready(function(){$.fn.dataTable.moment("DD-MMM-YYYY h:mm A"),$(".report").submit(checkReportQuery),$(".report").on("click",".lastSixMonths",lastSixMonths),$(".report").on("click",".lastThreeMonths",lastThreeMonths),$(".datepicker").datepicker({dateFormat:"yy-mm-dd"}),$("#addNewSpecificReport").click(),$.extend(!0,$.fn.dataTable.defaults,{language:{paginate:{previous:"&lt;",next:"&gt;"}},stateSave:!0,deferRender:!0,dom:"lfprtip"}),$.fn.select2.defaults.set("theme","bootstrap"),$(".select2").val(null).select2({placeholder:"Please select"}),$("body").css("padding-top",$("#main-navbar").height()+5),$("#individual-milestones, #aggregate-milestones").multiSelect({selectableOptgroup:!0})});var fixNavbarOffset=debounce(function(){$("body").css("padding-top",$("#main-navbar").height()+5)},100);$(window).resize(fixNavbarOffset),$(".table").on("click",".view-evaluation",function(){var e=$(this).parents("tr").children("td").eq(0).children("a").html();window.location.href="/evaluation/"+e}),$(".report-milestones-info").popover({placement:"left",html:"true",content:"<ul><li>Leave empty to include all milestones in training level in report</li><li>Click a milestone type heading to select all milestones of that type</li></ul>"}),$(".toggle-descriptions").click(function(){var e=$(this).data("id"),t=$("#main-navbar").height(),a=5,n=($(this).parents(".question").velocity("scroll",{offset:-(t+a)}),$("#"+e).hasClass("expanded-descriptions"));n?($("."+e+" .description").velocity("slideUp",function(){$("#"+e).removeClass("expanded-descriptions")}),$(this).html('<span class="glyphicon glyphicon-zoom-in"></span> Show descriptions')):($("#"+e).addClass("expanded-descriptions"),$("."+e+" .description").velocity("slideDown"),$(this).html('<span class="glyphicon glyphicon-zoom-out"></span> Hide descriptions'))}),$("table").on("mouseenter",".table-date-cell",function(){var e=$(this).data("date-value");e&&($(this).data("original-value",$(this).text()),$(this).text(moment(e).format("ll")))}),$("table").on("mouseenter",".table-date-time-cell",function(){var e=$(this).data("date-value");e&&($(this).data("original-value",$(this).text()),$(this).text(moment(e).format("ll LT")))}),$("table").on("mouseleave",".table-date-cell, .table-date-time-cell",function(){var e=$(this).data("originalValue");e&&$(this).text(e)}),$(".table-filter-select").change(function(){var e=$(this).val();$($(this).data("filterTable")).DataTable({retrieve:!0}).column($(this).data("filterColumn")).search(e).draw()}),$(".refresh-table-glyph").click(function(){$($(this).data("table")).DataTable({retrieve:!0}).ajax.reload(),$(this).attr("title","Refreshed!").tooltip("fixTitle").tooltip("show")}),$(".refresh-table-glyph").on("hidden.bs.tooltip",function(){$(this).attr("title","Refresh").tooltip("fixTitle")}),$("[data-toggle='tooltip']").tooltip();var averageSolidColor="rgba(227,227,0,1)",averageFillColor="rgba(227,227,0,0.3)",individualSolidColor="rgba(227,0,0,1)",individualFillColor="rgba(227,0,0,0.3)",options={animation:!1,responsive:!0,angleLineWidth:2,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= Math.round10(value, -2) %>",multiTooltipTemplate:"<%= Math.round10(value, -2) %>",legendTemplate:'<ul class="legend <%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span class="glyphicon glyphicon-stop" style="color:<%=datasets[i].strokeColor%>"></span> <%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',scaleShowLabels:!0,scaleOverride:!0,scaleLineWidth:2,scaleSteps:5,scaleStepWidth:2,scaleStartValue:0,scaleLabel:function(e){return scaleLabels[e.value/2]}};$("#graph-type").change(function(){$(".graphs").html(""),Chart.helpers.each(Chart.instances,function(e){e.destroy()}),drawAllRadarGraphs()}),$("#new-graphs").on("switchChange.bootstrapSwitch",function(){$(".graph-type-container").toggle(),$(".graph-layout-container").toggle(),$(".img-graphs").toggle(),$(".graphs").toggle()}),$("#graph-layout").on("switchChange.bootstrapSwitch",function(){$(".graph").toggleClass("col-sm-6"),Chart.helpers.each(Chart.instances,function(e){e.resize(e.render,!0)})});var evalHistoryChart=[],solidColors={Requested:"rgba(227,227,0,1)",Completed:"rgba(227,0,0,1)"},fillColors={Requested:"rgba(227,227,0,0.3)",Completed:"rgba(227,0,0,0.3)"},options={responsive:!0,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",legendTemplate:'<ul class="legend <%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span class="glyphicon glyphicon-stop" style="color:<%=datasets[i].strokeColor%>"></span> <%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'},labelFormats={year:"YYYY",month:"MMMM",week:"[Week of] MMM D",day:"MMM D"};