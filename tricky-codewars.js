// 1. Simple Adding (Difficulty *)
=============================================================================================
var simpleAdding = function(num) {
	var total = 0;
	for (var i = 1; i <= num; i++) {
		total += i;
	}
	return total;
};

// 2. Letter Capitalize (Difficulty ****)
=============================================================================================
var letterCapitalize = function(str) {
	var words = str.split(' ');
	return words.map(function(word){ // to return an array, use map.
		var temp = word.split('');
		temp[0] = temp[0].toUpperCase(); // must save it
		return temp.join('');
	}).join(' ');
};

// 3. Leap Year: (Difficulty *)
=============================================================================================
var isLeapYear = function(year) {
	if ( (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0) ) {
		console.log(year + ' is a leap year');
		return true;
	} else {
		console.log(year + ' is not a leap year');
		return false;
	}
};

// 4. Flatten and Add
=============================================================================================
var flattenAndAdd = function(array) {
	return array.reduce(function(memo, elem){
		return memo.concat(elem);
	}).reduce(function(memo, elem){
		return memo + elem;
	});
};

// 5. Binary Search (Difficulty *)
=============================================================================================
var binarySearch = function(array, target) {
	var result = -1;
	for (var i = 0; i < array.length; i++) {
		if (array[i] === target) {
			result = i;
		}
	}
	return result;
};

// 6. Remove Value (7 kyu)
=============================================================================================
var removeValue = function(array, value) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] === value) {
			array.splice(i, 1);
			i--; // if we don't decrement it after splicing, the last element won't be looped.
		}
	}
	return array;
};

// 7. Unique Push (7 kyu)
=============================================================================================
var uniquePush = function(arr, obj) {
	if (obj.phoneNumber && !arr.some(function(entry){ entry.phoneNumber === obj.phoneNumber; }))
		return arr.push(obj);
}

// 8. Unique Pairs - Letting each student has a chance to partner with every other student.
=============================================================================================
function projectPartners(n) {
	return n * (n - 1) / 2;
}

// 9. Smallest Value (7 kyu)
=============================================================================================
var min = function(array, option) {
	var myArr = array.slice().sort(function(a, b){ return a - b; }); // Not to confuse slice with splice.
	if (option === 'value') {
		return myArr[0];
	} else if (option === 'index') {
		return array.indexOf(myArr[0]);
	}
};

// 10. Reverse String (7 kyu)
=============================================================================================
var reverse = function(str) {
	var myStr = str;
	return myStr.split('').reverse().join('');
};

// 11. Number of Occurrences (7 kyu)
=============================================================================================
var numberOfOccurrences = function(array, value) {
	var count = 0;
	array.forEach(function(elem){
		if (elem === value) {
			count++;
		}
	});
	return count;
};

// 12. Disemvowel Trolls (7 kyu)
=============================================================================================
var disemvowel = function(str) {
	var result = '';
	var vowels = 'aeiou';
	for (var i = 0; i < str.length; i++) {
		if (!(vowels.indexOf(str[i].toLowerCase()) != -1))  {
			result += str[i];
		}
	}
	return result;
};

// 13. Descending Order (7 kyu)
=============================================================================================
var descendingOrder = function(n) {
	var myN = n;
	return parseInt(n.toString().split('').sort(function(a,b){return b-a;}).join(''));
};

// 14. Zero Fill (6 kyu) - Beware of deriving length.
=============================================================================================
var zeroFill = function(number, size) {
	var result = '';
	var len = size - number.toString().length; // size is used unmodified.
	for (var i = 0; i < len; i++) {
		result += 0;
	}
	result += number;
	return result;
};

// 15. WeIrD StRiNg CaSe (6 kyu) (Noteworthy ******)
=============================================================================================
var toWeirdCase = function(str) {
	var words = str.slice().split(' ');
	for (var i = 0; i < words.length; i++) {
		words[i] = words[i].split('');
		for (var j = 0; j < words[i].length; j++) {
			if (j % 2 === 0) {
				words[i][j] = words[i][j].toUpperCase(); // don't forget to save the change.
			} else {
				words[i][j] = words[i][j].toLowerCase(); // don't forget to save the change.
			}
		}
		words[i] = words[i].join('');
	}
	return words.join(' ');
};

// functional style
function toWeirdCase(string) {
	return string.split(' ').map(function(word){
		return word.split('').map(function(letter, index){
			return index % 2 == 0 ? letter.toUpperCase() : letter.toLowerCase();
		}).join('');
	}).join(' ');
}

// 16. Throwing Darts (6 kyu)
=============================================================================================
var scoreThrows = function(radiuses) {
	var score = 0;
	
	for (var i = 0; i < radiuses.length; i++) {
		if (radiuses[i] < 5) {
			score += 10;
		} else if (radiuses[i] <= 10) {
			score += 5;
		} else {
			score += 0;
		}
	}

	if (radiuses.length > 0 && radiuses.every(function(point){ return point < 5 })) {
		score += 100;
	}

	return score;
};

// 17. Range([start], stop, [step]) (6 kyu) (Difficulty *****)
=============================================================================================
var range = function(args) {
	var result = [];
	var start,
			stop,
			step;
	if (arguments.length === 1) {
		start = 0;
		stop = arguments[0];
		step = 1;
	}
	if (arguments.length === 2) {
		start = arguments[0];
		stop = arguments[1];
		step = 1;
	}
	if (arguments.length === 3) {
		start = arguments[0];
		stop = arguments[1];
		step = arguments[2];
	}
	if (start < stop && step !== 0) {
		for (var i = start; i < stop; i += step) {
			result.push(i);
		}
	} else if (start < stop && step === 0) {
		for (var i = start; i < stop; i++) {
			result.push(1);
		}
	} else if (arguments.length === 1 && arguments[0] === 0) {
		return result;
	}
	return result;
};

// 18. Square Sum (6 kyu)
=============================================================================================
var squareSum = function(array) {
	return array.slice().map(function(elem){
		return elem * elem;
	}).reduce(function(memo, elem){
		return memo + elem;
	});
};

// 19. Is Prime (6 kyu) (Noteworthy *****)
=============================================================================================
// A prime number(or a prime) is a natural number greater than 1 that has no positive divisor
// other than 1 and itself.
var isPrime = function(n) {
	for (var i = 2; i < n; i++) {
		if (n % i === 0) {
			return false;
		}
	}
	return n >= 2; // is better than explicitly setting if (n < 2) { return false }
};

// 20. Compose (6 kyu) (Difficulty ******)
=============================================================================================
var compose = function(func1, func2) {
	return function(arg) {
		return func1(func2(arg));
	};
};

// Note that callback needs to have a return statement inside {}.
var add2ThenTimes3 = compose(function(n){ return n * 3 }, function(n){ return n + 2; });
add2ThenTimes3(5) // 21

// 21. Don't rely on luck (6 kyu)
=============================================================================================
var lucky_number = Mathh.floor(Math.random() * 100 + 1);
var guess = 1; // should equal lucky_number

Math.random = function(n) { return 0; };

// 22. Prime Time (5 kyu) (Noteworthy ******)
=============================================================================================
var prime = function(n) {
	var result = [];
	var isPrime = function(n) {
		for (var i = 2; i < n; i++) {
			if (n % i === 0) {
				return false;
			}
		}
		return n >= 2;
	};
	for (var i = 1; i <= n; i++) {
		result.push(i);
	}
	result = result.filter(isPrime);
	return result;
};
