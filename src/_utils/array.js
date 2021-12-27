
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
