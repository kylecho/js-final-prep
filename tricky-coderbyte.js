// Letter Changes
=========================================================================
function LetterChanges(str) {
  var alpha = 'abcdefghijklmnopqrstuvwxyz';
  var vowels = 'aeiou';
  var myStr = str.toLowerCase().split('');
  var result = '';
  
  for (var i = 0; i < myStr.length; i++) {
  	var theNextAlpha = alpha[(alpha.indexOf(myStr[i])) + 1];
    if (myStr[i] === 'z') {
      result += 'A';
    }
    if (alpha.indexOf(myStr[i]) !== -1) {
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

