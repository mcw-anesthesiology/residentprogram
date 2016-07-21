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

const chartColors = [
	'#FF6384',
    '#4BC0C0',
    '#FFCE56',
    '#E7E9ED',
    '#36A2EB'
];

export function generateCaseLogDetailsReportCharts(caseLogs, name, container, charts = {}){
	if(!caseLogs || caseLogs.length === 0)
		return;

	const report = generateCaseLogDetailsReport(caseLogs);

	let reportGroupNames = Object.keys(report);
	for(let section of container.children){
		if(!section.hasAttribute('data-report-group-name')
				|| !reportGroupNames.includes(section.getAttribute('data-report-group-name')))
			container.removeChild(section);
	}
	for(let chartName in charts){
		if(!reportGroupNames.includes(chartName)){
			charts[chartName].destroy();
			delete charts[chartName];
		}
	}

	for(let reportGroupName of reportGroupNames){

		let data = {
			datasets: [{
				label: name,
				data: [],
				backgroundColor: []
			}],
			labels: []
		};

		let canvas, numCasesTd, tbody;
		let reportGroupSection = container
			.querySelector(`section[data-report-group-name="${reportGroupName}"]`);
		if(reportGroupSection){
			numCasesTd = reportGroupSection.querySelector('table.num-cases-table td');
			tbody = reportGroupSection.querySelector('table.stats-table tbody');
		}
		else {
			reportGroupSection = document.createElement('section');
			let reportGroupTitle = document.createElement('h2');
			let canvasContainer = document.createElement('div');
			canvas = document.createElement('canvas');
			reportGroupSection.className = 'row';
			reportGroupSection.setAttribute('data-report-group-name', reportGroupName);
			reportGroupSection.appendChild(reportGroupTitle);
			reportGroupTitle.appendChild(document.createTextNode(reportGroupName.toUpperCase()));
			canvasContainer.className = 'col-md-8 case-log-report-chart-container';
			container.appendChild(reportGroupSection);
			reportGroupSection.appendChild(canvasContainer);
			canvasContainer.appendChild(canvas);

			let statsContainer = document.createElement('div');
			let numTable = document.createElement('table');
			let statsTable = document.createElement('table');
			let thead = document.createElement('thead');
			tbody = document.createElement('tbody');
			let tr = document.createElement('tr');
			let th = document.createElement('th');
			numCasesTd = document.createElement('td');
			statsContainer.className = 'col-md-4 case-log-report-stats-container';
			reportGroupSection.appendChild(statsContainer);
			numTable.className = 'table num-cases-table';
			statsContainer.appendChild(numTable);
			numTable.appendChild(tr);
			tr.appendChild(th);
			th.appendChild(document.createTextNode('Number of cases'));
			tr.appendChild(numCasesTd);

			tr = document.createElement('tr');
			th = document.createElement('th');
			statsTable.className = 'table table-striped table-bordered stats-table';
			statsContainer.appendChild(statsTable);
			statsTable.appendChild(thead);
			thead.appendChild(tr);
			tr.appendChild(th);
			statsTable.appendChild(tbody);
			th.appendChild(document.createTextNode('Response'));
			tr.appendChild(th);
			th = document.createElement('th');
			th.appendChild(document.createTextNode('Times selected'));
			tr.appendChild(th);
			th = document.createElement('th');
			th.appendChild(document.createTextNode('Percentage'));
			tr.appendChild(th);
		}


		while(tbody.firstChild)
			tbody.removeChild(tbody.firstChild);

		let numCases = report[reportGroupName].numCases;
		while(numCasesTd.firstChild)
			numCasesTd.removeChild(numCasesTd.firstChild);
		numCasesTd.appendChild(document.createTextNode(numCases));
		let responses = Object.keys(report[reportGroupName].responseCounts[name]).sort();
		for(let response of responses){
			let count = report[reportGroupName].responseCounts[name][response];
			let percentage = Math.round((count/numCases) * 100);
			data.datasets[0].data.push(count);
			data.datasets[0].backgroundColor
			.push(chartColors[data.datasets[0].data.length - 1]);
			data.labels.push(response);

			let tr = document.createElement('tr');
			let th = document.createElement('th');
			let selectedTd = document.createElement('td');
			let percentageTd = document.createElement('td');

			th.appendChild(document.createTextNode(response));
			selectedTd.appendChild(document.createTextNode(count));
			percentageTd.appendChild(document.createTextNode(`${percentage}%`));

			tr.appendChild(th);
			tr.appendChild(selectedTd);
			tr.appendChild(percentageTd);
			tbody.appendChild(tr);
		}

		if(charts[reportGroupName]){
			charts[reportGroupName].data.datasets = data.datasets;
			charts[reportGroupName].data.labels = data.labels;
			charts[reportGroupName].update();
		}
		else {
			charts[reportGroupName] = new Chart(canvas, {
				data: data,
				type: 'polarArea',
				options: {
					scale: {
						ticks: {
							stepSize: 1
						}
					}
				}
			});
		}
	}

	return charts;
}
