<template>
	<div class="news-list panel-body">
		<div v-if="items && items.length > 0">
			<bootstrap-alert v-for="item of items"
					:key="item.id"
					type="info"
					:html="item.body"
					dismissable
					@close="handleDismiss(item.id)">
				<template slot="header">
					<span class="alert-heading h3">
						{{ item.heading || 'New!' }}
					</span>
				</template>
				<template slot="footer">
					<div v-if="item.link" class="link-container">
						<a :href="item.link" class="btn btn-lg btn-success">
							{{ item.link_text || getLinkText() }}
						</a>
					</div>
					<div class="alert-buttons">
						<button type="button" class="btn btn-info"
								@click="handleRemindLater(item.id)">
							Remind me later
						</button>
						<button type="button" class="btn btn-primary"
								@click="handleDismiss(item.id)">
							{{ getAcknowledgeText() }}
						</button>
					</div>
				</template>
			</bootstrap-alert>
		</div>
		<div v-else class="no-news-container text-center">
			<p>
				Nothing to see here!
			</p>
			<p class="no-news-glyph-container">
				<span class="glyphicon glyphicon-thumbs-up"></span>
			</p>
		</div>
	</div>
</template>

<style scoped>
	.news-list {
		overflow: auto;
	}

	.alert-heading {
		display: block;
		margin: 2rem 1.5rem;
	}

	.news-list >>> .alert .alert-html {
		padding: 0 1.5rem;
	}

	.link-container {
		text-align: center;
		padding: 1.5em 0;
	}

	.alert-buttons {
		display: flex;
		justify-content: flex-end;
	}

	.alert-buttons > .btn {
		margin: 0.5em;
	}

	.alert-buttons .btn-primary {
		min-width: 8em;
	}

	.no-news-glyph-container {
		font-size: 3em;
		margin-top: 0.5em;
		color: rgba(0, 0, 0, 0.4);
	}

	@media (min-width: 768px) {
		.news-list {
			max-height: calc(100vh - 175px);
		}
	}

	@media (max-width: 768px) {
		.alert-buttons {
			flex-wrap: wrap;
			justify-content: center;
		}

		.no-news-container {
			color: rgba(255, 255, 255, 0.75);
		}

		.no-news-glyph-container {
			color: rgba(255, 255, 255, 0.65);
		}
	}
</style>

<script>
import BootstrapAlert from '@/vue-components/BootstrapAlert.vue';

import { logError } from '@/modules/errors.js';
import { getAcknowledgeText, getLinkText } from '@/modules/niceties.js';
import { fetchConfig, okOrThrow } from '@/modules/utils.js';

export default {
	props: {
		items: {
			type: Array,
			default() {
				return [];
			}
		}
	},

	methods: {
		getAcknowledgeText,
		getLinkText,

		handleDismiss(id) {
			fetch(`/news-items/${id}/dismiss`, {
				...fetchConfig(),
				method: 'POST', // PATCH
				body: JSON.stringify({
					_method: 'PATCH'
				})
			}).then(okOrThrow).then(() => {
				this.$emit('remove', id);
			}).catch(err => {
				// TODO: Display this somewhere
				// handleError(err, this, )
				logError(err);
			});
		},
		handleRemindLater(id) {
			fetch(`/news-items/${id}/temporarily-dismiss`, {
				...fetchConfig(),
				method: 'POST', // PATCH
				body: JSON.stringify({
					_method: 'PATCH'
				})
			}).then(okOrThrow).then(() => {
				this.$emit('remove', id);
			}).catch(err => {
				// TODO: Display this somewhere
				// handleError(err, this, )
				logError(err);
			});
		}
	},
	components: {
		BootstrapAlert
	}
};
</script>
