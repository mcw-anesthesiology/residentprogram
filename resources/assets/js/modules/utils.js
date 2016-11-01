import 'whatwg-fetch';

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
