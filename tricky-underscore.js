// Each (Difficulty **)
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

// Map (Difficulty *) Note that iteratee takes 3 parameters: element, index, list
=========================================================================
var map = function(list, iteratee) {
	var result = [];

	_.each(list, function(element, index){
		result.push(iteratee(element, index, list));
	});

	return result;
};

// Reduce (Difficulty *****) Two things: a flag, and memo inside _.each with if-else statement.
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

// Find (Difficulty ****) Beware of my final return statement. Each doesn't return anything.
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

// Filter (Difficulty *)
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

// Reject (Difficulty *) Just an opposite of Filter.
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

// Every (Difficulty **) Note where true should be located.
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

// Some (Difficulty **) Just an opposite of Every.
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

// Contains (Difficulty *)
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

// Invoke (Difficulty ****)
=========================================================================
var invoke = function(list, methodName) {
	var result = [];
	
	_.each(list, function(elem){
		result.push(elem[methodName].call(elem));
	});

	return result;
};

// Pluck (Difficulty *****) Be careful about the return value..!!
=========================================================================
var pluck = function(list, propertyName) {
	return _.map(list, function(elem){
		return elem[propertyName];
	});
};
