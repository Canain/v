'use strict';
let V = {
    version: '1.0.0',
    multiply: function (vec, scalar) {
        return vec.map((x) => {
            return x * scalar;
        });
    },
    divide: function (vec, scalar) {
        return vec.map((x) => {
            return x / scalar;
        });
    },
    add: function (vec1, vec2) {
        let result = [];
        for (let i = 0; i < vec1.length; i++) {
            result.push(vec1[i] + vec2[i]);
        }
        return result;
    },
    subtract: function (vec1, vec2) {
        let result = [];
        for (let i = 0; i < vec1.length; i++) {
            result.push(vec1[i] - vec2[i]);
        }
        return result;
    },
    dot: function (vec1, vec2) {
        let result = 0;
        for (let i = 0; i < vec1.length; i++) {
            result += vec1[i] * vec2[i];
        }
        return result;
    },
    norm: function (vec) {
        let result = 0;
        vec.forEach((x) => {
            result += x * x;
        });
        return Math.sqrt(result);
    },
    normalize: function (vec) {
        return this.divide(vec, this.norm(vec));
    }
};
V.m = V.multiply;
V.d = V.divide;
V.a = V.add;
V.s = V.subtract;
V.n = V.norm;
V.h = V.normalize;
module.exports = V;
