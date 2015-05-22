// Advanced js
Defining Functions
======================================================================================================
// #5: What ways can we define functions?
function isNimble(){ return true; } 
var canFly = function(){ return true; }; 
window.isDeadly = function(){ return true; }; 

// #6: Does the order of function definition matter?
var canFly = function(){ return true; }; 
window.isDeadly = function(){ return true; }; 
assert( isNimble() && canFly() && isDeadly(), "Still works, even though isNimble is moved." ); // pass
function isNimble(){ return true; }

// #7: Where can assignments be accessed?
assert( typeof canFly == "undefined", "canFly doesn't get that benefit." ); // pass
assert( typeof isDeadly == "undefined", "Nor does isDeadly." ); // pass
var canFly = function(){ return true; }; 
window.isDeadly = function(){ return true; };

// #8: Can functions be defined below return statements?
function stealthCheck(){ 
  assert( stealth(), "We'll never get below the return, but that's OK!" ); // pass
  return stealth();
  function stealth(){ return true; } // it will be hoisted to the top of the current scope.
} 
stealthCheck();


Named Functions
======================================================================================================
// #10: We can refer to a function, within itself, by its name.
function yell(n){ 
  return n > 0 ? yell(n-1) + "a" : "hiy"; 
} 
assert( yell(4) == "hiyaaaa", "Calling the function by itself comes naturally." ); // pass

// #11: What is the name of a function?
var ninja = function myNinja(){ 
  assert( ninja == myNinja, "This function is named two things - at once!" ); // pass
}; 
ninja(); 
assert( typeof myNinja == "undefined", "But myNinja isn't defined outside of the function." ); // pass
log( ninja ); // function myNinja(){ assert( ninja == myNinja, "This function is named two things - at once!" ); }

// #12: We can even do it if we're an anonymous function that's an object property. (Noteworthy *****)
var ninja = { 
  yell: function(n){ 
    return n > 0 ? ninja.yell(n-1) + "a" : "hiy"; 
  } 
}; 
assert( ninja.yell(4) == "hiyaaaa", "A single object isn't too bad, either." ); // pass

// #13: But what happens when we remove the original object?
var ninja = { 
  yell: function(n){ 
    return n > 0 ? ninja.yell(n-1) + "a" : "hiy"; 
  } 
}; 
assert( ninja.yell(4) == "hiyaaaa", "A single object isn't too bad, either." ); // pass
 
var samurai = { yell: ninja.yell }; 
var ninja = null; 
 
try { 
  samurai.yell(4); 
} catch(e){ 
  assert( false, "Uh, this isn't good! Where'd ninja.yell go?" ); // fail, because ninja is null.
}

// #14: Let's give the anonymous function a name!
var ninja = { 
  yell: function yell(n){ // just gave an anonymous function a name. 'yell'
    return n > 0 ? yell(n-1) + "a" : "hiy"; 
  } 
}; 
assert( ninja.yell(4) == "hiyaaaa", "Works as we would expect it to!" ); // pass
 
var samurai = { yell: ninja.yell }; // works this time. But why? (Difficulty *******)
var ninja = null;
assert( samurai.yell(4) == "hiyaaaa", "The method correctly calls itself." ); // pass but why?

// #15: What if we don't want to give the function a name?
var ninja = { 
  yell: function(n){ 
    return n > 0 ? arguments.callee(n-1) + "a" : "hiy"; // arguments.callee is the function itself.
  } 
}; 
assert( ninja.yell(4) == "hiyaaaa", "arguments.callee is the function itself." ); // pass


Functions as Objects (Noteworthy *****)
======================================================================================================
// #17: How similar are functions and objects?
var obj = {};
var fn = function(){};
assert( obj && fn, "Both the object and function exists." ); // pass

// #18: How similar are functions and objects?
var obj = {};
var fn = function(){};
obj.prop = "some value";
fn.prop = "some value"; // functions can have properties. (Noteworthy ****)
asser( obj.prop == fn.prop, "Both are objects, both have the property." ); // pass

// #19: Is it possible to cache the return results from a function? - yes
function getElements( name ) {
	var results;

	if ( getElements.cache[name] ) { // cache property with "name" property exists? 
		results = getElements.cache[name];
	} else {
		results = document.getElementsByTagName(name);
		getElements.cache[name] = results; // if not, assign it with the value in results.
	}

	return results;
}
getElements.cache = {}; // cache object needs to be initiated.

// #20: QUIZ: Can you cache the results of this function?
function isPrime( num ) {
	var prime = num != 1 // Everything but 1 can be prime
	for ( var i = 2; i < num; i++ ) {
		if ( num % i == 0 ) {
			prime = false;
			break;
		}
	}
	return prime;
}

assert( isPrime(5), "Make sure the function works, 5 is prime" ); // pass
assert( isPrime.cache[5], "Is the answer cached?" ); // ERROR Cannot read property of '5' of undefined

// #21: One possible way to cache the results: (Noteworthy *******)
function isPrime( num ) {
	if ( isPrime.cache[ num ] != null )
		return isPrime.cache[ num ]; // Very useful. Heavy calculation can be cached in a function.

	var prime = num != 1 // Everything but 1 can be prime
	for ( var i = 2; i < num; i++ ) {
		if ( num % i == 0 ) {
			prime = false;
			break;
		}
	}
	
	isPrime.cache[ num ] = prime;

	return prime;
}

isPrime.cache = {}; // However, cache needs to be initiated.

assert( isPrime(5), "Make sure the function works, 5 is prime." ); // pass
assert( isPrime.cache[5], "Make sure the answer is cached." ); // pass


Context (Noteworthy *****)
======================================================================================================
// #23: What happens if a function is an object property?
var katana = {
	isSharp: true,
	use: function(){
		this.isSharp = !this.isSharp;
	}
};
katana.use();
assert( !katana.isSharp, "Veryfy the value of isSharp has been changed." ); // pass

// #24: What exactly does context represent?
function katana(){
	this.isSharp = true; // this will point window object (Noteworthy *****)
}
katana();
assert( isSharp === true, "A global object now exists with that name and value." ); // pass

var shuriken = {
	toss: function(){
		this.isSharp.true; // this 'this' will point shuriken upon an invocation
	}
};
shuriken.toss();
assert( shuriken.isSharp === true, "When it's an object property, the value is set within the object." ); // pass

// #25: How can we change the context of a function? (Noteworthy *****)
var object = {};
function fn(){
	return this;
}
assert( fn() == this, "The context is the global object." ); // pass
assert( fn.call(object) == object, "The context is changed to a specific object." ); // pass

// #26: Different ways of changing the context: (Noteworthy *****)
finction add(a, b){
	return a + b;
}
assert( add.call(this, 1, 2) == 3, ".call() takes individual arguments" ); // pass
assert( add.apply(this, [1, 2]) == 3, ".apply() takes an array of arguments" ); // pass

// #27: QUIZ: How can we implement looping with a callback? (Noteworthy *******)
function loop(array, fn){
	for ( var i = 0; i < array.length; i++ ) {
		fn.call( array, array[i], i ); // ?
	}
}
var num = 0;
loop([0, 1, 2], function(value, i){
	assert(value == num++, "Make sure the contents are as we expect it.");
	assert(this instanceof Array, "The context should be the full array.");
});

// To be continuedd