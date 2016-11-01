<template>
	<div class="form-horizontal">
		<div class="form-group">
			<div class="col-md-4">
				<label for="reports-start-date">Start Date</label>
				<input type="text" id="reports-start-date" class="form-control"
					:value="value.startDate"
					@input="handleInput('startDate', $event.target.value)"/>
			</div>
			<div class="col-md-4">
				<label for="reports-end-date">End Date</label>
				<input type="text" id="reports-end-date" class="form-control"
					:value="value.endDate"
					@input="handleInput('endDate', $event.target.value)"/>
			</div>
			<div class="col-md-4">
				<!-- TODO: Useful premade selections -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: [
		'value'
	],
	mounted(){
		$('#reports-start-date, #reports-end-date').datepicker({
			dateFormat: "yy-mm-dd",
			onSelect: function(){
				this.dispatchEvent(new Event('input'));
			}
		});
	},
	methods: {
		handleInput(prop, value){
			let newValue = Object.assign({}, this.value, {[prop]: value});
			this.$emit('input', newValue);
		}
	}
}
</script>

<style scoped>

</style>
