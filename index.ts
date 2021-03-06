export class ArrayX<T> {
    private dim: number[]
    private data: T[]

    constructor(dim: number[], initValue?: T | T[] | ((index: number[]) => T)) {
        this.dim = dim.slice()
        const length = dim.reduce((p, c) => p * c, 1)
        this.data = new Array(length)
        if (initValue !== undefined) {
            this.fill(initValue)
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

    fill(data: T | T[] | ((index: number[]) => T)) : this {
        if (data instanceof Function) {
            for (let i = 0; i < this.data.length; i++) {
                this.data[i] = data(this.indices(i))
            }
        } else if (data instanceof Array) {
            for (let i = 0; i < this.data.length && i < data.length; i++) {
                this.data[i] = data[i]
            }
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
