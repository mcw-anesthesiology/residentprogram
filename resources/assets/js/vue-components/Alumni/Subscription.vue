<template>
	<div class="container body-block">
		<h2>MCW Alumni subscription</h2>

		<div v-if="alum.do_not_contact">
			<p>
				You are successfully unsubscribed from receiving emails from us.
				We're sorry to see you go!
			</p>

			<div class="btn-lg-submit-container">

				<button type="button" class="btn btn-lg btn-success"
						@click="toggleSub">
					<span class="glyphicon glyphicon-plus"></span>
					Subscribe
				</button>
			</div>
		</div>
		<div v-else>
			<p>
				Are you sure you would like to unsubscribe from all
				alumni contact from MCW Anesthesiology?
			</p>

			<div class="btn-lg-submit-container">

				<button type="button" class="btn btn-lg btn-danger"
						@click="toggleSub">
					<span class="glyphicon glyphicon-remove"></span>
					Unsubscribe
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { emitError } from '@/modules/errors.js';
import { getFetchHeaders, okOrThrow } from '@/modules/utils.js';

export default {
	props: {
		alum: {
			type: Object,
			required: true
		},
		saveUrl: {
			type: String,
			required: true
		}
	},


	methods: {
		toggleSub() {
			fetch(this.saveUrl, {
				method: 'POST', // PATCH
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify({
					_method: 'PATCH',
					do_not_contact: !this.alum.do_not_contact
				})
			}).then(okOrThrow).then(() => {
				this.$emit('reload');
			}).catch(err => {
				emitError(err, this, 'There was a problem updating your subscription');
			});
		}
	}
};
</script>
