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
    var nx = 0, ny = 1, nz = 0; // next step delta
    var H = 0, L = 0, U = 0; // headings on 3 axes
    var RUu = false, RLu = false, RHu = false;

    for (var i=0; i<this.tree.length; i++) {
      var c = this.tree.charAt(i);

      if (this.draw_constants.indexOf(c) != -1) {
        c = 'F';
      }
      switch(c) {
        case '+':
          U += alpha;
          RUu = true;
          break;
        case '-':
          U -= alpha;
          RUu = true;
          break;
        case '&':
          L += alpha;
          RLu = true;
          break;
        case '^':
          L -= alpha;
          RLu = true;
          break;
        case '<':
          H += alpha;
          RHu = true;
          break;
        case '>':
          H -= alpha;
          RHu = true;
          break;
        case '|':
          U += Math.PI;
          RUu = true;
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

          if (RUu) {
            var tx = (nx * Math.cos(U)) - (ny * Math.sin(U));
            var ty = (nx * Math.sin(U)) + (ny * Math.cos(U));
            nx = tx;
            ny = ty;

            if (nc != 'F')
              RUu = false;
          }

          if (RLu) {
            var tx = (nx * Math.cos(L)) + (nz * Math.sin(L));
            var tz = -(nx * Math.sin(L)) + (nz * Math.cos(L));
            nx = tx;
            nz = tz;

            if (nc != 'F')
              RLu = false;
          }

          if (RHu) {
            var ty = (ny * Math.cos(H)) + (nz * Math.sin(H));
            var tz = -(ny * Math.sin(H)) + (nz * Math.cos(H));
            ny = ty;
            nz = tz;

            if (nc != 'F')
              RHu = false;
          }

          x += nx;
          y += ny;
          z += nz;
          
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
