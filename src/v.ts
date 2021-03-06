'use strict';

if (typeof exports === 'undefined') {
	var exports: any = {}
}

export class VectorManipulateInstance {
	
	version: string;
	
	constructor() {
		this.version = '1.0.3';
	}
	
	add(a: number[], b: number | number[]) {
		if (typeof b === 'number') {
			return a.map(v => {
				return v + b;
			});
		}
		return a.map((v, i) => {
			return v + (<number[]>b)[i];
		});
	}
	sub(a: number[], b: number | number[]) {
		if (typeof b === 'number') {
			return a.map(v => {
				return v - b;
			});
		}
		return a.map((v, i) => {
			return v - (<number[]>b)[i];
		});
	}
	mult(a: number[], b: number | number[]) {
		if (typeof b === 'number') {
			return a.map(v => {
				return v * b;
			});
		}
		return a.map((v, i) => {
			return v * (<number[]>b)[i];
		});
	}
	div(a: number[], b: number | number[]) {
		if (typeof b === 'number') {
			return a.map(v => {
				return v / b;
			});
		}
		return a.map((v, i) => {
			return v / (<number[]>b)[i];
		});
	}
	
	limit(a: number[], b: number | number[]) {
		if (typeof b === 'number') {
			return a.map(v => {
				return Math.min(v, b);
			});
		}
		return a.map((v, i) => {
			return Math.min(v, (<number[]>b)[i]);
		});
	}
	
	floor(a: number[]) {
		return a.map(v => {
			return Math.floor(v);
		});
	}
	set(a: number[], b: { x: number; y: number; }) {
		b.x = a[0];
		b.y = a[1];
	}
	setWidthHeight(a: number[], b: { width: number; height: number; }) {
		b.width = a[0];
		b.height = a[1];
	}
	sum(a: number[]) {
		return a.reduce((p, v) => {
			return p + v;
		});
	}
	dot(a: number[], b: number[]) {
		return this.sum(this.mult(a, b));
	}
	norm(a: number[]) {
		return Math.sqrt(this.dot(a, a));
	}
	normalize(a: number[]) {
		return this.div(a, this.norm(a));
	}
	randomNumber(max: number, min?: number) {
		if (typeof min === 'number') {
			return (max - min) * Math.random() + min;
		}
		return max * Math.random();
	}
	random(length: number, max: number, min?: number) {
		const ran: number[] = [];
		for (let i = 0; i < length; i++) {
			ran.push(this.randomNumber(max, min));
		}
		return ran;
	}
	randomize(max: number[], min?: number | number[]) {
		if (typeof min === 'undefined') {
			return max.map(v => {
				return this.randomNumber(v);
			});
		}
		if (typeof min === 'number') {
			return max.map(v => {
				return this.randomNumber(v, min);
			});
		}
		return max.map((v, i) => {
			return this.randomNumber(v, (<number[]>min)[i]);
		});
	}
}

export interface VectorManipulate extends VectorManipulateInstance {
	(a: number[]): Vector;
	(...a: number[]): Vector;
}

const V = (() => {
	const VM = new VectorManipulateInstance();
	
	const V = <VectorManipulate>(function () {
		if (typeof arguments[0] === 'number') {
			return new Vector(Array.prototype.slice.call(arguments));
		};
		return new Vector(arguments[0]);
	});
	
	Object.getOwnPropertyNames(VM).forEach(property => {
		Object.defineProperty(V, property, Object.getOwnPropertyDescriptor(VM, property));
	});
	
	Object.getOwnPropertyNames(VectorManipulateInstance.prototype).forEach(property => {
		if (property !== 'constructor') {
			Object.defineProperty(V, property, Object.getOwnPropertyDescriptor(VectorManipulateInstance.prototype, property));
		}
	});
	
	return V;
})();

const VectorProperties: PropertyDescriptorMap = {};

export class Vector extends Array<number> {
	
	constructor(a: number[]);
	constructor(...a: number[]);
	constructor() {
		super();
		
		const array: Vector = typeof arguments[0] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0];
		
		Object.defineProperties(array, VectorProperties);
		
		return array;
	}
	
	add(b: number): Vector;
	add(b: number[]): Vector;
	add(...b: number[]): Vector;
	add() {
		return new Vector(V.add(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
	}
	
	sub(b: number): Vector;
	sub(b: number[]): Vector;
	sub(...b: number[]): Vector;
	sub() {
		return new Vector(V.sub(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
	}
	
	mult(b: number): Vector;
	mult(b: number[]): Vector;
	mult(...b: number[]): Vector;
	mult() {
		return new Vector(V.mult(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
	}
	
	div(b: number): Vector;
	div(b: number[]): Vector;
	div(...b: number[]): Vector;
	div() {
		return new Vector(V.div(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
	}
	
	limit(b: number): Vector;
	limit(b: number[]): Vector;
	limit(...b: number[]): Vector;
	limit() {
		return new Vector(V.limit(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
	}
	
	floor() {
		return new Vector(V.floor(this));
	}
	
	set(b: { x: number; y: number; }) {
		V.set(this, b);
		
		return this;
	}
	
	setWidthHeight(b: { width: number; height: number; }) {
		V.setWidthHeight(this, b);
		return this;
	}
	
	randomize(min: number): Vector;
	randomize(min: number[]): Vector;
	randomize(...min: number[]): Vector;
	randomize() {
		return new Vector(V.randomize(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
	}
	
	sum() {
		return V.sum(this);;
	}
	
	norm() {
		return V.norm(this);
	}
	
	normalize() {
		return new Vector(V.normalize(this));
	}
	
	dot(b: number[]) {
		return V.dot(this, b);
	}
}

Object.getOwnPropertyNames(Vector.prototype).forEach(property => {
	if (property !== 'constructor') {
		const descriptor = Object.getOwnPropertyDescriptor(Vector.prototype, property);
		
		descriptor.enumerable = false;
		
		VectorProperties[property] = descriptor;
	}
});

export default V;

if (typeof module !== 'undefined') {
	module.exports = V;
	Object.keys(exports).forEach(value => {
		module.exports[value] = exports[value];
	});
}
