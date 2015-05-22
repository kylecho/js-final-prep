Functional Programming in Javascript
=============================================================================================
Functional programming provides developers with the tools to abstract common collection
operations into reusable, composable building blocks.
1. map
2. filter
3. concatAll
4. reduce
5. zip

Working with Arrays: Traversing an Array
=============================================================================================
// 1. Print all the names in an array
var printAll = function() {
	var names = ["Ben", "Jafar", "Matt", "Priya", "Brian"];
	for (var i = 0; i < names.length; i++) {
		console.log(names[i]);
	}
};

// 2. Use forEach to print all the names in an array
var printAll = function() {
	var names = ["Ben", "Jafar", "Matt", "Priya", "Brian"];
	names.forEach(function(name){
		console.log(name);
	});	
};

Projecting Arrays: Applying a function to a value and creating a new value.
=============================================================================================
// 3. Project an array of videos into an array of {id, title} pairs using forEach()
var newReleases = [
			{
				"id": 70111470,
				"title": "Die Hard",
				"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 4.0,
				"bookmark": []
			},
			{
				"id": 654356453,
				"title": "Bad Boys",
				"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
				"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
				"rating": 5.0,
				"bookmark": [{ id:432534, time:65876586 }]
			}
];

var getIdAndTitle = function() {
	var videoAndTitlePairs = [];
	newReleases.forEach(function(video){
		videoAndTitlePairs.push({id: video.id, title: video.title});
	});
	return videoAndTitlePairs;
};

// 4. Implement map(): All array projections share two operations in common:
// 1. Traverse the source array, 2. Add each item's projected value to a new array.
Array.prototype.map = function(callback) {
	var result = [];
	this.forEach(function(item){
		result.push(callback(item));
	});
	return result;
};

// 5. Use map() to project an array of videos into an array of {id, title} pairs
var getIdAndTitleUsingMap = function() {
	return newReleases.map(function(video){
		return {id: video.id, title: video.title};
	});
};

Filtering Arrays: To filter an array we apply a test to each item in the array and collect
the items that pass into a new array.
=============================================================================================
// 6. Use forEach() to collect only those videos with a rating of 5.0
var fiveStars = function() {
	var videos = [];
	newReleases.forEach(function(video){
		if (video.rating === 5.0) {
			videos.push(video);
		}
	});
	return videos;
};

// 7. Implement filter(): every filter() operations share some operations in common.
// 1. Traverse the array. 2. Add objects that pass the test to a new array.
Array.prototype.filter = function(test) {
	var result = [];
	this.forEach(function(element){
		if (test(element)) {
			result.push(element);
		}
	});
	return result;
};

// 8. Chain filter and map to collect the ids of videos that have a rating of 5.0
var idAndTitleOfRatings5 = function() {
	return newReleases.filter(function(video){
		return video.rating === 5.0;
	}).map(function(video){
		return video.id;
	});
};

Querying Trees: Trees pose a challenge because we need to flatten them into arrays in order to
apply filter() and map() on them. (Noteworthy *******)
=============================================================================================
// 9. Flatten the movieLists array into an array of video ids
var allVideoIds = function() {
	var allVideoIdsInMovieLists = [];
	movieLists.forEach(function(list){
		list.videos.forEach(function(video){ // list is an object thus it needs to refer to its array property
			allVideoIdsInMovieLists.push(video.id);
		});
	});
	return allVideoIdsInMovieLists;
};

// 10. Implement concatAll(): iterates over each sub-array in the array and collects the result
// in a new, flat array. The concatAll() function expects that each item in the array to be another array.

// My answer
Array.prototype.concatAll = function() {
	return this.reduce(function(memo, element){
		return memo.concat(element);
	});
};

// Their answer
Array.prototype.concatAll = function() {
	var results = [];
	this.forEach(function(subArray) {
    subArray.forEach(function(element){
    	results.push(element);
    });
  });
	return results;
};

// 11. Use map() and concatAll() to project and flatten the movieLists into an array of video ids
return movieLists.map(function(list){
	return list.videos.map(function(video){ // this is correct because each list will be sub-array.
		return video.id;
	});
}).concatAll(); // we only need one concatAll().

// 12. Retrieve id, title, and a 150x200 box art url for every video (Difficulty ******)
// Create a query that selects {id, title, boxart} for every video in the MovieLists.

return movieLists.map(function(movieList) { // selecting videos arrays of each movieList object
	return movieList.videos.map(function(video) { // selecting boxarts arrays of each video array 
		return video.boxarts.filter(function(boxart) { // filtering element of boxarts array
			return boxart.width === 150; // end of selecting
		  	}).map(function(boxart) { // saving as an abject format
			return {id: video.id, title: video.title, boxart: boxart.url};
	  });
  }).concatAll(); // concat third and second level arrays
}).concatAll(); 	// concat second and first level arrays

=> [  { id: 70111470,
		    title: 'Die Hard',
		    boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg' },
		  { id: 654356453,
		    title: 'Bad Boys',
		    boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg' },
		  { id: 65432445,
		    title: 'The Chamber',
		    boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg' },
		  { id: 675465,
		    title: 'Fracture',
		    boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg' } ]


// 13. Implement concatMap()
Array.prototype.concatMap = function(callback) {
  return this.map(function(item){
  	return callback(item);
  }).concatAll();
};

// 14. Use concatMap() to retrieve id, title and 150x200 box art url for every video
return movieLists.concatMap(function(list){
	return list.videos.concatMap(function(video){
		return video.boxarts.filter(function(boxart){
			return boxart.width === 150;
		}).map(function(boxart){
			return {id: video.id, title: video.title, boxart: boxart.url};
		});
	});
});

// 15. Use forEach to find the largest box art
var boxarts = [
			{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
			{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
			{ width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
			{ width: 425, height:150, url:"http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
		];

var getLargestBoxart = function() {
	var currentSize;
	var maxSize = -1;
	var largestBoxart;
	boxarts.forEach(function(boxart){
		currentSize = boxart.width * boxart.height;
		if (currentSize > maxSize) {
			maxSize = currentSize;
			largestBoxart = boxart; // saving the boxart object.
		}
	});
	return largestBoxart; // returning the boxart object.
};

// 17. Retrieve the largest rating
var rating = [2, 3, 1, 4, 5];

var getHighestRating = function(array) {
	return array.reduce(function(memo, elem){
		if (memo > elem) {
			return memo;
		} else {
			return elem;
		}
	});
};

// 18. Retrieve url of the largest boxart
var getLargestBoxartUrl = function(array) {
	return array.reduce(function(memo, elem){
		var memoSize = memo.width * memo.height;
		var elemSize = elem.width * elem.height;
		if (memoSize > elemSize)
			return memo;
		else
			return elem;
	}).map(function(boxart){
		return boxart.url;
	});
};
