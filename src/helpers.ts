export function parseFloat(float: number): string {
    const numString = String(float);
    const decimalIndex = numString.indexOf('.');
    if (decimalIndex === -1) {
        return numString;
    }

    const numDecimals = numString.length - decimalIndex;

    if (numDecimals > 3) {
        const truncatedNumber = float.toFixed(5);
        return truncatedNumber;
    } else {
        return numString;
    }
}