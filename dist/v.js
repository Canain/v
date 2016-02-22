'use strict';
const V = (() => {
    class VectorManipulate {
        addSingle(a, b) {
            return a.map(v => {
                return v + b;
            });
        }
        addMultiple(a, b) {
            return a.map((v, i) => {
                return v + b[i];
            });
        }
        subSingle(a, b) {
            return a.map(v => {
                return v - b;
            });
        }
        subMultiple(a, b) {
            return a.map((v, i) => {
                return v - b[i];
            });
        }
        multSingle(a, b) {
            return a.map(v => {
                return v * b;
            });
        }
        multMultiple(a, b) {
            return a.map((v, i) => {
                return v * b[i];
            });
        }
        divSingle(a, b) {
            return a.map(v => {
                return v / b;
            });
        }
        divMultiple(a, b) {
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
            if (typeof b === 'number') {
                return new Vector(VM.addSingle(this, b));
            }
            return new Vector(VM.addMultiple(this, b));
        }
        sub(b) {
            if (typeof b === 'number') {
                return new Vector(VM.subSingle(this, b));
            }
            return new Vector(VM.subMultiple(this, b));
        }
        mult(b) {
            if (typeof b === 'number') {
                return new Vector(VM.multSingle(this, b));
            }
            return new Vector(VM.multMultiple(this, b));
        }
        div(b) {
            if (typeof b === 'number') {
                return new Vector(VM.divSingle(this, b));
            }
            return new Vector(VM.divMultiple(this, b));
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
