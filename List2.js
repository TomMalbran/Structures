/** 
 * Creates a new List. A list lets you add and remove elements at the current position
 * of the iterator, which starts at the start of the list and can be moved with the functions.
 */

var List2 = (function () {
	"use strict";

	function List() {
		return undefined;
	}
	
	List.prototype = (function () {
		
		var head      = null,
			tail      = null,
			previows  = null,
			following = null,
			length    = 0;
		
		// Adds the element between the previows and following (private method)
		function add(item) {
			var node = {
				data: item,
				next: following,
				prev: previows
			};
			if (head === null) {
				head = node;
				tail = node;
			} else {
				if (previows) {
					previows.next = node;
				} else {
					head = node;
				}
				
				if (following) {
					following.prev = node;
				} else {
					tail = node;
				}
			}
			length += 1;
			return node;
		}
		
		return {
			// Adds the item and then moves the iterator to the following position
			addNext: function (item) {
				var node = add(item);
				following = node.next;
				previows  = node;
				return this;
			},
			
			// Adds the item and then moves the iterator to the previows position
			addPrev: function (item) {
				var node = add(item);
				following = node;
				previows  = node.prev;
				return this;
			},
			
			
			// Removes the follwing element and sets the next one as the new following element
			removeNext: function () {
				// Cant remove next if there isnt one
				if (following === null) {
					return;
				}
				if (following.prev) {
					following.prev.next = following.next;
				}
				following = following.next;
				length -= 1;
				return this;
			},
			
			// Removes the previows element and sets the prev one as the new previows element
			removePrev: function () {
				// Cant remove prev if there isnt one
				if (previows === null) {
					return;
				}
				if (previows.prev) {
					previows.prev.next = previows.next;
				}
				previows = previows.prev;
				length -= 1;
				return this;
			},
			
			
			// Returns the first elements data
			first: function () {
				return head.data;
			},
			// Returns the last elements data
			last: function () {
				return tail.data;
			},
			
			
			// Returns true if the queue is empty, and false otherwise
			isEmpty: function () {
				return head === null;
			},
			
			// Returns the size of the list
			size: function () {
				return length;
			},
			
			
			// Sets the current on the first element
			iterate: function () {
				following = head;
				previows  = null;
				return this;
			},
			
			// Sets the current on the last element
			iterateLast: function () {
				following = null;
				previows  = tail;
				return this;
			},
			
			// Moves to the next element if there is one
			next: function () {
				if (this.hasNext()) {
					following = following.next;
					previows  = following;
				}
				return this;
			},
			
			// Moves to the previews element if there is one
			prev: function () {
				if (this.hasPrev()) {
					following = previows;
					previows  = previows.prev;
				}
				return this;
			},
			
			// Checks if there is a next elements (from the current one)
			hasNext: function () {
				return following !== null;
			},
			
			// Checks if there is a previews element (from the current one)
			hasPrev: function () {
				return previows !== null;
			},
			
			// Returns the following elements data
			getNext: function () {
				if (this.hasNext()) {
					return following.data;
				}
				return null;
			},
			
			// Returns the previws elements data
			getPrev: function () {
				if (this.hasPrev()) {
					return previows.data;
				}
				return null;
			}
		};
	}());
	
	return List;
}());
