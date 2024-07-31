export function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day)); // O mês é zero-indexado
}