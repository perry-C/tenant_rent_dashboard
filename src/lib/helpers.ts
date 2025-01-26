import numberToWords from 'number-to-words';

const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

/**
 * Turns a number into words for invoices
 *
 * @param {number} price - Number to format
 * @returns {string} Number in words
 */
export const formatPriceToString = (price: number): string => {
    // Initialize variables
    let decimals: number;
    let beforeDecimal: string | null = null;
    let afterDecimal: string | null = null;

    // Dynamically get decimals from the price if currencyDetails is null
    const priceString = price.toString();
    const decimalIndex = priceString.indexOf('.');
    decimals = decimalIndex !== -1 ? priceString.split('.')[1].length : 0;

    // Ensure the price is rounded to the appropriate decimal places
    const roundedPrice = parseFloat(price.toFixed(decimals));

    // Split the price into integer and fractional parts
    const integerPart = Math.floor(roundedPrice);

    const fractionalMultiplier = Math.pow(10, decimals);
    const fractionalPart = Math.round(
        (roundedPrice - integerPart) * fractionalMultiplier
    );

    // Convert the integer part to words with a capitalized first letter
    const integerPartInWords = numberToWords
        .toWords(integerPart)
        .replace(/^\w/, (c) => c.toUpperCase());

    // Convert fractional part to words
    const fractionalPartInWords =
        fractionalPart > 0 ? numberToWords.toWords(fractionalPart) : null;

    // Handle zero values for both parts
    if (integerPart === 0 && fractionalPart === 0) {
        return 'Zero';
    }

    // Combine the parts into the final string
    let result = integerPartInWords;

    // Check if beforeDecimal is not null
    if (beforeDecimal !== null) {
        result += ` ${beforeDecimal}`;
    }

    if (fractionalPartInWords) {
        // Check if afterDecimal is not null
        if (afterDecimal !== null) {
            // Concatenate the after decimal and fractional part
            result += ` and ${fractionalPartInWords} ${afterDecimal}`;
        } else {
            // If afterDecimal is null, concatenate the fractional part
            result += ` point ${fractionalPartInWords}`;
        }
    }

    return result;
};
