Chapter: 2. Program Structure
=============================================================================================
// 2.1 Looping a triangle (Difficulty ***)
var triangle = '';
var block = '#';
for (var lines = 1; lines <= 7; lines++) {
	triangle += block + '\n'; // Keep in mind of new line
	block += '#';
}
console.log(triangle);

// 2.2 FizzBuzz (Difficulty *)
for (var i = 1; i <= 100; i++) {
	if (i % 3 === 0 && i % 5 === 0) {
		console.log('FizzBuzz');
	} else if (i % 3 === 0) {
		console.log('Fizz');
	} else if (i % 5 === 0) {
		console.log('Buzz');
	} else {
		console.log(i);
	}
}

// 2.3 Chess board (Difficulty ****)
function drawChessBoard(x, y) {
	var output = '';
	var oddRow = '';
	var evenRow = '';
	for (var i = 1; i <= x; i++) {
		if (i % 2 !== 0) {
			oddRow 	+= ' ';
			evenRow += '#';
		} else {
			oddRow	+= '#';
			evenRow	+= ' ';
		}
	}
	for (var j = 1; j <= y; j++) {
		if (j % 2 !== 0) {
			output += oddRow 	+ '\n';
		} else {
			output += evenRow + '\n';
		}
	}
	console.log(output);
}


Chapter: 3. Functions
=============================================================================================
// 3.1 Minimum (Difficulty *)
var min = function(num1, num2) {
	return num2 > num1 ? num1 : num2;
};

// 3.2 Recursion (Difficulty *)
function isEven(num) {
	if (num === 2) { // num is even
		return true
	} else if (num < 2) { // num is odd
		return false;
	} else {
		return isEven(num - 2);
	}
}

// 3.3 Bean counting (Difficulty *)
var countBs = function(str) {
	var count = 0;
	for (var i = 0; i < str.length; i++) {
		if (str[i].toUpperCase() === 'B')
			count++;
	}
	return count;
};

var countChar = function(str, char) {
	var count = 0;
	for (var i = 0; i < str.length; i++) {
		if (str[i] === char)
			count++;
	}
	return count;
};


Chapter: 4. Data Structures: Objects and Arrays
=============================================================================================
// 4.1 The sum of a range (Difficulty **)
var range = function(start, end) {
	var result = [];
	for (var i = start; i <= end; i++) {
		result.push(i);
	}
	return result;
};

var sum = function(array) {
	function plus(a, b) { return a + b; }
	return array.reduce(plus);
};

var range = function(start, end, step) {
	step = undefined ? 1 : step;
	var result = [];
	if (start < end) {
		for (var i = start; i <= end; i += step) {
			result.push(i);
		}
	} else {
		for (var i = start; i >= end; i += step) {
			result.push(i);
		}
	}
	return result;
};

// 4.2 Reversing an array (Difficulty ***)
var reverseArray = function(array) {
	var result = [];
	for (var i = array.length - 1; i >= 0; i--) {
		result.push(array[i]);
	}
	return result;
};

var reverseArrayInPlace = function(array) {
	var length = Math.floor(array.length / 2);
	var temp;
	for (var i = 0; i < length; i++) {
		temp = array[i];
		array[i] = array[array.length - 1 - i];
		array[array.length - 1 - i] = temp;
	}
	return array;
};

// 4.3 A List (Difficulty *******)
function arrayToList(array) { // very similar to reduce
	var list = null;
	for (var i = array.length - 1; i >= 0; i--) { // Looping backwards
		list = { value: array[i], rest: list };
	}
	return list;
}

function listToArray(list) {
	var array = [];
	for (var node = list; node; node = node.rest) // what's going on?
		array.push(node.value);
	return array;
}

function prepend(value, list) {
	return { value: value, rest: list };
}

function nth(list, n) {
	if (!list)
		return undefined;
	else if (n == 0)
		return list.value;
	else
		return nth(list.rest, n - 1);
}

// 4.4 Deep comparison (Difficulty *******)
function deepEqual(a, b) {
  if (a === b) return true; // short-circuiting
  
  if (a == null || typeof a != "object" || // checking validity of a
      b == null || typeof b != "object")	 // checking validity of b
    return false;
  
  var propsInA = 0, propsInB = 0; // counters

  for (var prop in a)
    propsInA += 1; // counting properties

  for (var prop in b) {
    propsInB += 1; // counting properties
    if (!(prop in a) || !deepEqual(a[prop], b[prop])) // if the property is false or props are not equal,
      return false;
  }

  return propsInA == propsInB; // finally checking no. of props
}


Chapter: 5. Higher-Order Functions
=============================================================================================
// 5.1 Flattening
var flatten = function(array) {
	return array.reduce(function(memo, element){
		return memo.concat(element);
	});
};

// 5.2 Mother-child age difference (Difficulty ******)
function average(array) {
	function plus(a, b) { return a + b; }
	return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person){
	byName[person.name] = person; // save as name
});

var differences = ancestry.filter(function(person){
	return byName[person.mother] != null; // child who has his/her mother in the data set. // != for null check.
}).map(function(person){
	return person.born - byName[person.mother].born;
});

console.log(average(differences));

// 5.3 Historical life expectancy (Difficulty *******)
function average(array) {
	function plus(a, b) { return a + b; }
	return array.reduce(plus) / array.length;
}

function groupBy(array, groupOf) {
	var groups = {};
	array.forEach(function(element){
		var groupName = groupOf(element); // set group name
		if (groupName in groups) { // check if the group name exists in the group
			groups[groupName].push(element);
		} else {
			groups[groupName] = [element];
		}
	});
	return groups;
}

var byCentury = groupBy(ancestry, function(person){ // grouping person objects in each array by century
	return Math.ceil(person.died / 100);
});

for (var century in byCentury) {
	var ages = byCentury[century].map(function(person){ // mapping ages to an age variable.
		return person.died - person.born; // computing and mapping age over person objects.
	});
	console.log(century + ": " + average(ages)); // logging average age for each century in byCentury object.
}
// result:
						16: 43.5
						17: 51.2
						18: 52.78947368421053
						19: 54.833333333333336
						20: 84.66666666666667
						21: 94

// 5.4 Every and then some (Difficulty **)
var every = function(array, predicate) {
	for (var i = 0; i < array.length; i++) {
		if (!predicate(array[i])) {
			return false;
		}
	}
	return true;
};

var some = function(array, predicate) {
	for (var i = 0; i < array.length; i++) {
		if (predicate(array[i])) {
			return true;
		}
	}
	return false;
};
