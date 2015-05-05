/** 
 * Creates a new List. A list lets you add and remove elements at the current position
 * of the iterator, which starts at the start of the list and can be moved with the functions.
 */

var List = (function () {
	"use strict";

	function List() {
		this.head      = null;
		this.tail      = null;
		this.previows  = null;
		this.following = null;
		this.length    = 0;
	}
	
	List.prototype = {
		// Adds the element between the previows and following (private method)
		add: function (item) {
			var node = {
				data: item,
				next: this.following,
				prev: this.previows
			};
			if (this.head === null) {
				this.head = node;
				this.tail = node;
			} else {
				if (this.previows) {
					this.previows.next = node;
				} else {
					this.head = node;
				}
				if (this.following) {
					this.following.prev = node;
				} else {
					this.tail = node;
				}
			}
			this.length += 1;
			return node;
		},
		
		// Adds the item and then moves the iterator to the following position
		addNext: function (item) {
			var node = this.add(item);
			this.following = node.next;
			this.previows  = node;
		},
		
		// Adds the item and then moves the iterator to the previows position
		addPrev: function (item) {
			var node = this.add(item);
			this.following = node;
			this.previows  = node.prev;
		},
		
		
		// Removes the follwing element and sets the next one as the new following element
		removeNext: function () {
			// Cant remove next if there isnt one
			if (this.following === null) {
				return;
			}
			if (this.following.prev) {
				this.following.prev.next = this.following.next;
			}
			this.following = this.following.next;
			this.length -= 1;
		},
		
		// Removes the previows element and sets the prev one as the new previows element
		removePrev: function () {
			// Cant remove prev if there isnt one
			if (this.previews === null) {
				return;
			}
			if (this.previows.prev) {
				this.previows.prev.next = this.previows.next;
			}
			this.previows = this.previows.prev;
			this.length -= 1;
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
			this.following = this.head;
			this.previows  = null;
		},
		
		// Sets the current on the last element
		iterateLast: function () {
			this.following = null;
			this.previows  = this.tail;
		},
		
		// Moves to the next element if there is one
		next: function () {
			if (this.hasNext()) {
				this.following = this.following.next;
				this.previows  = this.following;
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
		}
	};
	
	return List;
}());
