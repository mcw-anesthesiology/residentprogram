<template>
	<div class="container body-block">
		<h2>Upload reports</h2>
		<form @submit="handleSubmit">
			<div class="row">
				<validated-form-group class="col-xs-12 files-container"
						:errors="errors" prop="reportFiles">
					<div class="row">
						<div class="col-sm-4">
							<label class="containing-label control-label">
								Egress report files (CSV, multiple allowed)
								<input ref="egressFilesInput"
									type="file" class="form-control"
									accept=".csv"
									name="egressFiles[]"
									multiple
									@change="handleFilesChange($event, 'egressFiles')" />
								<button type="button" class="btn btn-sm btn-default"
										@click="handleClearFileInput($event, 'egressFiles')">
									Clear
								</button>
							</label>
						</div>
						<div class="col-sm-4">
							<label class="containing-label control-label">
								CHW trainee report files (CSV, multiple allowed)
								<input ref="chwTraineeFilesInput"
									type="file" class="form-control"
									accept=".csv"
									name="chwTraineeFiles[]"
									multiple
									@change="handleFilesChange($event, 'chwTraineeFiles')" />
								<button type="button" class="btn btn-sm btn-default"
										@click="handleClearFileInput($event, 'chwTraineeFiles')">
									Clear
								</button>
							</label>
						</div>
						<div class="col-sm-4">
							<label class="containing-label control-label">
								VA trainee supervisor (CSV, multiple allowed)
								<input ref="vaTraineeSupervisorFilesInput"
									type="file" class="form-control"
									accept=".csv"
									name="vaTraineeSupervisorFiles[]"
									multiple
									@change="handleFilesChange($event, 'vaTraineeSupervisorFiles')" />
								<button type="button" class="btn btn-sm btn-default"
										@click="handleClearFileInput($event, 'vaTraineeSupervisorFiles')">
									Clear
								</button>
							</label>
						</div>
					</div>
				</validated-form-group>
			</div>

			<processing-button type="submit"
					class="btn btn-primary btn-lg center-block"
					:disabled="!valid"
					:processing="processing">
				Add cases
			</processing-button>
		</form>

		<alert-list v-model="alerts" />
	</div>
</template>

<script>
import delve from 'dlv';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import ProcessingButton from '@/vue-components/ProcessingButton.vue';
import ValidatedFormGroup from '@/vue-components/ValidatedFormGroup.vue';

import { handleError } from '@/modules/errors.js';
import { fetchConfig, jsonOrThrow } from '@/modules/utils.js';

export default {
	mixins: [HasAlerts],
	data() {
		return {
			egressFiles: null,
			chwTraineeFiles: null,
			vaTraineeSupervisorFiles: null,
			processing: false
		};
	},
	computed: {
		errors() {
			const errors = new Map();

			if (
				!delve(this, 'egressFiles.length')
				&& !delve(this, 'chwTraineeFiles.length')
				&& !delve(this, 'vaTraineeSupervisorFiles.length')
			) {
				errors.set('reportFiles', 'Please select at least one report CSV file');
			}

			return errors;
		},
		valid() {
			return this.errors.size === 0;
		}
	},
	methods: {
		handleFilesChange(event, fileType) {
			this[fileType] = event.target.files;
		},
		handleClearFileInput(event, fileType) {
			event.preventDefault();
			this.$refs[`${fileType}Input`].value = null;
			this[fileType] = null;
		},
		handleSubmit(event) {
			event.preventDefault();

			if (!this.valid) {
				this.alerts.push({
					type: 'warning',
					text: 'Please fix all input errors'
				});
				return;
			}

			this.processing = true;

			const body = new FormData(event.target);
			fetch('/reports/case-overlaps/add-cases', {
				...fetchConfig({contentType: null}),
				method: 'POST',
				body
			}).then(jsonOrThrow).then(({successful, unsuccessful}) => {
				if (successful)
					this.alerts.push({
						type: 'success',
						text: `${successful} rows successfully processed`
					});

				if (unsuccessful)
					this.alerts.push({
						type: 'error',
						text: `${unsuccessful} not processed successfully`
					});
			}).catch(err => {
				handleError(err, this, 'There was a problem uploading the reports');
			}).finally(() => {
				this.processing = false;
			});
		},
	},
	components: {
		ProcessingButton,
		ValidatedFormGroup
	}
};
</script>
