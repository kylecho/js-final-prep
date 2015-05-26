Final Re-cap

// 1. Array Addition I (Difficulty *****)
ArrayAdditionI(arr) take the array of numbers stored in arr and return the string true if any combination of 
numbers in the array can be added up to equal the largest number in the array, otherwise return the string
false. For example: if arr contains [4, 6, 23, 10, 1, 3] the output should return true because
4 + 6 + 10 + 3 = 23. The array will not be empty, will not contain all the same elements, and may contain
negative numbers.
==============================================================================================================
var arrayAddition = function(array) {
	var largest = array.slice().sort(function(a, b){ return a - b; }).pop();

	var recursion = function recursion(target, array) {
		if (array.length === 0) {
			return target === 0;
		} else {
			var deduct = array.shift(); // wrong it should have been -> array[0];
			// array = array.slice(1); // was missing
			return recursion(target - deduct, array) || recursion(target, array);
		}
	};

	return recursion(largest, myArr); // should be returned otherwise the whole 'arrayAddition' will return 'undefined'
};

// Time: 8 min
// Expected result: arrayAddition([4, 6, 23, 10, 1, 3]) // -> true
// Actual result  : arrayAddition([4, 6, 23, 10, 1, 3]) // -> undefined
// Do I know it?: No
// Why was it wrong?: largest is set to be smallest. It should have been using 'pop()' instead of 'shift()'.
// I did not set 'array = array.slice(1)' for every recursion which is a must for this problem. Also,
// a variable that is deducted from the target value for the recursion should just set its value by just
// assigning it to be the first of the array element. 'var n = array[0]' Array reducing is handled by
// 'array = array.slice(1)' from the above. Lastly, the recursion() should be returned.


