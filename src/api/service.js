import request from '@/api/_http';
import { groupItemsByFieldToObject, excludeFields } from '@/_utils/converter';

/**
 * @typedef {object} PersonGroup
 * @property {string} name
 * @property {Person[]} persons
 */
/**
 * @typedef {object} Person
 * @property {number} id
 * @property {string} name
 * @property {string} avatar
 * @property {string} position
 * @property {Comment[]} comments
 */
/**
 * @typedef {object} Comment
 * @property {number} id
 * @property {number} personId
 * @property {string} text
 * @property {string} createdAt
 */
/**
 * @typedef {object} ApiServiceOptions
 * @property {string} baseUrl
 */
export default class ApiService {
  /**
   * @param {ApiServiceOptions} options
   */
  constructor({ baseUrl } = { baseUrl: 'https://61adfd3ea7c7f3001786f510.mockapi.io', }) {
    this.options = { baseUrl };
  }

  /**
   * @returns {Promise.<Person[], Error>}
   */
  async getPersons() {
    const comments = groupItemsByFieldToObject((await this.getComments()), 'personId');

    return request()
      .get(`${this.options.baseUrl}/person`)
      .then(res => res.data.map(person => ({
        ...person,
        comments: comments[person.id] ? comments[person.id] : [],
      })));
  }

  /**
   * @returns {Promise.<Comment[], Error>}
   */
  getComments() {
    return request()
      .get(`${this.options.baseUrl}/comment`)
      .then(res => res.data);
  }

  changePerson(person) {
    return request()
      .put(
        `${this.options.baseUrl}/person/${person.id}`,
        excludeFields(person, ['comments'])
      );
  }
}
