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
    const setPrototypeOf = Object.setPrototypeOf || ((obj, proto) => {
        obj.__proto__ = proto;
    });
    class Vector extends Array {
        constructor(a) {
            super();
            const array = a.slice();
            setPrototypeOf(array, Vector.prototype);
            return array;
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
    return V;
})();
module.exports = V;
