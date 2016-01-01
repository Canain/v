'use strict';
/// <reference path="../typings/tsd.d.ts" />

interface TwoVectorProcessFunction {
	(vec1: number[], vec2: number[]): number[];
}

interface TwoVectorNormFunction {
	(vec1: number[], vec2: number[]): number;
}

interface VectorScalarFunction {
	(vec: number[], scalar: number): number[];
}

interface VectorProcessFunction {
	(vec: number[]): number[];
}

interface VectorNormFunction {
	(vec: number[]): number;
}

interface VModule {
	version: string;
	
	multiply: VectorScalarFunction;
	divide: VectorScalarFunction;
	add: TwoVectorProcessFunction;
	subtract: TwoVectorProcessFunction;
	norm: VectorNormFunction;
	normalize: VectorProcessFunction;
	dot: TwoVectorNormFunction;
	
	/** m for multiply, alias of multiply */
	m?: VectorScalarFunction;
	/** d for divide, alias of divide */
	d?: VectorScalarFunction;
	/** a for add, alias of add */
	a?: TwoVectorProcessFunction;
	/** s for subtract, alias of subtract */
	s?: TwoVectorProcessFunction;
	/** n for norm, alias of norm */
	n?: VectorNormFunction;
	/** h for hat, alias of normalize */
	h?: VectorProcessFunction;
}

let V: VModule = {
	version: '1.0.0',
	multiply: function (vec: number[], scalar: number) {
		return vec.map((x) => {
			return x * scalar;
		});
	},
	divide: function (vec: number[], scalar: number) {
		return vec.map((x) => {
			return x / scalar;
		});
	},
	add: function (vec1: number[], vec2: number[]) {
		let result = [];
		for (let i = 0; i < vec1.length; i++) {
			result.push(vec1[i] + vec2[i]);
		}
		return result;
	},
	subtract: function (vec1: number[], vec2: number[]) {
		let result = [];
		for (let i = 0; i < vec1.length; i++) {
			result.push(vec1[i] - vec2[i]);
		}
		return result;
	},
	dot: function (vec1: number[], vec2: number[]) {
		let result = 0;
		for (let i = 0; i < vec1.length; i++) {
			result += vec1[i] * vec2[i];
		}
		return result;
	},
	norm: function (vec: number[]) {
		let result = 0;
		vec.forEach((x) => {
			result += x * x;
		});
		return Math.sqrt(result);
	},
	normalize: function (vec: number[]) {
		return this.divide(vec, this.norm(vec));
	}
}

V.m = V.multiply;
V.d = V.divide;
V.a = V.add;
V.s = V.subtract;
V.n = V.norm;
V.h = V.normalize;

module.exports = V;