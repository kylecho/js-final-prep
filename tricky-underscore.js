=========================================================================
Collection methods
=========================================================================
// 1. Each (Noteworthy *****)
=========================================================================
var each = function(list, iteratee) {
	if (Array.isArray(list)) {
		for (var i = 0; i < list.length; i++) {
			iteratee(list[i], i, list); // element, index, list
		}
	} else if (list.constructor === Object) {
		for (var key in list) { // In most case, properties are iterated in the order they were created.
			iteratee(list[key], key, list); // value, key, list
		}
	}
};

// 2. Map (Difficulty *) Note that iteratee takes 3 parameters: element, index, list
=========================================================================
var map = function(list, iteratee) {
	var result = [];

	_.each(list, function(element, index){
		result.push(iteratee(element, index, list));
	});

	return result;
};

// 3. Reduce (Difficulty *****) Two things: a flag, and memo inside _.each with if-else statement.
=========================================================================
var reduce = function(list, iteratee, memo){  
  var memoUndefined = arguments.length < 3; // trigger

  _.each(list, function(elem, index, list){
    if (memoUndefined) { 		 // If trigger is true (no initial memo)
      memoUndefined = false; // Set trigger to false (because now we have memo)
      memo = elem;					 // Set memo equals first value. This happenes once.
    } else {
    	memo = iteratee(memo, elem, index, list); // This will run from 1st(with memo) or 2nd(without memo) iteration.
    }
  });

  return memo;
};

// Reduce Right
var reduceRight = function(list, iteratee, memo) {
	list = list.reverse(); // Flip the order of list.
	var memoUndefined = arguments.length < 3;

	_.each(list, function(elem, index){
		if (memoUndefined) {
			memoUndefined = false;
			memo = elem;
		} else {
			memo = iteratee(memo, elem, index, list);
		}
	});

	return memo;
};

// 4. Find (Difficulty ****) Beware of my final return statement. Each doesn't return anything.
=========================================================================
var find = function(list, predicate) {
	var found;

	_.each(list, function(elem){
		if (!found && predicate(elem)) {
			return found = elem;
		}
	});

	return found;
};

// 5. Filter (Difficulty *)
=========================================================================
var filter = function(list, predicate) {
	var result = [];
	
	_.each(list, function(elem){
		if (predicate(elem)) {
			result.push(elem);
		}
	})

	return result;
};

// 6. Reject (Difficulty *) Just an opposite of Filter.
=========================================================================
var reject = function(list, predicate) {
	var result = [];

	_.each(list, function(elem){
		if (!predicate(elem)) {
			result.push(elem);
		}
	});

	return result;
};

// 7. Every (Difficulty **) Note where true should be located.
=========================================================================
var every = function(list, predicate) {
	var result = true;
	
	_.each(list, function(elem){
		if (!predicate(elem)) {
			result = false;
		}
	});

	return result;
};

// 8. Some (Difficulty **) Just an opposite of Every.
=========================================================================
var some = function(list, predicate) {
	var result = false;

	_.each(list, function(elem){
		if (predicate(elem)) {
			result = true;
		}
	});

	return result;
};

// 9. Contains (Difficulty *)
=========================================================================
var contains = function(list, value) {
	var result = false;

	_.each(list, function(elem){
		if (elem === value) {
			result = true;
		}
	});

	return result;
};

// 10. Invoke (Difficulty ****)
=========================================================================
var invoke = function(list, methodName) {
	var result = [];
	
	_.each(list, function(elem){
		result.push(elem[methodName].call(elem));
	});

	return result;
};

// 11. Pluck (Difficulty *****) Be careful about the return value..!!
=========================================================================
var pluck = function(list, propertyName) {
	return _.map(list, function(elem){
		return elem[propertyName];
	});
};

// 12. Shuffle (Difficulty ******) Should revisit to fully understand.
=========================================================================
var shuffle = function(list) {
	var rand;
	var index = 0;
	var randomized = [];

	_.each(list, function(elem){
		rand = Math.floor(Math.random() * index++);
		randomized[index - 1] = randomized[rand];
		randomized[rand] = elem;
	});

	return randomized;
};

// 13. Size (Difficulty *)
=========================================================================
var size = function(list) {
	if (Array.isArray(list)) {
		return list.length;
	} else {
		var count = 0;
		for (var key in list) {
			count++;
		}
	}
	return count;
};

// 14. Partition (Difficulty *)
=========================================================================
var partition = function(array, predicate) {
	var result = [[],[]];

	_.each(array, function(elem){
		if (predicate(elem)) {
			result[0].push(elem);
		} else {
			result[1].push(elem);
		}
	});

	return result;
};
=========================================================================
Array methods
=========================================================================
// 1. First (Difficulty **) Takes an optional length argument.
=========================================================================
var first = function(array) {
	if (arguments.length < 2) {
		return array[0];
	} else {
		return array.slice(0, arguments[1]);
	}
};

// 2. Initial (Difficulty **) Takes an optional length argument.
=========================================================================
var initial = function(array) {
	if (arguments.length < 2) {
		return array.slice(0, array.length - 1);
	} else {
		return array.slice(0, array.length - arguments[1]);
	}
};

// 3. Last (Difficulty **) Note on slice handling.
=========================================================================
var last = function(array) {
	if (arguments.length < 2) {
		return array[array.length - 1];
	} else {
		return array.slice(array.length - arguments[1], array.length);
	}
};

// 4. Rest (Difficulty *)
=========================================================================
var rest = function(array) {
	if (arguments.length < 2) {
		return array.slice(1, array.length);
	} else {
		return array.slice(arguments[1], array.length);
	}
};

