/// <reference path="../typings/main.d.ts" />
'use strict';

const V = (() => {
	class VectorManipulate {
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
		set(a: number[], b: { x?: number; y?: number; z?: number; }) {
			if (typeof b.x === 'number') {
				b.x = a[0];
			}
			if (typeof b.y === 'number') {
				b.y = a[1];
			}
			if (typeof b.z === 'number') {
				b.z = a[2];
			}
		}
	}
	
	const VM = new VectorManipulate();
	
	class Vector extends Array<number> {
		
		constructor(a: number[]) {
			super();
			const arr = a.slice();
			arr['__proto__'] = Vector.prototype;
			return <Vector>arr;
		}
		
		add(b: number | number[]) {
			return new Vector(VM.add(this, b));
		}
		
		sub(b: number | number[]) {
			return new Vector(VM.sub(this, b));
		}
		
		mult(b: number | number[]) {
			return new Vector(VM.mult(this, b));
		}
		
		div(b: number | number[]) {
			return new Vector(VM.div(this, b));
		}
		
		floor() {
			return new Vector(VM.floor(this));
		}
		
		set(b: { x?: number; y?: number; z?: number; }) {
			VM.set(this, b);
			
			return this;
		}
		
	}
	
	interface V {
		(a: number[]): Vector;
		VM?: VectorManipulate;
	}
	
	const V: V = a => {
		return new Vector(a);
	};
	
	V.VM = VM;
	
	return V;
})();

module.exports = V;