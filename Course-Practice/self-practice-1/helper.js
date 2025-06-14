const Cardinality = {
	NORTH_WEST: 0,
	NORTH_EAST: 1,
	SOUTH_EAST: 2,
	SOUTH_WEST: 3,
};

const CANVAS_SIZE = {
	WIDTH: 600,
	HEIGHT: 600
};

const QUAD = 4;
const QUAD_CAPACITY = 10;

const floor = Math.floor;
const random = Math.random;
const TAU = 2 * Math.PI;

document.addEventListener("DOMContentLoaded", function () {
	if (document.getElementById("myCanvas") === null) {
		const body = document.body;
		
		// Add the canvas
		let innerBody = body.innerHTML;
		body.innerHTML = `
			<canvas id="myCanvas" width="${CANVAS_SIZE.WIDTH}" height="${CANVAS_SIZE.HEIGHT}"></canvas>
			${innerBody}
		`;
	}
});
