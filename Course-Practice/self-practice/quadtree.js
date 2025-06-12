class Quadtree {
	/** Quadtree constructor
	 * 
	 * @param {Vector4} boundBox any object that contains an x, y, z and w property
	 * @param {number} capacity 
	 * @param {Quadtree} children
	 */
	constructor(boundBox, capacity) {
		this.boundBox = boundBox;
		this.capacity = capacity;
		this.children = undefined;
		this.entities = [];
		this.divided = false;
	}
	
	generateEntity(width, height) {
		this.entities.push(
			new Vector2(
				Math.floor(Math.random() * width), 
				Math.floor(Math.random() * height)
			)
		);
		
		if (this.capacity === this.entities.length) {
			this.subdivide();
		}
	}
	
	subdivide() {
		let box = new Vector4 (
			this.boundBox.x,
			this.boundBox.y,
			this.boundBox.z / 2,
			this.boundBox.w / 2
		);
		
		this.children = [];
		for(let i = 0; i < QUAD; i++) {
			this.children.push(new Quadtree(box, this.capacity));
		}
		console.error("Where are my Entities??, I need to subdivide!");
		this.divided = true;
	}
	
	updateChildren() {
		
	}
}

const QUAD_CAPACITY = 10;
let quadTree = undefined;

function generateQT(width, height) {
	quadTree = 
		new Quadtree(
			new Vector4(0, 0, width, height), 
			QUAD_CAPACITY
		);
	document.getElementById("qtButton").innerHTML = "Generate Random Entities";
}
/**@param {CanvasRenderingContext2D} ctx @param {Quadtree} section*/
function updateQT(section, ctx) {
	if (section === undefined) return;
	
	if (section.divided) {
		updateQT(section.children[Cardinality.NORTH_EAST], ctx);
		updateQT(section.children[Cardinality.NORTH_WEST], ctx);
		updateQT(section.children[Cardinality.SOUTH_EAST], ctx);
		updateQT(section.children[Cardinality.SOUTH_WEST], ctx);
	}
	
	section.entities.forEach(
		(entity) => drawEntity(entity, ctx)
	);
	drawQT(section.boundBox.z, section.boundBox.w, ctx);
}

function drawQT(child_width, child_height, ctx) {
	ctx.beginPath();
	ctx.rect(0, 0, child_width, child_height);
	ctx.lineWidth = 1
	ctx.stroke();
	ctx.closePath();
}

function drawEntity(entity, ctx) {
	ctx.beginPath();
	ctx.arc(entity.x, entity.y, 5, 0, TAU, false);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
}

function generateContent() {
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");
	
	if (quadTree === undefined) { 
		drawQT(canvas.width, canvas.height, ctx);
		generateQT(canvas.width, canvas.height); 
	}else {
		quadTree.generateEntity(canvas.width, canvas.height);
	}
	
	updateQT(quadTree, ctx);
}

