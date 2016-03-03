'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
if (typeof exports === 'undefined') {
    var exports = {};
}
var VectorManipulateInstance = (function () {
    function VectorManipulateInstance() {
        this.version = '1.0.3';
    }
    VectorManipulateInstance.prototype.add = function (a, b) {
        if (typeof b === 'number') {
            return a.map(function (v) {
                return v + b;
            });
        }
        return a.map(function (v, i) {
            return v + b[i];
        });
    };
    VectorManipulateInstance.prototype.sub = function (a, b) {
        if (typeof b === 'number') {
            return a.map(function (v) {
                return v - b;
            });
        }
        return a.map(function (v, i) {
            return v - b[i];
        });
    };
    VectorManipulateInstance.prototype.mult = function (a, b) {
        if (typeof b === 'number') {
            return a.map(function (v) {
                return v * b;
            });
        }
        return a.map(function (v, i) {
            return v * b[i];
        });
    };
    VectorManipulateInstance.prototype.div = function (a, b) {
        if (typeof b === 'number') {
            return a.map(function (v) {
                return v / b;
            });
        }
        return a.map(function (v, i) {
            return v / b[i];
        });
    };
    VectorManipulateInstance.prototype.limit = function (a, b) {
        if (typeof b === 'number') {
            return a.map(function (v) {
                return Math.min(v, b);
            });
        }
        return a.map(function (v, i) {
            return Math.min(v, b[i]);
        });
    };
    VectorManipulateInstance.prototype.floor = function (a) {
        return a.map(function (v) {
            return Math.floor(v);
        });
    };
    VectorManipulateInstance.prototype.set = function (a, b) {
        b.x = a[0];
        b.y = a[1];
    };
    VectorManipulateInstance.prototype.setWidthHeight = function (a, b) {
        b.width = a[0];
        b.height = a[1];
    };
    VectorManipulateInstance.prototype.sum = function (a) {
        return a.reduce(function (p, v) {
            return p + v;
        });
    };
    VectorManipulateInstance.prototype.dot = function (a, b) {
        return this.sum(this.mult(a, b));
    };
    VectorManipulateInstance.prototype.norm = function (a) {
        return Math.sqrt(this.dot(a, a));
    };
    VectorManipulateInstance.prototype.normalize = function (a) {
        return this.div(a, this.norm(a));
    };
    VectorManipulateInstance.prototype.randomNumber = function (max, min) {
        if (typeof min === 'number') {
            return (max - min) * Math.random() + min;
        }
        return max * Math.random();
    };
    VectorManipulateInstance.prototype.random = function (length, max, min) {
        var ran = [];
        for (var i = 0; i < length; i++) {
            ran.push(this.randomNumber(max, min));
        }
        return ran;
    };
    VectorManipulateInstance.prototype.randomize = function (max, min) {
        var _this = this;
        if (typeof min === 'undefined') {
            return max.map(function (v) {
                return _this.randomNumber(v);
            });
        }
        if (typeof min === 'number') {
            return max.map(function (v) {
                return _this.randomNumber(v, min);
            });
        }
        return max.map(function (v, i) {
            return _this.randomNumber(v, min[i]);
        });
    };
    return VectorManipulateInstance;
})();
exports.VectorManipulateInstance = VectorManipulateInstance;
var V = (function () {
    var VM = new VectorManipulateInstance();
    var V = (function () {
        if (typeof arguments[0] === 'number') {
            return new Vector(Array.prototype.slice.call(arguments));
        }
        ;
        return new Vector(arguments[0]);
    });
    Object.getOwnPropertyNames(VM).forEach(function (property) {
        Object.defineProperty(V, property, Object.getOwnPropertyDescriptor(VM, property));
    });
    Object.getOwnPropertyNames(VectorManipulateInstance.prototype).forEach(function (property) {
        if (property !== 'constructor') {
            Object.defineProperty(V, property, Object.getOwnPropertyDescriptor(VectorManipulateInstance.prototype, property));
        }
    });
    return V;
})();
var VectorProperties = {};
var Vector = (function (_super) {
    __extends(Vector, _super);
    function Vector() {
        _super.call(this);
        var array = typeof arguments[0] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0];
        Object.defineProperties(array, VectorProperties);
        return array;
    }
    Vector.prototype.add = function () {
        return new Vector(V.add(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
    };
    Vector.prototype.sub = function () {
        return new Vector(V.sub(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
    };
    Vector.prototype.mult = function () {
        return new Vector(V.mult(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
    };
    Vector.prototype.div = function () {
        return new Vector(V.div(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
    };
    Vector.prototype.limit = function () {
        return new Vector(V.limit(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
    };
    Vector.prototype.floor = function () {
        return new Vector(V.floor(this));
    };
    Vector.prototype.set = function (b) {
        V.set(this, b);
        return this;
    };
    Vector.prototype.setWidthHeight = function (b) {
        V.setWidthHeight(this, b);
        return this;
    };
    Vector.prototype.randomize = function () {
        return new Vector(V.randomize(this, typeof arguments[0] === 'number' && typeof arguments[1] === 'number' ? Array.prototype.slice.call(arguments) : arguments[0]));
    };
    Vector.prototype.sum = function () {
        return V.sum(this);
        ;
    };
    Vector.prototype.norm = function () {
        return V.norm(this);
    };
    Vector.prototype.normalize = function () {
        return new Vector(V.normalize(this));
    };
    Vector.prototype.dot = function (b) {
        return V.dot(this, b);
    };
    return Vector;
})(Array);
exports.Vector = Vector;
Object.getOwnPropertyNames(Vector.prototype).forEach(function (property) {
    if (property !== 'constructor') {
        var descriptor = Object.getOwnPropertyDescriptor(Vector.prototype, property);
        descriptor.enumerable = false;
        VectorProperties[property] = descriptor;
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = V;
if (typeof module !== 'undefined') {
    module.exports = V;
    Object.keys(exports).forEach(function (value) {
        module.exports[value] = exports[value];
    });
}
