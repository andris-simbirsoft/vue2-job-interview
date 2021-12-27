<template>
  <div id="app">
    <div class="search-bar">Здесь будет строка поиска</div>

    <section>
      <template>
        <div class="person-group">
          <!-- Отображать название группы -->
          <div class="list">
            <template v-for="(person, personIdx) in filteredPersons">
              <v-person-card
                :person="person"
                :key="personIdx"
                @edit="onPersonEdit(person)"
              />
            </template>
          </div>
        </div>
      </template>
    </section>

    <v-person-popup
      :show="isPersonEditMode"
      :positions="positions"
      @cancel="onPersonCancelEdit"
      @save="onPersonSaveEdit"
    />
  </div>
</template>

<script>
// use this Service class to load data
// import ApiService from './api/service.js';
import persons from './api/data';

import VPersonCard from './components/VPersonCard.vue';
import VPersonPopup from './components/VPersonPopup.vue';

export default {
  name: 'App',

  components: {
    VPersonCard,
    VPersonPopup,
  },

  data: () => ({
    editablePerson: null,

    persons: persons,
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
    async fetchPersons() {
      // Use ApiService `getPersons` call here to load data
      this.persons = persons;
    },

    onPersonEdit(person) {
      this.editablePerson = person;
    },

    onPersonCancelEdit() {
      this.editablePerson = null;
    },

    onPersonSaveEdit() {
      this.editablePerson = null;
    },
  },
};
</script>

<style lang="pcss" scoped>
.search-bar {
  margin-bottom: 1rem;

  &-input {
    width: 100%;
  }
}

.person-group {
  margin-bottom: 2rem;

  &-name {
    margin-bottom: 1rem;
  }
}

.action-btn {
  color: var(--color-primary);
  font-size: var(--font-size-small);
  line-height: 1;
  border-bottom: 1px dashed currentColor;
  cursor: pointer;
}

.list {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>
