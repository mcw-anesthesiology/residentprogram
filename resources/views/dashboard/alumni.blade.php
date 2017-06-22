@extends("app")

@section("head")
	<style>
		.intro-container {
			padding: 40px;
		}

		.intro-container h1 {
			margin-bottom: 30px;
		}

		.intro-container p {
			margin-bottom: 25px;
		}

		.intro-container > a {
			display: block;
			margin-top: 40px;
		}

		.submit-container {
			text-align: center;
			margin-top: 30px;
		}

		.submit-container img {
			width: 50px;
			height: 50px;
		}

		.success-lead {
			padding: 20px;
		}
	</style>
@stop

@push('stylesheets')
	<link rel="stylesheet" href="{{ elixir('css/vue-alumni.css') }}" />
@endpush

@section("blockless-body")
	<div class="container body-block">
		<div class="intro-container">
			<h1>MCW Anesthesiology Alumni</h1>

			<p class="lead">
				Please keep us up to date with your contact info, we'd love to keep in touch!
			</p>
			<p>
				We don't send much, you don't have to worry about us spamming your inbox.
			</p>
			<p>
				You can return to this address to update your info at any time. We'll include it again with most emails, so don't worry about forgetting it.
			</p>
		</div>

		<div v-if="!show.edit" v-cloak class="container">
			<div class="btn-lg-submit-container">
				<button type="button" class="btn btn-lg btn-primary"
						@click="show.edit = true">
					Edit alumni profile
				</button>
			</div>
		</div>

		<alert-list v-model="alerts"></alert-list>
	</div>

	<edit-alumni v-if="show.edit" :alum="alum" :save-url="editSaveUrl"
		:show-close="false"
		@reload="reloadEditAlum">
	</edit-alumni>


	<alumni-subscription :alum="alum" :save-url="subSaveUrl"
		@reload="reloadAlum"
		@alert="this.alerts.push">
	</alumni-subscription>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-alumni.js') }}"></script>
	<script>
		var propsData = {
			defaultAlum: {!! json_encode($alum) !!},
			hash: {!! json_encode($hash) !!}
		};

		createAlumni('main', propsData);
	</script>
@endpush

@section("script")
	<script>
		$("#alumni-form").submit(function(event){
			event.preventDefault();
			var button = $(this).find("button[type='submit']");
			var action = $(this).attr("action");
			var formData = $(this).serialize();
			var errorText = "Sorry, there was a problem saving your information. " +
				"If this continues to happen, please send me your information " +
				"directly at jmischka@mcw.edu and I will make sure it's properly saved. Thank you!";

			button.prop("disabled", true).addClass("disabled").html('<img src="/img/spin-btn-primary-disabled.gif" alt="Loading spinner icon" />');
			$.ajax({
				url: action,
				method: "POST", // PATCH
				data: formData
			}).done(function(response){
				console.log(response);
				if(response === "success")
					$("#alumni-form-container").html('<div class="row">' +
						'<div class="col-sm-2 glyph-container">' +
							'<span class="glyphicon glyphicon-thumbs-up"></span>' +
						'</div>' +
						'<div class="col-sm-10">' +
							'<p class="lead success-lead">' +
								'Your information was saved successfully. Thank you!' +
							'</p>' +
						'</div>' +
					'</div>');
				else
					appendAlert(errorText, ".alumni-alert-container");

			}).fail(function(err){
				appendAlert(errorText, ".alumni-alert-container");
			});
		});
	</script>
@stop
