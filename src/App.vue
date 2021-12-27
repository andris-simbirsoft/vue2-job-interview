<template>
  <div id="app">
    <input
      v-model="search"
      class="search-bar"
      type="text"
      placeholder="search"
    />

    <v-person-group
      :persons="persons"
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

import ApiService from './api/service.js';

import VPersonGroup from '@/components/VPersonGroup.vue';
import VPersonPopup from '@/components/VPersonPopup.vue';

const personService = new ApiService();

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
      return this.persons;
    },

    /**
     * @return {boolean}
     */
    isPersonEditMode() {
      return !!this.editablePerson;
    },
  },

  methods: {
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
