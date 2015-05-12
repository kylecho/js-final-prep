
Object Decorator Pattern
====================================================
// run.js
var amy = carlike({}, 1);
move(amy);
var ben = carlike({}, 9);
move(ben);

// library.js
var carlike = function(obj, loc){
	obj.loc = loc;
	obj.move = function(){
		obj.loc++;
	};
	return obj;
};

Functional Classes
====================================================
// run.js
var amy = Car(1); // this object is called an instance
amy.move(); // instantiating
var ben = Car(9);
ben.move();

// library.js
// Car is called a constuctor function
var Car = function(loc){
	var obj = {loc: loc};
	obj.move = function(){
		obj.loc++;
	};
	return obj;
};

// Reducing duplicity
var Car = function(loc){
	var obj = {loc: loc};
	obj.move = move;
	return obj;
};

var move = function(){
	this.loc++;
};

// Functional shared patterns
var Car = function(loc){
	var obj = {loc: loc};
	obj.move = move;
	obj.on = on;
	obj.off = off;
	return obj;
};

var move = function(){
	this.loc++;
};
var on = function(){ /*...*/ };
var off = function(){ /*...*/ };

// Adding methods to classes
var Car = function(loc){
	var obj = {loc: loc};
	extend(obj, Car.methods);
	return obj;
};
Car.methods = {
	move	: function(){
		this.loc++;
	}
};

Prototypal Classes
====================================================
// run.js
var amy = Car(1);
amy.move();
var ben = Car(9);
ben.move();

// Delegation Relationships
var Car = function(loc){ // function that allows you to make instances
	var obj = Object.create(Car.methods); // generates the new instance
	obj.loc = loc;					// ^ a delegation from a new obj to some prototype obj
	return obj;
};
Car.methods = {
	move : function(){
		this.loc++;
	}
};

// Constructor Prototypes
var Car = function(loc){
	var obj = Object.create(Car.prototype);
	obj.loc = loc;
	return obj;
};
Car.prototype.move = function(){
	this.loc++;
};

// Car does exactly same thing as Example
var Example = function(){
	return Object.create(Car.prototype);
};

console.log(Car.prototype.constructor); // will point to Car
console.log(amy.constructor); // will fall back and look up Car.prototype
console.log(amy instanceof Car);

// What would be logged?
var Dog = function(){
	return {legs: 4, bark:alert};
};
var fido = Dog();
log(fido instanceof Dog);
// false, because fido does not inherit Dog's other properties
// it simply inherits Object.prototype, not Dog.prototype

Pseudoclassical Patterns
====================================================
// run.js
var amy = new Car(1);
amy.move();
var ben = new Car(9);
ben.move();

// library.js
var Car = function(loc){
	var obj = Object.create(Car.prototype);
	obj.loc = loc; // Not every object in this style has a parameter like loc,
	return obj; // but every one is created from a prototype and returned.
};
Car.prototype.move = function(){
	this.loc++;
};

// new operator will do the repeated steps automatically for us
var ben = new Car(9);

// using new operator turns the above Constructor interpreted as below
var Car = function(loc) {
	this = Object.create(Car.prototype); // provided by 'new' keyword
	this.loc = loc;
	return this; // provided by 'new' keyword
};

// Styles of writing classes: Two sections
var Car = function(loc) {
	this.loc = loc; // 1. setting how each instances should be different
};
Car.prototype.move = function(){
	this.loc++; // 2. setting how all the instances are similar
};

Superclass and Subclasses
====================================================
// run.js
var amy = Car(1);
amy.move();
var ben = Car(9);
ben.move();
var cal = Car(2);
cal.move();
cal.call(); // we don't have this method in Car function

// library.js
var Car = function(){ // Superclass constructor function
	return {loc: loc};
	obj.move = function(){
		obj.loc++;
	};
	return obj;
};

var Van = function(loc){ // Subclass function
	var obj = Car(loc);
	obj.grab = function(){ /*...*/ };
	return obj;
};

var Cop = function(loc){ // Subclass function
	var obj = Car(loc);
	obj.call = function(){ /*...*/ };
	return obj;
};

Pseudoclassical Subclasses
====================================================
// run.js
var zed = new Car(3); // one instance of superclass
zed.move();

var amy = new Van(9); // one instance of subclass
console.log(amy.loc);
amy.move();
amy.grab();
console.log(amy.constructor);

// Building Out a Subclass
var Car = function(loc){ // not shared from every instances
	this.loc = loc;
};
Car.prototype.move = function(){ // shared from every instances
	this.loc++;
};

var Van = function(loc){
	Car.call(this, loc); // calling Car in the context of this
};
Van.prototype = Object.create(Car.prototype);
// console.log(amy.constructor); will log 'Car', because 'amy' is a 'Van', but 'amy.constructor' is still 'Car'.
Van.prototype.constructor = Van;
Van.prototype.grab = function(){ /*...*/ };
