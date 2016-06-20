function reportHtml(e){return'<div class="report-options collapse"><button type="button" class="close remove-report-group" aria-hidden="true">&times;</button><h3>Report</h3><div class="form-group"><label for="startDate'+e+'">Start Date:</label><input type="text" class="form-control datepicker startDate" id="startDate'+e+'" name="startDate'+e+'"></div><div class="form-group"><label for="endDate">End Date:</label><input type="text" class="form-control datepicker endDate" id="endDate'+e+'" name="endDate'+e+'"></div><div class="form-group" style="text-align: center;"><button type="button" class="btn lastThreeMonths">Last Three Months</button> <button type="button" class="btn lastSixMonths">Last Six Months</button></div><div class="form-group"><label for="trainingLevelInput'+e+'">Training Level</label><select class="form-control select2" id="trainingLevelInput'+e+'" name="trainingLevel'+e+'" style="width: 100%" required><option value="all">All</option><option value="intern">Intern</option><option value="ca-1">CA-1</option><option value="ca-2">CA-2</option><option value="ca-3">CA-3</option><option value="fellow">Fellow</option></select></div><hr /><br /></div>'}function checkReportQuery(){return dateError=!1,$(this).find("input").each(function(){if("date"==$(this).attr("type")||$(this).hasClass("datepicker")){var e=$(this).val(),t=/^\d\d\d\d-\d\d-\d\d$/;new RegExp(t).test(e)||(dateError=!0)}}),dateError&&alert("Please enter a valid date. If your browser does not support the date selector, date must be formatted YYYY-MM-DD"),!dateError}function lastSixMonths(){setStartEndDates.call(this,6)}function lastThreeMonths(){setStartEndDates.call(this,3)}function setStartEndDates(e){e=void 0!=e?e:3;var t=moment().subtract(1,"month").endOf("month"),a=moment(t).startOf("month").subtract(e-1,"month");$(this).parents(".report-options").find(".startDate").val(a.format("YYYY-MM-DD")),$(this).parents(".report-options").find(".endDate").val(t.format("YYYY-MM-DD"))}function appendAlert(e,t,a){a="undefined"==typeof a?"danger":a;var o=document.createElement("div");o.className="alert alert-"+a+" alert-dismissable",o.role="alert";var n=document.createElement("button");n.type="button",n.className="close",n.setAttribute("data-dismiss","alert"),n.setAttribute("aria-label","Close");var r=document.createElement("span");r.setAttribute("aria-hidden","true"),r.innerHTML="&times;",n.appendChild(r);var l=document.createTextNode(e);o.appendChild(n),o.appendChild(l),$(t).append(o)}function unlimitTableEvals(e,t){var a=this.DataTable({retrieve:!0}),o=a.ajax.url();a.ajax.url(o.substring(0,o.lastIndexOf("/"))).load().draw()}function debounce(e,t,a){var o;return function(){var n=this,r=arguments,l=function(){o=null,a||e.apply(n,r)},i=a&&!o;clearTimeout(o),o=setTimeout(l,t),i&&e.apply(n,r)}}function ucfirst(e){return e.charAt(0).toUpperCase()+e.substring(1)}function drawRadarGraphs(e,t,a,o){o="undefined"!=typeof o?o:0;var n=document.getElementsByClassName("graphs")[o],r=document.createElement("div");r.className="graph-container";var l=document.createElement("h3");l.appendChild(document.createTextNode(a)),r.appendChild(l);var i=document.createElement("div");i.className="graph milestone-graph";var s=document.createElement("h4");s.appendChild(document.createTextNode("Milestones")),i.appendChild(s);var d=document.createElement("div");d.className="graph-canvas-container";var p=document.createElement("canvas");p.width=800,p.height=400,d.appendChild(p),i.appendChild(d),r.appendChild(i);var c=document.createElement("div");c.className="graph competency-graph";var u=document.createElement("h4");u.appendChild(document.createTextNode("Competencies")),c.appendChild(u);var f=document.createElement("div");f.className="graph-canvas-container";var m=document.createElement("canvas");m.width=800,m.height=400,f.appendChild(m),c.appendChild(f),r.appendChild(c),n.appendChild(r);var h=$("#graph-type").val(),v=$("#graph-layout").bootstrapSwitch("state");v||(i.className+=" col-sm-6",c.className+=" col-sm-6");var g=p.getContext("2d"),C=m.getContext("2d");if("radar"==h){var b=new Chart(g).Radar(e,options);new Chart(C).Radar(t,options)}else if("bar"==h){var b=new Chart(g).Bar(e,options);new Chart(C).Bar(t,options)}else if("line"==h){var b=new Chart(g).Line(e,options);new Chart(C).Line(t,options)}var y=b.generateLegend();$(r).append(y)}function drawAverageRadarGraphs(){reportData.forEach(function(e,t){prepareReport(e);var a={labels:e.milestoneLabels,datasets:[e.averageMilestoneDataset]},o={labels:e.competencyLabels,datasets:[e.averageCompetencyDataset]};drawRadarGraphs(a,o,"Average")})}function drawAllRadarGraphs(){reportData.forEach(function(e,t){prepareReport(e),e.subjectIds.forEach(function(a){var o={labels:e.milestoneLabels,datasets:[e.averageMilestoneDataset,{label:"Individual Performance",fillColor:individualFillColor,strokeColor:individualSolidColor,pointColor:individualSolidColor,pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:individualSolidColor,data:_.values(e.subjectMilestone[a])}]},n={labels:e.competencyLabels,datasets:[e.averageCompetencyDataset,{label:"Individual Performance",fillColor:individualFillColor,strokeColor:individualSolidColor,pointColor:individualSolidColor,pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:individualSolidColor,data:_.values(e.subjectCompetency[a])}]};drawRadarGraphs(o,n,e.subjects[a],t)})})}function prepareReport(e){e.subjectIds=_.keys(e.subjects).sort(function(t,a){return e.subjects[t].localeCompare(e.subjects[a])}),"fellow"==e.trainingLevel?e.scaleLabels=["","Fellow Level 1","Fellow Level 2","Fellow Level 3","Fellow Level 4","Fellow Level 5"]:e.scaleLabels=["","CBY","CA-1","CA-2","CA-3","Attending"],options.scaleLabel=function(t){return e.scaleLabels[t.value/2]},e.milestoneLabels=_.values(e.milestones),e.averageMilestones=_.values(e.averageMilestone),e.competencyLabels=_.values(e.competencies),e.averageCompetencies=_.values(e.averageCompetency);for(var t=0;t<e.milestoneLabels.length;t++)e.milestoneLabels[t]=e.milestoneLabels[t].replace("Anes Fellow ",""),e.milestoneLabels[t]=e.milestoneLabels[t].replace("and","&");e.averageMilestoneDataset={label:"Average Performance",fillColor:averageFillColor,strokeColor:averageSolidColor,pointColor:averageSolidColor,pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:averageSolidColor,data:e.averageMilestones},e.averageCompetencyDataset={label:"Average Performance",fillColor:averageFillColor,strokeColor:averageSolidColor,pointColor:averageSolidColor,pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:averageSolidColor,data:e.averageCompetencies}}function drawLineChart(e,t,a){void 0!=evalHistoryChart[e]&&evalHistoryChart[e].destroy();var o=$(e).get(0).getContext("2d"),n=[];for(var r in t)n.push({label:r,fillColor:fillColors[r],strokeColor:solidColors[r],pointColor:solidColors[r],pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:solidColors[r],data:t[r]});var l={labels:a,datasets:n};evalHistoryChart[e]=new Chart(o).Line(l,options),$(e+"-legend").html(evalHistoryChart[e].generateLegend())}function getChartEvalData(e,t,a,o,n){o=void 0!=o?o:"month",n=void 0!=n?n:1,t=void 0!=t?t:moment().subtract(1,"year").startOf(o),a=void 0!=a?a:moment();var r="MMM D";void 0!=labelFormats[o]&&(r=labelFormats[o]);for(var l=[],i={Requested:[],Completed:[]},s=t;a>s;s.add(n,o)){var d=moment(s).add(n,o),p=e.reduce(function(e,t){if(void 0!=t.request_date){var a=moment(t.request_date);if(a>=s&&d>a)return e+1}return e},0),c=e.reduce(function(e,t){if(void 0!=t.complete_date&&"complete"==t.status){var a=moment(t.complete_date);if(a>=s&&d>a)return e+1}return e},0);l.push(s.format(r)),i.Requested.push(p),i.Completed.push(c)}return[i,l]}!function(e){"function"==typeof define&&define.amd?define(["jquery","moment","datatables"],e):e(jQuery,moment)}(function(e,t){e.fn.dataTable.moment=function(a,o){var n=e.fn.dataTable.ext.type;n.detect.unshift(function(e){return e&&e.replace&&(e=e.replace(/<.*?>/g,"")),""===e||null===e?"moment-"+a:t(e,a,o,!0).isValid()?"moment-"+a:null}),n.order["moment-"+a+"-pre"]=function(e){return""===e||null===e?-(1/0):parseInt(t(e.replace?e.replace(/<.*?>/g,""):e,a,o,!0).format("x"),10)}}}),!function(e,t,a){function o(e,t){return typeof e===t}function n(){var e,t,a,n,r,l,i;for(var s in b)if(b.hasOwnProperty(s)){if(e=[],t=b[s],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(a=0;a<t.options.aliases.length;a++)e.push(t.options.aliases[a].toLowerCase());for(n=o(t.fn,"function")?t.fn():t.fn,r=0;r<e.length;r++)l=e[r],i=l.split("."),1===i.length?w[i[0]]=n:(!w[i[0]]||w[i[0]]instanceof Boolean||(w[i[0]]=new Boolean(w[i[0]])),w[i[0]][i[1]]=n),C.push((n?"":"no-")+i.join("-"))}}function r(e){var t=S.className,a=w._config.classPrefix||"";if($&&(t=t.baseVal),w._config.enableJSClass){var o=new RegExp("(^|\\s)"+a+"no-js(\\s|$)");t=t.replace(o,"$1"+a+"js$2")}w._config.enableClasses&&(t+=" "+a+e.join(" "+a),$?S.className.baseVal=t:S.className=t)}function l(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):$?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function i(e,t){return!!~(""+e).indexOf(t)}function s(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,a){return t+a.toUpperCase()}).replace(/^-/,"")}function d(e,t){return function(){return e.apply(t,arguments)}}function p(e,t,a){var n;for(var r in e)if(e[r]in t)return a===!1?e[r]:(n=t[e[r]],o(n,"function")?d(n,a||t):n);return!1}function c(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function u(){var e=t.body;return e||(e=l($?"svg":"body"),e.fake=!0),e}function f(e,a,o,n){var r,i,s,d,p="modernizr",c=l("div"),f=u();if(parseInt(o,10))for(;o--;)s=l("div"),s.id=n?n[o]:p+(o+1),c.appendChild(s);return r=l("style"),r.type="text/css",r.id="s"+p,(f.fake?f:c).appendChild(r),f.appendChild(c),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(t.createTextNode(e)),c.id=p,f.fake&&(f.style.background="",f.style.overflow="hidden",d=S.style.overflow,S.style.overflow="hidden",S.appendChild(f)),i=a(c,e),f.fake?(f.parentNode.removeChild(f),S.style.overflow=d,S.offsetHeight):c.parentNode.removeChild(c),!!i}function m(t,o){var n=t.length;if("CSS"in e&&"supports"in e.CSS){for(;n--;)if(e.CSS.supports(c(t[n]),o))return!0;return!1}if("CSSSupportsRule"in e){for(var r=[];n--;)r.push("("+c(t[n])+":"+o+")");return r=r.join(" or "),f("@supports ("+r+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return a}function h(e,t,n,r){function d(){c&&(delete D.style,delete D.modElem)}if(r=o(r,"undefined")?!1:r,!o(n,"undefined")){var p=m(e,n);if(!o(p,"undefined"))return p}for(var c,u,f,h,v,g=["modernizr","tspan"];!D.style;)c=!0,D.modElem=l(g.shift()),D.style=D.modElem.style;for(f=e.length,u=0;f>u;u++)if(h=e[u],v=D.style[h],i(h,"-")&&(h=s(h)),D.style[h]!==a){if(r||o(n,"undefined"))return d(),"pfx"==t?h:!0;try{D.style[h]=n}catch(C){}if(D.style[h]!=v)return d(),"pfx"==t?h:!0}return d(),!1}function v(e,t,a,n,r){var l=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+x.join(l+" ")+l).split(" ");return o(t,"string")||o(t,"undefined")?h(i,t,n,r):(i=(e+" "+L.join(l+" ")+l).split(" "),p(i,t,a))}function g(e,t,o){return v(e,a,a,t,o)}var C=[],b=[],y={_version:"3.2.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var a=this;setTimeout(function(){t(a[e])},0)},addTest:function(e,t,a){b.push({name:e,fn:t,options:a})},addAsyncTest:function(e){b.push({name:null,fn:e})}},w=function(){};w.prototype=y,w=new w;var S=t.documentElement,$="svg"===S.nodeName.toLowerCase();w.addTest("canvas",function(){var e=l("canvas");return!(!e.getContext||!e.getContext("2d"))});var M="Moz O ms Webkit",x=y._config.usePrefixes?M.split(" "):[];y._cssomPrefixes=x;var L=y._config.usePrefixes?M.toLowerCase().split(" "):[];y._domPrefixes=L;var k={elem:l("modernizr")};w._q.push(function(){delete k.elem});var D={style:k.elem.style};w._q.unshift(function(){delete D.style}),y.testAllProps=v,y.testAllProps=g,w.addTest("flexbox",g("flexBasis","1px",!0)),w.addTest("flexwrap",g("flexWrap","wrap",!0)),n(),r(C),delete y.addTest,delete y.addAsyncTest;for(var E=0;E<w._q.length;E++)w._q[E]();e.Modernizr=w}(window,document),function(){function e(e,t,a){return"undefined"==typeof a||0===+a?Math[e](t):(t=+t,a=+a,isNaN(t)||"number"!=typeof a||a%1!==0?NaN:(t=t.toString().split("e"),t=Math[e](+(t[0]+"e"+(t[1]?+t[1]-a:-a))),t=t.toString().split("e"),+(t[0]+"e"+(t[1]?+t[1]+a:a))))}Math.round10||(Math.round10=function(t,a){return e("round",t,a)}),Math.floor10||(Math.floor10=function(t,a){return e("floor",t,a)}),Math.ceil10||(Math.ceil10=function(t,a){return e("ceil",t,a)})}(),moment.updateLocale("en",{calendar:{sameElse:"D-MM-Y h:m A"}});var numSpecificReports=0;$("#addNewSpecificReport").click(function(){var e=reportHtml(++numSpecificReports);$(e).appendTo(".modal-specRpt").velocity("slideDown"),$(".datepicker").datepicker({dateFormat:"yy-mm-dd"})}),$(".modal-specRpt").on("click",".remove-report-group",function(){$(this).parent().velocity("slideUp",function(){$(this).remove()})}),$(document).ready(function(){$.fn.dataTable.moment("DD-MMM-YYYY h:mm A"),$(".report").submit(checkReportQuery),$(".report").on("click",".lastSixMonths",lastSixMonths),$(".report").on("click",".lastThreeMonths",lastThreeMonths),$(".datepicker").datepicker({dateFormat:"yy-mm-dd"}),$("#addNewSpecificReport").click(),$.extend(!0,$.fn.dataTable.defaults,{language:{paginate:{previous:"&lt;",next:"&gt;"}},stateSave:!0,deferRender:!0,dom:"lfprtip"}),$.fn.select2.defaults.set("theme","bootstrap"),$(".select2").val(null).select2({placeholder:"Please select"}),$("body").css("padding-top",$("#main-navbar").height()+5),$("#individual-milestones, #aggregate-milestones").multiSelect({selectableOptgroup:!0})});var fixNavbarOffset=debounce(function(){$("body").css("padding-top",$("#main-navbar").height()+5)},100);$(window).resize(fixNavbarOffset),$(".table").on("click",".view-evaluation",function(){var e=$(this).parents("tr").children("td").eq(0).children("a").html();window.location.href="/evaluation/"+e}),$(".report-milestones-info").popover({placement:"left",html:"true",content:"<ul><li>Leave empty to include all milestones in training level in report</li><li>Click a milestone type heading to select all milestones of that type</li></ul>"}),$(".toggleDescriptions").click(function(){var e=$(this).data("id"),t=($("#main-navbar").height(),$(this).parents(".question").velocity("scroll"),$("#"+e).hasClass("expanded-descriptions"));t?$("."+e+" .description").velocity("slideUp",function(){$("#"+e).removeClass("expanded-descriptions")}):($("#"+e).addClass("expanded-descriptions"),$("."+e+" .description").velocity("slideDown"))});var averageSolidColor="rgba(227,227,0,1)",averageFillColor="rgba(227,227,0,0.3)",individualSolidColor="rgba(227,0,0,1)",individualFillColor="rgba(227,0,0,0.3)",options={animation:!1,responsive:!0,angleLineWidth:2,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= Math.round10(value, -2) %>",multiTooltipTemplate:"<%= Math.round10(value, -2) %>",legendTemplate:'<ul class="legend <%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span class="glyphicon glyphicon-stop" style="color:<%=datasets[i].strokeColor%>"></span> <%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',scaleShowLabels:!0,scaleOverride:!0,scaleLineWidth:2,scaleSteps:5,scaleStepWidth:2,scaleStartValue:0,scaleLabel:function(e){return scaleLabels[e.value/2]}};$("#graph-type").change(function(){$(".graphs").html(""),Chart.helpers.each(Chart.instances,function(e){e.destroy()}),drawAllRadarGraphs()}),$("#new-graphs").on("switchChange.bootstrapSwitch",function(){$(".graph-type-container").toggle(),$(".graph-layout-container").toggle(),$(".img-graphs").toggle(),$(".graphs").toggle()}),$("#graph-layout").on("switchChange.bootstrapSwitch",function(){$(".graph").toggleClass("col-sm-6"),Chart.helpers.each(Chart.instances,function(e){e.resize(e.render,!0)})});var evalHistoryChart=[],solidColors={Requested:"rgba(227,227,0,1)",Completed:"rgba(227,0,0,1)"},fillColors={Requested:"rgba(227,227,0,0.3)",Completed:"rgba(227,0,0,0.3)"},options={responsive:!0,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",legendTemplate:'<ul class="legend <%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span class="glyphicon glyphicon-stop" style="color:<%=datasets[i].strokeColor%>"></span> <%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'},labelFormats={year:"YYYY",month:"MMMM",week:"[Week of] MMM D",day:"MMM D"};