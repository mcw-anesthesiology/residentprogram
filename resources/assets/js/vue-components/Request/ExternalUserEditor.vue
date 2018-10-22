<template>
	<div class="panel panel-default">
		<form @submit="handleSubmit">
			<div class="panel-heading">
				<span class="panel-title">
					Add external user
				</span>
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-md-4">
						<div class="form-group">
							<label>
								Email
								<input type="email" class="form-control" v-model="email" placeholder="email@example.com" />
							</label>
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label>
								First name
								<input type="text" class="form-control" v-model="first_name" placeholder="Jane" />
							</label>
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label>
								Last name
								<input type="text" class="form-control" v-model="last_name" placeholder="Smith" />
							</label>
						</div>
					</div>
				</div>
			</div>
			<div class="panel-footer text-right">
				<router-link class="btn btn-default" to="/">
					Cancel
				</router-link>
				<button type="submit" class="btn btn-primary">
					Submit
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			first_name: '',
			last_name: ''
		};
	},
	methods: {
		handleSubmit(event) {
			event.preventDefault();

			this.$emit('submit', {
				email: this.email,
				first_name: this.first_name,
				last_name: this.last_name
			});
		}
	}
};
</script>