// 2. Mean Mode (Difficulty ****)
take the array of numbers stored in arr and return 1 if the mode equals the mean, 0 if they don`t equal each
other (ie. [5, 3, 3, 3, 1] should return 1 because the mode (3) equals the mean (3)). The array will not be 
empty, will only contain positive integers, and will not contain more than one mode. 
==============================================================================================================
function MeanMode(arr) {
  var modeCount = {};
  var mode;
  var mean;
  var sum = 0;
  var count = 0;
  
  for ( var i = 0; i < arr.length; i++ ) { // buid up sum and modeCount simultaneously.
    sum += arr[i];
    modeCount[arr[i]] = modeCount[arr[i]] || 0; // if existing, use it as it is. Otherwise set 0.
    modeCount[arr[i]] += 1;          //adding for the count of the number
  }
  mean = sum/arr.length;

  for( var key in modeCount ){			 // finding mode is a separate for in loop.
    if( modeCount[key] > count){     // **check the number of times a number has been seen
      mode = parseInt(key);          // if its a new highest, convert the key back into a number and set it as the current mode
      count = modeCount[key];        // set a new high count
    }
  }

  return mode === mean ? 1 : 0;      // check to see if the mode and mean are equal
}

// Time: 9 min
// Expected result: 1
// Actual result  : 0
// Do I know it?: No.
// Why was it wrong?: Finding mean and mode don't need to be a function.


// 3. Reduce (Difficulty *****)
reduce boils down a list of values into a single value. Memo is the initial state of the reduction, and each
successive step of it should be returned by iteratee. The iteratee is passed four arguments: the memo, then
the value and index (or key) of the iteration, and finally a reference to the entire list.

If no memo is passed to the initial invocation of reduce, the iteratee is not invoked on the first element
of the list. The first element is instead passed as the memo in the invocation of the iteratee on the next 
element in the list.
==============================================================================================================
var reduce = function(list, iteratee, memo) {
	var isMemo = memo; // check for memo's existence
	each(list, function(elem, i){	// loop over elements in the array
		if (!isMemo) { // memo not provided: set memo
			isMemo = true; // memo is now provided
			memo = elem; // set memo equals elem (which is the first value)
		} else { // memo provided
			memo = iteratee(memo, elem, i, list); //1st iteration when memo is initially provided, otherwise 2nd.
		}
	});

	return memo;
};

// Time: 15 min
// Expected result: n/a
// Actual result  : n/a
// Do I know it?: Yes but I will do it again for a review.
// Why was it wrong?: It was correct.

// My note: when including parameters inside each, it should also be defined in as its own parameters.
For example i. Also, always watch the name of original parameters for a function. I.e. list should be list
all the way, it should not be named array or collection. Silly but important to note.


// 4. A List (Difficulty *******)
var list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};
var list = { value: 1, rest: { value: 2, rest: { value: 3, rest: null } } };

Write a function arrayToList that builds up a data structure like the previous one when given [1, 2, 3] as
argument, and write a listToArray function that produces an array from a list. Also write the helper functions
prepend, which takes an element and a list and creates a new list that adds the element to the front of the
input list, and nth, which takes a list and a number and returns the element at the given position in the list,
or undefined when there is no such element.
==============================================================================================================
var arrayToList = function(array) {
	var rest = null; // rest is initially null.
	for (var i = array.length - 1; i >= 0; i--) {
		rest = {value: array[i], rest: rest}; // accumulating each object into rest.
	}
	return rest; // return the accumulated rest.
};

// Time: 4 min
// Expected result: n/a
// Actual result  : n/a
// Do I know it?: Yes
// Why was it wrong?: It was correct. But It's really confusing I need to review it.


// 5. Mother-child age difference (Difficulty ******)
Using the example data set from this chapter, compute the average age difference between mothers and children
(the age of the mother when the child is born).

ancestry = [
{
	"name"	: "Carolus Haverbeke",
	"sex"		: "m",
	"born"	: 1832,
	"died"	: 1905,
	"father": "Carel Haverbeke",
	"mother": "Maria van Brussel"
}, 
...];

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

==============================================================================================================
var differences = ancestry.filter(function(person){
	return byName[person.mother] != null; // What we're passing is a predicate. Valid elem will be pushed.
}).map(function(person){								// let's always use != for null check.
	return person.born - byName[person.mother].born; // This is correct.
});

console.log(average(differences)); // → 31.2

// Time: 6 min
// Expected result: n/a
// Actual result  : n/a
// Do I know it?: No
// Why was it wrong?: Because I used `filter` as if I was using `each`. `filter` is actually very similar to `map`.


// 6. Historical life expectancy (Difficulty *******)
Compute and output the average age of the people in the ancestry data set per century. A person is assigned
to a century by taking their year of death, dividing it by 100, and rounding it up, as in
Math.ceil(person.died / 100).

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}
==============================================================================================================
var groupBy = function(array, groupOf) { // groupOf is a callback function
	var groups = {};

	array.forEach(function(element){
		var groupName = groupOf(element);  // store the element's groupName
		if (groupName in groups) {				 // if a certain groupName exists `if (prop in obj)` to check a prop's existence
			groups[groupName].push(element); // groups[groupName] is an array.
		} else {
			groups[groupName] = [element];	 // if groupName is undefined, initiate it with [element] (element in an array)
		}
	});

	return groups;
};

var byCentury = groupBy(ancestry, function(person){ // grouping person objects in each array by century
	return Math.ceil(person.died / 100);
});

for (var century in byCentury) { // displaying average ages
	var ages = byCentury[century].map(function(person){ // mapping ages to the age variable.
		return person.died - person.born; // computing and mapping ages over each person objects.
	});
	console.log(century + ": " + average(ages)); // logging average age for each century in byCentury object.
}

// Time: null
// Expected result: n/a 
// Actual result  : n/a
// Do I know it?: No
// Why was it wrong?: It's just hard.


// 7. [EXTRA CREDIT] Why doesn`t the code below work? This is a function that should return an array of
functions that console.log() each person`s name as a string when invoked. Fiddle with this function and inspect
how it works, then try to fix it using a closure. Be prepared to explain to a partner how it worked before, and
how it works now with a closure. (Noteworthy ******)
var checkAttendanceFunc = function(nameArr){
  var resultArr = [];
  for(var i = 0; i < nameArr.length; i++){
    resultArr.push(function(){ console.log('Is', nameArr[i], 'present?', i)}); // this anonymous function is never invoked.
  };
  return resultArr;
};
==============================================================================================================
var checkAttendanceFunc = function(nameArr){
  var resultArr = [];
  
  var callback = function(nameArr){
  	console.log('Is', nameArr[i], 'present?', i);
  	return 'Is ' + nameArr[i] + ' present? ' + i;
  };
  
  for(var i = 0; i < nameArr.length; i++){
    resultArr.push(callback(nameArr)); // now callback() is invoked and pushed for each iteration, 
    																	 //which effectively close i for each invocation.
  };
  return resultArr;
};

// Time: 2 min
// Expected result: n/a 
// Actual result  : n/a
// Do I know it?: Yes, but it's hard to explain.
// Why was it wrong?: the anonymous function inside the loop is not invoked, which means i is not closed in a scope.


// 8. Retrieve id, title, and a 150x200 box art url for every video (Difficulty ******) Create a query that
// selects {id, title, boxart} for every video in the MovieLists.
Array.prototype.concatAll = function() {
	var results = [];
	this.forEach(function(subArray) {
    subArray.forEach(function(element){
    	results.push(element);
    });
  });
	return results;
};

var movieLists = [
			{
				name: "Instant Queue",
				videos : [
					{
						"id": 70111470,
						"title": "Die Hard",
						"boxarts": [
							{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 4.0,
						"bookmark": []
					},
					{
						"id": 654356453,
						"title": "Bad Boys",
						"boxarts": [
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
							{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 5.0,
						"bookmark": [{ id:432534, time:65876586 }]
					}
				]
			}
		];
==============================================================================================================
var boxArts = function(array) {
	
return movieLists.map(function(movieList) { // selecting videos arrays of each movieList object
	return movieList.videos.map(function(video) { // selecting boxarts arrays of each video array 
		return video.boxarts.filter(function(boxart) { // filtering element of boxarts array
			return boxart.width === 150; // end of selecting
		  	}).map(function(boxart) { // saving as an abject format
			return {id: video.id, title: video.title, boxart: boxart.url};
	  });
  }).concatAll(); // concat third and second level arrays
}).concatAll(); 	// concat second and first level arrays

};

// Time: 15 min
// Expected result: n/a
// Actual result  : n/a
// Do I know it?: No
// Why was it wrong?: Misuse of filter.
