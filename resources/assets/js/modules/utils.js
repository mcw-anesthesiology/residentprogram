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
