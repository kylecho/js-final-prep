// 1. Letter Changes (Difficulty ****) Utilize indexOf()
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


// 2. Letter Capitalize (Difficulty **)
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


// 3. Simple Symbols (Difficulty **)
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


// 4. Time Convert (Difficulty *) Read carefully for sample cases!
=========================================================================
function TimeConvert(num) {
	var mins = num % 60;
	var hrs = Math.floor(num / 60);
	return '' + hrs + ':' + mins; // I got minor error not having hours for num < 60
}


// 5. Alphabet Soup (Difficulty *) But the sorting can be tricky
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


// 6. AB Check (Difficulty ***) Because I'm not familiar with String indexing
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

// 7. Palindrome (Difficulty **)
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

// 8. Arith Geo (Difficulty ***) It should test for all elements!
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

// 9. Array Addition I (Difficulty *****)
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

// 10. Letter Count I (Difficulty ****)
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

// 11. Second GreatLow (Difficulty ***) For finding unique elements from an array, use indexOf() and push unique elements.
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

// 12. Division Stringified (Difficulty ***) For text formatting, use .splice() with negative starting indexes.
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


// 13. Counting Minutes I (Difficulty *****) It's a problem of its kind. Great insight for string & number
=========================================================================
function CountingMinutesI(str) {

	var toMinutes = function(timeStr) {  // "1:01am"
		var ampm = timeStr.slice(-2);		   // "am"
		timeStr = timeStr.slice(0, -2);	   // "1:01"
		var hourNmin = timeStr.split(':'); // ["1", "01"]
		if (hourNmin[0] === 12) {
			hourNmin[0] = 0;
		}
		hourNmin[1] = hourNmin[1] * 1; 		 // converts "01" to 1
		return hourNmin[0] * 60 + hourNmin[1] + (ampm === 'pm' ? 12 * 60 : 0);
	};

	var times = str.split('-');
	var time1 = toMinutes(times[0]);
	var time2 = toMinutes(times[1]);
	if (time2 <= time1) {
		time2 += 60 * 24;
	}

	return time2 - time1;
}

// 14. Mean Mode (Difficulty ****) For finding mode, use an object to store as a key : value pair.
=========================================================================
function MeanMode(arr) {
  var modeCount = {};
  var mode;
  var mean;
  var sum = 0;
  var count = 0;
  
  for ( var i = 0; i < arr.length; i++ ) {
    sum += arr[i];
    modeCount[arr[i]] = modeCount[arr[i]] || 0;
    modeCount[arr[i]] += 1;          //adding for the count of the number
  }
  mean = sum/arr.length;
  for( var key in modeCount ){
    if( modeCount[key] > count){     //**check the number of times a number has been seen
      mode = parseInt(key);          //if its a new highest, convert the key back into a number and set it as the current mode
      count = modeCount[key];        //set a new high count
    }
  }

  return mode === mean ? 1 : 0;      //check to see if the mode and mean are equal
}

// 15. Dash Insert (Difficulty ***) Note how to treat on checking odd indexes
=========================================================================
function DashInsert(num) {
	var num = num.toString().split('');
	var result = [];
	for (var i = 0; i < num.length; i++) {
		result.push(num[i]);
		if (num[i] % 2 !== 0 && num[i+1] % 2 === 1) { // For the last i, it becomes (undefined % 2 === 1) which is (NaN === 1) that's 'false'.
			result.push('-');														// But if we used (num[i+1] % 2 !== 0), it means (undefined % 2 !== 0) which is (NaN !== 0) that's 'true'.
		}																							// It will add '-' to the end of the last index.
	}
	return result.join('');
}


// 16. Swap Case (Difficulty *) For case swaping, use alpha[alpha.indexOf(myStr[i])] to append for the answer.
=========================================================================
function SwapCase(str) {
  var upper = 'abcdefghijklmnopqrstuvwxyz';
  var lower = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var myStr = str.split('');
  var result = '';
  for (var i = 0; i < myStr.length; i++) {
    if (upper.indexOf(myStr[i]) !== -1) {
      result += lower[upper.indexOf(myStr[i])];
    } else if (lower.indexOf(myStr[i]) !== -1) {
      result += upper[lower.indexOf(myStr[i])];
    } else {
      result += myStr[i];
    }
  }
  return result;
}

// 17. Number Addition (Difficulty *) When dealing with numbers in a string, always think of 'str.match(/[0-9]+/g);'
=========================================================================
function NumberAddition(str) {
  var num = str.match(/[0-9]+/g); // Useful
  return num.reduce(function(a, b){ return parseInt(a) + parseInt(b); });
}

// 18. Third Greatest (Difficulty **) Don't make it complicated. When comparing, always think about sort().
=========================================================================
function ThirdGreatest(strArr) {
  var myArr = strArr.slice(); // make a copy
  myArr.sort(function(a, b){ return b.length - a.length; });
  return myArr[2];
}

// 19. Powers of Two (Difficulty *)
=========================================================================
function PowersofTwo(num) {
  if (num < 2) {
    return false;
  } else if (num === 2) {
    return true;
  } else {
    return PowersofTwo(num / 2);
  }
}

// 20. Additive Persistence (Difficulty ***)
=========================================================================
function AdditivePersistence(num) {
  var count = 0;

  var reduceToSingleNum = function recursion(num) {
  	var myNum = num.toString();
    if (myNum.length === 1) {
      return true;
    } else {
    	count++;
      myNum = myNum.split('');
      myNum = myNum.reduce(function(a, b) { return parseInt(a) + parseInt(b); });
    } return recursion(myNum);
  };

  reduceToSingleNum(num);
  return count;
}

// 21. Multiplicative Persistence (Difficulty ***) No loop needed
=========================================================================
function MultiplicativePersistence(num) {
  var count = 0;

  var reduceToSingleNum = function recursion(num) {
    var myNum = num.toString();
    if (myNum.length === 1) {
      return true;
    } else {
      count++;
      myNum = myNum.split('');
      myNum = myNum.reduce(function(a, b) { return parseInt(a) * parseInt(b); });
    } return recursion(myNum);
  };

  reduceToSingleNum(num);
  return count;
}

// 22. Off Line Minimum (Difficulty ****)
=========================================================================
function OffLineMinimum(strArr) {
  // loop through strArr
  // if strArr[i] equals 'E'
  // copy an array left the the 'E'
  // sort, and pick 0 index element
  // push to result
  // remove the 'E' and the index of the pushed element 
  var myArr = strArr.slice();
  var tempArr;
  var result = [];
  for (var i = 0; i < myArr.length; i++) {
    if (myArr[i] === 'E') {
      tempArr = myArr.slice(0, i + 1).sort(function(a, b){ return parseInt(a) - parseInt(b); });
      result.push(tempArr[0]);
      myArr.splice(i, 1); // remove 'E'
      myArr.splice(myArr.indexOf(tempArr[0]), 1); // remove 'the num'
      i = i - 2;
    }
  }
  return result.join(',');
}
