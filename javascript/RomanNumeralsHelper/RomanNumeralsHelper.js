class RomanNumerals {
	// Lookup table ordered from highest to lowest for accurate conversion
	static helper = [
		{ value: 1000, numeral: 'M' },
		{ value: 900, numeral: 'CM' },
		{ value: 500, numeral: 'D' },
		{ value: 400, numeral: 'CD' },
		{ value: 100, numeral: 'C' },
		{ value: 90, numeral: 'XC' },
		{ value: 50, numeral: 'L' },
		{ value: 40, numeral: 'XL' },
		{ value: 10, numeral: 'X' },
		{ value: 9, numeral: 'IX' },
		{ value: 5, numeral: 'V' },
		{ value: 4, numeral: 'IV' },
		{ value: 1, numeral: 'I' }
	];

	/**
	 * Converts a number into its Roman numeral representation
	 *
	 * @param {number} num - number to convert
	 * @param {string} str - Used internally for recursion; defaults to an empty string
	 * @returns {string} - The Roman numeral string
	 */
	static toRoman(num, str = '') {
		if (num === 0) return str;

		// Find the largest Roman numeral less than or equal to the current number
		const obj = RomanNumerals.helper.find(item => item.value <= num);

		// Append the Roman numeral symbol to the result string
		str += obj.numeral;

		// Subtract the matched value and continue recursively
		return RomanNumerals.toRoman(num - obj.value, str);
	}

	/**
	 * Converts a Roman numeral string into its numeric value
	 *
	 * @param {string} str - Roman numeral string to convert
	 * @param {number} num - Accumulator for the total value; defaults to 0
	 * @returns {number} - The numeric value
	 */
	static fromRoman(str, num = 0) {
		if (str.length === 0) return num;

		// Find the Roman numeral prefix that matches the start of the string
		const match = RomanNumerals.helper.find(item => str.startsWith(item.numeral));

		// If a valid numeral is found, add its value and recurse with the remaining string
		if (match) {
			return RomanNumerals.fromRoman(str.slice(match.numeral.length), num + match.value);
		}

		// Optional: throw an error for invalid inputs
		throw new Error(`Invalid Roman numeral: ${str}`);
	}
}
