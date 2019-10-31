<template>
	<div class="user-filter-input">
		<div v-if="value.type !== undefined" class="form-group">
			<label class="containing-label">
				User type
				<select class="form-control"
					:value="value.type"
					@change="handleChange('type', $event.target.value)"
				>
					<option value=""></option>
					<option v-for="level of USER_TYPES" :key="level"
						:value="level"
					>
						{{ enumToWords(level) }}
					</option>
				</select>
			</label>
		</div>
		<div v-if="value.training_level !== undefined" class="form-group">
			<label class="containing-label">
				Training level
				<select :value="value.training_level" class="form-control"
						   @input="handleChange('training_level', $event.target.value)">
					<option value=""></option>
					<option value="INTERN">Intern</option>
					<option value="CA1">CA-1</option>
					<option value="CA2">CA-2</option>
					<option value="CA3">CA-3</option>
					<option value="FELLOW">Fellow</option>
				</select>
			</label>
		</div>

		<div v-if="value.secondary_training_level !== undefined" class="form-group">
			<label class="containing-label">
				Secondary training level
				<select class="form-control"
					:value="value.secondary_training_level"
					@change="handleChange('secondary_training_level', $event.target.value)"
				>
					<option value=""></option>
					<option v-for="level of SECONDARY_TRAINING_LEVELS" :key="level"
						:value="level"
					>
						{{ level }}
					</option>
				</select>
			</label>
		</div>
	</div>
</template>

<script>
import TrainingLevelSelect from './TrainingLevelSelect.vue';

import { USER_TYPES, SECONDARY_TRAINING_LEVELS } from '@/modules/constants.js';
import { enumToWords } from '@/modules/text-utils.js';

export default {
	props: {
		value: Object
	},
	data() {
		return {
			USER_TYPES,
			SECONDARY_TRAINING_LEVELS
		};
	},
	methods: {
		enumToWords,
		handleChange(prop, value) {
			this.$emit('input', {
				...this.value,
				[prop]: value
			});
		}
	},
	components: {
		TrainingLevelSelect
	}
};
</script>

<style scoped>
.user-filter-input {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.user-filter-input > .form-group {
	flex-basis: 300px;
	flex-shrink: 1;
	margin: 0.5em 1em;
}
</style>
