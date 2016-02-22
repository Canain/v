/// <reference path="../typings/main.d.ts" />
'use strict';

const V = (() => {
	class VectorManipulate {
		addMultiple(a: number[], b: number[]) {
			return a.map((v, i) => {
				return v + b[i];
			});
		}
		subMultiple(a: number[], b: number[]) {
			return a.map((v, i) => {
				return v - b[i];
			});
		}
		addSingle(a: number[], b: number) {
			return a.map(v => {
				return v + b;
			});
		}
		subSingle(a: number[], b: number) {
			return a.map(v => {
				return v - b;
			});
		}
		multSingle(a: number[], b: number) {
			return a.map(v => {
				return v * b;
			});
		}
		divSingle(a: number[], b: number) {
			return a.map(v => {
				return v / b;
			});
		}
		multMultiple(a: number[], b: number[]) {
			return a.map((v, i) => {
				return v * b[i];
			});
		}
		divMultiple(a: number[], b: number[]) {
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
			super(a.length);
			for (let i = 0; i < a.length; i++) {
				this[i] = a[i];
			}
		}
		
		add(b: number | number[]) {
			if (typeof b === 'number') {
				return new Vector(VM.addSingle(this, b));
			}
			return new Vector(VM.addMultiple(this, <number[]>b));
		}
		
		sub(b: number | number[]) {
			if (typeof b === 'number') {
				return new Vector(VM.subSingle(this, b));
			}
			return new Vector(VM.subMultiple(this, <number[]>b));
		}
		
		mult(b: number | number[]) {
			if (typeof b === 'number') {
				return new Vector(VM.multSingle(this, b));
			}
			return new Vector(VM.multMultiple(this, <number[]>b));
		}
		
		div(b: number | number[]) {
			if (typeof b === 'number') {
				return new Vector(VM.divSingle(this, b));
			}
			return new Vector(VM.divMultiple(this, <number[]>b));
		}
		
		floor() {
			return new Vector(VM.floor(this));
		}
		
		set(b: { x?: number; y?: number; z?: number; }) {
			VM.set(this, b);
			
			return this;
		}
		
	}
	
	return (a: number[]) => {
		return new Vector(a);
	};
})();

module.exports = V;