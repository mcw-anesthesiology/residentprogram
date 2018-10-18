<template>
	<form @submit="handleSubmit">
		<div class="form-group">
			<label>
				Email
				<input type="email" class="form-control" v-model="email" />
			</label>
		</div>

		<div class="form-group">
			<label>
				First name
				<input type="text" class="form-control" v-model="first_name" />
			</label>
		</div>

		<div class="form-group">
			<label>
				Last name
				<input type="text" class="form-control" v-model="last_name" />
			</label>
		</div>

		<button type="submit" class="btn btn-primary">
			Submit
		</button>
	</form>
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
