// extend(obj1, [obj2], [obj3], [...])
var extend = function(obj, objs) {
	var myObjs = Array.prototype.slice.call(arguments).slice(1);
	for (var i = 0; i < myObjs.length; i++) {
		for (var key in myObjs[i]) {
			obj[key] = myObjs[i][key];
		}
	}
	return obj;
};