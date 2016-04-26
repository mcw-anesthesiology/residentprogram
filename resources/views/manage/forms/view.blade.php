@extends("app")

@section("head")
	<style>
		textarea {
			width: 100%;
			resize: none;
		}
	</style>
@stop

@section("body")
	<div id="form">
		{!! App\Helpers\FormReader::read($form->xml_path) !!}
	</div>
@stop

@section("script")
	<script>
		$(document).ready(function(){
			$("#form input").prop("disabled", true);
			$("#form textarea").prop("disabled", true);
			$("#form button").each(function(){
				$(this).addClass("noprint");
			});
			$("#form textarea").addClass("noprint");
		});

		$(".toggleDescriptions").click(function(){ // TODO: combine with one on evaluations/evaluation
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
