
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















































