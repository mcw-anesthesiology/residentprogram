<template>
	<div class="input-group">
		<vue-flatpickr
			:class="inputClass"
			:options="options"
			:value="value"
			@input="$emit('input', arguments[0])"
			@change="$emit('change', arguments[0])" />
		<span class="input-group-btn">
			<button class="btn btn-default" type="button"
					@click="$emit('input', null)">
				Clear
			</button>
		</span>
	</div>
</template>

<script>
import VueFlatpickr from '@jacobmischka/vue-flatpickr';

export default {
	props: {
		value: {
			type: [ String, Object ],
			default: ''
		},
		inputClass: {
			type: [ String, Object ],
			required: false
		},
		options: {
			type: Object,
			required: false
		}
	},

	components: {
		VueFlatpickr
	}
};
</script>
