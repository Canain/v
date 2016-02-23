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
        sum(a) {
            return a.reduce((p, v) => {
                return p + v;
            });
        }
        norm(a) {
            return Math.sqrt(this.sum(this.mult(a, a)));
        }
        normalize(a) {
            return this.div(a, this.norm(a));
        }
    }
    const V = (() => {
        const VM = new VectorManipulateInstance();
        const V = (function () {
            if (typeof arguments[0] === 'number') {
                return new Vector(Array.prototype.slice.call(arguments));
            }
            ;
            return new Vector(arguments[0]);
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
        constructor() {
            super();
            const array = typeof arguments[0] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0];
            Object.defineProperties(array, VectorProperties);
            return array;
        }
        add() {
            return new Vector(V.add(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
        }
        sub() {
            return new Vector(V.sub(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
        }
        mult() {
            return new Vector(V.mult(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
        }
        div() {
            return new Vector(V.div(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
        }
        floor() {
            return new Vector(V.floor(this));
        }
        set(b) {
            V.set(this, b);
            return this;
        }
        sum() {
            return V.sum(this);
            ;
        }
        norm() {
            return V.norm(this);
        }
        normalize() {
            return new Vector(V.normalize(this));
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
if (typeof module !== 'undefined') {
    module.exports = V;
}
