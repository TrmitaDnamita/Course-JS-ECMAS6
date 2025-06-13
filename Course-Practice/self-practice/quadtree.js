/** A 2D vector @param {number} x @param {number} y */
class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
/** A 4D vector (Or Rectangle) with x, y, z and w and box width and height @param {number} x @param {number} y @param {number} width @param {number} height */
class BoxBoundary {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.z = x + width;
		this.w = y + height;
		this.width = width;
		this.height = height;
	}
	/** Check if the entity is in the boundary @param {Vector2} entity */
	contains(entity) {
		return entity.x >= this.x && entity.x < this.z && entity.y >= this.y && entity.y < this.w;
	}
}

class Quadtree {
	/** Quadtree constructor @param {BoxBoundary} boundBox any object that contains an x, y, z and w property */
	constructor(boundBox) {
		this.boundBox = boundBox;
		this.children = undefined;
		this.entities = undefined;
		this.isDivided = false;
	}
	
	/**
	 * Subdivide the quadtree into 4 children
	 */
	subdivide() {
		const x = this.boundBox.x;
		const y = this.boundBox.y;
		const width = this.boundBox.width / 2;
		const height = this.boundBox.height / 2;
		
		this.children = [];
		
		this.children[Cardinality.NORTH_WEST] = new Quadtree(
			new BoxBoundary(
				x, y,
				width, height
			)
		);
		this.children[Cardinality.NORTH_EAST] = new Quadtree(
			new BoxBoundary(
				x + width, y,
				width, height
			)
		);
		this.children[Cardinality.SOUTH_EAST] = new Quadtree(
			new BoxBoundary(
				x + width, y + height,
				width, height
			)
		);
		this.children[Cardinality.SOUTH_WEST] = new Quadtree(
			new BoxBoundary(
				x, y + height,
				width, height
			)
		);
		
		this.isDivided = true;
	}
	
	/**Push the new entity to the quadtree, check if it needs to be subdivided or sent to a child 
	 * @param {Vector2} entity
	*/
	pushEntity(entity) {
		if (!this.boundBox.contains(entity)) return;
		
		if (this.isDivided) {
			this.children[Cardinality.NORTH_WEST].pushEntity(entity);
			this.children[Cardinality.NORTH_EAST].pushEntity(entity);
			this.children[Cardinality.SOUTH_EAST].pushEntity(entity);
			this.children[Cardinality.SOUTH_WEST].pushEntity(entity);
			return;
		}
		
		if (this.entities === undefined) { this.entities = []; }
		else if (this.entities.length >= QUAD_CAPACITY) {
			this.subdivide();
			//We push the entity to this.entities and then push it to the children
			this.entities.push(entity)
			this.pushEntities(this.entities);
			this.entities = undefined;
			return;
		}
		
		this.entities.push(entity);
	}
	
	/**Push and array of entities alocated in the old undivided quad, then push them to the children 
	 * @param {Vector2[]} entities
	*/
	pushEntities(entities) {
		entities.forEach(entity => {
			this.children[Cardinality.NORTH_WEST].pushEntity(entity);
			this.children[Cardinality.NORTH_EAST].pushEntity(entity);
			this.children[Cardinality.SOUTH_EAST].pushEntity(entity);
			this.children[Cardinality.SOUTH_WEST].pushEntity(entity);
		});
	}
}