export function appendAlert(alertText, parent = '#alert-container', alertType = 'danger', dismissable = true){
	let alert = document.createElement("div");
	alert.className = "alert alert-" + alertType;
	alert.role = "alert";

	if(dismissable){
		alert.className += " alert-dismissable";
		let close = document.createElement("button");
		close.type = "button";
		close.className = "close";
		close.setAttribute("data-dismiss", "alert");
		close.setAttribute("aria-label", "Close");

		let innerClose = document.createElement("span");
		innerClose.setAttribute("aria-hidden", "true");
		innerClose.innerHTML = "&times;";
		close.appendChild(innerClose);

		alert.appendChild(close);
	}

	alert.insertAdjacentHTML("beforeend", alertText);

	$(parent).append(alert);
}

export function ucfirst(str){
	return str.charAt(0).toUpperCase() + str.substring(1);
}

export function camelCaseToWords(str){
	let result = '';
	for(let char of str){
		if(result === ''){
			result += char.toUpperCase();
		}
		else if(char === char.toUpperCase()){
			result += ' ' + char.toLowerCase();
		}
		else {
			result += char;
		}
	}
	return result;
}

export function nl2br(text){
	return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
}

export function fetchMilestoneGroups(){
	return fetch('/milestones', { credentials: 'same-origin' }).then(response => {
		if(response.ok)
			return response.json();
		else {
			let err = new Error(response.statusText);
			err.response = response;
			throw err;
		}
	}).then(milestones => {
		let milestoneGroups = {};
		for(let milestone of milestones){
			let groupTitle = ucfirst(milestone.type);
			if(milestone.training_level)
				groupTitle += ` — ${milestone.training_level}`;
			if(!milestoneGroups[groupTitle])
				milestoneGroups[groupTitle] = {
					text: groupTitle,
					children: []
				};
			milestoneGroups[groupTitle].children.push({
				id: milestone.id.toString(),
				text: milestone.title
			});
		}
		for(let groupTitle in milestoneGroups){
			let milestoneGroup = milestoneGroups[groupTitle];
			milestoneGroup.children.sort((a, b) => {
				if(a.text < b.text)
					return 1;
				else if(a.text > b.text)
					return -1;
				else
					return 0;
			});
		}
		return Object.values(milestoneGroups);
	});
}

export function fetchUserGroups(){
	const csrfToken = document.querySelector('meta[name="csrf-token"]')
		.getAttribute('content');

	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('X-Requested-With', 'XMLHttpRequest');
	headers.append('X-CSRF-TOKEN', csrfToken);

	let groups = {
		intern: {
			text: 'Intern',
			children: []
		},
		'ca-1': {
			text: 'CA-1',
			children: []
		},
		'ca-2': {
			text: 'CA-2',
			children: []
		},
		'ca-3': {
			text: 'CA-3',
			children: []
		},
		fellow: {
			text: 'Fellow',
			children: []
		},
		faculty: {
			text: 'Faculty',
			children: []
		}
	};

	return fetch('/users', {
		method: 'GET',
		headers: headers,
		credentials: 'same-origin'
	}).then(response => response.json())
	.then(users => {
		users.map(user => {
			let select2Obj = {
				id: user.id,
				text: user.full_name
			};

			if(user.type){
				if(user.type === 'resident' && user.training_level
						&& groups[user.training_level]){

					groups[user.training_level].children.push(select2Obj);
				}
				else if(groups[user.type]){
					groups[user.type].children.push(select2Obj);
				}
			}
		});

		let userGroups = Object.values(groups);
		userGroups.map(group => {
			group.children.sort(sortSelect2Objects);
		});

		return userGroups;
	});
}

export function fetchFormGroups(){
	const csrfToken = document.querySelector('meta[name="csrf-token"]')
		.getAttribute('content');

	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('X-Requested-With', 'XMLHttpRequest');
	headers.append('X-CSRF-TOKEN', csrfToken);

	let groups = {};

	return fetch('/forms', {
		method: 'GET',
		headers: headers,
		credentials: 'same-origin'
	}).then(response => response.json())
	.then(forms => {
		forms.map(form => {
			if(form.type){
				if(!groups[form.type]){
					groups[form.type] = {
						text: ucfirst(form.type),
						children: []
					};
				}

				groups[form.type].children.push({
					id: form.id,
					text: form.title
				});
			}
		});

		let formGroups = Object.values(groups);
		formGroups.map(group => {
			group.children.sort(sortSelect2Objects);
		});

		return formGroups;
	});
}

function sortSelect2Objects(a, b){
	if(a.text < b.text)
		return -1;
	if(a.text > b.text)
		return 1;

	return 0;
}
