var proto = require('@dmail/proto');
var Iterator = require('@dmail/iterator');

var FilteredIterator = proto.extend.call(Iterator, {
	constructor: function(iterator, filter, bind, kind){
		if( typeof filter != 'function' ) throw new TypeError('filter must be a function');

		this.iteratedObject = iterator;
		this.iterationKind = kind || 'key+value';
		this.result = {done: false, value: undefined};
		this.nextIndex = 0;
		this.filter = filter;
		this.bind = bind;
	},

	createResult: function(value, done){
		this.result.value = value;
		this.result.done = done;
		return this.result;
	},

	next: function(){
		var filter, bind, kind, iterator, next, value;

		filter = this.filter;
		bind = this.bind;
		kind = this.iterationKind;
		iterator = this.iteratedObject;
		next = iterator.next();

		while( next.done === false ){
			value = next.value;

			if( filter.call(bind, value) ){
				this.nextIndex++;

				if( kind == 'value' ){
					return this.createResult(value, false);
				}

				if( kind === 'key' ){
					return this.createResult(this.nextIndex, false);
				}

				return this.createResult([this.nextIndex, value], false);
			}

			next = iterator.next();
		}

		return this.createResult(undefined, true);
	},

	toString: function(){
		return '[object Filtered Iterator]';
	}
});

module.exports = FilteredIterator;