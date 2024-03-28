---
outline: deep
---

# JSDoc 小记

## 常用块级标签

### @param / @type

`@param [<type>] <name> - [<description>]`

:::code-group

```js [Basic]
/**
 * @param {string} somebody - Somebody's name.
 */
function sayHello(somebody) {
  alert("Hello " + somebody);
}
```

```js [Object's property]
/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
Project.prototype.assign = function (employee) {
  // ...
};
```

```js [Object[]'s property]
/**
 * Assign the project to a list of employees.
 * @param {Object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
Project.prototype.assign = function (employees) {
  // ...
};
```

```js [Option / Default]
/**
 * @param {string} [somebody=John Doe] - Somebody's name.
 * @param {string} [other=] - Other's name.
 */
function sayHello(somebody, other) {
  if (!somebody) {
    somebody = "John Doe";
  }

  alert("Hello " + somebody);
}
```

```js [Option Type]
/**
 * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
 */
function sayHello(somebody) {
  if (!somebody) {
    somebody = "John Doe";
  } else if (Array.isArray(somebody)) {
    somebody = somebody.join(", ");
  }
  alert("Hello " + somebody);
}
```

```js [Any]
/**
 * @param {*} somebody - Whatever you want.
 */
function sayHello(somebody) {
  console.log("Hello " + JSON.stringify(somebody));
}
```

```js [callback]
/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {number} responseCode
 * @param {string} responseMessage
 */

/**
 * Does something asynchronously and executes the callback on completion.
 * @param {requestCallback} cb - The callback that handles the response.
 */
function doSomethingAsynchronously(cb) {
  // code
}
```

:::

数字或空值 `null`: `{?number}`

一个数字，绝不会为空值: `{!number}`

### @constant

记录常量

:::code-group

```js [basic]
/**
 * @constant
 * @type {string}
 * @default
 */
const RED = "FF0000";
```

```js [object]
/**
 * @constant
 * @type {object}
 * @property {string} id - an ID.
 * @property {string} name - your name.
 * @property {number} age - your age.
 * @default
 */
const SNOW_IN_LU = {
  id: "1001",
  name: "snowinlu",
  age: 18,
};
```

:::

### @returns

记录函数返回的值: `@return [{type}] [description]`

```js
/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
  return a + b;
}
```
