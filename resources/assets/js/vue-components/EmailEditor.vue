<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="heading-title">
				{{ title }}
			</h3>
		</div>
		<div class="panel-body">
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
								<span class="glyphicon glyphicon-triangle-bottom"></span>
							</button>
						</span>
						<span v-if="possibleRecipients" class="input-group-btn">
							<show-hide-button class="btn btn-default"
									v-model="show.possibleRecipients">
								recipients
							</show-hide-button>
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
							<template v-if="groupRecipients">
								<template v-for="possibleRecipientGroup of groupedPossibleRecipients">
									<template v-if="possibleRecipientGroup.children && possibleRecipientGroup.children.length > 0">
										<b>{{ possibleRecipientGroup.text }}</b>
										<ul>
											<li v-for="possibleRecipient of possibleRecipientGroup.children">
												<label :class="{'normal-text-label': !recipientsInclude(possibleRecipient)}">
													<input type="checkbox" v-model="to"
															:value="possibleRecipient" />
													{{ possibleRecipient.text || possibleRecipient }}
												</label>
											</li>
										</ul>
									</template>
								</template>
							</template>
							<template v-else>
								<ul>
									<li v-for="possibleRecipient of possibleRecipients">
										<label :class="{'normal-text-label': !recipientsInclude(possibleRecipient)}">
											<input type="checkbox" v-model="to"
													:value="possibleRecipient" />
											{{ possibleRecipient.full_name || possible.recipient }}
										</label>
									</li>
								</ul>
							</template>
							<button type="button" class="btn btn-xs btn-default"
									@click="toggleRecipients">
								Toggle all
							</button>
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
					<medium-editor v-model="body.html" id="email-body"
						:replacements="emailReplacements" />
				</div>

				<alert-list v-if="alerts && alerts.length > 0" v-model="alerts" />
			</section>
		</div>
		<div class="panel-footer text-right">
			<loading-button loading-class="btn btn-primary" :loading="sendingEmails">
				<button type="button" class="btn btn-primary" @click="send">
					<span class="glyphicon glyphicon-send"></span>
					Send emails
				</button>
			</loading-button>

			<button type="button" class="btn btn-default" @click="$emit('close')">
				Close
			</button>
		</div>
	</div>

</template>

<script>
import MarkdownIt from 'markdown-it';

import AlertList from './AlertList.vue';
import MediumEditor from './MediumEditor.vue';
import ShowHideButton from './ShowHideButton.vue';
import LoadingButton from './LoadingButton.vue';

import { logError } from '@/modules/errors.js';
import {
	ucfirst,
	getFetchHeaders,
	groupUsers,
	htmlLabelReplacements
} from '@/modules/utils.js';

const md = new MarkdownIt();

// FIXME: Possible recipients with a defaultTo doesn't work

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

		title: {
			type: String,
			default: 'Email editor'
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
		groupRecipients: {
			type: Boolean,
			default: true
		},
		emailReplacements: {
			type: Array,
			required: false
		},
		editToOnSend: {
			type: Function,
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
				html: htmlLabelReplacements(md.render(this.defaultBodyMarkdown),
					this.emailReplacements)
			},
			editorType: 'medium',

			sendingEmails: false,

			show: {
				recipients: false,
				possibleRecipients: false
			},

			alerts: []
		};
	},
	computed: {
		editorTypes(){
			return [
				'medium',
				'markdown'
			];
		},
		groupedPossibleRecipients(){
			return groupUsers(this.possibleRecipients);
		},
		toDisplayValue(){
			if (this.possibleRecipients || Array.isArray(this.to))
				return `${this.to ? this.to.length : '0'} recipients`;
			if (typeof this.to === 'string')
				return this.to;
			if (this.to && this.to.full_name && this.to.email)
				return `${this.to.full_name} <${this.to.email}>`;
		},
		alertTypeClass(){
			return {
				'alert-success': this.alert.type === 'success',
				'alert-info': this.alert.type === 'info',
				'alert-danger': this.alert.type === 'error'
			};
		},
		defaultBody(){
			return {
				markdown: this.defaultBodyMarkdown,
				html: htmlLabelReplacements(md.render(this.defaultBodyMarkdown),
					this.emailReplacements)
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
		recipientsInclude(recipient) {
			if (Array.isArray(this.to)) {
				return this.to.includes(recipient);
			} else {
				return this.to === recipient;
			}
		},
		toggleRecipients() {
			if (Array.isArray(this.to) && this.to.length === 0)
				this.to = this.possibleRecipients.slice();
			else
				this.to = [];
		},
		send(){
			this.sendingEmails = true;

			let body = {
				subject: this.subject,
				body: this.body.html,
				to: this.editToOnSend
					? this.editToOnSend(this.to)
					: this.to
			};

			if (this.additionalFields)
				body = Object.assign(body, this.additionalFields);

			let error = false;
			if (!body.to || (Array.isArray(body.to) && body.to.length === 0)){
				this.alerts.push({
					type: 'error',
					html: `Please select a recipient.`
				});
				error = true;
			}
			if (!body.subject){
				this.alerts.push({
					type: 'error',
					html: `Please enter a subject.`
				});
				error = true;
			}
			if (!body.body){
				this.alerts.push({
					type: 'error',
					html: `Please enter a message body.`
				});
				error = true;
			}
			if (error)
				return;

			fetch(this.target, {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(body)
			}).then(response => {
				if (response.ok)
					return response.json();
				else
					throw new Error('There was a problem sending the emails');
			}).then(response => {
				if (response.success){
					this.alerts.push({
						type: 'success',
						text: `${response.success.length} emails successfully sent.`
					});
					if (Array.isArray(this.to))
						this.to = this.to.filter(id => !response.success.includes(id));
				}


				if (response.error && response.error.length > 0 && this.possibleRecipients){
					let userNames = response.error
						.map(errorRecipient => {
							let id = (Number.isNaN(errorRecipient))
								? errorRecipient.id
								: errorRecipient;
							return this.possibleRecipients.find(user => user.id === Number(id)).full_name;
						});

					logError(new Error('Error sending emails to the following users: ' + JSON.stringify(userNames)));
					this.alerts.push({
						type: 'error',
						html: `Error sending emails to the following users: <ul>
							${userNames.map(name => `<li>${name}</li>`).join('')}
						</ul>`
					});
				}

				this.sendingEmails = false;
			}).catch(err => {
				logError(err);
				this.alerts.push({
					text: err.message,
					type: 'error'
				});
				this.sendingEmails = false;
			});
		},
		ucfirst
	},
	components: {
		AlertList,
		MediumEditor,
		ShowHideButton,
		LoadingButton
	}
};
</script>

<style scoped>
	ul {
		columns: 150px 3;
	}

	fieldset label {
		margin: 0 1em;
	}
</style>
