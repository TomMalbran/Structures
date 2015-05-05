/** 
 * Creates a new List. A list lets you add and remove elements at the current position
 * of the iterator, which starts at the start of the list and can be moved with the functions.
 */

var List3 = (function () {
	"use strict";

	function List() {
		this.head   = null;
		this.tail   = null;
		this.length = 0;
	}
	
	function Iterator(list, head, tail) {
		this.list      = list;
		this.following = head;
		this.previows  = tail;
	}
	
	List.prototype = {
		// Adds the element between the previows and following (private method)
		add: function (item, prev, next) {
			var node = {
				data: item,
				prev: prev,
				next: next
			};
			if (this.head === null) {
				this.head = node;
				this.tail = node;
			} else if (prev) {
				this.tail.next = node;
				this.tail      = node;
			} else if (next) {
				this.head.prev = node;
				this.head      = node;
			}
			this.length += 1;
			return node;
		},
		
		// Adds the item at the beggining of the list
		addFirst: function (item) {
			this.add(item, null, this.head);
			return this.iterate();
		},
		
		// Adds the item at the end of the list
		addLast: function (item) {
			this.add(item, this.tail, null);
			return this.iterateLast();
		},
			
		
		// Returns the first elements data
		first: function () {
			return this.head.data;
		},
		
		// Returns the last elements data
		last: function () {
			return this.tail.data;
		},
		
		
		// Returns true if the queue is empty, and false otherwise
		isEmpty: function () {
			return this.head === null;
		},
		
		// Returns the size of the list
		size: function () {
			return this.length;
		},
		
		// Sets the current on the first element
		iterate: function () {
			return new Iterator(this, this.head, null);
		},
		
		// Sets the current on the last element
		iterateLast: function () {
			return new Iterator(this, null, this.tail);
		}
	};
	
	
	Iterator.prototype = {
		
		// Moves to the next element if there is one
		next: function () {
			if (this.hasNext()) {
				this.following = this.following.next;
				this.previows  = this.following.prev;
			}
		},
		// Moves to the previews element if there is one
		prev: function () {
			if (this.hasPrev()) {
				this.following = this.previows;
				this.previows  = this.previows.prev;
			}
		},
		
		// Checks if there is a next elements (from the current one)
		hasNext: function () {
			return this.following !== null;
		},
		
		// Checks if there is a previews element (from the current one)
		hasPrev: function () {
			return this.previows !== null;
		},
		
		// Returns the following elements data
		getNext: function () {
			if (this.hasNext()) {
				return this.following.data;
			}
		},
		
		// Returns the previws elements data
		getPrev: function () {
			if (this.hasPrev()) {
				return this.previows.data;
			}
		},
		
		
		// Removes the follwing element and sets the next one as the new following element
		removeNext: function () {
			// Cant remove next if there isnt one
			if (!this.hasNext()) {
				return;
			}
			if (this.following.next) {
				this.following.next.prev = this.following.prev;
			} else {
				this.list.tail = this.following.prev;
			}
			if (this.following.prev) {
				this.following.prev.next = this.following.next;
			} else {
				this.list.head = this.following.next;
			}
			
			this.following = this.following.next;
			this.list.length -= 1;
		},
		
		// Removes the previows element and sets the prev one as the new previows element
		removePrev: function () {
			// Removes if the is a previows one
			if (this.hasPrev()) {
				this.prev();
				this.removeNext();
			}
		}
	};
	
	return List;
}());