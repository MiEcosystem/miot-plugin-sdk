/* eslint-disable  */
// @ts-nocheck
const placeholderRegex = /(\{[\d|\w]+\})/;
export const formatString = (str, ...valuesForPlaceholders) => (str || '').split(placeholderRegex).filter(textPart => !!textPart).map(textPart => {
  if (textPart.match(placeholderRegex)) {
    const matchedKey = textPart.slice(1, -1);
    let valueForPlaceholder = valuesForPlaceholders[matchedKey]; // If no value found, check if working with an object instead

    if (valueForPlaceholder == undefined) {
      const valueFromObjectPlaceholder = valuesForPlaceholders[0][matchedKey];

      if (valueFromObjectPlaceholder !== undefined) {
        valueForPlaceholder = valueFromObjectPlaceholder;
      } else {
        // If value still isn't found, then it must have been undefined/null
        return valueForPlaceholder;
      }
    }

    return valueForPlaceholder;
  }

  return textPart;
}).join('');