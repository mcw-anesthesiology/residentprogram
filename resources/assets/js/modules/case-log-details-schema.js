import Chart from 'chart.js';
import { Validator } from 'jsonschema';
const v = new Validator();
import schema from '../../schemas/case-log-details.json';

export function caseLogDetailsSchemaIsValid(detailsSchema){
	return v.validate(detailsSchema, schema).valid;
}

export function renderCaseLogDetailsSchema(schema, responses, container = document.createElement('section')){
	schema.forEach(section => {
		let panel = document.createElement('section');
		let panelBody = document.createElement('div');

		panel.className = 'panel panel-default';

		if(section.title){
			let panelHeading = document.createElement('div');
			let panelTitle = document.createElement('h4');

			panelHeading.className = 'panel-heading';
			panelTitle.className = 'panel-title';
			panelTitle.appendChild(document.createTextNode(section.title));
			panelHeading.appendChild(panelTitle);
			panel.appendChild(panelHeading);
		}

		panelBody.className = 'panel-body';
		panel.appendChild(panelBody);

		section.subsections.forEach(subsection => {
			let subsectionContainer = document.createElement('section');
			let row = document.createElement('div');
			row.className = 'row';
			if(subsection.title){
				let subsectionHeading = document.createElement('h5');
				subsectionHeading.className = 'sub-header';
				subsectionHeading.appendChild(document.createTextNode(subsection.title));
				subsectionContainer.appendChild(subsectionHeading);
			}

			subsection.inputs.forEach(input => {
				renderInput(input, subsection.name, row);
			});

			subsectionContainer.appendChild(row);
			panelBody.appendChild(subsectionContainer);
		});

		container.appendChild(panel);
	});

	return container;

	function renderInput(input, name, container){
		switch(input.type){
			case 'checkbox': {
				let checkboxContainer = document.createElement('div');
				let label = document.createElement('label');
				let checkbox = document.createElement('input');

				checkboxContainer.className = 'col-md-4 checkbox';
				checkbox.type = 'checkbox';
				checkbox.name = `details[${name}][]`;
				checkbox.value = input.value || input.label;
				if(responses && responses[name] && responses[name].includes(checkbox.value))
					checkbox.checked = true;
				if(responses)
					checkbox.readonly = true;
				label.appendChild(checkbox);
				label.appendChild(document.createTextNode(input.label));
				checkboxContainer.appendChild(label);

				container.appendChild(checkboxContainer);
				break;
			}
		}
	}
}


export function generateCaseLogDetailsReport(caseLogs){
	let report = {};
	caseLogs.forEach(caseLog => {
		if(!report.hasOwnProperty(caseLog.details_schema.details_type))
			report[caseLog.details_schema.details_type] = {
				numCases: 0,
				responseCounts: {}
			};
		let detailsReport = report[caseLog.details_schema.details_type];
		detailsReport.numCases++;

		for(let name in caseLog.details){
			if(!detailsReport.responseCounts[name])
				detailsReport.responseCounts[name] = {};
			caseLog.details[name].forEach(response => {
				if(!detailsReport.responseCounts[name][response])
					detailsReport.responseCounts[name][response] = 0;
				detailsReport.responseCounts[name][response]++;
			});
		}
	});
	return report;
}

export function generateCaseLogDetailsReportCharts(report, container = document.createElement('section')){
	let name = 'Anesthesia / Analgesia Type';
	let data = {
		datasets: [{
			data: [],
			label: name
		}],
		labels: []
	};
	console.log(data);
	for(let response in report.raaps.responseCounts[name]){
		let count = report.raaps.responseCounts[name][response];
		data.datasets[0].data.push(count);
		data.labels.push(response);
	}
	let canvas = document.createElement('canvas');
	container.appendChild(canvas);
	new Chart(canvas, {
		data: data,
		type: 'polarArea',
		options: {
			scale: {
				ticks: {
					stepSize: 0.25
				}
			}
		}
	});
}
