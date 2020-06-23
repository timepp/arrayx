import {ArrayX} from "./index.js"

let x = new ArrayX([2, 3], [3,4,5,6,4,3])
console.log(x.data)
for (let i = 0; i < x.data.length; i++) {
    console.log(x.indices(i))
}
