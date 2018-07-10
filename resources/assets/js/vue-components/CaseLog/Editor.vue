<template>
	<div class="container body-block">
		<form role="form" class="case-log-editor"
				@submit="handleSubmit">

			<h3>{{ formTitle }}</h3>

			<case-log-form
				:form-title="formTitle"
				:locations="locations"
				:sections="sections"
				:location="location"
				:case-date="caseDate"
				:comments="comments"
				:readonly="readonly"
				:help-class="helpClass"
				@location-input="location = arguments[0]"
				@case-date-input="caseDate = arguments[0]"
				@comments-input="comments = arguments[0]"
				@questionnaire-input="handleInput" />

			<div class="text-center">
				<button type="button" class="btn btn-default"
						@click="$emit('close')">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary"
						:disabled="!validation || !validation.valid"
						:title="submitTitle">
					Submit
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import CaseLogForm from './Form.vue';

import { questionnaire as validate } from '@/modules/questionnaire/validate.js';
import { emitError } from '@/modules/errors.js';
import { isoDateString } from '@/modules/date-utils.js';
import { fetchConfig, okOrThrow } from '@/modules/utils.js';

const incompleteMessage = 'Please complete all required questions before submitting the case log';

export default {
	props: {
		caseLog: {
			type: Object,
			required: false
		},
		formTitle: {
			type: String,
			required: false
		},
		schema: {
			type: Object,
			required: true
		},
		detailsSchemaId: {
			type: Number,
			required: true
		},
		locations: {
			type: Array,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		},
		helpClass: {
			type: String,
			required: false
		}
	},

	data() {
		const schema = this.caseLog && this.caseLog.details
			? this.caseLog.details
			: this.schema;

		return {
			location: this.caseLog ? this.caseLog.location_id : null,
			caseDate: this.caseLog ? this.caseLog.case_date : isoDateString(new Date()),
			comments: this.caseLog ? this.caseLog.comment : null,

			schemaTitle: schema
				? schema.title || ''
				: '',
			sections: schema
				? schema.sections || []
				: []
		};
	},

	computed: {
		validation() {
			return validate({
				title: this.schemaTitle,
				sections: this.sections
			});
		},
		submitTitle() {
			return (this.validation && this.validation.valid)
				? ''
				: incompleteMessage;
		}
	},

	methods: {
		handleInput({sections}) {
			this.sections = sections;
		},
		handleSubmit(event) {
			event.preventDefault();

			if (!this.validation || !this.validation.valid) {
				this.$emit('alert', {
					type: 'info',
					text: incompleteMessage
				});
				return;
			}

			let target = '/case_logs';
			let body = {
				location_id: this.location,
				case_date: this.caseDate,
				comment: this.comments,
				details_schema_id: this.detailsSchemaId,
				details: {
					title: this.schemaTitle,
					sections: this.sections
				}
			};

			if (this.caseLog) {
				target += `/${this.caseLog.id}`;
				body._method = 'PATCH';
			}

			fetch(target, {
				method: 'POST',
				...fetchConfig(),
				body: JSON.stringify(body)
			}).then(okOrThrow).then(() => {
				this.$emit('submit');
			}).catch(err => {
				emitError(err, this, 'There was a problem submitting the case log');
			});
		}
	},

	components: {
		CaseLogForm
	}
};
</script>

<style>
	.case-log-editor .questionnaire-section {
		margin: 2em 0;
		padding: 1em;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}

	.case-log-editor .checkbox-question {
		font-size: 1em;
	}
</style>
