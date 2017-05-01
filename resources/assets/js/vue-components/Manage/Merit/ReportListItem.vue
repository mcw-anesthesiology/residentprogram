<template>
	<div class="merit-report-list-item">
		<div class="row">
			<div class="col-sm-6 name-cell">
				<span class="name">{{ currentForm.name }}</span>
			</div>
			<div class="col-sm-3 version-cell">
				<small>Version</small>
				<span>{{ currentForm.version }}</span>
			</div>
			<div class="col-sm-3 controls-cell text-right">
				<button type="button" class="btn btn-sm btn-info"
						@click="handleClick">
					<span class="glyphicon glyphicon-pencil"></span>
					View / edit
				</button>
				<confirmation-button class="btn btn-sm btn-danger"
						pressed-class="btn btn-sm btn-warning"
						@click="$emit('delete')">
					<span class="glyphicon glyphicon-remove"></span>
					Delete
					
					<template slot="pressed">
						<span class="glyphicon glyphicon-trash"></span>
						Confirm delete
					</template>
				</confirmation-button>
			</div>
		</div>
	</div>
</template>

<script>
import ConfirmationButton from 'vue-components/ConfirmationButton.vue';

export default {
	props: {
		forms: {
			type: Array,
			required: true
		}
	},
	
	computed: {
		currentForm() {
			return this.forms[0];
		}
	},
	
	methods: {
		handleClick() {
			this.$emit('click');
		}
	},
	
	components: {
		ConfirmationButton
	}
};
</script>

<style scoped>
	.merit-report-list-item {
		border-bottom: 1px solid rgba(0, 0, 0, 0.25);
		padding: 5px 0;
	}
	
	.merit-report-list-item:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.05);
	}
	
	small {
		font-size: 0.75em;
		color: rgba(0, 0, 0, 0.55);
		display: block;
	}
	
	.name-cell {
		position: relative;
		bottom: 0;
	}
	
	.name {
		font-size: 1.25em;
	}
</style>
