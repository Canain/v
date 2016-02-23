'use strict';
const V = (() => {
    class VectorManipulate {
        constructor() {
            this.version = '1.0.0';
        }
        add(a, b) {
            if (typeof b === 'number') {
                return a.map(v => {
                    return v + b;
                });
            }
            return a.map((v, i) => {
                return v + b[i];
            });
        }
        sub(a, b) {
            if (typeof b === 'number') {
                return a.map(v => {
                    return v - b;
                });
            }
            return a.map((v, i) => {
                return v - b[i];
            });
        }
        mult(a, b) {
            if (typeof b === 'number') {
                return a.map(v => {
                    return v * b;
                });
            }
            return a.map((v, i) => {
                return v * b[i];
            });
        }
        div(a, b) {
            if (typeof b === 'number') {
                return a.map(v => {
                    return v / b;
                });
            }
            return a.map((v, i) => {
                return v / b[i];
            });
        }
        floor(a) {
            return a.map(v => {
                return Math.floor(v);
            });
        }
        set(a, b) {
            b.x = a[0];
            b.y = a[1];
        }
    }
    const V = (() => {
        const VM = new VectorManipulate();
        const V = ((a) => {
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
    class Vector extends Array {
        constructor(a) {
            super(a.length);
            for (let i = 0; i < a.length; i++) {
                this[i] = a[i];
            }
        }
        get length() {
            let max = 0;
            Object.keys(this).forEach(value => {
                if (value.indexOf('.') > -1) {
                    return;
                }
                const parsed = parseInt(value);
                if (typeof parsed === 'number' && parsed > max) {
                    max = parsed;
                }
            });
            return Math.max(max, this._length);
        }
        set length(val) {
            this._length = val;
        }
        add(b) {
            return new Vector(V.add(this, b));
        }
        sub(b) {
            return new Vector(V.sub(this, b));
        }
        mult(b) {
            return new Vector(V.mult(this, b));
        }
        div(b) {
            return new Vector(V.div(this, b));
        }
        floor() {
            return new Vector(V.floor(this));
        }
        set(b) {
            V.set(this, b);
            return this;
        }
    }
    Object.defineProperty(Vector.prototype, '_length', {
        configurable: false,
        enumerable: false,
        value: 0,
        writable: true
    });
    Object.getOwnPropertyNames(Array.prototype).forEach(name => {
        if (name !== 'constructor' && name !== 'length') {
            Object.defineProperty(Vector.prototype, name, Object.getOwnPropertyDescriptor(Array.prototype, name));
        }
    });
    return V;
})();
console.log(V([1, 2]).add([3, 4]));
console.log(V.add([1, 2], [3, 4]));
console.log(V.version);
module.exports = V;
