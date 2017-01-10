<template>
	<section>
		<div class="form-group">
			<label for="email-to">To</label>
			<div class="input-group">
				<input type="text" id="email-to"
					class="form-control appear-not-readonly"
					:value="toDisplayValue" readonly />
				<span v-if="Array.isArray(to) && !possibleRecipients"
						class="input-group-btn">
					<button type="button" class="btn btn-default"
							@click="show.recipients = !show.recipients">
						Show recipients
					</button>
				</span>
				<span v-if="possibleRecipients" class="input-group-btn">
					<button type="button" class="btn btn-default"
							@click="show.possibleRecipients = !show.possibleRecipients">
						Show recipients
					</button>
				</span>
			</div>
			
			<div v-if="Array.isArray(to) && !possibleRecipients"
					v-show="show.recipients">
				<ul class="list-group">
					<li v-for="recipient of to" class="list-group-item">
						{{ recipient.full_name || recipient }}
					</li>
				</ul>
			</div>
			
			<div v-if="possibleRecipients" v-show="show.possibleRecipients">
				<div class="well row">
					<template v-if="possibleRecipientsAreGrouped"
							v-for="possibleRecipientGroup of possibleRecipients">
						<template v-if="possibleRecipientGroup.children && possibleRecipientGroup.children.length > 0">
							<b>{{ possibleRecipientGroup.text }}</b>
							<ul>
								<li v-for="possibleRecipient of possibleRecipientGroup.children">
									<label :class="{'normal-text-label': !to.includes(possibleRecipient.id)}">
										<input type="checkbox" v-model="to"
												:value="possibleRecipient.id" /> 
										{{ possibleRecipient.text || possibleRecipient }}
									</label>								
								</li>
							</ul>						
						</template>
					</template>
					<ul v-else>
						<li v-for="possibleRecipient of possibleRecipients">
							<label :class="{'normal-text-label': !to.includes(possibleRecipient.id)}">
								<input type="checkbox" v-model="to"
										:value="possibleRecipient.id" /> 
								{{ possibleRecipient.full_name || possibleRecipient }}
							</label>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label for="email-subject">Subject</label>
			<input type="text" id="email-subject" class="form-control"
				v-model="subject" />
		</div>
		<div class="form-group">
			<label for="email-body">Body</label>
			<markdown-editor v-model="body.markdown" editorId="email-body"
				:replacements="emailReplacements" @html="body.html = arguments[0]" />
		</div>
		
		<alert-list v-if="alerts && alerts.length > 0" v-model="alerts" />
		
		<div class="form-group text-right">
			<button type="button" class="btn btn-primary" @click="send">
				<span class="glyphicon glyphicon-send"></span>
				Send emails
			</button>
			
			<button type="button" class="btn btn-default" @click="$emit('close')">
				Close
			</button>
		</div>
		
	</section>
</template>

<script>
import AlertList from './AlertList.vue';
import MarkdownEditor from './MarkdownEditor.vue';

import { getFetchHeaders } from '../modules/utils.js';

export default {
	props: {
		from: {
			type: String,
			default: 'admin'
		},
		target: {
			type: String,
			default: '/emails'
		},

		defaultTo: {
			default(){
				return [];
			}
		},
		defaultSubject: {
			type: String,
			required: false
		},
		defaultBodyMarkdown: {
			type: String,
			required: false
		},
		
		possibleRecipients: {
			type: Array,
			required: false
		},
		emailReplacements: {
			type: Array,
			required: false
		},
		additionalFields: {
			type: Object,
			required: false
		}
	},
	data(){
		return {
			to: this.defaultTo,
			subject: this.defaultSubject,
			body: {
				markdown: this.defaultBodyMarkdown,
				html: null
			},
			
			show: {
				recipients: false,
				possibleRecipients: false
			},
			
			alerts: [
				{
					type: 'info',
					text: 'Testing'
				},
				{
					type: 'error',
					text: 'ERROR'
				}
			]
		};
	},
	computed: {
		toDisplayValue(){
			if(this.possibleRecipients || Array.isArray(this.to))
				return `${this.to ? this.to.length : '0'} recipients`;
			if(typeof this.to === 'string')
				return this.to;
			if(this.to && this.to.full_name && this.to.email)
				return `${this.to.full_name} <${this.to.email}>`;
		},
		possibleRecipientsAreGrouped(){
			return this.possibleRecipients && Array.isArray(this.possibleRecipients)
				&& this.possibleRecipients[0].hasOwnProperty('children');
		},
		alertTypeClass(){
			return {
				'alert-success': this.alert.type === 'success',
				'alert-info': this.alert.type === 'info',
				'alert-danger': this.alert.type === 'error'
			};
		}
	},
	watch: {
		defaultTo(defaultTo){
			this.to = defaultTo;
		},
		defaultSubject(defaultSubject){
			this.subject = defaultSubject;
		},
		defaultBody(defaultBody){
			this.body = defaultBody;
		}
	},
	methods: {
		send(){
			let body = {
				to: this.to,
				subject: this.subject,
				body: this.body.html
			};
			
			if(this.additionalFields)
				body = Object.assign(body, this.additionalFields);
			
			fetch(this.target, {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(body)
			}).then(response => {
				if(response.ok)
					return response.json();
				else
					throw new Error('There was a problem sending the emails');
			}).then(response => {
				
			}).catch(err => {
				this.alerts.push({
					text: err.message,
					type: 'error'
				});
			});
		}
	},
	components: {
		AlertList,
		MarkdownEditor
	}
};
</script>

<style scoped>
	ul {
		columns: 150px 3;
	}
</style>
