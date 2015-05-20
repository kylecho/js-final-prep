Chapter 5: Higher-Order Functions
=============================================================================================
Introduction
=============================================================================================
// example 1.
var total = 0;
var count = 1;
while (count <= 10) {
	total += count;
	count += 1;
}
console.log(total);

// functional style of example 1.
console.log(sum(range(1, 10)));


Abstracting Array Traversal
=============================================================================================
// Loop which is not abstracted.
var array = [1, 2, 3];
for (var i = 0; i < array.length; i++) {
	var current = array[i];
	console.log(current);
}

// A slightly better version.
function logEach(array) {
	for (var i = 0; i < array.length; i++) {
		console.log(array[i]);
	}
}

// We can pass an action as a function value.
function forEach(array, action) {
	for (var i = 0; i < array.length; i++) {
		action(array[i]);
	}
}

// We can create a function value on the spot.
var numbers = [1, 2, 3, 4, 5];
var sume = 0;
forEach(numbers, function(number){
	sum += numbers;
});
console.log(num);
// 15

// a function from the previous chapter.
function gatherCorrelations(journal) {
	var phis = {};
	for (var entry = 0; entry < journal.length; entry++) {
		var events = journal[entry].events;
		for (var i = 0; i < events.length; i++) {
			var event = events[i];
			if (!(event in phis))
				phis[event] = phi(tableFor(event, journal));
		}
	}
	return phis;
}

// can be shortened using forEach.
function gatherCorrelations(journal) {
	var phis = {};
	journal.forEach(function(entry) {
		entry.events.forEach(function(event) {
			if (!(event in phis))
				phis[event] = phis(tableFor(event, journal));
		});
	});
	return phis;
}


Higher-Order Functions
=============================================================================================
// functions taht create new functions.
function greaterThan(n) {
	return function(m){ return m > n; };
}

var greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// -> true

// functions that change other functions.
function noisy(f) {
	return function(arg) {
		console.log("calling with", arg);
		var val = f(arg);
		console.log("called with", arg, "- got", val);
		return val;
	};
}
noisy(Boolean)(0);
// -> calling with 0
// -> called with 0 - got false

// functions that provide new types of control flow.
function unless(test, then) {
	if (!test) then();
}
function repeat(times, body) {
	for (var i = 0; i < times; i++) {
		body(i); // body(); will just run 'times' many times without being passed an argument.
	}
}

repeat(3, function(n) {
	unless(n % 2, function(){
		console.log(n, "is even");
	});
});
// -> 0 is even
// -> 2 is even


Passing along Arguments
=============================================================================================
// The function it returns passes all of the given arguments, and only those arguments, to f.
// It does this by passing its own arguments object to apply. The first argument to apply,
// for which we are passing null here, can be used to simulate a method call.
function transparentWrapping(f) {
	return function(){
		return f.apply(null, arguments);
	};
}

JSON - JavaScript Object Notation - data storage and communication format
=============================================================================================
[
  {"name": "Emma de Milliano", "sex": "f",
   "born": 1876, "died": 1956,
   "father": "Petrus de Milliano",
   "mother": "Sophia van Damme"},
  {"name": "Carolus Haverbeke", "sex": "m",
   "born": 1832, "died": 1905,
   "father": "Carel Haverbeke",
   "mother": "Maria van Brussel"},
  … and so on
]

// JSON.stringify
var string = JSON.stringify({name: "X", born: 1980});
console.log(string);
// -> {"name":"X","born":1980}
console.log(JSON.parse(string).born);
// -> 1980

var ancestry = JSON.parse(ANCESTRY_FILE);
console.log(ancestry.length);
// -> 39


Filtering an Array
=============================================================================================
function filter(array, test) {
	var passed = []; // builds up a new array with the elements that pass the test. It is a pure function.
	for (var i = 0; i < array.length; i++) {
		if (test(array[i]))
			passed.push(array[i]); // only the elements that pass the test will be pushed.
	}
	return passed;
}

console.log(filter(ancestry, function(person){
	return person.born > 1900 && person.born < 1925; // predicate that returns true or false
}));

// filter is also a standard method on arrays.
console.log(ancestry.filter(function(person){
	return person.father == "Carel Haverbeke";
}));
// -> [{name: "Carolus Haverbeke", ...}]


Transforming with Map - The new array will have its elements to be "mapped" to a new form by the function.
=============================================================================================
function map(array, transform) {
	var mapped = [];
	for (var i = 0; i < array.length; i++) {
		mapped.push(transform(array[i]));
	}
	return mapped;
}

var overNinety = ancestry.filter(function(person){
	return person.died - person.born > 90;
});
console.log(map(overNinety, function(person){
	return person.name; // each element will be mapped as here.
}));
// -> ["Clara Aernoudts", "Emile Haverbeke", "Maria Haverbeke"]


Summarizing with Reduce - computing a single value from an array. (Noteworthy *****)
=============================================================================================
function reduce(array, combine, start) {
	var current = start;
	for (var i = 0; i < array.length; i++) {
		current = combine(current, array[i]);
	}
	return current;
}

console.log(reduce([1, 2, 3, 4], function(a, b){
	return a + b;
}, 0));
// -> 10

// Use reduce to find the most ancient known ancestor. (Noteworthy *****)
console.log(ancestry.reduce(function(min, cur){
	if (cur.born < min.born) return cur;
	else return min;
}));
// -> {name: "Pauwels van Haverbeke", sex: "m", born: 1535, died: 1582, father: "N. van Haverbeke"…}


