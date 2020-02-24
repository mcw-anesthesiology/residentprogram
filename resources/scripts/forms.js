const fs = require('fs');

const { data: { forms } } = JSON.parse(fs.readFileSync(process.stdin.fd));

for (const form of forms) {
	if (!form.scenarios.length) continue;

	console.log('##', form.title, '\n');

	console.log('### Scenarios', '\n');
	for (const scenario of form.scenarios) {
		console.log('####', scenario.title, '\n');
		console.log(scenario.text, '\n');

		for (const option of scenario.options) {
			console.log('1. ', option.text);
		}
		console.log('\n');
	}
	console.log('\n');

	console.log('### Competencies:', '\n');
	for (const competency of get(form.competencies)) {
		console.log('- ', competency.title);
	}
	console.log('\n');

	console.log('### Milestones:', '\n');
	for (const milestone of get(form.milestones)) {
		console.log('- ', milestone.title);
	}
	console.log('\n');
}

function get(items) {
	return sorted(getUnique(items));
}

function getUnique(items) {
	return Array.from(new Map(items.map(item => ([
		item.id,
		item
	]))).values());
}

function sorted(items) {
	items.sort((a, b) => {
		if (a.title < b.title)
			return -1;
		if (a.title > b.title)
			return 1;
		return 0;
	});
	return items;
}
