/**
 * function that returns a new component to mask some fields
 * @param {any} component Vue component
 * @param {string[]} fields email | name
 * @param {string} maskSymbol symbol to hide a field example: '*' | '-'
 * @returns 
 */
export const maskPersonCardValue = (component, fields, maskSymbol) => ({
  functional: true,

  props: component.props,

  render(createElement, context) {
    if (
      !fields.length
      || !fields.every(field => ['email', 'name'].includes(field))
      || Array.from(new Set(fields)).length !== fields.length
    ) {
      throw new Error('Incorrect fields value');
    }

    const scopedSlots = fields.reduce((acc, field) => {
      acc[`person${field[0].toUpperCase()}${field.substring(1)}`] = props => {
        const { person } = props;

        return createElement('span', maskSymbol.repeat(person[field].length))
      }

      return acc;
    }, { ...context.scopedSlots });

    const options = {
      scopedSlots,
      props: context.props,
    };

    return createElement(component, options);
  },
});
