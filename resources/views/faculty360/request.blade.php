@extends('app')

@section('blockless-body')
	<div class="container body-block">
		<div class="form-group">
			<label class="containing-label">
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
		
		<div v-if="!user" class="form-group" :class="{'has-error': emailError}" v-cloak>
			<label class="containing-label">
				Your email address
				
				<input type="email" class="form-control" required
					v-model="email" placeholder="example@mcw.edu"
					@change="validateEmail" />
					
				<span v-if="emailError" v-cloak class="help-block">
					@{{ emailError }}
				</span>
			</label>			
		</div>
		
		<div class="btn-lg-submit-container">
			<button type="button" class="btn btn-lg btn-primary"
					:disabled="!formIsValid"
					@click="handleSubmit">
				Create evaluation
			</button>
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
