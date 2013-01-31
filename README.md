L-Systems.JS
============

A complete, 3D L-Systems implementation in JavaScript. Generates trees by
production rules and draws by converting to cartesian coordinates.

Usage
-----

```js
    var fractal = require('lsys');
    var lsystem = fractal("L", {
        "L": "L+R++R-L--LL-R+", 
        "R": "-L+RR++R+L--L-R"
    }).iterate(2).apply({"L": "F","R": "F"}); 
```

Calls the api with an initial axiom: "L"
And,
Rules to rewrite any "L" as "L+R++R-L--LL-R+" and any "R" as "-L+RR++R+L--L-R"

Calls iterate(2) which applies these rules twice.

Calls apply with a different set of rules to replace any L and any R with F, as a finalization step.

This creates a Gosper Flowsnake fractal.


Definition
------

An L-system is a formal grammar defined as an initial axiom string, and a set
of production rules.


Usage
-----

Lsystem grammars are typically used as input for Turtle Graphics.

        var turtle = require('turtle3d');
        var coords = turtle(lsystem.string(), 60 * (Math.PI / 180));


# install

With [npm](https://npmjs.org) do:

```
npm install lsys
```


More
----

For more info and examples, check out http://yuvadm.github.com/lsys.js

