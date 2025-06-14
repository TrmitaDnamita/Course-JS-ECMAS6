const STATUS = {
	1: "on-wait",
	2: "on-pause",
	3: "complete"
}

document.addEventListener("DOMContentLoaded", () => {
	const card = document.getElementsByClassName("todo-card");
	for (let i = 0; i < card.length; i++) {
		let random = Math.floor((Math.random() * 3));
		card[i].setAttribute("data-status", STATUS[random]);
	}
});