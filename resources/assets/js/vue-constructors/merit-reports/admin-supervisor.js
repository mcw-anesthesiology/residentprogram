import Vue from 'vue';
// import VueRouter from 'vue-router';

// Vue.use(VueRouter);

import MeritCompensationChecklist from 'vue-components/MeritCompensation/Checklist/Checklist.vue';

export default function createAdminSupervisorMeritReports(el) {
	return new Vue({
		el,
		
		props: {
			
		},
		data() {
			return {
				checklist: {
					title: 'Title',
					version: 0,
					pages: [
						{
							type: 'section',
							title: 'Page 1',
							items: [
								{
									type: 'instruction',
									text: 'Instruction block text'
								},
								{
									type: 'item',
									text: 'Item 1',
									questions: [
										{
											type: 'text',
											text: 'Text question'
										},
									],
								},
								{
									type: 'item',
									text: 'Item 2',
									questions: [
										{
											type: 'text',
											text: 'Text question'
										},
									],
								},
								{
									type: 'item',
									text: 'Item 3',
									questions: [
										{
											type: 'text',
											text: 'Text question'
										},
									],
								},
								{
									type: 'section',
									title: 'Nested Section 1',
									items: [
										{
											type: 'item',
											text: 'Item 2',
											questions: [
												{
													type: 'checkbox',
													text: 'Checkbox question',
													options: [
														{
															text: 'A',
															value: 'a',
														},
														{
															text: 'B',
															value: 2
														}
													]
												}
											],
										}
									]
								}
							]
						},
						{
							type: 'section',
							title: 'Page 2',
							items: [
								{
									type: 'item',
									text: 'Page 2 Item 1',
									questions: [
										{
											type: 'number',
											text: 'Number question',
											value: 0
										}
									]
								}
							]
						}
					]
				}
			};
		},
		
		methods: {
			handleInput(checklist) {
				this.checklist = Object.assign({}, this.checklist, checklist);
			},
			handleSubmit() {
				console.log(JSON.stringify(this.checklist, null, 4));
			}
		},
		
		components: {
			MeritCompensationChecklist
		}
	});
}
