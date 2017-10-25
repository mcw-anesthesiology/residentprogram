<template>
	<div class="container body-block">
		<h2>Add entry</h2>

		<form ref="addLogForm" role="form" method="post" action="/case_logs"
				@submit="addCaseLog">

			<h3>{{ formTitle }}</h3>

			<section class="case-info">
				<div class="row">
					<div class="col-md-4">
						<div class="form-group">
							<label class="containing-label">
								Location
								<select class="form-control" name="location_id">
									<option v-for="location of locations"
											:value="location.id">
										{{ location.name }}
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
									name="case_date">
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
								<textarea class="form-control" name="comment">
								</textarea>
							</label>
						</div>
					</div>
				</div>
			</section>


			<input type="hidden" name="details_schema_id" :value="detailsSchemaId" />
			<section ref="detailsContainer" class="case-details"></section>

			<button type="submit" class="btn btn-primary center-block">
				<span class="glyphicon glyphicon-plus"></span>
				Add entry
			</button>
		</form>
	</div>
</template>

<script>
import VueFlatpickr from '@jacobmischka/vue-flatpickr';

import { renderCaseLogDetailsSchema } from '@/modules/case-log-details-schema.js';

import { getFetchHeaders, okOrThrow, simpleErrorAlert } from '@/modules/utils.js';

export default {
	props: {
		formTitle: {
			type: String,
			default: ''
		},
		schema: {
			type: Object,
			required: true
		},
		locations: {
			type: Array,
			required: true
		},
		detailsSchemaId: {
			type: Number,
			required: true
		}
	},

	mounted() {
		renderCaseLogDetailsSchema(
			this.schema,
			undefined,
			this.$refs.detailsContainer
		);
	},

	methods: {
		addCaseLog(event) {
			event.preventDefault();

			let body = new FormData(this.$refs.addLogForm);
			fetch('/case_logs', {
				method: 'POST',
				headers: getFetchHeaders({contentType: null}),
				credentials: 'same-origin',
				body
			}).then(okOrThrow).then(() => {
				this.$emit('submit');
			}).catch(err => {
				console.error(err);
				this.$emit('alert', simpleErrorAlert('There was a problem adding the case log entry'));
			});
		}
	},

	components: {
		VueFlatpickr
	}
};
</script>
