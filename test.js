import {ArrayX} from "./index.js"
import test from "tape"

test("creation", t => {
    const cases = [
        [[2, 3],       false,    undefined, 6,   new Array(6)],
        [[0, 0],       false,    undefined, 0,   []],
        [[1, 1],       false,    undefined, 1,   new Array(1)],
        [[1, 2, 3],    true,     9,         6,   [9, 9, 9, 9, 9, 9]]
    ]

    for (let i = 0; i < cases.length; i++) {
        console.log(`case ${i+1} / ${cases.length}`)
        const [dims, hasSecondArg, secondArg, expectedLength, expectedContent] = cases[i]
        let x
        if (hasSecondArg) {
            x = new ArrayX(dims, secondArg)
        } else {
            x = new ArrayX(dims)
        }
        t.equal(x.data.length, expectedLength)
        t.deepEqual(x.data, expectedContent)
    }

    t.end()
})

test("indexes", t => {
    const cases = [
        [[2,3,4], [0,0,0], 0],
        [[2,3,4], [1,2,3], 23],
        [[4,5],   [2,1],   11]
    ]
    for (let i = 0; i < cases.length; i++) {
        console.log(`case ${i+1} / ${cases.length}`)
        const [dims, indices, index] = cases[i]
        const x = new ArrayX(dims)
        t.equal(x.index(indices), index)
        t.deepEqual(x.indices(index), indices)
    }
    t.end()
})

test("example", t => {
    const x = new ArrayX([3, 4])
    x.set([2, 3], 10)
    t.equal(x.get([2, 3]), 10)
    t.end()
})
