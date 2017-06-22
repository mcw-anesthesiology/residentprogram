<template>
	<div class="container body-block edit-alum">
		<h2>{{ addEditText }} alum</h2>
		<form class="form">
			<div class="row">
				<div class="col-md-2 glyph-container">
					<span class="glyphicon glyphicon-user"></span>
				</div>
				<div class="col-md-5 col-sm-6">
					<div class="form-group">
						<label class="containing-label">
							First name
							<input type="text" class="form-control"
							placeholder="First name" required
							v-model="first_name" />
						</label>
					</div>
				</div>
				<div class="col-md-5 col-sm-6">
					<div class="form-group">
						<label class="containing-label">
							Last name
							<input type="text" class="form-control"
							placeholder="Last name" required
							v-model="last_name" />
						</label>
					</div>
				</div>
			</div>

			<hr />

			<div class="row">
				<div class="col-md-2 glyph-container">
					<span class="glyphicon glyphicon-send"></span>
				</div>
				<div class="col-md-6 col-sm-8">
					<div class="form-group">
						<label class="containing-label">
							Email
							<input type="email" class="form-control"
								placeholder="Email"
								v-model="email" />
						</label>
					</div>
				</div>
				<div class="col-md-4 col-sm-4">
					<div class="form-group">
						<label class="containing-label">
							Phone
							<input type="tel" class="form-control"
								placeholder="Phone number"
								v-model="phone" />
						</label>
					</div>
				</div>
			</div>

			<hr />

			<div class="row">
				<div class="col-md-2 glyph-container">
					<span class="glyphicon glyphicon-briefcase"></span>
				</div>
				<div class="col-md-6 col-sm-8">
					<label class="containing-label">
						Employer
						<input type="text" class="form-control"
							placeholder="Employer"
							v-model="employer" />
					</label>
				</div>
				<div class="col-md-4 col-sm-4">
					<div class="form-group">
						<label class="containing-label">
							Country
							<input type="text" class="form-control"
								placeholder="Country"
								v-model="country" />
						</label>
					</div>
				</div>
			</div>

			<hr />

			<div class="row">
				<div class="col-md-2 glyph-container">
					<span class="glyphicon glyphicon-envelope"></span>
				</div>
				<div class="col-md-6 col-sm-8">
					<div class="form-group">
						<label class="containing-label">
							Address
							<input type="text" class="form-control"
								placeholder="Address"
								v-model="address" />
						</label>
					</div>
				</div>
				<div class="col-md-4 col-sm-4">
					<div class="form-group">
						<label class="containing-label">
							Address (continued)
							<input type="text" class="form-control"
								placeholder="Apartment #, etc"
								v-model="address_2" />
						</label>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4 col-md-offset-2 col-sm-6">
					<div class="form-group">
						<label class="containing-label">
							City
							<input type="text" class="form-control"
								placeholder="City"
								v-model="city" />
						</label>
					</div>
				</div>
				<div class="col-md-4 col-sm-3">
					<div class="form-group">
						<label class="containing-label">
							State / Region
							<input type="text" class="form-control"
								placeholder="State / Region"
								v-model="state" />
						</label>
					</div>
				</div>
				<div class="col-md-2 col-sm-3">
					<div class="form-group">
						<label class="containing-label">
							ZIP Code
							<input type="text" class="form-control"
								placeholder="ZIP Code"
								v-model="zip" />
						</label>
					</div>
				</div>
			</div>

			<hr />

			<div v-if="manage" class="row">
				<div class="col-md-2 glyph-container">
					<span class="glyphicon glyphicon-pencil"></span>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label class="containing-label">
							Graduation date
							<vue-flatpickr placeholder="Graduation date"
								:options="flatpickrOptions"
								v-model="graduation_date" />
						</label>
					</div>
				</div>
				<div class="col-sm-8">
					<div class="form-group">
						<label class="containing-label">
							Notes
							<textarea class="form-control"
								placeholder="Notes"
								v-model="notes">
							</textarea>
						</label>
					</div>
				</div>
			</div>

			<div class="btn-lg-submit-container">
				<confirmation-button v-if="showClose" class="btn btn-lg"
						unpressed-class="btn-default"
						pressed-class="btn-warning"
						@click="$emit('close')">
					Cancel
				</confirmation-button>
				<button type="submit" class="btn btn-lg btn-primary"
						@click="saveAlum">
					Submit
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import VueFlatpickr from '@jacobmischka/vue-flatpickr';

import ConfirmationButton from 'vue-components/ConfirmationButton.vue';

import {
	okOrThrow,
	getFetchHeaders
} from 'modules/utils.js';

export default {
	props: {
		manage: {
			type: Boolean,
			default: false
		},
		alum: {
			type: Object,
			required: false
		},
		saveUrl: {
			type: String,
			required: true
		},
		showClose: {
			type: Boolean,
			default: true
		}
	},
	data() {
		let alum = this.alum;

		return {
			first_name: alum ? alum.first_name : '',
			last_name: alum ? alum.last_name : '',
			email: alum ? alum.email : '',
			phone: alum ? alum.phone : '',
			employer: alum ? alum.employer : '',
			country: alum ? alum.country : '',
			address: alum ? alum.address : '',
			address_2: alum ? alum.address_2 : '',
			city: alum ? alum.city : '',
			state: alum ? alum.state : '',
			zip: alum ? alum.zip : '',
			graduation_date: alum ? alum.graduation_date : '',
			notes: alum ? alum.notes : ''
		};
	},

	computed: {
		props() {
			return [
				'first_name',
				'last_name',
				'email',
				'phone',
				'employer',
				'country',
				'address_2',
				'city',
				'state',
				'zip'
			];
		},
		manageProps() {
			return [
				'graduation_date',
				'notes'
			];
		},
		addEditText() {
			return this.alum
				? 'Edit'
				: 'Add';
		},
		flatpickrOptions() {
			return {
				altInput: true,
				altInputClass: 'form-control appear-not-readonly'
			};
		}
	},

	watch: {
		alum(alum) {
			Object.assign(this, this.assignProps(alum));
		}
	},

	methods: {
		assignProps(src) {
			let dest = {};

			for (let prop of this.props) {
				if (src && src[prop])
					dest[prop] = src[prop];
				else
					dest[prop] = null;
			}

			if (this.manage) {
				for (let prop of this.manageProps) {
					if (src && src[prop])
						dest[prop] = src[prop];
					else
						dest[prop] = null;
				}
			}

			return dest;
		},
		saveAlum(event) {
			event.preventDefault();

			const body = this.assignProps(this);

			if (this.alum)
				body._method = 'PATCH';

			fetch(this.saveUrl, {
				method: 'POST',
				headers: getFetchHeaders(),
				credentials: 'same-origin',
				body: JSON.stringify(body)
			}).then(okOrThrow).then(() => {
				this.$emit('reload');
			}).catch(err => {
				console.error(err);
				this.$emit('alert', {
					type: 'error',
					html: '<strong>Error:</strong> There was a problem saving the alum'
				});
			});
		}
	},

	components: {
		VueFlatpickr,
		ConfirmationButton
	}
};
</script>

<style scoped>
	.glyph-container {
		text-align: center;
		height: 100%;
		padding: 20px;
	}

	.glyphicon {
		vertical-align: middle;
		font-size: 36px;
	}

	hr {
		margin: 40px;
	}
</style>
