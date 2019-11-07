# swizzle.js
### A function that creates an object with properties that are swizzable 

## Installation
Include swizzle.js in your scripts 
```html
<script type="text/javascript" src="swizzle.js"></script>
```

## How to use

swizzle.js creates a global function "Swizzle" with two parameters: an object and an array of properties on the object that can be swizzled. The function returns a proxied version of the object with overrides for get/set that allow swizzling any property defined in the array of properties.  

```javascript
function Vector4(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    this.someOtherProp = "some other prop";

    // set function to return "swizzled" version of constructed object with x y z and w marked as "swizzable"
    return Swizzle(this, ['x', 'y', 'z', 'w']);
}

let v1 = new Vector4(1, 2, 3, 4);
let v2 = new Vector4(5, 6, 7, 8);

console.log(v1.x); // 1
console.log(v1.xyz); // [1, 2, 3]
console.log(v1.xxyz); // [1, 1, 2, 3]

v1.xyz = v2.xyz;

console.log(v1.xyz); // [5, 6, 7]
console.log(v1.x); // 5
console.log(v1.y); // 6
console.log(v1.z); // 7

console.log(v1.someOtherProp); // "some other prop"

```
