export function Percentage(partialValue, totalValue) {
    partialValue= parseFloat(partialValue);
    totalValue= parseFloat(totalValue);
    return (totalValue * partialValue) / 100;
}