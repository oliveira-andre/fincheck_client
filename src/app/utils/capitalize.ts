export function capitalize(text: string) {
  const firstLetter = text[0].toUpperCase();
  const restOfTheText = text.slice(1);
  return firstLetter + restOfTheText;
}