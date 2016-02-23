/// <reference path="../typings/main.d.ts" />
'use strict';

const V = (() => {
	class VectorManipulateInstance {
		
		version: string;
		
		constructor() {
			this.version = '1.0.0';
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
		floor(a: number[]) {
			return a.map(v => {
				return Math.floor(v);
			});
		}
		set(a: number[], b: { x: number; y: number; }) {
			b.x = a[0];
			b.y = a[1];
		}
	}
	
	interface VectorManipulate extends VectorManipulateInstance {
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
	
	class Vector extends Array<number> {
		
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
		
		floor() {
			return new Vector(V.floor(this));
		}
		
		set(b: { x: number; y: number; }) {
			V.set(this, b);
			
			return this;
		}
	}
	
	Object.getOwnPropertyNames(Vector.prototype).forEach(property => {
		if (property !== 'constructor') {
			const descriptor = Object.getOwnPropertyDescriptor(Vector.prototype, property);
			
			descriptor.enumerable = false;
			
			VectorProperties[property] = descriptor;
		}
	});
	
	
	return V;
})();

module.exports = V;