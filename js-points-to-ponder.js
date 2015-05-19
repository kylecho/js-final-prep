THE ODIN PROJECT - JAVASCRIPT - POINTS TO PONDER




JavaScript Basic
========================================================================================================
Q How do you include a Javascript file in your HTML file?
=> Use <script src="someFile.js"></script> tag. Place it either in <head> or <body> of <html>

Q How do you include Javascript directly in your HTML code?
=> Write it inside <script>...</script> within <head> tag of <html>

Q How can you write and run your Javascript code using programs like jsfiddle?
=> Write some functions and invoke them explicitly. Such as someFunc();

Q How do you create a new object using the "Constructor" method?
=> We can make our own Constructor object and instantiate it. Such as var someObj = Object.create(myObj);

Q How do you create a new object using the "Literal" method?
=> {}

Q What does JS return if you try to access an object's attribute that doesn't exist?
=> undefined

Q How do you add items to or remove items from an array?
=> To add:
	 1. Direct assignment with the bracket notation, such as array[0] = 'zero';
	 2. array[array.length] = 'this will always add values to the end of the array';
	 3. Use Array methods such as: push(), unshift(), splice().
	 To remove:
	 1. Change array length.
	 2. Use Array methods: pop(), shift(), splice().

Q What is the difference between =, ==, and ===?
=> = is assignment, == is a type-converting comparison that checks values, and === is a strict comparison that checks type and value.

Q Are these "truthy" or "falsy" in JS: "0",NaN,null,"words","",[],undefined,{}, 1, 0?
=> "truthy": "0", "words", [], {}, 1
	 "falsy" : 0, NaN, null, "", undefined

Q How do you get the length of a string?
=> "somestring".length; // 10

Q How do you find a value within a string?
=> "somestring"[3] // "e"

Q How does a "switch" statement work?
=> switch (expression) {
	   case (value1):

	   case (value2):

	   default:
	 }

Q How can you use objects to accomplish the same task?
=> Make an object with key being the cases for switch statement, and access it by putting the expression using a bracket notation.
	switchObj = {
		1: "one",
		2: "two"
	}
	switchObj[4-2]; // "two"

Q How do you set up a for loop? A for...in loop?
=> for (var i = 0; i < length; i++) or for (var key in obj)

Q How do you set up a while loop?
=> increment/decrement plus:
	 while (true) {
	 	 // code
	 }

Q How do you break out of a loop or skip to the next iteration?
=> Place break; within the loop to break out, or continue; to skip to the next iteration.

Q What are "reserved words"?
=> All the words that does any kind of operation. Initially designed to be included in the JavaScript language.
	 Sucn as: var, function, Object, Array, new, arguments, if, for, return, +, -, =

Q How do you concatenate two arrays together?
=> Use Array method concat(). E.g. array1.concat(array2); or array1.concat(array2, array3, ...);

Q How do you sort arrays? Reverse them?
=> array1.sort(); and array2.reverse();

Q How do you use the #forEach method to print each item in an array?
=> array.forEach(function(item){
	   console.log(item);
	 });

Q How are functions declared (two ways)?
=> 1. Declaration method : function funcName () {}
	 2. Function expression: var myFunc = function() {};

Q What are "anonymous functions"?
=> "anonymous function" is a function without its name specified. Such as the second function in the above.

Q How can you pass a function arguments?
=> 1. Save an anonymous function in a variable and pass the variable to the function as an argument, or
	 2. Explicitly type a function definition inside the function argument. theFunc(function(){/*.like this.*/});

Q What does a function return?
=> 1. If no return value is set, it will always return undefined.
	 2. Or it will return a value, including a function(either definition, or self-invoking).

Q What are "immediately invoked function expressions (IIFE)"?
=> It is a function expression which is designed to return its return value immediately when called.
	 It can be set by putting the parentheses at the end.
	 var IIFE = (function(){ return "I am an IIFE" }());

Q If a function has been saved to a variable someVar, what''s the difference between how you would pass
	the function itself around instead of running it immediately when called? (hint: parentheses)
=> var someVar 		= function(){};			// When passed to a function, it will not return a value by that point.
	 var anotherVar = (function(){}()); // When passed to a function, it will be passed as its return value.

Q How do you test what the Type of an object is? (e.g. string, number, function, undefined...)
=> typeof anObject;

Q What is this set to in Javascript?
=> The immediate context of where it is located. I.e the closest object that called it.

Q How to you make a variable in the global scope? The local scope?
=> The determinant of scope is function in JavaScript. Therefore only declaring a variable inside any function will
	 let it be a variable in the local scope. Otherwise when a variable is called outside any functions, it is always
	 in a global scope.

Q Why are closures useful?
=> Closures are useful because it allows us to use useful techniques. Such techniques are:
	 1. It alows us to enjoy private variables, functions, objects.
	 2. More specifically, we can make function that can be called only once, or partially applied, or composed with several other functions.

Q How would you use a closure to "close" a value within a function?
=> By creating a function to have inner functions and variables declared outside of that inner functions.

Q How does #bind make your life simpler when thinking about closures and scopes?
=> bind can explicitly set this value to an object as one of its argument.




JavaScript Objects and “Classes” and Prototypes
========================================================================================================
Q Can JS functions be defined inside of objects?
Q What is a ConstructorFunction?
Q What is a prototype?
Q How do prototypes allow you to inherit and DRY up code?
Q What happens if you take the prototype of the prototype of the prototype etc. of an object?




JavaScript Scope and Closures
========================================================================================================
Q What is this equal to? (not a simple question...)
Q How do you bind variables to a scope?
Q Why would you define a that variable?
Q Why is id naughty to modify or reference variables from outside your scope?
Q Why aren''t private variables actually private?
Q Functions should always return the same thing... or..?
Q How does the way you call a function (e.g. function style, method style...) affect its scope (and this)?




Really Understanding JavaScript Functions
========================================================================================================
Q How do you call a function "method-style"?
Q How do you call a function "function-style"?
Q What do #apply and #call do?
Q When should you use a constructor?
Q When are arguments for a function required?
Q How can a function take another function as an argument?
Q How can a function return another function? How do you then run that returned function?
Q How do you indicate an argument isn''t required?
Q How might you access overflowing (extra) arguments?
Q What are surrogates and why are they used?
Q What does it mean to "namespace" your code?
Q How do you namespace your code using modules?
