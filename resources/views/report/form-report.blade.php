@extends("app")

@section("head")

@stop

@section("body")
	<table class="table" width="100%">
		<thead>
			<tr>
				<th>Faculty</th>
				<th>Subject Evaluations</th>
				<th>Total Evaluations</th>
				<th>Start Date</th>
				<th>End Date</th>
				<th>Form</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{{ $subjectName }}</td>
				<td>{{ $subjectEvals }}</td>
				<td>{{ $averageEvals }}</td>
				<td>{{ $startDate->format("d-M-Y") }}</td>
				<td>{{ $endDate->format("d-M-Y") }}</td>
				<td>{{ $formTitle }}</td>
			</tr>
		</tbody>
	</table>
</div>
<div class="container body-block">
	<div id="form">
		{!! App\Helpers\FormReader::read($formPath) !!}
	</div>
</div>
<div class="container body-block">
	<h4 class="sub-header">Evaluations Included in Report</h4>
	<ul id="evaluations" class="list-group row"></ul>
@stop

@section("script")
	<script>
		var subjectEvals = {{ $subjectEvals }};
		var averageEvals = {{ $averageEvals }};
		var subjectResponses = $.parseJSON('{!! $subjectResponses !!}');
		var subjectPercentages = $.parseJSON('{!! $subjectPercentages !!}');
		var averagePercentages = $.parseJSON('{!! $averagePercentages !!}');
		var subjectResponseValues = $.parseJSON('{!! $subjectResponseValues !!}');
		var subjects = $.parseJSON('{!! $subjects !!}');
		var questions = $.parseJSON('{!! $questions !!}');
		var responses = $.parseJSON('{!! $questionResponses !!}');
		var subjectId = {{ $subjectId }};
		$(document).ready(function(){
			$("#form input").prop("disabled", true);

			questions.forEach(function(questionId){
				if($("textarea[name='"+questionId+"']").length > 0){
					if(subjectResponseValues[questionId]){
						var textarea = $("textarea[name='"+questionId+"']");
						var parent = textarea.parents(".question-option")[0];
						var table = document.createElement("table");
						var thead = table.createTHead();
						var tbody = document.createElement("tbody");
						var tr, th, td, a;

						tr = document.createElement("tr");
						th = document.createElement("th");
						text = document.createTextNode("Evaluation");
						th.appendChild(text); tr.appendChild(th);
						th = document.createElement("th");
						text = document.createTextNode("Response");
						th.appendChild(text); tr.appendChild(th); thead.appendChild(tr);
						textarea = textarea[0];
						parent.removeChild(textarea);
						$.each(subjectResponseValues[questionId], function(evaluationId, textResponse){
							if(textResponse.trim() != ""){
								tr = document.createElement("tr");
								td = document.createElement("td");
								a = document.createElement("a");
								a.href = "/evaluation/"+evaluationId;
								a.target = "_blank";
								text = document.createTextNode(evaluationId);
								a.appendChild(text);
								td.appendChild(a);
								tr.appendChild(td);
								td = document.createElement("td");
								text = document.createTextNode(textResponse);
								td.appendChild(text);
								tr.appendChild(td);
								tbody.appendChild(tr);
							}
						});
						table.appendChild(tbody);
						parent.appendChild(table);
						table.className = "table table-bordered";
						table.style.whiteSpace = "pre-wrap";
					}
				}
				else{
					responses[questionId].forEach(function(response){
						if($("input[name='"+questionId+"'][value='"+response+"']").length > 0){
							var parent = $("input[name='"+questionId+"'][value='"+response+"']").parents(".question-option")[0];
							var table = document.createElement("table");
							var thead = table.createTHead();
							var tr = document.createElement("tr");
							var th = document.createElement("th");
							var text = document.createTextNode("Responses");
							var td = document.createElement("td");
							th.appendChild(text); tr.appendChild(th);
							text = document.createTextNode(subjectResponses[questionId][response]);
							td.appendChild(text); tr.appendChild(td); thead.appendChild(tr);

							tr = document.createElement("tr");
							th = document.createElement("th");
							text = document.createTextNode("Percentage");
							th.appendChild(text); tr.appendChild(th);
							td= document.createElement("td");
							text = document.createTextNode(subjectPercentages[questionId][response]+"%");
							td.appendChild(text); tr.appendChild(td); thead.appendChild(tr);

							tr = document.createElement("tr");
							th = document.createElement("th");
							text = document.createTextNode("Average");
							th.appendChild(text); tr.appendChild(th);
							td = document.createElement("td");
							text = document.createTextNode(averagePercentages[questionId][response]+"%");
							td.appendChild(text); tr.appendChild(td); thead.appendChild(tr);

							table.className = "table table-bordered";
							table.style.width = "40%";
							table.style.marginLeft = "auto";
							table.style.marginRight = "auto";
							parent.style.textAlign = "center";
							parent.appendChild(table);
						}
					});
				}
			});

			var ul = document.getElementById("evaluations");
			var li, a, text;
			$.each(subjectResponseValues[questions[0]], function(evaluationId, textResponse){
				li = document.createElement("li");
				a = document.createElement("a");
				text = document.createTextNode(evaluationId);
				li.className = "list-group-item col-md-6";
				a.href = "/evaluation/"+evaluationId;
				a.target = "_blank";
				a.appendChild(text); li.appendChild(a); ul.appendChild(li);
			});

		});

		$(".toggleDescriptions").click(function(){
			var questionName = $(this).data("id");
			var headerHeight = $("#main-navbar").height();
			var padding = 5;
			var scrollto = $(this).parents(".question").offset().top - padding - headerHeight;
			$("html, body").animate({scrollTop: scrollto});
			$("." + questionName + " .description").slideToggle();
			$("#" + questionName).toggleClass("expanded-descriptions");
		});
	</script>
@stop
