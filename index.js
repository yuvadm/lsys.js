module.exports = function(axiom,rules) {
    this.axiom = axiom;
    this.rules = rules;
    this.tree = axiom;
    
    this.string = function() {
        return this.tree;
    }
    this.iterate = function(n) {
        for (var i=0; i<n; i++) {
            this.apply();
        }
        return this;
    };
    
    this.apply = function(r) {
        if (r === undefined) {
            r = rules;
        }
        this.tree = this.tree.replace(/\w/g, function(c) {
            return r[c] || c;
        });
     return this;
    }
    this.reset = function() {
        this.tree = axiom;
        return this;
    };

    this.debug = function() {
        console.log('Axiom: ' + this.axiom);
        console.log('Rules: ' + this.rules);
        console.log('Tree: ' + this.tree);
    };
    
    return this;
}
