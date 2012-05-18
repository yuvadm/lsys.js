L-Systems.JS
============

A full, 3D L-Systems implementation in JavaScript

Usage
-----

```js
var lsys = new LSystem('F', { 'F' : 'F-F+FF' });
var tree = lsys.iterate(2);
console.log(tree);  // F-F+FF-F-F+FF+F-F+FFF-F+FF
```

Definition
------

An L-system is a formal grammar defined as an initial axiom string, and a set
of production rules. In te aforementioned example, `F` is the initial axiom,
and only one production rule exists: `F -> F-F+FF`. The grammar alphabet is
assumed to be all characters with a production rule mapping.

Syntax
------

 - `F`: move one unit vector forward
 - `+` / `-`: turn right / left by angle `alpha`
 - `&` / `^`: pitch up / down by angle `alpha`
 - `<` / `>`: roll right / left by angle `alpha`
 - `|`: reverse vector direction
 - `[` / `]`: push / pop current tree state
