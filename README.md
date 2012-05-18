L-Systems.JS
============

A full, 3D L-Systems implementation in JavaScript

Syntax
------

 - `F`: move one unit vector forward
 - `+` / `-`: turn right / left by angle `alpha`
 - `&` / `^`: pitch up / down by angle `alpha`
 - `<` / `>`: roll right / left by angle `alpha`
 - `|`: reverse vector direction
 - `[` / `]`: push / pop current tree state

Usage
-----

```js
var lsys = new LSystem('F', { 'F' : 'F-F+FF' });
var tree = lsys.iterate(2);
console.log(tree)  // F-F+FF-F-F+FF+F-F+FFF-F+FF
```
