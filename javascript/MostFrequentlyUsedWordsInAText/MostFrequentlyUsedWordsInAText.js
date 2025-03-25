function topThreeWords(text) {
	// Check that text is valid
	if (!text || typeof text !== 'string') return [];

	// Match all words
	const words = text.toLowerCase().match(/\b[\'a-z]+\'?(?:[a-z]+\'?)*\b/gm);

	if (!words?.length) return [];

	let storage = {};
	words.forEach(word => (storage[word] = storage[word] + 1 || 1));

	return Object
		.entries(storage)
		.sort((a, b) => {
			return b[1] - a[1];
		})
		.slice(0, 3)
		.map(i => i[0]);
}