// 1. Making a function that takes two numbers, a base and exponent and returns the result
==============================================================================================================
var power = function(base, exponent) {
	var result = base;
	for (var i = 2; i <= exponent; i++) {
		result *= base;
	}
	return result;
};

// This function will return a number
// [input: 2, 5]
// [output: 32]
// This is same as:
Math.pow(base, power);

// 2. range([start], stop, [step])
// start, if omitted, defaults to 0; step defaults to 1. Returns a list of integers from start to stop, incremented
// (or decremented) by step, exclusive. Note that ranges that stop before they start are considered to be zero-length
// instead of negative.
==============================================================================================================


// 3. Write a function called applied that mimics the functionality of apply (without the context part)
==============================================================================================================
var applied = function(func, array) {
  return function(){
    return func.apply(null, array);
  };
};
//applied(func, [arr]) => func(arr1,arr2,arr3)

// 4. Write a function called partial that mimics this (Difficulty *****)
==============================================================================================================
var fullName = function ( firstName, lastName ) {
  return firstName + ' ' + lastName;
};

var partial = function(func, arg) {
  return function(x){
    var myArgs = [arg, x];
    return func.apply(null, myArgs);
  };
};

var billName = partial( fullName, 'Bill' );

billName( 'Smith' ); // "Bill Smith"
billName( 'Clinton' ); // "Bill Clinton"

// 5. (EXTRA CREDIT) compose(fn1, fn2, ..., fnN) Compose multiple functions to create a new function. 
// For example, wu.compose(f, g, h)(x) is equivalent to f(g(h(x))). (Difficulty ******)
==============================================================================================================
var compose = function(f, g) {
  return function(x) {
    return f(g(x));
  };
};

>>> function square(x) { return x * x; }
>>> function add2(x) { return x + 2; }
>>> wu.compose(square, add2)(5);
49
>>> wu.compose(add2, square)(5);
27

// 6. Write a function that will merge the first object into the second object, using _.each. If the property 
// already exists, on the second object, do not overwrite it. (Noteworthy *****)
==============================================================================================================
var merge = function(obj1, obj2) {
  var result = {};
  _.each(obj2, function(value, key){
    result[key] = value;
  });
  _.each(obj1, function(value, key){
    if (!(key in obj2)) // checking is required.
    result[key] = value;
  });
  return result;
};

var obj1 = {one: 1, two: 2, three: 3, four: 4, five: 5},
    obj2 = {three: 'a', four: 5, five: 6};
merge(obj1, obj2); // {three: 'a', four: 5, five: 6, one: 1, two: 2}


// 7. Write a function that takes a nested array and returns a one dimentional array.
==============================================================================================================
var flatten = function(arrays) {
  return _.reduce(arrays, function(prev, curr) { // should return _.reduce()!!
    return prev.concat(curr); 
  }, []); // initial value of [] is optional
};

// 8. Use _.map to change the 'name' property to your name and the 'isAwesome' property to true.
==============================================================================================================
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

// 9. Merge (Difficulty *****)
==============================================================================================================
var merge = function(array1, array2, callback) {
  var result = [];
  for (var i = 0; i < array1.length; i++) {
    result.push(callback(array1[i], array2[i]));
  }
  return result;
};

var euclid = function(coords1, coords2) {
  var myCoords = merge(coords1, coords2, function(a, b){
    return a - b;
  });
  return Math.sqrt(Math.pow(myCoords[0], 2) + Math.pow(myCoords[1], 2)); // Use Math.pow(base, power)
};

var x = euclid([1.2, 3.67], [2.0, 4.4]);
// x should now equal approximately 1.08
euclid([1.2, 3.67], [2.0, 4.4]);
1.7320508075688772

// 9. Write a function that takes a random number(1-10) of randomly generated num inputs (1-10). With those 
// inputs, you add them all together and return the result. randomAdder(1,4,7,2) => 14
==============================================================================================================
//generate the random numbers by using this function:
var generateNum = function(){
  return Math.floor(Math.random() * 11);
};

var randomAdder = function(times) {
  var total = 0;
  for (var i = 1; i <= times; i++) {
    total += generateNum();
  }
  return total;
};

// 10. [EXTRA CREDIT] Why doesn`t the code below work? This is a function that should return an array of functions
// that console.log() each person`s name as a string when invoked. Fiddle with this function and inspect how it works,
// then try to fix it using a closure. Be prepared to explain to a partner how it worked before, and how it works
// now with a closure. (Noteworthy ******)
==============================================================================================================
// Wrong code
  var checkAttendanceFunc = function(nameArr){
    var resultArr = [];
    for(var i = 0; i < nameArr.length; i++){
      resultArr.push(function(){ console.log('Is', nameArr[i], 'present?', i)}) // it's pushing a function definition.
    };
    return resultArr;
  };

// My answer
  var checkAttendanceFunc = function(nameArr){
    var resultArr = [];
    var checker = function(arg){ 
      console.log('Is', arg, 'present?', i);
      return 'Is ' + arg + ' present? ' + i; // should have a return value to be saved.
    };
    for(var i = 0; i < nameArr.length; i++){
      resultArr.push(checker(nameArr[i])); // should be evaluated. (i.e. invoked before being pushed.)
    };
    return resultArr;
  };
