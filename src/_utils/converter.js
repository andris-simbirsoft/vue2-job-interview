
/**
 * @typedef {Object<string, any>} Item
 * @param {Item[]} items
 * @param {string} fieldName 
 * @returns {Obejct<string, Item[]>}
 */
export const groupItemsByFieldToObject = (items, fieldName) => {
  return items.reduce((acc, item) => {
    if (item[fieldName] in acc) acc[item[fieldName]].push(item);
    else acc[item[fieldName]] = [item];

    return acc;
  }, {});
}

/**
 * @typedef {Object<string, any>} Item
 * @param {Item} item
 * @param {string[]} fields 
 * @returns {Obejct<string, any>} returns an item without fields from second param
 */
export const convertObjectWithoutFields = (item, fields) => {
  return Object.keys(item)
    .filter(key => !fields.includes(key))
    .reduce((acc, field) => {
      acc[field] = item[field];
      return acc;
    }, {});
}
