<template>
	<div>
		<div class="panel panel-default">
			<div class="panel-heading">
				{{ ucfirstWords(name) }} Editor
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col-md-6">
						<div class="json-container form-group"
								:class="{
									'has-error': newJson && !isSchemaValid,
									'has-success': newJson && isSchemaValid
								}">
							<label class="control-label containing-label">
								New {{ name }}
								<textarea class="input-json form-control"
									v-model.lazy="newJson"></textarea>
							</label>
							<ul v-if="newJson && !isSchemaValid" class="help-block">
								<li v-for="error of schemaErrors">
									{{ ucfirst(error.message) }}
								</li>
							</ul>
							<span v-else-if="newJson && isSchemaValid" class="help-block">
								{{ ucfirst(name) }} valid!
							</span>
						</div>

						<button type="button" class="btn btn-info"
								:disabled="!newJsonObject" @click="formatJson">
							Format JSON
						</button>
						<small>{{ schemaId }}</small>
					</div>
					<div class="col-md-6">
						<div class="json-container">
							<label class="containing-label control-label">
								Current {{ name }}
								<textarea class="previous-json form-control"
									readonly :value="previousJson"></textarea>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
		<alert-list v-model="alerts" />
		<div class="btn-lg-submit-container">
			<button type="button" class="btn btn-lg btn-primary"
					:disabled="!isSchemaValid"
					@click="submitJson">
				Submit
			</button>
			<button v-if="closeable" type="button"
					class="btn btn-lg btn-default"
					@click="$emit('close')">
				Close
			</button>
		</div>
	</div>
</template>

<script>
import AlertList from '@/vue-components/AlertList.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

import Ajv from 'ajv';

import {
	ucfirst,
	ucfirstWords,
	jsonOrThrow,
	fetchConfig
} from '@/modules/utils.js';

export default {
	props: {
		schemaId: {
			type: String,
			required: true
		},
		schemaUrls: {
			type: Array,
			required: true
		},
		name: {
			type: String,
			default: 'JSON'
		},
		pastValues: {
			type: Array,
			default: []
		},
		formProp: {
			type: String,
			default: 'form'
		},
		closeable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			newJson: null,
			alerts: []
		};
	},

	mounted() {
		this.fetchSchemas();
	},

	computed: {
		previousJson() {
			if (this.pastValues && this.pastValues.length > 0)
				return this.pastValues[0][this.formProp];
		},
		newJsonObject() {
			try {
				return JSON.parse(this.newJson);
			} catch (err) {
				console.error(err);
			}
		},
		schemaErrors() {
			if (this.newJson && !this.newJsonObject)
				return [{
					message: `Input is not valid JSON`
				}];

			if (this.newJsonObject && this.schemaValidator)
				return this.schemaValidator.errors;

			return [];
		},
		isSchemaValid() {
			if (this.newJsonObject && this.schemaValidator)
				return this.schemaValidator(this.newJsonObject);

			return false;
		}
	},

	methods: {
		ucfirst,
		ucfirstWords,
		fetchSchemas() {
			Promise.all(
				this.schemaUrls.map(url => fetch(url, {
					...fetchConfig()
				}).then(jsonOrThrow))
			).then(schemas => {
				const ajv = new Ajv({
					allErrors: true
				});

				for (let schema of schemas) {
					ajv.addSchema(schema);
				}
				this.schemaValidator = ajv.getSchema(this.schemaId);
			}).catch(err => {
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: `<strong>Error:</strong> There was a problem fetching the schema`
				});
			});
		},
		formatJson() {
			if (this.newJsonObject)
				this.newJson = JSON.stringify(this.newJsonObject, null, 4);
		},
		submitJson() {
			this.$emit('submit', this.newJson);
		}
	},

	components: {
		AlertList,
		ShowHideButton
	}
};
</script>

<style scoped>
	textarea {
		width: 100%;
		height: 400px;
		font-family: monospace;
		white-space: pre;
	}
</style>
