export const formatPHP = (amount: number) =>
    new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount)

export const truncate = (text: string, max = 50) =>
    text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
