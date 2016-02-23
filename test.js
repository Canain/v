/// <reference path="src/v.ts" />
'use strict';

const V = require('./dist/v');

console.log(`V.add([1, 2], [3, 4]) === ${V.add([1, 2], [3, 4])} == [4, 6]`);
console.log(`V([1, 2]).add([3, 4]) === ${V([1, 2]).add([3, 4])} == [4, 6]`);
console.log(`V.version === ${V.version}`);