// 5. Compact (Difficulty **)
=========================================================================
var compact = function(array) {
	var result = [];
	
	_.each(array, function(e){
		if (!(e == false || e == null || e == 0 || e == "" || e == undefined || e == NaN)) {
			result.push(e);
		}
	});
	
	return result;
};

// 6. Flatten (Difficulty *****) Think about each cases.
=========================================================================
var flatten = function flatten(array) {
	if (arguments[1] === true) { // shallow is true: concat once, and return.
		return _.reduce(array, function(memo, elem){
			return memo.concat(elem);
		}, []);
	// concat recursively until there's no more nested arrays.
	} else if (_.some(array, function(e){return Array.isArray(e)})) {
		return flatten(_.reduce(array, function(memo, elem){
			return memo.concat(elem);
		}, []));
	} else { // finally, return the array.
		return array;
	}
};

// 7. Without (Difficulty *)
=========================================================================
var without = function(array) {
	var values = Array.prototype.slice.call(arguments).slice(1);
	var output = [];

	_.each(array, function(elem){
		if (!(_.some(values, function(val){ return elem === val; }))) {
			output.push(elem);
		}
	});

	return output;
};

// 8. Union (Difficulty *)
=========================================================================
var union = function(args) {
	var arrays = Array.prototype.slice.call(arguments).slice();
	var output = [];

	var myArr = _.reduce(arrays, function(memo, elem){
		return memo.concat(elem);
	});

	_.each(myArr, function(e){
		if (output.indexOf(e) == -1) {
			output.push(e);
		}
	});

	return output;
};

// 9. Intersection (Difficulty ******) I do not know this.
=========================================================================
var contains = function(list, value) {
  var result = false;
  _.each(list, function(elem){
    if (elem === value) {
      result = true;
    }
  });
  return result;
};

var intersection = function(array) {
  var result = [];
  var argsLength = arguments.length;
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (_.contains(result, item)) continue;
    for (var j = 1; j < argsLength; j++) {
      if (!_.contains(arguments[j], item)) break;
    }
    if (j === argsLength) result.push(item);
  }
  return result;
};

// 10. Uniq (Difficulty *)
=========================================================================
var uniq = function(array) {
	var output = [];

	_.each(array, function(elem){
		if (output.indexOf(elem) == -1) {
			output.push(elem);
		}
	});

	return output;
};

// 11. IndexOf (Difficulty ***)
=========================================================================
var indexOf = function(array, value) {
	var result = -1;

	_.each(array, function(elem, index){
		if (elem === value && result === -1) {
			result = index;
		}
	});

	return result;
};

// 12. Last IndexOf (Difficulty **) Because I used a for loop.
=========================================================================
var lastIndexOf = function(array, value) {
	var result = -1;

	for (var i = array.length - 1; i >= 0; i--) {
		if (array[i] === value && result === -1) {
			result = i;
		}
	}

	return result;
};

// 13. Find Index (Difficulty *)
=========================================================================
var findIndex = function(array, predicate) {
	var result = -1;

	_.each(array, function(elem, index){
		if (predicate(elem) && result === -1) {
			result = index;
		}
	});

	return result;
};

// 14. Find Last Index (Difficulty *) I used a for loop.
=========================================================================
var findLastIndex = function(array, predicate) {
	var result = -1;

	for (var i = array.length - 1; i >= 0; i--) {
		if (predicate(array[i]) && result === -1) {
			result = i;
		}
	}

	return result;
};

// 15. Range (Difficulty ***) Wow! I did it!
=========================================================================
var range = function(args) {
	var result = [];

	if (arguments.length === 1) {
		for (var i = 0; i < arguments[0]; i++) {
			result[i] = i;
		}
	} else if (arguments.length === 2) {
		for (var i = arguments[0]; i < arguments[1]; i++) {
			result.push(i);
		}
	} else if (arguments.length === 3) {
		if (arguments[0] > arguments[1] && 0 > arguments[2]) {
			for (var i = arguments[0]; i > arguments[1]; i += arguments[2]) {
				result.push(i);
			}
		} else {
			for (var i = arguments[0]; i < arguments[1]; i += arguments[2]) {
				result.push(i);
			}
		}
	}

	return result;
};
=========================================================================
Function methods
=========================================================================
// 1. Throttle (Difficulty ***)
=========================================================================
var throttle = function(callback, wait) {
	var called = false;
	return function(){
		if (!called) {
			called = true;
			setTimeout(function(){ called = false; }, wait);
			return callback();
		} else {
			return console.log('Wait period has not passed yet.');
		}
	};
};

// 2. Once (Difficulty **)
=========================================================================
var once = function(callback) {
	var called = false;
	return function(){
		if (!called) {
			called = true;
			return callback();
		} else {
			return false;
		}
	};
};

// 3. After (Difficulty **)
=========================================================================
var after = function(count, callback) {
	var innerCount = 0;
	return function(){
		if (innerCount < count) {
			innerCount++;
		} else {
			return callback();
		}
	};
};

// 4. Before (Difficulty **)
=========================================================================
var before = function(count, callback) {
	var innerCount = count;
	return function(){
		if (count > 0) {
			count--;
			return callback();
		} else {
			console.log('Maximum call has reached. Ask for a raise.');
		}
	};	
};

// 5. Compose (Difficulty *****)
=========================================================================
var compose = function(callback1, callback2) {
	return function(callback3) {
		return callback1(callback2(callback3));
	}
};
