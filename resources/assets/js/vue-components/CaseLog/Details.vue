<template>
	<div ref="container" class="panel panel-default">
		<div class="panel-heading">
			<span class="panel-title">Case log details</span>
		</div>
		<div class="panel-body">
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
							<label class="containing-label">Case Date
								<div class="input-group date datetimepicker">
									<input type="text" class="form-control case-log-case-date" name="case_date" />
									<span class="input-group-addon">
										<span class="glyphicon glyphicon-calendar"></span>
									</span>
								</div>
							</label>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="form-group">
							<label class="containing-label">Comments
								<textarea class="form-control" name="comment"></textarea>
							</label>
						</div>
					</div>
				</div>
			</section>

			<div ref="schemaContainer"></div>
		</div>
		<div class="panel-footer text-center">
			<button class="btn btn-default"
					@click="$emit('close')">
				Close
			</button>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { renderCaseLogDetailsSchema } from 'modules/case-log-details-schema.js';


export default {
	props: {
		caseLog: {
			type: Object,
			required: true
		},
		locations: {
			type: Array,
			required: true
		}
	},

	mounted() {
		this.renderDetails();
	},

	watch: {
		caseLog() {
			this.renderDetails();
		}
	},

	methods: {
		renderDetails() {
			$(this.$refs.container).find("select[name='location_id']").val(this.caseLog.location_id).change();
			$(this.$refs.container).find("input[name='case_date']").val(moment(this.caseLog.case_date).format("ll")).change();
			$(this.$refs.container).find("textarea[name='comment']").val(this.caseLog.comment);

			while(this.$refs.schemaContainer.firstChild)
				this.$refs.schemaContainer.removeChild(this.$refs.schemaContainer.firstChild);
			renderCaseLogDetailsSchema(this.caseLog.details_schema.schema, this.caseLog.details, this.$refs.schemaContainer);
			$(this.$refs.container).find("input, select").prop("disabled", true);
			$(this.$refs.container).find("textarea").prop("readonly", true);
			$(this.$refs.container).velocity("fadeIn");
		}
	}
};
</script>
