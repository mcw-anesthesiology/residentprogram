<template>
	<div>
		<section class="case-info">
			<div class="row">
				<div class="col-md-4">
					<div class="form-group">
						<label class="containing-label">
							Location
							<select class="form-control"
									:value="location"
									:disabled="readonly"
									required
									@change="$emit('location-input', Number($event.target.value))">
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
							<vue-flatpickr class="form-control"
								:class="{'appear-not-readonly': !readonly}"
								:value="caseDate"
								:readonly="readonly"
								required
								@input="$emit('case-date-input', arguments[0])">
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
							<textarea class="form-control" :value="comments"
								:readonly="readonly"
								@input="$emit('comments-input', $event.target.value)">
							</textarea>
						</label>
					</div>
				</div>
			</div>
		</section>


		<questionnaire-questionnaire
			:sections="sections"
			:readonly="readonly"
			@input="$emit('questionnaire-input', arguments[0])" />
	</div>
</template>

<script>
import VueFlatpickr from '@jacobmischka/vue-flatpickr';
import QuestionnaireQuestionnaire from '../Questionnaire/Questionnaire.vue';

export default {
	props: {
		locations: {
			type: Array,
			required: true
		},
		sections: {
			type: Array,
			required: true
		},
		location: {
			type: Number,
			required: false
		},
		caseDate: {
			type: String,
			required: false
		},
		comments: {
			type: String,
			required: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	components: {
		VueFlatpickr,
		QuestionnaireQuestionnaire
	}
};
</script>
