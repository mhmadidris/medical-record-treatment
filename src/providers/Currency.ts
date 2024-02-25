export function moneyFormatter(value: number, currency: string, decimals = 1) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency,
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
    }).format(value)
}