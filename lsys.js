/*
 *  LSystems.JS v0.1.1
 *  Copyright (c) 2012, Yuval Adam
 *  http://yuvadm.github.com/lsys.js/LICENSE
 */

function LSystem(axiom, rules, draw_constants) {
  this.axiom = axiom;
  this.rules = rules;
  this.tree = axiom;
  this.draw_constants = draw_constants || [];

  var cos = Math.cos;
  var sin = Math.sin;

  this.R_U = function(a) {
    return [
      [cos(a),  sin(a), 0],
      [-sin(a), cos(a), 0],
      [0,       0,      1]
    ];
  };

  this.R_L = function(a) {
    return [
      [cos(a), 0, -sin(a)],
      [0,      1,       0],
      [sin(a), 0,  cos(a)]
    ];
  };

  this.R_H = function(a) {
    return [
      [1,      0,       0],
      [0, cos(a), -sin(a)],
      [0, sin(a),  cos(a)]
    ];
  };

  this.matrix_mult = function(a, b) {
    var ah = a.length, aw = a[0].length;
    var bh = b.length, bw = b[0].length;
    var res = [];

    if (aw != bh) {
      throw 'Dimension error';
    }

    for (var i=0; i<ah; i++) {
      res[i] = [];
      for (var j=0; j<bw; j++) {
        var sum = 0;
        for (var k=0; k<aw; k++) {
          sum += a[i][k] * b[k][j];
        }
        res[i][j] = sum;
      }
    }

    return res;
  };

  this.iterate = function(n) {
    for (var i=0; i<n; i++) {
      this.tree = this.tree.replace(/\w/g, function(c) {
        return rules[c] || c;
      });
    }
    return this;
  };

  this.print = function() {
    return this.tree;
  };

  this.draw = function(alpha) {
    if (!alpha) {
      alpha = 90 * (Math.PI / 180);
    }

    var coords = [];
    var stack = [];
    var geometry = [[0,0,0]];

    var x = 0, y = 0, z = 0; // cartesian coordinates
    var H = 0, L = 1, U = 0; // next step vector [H,L,U]

    for (var i=0; i<this.tree.length; i++) {
      // console.log(H, L, U);
      var c = this.tree.charAt(i);

      if (this.draw_constants.indexOf(c) != -1) {
        c = 'F';
      }
      var _HLU;
      switch(c) {
        case '+':
          _HLU = this.matrix_mult(this.R_U(alpha), [[H],[L],[U]]);
          H = _HLU[0][0], L = _HLU[1][0], U = _HLU[2][0];
          break;
        case '-':
          _HLU = this.matrix_mult(this.R_U(-alpha), [[H],[L],[U]]);
          H = _HLU[0][0], L = _HLU[1][0], U = _HLU[2][0];
          break;
        case '&':
          _HLU = this.matrix_mult(this.R_L(alpha), [[H],[L],[U]]);
          H = _HLU[0][0], L = _HLU[1][0], U = _HLU[2][0];
          break;
        case '^':
          _HLU = this.matrix_mult(this.R_L(-alpha), [[H],[L],[U]]);
          H = _HLU[0][0], L = _HLU[1][0], U = _HLU[2][0];
          break;
        case '<':
          _HLU = this.matrix_mult(this.R_H(alpha), [[H],[L],[U]]);
          H = _HLU[0][0], L = _HLU[1][0], U = _HLU[2][0];
          break;
        case '>':
          _HLU = this.matrix_mult(this.R_H(-alpha), [[H],[L],[U]]);
          H = _HLU[0][0], L = _HLU[1][0], U = _HLU[2][0];
          break;
        case '|':
          _HLU = this.matrix_mult(this.R_U(Math.PI), [[H],[L],[U]]);
          H = _HLU[0][0], L = _HLU[1][0], U = _HLU[2][0];
          break;
        case '[':
          stack.push(x, y, z, H, L, U, geometry);
          geometry = [[x,y,z]];
          break;
        case ']':
          if (geometry.length > 1) {
            coords.push(geometry);
          }
          geometry = stack.pop();
          U = stack.pop();
          L = stack.pop();
          H = stack.pop();
          z = stack.pop();
          y = stack.pop();
          x = stack.pop();
          break;
        case 'F':
          nx = 0, ny = 1, nz = 0;
          nc = this.tree.charAt(i+1);

          x += H;
          y += L;
          z += U;
          
          geometry.push([x,y,z]);
          break;
      }
    }

    coords.push(geometry);
    return coords;
  };

  this.reset = function() {
    this.tree = axiom;
    return this;
  };

  this.debug = function() {
    console.log('Axiom: ' + this.axiom);
    console.log('Rules: ' + this.rules);
    console.log('Tree: ' + this.tree);
  };

}
