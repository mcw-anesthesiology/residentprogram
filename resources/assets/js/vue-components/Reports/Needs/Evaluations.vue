<template>
	<section>
		<h2>Needs evaluations</h2>

		<section class="needs-container">
			<div v-for=""
		</section>
	</section>
</template>

<script>
export default {
	props: {
		trainees: {
			type: Array,
			required: true
		}
	},
	data(){
		return {
			usersToNotify: []
		};
	},
	computed: {
		sortedTrainees(){

		}
	}
};
</script>
