// Each
=========================================================================
var each = function(list, iteratee) {
	if (Array.isArray(list)) {
		for (var i = 0; i < list.length; i++) {
			iteratee(list[i], i, list);
		}
	} else if (list.constructor === Object) {
		for (var key in list) {
			iteratee(list[key], key, list);
		}
	}
};

// Map (Difficulty *) Note that iteratee takes 3 parameters: element, index, list
=========================================================================
// Explicit style
var map = function(list, iteratee) {
	var result = [];
	if (Array.isArray(list)) {
		for (var i = 0; i < list.length; i++) {
			result.push(iteratee(list[i]), i, list);
		}
	} else if (list.constructor === Object) {
		for (var key in list) {
			result.push(iteratee(list[key], key, list));
		}
	}
	return result;
};

// Functional style
var map = function(list, iteratee) {
	var result = [];
	_.each(list, function(element, index){
		result.push(iteratee(element, index, list));
	});
	return result;
};

// Reduce (Difficulty *****) Object part is tricky
=========================================================================
// Explicit style
var reduce = function(list, iteratee, initial) {
	if (Array.isArray(list)) {
		var start;
		if (arguments.length === 3) {
			start = initial;
			for (var i = 0; i < list.length; i++) {
				start = iteratee(start, list[i], i);
			}
		} else {
			start = list[0];
			for (var i = 1; i < list.length; i++) {
				start = iteratee(start, list[i], i);
			}
		}
	}
	if (list.constructor === Object) {
		var start;
		if (arguments.length === 3) {
			start = initial;
			for (var key in list) {
				start = iteratee(start, list[key], key);
			}
		} else {
			start = list[Object.keys(list)[0]]; // Object.keys({one: 1, two: 2, three: 3}) returns ["one", "two", "three"]
			delete list[Object.keys(list)[0]];	// Delete the first property to avoid duplication
			for (var key in list) {
				start = iteratee(start, list[key], key);
			}
		}
	}

	return start;
};

// Functional style (not working without memo)
var reduce = function(list, iteratee, memo) {
	var memo = memo || list[0] || list[Object.keys(list)[0]];
	_.each(list, function(element, index, list){
		memo = iteratee(memo, element, index, list);
	});
	return memo;
};
