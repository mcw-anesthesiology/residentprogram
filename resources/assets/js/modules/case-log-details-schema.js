import { Validator } from 'jsonschema';
const v = new Validator();
import schema from '../../schemas/case-log-details.json';

export function caseLogDetailsSchemaIsValid(detailsSchema){
	return v.validate(detailsSchema, schema).valid;
}

export function renderCaseLogDetailsSchema(schema, container = document.createElement('section')){
	schema.forEach(function(section, sectionIndex){
		let panel = document.createElement('section');
		let panelBody = document.createElement('div');

		panel.className = 'panel panel-default';

		if(section.title){
			let panelHeading = document.createElement('div');
			let panelTitle = document.createElement('h4');
			let panelTitleInput = document.createElement('input');

			panelHeading.className = 'panel-heading';
			panelTitle.className = 'panel-title';
			panelTitleInput.type = 'hidden';
			panelTitleInput.name = `details[${sectionIndex}][title]`;
			panelTitleInput.value = section.title;
			panelTitle.appendChild(document.createTextNode(section.title));
			panelHeading.appendChild(panelTitle);
			panelHeading.appendChild(panelTitleInput);
			panel.appendChild(panelHeading);
		}

		panelBody.className = 'panel-body';
		panel.appendChild(panelBody);


		section.subsections.forEach(function(subsection, subsectionIndex){
			let subsectionContainer = document.createElement('section');
			let row = document.createElement('div');
			if(subsection.title){
				let subsectionHeading = document.createElement('h5');
				let subsectionTitleInput = document.createElement('input');
				subsectionHeading.className = 'sub-header';
				subsectionHeading.appendChild(document.createTextNode(subsection.title));
				subsectionTitleInput.type = 'hidden';
				subsectionTitleInput.name = `details[${sectionIndex}][subsections][${subsectionIndex}][title]`;
				subsectionTitleInput.value = subsection.title;
				subsectionContainer.appendChild(subsectionHeading);
				subsectionContainer.appendChild(subsectionTitleInput);
			}
			row.className = 'row';

			subsection.inputs.forEach(function(input, inputIndex){
				switch(input.type){
					case 'checkbox': {
						let checkboxContainer = document.createElement('div');
						let label = document.createElement('label');
						let nameInput = document.createElement('input');
						let typeInput = document.createElement('input');
						let falseInput = document.createElement('input');
						let trueInput = document.createElement('input');

						checkboxContainer.className = 'col-md-4 checkbox';
						nameInput.type = 'hidden';
						nameInput.name = `details[${sectionIndex}][subsections][${subsectionIndex}]inputs[${inputIndex}][label]`;
						nameInput.value = input.label;
						typeInput.type = 'hidden';
						typeInput.name = `details[${sectionIndex}][subsections][${subsectionIndex}]inputs[${inputIndex}][type]`;
						typeInput.value = 'checkbox';
						falseInput.type = 'hidden';
						falseInput.name = `details[${sectionIndex}][subsections][${subsectionIndex}]inputs[${inputIndex}][value]`;
						falseInput.value = '0';
						trueInput.type = 'checkbox';
						trueInput.name = `details[${sectionIndex}][subsections][${subsectionIndex}]inputs[${inputIndex}][value]`;
						trueInput.value = '1';
						trueInput.checked = (input.value == 1); // eslint-disable-line
						label.appendChild(nameInput);
						label.appendChild(typeInput);
						label.appendChild(falseInput);
						label.appendChild(trueInput);
						label.appendChild(document.createTextNode(input.label));
						checkboxContainer.appendChild(label);
						row.appendChild(checkboxContainer);
						break;
					}
				}
			});

			subsectionContainer.appendChild(row);
			panelBody.appendChild(subsectionContainer);
		});

		container.appendChild(panel);
	});

	return container;
}
