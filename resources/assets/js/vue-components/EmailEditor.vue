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
		
	</section>
</template>

<script>
import MarkdownEditor from './MarkdownEditor.vue';

export default {
	props: {
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
			}
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
	components: {
		MarkdownEditor
	}
};
</script>

<style scoped>
	ul {
		columns: 150px 3;
	}
</style>
