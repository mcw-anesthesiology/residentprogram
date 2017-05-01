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
						
						<show-hide-button v-model="show.schema">
							schema
						</show-hide-button>
						<button type="button" class="btn btn-info"
								:disabled="!newJsonObject" @click="formatJson">
							Format JSON
						</button>
						<div v-if="show.schema" class="json-container">
							<label class="containing-label control-label">
								Schema
								<textarea class="schema-json form-control"
									readonly :value="schema"></textarea>
							</label>
						</div>
					</div>
					<div class="col-md-6">
						<div class="json-container">
							<label class="containing-label control-label">
								Current {{ name }}
								<textarea class="previous-json form-control"
									readonly :value="pastValues[0].form"></textarea>
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
			<button type="button" class="btn btn-lg btn-default"
					@click="$emit('close')">
				Close
			</button>
		</div>
	</div>
</template>

<script>
import AlertList from 'vue-components/AlertList.vue';
import ShowHideButton from 'vue-components/ShowHideButton.vue';

import Ajv from 'ajv';

import { ucfirst, ucfirstWords } from 'modules/utils.js';

const ajv = new Ajv({
	allErrors: true
});

export default {
	props: {
		schemaUrl: {
			type: String,
			required: true
		},
		name: {
			type: String,
			default: 'JSON'
		},
		pastValues: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			newJson: null,
			schema: null,
			
			show: {
				schema: false
			},
			alerts: []
		};
	},
	
	mounted() {
		fetch(this.schemaUrl).then(response => {
			if (response.ok)
				return response.text();
				
			throw new Error(response.statusText);
		}).then(schema => {
			this.schema = schema;
			this.schemaValidator = ajv.compile(JSON.parse(schema));
		}).catch(err => {
			console.error(err);
			this.alerts.push({
				type: 'error',
				html: `<strong>Error:</strong> There was a problem fetching the schema`
			});
		});
	},
	
	computed: {
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
