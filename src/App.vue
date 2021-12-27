<template>
  <div id="app">
    <div class="search-bar">Здесь будет строка поиска</div>

    <v-person-group
      :persons="persons"
      @edit="onPersonEdit"
    />

    <v-person-popup
      :show="isPersonEditMode"
      :positions="positions"
      :person="editablePerson"
      @cancel="onPersonCancelEdit"
      @save="onPersonSaveEdit"
    />
  </div>
</template>

<script>
// use this Service class to load data
import ApiService from './api/service.js';
// import persons from './api/data';

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

.action-btn {
  color: var(--color-primary);
  font-size: var(--font-size-small);
  line-height: 1;
  border-bottom: 1px dashed currentColor;
  cursor: pointer;
}
</style>
