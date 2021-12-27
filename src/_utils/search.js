/**
 * @param {string} fieldName object field name
 * @param {(fieldValue: string, search: string) => boolean} searchFunction compare function
 * @returns {(item: object, search: string) => boolean} logical function to filter items
 */
export const searchFactory = (fieldName, searchFunction) => {
  return (item, search) => searchFunction(item[fieldName], search);
}
