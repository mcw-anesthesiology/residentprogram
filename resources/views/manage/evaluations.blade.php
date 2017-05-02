@extends("app")

@section("head")
	<style>
		.visibility {
			margin-top: 5px;
		}

		.visibility-edit {
			margin: 5px;
		}
	</style>
@stop

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir("css/vue-manage.css") }}" />
@endpush

@section("body")
	<h2 class="sub-header">Manage Evaluations</h2>
	<evaluation-data-table :thead="thead" :config="config" />
@stop

@section("script")
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-manage.js') }}"></script>
	<script>
		createManageEvaluations('main');
	</script>
	<script>
		$(document).on("click", ".table .disableEval", function(){
			var requestId = $(this).data('id');
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";
			data.action = "disable";
            var span = $(this).parent();
            var status = $(this).parents("tr").find(".status");
			$.ajax({
				url: "/evaluations/" + requestId,
                method: "POST", // PATCH
                data: data,
            }).done(function(response){
				if (response != "false"){
					span.velocity("fadeOut", function(){
						$(this).html("<button class='enableEval btn btn-success btn-xs' data-id='" + requestId + "'><span class='glyphicon glyphicon-ok'></span> Enable</button>");
						$(this).velocity("fadeIn");
					});
					status.velocity("fadeOut", function(){
						$(this).html("<span class='badge badge-disabled'>disabled</span>");
						$(this).velocity("fadeIn");
					});

				}
			}).fail(function(){
				appendAlert("There was a problem disabling the evaluation");
			});
		});

		$(document).on("click", ".table .enableEval", function(){
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";
			data.action = "enable";
            var requestId = $(this).data('id');
            var span = $(this).parent();
            var status = $(this).parents("tr").find(".status");
            var cancel = $(this).parents("tr").find(".cancel");
            $.ajax({
				url: "/evaluations/" + requestId,
                method: "POST", // PATCH
                data: data
            }).done(function(response){
				if (response != "false") {
					span.velocity("fadeOut", function(){
						$(this).html("<button class='disableEval btn btn-danger btn-xs' data-id='" + requestId + "'><span class='glyphicon glyphicon-remove'></span> Disable</button>");
						$(this).velocity("fadeIn");
					});
					if (response == "pending") {
						status.velocity("fadeOut", function(){
							$(this).html("<span class='badge badge-pending'>"+response+"</span>");
							$(this).velocity("fadeIn");
						});

						cancel.velocity("fadeOut", function(){
							$(this).html("<button class='cancelEval btn btn-danger btn-xs' data-toggle='modal' data-target='.bs-cancel-modal-sm' data-id='" + requestId + "'><span class='glyphicon glyphicon-remove'></span> Cancel</button>");
							$(this).velocity("fadeIn");
						});
					}
					else if (response == "complete") {
						status.velocity("fadeOut", function(){
							$(this).html("<span class='badge badge-complete'>complete</span>");
							$(this).velocity("fadeIn");
						});
					}
				}
			}).fail(function(){
				appendAlert("There was a problem enabling the evaluation");
			});
		});

		$(document).on("click", ".table .cancelEval", function(){
			var requestId = $(this).data('id');
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";
			data.action = "cancel";
            var span = $(this).parent();
            var status = $(this).parents("tr").find(".status");
            $.ajax({
				url: "/evaluations/" + requestId,
                method: "POST", // PATCH
                data: data
            }).done(function(response){
				if (response != "false") {
					span.velocity("fadeOut", function(){
						$(this).html("");
					});
					status.velocity("fadeOut", function(){
						$(this).html("<span class='badge badge-disabled'>canceled by admin</span>");
						$(this).velocity("fadeIn");
					});
				}
			}).fail(function(){
				appendAlert("There was a problem cancelling the evaluation");
			});
        });

		$("body").popover({
			html: true,
			selector: ".visibility",
			trigger: "focus",
			placement: "auto left",
			title: "Subject visibility",
			content: function(){
				var evalId = $(this).data("id");
				var evalType = $(this).data("evalType");
				var buttons = "<button type='button' class='visibility-edit btn btn-info' data-eval='" + evalId + "' data-visibility='visible'>Visible <span class='glyphicon glyphicon-eye-open'></span></button> " +
					"<button type='button' class='visibility-edit btn' data-eval='" + evalId + "' data-visibility='anonymous'>Anonymous <span class='glyphicon glyphicon-eye-close'></span></button> " +
					"<button type='button' class='visibility-edit btn btn-default' data-eval='" + evalId + "' data-visibility='hidden'>Hidden <span class='glyphicon glyphicon-eye-close'></span></button> ";

				if(evalType === 'faculty')
					buttons += "<button type='button' class='visibility-edit btn' data-eval='" + evalId + "' data-visibility='under faculty threshold'>Under faculty threshold <span class='glyphicon glyphicon-eye-close'></span></button> ";

				buttons += "<button ype='button' class='visibility-edit btn btn-primary' data-eval='" + evalId + "' data-visibility='reset'>Reset <span class='glyphicon glyphicon-repeat'></span></button> ";

				return buttons;
			}
		});

		$(document).on("click", ".table .visibility-edit", function(){
			var evalId = $(this).data("eval");
			var data = {
				_token: "{{ csrf_token() }}",
				action: "visibility",
				visibility: $(this).data("visibility")
			};
			var button = $(".table .visibility[data-id='" + evalId +"']");
			var originalVisibility = button.data("currentVisibility");

			if(data.visibility !== "reset")
				button.velocity("fadeOut", function(){
					alterVisibilityButton(button, data.visibility);
					button.velocity("fadeIn");
				});

			$.ajax({
				url: "/evaluations/" + evalId,
				method: "PATCH",
				data: data
			}).done(function(response){
				if(data.visibility === "reset"){
					button.velocity("fadeOut", function(){
						alterVisibilityButton(button, response);
						button.velocity("fadeIn");
					});
				}
				else if(response !== data.visibility){
					alterVisibilityButton(button, originalVisibility);
					appendAlert("There was a problem changing the visibility. Please refresh and try again");
				}
			}).fail(function(){
				alterVisibilityButton(button, originalVisibility);
				appendAlert("There was a problem changing the visibility");
			});
		});

		$(document).on("click", ".table .send-reminder", function(){
			$(".table .send-reminder-confirm").removeClass("send-reminder-confirm").removeClass("btn-warning").addClass("btn-primary")
				.html("<span class='glyphicon glyphicon-send'></span> Send reminder");
			$(this).addClass("send-reminder-confirm").addClass("btn-warning").removeClass("btn-primary")
				.html("<span class='glyphicon glyphicon-send'></span> Confirm send");
		});

		$(document).on("click", ".table .send-reminder-confirm", function(){
			var evalId = $(this).data("id");
			var data = {};
			data._token = "{{ csrf_token() }}";
			data._method = "PATCH";

			var button = $(this);
			$.ajax({
				url: "/evaluations/" + evalId + "/remind",
				method: "POST", // PATCH
				data: data
			}).done(function(response){
				if(response === "success"){
					button.removeClass("send-reminder").removeClass("send-reminder-confirm").removeClass("btn-warning")
						.addClass("btn-success").html("<span class='glyphicon glyphicon-ok'></span> Reminder sent");
				}
				else {
					appendAlert("There was a problem sending the reminder");
				}
			}).fail(function(){
				appendAlert("There was a problem sending the reminder");
			});
		});

		function alterVisibilityButton(button, visibility){
			switch(visibility){
				case "visible":
					button.removeClass("visibility-anonymous visibility-hidden btn-default");
					button.addClass("visibility-visible btn-info");
					button.html("Visible <span class='glyphicon glyphicon-eye-open'></span>");
					break;
				case "anonymous":
					button.removeClass("visibility-visible visibility-hidden btn-info btn-default");
					button.addClass("visibility-anonymous");
					button.html("Anonymous <span class='glyphicon glyphicon-eye-close'></span>");
					break;
				case "hidden":
					button.removeClass("visibility-anonymous visibility-visible btn-info");
					button.addClass("visibility-hidden btn-default");
					button.html("Hidden <span class='glyphicon glyphicon-eye-close'></span>");
					break;
				case "under faculty threshold":
					button.removeClass("visibility-visible visibility-hidden btn-info btn-default");
					button.addClass("visibility-anonymous");
					button.html("Under faculty threshold <span class='glyphicon glyphicon-eye-close'></span>");
					break;
			}
		}
    </script>
@stop
