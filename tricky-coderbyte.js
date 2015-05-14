// Letter Changes (Difficulty ****)
=========================================================================
function LetterChanges(str) {
  var alpha = 'abcdefghijklmnopqrstuvwxyz';
  var vowels = 'aeiou';
  var myStr = str.toLowerCase().split('');
  var result = '';
  
  for (var i = 0; i < myStr.length; i++) {
  	// the next alphabet from current element
  	var theNextAlpha = alpha[(alpha.indexOf(myStr[i])) + 1];
    if (myStr[i] === 'z') {
      result += 'A';
    }
    // if current element is an alphabet
    if (alpha.indexOf(myStr[i]) !== -1) {
    	// if the next alphabet is a vowel
      if (vowels.indexOf(theNextAlpha) !== -1) {
        result += theNextAlpha.toUpperCase();
      } else {
        result += theNextAlpha;
      }
    } else {
      result += myStr[i];
    }
  }

  return result;
}


// Letter Capitalize (Difficulty **)
=========================================================================
function LetterCapitalize(str) {
  var myStr = str.toLowerCase().split(' ');
  var result = [];
  
  for (var i = 0; i < myStr.length; i++) {
    var temp = myStr[i].split('');
    temp[0] = temp[0].toUpperCase();
    temp = temp.join('');
    result.push(temp);
  }
  
  return result.join(' ');
}


// Simple Symbols (Difficulty **)
=========================================================================
function SimpleSymbols(str) {
  var alpha = 'abcdefghijklmnopqrstuvwxyz';
  var myStr = str.split('');
  for (var i = 0; i < myStr.length; i++) {
    if (alpha.indexOf(myStr[i]) !== -1 && (myStr[i - 1] !== '+' || myStr[i + 1] !== '+')) {
      return false;
    }
  }
  return true;
}


// Time Convert (Difficulty *) Read carefully for sample cases!
=========================================================================
function TimeConvert(num) {
	var mins = num % 60;
	var hrs = Math.floor(num / 60);
	return '' + hrs + ':' + mins; // I got minor error not having hours for num < 60
}


// Alphabet Soup (Difficulty *) But the sorting can be tricky
=========================================================================
function AlphabetSoup(str) {
  var myStr = str.split('');
  // compare function for sorting in the alphabetical order
  var compare = function(a, b) {
  	if (a < b) { // ascending order: if a < b return -1
      return -1
    } else if (a > b) {
      return 1
    } else {
    	return 0;
    }
  };
  myStr.sort(compare);
  return myStr.join('');
}


// AB Check (Difficulty ***) Because I'm not familiar with String indexing
=========================================================================
function ABCheck(str) {
  for (var i = 0; i < str.length; i++) { // String has a .length method
    if (str[i] === 'a' && str[i + 4] === 'b') { // String has a dot notation access
      return true;
    } else if (str[i] === 'b' && str[i + 4] === 'a') { // the other way
      return true;
    }
  }
  return false;
}

// Palindrome (Difficulty **)
=========================================================================
function Palindrome(str) {
	// remove any white spaces in the string, join into a string, and finally turn into an array
  var myStr = str.split(' ').join('').split('');
  var myStrReversed = myStr.slice().reverse();
  for (var i = 0; i < myStr.length; i++) {
    if (myStr[i] !== myStrReversed[i]) {
      return false;
    }
  }
  return true;
}

// Arith Geo (Difficulty ***) It should test for all elements!
=========================================================================
function ArithGeo(arr) {
  var result = -1;

  var isArithmetic = function(arr) {
  	for (var i = arr.length - 1; i >= 2; i--) {
      if (arr[i] - arr[i-1] !== arr[i-1] - arr[i-2]) {
        return result;
      }
    }
    result = 'Arithmetic';
  };

  var isGeometric = function(arr) {
  	for (var i = arr.length - 1; i >= 2; i--) {
      if (arr[i] / arr[i-1] !== arr[i-1] / arr[i-2]) {
        return result;
      }
    }
    result = 'Geometric';
  };

  isArithmetic(arr);
  isGeometric(arr);
  return result;
}

// Array Addition I (Difficulty *****)
// If a problem involves a combination, it's always the recursion!
=========================================================================
function ArrayAdditionI(arr) {
	var largest = arr.sort(function(a, b){ return a - b; }).pop();
	
	var recursion = function recursion(target, array) {
		if (array.length === 0) {
			return target === 0;
		} else {
			var n = array[0];
			// In every recursion, the array is reduced by 1
			array = array.slice(1);
			// However, target is either reduced by 'n' or not, in which case it's skipped.
			return recursion(target, array) || recursion(target - n, array);
		}
	};

	// Note that the recursion is returned.
	return recursion(largest, arr);
}

// Letter Count I (Difficulty ****)
=========================================================================
function LetterCountI(str) {
  
  // Compare function should be carefully set up.
  var compare = function(a, b) {
      if (a < b) {
          return -1;
      } else if (a > b) {
          return 1;
      } else {
          return 0;
      }
  };
  
  var copy = str.split(' ').slice();
  var myArr = copy.slice();
  var max = 0;   // Must be initiated with 0
  var count = 0; // Must be initiated with 0
  var theIndex;
  var word;

  for (var i = 0; i < myArr.length; i++) {
    word = myArr[i].split('').sort(compare);
    for (var j = 0; j < word.length - 1; j++) {
      if (word[j] === word[j + 1]) {
        count++;
      }
    }
    if (count > max) {
      max = count;
      theIndex = i;
      count = 0;
    }
  }
  
  return (theIndex !== undefined) ? copy[theIndex] : -1;
}

// Second GreatLow (Difficulty ***) Not hard, but learn the technique used for unique.
=========================================================================
function SecondGreatLow(arr) {
	var unique = [arr[0]];
	// Using indexOf() to determine unique elements
	for (var i = 0; i < arr.length; i++) {
		if (unique.indexOf(arr[i]) === -1) {
			unique.push(arr[i]);
		}
	}
	// Check if all elements are identical just in case!
	if (arr.every(function(element){ return element === arr[0]; })) {
    unique.push(arr[0]);
  }
	
	unique.sort(function(a, b){ return a - b; });
	var smallest = unique[1].toString();
	// Reverse the array to find the largest
	unique.reverse();
	var largest = unique[1].toString();
	return smallest + ' ' + largest;

}

// Division Stringified (Difficulty ***)
=========================================================================
function DivisionStringified(num1, num2) {
	var num = Math.round(num1 / num2).toString().split('');
	var index = -3;
	while (num.length + index > 0) {
		num.splice(index, 0, ',');
		index -= 4;
	}

	return num.join('');
}

// Note what negative index works on splice.
var num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
num.splice(-1, 0, ','); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, ',', 10 ]
num.splice(-2, 0, ','); // [ 1, 2, 3, 4, 5, 6, 7, 8, ',', 9, 10 ]
num.splice(-3, 0, ','); // [ 1, 2, 3, 4, 5, 6, 7, ',', 8, 9, 10 ]
