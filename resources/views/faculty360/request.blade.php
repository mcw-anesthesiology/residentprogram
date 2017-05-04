@extends('app')

@section('head')
	<style>
		h1 {
			margin: 1em 0 2em;
		}
	</style>
@stop

@section('blockless-body')
	<div class="container body-block">
		<div class="row">
			<div class="col-sm-offset-2 col-sm-8">
				<h1>Faculty 360 evaluation</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
				<div class="form-group">
					<label class="containing-label control-label">
						Faculty to evaluate
						<select-two class="form-control" required
								placeholder="Select faculty" v-model="facultyId">
							<option value="" disabled>Select faculty</option>
							<option v-for="user of sortedFaculty" :value="user.id" v-cloak>
								@{{ user.full_name }}
							</option>
						</select-two>
					</label>			
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
				<div v-if="!user" class="form-group" :class="{'has-error': emailError}" v-cloak>
					<label class="containing-label control-label">
						Your email address
						
						<input type="email" class="form-control" required
							v-model="email" placeholder="example@mcw.edu"
							@change="validateEmail" />
							
						<span v-if="emailError" v-cloak class="help-block">
							@{{ emailError }}
						</span>
					</label>			
				</div>				
			</div>
		</div>
		
		<div class="btn-lg-submit-container">
			<button type="button" class="btn btn-lg btn-primary"
					:disabled="!formIsValid"
					@click="handleSubmit">
				Create evaluation
			</button>
		</div>
		
		<div class="row">
			<div class="col-sm-offset-2 col-sm-8">
				<alert-list v-model="alerts"></alert-list>
			</div>
		</div>
	</div>
@stop

@push('scripts')
	<script src="{{ elixir('js/vue-deps.js') }}"></script>
	<script src="{{ elixir('js/vue-faculty360.js') }}"></script>
	<script>
		var propsData = {
			user: {!! Auth::check() ? $user->toJson() : 'null' !!},
			faculty: {!! $faculty->toJson() !!}
		};
		
		createRequest('main', propsData);
	</script>
@endpush
