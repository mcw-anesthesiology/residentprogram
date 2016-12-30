import Vue from 'vue';
import FormBuilder from './FormBuilder/FormBuilder.vue';
import Reports from './Reports/Reports.vue';
import MilestoneCompetencyQuestionLists from './MilestoneCompetencyQuestionLists.vue';

export function createFormBuilder(el){
	return new Vue({
		el: el,
		data(){
			return {
				oldFormContents: {}
			};
		},
		render(h){
			return h(FormBuilder, {props: {oldFormContents: this.oldFormContents}});
		}
	});
}

export function createReports(el){
	return new Vue({
		el: el,
		render(h){
			return h(Reports);
		}
	});
}

export function renderMilestoneCompetencyLists(milestoneQuestions, competencyQuestions){
	let questionMilestonesCompetencies = {};
	for(let questionId in milestoneQuestions){
		if(!questionMilestonesCompetencies[questionId])
			questionMilestonesCompetencies[questionId] = {
				milestones: [],
				competencies: []
			};
		for(let mq of milestoneQuestions[questionId]){
			questionMilestonesCompetencies[questionId].milestones.push(mq.milestone);
		}
	}

	for(let questionId in competencyQuestions){
		if(!questionMilestonesCompetencies[questionId])
			questionMilestonesCompetencies[questionId] = {
				milestones: [],
				competencies: []
			};
		for(let mq of competencyQuestions[questionId]){
			questionMilestonesCompetencies[questionId].competencies.push(mq.competency);
		}
	}


	let containers = {};
	let toggleButtons = {};
	for(let questionId in questionMilestonesCompetencies){
		containers[questionId] = document.createElement('div');

		let questionPanel = document.querySelector(`#${questionId}`);
		let questionFooter = questionPanel.querySelector('.question-footer');
		if(!questionFooter){
			questionFooter = document.createElement('div');
			questionFooter.className = 'question-footer panel-footer';
			questionPanel.appendChild(questionFooter);
		}
		let toggleContainer = questionFooter.querySelector('.question-description-toggle');
		if(!toggleContainer){
			toggleContainer = document.createElement('div');
			toggleContainer.className = 'question-description-toggle';
			questionFooter.appendChild(toggleContainer);
		}

		toggleButtons[questionId] = document.createElement('button');
		toggleButtons[questionId].type = 'button';
		toggleButtons[questionId].className = 'btn btn-info toggle-milestone-competencies-button';
		let glyph = document.createElement('span');
		glyph.className = 'glyphicon glyphicon-list';
		toggleButtons[questionId].appendChild(glyph);
		toggleButtons[questionId].appendChild(document.createTextNode(' Show milestones and competencies'));
		toggleContainer.appendChild(toggleButtons[questionId]);

		questionFooter.appendChild(containers[questionId]);
	}

	let vms = {};
	for(let questionId in questionMilestonesCompetencies){
		vms[questionId] = new Vue({
			el: containers[questionId],
			render(h){
				return h(MilestoneCompetencyQuestionLists, {
					props: {
						milestones: questionMilestonesCompetencies[questionId].milestones,
						competencies: questionMilestonesCompetencies[questionId].competencies
					}
				});
			}
		});

		toggleButtons[questionId].addEventListener('click', () => {
			toggleButtons[questionId].classList.toggle('active');
			vms[questionId].$children[0].toggleLists();
		});
	}
}
