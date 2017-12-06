<template>
	<div>
		<label class="containing-label">
			<slot></slot>
			<input v-if="dateUnknown" type="text" class="form-control"
				:value="value" readonly />
			<vue-flatpickr v-else class="form-control"
				:key="`multiple-${multipleDates}`"
				:options="flatpickrOptions"
				:value="value"
				@input="$emit('input', arguments[0])" />
		</label>
		<div class="checkbox-label-container">
			<label class="checkbox-label">
				<input type="checkbox" v-model="multipleDates"
					:disabled="readonly || dateUnknown" />
				Multiple
			</label>
			<label class="checkbox-label">
				<input type="checkbox" v-model="dateUnknown"
					:disabled="readonly" />
				Unknown date
			</label>
		</div>
	</div>
</template>

<script>
import VueFlatpickr from '@jacobmischka/vue-flatpickr';
import 'flatpickr/dist/flatpickr.css';

const CONJUNCTION = '; ';

export default {
	props: {
		value: {
			type: String,
			default: ''
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			multipleDates: Boolean(this.value && this.value.includes(CONJUNCTION)),
			dateUnknown: Boolean(this.value && this.value === 'Unknown')
		};
	},

	computed: {
		flatpickrOptions() {
			return {
				altInput: true,
				altInputClass: this.readonly
					? 'form-control'
					: 'form-control appear-not-readonly',
				altFormat: 'M j, Y',
				clickOpens: !this.readonly,
				mode: this.multipleDates ? 'multiple' : 'single',
				conjunction: CONJUNCTION
			};
		}
	},

	watch: {
		multipleDates(multipleDates) {
			if (!multipleDates) {
				let date = this.value;
				if (date && date.includes(CONJUNCTION))
					date = date.split(CONJUNCTION)[0];

				this.$emit('input', date);
			}
		},
		dateUnknown(dateUnknown) {
			if (dateUnknown)
				this.$emit('input', 'Unknown');
			else if (this.value === 'Unknown')
				this.$emit('input', null);
		}
	},

	components: {
		VueFlatpickr
	}
};
</script>


<style scoped>
	.checkbox-label-container {
		padding: 0 -5px;
	}

	.checkbox-label {
		font-weight: normal;
		margin: 0 5px;
	}
</style>
