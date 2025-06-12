const Cardinality = {
	NORTH_WEST: 0,
	NORTH_EAST: 1,
	SOUTH_EAST: 2,
	SOUTH_WEST: 3
};

const QUAD = 4;
const CANVAS_SIZE = [600, 600];
const TAU = Math.PI * 2;

class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
/** A 4D vector, from (x,y) to (z,w) */
class Vector4 {
	constructor(x, y, z, w) {
		this.x = x;
		this.y = y;
		this.w = z;
		this.h = w;
	}
	/**Returns the numbers as an array of size 4*/
	get values() {
		return [this.x, this.y, this.z, this.w];
	}
	
	get size() {
		return 4;
	}
	
	/**
	 * Checks if a given 2D point is within the bounds of this vector's rectangular area.
	 * 
	 * @param {Vector2} position2D - The 2D point to check.
	 * @param {number} position2D.x - The x-coordinate of the point.
	 * @param {number} position2D.y - The y-coordinate of the point.
	 * @returns {boolean} True if the point is within the bounds, false otherwise.
	 */
	Has(position2D) {
		return (
			position2D.x >= this.x && 
			position2D.x < this.z && 
			position2D.y >= this.y && 
			position2D.y < this.w
		);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	if (document.getElementById("myCanvas") === null) {
		const body = document.body;
		
		// Add the canvas
		let innerBody = body.innerHTML;
		body.innerHTML = `
			<canvas id="myCanvas" width="${CANVAS_SIZE[0]}" height="${CANVAS_SIZE[1]}"></canvas>
			${innerBody}
		`;
	}
});
