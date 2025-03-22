class PaginationHelper {
	collectionLength = 0;
	collection = [];
	itemsPerPage = 0;

	constructor(collection, itemsPerPage) {
		// The constructor takes in an array of items and a integer indicating how many
		// items fit within a single page

		// Store original collection length
		this.collectionLength = collection.length;

		// Convert the collection into a paginated (multi-dimensional) array
		this.collection = collection?.length > 0 ? [...this.breakCollectionInToChunks(collection, itemsPerPage)] : [];
		this.itemsPerPage = itemsPerPage;
	}

	itemCount() {
		// returns the number of items within the entire collection
		return this.collectionLength;
	}

	pageCount() {
		// returns the number of pages

		/**
		 * Since the collection is stored as a 2D array (each sub-array is a page),
		 * the number of pages is equal to the length of the outer array
		 */
		return this.collection?.length;
	}

	pageItemCount(pageIndex) {
		// returns the number of items on the current page. page_index is zero based.
		// this method should return -1 for pageIndex values that are out of range

		// Returns length of individual page in collection
		return this.collection[pageIndex]?.length ?? -1;
	}

	pageIndex(itemIndex) {
		// determines what page an item is on. Zero based indexes
		// this method should return -1 for itemIndex values that are out of range
		if (itemIndex < 0 || itemIndex >= this.itemCount()) return -1;
		return Math.floor(itemIndex / this.itemsPerPage);

	}

	/**
	 * Splits a collection into chunks (pages) of a specified size using
	 *
	 * @generator
	 * @param {Array} collection - List of items to be divided into chunks
	 * @param {number} itemsPerPage - The amount of items per chunk (page)
	 * @yields {Array} A sub-array (chunk) containing up to `itemsPerPage` items from the original collection.
	 *
	 * @example
	 * const helper = new PaginationHelper([1, 2, 3, 4, 5], 2);
	 * // Yields: [1, 2], [3, 4], [5]
	 */
	* breakCollectionInToChunks(collection, itemsPerPage) {
		for (let i = 0; i < collection.length; i += itemsPerPage) {
			yield collection.slice(i, i + itemsPerPage);
		}
	}
}