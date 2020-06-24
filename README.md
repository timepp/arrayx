# ArrayX: Lean, fixed multi-dimension array

It's designed to easily creating/iterating multi-dimension arrays.

The usage is extremely straightforward:

```javascript
    const x = new ArrayX([3, 4])
    x.set([2, 3], 10)
    console.log(x.get([2, 3])) // 10
    console.log(x.get([0, 0])) // undefined
    x.fill(([a, b]) => a * b)
    console.log(x) // [0,0,0,0,0,1,2,3,0,2,4,6]
```
