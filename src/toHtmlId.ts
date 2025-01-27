// Converts a string to an html id suitable for use in an anchor link
export const toHtmlId = (phrase: string) => {
  return phrase
    .replace(/^[^a-zA-Z]+/, '') // Ensure id starts with a letter
    .replace(/[^\w-_\s]+/g, '')
    .replace(/\s+/g, '-');
};
