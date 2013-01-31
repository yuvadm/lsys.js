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

        function rotAxis(angle, vector )
        {
            var M = [];
            M[0] = [];
            M[1] = [];
            M[2] = [];
            M[3] = [];
            var axisX = vector[0][0];
            var axisY = vector[1][0];
            var axisZ = vector[2][0];
            
            var sine = cos(angle);
            var cosign = sin(angle);
            
            M[0][0] = ( sine + ( ( axisX * axisX ) * ( 1 - sine ) ) );
            M[0][1] = ( ( ( axisX * axisY ) * ( 1 - sine ) ) - ( axisZ * cosign ) );
            M[0][2] = ( ( ( axisX * axisZ ) * ( 1 - sine ) ) + ( axisY * cosign ) );
            M[0][3] = 0;
            
            M[1][0] = ( ( ( axisX * axisY ) * ( 1 - sine ) ) + ( axisZ * cosign ) );
            M[1][1] = ( sine + ( ( axisY * axisY ) * ( 1 - sine ) ) );
            M[1][2] = ( ( ( axisY * axisZ ) * ( 1 - sine ) ) - ( axisX * cosign ) );
            M[1][3] = 0;
            
            M[2][0] = ( ( ( axisX * axisZ ) * ( 1 - sine ) ) - ( axisY * cosign ) );
            M[2][1] = ( ( ( axisY * axisZ ) * ( 1 - sine ) ) + ( axisX * cosign ) );
            M[2][2] = ( sine + ( ( axisZ * axisZ ) * ( 1 - sine ) ) );
            M[2][3] = 0;
            
            M[3][0] = 0;
            M[3][1] = 0;
            M[3][2] = 0;
            M[3][3] = 1;
            
            return M;
        }
        
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

    var H = [[1],[0],[0],[0]]; //column base.
    var L = [[0],[1],[0],[0]];
    var U = [[0],[0],[1],[0]]; //H x L -> U

    for (var i=0; i<this.tree.length; i++) {
      // console.log(H, L, U);
      var c = this.tree.charAt(i);

      if (this.draw_constants.indexOf(c) != -1) {
        c = 'F';
      }

      switch(c) {
        case '+':
            R = rotAxis(alpha,U);
            H = this.matrix_mult(R,H);
            L = this.matrix_mult(R,L);
            U = this.matrix_mult(R,U);
          break;
        case '-':
            R = rotAxis(-alpha,U);
            H = this.matrix_mult(R,H);
            L = this.matrix_mult(R,L);
            U = this.matrix_mult(R,U);
          break;
        case '&':
            R = rotAxis(alpha,L);
            H = this.matrix_mult(R,H);
            L = this.matrix_mult(R,L);
            U = this.matrix_mult(R,U);
          break;
        case '^':
            R = rotAxis(-alpha,L);
            H = this.matrix_mult(R,H);
            L = this.matrix_mult(R,L);
            U = this.matrix_mult(R,U);
            
          break;
        case '>':
            R = rotAxis(alpha,H);
            H = this.matrix_mult(R,H);
            L = this.matrix_mult(R,L);
            U = this.matrix_mult(R,U);
          break;
        case '<':
            R = rotAxis(-alpha,H);
            H = this.matrix_mult(R,H);
            L = this.matrix_mult(R,L);
            U = this.matrix_mult(R,U);
          break;
        case '|':
            R = rotAxis(Math.PI,U);
            H = this.matrix_mult(R,H);
            L = this.matrix_mult(R,L);
            U = this.matrix_mult(R,U);
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
          x += H[0][0];
          y += H[1][0];
          z += H[2][0];
          
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
