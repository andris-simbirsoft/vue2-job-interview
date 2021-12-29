<template>
  <section>
    <recycle-scroller
      class="person-group"
      :items="groupedPersons"
      key-field="title"
      page-mode
    >

      <template v-slot="{ item }">
        <h3 class="person-group__name">{{ item.title }}</h3>

        <div class="list">
          <component
            v-for="person of item.items"
            :person="person"
            :key="person.id"
            :is="renderComponent(person)"
            @edit="onPersonEdit(person)"
          >
            <template #personName>
              <slot name="personName" :person="person">
                {{ person.name }}
              </slot>
            </template>

            <template #personEmail>
              <slot name="personEmail" :person="person">
                {{ person.name }}
              </slot>
            </template>
          </component>
        </div>
      </template>
    </recycle-scroller>
  </section>
</template>

<script>
import VPersonCard from '@/components/VPersonCard.vue';

import debounce from 'lodash/debounce';

import { groupItemsByFieldToArray } from '@/_utils/converter';
import { maskPersonCardValue } from '@/_utils/component';

const breakPoints = Object.freeze({
  MIN_SIZE: 671,
  FULL_SIZE: 1008,
});

const size = Object.freeze({
  PERSON_SIZE: 96,
  TITLE_SIZE: 44,
  GAP_SIZE: 16,
});

export default {
  name: 'VPersonGroup',

  components: {
    VPersonCard,
    VPersonMarkCard: maskPersonCardValue(VPersonCard, ['email'], '*'),
  },

  props: {
    persons: { type: Array, default: () => [] },
  },

  data: () => ({
    currentWidth: 0,
  }),

  computed: {
    /**
     * @typedef {{ title: string, size: number, items: import('../api/service.js').Person[] }} Group
     * @return {Group[]}
     */
    groupedPersons() {
      const grouped = groupItemsByFieldToArray(this.persons, 'position');

      const { PERSON_SIZE, TITLE_SIZE, GAP_SIZE } = size;

      return grouped.map(group => {
        const newGroup = {
          ...group,
          size: TITLE_SIZE,
        };

        let colCount = 1;

        if (this.currentWidth > breakPoints.MIN_SIZE && this.currentWidth < breakPoints.FULL_SIZE) {
          colCount = 2;
        } else if (this.currentWidth >= breakPoints.FULL_SIZE) {
          colCount = 3;
        }

        const rowsCount = Math.ceil(group.items.length / colCount);

        newGroup.size += rowsCount * PERSON_SIZE + (GAP_SIZE * (rowsCount));

        return newGroup;
      });
    },
  },
  
  methods: {
    onPersonEdit(person) {
      this.$emit('edit', person);
    },

    renderComponent(person) {
      return person.position === 'Manager' ? 'VPersonMarkCard' : 'VPersonCard';
    },

    onResize() {
      this.currentWidth = document.documentElement.clientWidth;
    },
  },

  mounted() {
    this.currentWidth = document.documentElement.clientWidth;

    const resizeDebounce = debounce(() => this.onResize(), 200);

    window.addEventListener('resize', resizeDebounce);

    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', resizeDebounce)
    });
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
  margin-bottom: 1rem;
  padding: 0 2px;
}
</style>
