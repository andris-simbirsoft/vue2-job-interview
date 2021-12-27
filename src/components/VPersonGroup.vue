<template>
  <section>
    <div
      v-for="(group, groupKey) in groupedPersons"
      :key="groupKey"
      class="person-group"
    >
      <h3 class="person-group__name">{{ groupKey }}</h3>

      <div class="list">
        <v-person-card
          v-for="person of group"
          :person="person"
          :key="person.id"
          @edit="onPersonEdit(person)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import VPersonCard from './VPersonCard.vue';

export default {
  name: 'VPersonGroup',

  components: { VPersonCard },

  props: {
    persons: { type: Array, default: () => [] },
  },

  computed: {
    groupedPersons() {
      return this.persons.reduce((acc, person) => {
        const { position } = person;

        if (position in acc) {
          acc[position].push(person);
        } else {
          acc[position] = [person];
        }

        return acc;
      }, {});
    },
  },
  
  methods: {
    onPersonEdit(person) {
      this.$emit('edit', person);
    },
  },
}
</script>

<style lang="pcss" scoped>
.person-group {
  margin-bottom: 2rem;

  &__name {
    margin-bottom: 1rem;
  }
}

.list {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
}
</style>
