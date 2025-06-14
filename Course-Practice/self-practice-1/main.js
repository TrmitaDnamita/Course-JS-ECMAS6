let quadTree = undefined;

/**Generate Quadtree for the first time
 * 
 * @param {number} width 
 * @param {number} height
 */
function generateQT(width, height) {
	quadTree = new Quadtree( new BoxBoundary(0, 0, width, height) );
	document.getElementById("qtButton").innerHTML = "Generate Random Entities";
}
/**Recursively generate random entities that fit the quadtree dimensions */
function generateEntity() {
	let entity = new Vector2(
		floor(random() * CANVAS_SIZE.WIDTH), 
		floor(random() * CANVAS_SIZE.HEIGHT)
	);
	
	return (entity.x === 0 || entity.y === 0)
    ? generateEntity()
    : entity;
}
/**
 * @param {number} amount 
 * @returns [] */
function generateEntities(amount) {
	let entities = [];
	for (let i = 0; i < amount; i++)
		entities.push(generateEntity());
	return entities;
}

/**Update Quadtree
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Quadtree} quad
 * */
function updateQT(quad, ctx) {
	if (quad === undefined) return;
	
	if (quad.isDivided) {
		updateQT(quad.children[Cardinality.NORTH_WEST], ctx);
		updateQT(quad.children[Cardinality.NORTH_EAST], ctx);
		updateQT(quad.children[Cardinality.SOUTH_EAST], ctx);
		updateQT(quad.children[Cardinality.SOUTH_WEST], ctx);
		return;
	}
	
	if (quad.entities != undefined) {
		quad.entities.forEach(
			(entity) => drawEntity(entity, ctx)
		);
	}
	
	drawQT(quad.boundBox, ctx);
}

function generateContent() {
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");
	
	
	if (quadTree === undefined) { 
		drawQT(new BoxBoundary(0,0,CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT), ctx);
		generateQT(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT); 
	}else {
		quadTree.pushEntity(generateEntity());
	}
	
	clearCanvas(ctx);
	updateQT(quadTree, ctx);
	console.log("------------------------------------");
	console.log(quadTree);
}
/**@param {BoxBoundary} boundBox @param {CanvasRenderingContext2D} ctx */
function drawQT(boundBox, ctx) {
	ctx.beginPath();
	ctx.moveTo(boundBox.x, boundBox.y);
	ctx.lineTo(boundBox.z, boundBox.y);
	ctx.lineTo(boundBox.z, boundBox.w);
	ctx.lineTo(boundBox.x, boundBox.w);
	ctx.lineTo(boundBox.x, boundBox.y);
	ctx.lineWidth = 1
	ctx.stroke();
	ctx.closePath();
}

function drawEntity(entity, ctx) {
	ctx.beginPath();
	ctx.arc(entity.x, entity.y, 3, 0, TAU, false);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
}

function clearCanvas(ctx) {
	ctx.clearRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
}