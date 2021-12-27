<template>
  <div id="app">
    <input
      v-model.trim="search"
      class="search-bar"
      type="text"
      placeholder="search"
    />

    <v-person-group
      :persons="filteredPersons"
      @edit="onPersonEdit"
    />

    <v-person-popup
      v-if="isPersonEditMode"
      :positions="positions"
      :person="editablePerson"
      @cancel="onPersonCancelEdit"
      @save="onPersonSaveEdit"
    />
  </div>
</template>

<script>

import VPersonGroup from '@/components/VPersonGroup.vue';
import VPersonPopup from '@/components/VPersonPopup.vue';

import ApiService from '@/api/service.js';
import { searchFactory } from '@/_utils/search';

const personService = new ApiService();

const searchByEmail = searchFactory('email', (email, search) => {
  const splittedEmail = email.split('@');

  return splittedEmail.some(part => part.toLowerCase().startsWith(search.toLowerCase()));
});

const searchByName = searchFactory('name', (name, search) => {
  const splittedName = name.split('@');

  return splittedName.some(part => part.toLowerCase().startsWith(search.toLowerCase()));
});

export default {
  name: 'App',

  components: {
    VPersonGroup,
    VPersonPopup,
  },

  data: () => ({
    editablePerson: null,
    search: '',

    persons: [],
    positions: [],
  }),

  computed: {
    /**
     * @return {import('./api/service.js').Person[]}
     */
    filteredPersons() {
      return !this.search
        ? this.persons
        : this.persons.filter(person => {
          return searchByName(person, this.search) || searchByEmail(person, this.search)
        });
    },

    isPersonEditMode() {
      return !!this.editablePerson;
    },
  },

  methods: {
    /**
     * @return {string[]}
     */
    getPositonsFromPersons() {
      return this.persons.reduce((acc, person) => {
        const { position } = person;

        if (!acc.includes(position)) acc.push(position);

        return acc;
      }, []);
    },

    onPersonEdit(person) {
      this.editablePerson = person;
    },

    onPersonCancelEdit() {
      this.editablePerson = null;
    },

    onPersonSaveEdit(edittedPerson) {
      this.editablePerson = null;

      const editablePersonIdx = this.persons.findIndex(person => person.id === edittedPerson.id);

      this.persons.splice(editablePersonIdx, 1, edittedPerson);
      personService.changePerson(edittedPerson);
    },
  },

  async created() {
    this.persons = await personService.getPersons();

    this.positions = this.getPositonsFromPersons();
  }
};
</script>

<style lang="pcss" scoped>
.search-bar {
  margin-bottom: 1rem;

  &-input {
    width: 100%;
  }
}
</style>
