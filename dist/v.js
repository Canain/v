'use strict';
const V = (() => {
    class VectorManipulate {
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
    class Vector extends Array {
        constructor(a) {
            super(a.length);
            for (let i = 0; i < a.length; i++) {
                this[i] = a[i];
            }
        }
        add(b) {
            return new Vector(VM.add(this, b));
        }
        sub(b) {
            return new Vector(VM.sub(this, b));
        }
        mult(b) {
            return new Vector(VM.mult(this, b));
        }
        div(b) {
            return new Vector(VM.div(this, b));
        }
        floor() {
            return new Vector(VM.floor(this));
        }
        set(b) {
            VM.set(this, b);
            return this;
        }
    }
    return (a) => {
        return new Vector(a);
    };
})();
module.exports = V;
