<template>
  <section>
    <div
      v-for="(group, groupKey) in groupedPersons"
      :key="groupKey"
      class="person-group"
    >
      <h3 class="person-group__name">{{ groupKey }}</h3>

      <div class="list">
        <component
          v-for="person of group"
          :person="person"
          :key="person.id"
          :is="renderComponent(person)"
          @edit="onPersonEdit(person)"
        >
          <template #personName="{ person }">
            <slot name="personName" :person="person">
              {{ person.name }}
            </slot>
          </template>
        </component>
      </div>
    </div>
  </section>
</template>

<script>
import VPersonCard from '@/components/VPersonCard.vue';

import { groupItemsByFieldToObject } from '@/_utils/converter';
import { maskPersonCardValue } from '@/_utils/component';

export default {
  name: 'VPersonGroup',

  components: {
    VPersonCard,
    VPersonMarkCard: maskPersonCardValue(VPersonCard, ['email'], '*'),
  },

  props: {
    persons: { type: Array, default: () => [] },
  },

  computed: {
    groupedPersons() {
      return groupItemsByFieldToObject(this.persons, 'position');
    },
  },
  
  methods: {
    onPersonEdit(person) {
      this.$emit('edit', person);
    },

    renderComponent(person) {
      return person.position === 'Manager' ? 'VPersonMarkCard' : 'VPersonCard';
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
