L-Systems.JS
============

A complete, 3D L-Systems implementation in JavaScript. Generates trees by
production rules and draws by converting to cartesian coordinates.

Usage
-----

```js
var lsys = new LSystem('F', { 'F' : 'F-F+FF' }).iterate(2);
var tree = lsys.print();
console.log(tree);  // F-F+FF-F-F+FF+F-F+FFF-F+FF
var coords = lsys.draw(Math.PI / 2);  // draw tree with alpha as 90 degrees
console.log(coords);  // [[0,0,0], [0,1,0], [1,1,0], ...
```

Definition
------

An L-system is a formal grammar defined as an initial axiom string, and a set
of production rules. In the aforementioned example, `F` is the initial axiom,
and only one production rule exists: `F -> F-F+FF`. The grammar alphabet is
assumed to be all characters with a production rule mapping.

Syntax
------

 - `F`: draw and move one unit vector forward
 - `+`/`-`: turn right / left
 - `&`/`^`: pitch up / down
 - `<`/`>`: roll right / left
 - `|`: reverse vector direction
 - `[`/`]`: push / pop current tree state

More
----

For more info and examples, check out http://yuvadm.github.com/lsys.js


Typical Usage
----

For using such a system in a Turtle also download:
http://github.com/tatarize/turtle3d

