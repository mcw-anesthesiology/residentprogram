@extends('app')

@section('blockless-body')
@verbatim
	<div class="container body-block">
		<h1>Users</h1>

		<nav>
			<ul class="nav nav-pills">
				<router-link tag="li" to="/" active-class="active" exact>
					<a>All</a>
				</router-link>
				<router-link v-for="type of USER_TYPES" tag="li" :to="{ path: '/', hash: type }" active-class="active" exact>
					<a>{{ renderUserType(type) }}</a>
				</router-link>
			</ul>
		</nav>
	</div>

	<router-view></router-view>
@endverbatim
@endsection

@push('scripts')
	<script>
		createManageUsers('main');
	</script>
@endpush
