/**
 * @param {string} fieldName object field name
 * @param {(fieldValue: string, search: string) => boolean} searchFunction compare function
 * @returns {(item: object, search: string) => boolean} logical function to filter items
 */
export const searchFactory = (fieldName, searchFunction) => {
  return (item, search) => searchFunction(item[fieldName], search);
}

/**
 * function that returns a marked value by search string
 * @param {string} value value to search
 * @param {string} search search string
 * @returns {string} a marked value string by second param
 */
export const searchMark = (value, search) => {
  const reg = new RegExp(search, 'gi');

  return value.replace(reg, '<mark>$&</mark>');
}
