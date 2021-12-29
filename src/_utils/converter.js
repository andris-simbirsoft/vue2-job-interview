
/**
 * @typedef {Object<string, any>} Item
 *
 * @param {Item[]} items
 * @param {string} fieldName
 * @returns {Object<string, Item[]>}
 */
export const groupItemsByFieldToObject = (items, fieldName) => {
  return items.reduce((acc, item) => {
    if (item[fieldName] in acc) acc[item[fieldName]].push(item);
    else acc[item[fieldName]] = [item];

    return acc;
  }, {});
}

/**
 * @typedef {{ title: string, items: any[] }[]} ResultValue
 *
 * @param {Item[]} items
 * @param {string} fieldName
 * @returns {ResultValue}
 */
export const groupItemsByFieldToArray = (items, fieldName) => {
  const checked = {};
  
  return items.reduce((acc, item) => {
    if (item[fieldName] in checked) {
      acc[checked[item[fieldName]]].items.push(item);
    } else {
      checked[item[fieldName]] = acc.length;

      acc.push({
        items: [item],
        title: item[fieldName],
      });
    }

    return acc;
  }, []);
}

/**
 * @param {Item} item
 * @param {string[]} fields 
 * @returns {Object<string, any>} returns an item without fields from second param
 */
export const excludeFields = (item, fields) => {
  return Object.keys(item)
    .filter(key => !fields.includes(key))
    .reduce((acc, field) => {
      acc[field] = item[field];
      return acc;
    }, {});
}
