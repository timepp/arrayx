export class ArrayX<T> {
    private dim: number[]
    private data: T[]

    constructor(dim: number[], initValue?: T | T[] | ((index: number[]) => T)) {
        this.dim = dim.slice()
        const length = dim.reduce((p, c) => p * c, 1)
        this.data = new Array(length)
        if (initValue !== undefined) {
            if (initValue instanceof Function) {
                for (let i = 0; i < length; i++) {
                    this.data[i] = initValue(this.indices(i))
                }
            } else if (initValue instanceof Array) {
                if (length !== initValue.length) {
                    throw new Error(`ArrayX: init data length mismatch`)
                }
                this.data = initValue.slice()
            } else {
                this.data.fill(initValue)
            }
        }
    }

    indices(index: number) : number[] {
        let indices = new Array(this.dim.length)
        let i = index
        for (let j = this.dim.length - 1; j >= 0; j--) {
            indices[j] = i % this.dim[j]
            i = (i - indices[j]) / this.dim[j]
        }
        return indices
    }

    index(indices: number[]) : number {
        let i = 0;
        for (let j = 0; j < this.dim.length; j++) {
            i = i * this.dim[j] + indices[j]
        }
        return i
    }

    get(indices: number[]) : T {
        return this.data[this.index(indices)]
    }

    set(indices: number[], value: T) {
        this.data[this.index(indices)] = value
    }

    fill(data: T | T[]) : this {
        if (data instanceof Array) {
            this.data = data.slice()
        } else {
            this.data.fill(data)
        }
        return this
    }

    forEach(callbackfn: (value: T, index: number, indices: number[]) => void) : void {
        for (let i = 0; i < this.data.length; i++) {
            callbackfn(this.data[i], i, this.indices(i))
        }
    }
}
