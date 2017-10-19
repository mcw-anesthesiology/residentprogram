<template>
	<div class="container body-block">
		<form role="form" class="case-log-editor"
				@submit="handleSubmit">

			<h3>{{ formTitle }}</h3>

			<section class="case-info">
				<div class="row">
					<div class="col-md-4">
						<div class="form-group">
							<label class="containing-label">
								Location
								<select class="form-control" v-model="location" required>
									<option v-for="loc of locations"
											:value="loc.id">
										{{ loc.name }}
									</option>
								</select>
							</label>
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label class="containing-label">
								Case Date
								<vue-flatpickr class="form-control appear-not-readonly"
									v-model="caseDate" required>
								</vue-flatpickr>
							</label>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="form-group">
							<label class="containing-label">
								Comments
								<textarea class="form-control" v-model="comment"
									required>
								</textarea>
							</label>
						</div>
					</div>
				</div>
			</section>


			<questionnaire-questionnaire
				:sections="sections"
				@input="handleInput" />

			<div class="text-center">
				<button type="button" class="btn btn-default"
						@click="$emit('close')">
					Cancel
				</button>
				<button type="submit" class="btn btn-primary">
					Submit
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import VueFlatpickr from '@jacobmischka/vue-flatpickr';
import QuestionnaireQuestionnaire from '../Questionnaire/Questionnaire.vue';

import { fetchConfig, okOrThrow, simpleErrorAlert } from '@/modules/utils.js';
import { isoDateString } from '@/modules/date-utils.js';

export default {
	props: {
		formTitle: {
			type: String,
			required: false
		},
		detailsSchema: {
			type: Object,
			required: true
		},
		locations: {
			type: Array,
			required: true
		}
	},

	data() {
		return {
			location: null,
			caseDate: isoDateString(new Date()),
			comment: '',

			schemaTitle: this.detailsSchema.schema
				? this.detailsSchema.schema.title || ''
				: '',
			sections: this.detailsSchema.schema
				? this.detailsSchema.schema.sections || []
				: []
		};
	},

	mounted() {

	},

	methods: {
		handleInput({sections}) {
			this.sections = sections;
		},
		handleSubmit(event) {
			event.preventDefault();

			fetch('/case_logs', {
				method: 'POST',
				...fetchConfig(),
				body: JSON.stringify({
					location_id: this.location,
					case_date: this.caseDate,
					comment: this.comment,
					details_schema_id: this.detailsSchema.id,
					details: {
						title: this.schemaTitle,
						sections: this.sections
					}
				})
			}).then(okOrThrow).then(() => {
				this.$emit('submit');
			}).catch(err => {
				console.error(err);
				this.$emit('alert', simpleErrorAlert('There was a problem submitting the case log'));
			});
		}
	},

	components: {
		VueFlatpickr,
		QuestionnaireQuestionnaire
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
