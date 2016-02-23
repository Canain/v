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
				return v + b[i];
			});
		}
		sub(a: number[], b: number | number[]) {
			if (typeof b === 'number') {
				return a.map(v => {
					return v - b;
				});
			}
			return a.map((v, i) => {
				return v - b[i];
			});
		}
		mult(a: number[], b: number | number[]) {
			if (typeof b === 'number') {
				return a.map(v => {
					return v * b;
				});
			}
			return a.map((v, i) => {
				return v * b[i];
			});
		}
		div(a: number[], b: number | number[]) {
			if (typeof b === 'number') {
				return a.map(v => {
					return v / b;
				});
			}
			return a.map((v, i) => {
				return v / b[i];
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
	}
	
	const V = (() => {
		const VM = new VectorManipulateInstance();
		
		const V = <VectorManipulate>((a: number[]) => {
			return new Vector(a);
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
		
		constructor(a: number[]) {
			super();
			
			const array = <Vector>a.slice();
			
			Object.defineProperties(array, VectorProperties);
			
			return array;
		}
		
		add(b: number | number[]) {
			return new Vector(V.add(this, b));
		}
		
		sub(b: number | number[]) {
			return new Vector(V.sub(this, b));
		}
		
		mult(b: number | number[]) {
			return new Vector(V.mult(this, b));
		}
		
		div(b: number | number[]) {
			return new Vector(V.div(this, b));
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