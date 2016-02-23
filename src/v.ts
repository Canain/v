/// <reference path="../typings/main.d.ts" />
'use strict';

const V = (() => {
	class VectorManipulate {
		
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
	
	interface VectorManipulate {
		(a: number[]): Vector;
	}
	
	const V = (() => {
		const VM = new VectorManipulate();
		
		const V = <VectorManipulate>((a: number[]) => {
			return new Vector(a);
		});
		
		Object.getOwnPropertyNames(VM).forEach(name => {
			V[name] = VM[name];
		});
		
		Object.getOwnPropertyNames(VectorManipulate.prototype).forEach(name => {
			if (name !== 'constructor') {
				Object.defineProperty(V, name, Object.getOwnPropertyDescriptor(VectorManipulate.prototype, name));
			}
		});
		
		return V;
	})();
	
	const setPrototypeOf = Object.setPrototypeOf || ((obj, proto) => {
		obj.__proto__ = proto;
	});
	
	class Vector extends Array<number> {
		
		constructor(a: number[]) {
			super();
			
			const array = <Vector>a.slice();
			
			setPrototypeOf(array, Vector.prototype);
			
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
	
	return V;
})();

module.exports = V;