Composability (Noteworthy *****)
=============================================================================================
// Finding the person with the earliest year of birth without higher-order functions.
var min = ancestry[0];
for (var i = 1; i < ancestry.length; i++) {
	var cur = ancestry[i];
	if (cur.born < min.born)
		min = cur;
}
console.log(min);
// -> {name: "Pauwels van Haverbeke", sex: "m", born: 1535, died: 1582, father: "N. van Haverbeke"…}

// Find the average age for men and for women in the data set.
function average(array) {
	function plus(a, b) { return a + b; }
	return array.reduce(plus) / array.length; // computing average
}
function age(p) { return p.died - p.born; } // computing age
function male(p) { return p.sex == "m"; }   // determining sex
function female(p) { return p.sex == "f"; } // determining sex

console.log(average(ancestry.filter(male).map(age))); // Noteworthy: *******
// -> 61.67
console.log(average(ancestry.filter(female).map(age)));
// -> 54.56


// The cost
=============================================================================================
- Function calls in JavaScript are costly compared to simple loop bodies.
- Abstractions add layers between the raw things the computer is doing and the concepts we are
  working with thus cause the machine to perform more work.
- If you have a loop inside a loop, the code inside the inner loop will be running N x M times.
- If that inner loop contains another loop that makes P rounds, its body will run M x N x P times.


Great-Great-Great-Great (Difficulty *******)
=============================================================================================
var byName = {};
// Build up an object that associates names with people.
ancestry.forEach(function(person){
	byName[person.name] = person; // save in the new object 'byName' as name : object pair.
});

// Given a person, a fnction to combine values from the two parents of a given person, and a default value,
// condenses a value from a family tree.
function reduceAncestors(person, f, defaultValue) {
	function valueFor(person) {
		if (person == null) {
			return defaultValue;
		} else {
			return f(person, valueFor(byName[person.mother]),
											 valueFor(byName[person.father]));
		}
	}
	return valueFor(person);
}
// The inner function (valueFor) handles a single person. Through the magic of recursion, it can simply
// call itself to handle the father and the mother of this person.

function sharedDNA(person, fromMother, fromFather) {
	if (person.name == "Pauwels van Haverbeke") {
		return 1;
	} else {
		return (fromMother + fromFather) / 2;
	}
}
var ph = byName["Philibert Haverbeke"];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);

// Find the percentage of known ancestors for a given person who lived paset 70.
function countAncestors(person, test) {
	function combine(person, fromMother, fromFather) {
		var thisOneCounts = test(person);
		return fromMother + fromFather + (thisOneCounts ? 1 : 0);
	}
	return reduceAncestors(person, combine, 0);
}
function longLivingPercentage(person) {
	var all = countAncestors(person, function(person){
		return true;
	});
	var longLiving = countAncestors(person, function(person){
		return (person.died - person.born) >= 70;
	});
	return longLiving / all;
}


Binding - creates a new function that will call the original function but with some of the arguments already fixed.
=============================================================================================
// Defines a function isInSet that tells us whether a person is in a given set of strings.
var theSet = ["Carel Haverbeke", "Maria van Brussel", "Donald Duck"];
function isInSet(set, person) {
	return set.indexOf(person.name) > -1;
}

console.log(ancestry.filter(function(person){
	return isInSet(theSet, person);
}));
// → [{name: "Maria van Brussel", …},
//    {name: "Carel Haverbeke", …}]

console.log(ancestry.filter(isInSet.bind(null, theSet)));
// → … same result

// The call to bind returns a function that will call isInSet with theSet as first argument.


Summary
=============================================================================================
Arrays provide a number of higher-order methods:
- forEach to do something with each element in an array.
- filter to build a new array with some elements filtered out.
- map to build a new array where each element has been put through a function.
- reduce to combine all an array`s elements into a single value.

Functions have:
- apply method that can be used to call them with an array specifying their arguments.
- bind which is used to create a partially applied version of the function.


Exercises (Difficulty ********) (Noteworthy ********)
=============================================================================================
// Q. Flattening
var flatten = function(array) {
	return array.reduce(function(memo, elem){
		return memo.concat(elem);
	});
};

var arrays = [[1, 2, 3], [4, 5], [6]];
console.log(flatten(arrays));
// → [1, 2, 3, 4, 5, 6]


// Q. Mother-child age difference (Difficulty *******)
function average(array) {
	function plus(a, b) { return a + b; }
	return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person){
	byName[person.name] = person;
});

var differences = ancestry.filter(function(person){
	return byName[person.mother] != null; // person with mothers available as a person.
}).map(function(person){
	return person.born - byName[person.mother].born; // finding differences with its children's and mom's
});

console.log(average(differences));
// → 31.2


// Q. Historical life expectancy (Difficulty ********)
function average(array) {
	function plus(a, b) { return a + b; }
	return array.reduce(plus) / array.length;
}

function groupBy(array, groupOf) {
	var groups = {};
	array.forEach(function(element){
		var groupName = groupOf(element);
		if (groupName in groups)
			groups[groupName].push(element);
		else
			groups[groupName] = [element];
	});
	return groups;
}

var byCentury = groupBy(ancestry, function(person){
	return Math.ceil(person.died / 100);
});

for (var century in byCentury) {
	var ages = byCentury[century].map(function(person){
		return person.died - person.born;
	});
	console.log(century + ": " + average(ages));
}


// Q. Every and then some
function every(array, predicate) {
	for (var i = 0; i < array.length; i++) {
		if (!predicate(array[i]))
			return false;
	}
	return true;
}

function some(array, predicate) {
	for (var i = 0; i < array.length; i++) {
		if (predicate(array[i]))
			return true;
	}
	return false;
}
