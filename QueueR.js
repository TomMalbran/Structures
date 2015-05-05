/**
 * Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
var QueueR = (function () {
	"use strict";
	
	/**
	 * @constructor
	 * The Queue Class
	 */
	function Queue() {
		return undefined;
	}

	Queue.prototype = (function () {
		var head    = null,
			tail    = null,
			current = null,
			length  = 0;
		
		return {
			/**
			 * Enqueues the given item
			 * @param {*} item
			 */
			enqueue: function (item) {
				var node = {
					data: item,
					next: null
				};
				
				if (!head) {
					head = node;
					tail = node;
				} else {
					tail.next = node;
					tail = node;
				}
				length += 1;
			},
			
			/**
			 * Dequeues and returns the first item in the Queue. If the Queue is empty it returns null.
			 * @return {?*}
			 */
			dequeue: function () {
				if (head !== null) {
					var data = head.data;
					head = head.next;
					length -= 1;
					return data;
				}
				return null;
			},
			
			/**
			 * Returns the first element of the queue or null if the Queue is empty
			 * @return {?*}
			 */
			first: function () {
				return head ? head.data : null;
			},
			
			/**
			 * Returns the last element of the queue or null if the Queue is empty
			 * @return {?*}
			 */
			last: function () {
				return tail ? tail.data : null;
			},
			
		
			/**
			 * Returns true if the queue is empty, and false otherwise
			 * @return {boolean}
			 */
			isEmpty: function () {
				return !head;
			},
			
			/**
			 * Returns the size of the queue
			 * @return {number}
			 */
			size: function () {
				return length;
			},
			
			
			/**
			 * Starts the iterator at the head of the queue
			 */
			iterate: function () {
				current = head;
			},
			
			/**
			 * Moves the iterator to the next element
			 */
			next: function () {
				if (current) {
					current = current.next;
				}
			},
			
			/**
			 * Returns the current element of the Queue or null if there isn't one
			 */
			item: function () {
				return current ? current.data : null;
			},
			
			/**
			 * Returns true if there are more elements after the current one
			 * @return {boolean}
			 */
			hasNext: function () {
				return current !== null;
			}
		};
	}());
	
	return Queue;
}());