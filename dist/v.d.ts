export declare class VectorManipulateInstance {
    version: string;
    constructor();
    add(a: number[], b: number | number[]): number[];
    sub(a: number[], b: number | number[]): number[];
    mult(a: number[], b: number | number[]): number[];
    div(a: number[], b: number | number[]): number[];
    limit(a: number[], b: number | number[]): number[];
    floor(a: number[]): number[];
    set(a: number[], b: {
        x: number;
        y: number;
    }): void;
    setWidthHeight(a: number[], b: {
        width: number;
        height: number;
    }): void;
    sum(a: number[]): number;
    dot(a: number[], b: number[]): number;
    norm(a: number[]): number;
    normalize(a: number[]): number[];
    randomNumber(max: number, min?: number): number;
    random(length: number, max: number, min?: number): number[];
    randomize(max: number[], min?: number | number[]): number[];
}
export interface VectorManipulate extends VectorManipulateInstance {
    (a: number[]): Vector;
    (...a: number[]): Vector;
}
declare const V: VectorManipulate;
export declare class Vector extends Array<number> {
    constructor(a: number[]);
    constructor(...a: number[]);
    add(b: number): Vector;
    add(b: number[]): Vector;
    add(...b: number[]): Vector;
    sub(b: number): Vector;
    sub(b: number[]): Vector;
    sub(...b: number[]): Vector;
    mult(b: number): Vector;
    mult(b: number[]): Vector;
    mult(...b: number[]): Vector;
    div(b: number): Vector;
    div(b: number[]): Vector;
    div(...b: number[]): Vector;
    limit(b: number): Vector;
    limit(b: number[]): Vector;
    limit(...b: number[]): Vector;
    floor(): Vector;
    set(b: {
        x: number;
        y: number;
    }): this;
    setWidthHeight(b: {
        width: number;
        height: number;
    }): this;
    randomize(min: number): Vector;
    randomize(min: number[]): Vector;
    randomize(...min: number[]): Vector;
    sum(): number;
    norm(): number;
    normalize(): Vector;
    dot(b: number[]): number;
}
export default V;
