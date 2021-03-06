// Base Function
function Base(instance_var) {
    this.instanceVariable = instance_var;
}

Base.staticVariable = 'Base';

Base.staticMethod = function() {
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

Base.prototype.instanceMethod = function() {
    console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}

// Derived Function
function Derived(instance_var) {
    this.instanceVariable = instance_var;
}

Derived.staticVariable = 'Derived';

Derived.staticMethod = function() {
    console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}

Derived.prototype.instanceMethod = function() {
    console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable)
}

/**
 * Inheritence Function
 *  @param base    {Function} the base function
 *         derived {Function} the derived function
 */
function extend(base, derived) {

    // For instanceMethod
    var bp = base.prototype;
    var dp = derived.prototype;
    for (var i in bp) {
        if (typeof(bp[i]) === "function" && typeof(dp[i]) === "function") {
            var temp = dp[i];
            dp[i] = function (base, derived) {
                return function () {
                    base.call(this);
                    derived.call(this);
                }
            }(bp[i], temp);
        }
    }

    // For staticMethod
    var b = base;
    var d = derived;
    for (var i in b) {
        if (typeof(b[i]) === "function" && typeof(d[i]) === "function") {
            var temp = d[i];
            d[i] = function (base, derived) {
                return function () {
                    base.call(this);
                    derived.call(this);
                }
            }(b[i], temp);
        }
    }

}

extend(Base, Derived);

// test1
console.log("------------------test1---------------");
example = new Derived('example');
Derived.staticMethod();
example.instanceMethod();

// test2
console.log("------------------test2---------------");
example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();
