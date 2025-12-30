export function currencyStringToNumber(value: string | number) {
  if (typeof value === 'number') return value;

  return Number(value.replace(/\./g, '').replace(',', '.'));
}