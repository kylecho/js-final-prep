//Q
//Easy stuff right? How about making a function that takes
//two numbers, a base and exponent and returns the result
=============================================================
var power = function(base, exponent) {
	var result = base;
	for (var i = 2; i <= exponent; i++) {
		result *= base;
	}
	return result;
};

//This function will return a number
//[input: 2, 5]
//[output: 32]

//Q
//range([start], stop, [step])
//start, if omitted, defaults to 0; step defaults to 1.
//Returns a list of integers from start to stop, incremented (or decremented) by step, exclusive.
//Note that ranges that stop before they start are considered to be zero-length instead of negative.
=============================================================

//Q
//write a function called applied that mimics the
//functionality of apply (without the context part)
=============================================================

//applied(func, [arr]) => func(arr1,arr2,arr3)

//Q
//write a function called partial that mimics this 
//behavior //TODO: more details
=============================================================
var fullName = function ( firstName, lastName ) {
  return firstName + ' ' + lastName;
};

var billName = partial( fullName, 'Bill' );

billName( 'Smith' ); // "Bill Smith"
billName( 'Clinton' ); // "Bill Clinton"

//Q (EXTRA CREDIT)
//compose(fn1, fn2, ..., fnN)
//Compose multiple functions to create a new function. 
//For example, wu.compose(f, g, h)(x) is equivalent 
//to f(g(h(x))).
=============================================================
var compose = function(fns) {
	return function() {
		return 
	};
};

>>> function square(x) { return x * x; }
>>> function add2(x) { return x + 2; }
>>> wu.compose(square, add2)(5);
49
>>> wu.compose(add2, square)(5);
27

//Q
//write a function that will merge the first object into
//the second object, using _.each. If the property already exists, on the second
//object, do not overwrite it. 
======================================================================
var merge = function(obj1, obj2) {
  var result = {};
  _.each(obj1, function(value, key){
    result[key] = value;
  });
  _.each(obj2, function(value, key){
    result[key] = value;
  });
  return result;
};

var obj1 = {one: 1, two: 2, three: 3, four: 4, five: 5},
    obj2 = {three: 4, four: 5, five: 6};
merge(obj1, obj2); // {one: 1, two: 2, three: 4, four: 5, five: 6}

//Q
//write a function that takes a nested array and returns
//a one dimentional array.
======================================================================
var flatten = function(arrays) {
  return _.reduce(arrays, function(prev, curr) { // should return _.reduce()!!
    return prev.concat(curr); 
  }, []); // initial value of [] is optional
};

//Q
//use _.map to change the 'name' property to your name and the 
//'isAwesome' property to true of these objects in this array of 
//objects -
//[
//{loves: 'iceCream' name: 'Billy', isAwesome: false;}
//{loves: 'sandwiches' name: 'Albrey', isAwesome: false;}
//{loves: 'pizza' name: 'Spencer', isAwesome: false;}
//{loves: 'strawberries' name: 'Fred', isAwesome: false;}
//]
======================================================================
var objects = [
{loves: 'iceCream', name: 'Billy', isAwesome: false},
{loves: 'sandwiches', name: 'Albrey', isAwesome: false},
{loves: 'pizza', name: 'Spencer', isAwesome: false},
{loves: 'strawberries', name: 'Fred', isAwesome: false},
];
_.map(objects, function(object) { // returns an array with applied elements
  return _.each(object, function(value, key) { // since we're not returning, we use _.each
    if (key === 'name') {
      object[key] = 'Kyle'; // to assign a value, we use key with a bracket notation
    } else if (key === 'isAwesome') {
      object[key] = true; // again, we don't need value parameter
    }
  });
});

//Q
//last questions from Day6Challenges.js
======================================================================































































