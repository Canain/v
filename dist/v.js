'use strict';
const V = (() => {
    class VectorManipulateInstance {
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
        const VM = new VectorManipulateInstance();
        const V = ((a) => {
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
    const VectorProperties = {};
    class Vector extends Array {
        constructor(a) {
            super();
            const array = a.slice();
            Object.defineProperties(array, VectorProperties);
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
