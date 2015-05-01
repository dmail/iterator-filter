exports['FilteredIterable[\'@@iterator\']() return independant iterator'] = function(test){
	var iterable = ['a', 'b'];
	var filteredIterable = Iterator.filter(iterable, function(){ return true; });
	var iteratorA = filteredIterable[Symbol.iterator]();
	var iteratorB = filteredIterable[Symbol.iterator]();

	iteratorA.next();
	test.equal(iteratorB.next().value, 'a');// yoy
};