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
