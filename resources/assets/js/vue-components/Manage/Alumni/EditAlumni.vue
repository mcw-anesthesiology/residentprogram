<template>
	<div class="panel panel-default">
		<div class="panel-heading">
			Edit
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-sm-4">
					<div class="form-group">							
						<label class="containing-label">
							First name
							<input type="text" class="form-control"
								placeholder="First name"
								v-model="firstName" />
						</label>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label class="containing-label">
							Last name
							<input type="text" class="form-control"
								placeholder="Last name"
								v-model="lastName" />
						</label>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="form-group">
						<label class="containing-label">
							Email
							<input type="email" class="form-control"
								placeholder="Email"
								v-model="email" />
						</label>
					</div>
				</div>
			</div>
			<div class="row">
				<label class="containing-label">
					Graduation date
					<vue-flatpickr class="form-control"
						v-model="graduationDate"
						:options="flatpickrOptions" />
				</label>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label class="containing-label">
							Country
							<select class="form-control" v-model="country">
								<option v-for="country of countries">
									{{ country }}
								</option>
							</select>
						</label>
					</div>
					<div class="form-group">
						<label class="containing-label">
							State / Region
							<select
						</label>
					</div>
				</div>
				<div class="col-sm-6">
					
				</div>
			</div>
		</div>
		<div class="panel-footer text-right">
			<button type="button"
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import 

import VueFlatpickr from 'vue-flatpickr';


export default {
	props: {
		startingAlum: {
			type: Object,
			required: false
		},
		onCancel: {
			type: Function,
			required: true
		},
		onSubmit: {
			type: Function,
			required: true
		}
	},
	data(){
		const {
			first_name,
			last_name,
			email,
			graduation_date,
			country,
			address,
			city,
			state
		} = this.startingAlum;
		
		return {
			first_name: first_name || '',
			last_name: last_name || '',
			email: email || '',
			graduation_date: graduation_date
				|| moment().month(5).endOf('month'),
			country: country || 'United States',
			address: address || '',
			city: city || '',
			state: state || 'Wisconsin'
		};
	},
	
	computed: {
		countries(){
			
		}
	},
	
	components: {
		VueFlatpickr
	}
};
</script>
